# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Типы данных
```
type price = number | null - цена в карточке товара(ее может и не быть)
```
```
type payment = 'cash' | 'card' - способы оплаты: карта или наличные
```

```
type category = - категории товаров
| 'другое'
| 'софт-скил'
| 'дополнительное'
| 'кнопка'
| 'хард-скил'; 
```
## Описание данных (интерфейсы)
### Интерфейс карточки товара IProduct
```
- id: string - id карточки товара
- title: string - название карточки товара
- category: category - категория товара (тип данных category)
- description: string - описание товара
- price: price - цена товара (тип данных price)
- image: string - изображение товара
- buyButton: string - кнопка "Купить"
```

### Интерфейс заказа IOrder
```
- payment: payment - способ оплаты
- mail: string - электронный адрес
- phone: string - телефон
- address: string - адрес
- total: number - итоговая сумма заказа
- items: string[] - массив товаров в заказе
```
### Интерфейс корзины IBasket
```
- items: iProduct[] - массив товаров в корзине
- total: price; - итоговая стоимость (если в корзину добавлены только товары из категории "Бесценно" - стоимость 0)
```

### Интерфейс результата заказа IOrderResult

```
- id: string - идентификатор заказа
- total: price - итоговая стоимость
```
### Интерфейс страницы IPage
```
- cards: IProduct[] - массив карточек товаров
- total: number - количество карточек
```
### Интерфейс валидации форм IValidationForm
```
- valid: boolean - валидация формы булевым значением
- errors: string[] сообщение/я об ошибке/ах
```
# Компоненты
Абстрактный класс Component принимает конструктором контейнер (DOM элемент). Содержит в себе базовые методы для работы с элементами в DOM:


* switchClass() - переключить класс 
* setText() - установить текст для элемента 
* setBlocked() -заблокировать/разблокировать элемент(к примеру кнопка, атрибут disabled) 
* setHidden() - скрыть элемент 
* setVisible() - показать элемент 
* setImage() - установить изображение 
* render() - возвращает HTML элемент 

# Классы
Все классы наследуются от базового класса component, что позволяет рендерить HTML элементы и работать с ними
## Класс Api

Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

### Методы:
```
'get' - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер

'post' - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется POST запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.
```
## Класс EventEmitter

Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий. Основные методы, реализуемые классом описаны интерфейсом IEvents:
```
'on' - подписка на событие
'emit' - инициализация события
'trigger' - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие
```
# Слой данных
## Класс AppState 
Хранит в себе все данные которые используются для работы приложения.
### Поля класса: 
```
_items - массив товаров
_basketItems - массив товаров в корзине
_userData - объект, который хранит в себе все данные пользователя для оформления заказа
_formErrors - поле которое хранит в себе ошибки валиации
preview - поле которое хранит в себе ID карточки которая открыта для просмотра
```
### Конструктор:
Конструктор принимает объект, с типом данных IProduct (интерфейс карточки товара), где необязательно использовать все свойста объекта.
### Сеттеры: 
```
	•	items() - обновляет список товаров и эмитит событие 'items:changed'. 
	•	userData() - обновляет данные пользователя и сразу проверяет корректность формы.
```
### Геттеры: 
```
	•	items() - возвращает массив всех товаров.
	•	userData() - возвращает объект с данными пользователя (email, phone, address, payment).
	•	basketItems() - возвращает массив товаров в корзине.
	•	totalBasketPrice() - считает общую стоимость товаров в корзине.
	•	countBasket() - возвращает количество товаров в корзине.
	•	formErrors() - возвращает объект с ошибками формы.
```
### Методы: 
```
	•	setPreview() - запоминает ID товара для предпросмотра и эмитит событие 'prepreview:change'.
	•	getBasketId() - возвращает массив ID всех товаров, находящихся в корзине.
	•	getItemById() - ищет и возвращает товар по его ID из общего списка товаров.
	•	addBasket() - добавляет товар в корзину по его ID и эмитит событие 'basket:change'.
	•	deleteBasket() - удаляет товар из корзины по его ID и эмитит событие 'basket:change'.
	•	clearBasket() - очищает корзину, удаляя все товары, и эмитит событие 'basket:change'.
	•	validateContact() - проверяет, заполнены ли контактные данные пользователя, записывает ошибки в formErrors и эмитит событие 'input:error'.
	•	clearOrder() - очищает контактные данные пользователя и эмитит событие 'input:error'.
	•	addOrderField() - обновляет одно из полей контактных данных пользователя, после чего запускает валидацию формы.
	•	hasProductInBasket() - проверяет, есть ли товар в корзине по его ID, и возвращает true или false.
	•	clearOrderData() - очищает контактные данные пользователя и ошибки формы, эмитит событие 'input:error'.
```

# Слой представления
## Класс Page
Класс для отрисовки главной страницы, хранит в себе ключевые элементы(Корзина, счетчик корзины, контейнер с карточками)

### Поля класса:
```
_basketCounter - счетчик товаров в корзине
_catalog - контейнер в котором лежат карточки
_pageWrapper - контейнер в котором лежит все содержимое контейнера
_basket - корзина
```
### Конструктор:
Через конструктор наполняются поля HTML элементами. На кнопку корзины вешается слушатель события по клику и если клик произошел - отправляется событие что корзина открыта.

### Сеттеры: 
```
counter() - установить значение счетчика
catalog() - установить содержимое каталога
locked() - заблокировать / разблокировать прокрутку
```
## Класс Basket
Класс для отрисовки внутренностей корзины. Наследуется от компонента с типом данных из интерфейса IOrderData (содержит в себе массив HTML элементов и общую стоимость).
### Поля класса
```
_items - поле для хранения товаров (HTMLElement)
_total: - поле для финальной стоимости (HTMLElement)
button: - поле для кнопки (HTMLElement)
```

### Конструктор 
Присваивает HTML элементы в поля, так же если есть кнопка - вешает на нее слушатель события по клику и эммитит событие basket: toOrder
### Сеттеры
```
items() - заполняет корзину товарами, либо устанавливает текст "Корзина пуста"
total() - устанавливает финальную стоимость товаров
```
## Класс Form 
Класс для работы с формами. Наследуется от Component и принимает обобщенный тип T, который определяет структуру данных формы.
### Поля класса
```
submitButton - кнопка отправки формы (HTMLButtonElement)
errorsElements - контейнер для отображения ошибок (HTMLElement)
```
### Конструктор

Принимает контейнер формы и объект для работы с событиями (IEvents). 

Инициализирует кнопку отправки формы и контейнер ошибок.
Добавляет слушатель события input на поля формы, который вызывает метод changesInForm(). 

Добавляет слушатель события submit, предотвращает стандартное поведение формы и эмитит событие <имя формы>:submit.
### Сеттеры 
```
valid(value: boolean) - активирует или блокирует кнопку отправки формы.
errors(value: string) - устанавливает текст ошибки в контейнер.
```
### Методы 
```
changesInForm(field, value) - отправляет событие 'orderInput:change' с именем измененного поля и его значением.

render() - Принимает объект состояния формы, устанавливает его значения в соответствующие элементы и возвращает контейнер формы.
``` 
## Класс Modal
Класс для управления модальным окном. Наследуется от Component с типом данных IModal (обязательно должен содержать content).
### Поля класса
```
closeButton - кнопка закрытия модального окна (HTMLButtonElement)
_content - контейнер для контента модального окна (HTMLElement)
```
### Конструктор
Принимает контейнер модального окна и объект событий (IEvents).

Инициализирует кнопку закрытия и контейнер контента.

Добавляет обработчик клика на кнопку закрытия, который вызывает close().

Добавляет обработчик клика на фон модального окна, который закрывает окно, если клик был именно по фону.

### Сеттеры
```
content(value: HTMLElement) - заменяет содержимое модального окна новым контентом.
```

### Методы
```
open() - открывает модальное окно и эмитит событие 'modal:open'.
close() - закрывает модальное окно, очищает контент и эмитит событие 'modal:close'.
render() - принимает объект `IModal`, передает его в родительский метод `render()`, открывает модальное окно и возвращает его контейнер.
```

## Класс Succes 
Класс для отображения информации об успешном выполнении заказа.
### Поля класса
```
_total - элемент, отображающий сумму списанных средств (HTMLElement)
closeBut - кнопка закрытия модального окна (HTMLButtonElement)
```
### Конструктор
Принимает контейнер (HTMLElement) и объект действий.

Находит элемент для отображения списанных средств.

Находит кнопку закрытия и добавляет обработчик события клика, если передан onClick.

### Сеттеры
```
total(value: string) - устанавливает текст "Списано {value} синапсов" в элемент totalAmount.
```

### Класс Card
Базовый класс для карточек товаров. Наследуется от Component с типом IProduct.
### Поля класса
```
	•	_title – заголовок карточки.
	•	_price – цена товара.
	•	_button – кнопка действия (например, добавить в корзину).
	•	_index – порядковый номер (необязательно).
```
### Конструктор
Принимает контейнер (HTMLElement) и объект ICardAction с параметрами:
```
	•	onClick – функция, вызываемая при клике.
	•	price – цена товара.
	•	title – заголовок товара.
	•	index – порядковый номер (необязательно).
```
Если передан onClick, он добавляется к кнопке или контейнеру.
### Сеттеры
```
	•	index – устанавливает порядковый номер.
	•	button – меняет текст кнопки.
	•	id – устанавливает data-id у контейнера.
	•	price – устанавливает цену (число или Бесценно). Если null, кнопка блокируется.
	•	title – устанавливает заголовок.
```
## Класс CardOnPage
Наследуется от Card, добавляет в него поля:

### Поля класса
```
	•	_image – изображение товара.
	•	_category – категория товара.
```
### Сеттеры
```
	image – устанавливает изображение, используя this.setImage().
	•	category – устанавливает категорию, применяет класс через toggleClass().
```

## Класс FullCard 
Наследуется от CardOnPage, добавляет:
### Поля класса
```
	•	_description – описание товара.
```
### Сеттеры
```
	•	description – устанавливает описание товара.
```

## Класс WebLarekApi
Расширяет базовый класс Api, предназначен для работы с товарами и заказами.
### Конструктор
Принимает параметры:
```
	•	baseUrl – базовый URL для API-запросов.
	•	cdn – URL для загрузки изображений товаров.
	•	options – необязательные настройки RequestInit для запросов.
  ```
### Методы
```
getProducts() – Получение списка товаров
	•	Делает GET-запрос на /product.
	•	Получает массив товаров типа IProduct.
	•	Добавляет cdn к полю image.
	•	Выводит данные или ошибку в консоль.
	•	Возвращает обновленный массив товаров.

postOrder(order: IOrderResponse) – Отправка заказа
	•	Делает POST-запрос на /order.
	•	Отправляет объект заказа типа IOrderResponse.
	•	Возвращает ответ сервера.
```

## Класс Order
Отвечает за выбор способа оплаты и ввод адреса. Наследуется от Form<IOrder>.
### Поля класса
```
	btnCash: HTMLButtonElement – кнопка выбора оплаты наличными.
	btnCard: HTMLButtonElement – кнопка выбора оплаты картой.
```
### Конструктор
Конструктор кладет в поля элементы DOM-кнопок и при нажатии отправляет событие о изменении в форме о изменении способа оплаты
### Сеттеры
```
payment() - установить способ оплаты (наличные или карта)  
address() - установить адрес доставки  
```
### Методы
```
disableButtons() - сбросить активные классы у кнопок оплаты  
clear() - очистить данные о способе оплаты и адресе  
```

## Класс Contacts
Класс для управления формой контактов, позволяет вводить телефон и email.
### Конструктор
Через конструктор передаёт форму и объект событий в родительский класс.
### Сеттеры
```
phone() - установить номер телефона  
email() - установить email  
```
### Методы
```
clear() - очистить телефон и email  
```




- basket:toOrder — событие, которое происходит при нажатии на кнопку «Оформить» в корзине. Как итог, открывается модальное окно с выбором способа оплаты и адреса, куда доставить товар.
- basket:toContacts — событие, происходящее при клике на кнопку «Оформить». После этого открывается модальное окно, в котором необходимо заполнять поля контактов.
- orderInput:change — событие, возникающее при вводе данных в форму заказа Order и контактов Contacts. С помощью данного события активируется валидация. + сохраняются значения из инпутов в поля объекта
- contacts:submit - событие отправки контактной информации при оформлении заказа
- order:success — событие, вызываемое успешным ответом сервера при оплате товара. Оно открывает модальное окно, информирующее об успешной оплате.
- input:error — событие, выполняющее проверку формы и возвращающее ошибки формы.
- modal:open - событие происходящее при нажатии на карточку товара для открытия её предпросмотра.
- modal:close — событие, происходящее при клике на кнопку закрытия, клике вне модального окна или по клавише Esc. Оно приводит к закрытию модального окна.
- items:changed — событие, которое происходит при изменении списка товаров и вызывает перерисовку списка товаров на странице.
- card:select — событие, инициируемое при клике на карточку товара. Получает данные о ней — объект конкретного товара.
- preview:change — событие, возникающее при передаче моделью новых данных. Оповещает View и приводит к отрисовке содержимого модального окна.
- basket: add — событие, инициированное при клике на кнопку «В корзину». Приводит к добавлению товара в корзину и перерисовке счётчика корзины на главной.
- basket:open — событие, запускаемое при клике на значок корзины. Приводит к открытию модального окна с выбранными товарами и итоговой ценой.
- basket:remove — событие, вызванное кликом на значок корзины внутри самой корзины. Вызывает перерисовку списка товаров и счётчика на главной странице.


### Поля класса
```
```
### Конструктор
### Сеттеры
```
```
### Геттеры
```
```
### Методы
```
```
