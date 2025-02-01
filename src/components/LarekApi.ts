import { IOrder, IPage, IProduct } from "../types";
import { Api, ApiListResponse } from "./base/api";

export class LarekApi extends Api {
  protected _cdn: string;
  constructor (baseUrl: string, cdn: string, options?: RequestInit) {
    super(baseUrl, options);
    this._cdn = cdn;
  }

	getProducts(): Promise<IPage> {
		return this.get('/product')
			.then((data: ApiListResponse<IProduct>) => {
				return {
					items: data.items.map((item) => ({
						...item,
						image: this._cdn + item.image,
					})),
					total: data.total,
				};
			})
			.catch((err) => {
				console.error('Ошибка получения данных:', err);
				return { items: [], total: 0 };
			});
	}


	postOrder(order: IOrder) {
		return this.post('/order', order).then((data: IOrder) => data);
	}

}