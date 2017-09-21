"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var SectionListComponent = /** @class */ (function () {
    function SectionListComponent(http) {
        this.http = http;
    }
    SectionListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('Section')
            .subscribe(function (result) {
            _this.sections = result.json();
            _this.sections = _this.sections.filter(function (s) { return s.active; });
        });
    };
    SectionListComponent = __decorate([
        core_1.Component({
            selector: 'wedding-section-list',
            templateUrl: './section-list.component.html',
            styleUrls: ['./section-list.component.css']
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], SectionListComponent);
    return SectionListComponent;
}());
exports.SectionListComponent = SectionListComponent;
//# sourceMappingURL=section-list.component.js.map