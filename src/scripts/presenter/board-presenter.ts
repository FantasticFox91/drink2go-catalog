import * as noUiSlider from 'nouislider';
import BoardView from '../view/board-view';
import ItemsListView from '../view/items-list-view';
import SortView from '../view/sort-view';
import ItemsBoardView from '../view/items-board-view';
import CardPresenter from './card-presenter';
import FiltersView from '../view/filters-view';
import NoItemsView from '../view/no-items-view';
import {
  render,
  sortPriceDown,
  sortPriceUp,
  sortPopularDown,
  SortType,
  MilkFilterType,
  milkFiltersList,
  countryFilter,
  priceFilter,
  searchFilter,
  sizeFilter,
  degreeFilter,
  intenseFilter,
  popularFilter,
  newFilter,
  caffeinFilter,
  remove,
  RenderPosition,
} from '../utils';
import { Data, Item } from '../data/items';
import ItemsModel from '../model/items-model';

type filtersSetting = {
  countryFilter: string;
  degreeFilter: string;
  intenseFilter: string;
  isCaffein: boolean;
  isNewItem: boolean;
  isPopular: boolean;
  milkFilter: string;
};

export default class BoardPresenter {
  #filtersSetting!: filtersSetting;
  #defaultFilters: filtersSetting = {
    countryFilter: 'any',
    degreeFilter: 'any',
    intenseFilter: 'any',
    isCaffein: false,
    isNewItem: false,
    isPopular: false,
    milkFilter: 'any',
  };
  #boardContainer: HTMLElement;
  #itemsModel: ItemsModel;
  #filtersComponent: FiltersView | null = null;
  #boardComponent = new BoardView();
  #sortComponent: SortView | null = null;
  #itemsListComponent = new ItemsListView();
  #itemsBoardComponent: ItemsBoardView = new ItemsBoardView();
  #itemPresenters = new Map();
  #noItemsComponent = new NoItemsView();
  #currentSortType: string = SortType.DEFAULT;
  #currentMilkFilter: FormDataEntryValue | string = MilkFilterType.ANY;
  #isPopular: FormDataEntryValue | boolean = false;
  #isNewItem: FormDataEntryValue | boolean = false;
  #isCaffein: FormDataEntryValue | boolean = false;
  #isCartFull: FormDataEntryValue | boolean = false;
  #currentCountryFilter: FormDataEntryValue | string = 'any';
  #curerntDegreeFilter: FormDataEntryValue | string = 'any';
  #curerntIntenseFilter: FormDataEntryValue | string = 'any';
  #currentSearchFilter: FormDataEntryValue | string = 'any';
  #currentPriceMin = 0;
  #currentPriceMax = 1000;
  #currentSizeMin = 40;
  #currentSizeMax = 500;
  #slider: { reset(): void } | null = null;
  #sizeSlider: { reset(): void } | null = null;
  #filters = localStorage.getItem('filters') || 'default';

  constructor(boardContainer: HTMLElement, itemsModel: ItemsModel) {
    this.#boardContainer = boardContainer;
    this.#itemsModel = itemsModel;
    if (this.#itemsModel.addObserver !== undefined) {
      this.#itemsModel.addObserver(this.#handleModelEvent);
    }
  }

  get items() {
    this.#clearBoard();
    const milkFilter = String(this.#currentMilkFilter);
    if (this.#itemsModel !== null) {
      const items = this.#itemsModel.items;
      let sortedItems = items.slice();
      sortedItems = searchFilter(sortedItems, this.#currentSearchFilter);
      sortedItems = milkFiltersList[milkFilter](sortedItems);
      sortedItems = countryFilter(this.#currentCountryFilter, sortedItems);
      sortedItems = degreeFilter(this.#curerntDegreeFilter, sortedItems);
      sortedItems = intenseFilter(this.#curerntIntenseFilter, sortedItems);
      sortedItems = popularFilter(this.#isPopular, sortedItems);
      sortedItems = newFilter(this.#isNewItem, sortedItems);
      sortedItems = caffeinFilter(this.#isCaffein, sortedItems);
      sortedItems = priceFilter(sortedItems, Number(this.#currentPriceMin), Number(this.#currentPriceMax));
      sortedItems = sizeFilter(sortedItems, Number(this.#currentSizeMin), Number(this.#currentSizeMax));

      switch (this.#currentSortType) {
        case SortType.PRICE_DOWN:
          return sortedItems.sort(sortPriceDown);
        case SortType.PRICE_UP:
          return sortedItems.sort(sortPriceUp);
        case SortType.POPULAR:
          return sortedItems.sort(sortPopularDown);
      }
      return sortedItems;
    }
  }

  init = () => {
    if (this.#filters !== 'default') {
      this.#filtersSetting = JSON.parse(this.#filters);
    } else {
      this.#filtersSetting = this.#defaultFilters;
    }
    this.#currentSortType = localStorage.getItem('sortType') || 'default';
    this.#currentPriceMax = Number(localStorage.getItem('price-max') || '300');
    this.#currentPriceMin = Number(localStorage.getItem('price-min') || '0');
    this.#currentSizeMin = Number(localStorage.getItem('size-min') || '40');
    this.#currentSizeMax = Number(localStorage.getItem('size-max') || '500');
    this.#setFilters(this.#filtersSetting);
    this.#renderList();
    const select = <HTMLSelectElement>document.querySelector('select');
    select.value = this.#currentSortType;
    const searchInputElement = document.querySelector('.filters__search') as HTMLElement | null;
    if (searchInputElement !== null) {
      searchInputElement.focus();
    }
  };

  #setFilters = (settings: filtersSetting) => {
    this.#currentMilkFilter = settings.milkFilter;
    this.#currentCountryFilter = settings.countryFilter;
    this.#curerntDegreeFilter = settings.degreeFilter;
    this.#curerntIntenseFilter = settings.intenseFilter;
    this.#isPopular = settings.isPopular;
    this.#isNewItem = settings.isNewItem;
    this.#isCaffein = settings.isCaffein;
  };

  initSlider = () => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const boardPresenter = this;
    const range = document.querySelector('#range') as noUiSlider.target;
    const sizeRange = document.querySelector('#size-range') as noUiSlider.target;
    const rangeValues = <HTMLInputElement[]>[
      document.querySelector('.range__input--min'),
      document.querySelector('.range__input--max'),
    ];
    const sizeRangeValues = <HTMLInputElement[]>[
      document.querySelector('.range__input--min.range__input--size'),
      document.querySelector('.range__input--max.range__input--size'),
    ];
    if (range !== null && sizeRange !== null && range !== null) {
      range.innerHTML = '';
      sizeRange.innerHTML = '';
      range.classList.toggle('range');
      sizeRange.classList.toggle('range');

      boardPresenter.#slider = noUiSlider.create(range, {
        start: [boardPresenter.#currentPriceMin, boardPresenter.#currentPriceMax],
        connect: [false, true, false],
        range: {
          min: [0],
          max: [300],
        },
      });

      rangeValues.forEach(function (input, handle) {
        if (input !== null) {
          input.addEventListener('change', function () {
            if (range.noUiSlider !== undefined) {
              range.noUiSlider.setHandle(handle, this.value);
            }
          });
        }
      });

      if (range.noUiSlider !== undefined) {
        range.noUiSlider.on('update', function (values, handle) {
          if (rangeValues[handle] !== null) {
            rangeValues[handle].value = String(Math.floor(Number(values[handle])));
            if (rangeValues[0] !== null && rangeValues[1] !== null) {
              boardPresenter.#currentPriceMin = +rangeValues[0].value;
              boardPresenter.#currentPriceMax = +rangeValues[1].value;
              localStorage.setItem('price-min', rangeValues[0].value);
              localStorage.setItem('price-max', rangeValues[1].value);
              boardPresenter.handlePriceChange();
            }
          }
        });
      }

      boardPresenter.#sizeSlider = noUiSlider.create(sizeRange, {
        start: [boardPresenter.#currentSizeMin, boardPresenter.#currentSizeMax],
        connect: [false, true, false],
        range: {
          min: [40],
          max: [500],
        },
      });

      sizeRangeValues.forEach(function (input, handle) {
        if (input !== null) {
          input.addEventListener('change', function () {
            if (sizeRange.noUiSlider !== undefined) {
              sizeRange.noUiSlider.setHandle(handle, this.value);
            }
          });
        }
      });

      if (sizeRange.noUiSlider !== undefined) {
        sizeRange.noUiSlider.on('update', function (values, handle) {
          sizeRangeValues[handle].value = String(Math.floor(Number(values[handle])));
          if (sizeRangeValues[0] !== null && sizeRangeValues[1] !== null) {
            boardPresenter.#currentSizeMin = +sizeRangeValues[0].value;
            boardPresenter.#currentSizeMax = +sizeRangeValues[1].value;
            localStorage.setItem('size-min', sizeRangeValues[0].value);
            localStorage.setItem('size-max', sizeRangeValues[1].value);
            boardPresenter.handleSizeChange();
          }
        });
      }
    }
  };

  #renderList = () => {
    this.#renderFilters(this.#filtersSetting);
    render(this.#boardComponent, this.#boardContainer);
    this._renderSort();
    this._renderItemsList();
  };

  _renderSort = () => {
    this.#sortComponent = new SortView();
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardComponent.element);
  };

  #renderFilters = (settings: filtersSetting, position: RenderPosition = RenderPosition.BEFOREEND) => {
    this.#filtersComponent = new FiltersView(settings);
    this.#filtersComponent.setChangeHandler(this.#handleFiltersChange);
    this.#filtersComponent.setSearchHandler(this.#handleSearchInput);
    this.#filtersComponent.setResetButtonHandler(this.#handleResetButtonClick);
    this.#filtersComponent.setResetSettingButtonHandler(this.#handleResetSettingsButtonClick);
    render(this.#filtersComponent, this.#boardContainer, position);
    this.initSlider();
  };

  #clearFilters = () => {
    if (this.#filtersComponent !== null) {
      remove(this.#filtersComponent);
    }
  };

  _renderItemsList = () => {
    render(this.#itemsListComponent, this.#boardComponent.element);
    render(this.#itemsBoardComponent, this.#itemsListComponent.element);
    if (this.items !== undefined) {
      if (this.items.length <= 0) {
        return render(this.#noItemsComponent, this.#itemsListComponent.element);
      }
      this.renderItems(this.items);
    }
  };

  renderItems = (items: Data) => items.forEach((item) => this.renderItem(item));

  renderItem = (item: Item) => {
    const itemPresenter = new CardPresenter(this.#itemsBoardComponent, this.#itemsModel);
    this.#itemPresenters.set(item.id, itemPresenter);
    itemPresenter.init(item);
  };

  #clearBoard = () => {
    this.#itemPresenters.forEach((presenter) => presenter.destroy());
    if (this.#noItemsComponent.element !== null) {
      this.#noItemsComponent.element.remove();
      this.#itemPresenters.clear();
    }
  };

  #handleModelEvent = (updateItem: Item, isCartFull: boolean | Item) => {
    const cardButtons = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.card__button');
    const cardPlusButtons = <NodeListOf<HTMLButtonElement>>document.querySelectorAll('.item-count__button--plus');
    if (isCartFull) {
      cardButtons.forEach((button) => (button.disabled = true));
      // this.#showModal();
      return cardPlusButtons.forEach((button) => (button.disabled = true));
    }
    cardButtons.forEach((button) => (button.disabled = false));
    cardPlusButtons.forEach((button) => (button.disabled = false));
    this.#itemPresenters.get(updateItem.id).init(updateItem);
  };

  #handleSortTypeChange = (sortType: string) => {
    this.#currentSortType = sortType;
    this.#clearBoard();
    this._renderItemsList();
    localStorage.setItem('sortType', this.#currentSortType);
  };

  #handleFiltersChange = (formData: FormData) => {
    this.#currentMilkFilter = formData.get('milk') || 'any';
    this.#isPopular = formData.get('popular') || false;
    this.#isNewItem = formData.get('new') || false;
    this.#isCaffein = formData.get('caffein') || false;
    this.#currentCountryFilter = formData.get('countries') || 'any';
    this.#curerntDegreeFilter = formData.get('degrees') || 'any';
    this.#curerntIntenseFilter = formData.get('intenses') || 'any';
    const filters = {
      milkFilter: this.#currentMilkFilter,
      isPopular: this.#isPopular,
      isNewItem: this.#isNewItem,
      isCaffein: this.#isCaffein,
      countryFilter: this.#currentCountryFilter,
      degreeFilter: this.#curerntDegreeFilter,
      intenseFilter: this.#curerntIntenseFilter,
    };
    localStorage.setItem('filters', JSON.stringify(filters));
    this.#clearBoard();
    this._renderItemsList();
  };

  #saveFilters = () => {
    const filters = {
      milkFilter: this.#currentMilkFilter,
      isPopular: this.#isPopular,
      isNewItem: this.#isNewItem,
      isCaffein: this.#isCaffein,
      countryFilter: this.#currentCountryFilter,
      degreeFilter: this.#curerntDegreeFilter,
      intenseFilter: this.#curerntIntenseFilter,
    };
    localStorage.setItem('filters', JSON.stringify(filters));
  };

  #handleSearchInput = (input: string) => {
    this.#currentSearchFilter = input.toLowerCase();
    this.#clearBoard();
    this._renderItemsList();
  };

  handlePriceChange = () => {
    this._renderItemsList();
  };

  #resetFilters = () => {
    this.#currentMilkFilter = 'any';
    this.#currentCountryFilter = 'any';
    this.#curerntDegreeFilter = 'any';
    this.#curerntIntenseFilter = 'any';
    this.#currentSearchFilter = 'any';
    this.#isPopular = false;
    this.#isNewItem = false;
    this.#isCaffein = false;
    this.#currentPriceMin = 0;
    this.#currentPriceMax = 300;
    this.#currentSizeMin = 40;
    this.#currentSizeMax = 500;
  };

  #handleResetButtonClick = () => {
    this.#resetFilters();
    this.#clearBoard();
    this.#clearFilters();
    this.#renderFilters(this.#defaultFilters, RenderPosition.AFTERBEGIN);
    this._renderItemsList();
    if (this.#slider !== null) {
      this.#slider.reset();
    }
    this.#saveFilters();
  };

  #handleResetSettingsButtonClick = () => {
    this.#resetFilters();
    this.#currentSortType = SortType.DEFAULT;
    localStorage.clear();
    if (this.#sortComponent !== null) {
      remove<SortView>(this.#sortComponent);
    }
    this.#clearBoard();
    this.#clearFilters();
    this.#renderList();
  };

  handleSizeChange = () => {
    this._renderItemsList();
  };
}
