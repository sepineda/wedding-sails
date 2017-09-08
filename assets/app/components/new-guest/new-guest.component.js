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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
var NewGuestComponent = (function () {
    function NewGuestComponent(http, fb, route) {
        this.http = http;
        this.fb = fb;
        this.route = route;
    }
    NewGuestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            first_name: ['', forms_1.Validators.required],
            last_name: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            spaces: [1, [forms_1.Validators.required, forms_1.Validators.min(1)]],
            phone: ''
        });
        this.status = { color: 'white-text', message: '' };
        this.editMode = false;
        this.paramsSub = this.route.params
            .map(function (params) { return params['guest_id']; })
            .subscribe(function (guest_id) {
            console.log(guest_id);
            if (guest_id) {
                _this.editMode = true;
                _this.http.get('Guest/' + guest_id)
                    .subscribe(function (result) {
                    _this.guest = result.json();
                    _this.fillFormWithGuest();
                });
            }
        });
    };
    NewGuestComponent.prototype.fillFormWithGuest = function () {
        this.form.setValue({
            first_name: this.guest.first_name,
            last_name: this.guest.last_name,
            email: this.guest.email,
            phone: this.guest.phone,
            spaces: this.guest.spaces
        });
    };
    NewGuestComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.form.valid) {
            var formModel = this.form.value;
            var newGuest = {
                first_name: formModel.first_name,
                last_name: formModel.last_name,
                phone: formModel.phone,
                email: formModel.email,
                spaces: formModel.spaces,
                active: true,
                _wedding: '59ad8bd0a48dace266f1935d'
            };
            if (this.editMode) {
                var bodyString = JSON.stringify(newGuest); // Stringify payload
                var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                var options = new http_1.RequestOptions({ headers: headers });
                this.http.put('guest/' + this.guest.id, bodyString, options)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    _this.status.color = 'green-text';
                    _this.status.message = 'Actualizado correctamente';
                }, function (error) {
                    _this.status.color = 'red-text';
                    _this.status.message = error;
                });
            }
            else {
                this.http.post('Guest', newGuest)
                    .subscribe(function (result) {
                    _this.status.color = 'green-text';
                    _this.status.message = 'Nuevo invitado agregado exitosamente';
                });
            }
        }
        else {
            this.status.color = 'red-text';
            this.status.message = 'Por favor complete los campos requeridos';
        }
    };
    NewGuestComponent.prototype.isAttributeInvalid = function (name) {
        var model = this.form.get(name);
        return model.invalid && (model.dirty || model.touched);
    };
    NewGuestComponent.prototype.isEmailValid = function () {
        return !!this.form.get('email').errors.email;
    };
    NewGuestComponent.prototype.isRequiredValid = function (name) {
        return !!this.form.get(name).errors.required;
    };
    NewGuestComponent.prototype.isMinimumSpaceValid = function () {
        return !!this.form.get('spaces').errors.min;
    };
    NewGuestComponent.prototype.ngOnDestroy = function () {
        this.paramsSub.unsubscribe();
    };
    NewGuestComponent = __decorate([
        core_1.Component({
            selector: 'app-new-guest',
            templateUrl: './new-guest.component.html',
            styleUrls: ['./new-guest.component.css']
        }),
        __metadata("design:paramtypes", [http_1.Http, forms_1.FormBuilder, router_1.ActivatedRoute])
    ], NewGuestComponent);
    return NewGuestComponent;
}());
exports.NewGuestComponent = NewGuestComponent;
//# sourceMappingURL=new-guest.component.js.map