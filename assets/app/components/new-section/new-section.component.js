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
var NewSectionComponent = (function () {
    function NewSectionComponent(http, fb, route) {
        this.http = http;
        this.fb = fb;
        this.route = route;
    }
    NewSectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            name: ['', forms_1.Validators.required],
            content: ['', forms_1.Validators.required]
        });
        this.status = { color: 'white-text', message: '' };
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        //this.editMode = !!this.user._wedding;
        Materialize.updateTextFields();
        //Get current wedding
        this.http.get('wedding/' + this.user._wedding)
            .subscribe(function (result) {
            _this.wedding = result.json();
        });
        this.paramsSub = this.route.params
            .map(function (params) { return params['section_id']; })
            .subscribe(function (section_id) {
            if (section_id) {
                _this.editMode = true;
                _this.http.get('Section/' + section_id)
                    .subscribe(function (result) {
                    _this.section = result.json();
                    _this.fillFormWithSection();
                    Materialize.updateTextFields();
                });
            }
        });
    };
    NewSectionComponent.prototype.fillFormWithSection = function () {
        this.form.setValue({
            name: this.section.name,
            content: this.section.content
        });
    };
    NewSectionComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.form.valid) {
            var formModel = this.form.value;
            var section = {
                name: formModel.name,
                content: formModel.content,
                _wedding: this.wedding.id
            };
            if (this.editMode) {
                var bodyString = JSON.stringify(section); // Stringify payload
                var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                var options = new http_1.RequestOptions({ headers: headers });
                this.http.put('section/' + this.section.id, bodyString, options)
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
                this.http.post('Section', section)
                    .subscribe(function (result) {
                    _this.status.color = 'green-text';
                    _this.status.message = 'Nueva seccion agregada exitosamente';
                });
            }
        }
        else {
            this.status.color = 'red-text';
            this.status.message = 'Por favor complete los campos requeridos';
        }
    };
    NewSectionComponent = __decorate([
        core_1.Component({
            selector: 'wedding-new-section',
            templateUrl: './new-section.component.html',
            styleUrls: ['./new-section.component.css']
        }),
        __metadata("design:paramtypes", [http_1.Http, forms_1.FormBuilder, router_1.ActivatedRoute])
    ], NewSectionComponent);
    return NewSectionComponent;
}());
exports.NewSectionComponent = NewSectionComponent;
//# sourceMappingURL=new-section.component.js.map