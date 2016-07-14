import TableView from "../../nju/view/TableView";

import TimeUtil from "../util/TimeUtil";

export default class TrackTableView extends TableView
{
    init()
    {
        super.init();
        this.addStyleClass("nm-track-table-view striped");
    }

    $createNewItem()
    {
        const $tr = super.$createNewItem();
        $tr.append(`
            <td class="name"></td>
            <td class="artists"></td>
            <td class="album"></td>
            <td class="play-time"></td>`);
        return $tr;
    }

    renderItem(item, $item)
    {
        super.renderItem(item, $item);
        $item.children(".name").text(item.name);
        $item.children(".artists").text(item.artists.map(artist => artist.name).join(", "));
        $item.children(".album").text(item.album.name);
        $item.children(".play-time").text(TimeUtil.formatPlayTime(item.lMusic.playTime));
    }

    renderHeadItem($headItem)
    {
        super.renderHeadItem($headItem);
        $headItem.children(".name").text("音乐标题");
        $headItem.children(".artists").text("艺术家");
        $headItem.children(".album").text("专辑");
        $headItem.children(".play-time").text("时长");
    }
}
