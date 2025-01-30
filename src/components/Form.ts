import { IValidationForm } from "../types"
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Form<T> extends Component<IValidationForm> {
  // кнопка отправки формы (HTMLButtonElement)
  protected _submitButton: HTMLButtonElement; 
  //  - контейнер для отображения ошибок (HTMLElement)
  protected _errorsElements: HTMLElement;
  // Принимает контейнер формы и объект для работы с событиями (IEvents).

// Инициализирует кнопку отправки формы и контейнер ошибок. Добавляет слушатель события input на поля формы, который вызывает метод changesInForm().

// Добавляет слушатель события submit, предотвращает стандартное поведение формы и эмитит событие <имя формы>:submit.
  constructor (protected _container: HTMLFormElement, protected events: IEvents) {
    super(_container)
    this._submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this._container);
    this._errorsElements = ensureElement<HTMLElement>('.form__errors', this._container);
    
    this._container.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement
      const field = target.name as keyof T
      const value = target.value
      this.changesInForm(field, value)
    })

    this._container.addEventListener('submit', (event) => {
      event.preventDefault()
      this.events.emit(`${this._container.name}:submit`)
    })
  }
// - активирует или блокирует кнопку отправки формы.
 set valid(value: boolean) {
   this.setBlocked(!value, this._submitButton)
 }
  
  //- устанавливает текст ошибки в контейнер.
  set errors(value: string) {
    this._errorsElements.textContent = value
  }
//  - отправляет событие 'orderInput:change' с именем измененного поля и его значением.
  protected changesInForm(field: keyof T, value: string) {
    this.events.emit('orderInput:change', {
        field,
        value
    })
  }
// - Принимает объект состояния формы, устанавливает его значения в соответствующие элементы и возвращает контейнер формы.
  render(state: Partial<T> & IValidationForm) {
    Object.assign(this, state);
    super.render(state);
    return this._container;
  }
}