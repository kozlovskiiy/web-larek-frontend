import { IAction, ICardAction, price } from './types/index';
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
import { Card, CardOnPage, FullCard } from './components/Card';

const body = ensureElement<HTMLElement>('body');
const modalContainer = ensureElement<HTMLElement>('#modal-container')

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

const basket = new Basket (cloneTemplate<HTMLTemplateElement>(basketModalTemplate), events);

const contacts = new Contacts(cloneTemplate<HTMLFormElement>(contactsModalTemplate), events);

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
})

//  12. Слушаем событие (items:changed) и  в объекте appModelPage(который хранит в себе основные элементы страницы) в поле catalog(это сеттер который пушит карточки на страницу)  говорим: возьми все карточки которые сейчас лежит в appModel(в поле items) перебери их, и подставь в поля карточки данные из сервера. С помощью рендера карточка наполняется всеми остальными данными. Так же в объект карточки передается событие сard:selected и будет вызвано при клике на нее.(ПОДУМАТЬ КАК НАПОЛНЯТЬ КАРТОЧКУ СРАЗУ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)
events.on('items:changed', () => {
	page.catalog = appData.items.map((item: IProduct) => {
		const card = new CardOnPage(cloneTemplate<HTMLTemplateElement>(catalogCardTemplate), {
			onClick: () =>  events.emit('card:selected', item),
			price: item.price,
			title: item.title,
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

// 13. Слушаем событие когда модалка открыта. блокируем страницу(прокрутку)
events.on('modal:open', () => {
	page.locked = true;
})

// 14. Слушаем событие когда модалка закрыта. разблокируем страницу(прокрутку)
events.on('modal:close', () => {
	page.locked = false;
})

// 15. Слушаем событие когда карточка выбрана(card:selected) вызываем метод setPreview(в него передается ID карточки и отправляется событие prepreview:change)
events.on('card:selected', (item: IProduct) => {
	appData.setPreview(item)
})

// 16. Слушаем событие prepreview:change далее наполняем карточку описание с помощью класса сardInfo,провреяем лежит ли продукт в корзине. Далее есть функция onclick, которая меняет состояние кнопки. Если продукт лежит в корзине то кнопка будет "Удалить из корзины" иначе "В корзину". Так же отправляется событие basket:remove, basket:add в зависимости от состояния кнопки. (ТАК ЖЕ НЕ ПОНЯТНО ЗАЧЕМ МЫ ОПЯТЬ МЕНЯЕМ ЦЕНУ И ЗАГОЛОВОК КАРТОЧКИ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!)

events.on('preview:change', (item: IProduct) => {
	const itemInBasket = appData.hasProductInBasket(item.id)
	const fullCard = new FullCard(cloneTemplate<HTMLTemplateElement>(productPreviewTemplate), {
		onClick: () => {
			if (itemInBasket) {
				events.emit('basket:remove', item)
			} else {
				events.emit('basket:add', item)
			}
			modal.close()
			},
			price: item.price,
			title: item.title
		} as ICardAction)
		modal.render({
			content: fullCard.render({
			title: item.title,
			price: item.price,
			image: item.image,
			id: item.id,
			category: item.category,
			description: item.description,
			button:  itemInBasket ? 'Удалить из корзины' : 'В корзину' 
		})
})
})

// 18. Слушаем событие basket:change, меняем визуальный счетчик товаров в корзине, ставим финальную стоимость, перебираем карточки в корзине, реднерим их , вешаем слушатель в каждой карточке на удаление при клике. По итогу у нас корзина имеет актуальный массив карточек и счетчик.
events.on('basket:change', () => {
	page.basketCounter = appData.countBasket;
	basket.total = appData.totalBasketPrice;
	basket.items = appData.basketItems.map((item: IProduct, index) => {
		const card = new Card(cloneTemplate(basketItemTemplate), {
			onClick: () => events.emit('basket:remove', item),
			price: item.price,
			title: item.title,
	})
	
	return card.render({
		title: item.title,
		price: item.price,
		index: index + 1
	})
})
})


// 19. Слушаем событие basket:add, добавляем карточку в корзину и отправляем событие basket:change
events.on('basket:add', (item: IProduct) => {
	appData.addBasket(item.id)
})
// 20. Слушаем событие basket:remove, удаляем карточку в корзину и отправляем событие basket:change
events.on('basket:remove', (item: IProduct) => {
	appData.deleteBasket(item.id)
})


//21. Слушаем событие basket:open, открываем модалку корзины и рендерим содержимое корзины
events.on('basket:open', () => {
	modal.render({
		content: basket.render({}),
	});
});


// 22. Слушаем событие basket:toOrder, вызываем очистку всего, инпутов, полей в объекте, выводим сообщение о успешном заказе.

events.on('basket:toOrder', () => {
	order.clear()
	contacts.clear()
	modal.render({
		content: order.render({
		valid: false,
		errors: [],
		address: '',
		payment: null,
	})
})
})
// 23. Валидация слушает событие input:error, (Извлекает из объекта errors свойства payment, address, email и phone.
//  Проверяет валидность заказа (order) и контактной информации (contacts) на основе отсутствия ошибок в соответствующих полях.
//   Создает строку с ошибками для заказа и контактной информации, объединяя значения свойств address и payment (для заказа) и phone и email (для контактной информации) через точку с запятой (;).
//   Присваивает значение поля payment из модели приложения (appModel) свойству payment объекта order.)
// 24. Слушает событие orderInput:change (событие, возникающее при вводе данных в форму заказа Order и контактов Contacts. С помощью данного события активируется валидация.)
// 25. Слушает событие order:submit (отрисовываем страницу с вводом телефона и эмейла и сбрасываем значания в валидации)