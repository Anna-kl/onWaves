"use strict";
(self["webpackChunkMainSiteOcpio"] = self["webpackChunkMainSiteOcpio"] || []).push([["main"],{

/***/ 7869:
/*!***************************************************!*\
  !*** ./src/app/DTO/enums/calculatorAnswerKind.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalculatorAnswerKind: () => (/* binding */ CalculatorAnswerKind)
/* harmony export */ });
/** Как клиент отвечает на шаг. Числа — контракт JSON. */
var CalculatorAnswerKind;
(function (CalculatorAnswerKind) {
  CalculatorAnswerKind[CalculatorAnswerKind["Choice"] = 0] = "Choice";
  CalculatorAnswerKind[CalculatorAnswerKind["Number"] = 1] = "Number";
  CalculatorAnswerKind[CalculatorAnswerKind["Text"] = 2] = "Text";
  CalculatorAnswerKind[CalculatorAnswerKind["ChoiceMultiple"] = 3] = "ChoiceMultiple";
  CalculatorAnswerKind[CalculatorAnswerKind["Result"] = 4] = "Result";
})(CalculatorAnswerKind || (CalculatorAnswerKind = {}));

/***/ }),

/***/ 8317:
/*!************************************************!*\
  !*** ./src/app/DTO/enums/calculatorCtaKind.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalculatorCtaKind: () => (/* binding */ CalculatorCtaKind)
/* harmony export */ });
/** Кнопка после цены. Числа — контракт JSON. */
var CalculatorCtaKind;
(function (CalculatorCtaKind) {
  CalculatorCtaKind[CalculatorCtaKind["Lead"] = 0] = "Lead";
  CalculatorCtaKind[CalculatorCtaKind["Record"] = 1] = "Record";
})(CalculatorCtaKind || (CalculatorCtaKind = {}));

/***/ }),

/***/ 2312:
/*!****************************************************!*\
  !*** ./src/app/DTO/enums/calculatorQuoteStatus.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalculatorQuoteStatus: () => (/* binding */ CalculatorQuoteStatus)
/* harmony export */ });
/** Жизненный цикл прохода. Числа — контракт JSON. */
var CalculatorQuoteStatus;
(function (CalculatorQuoteStatus) {
  CalculatorQuoteStatus[CalculatorQuoteStatus["Started"] = 0] = "Started";
  CalculatorQuoteStatus[CalculatorQuoteStatus["Completed"] = 1] = "Completed";
  CalculatorQuoteStatus[CalculatorQuoteStatus["LeadSent"] = 2] = "LeadSent";
})(CalculatorQuoteStatus || (CalculatorQuoteStatus = {}));

/***/ }),

/***/ 5633:
/*!***************************************************!*\
  !*** ./src/app/DTO/enums/calculatorResultKind.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalculatorResultKind: () => (/* binding */ CalculatorResultKind)
/* harmony export */ });
/** Чем заканчивается ветка. Числа — контракт JSON. */
var CalculatorResultKind;
(function (CalculatorResultKind) {
  CalculatorResultKind[CalculatorResultKind["Price"] = 0] = "Price";
  CalculatorResultKind[CalculatorResultKind["LeadOnly"] = 1] = "LeadOnly";
})(CalculatorResultKind || (CalculatorResultKind = {}));

/***/ }),

/***/ 2754:
/*!****************************************************************************************!*\
  !*** ./src/app/profile-ba/components/calculator-player/calculator-player.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalculatorPlayerComponent: () => (/* binding */ CalculatorPlayerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 274);
/* harmony import */ var _DTO_enums_calculatorAnswerKind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../DTO/enums/calculatorAnswerKind */ 7869);
/* harmony import */ var _DTO_enums_calculatorCtaKind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../DTO/enums/calculatorCtaKind */ 8317);
/* harmony import */ var _DTO_enums_calculatorQuoteStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../DTO/enums/calculatorQuoteStatus */ 2312);
/* harmony import */ var _DTO_enums_calculatorResultKind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../DTO/enums/calculatorResultKind */ 5633);
/* harmony import */ var _services_calculator_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/calculator.service */ 9838);
/* harmony import */ var _services_analytics_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/analytics.service */ 1804);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 8849);
var _CalculatorPlayerComponent;












function CalculatorPlayerComponent_section_0_ng_container_6_p_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("\u041F\u043E\u043C\u0435\u0449\u0435\u043D\u0438\u0435 ", ctx_r3.step.roomNumber, " \u0438\u0437 ", ctx_r3.step.roomsCount, "");
  }
}
function CalculatorPlayerComponent_section_0_ng_container_6_img_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("error", function CalculatorPlayerComponent_section_0_ng_container_6_img_2_Template_img_error_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r11.hideImage(ctx_r11.step.imageUrl));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r4.step.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"])("alt", ctx_r4.step.imageAlt || ctx_r4.step.title);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_6_p_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r5.step.description);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_6_label_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "label", 17)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CalculatorPlayerComponent_section_0_ng_container_6_label_6_Template_input_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r13.numberValue = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    let tmp_1_0;
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r6.step.unit || "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("min", (tmp_1_0 = ctx_r6.step.minValue) !== null && tmp_1_0 !== undefined ? tmp_1_0 : null)("max", (tmp_2_0 = ctx_r6.step.maxValue) !== null && tmp_2_0 !== undefined ? tmp_2_0 : null)("step", ctx_r6.step.stepValue || 1)("placeholder", ctx_r6.step.placeholder || "")("ngModel", ctx_r6.numberValue);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_6_label_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "label", 17)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "textarea", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CalculatorPlayerComponent_section_0_ng_container_6_label_7_Template_textarea_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r15.textValue = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r7.step.placeholder || "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r7.textValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("maxlength", ctx_r7.step.maxLength || 500);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_6_div_8_button_1_img_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "img", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("error", function CalculatorPlayerComponent_section_0_ng_container_6_div_8_button_1_img_1_Template_img_error_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r24);
      const option_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r22.hideImage(option_r18.imageUrl));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", option_r18.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"])("alt", option_r18.imageAlt || option_r18.label);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_6_div_8_button_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "span", 26);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_6_div_8_button_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](option_r18.description);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_6_div_8_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CalculatorPlayerComponent_section_0_ng_container_6_div_8_button_1_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r28);
      const option_r18 = restoredCtx.$implicit;
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r27.pickOption(option_r18));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, CalculatorPlayerComponent_section_0_ng_container_6_div_8_button_1_img_1_Template, 1, 2, "img", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, CalculatorPlayerComponent_section_0_ng_container_6_div_8_button_1_span_2_Template, 1, 0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span")(4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, CalculatorPlayerComponent_section_0_ng_container_6_div_8_button_1_span_6_Template, 2, 1, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const option_r18 = ctx.$implicit;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("calc__option--on", ctx_r17.isSelected(option_r18));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-pressed", ctx_r17.isSelected(option_r18));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r17.showImage(option_r18.imageUrl));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r17.showImage(option_r18.imageUrl));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](option_r18.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", option_r18.description);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_6_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, CalculatorPlayerComponent_section_0_ng_container_6_div_8_button_1_Template, 7, 7, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r8.step.options);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_6_p_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" \u041F\u043E \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430\u043C: ", ctx_r9.formatMoney(ctx_r9.state.runningTotal), ". \u0420\u0430\u0441\u0447\u0451\u0442 \u0435\u0449\u0451 \u043D\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D. ");
  }
}
function CalculatorPlayerComponent_section_0_ng_container_6_p_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r10.error);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, CalculatorPlayerComponent_section_0_ng_container_6_p_1_Template, 2, 2, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, CalculatorPlayerComponent_section_0_ng_container_6_img_2_Template, 1, 2, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, CalculatorPlayerComponent_section_0_ng_container_6_p_5_Template, 2, 1, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, CalculatorPlayerComponent_section_0_ng_container_6_label_6_Template, 4, 6, "label", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, CalculatorPlayerComponent_section_0_ng_container_6_label_7_Template, 4, 3, "label", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, CalculatorPlayerComponent_section_0_ng_container_6_div_8_Template, 2, 1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, CalculatorPlayerComponent_section_0_ng_container_6_p_9_Template, 2, 1, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, CalculatorPlayerComponent_section_0_ng_container_6_p_10_Template, 2, 1, "p", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CalculatorPlayerComponent_section_0_ng_container_6_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r30);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r29.submitStep());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.step.roomNumber);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.showImage(ctx_r1.step.imageUrl));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.step.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.step.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.step.answerKind === ctx_r1.kinds.Number);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.step.answerKind === ctx_r1.kinds.Text);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.step.answerKind === ctx_r1.kinds.Choice || ctx_r1.step.answerKind === ctx_r1.kinds.ChoiceMultiple);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx_r1.state == null ? null : ctx_r1.state.runningTotal) != null);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.error);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r1.busy);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.busy ? "\u0421\u0447\u0438\u0442\u0430\u0435\u043C\u2026" : "\u0414\u0430\u043B\u0435\u0435", " ");
  }
}
function CalculatorPlayerComponent_section_0_ng_container_7_p_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r31.sumText);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_7_p_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r32.result.leadOnlyReason);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_7_p_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r33.result.note);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_7_ul_6_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "li")(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r38 = ctx.$implicit;
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r38.label || row_r38.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r37.formatMoney(row_r38.amount));
  }
}
function CalculatorPlayerComponent_section_0_ng_container_7_ul_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ul", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, CalculatorPlayerComponent_section_0_ng_container_7_ul_6_li_1_Template, 5, 2, "li", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r34.result.breakdown);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_7_p_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430. \u041C\u0430\u0441\u0442\u0435\u0440 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_p_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r39.error);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_button_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_button_24_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r42);
      const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r41.goRecord());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " \u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0437\u0430\u043C\u0435\u0440 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "label", 17)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "\u0418\u043C\u044F");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "input", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r44);
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r43.leadName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "label", 17)(6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "input", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r44);
      const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r45.leadPhone = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "label", 17)(10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "\u0413\u043E\u0440\u043E\u0434");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "input", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_Template_input_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r44);
      const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r46.leadCity = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "label", 17)(14, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "textarea", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_Template_textarea_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r44);
      const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r47.leadComment = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "label", 40)(18, "input", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_Template_input_ngModelChange_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r44);
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r48.consentAccepted = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20, "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445, \u0447\u0442\u043E\u0431\u044B \u043C\u0430\u0441\u0442\u0435\u0440 \u043F\u043E\u043B\u0443\u0447\u0438\u043B \u0437\u0430\u044F\u0432\u043A\u0443");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](21, CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_p_21_Template, 2, 1, "p", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r44);
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r49.submitLead());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](24, CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_button_24_Template, 2, 0, "button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r36.leadName);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r36.leadPhone);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r36.leadCity);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r36.leadComment);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r36.consentAccepted);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r36.error);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r36.busy);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r36.busy ? "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u2026" : ctx_r36.result.ctaText || "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0442\u043E\u0447\u043D\u044B\u0439 \u0440\u0430\u0441\u0447\u0451\u0442", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r36.result.ctaKind === ctx_r36.ctaKinds.Record && ctx_r36.result.measurementServiceId);
  }
}
function CalculatorPlayerComponent_section_0_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, CalculatorPlayerComponent_section_0_ng_container_7_p_3_Template, 2, 1, "p", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, CalculatorPlayerComponent_section_0_ng_container_7_p_4_Template, 2, 1, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, CalculatorPlayerComponent_section_0_ng_container_7_p_5_Template, 2, 1, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, CalculatorPlayerComponent_section_0_ng_container_7_ul_6_Template, 2, 1, "ul", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, CalculatorPlayerComponent_section_0_ng_container_7_p_7_Template, 2, 0, "p", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, CalculatorPlayerComponent_section_0_ng_container_7_ng_container_8_Template, 25, 9, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r2.result.resultKind === ctx_r2.resultKinds.LeadOnly ? "\u041D\u0443\u0436\u043D\u0430 \u043E\u0446\u0435\u043D\u043A\u0430 \u043C\u0430\u0441\u0442\u0435\u0440\u0430" : "\u041E\u0440\u0438\u0435\u043D\u0442\u0438\u0440 \u043F\u043E \u043F\u0440\u0430\u0439\u0441\u0443");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.sumText);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.result.leadOnlyReason);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.result.note);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.result.breakdown == null ? null : ctx_r2.result.breakdown.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.leadSent);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r2.leadSent);
  }
}
function CalculatorPlayerComponent_section_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "section", 1)(1, "div", 2)(2, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CalculatorPlayerComponent_section_0_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r51);
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r50.goBack());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "\u041D\u0430\u0437\u0430\u0434");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, CalculatorPlayerComponent_section_0_ng_container_6_Template, 13, 11, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, CalculatorPlayerComponent_section_0_ng_container_7_Template, 9, 7, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", !ctx_r0.canGoBack || ctx_r0.busy);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r0.connection.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r0.result && ctx_r0.step);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.result);
  }
}
class CalculatorPlayerComponent {
  constructor(api, analytics, platformId) {
    this.api = api;
    this.analytics = analytics;
    this.platformId = platformId;
    this.profileId = null;
    this.connection = null;
    this.offerId = null;
    this.bookMeasurement = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
    this.step = null;
    this.state = null;
    this.history = [];
    this.numberValue = null;
    this.textValue = '';
    this.optionId = null;
    this.optionIds = [];
    this.leadName = '';
    this.leadPhone = '';
    this.leadCity = '';
    this.leadComment = '';
    this.consentAccepted = false;
    this.busy = false;
    this.error = null;
    this.viewingResult = true;
    this.brokenImages = new Set();
    this.kinds = _DTO_enums_calculatorAnswerKind__WEBPACK_IMPORTED_MODULE_0__.CalculatorAnswerKind;
    this.resultKinds = _DTO_enums_calculatorResultKind__WEBPACK_IMPORTED_MODULE_3__.CalculatorResultKind;
    this.ctaKinds = _DTO_enums_calculatorCtaKind__WEBPACK_IMPORTED_MODULE_1__.CalculatorCtaKind;
    this.token = null;
    this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
  }
  ngOnChanges() {
    this.resetLocal();
    if (!this.connection) {
      return;
    }
    this.step = this.connection.entryStep ?? null;
    this.history = this.step ? [this.step] : [];
    if (this.step) {
      this.hydrateDraft(this.step);
    }
    if (!(0,_angular_common__WEBPACK_IMPORTED_MODULE_8__.isPlatformBrowser)(this.platformId) || !this.connection.profileCalculatorId) {
      return;
    }
    const stored = this.readStored(this.connection.profileCalculatorId);
    if (stored) {
      this.resume(stored);
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  get result() {
    if (!this.viewingResult) {
      return null;
    }
    return this.state?.result ?? null;
  }
  get canGoBack() {
    if (this.leadSent) {
      return false;
    }
    const answers = this.state?.answers ?? [];
    if (answers.length === 0) {
      return false;
    }
    if (this.result) {
      return true;
    }
    return this.step?.id !== answers[0].stepId;
  }
  goBack() {
    const answers = this.state?.answers ?? [];
    if (!answers.length) {
      return;
    }
    const idx = answers.findIndex(item => item.stepId === this.step?.id);
    const previous = idx > 0 ? answers[idx - 1] : idx < 0 ? answers[answers.length - 1] : null;
    if (!previous) {
      return;
    }
    const fromHistory = [...this.history].reverse().find(item => item.id === previous.stepId) ?? this.connection?.entryStep;
    if (!fromHistory) {
      return;
    }
    this.error = null;
    this.step = fromHistory;
    this.viewingResult = false;
    this.hydrateFromAnswer(fromHistory, previous);
  }
  get sumText() {
    const amount = this.result?.amount;
    if (amount == null) {
      return null;
    }
    return `${Math.round(amount).toLocaleString('ru-RU')} ₽`;
  }
  get leadSent() {
    return this.state?.status === _DTO_enums_calculatorQuoteStatus__WEBPACK_IMPORTED_MODULE_2__.CalculatorQuoteStatus.LeadSent;
  }
  hideImage(url) {
    if (url) {
      this.brokenImages.add(url);
    }
  }
  showImage(url) {
    return !!url && !this.brokenImages.has(url);
  }
  isSelected(option) {
    if (this.step?.answerKind === _DTO_enums_calculatorAnswerKind__WEBPACK_IMPORTED_MODULE_0__.CalculatorAnswerKind.ChoiceMultiple) {
      return this.optionIds.includes(option.id);
    }
    return this.optionId === option.id;
  }
  pickOption(option) {
    if (!this.step) {
      return;
    }
    if (this.step.answerKind === _DTO_enums_calculatorAnswerKind__WEBPACK_IMPORTED_MODULE_0__.CalculatorAnswerKind.ChoiceMultiple) {
      if (this.isSelected(option)) {
        this.optionIds = this.optionIds.filter(id => id !== option.id);
      } else if (option.exclusive) {
        this.optionIds = [option.id];
      } else {
        const exclusiveIds = this.step.options.filter(item => item.exclusive).map(item => item.id);
        this.optionIds = [...this.optionIds.filter(id => !exclusiveIds.includes(id)), option.id];
      }
      return;
    }
    this.optionId = option.id;
  }
  submitStep() {
    if (!this.connection || !this.step || this.busy) {
      return;
    }
    const answer = this.buildAnswer(this.step);
    if (!answer) {
      return;
    }
    this.error = null;
    this.busy = true;
    if (!this.state || !this.token) {
      this.startThenAnswer(answer);
      return;
    }
    this.sendAnswer(this.step.id, answer);
  }
  submitLead() {
    if (!this.state || !this.token || this.busy || this.leadSent) {
      return;
    }
    if (!this.consentAccepted) {
      this.error = 'Нужно согласие на обработку данных';
      return;
    }
    this.busy = true;
    this.error = null;
    this.api.submitLead(this.state.quoteId, this.token, this.state.revision, this.requestId(), {
      name: this.leadName,
      phone: this.leadPhone,
      city: this.leadCity || undefined,
      comment: this.leadComment || undefined,
      consentAccepted: true
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroy$)).subscribe({
      next: res => {
        this.busy = false;
        const state = this.api.asState(res);
        if (!state) {
          this.error = res.message || 'Не удалось отправить заявку';
          return;
        }
        this.applyState(state);
        this.analytics.trackEvent('calculator', 'calculator_lead', this.connection?.calculatorId);
      },
      error: err => this.fail(err)
    });
  }
  goRecord() {
    const serviceId = this.result?.measurementServiceId;
    if (!serviceId) {
      return;
    }
    this.analytics.trackEvent('calculator', 'calculator_record', this.connection?.calculatorId);
    this.bookMeasurement.emit(serviceId);
  }
  formatMoney(amount) {
    return `${Math.round(amount).toLocaleString('ru-RU')} ₽`;
  }
  startThenAnswer(answer) {
    this.api.startQuote(this.connection.profileCalculatorId, this.requestId()).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroy$)).subscribe({
      next: res => {
        const state = this.api.asState(res);
        if (!state?.accessToken || !state.quoteId) {
          this.busy = false;
          this.error = res.message || 'Не удалось начать расчёт';
          return;
        }
        this.token = state.accessToken;
        this.state = state;
        this.writeStored(state.profileCalculatorId, {
          quoteId: state.quoteId,
          token: state.accessToken
        });
        this.analytics.trackEvent('calculator', 'calculator_start', this.connection?.calculatorId);
        this.sendAnswer(answer.stepId, answer);
      },
      error: err => this.fail(err)
    });
  }
  sendAnswer(stepId, answer) {
    this.api.putAnswer(this.state.quoteId, stepId, this.token, this.state.revision, this.requestId(), answer).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroy$)).subscribe({
      next: res => {
        this.busy = false;
        const state = this.api.asState(res);
        if (!state) {
          this.error = res.message || 'Не удалось сохранить ответ';
          return;
        }
        this.applyState(state);
        this.analytics.trackEvent('calculator', 'calculator_step', this.step?.key);
        if (state.result) {
          this.analytics.trackEvent('calculator', 'calculator_result', this.connection?.calculatorId);
        }
      },
      error: err => this.fail(err)
    });
  }
  resume(stored) {
    this.busy = true;
    this.api.getQuote(stored.quoteId, stored.token).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroy$)).subscribe({
      next: res => {
        this.busy = false;
        const state = this.api.asState(res);
        if (!state) {
          this.clearStored(this.connection.profileCalculatorId);
          return;
        }
        this.token = stored.token;
        this.applyState(state);
      },
      error: () => {
        this.busy = false;
        this.clearStored(this.connection.profileCalculatorId);
      }
    });
  }
  applyState(state, reopenStepId) {
    this.state = state;
    // Сервер возвращает вопросы активного пути, поэтому «Назад» работает и после перезагрузки.
    if (state.answeredSteps) {
      this.history = [...state.answeredSteps];
    }
    this.viewingResult = !!state.result;
    if (reopenStepId) {
      return;
    }
    this.step = state.currentStep ?? null;
    if (this.step) {
      if (!this.history.some(item => item.id === this.step.id)) {
        this.history = [...this.history, this.step];
      }
      const existing = state.answers.find(item => item.stepId === this.step.id);
      if (existing) {
        this.hydrateFromAnswer(this.step, existing);
      } else {
        this.hydrateDraft(this.step);
      }
    }
  }
  buildAnswer(step) {
    const base = {
      stepId: step.id,
      stepKey: step.key,
      roomId: step.roomId
    };
    switch (step.answerKind) {
      case _DTO_enums_calculatorAnswerKind__WEBPACK_IMPORTED_MODULE_0__.CalculatorAnswerKind.Choice:
        {
          if (!this.optionId) {
            this.error = 'Выберите вариант';
            return null;
          }
          return {
            ...base,
            optionId: this.optionId
          };
        }
      case _DTO_enums_calculatorAnswerKind__WEBPACK_IMPORTED_MODULE_0__.CalculatorAnswerKind.ChoiceMultiple:
        if (step.isRequired && this.optionIds.length === 0) {
          this.error = 'Выберите хотя бы один вариант';
          return null;
        }
        return {
          ...base,
          optionIds: [...this.optionIds]
        };
      case _DTO_enums_calculatorAnswerKind__WEBPACK_IMPORTED_MODULE_0__.CalculatorAnswerKind.Number:
        {
          if (this.numberValue == null || Number.isNaN(this.numberValue)) {
            this.error = 'Укажите число';
            return null;
          }
          return {
            ...base,
            numberValue: this.numberValue
          };
        }
      case _DTO_enums_calculatorAnswerKind__WEBPACK_IMPORTED_MODULE_0__.CalculatorAnswerKind.Text:
        if (step.isRequired && !this.textValue.trim()) {
          this.error = 'Напишите ответ';
          return null;
        }
        return {
          ...base,
          textValue: this.textValue.trim()
        };
      default:
        this.error = 'Неизвестный шаг';
        return null;
    }
  }
  hydrateDraft(step) {
    this.optionId = step.options.find(item => item.isDefault)?.id ?? null;
    this.optionIds = [];
    this.numberValue = step.defaultValue ?? null;
    this.textValue = '';
  }
  hydrateFromAnswer(step, answer) {
    this.optionId = answer.optionId ?? null;
    this.optionIds = answer.optionIds ?? [];
    this.numberValue = answer.numberValue ?? step.minValue ?? null;
    this.textValue = answer.textValue ?? '';
  }
  resetLocal() {
    this.state = null;
    this.token = null;
    this.error = null;
    this.busy = false;
    this.brokenImages.clear();
    this.history = [];
    this.viewingResult = true;
    this.leadName = '';
    this.leadPhone = '';
    this.leadCity = '';
    this.leadComment = '';
    this.consentAccepted = false;
  }
  fail(err) {
    this.busy = false;
    const http = err;
    const body = http?.error;
    this.error = body?.message || 'Сеть недоступна, попробуйте ещё раз';
    if (body?.code === 409 && this.state && this.token) {
      this.resume({
        quoteId: this.state.quoteId,
        token: this.token
      });
    }
  }
  requestId() {
    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_8__.isPlatformBrowser)(this.platformId) && typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return '00000000-0000-4000-8000-000000000000';
  }
  storageKey(id) {
    return `ow-calc-quote:${id}`;
  }
  readStored(id) {
    try {
      const raw = sessionStorage.getItem(this.storageKey(id));
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (!parsed?.quoteId || !parsed?.token) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }
  writeStored(id, value) {
    sessionStorage.setItem(this.storageKey(id), JSON.stringify(value));
  }
  clearStored(id) {
    sessionStorage.removeItem(this.storageKey(id));
  }
}
_CalculatorPlayerComponent = CalculatorPlayerComponent;
_CalculatorPlayerComponent.ɵfac = function CalculatorPlayerComponent_Factory(t) {
  return new (t || _CalculatorPlayerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_calculator_service__WEBPACK_IMPORTED_MODULE_4__.CalculatorService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_analytics_service__WEBPACK_IMPORTED_MODULE_5__.AnalyticsService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.PLATFORM_ID));
};
_CalculatorPlayerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _CalculatorPlayerComponent,
  selectors: [["app-calculator-player"]],
  inputs: {
    profileId: "profileId",
    connection: "connection",
    offerId: "offerId"
  },
  outputs: {
    bookMeasurement: "bookMeasurement"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵNgOnChangesFeature"]],
  decls: 1,
  vars: 1,
  consts: [["class", "calc", "id", "promo-calc", 4, "ngIf"], ["id", "promo-calc", 1, "calc"], [1, "calc__top"], ["type", "button", 1, "calc__back", 3, "disabled", "click"], [1, "calc__kicker"], [4, "ngIf"], ["class", "calc__kicker", 4, "ngIf"], ["class", "calc__hero", 3, "src", "alt", "error", 4, "ngIf"], [1, "calc__title"], ["class", "calc__lead", 4, "ngIf"], ["class", "calc__field", 4, "ngIf"], ["class", "calc__options", 4, "ngIf"], ["class", "calc__lead", "aria-live", "polite", 4, "ngIf"], ["class", "calc__error", 4, "ngIf"], ["type", "button", 1, "calc__next", 3, "disabled", "click"], [1, "calc__hero", 3, "src", "alt", "error"], [1, "calc__lead"], [1, "calc__field"], ["type", "number", "name", "calcNumber", 3, "min", "max", "step", "placeholder", "ngModel", "ngModelChange"], ["rows", "3", "name", "calcText", 3, "ngModel", "ngModelChange"], [1, "calc__options"], ["type", "button", "class", "calc__option", 3, "calc__option--on", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "calc__option", 3, "click"], ["class", "calc__option-img", 3, "src", "alt", "error", 4, "ngIf"], ["class", "calc__option-img--empty", "aria-hidden", "true", 4, "ngIf"], [1, "calc__option-img", 3, "src", "alt", "error"], ["aria-hidden", "true", 1, "calc__option-img--empty"], ["aria-live", "polite", 1, "calc__lead"], [1, "calc__error"], ["class", "calc__sum", 4, "ngIf"], ["class", "calc__rows", 4, "ngIf"], ["class", "calc__ok", 4, "ngIf"], [1, "calc__sum"], [1, "calc__rows"], [4, "ngFor", "ngForOf"], [1, "calc__ok"], ["type", "text", "name", "leadName", "autocomplete", "name", 3, "ngModel", "ngModelChange"], ["type", "tel", "name", "leadPhone", "autocomplete", "tel", 3, "ngModel", "ngModelChange"], ["type", "text", "name", "leadCity", 3, "ngModel", "ngModelChange"], ["rows", "2", "name", "leadComment", 3, "ngModel", "ngModelChange"], [1, "calc__consent"], ["type", "checkbox", "name", "consent", 3, "ngModel", "ngModelChange"], ["type", "button", 1, "calc__cta", 3, "disabled", "click"], ["type", "button", "class", "calc__ghost", 3, "click", 4, "ngIf"], ["type", "button", 1, "calc__ghost", 3, "click"]],
  template: function CalculatorPlayerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, CalculatorPlayerComponent_section_0_Template, 8, 4, "section", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.connection);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.CheckboxControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.MaxValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel],
  styles: ["[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n\n.calc[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  padding: 20px 16px 24px;\n  border-radius: 24px;\n  background: #fff;\n  box-shadow: 0 10px 32px rgba(4, 60, 72, 0.08);\n}\n\n.calc__top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.calc__back[_ngcontent-%COMP%], .calc__next[_ngcontent-%COMP%], .calc__cta[_ngcontent-%COMP%] {\n  min-height: 48px;\n  border: 0;\n  border-radius: 999px;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n\n.calc__back[_ngcontent-%COMP%] {\n  padding: 0 16px;\n  background: #fff;\n  color: #043c48;\n  box-shadow: inset 0 0 0 1px rgba(4, 60, 72, 0.14);\n}\n\n.calc__back[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.calc__kicker[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #9196a4;\n  font-size: 13px;\n}\n\n.calc__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 22px;\n  font-weight: 700;\n  line-height: 1.25;\n  color: #043c48;\n}\n\n.calc__lead[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #23262f;\n  font-size: 15px;\n  line-height: 1.45;\n}\n\n.calc__hero[_ngcontent-%COMP%], .calc__option-img[_ngcontent-%COMP%], .calc__option-img--empty[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  border-radius: 16px;\n  object-fit: cover;\n  background: #eef3f4;\n}\n\n.calc__hero[_ngcontent-%COMP%] {\n  max-height: 180px;\n}\n\n.calc__field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  font-weight: 700;\n  color: #043c48;\n}\n\n.calc__field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .calc__field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  min-height: 48px;\n  padding: 12px 14px;\n  border: 1px solid #dde2ed;\n  border-radius: 14px;\n  font: inherit;\n  font-weight: 500;\n}\n\n.calc__options[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n}\n\n.calc__option[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 72px 1fr;\n  gap: 12px;\n  align-items: center;\n  min-height: 72px;\n  padding: 8px;\n  border: 0;\n  border-radius: 16px;\n  background: #fafafc;\n  box-shadow: inset 0 0 0 1px rgba(4, 60, 72, 0.08);\n  text-align: left;\n  font: inherit;\n  cursor: pointer;\n}\n\n.calc__option--on[_ngcontent-%COMP%] {\n  background: #e7f4f4;\n  box-shadow: inset 0 0 0 2px #1f8f8f;\n}\n\n.calc__option-img[_ngcontent-%COMP%], .calc__option-img--empty[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 12px;\n}\n\n.calc__option-img--empty[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #e7f4f4, #d9ecec);\n}\n\n.calc__option[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  color: #043c48;\n}\n\n.calc__option[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #9196a4;\n  font-size: 13px;\n}\n\n.calc__error[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #d46c54;\n  font-size: 14px;\n}\n\n.calc__next[_ngcontent-%COMP%], .calc__cta[_ngcontent-%COMP%] {\n  min-height: 56px;\n  background: linear-gradient(180deg, #0d94a0, #006174);\n  color: #fff;\n  box-shadow: 0 10px 20px rgba(13, 148, 160, 0.28);\n}\n\n.calc__next[_ngcontent-%COMP%]:disabled, .calc__cta[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: default;\n}\n\n.calc__next[_ngcontent-%COMP%]:active, .calc__cta[_ngcontent-%COMP%]:active, .calc__option[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n\n.calc__sum[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 32px;\n  font-weight: 800;\n  color: #006174;\n}\n\n.calc__rows[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.calc__rows[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  color: #23262f;\n}\n\n.calc__consent[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: flex-start;\n  font-size: 13px;\n  line-height: 1.4;\n  color: #23262f;\n}\n\n.calc__ghost[_ngcontent-%COMP%] {\n  min-height: 56px;\n  border: 0;\n  border-radius: 999px;\n  background: #fff;\n  color: #043c48;\n  box-shadow: inset 0 0 0 1px rgba(4, 60, 72, 0.14);\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n\n.calc__ok[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 12px 14px;\n  border-radius: 14px;\n  background: #eef8ee;\n  color: #4fb229;\n  font-weight: 700;\n}\n\n@media (min-width: 768px) {\n  .calc[_ngcontent-%COMP%] {\n    padding: 28px;\n    gap: 18px;\n  }\n  .calc__options[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n  .calc__title[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .calc__next[_ngcontent-%COMP%]:active, .calc__cta[_ngcontent-%COMP%]:active, .calc__option[_ngcontent-%COMP%]:active {\n    transform: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGN1bGF0b3ItcGxheWVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNkNBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsU0FBQTtBQUNGOztBQUVBOzs7RUFHRSxnQkFBQTtFQUNBLFNBQUE7RUFDQSxvQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxpREFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLFNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBO0VBQ0UsU0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsU0FBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTs7O0VBR0UsY0FBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBOztFQUVFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsU0FBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLCtCQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpREFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0VBQ0EsbUNBQUE7QUFDRjs7QUFFQTs7RUFFRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxxREFBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxTQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTs7RUFFRSxnQkFBQTtFQUNBLHFEQUFBO0VBQ0EsV0FBQTtFQUNBLGdEQUFBO0FBQ0Y7O0FBRUE7O0VBRUUsYUFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTs7O0VBR0Usc0JBQUE7QUFDRjs7QUFFQTtFQUNFLFNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsU0FBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxTQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxpREFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLFNBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLFNBQUE7RUFDRjtFQUVBO0lBQ0UsOEJBQUE7RUFBRjtFQUdBO0lBQ0UsZUFBQTtFQURGO0FBQ0Y7QUFJQTtFQUNFOzs7SUFHRSxlQUFBO0VBRkY7QUFDRiIsImZpbGUiOiJjYWxjdWxhdG9yLXBsYXllci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uY2FsYyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMTZweDtcbiAgcGFkZGluZzogMjBweCAxNnB4IDI0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDI0cHg7XG4gIGJhY2tncm91bmQ6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTBweCAzMnB4IHJnYmEoNCwgNjAsIDcyLCAuMDgpO1xufVxuXG4uY2FsY19fdG9wIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEycHg7XG59XG5cbi5jYWxjX19iYWNrLFxuLmNhbGNfX25leHQsXG4uY2FsY19fY3RhIHtcbiAgbWluLWhlaWdodDogNDhweDtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgZm9udDogaW5oZXJpdDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uY2FsY19fYmFjayB7XG4gIHBhZGRpbmc6IDAgMTZweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMwNDNjNDg7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDFweCByZ2JhKDQsIDYwLCA3MiwgLjE0KTtcbn1cblxuLmNhbGNfX2JhY2s6ZGlzYWJsZWQge1xuICBvcGFjaXR5OiAuNDtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uY2FsY19fa2lja2VyIHtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogIzkxOTZhNDtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4uY2FsY19fdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGluZS1oZWlnaHQ6IDEuMjU7XG4gIGNvbG9yOiAjMDQzYzQ4O1xufVxuXG4uY2FsY19fbGVhZCB7XG4gIG1hcmdpbjogMDtcbiAgY29sb3I6ICMyMzI2MmY7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgbGluZS1oZWlnaHQ6IDEuNDU7XG59XG5cbi5jYWxjX19oZXJvLFxuLmNhbGNfX29wdGlvbi1pbWcsXG4uY2FsY19fb3B0aW9uLWltZy0tZW1wdHkge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xuICBiYWNrZ3JvdW5kOiAjZWVmM2Y0O1xufVxuXG4uY2FsY19faGVybyB7XG4gIG1heC1oZWlnaHQ6IDE4MHB4O1xufVxuXG4uY2FsY19fZmllbGQge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDhweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICMwNDNjNDg7XG59XG5cbi5jYWxjX19maWVsZCBpbnB1dCxcbi5jYWxjX19maWVsZCB0ZXh0YXJlYSB7XG4gIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gIHBhZGRpbmc6IDEycHggMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZTJlZDtcbiAgYm9yZGVyLXJhZGl1czogMTRweDtcbiAgZm9udDogaW5oZXJpdDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLmNhbGNfX29wdGlvbnMge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDEwcHg7XG59XG5cbi5jYWxjX19vcHRpb24ge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDcycHggMWZyO1xuICBnYXA6IDEycHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDcycHg7XG4gIHBhZGRpbmc6IDhweDtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZjO1xuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxcHggcmdiYSg0LCA2MCwgNzIsIC4wOCk7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmNhbGNfX29wdGlvbi0tb24ge1xuICBiYWNrZ3JvdW5kOiAjZTdmNGY0O1xuICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAycHggIzFmOGY4Zjtcbn1cblxuLmNhbGNfX29wdGlvbi1pbWcsXG4uY2FsY19fb3B0aW9uLWltZy0tZW1wdHkge1xuICB3aWR0aDogNzJweDtcbiAgaGVpZ2h0OiA3MnB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xufVxuXG4uY2FsY19fb3B0aW9uLWltZy0tZW1wdHkge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZTdmNGY0LCAjZDllY2VjKTtcbn1cblxuLmNhbGNfX29wdGlvbiBzdHJvbmcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgY29sb3I6ICMwNDNjNDg7XG59XG5cbi5jYWxjX19vcHRpb24gc3BhbiB7XG4gIGNvbG9yOiAjOTE5NmE0O1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5jYWxjX19lcnJvciB7XG4gIG1hcmdpbjogMDtcbiAgY29sb3I6ICNkNDZjNTQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmNhbGNfX25leHQsXG4uY2FsY19fY3RhIHtcbiAgbWluLWhlaWdodDogNTZweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzBkOTRhMCwgIzAwNjE3NCk7XG4gIGNvbG9yOiAjZmZmO1xuICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2JhKDEzLCAxNDgsIDE2MCwgLjI4KTtcbn1cblxuLmNhbGNfX25leHQ6ZGlzYWJsZWQsXG4uY2FsY19fY3RhOmRpc2FibGVkIHtcbiAgb3BhY2l0eTogLjU1O1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi5jYWxjX19uZXh0OmFjdGl2ZSxcbi5jYWxjX19jdGE6YWN0aXZlLFxuLmNhbGNfX29wdGlvbjphY3RpdmUge1xuICB0cmFuc2Zvcm06IHNjYWxlKC45OCk7XG59XG5cbi5jYWxjX19zdW0ge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMzJweDtcbiAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgY29sb3I6ICMwMDYxNzQ7XG59XG5cbi5jYWxjX19yb3dzIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbn1cblxuLmNhbGNfX3Jvd3MgbGkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgY29sb3I6ICMyMzI2MmY7XG59XG5cbi5jYWxjX19jb25zZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxMHB4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBsaW5lLWhlaWdodDogMS40O1xuICBjb2xvcjogIzIzMjYyZjtcbn1cblxuLmNhbGNfX2dob3N0IHtcbiAgbWluLWhlaWdodDogNTZweDtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgY29sb3I6ICMwNDNjNDg7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDFweCByZ2JhKDQsIDYwLCA3MiwgLjE0KTtcbiAgZm9udDogaW5oZXJpdDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uY2FsY19fb2sge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDEycHggMTRweDtcbiAgYm9yZGVyLXJhZGl1czogMTRweDtcbiAgYmFja2dyb3VuZDogI2VlZjhlZTtcbiAgY29sb3I6ICM0ZmIyMjk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuY2FsYyB7XG4gICAgcGFkZGluZzogMjhweDtcbiAgICBnYXA6IDE4cHg7XG4gIH1cblxuICAuY2FsY19fb3B0aW9ucyB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICB9XG5cbiAgLmNhbGNfX3RpdGxlIHtcbiAgICBmb250LXNpemU6IDI2cHg7XG4gIH1cbn1cblxuQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgLmNhbGNfX25leHQ6YWN0aXZlLFxuICAuY2FsY19fY3RhOmFjdGl2ZSxcbiAgLmNhbGNfX29wdGlvbjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgfVxufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcHJvZmlsZS1iYS9jb21wb25lbnRzL2NhbGN1bGF0b3ItcGxheWVyL2NhbGN1bGF0b3ItcGxheWVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtFQUNBLFdBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNkNBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsU0FBQTtBQUNGOztBQUVBOzs7RUFHRSxnQkFBQTtFQUNBLFNBQUE7RUFDQSxvQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxpREFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLFNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBO0VBQ0UsU0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsU0FBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTs7O0VBR0UsY0FBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBOztFQUVFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsU0FBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLCtCQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpREFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0VBQ0EsbUNBQUE7QUFDRjs7QUFFQTs7RUFFRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxxREFBQTtBQUNGOztBQUVBO0VBQ0UsY0FBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxTQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTs7RUFFRSxnQkFBQTtFQUNBLHFEQUFBO0VBQ0EsV0FBQTtFQUNBLGdEQUFBO0FBQ0Y7O0FBRUE7O0VBRUUsYUFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTs7O0VBR0Usc0JBQUE7QUFDRjs7QUFFQTtFQUNFLFNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsU0FBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxTQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxpREFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLFNBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLFNBQUE7RUFDRjtFQUVBO0lBQ0UsOEJBQUE7RUFBRjtFQUdBO0lBQ0UsZUFBQTtFQURGO0FBQ0Y7QUFJQTtFQUNFOzs7SUFHRSxlQUFBO0VBRkY7QUFDRjtBQUNBLDRoUEFBNGhQIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5jYWxjIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ2FwOiAxNnB4O1xuICBwYWRkaW5nOiAyMHB4IDE2cHggMjRweDtcbiAgYm9yZGVyLXJhZGl1czogMjRweDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCAxMHB4IDMycHggcmdiYSg0LCA2MCwgNzIsIC4wOCk7XG59XG5cbi5jYWxjX190b3Age1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbn1cblxuLmNhbGNfX2JhY2ssXG4uY2FsY19fbmV4dCxcbi5jYWxjX19jdGEge1xuICBtaW4taGVpZ2h0OiA0OHB4O1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBmb250OiBpbmhlcml0O1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5jYWxjX19iYWNrIHtcbiAgcGFkZGluZzogMCAxNnB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzA0M2M0ODtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMXB4IHJnYmEoNCwgNjAsIDcyLCAuMTQpO1xufVxuXG4uY2FsY19fYmFjazpkaXNhYmxlZCB7XG4gIG9wYWNpdHk6IC40O1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi5jYWxjX19raWNrZXIge1xuICBtYXJnaW46IDA7XG4gIGNvbG9yOiAjOTE5NmE0O1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5jYWxjX190aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICBsaW5lLWhlaWdodDogMS4yNTtcbiAgY29sb3I6ICMwNDNjNDg7XG59XG5cbi5jYWxjX19sZWFkIHtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogIzIzMjYyZjtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBsaW5lLWhlaWdodDogMS40NTtcbn1cblxuLmNhbGNfX2hlcm8sXG4uY2FsY19fb3B0aW9uLWltZyxcbi5jYWxjX19vcHRpb24taW1nLS1lbXB0eSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIGJhY2tncm91bmQ6ICNlZWYzZjQ7XG59XG5cbi5jYWxjX19oZXJvIHtcbiAgbWF4LWhlaWdodDogMTgwcHg7XG59XG5cbi5jYWxjX19maWVsZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogOHB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogIzA0M2M0ODtcbn1cblxuLmNhbGNfX2ZpZWxkIGlucHV0LFxuLmNhbGNfX2ZpZWxkIHRleHRhcmVhIHtcbiAgbWluLWhlaWdodDogNDhweDtcbiAgcGFkZGluZzogMTJweCAxNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjZGRlMmVkO1xuICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICBmb250OiBpbmhlcml0O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4uY2FsY19fb3B0aW9ucyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMTBweDtcbn1cblxuLmNhbGNfX29wdGlvbiB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNzJweCAxZnI7XG4gIGdhcDogMTJweDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogNzJweDtcbiAgcGFkZGluZzogOHB4O1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmM7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDFweCByZ2JhKDQsIDYwLCA3MiwgLjA4KTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZm9udDogaW5oZXJpdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uY2FsY19fb3B0aW9uLS1vbiB7XG4gIGJhY2tncm91bmQ6ICNlN2Y0ZjQ7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDJweCAjMWY4ZjhmO1xufVxuXG4uY2FsY19fb3B0aW9uLWltZyxcbi5jYWxjX19vcHRpb24taW1nLS1lbXB0eSB7XG4gIHdpZHRoOiA3MnB4O1xuICBoZWlnaHQ6IDcycHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG59XG5cbi5jYWxjX19vcHRpb24taW1nLS1lbXB0eSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNlN2Y0ZjQsICNkOWVjZWMpO1xufVxuXG4uY2FsY19fb3B0aW9uIHN0cm9uZyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBjb2xvcjogIzA0M2M0ODtcbn1cblxuLmNhbGNfX29wdGlvbiBzcGFuIHtcbiAgY29sb3I6ICM5MTk2YTQ7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLmNhbGNfX2Vycm9yIHtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogI2Q0NmM1NDtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uY2FsY19fbmV4dCxcbi5jYWxjX19jdGEge1xuICBtaW4taGVpZ2h0OiA1NnB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGQ5NGEwLCAjMDA2MTc0KTtcbiAgY29sb3I6ICNmZmY7XG4gIGJveC1zaGFkb3c6IDAgMTBweCAyMHB4IHJnYmEoMTMsIDE0OCwgMTYwLCAuMjgpO1xufVxuXG4uY2FsY19fbmV4dDpkaXNhYmxlZCxcbi5jYWxjX19jdGE6ZGlzYWJsZWQge1xuICBvcGFjaXR5OiAuNTU7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLmNhbGNfX25leHQ6YWN0aXZlLFxuLmNhbGNfX2N0YTphY3RpdmUsXG4uY2FsY19fb3B0aW9uOmFjdGl2ZSB7XG4gIHRyYW5zZm9ybTogc2NhbGUoLjk4KTtcbn1cblxuLmNhbGNfX3N1bSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAzMnB4O1xuICBmb250LXdlaWdodDogODAwO1xuICBjb2xvcjogIzAwNjE3NDtcbn1cblxuLmNhbGNfX3Jvd3Mge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBsaXN0LXN0eWxlOiBub25lO1xufVxuXG4uY2FsY19fcm93cyBsaSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMnB4O1xuICBjb2xvcjogIzIzMjYyZjtcbn1cblxuLmNhbGNfX2NvbnNlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDEwcHg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gIGNvbG9yOiAjMjMyNjJmO1xufVxuXG4uY2FsY19fZ2hvc3Qge1xuICBtaW4taGVpZ2h0OiA1NnB4O1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBjb2xvcjogIzA0M2M0ODtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgMXB4IHJnYmEoNCwgNjAsIDcyLCAuMTQpO1xuICBmb250OiBpbmhlcml0O1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5jYWxjX19vayB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMTJweCAxNHB4O1xuICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICBiYWNrZ3JvdW5kOiAjZWVmOGVlO1xuICBjb2xvcjogIzRmYjIyOTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5jYWxjIHtcbiAgICBwYWRkaW5nOiAyOHB4O1xuICAgIGdhcDogMThweDtcbiAgfVxuXG4gIC5jYWxjX19vcHRpb25zIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG4gIH1cblxuICAuY2FsY19fdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMjZweDtcbiAgfVxufVxuXG5AbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAuY2FsY19fbmV4dDphY3RpdmUsXG4gIC5jYWxjX19jdGE6YWN0aXZlLFxuICAuY2FsY19fb3B0aW9uOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBub25lO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 1420:
/*!****************************************!*\
  !*** ./src/enviroments/environment.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBiOQ4X8q8Kf5UHwTq_TaRSTb9j0xClRJs",
    authDomain: "ocpio-311510.firebaseapp.com",
    projectId: "ocpio-311510",
    storageBucket: "ocpio-311510.appspot.com",
    messagingSenderId: "625145012665",
    appId: "1:625145012665:web:b19feea8ea4bd2679fd668",
    measurementId: "G-T8F0R2G5YN"
  },
  domain: 'localhost',
  /** Канонический origin сайта — см. комментарий в environment.prod.ts. */
  siteUrl: 'https://onwaves.online',
  TEXT_LENGTH: 1000,
  /** Канал Telegram для напоминаний о записях (модалка при ответе 202). Замените на свой t.me/... */
  telegramChannelUrl: 'https://t.me/onwaves',
  Uri: 'https://localhost:5001/v1/api/',
  hubUri: 'http://localhost:5000/',
  UriFoto: 'https://localhost:5001/v1/api/',
  UriAI: 'http://127.0.0.1:8000/api/',
  publicKey: "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo"
  //  Uri: 'https://onwaves-server.online/v1/api/',
  //  UriFoto: 'https://onwaves-server.online/v1/api/',
  //  hubUri: 'https://onwaves-server.online/',
  //  UriAI: 'https://onwaves-server.online/flask-api/api/'
  //      Uri: 'https://81.177.175.185/ocpio-api/v1/api/',
  //  UriFoto: 'https://ocpio-server.ru/v1/api/',
  //  hubUri: 'https://81.177.175.185/ocpio-api/',
  //  UriAI: 'https://ocpio-server.ru/flask-api/api/'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 1804:
/*!*******************************************!*\
  !*** ./src/services/analytics.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalyticsService: () => (/* binding */ AnalyticsService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 6575);
var _AnalyticsService;



class AnalyticsService {
  constructor(platformId) {
    this.platformId = platformId;
    this.yandexId = 102514111;
    this.mailRuId = '3792159';
    /** Ключ последнего отправленного хита — защита от подряд идущих дублей
     *  (initial-хит + NavigationEnd, повторные эмиты подписок и т.п.). */
    this.lastHit = '';
  }
  /**
   * Отправляет просмотр страницы в Яндекс.Метрику и Top.Mail.Ru (VK Ads).
   * ВАЖНО: title передаём явно — для SPA заголовок выставляется JS-ом
   * асинхронно, и без явной передачи Метрика запишет стухший document.title.
   * Счётчики инициализируются без авто-хита (index.html), поэтому все просмотры
   * идут только отсюда — двойного счёта с init нет.
   */
  trackPage(path, title) {
    if (!(0,_angular_common__WEBPACK_IMPORTED_MODULE_0__.isPlatformBrowser)(this.platformId)) return;
    const key = `${path}|${title ?? ''}`;
    if (key === this.lastHit) return;
    this.lastHit = key;
    if (window.ym) {
      if (title) {
        window.ym(this.yandexId, 'hit', path, {
          title
        });
      } else {
        window.ym(this.yandexId, 'hit', path);
      }
    }
    if (window._tmr) {
      window._tmr.push({
        id: this.mailRuId,
        type: 'pageView',
        start: Date.now()
      });
    }
  }
  trackEvent(category, action, label, value) {
    if (!(0,_angular_common__WEBPACK_IMPORTED_MODULE_0__.isPlatformBrowser)(this.platformId)) return;
    if (window.ym) {
      window.ym(this.yandexId, 'reachGoal', action, {
        category,
        label,
        value
      });
    }
    if (window._tmr) {
      const payload = {
        id: this.mailRuId,
        type: 'reachGoal',
        goal: action
      };
      if (value != null) {
        payload['value'] = value;
      }
      window._tmr.push(payload);
    }
  }
}
_AnalyticsService = AnalyticsService;
_AnalyticsService.ɵfac = function AnalyticsService_Factory(t) {
  return new (t || _AnalyticsService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_ID));
};
_AnalyticsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _AnalyticsService,
  factory: _AnalyticsService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 9838:
/*!********************************************!*\
  !*** ./src/services/calculator.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalculatorService: () => (/* binding */ CalculatorService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var _enviroments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enviroments/environment */ 1420);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
var _CalculatorService;





const TOKEN_HEADER = 'X-Quote-Token';
class CalculatorService {
  constructor(http) {
    this.http = http;
    this.url = _enviroments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.Uri + 'calculators/';
  }
  getByProfile(profileId) {
    return this.http.get(`${this.url}by-profile/${profileId}`).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(res => res.code === 200 ? res.data ?? [] : []));
  }
  startQuote(profileCalculatorId, requestId) {
    return this.http.post(`${this.url}quotes`, {
      profileCalculatorId,
      requestId
    });
  }
  getQuote(quoteId, token) {
    return this.http.get(`${this.url}quotes/${quoteId}`, {
      headers: this.tokenHeaders(token)
    });
  }
  putAnswer(quoteId, stepId, token, expectedRevision, requestId, answer) {
    return this.http.put(`${this.url}quotes/${quoteId}/answers/${stepId}`, {
      expectedRevision,
      requestId,
      answer
    }, {
      headers: this.tokenHeaders(token)
    });
  }
  submitLead(quoteId, token, expectedRevision, requestId, body) {
    return this.http.post(`${this.url}quotes/${quoteId}/leads`, {
      expectedRevision,
      requestId,
      ...body
    }, {
      headers: this.tokenHeaders(token)
    });
  }
  asState(res) {
    if (res.code !== 200 || !res.data) {
      return null;
    }
    return res.data;
  }
  tokenHeaders(token) {
    return new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders().set(TOKEN_HEADER, token);
  }
}
_CalculatorService = CalculatorService;
_CalculatorService.ɵfac = function CalculatorService_Factory(t) {
  return new (t || _CalculatorService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
};
_CalculatorService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _CalculatorService,
  factory: _CalculatorService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 6175:
/*!******************************************!*\
  !*** ./tools/calculator-preview/main.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _angular_compiler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/compiler */ 7178);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _src_app_profile_ba_components_calculator_player_calculator_player_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/app/profile-ba/components/calculator-player/calculator-player.component */ 2754);
/* harmony import */ var _src_services_calculator_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/services/calculator.service */ 9838);
/* harmony import */ var _src_services_analytics_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../src/services/analytics.service */ 1804);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
var _PreviewComponent, _PreviewModule;










class PreviewComponent {
  constructor(api) {
    this.connection = null;
    api.getByProfile('14d9565a-6f4c-424e-b680-a50d8b47d369').subscribe(items => this.connection = items[0]);
  }
}
_PreviewComponent = PreviewComponent;
_PreviewComponent.ɵfac = function PreviewComponent_Factory(t) {
  return new (t || _PreviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_src_services_calculator_service__WEBPACK_IMPORTED_MODULE_2__.CalculatorService));
};
_PreviewComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _PreviewComponent,
  selectors: [["app-root"]],
  decls: 4,
  vars: 1,
  consts: [[3, "connection"]],
  template: function PreviewComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "main")(1, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0442\u0435\u043D\u0434 \u00B7 \u0442\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0441\u0442\u0430\u0432\u043A\u0438 100 \u20BD \u0437\u0430 \u0435\u0434\u0438\u043D\u0438\u0446\u0443");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "app-calculator-player", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("connection", ctx.connection);
    }
  },
  dependencies: function () {
    return [_src_app_profile_ba_components_calculator_player_calculator_player_component__WEBPACK_IMPORTED_MODULE_1__.CalculatorPlayerComponent];
  },
  styles: ["main[_ngcontent-%COMP%] { max-width: 900px; margin: 24px auto; padding: 0 12px; }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUiLCJmaWxlIjoibWFpbi50cyIsInNvdXJjZXNDb250ZW50IjpbIm1haW4geyBtYXgtd2lkdGg6IDkwMHB4OyBtYXJnaW46IDI0cHggYXV0bzsgcGFkZGluZzogMCAxMnB4OyB9Il19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3Rvb2xzL2NhbGN1bGF0b3ItcHJldmlldy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFO0FBQzdELG9VQUFvVSIsInNvdXJjZXNDb250ZW50IjpbIm1haW4geyBtYXgtd2lkdGg6IDkwMHB4OyBtYXJnaW46IDI0cHggYXV0bzsgcGFkZGluZzogMCAxMnB4OyB9Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
});
class PreviewModule {}
_PreviewModule = PreviewModule;
_PreviewModule.ɵfac = function PreviewModule_Factory(t) {
  return new (t || _PreviewModule)();
};
_PreviewModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _PreviewModule,
  bootstrap: [PreviewComponent]
});
_PreviewModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  providers: [{
    provide: _src_services_analytics_service__WEBPACK_IMPORTED_MODULE_3__.AnalyticsService,
    useValue: {
      trackEvent: () => undefined
    }
  }, {
    provide: _src_services_calculator_service__WEBPACK_IMPORTED_MODULE_2__.CalculatorService,
    deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient],
    useFactory: http => {
      const api = new _src_services_calculator_service__WEBPACK_IMPORTED_MODULE_2__.CalculatorService(http);
      Object.assign(api, {
        url: '/v1/api/calculators/'
      });
      return api;
    }
  }],
  imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](PreviewModule, {
    declarations: [PreviewComponent, _src_app_profile_ba_components_calculator_player_calculator_player_component__WEBPACK_IMPORTED_MODULE_1__.CalculatorPlayerComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule]
  });
})();
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.platformBrowser().bootstrapModule(PreviewModule).catch(error => console.error(error));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(6175)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map