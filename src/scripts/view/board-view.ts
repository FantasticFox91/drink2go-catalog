import { createElement } from '../utils';

const createBoardTemplate = (): string => {
  return `<div class="catalog__products products"></div>`;
};

export default class BoardView {
  protected _element: Element | null | undefined = null;

  get template() {
    return createBoardTemplate();
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }
}
