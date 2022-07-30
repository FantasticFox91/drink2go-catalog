import { ITEMS, Data, Item } from '../data/items';

export default class ItemsModel {
  #items!: Item[];
  #observers: Set<(event: Item, payload: boolean | Item) => void> = new Set();

  get items() {
    return this.#items;
  }

  init = () => {
    if (!localStorage.getItem('items')) {
      this.#items = ITEMS;
      return localStorage.setItem('items', JSON.stringify(this.#items));
    }
    if (localStorage.getItem('items') !== null) {
      const localStorageItems: Data[] | string = localStorage.getItem('items') || '';
      this.#items = JSON.parse(localStorageItems);
    }
  };

  updateList = (update: Item) => {
    const index = this.#items.findIndex((item) => item.id === update.id);
    if (index === -1) {
      throw new Error("Can't update unexisting item");
    }
    this.#items = [...this.#items.slice(0, index), update, ...this.#items.slice(index + 1)];
    localStorage.setItem('items', JSON.stringify(this.#items));
    const itemsInCart: number = this.items.reduce((accumulator: number, object: Item): number => {
      return accumulator + object.countInCart;
    }, 0);
    const isCartFull = itemsInCart >= 20;
    this._notify(update, isCartFull);
  };

  addObserver(observer: (updateItem: Item, isCartFull: boolean | Item) => void) {
    this.#observers.add(observer);
  }

  _notify(event: Item, payload: Item | boolean) {
    this.#observers.forEach((observer) => observer(event, payload));
  }
}
