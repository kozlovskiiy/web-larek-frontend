import { payment } from './../types/index';
import { IProduct, IValidationForm, IBasket, IOrder, IUserInfo } from "../types"
import { IEvents } from "./base/events";

export class AppState {
protected  _items: IProduct[] = [];
protected _basketItems: IBasket = { items: [], total: 0 }; 
protected _userData: IOrder = { payment: 'cash', mail: '', phone: '', address: '', total: 0, items: [] };
protected _formErrors: Partial<Record<keyof IOrder, string>>;
protected preview: string = '';

constructor(protected events: IEvents) {
}

set items(items: Partial<IProduct[]>) {
  this._items = items;
  this.events.emit('items:changed'); 
}

set userData (data: IOrder){
  this.userData = data
}


get items() { return this._items; }
get userData() { return this._userData; }
get	basketItems() { return this._basketItems.items }

get totalBasketPrice(): number | null { 
    return this.basketItems.reduce((acc, item) => acc + item.price, 0)
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
    const errors: typeof this._formErrors = {};
    if (!this.userData.address) {
     errors.address = 'Необходимо указать адрес';
    }
    if (!this.userData.payment) {
     errors.payment = 'Необходимо указать способ оплаты';
    }
    if (!this.userData.mail) {
     errors.mail = 'Необходимо указать email';
    }
    if (!this.userData.phone) {
     errors.phone = 'Необходимо указать номер телефона';
    }
    this._formErrors = errors;
    this.events.emit('input:error', this.formErrors);
    return Object.keys(errors).length === 0;
   }

// - очищает контактные данные пользователя и эмитит событие 'input:error'.
clearOrder() {
  this._userData = { payment: 'cash', mail: '', phone: '', address: '', total: 0, items: [] };
  this.events.emit('inpit:error')
} 

// - обновляет одно из полей контактных данных пользователя, после чего запускает валидацию формы.
addOrderField(field: keyof IUserInfo, value: string & payment) {
  this._userData[field] = value;
  this.validateContact()
}

// - проверяет, есть ли товар в корзине по его ID, и возвращает true или false.
hasProductInBasket(id: string) {
  return this.basketItems.some(item => item.id === id);
}
}



