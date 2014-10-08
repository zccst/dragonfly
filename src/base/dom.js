/**
 * DOM操作
 *
 * @ignore
 * @author Ricky
 */
define(function(require) {
    var _ = require('underscore').noConflict(),
        $dom = require('dollardom'),
        count = 0;

    /**
     * DOM操作
     *
     * @class dom
     * @extends base
     * @singleton
     */
    var dom = {};

    /**
     * 生成guid
     *
     * @return {String} guid
     */
    dom.guid = function() {
        return 'DRAGONFLY' + count++;
    };

    /**
     * 获取单个元素
     *
     * @param {HTMLElement|String} elm 目标元素或id
     * @return {HTMLElement|null} 目标元素
     */
    dom.$ = function(elm) {
        if (!elm) {
            return null;
        }
        return _.isString(elm) ? document.getElementById(elm) : elm;
    };

    /**
     * 移除元素
     *
     * @param {HTMLElement|String} elm 目标元素或id
     */
    dom.remove = function(elm) {
        var parent = dom.$(elm).parentNode;
        if (parent) {
            parent.removeChild(elm);
        }
    };

    /**
     * 创建元素
     *
     * @param {String} selector 选择器
     * @param {HTMLDocument} [doc] 所在文档
     * @return {HTMLElement} 元素
     *
     *     @example
     *     dom.create('div');
     *     dom.create('div#a');
     *     dom.create('div.b');
     *     dom.create('div#a.b');
     *     dom.create('div#a.b.c');
     */
    dom.create = $dom.create;

    /**
     * 获取元素集合
     *
     * @param {String} [selector] 选择器
     * @param {HTMLDocument} [doc] 所在文档
     * @return {HTMLElement[]} 元素集合
     *
     *     @example
     *     dom.get();
     *     dom.get('#a');
     *     dom.get('#a.b');
     *     dom.get('div p');
     *     dom.get('div > p');
     *     dom.get('div ~ p');
     *     dom.get('div + p');
     */
    dom.get = $dom.get;

    /**
     * 获取紧邻的祖先结点
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String} [selector] 选择器
     * @return {HTMLElement|null} 祖先结点
     *
     *     @example
     *     dom.parent(element);
     *     dom.parent(element, 'ul');
     */
    dom.parent = $dom.ancestor;

    /**
     * 获取子孙结点
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String} [selector] 选择器
     * @return {HTMLElement[]} 子孙结点
     *
     *     @example
     *     dom.children(element);
     *     dom.children(element, 'div.tabs > ul ~ .tab');
     */
    dom.children = $dom.descendants;

    /**
     * 获取第一个子节点
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String} [selector] 选择器
     * @return {HTMLElement|null} 第一个子节点
     *
     *     @example
     *     dom.first(element);
     *     dom.first(element, 'li');
     */
    dom.first = $dom.first;

    /**
     * 获取最后一个子节点
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String} [selector] 选择器
     * @return {HTMLElement|null} 最后一个子节点
     *
     *     @example
     *     dom.last(element);
     *     dom.last(element, 'li');
     */
    dom.last = $dom.last;

    /**
     * 获取下一个兄弟节点
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String} [selector] 选择器
     * @return {HTMLElement|null} 下一个兄弟节点
     *
     *     @example
     *     dom.next(element);
     *     dom.next(element, 'li');
     */
    dom.next = $dom.next;

    /**
     * 获取前一个兄弟节点
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String} [selector] 选择器
     * @return {HTMLElement|null} 前一个兄弟节点
     *
     *     @example
     *     dom.prev(element);
     *     dom.prev(element, 'li');
     */
    dom.prev = $dom.previous;

    /**
     * 清空元素
     *
     * @param {HTMLElement} elm 目标元素
     */
    dom.empty = $dom.empty;

    /**
     * 获取/设置样式
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String|Object} property 属性名
     * @param {*} [value] 属性值
     * @return {*} 属性值
     *
     *     @example
     *     dom.css(element, 'background-color'); //get
     *     dom.css(element, 'background-color', '#ff0000'); //set
     *     dom.css(element, {'background-color': '#ff0000', color: '#ffff00', opacity: 0.5}); //set multiple
     */
    dom.css = $dom.style;

    /**
     * 获取/设置属性
     *
     * @param {HTMLElement} elm 目标元素
     * @param {String|Object} property 属性名
     * @param {*} [value] 属性值
     * @return {*} 属性值
     *
     *     @example
     *     dom.attr(element, 'name'); //get
     *     dom.attr(element, 'name', 'name'); //set
     *     dom.attr(element, {name: 'name', title: 'title'}); //set multiple
     */
    dom.attr = $dom.attr;

    /**
     * 获得/设置元素的位置
     *
     * @param {HTMLElement} elm 目标元素
     * @param {Object} pos 位置数据
     *
     *     @example
     *     dom.offset(element); //get
     *     dom.offset(element, {top: 10, left: 30}); //set
     */
    dom.offset = function(element, pos) {
        var offset = {
            left: 0,
            top: 0
        }
        if(!element){
            return offset;
        }
        //如果传了pos，则认为是需要设置offset
        if(pos && pos !== void 0){
            dom.setOffset(element, pos);
        }
        var doc = element.ownerDocument,
            win,
            docElem;
        if(!doc){
            return;
        }
        docElem = doc.documentElement;
        if (typeof element.getBoundingClientRect !== 'undefined') {
            offset = element.getBoundingClientRect();
        }
        win = doc.defaultView;
        return {
            top: offset.top  + (win.pageYOffset || docElem.scrollTop)  - (docElem.clientTop  || 0),
            left: offset.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
        };
    };

    /**
     * 设置元素的位置
     *
     * @param {HTMLElement} element 目标元素
     * @param {Object} pos 位置数据
     *
     *     @example
     *     dom.setOffset(element, {top: 10, left: 30});
     */
    dom.setOffset = function(element, pos) {
        if(!element){
            return;
        }
        var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
            position = dom.css(element, "position"),
            props = {};
        if (position === "static") {
            element.style.position = "relative";
        }
        curOffset = dom.offset(element);
        curCSSTop = dom.css(element, "top");
        curCSSLeft = dom.css(element, "left");
        //position是经过计算得到的
        calculatePosition = (position === "absolute" || position === "fixed") && (_.indexOf([curCSSTop, curCSSLeft], "auto") > -1);
        if (calculatePosition) {
            curPosition = dom.position(element);
            curTop = curPosition.top;
            curLeft = curPosition.left;
        } else {
            curTop = parseFloat(curCSSTop) || 0;
            curLeft = parseFloat(curCSSLeft) || 0;
        }
        if (pos.top != null) {
            props.top = ((pos.top - curOffset.top) + curTop) + 'px';
        }
        if (pos.left != null) {
            props.left = ((pos.left - curOffset.left) + curLeft) + 'px';
        }
        dom.css(element, props);
    }

    /**
     * 获得相对于offsetParent的定位数据
     *
     * @param {HTMLElement} element 目标元素
     * @return {top: , left: }
     *
     *     @example
     *     dom.position(element);
     */
    dom.position = function(element) {
        if(!element){
            return;
        }
        var offsetParent, offset,
            parentOffset = {top: 0, left: 0};

        //如果元素的position是fixed，window是元素节点的offsetParent
        //parentOffset = {top:0, left: 0}
        if (dom.css(element, "position") === "fixed") {
            if (typeof element.getBoundingClientRect !== 'undefined') {
                offset = element.getBoundingClientRect();
            } else {
                offset = { top: 0, left: 0 };
            }
        } else {
            offsetParent = dom.offsetParent(element);

            offset = dom.offset(element);
            if(offsetParent.nodeName.toLowerCase() !== "html"){
                parentOffset = offsetParent.offset();
            }
            //增加border的宽度
            parentOffset.top  += dom.css(offsetParent, "borderTopWidth");
            parentOffset.left += dom.css(offsetParent, "borderLeftWidth");
        }

        //计算的时候需要减去父节点的offset和自身的margin
        return {
            top:  offset.top  - parentOffset.top - dom.css(element, "marginTop"),
            left: offset.left - parentOffset.left - dom.css(element, "marginLeft")
        };

    }

    /**
     * 获得最近的定位父节点
     *
     * @param {HTMLElement} element 目标元素
     * @return {HTMLElement || documentElement}
     *
     *     @example
     *     dom.offsetParent(element);
     */
    dom.offsetParent = function(element) {
        if(!element){
            return;
        }
        var offsetParent = element.offsetParent || window.document.documentElement;

        while (offsetParent && (offsetParent.nodeName.toLowerCase() !== "html" && dom.css( offsetParent, "position" ) === "static" ) ) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document.documentElement;;
    }

    /**
     * 获得最近的定位父节点
     *
     * @param {HTMLElement} element 父元素
     * @param {HTMLElement} child 子元素
     *
     *     @example
     *     dom.append(parent, child);
     */
    dom.append = function(element, child) {
        if(!element || !child){
            return;
        }
        element.appendChild(child);
    }

    return dom;
});
