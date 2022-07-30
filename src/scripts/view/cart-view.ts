import { createElement } from '../utils';

const createCartTemplate = (itemsInCart: number) => {
  return `
    <button class="top-menu__button top-menu__button--cart" type="button">
      <img src="img/icons/logo-cart.svg" class="top-menu__icon" width="16" height="16" alt="">
      <span class="top-menu__button-text">Корзина</span>
      <span class="top-menu__button-count">${itemsInCart}</span>
      <span class="visually-hidden">Корзина</span>
    </button>`;
};

export default class CartView {
  protected _element!: Element;
  _itemsInCart = 0;

  constructor(itemsInCart: number) {
    this._itemsInCart = itemsInCart;
  }

  get template() {
    return createCartTemplate(this._itemsInCart);
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  removeElement = () => {
    return;
  };
}
