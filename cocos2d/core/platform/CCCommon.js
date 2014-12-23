/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var cc = cc || {};
cc._tmp = cc._tmp || {};

/**
 * 提高JSB兼容性而添加的方法。cocos2d-html5不需要该方法
 * @function
 * @param {object} jsObj subclass 子类
 * @param {object} superclass 父类
 */
cc.associateWithNative = function (jsObj, superclass) {
};

/**
 * 键盘事件的key值map
 *
 * @constant
 * @type {Object}
 * @example
    cc.eventManager.addListener({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed:  function(keyCode, event){
            if (cc.KEY["a"] == keyCode) {
                cc.log("A is pressed");
            }
        }
    }, this);
 */
cc.KEY = {
    backspace:8,
    tab:9,
    enter:13,
    shift:16, // 应该用shift键代替
    ctrl:17, // 应该用ctrl键代替
    alt:18, // 应该用alt键代替
    pause:19,
    capslock:20,
    escape:27,
    pageup:33,
    pagedown:34,
    end:35,
    home:36,
    left:37,
    up:38,
    right:39,
    down:40,
    insert:45,
    Delete:46,
    0:48,
    1:49,
    2:50,
    3:51,
    4:52,
    5:53,
    6:54,
    7:55,
    8:56,
    9:57,
    a:65,
    b:66,
    c:67,
    d:68,
    e:69,
    f:70,
    g:71,
    h:72,
    i:73,
    j:74,
    k:75,
    l:76,
    m:77,
    n:78,
    o:79,
    p:80,
    q:81,
    r:82,
    s:83,
    t:84,
    u:85,
    v:86,
    w:87,
    x:88,
    y:89,
    z:90,
    num0:96,
    num1:97,
    num2:98,
    num3:99,
    num4:100,
    num5:101,
    num6:102,
    num7:103,
    num8:104,
    num9:105,
    '*':106,
    '+':107,
    '-':109,
    'numdel':110,
    '/':111,
    f1:112, //f1-f12 dont work on ie
    f2:113,
    f3:114,
    f4:115,
    f5:116,
    f6:117,
    f7:118,
    f8:119,
    f9:120,
    f10:121,
    f11:122,
    f12:123,
    numlock:144,
    scrolllock:145,
    semicolon:186,
    ',':186,
    equal:187,
    '=':187,
    ';':188,
    comma:188,
    dash:189,
    '.':190,
    period:190,
    forwardslash:191,
    grave:192,
    '[':219,
    openbracket:219,
    ']':221,
    closebracket:221,
    backslash:220,
    quote:222,
    space:32
};

/**
 * 图片格式：JPG
 * @constant
 * @type {Number}
 */
cc.FMT_JPG = 0;

/**
 * 图片格式:PNG
 * @constant
 * @type {Number}
 */
cc.FMT_PNG = 1;

/**
 * 图片格式：TIFF
 * @constant
 * @type {Number}
 */
cc.FMT_TIFF = 2;

/**
 * 图片格式:RAWDATA
 * @constant
 * @type {Number}
 */
cc.FMT_RAWDATA = 3;

/**
 * 图片格式：WEBP
 * @constant
 * @type {Number}
 */
cc.FMT_WEBP = 4;

/**
 * 图片格式：未知
 * @constant
 * @type {Number}
 */
cc.FMT_UNKNOWN = 5;

/**
 * 从图片数据中获取图片格式
 * @function
 * @param {Array} imgData
 * @returns {Number}
 */
cc.getImageFormatByData = function (imgData) {

    // 假如这是png文件缓冲区
    if (imgData.length > 8 && imgData[0] == 0x89
        && imgData[1] == 0x50
        && imgData[2] == 0x4E
        && imgData[3] == 0x47
        && imgData[4] == 0x0D
        && imgData[5] == 0x0A
        && imgData[6] == 0x1A
        && imgData[7] == 0x0A) {
        return cc.FMT_PNG;
    }

    // 假如这是tiff文件缓冲区
    if (imgData.length > 2 && ((imgData[0] == 0x49 && imgData[1] == 0x49)
        || (imgData[0] == 0x4d && imgData[1] == 0x4d)
        || (imgData[0] == 0xff && imgData[1] == 0xd8))) {
        return cc.FMT_TIFF;
    }
	return cc.FMT_UNKNOWN;
};

/**
 * 另一种子类化方法:使用Google Closure
 * 下面的代码是从goo.base/goog.ingerits复制+粘贴
 * @function
 * @param {Function} childCtor
 * @param {Function} parentCtor
 */
cc.inherits = function (childCtor, parentCtor) {
    function tempCtor() {}
    tempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new tempCtor();
    childCtor.prototype.constructor = childCtor;

    //复制"static"方法,但是没有生成子类
// for( var i in parentCtor ) {
// childCtor[ i ] = parentCtor[ i ];
// }
};

/**
 * @deprecated  该方法v3.0之后抛弃，请使用cc.Class.extend 和 _super方法
 * @cc.Class.extend
 */
cc.base = function(me, opt_methodName, var_args) {
    var caller = arguments.callee.caller;
    if (caller.superClass_) {
        // 这是一个构造函数.调用父类的构造函数
        ret = caller.superClass_.constructor.apply( me, Array.prototype.slice.call(arguments, 1));
        return ret;
    }

    var args = Array.prototype.slice.call(arguments, 2);
    var foundCaller = false;
    for (var ctor = me.constructor; ctor; ctor = ctor.superClass_ && ctor.superClass_.constructor) {
        if (ctor.prototype[opt_methodName] === caller) {
            foundCaller = true;
        } else if (foundCaller) {
            return ctor.prototype[opt_methodName].apply(me, args);
        }
    }

    // 如果我们在原型链(prototype chain)中找不到caller，那么可能是下面的情况中的一个：
    // 1）caller是实例方法
    // 2）这个方法没有正确的被调用
    if (me[opt_methodName] === caller) {
        return me.constructor.prototype[opt_methodName].apply(me, args);
    } else {
        throw Error(
            'cc.base called from a method of one name ' +
                'to a method of a different name');
    }
};
