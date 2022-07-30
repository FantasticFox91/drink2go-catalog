import '../sass/style.scss';
import ItemsModel from './model/items-model';
import CartPresenter from './presenter/cart-presenter';
import BoardPresenter from './presenter/board-presenter';

const siteHeaderElement = <HTMLElement>document.querySelector('.top-menu__nav');
const siteMainElement = <HTMLElement>document.querySelector('.catalog__container');

const itemsModel = new ItemsModel();
const cartPresenter = new CartPresenter(siteHeaderElement, itemsModel);
const boardPresenter = new BoardPresenter(siteMainElement, itemsModel);

itemsModel.init();
cartPresenter.init();
boardPresenter.init();
