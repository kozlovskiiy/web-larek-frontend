import { LarekApi } from './components/LarekApi';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement } from './utils/utils';


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

