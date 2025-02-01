import { IUserInfo } from "../types";
import { ensureElement } from "../utils/utils";
import { Form } from "./Form";
import { IEvents } from "./base/events";

export class Contacts extends Form<IUserInfo> {
  constructor (_container: HTMLFormElement, protected events: IEvents) {
    super(_container, events)
  }
//  - установить номер телефона атрибут name="phone"
set phone(value: string) {
  (this._container.elements.namedItem('phone') as HTMLInputElement).value =
    value;
}
// - установить email атрбиту name="email"
set email(value: string) {
  (this._container.elements.namedItem('email') as HTMLInputElement).value =
    value;
}

clear () {
  this.phone = '';  
  this.email = '';
}
}