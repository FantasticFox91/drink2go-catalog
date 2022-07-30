import { Item } from '../data/items';
import ItemsModel from '../model/items-model';
import { remove, render, replace } from '../utils';
import CardView from '../view/card-view';
import ItemsBoardView from '../view/items-board-view';

export default class CardPresenter {
  _itemsListContainer: ItemsBoardView;
  #itemsModel: ItemsModel;
  #item!: Item;
  #itemComponent!: CardView;
  #maxCount!: number;

  constructor(itemsListContainer: ItemsBoardView, itemsModel: ItemsModel) {
    this._itemsListContainer = itemsListContainer;
    this.#itemsModel = itemsModel;
  }

  init = (item: Item) => {
    this.#maxCount = this.#itemsModel.items.reduce((accumulator: number, object: Item) => {
      return accumulator + object.countInCart;
    }, 0);
    this.#item = item;
    const prevItemComponent = this.#itemComponent;
    this.#itemComponent = new CardView(this.#item, this.#maxCount);
    this.#itemComponent.setCardClickHandler(this.#onAddToCartClick);
    this.#itemComponent.setDecrementHandler(this.#onDecrementClick);
    this.#itemComponent.setIncrementHandler(this.#onIncrementClick);
    if (!prevItemComponent) {
      render(this.#itemComponent, this._itemsListContainer.element);
      return;
    }
    if (this._itemsListContainer.element !== null) {
      if (this._itemsListContainer.element.contains(prevItemComponent.element)) {
        replace<CardView>(this.#itemComponent, prevItemComponent);
      }
    }
    remove(prevItemComponent);
  };

  destroy = () => remove(this.#itemComponent);

  #onAddToCartClick = () => {
    const updatedItem = {
      ...this.#item,
      isInCart: !this.#item.isInCart,
      countInCart: 1,
    };
    if (this.#itemsModel.updateList !== undefined) {
      this.#itemsModel.updateList(updatedItem);
    }
  };

  #onDecrementClick = () => {
    const count = Number(this.#itemComponent.value.value);
    if (count === 0) {
      const updatedItem = {
        ...this.#item,
        isInCart: !this.#item.isInCart,
        countInCart: 0,
      };
      if (this.#itemsModel.updateList !== undefined) {
        return this.#itemsModel.updateList(updatedItem);
      }
    }
    const updatedItem = {
      ...this.#item,
      countInCart: count,
    };
    if (this.#itemsModel.updateList !== undefined) {
      return this.#itemsModel.updateList(updatedItem);
    }
  };

  #onIncrementClick = () => {
    const count = Number(this.#itemComponent.value.value);
    const itemsInCart = this.#itemsModel.items.reduce((accumulator, object) => {
      return accumulator + object.countInCart;
    }, 0);
    if (itemsInCart < 20) {
      const updatedItem = {
        ...this.#item,
        countInCart: count,
      };
      if (this.#itemsModel.updateList !== undefined) {
        return this.#itemsModel.updateList(updatedItem);
      }
    }
  };
}
