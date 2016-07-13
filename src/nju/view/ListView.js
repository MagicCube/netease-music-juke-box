import View from "./View";

export default class ListView extends View
{
    init()
    {
        super.init();
        this._items = null;
        this._$itemTemplates = [];
        this.addStyleClass("nju-list-view");
    }

    getElementTag()
    {
        return "ul";
    }

    getItemElementTag()
    {
        return "li";
    }


    get items()
    {
        return this._items;
    }

    set items(value)
    {
        this.clearItems();
        this.addItems(value);
    }


    getTypeOfItem(item)
    {
        return 0;
    }


    clearItems()
    {
        if (this.items !== null)
        {
            if (this.items.length > 0)
            {
                this._items.splice(0, this._items.length);
                this.$container.children(this.getItemElementTag()).remove();
            }
        }
        else
        {
            this._items = [];
        }
    }

    addItems(items)
    {
        if (items && items.length)
        {
            items.forEach(item => {
                this.addItem(item);
            });
        }
    }

    addItem(item)
    {
        this.items.push(item);
        const itemType = this.getTypeOfItem(item);
        const $item = this.$createItem(itemType);
        this.renderItem(item, $item);
        this.$container.append($item);
    }

    renderItem(item, $item)
    {

    }

    $createItem(itemType = 0)
    {
        if (!this._$itemTemplates[itemType])
        {
            this._$itemTemplates[itemType] = this.$createNewItem(itemType);
        }
        return this._$itemTemplates[itemType].clone();
    }

    $createNewItem(itemType = 0)
    {
        return $(`<${this.getItemElementTag()}/>`);
    }
}
