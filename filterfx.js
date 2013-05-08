/**
 * filterfx <https://github.com/fryn/filterfx>
 * CSS filter sugar for Firefox
 * @author Frank Yan
 * @license MIT license
 *
 * Example:
 * element.style.filter =
 *   filterfx.opacity(.5).hueRotate(120).dropShadow(8, 8, 0, '#0bf');
 */

var filterfx = Object.freeze({
  grayscale: function(amount) {
    return this.append(
      '<feColorMatrix type="matrix" values="' + [
        (.2126 + .7874 * (1 - amount)), (.7152 - .7152 * (1 - amount)), (.0722 - .0722 * (1 - amount)), 0, 0,
        (.2126 - .2126 * (1 - amount)), (.7152 + .2848 * (1 - amount)), (.0722 - .0722 * (1 - amount)), 0, 0,
        (.2126 - .2126 * (1 - amount)), (.7152 - .7152 * (1 - amount)), (.0722 + .9278 * (1 - amount)), 0, 0,
                                     0,                              0,                              0, 1, 0
      ].join(' ') + '"/>'
    );
  },
  sepia: function(amount) {
    return this.append(
      '<feColorMatrix type="matrix" values="' + [
        (.393 + .607 * (1 - amount)), (.769 - .769 * (1 - amount)), (.189 - .189 * (1 - amount)), 0, 0,
        (.349 - .349 * (1 - amount)), (.686 + .314 * (1 - amount)), (.168 - .168 * (1 - amount)), 0, 0,
        (.272 - .272 * (1 - amount)), (.534 - .534 * (1 - amount)), (.131 + .869 * (1 - amount)), 0, 0,
                                   0,                            0,                            0, 1, 0
      ].join(' ') + '"/>'
    );
  },
  saturate: function(amount) {
    return this.append(
      '<feColorMatrix type="saturate" values="' + amount + '"/>'
    );
  },
  hueRotate: function(angle) {
    return this.append(
      '<feColorMatrix type="hueRotate" values="' + angle + '"/>'
    );
  },
  invert: function(amount) {
    return this.append(
      '<feComponentTransfer>' +
        '<feFuncR type="table" tableValues="' + amount + ' ' + (1 - amount) + '"/>' +
        '<feFuncG type="table" tableValues="' + amount + ' ' + (1 - amount) + '"/>' +
        '<feFuncB type="table" tableValues="' + amount + ' ' + (1 - amount) + '"/>' +
      '</feComponentTransfer>'
    );
  },
  opacity: function(amount) {
    return this.append(
      '<feComponentTransfer>' +
        '<feFuncA type="table" tableValues="0 ' + amount + '"/>' +
      '</feComponentTransfer>'
    );
  },
  brightness: function(amount) {
    return this.append(
      '<feComponentTransfer>' +
        '<feFuncR type="linear" slope="' + amount + '"/>' +
        '<feFuncG type="linear" slope="' + amount + '"/>' +
        '<feFuncB type="linear" slope="' + amount + '"/>' +
      '</feComponentTransfer>'
    );
  },
  contrast: function(amount) {
    return this.append(
      '<feComponentTransfer>' +
        '<feFuncR type="linear" slope="' + amount + '" intercept="' + (-.5 * amount + .5) + '"/>' +
        '<feFuncG type="linear" slope="' + amount + '" intercept="' + (-.5 * amount + .5) + '"/>' +
        '<feFuncB type="linear" slope="' + amount + '" intercept="' + (-.5 * amount + .5) + '"/>' +
      '</feComponentTransfer>'
    );
  },
  blur: function(radius) {
    return this.append(
      '<feGaussianBlur stdDeviation="' + radius + '"/>'
    );
  },
  dropShadow: function(offsetX, offsetY, radius, color) {
    return this.append(
      '<feOffset result="source"/>' +
      '<feGaussianBlur stdDeviation="' + radius + '"/>' +
      '<feOffset dx="' + offsetX + '" dy="' + offsetY + '" result="blur"/>' +
      '<feFlood flood-color="' + encodeURIComponent(color) + '"/>' +
      '<feComposite in2="blur" operator="in"/>' +
      '<feMerge>' +
        '<feMergeNode/>' +
        '<feMergeNode in="source"/>' +
      '</feMerge>'
    );
  },
  append: function(fragment) {
    return Object.create(this, { text: { value: this.text + fragment } });
  },
  text: '',
  toString: function() {
    return 'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg">' +
      '<filter id="filter">' + this.text + '</filter></svg>#filter\')';
  }
});
