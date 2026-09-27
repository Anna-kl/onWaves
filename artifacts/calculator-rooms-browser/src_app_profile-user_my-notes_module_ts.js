"use strict";
(self["webpackChunkMainSiteOcpio"] = self["webpackChunkMainSiteOcpio"] || []).push([["src_app_profile-user_my-notes_module_ts"],{

/***/ 53857:
/*!*************************************************!*\
  !*** ./src/app/profile-user/my-notes.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MyNotesModule: () => (/* binding */ MyNotesModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _my_notes_my_notes_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./my-notes/my-notes.component */ 30176);
/* harmony import */ var _common_common_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/common.module */ 87677);
/* harmony import */ var _ui_ui_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/ui.module */ 34608);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 61699);
var _MyNotesModule;








/** Ленивый чанк `/profile-user/:id` — список записей пользователя (только для авторизованных). */
class MyNotesModule {}
_MyNotesModule = MyNotesModule;
_MyNotesModule.ɵfac = function MyNotesModule_Factory(t) {
  return new (t || _MyNotesModule)();
};
_MyNotesModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _MyNotesModule
});
_MyNotesModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _common_common_module__WEBPACK_IMPORTED_MODULE_1__.CommonComponentsModule, _ui_ui_module__WEBPACK_IMPORTED_MODULE_2__.UIModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild([{
    path: ':id',
    component: _my_notes_my_notes_component__WEBPACK_IMPORTED_MODULE_0__.MyNotesComponent
  }])]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](MyNotesModule, {
    declarations: [_my_notes_my_notes_component__WEBPACK_IMPORTED_MODULE_0__.MyNotesComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _common_common_module__WEBPACK_IMPORTED_MODULE_1__.CommonComponentsModule, _ui_ui_module__WEBPACK_IMPORTED_MODULE_2__.UIModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
  });
})();

/***/ }),

/***/ 30176:
/*!*************************************************************!*\
  !*** ./src/app/profile-user/my-notes/my-notes.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MyNotesComponent: () => (/* binding */ MyNotesComponent)
/* harmony export */ });
/* harmony import */ var D_Project_Front_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _services_record_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/record.service */ 27789);
/* harmony import */ var _DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../DTO/enums/recordStatus */ 63345);
/* harmony import */ var _components_reviews_user_reviews_user_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/reviews-user/reviews-user.component */ 63509);
/* harmony import */ var _helpers_dateUtils_dateUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helpers/dateUtils/dateUtils */ 15899);
/* harmony import */ var _helpers_common_timeHelpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../helpers/common/timeHelpers */ 7825);
/* harmony import */ var _helpers_common_address__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../helpers/common/address */ 85572);
/* harmony import */ var _helpers_common_avatar1__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../helpers/common/avatar1 */ 86824);
/* harmony import */ var _DTO_enums_paymentMethodType__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../DTO/enums/paymentMethodType */ 36618);
/* harmony import */ var src_helpers_common_price_helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/helpers/common/price.helpers */ 48818);
/* harmony import */ var src_helpers_constant_notes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/helpers/constant/notes */ 11787);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 76101);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _common_loader_on_waves_loader_on_waves_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../common/loader-on-waves/loader-on-waves.component */ 38559);

var _MyNotesComponent;

















function MyNotesComponent_div_1_div_4_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const record_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](2, 1, ctx_r6.toLocale(record_r5.start), "d MMMM YYYY, HH:mm"), " ");
  }
}
function MyNotesComponent_div_1_div_4_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, " \u0411\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F \u043F\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function MyNotesComponent_div_1_div_4_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "svg", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "path", 38)(3, "path", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const record_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ctx_r8.getAddressProfile(record_r5.businessProfile.address), " ");
  }
}
function MyNotesComponent_div_1_div_4_div_20_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const service_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" (~", ctx_r19.getHours(service_r18.duration), "\u0447. ", ctx_r19.getMinutes(service_r18.duration), "\u043C\u0438\u043D) ");
  }
}
function MyNotesComponent_div_1_div_4_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 40)(1, "div", 41)(2, "div", 42)(3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](5, MyNotesComponent_div_1_div_4_div_20_div_5_Template, 2, 2, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const service_r18 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", service_r18.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", service_r18.duration && !service_r18.isTimeUnlimited);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ctx_r9.getPriceService(service_r18.price), " \u0440\u0443\u0431. ");
  }
}
function MyNotesComponent_div_1_div_4_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "svg", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "path", 46)(3, "path", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "div", 48)(5, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const record_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" ", ctx_r10.getHours(record_r5.duration), "\u0447. ", ctx_r10.getMinutes(record_r5.duration), " \u043C\u0438\u043D. ");
  }
}
function MyNotesComponent_div_1_div_4_div_35_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "svg", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "path", 55)(3, "path", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5, " \u041A\u0430\u0440\u0442\u043E\u0439 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
}
function MyNotesComponent_div_1_div_4_div_35_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "svg", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "path", 58)(3, "path", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5, " \u041E\u043D\u043B\u0430\u0439\u043D \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
}
function MyNotesComponent_div_1_div_4_div_35_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "svg", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "path", 60)(3, "path", 61)(4, "path", 62)(5, "path", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](7, " \u041F\u0435\u0440\u0435\u0432\u043E\u0434 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
}
function MyNotesComponent_div_1_div_4_div_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 49)(1, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "svg", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](3, "path", 52)(4, "path", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6, " \u041D\u0430\u043B\u0438\u0447\u043D\u044B\u043C\u0438 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](7, MyNotesComponent_div_1_div_4_div_35_div_7_Template, 6, 0, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, MyNotesComponent_div_1_div_4_div_35_div_8_Template, 6, 0, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, MyNotesComponent_div_1_div_4_div_35_div_9_Template, 8, 0, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const record_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r11.checkPaymentType(ctx_r11.PaymentMethodType.CARD, record_r5));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r11.checkPaymentType(ctx_r11.PaymentMethodType.ONLINE, record_r5));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r11.checkPaymentType(ctx_r11.PaymentMethodType.FAST_TRANSFER, record_r5));
  }
}
function MyNotesComponent_div_1_div_4_div_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const message_r26 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", message_r26.text, " ");
  }
}
function MyNotesComponent_div_1_div_4_div_39_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function MyNotesComponent_div_1_div_4_div_39_div_1_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r30);
      const record_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2).$implicit;
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r28.addReview(record_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, " \u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
}
function MyNotesComponent_div_1_div_4_div_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, MyNotesComponent_div_1_div_4_div_39_div_1_Template, 2, 0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const record_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !record_r5.isHasReview);
  }
}
function MyNotesComponent_div_1_div_4_div_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function MyNotesComponent_div_1_div_4_div_41_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r34);
      const record_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r32.cancel(record_r5));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
}
function MyNotesComponent_div_1_div_4_div_42_a_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "a", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "svg", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "rect", 73)(3, "path", 74)(4, "path", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6, "\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const record_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("href", "tel:+" + record_r5.businessProfile.phone, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
  }
}
function MyNotesComponent_div_1_div_4_div_42_a_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "a", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "svg", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "rect", 77)(3, "path", 78)(4, "path", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6, "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const record_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("href", "https://api.whatsapp.com/send?phone=" + record_r5.businessProfile.whatsApp, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
  }
}
function MyNotesComponent_div_1_div_4_div_42_a_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "a", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "svg", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "path", 80)(3, "path", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5, "WhatsApp");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const record_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("href", "https://api.whatsapp.com/send?phone=" + record_r5.businessProfile.whatsApp, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
  }
}
function MyNotesComponent_div_1_div_4_div_42_a_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "a", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "svg", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "path", 83)(3, "path", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "defs")(5, "linearGradient", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](6, "stop", 86)(7, "stop", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](8, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](9, "Telegram");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const record_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("href", "https://t.me/" + record_r5.businessProfile.telegram, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
  }
}
function MyNotesComponent_div_1_div_4_div_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 68)(1, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, MyNotesComponent_div_1_div_4_div_42_a_2_Template, 7, 1, "a", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](3, MyNotesComponent_div_1_div_4_div_42_a_3_Template, 7, 1, "a", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](5, MyNotesComponent_div_1_div_4_div_42_a_5_Template, 6, 1, "a", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](6, MyNotesComponent_div_1_div_4_div_42_a_6_Template, 10, 1, "a", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const record_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]().$implicit;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r15.checkPhone(record_r5.businessProfile));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r15.checkWhatsTelegram(record_r5.businessProfile));
  }
}
function MyNotesComponent_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "label", 9)(3, "div", 10)(4, "div", 11)(5, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](6, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "div")(8, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](10, "div", 14)(11, "div", 12)(12, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](14, MyNotesComponent_div_1_div_4_div_14_Template, 3, 4, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](15, MyNotesComponent_div_1_div_4_div_15_Template, 2, 0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](16, "div", 16)(17, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](18, MyNotesComponent_div_1_div_4_div_18_Template, 5, 1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](19, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](20, MyNotesComponent_div_1_div_4_div_20_Template, 8, 3, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](21, "div", 21)(22, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](23, MyNotesComponent_div_1_div_4_div_23_Template, 7, 2, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](24, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](25, "svg", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](26, "path", 25)(27, "path", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](28, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](30, "div", 27)(31, "div", 28)(32, "div", 29)(33, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](34, " \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0435 \u0441\u043F\u043E\u0441\u043E\u0431\u044B \u043E\u043F\u043B\u0430\u0442\u044B: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](35, MyNotesComponent_div_1_div_4_div_35_Template, 10, 3, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](36, "hr", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](37, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](38, MyNotesComponent_div_1_div_4_div_38_Template, 2, 1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](39, MyNotesComponent_div_1_div_4_div_39_Template, 2, 1, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](40, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](41, MyNotesComponent_div_1_div_4_div_41_Template, 3, 0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](42, MyNotesComponent_div_1_div_4_div_42_Template, 7, 4, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const record_r5 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("id", record_r5.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("for", record_r5.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("src", ctx_r4.getAvatar(record_r5.businessProfile.avatarUrl), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](record_r5.businessProfile.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵstyleProp"]("color", ctx_r4.getColorLine(record_r5));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ctx_r4.getStatus(record_r5), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", record_r5.start);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !record_r5.start);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", record_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", record_r5.services);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", record_r5.start);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"]("", ctx_r4.getPriceString(record_r5.services, ctx_r4.sale), " \u0440\u0443\u0431. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r4.checkPaymentType(ctx_r4.PaymentMethodType.CASH, record_r5));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", record_r5.comments);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r4.checkStatus(record_r5.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r4.getStatusDone(record_r5));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r4.getStatusDone(record_r5));
  }
}
function MyNotesComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "h3", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3, " \u041C\u043E\u0438 \u0437\u0430\u043F\u0438\u0441\u0438 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](4, MyNotesComponent_div_1_div_4_Template, 43, 18, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const records_r3 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", records_r3);
  }
}
function MyNotesComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "app-loader-on-waves");
  }
}
class MyNotesComponent {
  constructor(_apiRecords, route, _modal, _router, sanitizer) {
    this._apiRecords = _apiRecords;
    this.route = route;
    this._modal = _modal;
    this._router = _router;
    this.sanitizer = sanitizer;
    this.records$ = null;
    this.sale = 0;
    this.getColorLine = src_helpers_constant_notes__WEBPACK_IMPORTED_MODULE_10__.getColorLine;
    this.getHours = _helpers_common_timeHelpers__WEBPACK_IMPORTED_MODULE_5__.getHours;
    this.getMinutes = _helpers_common_timeHelpers__WEBPACK_IMPORTED_MODULE_5__.getMinutes;
    this.getAddressProfile = _helpers_common_address__WEBPACK_IMPORTED_MODULE_6__.getAddressProfile;
    this.getPriceString = src_helpers_common_price_helpers__WEBPACK_IMPORTED_MODULE_9__.getPriceString;
    this.getPriceService = src_helpers_common_price_helpers__WEBPACK_IMPORTED_MODULE_9__.getPriceService;
    this.PaymentMethodType = _DTO_enums_paymentMethodType__WEBPACK_IMPORTED_MODULE_8__.PaymentMethodType;
    this.toLocale = _helpers_dateUtils_dateUtils__WEBPACK_IMPORTED_MODULE_4__.UTCToLocale;
    this.getStatusDone = src_helpers_constant_notes__WEBPACK_IMPORTED_MODULE_10__.getStatusDone;
  }
  getListRecords() {
    var _this = this;
    return (0,D_Project_Front_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.records$ = _this._apiRecords.getUserRecords(_this.id, new Date().toLocaleString());
    })();
  }
  getStatus(item) {
    switch (item.status) {
      case _DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_2__.RecordStatus.Confirm:
        {
          return "В ожидании";
        }
      case _DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_2__.RecordStatus.Success:
        {
          return "Выполнено";
        }
      case _DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_2__.RecordStatus.Created:
        {
          return "Не подтверждено";
        }
      case _DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_2__.RecordStatus.Canceled:
        {
          return "Отменено";
        }
      case _DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_2__.RecordStatus.Pending:
        {
          return "В процессе";
        }
      case _DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_2__.RecordStatus.InWork:
        {
          return "В работе";
        }
    }
  }
  ngOnInit() {
    var _this2 = this;
    return (0,D_Project_Front_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.id = _this2.route.snapshot.paramMap.get('id');
      if (_this2.id) {
        yield _this2.getListRecords();
      }
    })();
  }
  cancel(record) {
    if (this.id) {
      this._apiRecords.confirmRecord(this.id, {
        status: _DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_2__.RecordStatus.Canceled,
        id: record.id
      }).subscribe(result => {
        if (result.code === 200) {
          record.status = _DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_2__.RecordStatus.Canceled;
        }
      });
    }
  }
  addReview(record) {
    const modalRef = this._modal.open(_components_reviews_user_reviews_user_component__WEBPACK_IMPORTED_MODULE_3__.ReviewsUserComponent);
    modalRef.componentInstance.recordId = record.id;
    modalRef.componentInstance.profileId = this.id;
    modalRef.componentInstance.avatar = record.businessProfile.avatar;
    modalRef.componentInstance.name = record.businessProfile.name;
    modalRef.result.then(result => {
      if (result) {
        record.isHasReview = true;
      }
    });
  }
  getAvatar(avatar) {
    return (0,_helpers_common_avatar1__WEBPACK_IMPORTED_MODULE_7__.resolveAvatarUrl)(avatar);
  }
  checkStatus(recordStatus) {
    return recordStatus === _DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_2__.RecordStatus.Success;
  }
  checkPhone(businessProfile) {
    return businessProfile.phone && businessProfile.phone.length > 0;
  }
  getLinkWhatsApp(businessProfile) {
    return ``;
  }
  checkWhatsApp(businessProfile) {
    return businessProfile.whatsApp && businessProfile.whatsApp.length > 1;
  }
  checkWhatsTelegram(businessProfile) {
    return businessProfile.telegram && businessProfile.telegram.length > 1;
  }
  checkPaymentType(type, record) {
    return record.methodsPayment.includes(type);
  }
  repeat(record) {
    this._router.navigate([`id/${record.businessProfile.id}/choose-date`], {
      queryParams: {
        recordId: record.id
      }
    });
  }
}
_MyNotesComponent = MyNotesComponent;
_MyNotesComponent.ɵfac = function MyNotesComponent_Factory(t) {
  return new (t || _MyNotesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_services_record_service__WEBPACK_IMPORTED_MODULE_1__.RecordService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_15__.DomSanitizer));
};
_MyNotesComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _MyNotesComponent,
  selectors: [["app-my-notes"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵProvidersFeature"]([_services_record_service__WEBPACK_IMPORTED_MODULE_1__.RecordService])],
  decls: 5,
  vars: 4,
  consts: [[1, "cont-vert", "w100", 2, "background", "#FAFAFC", "padding", "20px"], ["class", "cont-vert-center-start list1200", "style", "background: #FAFAFC;", 4, "ngIf", "ngIfElse"], ["loading", ""], [1, "cont-vert-center-start", "list1200", 2, "background", "#FAFAFC"], [1, "w100", "cont-horiz-start-start"], [1, "head-notes"], ["class", "accordion_tab", 4, "ngFor", "ngForOf"], [1, "accordion_tab"], ["type", "checkbox", 3, "id"], [1, "accordion_tab-label_white", 2, "gap", "10px 10px", 3, "for"], [1, "cont-horiz-between", "w100", "wrap", 2, "gap", "10px 10px"], [1, "cont-horiz"], [2, "margin-right", "25px"], ["alt", "", 1, "notes-ava-ba-ua", 3, "src"], [1, "cont-horiz-start-start", "wrap"], ["style", "margin-right: 25px;", 4, "ngIf"], [1, "accordion_tab-content_white"], [1, "cont-horiz-start-start", "padding-top-bottom20", "wrap", 2, "border-bottom", "1px solid #DDE2ED"], [4, "ngIf"], [1, "str_uslugi_podcategory"], ["class", "cont-horiz-between ua-my-notes", 4, "ngFor", "ngForOf"], [1, "w100", "cont-horiz"], [1, "cont-horiz", "margin-top-bottom20", "wrap", "w100", 2, "gap", "20px"], ["class", "cont-horiz", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", 2, "margin-right", "10px"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M15.6013 4.59363L15.5982 4.59449L15.6013 4.59363ZM15.4319 4.638L8.29643 6.50053C7.86893 6.61212 7.43191 6.35602 7.32032 5.92852C7.20873 5.50101 7.46483 5.06399 7.89234 4.9524L15.1764 3.0511C15.3596 3.00076 15.5511 2.98743 15.7396 3.01193C15.9311 3.03683 16.1157 3.10029 16.282 3.19847C16.4484 3.29666 16.5932 3.42753 16.7076 3.5832C16.8205 3.73692 16.9016 3.91166 16.946 4.09713L17.3048 5.53244C17.4119 5.96107 17.1513 6.39542 16.7227 6.50258C16.2941 6.60974 15.8597 6.34913 15.7526 5.9205L15.4319 4.638Z", "fill", "#67C4B2"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M5.08571 8.14062C4.53255 8.14062 4.00204 8.36037 3.61089 8.75152C3.21974 9.14266 3 9.67317 3 10.2263V19.2263C3 19.7795 3.21974 20.31 3.61089 20.7012C4.00204 21.0923 4.53255 21.3121 5.08571 21.3121H17.3C17.8532 21.3121 18.3837 21.0923 18.7748 20.7012C19.166 20.31 19.3857 19.7795 19.3857 19.2263V16.8123H19.8715C20.6684 16.8123 21.3144 16.1663 21.3144 15.3695V13.4409C21.3144 12.644 20.6684 11.998 19.8715 11.998H19.3857V10.2263C19.3857 9.67317 19.166 9.14266 18.7748 8.75152C18.3837 8.36037 17.8532 8.14062 17.3 8.14062H5.08571ZM17.7857 11.998V10.2263C17.7857 10.0975 17.7345 9.97398 17.6435 9.88289C17.5524 9.7918 17.4288 9.74062 17.3 9.74062H5.08571C4.9569 9.74062 4.83335 9.7918 4.74226 9.88289C4.65117 9.97398 4.6 10.0975 4.6 10.2263V19.2263C4.6 19.3552 4.65117 19.4787 4.74226 19.5698C4.83335 19.6609 4.9569 19.7121 5.08571 19.7121H17.3C17.4288 19.7121 17.5524 19.6609 17.6435 19.5698C17.7345 19.4787 17.7857 19.3552 17.7857 19.2263V16.8123H16.6572C15.8603 16.8123 15.2144 16.1663 15.2144 15.3695V13.4409C15.2144 12.644 15.8603 11.998 16.6572 11.998H17.7857ZM18.607 15.2123C18.6 15.2121 18.5928 15.2121 18.5857 15.2121C18.5786 15.2121 18.5715 15.2121 18.5644 15.2123H16.8144V13.598H19.7144V15.2123H18.607Z", "fill", "#67C4B2"], [1, "notes_total", "cont-vert-start-center"], [1, "cont-vert-start-center", "w100", "margin-bottom20"], [1, "margin-bottom20"], ["class", "cont-horiz-start wrap w100", "style", "gap: 10px 30px", 4, "ngIf"], [1, "w100"], [1, "w100", "cont-horiz-start", "wrap"], [4, "ngFor", "ngForOf"], ["class", "cont-horiz-around w100 margin-top-bottom20 wrap", "style", "gap: 20px 20px;", 4, "ngIf"], [1, "around_1024-beetween_large", "wrap"], ["class", "btn-transparent stl-cancel cont-horiz-start", 3, "click", 4, "ngIf"], ["class", "cont-horiz wrap", "style", "font-size: 0.9rem;", 4, "ngIf"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M11.855 2.55752C10.1848 2.55752 8.58302 3.221 7.40201 4.40201C6.221 5.58302 5.55752 7.18481 5.55752 8.855C5.55752 9.65147 5.93303 10.843 6.59144 12.2689C7.23609 13.6649 8.10238 15.1832 8.97868 16.596C9.85333 18.0061 10.7293 19.2972 11.3872 20.2366C11.5596 20.4828 11.7169 20.7045 11.855 20.8977C11.9932 20.7045 12.1504 20.4828 12.3228 20.2366C12.9807 19.2972 13.8567 18.0061 14.7313 16.596C15.6076 15.1832 16.4739 13.6649 17.1186 12.2689C17.777 10.843 18.1525 9.65147 18.1525 8.855C18.1525 7.18481 17.489 5.58302 16.308 4.40201C15.127 3.221 13.5252 2.55752 11.855 2.55752ZM11.855 22.2212C11.2316 22.688 11.2315 22.6878 11.2315 22.6878L11.2258 22.6802L11.2098 22.6588L11.1491 22.5768C11.0962 22.5052 11.0191 22.4002 10.9211 22.2655C10.7253 21.9962 10.4461 21.608 10.1115 21.1301C9.44262 20.1752 8.54949 18.8589 7.65509 17.4169C6.76233 15.9776 5.85955 14.3991 5.1774 12.9218C4.50902 11.4744 4 10.0163 4 8.855C4 6.77173 4.82758 4.77378 6.30068 3.30068C7.77378 1.82758 9.77173 1 11.855 1C13.9383 1 15.9362 1.82758 17.4093 3.30068C18.8824 4.77378 19.71 6.77173 19.71 8.855C19.71 10.0163 19.201 11.4744 18.5326 12.9218C17.8505 14.3991 16.9477 15.9776 16.0549 17.4169C15.1605 18.8589 14.2674 20.1752 13.5985 21.1301C13.2639 21.608 12.9847 21.9962 12.7889 22.2655C12.691 22.4002 12.6138 22.5052 12.5609 22.5768L12.5002 22.6588L12.4842 22.6802L12.4789 22.6873C12.4789 22.6873 12.4784 22.688 11.855 22.2212ZM11.855 22.2212L12.4789 22.6873C12.3318 22.8837 12.1003 23 11.855 23C11.6097 23 11.3785 22.8842 11.2315 22.6878L11.855 22.2212Z", "fill", "#67C4B2"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M11.8548 7.27477C10.9822 7.27477 10.2748 7.98216 10.2748 8.85476C10.2748 9.72736 10.9822 10.4347 11.8548 10.4347C12.7274 10.4347 13.4347 9.72736 13.4347 8.85476C13.4347 7.98216 12.7274 7.27477 11.8548 7.27477ZM8.71725 8.85476C8.71725 7.12196 10.122 5.71725 11.8548 5.71725C13.5876 5.71725 14.9923 7.12196 14.9923 8.85476C14.9923 10.5876 13.5876 11.9923 11.8548 11.9923C10.122 11.9923 8.71725 10.5876 8.71725 8.85476Z", "fill", "#67C4B2"], [1, "cont-horiz-between", "ua-my-notes"], [1, "cont-horiz-between", "w100", 2, "gap", "10px 10px"], [1, "cont-horiz-start", 2, "gap", "10px 10px"], ["class", "txt-uslugi-time", 4, "ngIf"], [1, "txt-uslugi-price"], [1, "txt-uslugi-time"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3ZM12 19.4C7.9 19.4 4.6 16.1 4.6 12C4.6 7.9 7.9 4.6 12 4.6C16.1 4.6 19.4 7.9 19.4 12C19.4 16.1 16.1 19.4 12 19.4Z", "fill", "#67C4B2"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M12.8 11.6999V8.6999C12.8 8.2999 12.4 7.8999 12 7.8999C11.6 7.8999 11.2 8.1999 11.2 8.5999V11.9999C11.2 12.0999 11.2 12.1999 11.3 12.2999C11.3 12.3999 11.4 12.4999 11.5 12.5999L14.9 15.9999C15.2 16.2999 15.7 16.2999 16 15.9999C16.3 15.6999 16.3 15.1999 16 14.8999L12.8 11.6999Z", "fill", "#67C4B2"], [1, "txt-gray"], [1, "cont-horiz-start", "wrap", "w100", 2, "gap", "10px 30px"], [1, "cont-horiz-start", "type-of-pay", 2, "gap", "10px 10px"], ["xmlns", "http://www.w3.org/2000/svg", "width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M15.6013 4.59363L15.5982 4.59449L15.6013 4.59363ZM15.4319 4.638L8.29643 6.50053C7.86893 6.61212 7.43191 6.35602 7.32032 5.92852C7.20873 5.50101 7.46483 5.06399 7.89234 4.9524L15.1764 3.0511C15.3596 3.00076 15.5511 2.98743 15.7396 3.01193C15.9311 3.03683 16.1157 3.10029 16.282 3.19847C16.4484 3.29666 16.5932 3.42753 16.7076 3.5832C16.8205 3.73692 16.9016 3.91166 16.946 4.09713L17.3048 5.53244C17.4119 5.96107 17.1513 6.39542 16.7227 6.50258C16.2941 6.60974 15.8597 6.34913 15.7526 5.9205L15.4319 4.638Z", "fill", "#11142D"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M5.08571 8.14062C4.53255 8.14062 4.00204 8.36037 3.61089 8.75152C3.21974 9.14266 3 9.67317 3 10.2263V19.2263C3 19.7795 3.21974 20.31 3.61089 20.7012C4.00204 21.0923 4.53255 21.3121 5.08571 21.3121H17.3C17.8532 21.3121 18.3837 21.0923 18.7748 20.7012C19.166 20.31 19.3857 19.7795 19.3857 19.2263V16.8123H19.8715C20.6684 16.8123 21.3144 16.1663 21.3144 15.3695V13.4409C21.3144 12.644 20.6684 11.998 19.8715 11.998H19.3857V10.2263C19.3857 9.67317 19.166 9.14266 18.7748 8.75152C18.3837 8.36037 17.8532 8.14062 17.3 8.14062H5.08571ZM17.7857 11.998V10.2263C17.7857 10.0975 17.7345 9.97398 17.6435 9.88289C17.5524 9.7918 17.4288 9.74062 17.3 9.74062H5.08571C4.9569 9.74062 4.83335 9.7918 4.74226 9.88289C4.65117 9.97398 4.6 10.0975 4.6 10.2263V19.2263C4.6 19.3552 4.65117 19.4787 4.74226 19.5698C4.83335 19.6609 4.9569 19.7121 5.08571 19.7121H17.3C17.4288 19.7121 17.5524 19.6609 17.6435 19.5698C17.7345 19.4787 17.7857 19.3552 17.7857 19.2263V16.8123H16.6572C15.8603 16.8123 15.2144 16.1663 15.2144 15.3695V13.4409C15.2144 12.644 15.8603 11.998 16.6572 11.998H17.7857ZM18.607 15.2123C18.6 15.2121 18.5928 15.2121 18.5857 15.2121C18.5786 15.2121 18.5715 15.2121 18.5644 15.2123H16.8144V13.598H19.7144V15.2123H18.607Z", "fill", "#11142D"], ["class", "cont-horiz-start type-of-pay", "style", "gap: 10px 10px", 4, "ngIf"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M19.5992 4.69922H4.39922C3.19922 4.69922 2.19922 5.69922 2.19922 6.89922V17.1992C2.19922 18.3992 3.19922 19.3992 4.39922 19.3992H19.5992C20.7992 19.3992 21.7992 18.3992 21.7992 17.1992V6.89922C21.7992 5.69922 20.7992 4.69922 19.5992 4.69922ZM20.1992 17.0992C20.1992 17.3992 19.8992 17.6992 19.5992 17.6992H4.39922C4.09922 17.6992 3.79922 17.3992 3.79922 17.0992V11.0992H20.1992V17.0992ZM20.1992 9.49922H3.79922V6.89922C3.79922 6.59922 4.09922 6.29922 4.39922 6.29922H19.5992C19.8992 6.29922 20.1992 6.59922 20.1992 6.89922V9.49922Z", "fill", "#11142D"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M15.4992 15.9992H17.5992C17.9992 15.9992 18.3992 15.5992 18.3992 15.1992C18.3992 14.7992 17.9992 14.3992 17.5992 14.3992H15.4992C15.0992 14.3992 14.6992 14.7992 14.6992 15.1992C14.6992 15.5992 14.9992 15.9992 15.4992 15.9992Z", "fill", "#11142D"], ["xmlns", "http://www.w3.org/2000/svg", "width", "14", "height", "20", "viewBox", "0 0 14 20", "fill", "none"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M2.33255 1.79922C2.06619 1.79922 1.79922 2.03223 1.79922 2.38383V17.6146C1.79922 17.9662 2.06619 18.1992 2.33255 18.1992H11.6659C11.9322 18.1992 12.1992 17.9662 12.1992 17.6146V2.38383C12.1992 2.03223 11.9322 1.79922 11.6659 1.79922H2.33255ZM0.199219 2.38383C0.199219 1.20603 1.12616 0.199219 2.33255 0.199219H11.6659C12.8723 0.199219 13.7992 1.20603 13.7992 2.38383V17.6146C13.7992 18.7924 12.8723 19.7992 11.6659 19.7992H2.33255C1.12616 19.7992 0.199219 18.7924 0.199219 17.6146V2.38383Z", "fill", "#11142D"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M5.19916 15.5377C5.19916 15.0958 5.55734 14.7377 5.99916 14.7377H7.99916C8.44099 14.7377 8.79916 15.0958 8.79916 15.5377C8.79916 15.9795 8.44099 16.3377 7.99916 16.3377H5.99916C5.55734 16.3377 5.19916 15.9795 5.19916 15.5377Z", "fill", "#11142D"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M11.9992 16.9C11.5992 16.9 11.1992 17.3 11.1992 17.7V20.7C11.1992 21.1 11.5992 21.5 11.9992 21.5C12.3992 21.5 12.7992 21.1 12.7992 20.7V17.7C12.7992 17.3 12.3992 16.9 11.9992 16.9Z", "fill", "#11142D"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M15.9992 15.5C15.5992 15.5 15.1992 15.9 15.1992 16.3V19.3C15.1992 19.7 15.5992 20.1 15.9992 20.1C16.3992 20.1 16.7992 19.7 16.7992 19.3V16.3C16.7992 15.9 16.3992 15.5 15.9992 15.5Z", "fill", "#11142D"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M7.99922 15.5C7.59922 15.5 7.19922 15.9 7.19922 16.3V19.3C7.19922 19.7 7.59922 20.1 7.99922 20.1C8.39922 20.1 8.79922 19.7 8.79922 19.3V16.3C8.79922 15.9 8.39922 15.5 7.99922 15.5Z", "fill", "#11142D"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M19.5992 2.5H4.39922C3.29922 2.5 2.19922 3.3 2.19922 4.5V12C2.19922 13.2 3.29922 14 4.39922 14H19.5992C20.6992 14 21.7992 13.2 21.7992 12V4.6C21.7992 3.4 20.6992 2.5 19.5992 2.5ZM7.19922 12.5H4.39922C3.99922 12.5 3.79922 12.2 3.79922 12V4.6C3.79922 4.4 3.99922 4.1 4.39922 4.1H7.19922V12.5ZM15.1992 12.5H8.79922V4.1H15.1992V12.5ZM20.1992 12.1C20.1992 12.3 19.9992 12.6 19.5992 12.6H16.7992V4.1H19.5992C19.9992 4.1 20.1992 4.4 20.1992 4.6V12.1Z", "fill", "#11142D"], [1, "cont-horiz-around", "w100", "margin-top-bottom20", "wrap", 2, "gap", "20px 20px"], ["class", "btn-green stl-feedback", 3, "click", 4, "ngIf"], [1, "btn-green", "stl-feedback", 3, "click"], [1, "btn-transparent", "stl-cancel", "cont-horiz-start", 3, "click"], [1, "cont-horiz", "wrap", 2, "font-size", "0.9rem"], [1, "cont-horiz-around", 2, "margin-bottom", "20px", "width", "210px"], ["class", "cont-vert types_of_communication_txt", "style", "gap: 10px", 3, "href", 4, "ngIf"], [1, "cont-vert", "types_of_communication_txt", 2, "gap", "10px", 3, "href"], ["xmlns", "http://www.w3.org/2000/svg", "width", "37", "height", "36", "fill", "none"], ["width", "36", "height", "36", "x", ".5", "fill", "#67C4B2", "rx", "18"], ["fill", "#fff", "fill-rule", "evenodd", "d", "M25.897 11.56a2.063 2.063 0 0 0-2.9 0l-.014.013-2.13 2.211a2.045 2.045 0 0 0 .003 2.882.46.46 0 0 1 0 .644v.002l-3.53 3.524-.002.001a.463.463 0 0 1-.648 0 2.049 2.049 0 0 0-2.888 0l-2.223 2.207a2.059 2.059 0 0 0 0 2.898l.003.003.527.527a4.547 4.547 0 0 0 5.67.605l.015-.01a34.374 34.374 0 0 0 9.328-9.322 4.535 4.535 0 0 0-.686-5.66l-.525-.526ZM15.549 21.972l.002.002a2.063 2.063 0 0 0 2.9 0l.002-.004 3.54-3.533a2.059 2.059 0 0 0 0-2.898m-6.444 6.433a.449.449 0 0 0-.633 0L12.7 24.172a.459.459 0 0 0 0 .643l.002.001.523.523a2.948 2.948 0 0 0 3.669.396 32.776 32.776 0 0 0 8.865-8.85 2.934 2.934 0 0 0-.454-3.656l-.534-.533a.463.463 0 0 0-.644-.004L22 14.9l-.01.01a.446.446 0 0 0 0 .628l.002.002M18.813 9a.8.8 0 0 0-.8-.8 9.825 9.825 0 0 0-6.94 2.87A9.798 9.798 0 0 0 8.2 18a.8.8 0 0 0 1.6 0 8.187 8.187 0 0 1 2.405-5.799A8.215 8.215 0 0 1 18.013 9.8a.8.8 0 0 0 .8-.8Z", "clip-rule", "evenodd"], ["fill", "#fff", "fill-rule", "evenodd", "d", "M18.813 12.46a.8.8 0 0 0-.8-.8 6.351 6.351 0 0 0-4.488 1.857 6.335 6.335 0 0 0-1.86 4.482.8.8 0 0 0 1.6 0c0-1.256.5-2.461 1.39-3.35a4.751 4.751 0 0 1 3.358-1.388.8.8 0 0 0 .8-.8Z", "clip-rule", "evenodd"], ["xmlns", "http://www.w3.org/2000/svg", "width", "36", "height", "36", "fill", "none"], ["width", "36", "height", "36", "fill", "#67C4B2", "rx", "18"], ["fill", "#fff", "fill-rule", "evenodd", "d", "M14.15 24.063c.127-.032.258-.048.389-.048H25.4V10.6H11.985v12.246a1.6 1.6 0 0 1-.082.506l-.463 1.389 2.71-.678ZM9 27l1.385-4.154V10.385A1.385 1.385 0 0 1 11.769 9h13.846A1.385 1.385 0 0 1 27 10.385V24.23a1.385 1.385 0 0 1-1.385 1.384H14.54L9 27Z", "clip-rule", "evenodd"], ["fill", "#fff", "fill-rule", "evenodd", "d", "M14.2 15a.8.8 0 0 1 .8-.8h7.385a.8.8 0 0 1 0 1.6H15a.8.8 0 0 1-.8-.8ZM14.2 19a.8.8 0 0 1 .8-.8h5a.8.8 0 0 1 0 1.6h-5a.8.8 0 0 1-.8-.8Z", "clip-rule", "evenodd"], ["fill", "#4FB229", "d", "M1.405 17.784c0 3.025.79 5.979 2.293 8.582L1.262 35.26l9.102-2.387a17.161 17.161 0 0 0 8.204 2.09h.008c9.463 0 17.165-7.7 17.17-17.165A17.058 17.058 0 0 0 30.72 5.655 17.062 17.062 0 0 0 18.575.62c-9.463 0-17.166 7.7-17.17 17.163"], ["fill", "#fff", "d", "M14.131 10.345c-.333-.74-.683-.755-1-.768-.259-.011-.555-.01-.851-.01-.297 0-.778.11-1.185.555-.408.445-1.556 1.52-1.556 3.707 0 2.186 1.593 4.299 1.815 4.596.222.296 3.074 4.926 7.591 6.708 3.754 1.48 4.518 1.186 5.333 1.111.815-.074 2.63-1.074 3-2.112.37-1.038.37-1.927.259-2.113-.111-.185-.408-.296-.852-.518-.445-.223-2.63-1.298-3.037-1.446-.407-.148-.703-.222-1 .223-.296.444-1.147 1.445-1.407 1.741-.259.297-.518.334-.962.112-.445-.223-1.876-.692-3.574-2.206-1.321-1.178-2.213-2.632-2.473-3.077-.259-.444-.027-.685.195-.907.2-.199.445-.519.667-.778.222-.26.296-.445.444-.741.148-.297.074-.556-.037-.779-.111-.222-.975-2.42-1.37-3.298"], ["xmlns", "http://www.w3.org/2000/svg", "width", "37", "height", "36", "viewBox", "0 0 37 36", "fill", "none"], ["d", "M18.5 0C13.7272 0 9.14563 1.89759 5.77344 5.27203C2.39777 8.64781 0.500935 13.226 0.5 18C0.5 22.772 2.39844 27.3535 5.77344 30.728C9.14563 34.1024 13.7272 36 18.5 36C23.2728 36 27.8544 34.1024 31.2266 30.728C34.6016 27.3535 36.5 22.772 36.5 18C36.5 13.228 34.6016 8.64647 31.2266 5.27203C27.8544 1.89759 23.2728 0 18.5 0Z", "fill", "url(#paint0_linear_10945_37811)"], ["d", "M8.64825 17.8101C13.8964 15.5241 17.3951 14.0168 19.1445 13.2887C24.1451 11.2094 25.1829 10.8483 25.8608 10.836C26.0098 10.8337 26.3417 10.8705 26.5583 11.0456C26.7383 11.1932 26.7889 11.3929 26.8142 11.5331C26.8367 11.6732 26.8676 11.9924 26.8423 12.2416C26.5723 15.0878 25.3995 21.9948 24.8033 25.1827C24.5529 26.5316 24.0551 26.9839 23.5742 27.028C22.5279 27.1242 21.7348 26.3373 20.7223 25.6738C19.1389 24.6352 18.2445 23.9888 16.7061 22.9755C14.9286 21.8044 16.0817 21.1606 17.0942 20.1087C17.3586 19.8334 21.9654 15.6442 22.0526 15.2642C22.0639 15.2167 22.0751 15.0395 21.9683 14.9461C21.8642 14.8524 21.7095 14.8845 21.597 14.9098C21.4367 14.9458 18.9083 16.6187 14.0033 19.9282C13.2861 20.4215 12.6364 20.6619 12.0514 20.6493C11.4101 20.6355 10.1726 20.2859 9.25294 19.9872C8.12794 19.6207 7.23075 19.427 7.3095 18.8046C7.34888 18.4806 7.79607 18.149 8.64825 17.8101Z", "fill", "white"], ["id", "paint0_linear_10945_37811", "x1", "18.5", "y1", "0", "x2", "18.5", "y2", "36", "gradientUnits", "userSpaceOnUse"], ["stop-color", "#2AABEE"], ["offset", "1", "stop-color", "#229ED9"]],
  template: function MyNotesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, MyNotesComponent_div_1_Template, 5, 1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](3, MyNotesComponent_ng_template_3_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 2, ctx.records$))("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _common_loader_on_waves_loader_on_waves_component__WEBPACK_IMPORTED_MODULE_11__.LoaderOnWavesComponent, _angular_common__WEBPACK_IMPORTED_MODULE_16__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_16__.DatePipe],
  styles: [".head-notes[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  margin-bottom: 50px;\n  margin-right: 20px;\n}\n\n@media screen and (max-width: 480px) {\n  .head-notes[_ngcontent-%COMP%] {\n    margin-top: 0px;\n    margin-bottom: 20px;\n    margin-right: 20px;\n  }\n}\n\n.color-note_ready[_ngcontent-%COMP%] {\n  color: #4FB229;\n}\n\n.color-note_no_confirm[_ngcontent-%COMP%] {\n  color: #FFAB00;\n}\n\n.color-note_wait[_ngcontent-%COMP%] {\n  color: #0A6ED8;\n}\n\n.color-note_cancel[_ngcontent-%COMP%] {\n  color: #E24414;\n}\n\n.around_1024-beetween_large[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n@media screen and (max-width: 1024px) {\n  .around_1024-beetween_large[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-around;\n    align-items: center;\n    gap: 30px 10px;\n  }\n}\n\n.stl-cancel[_ngcontent-%COMP%] {\n  color: #E24414;\n  border: 0px solid #E24414;\n  max-width: 240px;\n  display: flex;\n  align-items: center;\n}\n\n@media screen and (max-width: 768px) {\n  .stl-cancel[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n}\n\n.ua-my-notes[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #DDE2ED;\n  padding: 20px 0em;\n}\n\n.type-of-pay[_ngcontent-%COMP%] {\n  min-width: calc(245px);\n}\n\n.stl-feedback[_ngcontent-%COMP%] {\n  max-width: 410px;\n  width: calc(50% - 20px);\n}\n\n@media screen and (max-width: 480px) {\n  .stl-feedback[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n\n}\n\n\n@media screen and (max-width: 768px) {\n  .accordion_tab-content_white[_ngcontent-%COMP%] {\n    margin: 0 !important;\n    padding: 10px;\n  }\n\n  .accordion_tab-label_white[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LW5vdGVzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFO0lBQ0UsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixrQkFBa0I7RUFDcEI7QUFDRjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtJQUNiLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsY0FBYztFQUNoQjtBQUNGOztBQUVBO0VBQ0UsY0FBYztFQUNkLHlCQUF5QjtFQUN6QixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7RUFDckI7QUFDRjs7QUFFQTtFQUNFLGdDQUFnQztFQUNoQyxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0U7SUFDRSxXQUFXO0VBQ2I7OztBQUdGOzs7QUFHQTtFQUNFO0lBQ0Usb0JBQW9CO0lBQ3BCLGFBQWE7RUFDZjs7RUFFQTtJQUNFLGFBQWE7RUFDZjtBQUNGIiwiZmlsZSI6Im15LW5vdGVzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZC1ub3RlcyB7XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMjBweDtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDgwcHgpIHtcclxuICAuaGVhZC1ub3RlcyB7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gIH1cclxufVxyXG5cclxuLmNvbG9yLW5vdGVfcmVhZHkge1xyXG4gIGNvbG9yOiAjNEZCMjI5O1xyXG59XHJcblxyXG4uY29sb3Itbm90ZV9ub19jb25maXJtIHtcclxuICBjb2xvcjogI0ZGQUIwMDtcclxufVxyXG5cclxuLmNvbG9yLW5vdGVfd2FpdCB7XHJcbiAgY29sb3I6ICMwQTZFRDg7XHJcbn1cclxuXHJcbi5jb2xvci1ub3RlX2NhbmNlbCB7XHJcbiAgY29sb3I6ICNFMjQ0MTQ7XHJcbn1cclxuXHJcbi5hcm91bmRfMTAyNC1iZWV0d2Vlbl9sYXJnZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XHJcbiAgLmFyb3VuZF8xMDI0LWJlZXR3ZWVuX2xhcmdlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDMwcHggMTBweDtcclxuICB9XHJcbn1cclxuXHJcbi5zdGwtY2FuY2VsIHtcclxuICBjb2xvcjogI0UyNDQxNDtcclxuICBib3JkZXI6IDBweCBzb2xpZCAjRTI0NDE0O1xyXG4gIG1heC13aWR0aDogMjQwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5zdGwtY2FuY2VsIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG59XHJcblxyXG4udWEtbXktbm90ZXMge1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRERFMkVEO1xyXG4gIHBhZGRpbmc6IDIwcHggMGVtO1xyXG59XHJcblxyXG4udHlwZS1vZi1wYXkge1xyXG4gIG1pbi13aWR0aDogY2FsYygyNDVweCk7XHJcbn1cclxuXHJcbi5zdGwtZmVlZGJhY2sge1xyXG4gIG1heC13aWR0aDogNDEwcHg7XHJcbiAgd2lkdGg6IGNhbGMoNTAlIC0gMjBweCk7XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgLnN0bC1mZWVkYmFjayB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLmFjY29yZGlvbl90YWItY29udGVudF93aGl0ZSB7XHJcbiAgICBtYXJnaW46IDAgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgfVxyXG5cclxuICAuYWNjb3JkaW9uX3RhYi1sYWJlbF93aGl0ZSB7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gIH1cclxufSJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcHJvZmlsZS11c2VyL215LW5vdGVzL215LW5vdGVzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFO0lBQ0UsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixrQkFBa0I7RUFDcEI7QUFDRjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtJQUNiLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsY0FBYztFQUNoQjtBQUNGOztBQUVBO0VBQ0UsY0FBYztFQUNkLHlCQUF5QjtFQUN6QixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7RUFDckI7QUFDRjs7QUFFQTtFQUNFLGdDQUFnQztFQUNoQyxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0U7SUFDRSxXQUFXO0VBQ2I7OztBQUdGOzs7QUFHQTtFQUNFO0lBQ0Usb0JBQW9CO0lBQ3BCLGFBQWE7RUFDZjs7RUFFQTtJQUNFLGFBQWE7RUFDZjtBQUNGO0FBQ0Esd3NHQUF3c0ciLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZC1ub3RlcyB7XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxuICBtYXJnaW4tYm90dG9tOiA1MHB4O1xyXG4gIG1hcmdpbi1yaWdodDogMjBweDtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDgwcHgpIHtcclxuICAuaGVhZC1ub3RlcyB7XHJcbiAgICBtYXJnaW4tdG9wOiAwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gIH1cclxufVxyXG5cclxuLmNvbG9yLW5vdGVfcmVhZHkge1xyXG4gIGNvbG9yOiAjNEZCMjI5O1xyXG59XHJcblxyXG4uY29sb3Itbm90ZV9ub19jb25maXJtIHtcclxuICBjb2xvcjogI0ZGQUIwMDtcclxufVxyXG5cclxuLmNvbG9yLW5vdGVfd2FpdCB7XHJcbiAgY29sb3I6ICMwQTZFRDg7XHJcbn1cclxuXHJcbi5jb2xvci1ub3RlX2NhbmNlbCB7XHJcbiAgY29sb3I6ICNFMjQ0MTQ7XHJcbn1cclxuXHJcbi5hcm91bmRfMTAyNC1iZWV0d2Vlbl9sYXJnZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XHJcbiAgLmFyb3VuZF8xMDI0LWJlZXR3ZWVuX2xhcmdlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDMwcHggMTBweDtcclxuICB9XHJcbn1cclxuXHJcbi5zdGwtY2FuY2VsIHtcclxuICBjb2xvcjogI0UyNDQxNDtcclxuICBib3JkZXI6IDBweCBzb2xpZCAjRTI0NDE0O1xyXG4gIG1heC13aWR0aDogMjQwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5zdGwtY2FuY2VsIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG59XHJcblxyXG4udWEtbXktbm90ZXMge1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRERFMkVEO1xyXG4gIHBhZGRpbmc6IDIwcHggMGVtO1xyXG59XHJcblxyXG4udHlwZS1vZi1wYXkge1xyXG4gIG1pbi13aWR0aDogY2FsYygyNDVweCk7XHJcbn1cclxuXHJcbi5zdGwtZmVlZGJhY2sge1xyXG4gIG1heC13aWR0aDogNDEwcHg7XHJcbiAgd2lkdGg6IGNhbGMoNTAlIC0gMjBweCk7XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgLnN0bC1mZWVkYmFjayB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLmFjY29yZGlvbl90YWItY29udGVudF93aGl0ZSB7XHJcbiAgICBtYXJnaW46IDAgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgfVxyXG5cclxuICAuYWNjb3JkaW9uX3RhYi1sYWJlbF93aGl0ZSB7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_profile-user_my-notes_module_ts.js.map