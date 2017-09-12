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
var NewSectionComponent = (function () {
    function NewSectionComponent(http, fb) {
        this.http = http;
        this.fb = fb;
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
    };
    NewSectionComponent.prototype.onSubmit = function () {
        if (this.form.valid) {
            var formModel = this.form.value;
            var section = {
                name: formModel.name,
                content: formModel.content,
                _wedding: this.wedding.id
            };
            this.http.post('Section', section)
                .subscribe(function (result) {
                var newSection = result.json();
                console.log(newSection);
            });
        }
    };
    NewSectionComponent = __decorate([
        core_1.Component({
            selector: 'wedding-new-section',
            templateUrl: './new-section.component.html',
            styleUrls: ['./new-section.component.css']
        }),
        __metadata("design:paramtypes", [http_1.Http, forms_1.FormBuilder])
    ], NewSectionComponent);
    return NewSectionComponent;
}());
exports.NewSectionComponent = NewSectionComponent;
//# sourceMappingURL=new-section.component.js.map