type Item = {
  id: number;
  name: string;
  description: string;
  country: string;
  isInCart: boolean;
  price: number;
  milkType: string;
  popularity: number;
  size: number;
  degree: string;
  intense: string;
  popular: boolean;
  newItem: boolean;
  caffein: boolean;
  countInCart: number;
};

type Data = Item[];

const ITEMS: Data = [
  {
    id: 1,
    name: 'Декаф Флэт Уайт',
    description: 'Кофе без кофеина из Эфиопии с натуральным фермерским молоком',
    country: 'Ethiopia',
    isInCart: false,
    price: 225,
    milkType: 'animal',
    popularity: 5,
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
    price: 150,
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
  {
    id: 3,
    name: 'Доппио',
    description: 'Кофе из Колумбии, двойная порция эспрессо',
    country: 'Columbia',
    isInCart: false,
    price: 200,
    milkType: 'none',
    popularity: 2,
    size: 80,
    degree: 'light',
    intense: 'soft',
    popular: false,
    newItem: true,
    caffein: true,
    countInCart: 0,
  },
  {
    id: 4,
    name: 'Латте Макиато',
    description: 'Кофе без кофеина из Коста-Рики с растительным кокосовым молоком',
    country: 'Costa Rica',
    isInCart: false,
    price: 170,
    milkType: 'grain',
    popularity: 3,
    size: 500,
    degree: 'none',
    intense: 'medium',
    popular: true,
    newItem: false,
    caffein: false,
    countInCart: 0,
  },
  {
    id: 5,
    name: 'Айриш',
    description: 'Двойной эспрессо с добавлением виски и взбитых сливок.',
    country: 'Peru',
    isInCart: false,
    price: 300,
    milkType: 'none',
    popularity: 4,
    size: 200,
    degree: 'strong',
    intense: 'hard',
    popular: true,
    newItem: false,
    caffein: true,
    countInCart: 0,
  },
  {
    id: 6,
    name: 'Мокко',
    description: 'Кофе из Бразилии шоколадный сироп, молоко и взбитые сливки в равных пропорциях',
    country: 'Brazil',
    isInCart: false,
    price: 225,
    milkType: 'animal',
    popularity: 0,
    size: 500,
    degree: 'light',
    intense: 'soft',
    popular: true,
    newItem: false,
    caffein: true,
    countInCart: 0,
  },
];

export { ITEMS, Data, Item };
