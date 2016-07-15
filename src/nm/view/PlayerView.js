import View from "../../nju/view/View";

export default class PlayerView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nm-player-view");

        this._track = null;

        this._initLayout();
    }

    get track()
    {
        return this._track;
    }
    set track(value)
    {
        this._track = value;
        if (value)
        {
            this.$element.find(".name").text(value.name);
        }
        else
        {
            this.$element.find(".name").text("");
        }
    }

    _initLayout()
    {
        this.$element.append(`<span class="name"></span>`);
    }
}
