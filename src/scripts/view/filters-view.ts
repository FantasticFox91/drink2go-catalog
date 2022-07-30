import { createElement } from '../utils';

type FiltersViewCallBack = {
  filtersChange?(form: FormData): void;
  priceChange?: EventListener;
  searchChange?(value: string): void;
  resetClick?: () => void;
  resetSettingsClick?: () => void;
};

type filtersSetting = {
  countryFilter: string;
  degreeFilter: string;
  intenseFilter: string;
  isCaffein: boolean;
  isNewItem: boolean;
  isPopular: boolean;
  milkFilter: string;
};

const createFiltersTemplate = (settings: filtersSetting): string => {
  return `
  <form class="catalog__filters filters" action="https://echo.htmlacademy.ru" method="post">
  <fieldset class="filters__group">
  <legend class="filters__title">Поиск</legend>
<!-- Для отключения range дописать класс range--disabled-->
  <input class="filters__search" type="search" autocomplete="off" placeholder="Введите названия товара">
</fieldset>
  <fieldset class="filters__group">
    <legend class="filters__title filters__title--price">Цена</legend>
<!-- Для отключения range дописать класс range--disabled-->
    <div class="range" id="range">
      <div class="range__scale">
        <div class="range__bar">
          <button class="range__toggle range__toggle-min" type="button">
            <span class="visually-hidden">Изменить минимальную цену.</span>
          </button>
          <button class="range__toggle range__toggle-max" type="button">
            <span class="visually-hidden">Изменить максимальную цену.</span>
          </button>
        </div>
      </div>
    </div>
    <div class="range__wrapper-inputs">
      <label class="filters__label filters__label--min">
        <input class="range__input range__input--min" type="number" placeholder="0" min="0" name="min-price">
      </label>
      <label class="filters__label">
      <input class="range__input range__input--max" type="number" value="300" max="300" name="max-price">
      </label>
    </div>
    <input class="min visually-hidden" type="number" min="0">
    <input class="max visually-hidden" type="number" max="1000">
  </fieldset>
  <fieldset class="filters__group">
    <legend class="filters__title">Объем, мл</legend>
<!-- Для отключения range дописать класс range--disabled-->
    <div class="range" id="size-range">
      <div class="range__scale">
        <div class="range__bar">
          <button class="range__toggle range__toggle-min" type="button">
            <span class="visually-hidden">Изменить минимальный объем.</span>
          </button>
          <button class="range__toggle range__toggle-max" type="button">
            <span class="visually-hidden">Изменить максимальную цену.</span>
          </button>
        </div>
      </div>
    </div>
    <div class="range__wrapper-inputs">
      <label class="filters__label filters__label--min">
        <input class="range__input range__input--min range__input--size" type="number" placeholder="100" min="100" name="min-size">
      </label>
      <label class="filters__label">
      <input class="range__input range__input--max range__input--size" type="number" value="500" max="500" name="max-size">
      </label>
    </div>
  </fieldset>
  <fieldset class="filters__group">
    <legend class="filters__title">Наличие молока</legend>
    <ul class="filters__list">
      <li class="filters__item">
        <label class="control">
          <input class="control__input visually-hidden" type="radio" name="milk" value="any" 
          ${settings.milkFilter === 'any' ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Неважно</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="control">
          <input class="control__input visually-hidden" type="radio" name="milk" value="animal" 
          ${settings.milkFilter === 'animal' ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Только животное</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="control">
          <input class="control__input visually-hidden" type="radio" name="milk" value="grain" 
          ${settings.milkFilter === 'grain' ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Только растительное</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="control">
          <input class="control__input visually-hidden" type="radio" name="milk" value="none" 
          ${settings.milkFilter === 'none' ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Без молока</span>
        </label>
      </li>
    </ul>
  </fieldset>
  <fieldset class="filters__group">
    <legend class="filters__title">Страна произрастания</legend>
    <ul class="filters__list">
      <li class="filters__item">
        <label class="control control--checkbox">
          <input class="control__input visually-hidden" type="checkbox" name="country" value="Brazil"
          ${settings.countryFilter.includes('Brazil') ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Бразилия</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="control control--checkbox">
          <input class="control__input visually-hidden" type="checkbox" name="country" value="Ethiopia"
          ${settings.countryFilter.includes('Ethiopia') ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Эфиопия</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="control control--checkbox">
          <input class="control__input visually-hidden" type="checkbox" name="country" value="Columbia"
          ${settings.countryFilter.includes('Columbia') ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Колумбия</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="control control--checkbox">
          <input class="control__input visually-hidden" type="checkbox" name="country" value="Costa Rica"
          ${settings.countryFilter.includes('Costa Rica') ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Коста-Рика</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="control control--checkbox">
          <input class="control__input visually-hidden" type="checkbox" name="country" value="Peru"
          ${settings.countryFilter.includes('Peru') ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Перу</span>
        </label>
      </li>
    </ul>
  </fieldset>
  <fieldset class="filters__group">
    <legend class="filters__title">Степень обжарки</legend>
    <ul class="filters__list">
      <li class="filters__item">
        <label class="control control--checkbox">
          <input class="control__input visually-hidden" type="checkbox" name="degree" value="medium"
          ${settings.degreeFilter.includes('medium') ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Средняя</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="control control--checkbox">
          <input class="control__input visually-hidden" type="checkbox" name="degree" value="dark"
          ${settings.degreeFilter.includes('dark') ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Темная</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="control control--checkbox">
          <input class="control__input visually-hidden" type="checkbox" name="degree" value="light"
          ${settings.degreeFilter.includes('light') ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Светлая</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="control control--checkbox">
          <input class="control__input visually-hidden" type="checkbox" name="degree" value="none"
          ${settings.degreeFilter.includes('none') ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Без обжарки</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="control control--checkbox">
          <input class="control__input visually-hidden" type="checkbox" name="degree" value="strong"
          ${settings.degreeFilter.includes('strong') ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Сильная</span>
        </label>
      </li>
    </ul>
  </fieldset>
  <fieldset class="filters__group">
  <legend class="filters__title">Интенсивность вкуса</legend>
  <ul class="filters__list">
    <li class="filters__item">
      <label class="control control--checkbox">
        <input class="control__input visually-hidden" type="checkbox" name="intense" value="medium"
        ${settings.intenseFilter.includes('medium') ? 'checked' : ''}>
        <span class="control__mark"></span>
        <span class="control__label">Средний</span>
      </label>
    </li>
    <li class="filters__item">
      <label class="control control--checkbox">
        <input class="control__input visually-hidden" type="checkbox" name="intense" value="hard"
        ${settings.intenseFilter.includes('hard') ? 'checked' : ''}>
        <span class="control__mark"></span>
        <span class="control__label">Крепкий</span>
      </label>
    </li>
    <li class="filters__item">
      <label class="control control--checkbox">
        <input class="control__input visually-hidden" type="checkbox" name="intense" value="soft"
        ${settings.intenseFilter.includes('soft') ? 'checked' : ''}>
        <span class="control__mark"></span>
        <span class="control__label">Мягкий</span>
      </label>
    </li>
  </ul>
</fieldset>
  <fieldset class="filters__group filters__group--inline">
    <legend class="filters__title">Остальные фильтры</legend>
    <ul class="filters__list">
      <li class="filters__item">
        <label class="control control--checkbox">
          <input class="control__input visually-hidden" type="checkbox" name="popular"
          ${settings.isPopular ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Популярные</span>
        </label>
      </li>
      <li class="filters__item">
        <label class="control control--checkbox">
          <input class="control__input visually-hidden" type="checkbox" name="new"
          ${settings.isNewItem ? 'checked' : ''}>
          <span class="control__mark"></span>
          <span class="control__label">Новинки</span>
        </label>
      </li>
      <li class="filters__item">
      <label class="control control--checkbox">
        <input class="control__input visually-hidden" type="checkbox" name="caffein"
        ${settings.isCaffein ? 'checked' : ''}>
        <span class="control__mark"></span>
        <span class="control__label">Без кофеина</span>
      </label>
    </li>
    </ul>
  </fieldset>
  <button class="filters__button" type="reset">Сбросить фильтр</button>
  <button class="filters__button" type="button">Сбросить настройки</button>
</form>`;
};

export default class FiltersView {
  _callback: FiltersViewCallBack = {};
  protected _element: HTMLFormElement | null = null;
  #settings!: filtersSetting;

  get template() {
    return createFiltersTemplate(this.#settings);
  }

  get element() {
    if (!this._element) {
      this._element = <HTMLFormElement>createElement(this.template);
    }

    return this._element;
  }

  constructor(settings: filtersSetting) {
    this.#settings = settings;
  }

  setChangeHandler = (callback: (formData: FormData) => void) => {
    this._callback.filtersChange = callback;
    if (this.element !== null) {
      this.element.addEventListener('change', this.#onChange);
    }
  };

  setPriceChangeHandler = (callback: () => void) => {
    this._callback.priceChange = callback;
  };

  setSearchHandler = (callback: ((input: string) => void) | (() => void)) => {
    this._callback.searchChange = callback;
    if (this.element !== null) {
      const searchElement = <HTMLElement>this.element.querySelector('.filters__search');
      searchElement.addEventListener('input', this.#onSearchInput);
    }
  };

  setResetButtonHandler = (callback: () => void) => {
    this._callback.resetClick = callback;
    if (this.element !== null) {
      const filtersButton = <HTMLElement>this.element.querySelector('.filters__button');
      filtersButton.addEventListener('click', this.#onResetButtonClick);
    }
  };

  setResetSettingButtonHandler = (callback: () => void) => {
    this._callback.resetSettingsClick = callback;
    if (this.element !== null) {
      const filtersButton = <HTMLElement>this.element.querySelector('.filters__button[type="button"]');
      filtersButton.addEventListener('click', this.#onResetSettingsButtonClick);
    }
  };

  #onChange = (evt: Event) => {
    evt.preventDefault();
    let countries: string | Blob = '';
    let degree: string | Blob = '';
    let intense: string | Blob = '';
    if (this.element !== null) {
      const countriesCheckboxes: NodeListOf<HTMLInputElement> = this.element.querySelectorAll(
        'input[name=country]:checked'
      );
      const degreeCheckboxes: NodeListOf<HTMLInputElement> = this.element.querySelectorAll(
        'input[name=degree]:checked'
      );
      const intenseCheckboxes: NodeListOf<HTMLInputElement> = this.element.querySelectorAll(
        'input[name=intense]:checked'
      );
      countriesCheckboxes.forEach((element) => {
        countries += element.value;
      });
      degreeCheckboxes.forEach((element) => {
        degree += element.value;
      });
      intenseCheckboxes.forEach((element) => {
        intense += element.value;
      });
    }
    const form = new FormData(this.element);
    form.append('countries', countries);
    form.append('degrees', degree);
    form.append('intenses', intense);
    if (this._callback.filtersChange !== undefined) {
      this._callback.filtersChange(form);
    }
  };

  #onSearchInput = (evt: Event) => {
    evt.preventDefault();
    if (this.element !== null) {
      const searchElement = <HTMLInputElement>this.element.querySelector('.filters__search');
      const input = searchElement.value || 'any';
      if (this._callback.searchChange !== undefined) {
        this._callback.searchChange(input);
      }
    }
  };

  #onResetButtonClick = () => {
    if (this._callback.resetClick !== undefined) {
      this._callback.resetClick();
    }
  };

  #onResetSettingsButtonClick = () => {
    if (this._callback.resetSettingsClick !== undefined) {
      this._callback.resetSettingsClick();
    }
  };
}
