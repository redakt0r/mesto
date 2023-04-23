export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._items = items;
    this._renderer = renderer;
  }

  renderItems() {
    this._items.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
