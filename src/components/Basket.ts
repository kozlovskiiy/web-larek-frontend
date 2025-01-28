import { IBasket } from "../types";
import { createElement, ensureAllElements, ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Basket extends Component<IBasket> {
protected _items: HTMLElement;
protected _total: HTMLElement;
protected button?: HTMLButtonElement;

constructor (_container: HTMLElement, protected events: IEvents) {
  super(_container)
  this._items = ensureElement<HTMLElement>('.basket__list');
  this._total = ensureElement<HTMLElement>('.basket__price');
  this.button = ensureElement<HTMLButtonElement>('.basket__button');
  
  if (this.button) {
    this.button.addEventListener('click', () => this.events.emit('basket:toOrder'));
  }

  this.items = [];
}
 //заполняет корзину товарами, либо устанавливает текст "Корзина пуста"
 set items(items: HTMLElement[]) {
  if (items.length) {
    this._items.replaceChildren(...items);
    this.button.removeAttribute('disabled');
  } else {
    this._items.replaceChildren(
      createElement<HTMLElement>('p', { textContent: 'Корзина пуста' })
    );
    this.button.setAttribute('disabled', 'disabled');
  }
}
//устанавливает финальную стоимость товаров

set total(total: number) {
  this.setText(`${total} синапсов`, '.basket__price');
}

}