import NJUApplication from "../../nju/app/Application";

import PlayListView from "../view/PlayListView";
import TrackTableView from "../view/TrackTableView";
import PlayerView from "../view/PlayerView";

import ServiceClient from "../service/ServiceClient";

export default class Application extends NJUApplication
{
    init()
    {
        super.init();
        this.addStyleClass("nm-app");
        this._initLayout();
        this._initPlayListView();
        this._initTrackTableView();
        this._initPlayerView();
    }

    _initLayout()
    {
        this.$element.append(`
            <header><h1>网易云音乐</h1></header>
            <main>
                <aside class="sidebar"></aside>
                <section class="content"></section>
            </main>
            <footer></footer>`);
    }

    _initPlayListView()
    {
        this.playListView = new PlayListView("play-list");
        this.addSubview(this.playListView, this.$("> main > aside.sidebar"));
    }

    _initTrackTableView()
    {
        this.trackTableView = new TrackTableView("track-table");
        this.addSubview(this.trackTableView, this.$("> main > section.content"));
    }

    _initPlayerView()
    {
        this.playerView = new PlayerView("player");
        this.addSubview(this.playerView, this.$("> footer"));
    }

    async run()
    {
        await ServiceClient.getInstance().login();
        this.playListView.items = await ServiceClient.getInstance().getUserPlayLists();

        const playlist = await ServiceClient.getInstance().getPlayListDetail(this.playListView.items[0].id);
        this.trackTableView.items = playlist.tracks;
    }
}
