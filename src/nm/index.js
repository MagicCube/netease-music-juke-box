import PlayListView from "./view/PlayListView";

function main()
{
    const playListView = new PlayListView("play-list");
    $(document.body).append(playListView.$element);
}

$(main);
