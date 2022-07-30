import { createElement } from '../utils';

const createSortTemplate = (): string => {
  return `
    <div class="products__sorting sorting">
      <form class="sorting__type" action="https://echo.htmlacademy.ru" method="post">
        <div class="select">
          <label class="select__heading" for="sort">Сортировка:</label>
          <select class="select__option" name="sort">
            <option value="default" data-sort-type="default">по умолчанию</option>
            <option value="price-down" data-sort-type="price-down">сначала дорогие</option>
            <option value="price-up" data-sort-type="price-up">сначала дешёвые</option>
            <option value="popular" data-sort-type="popular">высокий рейтинг</option>
          </select>
          </div>
        </div>
        <button class="visually-hidden" type="submit">Отсортировать продукты.</button>
      </form>
    </div>`;
};

export default class SortView {
  protected _element!: Element;
  _callback: { sortTypeChange?: (sortType: string) => void } = {};

  constructor() {
    this._callback = {};
  }

  get template() {
    return createSortTemplate();
  }

  get element(): Element {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  setSortTypeChangeHandler = (callback: ((sortType: string) => void) | (() => void)) => {
    this._callback.sortTypeChange = callback;
    if (this.element !== null) {
      this.element.addEventListener('change', this.#onSortClick);
    }
  };

  #onSortClick = (evt: Event): void => {
    evt.preventDefault();
    if (this.element !== null) {
      const select: HTMLSelectElement | null = this.element.querySelector('select');
      if (select !== null) {
        if (this._callback.sortTypeChange !== undefined) {
          this._callback.sortTypeChange(select.options[select.selectedIndex].value);
        }
      }
    }
  };
}
