
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/cores/UISuperItem');
require('./assets/cores/UISuperLayout');
require('./assets/cores/UISuperScrollView');
require('./assets/examples/chat/chatItem');
require('./assets/examples/chat/chatPanel');
require('./assets/examples/main');
require('./assets/examples/vertical/verticalItem');
require('./assets/examples/vertical/verticalLoadAndRefresh');
require('./assets/examples/vertical/verticalSimple');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/examples/vertical/verticalLoadAndRefresh.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ee163WdQsJDXI9MrARu99Qg', 'verticalLoadAndRefresh');
// examples/vertical/verticalLoadAndRefresh.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var UISuperLayout_1 = require("../../cores/UISuperLayout");
var verticalItem_1 = require("./verticalItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var verticalLoadAndRefresh = /** @class */ (function (_super) {
    __extends(verticalLoadAndRefresh, _super);
    function verticalLoadAndRefresh() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.header = null;
        _this.footer = null;
        _this.layout = null;
        _this.refreshTotal = 1;
        _this.total = 10;
        _this.datas = [];
        return _this;
    }
    verticalLoadAndRefresh.prototype.onLoad = function () {
        this.header.scaleY = 0;
        this.footer.scaleY = 0;
    };
    verticalLoadAndRefresh.prototype.onRefreshEvent = function (node, index) {
        /**
         * 如果你感觉每次都要getComponent获取脚本很麻烦或性能不佳时可以这么做
         * 方法一
         * 在verticalItem脚本中使用 this.node.on("show",this.show,this) 来监听
         * 这里使用 node.emit("show",info)发送事件
         *
         * 方法二
         * 在verticalItem脚本中使用 this.node["show"]=this.show.bind(this) 来向node写入一个自定义方法
         * 这里使用 node["show"](info) 来调用
         *
         * 这两种方法都省去了 getComponent 的调用 不过方法二看起来不是很美 但却很方便 我就经常这么做😂
         */
        var info = this.datas[index];
        node.getComponent(verticalItem_1.default).show(info, index, this.onRemove.bind(this));
    };
    verticalLoadAndRefresh.prototype.onRemove = function (index) {
        this.datas.splice(index, 1);
        this.layout.total(this.datas.length);
    };
    verticalLoadAndRefresh.prototype.gotoHeader = function () {
        this.layout.scrollToHeader(0.618);
    };
    verticalLoadAndRefresh.prototype.gotoFooter = function () {
        this.layout.scrollToFooter(0.618);
    };
    verticalLoadAndRefresh.prototype.gotoMain = function () {
        cc.director.loadScene('main');
    };
    verticalLoadAndRefresh.prototype.onHeaderEvent = function (scrollView, event) {
        var _this = this;
        this.header.opacity = event.progress * 255;
        var label = this.header.getComponentInChildren(cc.Label);
        if (event.progressStage == "touch") {
            label.string = "↓ 下拉刷新";
        }
        if (event.progressStage == "wait") {
            label.string = "↑ 松开刷新";
        }
        if (event.progressStage == "lock") {
            label.string = this.datas.length == 0 ? "没有数据" : "刷新中...";
        }
        if (event.progressStage == 'release') {
            label.string = "";
        }
        if (event.progress > 2) {
            if (!this.header['playing']) {
                this.header.runAction(cc.scaleTo(0.618, 1, 1).easing(cc.easeElasticOut(0.236)));
                this.header['playing'] = true;
            }
        }
        else {
            this.header.stopAllActions();
            this.header['playing'] = false;
            this.header.scaleY = event.progress;
        }
        if (event.action) {
            for (var i = 0; i < this.datas.length; i++) {
                var info = this.datas[i];
                info.message = i + " - (\u5237\u65B0\u6B21\u6570" + this.refreshTotal + ")";
            }
            this.scheduleOnce(function () { return _this.layout.total(_this.datas.length); }, 0.5);
            this.refreshTotal++;
        }
    };
    verticalLoadAndRefresh.prototype.onFooterEvent = function (scrollView, event) {
        var _this = this;
        this.footer.opacity = event.progress * 255;
        var label = this.footer.getComponentInChildren(cc.Label);
        if (event.progressStage == "touch") {
            label.string = "↑ 上拉加载";
        }
        if (event.progressStage == "wait") {
            label.string = "↓ 松开加载";
        }
        if (event.progressStage == "lock") {
            label.string = "加载中...";
        }
        if (event.progressStage == 'release') {
            label.string = "";
        }
        if (event.progress > 2) {
            if (!this.footer['playing']) {
                this.footer.runAction(cc.scaleTo(0.618, 1, 1).easing(cc.easeElasticOut(0.236)));
                this.footer['playing'] = true;
            }
        }
        else {
            this.footer.stopAllActions();
            this.footer['playing'] = false;
            this.footer.scaleY = event.progress;
        }
        if (event.action) {
            for (var i = 0; i < this.total; i++) {
                this.datas.push({ message: "" + this.datas.length });
            }
            this.scheduleOnce(function () { return _this.layout.total(_this.datas.length); }, 0.5);
        }
    };
    __decorate([
        property(cc.Node)
    ], verticalLoadAndRefresh.prototype, "header", void 0);
    __decorate([
        property(cc.Node)
    ], verticalLoadAndRefresh.prototype, "footer", void 0);
    __decorate([
        property(UISuperLayout_1.default)
    ], verticalLoadAndRefresh.prototype, "layout", void 0);
    verticalLoadAndRefresh = __decorate([
        ccclass
    ], verticalLoadAndRefresh);
    return verticalLoadAndRefresh;
}(cc.Component));
exports.default = verticalLoadAndRefresh;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXhhbXBsZXNcXHZlcnRpY2FsXFx2ZXJ0aWNhbExvYWRBbmRSZWZyZXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRDtBQUV0RCwrQ0FBMEM7QUFDcEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBb0QsMENBQVk7SUFBaEU7UUFBQSxxRUE2R0M7UUE1R3NCLFlBQU0sR0FBWSxJQUFJLENBQUE7UUFDdEIsWUFBTSxHQUFZLElBQUksQ0FBQTtRQUNoQixZQUFNLEdBQWtCLElBQUksQ0FBQTtRQUM3QyxrQkFBWSxHQUFXLENBQUMsQ0FBQTtRQUN4QixXQUFLLEdBQUcsRUFBRSxDQUFBO1FBQ1YsV0FBSyxHQUFVLEVBQUUsQ0FBQTs7SUF1RzdCLENBQUM7SUF0R0csdUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUNPLCtDQUFjLEdBQXRCLFVBQXVCLElBQWEsRUFBRSxLQUFhO1FBQy9DOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQy9FLENBQUM7SUFDTyx5Q0FBUSxHQUFoQixVQUFpQixLQUFhO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMz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QUssQ0FBQTtZQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFBO1NBQ3RDO1FBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFRLEVBQUUsQ0FBQyxDQUFBO2FBQ3ZEO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBcEMsQ0FBb0MsRUFBRSxHQUFHLENBQUMsQ0FBQTtTQUNyRTtJQUNMLENBQUM7SUEzR2tCO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUF1QjtJQUN0QjtRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFBdUI7SUFDaEI7UUFBeEIsUUFBUSxDQUFDLHVCQUFhLENBQUM7MERBQTZCO0lBSHBDLHNCQUFzQjtRQUQxQyxPQUFPO09BQ2Esc0JBQXNCLENBNkcxQztJQUFELDZCQUFDO0NBN0dELEFBNkdDLENBN0dtRCxFQUFFLENBQUMsU0FBUyxHQTZHL0Q7a0JBN0dvQixzQkFBc0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlTdXBlckxheW91dCBmcm9tICcuLi8uLi9jb3Jlcy9VSVN1cGVyTGF5b3V0JztcbmltcG9ydCB7IFVJU3VwZXJIZWFkZXJBbmRGb290ZXJFdmVudCB9IGZyb20gJy4uLy4uL2NvcmVzL1VJU3VwZXJTY3JvbGxWaWV3JztcbmltcG9ydCB2ZXJ0aWNhbEl0ZW0gZnJvbSAnLi92ZXJ0aWNhbEl0ZW0nO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB2ZXJ0aWNhbExvYWRBbmRSZWZyZXNoIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSkgaGVhZGVyOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSBmb290ZXI6IGNjLk5vZGUgPSBudWxsXG4gICAgQHByb3BlcnR5KFVJU3VwZXJMYXlvdXQpIGxheW91dDogVUlTdXBlckxheW91dCA9IG51bGxcbiAgICBwcml2YXRlIHJlZnJlc2hUb3RhbDogbnVtYmVyID0gMVxuICAgIHByaXZhdGUgdG90YWwgPSAxMFxuICAgIHByaXZhdGUgZGF0YXM6IGFueVtdID0gW11cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyLnNjYWxlWSA9IDBcbiAgICAgICAgdGhpcy5mb290ZXIuc2NhbGVZID0gMFxuICAgIH1cbiAgICBwcml2YXRlIG9uUmVmcmVzaEV2ZW50KG5vZGU6IGNjLk5vZGUsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWmguaenOS9oOaEn+inieavj+asoemDveimgWdldENvbXBvbmVudOiOt+WPluiEmuacrOW+iOm6u+eDpuaIluaAp+iDveS4jeS9s+aXtuWPr+S7pei/meS5iOWBmlxuICAgICAgICAgKiDmlrnms5XkuIBcbiAgICAgICAgICog5ZyodmVydGljYWxJdGVt6ISa5pys5Lit5L2/55SoIHRoaXMubm9kZS5vbihcInNob3dcIix0aGlzLnNob3csdGhpcykg5p2l55uR5ZCsXG4gICAgICAgICAqIOi/memHjOS9v+eUqCBub2RlLmVtaXQoXCJzaG93XCIsaW5mbynlj5HpgIHkuovku7ZcbiAgICAgICAgICogXG4gICAgICAgICAqIOaWueazleS6jFxuICAgICAgICAgKiDlnKh2ZXJ0aWNhbEl0ZW3ohJrmnKzkuK3kvb/nlKggdGhpcy5ub2RlW1wic2hvd1wiXT10aGlzLnNob3cuYmluZCh0aGlzKSDmnaXlkJFub2Rl5YaZ5YWl5LiA5Liq6Ieq5a6a5LmJ5pa55rOVXG4gICAgICAgICAqIOi/memHjOS9v+eUqCBub2RlW1wic2hvd1wiXShpbmZvKSDmnaXosIPnlKhcbiAgICAgICAgICogXG4gICAgICAgICAqIOi/meS4pOenjeaWueazlemDveecgeWOu+S6hiBnZXRDb21wb25lbnQg55qE6LCD55SoIOS4jei/h+aWueazleS6jOeci+i1t+adpeS4jeaYr+W+iOe+jiDkvYbljbTlvojmlrnkvr8g5oiR5bCx57uP5bi46L+Z5LmI5YGa8J+YglxuICAgICAgICAgKi9cbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmRhdGFzW2luZGV4XVxuICAgICAgICBub2RlLmdldENvbXBvbmVudCh2ZXJ0aWNhbEl0ZW0pLnNob3coaW5mbywgaW5kZXgsIHRoaXMub25SZW1vdmUuYmluZCh0aGlzKSlcbiAgICB9XG4gICAgcHJpdmF0ZSBvblJlbW92ZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGF0YXMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICB0aGlzLmxheW91dC50b3RhbCh0aGlzLmRhdGFzLmxlbmd0aClcbiAgICB9XG4gICAgcHJpdmF0ZSBnb3RvSGVhZGVyKCkge1xuICAgICAgICB0aGlzLmxheW91dC5zY3JvbGxUb0hlYWRlcigwLjYxOClcbiAgICB9XG4gICAgcHJpdmF0ZSBnb3RvRm9vdGVyKCkge1xuICAgICAgICB0aGlzLmxheW91dC5zY3JvbGxUb0Zvb3RlcigwLjYxOClcbiAgICB9XG4gICAgcHJpdmF0ZSBnb3RvTWFpbigpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdtYWluJylcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uSGVhZGVyRXZlbnQoc2Nyb2xsVmlldzogYW55LCBldmVudDogVUlTdXBlckhlYWRlckFuZEZvb3RlckV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGVhZGVyLm9wYWNpdHkgPSBldmVudC5wcm9ncmVzcyAqIDI1NVxuICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLmhlYWRlci5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKVxuICAgICAgICBpZiAoZXZlbnQucHJvZ3Jlc3NTdGFnZSA9PSBcInRvdWNoXCIpIHtcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IFwi4oaTIOS4i+aLieWIt+aWsFwiXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnByb2dyZXNzU3RhZ2UgPT0gXCJ3YWl0XCIpIHtcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IFwi4oaRIOadvuW8gOWIt+aWsFwiXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnByb2dyZXNzU3RhZ2UgPT0gXCJsb2NrXCIpIHtcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IHRoaXMuZGF0YXMubGVuZ3RoID09IDAgPyBcIuayoeacieaVsOaNrlwiIDogXCLliLfmlrDkuK0uLi5cIlxuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5wcm9ncmVzc1N0YWdlID09ICdyZWxlYXNlJykge1xuICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gXCJcIlxuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5wcm9ncmVzcyA+IDIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5oZWFkZXJbJ3BsYXlpbmcnXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuNjE4LCAxLCAxKS5lYXNpbmcoY2MuZWFzZUVsYXN0aWNPdXQoMC4yMzYpKSlcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclsncGxheWluZyddID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIuc3RvcEFsbEFjdGlvbnMoKVxuICAgICAgICAgICAgdGhpcy5oZWFkZXJbJ3BsYXlpbmcnXSA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmhlYWRlci5zY2FsZVkgPSBldmVudC5wcm9ncmVzc1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC5hY3Rpb24pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZm8gPSB0aGlzLmRhdGFzW2ldO1xuICAgICAgICAgICAgICAgIGluZm8ubWVzc2FnZSA9IGAke2l9IC0gKOWIt+aWsOasoeaVsCR7dGhpcy5yZWZyZXNoVG90YWx9KWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHRoaXMubGF5b3V0LnRvdGFsKHRoaXMuZGF0YXMubGVuZ3RoKSwgMC41KVxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVG90YWwrK1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkZvb3RlckV2ZW50KHNjcm9sbFZpZXc6IGFueSwgZXZlbnQ6IFVJU3VwZXJIZWFkZXJBbmRGb290ZXJFdmVudCkge1xuICAgICAgICB0aGlzLmZvb3Rlci5vcGFjaXR5ID0gZXZlbnQucHJvZ3Jlc3MgKiAyNTVcbiAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5mb290ZXIuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbClcblxuICAgICAgICBpZiAoZXZlbnQucHJvZ3Jlc3NTdGFnZSA9PSBcInRvdWNoXCIpIHtcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IFwi4oaRIOS4iuaLieWKoOi9vVwiXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnByb2dyZXNzU3RhZ2UgPT0gXCJ3YWl0XCIpIHtcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IFwi4oaTIOadvuW8gOWKoOi9vVwiXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnByb2dyZXNzU3RhZ2UgPT0gXCJsb2NrXCIpIHtcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IFwi5Yqg6L295LitLi4uXCJcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQucHJvZ3Jlc3NTdGFnZSA9PSAncmVsZWFzZScpIHtcbiAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IFwiXCJcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQucHJvZ3Jlc3MgPiAyKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZm9vdGVyWydwbGF5aW5nJ10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvb3Rlci5ydW5BY3Rpb24oY2Muc2NhbGVUbygwLjYxOCwgMSwgMSkuZWFzaW5nKGNjLmVhc2VFbGFzdGljT3V0KDAuMjM2KSkpXG4gICAgICAgICAgICAgICAgdGhpcy5mb290ZXJbJ3BsYXlpbmcnXSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9vdGVyLnN0b3BBbGxBY3Rpb25zKClcbiAgICAgICAgICAgIHRoaXMuZm9vdGVyWydwbGF5aW5nJ10gPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5mb290ZXIuc2NhbGVZID0gZXZlbnQucHJvZ3Jlc3NcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQuYWN0aW9uKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG90YWw7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YXMucHVzaCh7IG1lc3NhZ2U6IGAke3RoaXMuZGF0YXMubGVuZ3RofWAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHRoaXMubGF5b3V0LnRvdGFsKHRoaXMuZGF0YXMubGVuZ3RoKSwgMC41KVxuICAgICAgICB9XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/cores/UISuperScrollView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cf9af4O7wZKvocAG07bRvtr', 'UISuperScrollView');
// cores/UISuperScrollView.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: steveJobs
 * @Email: icipiqkm@gmail.com
 * @Date: 2020-11-19 01:15:04
 * @Last Modified by: steveJobs
 * @Last Modified time: 2020-12-04 14:35:43
 * @Description: Description
 */
var UISuperLayout_1 = require("./UISuperLayout");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var EPSILON = 1e-4;
var UISpuerScrollView = /** @class */ (function (_super) {
    __extends(UISpuerScrollView, _super);
    function UISpuerScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.headerOutOffset = 200;
        _this.headerMultiple = 2;
        _this.footerOutOffset = 200;
        _this.footerMultiple = 2;
        _this.pullDownEvents = [];
        _this.pullUpEvents = [];
        _this.isMoveHeader = false;
        _this.isMoveFooter = false;
        _this.isLockHeader = false;
        _this.isLockFooter = false;
        _this.headerProgress = 0;
        _this.footerProgress = 0;
        _this._layout = null;
        return _this;
    }
    Object.defineProperty(UISpuerScrollView.prototype, "view", {
        get: function () { return this['_view']; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISpuerScrollView.prototype, "autoScrolling", {
        get: function () { return this['_autoScrolling']; },
        set: function (value) { this['_autoScrolling'] = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISpuerScrollView.prototype, "layout", {
        get: function () {
            if (this._layout == null)
                this._layout = this.content.getComponent(UISuperLayout_1.default);
            return this._layout;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISpuerScrollView.prototype, "isHeader", {
        /** 当前头部的item是否真的是数据的开头 也就是0 */
        get: function () {
            var _a, _b, _c, _d;
            if (this.layout.headerToFooter) {
                if ((_a = this.layout) === null || _a === void 0 ? void 0 : _a.header) {
                    return ((_b = this.layout) === null || _b === void 0 ? void 0 : _b.header['index']) == 0;
                }
            }
            else {
                if ((_c = this.layout) === null || _c === void 0 ? void 0 : _c.footer) {
                    return ((_d = this.layout) === null || _d === void 0 ? void 0 : _d.footer['index']) == this.layout.maxItemTotal - 1;
                }
            }
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISpuerScrollView.prototype, "isFooter", {
        /** 当前尾部的item是否真的是数据的结尾 */
        get: function () {
            var _a, _b, _c;
            if (this.layout.headerToFooter) {
                if ((_a = this.layout) === null || _a === void 0 ? void 0 : _a.footer) {
                    return this.layout.footer['index'] == this.layout.maxItemTotal - 1;
                }
            }
            else {
                if ((_b = this.layout) === null || _b === void 0 ? void 0 : _b.header) {
                    return ((_c = this.layout) === null || _c === void 0 ? void 0 : _c.header['index']) == 0;
                }
            }
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISpuerScrollView.prototype, "isCalculPull", {
        /** 是否需要计算？如果上拉/下拉事件没有监听者则不需要相关的计算 */
        get: function () {
            return this.pullDownEvents.length > 0 || this.pullUpEvents.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    UISpuerScrollView.prototype.calculateBoundary = function () {
        this['_calculateBoundary']();
    };
    UISpuerScrollView.prototype.getHowMuchOutOfBoundary = function (offset) {
        return this['_getHowMuchOutOfBoundary'](offset);
    };
    UISpuerScrollView.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.SIZE_CHANGED, this.onChangeSize, this);
    };
    UISpuerScrollView.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this.onChangeSize, this);
    };
    UISpuerScrollView.prototype.onChangeSize = function () {
        var widget = this.view.getComponent(cc.Widget);
        if (!widget)
            return;
        widget.updateAlignment();
    };
    /** 释放 功能用于上拉加载下拉刷新 解锁头尾固定的尺寸 */
    UISpuerScrollView.prototype.release = function () {
        this.isMoveHeader = false;
        this.isMoveFooter = false;
        if (this.isLockHeader || this.isLockFooter) {
            var outOfBoundary = this.getHowMuchOutOfBoundary();
            var offset = this.vertical ? outOfBoundary.y : -outOfBoundary.x;
            var autoScroll = true;
            if (offset == 0 || this.isLockHeader && offset < 0 || this.isLockFooter && offset > 0) {
                this.clearProgress();
                autoScroll = false;
            }
            this.isLockHeader = false;
            this.isLockFooter = false;
            if (autoScroll) {
                this['_outOfBoundaryAmountDirty'] = true;
                this['_processInertiaScroll']();
            }
        }
        else {
            this.clearProgress();
        }
    };
    /**重置列表 当列表滑动到底部时 然后不管通过什么方式(同步|异步)减少了整体的(高度|缩放|尺寸) 时保证内容显示正确 */
    UISpuerScrollView.prototype.reset = function () {
        this['_outOfBoundaryAmountDirty'] = true;
        var offset = this.getHowMuchOutOfBoundary();
        if (!offset.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
            this['_processInertiaScroll']();
        }
    };
    UISpuerScrollView.prototype._onTouchMoved = function (event, captureListeners) {
        _super.prototype['_onTouchMoved'].call(this, event, captureListeners);
        if (this.isCalculPull) {
            var outOfBoundary = this.getHowMuchOutOfBoundary();
            var offset = this.vertical ? outOfBoundary.y : -outOfBoundary.x;
            if (offset > 0 && this.isHeader && !this.isLockHeader && !this.isLockFooter) {
                this.headerProgress = offset < EPSILON ? 0 : offset / this.headerOutOffset;
                this.isMoveHeader = this.headerProgress >= this.headerMultiple;
                this.emitPullDownEvent({ action: false, progress: this.headerProgress, progressStage: this.isMoveHeader ? "wait" : "touch" });
                this.emitPullUpEvent({ action: false, progress: 0, progressStage: "release" });
            }
            else if (offset < 0 && this.isFooter && !this.isLockFooter && !this.isLockHeader) {
                this.footerProgress = -offset < EPSILON ? 0 : -offset / this.footerOutOffset;
                this.isMoveFooter = this.footerProgress >= this.footerMultiple;
                this.emitPullUpEvent({ action: false, progress: this.footerProgress, progressStage: this.isMoveFooter ? "wait" : "touch" });
                this.emitPullDownEvent({ action: false, progress: 0, progressStage: "release" });
            }
        }
    };
    UISpuerScrollView.prototype._dispatchEvent = function (event) {
        _super.prototype['_dispatchEvent'].call(this, event);
        if (event == 'scroll-ended') {
            this.layout.scrollToHeaderOrFooter = false; //功能用于控制循环滚动时使用scrollTo方法滚动带来的效果问题 
        }
    };
    UISpuerScrollView.prototype._getContentTopBoundary = function () {
        var _a;
        var viewSize = this.view.getContentSize();
        var local = 0;
        if (((_a = this.layout) === null || _a === void 0 ? void 0 : _a.header) && this.layout.getReallySize().height > viewSize.height) {
            local = this.layout.topBoundary; //返回头部item上边距
        }
        else {
            //功能用于无内容/少量内容时也可以上拉加载下拉刷新 如果所有item加起来的尺寸不足以撑满整个可视区域时 直接使用view可视尺寸
            local = this._getContentBottomBoundary() + viewSize.height;
        }
        if (this.isHeader && this.isLockHeader) {
            local += this.headerOutOffset; //功能用于上拉加载 下拉刷新 让整个content多一个 headerOutOffset 的尺寸
        }
        return local;
    };
    UISpuerScrollView.prototype._getContentBottomBoundary = function () {
        var _a;
        var viewSize = this.view.getContentSize();
        var local = 0;
        if (((_a = this.layout) === null || _a === void 0 ? void 0 : _a.footer) && this.layout.getReallySize().height > viewSize.height) {
            local = this.layout.bottomBoundary; //返回尾部item上边距
        }
        else {
            //功能用于无内容/少量内容时也可以上拉加载下拉刷新 如果所有item加起来的尺寸不足以撑满整个可视区域时 直接使用view可视尺寸
            local = this.layout.node.y - this.layout.node.getAnchorPoint().y * viewSize.height;
        }
        if (this.isFooter && this.isLockFooter) {
            local -= this.footerOutOffset; //功能用于上拉加载 下拉刷新 让整个content多一个 footerOutOffset 的尺寸
        }
        return local;
    };
    UISpuerScrollView.prototype._getContentLeftBoundary = function () {
        var _a;
        var viewSize = this.view.getContentSize();
        var local = 0;
        if (((_a = this.layout) === null || _a === void 0 ? void 0 : _a.header) && this.layout.getReallySize().width > viewSize.width) {
            local = this.layout.leftBoundary; //返回头部item左边距
        }
        else {
            //功能用于无内容/少量内容时也可以上拉加载下拉刷新 如果所有item加起来的尺寸不足以撑满整个可视区域时 直接使用view可视尺寸
            local = this.layout.node.x - this.layout.node.getAnchorPoint().x * viewSize.width;
        }
        if (this.isHeader && this.isLockHeader) {
            local -= this.headerOutOffset; //功能用于上拉加载 下拉刷新 让整个content多一个 headerOutOffset 的尺寸
        }
        return local;
    };
    UISpuerScrollView.prototype._getContentRightBoundary = function () {
        var _a;
        var viewSize = this.view.getContentSize();
        var local = 0;
        if (((_a = this.layout) === null || _a === void 0 ? void 0 : _a.footer) && this.layout.getReallySize().width > viewSize.width) {
            local = this.layout.rightBoundary; //返回头部item右边距
        }
        else {
            //功能用于无内容/少量内容时也可以上拉加载下拉刷新 如果所有item加起来的尺寸不足以撑满整个可视区域时 直接使用view可视尺寸
            local = this._getContentLeftBoundary() + viewSize.width;
        }
        if (this.isFooter && this.isLockFooter) {
            local += this.footerOutOffset; //功能用于上拉加载 下拉刷新 让整个content多一个 footerOutOffset 的尺寸
        }
        return local;
    };
    UISpuerScrollView.prototype._startAutoScroll = function (deltaMove, timeInSecond, attenuated) {
        if (this.isCalculPull) { // 如果没有刷新/加载的监听者 则不计算 
            if (this.isMoveHeader && !this.isLockHeader) { // 锁住头部 意思就是已经触发了下拉事件 应用层应该做些刷新的动作
                this.isLockHeader = true;
                this.vertical && (deltaMove.y -= this.headerOutOffset);
                this.horizontal && (deltaMove.x += this.headerOutOffset);
                this.emitPullDownEvent({ action: true, progress: this.headerProgress, progressStage: 'lock' });
            }
            else if (this.isMoveFooter && !this.isLockFooter) { // 锁住尾部 意思就是已经触发了上拉事件 应用层应该做些加载的动作
                this.isLockFooter = true;
                this.vertical && (deltaMove.y += this.footerOutOffset);
                this.horizontal && (deltaMove.x -= this.footerOutOffset);
                this.emitPullUpEvent({ action: true, progress: this.footerProgress, progressStage: 'lock' });
            }
        }
        _super.prototype['_startAutoScroll'].call(this, deltaMove, timeInSecond, attenuated);
    };
    UISpuerScrollView.prototype._updateScrollBar = function (outOfBoundary) {
        _super.prototype['_updateScrollBar'].call(this, outOfBoundary);
        if (!this.isCalculPull)
            return; // 如果没有刷新/加载的监听者 则不计算 
        if (this['_autoScrollBraking'])
            return; // 自动回弹时不计算 （非手动）
        if (!this.autoScrolling)
            return; // 非自动滚动时不计算 
        var offset = this.vertical ? outOfBoundary.y : -outOfBoundary.x;
        if (offset > 0) { // 下滑
            var progress = offset < EPSILON ? 0 : offset / this.headerOutOffset; //根据参数 headerOutOffset 计算当前下滑的办百分比
            var progressStage = void 0;
            if (this.isLockHeader) {
                this.headerProgress = this.headerProgress == 1 ? this.headerProgress : Math.max(progress, 1);
                progressStage = 'lock'; //锁定状态
            }
            else {
                this.headerProgress = progress < this.headerProgress ? progress : this.headerProgress;
                progressStage = 'release'; //释放状态
            }
            this.emitPullDownEvent({ action: false, progress: this.headerProgress, progressStage: progressStage });
        }
        else if (offset < 0) { //上拉
            var progress = -offset < EPSILON ? 0 : -offset / this.footerOutOffset; //根据参数 footerOutOffset 计算当前下滑的办百分比
            var progressStage = void 0;
            if (this.isLockFooter) {
                this.footerProgress = this.footerProgress == 1 ? this.footerProgress : Math.max(progress, 1);
                progressStage = 'lock'; //锁定状态
            }
            else {
                this.footerProgress = progress < this.footerProgress ? progress : this.footerProgress;
                progressStage = 'release'; //释放状态
            }
            this.emitPullUpEvent({ action: false, progress: this.footerProgress, progressStage: progressStage });
        }
        else if (offset == 0) {
            // 正常滑动时 如果没有锁定头和尾时 释放所有进度
            if (!this.isLockHeader && !this.isLockFooter) {
                this.clearProgress();
            }
        }
    };
    UISpuerScrollView.prototype.clearProgress = function () {
        this.headerProgress = 0;
        this.footerProgress = 0;
        this.emitPullDownEvent({ action: false, progress: 0, progressStage: 'release' });
        this.emitPullUpEvent({ action: false, progress: 0, progressStage: 'release' });
    };
    UISpuerScrollView.prototype.emitPullDownEvent = function (data) {
        cc.Component.EventHandler.emitEvents(this.pullDownEvents, this, data);
    };
    UISpuerScrollView.prototype.emitPullUpEvent = function (data) {
        cc.Component.EventHandler.emitEvents(this.pullUpEvents, this, data);
    };
    __decorate([
        property({
            displayName: "顶部偏移量",
            tooltip: "下拉时超过此偏移会发送下拉事件"
        })
    ], UISpuerScrollView.prototype, "headerOutOffset", void 0);
    __decorate([
        property({ displayName: "满足触发Header的倍数" })
    ], UISpuerScrollView.prototype, "headerMultiple", void 0);
    __decorate([
        property({
            displayName: "底部偏移量",
            tooltip: "上拉时超过此偏移会发送上拉事件"
        })
    ], UISpuerScrollView.prototype, "footerOutOffset", void 0);
    __decorate([
        property({ displayName: "满足触发Footer的倍数" })
    ], UISpuerScrollView.prototype, "footerMultiple", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
            displayName: "下拉事件"
        })
    ], UISpuerScrollView.prototype, "pullDownEvents", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
            displayName: "上拉事件"
        })
    ], UISpuerScrollView.prototype, "pullUpEvents", void 0);
    UISpuerScrollView = __decorate([
        ccclass,
        menu("UISpuerScrollView")
    ], UISpuerScrollView);
    return UISpuerScrollView;
}(cc.ScrollView));
exports.default = UISpuerScrollView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29yZXNcXFVJU3VwZXJTY3JvbGxWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7O0dBT0c7QUFDSCxpREFBNEM7QUFDdEMsSUFBQSxLQUE4QixFQUFFLENBQUMsVUFBVSxFQUF6QyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxJQUFJLFVBQWtCLENBQUM7QUFDbEQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBZ0JyQjtJQUErQyxxQ0FBYTtJQUE1RDtRQUFBLHFFQWdRQztRQTVQTSxxQkFBZSxHQUFXLEdBQUcsQ0FBQTtRQUNZLG9CQUFjLEdBQVcsQ0FBQyxDQUFBO1FBSW5FLHFCQUFlLEdBQVcsR0FBRyxDQUFBO1FBQ1ksb0JBQWMsR0FBVyxDQUFDLENBQUE7UUFJbkUsb0JBQWMsR0FBZ0MsRUFBRSxDQUFBO1FBSWhELGtCQUFZLEdBQWdDLEVBQUUsQ0FBQTtRQUl6QyxrQkFBWSxHQUFZLEtBQUssQ0FBQTtRQUM3QixrQkFBWSxHQUFZLEtBQUssQ0FBQTtRQUM3QixrQkFBWSxHQUFZLEtBQUssQ0FBQTtRQUM3QixrQkFBWSxHQUFZLEtBQUssQ0FBQTtRQUM3QixvQkFBYyxHQUFXLENBQUMsQ0FBQTtRQUMxQixvQkFBYyxHQUFXLENBQUMsQ0FBQTtRQUMxQixhQUFPLEdBQWtCLElBQUksQ0FBQTs7SUFvT3pDLENBQUM7SUE3T0csc0JBQVcsbUNBQUk7YUFBZixjQUE2QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLENBQUM7OztPQUFBO0lBQ25ELHNCQUFXLDRDQUFhO2FBQ3hCLGNBQTZCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUEsQ0FBQyxDQUFDO2FBRDVELFVBQXlCLEtBQWMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxLQUFLLENBQUEsQ0FBQyxDQUFDOzs7T0FBQTtJQVMzRSxzQkFBWSxxQ0FBTTthQUFsQjtZQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJO2dCQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFBO1lBQ2pGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUN2QixDQUFDOzs7T0FBQTtJQUVELHNCQUFZLHVDQUFRO1FBRHBCLCtCQUErQjthQUMvQjs7WUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO2dCQUM1QixVQUFJLElBQUksQ0FBQyxNQUFNLDBDQUFFLE1BQU0sRUFBRTtvQkFDckIsT0FBTyxPQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLE1BQU0sQ0FBQyxPQUFPLE1BQUssQ0FBQyxDQUFBO2lCQUMzQzthQUNKO2lCQUFNO2dCQUNILFVBQUksSUFBSSxDQUFDLE1BQU0sMENBQUUsTUFBTSxFQUFFO29CQUNyQixPQUFPLE9BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsTUFBTSxDQUFDLE9BQU8sTUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUE7aUJBQ3RFO2FBQ0o7WUFDRCxPQUFPLElBQUksQ0FBQTtRQUNmLENBQUM7OztPQUFBO0lBRUQsc0JBQVksdUNBQVE7UUFEcEIsMEJBQTBCO2FBQzFCOztZQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7Z0JBQzVCLFVBQUksSUFBSSxDQUFDLE1BQU0sMENBQUUsTUFBTSxFQUFFO29CQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQTtpQkFDckU7YUFDSjtpQkFBTTtnQkFDSCxVQUFJLElBQUksQ0FBQyxNQUFNLDBDQUFFLE1BQU0sRUFBRTtvQkFDckIsT0FBTyxPQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLE1BQU0sQ0FBQyxPQUFPLE1BQUssQ0FBQyxDQUFBO2lCQUMzQzthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUE7UUFDZixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDJDQUFZO1FBRHZCLHFDQUFxQzthQUNyQztZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUN6RSxDQUFDOzs7T0FBQTtJQUNNLDZDQUFpQixHQUF4QjtRQUNJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUE7SUFDaEMsQ0FBQztJQUNNLG1EQUF1QixHQUE5QixVQUErQixNQUFnQjtRQUMzQyxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFDRCxrQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDekUsQ0FBQztJQUNELHFDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUMxRSxDQUFDO0lBQ08sd0NBQVksR0FBcEI7UUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFNO1FBQ25CLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBQ0QsZ0NBQWdDO0lBQ3pCLG1DQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtRQUN6QixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN4QyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQTtZQUNsRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7WUFDL0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFBO1lBQ3JCLElBQUksTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNuRixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7Z0JBQ3BCLFVBQVUsR0FBRyxLQUFLLENBQUE7YUFDckI7WUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtZQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtZQUN6QixJQUFJLFVBQVUsRUFBRTtnQkFDWixJQUFJLENBQUMsMkJBQTJCLENBQUMsR0FBRyxJQUFJLENBQUE7Z0JBQ3hDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUE7YUFDbEM7U0FDSjthQUFNO1lBQ0gsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELGdFQUFnRTtJQUN6RCxpQ0FBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLDJCQUEyQixDQUFDLEdBQUcsSUFBSSxDQUFBO1FBQ3hDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFBO1FBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUE7U0FDbEM7SUFDTCxDQUFDO0lBQ08seUNBQWEsR0FBckIsVUFBc0IsS0FBMEIsRUFBRSxnQkFBZ0I7UUFDOUQsaUJBQU0sZUFBZSxDQUFDLFlBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUE7UUFDL0MsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFBO1lBQ2xELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtZQUMvRCxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN6RSxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUE7Z0JBQzFFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFBO2dCQUM5RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7Z0JBQzdILElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7YUFDakY7aUJBQU0sSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDaEYsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQTtnQkFDNUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUE7Z0JBQzlELElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUE7Z0JBQzNILElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTthQUNuRjtTQUNKO0lBQ0wsQ0FBQztJQUNPLDBDQUFjLEdBQXRCLFVBQXVCLEtBQUs7UUFDeEIsaUJBQU0sZ0JBQWdCLENBQUMsWUFBQyxLQUFLLENBQUMsQ0FBQTtRQUM5QixJQUFJLEtBQUssSUFBSSxjQUFjLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUEsQ0FBQyxtQ0FBbUM7U0FDakY7SUFDTCxDQUFDO0lBQ08sa0RBQXNCLEdBQTlCOztRQUNJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDekMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO1FBQ2IsSUFBSSxPQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLE1BQU0sS0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQzdFLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQSxDQUFDLGFBQWE7U0FDaEQ7YUFBTTtZQUNILGtFQUFrRTtZQUNsRSxLQUFLLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQTtTQUM3RDtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BDLEtBQUssSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFBLENBQUUsaURBQWlEO1NBQ25GO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUNPLHFEQUF5QixHQUFqQzs7UUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ3pDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNiLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxNQUFNLEtBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUM3RSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUEsQ0FBQyxhQUFhO1NBQ25EO2FBQU07WUFDSCxrRUFBa0U7WUFDbEUsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztTQUN0RjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BDLEtBQUssSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFBLENBQUUsaURBQWlEO1NBQ25GO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUNPLG1EQUF1QixHQUEvQjs7UUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ3pDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNiLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxNQUFNLEtBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRTtZQUMzRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUEsQ0FBQyxhQUFhO1NBQ2pEO2FBQU07WUFDSCxrRUFBa0U7WUFDbEUsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztTQUNyRjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BDLEtBQUssSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFBLENBQUUsaURBQWlEO1NBQ25GO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUNPLG9EQUF3QixHQUFoQzs7UUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ3pDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNiLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxNQUFNLEtBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRTtZQUMzRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUEsQ0FBQyxhQUFhO1NBQ2xEO2FBQU07WUFDSCxrRUFBa0U7WUFDbEUsS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUE7U0FDMUQ7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQyxLQUFLLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQSxDQUFDLGlEQUFpRDtTQUNsRjtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2hCLENBQUM7SUFDTyw0Q0FBZ0IsR0FBeEIsVUFBeUIsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVO1FBQ3hELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFHLHNCQUFzQjtZQUM1QyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsa0NBQWtDO2dCQUM3RSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtnQkFDeEIsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO2dCQUN0RCxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7Z0JBQ3hELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7YUFDakc7aUJBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLGtDQUFrQztnQkFDcEYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtnQkFDdEQsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO2dCQUN4RCxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTthQUMvRjtTQUNKO1FBQ0QsaUJBQU0sa0JBQWtCLENBQUMsWUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQ2xFLENBQUM7SUFDTyw0Q0FBZ0IsR0FBeEIsVUFBeUIsYUFBYTtRQUNsQyxpQkFBTSxrQkFBa0IsQ0FBQyxZQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU0sQ0FBQyxzQkFBc0I7UUFDckQsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUM7WUFBRSxPQUFNLENBQUMsaUJBQWlCO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU0sQ0FBQyxhQUFhO1FBQzdDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtRQUMvRCxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLO1lBQ25CLElBQUksUUFBUSxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUEsQ0FBQyxrQ0FBa0M7WUFDdEcsSUFBSSxhQUFhLFNBQUEsQ0FBQTtZQUNqQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUM1RixhQUFhLEdBQUcsTUFBTSxDQUFBLENBQUUsTUFBTTthQUNqQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUE7Z0JBQ3JGLGFBQWEsR0FBRyxTQUFTLENBQUEsQ0FBQyxNQUFNO2FBQ25DO1lBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQTtTQUV6RzthQUFNLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUk7WUFDekIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUEsQ0FBRSxrQ0FBa0M7WUFDekcsSUFBSSxhQUFhLFNBQUEsQ0FBQTtZQUNqQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUM1RixhQUFhLEdBQUcsTUFBTSxDQUFBLENBQUUsTUFBTTthQUNqQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUE7Z0JBQ3JGLGFBQWEsR0FBRyxTQUFTLENBQUEsQ0FBRSxNQUFNO2FBQ3BDO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUE7U0FFdkc7YUFBTSxJQUFJLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDcEIsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDMUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO2FBQ3ZCO1NBQ0o7SUFDTCxDQUFDO0lBQ08seUNBQWEsR0FBckI7UUFDSSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQTtRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQTtRQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7UUFDaEYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtJQUNsRixDQUFDO0lBQ08sNkNBQWlCLEdBQXpCLFVBQTBCLElBQWlDO1FBQ3ZELEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0lBQ08sMkNBQWUsR0FBdkIsVUFBd0IsSUFBaUM7UUFDckQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3ZFLENBQUM7SUEzUEU7UUFIRixRQUFRLENBQUM7WUFDTixXQUFXLEVBQUUsT0FBTztZQUNwQixPQUFPLEVBQUUsaUJBQWlCO1NBQzdCLENBQUM7OERBQThCO0lBQ1k7UUFBM0MsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxDQUFDOzZEQUEyQjtJQUluRTtRQUhGLFFBQVEsQ0FBQztZQUNOLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLE9BQU8sRUFBRSxpQkFBaUI7U0FDN0IsQ0FBQzs4REFBOEI7SUFDWTtRQUEzQyxRQUFRLENBQUMsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLENBQUM7NkRBQTJCO0lBSW5FO1FBSEYsUUFBUSxDQUFDO1lBQ04sSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWTtZQUMvQixXQUFXLEVBQUUsTUFBTTtTQUN0QixDQUFDOzZEQUFpRDtJQUloRDtRQUhGLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVk7WUFDL0IsV0FBVyxFQUFFLE1BQU07U0FDdEIsQ0FBQzsyREFBK0M7SUFsQmhDLGlCQUFpQjtRQUZyQyxPQUFPO1FBQ1AsSUFBSSxDQUFDLG1CQUFtQixDQUFDO09BQ0wsaUJBQWlCLENBZ1FyQztJQUFELHdCQUFDO0NBaFFELEFBZ1FDLENBaFE4QyxFQUFFLENBQUMsVUFBVSxHQWdRM0Q7a0JBaFFvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQEF1dGhvcjogc3RldmVKb2JzXG4gKiBARW1haWw6IGljaXBpcWttQGdtYWlsLmNvbVxuICogQERhdGU6IDIwMjAtMTEtMTkgMDE6MTU6MDRcbiAqIEBMYXN0IE1vZGlmaWVkIGJ5OiBzdGV2ZUpvYnNcbiAqIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMjAtMTItMDQgMTQ6MzU6NDNcbiAqIEBEZXNjcmlwdGlvbjogRGVzY3JpcHRpb25cbiAqL1xuaW1wb3J0IFVJU3VwZXJMYXlvdXQgZnJvbSAnLi9VSVN1cGVyTGF5b3V0JztcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIG1lbnUgfSA9IGNjLl9kZWNvcmF0b3I7XG5jb25zdCBFUFNJTE9OID0gMWUtNDtcbmV4cG9ydCBpbnRlcmZhY2UgVUlTdXBlckhlYWRlckFuZEZvb3RlckV2ZW50IHtcbiAgICAvKiog5omn6KGM5Yqo5L2cIHRydWU65ruh6Laz6Kem5Y+R5p2h5Lu2ICovXG4gICAgYWN0aW9uOiBib29sZWFuLFxuICAgIC8qKiDmoLnmja7lj4LmlbBoZWFkZXJPdXRPZmZzZXTmiJZmb290ZXJPdXRPZmZzZXQg5p2l6K6h566X55qE6L+b5bqm5YC8ICovXG4gICAgcHJvZ3Jlc3M6IG51bWJlcixcbiAgICAvKiog5b2T5YmN6L+b5bqm54q25oCBIFxuICAgICAqIHRvdWNoPeinpuaRuOS4rSDmraPlnKjop6bmkbjmu5HliqjkuK0gXG4gICAgICogd2FpdD3nrYnlvoXkuK0g5bey57uP5ruh6Laz5LqG6Kem5Y+R55qE5pu05paw5Yqo5L2c55qE5p2h5Lu2IFxuICAgICAqIGxvY2s96ZSB5a6a5LitIOW9k+WJjeato+WcqOaJp+ihjOWIt+aWsOaIluWKoOi9vVxuICAgICAqIHJlbGVhc2U96YeK5pS+5LitIFxuICAgICAqL1xuICAgIHByb2dyZXNzU3RhZ2U6IFwidG91Y2hcIiB8IFwid2FpdFwiIHwgXCJsb2NrXCIgfCBcInJlbGVhc2VcIixcbn1cbkBjY2NsYXNzXG5AbWVudShcIlVJU3B1ZXJTY3JvbGxWaWV3XCIpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVNwdWVyU2Nyb2xsVmlldyBleHRlbmRzIGNjLlNjcm9sbFZpZXcge1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIumhtumDqOWBj+enu+mHj1wiLFxuICAgICAgICB0b29sdGlwOiBcIuS4i+aLieaXtui2hei/h+atpOWBj+enu+S8muWPkemAgeS4i+aLieS6i+S7tlwiXG4gICAgfSkgaGVhZGVyT3V0T2Zmc2V0OiBudW1iZXIgPSAyMDBcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLmu6HotrPop6blj5FIZWFkZXLnmoTlgI3mlbBcIiB9KSBoZWFkZXJNdWx0aXBsZTogbnVtYmVyID0gMlxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIuW6lemDqOWBj+enu+mHj1wiLFxuICAgICAgICB0b29sdGlwOiBcIuS4iuaLieaXtui2hei/h+atpOWBj+enu+S8muWPkemAgeS4iuaLieS6i+S7tlwiXG4gICAgfSkgZm9vdGVyT3V0T2Zmc2V0OiBudW1iZXIgPSAyMDBcbiAgICBAcHJvcGVydHkoeyBkaXNwbGF5TmFtZTogXCLmu6HotrPop6blj5FGb290ZXLnmoTlgI3mlbBcIiB9KSBmb290ZXJNdWx0aXBsZTogbnVtYmVyID0gMlxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsXG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIuS4i+aLieS6i+S7tlwiXG4gICAgfSkgcHVsbERvd25FdmVudHM6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXSA9IFtdXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcixcbiAgICAgICAgZGlzcGxheU5hbWU6IFwi5LiK5ouJ5LqL5Lu2XCJcbiAgICB9KSBwdWxsVXBFdmVudHM6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXSA9IFtdXG4gICAgcHVibGljIGdldCB2aWV3KCk6IGNjLk5vZGUgeyByZXR1cm4gdGhpc1snX3ZpZXcnXSB9XG4gICAgcHVibGljIHNldCBhdXRvU2Nyb2xsaW5nKHZhbHVlOiBib29sZWFuKSB7IHRoaXNbJ19hdXRvU2Nyb2xsaW5nJ10gPSB2YWx1ZSB9XG4gICAgcHVibGljIGdldCBhdXRvU2Nyb2xsaW5nKCkgeyByZXR1cm4gdGhpc1snX2F1dG9TY3JvbGxpbmcnXSB9XG4gICAgcHJpdmF0ZSBpc01vdmVIZWFkZXI6IGJvb2xlYW4gPSBmYWxzZVxuICAgIHByaXZhdGUgaXNNb3ZlRm9vdGVyOiBib29sZWFuID0gZmFsc2VcbiAgICBwcml2YXRlIGlzTG9ja0hlYWRlcjogYm9vbGVhbiA9IGZhbHNlXG4gICAgcHJpdmF0ZSBpc0xvY2tGb290ZXI6IGJvb2xlYW4gPSBmYWxzZVxuICAgIHByaXZhdGUgaGVhZGVyUHJvZ3Jlc3M6IG51bWJlciA9IDBcbiAgICBwcml2YXRlIGZvb3RlclByb2dyZXNzOiBudW1iZXIgPSAwXG4gICAgcHJpdmF0ZSBfbGF5b3V0OiBVSVN1cGVyTGF5b3V0ID0gbnVsbFxuICAgIHByaXZhdGUgZ2V0IGxheW91dCgpOiBVSVN1cGVyTGF5b3V0IHtcbiAgICAgICAgaWYgKHRoaXMuX2xheW91dCA9PSBudWxsKSB0aGlzLl9sYXlvdXQgPSB0aGlzLmNvbnRlbnQuZ2V0Q29tcG9uZW50KFVJU3VwZXJMYXlvdXQpXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXlvdXRcbiAgICB9XG4gICAgLyoqIOW9k+WJjeWktOmDqOeahGl0ZW3mmK/lkKbnnJ/nmoTmmK/mlbDmja7nmoTlvIDlpLQg5Lmf5bCx5pivMCAqL1xuICAgIHByaXZhdGUgZ2V0IGlzSGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGVhZGVyVG9Gb290ZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dD8uaGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGF5b3V0Py5oZWFkZXJbJ2luZGV4J10gPT0gMFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Py5mb290ZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXQ/LmZvb3RlclsnaW5kZXgnXSA9PSB0aGlzLmxheW91dC5tYXhJdGVtVG90YWwgLSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgLyoqIOW9k+WJjeWwvumDqOeahGl0ZW3mmK/lkKbnnJ/nmoTmmK/mlbDmja7nmoTnu5PlsL4gKi9cbiAgICBwcml2YXRlIGdldCBpc0Zvb3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMubGF5b3V0LmhlYWRlclRvRm9vdGVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQ/LmZvb3Rlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxheW91dC5mb290ZXJbJ2luZGV4J10gPT0gdGhpcy5sYXlvdXQubWF4SXRlbVRvdGFsIC0gMVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Py5oZWFkZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXQ/LmhlYWRlclsnaW5kZXgnXSA9PSAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgLyoqIOaYr+WQpumcgOimgeiuoeeul++8n+WmguaenOS4iuaLiS/kuIvmi4nkuovku7bmsqHmnInnm5HlkKzogIXliJnkuI3pnIDopoHnm7jlhbPnmoTorqHnrpcgKi9cbiAgICBwdWJsaWMgZ2V0IGlzQ2FsY3VsUHVsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVsbERvd25FdmVudHMubGVuZ3RoID4gMCB8fCB0aGlzLnB1bGxVcEV2ZW50cy5sZW5ndGggPiAwXG4gICAgfVxuICAgIHB1YmxpYyBjYWxjdWxhdGVCb3VuZGFyeSgpIHtcbiAgICAgICAgdGhpc1snX2NhbGN1bGF0ZUJvdW5kYXJ5J10oKVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0SG93TXVjaE91dE9mQm91bmRhcnkob2Zmc2V0PzogY2MuVmVjMikge1xuICAgICAgICByZXR1cm4gdGhpc1snX2dldEhvd011Y2hPdXRPZkJvdW5kYXJ5J10ob2Zmc2V0KVxuICAgIH1cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIHRoaXMub25DaGFuZ2VTaXplLCB0aGlzKVxuICAgIH1cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLm9uQ2hhbmdlU2l6ZSwgdGhpcylcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkNoYW5nZVNpemUoKSB7XG4gICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLnZpZXcuZ2V0Q29tcG9uZW50KGNjLldpZGdldClcbiAgICAgICAgaWYgKCF3aWRnZXQpIHJldHVyblxuICAgICAgICB3aWRnZXQudXBkYXRlQWxpZ25tZW50KClcbiAgICB9XG4gICAgLyoqIOmHiuaUviDlip/og73nlKjkuo7kuIrmi4nliqDovb3kuIvmi4nliLfmlrAg6Kej6ZSB5aS05bC+5Zu65a6a55qE5bC65a+4ICovXG4gICAgcHVibGljIHJlbGVhc2UoKSB7XG4gICAgICAgIHRoaXMuaXNNb3ZlSGVhZGVyID0gZmFsc2VcbiAgICAgICAgdGhpcy5pc01vdmVGb290ZXIgPSBmYWxzZVxuICAgICAgICBpZiAodGhpcy5pc0xvY2tIZWFkZXIgfHwgdGhpcy5pc0xvY2tGb290ZXIpIHtcbiAgICAgICAgICAgIGxldCBvdXRPZkJvdW5kYXJ5ID0gdGhpcy5nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeSgpXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy52ZXJ0aWNhbCA/IG91dE9mQm91bmRhcnkueSA6IC1vdXRPZkJvdW5kYXJ5LnhcbiAgICAgICAgICAgIGxldCBhdXRvU2Nyb2xsID0gdHJ1ZVxuICAgICAgICAgICAgaWYgKG9mZnNldCA9PSAwIHx8IHRoaXMuaXNMb2NrSGVhZGVyICYmIG9mZnNldCA8IDAgfHwgdGhpcy5pc0xvY2tGb290ZXIgJiYgb2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJQcm9ncmVzcygpXG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzTG9ja0hlYWRlciA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLmlzTG9ja0Zvb3RlciA9IGZhbHNlXG4gICAgICAgICAgICBpZiAoYXV0b1Njcm9sbCkge1xuICAgICAgICAgICAgICAgIHRoaXNbJ19vdXRPZkJvdW5kYXJ5QW1vdW50RGlydHknXSA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzWydfcHJvY2Vzc0luZXJ0aWFTY3JvbGwnXSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyUHJvZ3Jlc3MoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq6YeN572u5YiX6KGoIOW9k+WIl+ihqOa7keWKqOWIsOW6lemDqOaXtiDnhLblkI7kuI3nrqHpgJrov4fku4DkuYjmlrnlvI8o5ZCM5q2lfOW8guatpSnlh4/lsJHkuobmlbTkvZPnmoQo6auY5bqmfOe8qeaUvnzlsLrlr7gpIOaXtuS/neivgeWGheWuueaYvuekuuato+ehriAqL1xuICAgIHB1YmxpYyByZXNldCgpIHtcbiAgICAgICAgdGhpc1snX291dE9mQm91bmRhcnlBbW91bnREaXJ0eSddID0gdHJ1ZVxuICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeSgpXG4gICAgICAgIGlmICghb2Zmc2V0LmZ1enp5RXF1YWxzKGNjLnYyKDAsIDApLCBFUFNJTE9OKSkge1xuICAgICAgICAgICAgdGhpc1snX3Byb2Nlc3NJbmVydGlhU2Nyb2xsJ10oKVxuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgX29uVG91Y2hNb3ZlZChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCwgY2FwdHVyZUxpc3RlbmVycykge1xuICAgICAgICBzdXBlclsnX29uVG91Y2hNb3ZlZCddKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKVxuICAgICAgICBpZiAodGhpcy5pc0NhbGN1bFB1bGwpIHtcbiAgICAgICAgICAgIGxldCBvdXRPZkJvdW5kYXJ5ID0gdGhpcy5nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeSgpXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy52ZXJ0aWNhbCA/IG91dE9mQm91bmRhcnkueSA6IC1vdXRPZkJvdW5kYXJ5LnhcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwICYmIHRoaXMuaXNIZWFkZXIgJiYgIXRoaXMuaXNMb2NrSGVhZGVyICYmICF0aGlzLmlzTG9ja0Zvb3Rlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyUHJvZ3Jlc3MgPSBvZmZzZXQgPCBFUFNJTE9OID8gMCA6IG9mZnNldCAvIHRoaXMuaGVhZGVyT3V0T2Zmc2V0XG4gICAgICAgICAgICAgICAgdGhpcy5pc01vdmVIZWFkZXIgPSB0aGlzLmhlYWRlclByb2dyZXNzID49IHRoaXMuaGVhZGVyTXVsdGlwbGVcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRQdWxsRG93bkV2ZW50KHsgYWN0aW9uOiBmYWxzZSwgcHJvZ3Jlc3M6IHRoaXMuaGVhZGVyUHJvZ3Jlc3MsIHByb2dyZXNzU3RhZ2U6IHRoaXMuaXNNb3ZlSGVhZGVyID8gXCJ3YWl0XCIgOiBcInRvdWNoXCIgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRQdWxsVXBFdmVudCh7IGFjdGlvbjogZmFsc2UsIHByb2dyZXNzOiAwLCBwcm9ncmVzc1N0YWdlOiBcInJlbGVhc2VcIiB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmIChvZmZzZXQgPCAwICYmIHRoaXMuaXNGb290ZXIgJiYgIXRoaXMuaXNMb2NrRm9vdGVyICYmICF0aGlzLmlzTG9ja0hlYWRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyUHJvZ3Jlc3MgPSAtb2Zmc2V0IDwgRVBTSUxPTiA/IDAgOiAtb2Zmc2V0IC8gdGhpcy5mb290ZXJPdXRPZmZzZXRcbiAgICAgICAgICAgICAgICB0aGlzLmlzTW92ZUZvb3RlciA9IHRoaXMuZm9vdGVyUHJvZ3Jlc3MgPj0gdGhpcy5mb290ZXJNdWx0aXBsZVxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFB1bGxVcEV2ZW50KHsgYWN0aW9uOiBmYWxzZSwgcHJvZ3Jlc3M6IHRoaXMuZm9vdGVyUHJvZ3Jlc3MsIHByb2dyZXNzU3RhZ2U6IHRoaXMuaXNNb3ZlRm9vdGVyID8gXCJ3YWl0XCIgOiBcInRvdWNoXCIgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRQdWxsRG93bkV2ZW50KHsgYWN0aW9uOiBmYWxzZSwgcHJvZ3Jlc3M6IDAsIHByb2dyZXNzU3RhZ2U6IFwicmVsZWFzZVwiIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfZGlzcGF0Y2hFdmVudChldmVudCkge1xuICAgICAgICBzdXBlclsnX2Rpc3BhdGNoRXZlbnQnXShldmVudClcbiAgICAgICAgaWYgKGV2ZW50ID09ICdzY3JvbGwtZW5kZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dC5zY3JvbGxUb0hlYWRlck9yRm9vdGVyID0gZmFsc2UgLy/lip/og73nlKjkuo7mjqfliLblvqrnjq/mu5rliqjml7bkvb/nlKhzY3JvbGxUb+aWueazlea7muWKqOW4puadpeeahOaViOaenOmXrumimCBcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIF9nZXRDb250ZW50VG9wQm91bmRhcnkoKSB7XG4gICAgICAgIGxldCB2aWV3U2l6ZSA9IHRoaXMudmlldy5nZXRDb250ZW50U2l6ZSgpXG4gICAgICAgIGxldCBsb2NhbCA9IDBcbiAgICAgICAgaWYgKHRoaXMubGF5b3V0Py5oZWFkZXIgJiYgdGhpcy5sYXlvdXQuZ2V0UmVhbGx5U2l6ZSgpLmhlaWdodCA+IHZpZXdTaXplLmhlaWdodCkge1xuICAgICAgICAgICAgbG9jYWwgPSB0aGlzLmxheW91dC50b3BCb3VuZGFyeSAvL+i/lOWbnuWktOmDqGl0ZW3kuIrovrnot51cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5Yqf6IO955So5LqO5peg5YaF5a65L+WwkemHj+WGheWuueaXtuS5n+WPr+S7peS4iuaLieWKoOi9veS4i+aLieWIt+aWsCDlpoLmnpzmiYDmnIlpdGVt5Yqg6LW35p2l55qE5bC65a+45LiN6Laz5Lul5pKR5ruh5pW05Liq5Y+v6KeG5Yy65Z+f5pe2IOebtOaOpeS9v+eUqHZpZXflj6/op4blsLrlr7hcbiAgICAgICAgICAgIGxvY2FsID0gdGhpcy5fZ2V0Q29udGVudEJvdHRvbUJvdW5kYXJ5KCkgKyB2aWV3U2l6ZS5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0hlYWRlciAmJiB0aGlzLmlzTG9ja0hlYWRlcikge1xuICAgICAgICAgICAgbG9jYWwgKz0gdGhpcy5oZWFkZXJPdXRPZmZzZXQgIC8v5Yqf6IO955So5LqO5LiK5ouJ5Yqg6L29IOS4i+aLieWIt+aWsCDorqnmlbTkuKpjb250ZW505aSa5LiA5LiqIGhlYWRlck91dE9mZnNldCDnmoTlsLrlr7hcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9jYWxcbiAgICB9XG4gICAgcHJpdmF0ZSBfZ2V0Q29udGVudEJvdHRvbUJvdW5kYXJ5KCkge1xuICAgICAgICBsZXQgdmlld1NpemUgPSB0aGlzLnZpZXcuZ2V0Q29udGVudFNpemUoKVxuICAgICAgICBsZXQgbG9jYWwgPSAwXG4gICAgICAgIGlmICh0aGlzLmxheW91dD8uZm9vdGVyICYmIHRoaXMubGF5b3V0LmdldFJlYWxseVNpemUoKS5oZWlnaHQgPiB2aWV3U2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgICAgIGxvY2FsID0gdGhpcy5sYXlvdXQuYm90dG9tQm91bmRhcnkgLy/ov5Tlm57lsL7pg6hpdGVt5LiK6L656LedXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL+WKn+iDveeUqOS6juaXoOWGheWuuS/lsJHph4/lhoXlrrnml7bkuZ/lj6/ku6XkuIrmi4nliqDovb3kuIvmi4nliLfmlrAg5aaC5p6c5omA5pyJaXRlbeWKoOi1t+adpeeahOWwuuWvuOS4jei2s+S7peaSkea7oeaVtOS4quWPr+inhuWMuuWfn+aXtiDnm7TmjqXkvb/nlKh2aWV35Y+v6KeG5bC65a+4XG4gICAgICAgICAgICBsb2NhbCA9IHRoaXMubGF5b3V0Lm5vZGUueSAtIHRoaXMubGF5b3V0Lm5vZGUuZ2V0QW5jaG9yUG9pbnQoKS55ICogdmlld1NpemUuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzRm9vdGVyICYmIHRoaXMuaXNMb2NrRm9vdGVyKSB7XG4gICAgICAgICAgICBsb2NhbCAtPSB0aGlzLmZvb3Rlck91dE9mZnNldCAgLy/lip/og73nlKjkuo7kuIrmi4nliqDovb0g5LiL5ouJ5Yi35pawIOiuqeaVtOS4qmNvbnRlbnTlpJrkuIDkuKogZm9vdGVyT3V0T2Zmc2V0IOeahOWwuuWvuFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhbFxuICAgIH1cbiAgICBwcml2YXRlIF9nZXRDb250ZW50TGVmdEJvdW5kYXJ5KCkge1xuICAgICAgICBsZXQgdmlld1NpemUgPSB0aGlzLnZpZXcuZ2V0Q29udGVudFNpemUoKVxuICAgICAgICBsZXQgbG9jYWwgPSAwXG4gICAgICAgIGlmICh0aGlzLmxheW91dD8uaGVhZGVyICYmIHRoaXMubGF5b3V0LmdldFJlYWxseVNpemUoKS53aWR0aCA+IHZpZXdTaXplLndpZHRoKSB7XG4gICAgICAgICAgICBsb2NhbCA9IHRoaXMubGF5b3V0LmxlZnRCb3VuZGFyeSAvL+i/lOWbnuWktOmDqGl0ZW3lt6bovrnot51cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5Yqf6IO955So5LqO5peg5YaF5a65L+WwkemHj+WGheWuueaXtuS5n+WPr+S7peS4iuaLieWKoOi9veS4i+aLieWIt+aWsCDlpoLmnpzmiYDmnIlpdGVt5Yqg6LW35p2l55qE5bC65a+45LiN6Laz5Lul5pKR5ruh5pW05Liq5Y+v6KeG5Yy65Z+f5pe2IOebtOaOpeS9v+eUqHZpZXflj6/op4blsLrlr7hcbiAgICAgICAgICAgIGxvY2FsID0gdGhpcy5sYXlvdXQubm9kZS54IC0gdGhpcy5sYXlvdXQubm9kZS5nZXRBbmNob3JQb2ludCgpLnggKiB2aWV3U2l6ZS53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0hlYWRlciAmJiB0aGlzLmlzTG9ja0hlYWRlcikge1xuICAgICAgICAgICAgbG9jYWwgLT0gdGhpcy5oZWFkZXJPdXRPZmZzZXQgIC8v5Yqf6IO955So5LqO5LiK5ouJ5Yqg6L29IOS4i+aLieWIt+aWsCDorqnmlbTkuKpjb250ZW505aSa5LiA5LiqIGhlYWRlck91dE9mZnNldCDnmoTlsLrlr7hcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9jYWxcbiAgICB9XG4gICAgcHJpdmF0ZSBfZ2V0Q29udGVudFJpZ2h0Qm91bmRhcnkoKSB7XG4gICAgICAgIGxldCB2aWV3U2l6ZSA9IHRoaXMudmlldy5nZXRDb250ZW50U2l6ZSgpXG4gICAgICAgIGxldCBsb2NhbCA9IDBcbiAgICAgICAgaWYgKHRoaXMubGF5b3V0Py5mb290ZXIgJiYgdGhpcy5sYXlvdXQuZ2V0UmVhbGx5U2l6ZSgpLndpZHRoID4gdmlld1NpemUud2lkdGgpIHtcbiAgICAgICAgICAgIGxvY2FsID0gdGhpcy5sYXlvdXQucmlnaHRCb3VuZGFyeSAvL+i/lOWbnuWktOmDqGl0ZW3lj7Povrnot51cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5Yqf6IO955So5LqO5peg5YaF5a65L+WwkemHj+WGheWuueaXtuS5n+WPr+S7peS4iuaLieWKoOi9veS4i+aLieWIt+aWsCDlpoLmnpzmiYDmnIlpdGVt5Yqg6LW35p2l55qE5bC65a+45LiN6Laz5Lul5pKR5ruh5pW05Liq5Y+v6KeG5Yy65Z+f5pe2IOebtOaOpeS9v+eUqHZpZXflj6/op4blsLrlr7hcbiAgICAgICAgICAgIGxvY2FsID0gdGhpcy5fZ2V0Q29udGVudExlZnRCb3VuZGFyeSgpICsgdmlld1NpemUud2lkdGhcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0Zvb3RlciAmJiB0aGlzLmlzTG9ja0Zvb3Rlcikge1xuICAgICAgICAgICAgbG9jYWwgKz0gdGhpcy5mb290ZXJPdXRPZmZzZXQgLy/lip/og73nlKjkuo7kuIrmi4nliqDovb0g5LiL5ouJ5Yi35pawIOiuqeaVtOS4qmNvbnRlbnTlpJrkuIDkuKogZm9vdGVyT3V0T2Zmc2V0IOeahOWwuuWvuFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhbFxuICAgIH1cbiAgICBwcml2YXRlIF9zdGFydEF1dG9TY3JvbGwoZGVsdGFNb3ZlLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDYWxjdWxQdWxsKSB7ICAvLyDlpoLmnpzmsqHmnInliLfmlrAv5Yqg6L2955qE55uR5ZCs6ICFIOWImeS4jeiuoeeulyBcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTW92ZUhlYWRlciAmJiAhdGhpcy5pc0xvY2tIZWFkZXIpIHsgLy8g6ZSB5L2P5aS06YOoIOaEj+aAneWwseaYr+W3sue7j+inpuWPkeS6huS4i+aLieS6i+S7tiDlupTnlKjlsYLlupTor6XlgZrkupvliLfmlrDnmoTliqjkvZxcbiAgICAgICAgICAgICAgICB0aGlzLmlzTG9ja0hlYWRlciA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLnZlcnRpY2FsICYmIChkZWx0YU1vdmUueSAtPSB0aGlzLmhlYWRlck91dE9mZnNldClcbiAgICAgICAgICAgICAgICB0aGlzLmhvcml6b250YWwgJiYgKGRlbHRhTW92ZS54ICs9IHRoaXMuaGVhZGVyT3V0T2Zmc2V0KVxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFB1bGxEb3duRXZlbnQoeyBhY3Rpb246IHRydWUsIHByb2dyZXNzOiB0aGlzLmhlYWRlclByb2dyZXNzLCBwcm9ncmVzc1N0YWdlOiAnbG9jaycgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc01vdmVGb290ZXIgJiYgIXRoaXMuaXNMb2NrRm9vdGVyKSB7IC8vIOmUgeS9j+WwvumDqCDmhI/mgJ3lsLHmmK/lt7Lnu4/op6blj5HkuobkuIrmi4nkuovku7Yg5bqU55So5bGC5bqU6K+l5YGa5Lqb5Yqg6L2955qE5Yqo5L2cXG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvY2tGb290ZXIgPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbCAmJiAoZGVsdGFNb3ZlLnkgKz0gdGhpcy5mb290ZXJPdXRPZmZzZXQpXG4gICAgICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsICYmIChkZWx0YU1vdmUueCAtPSB0aGlzLmZvb3Rlck91dE9mZnNldClcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRQdWxsVXBFdmVudCh7IGFjdGlvbjogdHJ1ZSwgcHJvZ3Jlc3M6IHRoaXMuZm9vdGVyUHJvZ3Jlc3MsIHByb2dyZXNzU3RhZ2U6ICdsb2NrJyB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1cGVyWydfc3RhcnRBdXRvU2Nyb2xsJ10oZGVsdGFNb3ZlLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQpXG4gICAgfVxuICAgIHByaXZhdGUgX3VwZGF0ZVNjcm9sbEJhcihvdXRPZkJvdW5kYXJ5KSB7XG4gICAgICAgIHN1cGVyWydfdXBkYXRlU2Nyb2xsQmFyJ10ob3V0T2ZCb3VuZGFyeSlcbiAgICAgICAgaWYgKCF0aGlzLmlzQ2FsY3VsUHVsbCkgcmV0dXJuIC8vIOWmguaenOayoeacieWIt+aWsC/liqDovb3nmoTnm5HlkKzogIUg5YiZ5LiN6K6h566XIFxuICAgICAgICBpZiAodGhpc1snX2F1dG9TY3JvbGxCcmFraW5nJ10pIHJldHVybiAvLyDoh6rliqjlm57lvLnml7bkuI3orqHnrpcg77yI6Z2e5omL5Yqo77yJXG4gICAgICAgIGlmICghdGhpcy5hdXRvU2Nyb2xsaW5nKSByZXR1cm4gLy8g6Z2e6Ieq5Yqo5rua5Yqo5pe25LiN6K6h566XIFxuICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy52ZXJ0aWNhbCA/IG91dE9mQm91bmRhcnkueSA6IC1vdXRPZkJvdW5kYXJ5LnhcbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHsgLy8g5LiL5ruRXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBvZmZzZXQgPCBFUFNJTE9OID8gMCA6IG9mZnNldCAvIHRoaXMuaGVhZGVyT3V0T2Zmc2V0IC8v5qC55o2u5Y+C5pWwIGhlYWRlck91dE9mZnNldCDorqHnrpflvZPliY3kuIvmu5HnmoTlip7nmb7liIbmr5RcbiAgICAgICAgICAgIGxldCBwcm9ncmVzc1N0YWdlXG4gICAgICAgICAgICBpZiAodGhpcy5pc0xvY2tIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclByb2dyZXNzID0gdGhpcy5oZWFkZXJQcm9ncmVzcyA9PSAxID8gdGhpcy5oZWFkZXJQcm9ncmVzcyA6IE1hdGgubWF4KHByb2dyZXNzLCAxKVxuICAgICAgICAgICAgICAgIHByb2dyZXNzU3RhZ2UgPSAnbG9jaycgIC8v6ZSB5a6a54q25oCBXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyUHJvZ3Jlc3MgPSBwcm9ncmVzcyA8IHRoaXMuaGVhZGVyUHJvZ3Jlc3MgPyBwcm9ncmVzcyA6IHRoaXMuaGVhZGVyUHJvZ3Jlc3NcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1N0YWdlID0gJ3JlbGVhc2UnIC8v6YeK5pS+54q25oCBXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXRQdWxsRG93bkV2ZW50KHsgYWN0aW9uOiBmYWxzZSwgcHJvZ3Jlc3M6IHRoaXMuaGVhZGVyUHJvZ3Jlc3MsIHByb2dyZXNzU3RhZ2U6IHByb2dyZXNzU3RhZ2UgfSlcblxuICAgICAgICB9IGVsc2UgaWYgKG9mZnNldCA8IDApIHsgLy/kuIrmi4lcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IC1vZmZzZXQgPCBFUFNJTE9OID8gMCA6IC1vZmZzZXQgLyB0aGlzLmZvb3Rlck91dE9mZnNldCAgLy/moLnmja7lj4LmlbAgZm9vdGVyT3V0T2Zmc2V0IOiuoeeul+W9k+WJjeS4i+a7keeahOWKnueZvuWIhuavlFxuICAgICAgICAgICAgbGV0IHByb2dyZXNzU3RhZ2VcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTG9ja0Zvb3Rlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyUHJvZ3Jlc3MgPSB0aGlzLmZvb3RlclByb2dyZXNzID09IDEgPyB0aGlzLmZvb3RlclByb2dyZXNzIDogTWF0aC5tYXgocHJvZ3Jlc3MsIDEpXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NTdGFnZSA9ICdsb2NrJyAgLy/plIHlrprnirbmgIFcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb290ZXJQcm9ncmVzcyA9IHByb2dyZXNzIDwgdGhpcy5mb290ZXJQcm9ncmVzcyA/IHByb2dyZXNzIDogdGhpcy5mb290ZXJQcm9ncmVzc1xuICAgICAgICAgICAgICAgIHByb2dyZXNzU3RhZ2UgPSAncmVsZWFzZScgIC8v6YeK5pS+54q25oCBXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXRQdWxsVXBFdmVudCh7IGFjdGlvbjogZmFsc2UsIHByb2dyZXNzOiB0aGlzLmZvb3RlclByb2dyZXNzLCBwcm9ncmVzc1N0YWdlOiBwcm9ncmVzc1N0YWdlIH0pXG5cbiAgICAgICAgfSBlbHNlIGlmIChvZmZzZXQgPT0gMCkge1xuICAgICAgICAgICAgLy8g5q2j5bi45ruR5Yqo5pe2IOWmguaenOayoeaciemUgeWumuWktOWSjOWwvuaXtiDph4rmlL7miYDmnInov5vluqZcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0xvY2tIZWFkZXIgJiYgIXRoaXMuaXNMb2NrRm9vdGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclByb2dyZXNzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIGNsZWFyUHJvZ3Jlc3MoKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyUHJvZ3Jlc3MgPSAwXG4gICAgICAgIHRoaXMuZm9vdGVyUHJvZ3Jlc3MgPSAwXG4gICAgICAgIHRoaXMuZW1pdFB1bGxEb3duRXZlbnQoeyBhY3Rpb246IGZhbHNlLCBwcm9ncmVzczogMCwgcHJvZ3Jlc3NTdGFnZTogJ3JlbGVhc2UnIH0pXG4gICAgICAgIHRoaXMuZW1pdFB1bGxVcEV2ZW50KHsgYWN0aW9uOiBmYWxzZSwgcHJvZ3Jlc3M6IDAsIHByb2dyZXNzU3RhZ2U6ICdyZWxlYXNlJyB9KVxuICAgIH1cbiAgICBwcml2YXRlIGVtaXRQdWxsRG93bkV2ZW50KGRhdGE6IFVJU3VwZXJIZWFkZXJBbmRGb290ZXJFdmVudCkge1xuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy5wdWxsRG93bkV2ZW50cywgdGhpcywgZGF0YSlcbiAgICB9XG4gICAgcHJpdmF0ZSBlbWl0UHVsbFVwRXZlbnQoZGF0YTogVUlTdXBlckhlYWRlckFuZEZvb3RlckV2ZW50KSB7XG4gICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLnB1bGxVcEV2ZW50cywgdGhpcywgZGF0YSlcbiAgICB9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/examples/chat/chatItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '99b10hZnWRCrIEdhwALstgg', 'chatItem');
// examples/chat/chatItem.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var chatItem = /** @class */ (function (_super) {
    __extends(chatItem, _super);
    function chatItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.other = null;
        _this.self = null;
        return _this;
    }
    chatItem.prototype.show = function (info) {
        var _a;
        this.other.active = info.type == 'other';
        this.self.active = info.type == 'self';
        var node = info.type == 'self' ? this.self : this.other;
        (_a = this.label) === null || _a === void 0 ? void 0 : _a.node.off(cc.Node.EventType.SIZE_CHANGED, this.onChangeSize, this);
        this.background = node.getChildByName('background').getComponent(cc.Layout);
        this.label = this.background.node.getChildByName('label').getComponent(cc.Label);
        this.label.node.on(cc.Node.EventType.SIZE_CHANGED, this.onChangeSize, this);
        this.label.overflow = cc.Label.Overflow.NONE;
        this.label.string = info.message;
        this.label['_forceUpdateRenderData']();
        this.background.updateLayout();
        this.background.node.width = this.label.node.width + 20;
        this.node.height = this.background.node.height;
    };
    chatItem.prototype.onChangeSize = function () {
        if (this.label.node.width > 600) {
            this.label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            this.label.node.width = 600;
            this.label['_forceUpdateRenderData']();
            this.background.updateLayout();
            this.background.node.width = this.label.node.width + 20;
            this.node.height = this.background.node.height;
        }
    };
    __decorate([
        property(cc.Node)
    ], chatItem.prototype, "other", void 0);
    __decorate([
        property(cc.Node)
    ], chatItem.prototype, "self", void 0);
    chatItem = __decorate([
        ccclass
    ], chatItem);
    return chatItem;
}(cc.Component));
exports.default = chatItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXhhbXBsZXNcXGNoYXRcXGNoYXRJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBK0JDO1FBOUJzQixXQUFLLEdBQVksSUFBSSxDQUFBO1FBQ3JCLFVBQUksR0FBWSxJQUFJLENBQUE7O0lBNkIzQyxDQUFDO0lBMUJVLHVCQUFJLEdBQVgsVUFBWSxJQUFTOztRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQTtRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQTtRQUN0QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUN2RCxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFDO1FBRTdFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDaEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzNFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQTtRQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsRUFBRSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7UUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQ2xELENBQUM7SUFDTywrQkFBWSxHQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUE7WUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQTtZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsQ0FBQTtZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFBO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO1lBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtTQUNqRDtJQUNMLENBQUM7SUE3QmtCO1FBQWxCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzJDQUFzQjtJQUNyQjtRQUFsQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswQ0FBcUI7SUFGdEIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQStCNUI7SUFBRCxlQUFDO0NBL0JELEFBK0JDLENBL0JxQyxFQUFFLENBQUMsU0FBUyxHQStCakQ7a0JBL0JvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjaGF0SXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpIG90aGVyOiBjYy5Ob2RlID0gbnVsbFxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKSBzZWxmOiBjYy5Ob2RlID0gbnVsbFxuICAgIHByaXZhdGUgbGFiZWw6IGNjLkxhYmVsXG4gICAgcHJpdmF0ZSBiYWNrZ3JvdW5kOiBjYy5MYXlvdXRcbiAgICBwdWJsaWMgc2hvdyhpbmZvOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vdGhlci5hY3RpdmUgPSBpbmZvLnR5cGUgPT0gJ290aGVyJ1xuICAgICAgICB0aGlzLnNlbGYuYWN0aXZlID0gaW5mby50eXBlID09ICdzZWxmJ1xuICAgICAgICBsZXQgbm9kZSA9IGluZm8udHlwZSA9PSAnc2VsZicgPyB0aGlzLnNlbGYgOiB0aGlzLm90aGVyXG4gICAgICAgIHRoaXMubGFiZWw/Lm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgdGhpcy5vbkNoYW5nZVNpemUsIHRoaXMpXG5cbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmFja2dyb3VuZCcpLmdldENvbXBvbmVudChjYy5MYXlvdXQpXG4gICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLmJhY2tncm91bmQubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXG4gICAgICAgIHRoaXMubGFiZWwubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIHRoaXMub25DaGFuZ2VTaXplLCB0aGlzKVxuICAgICAgICB0aGlzLmxhYmVsLm92ZXJmbG93ID0gY2MuTGFiZWwuT3ZlcmZsb3cuTk9ORVxuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IGluZm8ubWVzc2FnZVxuICAgICAgICB0aGlzLmxhYmVsWydfZm9yY2VVcGRhdGVSZW5kZXJEYXRhJ10oKVxuICAgICAgICB0aGlzLmJhY2tncm91bmQudXBkYXRlTGF5b3V0KClcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLm5vZGUud2lkdGggPSB0aGlzLmxhYmVsLm5vZGUud2lkdGggKyAyMFxuICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kLm5vZGUuaGVpZ2h0XG4gICAgfVxuICAgIHByaXZhdGUgb25DaGFuZ2VTaXplKCkge1xuICAgICAgICBpZiAodGhpcy5sYWJlbC5ub2RlLndpZHRoID4gNjAwKSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsLm92ZXJmbG93ID0gY2MuTGFiZWwuT3ZlcmZsb3cuUkVTSVpFX0hFSUdIVFxuICAgICAgICAgICAgdGhpcy5sYWJlbC5ub2RlLndpZHRoID0gNjAwXG4gICAgICAgICAgICB0aGlzLmxhYmVsWydfZm9yY2VVcGRhdGVSZW5kZXJEYXRhJ10oKVxuICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnVwZGF0ZUxheW91dCgpXG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmQubm9kZS53aWR0aCA9IHRoaXMubGFiZWwubm9kZS53aWR0aCArIDIwXG4gICAgICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kLm5vZGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/cores/UISuperItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '05ad9vH0ANAc6m/Oc1rzygv', 'UISuperItem');
// cores/UISuperItem.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: steveJobs
 * @Email: icipiqkm@gmail.com
 * @Date: 2020-11-19 01:15:38
 * @Last Modified by: steveJobs
 * @Last Modified time: 2020-12-04 14:41:01
 * @Description: Description
 */
var UISuperLayout_1 = require("./UISuperLayout");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UISpuerItem = /** @class */ (function (_super) {
    __extends(UISpuerItem, _super);
    function UISpuerItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UISpuerItem.prototype, "width", {
        /** 根据可视范围 和 一组item的个数 去掉 边距/间隔 来计算本item的真实宽度 */
        get: function () {
            if (this.layout.vertical) {
                // 垂直滑动时 固定宽度
                return (this.layout.accommodWidth - this.layout.spacingWidth) / this.layout.column;
            }
            else {
                // 水平模式时 宽度随意
                return this.node.width * this.layout.getUsedScaleValue(this.node.scaleX);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UISpuerItem.prototype, "height", {
        /** 根据可视范围 和 一组item的个数 去掉 边距/间隔 来计算本item的真实高度 */
        get: function () {
            if (this.layout.horizontal) {
                // 水平模式时 固定高度
                return (this.layout.accommodHeight - this.layout.spacingWidth) / this.layout.column;
            }
            else {
                // 垂直滑动时 高度随意
                return this.node.height * this.layout.getUsedScaleValue(this.node.scaleY);
            }
        },
        enumerable: false,
        configurable: true
    });
    UISpuerItem.prototype.onLoad = function () {
        // 向node写入一个方法 省去了先获取组件然后调用的步骤
        this.node['watchSelf'] = this.watchSelf.bind(this);
        this.node['saveOriginSize'] = this.saveOriginSize.bind(this);
        var widget = this.node.getComponent(cc.Widget);
        if (widget) {
            cc.warn("UISuperItem: item不允许挂cc.Widget组件 请手动移除");
            this.node.removeComponent(widget);
        }
    };
    UISpuerItem.prototype.saveOriginSize = function () {
        this.originSize = cc.size(this.width, this.height);
        this.node.setContentSize(this.originSize);
        this.originScale = cc.v2(this.node.scaleX, this.node.scaleY);
    };
    UISpuerItem.prototype.init = function (layout) {
        this.layout = layout;
        this.layout.node.on(UISuperLayout_1.UIChangeBrotherEvnet, this.onChangeBrother, this);
        this.saveOriginSize();
        this.node.on(cc.Node.EventType.SIZE_CHANGED, this.watchSize, this);
        this.node.on(cc.Node.EventType.SCALE_CHANGED, this.watchSize, this);
        this.onChangeBrother();
    };
    UISpuerItem.prototype.onDestroy = function () {
        this.layout.node.off(UISuperLayout_1.UIChangeBrotherEvnet, this.onChangeBrother, this);
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this.watchSize, this);
        this.node.off(cc.Node.EventType.SCALE_CHANGED, this.watchSize, this);
        this.unlisten();
    };
    /**
     * 当兄弟节点的顺序变化时 来改变自己监听的对象
     * 0,1,2,3,4,5,6,7,8,9 例如列表中共有10个item 0是header 9是footer
     * 正序排列时 监听的顺序是 9->8->7->6->5->4->3->2->1->0 0的 brother=null
     * 向下填充的逻辑是 0跑到9后面 0=footer 0的brother=9 相对9的位置设置自己 此时1=header
     * 向上填充的逻辑是 9跑到0前面 此时9=header 9的brother=null 主动设置自己相对于0前面位置之后 0的brother=9 8=footer
     */
    UISpuerItem.prototype.onChangeBrother = function () {
        var _a;
        var _brother = this.layout.getBrotherNode(this.node); //获取我应该监听的那个兄弟
        if ((_brother === null || _brother === void 0 ? void 0 : _brother.uuid) == ((_a = this.brother) === null || _a === void 0 ? void 0 : _a.uuid))
            return; //如果没有变化 则跳过
        this.unlisten(); //我的兄弟换人了？先移除我原来的
        this.brother = _brother; //他是我的兄弟
        this.listen(); //监听他
        this.watchBrother(); //相对兄弟节点来设置自己的位置
    };
    UISpuerItem.prototype.listen = function () {
        var _a, _b;
        (_a = this.brother) === null || _a === void 0 ? void 0 : _a.on('leave', this.unlisten, this);
        (_b = this.brother) === null || _b === void 0 ? void 0 : _b.on(cc.Node.EventType.POSITION_CHANGED, this.watchBrother, this);
    };
    UISpuerItem.prototype.unlisten = function () {
        var _a, _b;
        (_a = this.brother) === null || _a === void 0 ? void 0 : _a.off('leave', this.unlisten, this);
        (_b = this.brother) === null || _b === void 0 ? void 0 : _b.off(cc.Node.EventType.POSITION_CHANGED, this.watchBrother, this);
        this.brother = null;
    };
    /** 当我的尺寸/缩放改变时 */
    UISpuerItem.prototype.watchSize = function () {
        if (this.layout.column > 1) { //如果是Grid模式 不允许修改尺寸/缩放 强制改回来
            this.node.setContentSize(this.originSize);
            this.node.setScale(this.originScale);
        }
        else {
            if (this.layout.vertical && (this.node.getContentSize().width != this.originSize.width || this.node.scaleX != this.originScale.x)) {
                cc.warn("垂直排列不允许修改【宽度】");
                this.node.width = this.originSize.width;
                this.node.scaleX = this.originScale.x;
            }
            else if (this.layout.horizontal && (this.node.getContentSize().height != this.originSize.height || this.node.scaleY != this.originScale.y)) {
                cc.warn("水平排列不允许修改【高度】");
                this.node.height = this.originSize.height;
                this.node.scaleY = this.originScale.y;
            }
            // 如果我监听了兄弟节点就设置自己相对兄弟节点的位置，否则 我就发送一个位置变化的消息 让监听我的兄弟相对我做出变化
            this.brother && this.watchBrother();
            this.layout.resetScrollView();
            this.node.emit(cc.Node.EventType.POSITION_CHANGED);
        }
        if (this.node['index'] == 0 && this.layout.isNormalSize) {
            this.node.setPosition(this.layout.getGroupHeader(this.node));
        }
    };
    // 设置自己相对于上一个兄弟节点的位置
    UISpuerItem.prototype.watchBrother = function () {
        if (!this.brother)
            return;
        if (this.layout.headerToFooter) { //正序排列时
            this.headerToFooterRelativeToFooter(this.brother);
        }
        else { //倒序排列时
            this.footerToHeaderRelativeToFooter(this.brother);
        }
    };
    UISpuerItem.prototype.isOutOfBoundary = function (offset) {
        if (this.layout.vertical && offset.y == 0)
            return true;
        if (this.layout.horizontal && offset.x == 0)
            return true;
        return false;
    };
    /** 从下到上排序方向 检查头部是否需要向上填充 */
    UISpuerItem.prototype.footerToHeaderWatchHeader = function () {
        // 如果不是头部一组的任意一个时跳过 比如一组有3个item 只计算 0，1，2 
        if (this.layout.getSiblingIndex(this.node) >= this.layout.column)
            return;
        // 如果此时【尾部】已经是最后一个数据时
        var index = this.layout.footer['index'] + 1;
        if (index >= this.layout.maxItemTotal) {
            if (!this.layout.footerLoop || this.layout.scrollToHeaderOrFooter)
                return;
            index = 0;
        }
        // 计算超出的偏移量 (从下到上排序方向时 头部在 下尾部在上 检测【头部】是否超出下边框)
        var offset = this.layout.isOutOfBoundaryFooter(this.node);
        // 没有超出时跳过
        if (!this.isOutOfBoundary(offset))
            return;
        // 将自己的数据索引 + 1
        this.node['index'] = index;
        // 发送通知到应用层 刷新显示
        this.layout.notifyRefreshItem(this.node);
        // 发给监听我的节点 通知我离开了 移除对我的所有监听
        this.node.emit("leave");
        // 将自己的节点索引设置到尾部
        this.layout.setSiblingIndex(this.node, this.layout.children.length - 1);
    };
    /** 从下到上排序方向 检查尾部是否需要向下填充 */
    UISpuerItem.prototype.footerToHeaderWatchFooter = function () {
        // 如果不是尾部一组的任意一个时跳过 比如一组有3个item 只计算末尾的3个item 
        if (this.layout.getSiblingIndex(this.node) < this.layout.children.length - this.layout.column)
            return;
        // 如果此时【头部】已经是第一个数据时
        var index = this.layout.header['index'] - 1;
        if (index < 0) {
            // 如果没有使用无限循环功能 否则不往下走
            if (!this.layout.headerLoop || this.layout.scrollToHeaderOrFooter)
                return;
            index = this.node['index'];
        }
        // 计算超出的偏移量 (从下到上排序方向时 头部在 下尾部在上 检测【尾部】是否超出下边框)
        var offset = this.layout.isOutOfBoundaryHeader(this.node);
        // 没有超出时跳过
        if (!this.isOutOfBoundary(offset))
            return;
        // 将自己的数据索引 - 1
        this.node['index'] = index;
        // 发送通知到应用层 刷新显示
        this.layout.notifyRefreshItem(this.node);
        // 发给监听我的兄弟 通知我离开了 移除对我的所有监听
        this.node.emit("leave");
        // 因为我是尾部 我监听了别人，此时移除我的所有监听 因为我马上就要成为老大 老大不需要监听任何人
        this.unlisten();
        // 因为我是老大 我不能相对别人来设置自己的相对位置，所以我需要主动设置自己(相对上一个老大的位置来设置自己) 别人都会相对我的位置做出变化
        this.footerToHeaderRelativeToHeader(this.layout.header);
        // 将自己的节点索引设置到头部
        this.layout.setSiblingIndex(this.node, 0);
    };
    /** 从上到下排序方向 检查头部是否需要向下填充 */
    UISpuerItem.prototype.headerToFooterWatchHeader = function () {
        // 如果不是头部一组的任意一个时跳过 比如一组有3个item 只计算 0，1，2 
        if (this.layout.getSiblingIndex(this.node) >= this.layout.column)
            return;
        // 如果此时【尾部】已经是第一个数据时  
        var index = this.layout.footer['index'] + 1;
        if (index > this.layout.maxItemTotal - 1) {
            // 如果没有使用无限循环功能 否则不往下走
            if (!this.layout.footerLoop || this.layout.scrollToHeaderOrFooter)
                return;
            index = 0;
        }
        // 计算超出的偏移量 (从下到上排序方向时 头部在下 尾部在上 检测【尾部】是否超出下边框)
        var offset = this.layout.isOutOfBoundaryHeader(this.node);
        // 没有超出时跳过
        if (!this.isOutOfBoundary(offset))
            return;
        // 将自己的数据索引 + 1
        this.node['index'] = index;
        // 发送通知到应用层 刷新显示
        this.layout.notifyRefreshItem(this.node);
        // 发给监听我的兄弟 通知我离开了 移除对我的所有监听
        this.node.emit("leave");
        // 将自己的节点索引设置到尾部
        this.layout.setSiblingIndex(this.node, this.layout.children.length - 1);
    };
    /** 从上到下排序方向 检查尾部是否需要向上填充 */
    UISpuerItem.prototype.headerToFooterWatchFooter = function () {
        // 如果不是尾部一组的任意一个时跳过 比如一组有3个item 只计算末尾的3个item 
        if (this.layout.getSiblingIndex(this.node) < this.layout.children.length - this.layout.column)
            return;
        // 如果此时【头部】已经是第一个数据时 
        var index = this.layout.header['index'] - 1;
        if (index < 0) {
            // 如果没有使用无限循环功能 否则不往下走
            if (!this.layout.headerLoop || this.layout.scrollToHeaderOrFooter)
                return;
            index = this.node['index'];
        }
        // 计算超出的偏移量 (从上到下排序方向时 头部在上 尾部在下 检测【尾部】是否超出下边框)
        var offset = this.layout.isOutOfBoundaryFooter(this.node);
        // 没有超出时跳过
        if (!this.isOutOfBoundary(offset))
            return;
        // 将自己的数据索引 - 1
        this.node['index'] = index;
        // 发送通知到应用层 刷新显示
        this.layout.notifyRefreshItem(this.node);
        // 发给监听我的兄弟 通知我离开了 移除对我的所有监听
        this.node.emit("leave");
        // 因为我是尾部 我监听了别人，此时移除我的所有监听 因为我马上就要成为老大 老大不需要监听任何人
        this.unlisten();
        // 因为我是老大 我不能相对别人来设置自己的相对位置，所以我需要主动设置自己(相对上一个老大的位置来设置自己) 别人都会相对我的位置做出变化
        this.headerToFooterRelativeToHeader(this.layout.header);
        // 将自己的节点索引设置到尾部
        this.layout.setSiblingIndex(this.node, 0);
    };
    /** isScrollToFooter=true 向下滑动 */
    UISpuerItem.prototype.watchSelf = function (isScrollToFooter) {
        if (isScrollToFooter) {
            if (this.layout.headerToFooter) {
                // 从【上到下排序】方向 检查【尾部】是否需要向上填充
                this.headerToFooterWatchFooter();
            }
            else {
                // 从【下到上排序】方向 检查【头部】是否需要向上填充
                this.footerToHeaderWatchHeader();
            }
        }
        else {
            if (this.layout.headerToFooter) {
                // 从【上到下排序】方向 检查【头部】是否需要向下填充
                this.headerToFooterWatchHeader();
            }
            else {
                // 从【下到上排序】方向 检查【尾部】是否需要向下填充
                this.footerToHeaderWatchFooter();
            }
        }
    };
    /** 从下到上 从右到左 排序方向  设置自己到相对node的头部 */
    UISpuerItem.prototype.footerToHeaderRelativeToHeader = function (relative) {
        var pos = this.node.getPosition();
        // 从下到上
        if (this.layout.vertical) {
            if (this.layout.isGroupHeader(relative)) {
                pos.x = this.layout.getGroupFooter(this.node).x;
                pos.y = this.layout.getGroupBottomY(this.node, relative);
            }
            else {
                pos.x = this.layout.getGroupLeftX(this.node, relative);
                pos.y = relative.y;
            }
            if (this.node['index'] == 0) {
                pos.x = this.layout.getGroupHeader(this.node).x;
            }
        }
        else {
            // 从右到左
            if (this.layout.isGroupHeader(relative)) {
                pos.x = this.layout.getGroupRightX(this.node, relative);
                pos.y = this.layout.getGroupFooter(this.node).y;
            }
            else {
                pos.x = relative.x;
                pos.y = this.layout.getGroupTopY(this.node, relative);
            }
            if (this.node['index'] == 0) {
                pos.y = this.layout.getGroupHeader(this.node).y;
            }
        }
        this.node.setPosition(pos);
    };
    /** 从下到上 从右到左 排序方向 设置自己到相对node的尾部 */
    UISpuerItem.prototype.footerToHeaderRelativeToFooter = function (relative) {
        var pos = this.node.getPosition();
        // 从下到上
        if (this.layout.vertical) {
            if (this.layout.isGroupFooter(relative)) {
                pos.x = this.layout.getGroupHeader(this.node).x;
                pos.y = this.layout.getGroupTopY(this.node, relative);
            }
            else {
                pos.x = this.layout.getGroupRightX(this.node, relative);
                pos.y = relative.y;
            }
        }
        else {
            // 从右到左
            if (this.layout.isGroupFooter(relative)) {
                pos.x = this.layout.getGroupLeftX(this.node, relative);
                pos.y = this.layout.getGroupHeader(this.node).y;
            }
            else {
                pos.x = relative.x;
                pos.y = this.layout.getGroupBottomY(this.node, relative);
            }
        }
        this.node.setPosition(pos);
    };
    /** 从上到下 从左到右 排序方向 设置自己到相对node的头部 */
    UISpuerItem.prototype.headerToFooterRelativeToHeader = function (relative) {
        var pos = this.node.getPosition();
        // 从上到下
        if (this.layout.vertical) {
            if (this.layout.isGroupHeader(relative)) {
                pos.x = this.layout.getGroupFooter(this.node).x;
                pos.y = this.layout.getGroupTopY(this.node, relative);
            }
            else {
                pos.x = this.layout.getGroupLeftX(this.node, relative);
                pos.y = relative.y;
            }
            if (this.node['index'] == 0) {
                pos.x = this.layout.getGroupHeader(this.node).x;
            }
        }
        else {
            // 从左到右
            if (this.layout.isGroupHeader(relative)) {
                pos.x = this.layout.getGroupLeftX(this.node, relative);
                pos.y = this.layout.getGroupFooter(this.node).y;
            }
            else {
                pos.x = relative.x;
                pos.y = this.layout.getGroupTopY(this.node, relative);
            }
            if (this.node['index'] == 0) {
                pos.y = this.layout.getGroupHeader(this.node).y;
            }
        }
        this.node.setPosition(pos);
    };
    /** 从上到下 从左到右 排序方向 设置自己到相对node尾部 */
    UISpuerItem.prototype.headerToFooterRelativeToFooter = function (relative) {
        var pos = this.node.getPosition();
        // 从上到下
        if (this.layout.vertical) {
            if (this.layout.isGroupFooter(relative)) {
                pos.x = this.layout.getGroupHeader(this.node).x;
                pos.y = this.layout.getGroupBottomY(this.node, relative);
            }
            else {
                pos.x = this.layout.getGroupRightX(this.node, relative);
                pos.y = relative.y;
            }
        }
        else {
            // 从左到右
            if (this.layout.isGroupFooter(relative)) {
                pos.x = this.layout.getGroupRightX(this.node, relative);
                pos.y = this.layout.getGroupHeader(this.node).y;
            }
            else {
                pos.x = relative.x;
                pos.y = this.layout.getGroupBottomY(this.node, relative);
            }
        }
        this.node.setPosition(pos);
    };
    UISpuerItem = __decorate([
        ccclass
    ], UISpuerItem);
    return UISpuerItem;
}(cc.Component));
exports.default = UISpuerItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcY29yZXNcXFVJU3VwZXJJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7O0dBT0c7QUFDSCxpREFBc0U7QUFDaEUsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBeUMsK0JBQVk7SUFBckQ7O0lBNFZBLENBQUM7SUF0Vkcsc0JBQVksOEJBQUs7UUFEakIsZ0RBQWdEO2FBQ2hEO1lBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDdEIsYUFBYTtnQkFDYixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQTthQUNyRjtpQkFBTTtnQkFDSCxhQUFhO2dCQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQzNFO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRCxzQkFBWSwrQkFBTTtRQURsQixnREFBZ0Q7YUFDaEQ7WUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO2dCQUN4QixhQUFhO2dCQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO2FBQ3RGO2lCQUFNO2dCQUNILGFBQWE7Z0JBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElB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TUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFBO2FBQzNEO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtnQkFDdkQsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFBO2FBQ3JCO1NBQ0o7YUFBTTtZQUNILE9BQU87WUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNyQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7Z0JBQ3ZELEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNsRDtpQkFBTTtnQkFDSCxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUE7Z0JBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTthQUMzRDtTQUNKO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQTNWZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQTRWL0I7SUFBRCxrQkFBQztDQTVWRCxBQTRWQyxDQTVWd0MsRUFBRSxDQUFDLFNBQVMsR0E0VnBEO2tCQTVWb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAQXV0aG9yOiBzdGV2ZUpvYnNcbiAqIEBFbWFpbDogaWNpcGlxa21AZ21haWwuY29tXG4gKiBARGF0ZTogMjAyMC0xMS0xOSAwMToxNTozOFxuICogQExhc3QgTW9kaWZpZWQgYnk6IHN0ZXZlSm9ic1xuICogQExhc3QgTW9kaWZpZWQgdGltZTogMjAyMC0xMi0wNCAxNDo0MTowMVxuICogQERlc2NyaXB0aW9uOiBEZXNjcmlwdGlvblxuICovXG5pbXBvcnQgVUlTdXBlckxheW91dCwgeyBVSUNoYW5nZUJyb3RoZXJFdm5ldCB9IGZyb20gJy4vVUlTdXBlckxheW91dCc7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJU3B1ZXJJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBwcml2YXRlIGxheW91dDogVUlTdXBlckxheW91dFxuICAgIHByaXZhdGUgYnJvdGhlcjogY2MuTm9kZVxuICAgIHByaXZhdGUgb3JpZ2luU2l6ZTogY2MuU2l6ZVxuICAgIHByaXZhdGUgb3JpZ2luU2NhbGU6IGNjLlZlYzJcbiAgICAvKiog5qC55o2u5Y+v6KeG6IyD5Zu0IOWSjCDkuIDnu4RpdGVt55qE5Liq5pWwIOWOu+aOiSDovrnot50v6Ze06ZqUIOadpeiuoeeul+acrGl0ZW3nmoTnnJ/lrp7lrr3luqYgKi9cbiAgICBwcml2YXRlIGdldCB3aWR0aCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGF5b3V0LnZlcnRpY2FsKSB7XG4gICAgICAgICAgICAvLyDlnoLnm7Tmu5Hliqjml7Yg5Zu65a6a5a695bqmXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMubGF5b3V0LmFjY29tbW9kV2lkdGggLSB0aGlzLmxheW91dC5zcGFjaW5nV2lkdGgpIC8gdGhpcy5sYXlvdXQuY29sdW1uXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDmsLTlubPmqKHlvI/ml7Yg5a695bqm6ZqP5oSPXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLndpZHRoICogdGhpcy5sYXlvdXQuZ2V0VXNlZFNjYWxlVmFsdWUodGhpcy5ub2RlLnNjYWxlWClcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiog5qC55o2u5Y+v6KeG6IyD5Zu0IOWSjCDkuIDnu4RpdGVt55qE5Liq5pWwIOWOu+aOiSDovrnot50v6Ze06ZqUIOadpeiuoeeul+acrGl0ZW3nmoTnnJ/lrp7pq5jluqYgKi9cbiAgICBwcml2YXRlIGdldCBoZWlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxheW91dC5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICAvLyDmsLTlubPmqKHlvI/ml7Yg5Zu65a6a6auY5bqmXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMubGF5b3V0LmFjY29tbW9kSGVpZ2h0IC0gdGhpcy5sYXlvdXQuc3BhY2luZ1dpZHRoKSAvIHRoaXMubGF5b3V0LmNvbHVtblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g5Z6C55u05ruR5Yqo5pe2IOmrmOW6pumaj+aEj1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5oZWlnaHQgKiB0aGlzLmxheW91dC5nZXRVc2VkU2NhbGVWYWx1ZSh0aGlzLm5vZGUuc2NhbGVZKVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy8g5ZCRbm9kZeWGmeWFpeS4gOS4quaWueazlSDnnIHljrvkuoblhYjojrflj5bnu4Tku7bnhLblkI7osIPnlKjnmoTmraXpqqRcbiAgICAgICAgdGhpcy5ub2RlWyd3YXRjaFNlbGYnXSA9IHRoaXMud2F0Y2hTZWxmLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy5ub2RlWydzYXZlT3JpZ2luU2l6ZSddID0gdGhpcy5zYXZlT3JpZ2luU2l6ZS5iaW5kKHRoaXMpXG4gICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldClcbiAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgY2Mud2FybihcIlVJU3VwZXJJdGVtOiBpdGVt5LiN5YWB6K645oyCY2MuV2lkZ2V057uE5Lu2IOivt+aJi+WKqOenu+mZpFwiKVxuICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNvbXBvbmVudCh3aWRnZXQpXG4gICAgICAgIH0gXG4gICAgfVxuICAgIHB1YmxpYyBzYXZlT3JpZ2luU2l6ZSgpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5TaXplID0gY2Muc2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKHRoaXMub3JpZ2luU2l6ZSlcbiAgICAgICAgdGhpcy5vcmlnaW5TY2FsZSA9IGNjLnYyKHRoaXMubm9kZS5zY2FsZVgsIHRoaXMubm9kZS5zY2FsZVkpXG4gICAgfVxuICAgIHB1YmxpYyBpbml0KGxheW91dDogVUlTdXBlckxheW91dCkge1xuICAgICAgICB0aGlzLmxheW91dCA9IGxheW91dFxuICAgICAgICB0aGlzLmxheW91dC5ub2RlLm9uKFVJQ2hhbmdlQnJvdGhlckV2bmV0LCB0aGlzLm9uQ2hhbmdlQnJvdGhlciwgdGhpcylcbiAgICAgICAgdGhpcy5zYXZlT3JpZ2luU2l6ZSgpXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIHRoaXMud2F0Y2hTaXplLCB0aGlzKVxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuU0NBTEVfQ0hBTkdFRCwgdGhpcy53YXRjaFNpemUsIHRoaXMpXG4gICAgICAgIHRoaXMub25DaGFuZ2VCcm90aGVyKClcbiAgICB9XG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmxheW91dC5ub2RlLm9mZihVSUNoYW5nZUJyb3RoZXJFdm5ldCwgdGhpcy5vbkNoYW5nZUJyb3RoZXIsIHRoaXMpXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLndhdGNoU2l6ZSwgdGhpcylcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VELCB0aGlzLndhdGNoU2l6ZSwgdGhpcylcbiAgICAgICAgdGhpcy51bmxpc3RlbigpXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW9k+WFhOW8n+iKgueCueeahOmhuuW6j+WPmOWMluaXtiDmnaXmlLnlj5joh6rlt7Hnm5HlkKznmoTlr7nosaFcbiAgICAgKiAwLDEsMiwzLDQsNSw2LDcsOCw5IOS+i+WmguWIl+ihqOS4reWFseaciTEw5LiqaXRlbSAw5pivaGVhZGVyIDnmmK9mb290ZXIgXG4gICAgICog5q2j5bqP5o6S5YiX5pe2IOebkeWQrOeahOmhuuW6j+aYryA5LT44LT43LT42LT41LT40LT4zLT4yLT4xLT4wIDDnmoQgYnJvdGhlcj1udWxsIFxuICAgICAqIOWQkeS4i+Whq+WFheeahOmAu+i+keaYryAw6LeR5YiwOeWQjumdoiAwPWZvb3RlciAw55qEYnJvdGhlcj05IOebuOWvuTnnmoTkvY3nva7orr7nva7oh6rlt7Eg5q2k5pe2MT1oZWFkZXIgXG4gICAgICog5ZCR5LiK5aGr5YWF55qE6YC76L6R5pivIDnot5HliLAw5YmN6Z2iIOatpOaXtjk9aGVhZGVyIDnnmoRicm90aGVyPW51bGwg5Li75Yqo6K6+572u6Ieq5bex55u45a+55LqOMOWJjemdouS9jee9ruS5i+WQjiAw55qEYnJvdGhlcj05IDg9Zm9vdGVyXG4gICAgICovXG4gICAgcHJpdmF0ZSBvbkNoYW5nZUJyb3RoZXIoKSB7XG4gICAgICAgIGxldCBfYnJvdGhlciA9IHRoaXMubGF5b3V0LmdldEJyb3RoZXJOb2RlKHRoaXMubm9kZSkgLy/ojrflj5bmiJHlupTor6Xnm5HlkKznmoTpgqPkuKrlhYTlvJ9cbiAgICAgICAgaWYgKF9icm90aGVyPy51dWlkID09IHRoaXMuYnJvdGhlcj8udXVpZCkgcmV0dXJuIC8v5aaC5p6c5rKh5pyJ5Y+Y5YyWIOWImei3s+i/h1xuICAgICAgICB0aGlzLnVubGlzdGVuKCkgLy/miJHnmoTlhYTlvJ/mjaLkurrkuobvvJ/lhYjnp7vpmaTmiJHljp/mnaXnmoRcbiAgICAgICAgdGhpcy5icm90aGVyID0gX2Jyb3RoZXIgLy/ku5bmmK/miJHnmoTlhYTlvJ9cbiAgICAgICAgdGhpcy5saXN0ZW4oKSAvL+ebkeWQrOS7llxuICAgICAgICB0aGlzLndhdGNoQnJvdGhlcigpIC8v55u45a+55YWE5byf6IqC54K55p2l6K6+572u6Ieq5bex55qE5L2N572uXG4gICAgfVxuICAgIHByaXZhdGUgbGlzdGVuKCkge1xuICAgICAgICB0aGlzLmJyb3RoZXI/Lm9uKCdsZWF2ZScsIHRoaXMudW5saXN0ZW4sIHRoaXMpXG4gICAgICAgIHRoaXMuYnJvdGhlcj8ub24oY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy53YXRjaEJyb3RoZXIsIHRoaXMpXG4gICAgfVxuICAgIHByaXZhdGUgdW5saXN0ZW4oKSB7XG4gICAgICAgIHRoaXMuYnJvdGhlcj8ub2ZmKCdsZWF2ZScsIHRoaXMudW5saXN0ZW4sIHRoaXMpXG4gICAgICAgIHRoaXMuYnJvdGhlcj8ub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMud2F0Y2hCcm90aGVyLCB0aGlzKVxuICAgICAgICB0aGlzLmJyb3RoZXIgPSBudWxsXG4gICAgfVxuICAgIC8qKiDlvZPmiJHnmoTlsLrlr7gv57yp5pS+5pS55Y+Y5pe2ICovXG4gICAgcHJpdmF0ZSB3YXRjaFNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLmxheW91dC5jb2x1bW4gPiAxKSB7IC8v5aaC5p6c5pivR3JpZOaooeW8jyDkuI3lhYHorrjkv67mlLnlsLrlr7gv57yp5pS+IOW8uuWItuaUueWbnuadpVxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKHRoaXMub3JpZ2luU2l6ZSlcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRTY2FsZSh0aGlzLm9yaWdpblNjYWxlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0LnZlcnRpY2FsICYmICh0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKS53aWR0aCAhPSB0aGlzLm9yaWdpblNpemUud2lkdGggfHwgdGhpcy5ub2RlLnNjYWxlWCAhPSB0aGlzLm9yaWdpblNjYWxlLngpKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybihcIuWeguebtOaOkuWIl+S4jeWFgeiuuOS/ruaUueOAkOWuveW6puOAkVwiKVxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCA9IHRoaXMub3JpZ2luU2l6ZS53aWR0aFxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSB0aGlzLm9yaWdpblNjYWxlLnhcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmxheW91dC5ob3Jpem9udGFsICYmICh0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQgIT0gdGhpcy5vcmlnaW5TaXplLmhlaWdodCB8fCB0aGlzLm5vZGUuc2NhbGVZICE9IHRoaXMub3JpZ2luU2NhbGUueSkpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwi5rC05bmz5o6S5YiX5LiN5YWB6K645L+u5pS544CQ6auY5bqm44CRXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IHRoaXMub3JpZ2luU2l6ZS5oZWlnaHRcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2NhbGVZID0gdGhpcy5vcmlnaW5TY2FsZS55XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDlpoLmnpzmiJHnm5HlkKzkuoblhYTlvJ/oioLngrnlsLHorr7nva7oh6rlt7Hnm7jlr7nlhYTlvJ/oioLngrnnmoTkvY3nva7vvIzlkKbliJkg5oiR5bCx5Y+R6YCB5LiA5Liq5L2N572u5Y+Y5YyW55qE5raI5oGvIOiuqeebkeWQrOaIkeeahOWFhOW8n+ebuOWvueaIkeWBmuWHuuWPmOWMllxuICAgICAgICAgICAgdGhpcy5icm90aGVyICYmIHRoaXMud2F0Y2hCcm90aGVyKClcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LnJlc2V0U2Nyb2xsVmlldygpXG4gICAgICAgICAgICB0aGlzLm5vZGUuZW1pdChjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm5vZGVbJ2luZGV4J10gPT0gMCAmJiB0aGlzLmxheW91dC5pc05vcm1hbFNpemUpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLmxheW91dC5nZXRHcm91cEhlYWRlcih0aGlzLm5vZGUpKVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOiuvue9ruiHquW3seebuOWvueS6juS4iuS4gOS4quWFhOW8n+iKgueCueeahOS9jee9rlxuICAgIHB1YmxpYyB3YXRjaEJyb3RoZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5icm90aGVyKSByZXR1cm5cbiAgICAgICAgaWYgKHRoaXMubGF5b3V0LmhlYWRlclRvRm9vdGVyKSB7IC8v5q2j5bqP5o6S5YiX5pe2XG4gICAgICAgICAgICB0aGlzLmhlYWRlclRvRm9vdGVyUmVsYXRpdmVUb0Zvb3Rlcih0aGlzLmJyb3RoZXIpXG4gICAgICAgIH0gZWxzZSB7Ly/lgJLluo/mjpLliJfml7ZcbiAgICAgICAgICAgIHRoaXMuZm9vdGVyVG9IZWFkZXJSZWxhdGl2ZVRvRm9vdGVyKHRoaXMuYnJvdGhlcilcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIGlzT3V0T2ZCb3VuZGFyeShvZmZzZXQ6IGNjLlZlYzIpIHtcbiAgICAgICAgaWYgKHRoaXMubGF5b3V0LnZlcnRpY2FsICYmIG9mZnNldC55ID09IDApIHJldHVybiB0cnVlXG4gICAgICAgIGlmICh0aGlzLmxheW91dC5ob3Jpem9udGFsICYmIG9mZnNldC54ID09IDApIHJldHVybiB0cnVlXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICAvKiog5LuO5LiL5Yiw5LiK5o6S5bqP5pa55ZCRIOajgOafpeWktOmDqOaYr+WQpumcgOimgeWQkeS4iuWhq+WFhSAqL1xuICAgIHByaXZhdGUgZm9vdGVyVG9IZWFkZXJXYXRjaEhlYWRlcigpIHtcbiAgICAgICAgLy8g5aaC5p6c5LiN5piv5aS06YOo5LiA57uE55qE5Lu75oSP5LiA5Liq5pe26Lez6L+HIOavlOWmguS4gOe7hOaciTPkuKppdGVtIOWPquiuoeeulyAw77yMMe+8jDIgXG4gICAgICAgIGlmICh0aGlzLmxheW91dC5nZXRTaWJsaW5nSW5kZXgodGhpcy5ub2RlKSA+PSB0aGlzLmxheW91dC5jb2x1bW4pIHJldHVyblxuICAgICAgICAvLyDlpoLmnpzmraTml7bjgJDlsL7pg6jjgJHlt7Lnu4/mmK/mnIDlkI7kuIDkuKrmlbDmja7ml7ZcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5sYXlvdXQuZm9vdGVyWydpbmRleCddICsgMVxuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy5sYXlvdXQubWF4SXRlbVRvdGFsKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMubGF5b3V0LmZvb3Rlckxvb3AgfHwgdGhpcy5sYXlvdXQuc2Nyb2xsVG9IZWFkZXJPckZvb3RlcikgcmV0dXJuXG4gICAgICAgICAgICBpbmRleCA9IDBcbiAgICAgICAgfVxuICAgICAgICAvLyDorqHnrpfotoXlh7rnmoTlgY/np7vph48gKOS7juS4i+WIsOS4iuaOkuW6j+aWueWQkeaXtiDlpLTpg6jlnKgg5LiL5bC+6YOo5Zyo5LiKIOajgOa1i+OAkOWktOmDqOOAkeaYr+WQpui2heWHuuS4i+i+ueahhilcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMubGF5b3V0LmlzT3V0T2ZCb3VuZGFyeUZvb3Rlcih0aGlzLm5vZGUpXG4gICAgICAgIC8vIOayoeaciei2heWHuuaXtui3s+i/h1xuICAgICAgICBpZiAoIXRoaXMuaXNPdXRPZkJvdW5kYXJ5KG9mZnNldCkpIHJldHVyblxuICAgICAgICAvLyDlsIboh6rlt7HnmoTmlbDmja7ntKLlvJUgKyAxXG4gICAgICAgIHRoaXMubm9kZVsnaW5kZXgnXSA9IGluZGV4XG4gICAgICAgIC8vIOWPkemAgemAmuefpeWIsOW6lOeUqOWxgiDliLfmlrDmmL7npLpcbiAgICAgICAgdGhpcy5sYXlvdXQubm90aWZ5UmVmcmVzaEl0ZW0odGhpcy5ub2RlKVxuICAgICAgICAvLyDlj5Hnu5nnm5HlkKzmiJHnmoToioLngrkg6YCa55+l5oiR56a75byA5LqGIOenu+mZpOWvueaIkeeahOaJgOacieebkeWQrFxuICAgICAgICB0aGlzLm5vZGUuZW1pdChcImxlYXZlXCIpXG4gICAgICAgIC8vIOWwhuiHquW3seeahOiKgueCuee0ouW8leiuvue9ruWIsOWwvumDqFxuICAgICAgICB0aGlzLmxheW91dC5zZXRTaWJsaW5nSW5kZXgodGhpcy5ub2RlLCB0aGlzLmxheW91dC5jaGlsZHJlbi5sZW5ndGggLSAxKVxuICAgIH1cbiAgICAvKiog5LuO5LiL5Yiw5LiK5o6S5bqP5pa55ZCRIOajgOafpeWwvumDqOaYr+WQpumcgOimgeWQkeS4i+Whq+WFhSAqL1xuICAgIHByaXZhdGUgZm9vdGVyVG9IZWFkZXJXYXRjaEZvb3RlcigpIHtcbiAgICAgICAgLy8g5aaC5p6c5LiN5piv5bC+6YOo5LiA57uE55qE5Lu75oSP5LiA5Liq5pe26Lez6L+HIOavlOWmguS4gOe7hOaciTPkuKppdGVtIOWPquiuoeeul+acq+WwvueahDPkuKppdGVtIFxuICAgICAgICBpZiAodGhpcy5sYXlvdXQuZ2V0U2libGluZ0luZGV4KHRoaXMubm9kZSkgPCB0aGlzLmxheW91dC5jaGlsZHJlbi5sZW5ndGggLSB0aGlzLmxheW91dC5jb2x1bW4pIHJldHVyblxuICAgICAgICAvLyDlpoLmnpzmraTml7bjgJDlpLTpg6jjgJHlt7Lnu4/mmK/nrKzkuIDkuKrmlbDmja7ml7ZcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5sYXlvdXQuaGVhZGVyWydpbmRleCddIC0gMVxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzmsqHmnInkvb/nlKjml6DpmZDlvqrnjq/lip/og70g5ZCm5YiZ5LiN5b6A5LiL6LWwXG4gICAgICAgICAgICBpZiAoIXRoaXMubGF5b3V0LmhlYWRlckxvb3AgfHwgdGhpcy5sYXlvdXQuc2Nyb2xsVG9IZWFkZXJPckZvb3RlcikgcmV0dXJuXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMubm9kZVsnaW5kZXgnXVxuICAgICAgICB9XG4gICAgICAgIC8vIOiuoeeul+i2heWHuueahOWBj+enu+mHjyAo5LuO5LiL5Yiw5LiK5o6S5bqP5pa55ZCR5pe2IOWktOmDqOWcqCDkuIvlsL7pg6jlnKjkuIog5qOA5rWL44CQ5bC+6YOo44CR5piv5ZCm6LaF5Ye65LiL6L655qGGKVxuICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5sYXlvdXQuaXNPdXRPZkJvdW5kYXJ5SGVhZGVyKHRoaXMubm9kZSlcbiAgICAgICAgLy8g5rKh5pyJ6LaF5Ye65pe26Lez6L+HXG4gICAgICAgIGlmICghdGhpcy5pc091dE9mQm91bmRhcnkob2Zmc2V0KSkgcmV0dXJuXG4gICAgICAgIC8vIOWwhuiHquW3seeahOaVsOaNrue0ouW8lSAtIDFcbiAgICAgICAgdGhpcy5ub2RlWydpbmRleCddID0gaW5kZXhcbiAgICAgICAgLy8g5Y+R6YCB6YCa55+l5Yiw5bqU55So5bGCIOWIt+aWsOaYvuekulxuICAgICAgICB0aGlzLmxheW91dC5ub3RpZnlSZWZyZXNoSXRlbSh0aGlzLm5vZGUpXG4gICAgICAgIC8vIOWPkee7meebkeWQrOaIkeeahOWFhOW8nyDpgJrnn6XmiJHnprvlvIDkuoYg56e76Zmk5a+55oiR55qE5omA5pyJ55uR5ZCsXG4gICAgICAgIHRoaXMubm9kZS5lbWl0KFwibGVhdmVcIilcbiAgICAgICAgLy8g5Zug5Li65oiR5piv5bC+6YOoIOaIkeebkeWQrOS6huWIq+S6uu+8jOatpOaXtuenu+mZpOaIkeeahOaJgOacieebkeWQrCDlm6DkuLrmiJHpqazkuIrlsLHopoHmiJDkuLrogIHlpKcg6ICB5aSn5LiN6ZyA6KaB55uR5ZCs5Lu75L2V5Lq6XG4gICAgICAgIHRoaXMudW5saXN0ZW4oKVxuICAgICAgICAvLyDlm6DkuLrmiJHmmK/ogIHlpKcg5oiR5LiN6IO955u45a+55Yir5Lq65p2l6K6+572u6Ieq5bex55qE55u45a+55L2N572u77yM5omA5LulXGLmiJHpnIDopoHkuLvliqjorr7nva7oh6rlt7Eo55u45a+55LiK5LiA5Liq6ICB5aSn55qE5L2N572u5p2l6K6+572u6Ieq5bexKSDliKvkurrpg73kvJrnm7jlr7nmiJHnmoTkvY3nva7lgZrlh7rlj5jljJZcbiAgICAgICAgdGhpcy5mb290ZXJUb0hlYWRlclJlbGF0aXZlVG9IZWFkZXIodGhpcy5sYXlvdXQuaGVhZGVyKVxuICAgICAgICAvLyDlsIboh6rlt7HnmoToioLngrnntKLlvJXorr7nva7liLDlpLTpg6hcbiAgICAgICAgdGhpcy5sYXlvdXQuc2V0U2libGluZ0luZGV4KHRoaXMubm9kZSwgMClcbiAgICB9XG4gICAgLyoqIOS7juS4iuWIsOS4i+aOkuW6j+aWueWQkSDmo4Dmn6XlpLTpg6jmmK/lkKbpnIDopoHlkJHkuIvloavlhYUgKi9cbiAgICBwcml2YXRlIGhlYWRlclRvRm9vdGVyV2F0Y2hIZWFkZXIoKSB7XG4gICAgICAgIC8vIOWmguaenOS4jeaYr+WktOmDqOS4gOe7hOeahOS7u+aEj+S4gOS4quaXtui3s+i/hyDmr5TlpoLkuIDnu4TmnIkz5LiqaXRlbSDlj6rorqHnrpcgMO+8jDHvvIwyIFxuICAgICAgICBpZiAodGhpcy5sYXlvdXQuZ2V0U2libGluZ0luZGV4KHRoaXMubm9kZSkgPj0gdGhpcy5sYXlvdXQuY29sdW1uKSByZXR1cm5cbiAgICAgICAgLy8g5aaC5p6c5q2k5pe244CQ5bC+6YOo44CR5bey57uP5piv56ys5LiA5Liq5pWw5o2u5pe2ICBcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5sYXlvdXQuZm9vdGVyWydpbmRleCddICsgMVxuICAgICAgICBpZiAoaW5kZXggPiB0aGlzLmxheW91dC5tYXhJdGVtVG90YWwgLSAxKSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzmsqHmnInkvb/nlKjml6DpmZDlvqrnjq/lip/og70g5ZCm5YiZ5LiN5b6A5LiL6LWwXG4gICAgICAgICAgICBpZiAoIXRoaXMubGF5b3V0LmZvb3Rlckxvb3AgfHwgdGhpcy5sYXlvdXQuc2Nyb2xsVG9IZWFkZXJPckZvb3RlcikgcmV0dXJuXG4gICAgICAgICAgICBpbmRleCA9IDBcbiAgICAgICAgfVxuICAgICAgICAvLyDorqHnrpfotoXlh7rnmoTlgY/np7vph48gKOS7juS4i+WIsOS4iuaOkuW6j+aWueWQkeaXtiDlpLTpg6jlnKjkuIsg5bC+6YOo5Zyo5LiKIOajgOa1i+OAkOWwvumDqOOAkeaYr+WQpui2heWHuuS4i+i+ueahhilcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMubGF5b3V0LmlzT3V0T2ZCb3VuZGFyeUhlYWRlcih0aGlzLm5vZGUpXG4gICAgICAgIC8vIOayoeaciei2heWHuuaXtui3s+i/h1xuICAgICAgICBpZiAoIXRoaXMuaXNPdXRPZkJvdW5kYXJ5KG9mZnNldCkpIHJldHVyblxuICAgICAgICAvLyDlsIboh6rlt7HnmoTmlbDmja7ntKLlvJUgKyAxXG4gICAgICAgIHRoaXMubm9kZVsnaW5kZXgnXSA9IGluZGV4XG4gICAgICAgIC8vIOWPkemAgemAmuefpeWIsOW6lOeUqOWxgiDliLfmlrDmmL7npLpcbiAgICAgICAgdGhpcy5sYXlvdXQubm90aWZ5UmVmcmVzaEl0ZW0odGhpcy5ub2RlKVxuICAgICAgICAvLyDlj5Hnu5nnm5HlkKzmiJHnmoTlhYTlvJ8g6YCa55+l5oiR56a75byA5LqGIOenu+mZpOWvueaIkeeahOaJgOacieebkeWQrFxuICAgICAgICB0aGlzLm5vZGUuZW1pdChcImxlYXZlXCIpXG4gICAgICAgIC8vIOWwhuiHquW3seeahOiKgueCuee0ouW8leiuvue9ruWIsOWwvumDqFxuICAgICAgICB0aGlzLmxheW91dC5zZXRTaWJsaW5nSW5kZXgodGhpcy5ub2RlLCB0aGlzLmxheW91dC5jaGlsZHJlbi5sZW5ndGggLSAxKVxuICAgIH1cbiAgICAvKiog5LuO5LiK5Yiw5LiL5o6S5bqP5pa55ZCRIOajgOafpeWwvumDqOaYr+WQpumcgOimgeWQkeS4iuWhq+WFhSAqL1xuICAgIHByaXZhdGUgaGVhZGVyVG9Gb290ZXJXYXRjaEZvb3RlcigpIHtcbiAgICAgICAgLy8g5aaC5p6c5LiN5piv5bC+6YOo5LiA57uE55qE5Lu75oSP5LiA5Liq5pe26Lez6L+HIOavlOWmguS4gOe7hOaciTPkuKppdGVtIOWPquiuoeeul+acq+WwvueahDPkuKppdGVtIFxuICAgICAgICBpZiAodGhpcy5sYXlvdXQuZ2V0U2libGluZ0luZGV4KHRoaXMubm9kZSkgPCB0aGlzLmxheW91dC5jaGlsZHJlbi5sZW5ndGggLSB0aGlzLmxheW91dC5jb2x1bW4pIHJldHVyblxuICAgICAgICAvLyDlpoLmnpzmraTml7bjgJDlpLTpg6jjgJHlt7Lnu4/mmK/nrKzkuIDkuKrmlbDmja7ml7YgXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMubGF5b3V0LmhlYWRlclsnaW5kZXgnXSAtIDFcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgLy8g5aaC5p6c5rKh5pyJ5L2/55So5peg6ZmQ5b6q546v5Yqf6IO9IOWQpuWImeS4jeW+gOS4i+i1sFxuICAgICAgICAgICAgaWYgKCF0aGlzLmxheW91dC5oZWFkZXJMb29wIHx8IHRoaXMubGF5b3V0LnNjcm9sbFRvSGVhZGVyT3JGb290ZXIpIHJldHVyblxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLm5vZGVbJ2luZGV4J11cbiAgICAgICAgfVxuICAgICAgICAvLyDorqHnrpfotoXlh7rnmoTlgY/np7vph48gKOS7juS4iuWIsOS4i+aOkuW6j+aWueWQkeaXtiDlpLTpg6jlnKjkuIog5bC+6YOo5Zyo5LiLIOajgOa1i+OAkOWwvumDqOOAkeaYr+WQpui2heWHuuS4i+i+ueahhilcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMubGF5b3V0LmlzT3V0T2ZCb3VuZGFyeUZvb3Rlcih0aGlzLm5vZGUpXG4gICAgICAgIC8vIOayoeaciei2heWHuuaXtui3s+i/h1xuICAgICAgICBpZiAoIXRoaXMuaXNPdXRPZkJvdW5kYXJ5KG9mZnNldCkpIHJldHVyblxuICAgICAgICAvLyDlsIboh6rlt7HnmoTmlbDmja7ntKLlvJUgLSAxXG4gICAgICAgIHRoaXMubm9kZVsnaW5kZXgnXSA9IGluZGV4XG4gICAgICAgIC8vIOWPkemAgemAmuefpeWIsOW6lOeUqOWxgiDliLfmlrDmmL7npLpcbiAgICAgICAgdGhpcy5sYXlvdXQubm90aWZ5UmVmcmVzaEl0ZW0odGhpcy5ub2RlKVxuICAgICAgICAvLyDlj5Hnu5nnm5HlkKzmiJHnmoTlhYTlvJ8g6YCa55+l5oiR56a75byA5LqGIOenu+mZpOWvueaIkeeahOaJgOacieebkeWQrFxuICAgICAgICB0aGlzLm5vZGUuZW1pdChcImxlYXZlXCIpXG4gICAgICAgIC8vIOWboOS4uuaIkeaYr+WwvumDqCDmiJHnm5HlkKzkuobliKvkurrvvIzmraTml7bnp7vpmaTmiJHnmoTmiYDmnInnm5HlkKwg5Zug5Li65oiR6ams5LiK5bCx6KaB5oiQ5Li66ICB5aSnIOiAgeWkp+S4jemcgOimgeebkeWQrOS7u+S9leS6ulxuICAgICAgICB0aGlzLnVubGlzdGVuKClcbiAgICAgICAgLy8g5Zug5Li65oiR5piv6ICB5aSnIOaIkeS4jeiDveebuOWvueWIq+S6uuadpeiuvue9ruiHquW3seeahOebuOWvueS9jee9ru+8jOaJgOS7pVxi5oiR6ZyA6KaB5Li75Yqo6K6+572u6Ieq5bexKOebuOWvueS4iuS4gOS4quiAgeWkp+eahOS9jee9ruadpeiuvue9ruiHquW3sSkg5Yir5Lq66YO95Lya55u45a+55oiR55qE5L2N572u5YGa5Ye65Y+Y5YyWXG4gICAgICAgIHRoaXMuaGVhZGVyVG9Gb290ZXJSZWxhdGl2ZVRvSGVhZGVyKHRoaXMubGF5b3V0LmhlYWRlcilcbiAgICAgICAgLy8g5bCG6Ieq5bex55qE6IqC54K557Si5byV6K6+572u5Yiw5bC+6YOoXG4gICAgICAgIHRoaXMubGF5b3V0LnNldFNpYmxpbmdJbmRleCh0aGlzLm5vZGUsIDApXG4gICAgfVxuICAgIC8qKiBpc1Njcm9sbFRvRm9vdGVyPXRydWUg5ZCR5LiL5ruR5YqoICovXG4gICAgcHVibGljIHdhdGNoU2VsZihpc1Njcm9sbFRvRm9vdGVyOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc1Njcm9sbFRvRm9vdGVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGVhZGVyVG9Gb290ZXIpIHtcbiAgICAgICAgICAgICAgICAvLyDku47jgJDkuIrliLDkuIvmjpLluo/jgJHmlrnlkJEg5qOA5p+l44CQ5bC+6YOo44CR5piv5ZCm6ZyA6KaB5ZCR5LiK5aGr5YWFXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUb0Zvb3RlcldhdGNoRm9vdGVyKClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5LuO44CQ5LiL5Yiw5LiK5o6S5bqP44CR5pa55ZCRIOajgOafpeOAkOWktOmDqOOAkeaYr+WQpumcgOimgeWQkeS4iuWhq+WFhVxuICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVG9IZWFkZXJXYXRjaEhlYWRlcigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaGVhZGVyVG9Gb290ZXIpIHtcbiAgICAgICAgICAgICAgICAvLyDku47jgJDkuIrliLDkuIvmjpLluo/jgJHmlrnlkJEg5qOA5p+l44CQ5aS06YOo44CR5piv5ZCm6ZyA6KaB5ZCR5LiL5aGr5YWFXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUb0Zvb3RlcldhdGNoSGVhZGVyKClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g5LuO44CQ5LiL5Yiw5LiK5o6S5bqP44CR5pa55ZCRIOajgOafpeOAkOWwvumDqOOAkeaYr+WQpumcgOimgeWQkeS4i+Whq+WFhVxuICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVG9IZWFkZXJXYXRjaEZvb3RlcigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIOS7juS4i+WIsOS4iiDku47lj7PliLDlt6Yg5o6S5bqP5pa55ZCRICDorr7nva7oh6rlt7HliLDnm7jlr7lub2Rl55qE5aS06YOoICovXG4gICAgcHJpdmF0ZSBmb290ZXJUb0hlYWRlclJlbGF0aXZlVG9IZWFkZXIocmVsYXRpdmU6IGNjLk5vZGUpIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpXG4gICAgICAgIC8vIOS7juS4i+WIsOS4ilxuICAgICAgICBpZiAodGhpcy5sYXlvdXQudmVydGljYWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5pc0dyb3VwSGVhZGVyKHJlbGF0aXZlKSkge1xuICAgICAgICAgICAgICAgIHBvcy54ID0gdGhpcy5sYXlvdXQuZ2V0R3JvdXBGb290ZXIodGhpcy5ub2RlKS54XG4gICAgICAgICAgICAgICAgcG9zLnkgPSB0aGlzLmxheW91dC5nZXRHcm91cEJvdHRvbVkodGhpcy5ub2RlLCByZWxhdGl2ZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zLnggPSB0aGlzLmxheW91dC5nZXRHcm91cExlZnRYKHRoaXMubm9kZSwgcmVsYXRpdmUpXG4gICAgICAgICAgICAgICAgcG9zLnkgPSByZWxhdGl2ZS55XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlWydpbmRleCddID09IDApIHtcbiAgICAgICAgICAgICAgICBwb3MueCA9IHRoaXMubGF5b3V0LmdldEdyb3VwSGVhZGVyKHRoaXMubm9kZSkueFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g5LuO5Y+z5Yiw5bemXG4gICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaXNHcm91cEhlYWRlcihyZWxhdGl2ZSkpIHtcbiAgICAgICAgICAgICAgICBwb3MueCA9IHRoaXMubGF5b3V0LmdldEdyb3VwUmlnaHRYKHRoaXMubm9kZSwgcmVsYXRpdmUpXG4gICAgICAgICAgICAgICAgcG9zLnkgPSB0aGlzLmxheW91dC5nZXRHcm91cEZvb3Rlcih0aGlzLm5vZGUpLnlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zLnggPSByZWxhdGl2ZS54XG4gICAgICAgICAgICAgICAgcG9zLnkgPSB0aGlzLmxheW91dC5nZXRHcm91cFRvcFkodGhpcy5ub2RlLCByZWxhdGl2ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVbJ2luZGV4J10gPT0gMCkge1xuICAgICAgICAgICAgICAgIHBvcy55ID0gdGhpcy5sYXlvdXQuZ2V0R3JvdXBIZWFkZXIodGhpcy5ub2RlKS55XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvcylcbiAgICB9XG4gICAgLyoqIOS7juS4i+WIsOS4iiDku47lj7PliLDlt6Yg5o6S5bqP5pa55ZCRIOiuvue9ruiHquW3seWIsOebuOWvuW5vZGXnmoTlsL7pg6ggKi9cbiAgICBwcml2YXRlIGZvb3RlclRvSGVhZGVyUmVsYXRpdmVUb0Zvb3RlcihyZWxhdGl2ZTogY2MuTm9kZSkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKClcbiAgICAgICAgLy8g5LuO5LiL5Yiw5LiKXG4gICAgICAgIGlmICh0aGlzLmxheW91dC52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0LmlzR3JvdXBGb290ZXIocmVsYXRpdmUpKSB7XG4gICAgICAgICAgICAgICAgcG9zLnggPSB0aGlzLmxheW91dC5nZXRHcm91cEhlYWRlcih0aGlzLm5vZGUpLnhcbiAgICAgICAgICAgICAgICBwb3MueSA9IHRoaXMubGF5b3V0LmdldEdyb3VwVG9wWSh0aGlzLm5vZGUsIHJlbGF0aXZlKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3MueCA9IHRoaXMubGF5b3V0LmdldEdyb3VwUmlnaHRYKHRoaXMubm9kZSwgcmVsYXRpdmUpXG4gICAgICAgICAgICAgICAgcG9zLnkgPSByZWxhdGl2ZS55XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDku47lj7PliLDlt6ZcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5pc0dyb3VwRm9vdGVyKHJlbGF0aXZlKSkge1xuICAgICAgICAgICAgICAgIHBvcy54ID0gdGhpcy5sYXlvdXQuZ2V0R3JvdXBMZWZ0WCh0aGlzLm5vZGUsIHJlbGF0aXZlKVxuICAgICAgICAgICAgICAgIHBvcy55ID0gdGhpcy5sYXlvdXQuZ2V0R3JvdXBIZWFkZXIodGhpcy5ub2RlKS55XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvcy54ID0gcmVsYXRpdmUueFxuICAgICAgICAgICAgICAgIHBvcy55ID0gdGhpcy5sYXlvdXQuZ2V0R3JvdXBCb3R0b21ZKHRoaXMubm9kZSwgcmVsYXRpdmUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvcylcbiAgICB9XG4gICAgLyoqIOS7juS4iuWIsOS4iyDku47lt6bliLDlj7Mg5o6S5bqP5pa55ZCRIOiuvue9ruiHquW3seWIsOebuOWvuW5vZGXnmoTlpLTpg6ggKi9cbiAgICBwcml2YXRlIGhlYWRlclRvRm9vdGVyUmVsYXRpdmVUb0hlYWRlcihyZWxhdGl2ZTogY2MuTm9kZSkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKClcbiAgICAgICAgLy8g5LuO5LiK5Yiw5LiLXG4gICAgICAgIGlmICh0aGlzLmxheW91dC52ZXJ0aWNhbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0LmlzR3JvdXBIZWFkZXIocmVsYXRpdmUpKSB7XG4gICAgICAgICAgICAgICAgcG9zLnggPSB0aGlzLmxheW91dC5nZXRHcm91cEZvb3Rlcih0aGlzLm5vZGUpLnhcbiAgICAgICAgICAgICAgICBwb3MueSA9IHRoaXMubGF5b3V0LmdldEdyb3VwVG9wWSh0aGlzLm5vZGUsIHJlbGF0aXZlKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3MueCA9IHRoaXMubGF5b3V0LmdldEdyb3VwTGVmdFgodGhpcy5ub2RlLCByZWxhdGl2ZSlcbiAgICAgICAgICAgICAgICBwb3MueSA9IHJlbGF0aXZlLnlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVbJ2luZGV4J10gPT0gMCkge1xuICAgICAgICAgICAgICAgIHBvcy54ID0gdGhpcy5sYXlvdXQuZ2V0R3JvdXBIZWFkZXIodGhpcy5ub2RlKS54XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDku47lt6bliLDlj7NcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5pc0dyb3VwSGVhZGVyKHJlbGF0aXZlKSkge1xuICAgICAgICAgICAgICAgIHBvcy54ID0gdGhpcy5sYXlvdXQuZ2V0R3JvdXBMZWZ0WCh0aGlzLm5vZGUsIHJlbGF0aXZlKVxuICAgICAgICAgICAgICAgIHBvcy55ID0gdGhpcy5sYXlvdXQuZ2V0R3JvdXBGb290ZXIodGhpcy5ub2RlKS55XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvcy54ID0gcmVsYXRpdmUueFxuICAgICAgICAgICAgICAgIHBvcy55ID0gdGhpcy5sYXlvdXQuZ2V0R3JvdXBUb3BZKHRoaXMubm9kZSwgcmVsYXRpdmUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlWydpbmRleCddID09IDApIHtcbiAgICAgICAgICAgICAgICBwb3MueSA9IHRoaXMubGF5b3V0LmdldEdyb3VwSGVhZGVyKHRoaXMubm9kZSkueVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihwb3MpXG4gICAgfVxuICAgIC8qKiDku47kuIrliLDkuIsg5LuO5bem5Yiw5Y+zIOaOkuW6j+aWueWQkSDorr7nva7oh6rlt7HliLDnm7jlr7lub2Rl5bC+6YOoICovXG4gICAgcHJpdmF0ZSBoZWFkZXJUb0Zvb3RlclJlbGF0aXZlVG9Gb290ZXIocmVsYXRpdmU6IGNjLk5vZGUpIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpXG4gICAgICAgIC8vIOS7juS4iuWIsOS4i1xuICAgICAgICBpZiAodGhpcy5sYXlvdXQudmVydGljYWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dC5pc0dyb3VwRm9vdGVyKHJlbGF0aXZlKSkge1xuICAgICAgICAgICAgICAgIHBvcy54ID0gdGhpcy5sYXlvdXQuZ2V0R3JvdXBIZWFkZXIodGhpcy5ub2RlKS54XG4gICAgICAgICAgICAgICAgcG9zLnkgPSB0aGlzLmxheW91dC5nZXRHcm91cEJvdHRvbVkodGhpcy5ub2RlLCByZWxhdGl2ZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zLnggPSB0aGlzLmxheW91dC5nZXRHcm91cFJpZ2h0WCh0aGlzLm5vZGUsIHJlbGF0aXZlKVxuICAgICAgICAgICAgICAgIHBvcy55ID0gcmVsYXRpdmUueVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g5LuO5bem5Yiw5Y+zXG4gICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQuaXNHcm91cEZvb3RlcihyZWxhdGl2ZSkpIHtcbiAgICAgICAgICAgICAgICBwb3MueCA9IHRoaXMubGF5b3V0LmdldEdyb3VwUmlnaHRYKHRoaXMubm9kZSwgcmVsYXRpdmUpXG4gICAgICAgICAgICAgICAgcG9zLnkgPSB0aGlzLmxheW91dC5nZXRHcm91cEhlYWRlcih0aGlzLm5vZGUpLnlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zLnggPSByZWxhdGl2ZS54XG4gICAgICAgICAgICAgICAgcG9zLnkgPSB0aGlzLmxheW91dC5nZXRHcm91cEJvdHRvbVkodGhpcy5ub2RlLCByZWxhdGl2ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zKVxuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/examples/main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0746fbblyhFY4dsGbqYC+cs', 'main');
// examples/main.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var main = /** @class */ (function (_super) {
    __extends(main, _super);
    function main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    main.prototype.goto = function (event, scene) {
        cc.director.loadScene(scene);
    };
    main = __decorate([
        ccclass
    ], main);
    return main;
}(cc.Component));
exports.default = main;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXhhbXBsZXNcXG1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7SUFBa0Msd0JBQVk7SUFBOUM7O0lBSUEsQ0FBQztJQUhHLG1CQUFJLEdBQUosVUFBSyxLQUFVLEVBQUUsS0FBYTtRQUMxQixFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBSGdCLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0FJeEI7SUFBRCxXQUFDO0NBSkQsQUFJQyxDQUppQyxFQUFFLENBQUMsU0FBUyxHQUk3QztrQkFKb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbWFpbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgZ290byhldmVudDogYW55LCBzY2VuZTogc3RyaW5nKXtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHNjZW5lKVxuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/examples/chat/chatPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9b675lsfsFJlbnH7YOQRVQo', 'chatPanel');
// examples/chat/chatPanel.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var UISuperLayout_1 = require("../../cores/UISuperLayout");
var chatItem_1 = require("./chatItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var chatPanel = /** @class */ (function (_super) {
    __extends(chatPanel, _super);
    function chatPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layout = null;
        _this.input = null;
        _this.aiMessages = [
            '你说啥?',
            '请说人话，谢谢!',
            '啊?',
            '啥呀?',
            '咋地了?',
            '什么情况?',
            '你不要搞事情哦'
        ];
        _this.messages = [];
        _this.index = 0;
        return _this;
    }
    chatPanel.prototype.emit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.messages.push({
                    type: "self",
                    message: this.input.string || "?"
                });
                this.input.string = "";
                this.layout.total(this.messages.length);
                this.scheduleOnce(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.messages.push({
                                    type: "other",
                                    message: "" + this.aiMessages[this.index++]
                                });
                                return [4 /*yield*/, this.layout.total(this.messages.length)];
                            case 1:
                                _a.sent();
                                this.layout.scrollToHeader();
                                if (this.index == this.aiMessages.length)
                                    this.index = 0;
                                return [2 /*return*/];
                        }
                    });
                }); }, 1);
                return [2 /*return*/];
            });
        });
    };
    chatPanel.prototype.refresh = function (node, index) {
        var info = this.messages[this.messages.length - 1 - index];
        var item = node.getComponent(chatItem_1.default);
        item.show(info);
    };
    chatPanel.prototype.goMain = function () {
        cc.director.loadScene('main');
    };
    __decorate([
        property(UISuperLayout_1.default)
    ], chatPanel.prototype, "layout", void 0);
    __decorate([
        property(cc.EditBox)
    ], chatPanel.prototype, "input", void 0);
    chatPanel = __decorate([
        ccclass
    ], chatPanel);
    return chatPanel;
}(cc.Component));
exports.default = chatPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXhhbXBsZXNcXGNoYXRcXGNoYXRQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBc0Q7QUFDdEQsdUNBQWtDO0FBRTVCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBdUNDO1FBdEM0QixZQUFNLEdBQWtCLElBQUksQ0FBQTtRQUMvQixXQUFLLEdBQWUsSUFBSSxDQUFBO1FBQ3RDLGdCQUFVLEdBQUc7WUFDakIsTUFBTTtZQUNOLFVBQVU7WUFDVixJQUFJO1lBQ0osS0FBSztZQUNMLE1BQU07WUFDTixPQUFPO1lBQ1AsU0FBUztTQUNaLENBQUE7UUFDTyxjQUFRLEdBQVUsRUFBRSxDQUFBO1FBQ3BCLFdBQUssR0FBRyxDQUFDLENBQUE7O0lBMEJyQixDQUFDO0lBekJpQix3QkFBSSxHQUFsQjs7OztnQkFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDZixJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRztpQkFDcEMsQ0FBQyxDQUFBO2dCQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQzs7OztnQ0FDZCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQ0FDZixJQUFJLEVBQUUsT0FBTztvQ0FDYixPQUFPLEVBQUUsS0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBRztpQ0FDOUMsQ0FBQyxDQUFBO2dDQUNGLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUE7O2dDQUE3QyxTQUE2QyxDQUFBO2dDQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFBO2dDQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO29DQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBOzs7O3FCQUMzRCxFQUFFLENBQUMsQ0FBQyxDQUFBOzs7O0tBQ1I7SUFDTywyQkFBTyxHQUFmLFVBQWdCLElBQWEsRUFBRSxLQUFhO1FBQ3hDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFBO1FBQzFELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFBO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbkIsQ0FBQztJQUNPLDBCQUFNLEdBQWQ7UUFDSSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBckN3QjtRQUF4QixRQUFRLENBQUMsdUJBQWEsQ0FBQzs2Q0FBNkI7SUFDL0I7UUFBckIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7NENBQXlCO0lBRjdCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0F1QzdCO0lBQUQsZ0JBQUM7Q0F2Q0QsQUF1Q0MsQ0F2Q3NDLEVBQUUsQ0FBQyxTQUFTLEdBdUNsRDtrQkF2Q29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlTdXBlckxheW91dCBmcm9tICcuLi8uLi9jb3Jlcy9VSVN1cGVyTGF5b3V0JztcbmltcG9ydCBjaGF0SXRlbSBmcm9tICcuL2NoYXRJdGVtJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjaGF0UGFuZWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIEBwcm9wZXJ0eShVSVN1cGVyTGF5b3V0KSBsYXlvdXQ6IFVJU3VwZXJMYXlvdXQgPSBudWxsXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpIGlucHV0OiBjYy5FZGl0Qm94ID0gbnVsbFxuICAgIHByaXZhdGUgYWlNZXNzYWdlcyA9IFtcbiAgICAgICAgJ+S9oOivtOWVpT8nLFxuICAgICAgICAn6K+36K+05Lq66K+d77yM6LCi6LCiIScsXG4gICAgICAgICfllYo/JyxcbiAgICAgICAgJ+WVpeWRgD8nLFxuICAgICAgICAn5ZKL5Zyw5LqGPycsXG4gICAgICAgICfku4DkuYjmg4XlhrU/JyxcbiAgICAgICAgJ+S9oOS4jeimgeaQnuS6i+aDheWTpidcbiAgICBdXG4gICAgcHJpdmF0ZSBtZXNzYWdlczogYW55W10gPSBbXVxuICAgIHByaXZhdGUgaW5kZXggPSAwXG4gICAgcHJpdmF0ZSBhc3luYyBlbWl0KCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogXCJzZWxmXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLmlucHV0LnN0cmluZyB8fCBcIj9cIlxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmlucHV0LnN0cmluZyA9IFwiXCJcbiAgICAgICAgdGhpcy5sYXlvdXQudG90YWwodGhpcy5tZXNzYWdlcy5sZW5ndGgpXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJvdGhlclwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAke3RoaXMuYWlNZXNzYWdlc1t0aGlzLmluZGV4KytdfWBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxheW91dC50b3RhbCh0aGlzLm1lc3NhZ2VzLmxlbmd0aClcbiAgICAgICAgICAgIHRoaXMubGF5b3V0LnNjcm9sbFRvSGVhZGVyKClcbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID09IHRoaXMuYWlNZXNzYWdlcy5sZW5ndGgpIHRoaXMuaW5kZXggPSAwXG4gICAgICAgIH0sIDEpXG4gICAgfVxuICAgIHByaXZhdGUgcmVmcmVzaChub2RlOiBjYy5Ob2RlLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5tZXNzYWdlc1t0aGlzLm1lc3NhZ2VzLmxlbmd0aCAtIDEgLSBpbmRleF1cbiAgICAgICAgbGV0IGl0ZW0gPSBub2RlLmdldENvbXBvbmVudChjaGF0SXRlbSlcbiAgICAgICAgaXRlbS5zaG93KGluZm8pXG4gICAgfVxuICAgIHByaXZhdGUgZ29NYWluKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ21haW4nKVxuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/examples/vertical/verticalItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '34da2XkCIpPIp4Pkg7X+5GV', 'verticalItem');
// examples/vertical/verticalItem.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var verticalItem = /** @class */ (function (_super) {
    __extends(verticalItem, _super);
    function verticalItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        return _this;
    }
    verticalItem.prototype.show = function (info, index, remove) {
        this.index = index;
        this.remove = remove;
        this.label.string = info.message;
    };
    verticalItem.prototype.onRemove = function () {
        this.remove(this.index);
    };
    verticalItem.prototype.onClick = function () {
    };
    __decorate([
        property(cc.Label)
    ], verticalItem.prototype, "label", void 0);
    verticalItem = __decorate([
        ccclass
    ], verticalItem);
    return verticalItem;
}(cc.Component));
exports.default = verticalItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXhhbXBsZXNcXHZlcnRpY2FsXFx2ZXJ0aWNhbEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFpQkM7UUFkRyxXQUFLLEdBQWEsSUFBSSxDQUFDOztJQWMzQixDQUFDO0lBWFUsMkJBQUksR0FBWCxVQUFZLElBQVMsRUFBRSxLQUFhLEVBQUUsTUFBZ0I7UUFDbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNwQyxDQUFDO0lBQ08sK0JBQVEsR0FBaEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBQ08sOEJBQU8sR0FBZjtJQUVBLENBQUM7SUFiRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNJO0lBSE4sWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQWlCaEM7SUFBRCxtQkFBQztDQWpCRCxBQWlCQyxDQWpCeUMsRUFBRSxDQUFDLFNBQVMsR0FpQnJEO2tCQWpCb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdmVydGljYWxJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICAgIHByaXZhdGUgaW5kZXg6IG51bWJlclxuICAgIHByaXZhdGUgcmVtb3ZlOiBGdW5jdGlvblxuICAgIHB1YmxpYyBzaG93KGluZm86IGFueSwgaW5kZXg6IG51bWJlciwgcmVtb3ZlOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXhcbiAgICAgICAgdGhpcy5yZW1vdmUgPSByZW1vdmVcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBpbmZvLm1lc3NhZ2VcbiAgICB9XG4gICAgcHJpdmF0ZSBvblJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5pbmRleClcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkNsaWNrKCkge1xuICAgICAgICBcbiAgICB9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/examples/vertical/verticalSimple.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2c53978e9hHxrD0f/3bH9LP', 'verticalSimple');
// examples/vertical/verticalSimple.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var UISuperLayout_1 = require("../../cores/UISuperLayout");
var verticalItem_1 = require("./verticalItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var verticalSimple = /** @class */ (function (_super) {
    __extends(verticalSimple, _super);
    function verticalSimple() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layout = null;
        _this.total = 500;
        _this.init = false;
        _this.datas = [];
        return _this;
    }
    verticalSimple.prototype.onLoad = function () {
        var _this = this;
        if (this.init) {
            for (var i = 0; i < this.total; i++) {
                this.datas.push({ message: "" + this.datas.length });
            }
            this.layout.total(this.datas.length);
        }
        this.scheduleOnce(function () {
            _this.layout.scrollView.node.width = _this.layout.scrollView.node.width + 100;
        }, 3);
    };
    verticalSimple.prototype.onRefreshEvent = function (node, index) {
        var info = this.datas[index];
        node.getComponent(verticalItem_1.default).show(info, index, this.onRemove.bind(this));
    };
    verticalSimple.prototype.onRemove = function (index) {
        this.datas.splice(index, 1);
        this.layout.total(this.datas.length);
    };
    verticalSimple.prototype.addItem = function (event, value) {
        for (var i = 0; i < value; i++) {
            this.datas.push({ message: "" + this.datas.length });
        }
        this.layout.total(this.datas.length);
    };
    verticalSimple.prototype.gotoHeader = function () {
        this.layout.scrollToHeader(0.618);
    };
    verticalSimple.prototype.gotoFooter = function () {
        this.layout.scrollToFooter(0.618);
    };
    verticalSimple.prototype.gotoMain = function () {
        cc.director.loadScene('main');
    };
    __decorate([
        property(UISuperLayout_1.default)
    ], verticalSimple.prototype, "layout", void 0);
    __decorate([
        property
    ], verticalSimple.prototype, "total", void 0);
    __decorate([
        property
    ], verticalSimple.prototype, "init", void 0);
    verticalSimple = __decorate([
        ccclass
    ], verticalSimple);
    return verticalSimple;
}(cc.Component));
exports.default = verticalSimple;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXhhbXBsZXNcXHZlcnRpY2FsXFx2ZXJ0aWNhbFNpbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBc0Q7QUFDdEQsK0NBQTBDO0FBQ3BDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBeUNDO1FBdkM0QixZQUFNLEdBQWtCLElBQUksQ0FBQTtRQUMzQyxXQUFLLEdBQVcsR0FBRyxDQUFBO1FBQ25CLFVBQUksR0FBWSxLQUFLLENBQUE7UUFDdkIsV0FBSyxHQUFVLEVBQUUsQ0FBQTs7SUFvQzdCLENBQUM7SUFuQ0csK0JBQU0sR0FBTjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFRLEVBQUUsQ0FBQyxDQUFBO2FBQ3ZEO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUN2QztRQUNELElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFBO1FBQy9FLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNULENBQUM7SUFFTyx1Q0FBYyxHQUF0QixVQUF1QixJQUFhLEVBQUUsS0FBYTtRQUMvQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDL0UsQ0FBQztJQUNPLGlDQUFRLEdBQWhCLFVBQWlCLEtBQWE7UUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUNPLGdDQUFPLEdBQWYsVUFBZ0IsS0FBVSxFQUFFLEtBQVU7UUFDbEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBUSxFQUFFLENBQUMsQ0FBQTtTQUN2RDtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUNPLG1DQUFVLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUNPLG1DQUFVLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUNPLGlDQUFRLEdBQWhCO1FBQ0ksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDakMsQ0FBQztJQXRDd0I7UUFBeEIsUUFBUSxDQUFDLHVCQUFhLENBQUM7a0RBQTZCO0lBQzNDO1FBQVQsUUFBUTtpREFBb0I7SUFDbkI7UUFBVCxRQUFRO2dEQUFzQjtJQUpkLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0F5Q2xDO0lBQUQscUJBQUM7Q0F6Q0QsQUF5Q0MsQ0F6QzJDLEVBQUUsQ0FBQyxTQUFTLEdBeUN2RDtrQkF6Q29CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlTdXBlckxheW91dCBmcm9tICcuLi8uLi9jb3Jlcy9VSVN1cGVyTGF5b3V0JztcbmltcG9ydCB2ZXJ0aWNhbEl0ZW0gZnJvbSAnLi92ZXJ0aWNhbEl0ZW0nO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB2ZXJ0aWNhbFNpbXBsZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoVUlTdXBlckxheW91dCkgbGF5b3V0OiBVSVN1cGVyTGF5b3V0ID0gbnVsbFxuICAgIEBwcm9wZXJ0eSB0b3RhbDogbnVtYmVyID0gNTAwXG4gICAgQHByb3BlcnR5IGluaXQ6IGJvb2xlYW4gPSBmYWxzZVxuICAgIHByaXZhdGUgZGF0YXM6IGFueVtdID0gW11cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXQpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhcy5wdXNoKHsgbWVzc2FnZTogYCR7dGhpcy5kYXRhcy5sZW5ndGh9YCB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sYXlvdXQudG90YWwodGhpcy5kYXRhcy5sZW5ndGgpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQuc2Nyb2xsVmlldy5ub2RlLndpZHRoID0gdGhpcy5sYXlvdXQuc2Nyb2xsVmlldy5ub2RlLndpZHRoICsgMTAwXG4gICAgICAgIH0sIDMpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblJlZnJlc2hFdmVudChub2RlOiBjYy5Ob2RlLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5kYXRhc1tpbmRleF1cbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQodmVydGljYWxJdGVtKS5zaG93KGluZm8sIGluZGV4LCB0aGlzLm9uUmVtb3ZlLmJpbmQodGhpcykpXG4gICAgfVxuICAgIHByaXZhdGUgb25SZW1vdmUoaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLmRhdGFzLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgdGhpcy5sYXlvdXQudG90YWwodGhpcy5kYXRhcy5sZW5ndGgpXG4gICAgfVxuICAgIHByaXZhdGUgYWRkSXRlbShldmVudDogYW55LCB2YWx1ZTogYW55KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5kYXRhcy5wdXNoKHsgbWVzc2FnZTogYCR7dGhpcy5kYXRhcy5sZW5ndGh9YCB9KVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubGF5b3V0LnRvdGFsKHRoaXMuZGF0YXMubGVuZ3RoKVxuICAgIH1cbiAgICBwcml2YXRlIGdvdG9IZWFkZXIoKSB7XG4gICAgICAgIHRoaXMubGF5b3V0LnNjcm9sbFRvSGVhZGVyKDAuNjE4KVxuICAgIH1cbiAgICBwcml2YXRlIGdvdG9Gb290ZXIoKSB7XG4gICAgICAgIHRoaXMubGF5b3V0LnNjcm9sbFRvRm9vdGVyKDAuNjE4KVxuICAgIH1cbiAgICBwcml2YXRlIGdvdG9NYWluKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ21haW4nKVxuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------
