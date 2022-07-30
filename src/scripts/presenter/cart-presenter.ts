import CartView from '../view/cart-view';
import { render, replace } from '../utils';
import { Item } from '../data/items';
import ItemsModel from '../model/items-model';

export default class CartPresenter {
  #cartContainer: HTMLElement;
  #cartComponent: { element: HTMLElement } | null | CartView = null;
  #itemsModel: ItemsModel;

  constructor(cartContainer: HTMLElement, itemsModel: ItemsModel) {
    this.#cartContainer = cartContainer;
    this.#itemsModel = itemsModel;
    if (this.#itemsModel.addObserver !== undefined) {
      this.#itemsModel.addObserver(this.#handleModelEvent);
    }
  }

  get items(): number {
    let itemsCount = 0;
    if (this.#itemsModel !== null) {
      let items = this.#itemsModel.items;
      if (items !== undefined) {
        items = items.filter((item: Item) => item.isInCart);
        itemsCount = items.reduce((accumulator: number, object: Item) => {
          return accumulator + object.countInCart;
        }, 0);
      }
    }
    return itemsCount;
  }

  init = () => {
    const itemsInCart = this.items;
    const prevCartComponent = this.#cartComponent;
    this.#cartComponent = new CartView(itemsInCart);
    if (!prevCartComponent) {
      render(this.#cartComponent, this.#cartContainer);
      return;
    }
    if (this.#cartContainer.contains(prevCartComponent.element)) {
      replace(this.#cartComponent, prevCartComponent);
    }
  };

  #handleModelEvent = () => this.init();
}
