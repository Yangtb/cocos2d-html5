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
cc.INVALID_INDEX = -1;

/**
 * PI是圆的周长和半径的比率
 * @constant
 * @type Number
 */
cc.PI = Math.PI;

/**
 * @constant
 * @type Number
 */
cc.FLT_MAX = parseFloat('3.402823466e+38F');

/**
 * @constant
 * @type Number
 */
cc.FLT_MIN = parseFloat("1.175494351e-38F");

/**
 * @constant
 * @type Number
 */
cc.RAD = cc.PI / 180;

/**
 * @constant
 * @type Number
 */
cc.DEG = 180 / cc.PI;

 /**
 * 无符号整形数的最大值
 * @constant
 * @type Number
 */
cc.UINT_MAX = 0xffffffff;

/**
 * <p>
 * 简单的宏，交换一个对象的两个成员变量<br/>
 * 从C++宏修改，需要传入x，y两个变量的字符串名，以及整个对象的引用<br/>
 * </p>
 * @param {String} x
 * @param {String} y
 * @param {Object} ref
 * @function
 * @deprecated 自v3.0
 */
cc.swap = function (x, y, ref) {
    if (cc.isObject(ref) && !cc.isUndefined(ref.x) && !cc.isUndefined(ref.y)) {
        var tmp = ref[x];
        ref[x] = ref[y];
        ref[y] = tmp;
    } else
        cc.log(cc._LogInfos.swap);
};

/**
 * <p>
 *     在两个数之间线形插值，比例表示在两个终点之间偏斜多少
 * </p>
 * @param {Number} a 数字 A
 * @param {Number} b 数字 B
 * @param {Number} r 比例 取值范围0到1之间
 * @function
 * @example
 * cc.lerp(2,10,0.5)//returns 6<br/>
 * cc.lerp(2,10,0.2)//returns 3.6
 */
cc.lerp = function (a, b, r) {
    return a + (b - a) * r;
};

/**
 * 在 0 到 0xffffff 之间返回一个随机数
 * @function
 * @returns {number}
 */
cc.rand = function () {
	return Math.random() * 0xffffff;
};

/**
 * 在 -1 到 1 之间返回一个随机浮点数
 * @return {Number}
 * @function
 */
cc.randomMinus1To1 = function () {
    return (Math.random() - 0.5) * 2;
};

/**
 * 在 0 到 1 之间返回一个随机浮点数
 * @return {Number}
 * @function
 */
cc.random0To1 = Math.random;

/**
 * 角度转换为弧度
 * @param {Number} angle
 * @return {Number}
 * @function
 */
cc.degreesToRadians = function (angle) {
    return angle * cc.RAD;
};

/**
 * 弧度转换为角度
 * @param {Number} angle
 * @return {Number}
 * @function
 */
cc.radiansToDegrees = function (angle) {
    return angle * cc.DEG;
};

/**
 * 弧度转换为角度，增加log
 * @param {Number} angle
 * @return {Number}
 * @function
 */
cc.radiansToDegress = function (angle) {
    cc.log(cc._LogInfos.radiansToDegress);
    return angle * cc.DEG;
};

/**
 * @constant
 * @type Number
 */
cc.REPEAT_FOREVER = Number.MAX_VALUE - 1;

/**
 * 默认 OpenGL 混合源方法。 兼容包含预乘阿尔法通道（premultiplied alpha）的图片。
 * @constant
 * @type Number
 */
cc.BLEND_SRC = cc.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA ? 1 : 0x0302;

/**
 * 默认 OpenGL 混合源方法。 兼容包含预乘阿尔法通道（premultiplied alpha）的图片。
 * @constant
 * @type Number
 */
cc.BLEND_DST = 0x0303;

/**
 * 用于初始化OpenGL服务状态、正确的OpenGL程序、设置模型-视图投影矩阵的宏
 * @param {cc.Node} node setup node
 * @function
 */
cc.nodeDrawSetup = function (node) {
    //cc.glEnable(node._glServerState);
    if (node._shaderProgram) {
        //cc._renderContext.useProgram(node._shaderProgram._programObj);
        node._shaderProgram.use();
        node._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4();
    }
};


/**
 * <p>
 *     启用下列OpenGL状态：<br/>
 *       - GL_TEXTURE_2D<br/>
 *       - GL_VERTEX_ARRAY<br/>
 *       - GL_TEXTURE_COORD_ARRAY<br/>
 *       - GL_COLOR_ARRAY<br/>
 * </p>
 * @function
 */
cc.enableDefaultGLStates = function () {
    //TODO OPENGL STUFF
    /*
     glEnableClientState(GL_VERTEX_ARRAY);
     glEnableClientState(GL_COLOR_ARRAY);
     glEnableClientState(GL_TEXTURE_COORD_ARRAY);
     glEnable(GL_TEXTURE_2D);*/
};

/**
 * <p>
 *  禁用下列OpenGL状态：<br/>
 *     - GL_TEXTURE_2D<br/>
 *     - GL_TEXTURE_COORD_ARRAY<br/>
 *     - GL_COLOR_ARRAY<br/>
 * </p>
 * @function
 */
cc.disableDefaultGLStates = function () {
    //TODO OPENGL
    /*
     glDisable(GL_TEXTURE_2D);
     glDisableClientState(GL_COLOR_ARRAY);
     glDisableClientState(GL_TEXTURE_COORD_ARRAY);
     glDisableClientState(GL_VERTEX_ARRAY);
     */
};

/**
 * <p>
 *  OpenGL绘图计数加1<br/>
 *  在CCDirector的stats启用时，计数会显示在屏幕<br/>
 * </p>
 * @param {Number} addNumber
 * @function
 */
cc.incrementGLDraws = function (addNumber) {
    cc.g_NumberOfDraws += addNumber;
};

/**
 * @constant
 * @type Number
 */
cc.FLT_EPSILON = 0.0000001192092896;

/**
 * <p>
 *     在Mac上返回1<br/>
 *     iPhone上如果是视网膜屏显示模式（RetinaDisplay）开时返回2，否则返回1
 * </p>
 * @return {Number}
 * @function
 */
cc.contentScaleFactor = cc.IS_RETINA_DISPLAY_SUPPORTED ? function () {
    return cc.director.getContentScaleFactor();
} : function () {
    return 1;
};

/**
 * 将一个点转换为像素点
 * @param {cc.Point} points
 * @return {cc.Point}
 * @function
 */
cc.pointPointsToPixels = function (points) {
    var scale = cc.contentScaleFactor();
    return cc.p(points.x * scale, points.y * scale);
};

/**
 * 将一个像素点转换为点
 * @param {cc.Rect} pixels
 * @return {cc.Point}
 * @function
 */
cc.pointPixelsToPoints = function (pixels) {
	var scale = cc.contentScaleFactor();
	return cc.p(pixels.x / scale, pixels.y / scale);
};

cc._pointPixelsToPointsOut = function(pixels, outPoint){
	var scale = cc.contentScaleFactor();
	outPoint.x = pixels.x / scale;
	outPoint.y = pixels.y / scale;
};

/**
 * 点尺寸转换为像素尺寸
 * @param {cc.Size} sizeInPoints
 * @return {cc.Size}
 * @function
 */
cc.sizePointsToPixels = function (sizeInPoints) {
    var scale = cc.contentScaleFactor();
    return cc.size(sizeInPoints.width * scale, sizeInPoints.height * scale);
};

/**
 * 像素尺寸转换为点尺寸
 * @param {cc.Size} sizeInPixels
 * @return {cc.Size}
 * @function
 */
cc.sizePixelsToPoints = function (sizeInPixels) {
    var scale = cc.contentScaleFactor();
    return cc.size(sizeInPixels.width / scale, sizeInPixels.height / scale);
};

cc._sizePixelsToPointsOut = function (sizeInPixels, outSize) {
    var scale = cc.contentScaleFactor();
    outSize.width = sizeInPixels.width / scale;
    outSize.height = sizeInPixels.height / scale;
};

/**
 * 矩形像素转换为矩形点
 * @param {cc.Rect} pixel
 * @return {cc.Rect}
 * @function
 */
cc.rectPixelsToPoints = cc.IS_RETINA_DISPLAY_SUPPORTED ? function (pixel) {
    var scale = cc.contentScaleFactor();
    return cc.rect(pixel.x / scale, pixel.y / scale,
        pixel.width / scale, pixel.height / scale);
} : function (p) {
    return p;
};

/**
 * 矩形点转换为矩形像素
 * @param {cc.Rect} point
 * @return {cc.Rect}
 * @function
 */
cc.rectPointsToPixels = cc.IS_RETINA_DISPLAY_SUPPORTED ? function (point) {
   var scale = cc.contentScaleFactor();
    return cc.rect(point.x * scale, point.y * scale,
        point.width * scale, point.height * scale);
} : function (p) {
    return p;
};

//一些 gl 常量变量
/**
 * @constant
 * @type Number
 */
cc.ONE = 1;

/**
 * @constant
 * @type Number
 */
cc.ZERO = 0;

/**
 * @constant
 * @type Number
 */
cc.SRC_ALPHA = 0x0302;

/**
 * @constant
 * @type Number
 */
cc.SRC_ALPHA_SATURATE = 0x308;

/**
 * @constant
 * @type Number
 */
cc.SRC_COLOR = 0x300;

/**
 * @constant
 * @type Number
 */
cc.DST_ALPHA = 0x304;

/**
 * @constant
 * @type Number
 */
cc.DST_COLOR = 0x306;

/**
 * @constant
 * @type Number
 */
cc.ONE_MINUS_SRC_ALPHA = 0x0303;

/**
 * @constant
 * @type Number
 */
cc.ONE_MINUS_SRC_COLOR = 0x301;

/**
 * @constant
 * @type Number
 */
cc.ONE_MINUS_DST_ALPHA = 0x305;

/**
 * @constant
 * @type Number
 */
cc.ONE_MINUS_DST_COLOR = 0x0307;

/**
 * @constant
 * @type Number
 */
cc.ONE_MINUS_CONSTANT_ALPHA	= 0x8004;

/**
 * @constant
 * @type Number
 */
cc.ONE_MINUS_CONSTANT_COLOR	= 0x8002;

/**
 * 为纹理设置的常量，与gl.LINEAR相等
 * @constant
 * @type Number
 */
cc.LINEAR	= 0x2601;

/**
 * 为纹理设置的常量，与gl.REPEAT相等
 * @constant
 * @type Number
 */
cc.REPEAT	= 0x2901;

/**
 * 为纹理设置的常量，与gl.CLAMP_TO_EDGE相等
 * @constant
 * @type Number
 */
cc.CLAMP_TO_EDGE	= 0x812f;

/**
 * 为纹理设置的常量，与gl.MIRRORED_REPEAT相等
 * @constant
 * @type Number
 */
cc.MIRRORED_REPEAT   = 0x8370;

/**
 * 检查 webgl error.Error是否存在，存在则通过console显示。
 * @function
 */
cc.checkGLErrorDebug = function () {
    if (cc.renderMode == cc._RENDER_TYPE_WEBGL) {
        var _error = cc._renderContext.getError();
        if (_error) {
            cc.log(cc._LogInfos.checkGLErrorDebug, _error);
        }
    }
};

//可能的设备方向
/**
 * 设备竖向，home键在底部(UIDeviceOrientationPortrait)
 * @constant
 * @type Number
 */
cc.DEVICE_ORIENTATION_PORTRAIT = 0;

/**
 * 设备横向，home键在右侧(UIDeviceOrientationLandscapeLeft)
 * @constant
 * @type Number
 */
cc.DEVICE_ORIENTATION_LANDSCAPE_LEFT = 1;

/**
 * 设备竖向，home键在上(UIDeviceOrientationPortraitUpsideDown)
 * @constant
 * @type Number
 */
cc.DEVICE_ORIENTATION_PORTRAIT_UPSIDE_DOWN = 2;

/**
 * 设备横向，home键在左侧(UIDeviceOrientationLandscapeRight)
 * @constant
 * @type Number
 */
cc.DEVICE_ORIENTATION_LANDSCAPE_RIGHT = 3;

/**
 * 在浏览器中，我们仅支持由于窗口尺寸的变化产生的两种方向
 * @constant
 * @type Number
 */
cc.DEVICE_MAX_ORIENTATIONS = 2;


// ------------------- vertex attrib flags -----------------------------
/**
 * @constant
 * @type {Number}
 */
cc.VERTEX_ATTRIB_FLAG_NONE = 0;
/**
 * @constant
 * @type {Number}
 */
cc.VERTEX_ATTRIB_FLAG_POSITION = 1 << 0;
/**
 * @constant
 * @type {Number}
 */
cc.VERTEX_ATTRIB_FLAG_COLOR = 1 << 1;
/**
 * @constant
 * @type {Number}
 */
cc.VERTEX_ATTRIB_FLAG_TEX_COORDS = 1 << 2;
/**
 * @constant
 * @type {Number}
 */
cc.VERTEX_ATTRIB_FLAG_POS_COLOR_TEX = ( cc.VERTEX_ATTRIB_FLAG_POSITION | cc.VERTEX_ATTRIB_FLAG_COLOR | cc.VERTEX_ATTRIB_FLAG_TEX_COORDS );

/**
 * GL server side states
 * @constant
 * @type {Number}
 */
cc.GL_ALL = 0;

//-------------Vertex Attributes-----------
/**
 * @constant
 * @type {Number}
 */
cc.VERTEX_ATTRIB_POSITION = 0;
/**
 * @constant
 * @type {Number}
 */
cc.VERTEX_ATTRIB_COLOR = 1;
/**
 * @constant
 * @type {Number}
 */
cc.VERTEX_ATTRIB_TEX_COORDS = 2;
/**
 * @constant
 * @type {Number}
 */
cc.VERTEX_ATTRIB_MAX = 3;

//------------Uniforms------------------
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_PMATRIX = 0;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_MVMATRIX = 1;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_MVPMATRIX = 2;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_TIME = 3;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_SINTIME = 4;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_COSTIME = 5;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_RANDOM01 = 6;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_SAMPLER = 7;
/**
 * @constant
 * @type {Number}
 */
cc.UNIFORM_MAX = 8;

//------------Shader Name---------------
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_TEXTURECOLOR = "ShaderPositionTextureColor";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_TEXTURECOLORALPHATEST = "ShaderPositionTextureColorAlphaTest";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_COLOR = "ShaderPositionColor";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_TEXTURE = "ShaderPositionTexture";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_TEXTURE_UCOLOR = "ShaderPositionTexture_uColor";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_TEXTUREA8COLOR = "ShaderPositionTextureA8Color";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_UCOLOR = "ShaderPosition_uColor";
/**
 * @constant
 * @type {String}
 */
cc.SHADER_POSITION_LENGTHTEXTURECOLOR = "ShaderPositionLengthTextureColor";

//------------uniform names----------------
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_PMATRIX_S = "CC_PMatrix";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_MVMATRIX_S = "CC_MVMatrix";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_MVPMATRIX_S = "CC_MVPMatrix";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_TIME_S = "CC_Time";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_SINTIME_S = "CC_SinTime";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_COSTIME_S = "CC_CosTime";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_RANDOM01_S = "CC_Random01";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_SAMPLER_S = "CC_Texture0";
/**
 * @constant
 * @type {String}
 */
cc.UNIFORM_ALPHA_TEST_VALUE_S = "CC_alpha_value";

//------------Attribute names--------------
/**
 * @constant
 * @type {String}
 */
cc.ATTRIBUTE_NAME_COLOR = "a_color";
/**
 * @constant
 * @type {String}
 */
cc.ATTRIBUTE_NAME_POSITION = "a_position";
/**
 * @constant
 * @type {String}
 */
cc.ATTRIBUTE_NAME_TEX_COORD = "a_texCoord";


/**
 * 字体大小的默认值
 * @constant
 * @type Number
 */
cc.ITEM_SIZE = 32;

/**
 * 当前项的默认标记
 * @constant
 * @type Number
 */
cc.CURRENT_ITEM = 0xc0c05001;

/**
 * 缩放动作的默认标记
 * @constant
 * @type Number
 */
cc.ZOOM_ACTION_TAG = 0xc0c05002;

/**
 * 正常状态的默认标记
 * @constant
 * @type Number
 */
cc.NORMAL_TAG = 8801;

/**
 * 选中的默认标记
 * @constant
 * @type Number
 */
cc.SELECTED_TAG = 8802;

/**
 * 禁用的默认标记
 * @constant
 * @type Number
 */
cc.DISABLE_TAG = 8803;


// Array utils

/**
 * 检查数组中元素的类型
 * @param {Array} arr
 * @param {function} type
 * @return {Boolean}
 * @function
 */
cc.arrayVerifyType = function (arr, type) {
    if (arr && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (!(arr[i] instanceof  type)) {
                cc.log("element type is wrong!");
                return false;
            }
        }
    }
    return true;
};

/**
 * 搜索数组中与传入参数相同的第一个元素，并且移除它，如果没有找到，则不做任何处理
 * @function
 * @param {Array} arr 原数组
 * @param {*} delObj  需要移除的对象
 */
cc.arrayRemoveObject = function (arr, delObj) {
    for (var i = 0, l = arr.length; i < l; i++) {
        if (arr[i] == delObj) {
            arr.splice(i, 1);
            break;
        }
    }
};

/**
 * 在原数组中搜索移除元素数组的每一个元素，找到第一个匹配的元素以后，从原数组中移除
 * @function
 * @param {Array} arr 原数组
 * @param {Array} minusArr 移除元素数组
 */
cc.arrayRemoveArray = function (arr, minusArr) {
    for (var i = 0, l = minusArr.length; i < l; i++) {
        cc.arrayRemoveObject(arr, minusArr[i]);
    }
};

/**
 * 在指定索引处插入元素
 * @function
 * @param {Array} arr
 * @param {Array} addObjs
 * @param {Number} index
 * @return {Array}
 */
cc.arrayAppendObjectsToIndex = function(arr, addObjs,index){
    arr.splice.apply(arr, [index, 0].concat(addObjs));
    return arr;
};

/**
 * 拷贝一个数组的所有元素到一个新数组（性能比Array.slice好）
 * @param {Array} arr
 * @return {Array}
 */
cc.copyArray = function(arr){
    var i, len = arr.length, arr_clone = new Array(len);
    for (i = 0; i < len; i += 1)
        arr_clone[i] = arr[i];
    return arr_clone;
};