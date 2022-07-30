import { Item } from '../data/items';
import { createElement } from '../utils';

type CardViewCallBack = {
  addToCartClick: (() => void) | undefined;
  decrementClick: (() => void) | undefined;
  incrementClick: (() => void) | undefined;
};

const generateA = (isInCart: boolean, countInCart: number) => {
  return `
    <div class="card__count item-count ${!isInCart ? 'visually-hidden' : ''}">
      <button class="item-count__button item-count__button--minus" type="button"></button>
      <input class="item-count__number" tabindex="0" type="number" min="1" max="20" readonly value="${countInCart}"></input>
      <button class="item-count__button item-count__button--plus" type="button"></button>
      <div class="card__tooltip">
        <p class="card__tooltip-text">Только 20 товаров в одни руки. Оставьте что нибудь другим.</p>
      </div>
    </div>
    <button class="card__button button ${isInCart ? 'visually-hidden' : ''}" ${
    isInCart ? "style='position:absolute;'" : ''
  } type="button">В корзину</button>
    <div class="card__tooltip">
      <p class="card__tooltip-text">Только 20 товаров в одни руки. Оставьте что нибудь другим.</p>
    </div>
  `;
};

const createCardTemplate = ({ id, name, description, price, isInCart, countInCart }: Item) => `
  <li class="products__item card">
    <picture class="card__image">
      <!-- <source type="image/webp" srcset="img/coffee-can-${id}.webp, img/coffee-can-${id}@2x.webp 2x"> -->
      <img class="card__image" src="img/coffee-can-${id}.png" srcset="img/coffee-can-${id}@2x.png 2x" alt="Декаф Флэт Уайт" width="130" height="188">
    </picture>
    <h3 class="card__heading">${name}</h3>
    <p class="card__text">${description}</p>
    <div class="card__bottom">
      <span class="card__price">${price}₽</span>
      <div class="card__button-container">
        ${generateA(isInCart, countInCart)}
      </div>
    </div>
  </li>
  `;

export default class CardView {
  protected _element!: Element;
  #item: Item;
  _callback: CardViewCallBack = {
    incrementClick: undefined,
    addToCartClick: undefined,
    decrementClick: undefined,
  };
  value!: HTMLInputElement;
  #maxCount = 20;

  constructor(item: Item, maxCount: number) {
    this.#item = item;
    this.#maxCount = 20 - maxCount;
    if (this.element !== null) {
      const cardButton = <HTMLButtonElement>this.element.querySelector('.card__button');
      const cardButtonMinus = <HTMLButtonElement>this.element.querySelector('.item-count__button--minus');
      const cardButtonPlus = <HTMLButtonElement>this.element.querySelector('.item-count__button--plus');
      this.value = <HTMLInputElement>this.element.querySelector('.item-count__number');
      cardButton.addEventListener('click', this.#addToCartClick);
      cardButtonMinus.addEventListener('click', this.#onDecrementClick);
      cardButtonPlus.addEventListener('click', this.#onIncrementClick);
    }
  }

  get template() {
    return createCardTemplate(this.#item);
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  setCardClickHandler = (callback: () => void) => {
    this._callback.addToCartClick = callback;
  };

  setDecrementHandler = (callback: () => void) => {
    this._callback.decrementClick = callback;
  };

  setIncrementHandler = (callback: () => void) => {
    this._callback.incrementClick = callback;
  };

  #addToCartClick = (evt: Event) => {
    evt.preventDefault();
    if (this._callback.addToCartClick !== undefined) {
      this._callback.addToCartClick();
      if (this.element !== null) {
        const cardCartButtonElement: HTMLButtonElement | null = this.element.querySelector('card__button--inCart');
        if (cardCartButtonElement !== null) {
          cardCartButtonElement.classList.toggle('card__button--inCart');
        }
      }
    }
  };

  #onDecrementClick = (evt: Event) => {
    evt.preventDefault();
    if (this.value.value !== '0') {
      if (this.element !== null) {
        const itemCountElement = <HTMLInputElement>this.element.querySelector('.item-count__number');
        itemCountElement.value = String(Number(itemCountElement.value) - 1);
      }
    }
    if (this._callback.decrementClick !== undefined) {
      this._callback.decrementClick();
    }
  };

  #onIncrementClick = (evt: Event) => {
    evt.preventDefault();
    if (this.#maxCount >= 0) {
      if (this.element !== null) {
        const itemCountElement = <HTMLInputElement>this.element.querySelector('.item-count__number');
        itemCountElement.value = String(Number(itemCountElement.value) + 1);
      }
    }
    if (this._callback.incrementClick !== undefined) {
      this._callback.incrementClick();
    }
  };
}
