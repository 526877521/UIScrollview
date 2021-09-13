
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/cores/UISuperLayout.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '699eb1xVINCcZBBHwAgwDBT', 'UISuperLayout');
// cores/UISuperLayout.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UISuperDirection = exports.UISuperAxis = exports.UIChangeBrotherEvnet = void 0;
/*
 * @Author: steveJobs
 * @Email: icipiqkm@gmail.com
 * @Date: 2020-11-19 01:15:52
 * @Last Modified by: steveJobs
 * @Last Modified time: 2021-01-23 18:05:39
 * @Description: 名词说明 什么是一组item？
 * 垂直模式
 * 1,2,3 一组item包含 1,2,3  1是一组item中header 也是整个列表的header 3是一组item中footer 9是整个列表的footer
 * 4,5,6
 * 7,8,9
 * 调用 isGroupHeader传入 1节点 返回true  调用 isGroupFooter传入 3节点返回true
 * 调用 getGroupLeftX 传入 2节点 返回1节点位置X getGroupRightX 返回3节点位置X
 * 调用 getGroupBottomY 传入 5节点 返回8节点位置Y getGroupTopY 返回2节点位置Y
 * 水平模式
 * |1|,4,7 一组item包含 1,2,3 1是一组item中header 也是整个列表的header 3是一组item中footer 9是整个列表的footer
 * |2|,5,8
 * |3|,6,9
 */
var UISuperScrollView_1 = require("./UISuperScrollView");
var UISuperItem_1 = require("./UISuperItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var EPSILON = 1e-4;
exports.UIChangeBrotherEvnet = "UIChangeBrotherEvnet";
var UISuperAxis;
(function (UISuperAxis) {
    UISuperAxis[UISuperAxis["HORIZONTAL"] = 0] = "HORIZONTAL";
    UISuperAxis[UISuperAxis["VERTICAL"] = 1] = "VERTICAL";
})(UISuperAxis = exports.UISuperAxis || (exports.UISuperAxis = {}));
var UISuperDirection;
(function (UISuperDirection) {
    UISuperDirection[UISuperDirection["HEADER_TO_FOOTER"] = 0] = "HEADER_TO_FOOTER";
    UISuperDirection[UISuperDirection["FOOTER_TO_HEADER"] = 1] = "FOOTER_TO_HEADER";
})(UISuperDirection = exports.UISuperDirection || (exports.UISuperDirection = {}));
var UISuperLayout = /** @class */ (function (_super) {
    __extends(UISuperLayout, _super);
    function UISuperLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startAxis = UISuperAxis.VERTICAL;
        _this.direction = UISuperDirection.HEADER_TO_FOOTER;
        _this.paddingTop = 0;
        _this.paddingBottom = 0;
        _this.paddingLeft = 0;
        _this.paddingRight = 0;
        _this.spacing = cc.Vec2.ZERO;
        _this.column = 2;
        _this.multiple = 2;
        _this.prefab = null;
        _this.headerLoop = false;
        _this.footerLoop = false;
        _this.affectedByScale = true;
        _this.refreshItemEvents = [];
        _this._isinited = false;
        _this._maxPrefabTotal = 0;
        _this._children = []; //和this.node.children 保持同步
        _this._scrollView = null;
        _this._maxItemTotal = 0;
        _this._prevLayoutPosition = cc.Vec2.ZERO;
        /** 当前的滚动是否是由 scrollTo 方法执行的 和touch滑动做个区分*/
        _this.scrollToHeaderOrFooter = false;
        return _this;
    }
    Object.defineProperty(UISuperLayout.prototype, "layoutDirection", {
        /** 根据上一次和本次的坐标变化计算滑动方向 */
        get: function () {
            var pos = cc.Vec2.ZERO;
            if (this.vertical) {
                pos.y = this.node.y - this._prevLayoutPosition.y;
            }
            else {
                pos.x = this.node.x - this._prevLayoutPosition.x;
            }
            this._prevLayoutPosition = this.node.getPosition();
            return pos;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "isScrollToFooter", {
        /** 是否是向下滑动 */
        get: function () {
            if (this.vertical) {
                return this.layoutDirection.y < 0;
            }
            else {
                return this.layoutDirection.x > 0;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "children", {
        /** 自己维护的子节点数组 和this.node.children 保持同步 */
        get: function () { return this._children; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "maxItemTotal", {
        /** 最大数据总数 */
        get: function () { return this._maxItemTotal; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "maxPrefabTotal", {
        /** 当前被创建的item总数 */
        get: function () { return this._maxPrefabTotal; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "viewSize", {
        /** scrollView.view尺寸 */
        get: function () {
            return this.scrollView.view.getContentSize();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "vertical", {
        /** 是否是垂直模式 */
        get: function () {
            return this.startAxis == UISuperAxis.VERTICAL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "horizontal", {
        /** 是否是水平模式 */
        get: function () {
            return this.startAxis == UISuperAxis.HORIZONTAL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "headerToFooter", {
        /** 是否是正序排列 */
        get: function () {
            return this.direction == UISuperDirection.HEADER_TO_FOOTER;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "footerToHeader", {
        /** 是否是倒序排列 */
        get: function () {
            return this.direction == UISuperDirection.FOOTER_TO_HEADER;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "spacingWidth", {
        /** 水平间隔总宽度 (Grid 模式返回多个间隔总宽度) */
        get: function () {
            return this.spacing.x * (this.column - 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "spacingHeight", {
        /** 水平间隔总高度 (Grid 模式返回多个间隔总高度) */
        get: function () {
            return this.spacing.y * (this.column - 1);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "accommodWidth", {
        /** 可容纳item的真实宽度 */
        get: function () {
            return this.viewSize.width - this.paddingLeft - this.paddingRight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "accommodHeight", {
        /** 可容纳item的真实高度 */
        get: function () {
            return this.viewSize.height - this.paddingTop - this.paddingBottom;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "scrollView", {
        get: function () {
            if (!this._scrollView)
                this._scrollView = this.node.parent.parent.getComponent(UISuperScrollView_1.default);
            return this._scrollView;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "header", {
        /** 当前头部的item */
        get: function () {
            return this._children[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "footer", {
        /** 当前尾部的item */
        get: function () {
            return this._children[this._children.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "topBoundary", {
        /** 真实的上边距 */
        get: function () {
            if (this.headerToFooter) {
                return this.headerBoundaryY + this.paddingTop;
            }
            else {
                return this.footerBoundaryY + this.paddingTop;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "bottomBoundary", {
        /** 真实的下边距 */
        get: function () {
            if (this.headerToFooter) {
                return this.footerBoundaryY - this.paddingBottom;
            }
            else {
                return this.headerBoundaryY - this.paddingBottom;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "leftBoundary", {
        /** 真实的左边距 */
        get: function () {
            if (this.headerToFooter) {
                return this.headerBoundaryX - this.paddingLeft;
            }
            else {
                return this.footerBoundaryX - this.paddingLeft;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "rightBoundary", {
        /** 真实的右边距 */
        get: function () {
            if (this.headerToFooter) {
                return this.footerBoundaryX + this.paddingRight;
            }
            else {
                return this.headerBoundaryX + this.paddingRight;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "headerBoundaryX", {
        /** 头部item的世界坐标边框 类似 xMin、xMax */
        get: function () {
            if (this.headerToFooter) {
                return this.node.x + this.header.x - this.header.anchorX * this.getScaleWidth(this.header);
            }
            else {
                return this.node.x + this.header.x + (1 - this.header.anchorX) * this.getScaleWidth(this.header);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "headerBoundaryY", {
        /** 头部item的世界坐标边框 类似 yMin、yMax */
        get: function () {
            if (this.headerToFooter) {
                return this.node.y + this.header.y + (1 - this.header.anchorY) * this.getScaleHeight(this.header);
            }
            else {
                return this.node.y + this.header.y - this.header.anchorY * this.getScaleHeight(this.header);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "footerBoundaryX", {
        /** 尾部item的世界坐标边框 类似 xMin、xMax */
        get: function () {
            if (this.headerToFooter) {
                return this.node.x + this.footer.x + (1 - this.footer.anchorX) * this.getScaleWidth(this.footer);
            }
            else {
                return this.node.x + this.footer.x - this.footer.anchorX * this.getScaleWidth(this.footer);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "footerBoundaryY", {
        /** 尾部item的世界坐标边框 类似 yMin、yMax */
        get: function () {
            if (this.headerToFooter) {
                return this.node.y + this.footer.y - this.footer.anchorY * this.getScaleHeight(this.footer);
            }
            else {
                return this.node.y + this.footer.y + (1 - this.footer.anchorY) * this.getScaleHeight(this.footer);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISuperLayout.prototype, "isNormalSize", {
        get: function () {
            return this.node.getContentSize().equals(this.viewSize);
        },
        enumerable: false,
        configurable: true
    });
    /** 重写 this.node.getContentSize 动态计算头尾item 返回虚拟的尺寸 非content设置的尺寸 */
    UISuperLayout.prototype.getContentSize = function () {
        var size = this.getReallySize();
        var viewSize = this.scrollView.view.getContentSize();
        // 列表为空时 直接返回 scrollView.view 的尺寸
        if (size.height < viewSize.height) {
            size.height = viewSize.height;
        }
        if (size.width < viewSize.width) {
            size.width = viewSize.width;
        }
        return size;
    };
    /** 返回 header到 footer 之间的整体尺寸 */
    UISuperLayout.prototype.getReallySize = function () {
        if (this.node.childrenCount == 0)
            return this.viewSize;
        var size = cc.Size.ZERO;
        if (this.headerToFooter) { // 根据header和footer计算出真实的content尺寸 
            size.width = this.footerBoundaryX + -this.headerBoundaryX + this.paddingLeft + this.paddingRight;
            size.height = this.headerBoundaryY + -this.footerBoundaryY + this.paddingTop + this.paddingBottom;
        }
        else {
            size.width = this.headerBoundaryX + -this.footerBoundaryX + this.paddingLeft + this.paddingRight;
            size.height = this.footerBoundaryY + -this.headerBoundaryY + this.paddingTop + this.paddingBottom;
        }
        return size;
    };
    /** 重置scrollview */
    UISuperLayout.prototype.resetScrollView = function () {
        this.scrollView.reset();
    };
    /** 获取缩放系数 */
    UISuperLayout.prototype.getUsedScaleValue = function (value) {
        return this.affectedByScale ? Math.abs(value) : 1;
    };
    /** 设置最大item数量 */
    UISuperLayout.prototype.total = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var dataOffset, reallyOffset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.scrollView.stopAutoScroll();
                        this.scrollView.release(); // 释放（功能用于上拉加载 下拉刷新）
                        this.initlized(); // 初始化
                        return [4 /*yield*/, this.asyncCreateItem(value)]; // 分帧创建item
                    case 1:
                        _a.sent(); // 分帧创建item
                        dataOffset = this.getDataOffset(value) //获取数据偏移量（根据value相对于 _maxItemTotal 计算增加、减少的数量）
                        ;
                        reallyOffset = this.getReallyOffset(dataOffset) // 获取真实的数据偏移（Grid模式 功能用于判断是否需要偏移header来将下方填满）
                        ;
                        this.refreshItems(value, reallyOffset); //通过已有的item['index'] 加上数据偏移 来是刷新显示
                        this._maxItemTotal = value; // 记录当前总数
                        return [2 /*return*/];
                }
            });
        });
    };
    /** 获取兄弟节点 */
    UISuperLayout.prototype.getBrotherNode = function (node) {
        var index = this.getSiblingIndex(node) - 1; // 此 getSiblingIndex 非 this.node.getSiblingIndex
        return this._children[index];
    };
    /** 是否是一组item中第一个（垂直滑动中 一组item 就是单行的所有列 、水平滑动中 一组item 就是单列中所有行）*/
    UISuperLayout.prototype.isGroupHeader = function (node) {
        var xOry = this.getGroupHeader(node);
        var pos = this.vertical ? cc.v2(xOry.x, 0) : cc.v2(0, xOry.y);
        var self = this.vertical ? cc.v2(node.x, 0) : cc.v2(0, node.y);
        return self.fuzzyEquals(pos, EPSILON);
    };
    /** 是否是一组item中最后一个（垂直滑动中 一组item 就是单行的所有列 、水平滑动中 一组item 就是单列中所有行）*/
    UISuperLayout.prototype.isGroupFooter = function (node) {
        var xOry = this.getGroupFooter(node);
        var pos = this.vertical ? cc.v2(xOry.x, 0) : cc.v2(0, xOry.y);
        var self = this.vertical ? cc.v2(node.x, 0) : cc.v2(0, node.y);
        return self.fuzzyEquals(pos, EPSILON);
    };
    /** 获取一组item中起始位置 （垂直滑动中 一组item 就是单行的所有列 、水平滑动中 一组item 就是单列中所有行）*/
    UISuperLayout.prototype.getGroupHeader = function (node) {
        var pos = cc.Vec2.ZERO;
        if (!node)
            return pos;
        if (this.vertical) {
            if (this.headerToFooter) {
                pos.x = node.anchorX * this.getScaleWidth(node) + (this.paddingLeft * node.scaleX) - (this.node.anchorX * this.viewSize.width * node.scaleX);
                pos.y = (1 - node.anchorY) * -this.getScaleHeight(node) - this.paddingTop + (1 - this.node.anchorY) * this.viewSize.height;
            }
            else {
                pos.x = node.anchorX * this.getScaleWidth(node) + this.paddingLeft - this.node.anchorX * this.viewSize.width;
                pos.y = node.anchorY * this.getScaleHeight(node) + this.paddingBottom - this.node.anchorY * this.viewSize.height;
            }
        }
        else {
            if (this.headerToFooter) {
                pos.x = node.anchorX * this.getScaleWidth(node) + this.paddingLeft - this.node.anchorX * this.viewSize.width;
                pos.y = (1 - node.anchorY) * -node.height - this.paddingTop + (1 - this.node.anchorY) * this.viewSize.height;
            }
            else {
                pos.x = this.accommodWidth * this.node.anchorX - this.getScaleWidth(node) * (1 - node.anchorX);
                pos.y = (1 - node.anchorY) * -node.height - this.paddingTop + (1 - this.node.anchorY) * this.viewSize.height;
            }
        }
        return pos;
    };
    /** 获取一组item中结束位置 （垂直滑动中 一组item 就是单行的所有列 、水平滑动中 一组item 就是单列中所有行）*/
    UISuperLayout.prototype.getGroupFooter = function (node) {
        var pos = cc.Vec2.ZERO;
        if (!node)
            return pos;
        if (this.vertical) {
            pos.x = (this.accommodWidth + this.paddingLeft) * this.node.anchorX - (this.getScaleWidth(node) * (1 - node.anchorX) + this.node.anchorX * this.paddingRight);
            pos.y = node.y;
        }
        else {
            pos.x = node.x;
            pos.y = -((this.accommodHeight + this.paddingTop) * this.node.anchorY - this.getScaleHeight(node) * node.anchorY) + (1 - node.anchorY) * this.paddingBottom;
        }
        return pos;
    };
    /** 获取一组item中 node 相对 relative 右偏移量 （垂直滑动中 一组item 就是单行的所有列 、水平滑动中 一组item 就是单列中所有行）*/
    UISuperLayout.prototype.getGroupRightX = function (node, relative) {
        if (!node || !relative)
            return this.getGroupHeader(node).x;
        var prevWidth = relative.x + this.getScaleWidth(relative) * (1 - relative.anchorX);
        var selfWidth = this.getScaleWidth(node) * node.anchorX;
        return prevWidth + selfWidth + this.spacing.x;
    };
    /** 获取一组item中 node 相对 relative 左偏移量 （垂直滑动中 一组item 就是单行的所有列 、水平滑动中 一组item 就是单列中所有行）*/
    UISuperLayout.prototype.getGroupLeftX = function (node, relative) {
        if (!node || !relative)
            return this.getGroupFooter(node).x;
        var prevWidth = relative.x - this.getScaleWidth(relative) * relative.anchorX;
        var selfWidth = this.getScaleWidth(node) * (1 - node.anchorX);
        return prevWidth - selfWidth - this.spacing.x;
    };
    /** 获取一组item中 node 相对 relative 下偏移量 （垂直滑动中 一组item 就是单行的所有列 、水平滑动中 一组item 就是单列中所有行）*/
    UISuperLayout.prototype.getGroupBottomY = function (node, relative) {
        var prevHeight = relative.y - this.getScaleHeight(relative) * relative.anchorY;
        var selfHeight = this.getScaleHeight(node) * (1 - node.anchorY);
        return prevHeight - selfHeight - this.spacing.y;
    };
    /** 获取一组item中 node 相对 relative 上偏移量 （垂直滑动中 一组item 就是单行的所有列 、水平滑动中 一组item 就是单列中所有行）*/
    UISuperLayout.prototype.getGroupTopY = function (node, relative) {
        var prevHeight = relative.y + this.getScaleHeight(relative) * (1 - relative.anchorY);
        var selfHeight = this.getScaleHeight(node) * node.anchorY;
        return prevHeight + selfHeight + this.spacing.y;
    };
    /** 判断给定的 node 乘以 multiple 倍数后 是否超出了头部边框 （ multiple = 1 就是一个node的尺寸 默认1.5倍）*/
    UISuperLayout.prototype.isOutOfBoundaryHeader = function (node, multiple) {
        if (multiple === void 0) { multiple = 1.5; }
        var width = node.width * this.getUsedScaleValue(node.scaleX) * multiple;
        var height = -node.height * this.getUsedScaleValue(node.scaleY) * multiple;
        var offset = this.scrollView.getHowMuchOutOfBoundary(cc.v2(width, height));
        return offset;
    };
    /** 判断给定的 node 乘以 multiple 倍数后 是否超出了尾部部边框 （ multiple = 1 就是一个node的尺寸 默认1.5倍）*/
    UISuperLayout.prototype.isOutOfBoundaryFooter = function (node, multiple) {
        if (multiple === void 0) { multiple = 1.5; }
        var width = -node.width * this.getUsedScaleValue(node.scaleX) * multiple;
        var height = node.height * this.getUsedScaleValue(node.scaleY) * multiple;
        var offset = this.scrollView.getHowMuchOutOfBoundary(cc.v2(width, height));
        return offset;
    };
    /** 滚动到头部 （根据 排列方向、排列子节点的方向）来调用 scrollView.scrollTo... 方法 */
    UISuperLayout.prototype.scrollToHeader = function (timeInSecond, attenuated) {
        this.scrollToHeaderOrFooter = timeInSecond > 0;
        this.scrollView.stopAutoScroll();
        this.resetToHeader();
        if (this.headerToFooter) {
            if (this.vertical) {
                this.scrollView.scrollToTop(timeInSecond, attenuated);
            }
            else {
                this.scrollView.scrollToLeft(timeInSecond, attenuated);
            }
        }
        else {
            if (this.vertical) {
                this.scrollView.scrollToBottom(timeInSecond, attenuated);
            }
            else {
                this.scrollView.scrollToRight(timeInSecond, attenuated);
            }
        }
    };
    /** 滚动到尾部（根据 排列方向、排列子节点的方向）来调用 scrollView.scrollTo... 方法 */
    UISuperLayout.prototype.scrollToFooter = function (timeInSecond, attenuated) {
        this.scrollToHeaderOrFooter = timeInSecond > 0;
        this.scrollView.stopAutoScroll();
        this.resetToFooter();
        if (this.headerToFooter) {
            if (this.vertical) {
                this.scrollView.scrollToBottom(timeInSecond, attenuated);
            }
            else {
                this.scrollView.scrollToRight(timeInSecond, attenuated);
            }
        }
        else {
            if (this.vertical) {
                this.scrollView.scrollToTop(timeInSecond, attenuated);
            }
            else {
                this.scrollView.scrollToLeft(timeInSecond, attenuated);
            }
        }
    };
    /** 通知给定的node刷新数据 */
    UISuperLayout.prototype.notifyRefreshItem = function (target) {
        cc.Component.EventHandler.emitEvents(this.refreshItemEvents, target, target['index']);
    };
    /** 获取节点索引 */
    UISuperLayout.prototype.getSiblingIndex = function (node) {
        return this._children.indexOf(node);
    };
    /** 自定义索引方法 这里不是通过实时修改节点索引的方法，只是模拟类似的功能，实际上并没有真正改变节点的实际顺序（优化项） */
    UISuperLayout.prototype.setSiblingIndex = function (node, index) {
        // 此方法时参考引擎原setSiblingIndex方法 去掉了修改节点索引位置的调用（item本身的zIndex没有任何变化）
        index = index !== -1 ? index : this._children.length - 1;
        var oldIndex = this._children.indexOf(node);
        if (index !== oldIndex) {
            this._children.splice(oldIndex, 1);
            if (index < this._children.length) {
                this._children.splice(index, 0, node);
            }
            else {
                this._children.push(node);
            }
            /**
             * 这里区别于原方法 原方法是改变node节点顺序后发送cc.Node.EventType.SIBLING_ORDER_CHANGED通知 这里不需要修改节点顺序
             * 这里发送一个自定义事件 模拟 SIBLING_ORDER_CHANGED 通知
             */
            this.node.emit(exports.UIChangeBrotherEvnet);
        }
    };
    UISuperLayout.prototype.onLoad = function () {
        this.initlized();
    };
    /** 初始化 */
    UISuperLayout.prototype.initlized = function () {
        if (this._isinited)
            return;
        this.node.anchorX = 0.5; //固定content的锚点为中心
        this.node.anchorY = 0.5;
        this.node.setContentSize(this.viewSize); //将content的尺寸设置与view相同 （功能用于空列表时也可以下拉刷新和加载） 
        // 重写 this.node.getContentSize 方法 因为content的真实尺寸不会随着item的数量变化
        this.node.getContentSize = this.getContentSize.bind(this);
        this.node.setPosition(cc.Vec2.ZERO);
        this.column = this.column < 1 ? 1 : this.column; // 一组item的数量 最少是1 也就是普通的水平/垂直 大于1就是Grid模式
        // 监听content位置变化 刷新header footer节点的相对位置
        this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onChangePosition, this);
        this.scrollView.view.on(cc.Node.EventType.SIZE_CHANGED, this.resetItemSize, this);
        this._isinited = true;
    };
    UISuperLayout.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.POSITION_CHANGED, this.onChangePosition, this);
        this.scrollView.view.off(cc.Node.EventType.SIZE_CHANGED, this.resetItemSize, this);
    };
    UISuperLayout.prototype.onChangePosition = function () {
        var flag = this.isScrollToFooter; // this.isScrollToFooter = true 向下滑动 false 向上滑动
        if (this.headerToFooter) {
            flag ? this.footerToHeaderWatchChilds(flag) : this.headerToFooterWatchChilds(flag); // 倒序刷新
        }
        else {
            flag ? this.headerToFooterWatchChilds(flag) : this.footerToHeaderWatchChilds(flag); // 正序刷新
        }
        // 当item 由多到少 并且 当content的位置被重置到初始状态时 重新设置头部的item归位
        if (this.vertical && 0 == this.node.y || this.horizontal && 0 == this.node.x) {
            this.header.setPosition(this.getGroupHeader(this.header));
        }
    };
    UISuperLayout.prototype.resetItemSize = function () {
        // 重新设置原始尺寸
        for (var i = 0; i < this.children.length; i++) {
            this.children[i]['saveOriginSize']();
        }
        // 改变头部位置
        var pos = this.getGroupHeader(this.header);
        if (this.vertical) {
            this.header.x = pos.x;
        }
        else {
            this.header.y = pos.y;
        }
        // 通知改变坐标事件
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].emit(cc.Node.EventType.POSITION_CHANGED);
        }
    };
    /** 获取缩放宽度 */
    UISuperLayout.prototype.getScaleWidth = function (node) {
        return node.width * this.getUsedScaleValue(node.scaleX);
    };
    /** 获取缩放高度 */
    UISuperLayout.prototype.getScaleHeight = function (node) {
        return node.height * this.getUsedScaleValue(node.scaleY);
    };
    /** 简单的浅拷贝 */
    UISuperLayout.prototype.getTempChildren = function () {
        var list = [];
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            list.push(child);
        }
        return list;
    };
    /** 正序更新item */
    UISuperLayout.prototype.headerToFooterWatchChilds = function (flag) {
        var children = this.getTempChildren();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            child['watchSelf'](flag);
        }
    };
    /** 倒序更新item */
    UISuperLayout.prototype.footerToHeaderWatchChilds = function (flag) {
        var children = this.getTempChildren();
        for (var i = children.length - 1; i >= 0; i--) {
            var child = children[i];
            child['watchSelf'](flag);
        }
    };
    /** 当数据增加、减少时 获取数据偏移 */
    UISuperLayout.prototype.getDataOffset = function (value) {
        // 返回删除数据偏移 （比如当前最大数据值=10，新数据=9 返回-1）
        if (this.footer && this.footer['index'] + 1 >= value) {
            var offset = this.footer['index'] + 1 - value;
            return offset == 0 ? 0 : -offset;
        }
        // 返回增加数据偏移
        if (this._maxItemTotal == 0 || value < this._maxItemTotal || this._maxItemTotal < this._maxPrefabTotal)
            return 0; //比如当前最多允许创建10个item 当前显示5个 返回0
        if (this.isGroupFooter(this.footer))
            return 0; //Grid模式 如果尾部的位置是在一组item中末尾的位置时 返回 0 
        return value - this._maxItemTotal;
    };
    /**
     * 当数据增加、减少时 获取节点偏移量
     * 当前数据是这样的   增加1个     增加2个
     * 0,1,2,3           1,2,3         2,3
     * 4,5,6           4,5,6,7     4,5,6,7
     *                             8
    */
    UISuperLayout.prototype.getReallyOffset = function (dataOffset) {
        if (!this.header)
            return 0;
        if (dataOffset > 0) { // 代表增加item 表格模式下 通过偏移头部来让下方填满 填满后停止偏移
            for (var i = 0; i < dataOffset; i++) {
                if (this.isGroupFooter(this.footer))
                    return i; //返回真实的偏移量
                // 此时如果header 已经是一组item中最后一个时 向下位移 并 设置到一组item的起始位置   
                var pos = this.header.getPosition();
                if (this.vertical) { // 垂直滑动时
                    if (this.isGroupFooter(this.header)) { // 当列表中第一个item正在一组item中末尾位置时
                        if (this.headerToFooter) {
                            pos.y = this.getGroupBottomY(this.header, this.header); //正序排列时 Y轴向下偏移（垂直排列时 一组item 头在左尾在右）
                        }
                        else {
                            pos.y = this.getGroupTopY(this.header, this.header); //倒序排列时 Y轴向上偏移（垂直排列时 一组item 头在左尾在右）
                        }
                        pos.x = this.getGroupHeader(this.header).x; // X轴向头部偏移
                    }
                    else { // 第一个item没有在一组item中末尾的位置 只将第一个item向右偏移 (只偏移X轴)
                        pos.x = this.getGroupRightX(this.header, this.header); // X轴向右偏移
                    }
                }
                else { // 水平滑动时
                    if (this.isGroupFooter(this.header)) { // 当列表中第一个item正在一组item中末尾位置时
                        if (this.headerToFooter) {
                            pos.x = this.getGroupRightX(this.header, this.header); //正序排列时 X轴向右偏移（水平排列时 一组item 头在上尾在下）
                        }
                        else {
                            pos.x = this.getGroupLeftX(this.header, this.header); //倒序排列时 X轴向左偏移（水平排列时 一组item 头在上尾在下）
                        }
                        pos.y = this.getGroupHeader(this.header).y; // Y轴向头部偏移
                    }
                    else { // 第一个item没有在一组item中末尾的位置 只将第一个item向下偏移 (只偏移Y轴)
                        pos.y = this.getGroupBottomY(this.header, this.header); // Y轴向下偏移
                    }
                }
                this.header.setPosition(pos);
            }
            return dataOffset;
        }
        // 代表减少了item 计算偏移量 offset<0 【注意！这里的逻辑和上面正好相反】
        for (var i = 0; i < Math.abs(dataOffset); i++) {
            var pos = cc.Vec2.ZERO;
            if (this.vertical) {
                if (this.isGroupHeader(this.header)) {
                    pos.x = this.getGroupFooter(this.header).x;
                    if (this.headerToFooter) {
                        pos.y = this.getGroupTopY(this.header, this.header);
                    }
                    else {
                        pos.y = this.getGroupBottomY(this.header, this.header);
                    }
                }
                else {
                    pos.x = this.getGroupLeftX(this.header, this.header);
                    pos.y = this.header.y;
                }
            }
            else {
                if (this.isGroupHeader(this.header)) {
                    pos.y = this.getGroupFooter(this.header).y;
                    if (this.headerToFooter) {
                        pos.x = this.getGroupLeftX(this.header, this.header);
                    }
                    else {
                        pos.x = this.getGroupRightX(this.header, this.header);
                    }
                }
                else {
                    pos.y = this.getGroupTopY(this.header, this.header);
                    pos.x = this.header.x;
                }
            }
            this.header.setPosition(pos);
        }
        this.scrollView.calculateBoundary();
        return dataOffset;
    };
    /** 刷新所有item数据 根据当前item的 index 刷新 */
    UISuperLayout.prototype.refreshItems = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        if (!this.header)
            return;
        var startIndex = this.header['index'] - 1 + offset; // 获取头部item持有的index 加上 数据偏移来计算起始index 
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            startIndex++;
            // 这里的判断用于无限循环滚动的逻辑 如果索引大于数据总数 索引归零
            if (startIndex > value - 1) {
                startIndex = 0;
            }
            else if (startIndex < 0) { // 索引小于0 索引定位到数据尾部 保持首尾相连
                startIndex = value - 1;
            }
            child['index'] = startIndex; //设置当前索引
            this.notifyRefreshItem(child);
        }
    };
    /** 从头部到尾部重置数据 */
    UISuperLayout.prototype.resetToHeader = function () {
        var _a, _b;
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            child['index'] = i;
            this.notifyRefreshItem(child);
        }
        if (!this.headerLoop && !this.footerLoop) {
            (_a = this.header) === null || _a === void 0 ? void 0 : _a.setPosition(this.getGroupHeader(this.header));
        }
        else if (!this.scrollToHeaderOrFooter) {
            (_b = this.header) === null || _b === void 0 ? void 0 : _b.setPosition(this.getGroupHeader(this.header));
        }
    };
    /** 从尾部到头部重置数据 */
    UISuperLayout.prototype.resetToFooter = function () {
        var index = this._maxItemTotal;
        for (var i = this._children.length - 1; i >= 0; i--) {
            var child = this._children[i];
            child['index'] = --index;
            this.notifyRefreshItem(child);
        }
    };
    /** 删除多余的item */
    UISuperLayout.prototype.removeChilds = function (value) {
        // 有多余的item 需要删除
        var length = this.node.childrenCount - value;
        // 删除掉多余的item
        for (var i = 0; i < length; i++) {
            var child = this.footer;
            this.remChild(child);
            child.destroy();
            this.node.removeChild(child);
        }
        if (!this.header)
            return;
        // 将头部节点的位置重置到一组item的第一个位置
        var pos = this.getGroupHeader(this.header);
        if (this.vertical) {
            this.header.x = pos.x;
        }
        else {
            this.header.y = pos.y;
        }
    };
    /** 分帧创建item */
    UISuperLayout.prototype.asyncCreateItem = function (value) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var total;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (_a = this._gener) === null || _a === void 0 ? void 0 : _a.return(""); //取消上一次的分帧任务（如果任务正在执行）
                        // 有多余的item 需要删除 不处理
                        if (this.node.childrenCount > value)
                            return [2 /*return*/, this.removeChilds(value)
                                // 已经固定item总数 不处理
                            ];
                        // 已经固定item总数 不处理
                        if (this._maxPrefabTotal > 0 && this._maxPrefabTotal == this.node.childrenCount)
                            return [2 /*return*/];
                        total = value - this.node.childrenCount //计算当前应该创建的总数
                        ;
                        this._gener = this.getGeneratorLength(total, function () {
                            var child = cc.instantiate(_this.prefab);
                            child['index'] = _this.node.childrenCount;
                            _this.addChild(child);
                            // 获取或添加 UISuperItem
                            var spuerItem = child.getComponent(UISuperItem_1.default) || child.addComponent(UISuperItem_1.default);
                            _this.node.addChild(child);
                            spuerItem.init(_this);
                            // item在首次创建时立即刷新 避免显示item初始状态
                            _this.notifyRefreshItem(child);
                            // 如果创建的是第一个item 设置他的起始位置 之后的item会自动相对于他来设置自己 我们只需要确定第一个位置就行了
                            if (_this.node.childrenCount == 1) {
                                var pos = _this.getGroupHeader(_this.header); //获取一组item中头部位置
                                _this.header.setPosition(pos);
                                /**
                                 * 利用cc.ScrollView的方法来设置content的起始位置 由于content在初始化的时候固定了锚点都为0.5 所以这里必然是坐标0
                                 * 如果你没有其他需求确定用0.5锚点的话 这里可以自己设置为cc.Vec2.ZERO 节省不必要的计算（实际上计算量可忽略不计）
                                 */
                                _this.scrollView.calculateBoundary();
                            }
                            var selfHorW, viewHorW;
                            if (_this.vertical) {
                                selfHorW = _this.getReallySize().height;
                                viewHorW = _this.viewSize.height;
                            }
                            else {
                                selfHorW = _this.getReallySize().width;
                                viewHorW = _this.viewSize.width;
                            }
                            /**
                             * 根据排列方向 来判断对比宽度还是高度
                             * 这里使用参数this.multiple来判断是否需要继续创建 默认为2倍 比如view可视尺寸为800 2倍就是1600
                             * 根据之前所创建的所有item的尺寸计算是否满足这个尺寸 如果满足则不再继续创建
                             * 由于是分帧加载 所以下一次创建会等这一次的返回结果 返回false 则终止分帧任务
                             */
                            if (selfHorW >= viewHorW * _this.multiple && _this.isGroupFooter(_this.footer)) {
                                _this._maxPrefabTotal = _this.node.childrenCount; //固定item数量 不在继续创建
                                return false;
                            }
                            return true;
                        });
                        return [4 /*yield*/, this.exeGenerator(this._gener, 10)]; //执行分帧任务 1帧创建10个
                    case 1:
                        _b.sent(); //执行分帧任务 1帧创建10个
                        return [2 /*return*/];
                }
            });
        });
    };
    /** 同步添加本地变量 children 并发送 UIChangeBrotherEvnet 通知*/
    UISuperLayout.prototype.addChild = function (node) {
        this._children.push(node);
        this.node.emit(exports.UIChangeBrotherEvnet);
    };
    /** 同步移除本地变量 children 并发送 UIChangeBrotherEvnet 通知 */
    UISuperLayout.prototype.remChild = function (node) {
        var index = this._children.indexOf(node);
        if (index == -1)
            return;
        this._children.splice(index, 1);
        this.node.emit(exports.UIChangeBrotherEvnet);
    };
    /** 分帧加载 */
    UISuperLayout.prototype.getGeneratorLength = function (length, callback) {
        var _i, i, result;
        var params = [];
        for (_i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < length)) return [3 /*break*/, 5];
                    result = callback.apply(void 0, __spreadArrays([i], params));
                    if (!result) return [3 /*break*/, 3];
                    return [4 /*yield*/];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3: return [2 /*return*/];
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    };
    /** 分帧执行 */
    UISuperLayout.prototype.exeGenerator = function (generator, duration) {
        return new Promise(function (resolve, reject) {
            var gen = generator;
            var execute = function () {
                var startTime = new Date().getTime();
                for (var iter = gen.next();; iter = gen.next()) {
                    if (iter == null || iter.done) {
                        resolve(null);
                        return;
                    }
                    if (new Date().getTime() - startTime > duration) {
                        setTimeout(function () { return execute(); }, cc.director.getDeltaTime() * 1000);
                        return;
                    }
                }
            };
            execute();
        });
    };
    __decorate([
        property({ type: cc.Enum(UISuperAxis), displayName: "排列方向" })
    ], UISuperLayout.prototype, "startAxis", void 0);
    __decorate([
        property({ type: cc.Enum(UISuperDirection), displayName: "排列子节点的方向" })
    ], UISuperLayout.prototype, "direction", void 0);
    __decorate([
        property({ displayName: "上边距" })
    ], UISuperLayout.prototype, "paddingTop", void 0);
    __decorate([
        property({ displayName: "下边距" })
    ], UISuperLayout.prototype, "paddingBottom", void 0);
    __decorate([
        property({ displayName: "左边距" })
    ], UISuperLayout.prototype, "paddingLeft", void 0);
    __decorate([
        property({ displayName: "右边距" })
    ], UISuperLayout.prototype, "paddingRight", void 0);
    __decorate([
        property({ displayName: "间隔" })
    ], UISuperLayout.prototype, "spacing", void 0);
    __decorate([
        property({ displayName: "每组item个数", tooltip: "单行的列数 或 单列的行数" })
    ], UISuperLayout.prototype, "column", void 0);
    __decorate([
        property({ displayName: "item创建倍率", tooltip: "相对于view的尺寸 默认2倍" })
    ], UISuperLayout.prototype, "multiple", void 0);
    __decorate([
        property({ type: cc.Prefab, displayName: "item Prefab" })
    ], UISuperLayout.prototype, "prefab", void 0);
    __decorate([
        property({ displayName: "头部滑动循环" })
    ], UISuperLayout.prototype, "headerLoop", void 0);
    __decorate([
        property({ displayName: "尾部滑动循环" })
    ], UISuperLayout.prototype, "footerLoop", void 0);
    __decorate([
        property
    ], UISuperLayout.prototype, "affectedByScale", void 0);
    __decorate([
        property(cc.Component.EventHandler)
    ], UISuperLayout.prototype, "refreshItemEvents", void 0);
    UISuperLayout = __decorate([
        ccclass,
        menu("UISuperLayout")
    ], UISuperLayout);
    return UISuperLayout;
}(cc.Component));
exports.default = UISuperLayout;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29yZXNcXFVJU3VwZXJMYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gseURBQW9EO0FBQ3BELDZDQUF3QztBQUNsQyxJQUFBLEtBQThCLEVBQUUsQ0FBQyxVQUFVLEVBQXpDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLElBQUksVUFBa0IsQ0FBQztBQUNsRCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDUixRQUFBLG9CQUFvQixHQUFHLHNCQUFzQixDQUFBO0FBQzFELElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNuQix5REFBYyxDQUFBO0lBQ2QscURBQVksQ0FBQTtBQUNoQixDQUFDLEVBSFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFHdEI7QUFDRCxJQUFZLGdCQUdYO0FBSEQsV0FBWSxnQkFBZ0I7SUFDeEIsK0VBQW9CLENBQUE7SUFDcEIsK0VBQW9CLENBQUE7QUFDeEIsQ0FBQyxFQUhXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBRzNCO0FBR0Q7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUF1ckJDO1FBdHJCa0UsZUFBUyxHQUFnQixXQUFXLENBQUMsUUFBUSxDQUFBO1FBQ3BDLGVBQVMsR0FBcUIsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUE7UUFDckcsZ0JBQVUsR0FBVyxDQUFDLENBQUE7UUFDdEIsbUJBQWEsR0FBVyxDQUFDLENBQUE7UUFDekIsaUJBQVcsR0FBVyxDQUFDLENBQUE7UUFDdkIsa0JBQVksR0FBVyxDQUFDLENBQUE7UUFDekIsYUFBTyxHQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQ0MsWUFBTSxHQUFXLENBQUMsQ0FBQTtRQUNo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ZUpvYnNcbiAqIEBFbWFpbDogaWNpcGlxa21AZ21haWwuY29tXG4gKiBARGF0ZTogMjAyMC0xMS0xOSAwMToxNTo1MlxuICogQExhc3QgTW9kaWZpZWQgYnk6IHN0ZXZlSm9ic1xuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAyMS0wMS0yMyAxODowNTozOVxuICogQERlc2NyaXB0aW9uOiDlkI3or43or7TmmI4g5LuA5LmI5piv5LiA57uEaXRlbe+8n1xuICog5Z6C55u05qih5byPICBcbiAqIDEsMiwzIOS4gOe7hGl0ZW3ljIXlkKsgMSwyLDMgIDHmmK/kuIDnu4RpdGVt5LitaGVhZGVyIOS5n+aYr+aVtOS4quWIl+ihqOeahGhlYWRlciAz5piv5LiA57uEaXRlbeS4rWZvb3RlciA55piv5pW05Liq5YiX6KGo55qEZm9vdGVyXG4gKiA0LDUsNlxuICogNyw4LDlcbiAqIOiwg+eUqCBpc0dyb3VwSGVhZGVy5Lyg5YWlIDHoioLngrkg6L+U5ZuedHJ1ZSAg6LCD55SoIGlzR3JvdXBGb290ZXLkvKDlhaUgM+iKgueCuei/lOWbnnRydWUgXG4gKiDosIPnlKggZ2V0R3JvdXBMZWZ0WCDkvKDlhaUgMuiKgueCuSDov5Tlm54x6IqC54K55L2N572uWCBnZXRHcm91cFJpZ2h0WCDov5Tlm54z6IqC54K55L2N572uWFxuICog6LCD55SoIGdldEdyb3VwQm90dG9tWSDkvKDlhaUgNeiKgueCuSDov5Tlm5446IqC54K55L2N572uWSBnZXRHcm91cFRvcFkg6L+U5ZueMuiKgueCueS9jee9rllcbiAqIOawtOW5s+aooeW8j1xuICogfDF8LDQsNyDkuIDnu4RpdGVt5YyF5ZCrIDEsMiwzIDHmmK/kuIDnu4RpdGVt5LitaGVhZGVyIOS5n+aYr+aVtOS4quWIl+ihqOeahGhlYWRlciAz5piv5LiA57uEaXRlbeS4rWZvb3RlciA55piv5pW05Liq5YiX6KGo55qEZm9vdGVyXG4gKiB8MnwsNSw4XG4gKiB8M3wsNiw5XG4gKi9cbmltcG9ydCBVSVNwdWVyU2Nyb2xsVmlldyBmcm9tICcuL1VJU3VwZXJTY3JvbGxWaWV3JztcbmltcG9ydCBVSVNwdWVySXRlbSBmcm9tICcuL1VJU3VwZXJJdGVtJztcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XG5jb25zdCBFUFNJTE9OID0gMWUtNDtcbmV4cG9ydCBjb25zdCBVSUNoYW5nZUJyb3RoZXJFdm5ldCA9IFwiVUlDaGFuZ2VCcm90aGVyRXZuZXRcIlxuZXhwb3J0IGVudW0gVUlTdXBlckF4aXMge1xuICAgIEhPUklaT05UQUwgPSAwLFxuICAgIFZFUlRJQ0FMID0gMVxufVxuZXhwb3J0IGVudW0gVUlTdXBlckRpcmVjdGlvbiB7XG4gICAgSEVBREVSX1RPX0ZPT1RFUiA9IDAsXG4gICAgRk9PVEVSX1RPX0hFQURFUiA9IDEsXG59XG5AY2NjbGFzc1xuQG1lbnUoXCJVSVN1cGVyTGF5b3V0XCIpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVN1cGVyTGF5b3V0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5FbnVtKFVJU3VwZXJBeGlzKSwgZGlzcGxheU5hbWU6IFwi5o6S5YiX5pa55ZCRXCIgfSkgc3RhcnRBeGlzOiBVSVN1cGVyQXhpcyA9IFVJU3VwZXJBeGlzLlZFUlRJQ0FMXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShVSVN1cGVyRGlyZWN0aW9uKSwgZGlzcGxheU5hbWU6IFwi5o6S5YiX5a2Q6IqC54K555qE5pa55ZCRXCIgfSkgZGlyZWN0aW9uOiBVSVN1cGVyRGlyZWN0aW9uID0gVUlTdXBlckRpcmVjdGlvbi5IRUFERVJfVE9fRk9PVEVSXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5LiK6L656LedXCIgfSkgcGFkZGluZ1RvcDogbnVtYmVyID0gMFxuICAgIEBwcm9wZXJ0eSh7IGRpc3BsYXlOYW1lOiBcIuS4i+i+uei3nVwiIH0pIHBhZGRpbmdCb3R0b206IG51bWJlciA9IDBcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLlt6bovrnot51cIiB9KSBwYWRkaW5nTGVmdDogbnVtYmVyID0gMFxuICAgIEBwcm9wZXJ0eSh7IGRpc3BsYXlOYW1lOiBcIuWPs+i+uei3nVwiIH0pIHBhZGRpbmdSaWdodDogbnVtYmVyID0gMFxuICAgIEBwcm9wZXJ0eSh7IGRpc3BsYXlOYW1lOiBcIumXtOmalFwiIH0pIHNwYWNpbmc6IGNjLlZlYzIgPSBjYy5WZWMyLlpFUk9cbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLmr4/nu4RpdGVt5Liq5pWwXCIsIHRvb2x0aXA6IFwi5Y2V6KGM55qE5YiX5pWwIOaIliDljZXliJfnmoTooYzmlbBcIiB9KSBjb2x1bW46IG51bWJlciA9IDJcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCJpdGVt5Yib5bu65YCN546HXCIsIHRvb2x0aXA6IFwi55u45a+55LqOdmlld+eahOWwuuWvuCDpu5jorqQy5YCNXCIgfSkgbXVsdGlwbGU6IG51bWJlciA9IDJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5QcmVmYWIsIGRpc3BsYXlOYW1lOiBcIml0ZW0gUHJlZmFiXCIgfSkgcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5aS06YOo5ruR5Yqo5b6q546vXCIgfSkgaGVhZGVyTG9vcDogYm9vbGVhbiA9IGZhbHNlXG4gICAgQHByb3BlcnR5KHsgZGlzcGxheU5hbWU6IFwi5bC+6YOo5ruR5Yqo5b6q546vXCIgfSkgZm9vdGVyTG9vcDogYm9vbGVhbiA9IGZhbHNlXG4gICAgQHByb3BlcnR5IGFmZmVjdGVkQnlTY2FsZTogYm9vbGVhbiA9IHRydWVcbiAgICBAcHJvcGVydHkoY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcikgcmVmcmVzaEl0ZW1FdmVudHM6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXSA9IFtdXG4gICAgcHJpdmF0ZSBfZ2VuZXI6IEdlbmVyYXRvclxuICAgIHByaXZhdGUgX2lzaW5pdGVkOiBib29sZWFuID0gZmFsc2VcbiAgICBwcml2YXRlIF9tYXhQcmVmYWJUb3RhbDogbnVtYmVyID0gMFxuICAgIHByaXZhdGUgX2NoaWxkcmVuOiBjYy5Ob2RlW10gPSBbXSAvL+WSjHRoaXMubm9kZS5jaGlsZHJlbiDkv53mjIHlkIzmraVcbiAgICBwcml2YXRlIF92aWV3U2l6ZTogY2MuU2l6ZVxuICAgIHByaXZhdGUgX3Njcm9sbFZpZXc6IFVJU3B1ZXJTY3JvbGxWaWV3ID0gbnVsbFxuICAgIHByaXZhdGUgX21heEl0ZW1Ub3RhbDogbnVtYmVyID0gMFxuICAgIHByaXZhdGUgX3ByZXZMYXlvdXRQb3NpdGlvbjogY2MuVmVjMiA9IGNjLlZlYzIuWkVST1xuICAgIC8qKiDlvZPliY3nmoTmu5rliqjmmK/lkKbmmK/nlLEgc2Nyb2xsVG8g5pa55rOV5omn6KGM55qEIOWSjHRvdWNo5ruR5Yqo5YGa5Liq5Yy65YiGKi9cbiAgICBwdWJsaWMgc2Nyb2xsVG9IZWFkZXJPckZvb3RlcjogYm9vbGVhbiA9IGZhbHNlXG4gICAgLyoqIOagueaNruS4iuS4gOasoeWSjOacrOasoeeahOWdkOagh+WPmOWMluiuoeeul+a7keWKqOaWueWQkSAqL1xuICAgIHByaXZhdGUgZ2V0IGxheW91dERpcmVjdGlvbigpOiBjYy5WZWMyIHtcbiAgICAgICAgbGV0IHBvcyA9IGNjLlZlYzIuWkVST1xuICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgcG9zLnkgPSB0aGlzLm5vZGUueSAtIHRoaXMuX3ByZXZMYXlvdXRQb3NpdGlvbi55XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb3MueCA9IHRoaXMubm9kZS54IC0gdGhpcy5fcHJldkxheW91dFBvc2l0aW9uLnhcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcmV2TGF5b3V0UG9zaXRpb24gPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKVxuICAgICAgICByZXR1cm4gcG9zXG4gICAgfVxuICAgIC8qKiDmmK/lkKbmmK/lkJHkuIvmu5HliqggKi9cbiAgICBwcml2YXRlIGdldCBpc1Njcm9sbFRvRm9vdGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGF5b3V0RGlyZWN0aW9uLnkgPCAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXREaXJlY3Rpb24ueCA+IDBcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiog6Ieq5bex57u05oqk55qE5a2Q6IqC54K55pWw57uEIOWSjHRoaXMubm9kZS5jaGlsZHJlbiDkv53mjIHlkIzmraUgKi9cbiAgICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCkgeyByZXR1cm4gdGhpcy5fY2hpbGRyZW4gfVxuICAgIC8qKiDmnIDlpKfmlbDmja7mgLvmlbAgKi9cbiAgICBwdWJsaWMgZ2V0IG1heEl0ZW1Ub3RhbCgpIHsgcmV0dXJuIHRoaXMuX21heEl0ZW1Ub3RhbCB9XG4gICAgLyoqIOW9k+WJjeiiq+WIm+W7uueahGl0ZW3mgLvmlbAgKi9cbiAgICBwdWJsaWMgZ2V0IG1heFByZWZhYlRvdGFsKCkgeyByZXR1cm4gdGhpcy5fbWF4UHJlZmFiVG90YWwgfVxuICAgIC8qKiBzY3JvbGxWaWV3LnZpZXflsLrlr7ggKi9cbiAgICBwdWJsaWMgZ2V0IHZpZXdTaXplKCk6IGNjLlNpemUge1xuICAgICAgICByZXR1cm4gdGhpcy5zY3JvbGxWaWV3LnZpZXcuZ2V0Q29udGVudFNpemUoKVxuICAgIH1cbiAgICAvKiog5piv5ZCm5piv5Z6C55u05qih5byPICovXG4gICAgcHVibGljIGdldCB2ZXJ0aWNhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRBeGlzID09IFVJU3VwZXJBeGlzLlZFUlRJQ0FMXG4gICAgfVxuICAgIC8qKiDmmK/lkKbmmK/msLTlubPmqKHlvI8gKi9cbiAgICBwdWJsaWMgZ2V0IGhvcml6b250YWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0QXhpcyA9PSBVSVN1cGVyQXhpcy5IT1JJWk9OVEFMXG4gICAgfVxuICAgIC8qKiDmmK/lkKbmmK/mraPluo/mjpLliJcgKi9cbiAgICBwdWJsaWMgZ2V0IGhlYWRlclRvRm9vdGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT0gVUlTdXBlckRpcmVjdGlvbi5IRUFERVJfVE9fRk9PVEVSXG4gICAgfVxuICAgIC8qKiDmmK/lkKbmmK/lgJLluo/mjpLliJcgKi9cbiAgICBwdWJsaWMgZ2V0IGZvb3RlclRvSGVhZGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb24gPT0gVUlTdXBlckRpcmVjdGlvbi5GT09URVJfVE9fSEVBREVSXG4gICAgfVxuICAgIC8qKiDmsLTlubPpl7TpmpTmgLvlrr3luqYgKEdyaWQg5qih5byP6L+U5Zue5aSa5Liq6Ze06ZqU5oC75a695bqmKSAqL1xuICAgIHB1YmxpYyBnZXQgc3BhY2luZ1dpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGFjaW5nLnggKiAodGhpcy5jb2x1bW4gLSAxKVxuICAgIH1cbiAgICAvKiog5rC05bmz6Ze06ZqU5oC76auY5bqmIChHcmlkIOaooeW8j+i/lOWbnuWkmuS4qumXtOmalOaAu+mrmOW6pikgKi9cbiAgICBwdWJsaWMgZ2V0IHNwYWNpbmdIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwYWNpbmcueSAqICh0aGlzLmNvbHVtbiAtIDEpXG4gICAgfVxuICAgIC8qKiDlj6/lrrnnurNpdGVt55qE55yf5a6e5a695bqmICovXG4gICAgcHVibGljIGdldCBhY2NvbW1vZFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3U2l6ZS53aWR0aCAtIHRoaXMucGFkZGluZ0xlZnQgLSB0aGlzLnBhZGRpbmdSaWdodFxuICAgIH1cbiAgICAvKiog5Y+v5a6557qzaXRlbeeahOecn+WunumrmOW6piAqL1xuICAgIHB1YmxpYyBnZXQgYWNjb21tb2RIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXdTaXplLmhlaWdodCAtIHRoaXMucGFkZGluZ1RvcCAtIHRoaXMucGFkZGluZ0JvdHRvbVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0IHNjcm9sbFZpZXcoKTogVUlTcHVlclNjcm9sbFZpZXcge1xuICAgICAgICBpZiAoIXRoaXMuX3Njcm9sbFZpZXcpIHRoaXMuX3Njcm9sbFZpZXcgPSB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5nZXRDb21wb25lbnQoVUlTcHVlclNjcm9sbFZpZXcpXG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxWaWV3XG4gICAgfVxuICAgIC8qKiDlvZPliY3lpLTpg6jnmoRpdGVtICovXG4gICAgcHVibGljIGdldCBoZWFkZXIoKTogY2MuTm9kZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlblswXVxuICAgIH1cbiAgICAvKiog5b2T5YmN5bC+6YOo55qEaXRlbSAqL1xuICAgIHB1YmxpYyBnZXQgZm9vdGVyKCk6IGNjLk5vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW5bdGhpcy5fY2hpbGRyZW4ubGVuZ3RoIC0gMV1cbiAgICB9XG4gICAgLyoqIOecn+WunueahOS4iui+uei3nSAqL1xuICAgIHB1YmxpYyBnZXQgdG9wQm91bmRhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLmhlYWRlclRvRm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWFkZXJCb3VuZGFyeVkgKyB0aGlzLnBhZGRpbmdUb3BcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvb3RlckJvdW5kYXJ5WSArIHRoaXMucGFkZGluZ1RvcFxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiDnnJ/lrp7nmoTkuIvovrnot50gKi9cbiAgICBwdWJsaWMgZ2V0IGJvdHRvbUJvdW5kYXJ5KCkge1xuICAgICAgICBpZiAodGhpcy5oZWFkZXJUb0Zvb3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9vdGVyQm91bmRhcnlZIC0gdGhpcy5wYWRkaW5nQm90dG9tXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWFkZXJCb3VuZGFyeVkgLSB0aGlzLnBhZGRpbmdCb3R0b21cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiog55yf5a6e55qE5bem6L656LedICovXG4gICAgcHVibGljIGdldCBsZWZ0Qm91bmRhcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLmhlYWRlclRvRm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWFkZXJCb3VuZGFyeVggLSB0aGlzLnBhZGRpbmdMZWZ0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb290ZXJCb3VuZGFyeVggLSB0aGlzLnBhZGRpbmdMZWZ0XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIOecn+WunueahOWPs+i+uei3nSAqL1xuICAgIHB1YmxpYyBnZXQgcmlnaHRCb3VuZGFyeSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyVG9Gb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvb3RlckJvdW5kYXJ5WCArIHRoaXMucGFkZGluZ1JpZ2h0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWFkZXJCb3VuZGFyeVggKyB0aGlzLnBhZGRpbmdSaWdodFxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiDlpLTpg6hpdGVt55qE5LiW55WM5Z2Q5qCH6L655qGGIOexu+S8vCB4TWlu44CBeE1heCAqL1xuICAgIHB1YmxpYyBnZXQgaGVhZGVyQm91bmRhcnlYKCkge1xuICAgICAgICBpZiAodGhpcy5oZWFkZXJUb0Zvb3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZS54ICsgdGhpcy5oZWFkZXIueCAtIHRoaXMuaGVhZGVyLmFuY2hvclggKiB0aGlzLmdldFNjYWxlV2lkdGgodGhpcy5oZWFkZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnggKyB0aGlzLmhlYWRlci54ICsgKDEgLSB0aGlzLmhlYWRlci5hbmNob3JYKSAqIHRoaXMuZ2V0U2NhbGVXaWR0aCh0aGlzLmhlYWRlcilcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiog5aS06YOoaXRlbeeahOS4lueVjOWdkOagh+i+ueahhiDnsbvkvLwgeU1pbuOAgXlNYXggKi9cbiAgICBwdWJsaWMgZ2V0IGhlYWRlckJvdW5kYXJ5WSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyVG9Gb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGUueSArIHRoaXMuaGVhZGVyLnkgKyAoMSAtIHRoaXMuaGVhZGVyLmFuY2hvclkpICogdGhpcy5nZXRTY2FsZUhlaWdodCh0aGlzLmhlYWRlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGUueSArIHRoaXMuaGVhZGVyLnkgLSB0aGlzLmhlYWRlci5hbmNob3JZICogdGhpcy5nZXRTY2FsZUhlaWdodCh0aGlzLmhlYWRlcilcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiog5bC+6YOoaXRlbeeahOS4lueVjOWdkOagh+i+ueahhiDnsbvkvLwgeE1pbuOAgXhNYXggKi9cbiAgICBwdWJsaWMgZ2V0IGZvb3RlckJvdW5kYXJ5WCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyVG9Gb290ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGUueCArIHRoaXMuZm9vdGVyLnggKyAoMSAtIHRoaXMuZm9vdGVyLmFuY2hvclgpICogdGhpcy5nZXRTY2FsZVdpZHRoKHRoaXMuZm9vdGVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZS54ICsgdGhpcy5mb290ZXIueCAtIHRoaXMuZm9vdGVyLmFuY2hvclggKiB0aGlzLmdldFNjYWxlV2lkdGgodGhpcy5mb290ZXIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIOWwvumDqGl0ZW3nmoTkuJbnlYzlnZDmoIfovrnmoYYg57G75Ly8IHlNaW7jgIF5TWF4ICovXG4gICAgcHVibGljIGdldCBmb290ZXJCb3VuZGFyeVkoKSB7XG4gICAgICAgIGlmICh0aGlzLmhlYWRlclRvRm9vdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnkgKyB0aGlzLmZvb3Rlci55IC0gdGhpcy5mb290ZXIuYW5jaG9yWSAqIHRoaXMuZ2V0U2NhbGVIZWlnaHQodGhpcy5mb290ZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnkgKyB0aGlzLmZvb3Rlci55ICsgKDEgLSB0aGlzLmZvb3Rlci5hbmNob3JZKSAqIHRoaXMuZ2V0U2NhbGVIZWlnaHQodGhpcy5mb290ZXIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGdldCBpc05vcm1hbFNpemUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKS5lcXVhbHModGhpcy52aWV3U2l6ZSlcbiAgICB9XG5cbiAgICAvKiog6YeN5YaZIHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSDliqjmgIHorqHnrpflpLTlsL5pdGVtIOi/lOWbnuiZmuaLn+eahOWwuuWvuCDpnZ5jb250ZW506K6+572u55qE5bC65a+4ICovXG4gICAgcHVibGljIGdldENvbnRlbnRTaXplKCkge1xuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuZ2V0UmVhbGx5U2l6ZSgpXG4gICAgICAgIGxldCB2aWV3U2l6ZSA9IHRoaXMuc2Nyb2xsVmlldy52aWV3LmdldENvbnRlbnRTaXplKClcbiAgICAgICAgLy8g5YiX6KGo5Li656m65pe2IOebtOaOpei/lOWbniBzY3JvbGxWaWV3LnZpZXcg55qE5bC65a+4XG4gICAgICAgIGlmIChzaXplLmhlaWdodCA8IHZpZXdTaXplLmhlaWdodCkge1xuICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSB2aWV3U2l6ZS5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2l6ZS53aWR0aCA8IHZpZXdTaXplLndpZHRoKSB7XG4gICAgICAgICAgICBzaXplLndpZHRoID0gdmlld1NpemUud2lkdGhcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2l6ZVxuICAgIH1cbiAgICAvKiog6L+U5ZueIGhlYWRlcuWIsCBmb290ZXIg5LmL6Ze055qE5pW05L2T5bC65a+4ICovXG4gICAgcHVibGljIGdldFJlYWxseVNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGRyZW5Db3VudCA9PSAwKSByZXR1cm4gdGhpcy52aWV3U2l6ZVxuICAgICAgICBsZXQgc2l6ZSA9IGNjLlNpemUuWkVST1xuICAgICAgICBpZiAodGhpcy5oZWFkZXJUb0Zvb3RlcikgeyAvLyDmoLnmja5oZWFkZXLlkoxmb290ZXLorqHnrpflh7rnnJ/lrp7nmoRjb250ZW505bC65a+4IFxuICAgICAgICAgICAgc2l6ZS53aWR0aCA9IHRoaXMuZm9vdGVyQm91bmRhcnlYICsgLXRoaXMuaGVhZGVyQm91bmRhcnlYICsgdGhpcy5wYWRkaW5nTGVmdCArIHRoaXMucGFkZGluZ1JpZ2h0XG4gICAgICAgICAgICBzaXplLmhlaWdodCA9IHRoaXMuaGVhZGVyQm91bmRhcnlZICsgLXRoaXMuZm9vdGVyQm91bmRhcnlZICsgdGhpcy5wYWRkaW5nVG9wICsgdGhpcy5wYWRkaW5nQm90dG9tXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaXplLndpZHRoID0gdGhpcy5oZWFkZXJCb3VuZGFyeVggKyAtdGhpcy5mb290ZXJCb3VuZGFyeVggKyB0aGlzLnBhZGRpbmdMZWZ0ICsgdGhpcy5wYWRkaW5nUmlnaHRcbiAgICAgICAgICAgIHNpemUuaGVpZ2h0ID0gdGhpcy5mb290ZXJCb3VuZGFyeVkgKyAtdGhpcy5oZWFkZXJCb3VuZGFyeVkgKyB0aGlzLnBhZGRpbmdUb3AgKyB0aGlzLnBhZGRpbmdCb3R0b21cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2l6ZVxuICAgIH1cbiAgICAvKiog6YeN572uc2Nyb2xsdmlldyAqL1xuICAgIHB1YmxpYyByZXNldFNjcm9sbFZpZXcoKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5yZXNldCgpXG4gICAgfVxuICAgIC8qKiDojrflj5bnvKnmlL7ns7vmlbAgKi9cbiAgICBwdWJsaWMgZ2V0VXNlZFNjYWxlVmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5hZmZlY3RlZEJ5U2NhbGUgPyBNYXRoLmFicyh2YWx1ZSkgOiAxXG4gICAgfVxuICAgIC8qKiDorr7nva7mnIDlpKdpdGVt5pWw6YePICovXG4gICAgcHVibGljIGFzeW5jIHRvdGFsKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnN0b3BBdXRvU2Nyb2xsKClcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnJlbGVhc2UoKSAvLyDph4rmlL7vvIjlip/og73nlKjkuo7kuIrmi4nliqDovb0g5LiL5ouJ5Yi35paw77yJXG4gICAgICAgIHRoaXMuaW5pdGxpemVkKCkgIC8vIOWIneWni+WMllxuICAgICAgICBhd2FpdCB0aGlzLmFzeW5jQ3JlYXRlSXRlbSh2YWx1ZSkgLy8g5YiG5bin5Yib5bu6aXRlbVxuICAgICAgICBsZXQgZGF0YU9mZnNldCA9IHRoaXMuZ2V0RGF0YU9mZnNldCh2YWx1ZSkgLy/ojrflj5bmlbDmja7lgY/np7vph4/vvIjmoLnmja52YWx1ZeebuOWvueS6jiBfbWF4SXRlbVRvdGFsIOiuoeeul+WinuWKoOOAgeWHj+WwkeeahOaVsOmHj++8iVxuICAgICAgICBsZXQgcmVhbGx5T2Zmc2V0ID0gdGhpcy5nZXRSZWFsbHlPZmZzZXQoZGF0YU9mZnNldCkgLy8g6I635Y+W55yf5a6e55qE5pWw5o2u5YGP56e777yIR3JpZOaooeW8jyDlip/og73nlKjkuo7liKTmlq3mmK/lkKbpnIDopoHlgY/np7toZWFkZXLmnaXlsIbkuIvmlrnloavmu6HvvIlcbiAgICAgICAgdGhpcy5yZWZyZXNoSXRlbXModmFsdWUsIHJlYWxseU9mZnNldCkgLy/pgJrov4flt7LmnInnmoRpdGVtWydpbmRleCddIOWKoOS4iuaVsOaNruWBj+enuyDmnaXmmK/liLfmlrDmmL7npLpcbiAgICAgICAgdGhpcy5fbWF4SXRlbVRvdGFsID0gdmFsdWUgLy8g6K6w5b2V5b2T5YmN5oC75pWwXG4gICAgfVxuICAgIC8qKiDojrflj5blhYTlvJ/oioLngrkgKi9cbiAgICBwdWJsaWMgZ2V0QnJvdGhlck5vZGUobm9kZTogY2MuTm9kZSkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldFNpYmxpbmdJbmRleChub2RlKSAtIDEgLy8g5q2kIGdldFNpYmxpbmdJbmRleCDpnZ4gdGhpcy5ub2RlLmdldFNpYmxpbmdJbmRleFxuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW5baW5kZXhdXG4gICAgfVxuICAgIC8qKiDmmK/lkKbmmK/kuIDnu4RpdGVt5Lit56ys5LiA5Liq77yI5Z6C55u05ruR5Yqo5LitIOS4gOe7hGl0ZW0g5bCx5piv5Y2V6KGM55qE5omA5pyJ5YiXIOOAgeawtOW5s+a7keWKqOS4rSDkuIDnu4RpdGVtIOWwseaYr+WNleWIl+S4reaJgOacieihjO+8iSovXG4gICAgcHVibGljIGlzR3JvdXBIZWFkZXIobm9kZTogY2MuTm9kZSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgeE9yeSA9IHRoaXMuZ2V0R3JvdXBIZWFkZXIobm9kZSlcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMudmVydGljYWwgPyBjYy52Mih4T3J5LngsIDApIDogY2MudjIoMCwgeE9yeS55KVxuICAgICAgICBsZXQgc2VsZiA9IHRoaXMudmVydGljYWwgPyBjYy52Mihub2RlLngsIDApIDogY2MudjIoMCwgbm9kZS55KVxuICAgICAgICByZXR1cm4gc2VsZi5mdXp6eUVxdWFscyhwb3MsIEVQU0lMT04pXG4gICAgfVxuICAgIC8qKiDmmK/lkKbmmK/kuIDnu4RpdGVt5Lit5pyA5ZCO5LiA5Liq77yI5Z6C55u05ruR5Yqo5LitIOS4gOe7hGl0ZW0g5bCx5piv5Y2V6KGM55qE5omA5pyJ5YiXIOOAgeawtOW5s+a7keWKqOS4rSDkuIDnu4RpdGVtIOWwseaYr+WNleWIl+S4reaJgOacieihjO+8iSovXG4gICAgcHVibGljIGlzR3JvdXBGb290ZXIobm9kZTogY2MuTm9kZSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgeE9yeSA9IHRoaXMuZ2V0R3JvdXBGb290ZXIobm9kZSlcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMudmVydGljYWwgPyBjYy52Mih4T3J5LngsIDApIDogY2MudjIoMCwgeE9yeS55KVxuICAgICAgICBsZXQgc2VsZiA9IHRoaXMudmVydGljYWwgPyBjYy52Mihub2RlLngsIDApIDogY2MudjIoMCwgbm9kZS55KVxuICAgICAgICByZXR1cm4gc2VsZi5mdXp6eUVxdWFscyhwb3MsIEVQU0lMT04pXG4gICAgfVxuICAgIC8qKiDojrflj5bkuIDnu4RpdGVt5Lit6LW35aeL5L2N572uIO+8iOWeguebtOa7keWKqOS4rSDkuIDnu4RpdGVtIOWwseaYr+WNleihjOeahOaJgOacieWIlyDjgIHmsLTlubPmu5HliqjkuK0g5LiA57uEaXRlbSDlsLHmmK/ljZXliJfkuK3miYDmnInooYzvvIkqL1xuICAgIHB1YmxpYyBnZXRHcm91cEhlYWRlcihub2RlOiBjYy5Ob2RlKTogY2MuVmVjMiB7XG4gICAgICAgIGxldCBwb3MgPSBjYy5WZWMyLlpFUk9cbiAgICAgICAgaWYgKCFub2RlKSByZXR1cm4gcG9zXG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oZWFkZXJUb0Zvb3Rlcikge1xuICAgICAgICAgICAgICAgIHBvcy54ID0gbm9kZS5hbmNob3JYICogdGhpcy5nZXRTY2FsZVdpZHRoKG5vZGUpICsgKHRoaXMucGFkZGluZ0xlZnQgKiBub2RlLnNjYWxlWCkgLSAodGhpcy5ub2RlLmFuY2hvclggKiB0aGlzLnZpZXdTaXplLndpZHRoICogbm9kZS5zY2FsZVgpXG4gICAgICAgICAgICAgICAgcG9zLnkgPSAoMSAtIG5vZGUuYW5jaG9yWSkgKiAtdGhpcy5nZXRTY2FsZUhlaWdodChub2RlKSAtIHRoaXMucGFkZGluZ1RvcCArICgxIC0gdGhpcy5ub2RlLmFuY2hvclkpICogdGhpcy52aWV3U2l6ZS5oZWlnaHRcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zLnggPSBub2RlLmFuY2hvclggKiB0aGlzLmdldFNjYWxlV2lkdGgobm9kZSkgKyB0aGlzLnBhZGRpbmdMZWZ0IC0gdGhpcy5ub2RlLmFuY2hvclggKiB0aGlzLnZpZXdTaXplLndpZHRoXG4gICAgICAgICAgICAgICAgcG9zLnkgPSBub2RlLmFuY2hvclkgKiB0aGlzLmdldFNjYWxlSGVpZ2h0KG5vZGUpICsgdGhpcy5wYWRkaW5nQm90dG9tIC0gdGhpcy5ub2RlLmFuY2hvclkgKiB0aGlzLnZpZXdTaXplLmhlaWdodFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGVhZGVyVG9Gb290ZXIpIHtcbiAgICAgICAgICAgICAgICBwb3MueCA9IG5vZGUuYW5jaG9yWCAqIHRoaXMuZ2V0U2NhbGVXaWR0aChub2RlKSArIHRoaXMucGFkZGluZ0xlZnQgLSB0aGlzLm5vZGUuYW5jaG9yWCAqIHRoaXMudmlld1NpemUud2lkdGhcbiAgICAgICAgICAgICAgICBwb3MueSA9ICgxIC0gbm9kZS5hbmNob3JZKSAqIC1ub2RlLmhlaWdodCAtIHRoaXMucGFkZGluZ1RvcCArICgxIC0gdGhpcy5ub2RlLmFuY2hvclkpICogdGhpcy52aWV3U2l6ZS5oZWlnaHRcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zLnggPSB0aGlzLmFjY29tbW9kV2lkdGggKiB0aGlzLm5vZGUuYW5jaG9yWCAtIHRoaXMuZ2V0U2NhbGVXaWR0aChub2RlKSAqICgxIC0gbm9kZS5hbmNob3JYKVxuICAgICAgICAgICAgICAgIHBvcy55ID0gKDEgLSBub2RlLmFuY2hvclkpICogLW5vZGUuaGVpZ2h0IC0gdGhpcy5wYWRkaW5nVG9wICsgKDEgLSB0aGlzLm5vZGUuYW5jaG9yWSkgKiB0aGlzLnZpZXdTaXplLmhlaWdodFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3NcbiAgICB9XG4gICAgLyoqIOiOt+WPluS4gOe7hGl0ZW3kuK3nu5PmnZ/kvY3nva4g77yI5Z6C55u05ruR5Yqo5LitIOS4gOe7hGl0ZW0g5bCx5piv5Y2V6KGM55qE5omA5pyJ5YiXIOOAgeawtOW5s+a7keWKqOS4rSDkuIDnu4RpdGVtIOWwseaYr+WNleWIl+S4reaJgOacieihjO+8iSovXG4gICAgcHVibGljIGdldEdyb3VwRm9vdGVyKG5vZGU6IGNjLk5vZGUpOiBjYy5WZWMyIHtcbiAgICAgICAgbGV0IHBvcyA9IGNjLlZlYzIuWkVST1xuICAgICAgICBpZiAoIW5vZGUpIHJldHVybiBwb3NcbiAgICAgICAgaWYgKHRoaXMudmVydGljYWwpIHtcbiAgICAgICAgICAgIHBvcy54ID0gKHRoaXMuYWNjb21tb2RXaWR0aCArIHRoaXMucGFkZGluZ0xlZnQpICogdGhpcy5ub2RlLmFuY2hvclggLSAodGhpcy5nZXRTY2FsZVdpZHRoKG5vZGUpICogKDEgLSBub2RlLmFuY2hvclgpICsgdGhpcy5ub2RlLmFuY2hvclggKiB0aGlzLnBhZGRpbmdSaWdodClcbiAgICAgICAgICAgIHBvcy55ID0gbm9kZS55XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb3MueCA9IG5vZGUueFxuICAgICAgICAgICAgcG9zLnkgPSAtKCh0aGlzLmFjY29tbW9kSGVpZ2h0ICsgdGhpcy5wYWRkaW5nVG9wKSAqIHRoaXMubm9kZS5hbmNob3JZIC0gdGhpcy5nZXRTY2FsZUhlaWdodChub2RlKSAqIG5vZGUuYW5jaG9yWSkgKyAoMSAtIG5vZGUuYW5jaG9yWSkgKiB0aGlzLnBhZGRpbmdCb3R0b21cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9zXG4gICAgfVxuICAgIC8qKiDojrflj5bkuIDnu4RpdGVt5LitIG5vZGUg55u45a+5IHJlbGF0aXZlIOWPs+WBj+enu+mHjyDvvIjlnoLnm7Tmu5HliqjkuK0g5LiA57uEaXRlbSDlsLHmmK/ljZXooYznmoTmiYDmnInliJcg44CB5rC05bmz5ruR5Yqo5LitIOS4gOe7hGl0ZW0g5bCx5piv5Y2V5YiX5Lit5omA5pyJ6KGM77yJKi9cbiAgICBwdWJsaWMgZ2V0R3JvdXBSaWdodFgobm9kZTogY2MuTm9kZSwgcmVsYXRpdmU6IGNjLk5vZGUpIHtcbiAgICAgICAgaWYgKCFub2RlIHx8ICFyZWxhdGl2ZSkgcmV0dXJuIHRoaXMuZ2V0R3JvdXBIZWFkZXIobm9kZSkueFxuICAgICAgICBsZXQgcHJldldpZHRoID0gcmVsYXRpdmUueCArIHRoaXMuZ2V0U2NhbGVXaWR0aChyZWxhdGl2ZSkgKiAoMSAtIHJlbGF0aXZlLmFuY2hvclgpXG4gICAgICAgIGxldCBzZWxmV2lkdGggPSB0aGlzLmdldFNjYWxlV2lkdGgobm9kZSkgKiBub2RlLmFuY2hvclhcbiAgICAgICAgcmV0dXJuIHByZXZXaWR0aCArIHNlbGZXaWR0aCArIHRoaXMuc3BhY2luZy54XG4gICAgfVxuICAgIC8qKiDojrflj5bkuIDnu4RpdGVt5LitIG5vZGUg55u45a+5IHJlbGF0aXZlIOW3puWBj+enu+mHjyDvvIjlnoLnm7Tmu5HliqjkuK0g5LiA57uEaXRlbSDlsLHmmK/ljZXooYznmoTmiYDmnInliJcg44CB5rC05bmz5ruR5Yqo5LitIOS4gOe7hGl0ZW0g5bCx5piv5Y2V5YiX5Lit5omA5pyJ6KGM77yJKi9cbiAgICBwdWJsaWMgZ2V0R3JvdXBMZWZ0WChub2RlOiBjYy5Ob2RlLCByZWxhdGl2ZTogY2MuTm9kZSkge1xuICAgICAgICBpZiAoIW5vZGUgfHwgIXJlbGF0aXZlKSByZXR1cm4gdGhpcy5nZXRHcm91cEZvb3Rlcihub2RlKS54XG4gICAgICAgIGxldCBwcmV2V2lkdGggPSByZWxhdGl2ZS54IC0gdGhpcy5nZXRTY2FsZVdpZHRoKHJlbGF0aXZlKSAqIHJlbGF0aXZlLmFuY2hvclhcbiAgICAgICAgbGV0IHNlbGZXaWR0aCA9IHRoaXMuZ2V0U2NhbGVXaWR0aChub2RlKSAqICgxIC0gbm9kZS5hbmNob3JYKVxuICAgICAgICByZXR1cm4gcHJldldpZHRoIC0gc2VsZldpZHRoIC0gdGhpcy5zcGFjaW5nLnhcbiAgICB9XG4gICAgLyoqIOiOt+WPluS4gOe7hGl0ZW3kuK0gbm9kZSDnm7jlr7kgcmVsYXRpdmUg5LiL5YGP56e76YePIO+8iOWeguebtOa7keWKqOS4rSDkuIDnu4RpdGVtIOWwseaYr+WNleihjOeahOaJgOacieWIlyDjgIHmsLTlubPmu5HliqjkuK0g5LiA57uEaXRlbSDlsLHmmK/ljZXliJfkuK3miYDmnInooYzvvIkqL1xuICAgIHB1YmxpYyBnZXRHcm91cEJvdHRvbVkobm9kZTogY2MuTm9kZSwgcmVsYXRpdmU6IGNjLk5vZGUpIHtcbiAgICAgICAgbGV0IHByZXZIZWlnaHQgPSByZWxhdGl2ZS55IC0gdGhpcy5nZXRTY2FsZUhlaWdodChyZWxhdGl2ZSkgKiByZWxhdGl2ZS5hbmNob3JZXG4gICAgICAgIGxldCBzZWxmSGVpZ2h0ID0gdGhpcy5nZXRTY2FsZUhlaWdodChub2RlKSAqICgxIC0gbm9kZS5hbmNob3JZKVxuICAgICAgICByZXR1cm4gcHJldkhlaWdodCAtIHNlbGZIZWlnaHQgLSB0aGlzLnNwYWNpbmcueVxuICAgIH1cbiAgICAvKiog6I635Y+W5LiA57uEaXRlbeS4rSBub2RlIOebuOWvuSByZWxhdGl2ZSDkuIrlgY/np7vph48g77yI5Z6C55u05ruR5Yqo5LitIOS4gOe7hGl0ZW0g5bCx5piv5Y2V6KGM55qE5omA5pyJ5YiXIOOAgeawtOW5s+a7keWKqOS4rSDkuIDnu4RpdGVtIOWwseaYr+WNleWIl+S4reaJgOacieihjO+8iSovXG4gICAgcHVibGljIGdldEdyb3VwVG9wWShub2RlOiBjYy5Ob2RlLCByZWxhdGl2ZTogY2MuTm9kZSkge1xuICAgICAgICBsZXQgcHJldkhlaWdodCA9IHJlbGF0aXZlLnkgKyB0aGlzLmdldFNjYWxlSGVpZ2h0KHJlbGF0aXZlKSAqICgxIC0gcmVsYXRpdmUuYW5jaG9yWSlcbiAgICAgICAgbGV0IHNlbGZIZWlnaHQgPSB0aGlzLmdldFNjYWxlSGVpZ2h0KG5vZGUpICogbm9kZS5hbmNob3JZXG4gICAgICAgIHJldHVybiBwcmV2SGVpZ2h0ICsgc2VsZkhlaWdodCArIHRoaXMuc3BhY2luZy55XG4gICAgfVxuICAgIC8qKiDliKTmlq3nu5nlrprnmoQgbm9kZSDkuZjku6UgbXVsdGlwbGUg5YCN5pWw5ZCOIOaYr+WQpui2heWHuuS6huWktOmDqOi+ueahhiDvvIggbXVsdGlwbGUgPSAxIOWwseaYr+S4gOS4qm5vZGXnmoTlsLrlr7gg6buY6K6kMS415YCN77yJKi9cbiAgICBwdWJsaWMgaXNPdXRPZkJvdW5kYXJ5SGVhZGVyKG5vZGU6IGNjLk5vZGUsIG11bHRpcGxlOiBudW1iZXIgPSAxLjUpIHtcbiAgICAgICAgbGV0IHdpZHRoID0gbm9kZS53aWR0aCAqIHRoaXMuZ2V0VXNlZFNjYWxlVmFsdWUobm9kZS5zY2FsZVgpICogbXVsdGlwbGVcbiAgICAgICAgbGV0IGhlaWdodCA9IC1ub2RlLmhlaWdodCAqIHRoaXMuZ2V0VXNlZFNjYWxlVmFsdWUobm9kZS5zY2FsZVkpICogbXVsdGlwbGVcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMuc2Nyb2xsVmlldy5nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeShjYy52Mih3aWR0aCwgaGVpZ2h0KSlcbiAgICAgICAgcmV0dXJuIG9mZnNldFxuICAgIH1cbiAgICAvKiog5Yik5pat57uZ5a6a55qEIG5vZGUg5LmY5LulIG11bHRpcGxlIOWAjeaVsOWQjiDmmK/lkKbotoXlh7rkuoblsL7pg6jpg6jovrnmoYYg77yIIG11bHRpcGxlID0gMSDlsLHmmK/kuIDkuKpub2Rl55qE5bC65a+4IOm7mOiupDEuNeWAje+8iSovXG4gICAgcHVibGljIGlzT3V0T2ZCb3VuZGFyeUZvb3Rlcihub2RlOiBjYy5Ob2RlLCBtdWx0aXBsZTogbnVtYmVyID0gMS41KSB7XG4gICAgICAgIGxldCB3aWR0aCA9IC1ub2RlLndpZHRoICogdGhpcy5nZXRVc2VkU2NhbGVWYWx1ZShub2RlLnNjYWxlWCkgKiBtdWx0aXBsZVxuICAgICAgICBsZXQgaGVpZ2h0ID0gbm9kZS5oZWlnaHQgKiB0aGlzLmdldFVzZWRTY2FsZVZhbHVlKG5vZGUuc2NhbGVZKSAqIG11bHRpcGxlXG4gICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLnNjcm9sbFZpZXcuZ2V0SG93TXVjaE91dE9mQm91bmRhcnkoY2MudjIod2lkdGgsIGhlaWdodCkpXG4gICAgICAgIHJldHVybiBvZmZzZXRcbiAgICB9XG4gICAgLyoqIOa7muWKqOWIsOWktOmDqCDvvIjmoLnmja4g5o6S5YiX5pa55ZCR44CB5o6S5YiX5a2Q6IqC54K555qE5pa55ZCR77yJ5p2l6LCD55SoIHNjcm9sbFZpZXcuc2Nyb2xsVG8uLi4g5pa55rOVICovXG4gICAgcHVibGljIHNjcm9sbFRvSGVhZGVyKHRpbWVJblNlY29uZD86IG51bWJlciwgYXR0ZW51YXRlZD86IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUb0hlYWRlck9yRm9vdGVyID0gdGltZUluU2Vjb25kID4gMFxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc3RvcEF1dG9TY3JvbGwoKVxuICAgICAgICB0aGlzLnJlc2V0VG9IZWFkZXIoKVxuICAgICAgICBpZiAodGhpcy5oZWFkZXJUb0Zvb3Rlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9Ub3AodGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9MZWZ0KHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvQm90dG9tKHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvUmlnaHQodGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiDmu5rliqjliLDlsL7pg6jvvIjmoLnmja4g5o6S5YiX5pa55ZCR44CB5o6S5YiX5a2Q6IqC54K555qE5pa55ZCR77yJ5p2l6LCD55SoIHNjcm9sbFZpZXcuc2Nyb2xsVG8uLi4g5pa55rOVICovXG4gICAgcHVibGljIHNjcm9sbFRvRm9vdGVyKHRpbWVJblNlY29uZD86IG51bWJlciwgYXR0ZW51YXRlZD86IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUb0hlYWRlck9yRm9vdGVyID0gdGltZUluU2Vjb25kID4gMFxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc3RvcEF1dG9TY3JvbGwoKVxuICAgICAgICB0aGlzLnJlc2V0VG9Gb290ZXIoKVxuICAgICAgICBpZiAodGhpcy5oZWFkZXJUb0Zvb3Rlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b20odGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9SaWdodCh0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb1RvcCh0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb0xlZnQodGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiDpgJrnn6Xnu5nlrprnmoRub2Rl5Yi35paw5pWw5o2uICovXG4gICAgcHVibGljIG5vdGlmeVJlZnJlc2hJdGVtKHRhcmdldDogY2MuTm9kZSkge1xuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy5yZWZyZXNoSXRlbUV2ZW50cywgdGFyZ2V0LCB0YXJnZXRbJ2luZGV4J10pXG4gICAgfVxuICAgIC8qKiDojrflj5boioLngrnntKLlvJUgKi9cbiAgICBwdWJsaWMgZ2V0U2libGluZ0luZGV4KG5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgICB9XG4gICAgLyoqIOiHquWumuS5iee0ouW8leaWueazlSDov5nph4zkuI3mmK/pgJrov4flrp7ml7bkv67mlLnoioLngrnntKLlvJXnmoTmlrnms5XvvIzlj6rmmK/mqKHmi5/nsbvkvLznmoTlip/og73vvIzlrp7pmYXkuIrlubbmsqHmnInnnJ/mraPmlLnlj5joioLngrnnmoTlrp7pmYXpobrluo/vvIjkvJjljJbpobnvvIkgKi9cbiAgICBwdWJsaWMgc2V0U2libGluZ0luZGV4KG5vZGU6IGNjLk5vZGUsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgLy8g5q2k5pa55rOV5pe25Y+C6ICD5byV5pOO5Y6fc2V0U2libGluZ0luZGV45pa55rOVIOWOu+aOieS6huS/ruaUueiKgueCuee0ouW8leS9jee9rueahOiwg+eUqO+8iGl0ZW3mnKzouqvnmoR6SW5kZXjmsqHmnInku7vkvZXlj5jljJbvvIlcbiAgICAgICAgaW5kZXggPSBpbmRleCAhPT0gLTEgPyBpbmRleCA6IHRoaXMuX2NoaWxkcmVuLmxlbmd0aCAtIDFcbiAgICAgICAgdmFyIG9sZEluZGV4ID0gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICAgICAgICBpZiAoaW5kZXggIT09IG9sZEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2Uob2xkSW5kZXgsIDEpXG4gICAgICAgICAgICBpZiAoaW5kZXggPCB0aGlzLl9jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIG5vZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKG5vZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIOi/memHjOWMuuWIq+S6juWOn+aWueazlSDljp/mlrnms5XmmK/mlLnlj5hub2Rl6IqC54K56aG65bqP5ZCO5Y+R6YCBY2MuTm9kZS5FdmVudFR5cGUuU0lCTElOR19PUkRFUl9DSEFOR0VE6YCa55+lIOi/memHjOS4jemcgOimgeS/ruaUueiKgueCuemhuuW6j1xuICAgICAgICAgICAgICog6L+Z6YeM5Y+R6YCB5LiA5Liq6Ieq5a6a5LmJ5LqL5Lu2IOaooeaLnyBTSUJMSU5HX09SREVSX0NIQU5HRUQg6YCa55+lXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMubm9kZS5lbWl0KFVJQ2hhbmdlQnJvdGhlckV2bmV0KVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5pbml0bGl6ZWQoKVxuICAgIH1cbiAgICAvKiog5Yid5aeL5YyWICovXG4gICAgcHJpdmF0ZSBpbml0bGl6ZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc2luaXRlZCkgcmV0dXJuXG4gICAgICAgIHRoaXMubm9kZS5hbmNob3JYID0gMC41IC8v5Zu65a6aY29udGVudOeahOmUmueCueS4uuS4reW/g1xuICAgICAgICB0aGlzLm5vZGUuYW5jaG9yWSA9IDAuNVxuICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUodGhpcy52aWV3U2l6ZSkgLy/lsIZjb250ZW5055qE5bC65a+46K6+572u5LiOdmlld+ebuOWQjCDvvIjlip/og73nlKjkuo7nqbrliJfooajml7bkuZ/lj6/ku6XkuIvmi4nliLfmlrDlkozliqDovb3vvIkgXG4gICAgICAgIC8vIOmHjeWGmSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUg5pa55rOVIOWboOS4umNvbnRlbnTnmoTnnJ/lrp7lsLrlr7jkuI3kvJrpmo/nnYBpdGVt55qE5pWw6YeP5Y+Y5YyWXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSA9IHRoaXMuZ2V0Q29udGVudFNpemUuYmluZCh0aGlzKVxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oY2MuVmVjMi5aRVJPKVxuICAgICAgICB0aGlzLmNvbHVtbiA9IHRoaXMuY29sdW1uIDwgMSA/IDEgOiB0aGlzLmNvbHVtbiAvLyDkuIDnu4RpdGVt55qE5pWw6YePIOacgOWwkeaYrzEg5Lmf5bCx5piv5pmu6YCa55qE5rC05bmzL+WeguebtCDlpKfkuo4x5bCx5pivR3JpZOaooeW8j1xuICAgICAgICAvLyDnm5HlkKxjb250ZW505L2N572u5Y+Y5YyWIOWIt+aWsGhlYWRlciBmb290ZXLoioLngrnnmoTnm7jlr7nkvY3nva5cbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMub25DaGFuZ2VQb3NpdGlvbiwgdGhpcylcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnZpZXcub24oY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLnJlc2V0SXRlbVNpemUsIHRoaXMpXG4gICAgICAgIHRoaXMuX2lzaW5pdGVkID0gdHJ1ZVxuICAgIH1cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5vbkNoYW5nZVBvc2l0aW9uLCB0aGlzKVxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcudmlldy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLnJlc2V0SXRlbVNpemUsIHRoaXMpXG4gICAgfVxuICAgIHByaXZhdGUgb25DaGFuZ2VQb3NpdGlvbigpIHtcbiAgICAgICAgbGV0IGZsYWcgPSB0aGlzLmlzU2Nyb2xsVG9Gb290ZXIgLy8gdGhpcy5pc1Njcm9sbFRvRm9vdGVyID0gdHJ1ZSDlkJHkuIvmu5HliqggZmFsc2Ug5ZCR5LiK5ruR5YqoXG4gICAgICAgIGlmICh0aGlzLmhlYWRlclRvRm9vdGVyKSB7XG4gICAgICAgICAgICBmbGFnID8gdGhpcy5mb290ZXJUb0hlYWRlcldhdGNoQ2hpbGRzKGZsYWcpIDogdGhpcy5oZWFkZXJUb0Zvb3RlcldhdGNoQ2hpbGRzKGZsYWcpIC8vIOWAkuW6j+WIt+aWsFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmxhZyA/IHRoaXMuaGVhZGVyVG9Gb290ZXJXYXRjaENoaWxkcyhmbGFnKSA6IHRoaXMuZm9vdGVyVG9IZWFkZXJXYXRjaENoaWxkcyhmbGFnKSAvLyDmraPluo/liLfmlrBcbiAgICAgICAgfVxuICAgICAgICAvLyDlvZNpdGVtIOeUseWkmuWIsOWwkSDlubbkuJQg5b2TY29udGVudOeahOS9jee9ruiiq+mHjee9ruWIsOWIneWni+eKtuaAgeaXtiDph43mlrDorr7nva7lpLTpg6jnmoRpdGVt5b2S5L2NXG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2FsICYmIDAgPT0gdGhpcy5ub2RlLnkgfHwgdGhpcy5ob3Jpem9udGFsICYmIDAgPT0gdGhpcy5ub2RlLngpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnNldFBvc2l0aW9uKHRoaXMuZ2V0R3JvdXBIZWFkZXIodGhpcy5oZWFkZXIpKVxuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyByZXNldEl0ZW1TaXplKCkge1xuICAgICAgICAvLyDph43mlrDorr7nva7ljp/lp4vlsLrlr7hcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2ldWydzYXZlT3JpZ2luU2l6ZSddKClcbiAgICAgICAgfVxuICAgICAgICAvLyDmlLnlj5jlpLTpg6jkvY3nva5cbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuZ2V0R3JvdXBIZWFkZXIodGhpcy5oZWFkZXIpXG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci54ID0gcG9zLnhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnkgPSBwb3MueVxuICAgICAgICB9XG4gICAgICAgIC8vIOmAmuefpeaUueWPmOWdkOagh+S6i+S7tlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5baV0uZW1pdChjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEKVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiDojrflj5bnvKnmlL7lrr3luqYgKi9cbiAgICBwcml2YXRlIGdldFNjYWxlV2lkdGgobm9kZTogY2MuTm9kZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBub2RlLndpZHRoICogdGhpcy5nZXRVc2VkU2NhbGVWYWx1ZShub2RlLnNjYWxlWClcbiAgICB9XG4gICAgLyoqIOiOt+WPlue8qeaUvumrmOW6piAqL1xuICAgIHByaXZhdGUgZ2V0U2NhbGVIZWlnaHQobm9kZTogY2MuTm9kZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBub2RlLmhlaWdodCAqIHRoaXMuZ2V0VXNlZFNjYWxlVmFsdWUobm9kZS5zY2FsZVkpXG4gICAgfVxuICAgIC8qKiDnroDljZXnmoTmtYXmi7fotJ0gKi9cbiAgICBwcml2YXRlIGdldFRlbXBDaGlsZHJlbigpIHtcbiAgICAgICAgbGV0IGxpc3QgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMuX2NoaWxkcmVuW2ldO1xuICAgICAgICAgICAgbGlzdC5wdXNoKGNoaWxkKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0XG4gICAgfVxuICAgIC8qKiDmraPluo/mm7TmlrBpdGVtICovXG4gICAgcHJpdmF0ZSBoZWFkZXJUb0Zvb3RlcldhdGNoQ2hpbGRzKGZsYWcpIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5nZXRUZW1wQ2hpbGRyZW4oKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgY2hpbGRbJ3dhdGNoU2VsZiddKGZsYWcpXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIOWAkuW6j+abtOaWsGl0ZW0gKi9cbiAgICBwcml2YXRlIGZvb3RlclRvSGVhZGVyV2F0Y2hDaGlsZHMoZmxhZykge1xuICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLmdldFRlbXBDaGlsZHJlbigpXG4gICAgICAgIGZvciAobGV0IGkgPSBjaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGNoaWxkWyd3YXRjaFNlbGYnXShmbGFnKVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiDlvZPmlbDmja7lop7liqDjgIHlh4/lsJHml7Yg6I635Y+W5pWw5o2u5YGP56e7ICovXG4gICAgcHJpdmF0ZSBnZXREYXRhT2Zmc2V0KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgLy8g6L+U5Zue5Yig6Zmk5pWw5o2u5YGP56e7IO+8iOavlOWmguW9k+WJjeacgOWkp+aVsOaNruWAvD0xMO+8jOaWsOaVsOaNrj05IOi/lOWbni0x77yJXG4gICAgICAgIGlmICh0aGlzLmZvb3RlciAmJiB0aGlzLmZvb3RlclsnaW5kZXgnXSArIDEgPj0gdmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLmZvb3RlclsnaW5kZXgnXSArIDEgLSB2YWx1ZVxuICAgICAgICAgICAgcmV0dXJuIG9mZnNldCA9PSAwID8gMCA6IC1vZmZzZXRcbiAgICAgICAgfVxuICAgICAgICAvLyDov5Tlm57lop7liqDmlbDmja7lgY/np7tcbiAgICAgICAgaWYgKHRoaXMuX21heEl0ZW1Ub3RhbCA9PSAwIHx8IHZhbHVlIDwgdGhpcy5fbWF4SXRlbVRvdGFsIHx8IHRoaXMuX21heEl0ZW1Ub3RhbCA8IHRoaXMuX21heFByZWZhYlRvdGFsKSByZXR1cm4gMCAvL+avlOWmguW9k+WJjeacgOWkmuWFgeiuuOWIm+W7ujEw5LiqaXRlbSDlvZPliY3mmL7npLo15LiqIOi/lOWbnjBcbiAgICAgICAgaWYgKHRoaXMuaXNHcm91cEZvb3Rlcih0aGlzLmZvb3RlcikpIHJldHVybiAwIC8vR3JpZOaooeW8jyDlpoLmnpzlsL7pg6jnmoTkvY3nva7mmK/lnKjkuIDnu4RpdGVt5Lit5pyr5bC+55qE5L2N572u5pe2IOi/lOWbniAwIFxuICAgICAgICByZXR1cm4gdmFsdWUgLSB0aGlzLl9tYXhJdGVtVG90YWxcbiAgICB9XG4gICAgLyoqIFxuICAgICAqIOW9k+aVsOaNruWinuWKoOOAgeWHj+WwkeaXtiDojrflj5boioLngrnlgY/np7vph48gXG4gICAgICog5b2T5YmN5pWw5o2u5piv6L+Z5qC355qEICAg5aKe5YqgMeS4qiAgICAg5aKe5YqgMuS4qlxuICAgICAqIDAsMSwyLDMgICAgICAgICAgIDEsMiwzICAgICAgICAgMiwzXG4gICAgICogNCw1LDYgICAgICAgICAgIDQsNSw2LDcgICAgIDQsNSw2LDdcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOFxuICAgICovXG4gICAgcHJpdmF0ZSBnZXRSZWFsbHlPZmZzZXQoZGF0YU9mZnNldDogbnVtYmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5oZWFkZXIpIHJldHVybiAwXG4gICAgICAgIGlmIChkYXRhT2Zmc2V0ID4gMCkgeyAvLyDku6Pooajlop7liqBpdGVtIOihqOagvOaooeW8j+S4iyDpgJrov4flgY/np7vlpLTpg6jmnaXorqnkuIvmlrnloavmu6Eg5aGr5ruh5ZCO5YGc5q2i5YGP56e7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFPZmZzZXQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzR3JvdXBGb290ZXIodGhpcy5mb290ZXIpKSByZXR1cm4gaSAvL+i/lOWbnuecn+WunueahOWBj+enu+mHj1xuICAgICAgICAgICAgICAgIC8vIOatpOaXtuWmguaenGhlYWRlciDlt7Lnu4/mmK/kuIDnu4RpdGVt5Lit5pyA5ZCO5LiA5Liq5pe2IOWQkeS4i+S9jeenuyDlubYg6K6+572u5Yiw5LiA57uEaXRlbeeahOi1t+Wni+S9jee9riAgIFxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmhlYWRlci5nZXRQb3NpdGlvbigpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWwpIHsgLy8g5Z6C55u05ruR5Yqo5pe2XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzR3JvdXBGb290ZXIodGhpcy5oZWFkZXIpKSB7IC8vIOW9k+WIl+ihqOS4reesrOS4gOS4qml0ZW3mraPlnKjkuIDnu4RpdGVt5Lit5pyr5bC+5L2N572u5pe2XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oZWFkZXJUb0Zvb3Rlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy55ID0gdGhpcy5nZXRHcm91cEJvdHRvbVkodGhpcy5oZWFkZXIsIHRoaXMuaGVhZGVyKSAgLy/mraPluo/mjpLliJfml7YgWei9tOWQkeS4i+WBj+enu++8iOWeguebtOaOkuWIl+aXtiDkuIDnu4RpdGVtIOWktOWcqOW3puWwvuWcqOWPs++8iVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MueSA9IHRoaXMuZ2V0R3JvdXBUb3BZKHRoaXMuaGVhZGVyLCB0aGlzLmhlYWRlcikgLy/lgJLluo/mjpLliJfml7YgWei9tOWQkeS4iuWBj+enu++8iOWeguebtOaOkuWIl+aXtiDkuIDnu4RpdGVtIOWktOWcqOW3puWwvuWcqOWPs++8iVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zLnggPSB0aGlzLmdldEdyb3VwSGVhZGVyKHRoaXMuaGVhZGVyKS54IC8vIFjovbTlkJHlpLTpg6jlgY/np7tcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8g56ys5LiA5LiqaXRlbeayoeacieWcqOS4gOe7hGl0ZW3kuK3mnKvlsL7nmoTkvY3nva4g5Y+q5bCG56ys5LiA5LiqaXRlbeWQkeWPs+WBj+enuyAo5Y+q5YGP56e7WOi9tClcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy54ID0gdGhpcy5nZXRHcm91cFJpZ2h0WCh0aGlzLmhlYWRlciwgdGhpcy5oZWFkZXIpIC8vIFjovbTlkJHlj7PlgY/np7tcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIOawtOW5s+a7keWKqOaXtlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0dyb3VwRm9vdGVyKHRoaXMuaGVhZGVyKSkgeyAgLy8g5b2T5YiX6KGo5Lit56ys5LiA5LiqaXRlbeato+WcqOS4gOe7hGl0ZW3kuK3mnKvlsL7kvY3nva7ml7ZcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlYWRlclRvRm9vdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zLnggPSB0aGlzLmdldEdyb3VwUmlnaHRYKHRoaXMuaGVhZGVyLCB0aGlzLmhlYWRlcikgLy/mraPluo/mjpLliJfml7YgWOi9tOWQkeWPs+WBj+enu++8iOawtOW5s+aOkuWIl+aXtiDkuIDnu4RpdGVtIOWktOWcqOS4iuWwvuWcqOS4i++8iVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MueCA9IHRoaXMuZ2V0R3JvdXBMZWZ0WCh0aGlzLmhlYWRlciwgdGhpcy5oZWFkZXIpIC8v5YCS5bqP5o6S5YiX5pe2IFjovbTlkJHlt6blgY/np7vvvIjmsLTlubPmjpLliJfml7Yg5LiA57uEaXRlbSDlpLTlnKjkuIrlsL7lnKjkuIvvvIlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy55ID0gdGhpcy5nZXRHcm91cEhlYWRlcih0aGlzLmhlYWRlcikueSAvLyBZ6L205ZCR5aS06YOo5YGP56e7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAvLyDnrKzkuIDkuKppdGVt5rKh5pyJ5Zyo5LiA57uEaXRlbeS4reacq+WwvueahOS9jee9riDlj6rlsIbnrKzkuIDkuKppdGVt5ZCR5LiL5YGP56e7ICjlj6rlgY/np7tZ6L20KVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zLnkgPSB0aGlzLmdldEdyb3VwQm90dG9tWSh0aGlzLmhlYWRlciwgdGhpcy5oZWFkZXIpIC8vIFnovbTlkJHkuIvlgY/np7tcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlci5zZXRQb3NpdGlvbihwb3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YU9mZnNldFxuICAgICAgICB9XG4gICAgICAgIC8vIOS7o+ihqOWHj+WwkeS6hml0ZW0g6K6h566X5YGP56e76YePIG9mZnNldDwwIOOAkOazqOaEj++8gei/memHjOeahOmAu+i+keWSjOS4iumdouato+WlveebuOWPjeOAkVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGguYWJzKGRhdGFPZmZzZXQpOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSBjYy5WZWMyLlpFUk9cbiAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNHcm91cEhlYWRlcih0aGlzLmhlYWRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zLnggPSB0aGlzLmdldEdyb3VwRm9vdGVyKHRoaXMuaGVhZGVyKS54XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhlYWRlclRvRm9vdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MueSA9IHRoaXMuZ2V0R3JvdXBUb3BZKHRoaXMuaGVhZGVyLCB0aGlzLmhlYWRlcilcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy55ID0gdGhpcy5nZXRHcm91cEJvdHRvbVkodGhpcy5oZWFkZXIsIHRoaXMuaGVhZGVyKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zLnggPSB0aGlzLmdldEdyb3VwTGVmdFgodGhpcy5oZWFkZXIsIHRoaXMuaGVhZGVyKVxuICAgICAgICAgICAgICAgICAgICBwb3MueSA9IHRoaXMuaGVhZGVyLnlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzR3JvdXBIZWFkZXIodGhpcy5oZWFkZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcy55ID0gdGhpcy5nZXRHcm91cEZvb3Rlcih0aGlzLmhlYWRlcikueVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oZWFkZXJUb0Zvb3Rlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zLnggPSB0aGlzLmdldEdyb3VwTGVmdFgodGhpcy5oZWFkZXIsIHRoaXMuaGVhZGVyKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zLnggPSB0aGlzLmdldEdyb3VwUmlnaHRYKHRoaXMuaGVhZGVyLCB0aGlzLmhlYWRlcilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcy55ID0gdGhpcy5nZXRHcm91cFRvcFkodGhpcy5oZWFkZXIsIHRoaXMuaGVhZGVyKVxuICAgICAgICAgICAgICAgICAgICBwb3MueCA9IHRoaXMuaGVhZGVyLnhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5zZXRQb3NpdGlvbihwb3MpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmNhbGN1bGF0ZUJvdW5kYXJ5KClcbiAgICAgICAgcmV0dXJuIGRhdGFPZmZzZXRcbiAgICB9XG4gICAgLyoqIOWIt+aWsOaJgOaciWl0ZW3mlbDmja4g5qC55o2u5b2T5YmNaXRlbeeahCBpbmRleCDliLfmlrAgKi9cbiAgICBwcml2YXRlIHJlZnJlc2hJdGVtcyh2YWx1ZTogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciA9IDApIHtcbiAgICAgICAgaWYgKCF0aGlzLmhlYWRlcikgcmV0dXJuXG4gICAgICAgIGxldCBzdGFydEluZGV4ID0gdGhpcy5oZWFkZXJbJ2luZGV4J10gLSAxICsgb2Zmc2V0IC8vIOiOt+WPluWktOmDqGl0ZW3mjIHmnInnmoRpbmRleCDliqDkuIog5pWw5o2u5YGP56e75p2l6K6h566X6LW35aeLaW5kZXggXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5fY2hpbGRyZW5baV07XG4gICAgICAgICAgICBzdGFydEluZGV4KytcbiAgICAgICAgICAgIC8vIOi/memHjOeahOWIpOaWreeUqOS6juaXoOmZkOW+queOr+a7muWKqOeahOmAu+i+kSDlpoLmnpzntKLlvJXlpKfkuo7mlbDmja7mgLvmlbAg57Si5byV5b2S6Zu2XG4gICAgICAgICAgICBpZiAoc3RhcnRJbmRleCA+IHZhbHVlIC0gMSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXggPSAwXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZXggPCAwKSB7IC8vIOe0ouW8leWwj+S6jjAg57Si5byV5a6a5L2N5Yiw5pWw5o2u5bC+6YOoIOS/neaMgemmluWwvuebuOi/nlxuICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXggPSB2YWx1ZSAtIDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoaWxkWydpbmRleCddID0gc3RhcnRJbmRleCAvL+iuvue9ruW9k+WJjee0ouW8lVxuICAgICAgICAgICAgdGhpcy5ub3RpZnlSZWZyZXNoSXRlbShjaGlsZClcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiog5LuO5aS06YOo5Yiw5bC+6YOo6YeN572u5pWw5o2uICovXG4gICAgcHJpdmF0ZSByZXNldFRvSGVhZGVyKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMuX2NoaWxkcmVuW2ldO1xuICAgICAgICAgICAgY2hpbGRbJ2luZGV4J10gPSBpXG4gICAgICAgICAgICB0aGlzLm5vdGlmeVJlZnJlc2hJdGVtKGNoaWxkKVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5oZWFkZXJMb29wICYmICF0aGlzLmZvb3Rlckxvb3ApIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyPy5zZXRQb3NpdGlvbih0aGlzLmdldEdyb3VwSGVhZGVyKHRoaXMuaGVhZGVyKSlcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5zY3JvbGxUb0hlYWRlck9yRm9vdGVyKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcj8uc2V0UG9zaXRpb24odGhpcy5nZXRHcm91cEhlYWRlcih0aGlzLmhlYWRlcikpXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIOS7juWwvumDqOWIsOWktOmDqOmHjee9ruaVsOaNriAqL1xuICAgIHByaXZhdGUgcmVzZXRUb0Zvb3RlcigpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fbWF4SXRlbVRvdGFsXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gdGhpcy5fY2hpbGRyZW5baV1cbiAgICAgICAgICAgIGNoaWxkWydpbmRleCddID0gLS1pbmRleFxuICAgICAgICAgICAgdGhpcy5ub3RpZnlSZWZyZXNoSXRlbShjaGlsZClcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiog5Yig6Zmk5aSa5L2Z55qEaXRlbSAqL1xuICAgIHByaXZhdGUgcmVtb3ZlQ2hpbGRzKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgLy8g5pyJ5aSa5L2Z55qEaXRlbSDpnIDopoHliKDpmaRcbiAgICAgICAgbGV0IGxlbmd0aCA9IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50IC0gdmFsdWVcbiAgICAgICAgLy8g5Yig6Zmk5o6J5aSa5L2Z55qEaXRlbVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSB0aGlzLmZvb3RlclxuICAgICAgICAgICAgdGhpcy5yZW1DaGlsZChjaGlsZClcbiAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKVxuICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKGNoaWxkKVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5oZWFkZXIpIHJldHVyblxuICAgICAgICAvLyDlsIblpLTpg6joioLngrnnmoTkvY3nva7ph43nva7liLDkuIDnu4RpdGVt55qE56ys5LiA5Liq5L2N572uXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmdldEdyb3VwSGVhZGVyKHRoaXMuaGVhZGVyKVxuICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIueCA9IHBvcy54XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci55ID0gcG9zLnlcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiog5YiG5bin5Yib5bu6aXRlbSAqL1xuICAgIHByaXZhdGUgYXN5bmMgYXN5bmNDcmVhdGVJdGVtKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZ2VuZXI/LnJldHVybihcIlwiKS8v5Y+W5raI5LiK5LiA5qyh55qE5YiG5bin5Lu75Yqh77yI5aaC5p6c5Lu75Yqh5q2j5Zyo5omn6KGM77yJXG4gICAgICAgIC8vIOacieWkmuS9meeahGl0ZW0g6ZyA6KaB5Yig6ZmkIOS4jeWkhOeQhlxuICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkcmVuQ291bnQgPiB2YWx1ZSkgcmV0dXJuIHRoaXMucmVtb3ZlQ2hpbGRzKHZhbHVlKVxuICAgICAgICAvLyDlt7Lnu4/lm7rlrpppdGVt5oC75pWwIOS4jeWkhOeQhlxuICAgICAgICBpZiAodGhpcy5fbWF4UHJlZmFiVG90YWwgPiAwICYmIHRoaXMuX21heFByZWZhYlRvdGFsID09IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50KSByZXR1cm5cbiAgICAgICAgLy8g5byA5aeL5YiG5bin5Yib5bu6aXRlbVxuICAgICAgICBsZXQgdG90YWwgPSB2YWx1ZSAtIHRoaXMubm9kZS5jaGlsZHJlbkNvdW50IC8v6K6h566X5b2T5YmN5bqU6K+l5Yib5bu655qE5oC75pWwXG4gICAgICAgIHRoaXMuX2dlbmVyID0gdGhpcy5nZXRHZW5lcmF0b3JMZW5ndGgodG90YWwsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiKVxuICAgICAgICAgICAgY2hpbGRbJ2luZGV4J10gPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudFxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChjaGlsZClcbiAgICAgICAgICAgIC8vIOiOt+WPluaIlua3u+WKoCBVSVN1cGVySXRlbVxuICAgICAgICAgICAgbGV0IHNwdWVySXRlbSA9IGNoaWxkLmdldENvbXBvbmVudChVSVNwdWVySXRlbSkgfHwgY2hpbGQuYWRkQ29tcG9uZW50KFVJU3B1ZXJJdGVtKVxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGNoaWxkKVxuICAgICAgICAgICAgc3B1ZXJJdGVtLmluaXQodGhpcylcbiAgICAgICAgICAgIC8vIGl0ZW3lnKjpppbmrKHliJvlu7rml7bnq4vljbPliLfmlrAg6YG/5YWN5pi+56S6aXRlbeWIneWni+eKtuaAgVxuICAgICAgICAgICAgdGhpcy5ub3RpZnlSZWZyZXNoSXRlbShjaGlsZClcbiAgICAgICAgICAgIC8vIOWmguaenOWIm+W7uueahOaYr+esrOS4gOS4qml0ZW0g6K6+572u5LuW55qE6LW35aeL5L2N572uIOS5i+WQjueahGl0ZW3kvJroh6rliqjnm7jlr7nkuo7ku5bmnaXorr7nva7oh6rlt7Eg5oiR5Lus5Y+q6ZyA6KaB56Gu5a6a56ys5LiA5Liq5L2N572u5bCx6KGM5LqGXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkcmVuQ291bnQgPT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmdldEdyb3VwSGVhZGVyKHRoaXMuaGVhZGVyKSAvL+iOt+WPluS4gOe7hGl0ZW3kuK3lpLTpg6jkvY3nva5cbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlci5zZXRQb3NpdGlvbihwb3MpXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICog5Yip55SoY2MuU2Nyb2xsVmlld+eahOaWueazleadpeiuvue9rmNvbnRlbnTnmoTotbflp4vkvY3nva4g55Sx5LqOY29udGVudOWcqOWIneWni+WMlueahOaXtuWAmeWbuuWumuS6humUmueCuemDveS4ujAuNSDmiYDku6Xov5nph4zlv4XnhLbmmK/lnZDmoIcwIFxuICAgICAgICAgICAgICAgICAqIOWmguaenOS9oOayoeacieWFtuS7lumcgOaxguehruWumueUqDAuNemUmueCueeahOivnSDov5nph4zlj6/ku6Xoh6rlt7Horr7nva7kuLpjYy5WZWMyLlpFUk8g6IqC55yB5LiN5b+F6KaB55qE6K6h566X77yI5a6e6ZmF5LiK6K6h566X6YeP5Y+v5b+955Wl5LiN6K6h77yJXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmNhbGN1bGF0ZUJvdW5kYXJ5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBzZWxmSG9yVywgdmlld0hvcldcbiAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgc2VsZkhvclcgPSB0aGlzLmdldFJlYWxseVNpemUoKS5oZWlnaHRcbiAgICAgICAgICAgICAgICB2aWV3SG9yVyA9IHRoaXMudmlld1NpemUuaGVpZ2h0XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGZIb3JXID0gdGhpcy5nZXRSZWFsbHlTaXplKCkud2lkdGhcbiAgICAgICAgICAgICAgICB2aWV3SG9yVyA9IHRoaXMudmlld1NpemUud2lkdGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICog5qC55o2u5o6S5YiX5pa55ZCRIOadpeWIpOaWreWvueavlOWuveW6pui/mOaYr+mrmOW6plxuICAgICAgICAgICAgICog6L+Z6YeM5L2/55So5Y+C5pWwdGhpcy5tdWx0aXBsZeadpeWIpOaWreaYr+WQpumcgOimgee7p+e7reWIm+W7uiDpu5jorqTkuLoy5YCNIOavlOWmgnZpZXflj6/op4blsLrlr7jkuLo4MDAgMuWAjeWwseaYrzE2MDBcbiAgICAgICAgICAgICAqIOagueaNruS5i+WJjeaJgOWIm+W7uueahOaJgOaciWl0ZW3nmoTlsLrlr7jorqHnrpfmmK/lkKbmu6HotrPov5nkuKrlsLrlr7gg5aaC5p6c5ruh6Laz5YiZ5LiN5YaN57un57ut5Yib5bu6IFxuICAgICAgICAgICAgICog55Sx5LqO5piv5YiG5bin5Yqg6L29IOaJgOS7peS4i+S4gOasoeWIm+W7uuS8muetiei/meS4gOasoeeahOi/lOWbnue7k+aenCDov5Tlm55mYWxzZSDliJnnu4jmraLliIbluKfku7vliqFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHNlbGZIb3JXID49IHZpZXdIb3JXICogdGhpcy5tdWx0aXBsZSAmJiB0aGlzLmlzR3JvdXBGb290ZXIodGhpcy5mb290ZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4UHJlZmFiVG90YWwgPSB0aGlzLm5vZGUuY2hpbGRyZW5Db3VudCAvL+WbuuWumml0ZW3mlbDph48g5LiN5Zyo57un57ut5Yib5bu6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICBhd2FpdCB0aGlzLmV4ZUdlbmVyYXRvcih0aGlzLl9nZW5lciwgMTApIC8v5omn6KGM5YiG5bin5Lu75YqhIDHluKfliJvlu7oxMOS4qlxuICAgIH1cbiAgICAvKiog5ZCM5q2l5re75Yqg5pys5Zyw5Y+Y6YePIGNoaWxkcmVuIOW5tuWPkemAgSBVSUNoYW5nZUJyb3RoZXJFdm5ldCDpgJrnn6UqL1xuICAgIHByaXZhdGUgYWRkQ2hpbGQobm9kZTogY2MuTm9kZSkge1xuICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKG5vZGUpXG4gICAgICAgIHRoaXMubm9kZS5lbWl0KFVJQ2hhbmdlQnJvdGhlckV2bmV0KVxuICAgIH1cbiAgICAvKiog5ZCM5q2l56e76Zmk5pys5Zyw5Y+Y6YePIGNoaWxkcmVuIOW5tuWPkemAgSBVSUNoYW5nZUJyb3RoZXJFdm5ldCDpgJrnn6UgKi9cbiAgICBwcml2YXRlIHJlbUNoaWxkKG5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHJldHVyblxuICAgICAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIHRoaXMubm9kZS5lbWl0KFVJQ2hhbmdlQnJvdGhlckV2bmV0KVxuICAgIH1cbiAgICAvKiog5YiG5bin5Yqg6L29ICovXG4gICAgcHJpdmF0ZSAqIGdldEdlbmVyYXRvckxlbmd0aChsZW5ndGg6IG51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uLCAuLi5wYXJhbXM6IGFueSk6IEdlbmVyYXRvciB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBjYWxsYmFjayhpLCAuLi5wYXJhbXMpXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgeWllbGRcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIOWIhuW4p+aJp+ihjCAqL1xuICAgIHByaXZhdGUgZXhlR2VuZXJhdG9yKGdlbmVyYXRvcjogR2VuZXJhdG9yLCBkdXJhdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgZ2VuID0gZ2VuZXJhdG9yXG4gICAgICAgICAgICBsZXQgZXhlY3V0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVyID0gZ2VuLm5leHQoKTsgOyBpdGVyID0gZ2VuLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlciA9PSBudWxsIHx8IGl0ZXIuZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lID4gZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZXhlY3V0ZSgpLCBjYy5kaXJlY3Rvci5nZXREZWx0YVRpbWUoKSAqIDEwMDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4ZWN1dGUoKVxuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==