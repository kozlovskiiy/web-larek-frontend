import { ICardAction, IProduct, category } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { CategoryMap } from "../types";
import { categoryMap } from "../utils/constants";

export class Card extends Component<IProduct> {
  // – заголовок карточки.
  
  protected _title: HTMLElement; 
   // – цена товара.
	protected	_price: HTMLElement;
  //  – кнопка действия (например, добавить в корзину).
	protected  _button: HTMLButtonElement;
  // – порядковый номер (необязательно).
	protected  _index: HTMLElement;
// Принимает контейнер (HTMLElement) и объект ICardAction с параметрами:
  constructor (_container: HTMLElement, action?: ICardAction) {
    super(_container)
    this._title = ensureElement<HTMLElement>('.card__title');
    this._price = ensureElement<HTMLElement>('.card__price');
    this._button = ensureElement<HTMLButtonElement>('.button');
    this._index = _container.querySelector('.basket__item-index');
    if (action) {
      this._button.addEventListener('click', () => action.onClick);
    }
  }

  // устанавливает порядковый номер.
  set index(value: string) {
    if (this._index) { 
      this.setText(value, '.basket__item-index');
     }
  } 
  // меняет текст кнопки
	set button(value: string){
    this.setText(value, '.button')
  }
	// устанавливает data-id у контейнера
  set id(value: string) {
    this._container.dataset.id = value;
  }
  // устанавливает цену (число или Бесценно). Если null, кнопка блокируется
  set price (price: string) {
    this.setText(price ? `${price} синапсов` : 'Бесценно', '.card__price');
		if (this._button) {
			this._button.disabled = !price;
		}
  }
	// устанавливает заголовок
  set title(value: string){
    this.setText(value, '.card__title')
  }
} 

export class CardOnPage extends Card {
  // – изображение товара.
  protected	_image: HTMLImageElement;
  // – категория товара.
	protected	_category: HTMLElement;

  constructor(_container: HTMLElement, action?: ICardAction) { 
    super(_container, action)
    this._image = ensureElement<HTMLImageElement>('.card__image', _container);
    this._category = ensureElement<HTMLElement>('.card__category', _container);
   }
// – устанавливает изображение, используя this.setImage().
   set image(src: string){
    this.setImage(this._image, src)
   } 
//  – устанавливает категорию, применяет класс через toggleClass().
	 set category(value: category) {
      this.setText(value, '.card__category');
      this.switchClass(this._category, categoryMap[value], true);
   }
}

export class FullCard extends CardOnPage {
  // – описание товара.
  protected	_description: HTMLElement;
  constructor(_container: HTMLElement, action?: ICardAction) { 
    super(_container, action)
    this._description = ensureElement<HTMLElement>('.card__text');
   }
// – устанавливает описание, используя this.setText().
   set description(value: string){
    this.setText(value, '.card__text')
   }
}