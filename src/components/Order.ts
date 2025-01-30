import { IOrder } from "../types"
import { ensureElement } from "../utils/utils";
import { Form } from "./Form"
import { IEvents } from "./base/events";

export class Order extends Form<Partial<IOrder>> {
  // – кнопка выбора оплаты наличными.
  protected _btnCash: HTMLButtonElement;
  // – кнопка выбора оплаты картой.
	protected _btnCard: HTMLButtonElement;

  protected _address: HTMLInputElement;


// Конструктор кладет в поля элементы DOM-кнопок и при нажатии отправляет событие о изменении в форме о изменении способа оплаты
  constructor(_container: HTMLFormElement, protected events: IEvents) {
    super(_container, events) 
    this._btnCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this._container);
    this._btnCard = ensureElement<HTMLButtonElement>('button[name="card"]', this._container);
    this._address = ensureElement<HTMLInputElement>('input[name="address"]', this._container);

    this._btnCash.addEventListener('click', () => this.changesInForm('payment', 'cash'));
    this._btnCard.addEventListener('click', () => this.changesInForm('payment', 'card'));
}
// - установить способ оплаты (наличные или карта)  
set payment(value: string) { 
  this._btnCash.classList.toggle('button_alt-active', value === 'cash');
  this._btnCard.classList.toggle('button_alt-active', value === 'card');
}

//m- установить адрес доставки 
set address(value: string){
  this._address.value = value;
} 
// - сбросить активные классы у кнопок оплаты  
disableButtons() {
  this._btnCash.classList.remove('button_alt-active');
  this._btnCard.classList.remove('button_alt-active');
}
// - очистить данные о способе оплаты и адресе
clear() {
  this.disableButtons()
  this.address = '';
}
}