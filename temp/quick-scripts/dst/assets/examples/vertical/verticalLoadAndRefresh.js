
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