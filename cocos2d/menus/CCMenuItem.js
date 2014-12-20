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

cc._globalFontSize = cc.ITEM_SIZE;
cc._globalFontName = "Arial";
cc._globalFontNameRelease = false;

/**
 * 子类化cc.MenuItem（或者其子类）来创建自定义cc.MenuItem对象
 * @class
 * @extends cc.Node
 * @param {function|String} 按钮回调
 * @param  {cc.Node} target
 */
cc.MenuItem = cc.Node.extend(/** @lends cc.MenuItem# */{
    _enabled: false,
    _target: null,
    _callback: null,
    _isSelected: false,
    _className: "MenuItem",

    /**
     * cc.MenuItem的构造函数
     * @param {function|String} 按钮回调
     * @param {cc.Node} target
     */
    ctor: function (callback, target) {
        var nodeP = cc.Node.prototype;
        nodeP.ctor.call(this);
        this._target = null;
        this._callback = null;
        this._isSelected = false;
        this._enabled = false;

        nodeP.setAnchorPoint.call(this, 0.5, 0.5);
        this._target = target || null;
        this._callback = callback || null;
        if (this._callback) {
            this._enabled = true;
        }
    },

    /**
     * 返回该菜单项是否是选中状态
     * @return {Boolean}
     */
    isSelected: function () {
        return this._isSelected;
    },

    /**
     * 仅用于jsbinding
     * @param value
     */
    setOpacityModifyRGB: function (value) {
    },

    /**
     * 仅用于jsbinding
     * @returns {boolean}
     */
    isOpacityModifyRGB: function () {
        return false;
    },

    /**
     * 设置菜单项的target和回调
     * @param {function|String} 按钮回调
     * @param {cc.Node} target
     * @v3.0以后已经弃用
     */
    setTarget: function (selector, rec) {
        this._target = rec;
        this._callback = selector;
    },

    /**
     * 返回该菜单项是否是启用状态
     * @return {Boolean}
     */
    isEnabled: function () {
        return this._enabled;
    },

    /**
     * 设置菜单项的启用/停用状态
     * @param {Boolean} enable 是否启用
     */
    setEnabled: function (enable) {
        this._enabled = enable;
    },

    /**
     * 使用回调创建一个菜单项
     * @param {function|String} 按钮回调
     * @param {cc.Node} target
     * @return {Boolean}
     */
    initWithCallback: function (callback, target) {
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this._target = target;
        this._callback = callback;
        this._enabled = true;
        this._isSelected = false;
        return true;
    },

    /**
     * return 返回菜单项的矩形区域
     * @return {cc.Rect}
     */
    rect: function () {
        var locPosition = this._position, locContentSize = this._contentSize, locAnchorPoint = this._anchorPoint;
        return cc.rect(locPosition.x - locContentSize.width * locAnchorPoint.x,
            locPosition.y - locContentSize.height * locAnchorPoint.y,
            locContentSize.width, locContentSize.height);
    },

    /**
     * 设置菜单项为选中状态，功能和setIsSelected(true)一样
     */
    selected: function () {
        this._isSelected = true;
    },

    /**
     * 设置菜单项为非选中状态，功能和setIsSelected(false)一样
     */
    unselected: function () {
        this._isSelected = false;
    },

    /**
     * 设置菜单项的回调函数
     * @param {function|String} 回调函数
     * @param {cc.Node} target
     */
    setCallback: function (callback, target) {
        this._target = target;
        this._callback = callback;
    },

    /**
     * 使用target调用按钮回调函数
     */
    activate: function () {
        if (this._enabled) {
            var locTarget = this._target, locCallback = this._callback;
            if (!locCallback)
                return;
            if (locTarget && cc.isString(locCallback)) {
                locTarget[locCallback](this);
            } else if (locTarget && cc.isFunction(locCallback)) {
                locCallback.call(locTarget, this);
            } else
                locCallback(this);
        }
    }
});

var _p = cc.MenuItem.prototype;

// 扩展属性
/** @expose */
_p.enabled;
cc.defineGetterSetter(_p, "enabled", _p.isEnabled, _p.setEnabled);

/**
 * 根据回调和target创建一个空的菜单项<br/>
 * 不建议使用此类，而应该用于继承它的子类
 * @v3.0以后已经废弃, 请使用new cc.MenuItem(callback,target)代替
 * @param {function|String} 回调函数
 * @param {cc.Node} target
 * @return {cc.MenuItem}
 */
cc.MenuItem.create = function (callback, target) {
    return new cc.MenuItem(callback, target);
};

/**
 *  所有支持cc.LabelProtocol协议的节点都可以添加。<br/>
 * 支持的节点：<br/>
 * - cc.BitmapFontAtlas<br/>
 * - cc.LabelAtlas<br/>
 * - cc.LabelTTF<br/>
 * @class
 * @extends cc.MenuItem
 * @param {cc.Node} 标签
 * @param {function|String} 回调函数
 * @param {cc.Node} target
 * @例子
 * var menuitemLabel = new cc.MenuItemLabel(label,selector,target);
 *
 * @property {String}   string          - 标签项的内容
 * @property {cc.Node}  label           - 标签项节点
 * @property {cc.Color} disabledColor   - 当标签不可用时的颜色
 */
cc.MenuItemLabel = cc.MenuItem.extend(/** @lends cc.MenuItemLabel# */{
    _disabledColor: null,
    _label: null,
    _orginalScale: 0,
    _colorBackup: null,

    /**
     * cc.MenuItemLabel的构造函数
     * @param {cc.Node} 附属标签
     * @param {function|String} 回调函数
     * @param {cc.Node} target
     */
    ctor: function (label, selector, target) {
        cc.MenuItem.prototype.ctor.call(this, selector, target);
        this._disabledColor = null;
        this._label = null;
        this._orginalScale = 0;
        this._colorBackup = null;

        if (label) {
            this._originalScale = 1.0;
            this._colorBackup = cc.color.WHITE;
            this._disabledColor = cc.color(126, 126, 126);
            this.setLabel(label);

            this.cascadeColor = true;
            this.cascadeOpacity = true;
        }
    },

    /**
     * 返回该菜单项不可用时的颜色
     * @return {cc.Color}
     */
    getDisabledColor: function () {
        return this._disabledColor;
    },

    /**
     * 设置该菜单项不可用时的颜色
     * @param {cc.Color} color
     */
    setDisabledColor: function (color) {
        this._disabledColor = color;
    },

    /**
     * 返回该菜单项的标签节点
     * @return {cc.Node}
     */
    getLabel: function () {
        return this._label;
    },

    /**
     * 设置该菜单项的标签节点
     * @param {cc.Node} label
     */
    setLabel: function (label) {
        if (label) {
            this.addChild(label);
            label.anchorX = 0;
            label.anchorY = 0;
            this.width = label.width;
            this.height = label.height;
        }

        if (this._label) {
            this.removeChild(this._label, true);
        }

        this._label = label;
    },

    /**
     * 设置该菜单项的启用/停用状态
     * @param {Boolean} 是否启用
     */
    setEnabled: function (enabled) {
        if (this._enabled != enabled) {
            var locLabel = this._label;
            if (!enabled) {
                this._colorBackup = locLabel.color;
                locLabel.color = this._disabledColor;
            } else {
                locLabel.color = this._colorBackup;
            }
        }
        cc.MenuItem.prototype.setEnabled.call(this, enabled);
    },

    /**
     * 设置该菜单项的透明度
     * @param {Number} 透明度，数值范围0-255
     */
    setOpacity: function (opacity) {
        this._label.opacity = opacity;
    },

    /**
     * 返回该菜单项的透明度
     * @return {Number}
     */
    getOpacity: function () {
        return this._label.opacity;
    },

    /**
     * 设置该菜单项的颜色值
     * @param {cc.Color} 颜色值
     */
    setColor: function (color) {
        this._label.color = color;
    },

    /**
     * 返回该菜单项的颜色
     * @return {cc.Color}
     */
    getColor: function () {
        return this._label.color;
    },

    /**
     * 通过标签节点初始化一个菜单项
     * @param {cc.Node} 标签节点
     * @param {function|String} 回调函数
     * @param {cc.Node} target
     * @return {Boolean}
     */
    initWithLabel: function (label, selector, target) {
        this.initWithCallback(selector, target);
        this._originalScale = 1.0;
        this._colorBackup = cc.color.WHITE;
        this._disabledColor = cc.color(126, 126, 126);
        this.setLabel(label);

        this.cascadeColor = true;
        this.cascadeOpacity = true;

        return true;
    },

    /**
     * 设置该菜单项显示的文本字符串
     * @param {String} 要显示的文本字符串
     */
    setString: function (label) {
        this._label.string = label;
        this.width = this._label.width;
        this.height = this._label.height;
    },

    /**
     * 返回该菜单项所显示的文本字符串
     * @returns {*|string|_p.string|ret.string|q.string|String}
     */
    getString: function () {
        return this._label.string;
    },

    /**
     * 激活菜单项
     */
    activate: function () {
        if (this._enabled) {
            this.stopAllActions();
            this.scale = this._originalScale;
            cc.MenuItem.prototype.activate.call(this);
        }
    },

    /**
     * 该菜单项已俾选中 (会触发回调)
     */
    selected: function () {
        if (this._enabled) {
            cc.MenuItem.prototype.selected.call(this);

            var action = this.getActionByTag(cc.ZOOM_ACTION_TAG);
            if (action)
                this.stopAction(action);
            else
                this._originalScale = this.scale;

            var zoomAction = cc.scaleTo(0.1, this._originalScale * 1.2);
            zoomAction.setTag(cc.ZOOM_ACTION_TAG);
            this.runAction(zoomAction);
        }
    },

    /**
     * 菜单项回到未选中状态
     */
    unselected: function () {
        if (this._enabled) {
            cc.MenuItem.prototype.unselected.call(this);
            this.stopActionByTag(cc.ZOOM_ACTION_TAG);
            var zoomAction = cc.scaleTo(0.1, this._originalScale);
            zoomAction.setTag(cc.ZOOM_ACTION_TAG);
            this.runAction(zoomAction);
        }
    }
});

var _p = cc.MenuItemLabel.prototype;

// 扩展属性
/** @expose */
_p.string;
cc.defineGetterSetter(_p, "string", _p.getString, _p.setString);
/** @expose */
_p.disabledColor;
cc.defineGetterSetter(_p, "disabledColor", _p.getDisabledColor, _p.setDisabledColor);
/** @expose */
_p.label;
cc.defineGetterSetter(_p, "label", _p.getLabel, _p.setLabel);

/**
 * @v3.0以后已经弃用 ,请使用 new cc.MenuItemLabel(label,selector,target)来代替
 * @param {cc.Node} 标签节点
 * @param {function|String|Null} [selector=] 回调函数
 * @param {cc.Node|Null} [target=]
 * @return {cc.MenuItemLabel}
 */
cc.MenuItemLabel.create = function (label, selector, target) {
    return new cc.MenuItemLabel(label, selector, target);
};

/**
 * 使用LabelAtlas来创建一个MenuItemLabel的助手类
 * @class
 * @继承自 cc.MenuItemLabel
 * @param {String} 显示的文本
 * @param {String} 字符映射文件
 * @param {Number} 文本项的宽度
 * @param {Number} 文本项的高度
 * @param {String} 映射文件的起始字符
 * @param {function|String|Null} 回调函数
 * @param {cc.Node|Null} target
 * @例子
 * var menuItem = new cc.MenuItemAtlasFont(param1,param2...);
 */
cc.MenuItemAtlasFont = cc.MenuItemLabel.extend(/** @lends cc.MenuItemAtlasFont# */{

    /**
     * cc.MenuItemAtlasFont的构造函数
     * @param {String} 显示的文本
     * @param {String} 字符映射文件
     * @param {Number} 文本项的宽度
     * @param {Number} 文本项的高度
     * @param {String} 映射文件的起始字符
     * @param {function|String|Null} 回调函数
     * @param {cc.Node|Null} target
     */
    ctor: function (value, charMapFile, itemWidth, itemHeight, startCharMap, callback, target) {
        var label;
        if (value && value.length > 0) {
            label = new cc.LabelAtlas(value, charMapFile, itemWidth, itemHeight, startCharMap);
        }

        cc.MenuItemLabel.prototype.ctor.call(this, label, callback, target);
    },

    /**
     * 通过字符串初始化一个cc.MenuItemAtlasFont
     * @param {String} 显示的文本
     * @param {String} 字符映射文件
     * @param {Number} 文本项的宽度
     * @param {Number} 文本项的高度
     * @param {String} 映射文件的起始字符
     * @param {function|String|Null} 回调函数
     * @param {cc.Node|Null} target
     * @return {Boolean}
     */
    initWithString: function (value, charMapFile, itemWidth, itemHeight, startCharMap, callback, target) {
        if (!value || value.length == 0)
            throw "cc.MenuItemAtlasFont.initWithString(): value should be non-null and its length should be greater than 0";

        var label = new cc.LabelAtlas();
        label.initWithString(value, charMapFile, itemWidth, itemHeight, startCharMap);
        if (this.initWithLabel(label, callback, target)) {
            // do something ?
        }
        return true;
    }
});

/**
 * 通过字符串创建一个菜单项
 * @v3.0以后已经弃用，请使用new cc.MenuItemAtlasFont()替代.
 * @param {String} 要显示的文本
 * @param {String} 字符映射文件
 * @param {Number} 文本项的宽度
 * @param {Number} 文本项的高度
 * @param {String} 映射文件的起始字符
 * @param {function|String|Null} [callback=null] 回调函数
 * @param {cc.Node|Null} [target=]
 * @return {cc.MenuItemAtlasFont}
 */
cc.MenuItemAtlasFont.create = function (value, charMapFile, itemWidth, itemHeight, startCharMap, callback, target) {
    return new cc.MenuItemAtlasFont(value, charMapFile, itemWidth, itemHeight, startCharMap, callback, target);
};

/**
 * 使用标签创建一个CCMenuItemLabel类的助手类
 * @class
 * @继承 cc.MenuItemLabel
 * @param {String} 菜单项显示的文本
 * @param {function|String} 回调函数
 * @param {cc.Node} target
 * @例子
 * var menuItem = new cc.MenuItemFont(value, callback, target);
 *
 * @property {Number}   fontSize    - 字体的大小
 * @property {String}   fontName    - 字体的名称
 */
cc.MenuItemFont = cc.MenuItemLabel.extend(/** @lends cc.MenuItemFont# */{
    _fontSize: null,
    _fontName: null,

    /**
     * cc.MenuItemFont的构造函数
     * @param {String} 菜单项显示的文本
     * @param {function|String} 回调函数
     * @param {cc.Node} target
     */
    ctor: function (value, callback, target) {
        var label;
        if (value && value.length > 0) {
            this._fontName = cc._globalFontName;
            this._fontSize = cc._globalFontSize;
            label = new cc.LabelTTF(value, this._fontName, this._fontSize);
        }
        else {
            this._fontSize = 0;
            this._fontName = "";
        }

        cc.MenuItemLabel.prototype.ctor.call(this, label, callback, target);
    },

    /**
     * 使用文本字符串初始化cc.MenuItemFont
     * @param {String} 菜单项显示的文本
     * @param {function|String} 回调函数
     * @param {cc.Node} target
     * @return {Boolean}
     */
    initWithString: function (value, callback, target) {
        if (!value || value.length == 0)
            throw "Value should be non-null and its length should be greater than 0";

        this._fontName = cc._globalFontName;
        this._fontSize = cc._globalFontSize;

        var label = new cc.LabelTTF(value, this._fontName, this._fontSize);
        if (this.initWithLabel(label, callback, target)) {
            // do something ?
        }
        return true;
    },

    /**
     * 设置该菜单项的字体尺寸
     * @param {Number} 尺寸
     */
    setFontSize: function (s) {
        this._fontSize = s;
        this._recreateLabel();
    },

    /**
     * 返回该菜单项的字体尺寸
     * @return {Number}
     */
    getFontSize: function () {
        return this._fontSize;
    },

    /**
     * 设置该菜单项的字体
     * @param {String} name 字体名
     */
    setFontName: function (name) {
        this._fontName = name;
        this._recreateLabel();
    },

    /**
     * 返回该菜单项的字体名称
     * @return {String}
     */
    getFontName: function () {
        return this._fontName;
    },

    _recreateLabel: function () {
        var label = new cc.LabelTTF(this._label.string, this._fontName, this._fontSize);
        this.setLabel(label);
    }
});

/**
 * 用于设置字体菜单项的字体尺寸的公用函数
 * @param {Number} 字体尺寸
 */
cc.MenuItemFont.setFontSize = function (fontSize) {
    cc._globalFontSize = fontSize;
};

/**
 * 用于获取字体菜单项的字体尺寸的公用函数
 * @return {Number}
 */
cc.MenuItemFont.fontSize = function () {
    return cc._globalFontSize;
};

/**
 * 用于设置字体菜单项的字体的公用函数
 * @param name 字体名
 */
cc.MenuItemFont.setFontName = function (name) {
    if (cc._globalFontNameRelease) {
        cc._globalFontName = '';
    }
    cc._globalFontName = name;
    cc._globalFontNameRelease = true;
};

var _p = cc.MenuItemFont.prototype;

// 扩展属性
/** @expose */
_p.fontSize;
cc.defineGetterSetter(_p, "fontSize", _p.getFontSize, _p.setFontSize);
/** @expose */
_p.fontName;
cc.defineGetterSetter(_p, "fontName", _p.getFontName, _p.setFontName);

/**
 * 用于获取字体菜单项的字体名的公用函数
 * @return {String}
 */
cc.MenuItemFont.fontName = function () {
    return cc._globalFontName;
};

/**
 * 通过文本字符串创建一个菜单项
 * @v3.0以后已经弃用, 请使用new construction 替代
 * @param {String} 要显示的文本字符串
 * @param {String|function|Null} callback 回调函数，可以是函数名或者函数实体
 * @param {cc.Node|Null} target 调用该回调函数的上下文
 * @return {cc.MenuItemFont}
 */
cc.MenuItemFont.create = function (value, callback, target) {
    return new cc.MenuItemFont(value, callback, target);
};

/**
 * CCMenuItemSprite接受所有CCNode<CCRGBAProtocol>对象作为其子项.<br/>
 * 其显示的图像有三种不同的状态:<br/>
 *   - 未选中时的图像<br/>
 *   - 选中时的图像<br/>
 *   - 不可用时的图像<br/>
 * @class
 * @继承 cc.MenuItem
 * @param {Image|Null} normalSprite 普通状态时的图像
 * @param {Image|Null} selectedSprite 选中状态时的图像
 * @param {Image|cc.Node|Null} three 不可用状态时的图像或者节点
 * @param {String|function|cc.Node|Null} four 回调函数的名字、实体或者目标节点
 * @param {String|function|Null} five 回调函数名或者实体函数
 *
 * @例子
 * var item = new cc.MenuItemSprite(normalImage)//通过一个精灵创建一个没有回调的菜单项
 * var item = new cc.MenuItemSprite(normalImage, selectedImage)//创建一个菜单项，当点击的时候没有任何操作
 * var item = new cc.MenuItemSprite(normalImage, SelectedImage, disabledImage)//同上, 但同时设置了不可用状态的图像
 * var item = new cc.MenuItemSprite(normalImage, SelectedImage, 'callback', targetNode)//创建一个菜单项，当点击的时候会调用targetNode.callback()
 * var item = new cc.MenuItemSprite(normalImage, SelectedImage, disabledImage, targetNode.callback, targetNode)
 * //同上, 但同时设置了不可用状态的图像, 并且传入了回到函数
 *
 * @property {cc.Sprite}    normalImage     - 普通状态时的精灵
 * @property {cc.Sprite}    selectedImage     - 选中状态时的精灵
 * @property {cc.Sprite}    disabledImage     - 不可用状态时的精灵
 */
cc.MenuItemSprite = cc.MenuItem.extend(/** @lends cc.MenuItemSprite# */{
    _normalImage: null,
    _selectedImage: null,
    _disabledImage: null,

    /**
     * cc.MenuItemSprite的构造函数
     * @param {Image|Null} normalSprite 普通状态时的精灵
     * @param {Image|Null} selectedSprite 选中状态时的精灵
     * @param {Image|cc.Node|Null} three 不可用状态时的精灵或者回调的目标节点
     * @param {String|function|cc.Node|Null} four 回调函数的名字、实体或者目标节点
     * @param {String|function|Null} five 回调函数名或者实体函数
     */
    ctor: function (normalSprite, selectedSprite, three, four, five) {
        cc.MenuItem.prototype.ctor.call(this);
        this._normalImage = null;
        this._selectedImage = null;
        this._disabledImage = null;

        if (selectedSprite !== undefined) {
            normalSprite = normalSprite;
            selectedSprite = selectedSprite;
            var disabledImage, target, callback;
            // 当你传入4个参数，five的值为undefined
            if (five !== undefined) {
                disabledImage = three;
                callback = four;
                target = five;
            } else if (four !== undefined && cc.isFunction(four)) {
                disabledImage = three;
                callback = four;
            } else if (four !== undefined && cc.isFunction(three)) {
                target = four;
                callback = three;
                disabledImage = new cc.Sprite(selectedSprite);
            } else if (three === undefined) {
                disabledImage = new cc.Sprite(selectedSprite);
            }
            this.initWithNormalSprite(normalSprite, selectedSprite, disabledImage, callback, target);
        }
    },

    /**
     * 返回正常状态时的图像(cc.Sprite)
     * @return {cc.Sprite}
     */
    getNormalImage: function () {
        return this._normalImage;
    },

    /**
     * 设置正常状态时的图像(cc.Sprite)
     * @param {cc.Sprite} normalImage
     */
    setNormalImage: function (normalImage) {
        if (this._normalImage == normalImage) {
            return;
        }
        if (normalImage) {
            this.addChild(normalImage, 0, cc.NORMAL_TAG);
            normalImage.anchorX = 0;
            normalImage.anchorY = 0;
        }
        if (this._normalImage) {
            this.removeChild(this._normalImage, true);
        }

        this._normalImage = normalImage;
        this.width = this._normalImage.width;
        this.height = this._normalImage.height;
        this._updateImagesVisibility();

        if (normalImage.textureLoaded && !normalImage.textureLoaded()) {
            normalImage.addEventListener("load", function (sender) {
                this.width = sender.width;
                this.height = sender.height;
            }, this);
        }
    },

    /**
     * return 返回该菜单项选中状态时的图像(cc.Sprite)
     * @return {cc.Sprite}
     */
    getSelectedImage: function () {
        return this._selectedImage;
    },

    /**
     * 设置选中状态时的图像(cc.Sprite)
     * @param {cc.Sprite} 精灵图像
     */
    setSelectedImage: function (selectedImage) {
        if (this._selectedImage == selectedImage)
            return;

        if (selectedImage) {
            this.addChild(selectedImage, 0, cc.SELECTED_TAG);
            selectedImage.anchorX = 0;
            selectedImage.anchorY = 0;
        }

        if (this._selectedImage) {
            this.removeChild(this._selectedImage, true);
        }

        this._selectedImage = selectedImage;
        this._updateImagesVisibility();
    },

    /**
     * 返回菜单项不可用状态时的图像
     * @return {cc.Sprite}
     */
    getDisabledImage: function () {
        return this._disabledImage;
    },

    /**
     * 设置不可用状态时的图像(cc.Sprite)
     * @param {cc.Sprite} 精灵图像
     */
    setDisabledImage: function (disabledImage) {
        if (this._disabledImage == disabledImage)
            return;

        if (disabledImage) {
            this.addChild(disabledImage, 0, cc.DISABLE_TAG);
            disabledImage.anchorX = 0;
            disabledImage.anchorY = 0;
        }

        if (this._disabledImage)
            this.removeChild(this._disabledImage, true);

        this._disabledImage = disabledImage;
        this._updateImagesVisibility();
    },

    /**
     * 通过cc.Sprite初始化一个cc.MenuItemSprite
     * @param {cc.Node} 正常状态的图像
     * @param {cc.Node} 选中状态的图像
     * @param {cc.Node} 不可用状态的图像
     * @param {function|String} 回调函数
     * @param {cc.Node} target
     * @return {Boolean}
     */
    initWithNormalSprite: function (normalSprite, selectedSprite, disabledSprite, callback, target) {
        this.initWithCallback(callback, target);
        this.setNormalImage(normalSprite);
        this.setSelectedImage(selectedSprite);
        this.setDisabledImage(disabledSprite);
        var locNormalImage = this._normalImage;
        if (locNormalImage) {
            this.width = locNormalImage.width;
            this.height = locNormalImage.height;

            if (locNormalImage.textureLoaded && !locNormalImage.textureLoaded()) {
                locNormalImage.addEventListener("load", function (sender) {
                    this.width = sender.width;
                    this.height = sender.height;
                    this.cascadeColor = true;
                    this.cascadeOpacity = true;
                }, this);
            }
        }
        this.cascadeColor = true;
        this.cascadeOpacity = true;
        return true;
    },

    /**
     * 设置该菜单项的颜色
     * @param {cc.Color} color 颜色值
     */
    setColor: function (color) {
        this._normalImage.color = color;

        if (this._selectedImage)
            this._selectedImage.color = color;

        if (this._disabledImage)
            this._disabledImage.color = color;
    },

    /**
     * 返回该菜单项的颜色
     * @return {cc.Color} 颜色值
     */
    getColor: function () {
        return this._normalImage.color;
    },

    /**
     * 设置该菜单项的透明度
     * @param {Number} 透明度，范围值 0-255
     */
    setOpacity: function (opacity) {
        this._normalImage.opacity = opacity;

        if (this._selectedImage)
            this._selectedImage.opacity = opacity;

        if (this._disabledImage)
            this._disabledImage.opacity = opacity;
    },

    /**
     * 返回该菜单项的透明度
     * @return {Number} 透明度，范围值 0-255
     */
    getOpacity: function () {
        return this._normalImage.opacity;
    },

    /**
     * 设置该该菜单项为选中状态 (会调用回调函数)
     */
    selected: function () {
        cc.MenuItem.prototype.selected.call(this);
        if (this._normalImage) {
            if (this._disabledImage)
                this._disabledImage.visible = false;

            if (this._selectedImage) {
                this._normalImage.visible = false;
                this._selectedImage.visible = true;
            } else
                this._normalImage.visible = true;
        }
    },

    /**
     * 该菜单项返回未选中状态
     */
    unselected: function () {
        cc.MenuItem.prototype.unselected.call(this);
        if (this._normalImage) {
            this._normalImage.visible = true;

            if (this._selectedImage)
                this._selectedImage.visible = false;

            if (this._disabledImage)
                this._disabledImage.visible = false;
        }
    },

    /**
     * 设置该菜单项的启用/停用状态，在启用状态下会接收到触摸事件
     * @param {Boolean} bEnabled 是否启用
     */
    setEnabled: function (bEnabled) {
        if (this._enabled != bEnabled) {
            cc.MenuItem.prototype.setEnabled.call(this, bEnabled);
            this._updateImagesVisibility();
        }
    },

    _updateImagesVisibility: function () {
        var locNormalImage = this._normalImage, locSelImage = this._selectedImage, locDisImage = this._disabledImage;
        if (this._enabled) {
            if (locNormalImage)
                locNormalImage.visible = true;
            if (locSelImage)
                locSelImage.visible = false;
            if (locDisImage)
                locDisImage.visible = false;
        } else {
            if (locDisImage) {
                if (locNormalImage)
                    locNormalImage.visible = false;
                if (locSelImage)
                    locSelImage.visible = false;
                if (locDisImage)
                    locDisImage.visible = true;
            } else {
                if (locNormalImage)
                    locNormalImage.visible = true;
                if (locSelImage)
                    locSelImage.visible = false;
            }
        }
    }
});

var _p = cc.MenuItemSprite.prototype;

// 扩展属性
/** @expose */
_p.normalImage;
cc.defineGetterSetter(_p, "normalImage", _p.getNormalImage, _p.setNormalImage);
/** @expose */
_p.selectedImage;
cc.defineGetterSetter(_p, "selectedImage", _p.getSelectedImage, _p.setSelectedImage);
/** @expose */
_p.disabledImage;
cc.defineGetterSetter(_p, "disabledImage", _p.getDisabledImage, _p.setDisabledImage);

/**
 * 通过精灵创建一个菜单项
 * @v3.0以后已经弃用，请使用new cc.MenuItemSprite(normalSprite, selectedSprite, three, four, five)替代
 * @param {Image} normalSprite 普通状态的图像
 * @param {Image|Null} selectedSprite 选中状态的图像
 * @param {Image|cc.Node|Null} three 为选中状态的图像或者目标节点
 * @param {String|function|cc.Node|Null} four 回调函数名、回调函数实体或者目标节点
 * @param {String|function|Null} five 回调函数名或者回调函数实体
 * @return {cc.MenuItemSprite}
 */
cc.MenuItemSprite.create = function (normalSprite, selectedSprite, three, four, five) {
    return new cc.MenuItemSprite(normalSprite, selectedSprite, three, four, five || undefined);
};

/**
 * cc.MenuItemImage接受图像作为其子项<br/>
 * 这些图像有三种不同的状态:<br/>
 * - 未选中状态时的图像<br/>
 * - 选中状态时的图像<br/>
 * - 不可用状态时的图像<br/>
 * <br/>
 * 尽量将所有状态的图像都控制在同一个尺寸大小<br/>
 * @class
 * @继承 cc.MenuItemSprite
 * @param {string|null} 普通状态时的图像
 * @param {string|null} 选中状态时的图像
 * @param {string|null} 不可用状态时的图像
 * @param {function|string|null} 回调函数
 * @param {cc.Node|null} target
 * @例子
 * var menuItem = new cc.MenuItemImage(normalImage, selectedImage, three, four, five);
 */
cc.MenuItemImage = cc.MenuItemSprite.extend(/** @lends cc.MenuItemImage# */{

    /**
     * cc.MenuItemImage的构造函数
     * @param {string|null} 普通状态时的图像
     * @param {string|null} 选中状态时的图像
     * @param {string|null} 不可用状态时的图像
     * @param {function|string|null} 回调函数
     * @param {cc.Node|null} target
     */
    ctor: function (normalImage, selectedImage, three, four, five) {
        var normalSprite = null,
            selectedSprite = null,
            disabledSprite = null,
            callback = null,
            target = null;

        if (normalImage === undefined) {
            cc.MenuItemSprite.prototype.ctor.call(this);
        }
        else {
            normalSprite = new cc.Sprite(normalImage);
            selectedImage &&
            (selectedSprite = new cc.Sprite(selectedImage));
            if (four === undefined) {
                callback = three;
            }
            else if (five === undefined) {
                callback = three;
                target = four;
            }
            else if (five) {
                disabledSprite = new cc.Sprite(three);
                callback = four;
                target = five;
            }
            cc.MenuItemSprite.prototype.ctor.call(this, normalSprite, selectedSprite, disabledSprite, callback, target);
        }
    },

    /**
     * 通过一个精灵帧来设置普通状态时的图像
     * @param {cc.SpriteFrame} 精灵帧
     */
    setNormalSpriteFrame: function (frame) {
        this.setNormalImage(new cc.Sprite(frame));
    },

    /**
     * 通过一个精灵帧来设置选中状态时的图像
     * @param {cc.SpriteFrame} 精灵帧
     */
    setSelectedSpriteFrame: function (frame) {
        this.setSelectedImage(new cc.Sprite(frame));
    },

    /**
     * 通过一个精灵帧来设置不可用状态时的图像
     * @param {cc.SpriteFrame} 精灵帧
     */
    setDisabledSpriteFrame: function (frame) {
        this.setDisabledImage(new cc.Sprite(frame));
    },

    /**
     * 初始化一个cc.MenuItemImage
     * @param {string|null} 普通状态时的图像
     * @param {string|null} 选中状态时的图像
     * @param {string|null} 不可用状态时的图像
     * @param {function|string|null} 回调函数
     * @param {cc.Node|null} target
     * @returns {boolean}
     */
    initWithNormalImage: function (normalImage, selectedImage, disabledImage, callback, target) {
        var normalSprite = null;
        var selectedSprite = null;
        var disabledSprite = null;

        if (normalImage) {
            normalSprite = new cc.Sprite(normalImage);
        }
        if (selectedImage) {
            selectedSprite = new cc.Sprite(selectedImage);
        }
        if (disabledImage) {
            disabledSprite = new cc.Sprite(disabledImage);
        }
        return this.initWithNormalSprite(normalSprite, selectedSprite, disabledSprite, callback, target);
    }
});

/**
 * 通过图像创建一个菜单项
 * @v3.0以后已经弃用，请使用 new cc.MenuItemImage(normalImage, selectedImage, three, four, five) 替代.
 * @param {String} normalImage 普通状态时的图像文件名
 * @param {String} selectedImage 选中状态时的图像文件名
 * @param {String|cc.Node} 不可用状态时的图像文件名或者回调函数
 * @param {String|function|Null} [four] 回调函数名、回调函数实体或者目标节点
 * @param {cc.Node|String|function|Null} [five] 当点击的时候调用回到的目标节点
 * @return {cc.MenuItemImage}
 */
cc.MenuItemImage.create = function (normalImage, selectedImage, three, four, five) {
    return new cc.MenuItemImage(normalImage, selectedImage, three, four, five);
};


/**
 * 一个用于切换其内部菜单项的简单容器类<br/>
 * 其内部菜单项可以是任何MenuItem
 * @class
 * @继承 cc.MenuItem
 *
 * @property {Array}    subItems        - 包含所有子项的数组
 * @property {Number}   selectedIndex   - 当前选中的子项索引
 *
 *@example
 * // 例子
 * // 使用两个菜单项创建一个切换菜单项（你可以在这两个菜单项之间来回切换）
 * var toggler = new cc.MenuItemToggle( new cc.MenuItemFont("On"), new cc.MenuItemFont("Off"), this.callback, this)
 * // 注意： 第一个参数是回调目标节点, 第二个是回调函数, 后面你可以传入随意数量的菜单项
 *
 * // 如果你仅仅传入一个变量，它必须是一个cc.MenuItem
 * var notYetToggler = new cc.MenuItemToggle(cc.MenuItemFont("On"));//此刻的菜单项是不可用的，直到你添加更多的子菜单项进去
 * notYetToggler.addSubItem(new cc.MenuItemFont("Off"));
 * // 这样做对于创建一个没有回调函数的切换菜单项非常有用（如果你打算在其他地方控制这种行为）
 */
cc.MenuItemToggle = cc.MenuItem.extend(/** @lends cc.MenuItemToggle# */{
    subItems: null,

    _selectedIndex: 0,
    _opacity: null,
    _color: null,

    /**
     * cc.MenuItemToggle的构造函数
     */
    ctor: function (/*Multiple arguments follow*/) {

        cc.MenuItem.prototype.ctor.call(this);
        this._selectedIndex = 0;
        this.subItems = [];
        this._opacity = 0;
        this._color = cc.color.WHITE;

        if(arguments.length > 0)
            this.initWithItems(Array.prototype.slice.apply(arguments));

    },

    /**
     * 返回该菜单项的透明度
     * @return {Number} 透明值，范围值：0~255
     */
    getOpacity: function () {
        return this._opacity;
    },

    /**
     * 设置该菜单项的透明度
     * @param {Number} 透明值，范围值：0~255
     */
    setOpacity: function (opacity) {
        this._opacity = opacity;
        if (this.subItems && this.subItems.length > 0) {
            for (var it = 0; it < this.subItems.length; it++) {
                this.subItems[it].opacity = opacity;
            }
        }
        this._color.a = opacity;
    },

    /**
     * 获取该菜单项的颜色
     * @return {cc.Color} 颜色值
     */
    getColor: function () {
        var locColor = this._color;
        return cc.color(locColor.r, locColor.g, locColor.b, locColor.a);
    },

    /**
     * 设置该菜单项的颜色
     * @param {cc.Color} 颜色值
     */
    setColor: function (color) {
        var locColor = this._color;
        locColor.r = color.r;
        locColor.g = color.g;
        locColor.b = color.b;

        if (this.subItems && this.subItems.length > 0) {
            for (var it = 0; it < this.subItems.length; it++) {
                this.subItems[it].setColor(color);
            }
        }

        if (color.a !== undefined && !color.a_undefined) {
            this.setOpacity(color.a);
        }
    },

    /**
     * 返回当前选中的子菜单项的索引
     * @return {Number} 索引值
     */
    getSelectedIndex: function () {
        return this._selectedIndex;
    },

    /**
     * 设置该菜单项当前选中的子菜单项的索引
     * @param {Number} 索引值
     */
    setSelectedIndex: function (SelectedIndex) {
        if (SelectedIndex != this._selectedIndex) {
            this._selectedIndex = SelectedIndex;
            var currItem = this.getChildByTag(cc.CURRENT_ITEM);
            if (currItem)
                currItem.removeFromParent(false);

            var item = this.subItems[this._selectedIndex];
            this.addChild(item, 0, cc.CURRENT_ITEM);
            var w = item.width, h = item.height;
            this.width = w;
            this.height = h;
            item.setPosition(w / 2, h / 2);
        }
    },

    /**
     * 类似获取孩子节点，返回其所有子菜单项的数组
     * @return {Array}
     */
    getSubItems: function () {
        return this.subItems;
    },

    /**
     * 设置其所有子菜单项的数组
     * @param {cc.MenuItem} subItems 子菜单项数组
     */
    setSubItems: function (subItems) {
        this.subItems = subItems;
    },

    /**
     * 通过一个菜单项数组初始化一个cc.MenuItemToggle
     * @param {cc.MenuItem} args[0...last-2] 数组内的子项必须是cc.MenuItems
     * @param {function|String} args[last-1] 第二个参数为回调函数
     * @param {cc.Node} args[last] 第三个参数为调用回调函数的目标节点
     * @return {Boolean}
     */
    initWithItems: function (args) {
        var l = args.length;
        // passing callback.
        if (cc.isFunction(args[args.length - 2])) {
            this.initWithCallback(args[args.length - 2], args[args.length - 1]);
            l = l - 2;
        } else if (cc.isFunction(args[args.length - 1])) {
            this.initWithCallback(args[args.length - 1], null);
            l = l - 1;
        } else {
            this.initWithCallback(null, null);
        }

        var locSubItems = this.subItems;
        locSubItems.length = 0;
        for (var i = 0; i < l; i++) {
            if (args[i])
                locSubItems.push(args[i]);
        }
        this._selectedIndex = cc.UINT_MAX;
        this.setSelectedIndex(0);

        this.cascadeColor = true;
        this.cascadeOpacity = true;

        return true;
    },

    /**
     * 为该菜单项添加一个子菜单项
     * @param {cc.MenuItem} item 子菜单项
     */
    addSubItem: function (item) {
        this.subItems.push(item);
    },

    /**
     * 激活该菜单项
     */
    activate: function () {
        // update index
        if (this._enabled) {
            var newIndex = (this._selectedIndex + 1) % this.subItems.length;
            this.setSelectedIndex(newIndex);
        }
        cc.MenuItem.prototype.activate.call(this);
    },

    /**
     * 该菜单项进入选中状态 (将会调用回调函数)
     */
    selected: function () {
        cc.MenuItem.prototype.selected.call(this);
        this.subItems[this._selectedIndex].selected();
    },

    /**
     * 该菜单项回到未选中状态
     */
    unselected: function () {
        cc.MenuItem.prototype.unselected.call(this);
        this.subItems[this._selectedIndex].unselected();
    },

    /**
     * 设置该菜单项的启用/停用状态
     * @param {Boolean} enabled 是否启用
     */
    setEnabled: function (enabled) {
        if (this._enabled != enabled) {
            cc.MenuItem.prototype.setEnabled.call(this, enabled);
            var locItems = this.subItems;
            if (locItems && locItems.length > 0) {
                for (var it = 0; it < locItems.length; it++)
                    locItems[it].enabled = enabled;
            }
        }
    },

    /**
     * 返回当前选中的子菜单项
     * @return {cc.MenuItem}
     */
    selectedItem: function () {
        return this.subItems[this._selectedIndex];
    },
    /**
     * * <p>
     *     当cc.MenuItemToggle进入场景，它会调用事件回调                                   <br/>
     *     如果cc.MenuItemToggle进入场景时附带有场景过渡特效，该时间会在过渡状态时调用        <br/>
     *     在onEnter期间你不能访问你的兄弟节点                                                <br/>
     *     如果你重载了onEnter函数, 你必须通过this._super()来调用其父类的onEnter函数
     * </p>
     */
    onEnter: function () {
        cc.Node.prototype.onEnter.call(this);
        this.setSelectedIndex(this._selectedIndex);
    }
});

var _p = cc.MenuItemToggle.prototype;

// 扩展属性
/** @expose */
_p.selectedIndex;
cc.defineGetterSetter(_p, "selectedIndex", _p.getSelectedIndex, _p.setSelectedIndex);


/**
 * 创建一个可以切换内部菜单项的切换菜单<br/>
 * 其内部菜单项可以是任何MenuItem对象
 * @v3.0以后已经弃用，请使用 new cc.MenuItemToggle(params) 替代
 * @return {cc.MenuItemToggle}
 * @example
 */
cc.MenuItemToggle.create = function (/*Multiple arguments follow*/) {
    if ((arguments.length > 0) && (arguments[arguments.length - 1] == null))
        cc.log("parameters should not be ending with null in Javascript");
    var ret = new cc.MenuItemToggle();
    ret.initWithItems(Array.prototype.slice.apply(arguments));
    return ret;
};
