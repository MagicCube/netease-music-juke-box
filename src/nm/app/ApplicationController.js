import NJUApplicationController from "nju/app/ApplicationController";

import Application from "./Application";
import ServiceClient from "../service/ServiceClient";

export default class ApplicationController extends NJUApplicationController
{
    init()
    {
        super.init();
        this._playLists = [];
        this._activePlayList = null;
        this._activeTrack = null;
    }

    get playLists()
    {
        return this._playLists;
    }
    set playLists(value)
    {
        this._playLists = value;
        this._onPlayListsChanged();
    }

    get activePlayList()
    {
        return this._activePlayList;
    }
    set activePlayList(value)
    {
        if (this.activePlayList !== value)
        {
            this._activePlayList = value;
            this._onActivePlayListChanged();
        }
    }

    get activeTrack()
    {
        return this._activeTrack;
    }

    set activeTrack(value)
    {
        if (this.activeTrack !== value)
        {
            this._activeTrack = value;
            this._onActiveTrackChanged();
        }
    }


    createApplication(options)
    {
        return new Application();
    }

    initView(options)
    {
        super.initView(options);

        this.playerView = this.application.playerView;

        this.playListView = this.application.playListView;
        this.playListView.on("selectionchanged", this._playListView_selectionchanged.bind(this));

        this.searchView = this.application.searchView;
        this.searchView.on("search", this._searchView_search.bind(this));

        this.trackTableView = this.application.trackTableView;
        this.trackTableView.on("itemdblclick", this._trackTableView_itemdblclick.bind(this));
    }

    async run()
    {
        await ServiceClient.getInstance().login();
        await this._loadUserPlayLists();
    }



    async _loadUserPlayLists()
    {
        this.playLists = await ServiceClient.getInstance().getUserPlayLists();
        if (this.playLists.length > 0)
        {
            this.playListView.selection = this.playLists[0];
        }
    }



    _onPlayListsChanged()
    {
        this.playListView.items = this.playLists;
    }

    _onActivePlayListChanged()
    {
        if (this.activePlayList)
        {
            this.trackTableView.items = this.activePlayList.tracks;
            if (this.activePlayList.id === "search")
            {
                this.playListView.selection = null;
            }
        }
        else
        {
            this.trackTableView.items = [];
        }
    }

    _onActiveTrackChanged()
    {
        this.playerView.track = this.activeTrack;
    }

    async _playListView_selectionchanged(e)
    {
        if (this.playListView.selectedId)
        {
            const playList = await ServiceClient.getInstance().getPlayListDetail(this.playListView.selectedId);
            this.activePlayList = playList;
        }
    }

    _trackTableView_itemdblclick(e)
    {
        const track = this.trackTableView.selection;
        this.activeTrack = track;
    }

    async _searchView_search(e)
    {
        this.activePlayList = {
            id: "search",
            tracks: await ServiceClient.getInstance().search(this.searchView.text)
        };
    }
}
