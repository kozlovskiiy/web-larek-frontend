import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Modal extends Component<HTMLElement> {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

//   Принимает контейнер модального окна и объект событий (IEvents).

// Инициализирует кнопку закрытия и контейнер контента.

// Добавляет обработчик клика на кнопку закрытия, который вызывает close().

// Добавляет обработчик клика на фон модального окна, который закрывает окно, если клик был именно по фону.

constructor (_container: HTMLElement, protected events: IEvents) {
  super(_container) 
  this._closeButton = ensureElement<HTMLButtonElement>('.modal__close');  
  this._content = ensureElement<HTMLElement>('.modal__content');

  this._closeButton.addEventListener('click', () => this.close());
  this._container.addEventListener('click', (event) => {
    if (event.target === this._container) {
      this.close();
    }
  });
}
// - заменяет содержимое модального окна новым контентом.
set content(value: HTMLElement) {
  this._content.replaceChildren(value)
}
// - открывает модальное окно и эмитит событие 'modal:open'.
open() {
  this._container.classList.add('modal_active');
  this.events.emit('modal:open');
}

// - закрывает модальное окно, очищает контент и эмитит событие 'modal:close'.
close() {
  this._container.classList.remove('modal_active');
  this.events.emit('modal: close');
}
// - принимает объект `IModal`, передает его в родительский метод `render()`, открывает модальное окно и возвращает его контейнер.
render(data: Partial<HTMLElement>): HTMLElement {
  super.render(data)
  this.open()
  return this._container;
}
}