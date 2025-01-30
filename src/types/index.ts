export type price = number | null
export type payment = 'cash' | 'card'
export type category =
 | 'другое'
 | 'софт-скил'
 | 'дополнительное'
 | 'кнопка'
 | 'хард-скил';


export type CategoryMap = {
   [Key in  category]: string;
  };


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
  items: IProduct[];
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

export interface IAction {
  onClick: () => void;
}

export interface ICardAction {
   onClick: (event: MouseEvent) => void;
   price: price;
   title: string;
   index?: number;
  }