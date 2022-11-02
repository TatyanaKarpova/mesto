export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  addItemUp(element) {
    this._container.prepend(element);
  }

  addItem(items) {
    this._container.append(items);
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}