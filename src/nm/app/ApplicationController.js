import NJUApplicationController from "../../nju/app/ApplicationController";

import Application from "./Application";
import ServiceClient from "../service/ServiceClient";

export default class ApplicationController extends NJUApplicationController
{
    init()
    {
        super.init();
        this._playLists = [];
        this._activePlayList = null;
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


    createApplication(options)
    {
        const application = new Application();
        this.playListView = application.playListView;
        this.playListView.on("selectionchanged", this._playListView_selectionchanged.bind(this));

        this.trackTableView = application.trackTableView;
        return application;
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
        }
        else
        {
            this.trackTableView.items = [];
        }
    }

    async _playListView_selectionchanged(e)
    {
        const playList = await ServiceClient.getInstance().getPlayListDetail(this.playListView.selectedId);
        this.activePlayList = playList;
    }
}
