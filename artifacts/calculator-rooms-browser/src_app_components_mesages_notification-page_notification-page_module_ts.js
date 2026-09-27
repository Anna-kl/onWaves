"use strict";
(self["webpackChunkMainSiteOcpio"] = self["webpackChunkMainSiteOcpio"] || []).push([["src_app_components_mesages_notification-page_notification-page_module_ts"],{

/***/ 8704:
/*!*************************************************************************************!*\
  !*** ./src/app/components/mesages/notification-page/notification-page.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotificationPageComponent: () => (/* binding */ NotificationPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! primeng/calendar */ 57411);
var _NotificationPageComponent;



class NotificationPageComponent {}
_NotificationPageComponent = NotificationPageComponent;
_NotificationPageComponent.ɵfac = function NotificationPageComponent_Factory(t) {
  return new (t || _NotificationPageComponent)();
};
_NotificationPageComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _NotificationPageComponent,
  selectors: [["app-notification-page"]],
  decls: 9,
  vars: 3,
  consts: [[1, "modal_540", "cont-vert-start-center"], [1, "w100", "margin-bottom70"], [2, "text-align", "center"], [1, "w100", "cont-horiz"], ["hourFormat", "24", 1, "margin-bottom100", "w100", 3, "showTime", "timeOnly", "ngModel", "ngModelChange"], [1, "btn-green"]],
  template: function NotificationPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h3", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3)(5, "p-calendar", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NotificationPageComponent_Template_p_calendar_ngModelChange_5_listener($event) {
        return ctx.calendarVal = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3)(7, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showTime", true)("timeOnly", true)("ngModel", ctx.calendarVal);
    }
  },
  dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgModel, primeng_calendar__WEBPACK_IMPORTED_MODULE_2__.Calendar],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJub3RpZmljYXRpb24tcGFnZS5jb21wb25lbnQuY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9tZXNhZ2VzL25vdGlmaWNhdGlvbi1wYWdlL25vdGlmaWNhdGlvbi1wYWdlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLGdMQUFnTCIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 58106:
/*!**********************************************************************************!*\
  !*** ./src/app/components/mesages/notification-page/notification-page.module.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotificationPageModule: () => (/* binding */ NotificationPageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeng/calendar */ 57411);
/* harmony import */ var _notification_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notification-page.component */ 8704);
/* harmony import */ var _common_common_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/common.module */ 87677);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
var _NotificationPageModule;








/** Ленивый чанк `/notification` — страница уведомлений (только для авторизованных). */
class NotificationPageModule {}
_NotificationPageModule = NotificationPageModule;
_NotificationPageModule.ɵfac = function NotificationPageModule_Factory(t) {
  return new (t || _NotificationPageModule)();
};
_NotificationPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _NotificationPageModule
});
_NotificationPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, primeng_calendar__WEBPACK_IMPORTED_MODULE_5__.CalendarModule, _common_common_module__WEBPACK_IMPORTED_MODULE_1__.CommonComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild([{
    path: '',
    component: _notification_page_component__WEBPACK_IMPORTED_MODULE_0__.NotificationPageComponent
  }])]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](NotificationPageModule, {
    declarations: [_notification_page_component__WEBPACK_IMPORTED_MODULE_0__.NotificationPageComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, primeng_calendar__WEBPACK_IMPORTED_MODULE_5__.CalendarModule, _common_common_module__WEBPACK_IMPORTED_MODULE_1__.CommonComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_components_mesages_notification-page_notification-page_module_ts.js.map