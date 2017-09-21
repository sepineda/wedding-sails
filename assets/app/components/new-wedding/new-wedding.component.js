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
var NewWeddingComponent = (function () {
    function NewWeddingComponent(http, fb) {
        this.http = http;
        this.fb = fb;
        this.dateParams = [{
                today: 'Hoy',
                format: 'yyyy/mm/dd',
                clear: 'Limpiar',
                monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                closeOnSelect: true
            }];
    }
    NewWeddingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            name: ['', forms_1.Validators.required],
            place: ['', forms_1.Validators.required],
            fiance: ['', forms_1.Validators.required],
            bridegroom: ['', forms_1.Validators.required],
            date: ['', forms_1.Validators.required],
            maxGuestNumber: [1, forms_1.Validators.min(1)]
        });
        this.status = { color: 'white-text', message: '' };
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.editMode = !!this.user._wedding;
        if (this.editMode) {
            this.http.get('Wedding/' + this.user._wedding)
                .subscribe(function (result) {
                _this.wedding = result.json();
                _this.form.setValue({
                    name: _this.wedding.name,
                    place: _this.wedding.place,
                    fiance: _this.wedding.fiance,
                    bridegroom: _this.wedding.bridegroom,
                    date: new Date(_this.wedding.date).toDateString(),
                    maxGuestNumber: _this.wedding.maxGuestNumber
                });
                Materialize.updateTextFields();
            });
        }
    };
    NewWeddingComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.form.valid) {
            var formModel = this.form.value;
            var wedding = {
                name: formModel.name,
                place: formModel.place,
                fiance: formModel.fiance,
                bridegroom: formModel.bridegroom,
                date: formModel.date,
                maxGuestNumber: formModel.maxGuestNumber
            };
            if (this.editMode) {
                var bodyString = JSON.stringify(wedding); // Stringify payload
                var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                var options = new http_1.RequestOptions({ headers: headers });
                this.http.put('wedding/' + this.wedding.id, bodyString, options)
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
                this.http.post('Wedding', wedding)
                    .subscribe(function (result) {
                    var newWedding = result.json();
                    _this.user._wedding = newWedding.id;
                    //Update user relation with the new Wedding
                    var bodyString = JSON.stringify(_this.user); // Stringify payload
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
                    var options = new http_1.RequestOptions({ headers: headers });
                    _this.http.put('user/' + _this.user.id, bodyString, options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        console.log('Nueva boda agrega a usuario ' + _this.user.first_name);
                    }, function (error) {
                        _this.status.color = 'red-text',
                            _this.status.message = error;
                    });
                    _this.status.color = 'green-text';
                    _this.status.message = 'Nueva boda creada exitosamente';
                });
            }
        }
    };
    NewWeddingComponent = __decorate([
        core_1.Component({
            selector: 'wedding-new-wedding',
            templateUrl: './new-wedding.component.html',
            styleUrls: ['./new-wedding.component.css']
        }),
        __metadata("design:paramtypes", [http_1.Http, forms_1.FormBuilder])
    ], NewWeddingComponent);
    return NewWeddingComponent;
}());
exports.NewWeddingComponent = NewWeddingComponent;
//# sourceMappingURL=new-wedding.component.js.map