import { createElement } from '../utils';

const createNoItemsTemplate = () => {
  return `
  <div class="no-items">
    <p class="no-items__heading"> Извините, по вашему запросу ничего не найдено. Попробуйте применить другие фильтры</p>
  </div>`;
};

export default class NoItemsView {
  protected _element: Element | null | undefined = null;

  get template() {
    return createNoItemsTemplate();
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }
}
