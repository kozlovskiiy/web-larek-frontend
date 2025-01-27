import { payment } from './../types/index';
import { IProduct, IValidationForm, IBasket, IOrder, IUserInfo } from "../types"
import { IEvents } from "./base/events";

class AppState {
protected  _items: IProduct[] = [];
protected _basketItems: IBasket = { items: [], total: 0 }; 
protected _userData: IOrder = { payment: 'cash', mail: '', phone: '', address: '', total: 0, items: [] };
protected _formErrors: IValidationForm = { valid: true, errors: [] };
protected preview: string = '';

constructor(protected events: IEvents) {
}

set items(items: IProduct[]) {
  this._items = items;
  this.events.emit('items:changed'); 
}

set userData (data: IOrder){
  this.userData = data
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
}

set formErrors (data: IValidationForm) {
  this._formErrors.errors.push(data: IValidationForm)
}

get items() { return this._items; }
get userData() { return this._userData; }
get	basketItems() { return this._basketItems.items }

get totalBasketPrice(): number | null { 
    this.basketItems.forEach(item => {
    this._basketItems.total += item.price 
  }) 
  return this._basketItems.total
 } 

get countBasket() { return this.basketItems.length }
get formErrors() { return this._formErrors }
// - запоминает ID товара для предпросмотра и эмитит событие 'prepreview:change'.
setPreview(id: string) {
  this.preview = id;
  this.events.emit('preview:change');
}

// возвращает массив ID всех товаров, находящихся в корзине.
getBasketId() {
  return this.basketItems.map(item => item.id);
}

// - ищет и возвращает товар по его ID из общего списка товаров.
getItemById(id: string) {
  return this.items.find(item => item.id === id);
}

// - добавляет товар в корзину по его ID и эмитит событие 'basket:change'.
addBasket(id: string) {
  this._basketItems.items.push(this._items.find(item => item.id === id));
  this.events.emit('basket:change')
} 
// - удаляет товар из корзины по его ID и эмитит событие 'basket:change'.
deleteBasket(id: string) {
  this._basketItems.items = this.basketItems.filter(item => item.id !== id);
  this.events.emit('basket:change'); 
}
// - очищает корзину, удаляя все товары, и эмитит событие 'basket:change'.
clearBasket() {
  this._basketItems.items = [];
  this.events.emit('basket:change');
}

// - проверяет, заполнены ли контактные данные пользователя, записывает ошибки в formErrors и эмитит событие 'input:error'.
validateContact(): boolean {
  const errors: { [key: string]: string } = {};

  if (!this.userData.address) {
      errors.address = 'Необходимо указать адрес';
  }
  if (!this.userData.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
  }
  if (!this.userData.mail) {
      errors.email = 'Необходимо указать email';
  }
  if (!this.userData.phone) {
      errors.phone = 'Необходимо указать номер телефона';
  }

  this.formErrors = errors; // Обновляем объект ошибок
  this.events.emit('input:error', this.formErrors); // Генерируем событие

  return Object.keys(errors).length === 0; // Если ошибок нет, возвращаем true
}

// - очищает контактные данные пользователя и эмитит событие 'input:error'.
clearOrder() {
  this._userData = { payment: 'cash', mail: '', phone: '', address: '', total: 0, items: [] };
  this.events.emit('inpit:error')
} 

// - обновляет одно из полей контактных данных пользователя, после чего запускает валидацию формы.
addOrderField(field: keyof IUserInfo, value: string & payment) {
  this._userData[field] = value;
      ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
  ////// ВАЛИДАЦИЮ СДЕЛАТЬ
}

// - проверяет, есть ли товар в корзине по его ID, и возвращает true или false.
hasProductInBasket(id: string) {
  return this.basketItems.some(item => item.id === id);
}
}



