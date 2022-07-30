import { createElement } from '../utils';

const createItemsListTemplate = () => `<div class="products__cards"></div>`;

export default class ItemsListView {
  protected _element: Element | null | undefined = null;

  get template() {
    return createItemsListTemplate();
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }
}
