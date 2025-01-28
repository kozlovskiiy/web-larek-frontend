import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Contacts extends Component<HTMLElement> {
  constructor (_container: HTMLElement, protected events: IEvents) {
    super(_container)
  }
//  - установить номер телефона атрибут name="phone"
set phone(phone: string) {
  ensureElement<HTMLInputElement>('input[name="phone"]').value = phone;
}
// - установить email атрбиту name="email"
set email(email: string) {
  ensureElement<HTMLInputElement>('input[name="email"]').value = email;
}

clear () {
  this.phone = '';  
  this.email = '';
}
}