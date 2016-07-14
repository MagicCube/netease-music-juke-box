import NJUApplicationController from "../../nju/app/ApplicationController";

import Application from "./Application";
import ServiceClient from "../service/ServiceClient";

export default class ApplicationController extends NJUApplicationController
{
    createApplication(options)
    {
        const application = new Application();
        this.playListView = application.playListView;
        this.trackTableView = application.trackTableView;
        return application;
    }

    async run()
    {
        await ServiceClient.getInstance().login();
        this.playListView.items = await ServiceClient.getInstance().getUserPlayLists();
        this.playListView.selection = this.playListView.items[0];

        const playlist = await ServiceClient.getInstance().getPlayListDetail(this.playListView.items[0].id);
        this.trackTableView.items = playlist.tracks;
    }
}
