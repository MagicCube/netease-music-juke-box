import View from "nju/view/View";

import ListView from "nju/view/ListView";

export default class SearchView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nm-search-view");

        this.$element.append(`<span class="icon iconfont icon-search">`);
        this.$input = $(`<input type="search" placeholder="搜索音乐">`);

        let inputTimer = null;
        this.$input.on("input", () => {
            if (inputTimer)
            {
                window.clearTimeout(inputTimer);
                inputTimer = null;
            }
            inputTimer = window.setTimeout(() => {
                this.trigger("change");
            }, 300);
        });
        this.$input.on("focus", () => {
            this.trigger("focus");
        });
        this.$input.on("blur", () => {
            this.trigger("blur");
        });


        this.$element.append(this.$input);

        this.$element.on("keydown", this._onkeydown.bind(this));
        this.$element.on("click", "span.icon", this._icon_onclick.bind(this));

        this._initSuggestionListView();
    }

    _initSuggestionListView()
    {
        this.suggestionListView = new ListView("suggestion-list");
        this.suggestionListView.renderItem = this._suggestionListView_renderItem.bind(this.suggestionListView);
        this.addSubview(this.suggestionListView);
        this.hideSuggestion();
    }



    get text()
    {
        return this.$input.val();
    }
    set text(value)
    {
        this.$input.val(typeof(value) === "string" ? value.trim() : "");
    }


    search(text = this.text)
    {
        this.text = text;
        if (this.text !== "")
        {
            this.trigger("search");
        }
    }


    showSuggestion()
    {
        this.suggestionListView.$element.show();
    }

    hideSuggestion()
    {
        this.suggestionListView.$element.hide();
    }

    toggleSuggestion(shown)
    {
        if (shown)
        {
            this.showSuggestion();
        }
        else
        {
            this.hideSuggestion();
        }
    }


    _onkeydown(e)
    {
        if (e.keyCode === 13)
        {
            this.search();
        }
    }

    _icon_onclick(e)
    {
        this.search();
    }






    _suggestionListView_renderItem(item, $item)
    {
        $item.data("item", item);
        $item.text(item.name);
    }
}
