export type price = number | null
export type payment = 'cash' | 'card'
export type category =
 | 'другое'
 | 'софт-скил'
 | 'дополнительное'
 | 'кнопка'
 | 'хард-скил';

export interface IProduct {
  id: string;
  title: string;
  category: category;
  description: string;
  price: price;
  image: string;
  buyButton: string;
}

export interface IOrder{
  payment: payment;
  mail: string;
  phone: string;
  address: string;
  total: number;
  items: string[]
}

export interface IBasket {
  items: IProduct[];
  total: price;
}

export interface IPage {
  cards: IProduct[];
  total: number; 
}

export interface IOrderResult {
  id: string;
  total: price;
}

export interface IValidationForm {
	valid: boolean; 
	errors: string[]; 
}

export interface IUserInfo {
  payment: payment;
  address: string;
  mail: string;
  phone: number;
}
