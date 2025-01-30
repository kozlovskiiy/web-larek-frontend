export abstract class Component<T> {
  protected _container: HTMLElement;
  constructor(_container: HTMLElement) {
    this._container = _container;
  }

//- переключить класс
switchClass(element: HTMLElement, className: string, force?: boolean) {
    element.classList.toggle(className, force);
   }
//  - установить текст для элемента
setText(text: string, className?: string) {
  if (className) {
    this._container.querySelector(className).textContent = text;
    return
  }
  this._container.textContent = text;
}
// - заблокировать/разблокировать элемент(к примеру кнопка, атрибут disabled)
setBlocked(isBlocked: boolean, element: HTMLButtonElement) {
  element.disabled = isBlocked;
}
// - скрыть элемент
setHidden(element: HTMLElement) {
  element.style.display = 'none';
}

// - показать элемент
setVisible(element: HTMLElement) {
  element.style.display = 'block';
}
setImage(element: HTMLImageElement, src: string) {
  element.src = src
}
// - возвращает HTML элеме
 render(data: Partial<T>): HTMLElement {
  Object.assign(this as object, data ?? {});
  return this._container;
  }
}