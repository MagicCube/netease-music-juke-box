import ManagedObject from "../base/ManagedObject";

export default class View extends ManagedObject
{
    init()
    {
        super.init();
        this._subviews = [];
        this.$element = $(`<${this.getElementTag()}/>`);
        if (this.id !== null)
        {
            this.$element.attr("id", this.id);
        }
        this.$container = this.$element;
    }

    getElementTag()
    {
        return "div";
    }

    get subviews()
    {
        return this._subviews;
    }



    addStyleClass(...args)
    {
        this.$element.addClass(...args);
    }

    removeStyleClass(...args)
    {
        this.$element.removeClass(...args);
    }

    toggleStyleClass(...args)
    {
        this.$element.toggleClass(...args);
    }




    addSubview(view)
    {
        if (view instanceof View)
        {
            if (view.parent)
            {
                view.removeFromParent();
            }
            view._parent = this;
            this.subviews.push(view);
            this.$container.append(view.$element);
        }
    }

    addSubviews(views)
    {
        if (Array.isArray(views))
        {
            views.forEach(view => {
                this.addSubview(view);
            });
        }
    }

    removeSubview(view, neverUseAgain = false)
    {
        const index = this.subviews.indexOf(view);
        if (index !== -1)
        {
            view._parent = null;
            this.subviews.splice(index, 1);
            if (neverUseAgain)
            {
                view.$element.remove();
            }
            else
            {
                view.$element.detach();
            }
        }
    }

    removeAllSubviews(neverUseAgain = false)
    {
        while (this.subviews.length > 0)
        {
            this.removeSubview(this.subviews[0], neverUseAgain);
        }
    }

    removeFromParent()
    {
        if (this.parent)
        {
            this.parent.removeSubview(this);
        }
    }



    $(...args)
    {
        return this.$element.find(...args);
    }
}
