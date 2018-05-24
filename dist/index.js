"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LazyLoadSrc = /** @class */ (function () {
    function LazyLoadSrc() {
        this.DATA_ATTR = '[data-src]';
        this.count = 0;
        this.max = 0;
        this.items = document.querySelectorAll(this.DATA_ATTR);
        if (!this.items.length)
            return;
        this.filterEmpty();
        this.addListener();
        this.callNext();
    }
    LazyLoadSrc.prototype.unbracket = function (str) {
        var matches = str.match(/^\[|\]$/g);
        var hasBrackets = (matches) ? matches.length === 2 : false;
        if (hasBrackets)
            str = str.replace(/^.|.$/g, '');
        return str;
    };
    LazyLoadSrc.prototype.filterEmpty = function () {
        var _this = this;
        var imgs = Array.from(this.items).filter(function (img) { return !!img.getAttribute(_this.unbracket(_this.DATA_ATTR)); });
        this.max = imgs.length;
    };
    LazyLoadSrc.prototype.addListener = function () {
        var _this = this;
        Array.from(this.items).forEach(function (item) { return item.addEventListener('onload', function () { return _this.lazyLoaded(); }); });
        Array.from(this.items).forEach(function (item) { return item.addEventListener('error', function () { return _this.lazyLoaded(); }); });
    };
    LazyLoadSrc.prototype.lazyLoaded = function () {
        this.count++;
        if (this.count < this.max)
            this.callNext();
    };
    LazyLoadSrc.prototype.callNext = function () {
        var img = this.items[this.count];
        img.src = img.dataset.src || '';
    };
    return LazyLoadSrc;
}());
exports.default = LazyLoadSrc;
