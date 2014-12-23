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

/**
 * @constant
 * @type Number
 */
cc.MENU_STATE_WAITING = 0;
/**
 * @constant
 * @type Number
 */
cc.MENU_STATE_TRACKING_TOUCH = 1;
/**
 * @constant
 * @type Number
 */
cc.MENU_HANDLER_PRIORITY = -128;
/**
 * @constant
 * @type Number
 */
cc.DEFAULT_PADDING = 5;

/**
 * <p> �ص�;��ޣ�<br/>
 *  -����������е�ʱ��ʹ��addChild������MenuItem objects
 *  -����Ψһ���Խ��ܵľ���MenuItem objects
 *  @class
 *  @extends cc.Layer
 *  @param {...cc.MenuItem|null} menuItems}
 *  @example
 *   var layer = new cc.Menu(menuitem1, menuitem2, menuitem3);
 */

cc.Menu = cc.Layer.extend(/** @lends cc.Menu# */{
    enabled: false,

    _selectedItem: null,
    _state: -1,
    _touchListener: null,
    _className: "Menu",

    /**
     * ��дcc.Menus�Ĺ��������������Ĺ��ܣ�������ʹ��"ctor"����ʱ���ǵ�Ҫ����"this._super()"
     *  @param {...cc.MenuItem|null} �˵���
     */

    ctor: function (menuItems) {
        cc.Layer.prototype.ctor.call(this);
        this._color = cc.color.WHITE;
        this.enabled = false;
        this._opacity = 255;
        this._selectedItem = null;
        this._state = -1;

        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this._onTouchBegan,
            onTouchMoved: this._onTouchMoved,
            onTouchEnded: this._onTouchEnded,
            onTouchCancelled: this._onTouchCancelled
        });

        if ((arguments.length > 0) && (arguments[arguments.length - 1] == null))
            cc.log("parameters should not be ending with null in Javascript");

        var argc = arguments.length, items;
        if (argc == 0) {
            items = [];
        } else if (argc == 1) {
            if (menuItems instanceof Array) {
                items = menuItems;
            }
            else items = [menuItems];
        }
        else if (argc > 1) {
            items = [];
            for (var i = 0; i < argc; i++) {
                if (arguments[i])
                    items.push(arguments[i]);
            }
        }
        this.initWithArray(items);
    },

    /**
     * <p>
     *     ÿ�ε�CCMenu����'��̨'ʱ������¼��ص�����                                   <br/>
     *     ���CCMenu�ù��ɽ��뵽'��̨'���¼����ڹ��ɿ�ʼʱ����       <br/>
     *     ��onEnter�ڼ䲻���Խ�������'�ֵܽ���'�ڵ�.         <br/>
     *     ���������onEnter, �������this._super()����ø����onEnter.
     * </p>
     */
    onEnter: function () {
        var locListener = this._touchListener;
        if (!locListener._isRegistered())
            cc.eventManager.addListener(locListener, this);
        cc.Node.prototype.onEnter.call(this);
    },

    /**
     * ��������˵��Ƿ������¼�
     * @return {Boolean}
     */
    isEnabled: function () {
        return this.enabled;
    },

    /**
     * ��������˵��Ƿ������¼�
     * @param {Boolean} enabled
     */
    setEnabled: function (enabled) {
        this.enabled = enabled;
    },

    /**
     * ��ʼ��cc.Menu
     * @param {Array} args
     * @return {Boolean}
     */
    initWithItems: function (args) {
        var pArray = [];
        if (args) {
            for (var i = 0; i < args.length; i++) {
                if (args[i])
                    pArray.push(args[i]);
            }
        }

        return this.initWithArray(pArray);
    },

    /**
     * ��ʼ��cc.Menu����һ��cc.MenuItem���������
     * @param {Array} cc.MenuItem����
     * @return {Boolean}
     */
    initWithArray: function (arrayOfItems) {
        if (cc.Layer.prototype.init.call(this)) {
            this.enabled = true;

            // ����Ļ�м�Ĳ˵�
            var winSize = cc.winSize;
            this.setPosition(winSize.width / 2, winSize.height / 2);
            this.setContentSize(winSize);
            this.setAnchorPoint(0.5, 0.5);
            this.ignoreAnchorPointForPosition(true);

            if (arrayOfItems) {
                for (var i = 0; i < arrayOfItems.length; i++)
                    this.addChild(arrayOfItems[i], i);
            }

            this._selectedItem = null;
            this._state = cc.MENU_STATE_WAITING;

            // �����ڲ˵�ʹ�ý�����ɫ��͸����
            this.cascadeColor = true;
            this.cascadeOpacity = true;

            return true;
        }
        return false;
    },

    /**
     * Ϊcc.Menu����ӽڵ�	  								
     * @param {cc.Node} child
     * @param {Number|Null} [zOrder=] �ӽڵ��zOrder
     * @param {Number|Null} [tag=] �ӽڵ��tag
     */
    addChild: function (child, zOrder, tag) {
        if (!(child instanceof cc.MenuItem))
            throw "cc.Menu.addChild() : Menu only supports MenuItem objects as children";
        cc.Layer.prototype.addChild.call(this, child, zOrder, tag);
    },

    /**
     * ��Ĭ�ϵļ�ഹֱ����˵�����
     */
    alignItemsVertically: function () {
        this.alignItemsVerticallyWithPadding(cc.DEFAULT_PADDING);
    },

    /**
     * ���ض��ļ�ഹֱ����˵�����
     * @param {Number} padding
     */
    alignItemsVerticallyWithPadding: function (padding) {
        var height = -padding, locChildren = this._children, len, i, locScaleY, locHeight, locChild;
        if (locChildren && locChildren.length > 0) {
            for (i = 0, len = locChildren.length; i < len; i++)
                height += locChildren[i].height * locChildren[i].scaleY + padding;

            var y = height / 2.0;

            for (i = 0, len = locChildren.length; i < len; i++) {
                locChild = locChildren[i];
                locHeight = locChild.height;
                locScaleY = locChild.scaleY;
                locChild.setPosition(0, y - locHeight * locScaleY / 2);
                y -= locHeight * locScaleY + padding;
            }
        }
    },

    /**
     * ��Ĭ�ϵļ��ˮƽ����˵�����
     */
    alignItemsHorizontally: function () {
        this.alignItemsHorizontallyWithPadding(cc.DEFAULT_PADDING);
    },

    /**
     * ���ض��ļ��ˮƽ����˵�����
     * @param {Number} padding
     */
    alignItemsHorizontallyWithPadding: function (padding) {
        var width = -padding, locChildren = this._children, i, len, locScaleX, locWidth, locChild;
        if (locChildren && locChildren.length > 0) {
            for (i = 0, len = locChildren.length; i < len; i++)
                width += locChildren[i].width * locChildren[i].scaleX + padding;

            var x = -width / 2.0;

            for (i = 0, len = locChildren.length; i < len; i++) {
                locChild = locChildren[i];
                locScaleX = locChild.scaleX;
                locWidth = locChildren[i].width;
                locChild.setPosition(x + locWidth * locScaleX / 2, 0);
                x += locWidth * locScaleX + padding;
            }
        }
    },

    /**
     * �˵������ж���
     * @example
     * // ʾ��
     * menu.alignItemsInColumns(3,2,3)// �������, ��һ�к͵����������Ӳ˵���, �ڶ��������Ӳ˵���
     *
     * menu.alignItemsInColumns(3,3)//�������У����������Ӳ˵���
    alignItemsInColumns: function (/*Multiple Arguments*/) {
        if ((arguments.length > 0) && (arguments[arguments.length - 1] == null))
            cc.log("parameters should not be ending with null in Javascript");

        var rows = [];
        for (var i = 0; i < arguments.length; i++) {
            rows.push(arguments[i]);
        }
        var height = -5;
        var row = 0;
        var rowHeight = 0;
        var columnsOccupied = 0;
        var rowColumns, tmp, len;
        var locChildren = this._children;
        if (locChildren && locChildren.length > 0) {
            for (i = 0, len = locChildren.length; i < len; i++) {
                if (row >= rows.length)
                    continue;

                rowColumns = rows[row];
                // һ���в���û������
                if (!rowColumns)
                    continue;

                tmp = locChildren[i].height;
                rowHeight = ((rowHeight >= tmp || isNaN(tmp)) ? rowHeight : tmp);

                ++columnsOccupied;
                if (columnsOccupied >= rowColumns) {
                    height += rowHeight + 5;

                    columnsOccupied = 0;
                    rowHeight = 0;
                    ++row;
                }
            }
        }
        // ����Ƿ��й��������/����
        //cc.assert(!columnsOccupied, "");  
        var winSize = cc.director.getWinSize();

        row = 0;
        rowHeight = 0;
        rowColumns = 0;
        var w = 0.0;
        var x = 0.0;
        var y = (height / 2);

        if (locChildren && locChildren.length > 0) {
            for (i = 0, len = locChildren.length; i < len; i++) {
                var child = locChildren[i];
                if (rowColumns == 0) {
                    rowColumns = rows[row];
                    w = winSize.width / (1 + rowColumns);
                    x = w;
                }

                tmp = child._getHeight();
                rowHeight = ((rowHeight >= tmp || isNaN(tmp)) ? rowHeight : tmp);
                child.setPosition(x - winSize.width / 2, y - tmp / 2);

                x += w;
                ++columnsOccupied;

                if (columnsOccupied >= rowColumns) {
                    y -= rowHeight + 5;
                    columnsOccupied = 0;
                    rowColumns = 0;
                    rowHeight = 0;
                    ++row;
                }
            }
        }
    },
    /**
     * �˵����ж���
     * @param {Number}
     * @example
     * // ʾ��
     * menu.alignItemsInRows(5,3)//�������в˵���, ��һ��������˵���, �ڶ���������
     *
     * menu.alignItemsInRows(4,4,4,4)//�������У�ÿ�����ĸ��˵���
     */
    alignItemsInRows: function (/*Multiple arguments*/) {
        if ((arguments.length > 0) && (arguments[arguments.length - 1] == null))
            cc.log("parameters should not be ending with null in Javascript");
        var columns = [], i;
        for (i = 0; i < arguments.length; i++) {
            columns.push(arguments[i]);
        }
        var columnWidths = [];
        var columnHeights = [];

        var width = -10;
        var columnHeight = -5;
        var column = 0;
        var columnWidth = 0;
        var rowsOccupied = 0;
        var columnRows, child, len, tmp;

        var locChildren = this._children;
        if (locChildren && locChildren.length > 0) {
            for (i = 0, len = locChildren.length; i < len; i++) {
                child = locChildren[i];
                // ����Ƿ��й���������/����
                if (column >= columns.length)
                    continue;

                columnRows = columns[column];
                // ÿ�в�����û������
                if (!columnRows)
                    continue;

                // columnWidth = fmaxf(columnWidth, [item contentSize].width);
                tmp = child.width;
                columnWidth = ((columnWidth >= tmp || isNaN(tmp)) ? columnWidth : tmp);

                columnHeight += (child.height + 5);
                ++rowsOccupied;

                if (rowsOccupied >= columnRows) {
                    columnWidths.push(columnWidth);
                    columnHeights.push(columnHeight);
                    width += columnWidth + 10;

                    rowsOccupied = 0;
                    columnWidth = 0;
                    columnHeight = -5;
                    ++column;
                }
            }
        }
        // ����Ƿ��г�������ֵ������/����.
        //cc.assert(!rowsOccupied, "");
        var winSize = cc.director.getWinSize();

        column = 0;
        columnWidth = 0;
        columnRows = 0;
        var x = -width / 2;
        var y = 0.0;

        if (locChildren && locChildren.length > 0) {
            for (i = 0, len = locChildren.length; i < len; i++) {
                child = locChildren[i];
                if (columnRows == 0) {
                    columnRows = columns[column];
                    y = columnHeights[column];
                }

                // columnWidth = fmaxf(columnWidth, [item contentSize].width);
                tmp = child._getWidth();
                columnWidth = ((columnWidth >= tmp || isNaN(tmp)) ? columnWidth : tmp);

                child.setPosition(x + columnWidths[column] / 2, y - winSize.height / 2);

                y -= child.height + 10;
                ++rowsOccupied;

                if (rowsOccupied >= columnRows) {
                    x += columnWidth + 5;
                    rowsOccupied = 0;
                    columnRows = 0;
                    columnWidth = 0;
                    ++column;
                }
            }
        }
    },

    /**
     * ��cc.Menuһ��һ���ӽڵ�
     * @param {cc.Node} child ����Ҫ�Ƴ����ӽڵ�
     * @param {boolean} cleanup �Ƿ������ڴ�
     */
    removeChild: function (child, cleanup) {
        if (child == null)
            return;
        if (!(child instanceof cc.MenuItem)) {
            cc.log("cc.Menu.removeChild():Menu only supports MenuItem objects as children");
            return;
        }

        if (this._selectedItem == child)
            this._selectedItem = null;
        cc.Node.prototype.removeChild.call(this, child, cleanup);
    },

    _onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        if (target._state != cc.MENU_STATE_WAITING || !target._visible || !target.enabled)
            return false;

        for (var c = target.parent; c != null; c = c.parent) {
            if (!c.isVisible())
                return false;
        }

        target._selectedItem = target._itemForTouch(touch);
        if (target._selectedItem) {
            target._state = cc.MENU_STATE_TRACKING_TOUCH;
            target._selectedItem.selected();
            return true;
        }
        return false;
    },

    _onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        if (target._state !== cc.MENU_STATE_TRACKING_TOUCH) {
            cc.log("cc.Menu.onTouchEnded(): invalid state");
            return;
        }
        if (target._selectedItem) {
            target._selectedItem.unselected();
            target._selectedItem.activate();
        }
        target._state = cc.MENU_STATE_WAITING;
    },

    _onTouchCancelled: function (touch, event) {
        var target = event.getCurrentTarget();
        if (target._state !== cc.MENU_STATE_TRACKING_TOUCH) {
            cc.log("cc.Menu.onTouchCancelled(): invalid state");
            return;
        }
        if (this._selectedItem)
            target._selectedItem.unselected();
        target._state = cc.MENU_STATE_WAITING;
    },

    _onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        if (target._state !== cc.MENU_STATE_TRACKING_TOUCH) {
            cc.log("cc.Menu.onTouchMoved(): invalid state");
            return;
        }
        var currentItem = target._itemForTouch(touch);
        if (currentItem != target._selectedItem) {
            if (target._selectedItem)
                target._selectedItem.unselected();
            target._selectedItem = currentItem;
            if (target._selectedItem)
                target._selectedItem.selected();
        }
    },

    /**
     * <p>
     * ÿ��cc.Menu�뿪'��̨'ʱ���õĻص�����.                                         <br/>
     * ���cc.Menu�ù����뿪'��̨', ���ڹ��ɿ�ʼʱ���е���. <br/>
     * ��onExit�ڼ䣬 �����Ի�ȡ�ֵܽ��ýڵ�.                   @return {Boolean}                                          <br/>
     * �������onExit, ��Ӧ���ڵ���this._super()�︸���onExit.
     * </p>
     */
    onExit: function () {
        if (this._state == cc.MENU_STATE_TRACKING_TOUCH) {
            if (this._selectedItem) {
                this._selectedItem.unselected();
                this._selectedItem = null;
            }
            this._state = cc.MENU_STATE_WAITING;
        }
        cc.Node.prototype.onExit.call(this);
    },
    /**
     * ֻ����jsbindingʹ��
     * @param value
     */
    setOpacityModifyRGB: function (value) {
    },
    /**
     * ֻ����jsbindingʹ��
     * @returns {boolean}
     */
    isOpacityModifyRGB: function () {
        return false;
    },

    _itemForTouch: function (touch) {
        var touchLocation = touch.getLocation();
        var itemChildren = this._children, locItemChild;
        if (itemChildren && itemChildren.length > 0) {
            for (var i = itemChildren.length - 1; i >= 0; i--) {
                locItemChild = itemChildren[i];
                if (locItemChild.isVisible() && locItemChild.isEnabled()) {
                    var local = locItemChild.convertToNodeSpace(touchLocation);
                    var r = locItemChild.rect();
                    r.x = 0;
                    r.y = 0;
                    if (cc.rectContainsPoint(r, local))
                        return locItemChild;
                }
            }
        }
        return null;
    }
});

var _p = cc.Menu.prototype;

// @return {cc.Menu}���ӵ�����
/** @expose */
_p.enabled;

/**
 * ����һ���µĲ˵�
 * @deprecated ��3.0�汾����ʹ���µ�cc.Menu������һ���µĲ˵�
 * @param {...cc.MenuItem|null} menuItems	      todo: ��Ҫʹ���µ�
 * @return {cc.Menu}
 */
cc.Menu.create = function (menuItems) {
    var argc = arguments.length;
    if ((argc > 0) && (arguments[argc - 1] == null))
        cc.log("parameters should not be ending with null in Javascript");

    var ret;
    if (argc == 0)
        ret = new cc.Menu();
    else if (argc == 1)
        ret = new cc.Menu(menuItems);
    else
        ret = new cc.Menu(Array.prototype.slice.call(arguments, 0));
    return ret;
};
