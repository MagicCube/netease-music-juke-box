import ViewController from "nju/view/ViewController";
import SearchView from "./SearchView";
import ServiceClient from "../service/ServiceClient";

export default class SearchViewController extends ViewController
{
    createView(options)
    {
        return new SearchView("search");
    }

    initView(options)
    {
        super.initView(options);
        this.view.on("change", this._onChange.bind(this));

        this.suggestionListView = this.view.suggestionListView;
        this.suggestionListView.on("itemclick", this._suggestionListView_onitemclick.bind(this));
        this.view.on("focus", this._onfocus.bind(this));
        this.view.on("blur", this._onblur.bind(this));
    }

    async _onChange(e)
    {
        const keyword = this.view.text;
        if (keyword)
        {
            const tracks = await ServiceClient.getInstance().search(keyword, true);
            this.suggestionListView.items = tracks;
        }
        this.view.toggleSuggestion(this.view.text && this.suggestionListView.items && this.suggestionListView.items.length > 0);
    }

    _onfocus(e)
    {
        this.view.toggleSuggestion(this.view.text && this.suggestionListView.items && this.suggestionListView.items.length > 0);
    }

    _onblur(e)
    {
        this.view.hideSuggestion();
    }

    _suggestionListView_onitemclick(e)
    {
        const keyword = e.parameters.item.name;
        this.view.search(keyword);
        this.view.hideSuggestion();
    }
}
