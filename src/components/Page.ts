import { IProduct } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component"
import { IEvents } from "./base/events";

export class Page extends Component<HTMLElement> {
 protected _basketCounter: HTMLElement;
 protected _catalog: HTMLElement;
 protected _pageWrapper: HTMLElement;
 protected _basket: HTMLElement;

constructor (_container: HTMLElement, protected events: IEvents) {
  super(_container)
  this._basketCounter = ensureElement<HTMLElement>('.header__basket-counter');
  this._catalog = ensureElement<HTMLElement>('.gallery');
  this._pageWrapper = ensureElement<HTMLElement>('.page__wrapper'); 
  this._basket = ensureElement<HTMLElement>('.header__basket')

  if (this._basket) {
    this._basket.addEventListener('click', () => this.events.emit('basket:open'));
}}
//  - установить значение счетчика
set basketCounter(count: number) {
  this.setText(count.toString(), '.header__basket-counter');
}
//установить содержимое каталога
set catalog(items: HTMLElement[]) {
  this._catalog.replaceChildren(...items)
}

// заблокировать / разблокировать прокрутку
set locked(value: boolean) {
  if (value) {
    this._pageWrapper.classList.add('page__wrapper_locked');
  } else {
    this._pageWrapper.classList.remove('page__wrapper_locked');
  }
}
}
