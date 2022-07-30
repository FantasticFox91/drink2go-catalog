import { Data, Item } from './data/items';

enum RenderPosition {
  BEFOREBEGIN = 'beforebegin',
  AFTERBEGIN = 'afterbegin',
  BEFOREEND = 'beforeend',
  AFTEREND = 'afterend',
}

enum SortType {
  DEFAULT = 'default',
  PRICE_DOWN = 'price-down',
  PRICE_UP = 'price-up',
  POPULAR = 'popular',
}

const MilkFilterType = {
  ANY: 'any',
  ANIMAL: 'animal',
  GRAIN: 'grain',
  NONE: 'none',
};

const milkFiltersList = {
  [MilkFilterType.ANY]: (items: Data) => items,
  [MilkFilterType.ANIMAL]: (items: Data) => items.filter(({ milkType }) => milkType === 'animal'),
  [MilkFilterType.GRAIN]: (items: Data) => items.filter(({ milkType }) => milkType === 'grain'),
  [MilkFilterType.NONE]: (items: Data) => items.filter(({ milkType }) => milkType === 'none'),
};

type basicClass = {
  element: Element;
  removeElement?: () => void;
};

const render = <T extends basicClass>(
  component: T,
  container: Element,
  place: InsertPosition = RenderPosition.BEFOREEND
) => {
  container.insertAdjacentElement(place, component.element);
};

const replace = <T extends basicClass>(newComponent: T, oldComponent: T) => {
  const newElement = newComponent.element;
  const oldElement = oldComponent.element;

  const parent = oldElement.parentElement;

  if (parent === null) {
    throw new Error("Parent element doesn't exist");
  }

  parent.replaceChild(newElement, oldElement);
};

const remove = <T extends basicClass>(component: T) => {
  if (component === null) {
    return;
  }

  component.element.remove();
  if (component.removeElement !== undefined) {
    component.removeElement();
  }
};

const createElement = (template: string): Element => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  const result = <Element>newElement.firstElementChild;
  return result;
};

const sortPriceUp = (itemA: Item, itemB: Item) => itemA.price - itemB.price;

const sortPriceDown = (itemA: Item, itemB: Item) => itemB.price - itemA.price;

const sortPopularDown = (itemA: Item, itemB: Item) => itemB.popularity - itemA.popularity;

const countryFilter = (filterType: FormDataEntryValue | string, items: Item[]) => {
  if (filterType === 'any') {
    return items;
  }
  const filterString = String(filterType);
  return items.filter(({ country }) => filterString.includes(country));
};

const priceFilter = (items: Item[], min: number, max: number) => {
  return items.filter(({ price }) => price >= min && price <= max);
};

const searchFilter = (items: Item[], input: string | File) => {
  if (input === 'any') {
    return items;
  }
  const inputString = String(input);
  return items.filter(({ name }) => name.toLowerCase().includes(inputString));
};

const sizeFilter = (items: Item[], min: number, max: number) => {
  return items.filter(({ size }) => size >= min && size <= max);
};

const degreeFilter = (filterType: FormDataEntryValue | string, items: Item[]) => {
  if (filterType === 'any') {
    return items;
  }
  const filterString = String(filterType);
  return items.filter(({ degree }) => filterString.includes(degree));
};

const intenseFilter = (filterType: FormDataEntryValue | string, items: Item[]) => {
  if (filterType === 'any') {
    return items;
  }
  const filterString = String(filterType);
  return items.filter(({ intense }) => filterString.includes(intense));
};

const popularFilter = (filterType: boolean | FormDataEntryValue, items: Item[]) =>
  filterType ? items.filter(({ popular }) => popular) : items;

const newFilter = (filterType: boolean | FormDataEntryValue, items: Item[]) =>
  filterType ? items.filter(({ newItem }) => newItem) : items;

const caffeinFilter = (filterType: boolean | FormDataEntryValue, items: Item[]) =>
  filterType ? items.filter(({ caffein }) => caffein) : items;

export {
  render,
  replace,
  remove,
  createElement,
  sortPriceUp,
  sortPriceDown,
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
  RenderPosition,
};
