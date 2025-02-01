import { IAction, ISucces } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";


export class Success extends Component<ISucces> {
  // - элемент, отображающий сумму списанных средств (HTMLElement)
 protected _total: HTMLElement; 
  //  - кнопка закрытия модального окна (HTMLButtonElement)
 protected _closeButton: HTMLButtonElement;

  constructor (_container: HTMLElement, protected events: IEvents, action?: IAction) {
    super(_container)
    this._total = ensureElement<HTMLElement>('.order-success__description', this._container);
    this._closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this._container);
    
    if (action?.onClick) {
			this._closeButton.addEventListener('click', action.onClick);
		}
}
//  - устанавливает текст "Списано {value} синапсов" в элемент totalAmount.
set total(value: string){
  this.setText(`Списано ${value} синапсов`, '.order-success__description');
}

}