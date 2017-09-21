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
var GuestListComponent = /** @class */ (function () {
    function GuestListComponent(http) {
        this.http = http;
    }
    GuestListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('Guest')
            .subscribe(function (result) {
            _this.guests = result.json();
        });
    };
    GuestListComponent.prototype.getGuestSpaces = function () {
        return this.guests.map(function (guest) { return guest.spaces; }).reduce(function (total, num) {
            return total + num;
        });
    };
    GuestListComponent = __decorate([
        core_1.Component({
            selector: 'app-guest-list',
            templateUrl: './guest-list.component.html',
            styleUrls: ['./guest-list.component.css']
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], GuestListComponent);
    return GuestListComponent;
}());
exports.GuestListComponent = GuestListComponent;
//# sourceMappingURL=guest-list.component.js.map