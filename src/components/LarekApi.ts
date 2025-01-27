import { IOrder, IProduct } from "../types";
import { Api, ApiListResponse } from "./base/api";

export class LarekApi extends Api {
  protected _cdn: string;
  constructor (baseUrl: string, cdn: string, options?: RequestInit) {
    super(baseUrl, options);
    this._cdn = cdn;
  }

  getProducts() {
		return this.get('/product')
			.then((data: ApiListResponse<IProduct>) => {
				console.log('Данные получены:', data); 
				return data.items.map((item) => ({
					...item,
					image: this._cdn + item.image,
				}));
			})
			.catch((err) => {
				console.error('Ошибка получения данных:', err);
			});
	}

	postOrder(order: IOrder) {
		return this.post('/order', order).then((data: IOrder) => data);
	}

}