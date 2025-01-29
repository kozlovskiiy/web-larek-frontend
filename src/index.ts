import { Contacts } from './components/Contacts';
import { AppState } from './components/AppState';
import { Basket } from './components/Basket';
import { LarekApi } from './components/LarekApi';
import { Modal } from './components/Modal';
import { Page } from './components/Page';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Order } from './components/Order';
import { Success } from './components/Success';

const body = ensureElement<HTMLElement>('body');
const modalContainer = ensureElement<HTMLElement>('.modal__container')

const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog'); //Каталог карточек
const productPreviewTemplate =
	ensureElement<HTMLTemplateElement>('#card-preview'); //Предпросмотр продукта
const basketItemTemplate = ensureElement<HTMLTemplateElement>('#card-basket'); //Элементы корзины
const basketModalTemplate = ensureElement<HTMLTemplateElement>('#basket'); //Модальное окно корзины
const orderModalTemplate = ensureElement<HTMLTemplateElement>('#order'); //Модальное окно заказа
const contactsModalTemplate = ensureElement<HTMLTemplateElement>('#contacts'); // Модальное окно контактов
const successModalTemplate = ensureElement<HTMLTemplateElement>('#success'); //Модальное окно успешного заказа

const events = new EventEmitter()

const api = new LarekApi(API_URL, CDN_URL)

const appData = new AppState(events)

const page = new Page (body, events);

const modal = new Modal(modalContainer, events)

const basket = new Basket (cloneTemplate<HTMLTemplateElement>(basketItemTemplate), events);

const contacts = new Contacts(cloneTemplate<HTMLTemplateElement>(contactsModalTemplate), events);

const order = new Order(cloneTemplate<HTMLFormElement>(orderModalTemplate), events);

const success = new Success(cloneTemplate<HTMLDivElement>(successModalTemplate), events, {
	onClick: () => {
		modal.close()
	}
})

