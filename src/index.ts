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
import { IPage, IProduct } from './types';
import { Card, CardOnPage } from './components/Card';

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

// 11. В объекте api вызываем метод getProducts(), при успешном выполнении запроса кладем в поле объекта AppState.items массив карточек и отправляем событие ( items:changed — событие, которое происходит при изменении списка товаров и вызывает перерисовку списка товаров на странице.)
//return getProducts {total: 10, items: Array(10)}
api.getProducts().then((data: IPage) => {
	appData.items = data.items
	console.log(appData.items)
})

//  12. Слушаем событие (items:changed) и  в объекте appModelPage(который хранит в себе основные элементы страницы) в поле catalog(это сеттер который пушит карточки на страницу)  говорим: возьми все карточки которые сейчас лежит в appModel(в поле items) перебери их, и подставь в поля карточки данные из сервера. С помощью рендера карточка наполняется всеми остальными данными. Так же в объект карточки передается событие сard:selected и будет вызвано при клике на нее.(ПОДУМАТЬ КАК НАПОЛНЯТЬ КАРТОЧКУ СРАЗУ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)
events.on('items:changed', () => {
	page.catalog = appData.items.map((item: IProduct) => {
		const card = new CardOnPage(cloneTemplate<HTMLTemplateElement>(catalogCardTemplate), {
			onClick: () => {
				events.emit('card:selected', item)
			},
			price: item.price,
			title: item.title
		});
		return card.render({
			title: item.title,
			price: item.price,
			image: item.image,
			id: item.id,
			category: item.category
		})
	})
})

