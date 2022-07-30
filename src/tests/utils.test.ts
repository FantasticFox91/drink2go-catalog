import {
  sortPriceUp,
  sortPriceDown,
  sortPopularDown,
  countryFilter,
  priceFilter,
  searchFilter,
  sizeFilter,
  degreeFilter,
  intenseFilter,
  popularFilter,
  newFilter,
  caffeinFilter,
} from '../scripts/utils';

const itemsMock = [
  {
    id: 1,
    name: 'Декаф Флэт Уайт',
    description: 'Кофе без кофеина из Эфиопии с натуральным фермерским молоком',
    country: 'Ethiopia',
    isInCart: false,
    price: 150,
    milkType: 'animal',
    popularity: 2,
    size: 300,
    degree: 'dark',
    intense: 'medium',
    popular: false,
    newItem: true,
    caffein: false,
    countInCart: 0,
  },
  {
    id: 2,
    name: 'Эспрессо',
    description: 'Кофе из Бразилии, обладает крепким, насыщенным вкусом',
    country: 'Brazil',
    isInCart: false,
    price: 225,
    milkType: 'none',
    popularity: 5,
    size: 40,
    degree: 'medium',
    intense: 'hard',
    popular: false,
    newItem: true,
    caffein: true,
    countInCart: 0,
  },
];

test('Sorting two object by price up', () => {
  const sortedPriceUp = [...itemsMock].sort((a, b) => sortPriceUp(a, b));
  expect(sortedPriceUp).toStrictEqual([itemsMock[0], itemsMock[1]]);
});

test('Sorting two object by price down', () => {
  const sortedPriceDown = [...itemsMock].sort((a, b) => sortPriceDown(a, b));
  expect(sortedPriceDown).toStrictEqual([itemsMock[1], itemsMock[0]]);
});

test('Sorting two object by popular down', () => {
  const sortedPriceDown = [...itemsMock].sort((a, b) => sortPopularDown(a, b));
  expect(sortedPriceDown).toStrictEqual([itemsMock[1], itemsMock[0]]);
});

test('Filter by choosed country in case of any', () => {
  const country = 'any';
  const filteredByCountry = countryFilter(country, itemsMock);
  expect(filteredByCountry).toStrictEqual([itemsMock[0], itemsMock[1]]);
});

test('Filter by choosed country', () => {
  const country = 'Ethiopia';
  const filteredByCountry = countryFilter(country, itemsMock);
  expect(filteredByCountry).toStrictEqual([itemsMock[0]]);
});

test('Filter by choosed minimum and maximum price', () => {
  const minPrice = 100;
  const maxPrice = 200;
  const filteredByCountry = priceFilter(itemsMock, minPrice, maxPrice);
  expect(filteredByCountry).toStrictEqual([itemsMock[0]]);
});

test('Filter by search input', () => {
  const searchInputValue = 'флэт';
  const filteredBySearch = searchFilter(itemsMock, searchInputValue);
  expect(filteredBySearch).toStrictEqual([itemsMock[0]]);
});

test('Filter by search input in case of empty input', () => {
  const searchInputValue = 'any';
  const filteredBySearch = searchFilter(itemsMock, searchInputValue);
  expect(filteredBySearch).toStrictEqual([itemsMock[0], itemsMock[1]]);
});

test('Filter by size', () => {
  const minSize = 0;
  const maxSize = 100;
  const filteredBySearch = sizeFilter(itemsMock, minSize, maxSize);
  expect(filteredBySearch).toStrictEqual([itemsMock[1]]);
});

test('Filter by degree in case of any', () => {
  const degree = 'any';
  const filteredByDegree = degreeFilter(degree, itemsMock);
  expect(filteredByDegree).toStrictEqual([itemsMock[0], itemsMock[1]]);
});

test('Filter by degree', () => {
  const degree = 'dark';
  const filteredByDegree = degreeFilter(degree, itemsMock);
  expect(filteredByDegree).toStrictEqual([itemsMock[0]]);
});

test('Filter by intense', () => {
  const intense = 'hard';
  const filteredByIntense = intenseFilter(intense, itemsMock);
  expect(filteredByIntense).toStrictEqual([itemsMock[1]]);
});

test('Filter by intense in case of any', () => {
  const intense = 'any';
  const filteredByIntense = intenseFilter(intense, itemsMock);
  expect(filteredByIntense).toStrictEqual([itemsMock[0], itemsMock[1]]);
});

test('Show only popular items', () => {
  const isPopular = true;
  const filteredPopular = popularFilter(isPopular, itemsMock);
  expect(filteredPopular).toStrictEqual([]);
});

test('Show only new items', () => {
  const isNew = true;
  const filteredNew = newFilter(isNew, itemsMock);
  expect(filteredNew).toStrictEqual([itemsMock[0], itemsMock[1]]);
});

test('Show only items with caffein', () => {
  const isCaffein = true;
  const filteredCaffein = caffeinFilter(isCaffein, itemsMock);
  expect(filteredCaffein).toStrictEqual([itemsMock[1]]);
});
