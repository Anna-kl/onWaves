"use strict";
(self["webpackChunkMainSiteOcpio"] = self["webpackChunkMainSiteOcpio"] || []).push([["src_app_static_static_module_ts"],{

/***/ 47094:
/*!*********************************************!*\
  !*** ./src/app/DTO/enums/consentChannel.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConsentChannel: () => (/* binding */ ConsentChannel)
/* harmony export */ });
/** Соответствует DataModel.Enums.MessageType на бэке. Менять порядок значений нельзя. */
var ConsentChannel;
(function (ConsentChannel) {
  ConsentChannel[ConsentChannel["Sms"] = 0] = "Sms";
  ConsentChannel[ConsentChannel["Telegram"] = 1] = "Telegram";
  ConsentChannel[ConsentChannel["Push"] = 2] = "Push";
  ConsentChannel[ConsentChannel["Vk"] = 3] = "Vk";
  ConsentChannel[ConsentChannel["Email"] = 4] = "Email";
  ConsentChannel[ConsentChannel["Max"] = 5] = "Max";
})(ConsentChannel || (ConsentChannel = {}));

/***/ }),

/***/ 62653:
/*!***************************************************************!*\
  !*** ./src/app/common/faq-question/faq-question.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FaqQuestionComponent: () => (/* binding */ FaqQuestionComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 26575);
var _FaqQuestionComponent;


function FaqQuestionComponent_div_7_p_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", p_r4, " ");
  }
}
function FaqQuestionComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FaqQuestionComponent_div_7_p_1_Template, 2, 1, "p", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.content.paragraphs);
  }
}
function FaqQuestionComponent_ul_8_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r6, " ");
  }
}
function FaqQuestionComponent_ul_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FaqQuestionComponent_ul_8_li_1_Template, 2, 1, "li", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.content.list);
  }
}
function FaqQuestionComponent_div_9_div_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const img_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", img_r8.caption, " ");
  }
}
function FaqQuestionComponent_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, FaqQuestionComponent_div_9_div_1_div_2_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const img_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", img_r8.url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", img_r8.caption);
  }
}
function FaqQuestionComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, FaqQuestionComponent_div_9_div_1_Template, 3, 2, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.content.images);
  }
}
class FaqQuestionComponent {
  constructor() {
    this.isOpen = false;
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
_FaqQuestionComponent = FaqQuestionComponent;
_FaqQuestionComponent.ɵfac = function FaqQuestionComponent_Factory(t) {
  return new (t || _FaqQuestionComponent)();
};
_FaqQuestionComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _FaqQuestionComponent,
  selectors: [["app-faq-question"]],
  inputs: {
    question: "question",
    content: "content"
  },
  decls: 10,
  vars: 10,
  consts: [[1, "faq-item"], [1, "faq-header", 3, "click"], [1, "question"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", 1, "icon"], ["d", "M6 9l6 6 6-6", "stroke", "currentColor", "stroke-width", "2", "fill", "none", "stroke-linecap", "round"], [1, "faq-content"], ["class", "faq-text", 4, "ngIf"], ["class", "faq-list", 4, "ngIf"], ["class", "faq-gallery", 4, "ngIf"], [1, "faq-text"], [4, "ngFor", "ngForOf"], [1, "faq-list"], [1, "faq-gallery"], ["class", "image-card", 4, "ngFor", "ngForOf"], [1, "image-card"], ["alt", "Help image", 3, "src"], ["class", "caption", 4, "ngIf"], [1, "caption"]],
  template: function FaqQuestionComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FaqQuestionComponent_Template_div_click_1_listener() {
        return ctx.toggle();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "svg", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "path", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, FaqQuestionComponent_div_7_Template, 2, 1, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, FaqQuestionComponent_ul_8_Template, 2, 1, "ul", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, FaqQuestionComponent_div_9_Template, 2, 1, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("open", ctx.isOpen);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.question);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("rotate", ctx.isOpen);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("expanded", ctx.isOpen);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.content == null ? null : ctx.content.paragraphs);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.content == null ? null : ctx.content.list);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.content == null ? null : ctx.content.images == null ? null : ctx.content.images.length);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf],
  styles: [".faq-item[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border-radius: 18px;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);\n  margin-bottom: 18px;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n\n.faq-header[_ngcontent-%COMP%] {\n  padding: 22px 26px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  cursor: pointer;\n}\n\n.question[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 17px;\n}\n\n.icon[_ngcontent-%COMP%] {\n  transition: transform 0.3s ease;\n  color: #6b7280;\n}\n\n.icon.rotate[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n}\n\n.faq-content[_ngcontent-%COMP%] {\n  max-height: 0;\n  overflow: hidden;\n  transition: max-height 0.35s ease, padding 0.35s ease;\n  padding: 0 26px;\n}\n\n.faq-content.expanded[_ngcontent-%COMP%] {\n  max-height: 2000px;\n  padding: 0 26px 26px 26px;\n}\n\n\n\n.faq-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n  line-height: 1.6;\n  color: #4b5563;\n}\n\n\n\n.faq-list[_ngcontent-%COMP%] {\n  margin: 12px 0;\n  padding-left: 18px;\n  color: #4b5563;\n}\n\n.faq-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n}\n\n\n\n.faq-gallery[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}\n\n.image-card[_ngcontent-%COMP%] {\n  background: #f7f9ff;\n  padding: 12px;\n  border-radius: 14px;\n  text-align: center;\n}\n\n.image-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: 10px;\n  margin-bottom: 8px;\n}\n\n.caption[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #9ca3af;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhcS1xdWVzdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBO0VBQ0UsK0JBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSx5QkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLGdCQUFBO0VBQ0EscURBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLHlCQUFBO0FBQ0Y7O0FBRUEsU0FBQTtBQUNBO0VBQ0UsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQSxTQUFBO0FBQ0E7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtBQUNGOztBQUVBLFlBQUE7QUFDQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLDJEQUFBO0VBQ0EsU0FBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsV0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBQ0YiLCJmaWxlIjoiZmFxLXF1ZXN0aW9uLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZhcS1pdGVtIHtcclxuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG4gIGJvcmRlci1yYWRpdXM6IDE4cHg7XHJcbiAgYm94LXNoYWRvdzogMCAxMHB4IDQwcHggcmdiYSgwLDAsMCwwLjA1KTtcclxuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcclxufVxyXG5cclxuLmZhcS1oZWFkZXIge1xyXG4gIHBhZGRpbmc6IDIycHggMjZweDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLnF1ZXN0aW9uIHtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGZvbnQtc2l6ZTogMTdweDtcclxufVxyXG5cclxuLmljb24ge1xyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XHJcbiAgY29sb3I6ICM2YjcyODA7XHJcbn1cclxuXHJcbi5pY29uLnJvdGF0ZSB7XHJcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcclxufVxyXG5cclxuLmZhcS1jb250ZW50IHtcclxuICBtYXgtaGVpZ2h0OiAwO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjM1cyBlYXNlLCBwYWRkaW5nIDAuMzVzIGVhc2U7XHJcbiAgcGFkZGluZzogMCAyNnB4O1xyXG59XHJcblxyXG4uZmFxLWNvbnRlbnQuZXhwYW5kZWQge1xyXG4gIG1heC1oZWlnaHQ6IDIwMDBweDtcclxuICBwYWRkaW5nOiAwIDI2cHggMjZweCAyNnB4O1xyXG59XHJcblxyXG4vKiBURVhUICovXHJcbi5mYXEtdGV4dCBwIHtcclxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjY7XHJcbiAgY29sb3I6ICM0YjU1NjM7XHJcbn1cclxuXHJcbi8qIExJU1QgKi9cclxuLmZhcS1saXN0IHtcclxuICBtYXJnaW46IDEycHggMDtcclxuICBwYWRkaW5nLWxlZnQ6IDE4cHg7XHJcbiAgY29sb3I6ICM0YjU1NjM7XHJcbn1cclxuXHJcbi5mYXEtbGlzdCBsaSB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xyXG59XHJcblxyXG4vKiBHQUxMRVJZICovXHJcbi5mYXEtZ2FsbGVyeSB7XHJcbiAgbWFyZ2luLXRvcDogMThweDtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjQwcHgsIDFmcikpO1xyXG4gIGdhcDogMTZweDtcclxufVxyXG5cclxuLmltYWdlLWNhcmQge1xyXG4gIGJhY2tncm91bmQ6ICNmN2Y5ZmY7XHJcbiAgcGFkZGluZzogMTJweDtcclxuICBib3JkZXItcmFkaXVzOiAxNHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmltYWdlLWNhcmQgaW1nIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxufVxyXG5cclxuLmNhcHRpb24ge1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBjb2xvcjogIzljYTNhZjtcclxufSJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tbW9uL2ZhcS1xdWVzdGlvbi9mYXEtcXVlc3Rpb24uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMkNBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLCtCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLHFEQUFBO0VBQ0EsZUFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSx5QkFBQTtBQUNGOztBQUVBLFNBQUE7QUFDQTtFQUNFLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUEsU0FBQTtBQUNBO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7QUFDRjs7QUFFQSxZQUFBO0FBQ0E7RUFDRSxnQkFBQTtFQUNBLGFBQUE7RUFDQSwyREFBQTtFQUNBLFNBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQUNGO0FBQ0EsNGlHQUE0aUciLCJzb3VyY2VzQ29udGVudCI6WyIuZmFxLWl0ZW0ge1xyXG4gIGJhY2tncm91bmQ6ICNmZmZmZmY7XHJcbiAgYm9yZGVyLXJhZGl1czogMThweDtcclxuICBib3gtc2hhZG93OiAwIDEwcHggNDBweCByZ2JhKDAsMCwwLDAuMDUpO1xyXG4gIG1hcmdpbi1ib3R0b206IDE4cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xyXG59XHJcblxyXG4uZmFxLWhlYWRlciB7XHJcbiAgcGFkZGluZzogMjJweCAyNnB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4ucXVlc3Rpb24ge1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgZm9udC1zaXplOiAxN3B4O1xyXG59XHJcblxyXG4uaWNvbiB7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcclxuICBjb2xvcjogIzZiNzI4MDtcclxufVxyXG5cclxuLmljb24ucm90YXRlIHtcclxuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG59XHJcblxyXG4uZmFxLWNvbnRlbnQge1xyXG4gIG1heC1oZWlnaHQ6IDA7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB0cmFuc2l0aW9uOiBtYXgtaGVpZ2h0IDAuMzVzIGVhc2UsIHBhZGRpbmcgMC4zNXMgZWFzZTtcclxuICBwYWRkaW5nOiAwIDI2cHg7XHJcbn1cclxuXHJcbi5mYXEtY29udGVudC5leHBhbmRlZCB7XHJcbiAgbWF4LWhlaWdodDogMjAwMHB4O1xyXG4gIHBhZGRpbmc6IDAgMjZweCAyNnB4IDI2cHg7XHJcbn1cclxuXHJcbi8qIFRFWFQgKi9cclxuLmZhcS10ZXh0IHAge1xyXG4gIG1hcmdpbi1ib3R0b206IDEycHg7XHJcbiAgbGluZS1oZWlnaHQ6IDEuNjtcclxuICBjb2xvcjogIzRiNTU2MztcclxufVxyXG5cclxuLyogTElTVCAqL1xyXG4uZmFxLWxpc3Qge1xyXG4gIG1hcmdpbjogMTJweCAwO1xyXG4gIHBhZGRpbmctbGVmdDogMThweDtcclxuICBjb2xvcjogIzRiNTU2MztcclxufVxyXG5cclxuLmZhcS1saXN0IGxpIHtcclxuICBtYXJnaW4tYm90dG9tOiA2cHg7XHJcbn1cclxuXHJcbi8qIEdBTExFUlkgKi9cclxuLmZhcS1nYWxsZXJ5IHtcclxuICBtYXJnaW4tdG9wOiAxOHB4O1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyNDBweCwgMWZyKSk7XHJcbiAgZ2FwOiAxNnB4O1xyXG59XHJcblxyXG4uaW1hZ2UtY2FyZCB7XHJcbiAgYmFja2dyb3VuZDogI2Y3ZjlmZjtcclxuICBwYWRkaW5nOiAxMnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDE0cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uaW1hZ2UtY2FyZCBpbWcge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG59XHJcblxyXG4uY2FwdGlvbiB7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG4gIGNvbG9yOiAjOWNhM2FmO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 41758:
/*!**********************************************************************************************!*\
  !*** ./src/app/profile-user/settings/revoke-channel-modal/revoke-channel-modal.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RevokeChannelModalComponent: () => (/* binding */ RevokeChannelModalComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 76101);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 26575);
var _RevokeChannelModalComponent;



function RevokeChannelModalComponent_p_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" \u041E\u0442\u0437\u044B\u0432 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044F \u0443\u0434\u0430\u043B\u0438\u0442 \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0443 \u0432 ", ctx_r0.channelName, ". \u0427\u0442\u043E\u0431\u044B \u0441\u043D\u043E\u0432\u0430 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F, \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044F \u0431\u0443\u0434\u0435\u0442 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u2014 \u043F\u0440\u0438\u0434\u0451\u0442\u0441\u044F \u0437\u0430\u043D\u043E\u0432\u043E \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0431\u043E\u0442 \u0438 \u043D\u0430\u0436\u0430\u0442\u044C \u00AB\u0421\u0442\u0430\u0440\u0442\u00BB. ");
  }
}
function RevokeChannelModalComponent_p_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " \u0411\u0443\u0434\u0443\u0442 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u044B \u0432\u0441\u0435 \u043A\u0430\u043D\u0430\u043B\u044B \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439. \u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0438 \u0432 Telegram, MAX \u0438 \u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435 \u043F\u0440\u0438 \u044D\u0442\u043E\u043C \u0443\u0434\u0430\u043B\u044F\u044E\u0442\u0441\u044F: \u0447\u0442\u043E\u0431\u044B \u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0438\u0445, \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044F \u0431\u0443\u0434\u0435\u0442 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u2014 \u043F\u0440\u0438\u0434\u0451\u0442\u0441\u044F \u0437\u0430\u043D\u043E\u0432\u043E \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0431\u043E\u0442 \u0438 \u043D\u0430\u0436\u0430\u0442\u044C \u00AB\u0421\u0442\u0430\u0440\u0442\u00BB. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
/**
 * Подтверждение отзыва согласия для каналов с ботом (Telegram, VK, MAX).
 *
 * Бэкенд при отзыве согласия удаляет саму подписку (ChannelSubscriptionCleaner),
 * поэтому обратно тумблер канал уже не оживит: нужно заново открыть бот и
 * нажать «Старт». Действие необратимо в один клик — предупреждаем об этом до,
 * а не после.
 */
class RevokeChannelModalComponent {
  constructor(activeModal) {
    this.activeModal = activeModal;
    this.channelName = 'канал';
    /** Отписка сразу от всех каналов — текст другой, последствия те же. */
    this.bulk = false;
  }
}
_RevokeChannelModalComponent = RevokeChannelModalComponent;
_RevokeChannelModalComponent.ɵfac = function RevokeChannelModalComponent_Factory(t) {
  return new (t || _RevokeChannelModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__.NgbActiveModal));
};
_RevokeChannelModalComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _RevokeChannelModalComponent,
  selectors: [["app-revoke-channel-modal"]],
  inputs: {
    channelName: "channelName",
    bulk: "bulk"
  },
  decls: 10,
  vars: 4,
  consts: [[1, "revoke-modal"], [1, "revoke-modal__title"], ["class", "revoke-modal__text", 4, "ngIf"], [1, "revoke-modal__actions"], ["type", "button", 1, "revoke-modal__btn", "revoke-modal__btn--ghost", 3, "click"], ["type", "button", 1, "revoke-modal__btn", "revoke-modal__btn--danger", 3, "click"], [1, "revoke-modal__text"]],
  template: function RevokeChannelModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "h3", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, RevokeChannelModalComponent_p_3_Template, 2, 1, "p", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, RevokeChannelModalComponent_p_4_Template, 2, 0, "p", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3)(6, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RevokeChannelModalComponent_Template_button_click_6_listener() {
        return ctx.activeModal.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " \u041E\u0442\u043C\u0435\u043D\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RevokeChannelModalComponent_Template_button_click_8_listener() {
        return ctx.activeModal.close("revoke");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.bulk ? "\u041E\u0442\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043E\u0442 \u0432\u0441\u0435\u0445 \u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A?" : "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C " + ctx.channelName + "?", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.bulk);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.bulk);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.bulk ? "\u041E\u0442\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" : "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C", " ");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
  styles: ["@charset \"UTF-8\";\n\n\n\n\n.color-green-dark[_ngcontent-%COMP%] {\n  color: #043c48;\n}\n\n.background-green-dark[_ngcontent-%COMP%] {\n  background-color: #043c48;\n}\n\n.ico-background-green[_ngcontent-%COMP%] {\n  background-color: #006174;\n}\n\n.ico-background-green[_ngcontent-%COMP%]:hover {\n  background-color: #043c48;\n}\n\n.green-txt-hover[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n  display: inline-block;\n  color: #043c48;\n}\n\n\n\n.color-green-basic[_ngcontent-%COMP%] {\n  color: #006174;\n}\n\n.background-green-basic[_ngcontent-%COMP%] {\n  background-color: #006174;\n}\n\n\n\n.color-green-light[_ngcontent-%COMP%] {\n  color: #0d94a0;\n}\n\n.background-green-light[_ngcontent-%COMP%] {\n  background-color: #0d94a0;\n}\n\n\n\n.color-black[_ngcontent-%COMP%] {\n  color: #23262F;\n}\n\n.background-black[_ngcontent-%COMP%] {\n  background-color: #23262F;\n}\n\n\n\n\n\n.color-grey-dark[_ngcontent-%COMP%] {\n  color: #9196A4;\n}\n\n.background-grey-dark[_ngcontent-%COMP%] {\n  background-color: #9196A4;\n}\n\n\n\n.color-grey[_ngcontent-%COMP%] {\n  color: #DDE2ED;\n}\n\n.background-grey[_ngcontent-%COMP%] {\n  background-color: #DDE2ED;\n}\n\n\n\n.color-grey-light[_ngcontent-%COMP%] {\n  color: #FAFAFC;\n}\n\n.background-grey-light[_ngcontent-%COMP%] {\n  background-color: #FAFAFC;\n}\n\n\n\n.color-white[_ngcontent-%COMP%] {\n  color: #fff;\n}\n\n.background-white[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n\n\n\n.color-success[_ngcontent-%COMP%] {\n  color: #4FB229;\n}\n\n.background-success[_ngcontent-%COMP%] {\n  background-color: #4FB229;\n}\n\n\n\n.color-info[_ngcontent-%COMP%] {\n  color: #0A6ED8;\n}\n\n.background-info[_ngcontent-%COMP%] {\n  background-color: #0A6ED8;\n}\n\n\n\n.color-warning[_ngcontent-%COMP%] {\n  color: #dbdf9b;\n}\n\n.background-warning[_ngcontent-%COMP%] {\n  background-color: #dbdf9b;\n}\n\n\n\n.color-error[_ngcontent-%COMP%] {\n  color: #d46c54;\n}\n\n.background-error[_ngcontent-%COMP%] {\n  background-color: #d46c54;\n}\n\n\n\n.color-label[_ngcontent-%COMP%] {\n  color: #1D3C48;\n}\n\n.background-label[_ngcontent-%COMP%] {\n  background-color: #1D3C48;\n}\n\n\n\n.revoke-modal[_ngcontent-%COMP%] {\n  padding: 28px 24px;\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n}\n\n.revoke-modal__title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #23262F;\n  margin: 0 0 10px;\n}\n\n.revoke-modal__text[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.55;\n  color: #9196A4;\n  margin: 0 0 24px;\n}\n\n.revoke-modal__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n\n.revoke-modal__btn[_ngcontent-%COMP%] {\n  padding: 12px 20px;\n  border-radius: 12px;\n  border: none;\n  font-size: 15px;\n  font-weight: 600;\n  cursor: pointer;\n  min-height: 46px;\n  transition: background 0.2s ease, transform 0.1s ease;\n}\n.revoke-modal__btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n\n.revoke-modal__btn--ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1.5px solid #DDE2ED;\n  color: #23262F;\n}\n.revoke-modal__btn--ghost[_ngcontent-%COMP%]:hover {\n  background: rgba(35, 38, 47, 0.04);\n}\n\n.revoke-modal__btn--danger[_ngcontent-%COMP%] {\n  background: #C0392B;\n  color: #fff;\n}\n.revoke-modal__btn--danger[_ngcontent-%COMP%]:hover {\n  background: #962D20;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJldm9rZS1jaGFubmVsLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwiLi5cXC4uXFwuLlxcLi5cXGFzc2V0c1xcc3R5bGVzXFxtYWluXFxjb2xvci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0FoQix5QkFBQTtBQUdBLElBQUE7QUFFQTtFQUF1QixjQURYO0FEQ1o7O0FDQ0E7RUFBd0IseUJBRlo7QURLWjs7QUNGQTtFQUF3Qix5QkFBQTtBRE14Qjs7QUNMQTtFQUE4Qix5QkFBQTtBRFM5Qjs7QUNSQTtFQUNJLGVBQUE7RUFDQSxxQkFBQTtFQUNBLGNBUlE7QURtQlo7O0FDUkEsSUFBQTtBQUVBO0VBQW9CLGNBRFA7QURZYjs7QUNWQTtFQUF3Qix5QkFGWDtBRGdCYjs7QUNiQSxJQUFBO0FBRUE7RUFBbUIsY0FETjtBRGlCYjs7QUNmQTtFQUF3Qix5QkFGWDtBRHFCYjs7QUNsQkEsSUFBQTtBQUdBO0VBQWEsY0FETjtBRHFCUDs7QUNuQkE7RUFBa0IseUJBRlg7QUR5QlA7O0FDdEJBLElBQUE7QUFDcUIsU0FBQTtBQUNyQjtFQUFpQixjQUROO0FEMkJYOztBQ3pCQTtFQUFzQix5QkFGWDtBRCtCWDs7QUM1QkEsSUFBQTtBQUVBO0VBQVksY0FETjtBRGdDTjs7QUM5QkE7RUFBaUIseUJBRlg7QURvQ047O0FDakNBLElBQUE7QUFFQTtFQUFrQixjQUROO0FEcUNaOztBQ25DQTtFQUF1Qix5QkFGWDtBRHlDWjs7QUN0Q0EsSUFBQTtBQUVBO0VBQWEsV0FETjtBRDBDUDs7QUN4Q0E7RUFBa0Isc0JBRlg7QUQ4Q1A7O0FDM0NBLElBQUE7QUFFQTtFQUFlLGNBREE7QUQrQ2Y7O0FDN0NBO0VBQW9CLHlCQUZMO0FEbURmOztBQ2hEQSxLQUFBO0FBRUE7RUFBYSxjQUREO0FEb0RaOztBQ2xEQTtFQUFrQix5QkFGTjtBRHdEWjs7QUNyREEsS0FBQTtBQUVBO0VBQWUsY0FEQTtBRHlEZjs7QUN2REE7RUFBb0IseUJBRkw7QUQ2RGY7O0FDMURBLEtBQUE7QUFFQTtFQUFhLGNBREE7QUQ4RGI7O0FDNURBO0VBQWtCLHlCQUZMO0FEa0ViOztBQy9EQSxpQ0FBQTtBQUVBO0VBQWUsY0FERDtBRG1FZDs7QUNqRUE7RUFBb0IseUJBRk47QUR1RWQ7O0FDcEVBLHVCQUFBO0FEOURBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtBQXNJRjs7QUFuSUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQ2FLO0VEWkwsZ0JBQUE7QUFzSUY7O0FBbklBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0NVUztFRFRULGdCQUFBO0FBc0lGOztBQW5JQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0FBc0lGOztBQW5JQTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EscURBQUE7QUFzSUY7QUFwSUU7RUFDRSxzQkFBQTtBQXNJSjs7QUFsSUE7RUFDRSx1QkFBQTtFQUNBLDJCQUFBO0VBQ0EsY0N2Qks7QUQ0SlA7QUFuSUU7RUFDRSxrQ0FBQTtBQXFJSjs7QUFqSUE7RUFDRSxtQkFBQTtFQUNBLFdDaEJLO0FEb0pQO0FBbElFO0VBQ0UsbUJBQUE7QUFvSUoiLCJmaWxlIjoicmV2b2tlLWNoYW5uZWwtbW9kYWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vLi4vLi4vYXNzZXRzL3N0eWxlcy9tYWluL2NvbG9yLnNjc3NcIjtcblxuLnJldm9rZS1tb2RhbCB7XG4gIHBhZGRpbmc6IDI4cHggMjRweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLnJldm9rZS1tb2RhbF9fdGl0bGUge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAkYmxhY2s7XG4gIG1hcmdpbjogMCAwIDEwcHg7XG59XG5cbi5yZXZva2UtbW9kYWxfX3RleHQge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU1O1xuICBjb2xvcjogJGdyZXktZGFyaztcbiAgbWFyZ2luOiAwIDAgMjRweDtcbn1cblxuLnJldm9rZS1tb2RhbF9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTBweDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4ucmV2b2tlLW1vZGFsX19idG4ge1xuICBwYWRkaW5nOiAxMnB4IDIwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDQ2cHg7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4ycyBlYXNlLCB0cmFuc2Zvcm0gMC4xcyBlYXNlO1xuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpO1xuICB9XG59XG5cbi5yZXZva2UtbW9kYWxfX2J0bi0tZ2hvc3Qge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiAxLjVweCBzb2xpZCAkZ3JleTtcbiAgY29sb3I6ICRibGFjaztcblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKCRibGFjaywgMC4wNCk7XG4gIH1cbn1cblxuLnJldm9rZS1tb2RhbF9fYnRuLS1kYW5nZXIge1xuICBiYWNrZ3JvdW5kOiAjQzAzOTJCO1xuICBjb2xvcjogJHdoaXRlO1xuXG4gICY6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6ICM5NjJEMjA7XG4gIH1cbn1cbiIsIi8qIC0tLS0g0KbQktCV0KLQkCBTVEFSVCAtLS0tKi9cclxuXHJcblxyXG4vKjEqL1xyXG4kZ3JlZW4tZGFyazojMDQzYzQ4O1xyXG4uY29sb3ItZ3JlZW4tZGFyayAgICAge2NvbG9yOiAkZ3JlZW4tZGFyazt9XHJcbi5iYWNrZ3JvdW5kLWdyZWVuLWRhcmt7XHRiYWNrZ3JvdW5kLWNvbG9yOiRncmVlbi1kYXJrO31cclxuLmljby1iYWNrZ3JvdW5kLWdyZWVuIHsgYmFja2dyb3VuZC1jb2xvcjojMDA2MTc0O31cclxuLmljby1iYWNrZ3JvdW5kLWdyZWVuOmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjojMDQzYzQ4O31cclxuLmdyZWVuLXR4dC1ob3Zlcjpob3ZlcntcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGNvbG9yOiAkZ3JlZW4tZGFyaztcclxuIH1cclxuXHJcbi8qMiovXHJcbiRncmVlbi1iYXNpYzojMDA2MTc0O1xyXG4uY29sb3ItZ3JlZW4tYmFzaWN7XHRjb2xvcjokZ3JlZW4tYmFzaWM7fVxyXG4uYmFja2dyb3VuZC1ncmVlbi1iYXNpY3tiYWNrZ3JvdW5kLWNvbG9yOiRncmVlbi1iYXNpYzt9XHJcbi8qMyovXHJcbiRncmVlbi1saWdodDojMGQ5NGEwO1xyXG4uY29sb3ItZ3JlZW4tbGlnaHR7Y29sb3I6JGdyZWVuLWxpZ2h0O31cclxuLmJhY2tncm91bmQtZ3JlZW4tbGlnaHR7YmFja2dyb3VuZC1jb2xvcjokZ3JlZW4tbGlnaHQ7fVxyXG4vKjQqL1xyXG4kZ3JlZW4tbGlnaHQyOiM1ZWNkZDc7XHJcbiRibGFjazojMjMyNjJGO1xyXG4uY29sb3ItYmxhY2t7Y29sb3I6JGJsYWNrO31cclxuLmJhY2tncm91bmQtYmxhY2t7YmFja2dyb3VuZC1jb2xvcjokYmxhY2s7fVxyXG4vKjUqL1xyXG4kZ3JleS1kYXJrOiM5MTk2QTQgOyAvKkMwQzVENSovXHJcbi5jb2xvci1ncmV5LWRhcmt7Y29sb3I6JGdyZXktZGFyazt9XHJcbi5iYWNrZ3JvdW5kLWdyZXktZGFya3tiYWNrZ3JvdW5kLWNvbG9yOiRncmV5LWRhcms7fVxyXG4vKjYqL1xyXG4kZ3JleTojRERFMkVEO1xyXG4uY29sb3ItZ3JleXtjb2xvcjokZ3JleTt9XHJcbi5iYWNrZ3JvdW5kLWdyZXl7YmFja2dyb3VuZC1jb2xvcjokZ3JleTt9XHJcbi8qNyovXHJcbiRncmV5LWxpZ2h0OiNGQUZBRkM7XHJcbi5jb2xvci1ncmV5LWxpZ2h0e2NvbG9yOiRncmV5LWxpZ2h0O31cclxuLmJhY2tncm91bmQtZ3JleS1saWdodHtiYWNrZ3JvdW5kLWNvbG9yOiRncmV5LWxpZ2h0O31cclxuLyo4Ki9cclxuJHdoaXRlOiNmZmY7XHJcbi5jb2xvci13aGl0ZXtjb2xvcjokd2hpdGU7fVxyXG4uYmFja2dyb3VuZC13aGl0ZXtiYWNrZ3JvdW5kLWNvbG9yOiR3aGl0ZTt9XHJcbi8qOSovXHJcbiRjb2xvci1zdWNjZXNzOiM0RkIyMjk7XHJcbi5jb2xvci1zdWNjZXNze2NvbG9yOiRjb2xvci1zdWNjZXNzO31cclxuLmJhY2tncm91bmQtc3VjY2Vzc3tiYWNrZ3JvdW5kLWNvbG9yOiRjb2xvci1zdWNjZXNzO31cclxuLyoxMCovXHJcbiRjb2xvci1pbmZvOiMwQTZFRDg7XHJcbi5jb2xvci1pbmZveyBjb2xvcjokY29sb3ItaW5mbzt9XHJcbi5iYWNrZ3JvdW5kLWluZm97IGJhY2tncm91bmQtY29sb3I6JGNvbG9yLWluZm87fVxyXG4vKjExKi9cclxuJGNvbG9yLXdhcm5pbmc6I2RiZGY5YjtcclxuLmNvbG9yLXdhcm5pbmd7Y29sb3I6JGNvbG9yLXdhcm5pbmc7fVxyXG4uYmFja2dyb3VuZC13YXJuaW5ne2JhY2tncm91bmQtY29sb3I6JGNvbG9yLXdhcm5pbmc7fVxyXG4vKjEyKi9cclxuJGNvbG9yLWVycm9yOiNkNDZjNTQ7XHJcbi5jb2xvci1lcnJvcntjb2xvcjokY29sb3ItZXJyb3I7fVxyXG4uYmFja2dyb3VuZC1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOiRjb2xvci1lcnJvcjt9XHJcbi8qMTMg4oCUINCv0YDQu9GL0LrQuC/QvNC10YLQutC4INC/0L7QstC10YDRhSDRhNC+0YLQviAqL1xyXG4kY29sb3ItbGFiZWw6ICMxRDNDNDg7XHJcbi5jb2xvci1sYWJlbCB7IGNvbG9yOiAkY29sb3ItbGFiZWw7IH1cclxuLmJhY2tncm91bmQtbGFiZWwgeyBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItbGFiZWw7IH1cclxuLyogLS0tLSDQptCS0JXQotCQIEVORCAtLS0tKi8iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcHJvZmlsZS11c2VyL3NldHRpbmdzL3Jldm9rZS1jaGFubmVsLW1vZGFsL3Jldm9rZS1jaGFubmVsLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vc3JjL2Fzc2V0cy9zdHlsZXMvbWFpbi9jb2xvci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0FoQix5QkFBQTtBQUdBLElBQUE7QUFFQTtFQUF1QixjQURYO0FEQ1o7O0FDQ0E7RUFBd0IseUJBRlo7QURLWjs7QUNGQTtFQUF3Qix5QkFBQTtBRE14Qjs7QUNMQTtFQUE4Qix5QkFBQTtBRFM5Qjs7QUNSQTtFQUNJLGVBQUE7RUFDQSxxQkFBQTtFQUNBLGNBUlE7QURtQlo7O0FDUkEsSUFBQTtBQUVBO0VBQW9CLGNBRFA7QURZYjs7QUNWQTtFQUF3Qix5QkFGWDtBRGdCYjs7QUNiQSxJQUFBO0FBRUE7RUFBbUIsY0FETjtBRGlCYjs7QUNmQTtFQUF3Qix5QkFGWDtBRHFCYjs7QUNsQkEsSUFBQTtBQUdBO0VBQWEsY0FETjtBRHFCUDs7QUNuQkE7RUFBa0IseUJBRlg7QUR5QlA7O0FDdEJBLElBQUE7QUFDcUIsU0FBQTtBQUNyQjtFQUFpQixjQUROO0FEMkJYOztBQ3pCQTtFQUFzQix5QkFGWDtBRCtCWDs7QUM1QkEsSUFBQTtBQUVBO0VBQVksY0FETjtBRGdDTjs7QUM5QkE7RUFBaUIseUJBRlg7QURvQ047O0FDakNBLElBQUE7QUFFQTtFQUFrQixjQUROO0FEcUNaOztBQ25DQTtFQUF1Qix5QkFGWDtBRHlDWjs7QUN0Q0EsSUFBQTtBQUVBO0VBQWEsV0FETjtBRDBDUDs7QUN4Q0E7RUFBa0Isc0JBRlg7QUQ4Q1A7O0FDM0NBLElBQUE7QUFFQTtFQUFlLGNBREE7QUQrQ2Y7O0FDN0NBO0VBQW9CLHlCQUZMO0FEbURmOztBQ2hEQSxLQUFBO0FBRUE7RUFBYSxjQUREO0FEb0RaOztBQ2xEQTtFQUFrQix5QkFGTjtBRHdEWjs7QUNyREEsS0FBQTtBQUVBO0VBQWUsY0FEQTtBRHlEZjs7QUN2REE7RUFBb0IseUJBRkw7QUQ2RGY7O0FDMURBLEtBQUE7QUFFQTtFQUFhLGNBREE7QUQ4RGI7O0FDNURBO0VBQWtCLHlCQUZMO0FEa0ViOztBQy9EQSxpQ0FBQTtBQUVBO0VBQWUsY0FERDtBRG1FZDs7QUNqRUE7RUFBb0IseUJBRk47QUR1RWQ7O0FDcEVBLHVCQUFBO0FEOURBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQkFBQTtBQXNJRjs7QUFuSUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQ2FLO0VEWkwsZ0JBQUE7QUFzSUY7O0FBbklBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0NVUztFRFRULGdCQUFBO0FBc0lGOztBQW5JQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EseUJBQUE7RUFDQSxlQUFBO0FBc0lGOztBQW5JQTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EscURBQUE7QUFzSUY7QUFwSUU7RUFDRSxzQkFBQTtBQXNJSjs7QUFsSUE7RUFDRSx1QkFBQTtFQUNBLDJCQUFBO0VBQ0EsY0N2Qks7QUQ0SlA7QUFuSUU7RUFDRSxrQ0FBQTtBQXFJSjs7QUFqSUE7RUFDRSxtQkFBQTtFQUNBLFdDaEJLO0FEb0pQO0FBbElFO0VBQ0UsbUJBQUE7QUFvSUo7QUFDQSw0bk1BQTRuTSIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi8uLi8uLi9hc3NldHMvc3R5bGVzL21haW4vY29sb3Iuc2Nzc1wiO1xuXG4ucmV2b2tlLW1vZGFsIHtcbiAgcGFkZGluZzogMjhweCAyNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4ucmV2b2tlLW1vZGFsX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICRibGFjaztcbiAgbWFyZ2luOiAwIDAgMTBweDtcbn1cblxuLnJldm9rZS1tb2RhbF9fdGV4dCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTU7XG4gIGNvbG9yOiAkZ3JleS1kYXJrO1xuICBtYXJnaW46IDAgMCAyNHB4O1xufVxuXG4ucmV2b2tlLW1vZGFsX19hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxMHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5yZXZva2UtbW9kYWxfX2J0biB7XG4gIHBhZGRpbmc6IDEycHggMjBweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXNpemU6IDE1cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWluLWhlaWdodDogNDZweDtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjJzIGVhc2UsIHRyYW5zZm9ybSAwLjFzIGVhc2U7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45OCk7XG4gIH1cbn1cblxuLnJldm9rZS1tb2RhbF9fYnRuLS1naG9zdCB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDEuNXB4IHNvbGlkICRncmV5O1xuICBjb2xvcjogJGJsYWNrO1xuXG4gICY6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoJGJsYWNrLCAwLjA0KTtcbiAgfVxufVxuXG4ucmV2b2tlLW1vZGFsX19idG4tLWRhbmdlciB7XG4gIGJhY2tncm91bmQ6ICNDMDM5MkI7XG4gIGNvbG9yOiAkd2hpdGU7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogIzk2MkQyMDtcbiAgfVxufVxuIiwiLyogLS0tLSDDkMKmw5DCksOQwpXDkMKiw5DCkCBTVEFSVCAtLS0tKi9cclxuXHJcblxyXG4vKjEqL1xyXG4kZ3JlZW4tZGFyazojMDQzYzQ4O1xyXG4uY29sb3ItZ3JlZW4tZGFyayAgICAge2NvbG9yOiAkZ3JlZW4tZGFyazt9XHJcbi5iYWNrZ3JvdW5kLWdyZWVuLWRhcmt7XHRiYWNrZ3JvdW5kLWNvbG9yOiRncmVlbi1kYXJrO31cclxuLmljby1iYWNrZ3JvdW5kLWdyZWVuIHsgYmFja2dyb3VuZC1jb2xvcjojMDA2MTc0O31cclxuLmljby1iYWNrZ3JvdW5kLWdyZWVuOmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjojMDQzYzQ4O31cclxuLmdyZWVuLXR4dC1ob3Zlcjpob3ZlcntcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGNvbG9yOiAkZ3JlZW4tZGFyaztcclxuIH1cclxuXHJcbi8qMiovXHJcbiRncmVlbi1iYXNpYzojMDA2MTc0O1xyXG4uY29sb3ItZ3JlZW4tYmFzaWN7XHRjb2xvcjokZ3JlZW4tYmFzaWM7fVxyXG4uYmFja2dyb3VuZC1ncmVlbi1iYXNpY3tiYWNrZ3JvdW5kLWNvbG9yOiRncmVlbi1iYXNpYzt9XHJcbi8qMyovXHJcbiRncmVlbi1saWdodDojMGQ5NGEwO1xyXG4uY29sb3ItZ3JlZW4tbGlnaHR7Y29sb3I6JGdyZWVuLWxpZ2h0O31cclxuLmJhY2tncm91bmQtZ3JlZW4tbGlnaHR7YmFja2dyb3VuZC1jb2xvcjokZ3JlZW4tbGlnaHQ7fVxyXG4vKjQqL1xyXG4kZ3JlZW4tbGlnaHQyOiM1ZWNkZDc7XHJcbiRibGFjazojMjMyNjJGO1xyXG4uY29sb3ItYmxhY2t7Y29sb3I6JGJsYWNrO31cclxuLmJhY2tncm91bmQtYmxhY2t7YmFja2dyb3VuZC1jb2xvcjokYmxhY2s7fVxyXG4vKjUqL1xyXG4kZ3JleS1kYXJrOiM5MTk2QTQgOyAvKkMwQzVENSovXHJcbi5jb2xvci1ncmV5LWRhcmt7Y29sb3I6JGdyZXktZGFyazt9XHJcbi5iYWNrZ3JvdW5kLWdyZXktZGFya3tiYWNrZ3JvdW5kLWNvbG9yOiRncmV5LWRhcms7fVxyXG4vKjYqL1xyXG4kZ3JleTojRERFMkVEO1xyXG4uY29sb3ItZ3JleXtjb2xvcjokZ3JleTt9XHJcbi5iYWNrZ3JvdW5kLWdyZXl7YmFja2dyb3VuZC1jb2xvcjokZ3JleTt9XHJcbi8qNyovXHJcbiRncmV5LWxpZ2h0OiNGQUZBRkM7XHJcbi5jb2xvci1ncmV5LWxpZ2h0e2NvbG9yOiRncmV5LWxpZ2h0O31cclxuLmJhY2tncm91bmQtZ3JleS1saWdodHtiYWNrZ3JvdW5kLWNvbG9yOiRncmV5LWxpZ2h0O31cclxuLyo4Ki9cclxuJHdoaXRlOiNmZmY7XHJcbi5jb2xvci13aGl0ZXtjb2xvcjokd2hpdGU7fVxyXG4uYmFja2dyb3VuZC13aGl0ZXtiYWNrZ3JvdW5kLWNvbG9yOiR3aGl0ZTt9XHJcbi8qOSovXHJcbiRjb2xvci1zdWNjZXNzOiM0RkIyMjk7XHJcbi5jb2xvci1zdWNjZXNze2NvbG9yOiRjb2xvci1zdWNjZXNzO31cclxuLmJhY2tncm91bmQtc3VjY2Vzc3tiYWNrZ3JvdW5kLWNvbG9yOiRjb2xvci1zdWNjZXNzO31cclxuLyoxMCovXHJcbiRjb2xvci1pbmZvOiMwQTZFRDg7XHJcbi5jb2xvci1pbmZveyBjb2xvcjokY29sb3ItaW5mbzt9XHJcbi5iYWNrZ3JvdW5kLWluZm97IGJhY2tncm91bmQtY29sb3I6JGNvbG9yLWluZm87fVxyXG4vKjExKi9cclxuJGNvbG9yLXdhcm5pbmc6I2RiZGY5YjtcclxuLmNvbG9yLXdhcm5pbmd7Y29sb3I6JGNvbG9yLXdhcm5pbmc7fVxyXG4uYmFja2dyb3VuZC13YXJuaW5ne2JhY2tncm91bmQtY29sb3I6JGNvbG9yLXdhcm5pbmc7fVxyXG4vKjEyKi9cclxuJGNvbG9yLWVycm9yOiNkNDZjNTQ7XHJcbi5jb2xvci1lcnJvcntjb2xvcjokY29sb3ItZXJyb3I7fVxyXG4uYmFja2dyb3VuZC1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOiRjb2xvci1lcnJvcjt9XHJcbi8qMTMgw6LCgMKUIMOQwq/DkcKAw5DCu8ORwovDkMK6w5DCuC/DkMK8w5DCtcORwoLDkMK6w5DCuCDDkMK/w5DCvsOQwrLDkMK1w5HCgMORwoUgw5HChMOQwr7DkcKCw5DCviAqL1xyXG4kY29sb3ItbGFiZWw6ICMxRDNDNDg7XHJcbi5jb2xvci1sYWJlbCB7IGNvbG9yOiAkY29sb3ItbGFiZWw7IH1cclxuLmJhY2tncm91bmQtbGFiZWwgeyBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItbGFiZWw7IH1cclxuLyogLS0tLSDDkMKmw5DCksOQwpXDkMKiw5DCkCBFTkQgLS0tLSovIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 54743:
/*!*************************************************************!*\
  !*** ./src/app/profile-user/settings/settings.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsComponent: () => (/* binding */ SettingsComponent)
/* harmony export */ });
/* harmony import */ var _DTO_views_business_IViewBussinessProfile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DTO/views/business/IViewBussinessProfile */ 12313);
/* harmony import */ var _DTO_classes_profiles_profile_user_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../DTO/classes/profiles/profile-user.model */ 86447);
/* harmony import */ var _services_backend_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/backend.service */ 1260);
/* harmony import */ var _DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../DTO/enums/consentChannel */ 47094);
/* harmony import */ var _subscribe_channel_modal_subscribe_channel_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./subscribe-channel-modal/subscribe-channel-modal.component */ 42363);
/* harmony import */ var _revoke_channel_modal_revoke_channel_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./revoke-channel-modal/revoke-channel-modal.component */ 41758);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var src_services_toast_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/services/toast.service */ 8746);
/* harmony import */ var _auth_login_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../auth/login.service */ 50629);
/* harmony import */ var src_services_consent_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/services/consent.service */ 22179);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var src_app_navigation_service_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/navigation-service.service */ 38208);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 76101);
/* harmony import */ var src_services_push_notification_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/services/push-notification.service */ 14797);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-mask */ 97728);
var _SettingsComponent;


















function SettingsComponent_div_33_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function SettingsComponent_div_33_button_9_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r5);
      const item_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r3.openSubscribeModal(item_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "svg", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "circle", 32)(3, "path", 33)(4, "circle", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6, "\u041A\u0430\u043D\u0430\u043B \u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0451\u043D \u2014 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8, "\u2192");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
}
function SettingsComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 22)(1, "label", 23)(2, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function SettingsComponent_div_33_Template_input_change_2_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r7);
      const item_r1 = restoredCtx.$implicit;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r6.onToggleConsent(item_r1, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "div", 26)(5, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](9, SettingsComponent_div_33_button_9_Template, 9, 0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("checked", ctx_r0.isToggleOn(item_r1))("disabled", item_r1.isPending);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("aria-label", "\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435: " + item_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](item_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](item_r1.hint);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.needsSetup(item_r1));
  }
}
/**
 * Каналы с ботом (Telegram, VK, MAX): бэкенд при отзыве согласия удаляет
 * подписку, и обратно её вернёт только «Старт» в боте, а не переключатель.
 * Push сюда не входит — подписка устройства восстанавливается молча
 * (см. restorePushSubscription).
 */
const CHANNELS_WITH_BOT = [_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_3__.ConsentChannel.Telegram, _DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_3__.ConsentChannel.Vk, _DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_3__.ConsentChannel.Max];
class SettingsComponent {
  constructor(_fb, _apiProfile, messageService, _apiAuth, _apiConsent, _router, navigationService, modalService, pushService) {
    this._fb = _fb;
    this._apiProfile = _apiProfile;
    this.messageService = messageService;
    this._apiAuth = _apiAuth;
    this._apiConsent = _apiConsent;
    this._router = _router;
    this.navigationService = navigationService;
    this.modalService = modalService;
    this.pushService = pushService;
    this.unsubscribe$ = null;
    this.consentSub$ = null;
    this.consentTextVersion = '';
    this.consentItems = [{
      channel: _DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_3__.ConsentChannel.Sms,
      name: 'SMS',
      hint: 'Уведомления о записях и статусах на номер телефона',
      isGranted: false,
      isSubscribed: true,
      isPending: false
    }, {
      channel: _DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_3__.ConsentChannel.Email,
      name: 'Email',
      hint: 'Письма о записях, новостях и спецпредложениях сервиса',
      isGranted: false,
      isSubscribed: true,
      isPending: false
    }, {
      channel: _DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_3__.ConsentChannel.Telegram,
      name: 'Telegram',
      hint: 'Сообщения от Telegram-бота сервиса',
      isGranted: false,
      isSubscribed: false,
      isPending: false
    }, {
      channel: _DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_3__.ConsentChannel.Push,
      name: 'Push-уведомления',
      hint: 'Push-уведомления в браузере и мобильном приложении',
      isGranted: false,
      isSubscribed: false,
      isPending: false
    }, {
      channel: _DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_3__.ConsentChannel.Vk,
      name: 'VK',
      hint: 'Уведомления через мессенджер ВКонтакте',
      isGranted: false,
      isSubscribed: false,
      isPending: false
    }, {
      channel: _DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_3__.ConsentChannel.Max,
      name: 'Max',
      hint: 'Уведомления через мессенджер Max',
      isGranted: false,
      isSubscribed: false,
      isPending: false
    }];
    this.errors = {
      errorLink: '',
      errorLinkStyle: 'border-color: red; color: red'
    };
    this.settingsForm = this._fb.nonNullable.group({
      phone: '',
      name: '',
      family: '',
      email: ''
    });
  }
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Изменения сохранены',
      life: 5000
    });
  }
  ngOnDestroy() {
    this.unsubscribe$?.unsubscribe();
    this.consentSub$?.unsubscribe();
  }
  showError(text) {
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: text,
      life: 5000
    });
  }
  showInfo(text) {
    this.messageService.add({
      severity: 'info',
      summary: 'Почти готово',
      detail: text,
      life: 7000
    });
  }
  showDone(text) {
    this.messageService.add({
      severity: 'success',
      summary: 'Готово',
      detail: text,
      life: 5000
    });
  }
  saveChanges() {
    let data = this.settingsForm.getRawValue();
    if (this.profile) {
      this.profile.family = data['family'];
      this.profile.phone = data['phone'];
      this.profile.name = data['name'];
      this.profile.email = data['email'];
      this.unsubscribe$ = this._apiProfile.saveProfile(this.profile?.id, this.profile).subscribe(result => {
        if (result.code === 200) {
          this.showSuccess();
          this._apiAuth.updateProfile(this.profile?.id);
        } else {
          this.showError(result.message);
        }
      });
    }
    // this.http.put(`${this.url}/update-baprofile/${this.profile?.id}`, { viewbusinell: data })
    //   .subscribe(response => {
    //     console.log('Данные сохранены', response);
    //   }, error => {
    //     console.error('Ошибка', error);
    //   });
  }
  ngOnInit() {
    this.unsubscribe$ = this._apiAuth.allProfiles$.subscribe(result => {
      let profile = result.find(_ => _.userType === _DTO_classes_profiles_profile_user_model__WEBPACK_IMPORTED_MODULE_1__.UserType.User);
      if (profile) {
        this.profile = new _DTO_views_business_IViewBussinessProfile__WEBPACK_IMPORTED_MODULE_0__.IViewBusinessProfile();
        this.profile.copyProfile(profile);
        this.settingsForm = this._fb.group({
          phone: this.profile?.phone,
          email: this.profile?.email,
          name: this.profile?.name,
          family: this.profile?.family
        });
        this.loadConsents();
      }
    });
    this.settingsForm.get('phone')?.valueChanges.subscribe(result => {
      if (result.length != 11) {
        this.errors.errorLink = 'Не правильно указан номер телефона';
      } else {
        this.unsubscribe$ = this._apiProfile.checkUserPhone(this.profile?.id, result).subscribe(res => {
          if (res.code === 404) {
            this.errors.errorLink = '';
          } else {
            this.errors.errorLink = 'Этот номер уже используется в дрцгом аккаунте';
          }
        });
      }
    });
  }
  goToMainPage() {
    this._router.navigate(['/']);
  }
  goToBack() {
    this.navigationService.goToBack();
  }
  loadConsents() {
    if (!this.profile?.id) {
      return;
    }
    this.consentSub$?.unsubscribe();
    this.unsubscribe$ = this._apiConsent.getTextVersions().subscribe(versions => {
      this.consentTextVersion = versions?.[0] ?? '';
    });
    this.consentSub$ = this._apiConsent.getProfileConsents(this.profile.id).subscribe(result => {
      this.applyConsentStatuses(result);
    });
  }
  applyConsentStatuses(statuses) {
    this.consentItems = this.consentItems.map(item => {
      const status = statuses.find(_ => _.channel === item.channel);
      return {
        ...item,
        isGranted: status ? status.isGranted : false,
        isSubscribed: status ? status.isSubscribed : item.isSubscribed
      };
    });
  }
  /**
   * Ползунок отражает согласие, а не факт подключения канала: иначе включение
   * Telegram/VK/Max/Push «не двигало» тумблер (isSubscribed приходит false до
   * старта бота), пользователь видел только тост, а DOM-состояние чекбокса
   * расходилось с моделью. Подключение канала — отдельный шаг, о нём говорит
   * строка-статус под названием.
   *
   * Каждая ветка обязана закончиться одним из двух: тост об ошибке + возврат
   * ползунка к подтверждённому состоянию, либо тост об успехе + ползунок в
   * новом состоянии. Молчаливых выходов здесь быть не должно.
   */
  onToggleConsent(item, event) {
    const checkbox = event.target;
    const isGranted = checkbox.checked;
    if (item.isPending) {
      this.syncToggle(checkbox, item);
      return;
    }
    if (!this.profile?.id) {
      this.syncToggle(checkbox, item);
      this.showError('Профиль ещё загружается, повторите через пару секунд');
      return;
    }
    if (!this.consentTextVersion) {
      this.syncToggle(checkbox, item);
      this.showError('Не удалось загрузить текст согласия, попробуйте позже');
      return;
    }
    // Отзыв согласия по каналу с ботом бэкенд сопровождает удалением подписки,
    // и вернуть её тумблером уже нельзя — спрашиваем подтверждение заранее.
    if (!isGranted && item.isSubscribed && CHANNELS_WITH_BOT.includes(item.channel)) {
      this.syncToggle(checkbox, item);
      this.confirmRevoke(item, checkbox);
      return;
    }
    this.sendConsent(item, isGranted, checkbox);
  }
  confirmRevoke(item, checkbox) {
    const modalRef = this.modalService.open(_revoke_channel_modal_revoke_channel_modal_component__WEBPACK_IMPORTED_MODULE_5__.RevokeChannelModalComponent, {
      centered: true
    });
    modalRef.componentInstance.channelName = item.name;
    modalRef.result.then(reason => {
      if (reason === 'revoke') {
        this.sendConsent(item, false, checkbox);
      }
    },
    // Отмена: ползунок уже возвращён в исходное состояние, сообщать не о чем.
    () => {});
  }
  sendConsent(item, isGranted, checkbox) {
    item.isPending = true;
    this.unsubscribe$ = this._apiConsent.sendConsent({
      profileUserId: this.profile.id,
      channel: item.channel,
      isGranted: isGranted,
      consentTextVersion: this.consentTextVersion,
      source: 'settings'
    }).subscribe({
      next: result => {
        item.isPending = false;
        if (result.code === 200) {
          item.isGranted = isGranted;
          this.syncToggle(checkbox, item);
          this.showDone(isGranted ? `${item.name}: согласие сохранено` : `${item.name}: вы отписаны от уведомлений`);
          if (isGranted && !item.isSubscribed) {
            if (item.channel === _DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_3__.ConsentChannel.Push) {
              this.restorePushSubscription(item);
            } else {
              this.openSubscribeModal(item);
            }
          }
        } else {
          this.syncToggle(checkbox, item);
          this.showError(result.message || 'Не удалось сохранить согласие');
        }
      },
      error: () => {
        item.isPending = false;
        this.syncToggle(checkbox, item);
        this.showError('Не удалось сохранить согласие, попробуйте позже');
      }
    });
  }
  isToggleOn(item) {
    return item.isGranted;
  }
  /** Канал разрешён, но ещё не работает — нужен второй шаг (бот, контакт, подписка устройства). */
  needsSetup(item) {
    return item.isGranted && !item.isSubscribed;
  }
  /**
   * Чекбокс переключает сам браузер, поэтому после каждого ответа сервера
   * приводим DOM к подтверждённому состоянию: при отказе это откат, при успехе —
   * подтверждение (Angular не перепишет [checked] сам, если выражение не изменилось).
   */
  syncToggle(checkbox, item) {
    checkbox.checked = this.isToggleOn(item);
  }
  /**
   * При отзыве согласия бэкенд удаляет строки подписки, но разрешение браузера
   * и сама подписка на устройстве остаются. Поэтому после повторной выдачи
   * согласия канал чинится молча, без системных окон и без модалки — она
   * открывается, только если восстановить нечего (нет разрешения или подписки).
   */
  restorePushSubscription(item) {
    this.pushService.syncExistingSubscription(this.profile.id).then(sub => {
      if (sub) {
        item.isSubscribed = true;
        this.showDone('Push-уведомления снова подключены на этом устройстве');
      } else {
        this.openSubscribeModal(item);
      }
    }).catch(() => this.openSubscribeModal(item));
  }
  openSubscribeModal(item) {
    const modalRef = this.modalService.open(_subscribe_channel_modal_subscribe_channel_modal_component__WEBPACK_IMPORTED_MODULE_4__.SubscribeChannelModalComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.profileId = this.profile.id;
    modalRef.componentInstance.channel = item.channel;
    modalRef.componentInstance.profile = this.profile;
    modalRef.result.then(reason => {
      switch (reason) {
        case 'push-subscribed':
          // Подписка сохраняется отдельным эндпоинтом (notifications/subscribe),
          // и запись согласия для Push может ещё не существовать. Тогда
          // applyConsentStatuses оставит наш флаг, и подсказка «канал не
          // подключён» не вернётся, хотя устройство уже зарегистрировано.
          item.isSubscribed = true;
          this.showDone('Push-уведомления подключены на этом устройстве');
          break;
        case 'contact-saved':
          item.isSubscribed = true;
          this.showDone(`${item.name}: контакт сохранён`);
          break;
        case 'subscribed':
          // Уход в бота ещё не значит подписку: она появится после «Старт».
          this.showInfo(`Нажмите «Старт» в ${item.name} — статус обновится автоматически`);
          break;
      }
      this.loadConsents();
    },
    // Закрыли крестиком: согласие уже сохранено, ползунок ему соответствует,
    // подсказка «канал не подключён» останется под названием канала.
    () => {});
  }
  unsubscribeFromAll() {
    if (!this.profile?.id) {
      this.showError('Профиль ещё загружается, повторите через пару секунд');
      return;
    }
    // Массовый отзыв тоже удаляет подписки ботов — предупреждение то же.
    const modalRef = this.modalService.open(_revoke_channel_modal_revoke_channel_modal_component__WEBPACK_IMPORTED_MODULE_5__.RevokeChannelModalComponent, {
      centered: true
    });
    modalRef.componentInstance.bulk = true;
    modalRef.result.then(reason => {
      if (reason === 'revoke') {
        this.revokeAllConsents();
      }
    }, () => {});
  }
  revokeAllConsents() {
    this.unsubscribe$ = this._apiConsent.revokeAllConsents(this.profile.id).subscribe({
      next: result => {
        // Ползунки гасим только по подтверждённому ответу: раньше тост об успехе
        // и сброс всех каналов выполнялись при любом коде в теле ответа.
        if (result.code === 200) {
          this.consentItems = this.consentItems.map(item => ({
            ...item,
            isGranted: false
          }));
          this.showDone(result.message || 'Вы отписаны от всех рассылок');
        } else {
          this.showError(result.message || 'Не удалось отписаться от рассылок');
        }
      },
      error: () => this.showError('Не удалось отписаться от рассылок, попробуйте позже')
    });
  }
}
_SettingsComponent = SettingsComponent;
_SettingsComponent.ɵfac = function SettingsComponent_Factory(t) {
  return new (t || _SettingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_services_backend_service__WEBPACK_IMPORTED_MODULE_2__.BackendService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_services_toast_service__WEBPACK_IMPORTED_MODULE_6__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_auth_login_service__WEBPACK_IMPORTED_MODULE_7__.LoginService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_services_consent_service__WEBPACK_IMPORTED_MODULE_8__.ConsentService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_navigation_service_service__WEBPACK_IMPORTED_MODULE_9__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_services_push_notification_service__WEBPACK_IMPORTED_MODULE_10__.PushDebugService));
};
_SettingsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
  type: _SettingsComponent,
  selectors: [["app-settings"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵProvidersFeature"]([_services_backend_service__WEBPACK_IMPORTED_MODULE_2__.BackendService])],
  decls: 40,
  vars: 5,
  consts: [[1, "cont-horiz", 2, "background", "#FAFAFC", "padding-bottom", "20px"], [1, "cont-vert", "list1200"], [1, "cont-vert-center-start", "w100", "left-right20", 3, "formGroup", "ngSubmit"], [1, "w100", 2, "max-width", "600px"], [1, "cont-horiz-start", "margin-top50", "margin-bottom50"], [1, "cont-horiz", "btn-back", "margin-right30", 3, "click"], [1, "txt-green-light"], [1, "input-line", "cont-horiz-start"], ["type", "text", "placeholder", "+7(123) 456 78 90", "mask", "+0(000)000-00-00", "formControlName", "phone"], [1, "txt-green-light", "margin-top30"], ["type", "text", "size", "13", "placeholder", "\u041A\u043E\u043D\u0441\u0442\u0430\u043D\u0442\u0438\u043D", "formControlName", "name"], ["type", "text", "size", "13", "placeholder", "\u041A\u043E\u043D\u0441\u0442\u0430\u0442\u0438\u043D\u043E\u043F\u043E\u043B\u044C\u0441\u043A\u0438\u0439", "formControlName", "family"], [1, "h4-name", "margin-bottom20", "margin-top30"], [1, "input-line", "cont-horiz-start", "margin-bottom30"], ["type", "text", "size", "13", "placeholder", "romashka@kmail.com", "formControlName", "email"], [1, "h4-name", "margin-bottom10"], [1, "txt-green-light", "margin-bottom20"], ["class", "consent-row", 4, "ngFor", "ngForOf"], [1, "cont-horiz-start", "margin-top10", "margin-bottom30"], [1, "consent-unsubscribe-all", 3, "click"], [1, "w100", "cont-horiz"], [1, "btn-green"], [1, "consent-row"], [1, "consent-switch"], ["type", "checkbox", 3, "checked", "disabled", "change"], [1, "consent-switch-track"], [1, "consent-row-text"], [1, "consent-row-name"], [1, "consent-row-hint"], ["type", "button", "class", "consent-row-status", 3, "click", 4, "ngIf"], ["type", "button", 1, "consent-row-status", 3, "click"], ["viewBox", "0 0 16 16", "width", "15", "height", "15", "aria-hidden", "true"], ["cx", "8", "cy", "8", "r", "7", "fill", "none", "stroke", "currentColor", "stroke-width", "1.6"], ["d", "M8 4.4v4.2", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round"], ["cx", "8", "cy", "11.4", "r", "1", "fill", "currentColor"], ["aria-hidden", "true", 1, "consent-row-status__arrow"]],
  template: function SettingsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "form", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngSubmit", function SettingsComponent_Template_form_ngSubmit_2_listener() {
        return ctx.saveChanges();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "div", 3)(4, "div", 4)(5, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function SettingsComponent_Template_div_click_5_listener() {
        return ctx.goToBack();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "div")(7, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8, "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](10, " \u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](12, "input", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](15, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](16, " \u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u043C\u044F ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](18, "input", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](19, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](20, " \u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0444\u0430\u043C\u0438\u043B\u0438\u044E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](21, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](22, "input", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](23, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](24, " \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](25, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](26, " \u0423\u043A\u0430\u0436\u0438\u0442\u0435 email \u0434\u043B\u044F \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](27, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](28, "input", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](29, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](30, " \u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](31, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](32, " \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u043D\u0430\u043B\u044B, \u043F\u043E \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0432\u0430\u043C \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043E \u0437\u0430\u043F\u0438\u0441\u044F\u0445, \u0441\u0442\u0430\u0442\u0443\u0441\u0430\u0445 \u0438 \u043D\u043E\u0432\u043E\u0441\u0442\u044F\u0445 \u0441\u0435\u0440\u0432\u0438\u0441\u0430. \u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043C\u043E\u0436\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0432 \u043B\u044E\u0431\u043E\u0439 \u043C\u043E\u043C\u0435\u043D\u0442. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](33, SettingsComponent_div_33_Template, 10, 6, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](34, "div", 18)(35, "a", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function SettingsComponent_Template_a_click_35_listener() {
        return ctx.unsubscribeFromAll();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](36, " \u041E\u0442\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043E\u0442 \u0432\u0441\u0435\u0445 \u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](37, "div", 20)(38, "button", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](39, " \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("formGroup", ctx.settingsForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleMap"](ctx.errors.errorLinkStyle);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx.errors.errorLink, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](19);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx.consentItems);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormControlName, ngx_mask__WEBPACK_IMPORTED_MODULE_16__.NgxMaskDirective],
  styles: [".consent-row[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    padding: 10px 0;\n    border-bottom: 1px solid #EEF1F4;\n}\n\n.consent-row[_ngcontent-%COMP%]:last-of-type {\n    border-bottom: none;\n}\n\n.consent-row-name[_ngcontent-%COMP%] {\n    font-weight: 600;\n    color: #1A1A1A;\n}\n\n.consent-row-hint[_ngcontent-%COMP%] {\n    font-size: 13px;\n    color: #8A93A2;\n    margin-top: 2px;\n}\n\n.consent-switch[_ngcontent-%COMP%] {\n    position: relative;\n    display: inline-block;\n    width: 44px;\n    height: 26px;\n    flex-shrink: 0;\n    cursor: pointer;\n}\n\n.consent-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    opacity: 0;\n    cursor: pointer;\n    z-index: 1;\n}\n\n.consent-switch-track[_ngcontent-%COMP%] {\n    position: absolute;\n    inset: 0;\n    background-color: #D7DCE3;\n    border-radius: 999px;\n    transition: background-color .2s ease-in-out;\n}\n\n.consent-switch-track[_ngcontent-%COMP%]::before {\n    content: '';\n    position: absolute;\n    top: 3px;\n    left: 3px;\n    width: 20px;\n    height: 20px;\n    background-color: #FFFFFF;\n    border-radius: 50%;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n    transition: transform .2s ease-in-out;\n}\n\n.consent-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .consent-switch-track[_ngcontent-%COMP%] {\n    background-color: #006174;\n}\n\n.consent-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .consent-switch-track[_ngcontent-%COMP%]::before {\n    transform: translateX(18px);\n}\n\n.consent-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible    + .consent-switch-track[_ngcontent-%COMP%] {\n    outline: 2px solid #006174;\n    outline-offset: 2px;\n}\n\n.consent-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled {\n    cursor: progress;\n}\n\n.consent-switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled    + .consent-switch-track[_ngcontent-%COMP%] {\n    opacity: 0.6;\n}\n\n\n\n\n\n.consent-row-status[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 7px;\n    margin-top: 7px;\n    padding: 7px 12px;\n    border: 1px solid #F0B860;\n    border-radius: 10px;\n    background: #FFF4E2;\n    font: inherit;\n    font-size: 13px;\n    font-weight: 600;\n    line-height: 1.2;\n    color: #A25600;\n    text-align: left;\n    cursor: pointer;\n    transition: background-color .15s ease, border-color .15s ease, box-shadow .15s ease;\n}\n\n.consent-row-status[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    flex-shrink: 0;\n}\n\n.consent-row-status__arrow[_ngcontent-%COMP%] {\n    font-weight: 700;\n    transition: transform .15s ease;\n}\n\n.consent-row-status[_ngcontent-%COMP%]:hover {\n    background: #FFE8C6;\n    border-color: #E09B2D;\n    box-shadow: 0 2px 8px rgba(200, 130, 20, 0.18);\n}\n\n.consent-row-status[_ngcontent-%COMP%]:hover   .consent-row-status__arrow[_ngcontent-%COMP%] {\n    transform: translateX(3px);\n}\n\n.consent-row-status[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid #A25600;\n    outline-offset: 2px;\n}\n\n@media (max-width: 480px) {\n    .consent-row-status[_ngcontent-%COMP%] {\n        width: 100%;\n        justify-content: flex-start;\n    }\n}\n\n.consent-unsubscribe-all[_ngcontent-%COMP%] {\n    color: #C0392B;\n    text-decoration: underline;\n    cursor: pointer;\n    font-size: 14px;\n}\n\n.consent-unsubscribe-all[_ngcontent-%COMP%]:hover {\n    color: #962D20;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmdzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFNBQVM7SUFDVCxlQUFlO0lBQ2YsZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsY0FBYztJQUNkLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLFdBQVc7SUFDWCxZQUFZO0lBQ1osY0FBYztJQUNkLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFlBQVk7SUFDWixTQUFTO0lBQ1QsVUFBVTtJQUNWLGVBQWU7SUFDZixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLHlCQUF5QjtJQUN6QixvQkFBb0I7SUFDcEIsNENBQTRDO0FBQ2hEOztBQUVBO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztJQUNULFdBQVc7SUFDWCxZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLGtCQUFrQjtJQUNsQix3Q0FBd0M7SUFDeEMscUNBQXFDO0FBQ3pDOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksMEJBQTBCO0lBQzFCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7O3NEQUVzRDtBQUN0RDtJQUNJLG9CQUFvQjtJQUNwQixtQkFBbUI7SUFDbkIsUUFBUTtJQUNSLGVBQWU7SUFDZixpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLG9GQUFvRjtBQUN4Rjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLHFCQUFxQjtJQUNyQiw4Q0FBOEM7QUFDbEQ7O0FBRUE7SUFDSSwwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSwwQkFBMEI7SUFDMUIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0k7UUFDSSxXQUFXO1FBQ1gsMkJBQTJCO0lBQy9CO0FBQ0o7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsMEJBQTBCO0lBQzFCLGVBQWU7SUFDZixlQUFlO0FBQ25COztBQUVBO0lBQ0ksY0FBYztBQUNsQiIsImZpbGUiOiJzZXR0aW5ncy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnNlbnQtcm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiAxNHB4O1xuICAgIHBhZGRpbmc6IDEwcHggMDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0VFRjFGNDtcbn1cblxuLmNvbnNlbnQtcm93Omxhc3Qtb2YtdHlwZSB7XG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbn1cblxuLmNvbnNlbnQtcm93LW5hbWUge1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6ICMxQTFBMUE7XG59XG5cbi5jb25zZW50LXJvdy1oaW50IHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgY29sb3I6ICM4QTkzQTI7XG4gICAgbWFyZ2luLXRvcDogMnB4O1xufVxuXG4uY29uc2VudC1zd2l0Y2gge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgd2lkdGg6IDQ0cHg7XG4gICAgaGVpZ2h0OiAyNnB4O1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmNvbnNlbnQtc3dpdGNoIGlucHV0IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG1hcmdpbjogMDtcbiAgICBvcGFjaXR5OiAwO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB6LWluZGV4OiAxO1xufVxuXG4uY29uc2VudC1zd2l0Y2gtdHJhY2sge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRDdEQ0UzO1xuICAgIGJvcmRlci1yYWRpdXM6IDk5OXB4O1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjJzIGVhc2UtaW4tb3V0O1xufVxuXG4uY29uc2VudC1zd2l0Y2gtdHJhY2s6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogM3B4O1xuICAgIGxlZnQ6IDNweDtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjJzIGVhc2UtaW4tb3V0O1xufVxuXG4uY29uc2VudC1zd2l0Y2ggaW5wdXQ6Y2hlY2tlZCArIC5jb25zZW50LXN3aXRjaC10cmFjayB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNjE3NDtcbn1cblxuLmNvbnNlbnQtc3dpdGNoIGlucHV0OmNoZWNrZWQgKyAuY29uc2VudC1zd2l0Y2gtdHJhY2s6OmJlZm9yZSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDE4cHgpO1xufVxuXG4uY29uc2VudC1zd2l0Y2ggaW5wdXQ6Zm9jdXMtdmlzaWJsZSArIC5jb25zZW50LXN3aXRjaC10cmFjayB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkICMwMDYxNzQ7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbn1cblxuLmNvbnNlbnQtc3dpdGNoIGlucHV0OmRpc2FibGVkIHtcbiAgICBjdXJzb3I6IHByb2dyZXNzO1xufVxuXG4uY29uc2VudC1zd2l0Y2ggaW5wdXQ6ZGlzYWJsZWQgKyAuY29uc2VudC1zd2l0Y2gtdHJhY2sge1xuICAgIG9wYWNpdHk6IDAuNjtcbn1cblxuLyog0KHQvtCz0LvQsNGB0LjQtSDQtdGB0YLRjCwg0L3QviDQutCw0L3QsNC7INC90LUg0YDQsNCx0L7RgtCw0LXRgiDigJQg0LXQtNC40L3RgdGC0LLQtdC90L3QvtC1INGB0L7RgdGC0L7Rj9C90LjQtSDQsiDRgdC/0LjRgdC60LUsXG4gICDRgtGA0LXQsdGD0Y7RidC10LUg0LTQtdC50YHRgtCy0LjRjywg0L/QvtGN0YLQvtC80YMg0L7QvdC+INC+0YTQvtGA0LzQu9C10L3QviDQutCw0Log0LfQsNC80LXRgtC90YvQuSDRj9C90YLQsNGA0L3Ri9C5INGH0LjQvywg0LAg0L3QtVxuICAg0LzQtdC70LrQvtC5INC/0L7QtNC/0LjRgdGM0Y46INGA0LDQvdGM0YjQtSDRgdGC0YDQvtC60YMg0L/QvtGH0YLQuCDQvdC1INC30LDQvNC10YfQsNC70LguICovXG4uY29uc2VudC1yb3ctc3RhdHVzIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogN3B4O1xuICAgIG1hcmdpbi10b3A6IDdweDtcbiAgICBwYWRkaW5nOiA3cHggMTJweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRjBCODYwO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgYmFja2dyb3VuZDogI0ZGRjRFMjtcbiAgICBmb250OiBpbmhlcml0O1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjI7XG4gICAgY29sb3I6ICNBMjU2MDA7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAuMTVzIGVhc2UsIGJveC1zaGFkb3cgLjE1cyBlYXNlO1xufVxuXG4uY29uc2VudC1yb3ctc3RhdHVzIHN2ZyB7XG4gICAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5jb25zZW50LXJvdy1zdGF0dXNfX2Fycm93IHtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAuMTVzIGVhc2U7XG59XG5cbi5jb25zZW50LXJvdy1zdGF0dXM6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6ICNGRkU4QzY7XG4gICAgYm9yZGVyLWNvbG9yOiAjRTA5QjJEO1xuICAgIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDIwMCwgMTMwLCAyMCwgMC4xOCk7XG59XG5cbi5jb25zZW50LXJvdy1zdGF0dXM6aG92ZXIgLmNvbnNlbnQtcm93LXN0YXR1c19fYXJyb3cge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgzcHgpO1xufVxuXG4uY29uc2VudC1yb3ctc3RhdHVzOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCAjQTI1NjAwO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAgIC5jb25zZW50LXJvdy1zdGF0dXMge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgIH1cbn1cblxuLmNvbnNlbnQtdW5zdWJzY3JpYmUtYWxsIHtcbiAgICBjb2xvcjogI0MwMzkyQjtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4uY29uc2VudC11bnN1YnNjcmliZS1hbGw6aG92ZXIge1xuICAgIGNvbG9yOiAjOTYyRDIwO1xufVxuIl19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcHJvZmlsZS11c2VyL3NldHRpbmdzL3NldHRpbmdzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFNBQVM7SUFDVCxlQUFlO0lBQ2YsZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsY0FBYztJQUNkLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLFdBQVc7SUFDWCxZQUFZO0lBQ1osY0FBYztJQUNkLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFlBQVk7SUFDWixTQUFTO0lBQ1QsVUFBVTtJQUNWLGVBQWU7SUFDZixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLHlCQUF5QjtJQUN6QixvQkFBb0I7SUFDcEIsNENBQTRDO0FBQ2hEOztBQUVBO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztJQUNULFdBQVc7SUFDWCxZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLGtCQUFrQjtJQUNsQix3Q0FBd0M7SUFDeEMscUNBQXFDO0FBQ3pDOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksMEJBQTBCO0lBQzFCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7O3NEQUVzRDtBQUN0RDtJQUNJLG9CQUFvQjtJQUNwQixtQkFBbUI7SUFDbkIsUUFBUTtJQUNSLGVBQWU7SUFDZixpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLG9GQUFvRjtBQUN4Rjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLHFCQUFxQjtJQUNyQiw4Q0FBOEM7QUFDbEQ7O0FBRUE7SUFDSSwwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSwwQkFBMEI7SUFDMUIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0k7UUFDSSxXQUFXO1FBQ1gsMkJBQTJCO0lBQy9CO0FBQ0o7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsMEJBQTBCO0lBQzFCLGVBQWU7SUFDZixlQUFlO0FBQ25COztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQSxnZ01BQWdnTSIsInNvdXJjZXNDb250ZW50IjpbIi5jb25zZW50LXJvdyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMTRweDtcbiAgICBwYWRkaW5nOiAxMHB4IDA7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNFRUYxRjQ7XG59XG5cbi5jb25zZW50LXJvdzpsYXN0LW9mLXR5cGUge1xuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG59XG5cbi5jb25zZW50LXJvdy1uYW1lIHtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiAjMUExQTFBO1xufVxuXG4uY29uc2VudC1yb3ctaGludCB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGNvbG9yOiAjOEE5M0EyO1xuICAgIG1hcmdpbi10b3A6IDJweDtcbn1cblxuLmNvbnNlbnQtc3dpdGNoIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHdpZHRoOiA0NHB4O1xuICAgIGhlaWdodDogMjZweDtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5jb25zZW50LXN3aXRjaCBpbnB1dCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBtYXJnaW46IDA7XG4gICAgb3BhY2l0eTogMDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgei1pbmRleDogMTtcbn1cblxuLmNvbnNlbnQtc3dpdGNoLXRyYWNrIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Q3RENFMztcbiAgICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4ycyBlYXNlLWluLW91dDtcbn1cblxuLmNvbnNlbnQtc3dpdGNoLXRyYWNrOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDNweDtcbiAgICBsZWZ0OiAzcHg7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMik7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIC4ycyBlYXNlLWluLW91dDtcbn1cblxuLmNvbnNlbnQtc3dpdGNoIGlucHV0OmNoZWNrZWQgKyAuY29uc2VudC1zd2l0Y2gtdHJhY2sge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDYxNzQ7XG59XG5cbi5jb25zZW50LXN3aXRjaCBpbnB1dDpjaGVja2VkICsgLmNvbnNlbnQtc3dpdGNoLXRyYWNrOjpiZWZvcmUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxOHB4KTtcbn1cblxuLmNvbnNlbnQtc3dpdGNoIGlucHV0OmZvY3VzLXZpc2libGUgKyAuY29uc2VudC1zd2l0Y2gtdHJhY2sge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCAjMDA2MTc0O1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG59XG5cbi5jb25zZW50LXN3aXRjaCBpbnB1dDpkaXNhYmxlZCB7XG4gICAgY3Vyc29yOiBwcm9ncmVzcztcbn1cblxuLmNvbnNlbnQtc3dpdGNoIGlucHV0OmRpc2FibGVkICsgLmNvbnNlbnQtc3dpdGNoLXRyYWNrIHtcbiAgICBvcGFjaXR5OiAwLjY7XG59XG5cbi8qIMOQwqHDkMK+w5DCs8OQwrvDkMKww5HCgcOQwrjDkMK1IMOQwrXDkcKBw5HCgsORwowsIMOQwr3DkMK+IMOQwrrDkMKww5DCvcOQwrDDkMK7IMOQwr3DkMK1IMORwoDDkMKww5DCscOQwr7DkcKCw5DCsMOQwrXDkcKCIMOiwoDClCDDkMK1w5DCtMOQwrjDkMK9w5HCgcORwoLDkMKyw5DCtcOQwr3DkMK9w5DCvsOQwrUgw5HCgcOQwr7DkcKBw5HCgsOQwr7DkcKPw5DCvcOQwrjDkMK1IMOQwrIgw5HCgcOQwr/DkMK4w5HCgcOQwrrDkMK1LFxuICAgw5HCgsORwoDDkMK1w5DCscORwoPDkcKOw5HCicOQwrXDkMK1IMOQwrTDkMK1w5DCucORwoHDkcKCw5DCssOQwrjDkcKPLCDDkMK/w5DCvsORwo3DkcKCw5DCvsOQwrzDkcKDIMOQwr7DkMK9w5DCviDDkMK+w5HChMOQwr7DkcKAw5DCvMOQwrvDkMK1w5DCvcOQwr4gw5DCusOQwrDDkMK6IMOQwrfDkMKww5DCvMOQwrXDkcKCw5DCvcORwovDkMK5IMORwo/DkMK9w5HCgsOQwrDDkcKAw5DCvcORwovDkMK5IMORwofDkMK4w5DCvywgw5DCsCDDkMK9w5DCtVxuICAgw5DCvMOQwrXDkMK7w5DCusOQwr7DkMK5IMOQwr/DkMK+w5DCtMOQwr/DkMK4w5HCgcORwozDkcKOOiDDkcKAw5DCsMOQwr3DkcKMw5HCiMOQwrUgw5HCgcORwoLDkcKAw5DCvsOQwrrDkcKDIMOQwr/DkMK+w5HCh8ORwoLDkMK4IMOQwr3DkMK1IMOQwrfDkMKww5DCvMOQwrXDkcKHw5DCsMOQwrvDkMK4LiAqL1xuLmNvbnNlbnQtcm93LXN0YXR1cyB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDdweDtcbiAgICBtYXJnaW4tdG9wOiA3cHg7XG4gICAgcGFkZGluZzogN3B4IDEycHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0YwQjg2MDtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICNGRkY0RTI7XG4gICAgZm9udDogaW5oZXJpdDtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBsaW5lLWhlaWdodDogMS4yO1xuICAgIGNvbG9yOiAjQTI1NjAwO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjE1cyBlYXNlLCBib3JkZXItY29sb3IgLjE1cyBlYXNlLCBib3gtc2hhZG93IC4xNXMgZWFzZTtcbn1cblxuLmNvbnNlbnQtcm93LXN0YXR1cyBzdmcge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4uY29uc2VudC1yb3ctc3RhdHVzX19hcnJvdyB7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gLjE1cyBlYXNlO1xufVxuXG4uY29uc2VudC1yb3ctc3RhdHVzOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAjRkZFOEM2O1xuICAgIGJvcmRlci1jb2xvcjogI0UwOUIyRDtcbiAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgyMDAsIDEzMCwgMjAsIDAuMTgpO1xufVxuXG4uY29uc2VudC1yb3ctc3RhdHVzOmhvdmVyIC5jb25zZW50LXJvdy1zdGF0dXNfX2Fycm93IHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoM3B4KTtcbn1cblxuLmNvbnNlbnQtcm93LXN0YXR1czpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgI0EyNTYwMDtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgICAuY29uc2VudC1yb3ctc3RhdHVzIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICB9XG59XG5cbi5jb25zZW50LXVuc3Vic2NyaWJlLWFsbCB7XG4gICAgY29sb3I6ICNDMDM5MkI7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLmNvbnNlbnQtdW5zdWJzY3JpYmUtYWxsOmhvdmVyIHtcbiAgICBjb2xvcjogIzk2MkQyMDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 42363:
/*!****************************************************************************************************!*\
  !*** ./src/app/profile-user/settings/subscribe-channel-modal/subscribe-channel-modal.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubscribeChannelModalComponent: () => (/* binding */ SubscribeChannelModalComponent)
/* harmony export */ });
/* harmony import */ var D_Project_Front_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/DTO/enums/consentChannel */ 47094);
/* harmony import */ var src_services_push_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/services/push-notification.service */ 14797);
/* harmony import */ var src_utils_device_compat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/utils/device-compat */ 22498);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 76101);
/* harmony import */ var src_services_consent_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/services/consent.service */ 22179);
/* harmony import */ var src_services_backend_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/services/backend.service */ 1260);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-mask */ 97728);

var _SubscribeChannelModalComponent;











function SubscribeChannelModalComponent__svg_svg_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "svg", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "path", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function SubscribeChannelModalComponent__svg_svg_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "svg", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "path", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function SubscribeChannelModalComponent__svg_svg_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "svg", 9)(1, "defs")(2, "linearGradient", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "stop", 13)(4, "stop", 14)(5, "stop", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "rect", 16)(7, "circle", 17)(8, "circle", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function SubscribeChannelModalComponent__svg_svg_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "svg", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "path", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function SubscribeChannelModalComponent__svg_svg_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "svg", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "path", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function SubscribeChannelModalComponent__svg_svg_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "svg", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "path", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function SubscribeChannelModalComponent_ng_container_15_input_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "input", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function SubscribeChannelModalComponent_ng_container_15_input_2_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r15.contactValue = $event);
    })("keydown.enter", function SubscribeChannelModalComponent_ng_container_15_input_2_Template_input_keydown_enter_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r16);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r17.saveContact());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("placeholder", ctx_r11.contactPlaceholder)("mask", ctx_r11.contactMask)("ngModel", ctx_r11.contactValue);
  }
}
function SubscribeChannelModalComponent_ng_container_15_input_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function SubscribeChannelModalComponent_ng_container_15_input_3_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r18.contactValue = $event);
    })("keydown.enter", function SubscribeChannelModalComponent_ng_container_15_input_3_Template_input_keydown_enter_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r20.saveContact());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("placeholder", ctx_r12.contactPlaceholder)("ngModel", ctx_r12.contactValue);
  }
}
function SubscribeChannelModalComponent_ng_container_15_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "span", 29);
  }
}
function SubscribeChannelModalComponent_ng_container_15_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function SubscribeChannelModalComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, SubscribeChannelModalComponent_ng_container_15_input_2_Template, 1, 3, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, SubscribeChannelModalComponent_ng_container_15_input_3_Template, 1, 2, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SubscribeChannelModalComponent_ng_container_15_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r21.saveContact());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, SubscribeChannelModalComponent_ng_container_15_span_5_Template, 1, 0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, SubscribeChannelModalComponent_ng_container_15_span_6_Template, 2, 0, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r6.contactMask);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r6.contactMask);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r6.isSaving || !ctx_r6.contactValue.trim());
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r6.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r6.isSaving);
  }
}
function SubscribeChannelModalComponent_ng_container_16_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "svg", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "path", 37)(3, "path", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, " \u0421\u0435\u0439\u0447\u0430\u0441 \u0441\u0430\u0439\u0442 \u043E\u0442\u043A\u0440\u044B\u0442 \u043A\u0430\u043A \u0432\u043A\u043B\u0430\u0434\u043A\u0430 Safari. \u0412 \u044D\u0442\u043E\u043C \u0440\u0435\u0436\u0438\u043C\u0435 iPhone \u043D\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u0435\u0442 push-\u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u2014 \u0438\u0445 \u043F\u043E\u043B\u0443\u0447\u0430\u044E\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u043D\u0430 \u044D\u043A\u0440\u0430\u043D \u00AB\u0414\u043E\u043C\u043E\u0439\u00BB. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function SubscribeChannelModalComponent_ng_container_16_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 39)(1, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const step_r27 = ctx.$implicit;
    const i_r28 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](i_r28 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](step_r27);
  }
}
function SubscribeChannelModalComponent_ng_container_16_button_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "span", 29);
  }
}
function SubscribeChannelModalComponent_ng_container_16_button_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C push-\u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function SubscribeChannelModalComponent_ng_container_16_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SubscribeChannelModalComponent_ng_container_16_button_4_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r32);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r31.enablePush());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, SubscribeChannelModalComponent_ng_container_16_button_4_span_1_Template, 1, 0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, SubscribeChannelModalComponent_ng_container_16_button_4_span_2_Template, 2, 0, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r25.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r25.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r25.isSaving);
  }
}
function SubscribeChannelModalComponent_ng_container_16_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SubscribeChannelModalComponent_ng_container_16_button_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r34);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r33.activeModal.dismiss());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " \u041F\u043E\u043D\u044F\u0442\u043D\u043E ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function SubscribeChannelModalComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, SubscribeChannelModalComponent_ng_container_16_div_1_Template, 6, 0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, SubscribeChannelModalComponent_ng_container_16_div_3_Template, 5, 2, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, SubscribeChannelModalComponent_ng_container_16_button_4_Template, 3, 3, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, SubscribeChannelModalComponent_ng_container_16_button_5_Template, 2, 0, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r7.pushNeedsInstall);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r7.pushSteps);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r7.pushNeedsInstall);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r7.pushNeedsInstall);
  }
}
function SubscribeChannelModalComponent_ng_container_17_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "span", 29);
  }
}
function SubscribeChannelModalComponent_ng_container_17_span_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 ", ctx_r36.info.name, "");
  }
}
function SubscribeChannelModalComponent_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 31)(2, "div", 39)(3, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 39)(8, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "\u041F\u043E\u0434\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 39)(13, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "3");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16, "\u0413\u043E\u0442\u043E\u0432\u043E \u2014 \u0432\u044B \u0431\u0443\u0434\u0435\u0442\u0435 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u043E\u043F\u043E\u0432\u0435\u0449\u0435\u043D\u0438\u044F");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SubscribeChannelModalComponent_ng_container_17_Template_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r38);
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r37.openLink());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, SubscribeChannelModalComponent_ng_container_17_span_18_Template, 1, 0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, SubscribeChannelModalComponent_ng_container_17_span_19_Template, 2, 1, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u043D\u0438\u0436\u0435 \u2014 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F ", ctx_r8.info.name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r8.isLoading || !ctx_r8.subscribeLink);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r8.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r8.isLoading);
  }
}
function SubscribeChannelModalComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r9.errorMessage, " ");
  }
}
function SubscribeChannelModalComponent_ng_container_19_dl_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "dl", 45)(1, "div")(2, "dt");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "iOS");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "dd");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div")(7, "dt");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "\u0420\u0435\u0436\u0438\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "dd");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div")(12, "dt");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "Notification API");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "dd");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "div")(17, "dt");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18, "PushManager");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "dd");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "div")(22, "dt");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23, "Service Worker API");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "dd");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "div")(27, "dt");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](28, "\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "dd");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](31, "div")(32, "dt");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](33, "\u0412\u043E\u0440\u043A\u0435\u0440");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "dd");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](36, "div")(37, "dt");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](38, "\u0421\u043A\u0440\u0438\u043F\u0442 \u0432\u043E\u0440\u043A\u0435\u0440\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](39, "dd");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](41, "div")(42, "dt");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](43, "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](44, "dd");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r39.diagnostics.isIOS ? ctx_r39.diagnostics.iosVersion : "\u043D\u0435\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r39.diagnostics.isStandalone ? "\u0441 \u044D\u043A\u0440\u0430\u043D\u0430 \u00AB\u0414\u043E\u043C\u043E\u0439\u00BB" : "\u0432\u043A\u043B\u0430\u0434\u043A\u0430 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r39.diagnostics.hasNotificationApi ? "\u0435\u0441\u0442\u044C" : "\u043D\u0435\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r39.diagnostics.hasPushManager ? "\u0435\u0441\u0442\u044C" : "\u043D\u0435\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r39.diagnostics.hasServiceWorkerApi ? "\u0435\u0441\u0442\u044C" : "\u043D\u0435\u0442");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r39.diagnostics.permission);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r39.diagnostics.swState);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r39.diagnostics.swScriptUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r39.diagnostics.subscriptionEndpoint);
  }
}
function SubscribeChannelModalComponent_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SubscribeChannelModalComponent_ng_container_19_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r41);
      const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r40.toggleDiagnostics());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, SubscribeChannelModalComponent_ng_container_19_dl_3_Template, 46, 9, "dl", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r10.showDiagnostics ? "\u0421\u043A\u0440\u044B\u0442\u044C \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E" : "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r10.showDiagnostics);
  }
}
const CHANNEL_MAP = {
  [src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Sms]: {
    name: 'SMS',
    icon: 'sms',
    color: '#006174',
    description: 'Укажите номер телефона, на который будут приходить SMS-уведомления о записях и статусах.'
  },
  [src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Email]: {
    name: 'Email',
    icon: 'email',
    color: '#0A6ED8',
    description: 'Укажите адрес электронной почты для получения уведомлений о записях и новостях сервиса.'
  },
  [src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Telegram]: {
    name: 'Telegram',
    icon: 'telegram',
    color: '#2AABEE',
    description: 'Перейдите в Telegram-бот и нажмите «Старт», чтобы получать уведомления о записях и статусах.'
  },
  [src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Vk]: {
    name: 'ВКонтакте',
    icon: 'vk',
    color: '#0077FF',
    description: 'Перейдите в сообщество ВКонтакте и разрешите получение сообщений для уведомлений.'
  },
  [src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Push]: {
    name: 'Push-уведомления',
    icon: 'push',
    color: '#006174',
    description: 'Разрешите push-уведомления в настройках браузера, чтобы получать мгновенные оповещения.'
  },
  [src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Max]: {
    name: 'Max',
    icon: 'max',
    color: '#7B61FF',
    description: 'Перейдите в бот Max и нажмите «Старт», чтобы подключить уведомления.'
  }
};
class SubscribeChannelModalComponent {
  constructor(activeModal, consentService, backendService, pushService) {
    this.activeModal = activeModal;
    this.consentService = consentService;
    this.backendService = backendService;
    this.pushService = pushService;
    /** Отдельно от info.description: для iOS-вкладки текст под заголовком другой. */
    this.description = '';
    this.isContactChannel = false;
    this.isPushChannel = false;
    this.contactValue = '';
    this.contactMask = '';
    this.contactPlaceholder = '';
    this.subscribeLink = null;
    this.isLoading = false;
    this.isSaving = false;
    this.errorMessage = null;
    this.pushSteps = [];
    /** iOS в обычной вкладке: push невозможен, нужна установка на экран «Домой». */
    this.pushNeedsInstall = false;
    /** Диагностика показывается только после ошибки — отлаживать iPhone иначе нечем. */
    this.diagnostics = null;
    this.showDiagnostics = false;
  }
  ngOnInit() {
    this.info = CHANNEL_MAP[this.channel] ?? {
      name: 'Канал',
      icon: 'push',
      color: '#006174',
      description: 'Перейдите по ссылке, чтобы подключить уведомления.'
    };
    this.description = this.info.description;
    this.isContactChannel = this.channel === src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Sms || this.channel === src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Email;
    this.isPushChannel = this.channel === src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Push;
    if (this.isContactChannel) {
      if (this.channel === src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Sms) {
        this.contactMask = '+0(000)000-00-00';
        this.contactPlaceholder = '+7(123) 456-78-90';
        this.contactValue = this.profile?.phone ?? '';
      } else {
        this.contactPlaceholder = 'example@mail.ru';
        this.contactValue = this.profile?.email ?? '';
      }
    } else if (this.isPushChannel) {
      // Единственный сценарий с отдельным экраном: iPhone/iPad, открытый как
      // обычная вкладка. Web Push в WebKit существует только для приложения с
      // экрана «Домой», поэтому кнопка «Разрешить» здесь бесполезна — вместо
      // неё показываем инструкцию по установке.
      this.pushNeedsInstall = this.isIOSTab();
      this.pushSteps = this.buildPushSteps();
      if (this.pushNeedsInstall) {
        this.description = 'Осталось добавить OnWaves на экран «Домой» — это займёт несколько секунд.';
      }
    } else {
      this.loadLink();
    }
  }
  /**
   * ВАЖНО: до вызова pushService.subscribe() не должно быть ни одного `await`.
   * WebKit показывает системный запрос на уведомления только пока жива
   * transient activation от клика: после любого await iOS молча пропускает
   * запрос — ни диалога, ни отказа. Диагностику собираем уже после ошибки.
   */
  enablePush() {
    var _this = this;
    return (0,D_Project_Front_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.isSaving = true;
      _this.errorMessage = null;
      try {
        yield _this.pushService.subscribe(_this.profileId);
        _this.activeModal.close('push-subscribed');
      } catch (error) {
        console.error('Push subscription failed', error);
        _this.errorMessage = _this.describePushError(error);
        _this.diagnostics = yield _this.pushService.collectDiagnostics();
      } finally {
        _this.isSaving = false;
      }
    })();
  }
  toggleDiagnostics() {
    this.showDiagnostics = !this.showDiagnostics;
  }
  describePushError(error) {
    if ((0,src_services_push_notification_service__WEBPACK_IMPORTED_MODULE_2__.isPushError)(error)) {
      return SubscribeChannelModalComponent.PUSH_ERROR_TEXTS[error.code] ?? 'Не удалось подключить push-уведомления. Попробуйте позже.';
    }
    return 'Не удалось подключить push-уведомления. Проверьте соединение и попробуйте снова.';
  }
  isIOSTab() {
    const isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined';
    return isBrowser && (0,src_utils_device_compat__WEBPACK_IMPORTED_MODULE_3__.getDeviceCompat)().isIOS && !this.pushService.isStandalone();
  }
  buildPushSteps() {
    if (this.pushNeedsInstall) {
      return ['Нажмите «Поделиться» — квадрат со стрелкой вверх в нижней панели Safari', 'Выберите «На экран „Домой“» и подтвердите «Добавить»', 'Откройте OnWaves с новой иконки и вернитесь в этот раздел'];
    }
    return ['Нажмите кнопку ниже', 'Разрешите уведомления в системном окне устройства', 'Устройство будет зарегистрировано для получения уведомлений'];
  }
  loadLink() {
    this.isLoading = true;
    this.errorMessage = null;
    this.sub = this.consentService.getSubscribeLink(this.profileId, this.channel).subscribe({
      next: result => {
        this.isLoading = false;
        this.subscribeLink = result?.link ?? null;
        if (!this.subscribeLink) {
          this.errorMessage = 'Ссылка для подключения пока недоступна';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Не удалось загрузить ссылку, попробуйте позже';
      }
    });
  }
  openLink() {
    if (this.subscribeLink) {
      window.open(this.subscribeLink, '_blank', 'noopener,noreferrer');
      this.activeModal.close('subscribed');
    }
  }
  saveContact() {
    if (!this.contactValue.trim()) {
      this.errorMessage = this.channel === src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Sms ? 'Введите номер телефона' : 'Введите адрес электронной почты';
      return;
    }
    if (this.channel === src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Email && !this.isValidEmail(this.contactValue)) {
      this.errorMessage = 'Введите корректный адрес электронной почты';
      return;
    }
    this.isSaving = true;
    this.errorMessage = null;
    if (this.channel === src_app_DTO_enums_consentChannel__WEBPACK_IMPORTED_MODULE_1__.ConsentChannel.Sms) {
      this.profile.phone = this.contactValue;
    } else {
      this.profile.email = this.contactValue;
    }
    this.sub = this.backendService.saveProfile(this.profile.id, this.profile).subscribe({
      next: result => {
        this.isSaving = false;
        if (result.code === 200) {
          this.activeModal.close('contact-saved');
        } else {
          this.errorMessage = result.message ?? 'Не удалось сохранить данные';
        }
      },
      error: () => {
        this.isSaving = false;
        this.errorMessage = 'Не удалось сохранить, попробуйте позже';
      }
    });
  }
  isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
_SubscribeChannelModalComponent = SubscribeChannelModalComponent;
_SubscribeChannelModalComponent.PUSH_ERROR_TEXTS = {
  'ios-needs-install': 'На iPhone push-уведомления работают только в приложении с экрана «Домой». ' + 'Откройте сайт в Safari, нажмите «Поделиться» → «На экран „Домой“», запустите OnWaves с иконки и повторите.',
  'ios-too-old': 'Нужна iOS 16.4 или новее: на этой версии Safari push-уведомления недоступны. Обновите систему и попробуйте снова.',
  'unsupported': 'Этот браузер не поддерживает push-уведомления. На iPhone используйте Safari и приложение с экрана «Домой».',
  'permission-denied': 'Уведомления запрещены на уровне системы. На iPhone удалите иконку OnWaves с экрана «Домой» и добавьте её заново, ' + 'затем разрешите уведомления. В браузере — включите их в настройках сайта.',
  'permission-dismissed': 'Системный запрос не был подтверждён. Нажмите кнопку ещё раз и выберите «Разрешить» в окне устройства.',
  'sw-timeout': 'Не удалось запустить фоновый сервис уведомлений. Полностью закройте приложение, откройте заново и повторите.',
  'vapid': 'Ошибка настройки push на стороне сайта (ключ VAPID). Сообщите, пожалуйста, в поддержку.',
  'subscribe-failed': 'Браузер не смог создать подписку на уведомления. Перезапустите приложение и попробуйте снова.',
  'server': 'Разрешение получено, но сервер не сохранил подписку. Проверьте соединение и попробуйте снова.',
  'ssr': 'Не удалось подключить push-уведомления. Обновите страницу и попробуйте снова.'
};
_SubscribeChannelModalComponent.ɵfac = function SubscribeChannelModalComponent_Factory(t) {
  return new (t || _SubscribeChannelModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_7__.NgbActiveModal), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_services_consent_service__WEBPACK_IMPORTED_MODULE_4__.ConsentService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_services_backend_service__WEBPACK_IMPORTED_MODULE_5__.BackendService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_services_push_notification_service__WEBPACK_IMPORTED_MODULE_2__.PushDebugService));
};
_SubscribeChannelModalComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _SubscribeChannelModalComponent,
  selectors: [["app-subscribe-channel-modal"]],
  inputs: {
    profileId: "profileId",
    channel: "channel",
    profile: "profile"
  },
  decls: 20,
  vars: 16,
  consts: [[1, "subscribe-modal"], ["aria-label", "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", 1, "subscribe-modal__close", 3, "click"], [1, "subscribe-modal__icon-wrap"], [3, "ngSwitch"], ["viewBox", "0 0 24 24", "width", "40", "height", "40", 4, "ngSwitchCase"], [1, "subscribe-modal__title"], [1, "subscribe-modal__desc"], [4, "ngIf"], ["class", "subscribe-modal__error", "role", "alert", 4, "ngIf"], ["viewBox", "0 0 24 24", "width", "40", "height", "40"], ["fill", "#2AABEE", "d", "M21.5 3.4 2.9 10.7c-1 .4-1 1.9 0 2.2l4.6 1.5 1.8 5.5c.3 1 1.6 1.1 2.2.3l2.9-3.6 4.9 3.6c.8.6 2 .1 2.2-.9l3-14c.2-1-.7-1.8-1.6-1.5Z"], ["fill", "#0077FF", "d", "M3 7.2c.1 3.8 2.1 7.2 5.6 9.5h2v-3.3c1.2.1 2 .9 2.6 1.8.6.8 1.3 1.5 2.4 1.5h2.6v-2c-.8 0-1.3-.4-1.8-1-.6-.7-1.3-1.5-1.3-1.9.1-.3.5-.6 1-.9.9-.6 1.7-1.5 2-2.6h-2.7c-.3.9-1 1.8-1.9 2.4-.4.2-.8.4-1.2.4V7.2H10v4.7c-.5-.1-1-.4-1.5-.8-1.2-1-2.1-2.4-2.5-3.9H3Z"], ["id", "max-sub-gr", "x1", "0", "y1", "24", "x2", "24", "y2", "0", "gradientUnits", "userSpaceOnUse"], ["offset", "0%", "stop-color", "#00C9DB"], ["offset", "50%", "stop-color", "#7B61FF"], ["offset", "100%", "stop-color", "#D557EF"], ["width", "24", "height", "24", "rx", "6", "fill", "url(#max-sub-gr)"], ["cx", "12", "cy", "12", "r", "7.5", "fill", "#fff"], ["cx", "12", "cy", "12", "r", "4", "fill", "url(#max-sub-gr)"], ["fill", "#006174", "d", "M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2Zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2Z"], ["fill", "#006174", "d", "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2Z"], ["fill", "#0A6ED8", "d", "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"], [1, "subscribe-modal__input-group"], ["class", "subscribe-modal__input", "type", "tel", 3, "placeholder", "mask", "ngModel", "ngModelChange", "keydown.enter", 4, "ngIf"], ["class", "subscribe-modal__input", "type", "email", 3, "placeholder", "ngModel", "ngModelChange", "keydown.enter", 4, "ngIf"], [1, "subscribe-modal__btn", 3, "disabled", "click"], ["class", "subscribe-modal__spinner", 4, "ngIf"], ["type", "tel", 1, "subscribe-modal__input", 3, "placeholder", "mask", "ngModel", "ngModelChange", "keydown.enter"], ["type", "email", 1, "subscribe-modal__input", 3, "placeholder", "ngModel", "ngModelChange", "keydown.enter"], [1, "subscribe-modal__spinner"], ["class", "subscribe-modal__ios-note", 4, "ngIf"], [1, "subscribe-modal__steps"], ["class", "subscribe-modal__step", 4, "ngFor", "ngForOf"], ["class", "subscribe-modal__btn", 3, "disabled", "click", 4, "ngIf"], ["class", "subscribe-modal__btn", 3, "click", 4, "ngIf"], [1, "subscribe-modal__ios-note"], ["viewBox", "0 0 24 24", "width", "22", "height", "22", "aria-hidden", "true"], ["fill", "#006174", "d", "M12 3.2 8.4 6.8l1.4 1.4 1.2-1.2V15h2V7l1.2 1.2 1.4-1.4L12 3.2Z"], ["fill", "#006174", "d", "M6 11v8c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-8h-2v8H8v-8H6Z"], [1, "subscribe-modal__step"], [1, "subscribe-modal__step-num"], [1, "subscribe-modal__btn", 3, "click"], ["role", "alert", 1, "subscribe-modal__error"], ["type", "button", 1, "subscribe-modal__diag-toggle", 3, "click"], ["class", "subscribe-modal__diag", 4, "ngIf"], [1, "subscribe-modal__diag"]],
  template: function SubscribeChannelModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SubscribeChannelModalComponent_Template_button_click_1_listener() {
        return ctx.activeModal.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "\u00D7");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](4, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, SubscribeChannelModalComponent__svg_svg_5_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, SubscribeChannelModalComponent__svg_svg_6_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, SubscribeChannelModalComponent__svg_svg_7_Template, 9, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, SubscribeChannelModalComponent__svg_svg_8_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, SubscribeChannelModalComponent__svg_svg_9_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, SubscribeChannelModalComponent__svg_svg_10_Template, 2, 0, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "h3", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "p", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, SubscribeChannelModalComponent_ng_container_15_Template, 7, 5, "ng-container", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, SubscribeChannelModalComponent_ng_container_16_Template, 6, 4, "ng-container", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](17, SubscribeChannelModalComponent_ng_container_17_Template, 20, 4, "ng-container", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, SubscribeChannelModalComponent_div_18_Template, 2, 1, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, SubscribeChannelModalComponent_ng_container_19_Template, 4, 2, "ng-container", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleProp"]("background", "rgba(" + ctx.info.color + ", 0.08)");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitch", ctx.info.icon);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "telegram");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "vk");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "max");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "push");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "sms");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngSwitchCase", "email");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435 ", ctx.info.name, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.description);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isContactChannel);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isPushChannel);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.isContactChannel && !ctx.isPushChannel);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.errorMessage);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.diagnostics);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgSwitchCase, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, ngx_mask__WEBPACK_IMPORTED_MODULE_10__.NgxMaskDirective],
  styles: ["@charset \"UTF-8\";\n\n\n\n\n.color-green-dark[_ngcontent-%COMP%] {\n  color: #043c48;\n}\n\n.background-green-dark[_ngcontent-%COMP%] {\n  background-color: #043c48;\n}\n\n.ico-background-green[_ngcontent-%COMP%] {\n  background-color: #006174;\n}\n\n.ico-background-green[_ngcontent-%COMP%]:hover {\n  background-color: #043c48;\n}\n\n.green-txt-hover[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n  display: inline-block;\n  color: #043c48;\n}\n\n\n\n.color-green-basic[_ngcontent-%COMP%] {\n  color: #006174;\n}\n\n.background-green-basic[_ngcontent-%COMP%] {\n  background-color: #006174;\n}\n\n\n\n.color-green-light[_ngcontent-%COMP%] {\n  color: #0d94a0;\n}\n\n.background-green-light[_ngcontent-%COMP%] {\n  background-color: #0d94a0;\n}\n\n\n\n.color-black[_ngcontent-%COMP%] {\n  color: #23262F;\n}\n\n.background-black[_ngcontent-%COMP%] {\n  background-color: #23262F;\n}\n\n\n\n\n\n.color-grey-dark[_ngcontent-%COMP%] {\n  color: #9196A4;\n}\n\n.background-grey-dark[_ngcontent-%COMP%] {\n  background-color: #9196A4;\n}\n\n\n\n.color-grey[_ngcontent-%COMP%] {\n  color: #DDE2ED;\n}\n\n.background-grey[_ngcontent-%COMP%] {\n  background-color: #DDE2ED;\n}\n\n\n\n.color-grey-light[_ngcontent-%COMP%] {\n  color: #FAFAFC;\n}\n\n.background-grey-light[_ngcontent-%COMP%] {\n  background-color: #FAFAFC;\n}\n\n\n\n.color-white[_ngcontent-%COMP%] {\n  color: #fff;\n}\n\n.background-white[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n\n\n\n.color-success[_ngcontent-%COMP%] {\n  color: #4FB229;\n}\n\n.background-success[_ngcontent-%COMP%] {\n  background-color: #4FB229;\n}\n\n\n\n.color-info[_ngcontent-%COMP%] {\n  color: #0A6ED8;\n}\n\n.background-info[_ngcontent-%COMP%] {\n  background-color: #0A6ED8;\n}\n\n\n\n.color-warning[_ngcontent-%COMP%] {\n  color: #dbdf9b;\n}\n\n.background-warning[_ngcontent-%COMP%] {\n  background-color: #dbdf9b;\n}\n\n\n\n.color-error[_ngcontent-%COMP%] {\n  color: #d46c54;\n}\n\n.background-error[_ngcontent-%COMP%] {\n  background-color: #d46c54;\n}\n\n\n\n.color-label[_ngcontent-%COMP%] {\n  color: #1D3C48;\n}\n\n.background-label[_ngcontent-%COMP%] {\n  background-color: #1D3C48;\n}\n\n\n\n.subscribe-modal[_ngcontent-%COMP%] {\n  padding: 32px 28px;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n\n.subscribe-modal__close[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 14px;\n  right: 14px;\n  width: 32px;\n  height: 32px;\n  border: none;\n  border-radius: 50%;\n  background: transparent;\n  font-size: 22px;\n  line-height: 1;\n  color: #9196A4;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.15s ease;\n}\n.subscribe-modal__close[_ngcontent-%COMP%]:hover {\n  background: rgba(35, 38, 47, 0.05);\n}\n\n.subscribe-modal__icon-wrap[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n\n.subscribe-modal__title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 600;\n  color: #23262F;\n  margin: 0 0 8px;\n}\n\n.subscribe-modal__desc[_ngcontent-%COMP%] {\n  font-size: 14px;\n  line-height: 1.55;\n  color: #9196A4;\n  margin: 0 0 24px;\n  max-width: 320px;\n}\n\n.subscribe-modal__steps[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 28px;\n}\n\n.subscribe-modal__step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  text-align: left;\n  font-size: 14px;\n  color: #23262F;\n}\n\n.subscribe-modal__step-num[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  background: #006174;\n  color: #fff;\n  font-size: 13px;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.subscribe-modal__ios-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  width: 100%;\n  margin-bottom: 20px;\n  padding: 12px 14px;\n  border-radius: 12px;\n  background: rgba(0, 97, 116, 0.08);\n  color: #23262F;\n  font-size: 13px;\n  line-height: 1.5;\n  text-align: left;\n}\n.subscribe-modal__ios-note[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n\n.subscribe-modal__input-group[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 20px;\n}\n\n.subscribe-modal__input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px 16px;\n  border: 1.5px solid #DDE2ED;\n  border-radius: 12px;\n  font-size: 16px;\n  color: #23262F;\n  outline: none;\n  transition: border-color 0.2s ease;\n  box-sizing: border-box;\n}\n.subscribe-modal__input[_ngcontent-%COMP%]::placeholder {\n  color: #9196A4;\n}\n.subscribe-modal__input[_ngcontent-%COMP%]:focus {\n  border-color: #006174;\n}\n\n.subscribe-modal__btn[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 300px;\n  padding: 14px 24px;\n  border: none;\n  border-radius: 14px;\n  background: #006174;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s ease, transform 0.1s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  min-height: 50px;\n}\n.subscribe-modal__btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #043c48;\n}\n.subscribe-modal__btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: scale(0.98);\n}\n.subscribe-modal__btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.subscribe-modal__spinner[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border: 2.5px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_subscribe-spin 0.7s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_subscribe-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.subscribe-modal__error[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  padding: 10px 14px;\n  border-radius: 10px;\n  background: rgba(212, 108, 84, 0.08);\n  color: #c0392b;\n  font-size: 13px;\n  line-height: 1.5;\n  text-align: left;\n  width: 100%;\n}\n\n.subscribe-modal__diag-toggle[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding: 4px 0;\n  border: none;\n  background: transparent;\n  color: #9196A4;\n  font-size: 12px;\n  text-decoration: underline;\n  cursor: pointer;\n}\n\n.subscribe-modal__diag[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 8px 0 0;\n  padding: 10px 12px;\n  border-radius: 10px;\n  background: rgba(35, 38, 47, 0.04);\n  font-size: 12px;\n  line-height: 1.5;\n  text-align: left;\n  color: #9196A4;\n}\n.subscribe-modal__diag[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: baseline;\n}\n.subscribe-modal__diag[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  min-width: 118px;\n  font-weight: 600;\n  color: #23262F;\n}\n.subscribe-modal__diag[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  word-break: break-all;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1YnNjcmliZS1jaGFubmVsLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwiLi5cXC4uXFwuLlxcLi5cXGFzc2V0c1xcc3R5bGVzXFxtYWluXFxjb2xvci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0FoQix5QkFBQTtBQUdBLElBQUE7QUFFQTtFQUF1QixjQURYO0FEQ1o7O0FDQ0E7RUFBd0IseUJBRlo7QURLWjs7QUNGQTtFQUF3Qix5QkFBQTtBRE14Qjs7QUNMQTtFQUE4Qix5QkFBQTtBRFM5Qjs7QUNSQTtFQUNJLGVBQUE7RUFDQSxxQkFBQTtFQUNBLGNBUlE7QURtQlo7O0FDUkEsSUFBQTtBQUVBO0VBQW9CLGNBRFA7QURZYjs7QUNWQTtFQUF3Qix5QkFGWDtBRGdCYjs7QUNiQSxJQUFBO0FBRUE7RUFBbUIsY0FETjtBRGlCYjs7QUNmQTtFQUF3Qix5QkFGWDtBRHFCYjs7QUNsQkEsSUFBQTtBQUdBO0VBQWEsY0FETjtBRHFCUDs7QUNuQkE7RUFBa0IseUJBRlg7QUR5QlA7O0FDdEJBLElBQUE7QUFDcUIsU0FBQTtBQUNyQjtFQUFpQixjQUROO0FEMkJYOztBQ3pCQTtFQUFzQix5QkFGWDtBRCtCWDs7QUM1QkEsSUFBQTtBQUVBO0VBQVksY0FETjtBRGdDTjs7QUM5QkE7RUFBaUIseUJBRlg7QURvQ047O0FDakNBLElBQUE7QUFFQTtFQUFrQixjQUROO0FEcUNaOztBQ25DQTtFQUF1Qix5QkFGWDtBRHlDWjs7QUN0Q0EsSUFBQTtBQUVBO0VBQWEsV0FETjtBRDBDUDs7QUN4Q0E7RUFBa0Isc0JBRlg7QUQ4Q1A7O0FDM0NBLElBQUE7QUFFQTtFQUFlLGNBREE7QUQrQ2Y7O0FDN0NBO0VBQW9CLHlCQUZMO0FEbURmOztBQ2hEQSxLQUFBO0FBRUE7RUFBYSxjQUREO0FEb0RaOztBQ2xEQTtFQUFrQix5QkFGTjtBRHdEWjs7QUNyREEsS0FBQTtBQUVBO0VBQWUsY0FEQTtBRHlEZjs7QUN2REE7RUFBb0IseUJBRkw7QUQ2RGY7O0FDMURBLEtBQUE7QUFFQTtFQUFhLGNBREE7QUQ4RGI7O0FDNURBO0VBQWtCLHlCQUZMO0FEa0ViOztBQy9EQSxpQ0FBQTtBQUVBO0VBQWUsY0FERDtBRG1FZDs7QUNqRUE7RUFBb0IseUJBRk47QUR1RWQ7O0FDcEVBLHVCQUFBO0FEOURBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUFzSUY7O0FBbklBO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGNDT1M7RUROVCxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQ0FBQTtBQXNJRjtBQXBJRTtFQUNFLGtDQUFBO0FBc0lKOztBQWxJQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBcUlGOztBQWxJQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNDdEJLO0VEdUJMLGVBQUE7QUFxSUY7O0FBbElBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0N6QlM7RUQwQlQsZ0JBQUE7RUFDQSxnQkFBQTtBQXFJRjs7QUFsSUE7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBcUlGOztBQWxJQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxjQ2hESztBRHFMUDs7QUFsSUE7RUFDRSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQ2pFVztFRGtFWCxXQ3pDSztFRDBDTCxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQXFJRjs7QUFsSUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtDQUFBO0VBQ0EsY0MxRUs7RUQyRUwsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFxSUY7QUFuSUU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQXFJSjs7QUFqSUE7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7QUFvSUY7O0FBaklBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxjQ2hHSztFRGlHTCxhQUFBO0VBQ0Esa0NBQUE7RUFDQSxzQkFBQTtBQW9JRjtBQWxJRTtFQUNFLGNDbEdPO0FEc09YO0FBaklFO0VBQ0UscUJDbkhTO0FEc1BiOztBQS9IQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJDN0hXO0VEOEhYLFdDckdLO0VEc0dMLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxxREFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0FBa0lGO0FBaElFO0VBQ0UsbUJDdEpRO0FEd1JaO0FBL0hFO0VBQ0Usc0JBQUE7QUFpSUo7QUE5SEU7RUFDRSxZQUFBO0VBQ0EsbUJBQUE7QUFnSUo7O0FBNUhBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSw0Q0FBQTtFQUNBLHNCQ2xJSztFRG1JTCxrQkFBQTtFQUNBLDhDQUFBO0FBK0hGOztBQTVIQTtFQUNFO0lBQUsseUJBQUE7RUFnSUw7QUFDRjtBQTlIQTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG9DQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQWdJRjs7QUE3SEE7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQ3hLUztFRHlLVCxlQUFBO0VBQ0EsMEJBQUE7RUFDQSxlQUFBO0FBZ0lGOztBQTdIQTtFQUNFLFdBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtDQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQ3ZMUztBRHVUWDtBQTlIRTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EscUJBQUE7QUFnSUo7QUE3SEU7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNDdk1HO0FEc1VQO0FBNUhFO0VBQ0UsU0FBQTtFQUNBLHFCQUFBO0FBOEhKIiwiZmlsZSI6InN1YnNjcmliZS1jaGFubmVsLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uLy4uLy4uL2Fzc2V0cy9zdHlsZXMvbWFpbi9jb2xvci5zY3NzXCI7XG5cbi5zdWJzY3JpYmUtbW9kYWwge1xuICBwYWRkaW5nOiAzMnB4IDI4cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uc3Vic2NyaWJlLW1vZGFsX19jbG9zZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxNHB4O1xuICByaWdodDogMTRweDtcbiAgd2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBmb250LXNpemU6IDIycHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBjb2xvcjogJGdyZXktZGFyaztcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjE1cyBlYXNlO1xuXG4gICY6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoJGJsYWNrLCAwLjA1KTtcbiAgfVxufVxuXG4uc3Vic2NyaWJlLW1vZGFsX19pY29uLXdyYXAge1xuICB3aWR0aDogNzJweDtcbiAgaGVpZ2h0OiA3MnB4O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLnN1YnNjcmliZS1tb2RhbF9fdGl0bGUge1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAkYmxhY2s7XG4gIG1hcmdpbjogMCAwIDhweDtcbn1cblxuLnN1YnNjcmliZS1tb2RhbF9fZGVzYyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTU7XG4gIGNvbG9yOiAkZ3JleS1kYXJrO1xuICBtYXJnaW46IDAgMCAyNHB4O1xuICBtYXgtd2lkdGg6IDMyMHB4O1xufVxuXG4uc3Vic2NyaWJlLW1vZGFsX19zdGVwcyB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDI4cHg7XG59XG5cbi5zdWJzY3JpYmUtbW9kYWxfX3N0ZXAge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEycHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICRibGFjaztcbn1cblxuLnN1YnNjcmliZS1tb2RhbF9fc3RlcC1udW0ge1xuICBmbGV4LXNocmluazogMDtcbiAgd2lkdGg6IDI4cHg7XG4gIGhlaWdodDogMjhweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiAkZ3JlZW4tYmFzaWM7XG4gIGNvbG9yOiAkd2hpdGU7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5zdWJzY3JpYmUtbW9kYWxfX2lvcy1ub3RlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogMTBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIHBhZGRpbmc6IDEycHggMTRweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYmFja2dyb3VuZDogcmdiYSgkZ3JlZW4tYmFzaWMsIDAuMDgpO1xuICBjb2xvcjogJGJsYWNrO1xuICBmb250LXNpemU6IDEzcHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG5cbiAgc3ZnIHtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBtYXJnaW4tdG9wOiAxcHg7XG4gIH1cbn1cblxuLnN1YnNjcmliZS1tb2RhbF9faW5wdXQtZ3JvdXAge1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLnN1YnNjcmliZS1tb2RhbF9faW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMTRweCAxNnB4O1xuICBib3JkZXI6IDEuNXB4IHNvbGlkICRncmV5O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBmb250LXNpemU6IDE2cHg7XG4gIGNvbG9yOiAkYmxhY2s7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzIGVhc2U7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgJjo6cGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiAkZ3JleS1kYXJrO1xuICB9XG5cbiAgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWNvbG9yOiAkZ3JlZW4tYmFzaWM7XG4gIH1cbn1cblxuLnN1YnNjcmliZS1tb2RhbF9fYnRuIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMzAwcHg7XG4gIHBhZGRpbmc6IDE0cHggMjRweDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICBiYWNrZ3JvdW5kOiAkZ3JlZW4tYmFzaWM7XG4gIGNvbG9yOiAkd2hpdGU7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnMgZWFzZSwgdHJhbnNmb3JtIDAuMXMgZWFzZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBtaW4taGVpZ2h0OiA1MHB4O1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICAgIGJhY2tncm91bmQ6ICRncmVlbi1kYXJrO1xuICB9XG5cbiAgJjphY3RpdmU6bm90KDpkaXNhYmxlZCkge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45OCk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgfVxufVxuXG4uc3Vic2NyaWJlLW1vZGFsX19zcGlubmVyIHtcbiAgd2lkdGg6IDIycHg7XG4gIGhlaWdodDogMjJweDtcbiAgYm9yZGVyOiAyLjVweCBzb2xpZCByZ2JhKCR3aGl0ZSwgMC4zKTtcbiAgYm9yZGVyLXRvcC1jb2xvcjogJHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGFuaW1hdGlvbjogc3Vic2NyaWJlLXNwaW4gMC43cyBsaW5lYXIgaW5maW5pdGU7XG59XG5cbkBrZXlmcmFtZXMgc3Vic2NyaWJlLXNwaW4ge1xuICB0byB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbn1cblxuLnN1YnNjcmliZS1tb2RhbF9fZXJyb3Ige1xuICBtYXJnaW4tdG9wOiAxNHB4O1xuICBwYWRkaW5nOiAxMHB4IDE0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoJGNvbG9yLWVycm9yLCAwLjA4KTtcbiAgY29sb3I6ICNjMDM5MmI7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5zdWJzY3JpYmUtbW9kYWxfX2RpYWctdG9nZ2xlIHtcbiAgbWFyZ2luLXRvcDogMTBweDtcbiAgcGFkZGluZzogNHB4IDA7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAkZ3JleS1kYXJrO1xuICBmb250LXNpemU6IDEycHg7XG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5zdWJzY3JpYmUtbW9kYWxfX2RpYWcge1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiA4cHggMCAwO1xuICBwYWRkaW5nOiAxMHB4IDEycHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoJGJsYWNrLCAwLjA0KTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBsaW5lLWhlaWdodDogMS41O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBjb2xvcjogJGdyZXktZGFyaztcblxuICA+IGRpdiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDhweDtcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gIH1cblxuICBkdCB7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgbWluLXdpZHRoOiAxMThweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiAkYmxhY2s7XG4gIH1cblxuICBkZCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbiAgfVxufVxuIiwiLyogLS0tLSDQptCS0JXQotCQIFNUQVJUIC0tLS0qL1xyXG5cclxuXHJcbi8qMSovXHJcbiRncmVlbi1kYXJrOiMwNDNjNDg7XHJcbi5jb2xvci1ncmVlbi1kYXJrICAgICB7Y29sb3I6ICRncmVlbi1kYXJrO31cclxuLmJhY2tncm91bmQtZ3JlZW4tZGFya3tcdGJhY2tncm91bmQtY29sb3I6JGdyZWVuLWRhcms7fVxyXG4uaWNvLWJhY2tncm91bmQtZ3JlZW4geyBiYWNrZ3JvdW5kLWNvbG9yOiMwMDYxNzQ7fVxyXG4uaWNvLWJhY2tncm91bmQtZ3JlZW46aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiMwNDNjNDg7fVxyXG4uZ3JlZW4tdHh0LWhvdmVyOmhvdmVye1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgY29sb3I6ICRncmVlbi1kYXJrO1xyXG4gfVxyXG5cclxuLyoyKi9cclxuJGdyZWVuLWJhc2ljOiMwMDYxNzQ7XHJcbi5jb2xvci1ncmVlbi1iYXNpY3tcdGNvbG9yOiRncmVlbi1iYXNpYzt9XHJcbi5iYWNrZ3JvdW5kLWdyZWVuLWJhc2lje2JhY2tncm91bmQtY29sb3I6JGdyZWVuLWJhc2ljO31cclxuLyozKi9cclxuJGdyZWVuLWxpZ2h0OiMwZDk0YTA7XHJcbi5jb2xvci1ncmVlbi1saWdodHtjb2xvcjokZ3JlZW4tbGlnaHQ7fVxyXG4uYmFja2dyb3VuZC1ncmVlbi1saWdodHtiYWNrZ3JvdW5kLWNvbG9yOiRncmVlbi1saWdodDt9XHJcbi8qNCovXHJcbiRncmVlbi1saWdodDI6IzVlY2RkNztcclxuJGJsYWNrOiMyMzI2MkY7XHJcbi5jb2xvci1ibGFja3tjb2xvcjokYmxhY2s7fVxyXG4uYmFja2dyb3VuZC1ibGFja3tiYWNrZ3JvdW5kLWNvbG9yOiRibGFjazt9XHJcbi8qNSovXHJcbiRncmV5LWRhcms6IzkxOTZBNCA7IC8qQzBDNUQ1Ki9cclxuLmNvbG9yLWdyZXktZGFya3tjb2xvcjokZ3JleS1kYXJrO31cclxuLmJhY2tncm91bmQtZ3JleS1kYXJre2JhY2tncm91bmQtY29sb3I6JGdyZXktZGFyazt9XHJcbi8qNiovXHJcbiRncmV5OiNEREUyRUQ7XHJcbi5jb2xvci1ncmV5e2NvbG9yOiRncmV5O31cclxuLmJhY2tncm91bmQtZ3JleXtiYWNrZ3JvdW5kLWNvbG9yOiRncmV5O31cclxuLyo3Ki9cclxuJGdyZXktbGlnaHQ6I0ZBRkFGQztcclxuLmNvbG9yLWdyZXktbGlnaHR7Y29sb3I6JGdyZXktbGlnaHQ7fVxyXG4uYmFja2dyb3VuZC1ncmV5LWxpZ2h0e2JhY2tncm91bmQtY29sb3I6JGdyZXktbGlnaHQ7fVxyXG4vKjgqL1xyXG4kd2hpdGU6I2ZmZjtcclxuLmNvbG9yLXdoaXRle2NvbG9yOiR3aGl0ZTt9XHJcbi5iYWNrZ3JvdW5kLXdoaXRle2JhY2tncm91bmQtY29sb3I6JHdoaXRlO31cclxuLyo5Ki9cclxuJGNvbG9yLXN1Y2Nlc3M6IzRGQjIyOTtcclxuLmNvbG9yLXN1Y2Nlc3N7Y29sb3I6JGNvbG9yLXN1Y2Nlc3M7fVxyXG4uYmFja2dyb3VuZC1zdWNjZXNze2JhY2tncm91bmQtY29sb3I6JGNvbG9yLXN1Y2Nlc3M7fVxyXG4vKjEwKi9cclxuJGNvbG9yLWluZm86IzBBNkVEODtcclxuLmNvbG9yLWluZm97IGNvbG9yOiRjb2xvci1pbmZvO31cclxuLmJhY2tncm91bmQtaW5mb3sgYmFja2dyb3VuZC1jb2xvcjokY29sb3ItaW5mbzt9XHJcbi8qMTEqL1xyXG4kY29sb3Itd2FybmluZzojZGJkZjliO1xyXG4uY29sb3Itd2FybmluZ3tjb2xvcjokY29sb3Itd2FybmluZzt9XHJcbi5iYWNrZ3JvdW5kLXdhcm5pbmd7YmFja2dyb3VuZC1jb2xvcjokY29sb3Itd2FybmluZzt9XHJcbi8qMTIqL1xyXG4kY29sb3ItZXJyb3I6I2Q0NmM1NDtcclxuLmNvbG9yLWVycm9ye2NvbG9yOiRjb2xvci1lcnJvcjt9XHJcbi5iYWNrZ3JvdW5kLWVycm9ye2JhY2tncm91bmQtY29sb3I6JGNvbG9yLWVycm9yO31cclxuLyoxMyDigJQg0K/RgNC70YvQutC4L9C80LXRgtC60Lgg0L/QvtCy0LXRgNGFINGE0L7RgtC+ICovXHJcbiRjb2xvci1sYWJlbDogIzFEM0M0ODtcclxuLmNvbG9yLWxhYmVsIHsgY29sb3I6ICRjb2xvci1sYWJlbDsgfVxyXG4uYmFja2dyb3VuZC1sYWJlbCB7IGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1sYWJlbDsgfVxyXG4vKiAtLS0tINCm0JLQldCi0JAgRU5EIC0tLS0qLyJdfQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcHJvZmlsZS11c2VyL3NldHRpbmdzL3N1YnNjcmliZS1jaGFubmVsLW1vZGFsL3N1YnNjcmliZS1jaGFubmVsLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vc3JjL2Fzc2V0cy9zdHlsZXMvbWFpbi9jb2xvci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0FoQix5QkFBQTtBQUdBLElBQUE7QUFFQTtFQUF1QixjQURYO0FEQ1o7O0FDQ0E7RUFBd0IseUJBRlo7QURLWjs7QUNGQTtFQUF3Qix5QkFBQTtBRE14Qjs7QUNMQTtFQUE4Qix5QkFBQTtBRFM5Qjs7QUNSQTtFQUNJLGVBQUE7RUFDQSxxQkFBQTtFQUNBLGNBUlE7QURtQlo7O0FDUkEsSUFBQTtBQUVBO0VBQW9CLGNBRFA7QURZYjs7QUNWQTtFQUF3Qix5QkFGWDtBRGdCYjs7QUNiQSxJQUFBO0FBRUE7RUFBbUIsY0FETjtBRGlCYjs7QUNmQTtFQUF3Qix5QkFGWDtBRHFCYjs7QUNsQkEsSUFBQTtBQUdBO0VBQWEsY0FETjtBRHFCUDs7QUNuQkE7RUFBa0IseUJBRlg7QUR5QlA7O0FDdEJBLElBQUE7QUFDcUIsU0FBQTtBQUNyQjtFQUFpQixjQUROO0FEMkJYOztBQ3pCQTtFQUFzQix5QkFGWDtBRCtCWDs7QUM1QkEsSUFBQTtBQUVBO0VBQVksY0FETjtBRGdDTjs7QUM5QkE7RUFBaUIseUJBRlg7QURvQ047O0FDakNBLElBQUE7QUFFQTtFQUFrQixjQUROO0FEcUNaOztBQ25DQTtFQUF1Qix5QkFGWDtBRHlDWjs7QUN0Q0EsSUFBQTtBQUVBO0VBQWEsV0FETjtBRDBDUDs7QUN4Q0E7RUFBa0Isc0JBRlg7QUQ4Q1A7O0FDM0NBLElBQUE7QUFFQTtFQUFlLGNBREE7QUQrQ2Y7O0FDN0NBO0VBQW9CLHlCQUZMO0FEbURmOztBQ2hEQSxLQUFBO0FBRUE7RUFBYSxjQUREO0FEb0RaOztBQ2xEQTtFQUFrQix5QkFGTjtBRHdEWjs7QUNyREEsS0FBQTtBQUVBO0VBQWUsY0FEQTtBRHlEZjs7QUN2REE7RUFBb0IseUJBRkw7QUQ2RGY7O0FDMURBLEtBQUE7QUFFQTtFQUFhLGNBREE7QUQ4RGI7O0FDNURBO0VBQWtCLHlCQUZMO0FEa0ViOztBQy9EQSxpQ0FBQTtBQUVBO0VBQWUsY0FERDtBRG1FZDs7QUNqRUE7RUFBb0IseUJBRk47QUR1RWQ7O0FDcEVBLHVCQUFBO0FEOURBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUFzSUY7O0FBbklBO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGNDT1M7RUROVCxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQ0FBQTtBQXNJRjtBQXBJRTtFQUNFLGtDQUFBO0FBc0lKOztBQWxJQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBcUlGOztBQWxJQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNDdEJLO0VEdUJMLGVBQUE7QUFxSUY7O0FBbElBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0N6QlM7RUQwQlQsZ0JBQUE7RUFDQSxnQkFBQTtBQXFJRjs7QUFsSUE7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBcUlGOztBQWxJQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxjQ2hESztBRHFMUDs7QUFsSUE7RUFDRSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQ2pFVztFRGtFWCxXQ3pDSztFRDBDTCxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQXFJRjs7QUFsSUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtDQUFBO0VBQ0EsY0MxRUs7RUQyRUwsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFxSUY7QUFuSUU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQXFJSjs7QUFqSUE7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7QUFvSUY7O0FBaklBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxjQ2hHSztFRGlHTCxhQUFBO0VBQ0Esa0NBQUE7RUFDQSxzQkFBQTtBQW9JRjtBQWxJRTtFQUNFLGNDbEdPO0FEc09YO0FBaklFO0VBQ0UscUJDbkhTO0FEc1BiOztBQS9IQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJDN0hXO0VEOEhYLFdDckdLO0VEc0dMLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxxREFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0FBa0lGO0FBaElFO0VBQ0UsbUJDdEpRO0FEd1JaO0FBL0hFO0VBQ0Usc0JBQUE7QUFpSUo7QUE5SEU7RUFDRSxZQUFBO0VBQ0EsbUJBQUE7QUFnSUo7O0FBNUhBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSw0Q0FBQTtFQUNBLHNCQ2xJSztFRG1JTCxrQkFBQTtFQUNBLDhDQUFBO0FBK0hGOztBQTVIQTtFQUNFO0lBQUsseUJBQUE7RUFnSUw7QUFDRjtBQTlIQTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG9DQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQWdJRjs7QUE3SEE7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQ3hLUztFRHlLVCxlQUFBO0VBQ0EsMEJBQUE7RUFDQSxlQUFBO0FBZ0lGOztBQTdIQTtFQUNFLFdBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtDQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQ3ZMUztBRHVUWDtBQTlIRTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EscUJBQUE7QUFnSUo7QUE3SEU7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNDdk1HO0FEc1VQO0FBNUhFO0VBQ0UsU0FBQTtFQUNBLHFCQUFBO0FBOEhKO0FBQ0Esd3JZQUF3clkiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vLi4vLi4vYXNzZXRzL3N0eWxlcy9tYWluL2NvbG9yLnNjc3NcIjtcblxuLnN1YnNjcmliZS1tb2RhbCB7XG4gIHBhZGRpbmc6IDMycHggMjhweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5zdWJzY3JpYmUtbW9kYWxfX2Nsb3NlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDE0cHg7XG4gIHJpZ2h0OiAxNHB4O1xuICB3aWR0aDogMzJweDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGZvbnQtc2l6ZTogMjJweDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGNvbG9yOiAkZ3JleS1kYXJrO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzIGVhc2U7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgkYmxhY2ssIDAuMDUpO1xuICB9XG59XG5cbi5zdWJzY3JpYmUtbW9kYWxfX2ljb24td3JhcCB7XG4gIHdpZHRoOiA3MnB4O1xuICBoZWlnaHQ6IDcycHg7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uc3Vic2NyaWJlLW1vZGFsX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICRibGFjaztcbiAgbWFyZ2luOiAwIDAgOHB4O1xufVxuXG4uc3Vic2NyaWJlLW1vZGFsX19kZXNjIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMS41NTtcbiAgY29sb3I6ICRncmV5LWRhcms7XG4gIG1hcmdpbjogMCAwIDI0cHg7XG4gIG1heC13aWR0aDogMzIwcHg7XG59XG5cbi5zdWJzY3JpYmUtbW9kYWxfX3N0ZXBzIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogMjhweDtcbn1cblxuLnN1YnNjcmliZS1tb2RhbF9fc3RlcCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogJGJsYWNrO1xufVxuXG4uc3Vic2NyaWJlLW1vZGFsX19zdGVwLW51bSB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICB3aWR0aDogMjhweDtcbiAgaGVpZ2h0OiAyOHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICRncmVlbi1iYXNpYztcbiAgY29sb3I6ICR3aGl0ZTtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLnN1YnNjcmliZS1tb2RhbF9faW9zLW5vdGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZ2FwOiAxMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgcGFkZGluZzogMTJweCAxNHB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKCRncmVlbi1iYXNpYywgMC4wOCk7XG4gIGNvbG9yOiAkYmxhY2s7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcblxuICBzdmcge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIG1hcmdpbi10b3A6IDFweDtcbiAgfVxufVxuXG4uc3Vic2NyaWJlLW1vZGFsX19pbnB1dC1ncm91cCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uc3Vic2NyaWJlLW1vZGFsX19pbnB1dCB7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG4gIGJvcmRlcjogMS41cHggc29saWQgJGdyZXk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgY29sb3I6ICRibGFjaztcbiAgb3V0bGluZTogbm9uZTtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnMgZWFzZTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6ICRncmV5LWRhcms7XG4gIH1cblxuICAmOmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6ICRncmVlbi1iYXNpYztcbiAgfVxufVxuXG4uc3Vic2NyaWJlLW1vZGFsX19idG4ge1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAzMDBweDtcbiAgcGFkZGluZzogMTRweCAyNHB4O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gIGJhY2tncm91bmQ6ICRncmVlbi1iYXNpYztcbiAgY29sb3I6ICR3aGl0ZTtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4ycyBlYXNlLCB0cmFuc2Zvcm0gMC4xcyBlYXNlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIG1pbi1oZWlnaHQ6IDUwcHg7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgYmFja2dyb3VuZDogJGdyZWVuLWRhcms7XG4gIH1cblxuICAmOmFjdGl2ZTpub3QoOmRpc2FibGVkKSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk4KTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNTtcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICB9XG59XG5cbi5zdWJzY3JpYmUtbW9kYWxfX3NwaW5uZXIge1xuICB3aWR0aDogMjJweDtcbiAgaGVpZ2h0OiAyMnB4O1xuICBib3JkZXI6IDIuNXB4IHNvbGlkIHJnYmEoJHdoaXRlLCAwLjMpO1xuICBib3JkZXItdG9wLWNvbG9yOiAkd2hpdGU7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYW5pbWF0aW9uOiBzdWJzY3JpYmUtc3BpbiAwLjdzIGxpbmVhciBpbmZpbml0ZTtcbn1cblxuQGtleWZyYW1lcyBzdWJzY3JpYmUtc3BpbiB7XG4gIHRvIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgfVxufVxuXG4uc3Vic2NyaWJlLW1vZGFsX19lcnJvciB7XG4gIG1hcmdpbi10b3A6IDE0cHg7XG4gIHBhZGRpbmc6IDEwcHggMTRweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYmFja2dyb3VuZDogcmdiYSgkY29sb3ItZXJyb3IsIDAuMDgpO1xuICBjb2xvcjogI2MwMzkyYjtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBsaW5lLWhlaWdodDogMS41O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB3aWR0aDogMTAwJTtcbn1cblxuLnN1YnNjcmliZS1tb2RhbF9fZGlhZy10b2dnbGUge1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBwYWRkaW5nOiA0cHggMDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICRncmV5LWRhcms7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLnN1YnNjcmliZS1tb2RhbF9fZGlhZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDhweCAwIDA7XG4gIHBhZGRpbmc6IDEwcHggMTJweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgYmFja2dyb3VuZDogcmdiYSgkYmxhY2ssIDAuMDQpO1xuICBmb250LXNpemU6IDEycHg7XG4gIGxpbmUtaGVpZ2h0OiAxLjU7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGNvbG9yOiAkZ3JleS1kYXJrO1xuXG4gID4gZGl2IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdhcDogOHB4O1xuICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcbiAgfVxuXG4gIGR0IHtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBtaW4td2lkdGg6IDExOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6ICRibGFjaztcbiAgfVxuXG4gIGRkIHtcbiAgICBtYXJnaW46IDA7XG4gICAgd29yZC1icmVhazogYnJlYWstYWxsO1xuICB9XG59XG4iLCIvKiAtLS0tIMOQwqbDkMKSw5DClcOQwqLDkMKQIFNUQVJUIC0tLS0qL1xyXG5cclxuXHJcbi8qMSovXHJcbiRncmVlbi1kYXJrOiMwNDNjNDg7XHJcbi5jb2xvci1ncmVlbi1kYXJrICAgICB7Y29sb3I6ICRncmVlbi1kYXJrO31cclxuLmJhY2tncm91bmQtZ3JlZW4tZGFya3tcdGJhY2tncm91bmQtY29sb3I6JGdyZWVuLWRhcms7fVxyXG4uaWNvLWJhY2tncm91bmQtZ3JlZW4geyBiYWNrZ3JvdW5kLWNvbG9yOiMwMDYxNzQ7fVxyXG4uaWNvLWJhY2tncm91bmQtZ3JlZW46aG92ZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiMwNDNjNDg7fVxyXG4uZ3JlZW4tdHh0LWhvdmVyOmhvdmVye1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgY29sb3I6ICRncmVlbi1kYXJrO1xyXG4gfVxyXG5cclxuLyoyKi9cclxuJGdyZWVuLWJhc2ljOiMwMDYxNzQ7XHJcbi5jb2xvci1ncmVlbi1iYXNpY3tcdGNvbG9yOiRncmVlbi1iYXNpYzt9XHJcbi5iYWNrZ3JvdW5kLWdyZWVuLWJhc2lje2JhY2tncm91bmQtY29sb3I6JGdyZWVuLWJhc2ljO31cclxuLyozKi9cclxuJGdyZWVuLWxpZ2h0OiMwZDk0YTA7XHJcbi5jb2xvci1ncmVlbi1saWdodHtjb2xvcjokZ3JlZW4tbGlnaHQ7fVxyXG4uYmFja2dyb3VuZC1ncmVlbi1saWdodHtiYWNrZ3JvdW5kLWNvbG9yOiRncmVlbi1saWdodDt9XHJcbi8qNCovXHJcbiRncmVlbi1saWdodDI6IzVlY2RkNztcclxuJGJsYWNrOiMyMzI2MkY7XHJcbi5jb2xvci1ibGFja3tjb2xvcjokYmxhY2s7fVxyXG4uYmFja2dyb3VuZC1ibGFja3tiYWNrZ3JvdW5kLWNvbG9yOiRibGFjazt9XHJcbi8qNSovXHJcbiRncmV5LWRhcms6IzkxOTZBNCA7IC8qQzBDNUQ1Ki9cclxuLmNvbG9yLWdyZXktZGFya3tjb2xvcjokZ3JleS1kYXJrO31cclxuLmJhY2tncm91bmQtZ3JleS1kYXJre2JhY2tncm91bmQtY29sb3I6JGdyZXktZGFyazt9XHJcbi8qNiovXHJcbiRncmV5OiNEREUyRUQ7XHJcbi5jb2xvci1ncmV5e2NvbG9yOiRncmV5O31cclxuLmJhY2tncm91bmQtZ3JleXtiYWNrZ3JvdW5kLWNvbG9yOiRncmV5O31cclxuLyo3Ki9cclxuJGdyZXktbGlnaHQ6I0ZBRkFGQztcclxuLmNvbG9yLWdyZXktbGlnaHR7Y29sb3I6JGdyZXktbGlnaHQ7fVxyXG4uYmFja2dyb3VuZC1ncmV5LWxpZ2h0e2JhY2tncm91bmQtY29sb3I6JGdyZXktbGlnaHQ7fVxyXG4vKjgqL1xyXG4kd2hpdGU6I2ZmZjtcclxuLmNvbG9yLXdoaXRle2NvbG9yOiR3aGl0ZTt9XHJcbi5iYWNrZ3JvdW5kLXdoaXRle2JhY2tncm91bmQtY29sb3I6JHdoaXRlO31cclxuLyo5Ki9cclxuJGNvbG9yLXN1Y2Nlc3M6IzRGQjIyOTtcclxuLmNvbG9yLXN1Y2Nlc3N7Y29sb3I6JGNvbG9yLXN1Y2Nlc3M7fVxyXG4uYmFja2dyb3VuZC1zdWNjZXNze2JhY2tncm91bmQtY29sb3I6JGNvbG9yLXN1Y2Nlc3M7fVxyXG4vKjEwKi9cclxuJGNvbG9yLWluZm86IzBBNkVEODtcclxuLmNvbG9yLWluZm97IGNvbG9yOiRjb2xvci1pbmZvO31cclxuLmJhY2tncm91bmQtaW5mb3sgYmFja2dyb3VuZC1jb2xvcjokY29sb3ItaW5mbzt9XHJcbi8qMTEqL1xyXG4kY29sb3Itd2FybmluZzojZGJkZjliO1xyXG4uY29sb3Itd2FybmluZ3tjb2xvcjokY29sb3Itd2FybmluZzt9XHJcbi5iYWNrZ3JvdW5kLXdhcm5pbmd7YmFja2dyb3VuZC1jb2xvcjokY29sb3Itd2FybmluZzt9XHJcbi8qMTIqL1xyXG4kY29sb3ItZXJyb3I6I2Q0NmM1NDtcclxuLmNvbG9yLWVycm9ye2NvbG9yOiRjb2xvci1lcnJvcjt9XHJcbi5iYWNrZ3JvdW5kLWVycm9ye2JhY2tncm91bmQtY29sb3I6JGNvbG9yLWVycm9yO31cclxuLyoxMyDDosKAwpQgw5DCr8ORwoDDkMK7w5HCi8OQwrrDkMK4L8OQwrzDkMK1w5HCgsOQwrrDkMK4IMOQwr/DkMK+w5DCssOQwrXDkcKAw5HChSDDkcKEw5DCvsORwoLDkMK+ICovXHJcbiRjb2xvci1sYWJlbDogIzFEM0M0ODtcclxuLmNvbG9yLWxhYmVsIHsgY29sb3I6ICRjb2xvci1sYWJlbDsgfVxyXG4uYmFja2dyb3VuZC1sYWJlbCB7IGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1sYWJlbDsgfVxyXG4vKiAtLS0tIMOQwqbDkMKSw5DClcOQwqLDkMKQIEVORCAtLS0tKi8iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 67137:
/*!*****************************************************!*\
  !*** ./src/app/static/footern/footern.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FooternComponent: () => (/* binding */ FooternComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
var _FooternComponent;

class FooternComponent {}
_FooternComponent = FooternComponent;
_FooternComponent.ɵfac = function FooternComponent_Factory(t) {
  return new (t || _FooternComponent)();
};
_FooternComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _FooternComponent,
  selectors: [["app-footern"]],
  decls: 2,
  vars: 0,
  template: function FooternComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "footern works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb290ZXJuLmNvbXBvbmVudC5jc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc3RhdGljL2Zvb3Rlcm4vZm9vdGVybi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxvS0FBb0siLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 31150:
/*!*****************************************************************!*\
  !*** ./src/app/static/help-question/help-question.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelpQuestionComponent: () => (/* binding */ HelpQuestionComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 27947);
var _HelpQuestionComponent;


class HelpQuestionComponent {
  constructor(_router) {
    this._router = _router;
  }
  goToHelpQuestionAnswerPage() {
    this._router.navigate(['static/helpQuestionAnswer']);
  }
  goToHelp() {
    this._router.navigate(['static/help']);
  }
}
_HelpQuestionComponent = HelpQuestionComponent;
_HelpQuestionComponent.ɵfac = function HelpQuestionComponent_Factory(t) {
  return new (t || _HelpQuestionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
};
_HelpQuestionComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _HelpQuestionComponent,
  selectors: [["app-help-question"]],
  decls: 81,
  vars: 0,
  consts: [[1, "cont-horiz", 2, "background", "#FAFAFC", "padding-bottom", "20px"], [1, "cont-vert", "list1200"], [1, "cont-vert-start-start", "w100", "left-right20"], [1, "cont-horiz-start", "margin-top50", "margin-bottom50"], [1, "cont-horiz", "btn-back", "margin-right30", 3, "click"], [1, "margin-bottom20"], [1, "accordion_tab"], ["type", "checkbox", "id", "chck1"], ["for", "chck1", 1, "accordion_tab-label"], [1, "cont-horiz-between", "w100"], [1, "accordion_tab-content"], [1, "str_uslugi_podcategory"], ["width", "235", "height", "458", "src", "https://www.youtube.com/embed/8N3eVVTPBJU", "title", "18. \u041A\u0430\u0431\u0438\u043D\u0435\u0442 \u0411\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430", "frameborder", "0", "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", "allowfullscreen", ""], [1, ""], ["type", "checkbox", "id", "chck2"], ["for", "chck2", 1, "accordion_tab-label"], ["width", "560", "height", "315", "src", "https://www.youtube.com/embed/DzqfBxlvANQ", "title", "YouTube video player", "frameborder", "0", "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", "allowfullscreen", "", 1, "margin-bottom20", "border-radius:40px"], ["type", "checkbox", "id", "chck3"], ["for", "chck3", 1, "accordion_tab-label"], ["type", "checkbox", "id", "chck4"], ["for", "chck4", 1, "accordion_tab-label"], ["type", "checkbox", "id", "chck5"], ["for", "chck5", 1, "accordion_tab-label"], [1, "margin-top50", "margin-bottom20"], [1, "margin-bottom40"], [1, "w100", "cont-horiz-start-start", "wrap", 2, "margin-bottom", "50px"], [1, "cont-horiz", "btn-green", "margin-right20", "margin-bottom20", 2, "max-width", "280px"], [1, "margin-right10"], ["src", "/assets/img/help/chat.png"], [1, "cont-horiz", "btn-green", "margin-bottom20", 2, "max-width", "280px"], ["src", "/assets/img/help/mail.png"]],
  template: function HelpQuestionComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HelpQuestionComponent_Template_div_click_4_listener() {
        return ctx.goToHelp();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div")(6, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "\u041F\u043E\u043C\u043E\u0449\u044C");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5)(9, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "input", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "label", 8)(14, "div", 9)(15, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " \u041A\u0430\u043A \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 10)(18, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "iframe", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " \u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438 \u0434\u043E\u0441\u0442\u0438\u0433\u043B\u0438 \u0442\u0430\u043A\u043E\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F, \u0447\u0442\u043E \u0433\u0440\u0430\u043D\u0438\u0446\u0430 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u043A\u0430\u0434\u0440\u043E\u0432 \u0441\u043E\u0437\u0434\u0430\u0451\u0442 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u043D \u0446\u0435\u043B\u043E\u0433\u043E \u0440\u044F\u0434\u0430 \u0432\u043D\u0435\u043E\u0447\u0435\u0440\u0435\u0434\u043D\u044B\u0445 \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0439 \u0441 \u0443\u0447\u0451\u0442\u043E\u043C \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u0430 \u0444\u043E\u0440\u043C \u0432\u043E\u0437\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F. \u042F\u0432\u043B\u044F\u044F\u0441\u044C \u0432\u0441\u0435\u0433\u043E \u043B\u0438\u0448\u044C \u0447\u0430\u0441\u0442\u044C\u044E \u043E\u0431\u0449\u0435\u0439 \u043A\u0430\u0440\u0442\u0438\u043D\u044B, \u0434\u0438\u0430\u0433\u0440\u0430\u043C\u043C\u044B \u0441\u0432\u044F\u0437\u0435\u0439 \u043F\u0440\u0438\u0437\u044B\u0432\u0430\u044E\u0442 \u043D\u0430\u0441 \u043A \u043D\u043E\u0432\u044B\u043C \u0441\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435, \u0432 \u0441\u0432\u043E\u044E \u043E\u0447\u0435\u0440\u0435\u0434\u044C, \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043F\u0440\u0435\u0434\u0430\u043D\u044B \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u043E-\u0434\u0435\u043C\u043E\u043A\u0440\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0430\u043D\u0430\u0444\u0435\u043C\u0435! \u041A\u0430\u0440\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0433\u043E\u0432\u043E\u0440\u044B \u043D\u0435 \u0434\u043E\u043F\u0443\u0441\u043A\u0430\u044E\u0442 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0438, \u043F\u0440\u0438 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043D\u0435\u043F\u043E\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430 \u0431\u0443\u0434\u0443\u0442 \u043F\u0440\u0438\u0437\u0432\u0430\u043D\u044B \u043A \u043E\u0442\u0432\u0435\u0442\u0443. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "input", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "label", 15)(25, "div", 9)(26, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " \u041A\u0430\u043A \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 10)(29, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "iframe", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " \u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438 \u0434\u043E\u0441\u0442\u0438\u0433\u043B\u0438 \u0442\u0430\u043A\u043E\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F, \u0447\u0442\u043E \u0433\u0440\u0430\u043D\u0438\u0446\u0430 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u043A\u0430\u0434\u0440\u043E\u0432 \u0441\u043E\u0437\u0434\u0430\u0451\u0442 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u043D \u0446\u0435\u043B\u043E\u0433\u043E \u0440\u044F\u0434\u0430 \u0432\u043D\u0435\u043E\u0447\u0435\u0440\u0435\u0434\u043D\u044B\u0445 \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0439 \u0441 \u0443\u0447\u0451\u0442\u043E\u043C \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u0430 \u0444\u043E\u0440\u043C \u0432\u043E\u0437\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F. \u042F\u0432\u043B\u044F\u044F\u0441\u044C \u0432\u0441\u0435\u0433\u043E \u043B\u0438\u0448\u044C \u0447\u0430\u0441\u0442\u044C\u044E \u043E\u0431\u0449\u0435\u0439 \u043A\u0430\u0440\u0442\u0438\u043D\u044B, \u0434\u0438\u0430\u0433\u0440\u0430\u043C\u043C\u044B \u0441\u0432\u044F\u0437\u0435\u0439 \u043F\u0440\u0438\u0437\u044B\u0432\u0430\u044E\u0442 \u043D\u0430\u0441 \u043A \u043D\u043E\u0432\u044B\u043C \u0441\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435, \u0432 \u0441\u0432\u043E\u044E \u043E\u0447\u0435\u0440\u0435\u0434\u044C, \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043F\u0440\u0435\u0434\u0430\u043D\u044B \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u043E-\u0434\u0435\u043C\u043E\u043A\u0440\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0430\u043D\u0430\u0444\u0435\u043C\u0435! \u041A\u0430\u0440\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0433\u043E\u0432\u043E\u0440\u044B \u043D\u0435 \u0434\u043E\u043F\u0443\u0441\u043A\u0430\u044E\u0442 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0438, \u043F\u0440\u0438 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043D\u0435\u043F\u043E\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430 \u0431\u0443\u0434\u0443\u0442 \u043F\u0440\u0438\u0437\u0432\u0430\u043D\u044B \u043A \u043E\u0442\u0432\u0435\u0442\u0443. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "input", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "label", 18)(36, "div", 9)(37, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, " \u041A\u0430\u043A \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 10)(40, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "iframe", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, " \u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438 \u0434\u043E\u0441\u0442\u0438\u0433\u043B\u0438 \u0442\u0430\u043A\u043E\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F, \u0447\u0442\u043E \u0433\u0440\u0430\u043D\u0438\u0446\u0430 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u043A\u0430\u0434\u0440\u043E\u0432 \u0441\u043E\u0437\u0434\u0430\u0451\u0442 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u043D \u0446\u0435\u043B\u043E\u0433\u043E \u0440\u044F\u0434\u0430 \u0432\u043D\u0435\u043E\u0447\u0435\u0440\u0435\u0434\u043D\u044B\u0445 \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0439 \u0441 \u0443\u0447\u0451\u0442\u043E\u043C \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u0430 \u0444\u043E\u0440\u043C \u0432\u043E\u0437\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F. \u042F\u0432\u043B\u044F\u044F\u0441\u044C \u0432\u0441\u0435\u0433\u043E \u043B\u0438\u0448\u044C \u0447\u0430\u0441\u0442\u044C\u044E \u043E\u0431\u0449\u0435\u0439 \u043A\u0430\u0440\u0442\u0438\u043D\u044B, \u0434\u0438\u0430\u0433\u0440\u0430\u043C\u043C\u044B \u0441\u0432\u044F\u0437\u0435\u0439 \u043F\u0440\u0438\u0437\u044B\u0432\u0430\u044E\u0442 \u043D\u0430\u0441 \u043A \u043D\u043E\u0432\u044B\u043C \u0441\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435, \u0432 \u0441\u0432\u043E\u044E \u043E\u0447\u0435\u0440\u0435\u0434\u044C, \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043F\u0440\u0435\u0434\u0430\u043D\u044B \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u043E-\u0434\u0435\u043C\u043E\u043A\u0440\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0430\u043D\u0430\u0444\u0435\u043C\u0435! \u041A\u0430\u0440\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0433\u043E\u0432\u043E\u0440\u044B \u043D\u0435 \u0434\u043E\u043F\u0443\u0441\u043A\u0430\u044E\u0442 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0438, \u043F\u0440\u0438 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043D\u0435\u043F\u043E\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430 \u0431\u0443\u0434\u0443\u0442 \u043F\u0440\u0438\u0437\u0432\u0430\u043D\u044B \u043A \u043E\u0442\u0432\u0435\u0442\u0443. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "input", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "label", 20)(47, "div", 9)(48, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, " \u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C \u0435\u0441\u043B\u0438 \u044F \u043F\u043E\u043A\u0430 \u043D\u0435 \u0445\u043E\u0447\u0443 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u044B? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 10)(51, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](52, "iframe", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, " \u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438 \u0434\u043E\u0441\u0442\u0438\u0433\u043B\u0438 \u0442\u0430\u043A\u043E\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F, \u0447\u0442\u043E \u0433\u0440\u0430\u043D\u0438\u0446\u0430 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u043A\u0430\u0434\u0440\u043E\u0432 \u0441\u043E\u0437\u0434\u0430\u0451\u0442 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u043D \u0446\u0435\u043B\u043E\u0433\u043E \u0440\u044F\u0434\u0430 \u0432\u043D\u0435\u043E\u0447\u0435\u0440\u0435\u0434\u043D\u044B\u0445 \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0439 \u0441 \u0443\u0447\u0451\u0442\u043E\u043C \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u0430 \u0444\u043E\u0440\u043C \u0432\u043E\u0437\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F. \u042F\u0432\u043B\u044F\u044F\u0441\u044C \u0432\u0441\u0435\u0433\u043E \u043B\u0438\u0448\u044C \u0447\u0430\u0441\u0442\u044C\u044E \u043E\u0431\u0449\u0435\u0439 \u043A\u0430\u0440\u0442\u0438\u043D\u044B, \u0434\u0438\u0430\u0433\u0440\u0430\u043C\u043C\u044B \u0441\u0432\u044F\u0437\u0435\u0439 \u043F\u0440\u0438\u0437\u044B\u0432\u0430\u044E\u0442 \u043D\u0430\u0441 \u043A \u043D\u043E\u0432\u044B\u043C \u0441\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435, \u0432 \u0441\u0432\u043E\u044E \u043E\u0447\u0435\u0440\u0435\u0434\u044C, \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043F\u0440\u0435\u0434\u0430\u043D\u044B \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u043E-\u0434\u0435\u043C\u043E\u043A\u0440\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0430\u043D\u0430\u0444\u0435\u043C\u0435! \u041A\u0430\u0440\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0433\u043E\u0432\u043E\u0440\u044B \u043D\u0435 \u0434\u043E\u043F\u0443\u0441\u043A\u0430\u044E\u0442 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0438, \u043F\u0440\u0438 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043D\u0435\u043F\u043E\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430 \u0431\u0443\u0434\u0443\u0442 \u043F\u0440\u0438\u0437\u0432\u0430\u043D\u044B \u043A \u043E\u0442\u0432\u0435\u0442\u0443. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "input", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "label", 22)(58, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, " \u042F \u0447\u0442\u043E-\u0442\u043E \u043D\u0430\u0436\u0430\u043B\u0430 \u0438 \u0432\u0441\u0435 \u0438\u0441\u0447\u0435\u0437\u043B\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 10)(61, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "iframe", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, " \u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438 \u0434\u043E\u0441\u0442\u0438\u0433\u043B\u0438 \u0442\u0430\u043A\u043E\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F, \u0447\u0442\u043E \u0433\u0440\u0430\u043D\u0438\u0446\u0430 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u043A\u0430\u0434\u0440\u043E\u0432 \u0441\u043E\u0437\u0434\u0430\u0451\u0442 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u043D \u0446\u0435\u043B\u043E\u0433\u043E \u0440\u044F\u0434\u0430 \u0432\u043D\u0435\u043E\u0447\u0435\u0440\u0435\u0434\u043D\u044B\u0445 \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0439 \u0441 \u0443\u0447\u0451\u0442\u043E\u043C \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u0430 \u0444\u043E\u0440\u043C \u0432\u043E\u0437\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F. \u042F\u0432\u043B\u044F\u044F\u0441\u044C \u0432\u0441\u0435\u0433\u043E \u043B\u0438\u0448\u044C \u0447\u0430\u0441\u0442\u044C\u044E \u043E\u0431\u0449\u0435\u0439 \u043A\u0430\u0440\u0442\u0438\u043D\u044B, \u0434\u0438\u0430\u0433\u0440\u0430\u043C\u043C\u044B \u0441\u0432\u044F\u0437\u0435\u0439 \u043F\u0440\u0438\u0437\u044B\u0432\u0430\u044E\u0442 \u043D\u0430\u0441 \u043A \u043D\u043E\u0432\u044B\u043C \u0441\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435, \u0432 \u0441\u0432\u043E\u044E \u043E\u0447\u0435\u0440\u0435\u0434\u044C, \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043F\u0440\u0435\u0434\u0430\u043D\u044B \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u043E-\u0434\u0435\u043C\u043E\u043A\u0440\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0430\u043D\u0430\u0444\u0435\u043C\u0435! \u041A\u0430\u0440\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0433\u043E\u0432\u043E\u0440\u044B \u043D\u0435 \u0434\u043E\u043F\u0443\u0441\u043A\u0430\u044E\u0442 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0438, \u043F\u0440\u0438 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043D\u0435\u043F\u043E\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430 \u0431\u0443\u0434\u0443\u0442 \u043F\u0440\u0438\u0437\u0432\u0430\u043D\u044B \u043A \u043E\u0442\u0432\u0435\u0442\u0443. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 23)(66, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, " \u041C\u044B \u043B\u044E\u0431\u0438\u043C \u043E\u0431\u0449\u0430\u0442\u044C\u0441\u044F. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 25)(71, "div", 26)(72, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "img", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "\u0427\u0430\u0442");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "div", 29)(77, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](78, "img", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, "\u041F\u043E\u0447\u0442\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
    }
  },
  styles: ["\n\n.accordion_tab[_ngcontent-%COMP%] {\n    width: 100%;\n    color: #11142D;\n    overflow: hidden;\n  }\n\n\n.accordion_tab-label[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 1em;\n  background: #fff;\n \n  font-weight: normal;\n  cursor: pointer;\n  border-bottom: 1px solid #C0C5D5;\n}\n\n\n.accordion_tab-label[_ngcontent-%COMP%]:hover {\n  background: #fff;\n}\n\n\ninput[_ngcontent-%COMP%]:checked    + .accordion_tab-label[_ngcontent-%COMP%] {\n    background: #fafafa;\n  }\n\n\n.accordion_tab-label[_ngcontent-%COMP%]::after {\n    \n\n    content: url(/assets/img/ba-edit/arr-green-top.png); \n    text-align: center;\n    transition: all 0.7s;\n  }\n  \n\n  input[_ngcontent-%COMP%]:checked    + .accordion_tab-label[_ngcontent-%COMP%]::after {\n    transform: rotate(180deg);\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHAtcXVlc3Rpb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EscUJBQXFCO0FBQ3JCO0lBQ0ksV0FBVztJQUNYLGNBQWM7SUFDZCxnQkFBZ0I7RUFDbEI7QUFDRix1QkFBdUI7QUFDdkI7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLFlBQVk7RUFDWixnQkFBZ0IsQ0FBQyxlQUFlO0VBQ2hDLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsZ0NBQWdDO0FBQ2xDO0FBQ0EscUNBQXFDO0FBQ3JDO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBQ0Esc0NBQXNDO0FBQ3RDO0lBQ0ksbUJBQW1CO0VBQ3JCO0FBQ0YsZUFBZTtBQUNmO0lBQ0ksZ0JBQWdCO0lBQ2hCLG1EQUFtRDtJQUNuRCxrQkFBa0I7SUFDbEIsb0JBQW9CO0VBQ3RCO0VBQ0EsbUNBQW1DO0VBQ25DO0lBQ0UseUJBQXlCO0VBQzNCIiwiZmlsZSI6ImhlbHAtcXVlc3Rpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKtCi0LXQutGB0YIg0LIg0LDQutC60L7RgNC00LjQvtC90LUqL1xyXG4uYWNjb3JkaW9uX3RhYiB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGNvbG9yOiAjMTExNDJEO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB9XHJcbi8q0JfQsNCz0L7Qu9C+0LLQvtC6INCw0LrQutC+0YDQtNC40L7QvdCwKi9cclxuLmFjY29yZGlvbl90YWItbGFiZWwge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIHBhZGRpbmc6IDFlbTtcclxuICBiYWNrZ3JvdW5kOiAjZmZmOy8qJGdyZWVuLWJhc2ljKi8gXHJcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNDMEM1RDU7XHJcbn1cclxuLyrQl9Cw0LPQvtC70L7QstC+0Log0LDQutC60L7RgNC00LjQvtC90LAg0L/RgNC4INC90LDQstC10LTQtdC90LjQuCovXHJcbi5hY2NvcmRpb25fdGFiLWxhYmVsOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG59XHJcbi8qINCS0YvQtNC10LvQtdC90LjQtSDRhtCy0LXRgtC+0Lwg0LDQutGC0LjQstC90L7Qs9C+INC/0YPQvdC60YLQsCAqL1xyXG5pbnB1dDpjaGVja2VkICsgLmFjY29yZGlvbl90YWItbGFiZWwge1xyXG4gICAgYmFja2dyb3VuZDogI2ZhZmFmYTtcclxuICB9XHJcbi8qICDQodGC0YDQtdC70L7Rh9C60LAgKi9cclxuLmFjY29yZGlvbl90YWItbGFiZWw6OmFmdGVyIHtcclxuICAgIC8qY29udGVudDogXCJeXCI7Ki9cclxuICAgIGNvbnRlbnQ6IHVybCgvYXNzZXRzL2ltZy9iYS1lZGl0L2Fyci1ncmVlbi10b3AucG5nKTsgXHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC43cztcclxuICB9XHJcbiAgLyog0J/QtdGA0LXQstC+0YDQvtGCINGB0YLRgNC10LvQvtGH0LrQuCDQv9GA0Lgg0L3QsNC20LDRgtC40LgqL1xyXG4gIGlucHV0OmNoZWNrZWQgKyAuYWNjb3JkaW9uX3RhYi1sYWJlbDo6YWZ0ZXIge1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcclxuICB9Il19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc3RhdGljL2hlbHAtcXVlc3Rpb24vaGVscC1xdWVzdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxxQkFBcUI7QUFDckI7SUFDSSxXQUFXO0lBQ1gsY0FBYztJQUNkLGdCQUFnQjtFQUNsQjtBQUNGLHVCQUF1QjtBQUN2QjtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsWUFBWTtFQUNaLGdCQUFnQixDQUFDLGVBQWU7RUFDaEMsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixnQ0FBZ0M7QUFDbEM7QUFDQSxxQ0FBcUM7QUFDckM7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQSxzQ0FBc0M7QUFDdEM7SUFDSSxtQkFBbUI7RUFDckI7QUFDRixlQUFlO0FBQ2Y7SUFDSSxnQkFBZ0I7SUFDaEIsbURBQW1EO0lBQ25ELGtCQUFrQjtJQUNsQixvQkFBb0I7RUFDdEI7RUFDQSxtQ0FBbUM7RUFDbkM7SUFDRSx5QkFBeUI7RUFDM0I7QUFDRiw0bEVBQTRsRSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKsOQwqLDkMK1w5DCusORwoHDkcKCIMOQwrIgw5DCsMOQwrrDkMK6w5DCvsORwoDDkMK0w5DCuMOQwr7DkMK9w5DCtSovXHJcbi5hY2NvcmRpb25fdGFiIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgY29sb3I6ICMxMTE0MkQ7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIH1cclxuLyrDkMKXw5DCsMOQwrPDkMK+w5DCu8OQwr7DkMKyw5DCvsOQwrogw5DCsMOQwrrDkMK6w5DCvsORwoDDkMK0w5DCuMOQwr7DkMK9w5DCsCovXHJcbi5hY2NvcmRpb25fdGFiLWxhYmVsIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBwYWRkaW5nOiAxZW07XHJcbiAgYmFja2dyb3VuZDogI2ZmZjsvKiRncmVlbi1iYXNpYyovIFxyXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjQzBDNUQ1O1xyXG59XHJcbi8qw5DCl8OQwrDDkMKzw5DCvsOQwrvDkMK+w5DCssOQwr7DkMK6IMOQwrDDkMK6w5DCusOQwr7DkcKAw5DCtMOQwrjDkMK+w5DCvcOQwrAgw5DCv8ORwoDDkMK4IMOQwr3DkMKww5DCssOQwrXDkMK0w5DCtcOQwr3DkMK4w5DCuCovXHJcbi5hY2NvcmRpb25fdGFiLWxhYmVsOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG59XHJcbi8qIMOQwpLDkcKLw5DCtMOQwrXDkMK7w5DCtcOQwr3DkMK4w5DCtSDDkcKGw5DCssOQwrXDkcKCw5DCvsOQwrwgw5DCsMOQwrrDkcKCw5DCuMOQwrLDkMK9w5DCvsOQwrPDkMK+IMOQwr/DkcKDw5DCvcOQwrrDkcKCw5DCsCAqL1xyXG5pbnB1dDpjaGVja2VkICsgLmFjY29yZGlvbl90YWItbGFiZWwge1xyXG4gICAgYmFja2dyb3VuZDogI2ZhZmFmYTtcclxuICB9XHJcbi8qICDDkMKhw5HCgsORwoDDkMK1w5DCu8OQwr7DkcKHw5DCusOQwrAgKi9cclxuLmFjY29yZGlvbl90YWItbGFiZWw6OmFmdGVyIHtcclxuICAgIC8qY29udGVudDogXCJeXCI7Ki9cclxuICAgIGNvbnRlbnQ6IHVybCgvYXNzZXRzL2ltZy9iYS1lZGl0L2Fyci1ncmVlbi10b3AucG5nKTsgXHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC43cztcclxuICB9XHJcbiAgLyogw5DCn8OQwrXDkcKAw5DCtcOQwrLDkMK+w5HCgMOQwr7DkcKCIMORwoHDkcKCw5HCgMOQwrXDkMK7w5DCvsORwofDkMK6w5DCuCDDkMK/w5HCgMOQwrggw5DCvcOQwrDDkMK2w5DCsMORwoLDkMK4w5DCuCovXHJcbiAgaW5wdXQ6Y2hlY2tlZCArIC5hY2NvcmRpb25fdGFiLWxhYmVsOjphZnRlciB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gIH0iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 87901:
/*!*********************************************************************************!*\
  !*** ./src/app/static/help-questions-answer/help-questions-answer.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelpQuestionsAnswerComponent: () => (/* binding */ HelpQuestionsAnswerComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
var _HelpQuestionsAnswerComponent;

class HelpQuestionsAnswerComponent {}
_HelpQuestionsAnswerComponent = HelpQuestionsAnswerComponent;
_HelpQuestionsAnswerComponent.ɵfac = function HelpQuestionsAnswerComponent_Factory(t) {
  return new (t || _HelpQuestionsAnswerComponent)();
};
_HelpQuestionsAnswerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _HelpQuestionsAnswerComponent,
  selectors: [["app-help-questions-answer"]],
  decls: 30,
  vars: 0,
  consts: [[1, "cont-horiz", 2, "background", "#FAFAFC", "padding-bottom", "20px"], [1, "cont-vert", "list1200"], [1, "cont-vert-start-start", "w100", "left-right20"], [1, "cont-horiz-start", "margin-top50", "margin-bottom50"], [1, "cont-horiz", "btn-back", "margin-right30"], [1, "margin-bottom20"], ["width", "560", "height", "315", "src", "https://www.youtube.com/embed/DzqfBxlvANQ", "title", "YouTube video player", "frameborder", "0", "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", "allowfullscreen", "", 1, "margin-bottom40", "border-radius:40px"], [1, "margin-top50", "margin-bottom20"], [1, "margin-bottom40"], [1, "w100", "cont-horiz-start-start", "wrap", 2, "margin-bottom", "50px"], [1, "cont-horiz", "btn-green", "margin-right20", "margin-bottom20", 2, "max-width", "280px"], [1, "margin-right10"], ["src", "/assets/img/help/chat.png"], [1, "cont-horiz", "btn-green", "margin-bottom20", 2, "max-width", "280px"], ["src", "/assets/img/help/mail.png"]],
  template: function HelpQuestionsAnswerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "a", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div")(6, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "\u041F\u043E\u043C\u043E\u0449\u044C");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5)(9, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\u041A\u0430\u043A \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442?");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "iframe", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " \u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438 \u0434\u043E\u0441\u0442\u0438\u0433\u043B\u0438 \u0442\u0430\u043A\u043E\u0433\u043E \u0443\u0440\u043E\u0432\u043D\u044F, \u0447\u0442\u043E \u0433\u0440\u0430\u043D\u0438\u0446\u0430 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F \u043A\u0430\u0434\u0440\u043E\u0432 \u0441\u043E\u0437\u0434\u0430\u0451\u0442 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u043D \u0446\u0435\u043B\u043E\u0433\u043E \u0440\u044F\u0434\u0430 \u0432\u043D\u0435\u043E\u0447\u0435\u0440\u0435\u0434\u043D\u044B\u0445 \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0439 \u0441 \u0443\u0447\u0451\u0442\u043E\u043C \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u0430 \u0444\u043E\u0440\u043C \u0432\u043E\u0437\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F.\n\u042F\u0432\u043B\u044F\u044F\u0441\u044C \u0432\u0441\u0435\u0433\u043E \u043B\u0438\u0448\u044C \u0447\u0430\u0441\u0442\u044C\u044E \u043E\u0431\u0449\u0435\u0439 \u043A\u0430\u0440\u0442\u0438\u043D\u044B, \u0434\u0438\u0430\u0433\u0440\u0430\u043C\u043C\u044B \u0441\u0432\u044F\u0437\u0435\u0439 \u043F\u0440\u0438\u0437\u044B\u0432\u0430\u044E\u0442 \u043D\u0430\u0441 \u043A \u043D\u043E\u0432\u044B\u043C \u0441\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435, \u0432 \u0441\u0432\u043E\u044E \u043E\u0447\u0435\u0440\u0435\u0434\u044C, \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043F\u0440\u0435\u0434\u0430\u043D\u044B \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u043E-\u0434\u0435\u043C\u043E\u043A\u0440\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0430\u043D\u0430\u0444\u0435\u043C\u0435!\n\u041A\u0430\u0440\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0433\u043E\u0432\u043E\u0440\u044B \u043D\u0435 \u0434\u043E\u043F\u0443\u0441\u043A\u0430\u044E\u0442 \u0441\u0438\u0442\u0443\u0430\u0446\u0438\u0438, \u043F\u0440\u0438 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043D\u0435\u043F\u043E\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430 \u0431\u0443\u0434\u0443\u0442 \u043F\u0440\u0438\u0437\u0432\u0430\u043D\u044B \u043A \u043E\u0442\u0432\u0435\u0442\u0443. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 7)(15, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " \u041C\u044B \u043B\u044E\u0431\u0438\u043C \u043E\u0431\u0449\u0430\u0442\u044C\u0441\u044F. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 9)(20, "a", 10)(21, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "img", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "\u0427\u0430\u0442");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 13)(26, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "img", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "\u041F\u043E\u0447\u0442\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoZWxwLXF1ZXN0aW9ucy1hbnN3ZXIuY29tcG9uZW50LmNzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc3RhdGljL2hlbHAtcXVlc3Rpb25zLWFuc3dlci9oZWxwLXF1ZXN0aW9ucy1hbnN3ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esb0xBQW9MIiwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 54714:
/*!***********************************************!*\
  !*** ./src/app/static/help/help.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelpComponent: () => (/* binding */ HelpComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _common_faq_question_faq_question_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/faq-question/faq-question.component */ 62653);
var _HelpComponent;




const _c0 = "\u0412 \u043F\u0440\u0430\u0432\u043E\u0439 \u043A\u043E\u043B\u043E\u043D\u043A\u0435, \u0432 \u0441\u0430\u043C\u043E\u043C \u043D\u0438\u0437\u0443 \u0431\u043B\u043E\u043A\u0430 \u043D\u0430\u0439\u0434\u0438\u0442\u0435 \u0438 \u043A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u043F\u043E \u043A\u043D\u043E\u043F\u043A\u0435 \u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043E\u043D\u043B\u0430\u0439\u043D ";
const _c1 = function () {
  return ["\u041F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u0432 \u043F\u0440\u043E\u0444\u0438\u043B\u044C \u043C\u0430\u0441\u0442\u0435\u0440\u0430", _c0];
};
const _c2 = "\u0412 \u043B\u0435\u0432\u043E\u043C \u0431\u043B\u043E\u043A\u0435 (\u043D\u0438\u0436\u043D\u0435\u043C) \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0441\u043B\u0443\u0433\u0438, \u043D\u0430 \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F - \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u0440\u0430\u0437\u0443 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0443\u0441\u043B\u0443\u0433";
const _c3 = "\u041F\u043E\u0441\u043B\u0435 \u0432\u044B\u0431\u043E\u0440\u0430 \u0443\u0441\u043B\u0443\u0433, \u0432 \u0432\u0435\u0440\u0445\u043D\u0435\u0439 \u0447\u0430\u0441\u0442\u0438 \u0431\u043B\u043E\u043A\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u043A\u043D\u043E\u043F\u043A\u0430 \u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044E";
const _c4 = "\u041D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u043D\u044C \u0438 \u0443\u0434\u043E\u0431\u043D\u044B\u0439 \u0441\u043B\u043E\u0442 \u0434\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0438, \u0434\u0430\u043B\u0435\u0435 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 (\u043F\u0440\u0438 \u043D\u0435\u043E\u0431\u044A\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0437\u0430\u043F\u0438\u0441\u044C)";
const _c5 = function () {
  return [_c2, _c3, _c4];
};
const _c6 = function () {
  return {
    url: "assets/img/help/record1.png",
    caption: "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0434\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0438"
  };
};
const _c7 = function () {
  return {
    url: "assets/img/help/record2.png",
    caption: "\u0412\u044B\u0431\u043E\u0440 \u0443\u0441\u043B\u0443\u0433"
  };
};
const _c8 = function (a0, a1) {
  return [a0, a1];
};
const _c9 = function (a0, a1, a2) {
  return {
    paragraphs: a0,
    list: a1,
    images: a2
  };
};
const _c10 = function () {
  return ["\u041F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B \u041C\u043E\u0438 \u0437\u0430\u043F\u0438\u0441\u0438", "\u0414\u0430\u043B\u0435\u0435 \u043F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u0432 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0443\u0441\u043B\u0443\u0448\u0438 "];
};
const _c11 = function () {
  return ["\u0420\u0430\u0441\u043A\u0440\u043E\u0439\u043A\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0441 \u0443\u0441\u043B\u0443\u0433\u043E\u0439", "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u043F\u043E \u043A\u043D\u043E\u043F\u043A\u0435 \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C"];
};
const _c12 = function () {
  return {
    url: "assets/img/help/cancel1.png",
    caption: "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0434\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0438"
  };
};
const _c13 = function () {
  return {
    url: "assets/img/help/cancel.png",
    caption: "\u0412\u044B\u0431\u043E\u0440 \u0443\u0441\u043B\u0443\u0433"
  };
};
function HelpComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-faq-question", 11)(2, "app-faq-question", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("content", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction3"](9, _c9, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](2, _c1), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](3, _c5), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](6, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c6), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](5, _c7))));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("content", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction3"](20, _c9, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](13, _c10), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](14, _c11), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](17, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](15, _c12), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](16, _c13))));
  }
}
const _c14 = "\u0412 \u043F\u0440\u0430\u0432\u043E\u0439 \u043A\u043E\u043B\u043E\u043D\u043A\u0435, \u0432 \u0441\u0430\u043C\u043E\u043C \u043D\u0438\u0437\u0443 \u0431\u043B\u043E\u043A\u0430 \u043D\u0430\u0439\u0434\u0438\u0442\u0435 \u0438 \u043A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u043F\u043E \u043A\u043D\u043E\u043F\u043A\u0435 \u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C";
const _c15 = function () {
  return ["\u041F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u0432 \u0441\u0432\u043E\u0439 \u043F\u0440\u043E\u0444\u0438\u043B\u044C", _c14];
};
const _c16 = "\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443 \u0443\u0441\u043B\u0443\u0433, \u0434\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u043A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u043F\u043E \u043A\u043D\u043E\u043F\u043A\u0435 \u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443 \u0443\u0441\u043B\u0443\u0433 - \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B";
const _c17 = "\u0414\u043B\u044F \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0443\u0441\u043B\u0443\u0433\u0438 \u043A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u043F\u043E \u043A\u043D\u043E\u043F\u043A\u0435 \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043F \u0443\u0441\u043B\u0443\u0433\u0443 (\u043F\u043E \u0447\u0430\u0441\u043E\u0432\u0430\u044F \u0438\u043B\u0438 \u0443\u0441\u043B\u0443\u0433\u0430 \u0441 \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u0435\u043C \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438), \u0432 \u043E\u0442\u043A\u0440\u044B\u0432\u0448\u0435\u043C\u0441\u044F \u043C\u0435\u043D\u044E \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u0438 \u043A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u043F\u043E \u043D\u0435\u0439, \u0434\u0430\u043B\u0435\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0443\u0441\u043B\u0443\u0433\u0438";
const _c18 = function () {
  return ["\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0443\u043D\u043A\u0442 \u0423\u0441\u043B\u0443\u0433\u0438", _c16, _c17];
};
const _c19 = function () {
  return {
    url: "assets/img/help/service1.png",
    caption: "\u041F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u0432 \u0441\u0432\u043E\u0439 \u043F\u0440\u043E\u0444\u0438\u043B\u044C"
  };
};
const _c20 = function () {
  return {
    url: "assets/img/help/service2.png",
    caption: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u0440\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0443\u0441\u043B\u0443\u0433"
  };
};
const _c21 = function () {
  return ["\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0443\u0441\u043B\u0443\u0433\u0438", "\u0414\u0430\u043B\u0435\u0435 \u043F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B \u0413\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B "];
};
const _c22 = "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0432\u0440\u0435\u043C\u044F \u043D\u0430\u0447\u0430\u043B\u0430 \u0440\u0430\u0431\u043E\u0442\u044B \u0438 \u0435\u0433\u043E \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F, \u043F\u0440\u0438 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0435\u0440\u044B\u0432";
const _c23 = "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u043C\u0435\u0436\u0434\u0443 \u043D\u0430\u0447\u0430\u043B\u043E\u043C \u0437\u0430\u043F\u0438\u0441\u0435\u0439, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0442\u044C \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0447\u0438\u043D\u0430\u044F \u0441 8:15 \u0438 \u0447\u0442\u043E\u0431\u044B \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 \u043E\u043A\u043D\u043E \u0434\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0438 \u0431\u044B\u043B\u043E \u0432 9:15, \u0442\u043E\u0433\u0434\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u043A\u0440\u0430\u0442\u043D\u044B\u0439 1 \u0447\u0430\u0441\u0443 (60 \u043C\u0438\u043D\u0443\u0442)";
const _c24 = "\u0414\u0430\u043B\u0435\u0435 \u043A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u043F\u043E \u043A\u043D\u043E\u043F\u043A\u0435 \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u043A \u0434\u043D\u044F\u043C \u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u043D\u0438, \u043A\u043E\u0433\u0434\u0430 \u0445\u043E\u0442\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u044D\u0442\u043E\u0442 \u0433\u0440\u0430\u0444\u0438\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u043E\u0432\u0430\u043B";
const _c25 = function () {
  return ["\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u043F\u043E \u043A\u0430\u0440\u0442\u043E\u0439\u043A\u0435 \u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0433\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B", _c22, _c23, _c24];
};
const _c26 = function () {
  return {
    url: "assets/img/help/schedule0.png",
    caption: "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0434\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0438"
  };
};
const _c27 = function () {
  return {
    url: "assets/img/help/schedule1.png",
    caption: "\u0412\u044B\u0431\u043E\u0440 \u0443\u0441\u043B\u0443\u0433"
  };
};
function HelpComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-faq-question", 13)(2, "app-faq-question", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("content", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction3"](9, _c9, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](2, _c15), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](3, _c18), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](6, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](4, _c19), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](5, _c20))));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("content", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction3"](20, _c9, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](13, _c21), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](14, _c25), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](17, _c8, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](15, _c26), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](16, _c27))));
  }
}
class HelpComponent {
  setMaster() {
    this.btnProfile = false;
  }
  setClient() {
    this.btnProfile = true;
  }
  constructor(_router) {
    this._router = _router;
    this.btnProfile = true;
    this.flag = false;
  }
  goToMainPage() {
    this._router.navigate(['/']);
  }
  goToHelpQuestionPage() {
    this._router.navigate(['static/helpQuestion']);
  }
}
_HelpComponent = HelpComponent;
_HelpComponent.ɵfac = function HelpComponent_Factory(t) {
  return new (t || _HelpComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
};
_HelpComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _HelpComponent,
  selectors: [["app-help"]],
  decls: 21,
  vars: 4,
  consts: [[1, "cont-horiz", 2, "background", "#FAFAFC", "padding-bottom", "20px"], [1, "cont-vert", "list1200"], [1, "cont-vert-start-start", "w100", "left-right20"], [1, "cont-horiz-start", "margin-top50", "margin-bottom50"], [1, "cont-horiz", "btn-back", "margin-right30", 3, "click"], [1, "container"], [1, "hero"], [1, "help-toggle"], [3, "ngClass", "click"], ["class", "faq-section", 4, "ngIf"], [1, "faq-section"], ["question", "\u041A\u0430\u043A \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0443\u0441\u043B\u0443\u0433\u0443?", 3, "content"], ["question", "\u041A\u0430\u043A \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C?", 3, "content"], ["question", "\u041A\u0430\u043A \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443?", 3, "content"], ["question", "\u041A\u0430\u043A \u043D\u0430\u0447\u0430\u0442\u044C \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u044B?", 3, "content"]],
  template: function HelpComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpComponent_Template_div_click_4_listener() {
        return ctx.goToMainPage();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div")(6, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "\u041F\u043E\u043C\u043E\u0449\u044C");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 5)(9, "div", 6)(10, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "\u0426\u0435\u043D\u0442\u0440 \u043F\u043E\u043C\u043E\u0449\u0438 OnWaves");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "\u041E\u0442\u0432\u0435\u0442\u044B \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043E \u0437\u0430\u043F\u0438\u0441\u0438, \u043E\u0431\u0449\u0435\u043D\u0438\u0438 \u0438 \u0440\u0430\u0431\u043E\u0442\u0435 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 7)(15, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpComponent_Template_div_click_15_listener() {
        return ctx.setClient();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "\u0414\u043B\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HelpComponent_Template_div_click_17_listener() {
        return ctx.setMaster();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "\u0414\u043B\u044F \u043C\u0430\u0441\u0442\u0435\u0440\u043E\u0432");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, HelpComponent_div_19_Template, 3, 24, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, HelpComponent_div_20_Template, 3, 24, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", ctx.btnProfile ? "btn-recommend1" : "btn-recommend3");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", !ctx.btnProfile ? "btn-recommend1" : "btn-recommend2");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.btnProfile);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.btnProfile);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _common_faq_question_faq_question_component__WEBPACK_IMPORTED_MODULE_0__.FaqQuestionComponent],
  styles: ["@charset \"UTF-8\";\n\n\n\n\n.color-green-dark[_ngcontent-%COMP%] {\n  color: #043c48;\n}\n\n.background-green-dark[_ngcontent-%COMP%] {\n  background-color: #043c48;\n}\n\n.ico-background-green[_ngcontent-%COMP%] {\n  background-color: #006174;\n}\n\n.ico-background-green[_ngcontent-%COMP%]:hover {\n  background-color: #043c48;\n}\n\n.green-txt-hover[_ngcontent-%COMP%]:hover {\n  cursor: pointer;\n  display: inline-block;\n  color: #043c48;\n}\n\n\n\n.color-green-basic[_ngcontent-%COMP%] {\n  color: #006174;\n}\n\n.background-green-basic[_ngcontent-%COMP%] {\n  background-color: #006174;\n}\n\n\n\n.color-green-light[_ngcontent-%COMP%] {\n  color: #0d94a0;\n}\n\n.background-green-light[_ngcontent-%COMP%] {\n  background-color: #0d94a0;\n}\n\n\n\n.color-black[_ngcontent-%COMP%] {\n  color: #23262F;\n}\n\n.background-black[_ngcontent-%COMP%] {\n  background-color: #23262F;\n}\n\n\n\n\n\n.color-grey-dark[_ngcontent-%COMP%] {\n  color: #9196A4;\n}\n\n.background-grey-dark[_ngcontent-%COMP%] {\n  background-color: #9196A4;\n}\n\n\n\n.color-grey[_ngcontent-%COMP%] {\n  color: #DDE2ED;\n}\n\n.background-grey[_ngcontent-%COMP%] {\n  background-color: #DDE2ED;\n}\n\n\n\n.color-grey-light[_ngcontent-%COMP%] {\n  color: #FAFAFC;\n}\n\n.background-grey-light[_ngcontent-%COMP%] {\n  background-color: #FAFAFC;\n}\n\n\n\n.color-white[_ngcontent-%COMP%] {\n  color: #fff;\n}\n\n.background-white[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n\n\n\n.color-success[_ngcontent-%COMP%] {\n  color: #4FB229;\n}\n\n.background-success[_ngcontent-%COMP%] {\n  background-color: #4FB229;\n}\n\n\n\n.color-info[_ngcontent-%COMP%] {\n  color: #0A6ED8;\n}\n\n.background-info[_ngcontent-%COMP%] {\n  background-color: #0A6ED8;\n}\n\n\n\n.color-warning[_ngcontent-%COMP%] {\n  color: #dbdf9b;\n}\n\n.background-warning[_ngcontent-%COMP%] {\n  background-color: #dbdf9b;\n}\n\n\n\n.color-error[_ngcontent-%COMP%] {\n  color: #d46c54;\n}\n\n.background-error[_ngcontent-%COMP%] {\n  background-color: #d46c54;\n}\n\n\n\n.color-label[_ngcontent-%COMP%] {\n  color: #1D3C48;\n}\n\n.background-label[_ngcontent-%COMP%] {\n  background-color: #1D3C48;\n}\n\n\n\n.help-phone[_ngcontent-%COMP%] {\n  margin-right: 30px;\n}\n\n.help-cont[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 1200px;\n  gap: 30px 10px;\n  flex-wrap: wrap;\n  margin-bottom: 30px;\n}\n\n@media screen and (max-width: 480px) {\n  .help-cont[_ngcontent-%COMP%] {\n    max-width: 320px;\n  }\n}\n.help-video[_ngcontent-%COMP%] {\n  width: 280px;\n  overflow: hidden;\n  \n\n}\n\n.help-video-head[_ngcontent-%COMP%] {\n  width: 280px;\n  height: 50px;\n  margin-bottom: 10px;\n}\n\n.help-video-question[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  border: 3px solid #006174;\n  padding: 30px 25px 30px 25px;\n}\n\n@media screen and (max-width: 480px) {\n  .help-phone[_ngcontent-%COMP%] {\n    margin-right: 10px;\n    width: 100px;\n  }\n  .help-video[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n.faq-question[_ngcontent-%COMP%] {\n  width: 100%;\n  background: none;\n  border: none;\n  font-size: 15px;\n  font-weight: bold;\n  color: #494444;\n  text-align: left;\n  cursor: pointer;\n  padding: 10px;\n  border-bottom: 1px solid #333;\n}\n\n.container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 60px 20px;\n}\n\n.help-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 8px;\n  background: #F0F2F5;\n  border-radius: 100px;\n  padding: 4px;\n  margin: 32px auto;\n}\n\n@media screen and (max-width: 640px) {\n  .container[_ngcontent-%COMP%] {\n    padding: 24px 16px;\n  }\n  .hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .help-toggle[_ngcontent-%COMP%] {\n    margin: 20px auto;\n  }\n}\n\n\n.hero[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 40px;\n}\n\n.hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 36px;\n  margin-bottom: 10px;\n}\n\n.hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--muted);\n  margin-bottom: 30px;\n}\n\n.search[_ngcontent-%COMP%] {\n  max-width: 500px;\n  margin: 0 auto;\n}\n\n.search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 14px 18px;\n  border-radius: 12px;\n  border: none;\n  font-size: 16px;\n  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);\n}\n\n\n\n.toggle[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  background: #e9edff;\n  border-radius: 12px;\n  padding: 4px;\n  width: 320px;\n  margin: 40px auto;\n}\n\n.toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  padding: 10px;\n  border-radius: 10px;\n  cursor: pointer;\n  background: transparent;\n  font-weight: 500;\n}\n\n.toggle[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: white;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n}\n\n\n\n.faq-section.active[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.faq-item[_ngcontent-%COMP%] {\n  background: var(--card);\n  border-radius: var(--radius);\n  margin-bottom: 12px;\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n}\n\n.faq-question[_ngcontent-%COMP%] {\n  padding: 18px;\n  cursor: pointer;\n  font-weight: 500;\n}\n\n.faq-answer[_ngcontent-%COMP%] {\n  padding: 0 18px 18px 18px;\n  display: none;\n  color: var(--muted);\n}\n\n.faq-item.open[_ngcontent-%COMP%]   .faq-answer[_ngcontent-%COMP%] {\n  display: block;\n}\n\n\n\n.support[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 50px;\n  padding: 30px;\n  background: white;\n  border-radius: var(--radius);\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);\n}\n\n.support[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 15px;\n  padding: 12px 24px;\n  border-radius: 10px;\n  border: none;\n  background: var(--primary);\n  color: white;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHAuY29tcG9uZW50LnNjc3MiLCIuLlxcLi5cXC4uXFxhc3NldHNcXHN0eWxlc1xcbWFpblxcY29sb3Iuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUNBaEIseUJBQUE7QUFHQSxJQUFBO0FBRUE7RUFBdUIsY0FEWDtBRENaOztBQ0NBO0VBQXdCLHlCQUZaO0FES1o7O0FDRkE7RUFBd0IseUJBQUE7QURNeEI7O0FDTEE7RUFBOEIseUJBQUE7QURTOUI7O0FDUkE7RUFDSSxlQUFBO0VBQ0EscUJBQUE7RUFDQSxjQVJRO0FEbUJaOztBQ1JBLElBQUE7QUFFQTtFQUFvQixjQURQO0FEWWI7O0FDVkE7RUFBd0IseUJBRlg7QURnQmI7O0FDYkEsSUFBQTtBQUVBO0VBQW1CLGNBRE47QURpQmI7O0FDZkE7RUFBd0IseUJBRlg7QURxQmI7O0FDbEJBLElBQUE7QUFHQTtFQUFhLGNBRE47QURxQlA7O0FDbkJBO0VBQWtCLHlCQUZYO0FEeUJQOztBQ3RCQSxJQUFBO0FBQ3FCLFNBQUE7QUFDckI7RUFBaUIsY0FETjtBRDJCWDs7QUN6QkE7RUFBc0IseUJBRlg7QUQrQlg7O0FDNUJBLElBQUE7QUFFQTtFQUFZLGNBRE47QURnQ047O0FDOUJBO0VBQWlCLHlCQUZYO0FEb0NOOztBQ2pDQSxJQUFBO0FBRUE7RUFBa0IsY0FETjtBRHFDWjs7QUNuQ0E7RUFBdUIseUJBRlg7QUR5Q1o7O0FDdENBLElBQUE7QUFFQTtFQUFhLFdBRE47QUQwQ1A7O0FDeENBO0VBQWtCLHNCQUZYO0FEOENQOztBQzNDQSxJQUFBO0FBRUE7RUFBZSxjQURBO0FEK0NmOztBQzdDQTtFQUFvQix5QkFGTDtBRG1EZjs7QUNoREEsS0FBQTtBQUVBO0VBQWEsY0FERDtBRG9EWjs7QUNsREE7RUFBa0IseUJBRk47QUR3RFo7O0FDckRBLEtBQUE7QUFFQTtFQUFlLGNBREE7QUR5RGY7O0FDdkRBO0VBQW9CLHlCQUZMO0FENkRmOztBQzFEQSxLQUFBO0FBRUE7RUFBYSxjQURBO0FEOERiOztBQzVEQTtFQUFrQix5QkFGTDtBRGtFYjs7QUMvREEsaUNBQUE7QUFFQTtFQUFlLGNBREQ7QURtRWQ7O0FDakVBO0VBQW9CLHlCQUZOO0FEdUVkOztBQ3BFQSx1QkFBQTtBRDdEQTtFQUNJLGtCQUFBO0FBcUlKOztBQWxJQTtFQUNJLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUFxSUo7O0FBbklFO0VBQ0U7SUFDRSxnQkFBQTtFQXNJSjtBQUNGO0FBcElFO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsNkJBQUE7QUFzSUo7O0FBcElFO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQXVJSjs7QUFySUU7RUFDRSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsNEJBQUE7QUF3SUo7O0FBdElFO0VBQ0U7SUFDSSxrQkFBQTtJQUNBLFlBQUE7RUF5SU47RUF2SUU7SUFDRSxXQUFBO0VBeUlKO0FBQ0Y7QUFySUE7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQyxZQUFBO0VBQ0MsZUFBQTtFQUNBLGlCQUFBO0VBQ0MsY0FBQTtFQUNBLGdCQUFBO0VBQ0MsZUFBQTtFQUNBLGFBQUE7RUFDQyw2QkFBQTtBQXVJUDs7QUFuSUE7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtBQXNJRjs7QUFuSUE7RUFDRSxvQkFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBc0lGOztBQW5JQTtFQUNFO0lBQ0Usa0JBQUE7RUFzSUY7RUFuSUE7SUFDRSxlQUFBO0VBcUlGO0VBbElBO0lBQ0UsaUJBQUE7RUFvSUY7QUFDRjtBQWpJQSxTQUFBO0FBQ0E7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0FBbUlGOztBQWhJQTtFQUNFLGVBQUE7RUFDQSxtQkFBQTtBQW1JRjs7QUFoSUE7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0FBbUlGOztBQWhJQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQW1JRjs7QUFoSUE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsMENBQUE7QUFtSUY7O0FBaElBLFdBQUE7QUFDQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBbUlGOztBQWhJQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7QUFtSUY7O0FBaElBO0VBQ0UsaUJBQUE7RUFDQSwwQ0FBQTtBQW1JRjs7QUFoSUEsUUFBQTtBQUVBO0VBQ0UsY0FBQTtBQWtJRjs7QUEvSEE7RUFDRSx1QkFBQTtFQUNBLDRCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQ0FBQTtFQUNBLGdCQUFBO0FBa0lGOztBQS9IQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFrSUY7O0FBL0hBO0VBQ0UseUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFrSUY7O0FBL0hBO0VBQ0UsY0FBQTtBQWtJRjs7QUEvSEEsWUFBQTtBQUNBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLDRCQUFBO0VBQ0EsMENBQUE7QUFrSUY7O0FBL0hBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLDBCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUFrSUYiLCJmaWxlIjoiaGVscC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvc3R5bGVzL21haW4vY29sb3Iuc2Nzc1wiO1xyXG5cclxuXHJcbi5oZWxwLXBob25le1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG59IFxyXG5cclxuLmhlbHAtY29udHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XHJcbiAgICBnYXA6IDMwcHggMTBweDsgIFxyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweCA7XHJcbiAgfVxyXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgICAuaGVscC1jb250e1xyXG4gICAgICBtYXgtd2lkdGg6IDMyMHB4O1xyXG4gICAgfVxyXG4gIH1cclxuICAuaGVscC12aWRlb3tcclxuICAgIHdpZHRoOiAyODBweDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47IFxyXG4gICAgLypiYWNrZ3JvdW5kLWNvbG9yOiAjMTExNDJEOyovXHJcbiAgfVxyXG4gIC5oZWxwLXZpZGVvLWhlYWR7XHJcbiAgICB3aWR0aDogMjgwcHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4OyBcclxuICB9XHJcbiAgLmhlbHAtdmlkZW8tcXVlc3Rpb257XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4OyBcclxuICAgIGJvcmRlcjogM3B4IHNvbGlkICRncmVlbi1iYXNpYzsgXHJcbiAgICBwYWRkaW5nOiAzMHB4IDI1cHggMzBweCAyNXB4O1xyXG4gIH1cclxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0ODBweCkge1xyXG4gICAgLmhlbHAtcGhvbmV7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gICAgICAgIHdpZHRoOiAxMDBweDtcclxuICAgIH0gIFxyXG4gICAgLmhlbHAtdmlkZW97XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbi5mYXEtcXVlc3Rpb257XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZDogbm9uZTtcclxuICAgYm9yZGVyOiBub25lO1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgY29sb3I6ICM0OTQ0NDQ7IFxyXG4gICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjsgXHJcbiAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzMzMztcclxufVxyXG5cclxuXHJcbi5jb250YWluZXIge1xyXG4gIG1heC13aWR0aDogOTAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgcGFkZGluZzogNjBweCAyMHB4O1xyXG59XHJcblxyXG4uaGVscC10b2dnbGUge1xyXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gIGdhcDogOHB4O1xyXG4gIGJhY2tncm91bmQ6ICNGMEYyRjU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTAwcHg7XHJcbiAgcGFkZGluZzogNHB4O1xyXG4gIG1hcmdpbjogMzJweCBhdXRvO1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2NDBweCkge1xyXG4gIC5jb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMjRweCAxNnB4O1xyXG4gIH1cclxuXHJcbiAgLmhlcm8gaDEge1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gIH1cclxuXHJcbiAgLmhlbHAtdG9nZ2xlIHtcclxuICAgIG1hcmdpbjogMjBweCBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuLyogSEVSTyAqL1xyXG4uaGVybyB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5oZXJvIGgxIHtcclxuICBmb250LXNpemU6IDM2cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLmhlcm8gcCB7XHJcbiAgY29sb3I6IHZhcigtLW11dGVkKTtcclxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG59XHJcblxyXG4uc2VhcmNoIHtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG59XHJcblxyXG4uc2VhcmNoIGlucHV0IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAxNHB4IDE4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGJveC1zaGFkb3c6IDAgNXB4IDIwcHggcmdiYSgwLDAsMCwwLjA1KTtcclxufVxyXG5cclxuLyogVE9HR0xFICovXHJcbi50b2dnbGUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZDogI2U5ZWRmZjtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDRweDtcclxuICB3aWR0aDogMzIwcHg7XHJcbiAgbWFyZ2luOiA0MHB4IGF1dG87XHJcbn1cclxuXHJcbi50b2dnbGUgYnV0dG9uIHtcclxuICBmbGV4OiAxO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbn1cclxuXHJcbi50b2dnbGUgYnV0dG9uLmFjdGl2ZSB7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMDYpO1xyXG59XHJcblxyXG4vKiBGQVEgKi9cclxuXHJcbi5mYXEtc2VjdGlvbi5hY3RpdmUge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uZmFxLWl0ZW0ge1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWNhcmQpO1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cyk7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcclxuICBib3gtc2hhZG93OiAwIDZweCAyMHB4IHJnYmEoMCwwLDAsMC4wNCk7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLmZhcS1xdWVzdGlvbiB7XHJcbiAgcGFkZGluZzogMThweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuLmZhcS1hbnN3ZXIge1xyXG4gIHBhZGRpbmc6IDAgMThweCAxOHB4IDE4cHg7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBjb2xvcjogdmFyKC0tbXV0ZWQpO1xyXG59XHJcblxyXG4uZmFxLWl0ZW0ub3BlbiAuZmFxLWFuc3dlciB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi8qIFNVUFBPUlQgKi9cclxuLnN1cHBvcnQge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tdG9wOiA1MHB4O1xyXG4gIHBhZGRpbmc6IDMwcHg7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzKTtcclxuICBib3gtc2hhZG93OiAwIDhweCAzMHB4IHJnYmEoMCwwLDAsMC4wNSk7XHJcbn1cclxuXHJcbi5zdXBwb3J0IGJ1dHRvbiB7XHJcbiAgbWFyZ2luLXRvcDogMTVweDtcclxuICBwYWRkaW5nOiAxMnB4IDI0cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tcHJpbWFyeSk7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufSIsIi8qIC0tLS0g0KbQktCV0KLQkCBTVEFSVCAtLS0tKi9cclxuXHJcblxyXG4vKjEqL1xyXG4kZ3JlZW4tZGFyazojMDQzYzQ4O1xyXG4uY29sb3ItZ3JlZW4tZGFyayAgICAge2NvbG9yOiAkZ3JlZW4tZGFyazt9XHJcbi5iYWNrZ3JvdW5kLWdyZWVuLWRhcmt7XHRiYWNrZ3JvdW5kLWNvbG9yOiRncmVlbi1kYXJrO31cclxuLmljby1iYWNrZ3JvdW5kLWdyZWVuIHsgYmFja2dyb3VuZC1jb2xvcjojMDA2MTc0O31cclxuLmljby1iYWNrZ3JvdW5kLWdyZWVuOmhvdmVyIHsgYmFja2dyb3VuZC1jb2xvcjojMDQzYzQ4O31cclxuLmdyZWVuLXR4dC1ob3Zlcjpob3ZlcntcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGNvbG9yOiAkZ3JlZW4tZGFyaztcclxuIH1cclxuXHJcbi8qMiovXHJcbiRncmVlbi1iYXNpYzojMDA2MTc0O1xyXG4uY29sb3ItZ3JlZW4tYmFzaWN7XHRjb2xvcjokZ3JlZW4tYmFzaWM7fVxyXG4uYmFja2dyb3VuZC1ncmVlbi1iYXNpY3tiYWNrZ3JvdW5kLWNvbG9yOiRncmVlbi1iYXNpYzt9XHJcbi8qMyovXHJcbiRncmVlbi1saWdodDojMGQ5NGEwO1xyXG4uY29sb3ItZ3JlZW4tbGlnaHR7Y29sb3I6JGdyZWVuLWxpZ2h0O31cclxuLmJhY2tncm91bmQtZ3JlZW4tbGlnaHR7YmFja2dyb3VuZC1jb2xvcjokZ3JlZW4tbGlnaHQ7fVxyXG4vKjQqL1xyXG4kZ3JlZW4tbGlnaHQyOiM1ZWNkZDc7XHJcbiRibGFjazojMjMyNjJGO1xyXG4uY29sb3ItYmxhY2t7Y29sb3I6JGJsYWNrO31cclxuLmJhY2tncm91bmQtYmxhY2t7YmFja2dyb3VuZC1jb2xvcjokYmxhY2s7fVxyXG4vKjUqL1xyXG4kZ3JleS1kYXJrOiM5MTk2QTQgOyAvKkMwQzVENSovXHJcbi5jb2xvci1ncmV5LWRhcmt7Y29sb3I6JGdyZXktZGFyazt9XHJcbi5iYWNrZ3JvdW5kLWdyZXktZGFya3tiYWNrZ3JvdW5kLWNvbG9yOiRncmV5LWRhcms7fVxyXG4vKjYqL1xyXG4kZ3JleTojRERFMkVEO1xyXG4uY29sb3ItZ3JleXtjb2xvcjokZ3JleTt9XHJcbi5iYWNrZ3JvdW5kLWdyZXl7YmFja2dyb3VuZC1jb2xvcjokZ3JleTt9XHJcbi8qNyovXHJcbiRncmV5LWxpZ2h0OiNGQUZBRkM7XHJcbi5jb2xvci1ncmV5LWxpZ2h0e2NvbG9yOiRncmV5LWxpZ2h0O31cclxuLmJhY2tncm91bmQtZ3JleS1saWdodHtiYWNrZ3JvdW5kLWNvbG9yOiRncmV5LWxpZ2h0O31cclxuLyo4Ki9cclxuJHdoaXRlOiNmZmY7XHJcbi5jb2xvci13aGl0ZXtjb2xvcjokd2hpdGU7fVxyXG4uYmFja2dyb3VuZC13aGl0ZXtiYWNrZ3JvdW5kLWNvbG9yOiR3aGl0ZTt9XHJcbi8qOSovXHJcbiRjb2xvci1zdWNjZXNzOiM0RkIyMjk7XHJcbi5jb2xvci1zdWNjZXNze2NvbG9yOiRjb2xvci1zdWNjZXNzO31cclxuLmJhY2tncm91bmQtc3VjY2Vzc3tiYWNrZ3JvdW5kLWNvbG9yOiRjb2xvci1zdWNjZXNzO31cclxuLyoxMCovXHJcbiRjb2xvci1pbmZvOiMwQTZFRDg7XHJcbi5jb2xvci1pbmZveyBjb2xvcjokY29sb3ItaW5mbzt9XHJcbi5iYWNrZ3JvdW5kLWluZm97IGJhY2tncm91bmQtY29sb3I6JGNvbG9yLWluZm87fVxyXG4vKjExKi9cclxuJGNvbG9yLXdhcm5pbmc6I2RiZGY5YjtcclxuLmNvbG9yLXdhcm5pbmd7Y29sb3I6JGNvbG9yLXdhcm5pbmc7fVxyXG4uYmFja2dyb3VuZC13YXJuaW5ne2JhY2tncm91bmQtY29sb3I6JGNvbG9yLXdhcm5pbmc7fVxyXG4vKjEyKi9cclxuJGNvbG9yLWVycm9yOiNkNDZjNTQ7XHJcbi5jb2xvci1lcnJvcntjb2xvcjokY29sb3ItZXJyb3I7fVxyXG4uYmFja2dyb3VuZC1lcnJvcntiYWNrZ3JvdW5kLWNvbG9yOiRjb2xvci1lcnJvcjt9XHJcbi8qMTMg4oCUINCv0YDQu9GL0LrQuC/QvNC10YLQutC4INC/0L7QstC10YDRhSDRhNC+0YLQviAqL1xyXG4kY29sb3ItbGFiZWw6ICMxRDNDNDg7XHJcbi5jb2xvci1sYWJlbCB7IGNvbG9yOiAkY29sb3ItbGFiZWw7IH1cclxuLmJhY2tncm91bmQtbGFiZWwgeyBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItbGFiZWw7IH1cclxuLyogLS0tLSDQptCS0JXQotCQIEVORCAtLS0tKi8iXX0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc3RhdGljL2hlbHAvaGVscC5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hc3NldHMvc3R5bGVzL21haW4vY29sb3Iuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUNBaEIseUJBQUE7QUFHQSxJQUFBO0FBRUE7RUFBdUIsY0FEWDtBRENaOztBQ0NBO0VBQXdCLHlCQUZaO0FES1o7O0FDRkE7RUFBd0IseUJBQUE7QURNeEI7O0FDTEE7RUFBOEIseUJBQUE7QURTOUI7O0FDUkE7RUFDSSxlQUFBO0VBQ0EscUJBQUE7RUFDQSxjQVJRO0FEbUJaOztBQ1JBLElBQUE7QUFFQTtFQUFvQixjQURQO0FEWWI7O0FDVkE7RUFBd0IseUJBRlg7QURnQmI7O0FDYkEsSUFBQTtBQUVBO0VBQW1CLGNBRE47QURpQmI7O0FDZkE7RUFBd0IseUJBRlg7QURxQmI7O0FDbEJBLElBQUE7QUFHQTtFQUFhLGNBRE47QURxQlA7O0FDbkJBO0VBQWtCLHlCQUZYO0FEeUJQOztBQ3RCQSxJQUFBO0FBQ3FCLFNBQUE7QUFDckI7RUFBaUIsY0FETjtBRDJCWDs7QUN6QkE7RUFBc0IseUJBRlg7QUQrQlg7O0FDNUJBLElBQUE7QUFFQTtFQUFZLGNBRE47QURnQ047O0FDOUJBO0VBQWlCLHlCQUZYO0FEb0NOOztBQ2pDQSxJQUFBO0FBRUE7RUFBa0IsY0FETjtBRHFDWjs7QUNuQ0E7RUFBdUIseUJBRlg7QUR5Q1o7O0FDdENBLElBQUE7QUFFQTtFQUFhLFdBRE47QUQwQ1A7O0FDeENBO0VBQWtCLHNCQUZYO0FEOENQOztBQzNDQSxJQUFBO0FBRUE7RUFBZSxjQURBO0FEK0NmOztBQzdDQTtFQUFvQix5QkFGTDtBRG1EZjs7QUNoREEsS0FBQTtBQUVBO0VBQWEsY0FERDtBRG9EWjs7QUNsREE7RUFBa0IseUJBRk47QUR3RFo7O0FDckRBLEtBQUE7QUFFQTtFQUFlLGNBREE7QUR5RGY7O0FDdkRBO0VBQW9CLHlCQUZMO0FENkRmOztBQzFEQSxLQUFBO0FBRUE7RUFBYSxjQURBO0FEOERiOztBQzVEQTtFQUFrQix5QkFGTDtBRGtFYjs7QUMvREEsaUNBQUE7QUFFQTtFQUFlLGNBREQ7QURtRWQ7O0FDakVBO0VBQW9CLHlCQUZOO0FEdUVkOztBQ3BFQSx1QkFBQTtBRDdEQTtFQUNJLGtCQUFBO0FBcUlKOztBQWxJQTtFQUNJLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUFxSUo7O0FBbklFO0VBQ0U7SUFDRSxnQkFBQTtFQXNJSjtBQUNGO0FBcElFO0VBQ0UsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsNkJBQUE7QUFzSUo7O0FBcElFO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtBQXVJSjs7QUFySUU7RUFDRSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsNEJBQUE7QUF3SUo7O0FBdElFO0VBQ0U7SUFDSSxrQkFBQTtJQUNBLFlBQUE7RUF5SU47RUF2SUU7SUFDRSxXQUFBO0VBeUlKO0FBQ0Y7QUFySUE7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQyxZQUFBO0VBQ0MsZUFBQTtFQUNBLGlCQUFBO0VBQ0MsY0FBQTtFQUNBLGdCQUFBO0VBQ0MsZUFBQTtFQUNBLGFBQUE7RUFDQyw2QkFBQTtBQXVJUDs7QUFuSUE7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtBQXNJRjs7QUFuSUE7RUFDRSxvQkFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBc0lGOztBQW5JQTtFQUNFO0lBQ0Usa0JBQUE7RUFzSUY7RUFuSUE7SUFDRSxlQUFBO0VBcUlGO0VBbElBO0lBQ0UsaUJBQUE7RUFvSUY7QUFDRjtBQWpJQSxTQUFBO0FBQ0E7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0FBbUlGOztBQWhJQTtFQUNFLGVBQUE7RUFDQSxtQkFBQTtBQW1JRjs7QUFoSUE7RUFDRSxtQkFBQTtFQUNBLG1CQUFBO0FBbUlGOztBQWhJQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQW1JRjs7QUFoSUE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsMENBQUE7QUFtSUY7O0FBaElBLFdBQUE7QUFDQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBbUlGOztBQWhJQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7QUFtSUY7O0FBaElBO0VBQ0UsaUJBQUE7RUFDQSwwQ0FBQTtBQW1JRjs7QUFoSUEsUUFBQTtBQUVBO0VBQ0UsY0FBQTtBQWtJRjs7QUEvSEE7RUFDRSx1QkFBQTtFQUNBLDRCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQ0FBQTtFQUNBLGdCQUFBO0FBa0lGOztBQS9IQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFrSUY7O0FBL0hBO0VBQ0UseUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7QUFrSUY7O0FBL0hBO0VBQ0UsY0FBQTtBQWtJRjs7QUEvSEEsWUFBQTtBQUNBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLDRCQUFBO0VBQ0EsMENBQUE7QUFrSUY7O0FBL0hBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLDBCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUFrSUY7QUFDQSx3blZBQXduViIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi8uLi9hc3NldHMvc3R5bGVzL21haW4vY29sb3Iuc2Nzc1wiO1xyXG5cclxuXHJcbi5oZWxwLXBob25le1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG59IFxyXG5cclxuLmhlbHAtY29udHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XHJcbiAgICBnYXA6IDMwcHggMTBweDsgIFxyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweCA7XHJcbiAgfVxyXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgICAuaGVscC1jb250e1xyXG4gICAgICBtYXgtd2lkdGg6IDMyMHB4O1xyXG4gICAgfVxyXG4gIH1cclxuICAuaGVscC12aWRlb3tcclxuICAgIHdpZHRoOiAyODBweDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47IFxyXG4gICAgLypiYWNrZ3JvdW5kLWNvbG9yOiAjMTExNDJEOyovXHJcbiAgfVxyXG4gIC5oZWxwLXZpZGVvLWhlYWR7XHJcbiAgICB3aWR0aDogMjgwcHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4OyBcclxuICB9XHJcbiAgLmhlbHAtdmlkZW8tcXVlc3Rpb257XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4OyBcclxuICAgIGJvcmRlcjogM3B4IHNvbGlkICRncmVlbi1iYXNpYzsgXHJcbiAgICBwYWRkaW5nOiAzMHB4IDI1cHggMzBweCAyNXB4O1xyXG4gIH1cclxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0ODBweCkge1xyXG4gICAgLmhlbHAtcGhvbmV7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gICAgICAgIHdpZHRoOiAxMDBweDtcclxuICAgIH0gIFxyXG4gICAgLmhlbHAtdmlkZW97XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbi5mYXEtcXVlc3Rpb257XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZDogbm9uZTtcclxuICAgYm9yZGVyOiBub25lO1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgY29sb3I6ICM0OTQ0NDQ7IFxyXG4gICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjsgXHJcbiAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzMzMztcclxufVxyXG5cclxuXHJcbi5jb250YWluZXIge1xyXG4gIG1heC13aWR0aDogOTAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgcGFkZGluZzogNjBweCAyMHB4O1xyXG59XHJcblxyXG4uaGVscC10b2dnbGUge1xyXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gIGdhcDogOHB4O1xyXG4gIGJhY2tncm91bmQ6ICNGMEYyRjU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTAwcHg7XHJcbiAgcGFkZGluZzogNHB4O1xyXG4gIG1hcmdpbjogMzJweCBhdXRvO1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2NDBweCkge1xyXG4gIC5jb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMjRweCAxNnB4O1xyXG4gIH1cclxuXHJcbiAgLmhlcm8gaDEge1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gIH1cclxuXHJcbiAgLmhlbHAtdG9nZ2xlIHtcclxuICAgIG1hcmdpbjogMjBweCBhdXRvO1xyXG4gIH1cclxufVxyXG5cclxuLyogSEVSTyAqL1xyXG4uaGVybyB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XHJcbn1cclxuXHJcbi5oZXJvIGgxIHtcclxuICBmb250LXNpemU6IDM2cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG5cclxuLmhlcm8gcCB7XHJcbiAgY29sb3I6IHZhcigtLW11dGVkKTtcclxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG59XHJcblxyXG4uc2VhcmNoIHtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG59XHJcblxyXG4uc2VhcmNoIGlucHV0IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAxNHB4IDE4cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGJveC1zaGFkb3c6IDAgNXB4IDIwcHggcmdiYSgwLDAsMCwwLjA1KTtcclxufVxyXG5cclxuLyogVE9HR0xFICovXHJcbi50b2dnbGUge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZDogI2U5ZWRmZjtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIHBhZGRpbmc6IDRweDtcclxuICB3aWR0aDogMzIwcHg7XHJcbiAgbWFyZ2luOiA0MHB4IGF1dG87XHJcbn1cclxuXHJcbi50b2dnbGUgYnV0dG9uIHtcclxuICBmbGV4OiAxO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbn1cclxuXHJcbi50b2dnbGUgYnV0dG9uLmFjdGl2ZSB7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMDYpO1xyXG59XHJcblxyXG4vKiBGQVEgKi9cclxuXHJcbi5mYXEtc2VjdGlvbi5hY3RpdmUge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uZmFxLWl0ZW0ge1xyXG4gIGJhY2tncm91bmQ6IHZhcigtLWNhcmQpO1xyXG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXJhZGl1cyk7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcclxuICBib3gtc2hhZG93OiAwIDZweCAyMHB4IHJnYmEoMCwwLDAsMC4wNCk7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLmZhcS1xdWVzdGlvbiB7XHJcbiAgcGFkZGluZzogMThweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuLmZhcS1hbnN3ZXIge1xyXG4gIHBhZGRpbmc6IDAgMThweCAxOHB4IDE4cHg7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBjb2xvcjogdmFyKC0tbXV0ZWQpO1xyXG59XHJcblxyXG4uZmFxLWl0ZW0ub3BlbiAuZmFxLWFuc3dlciB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi8qIFNVUFBPUlQgKi9cclxuLnN1cHBvcnQge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW4tdG9wOiA1MHB4O1xyXG4gIHBhZGRpbmc6IDMwcHg7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tcmFkaXVzKTtcclxuICBib3gtc2hhZG93OiAwIDhweCAzMHB4IHJnYmEoMCwwLDAsMC4wNSk7XHJcbn1cclxuXHJcbi5zdXBwb3J0IGJ1dHRvbiB7XHJcbiAgbWFyZ2luLXRvcDogMTVweDtcclxuICBwYWRkaW5nOiAxMnB4IDI0cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYmFja2dyb3VuZDogdmFyKC0tcHJpbWFyeSk7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufSIsIi8qIC0tLS0gw5DCpsOQwpLDkMKVw5DCosOQwpAgU1RBUlQgLS0tLSovXHJcblxyXG5cclxuLyoxKi9cclxuJGdyZWVuLWRhcms6IzA0M2M0ODtcclxuLmNvbG9yLWdyZWVuLWRhcmsgICAgIHtjb2xvcjogJGdyZWVuLWRhcms7fVxyXG4uYmFja2dyb3VuZC1ncmVlbi1kYXJre1x0YmFja2dyb3VuZC1jb2xvcjokZ3JlZW4tZGFyazt9XHJcbi5pY28tYmFja2dyb3VuZC1ncmVlbiB7IGJhY2tncm91bmQtY29sb3I6IzAwNjE3NDt9XHJcbi5pY28tYmFja2dyb3VuZC1ncmVlbjpob3ZlciB7IGJhY2tncm91bmQtY29sb3I6IzA0M2M0ODt9XHJcbi5ncmVlbi10eHQtaG92ZXI6aG92ZXJ7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBjb2xvcjogJGdyZWVuLWRhcms7XHJcbiB9XHJcblxyXG4vKjIqL1xyXG4kZ3JlZW4tYmFzaWM6IzAwNjE3NDtcclxuLmNvbG9yLWdyZWVuLWJhc2lje1x0Y29sb3I6JGdyZWVuLWJhc2ljO31cclxuLmJhY2tncm91bmQtZ3JlZW4tYmFzaWN7YmFja2dyb3VuZC1jb2xvcjokZ3JlZW4tYmFzaWM7fVxyXG4vKjMqL1xyXG4kZ3JlZW4tbGlnaHQ6IzBkOTRhMDtcclxuLmNvbG9yLWdyZWVuLWxpZ2h0e2NvbG9yOiRncmVlbi1saWdodDt9XHJcbi5iYWNrZ3JvdW5kLWdyZWVuLWxpZ2h0e2JhY2tncm91bmQtY29sb3I6JGdyZWVuLWxpZ2h0O31cclxuLyo0Ki9cclxuJGdyZWVuLWxpZ2h0MjojNWVjZGQ3O1xyXG4kYmxhY2s6IzIzMjYyRjtcclxuLmNvbG9yLWJsYWNre2NvbG9yOiRibGFjazt9XHJcbi5iYWNrZ3JvdW5kLWJsYWNre2JhY2tncm91bmQtY29sb3I6JGJsYWNrO31cclxuLyo1Ki9cclxuJGdyZXktZGFyazojOTE5NkE0IDsgLypDMEM1RDUqL1xyXG4uY29sb3ItZ3JleS1kYXJre2NvbG9yOiRncmV5LWRhcms7fVxyXG4uYmFja2dyb3VuZC1ncmV5LWRhcmt7YmFja2dyb3VuZC1jb2xvcjokZ3JleS1kYXJrO31cclxuLyo2Ki9cclxuJGdyZXk6I0RERTJFRDtcclxuLmNvbG9yLWdyZXl7Y29sb3I6JGdyZXk7fVxyXG4uYmFja2dyb3VuZC1ncmV5e2JhY2tncm91bmQtY29sb3I6JGdyZXk7fVxyXG4vKjcqL1xyXG4kZ3JleS1saWdodDojRkFGQUZDO1xyXG4uY29sb3ItZ3JleS1saWdodHtjb2xvcjokZ3JleS1saWdodDt9XHJcbi5iYWNrZ3JvdW5kLWdyZXktbGlnaHR7YmFja2dyb3VuZC1jb2xvcjokZ3JleS1saWdodDt9XHJcbi8qOCovXHJcbiR3aGl0ZTojZmZmO1xyXG4uY29sb3Itd2hpdGV7Y29sb3I6JHdoaXRlO31cclxuLmJhY2tncm91bmQtd2hpdGV7YmFja2dyb3VuZC1jb2xvcjokd2hpdGU7fVxyXG4vKjkqL1xyXG4kY29sb3Itc3VjY2VzczojNEZCMjI5O1xyXG4uY29sb3Itc3VjY2Vzc3tjb2xvcjokY29sb3Itc3VjY2Vzczt9XHJcbi5iYWNrZ3JvdW5kLXN1Y2Nlc3N7YmFja2dyb3VuZC1jb2xvcjokY29sb3Itc3VjY2Vzczt9XHJcbi8qMTAqL1xyXG4kY29sb3ItaW5mbzojMEE2RUQ4O1xyXG4uY29sb3ItaW5mb3sgY29sb3I6JGNvbG9yLWluZm87fVxyXG4uYmFja2dyb3VuZC1pbmZveyBiYWNrZ3JvdW5kLWNvbG9yOiRjb2xvci1pbmZvO31cclxuLyoxMSovXHJcbiRjb2xvci13YXJuaW5nOiNkYmRmOWI7XHJcbi5jb2xvci13YXJuaW5ne2NvbG9yOiRjb2xvci13YXJuaW5nO31cclxuLmJhY2tncm91bmQtd2FybmluZ3tiYWNrZ3JvdW5kLWNvbG9yOiRjb2xvci13YXJuaW5nO31cclxuLyoxMiovXHJcbiRjb2xvci1lcnJvcjojZDQ2YzU0O1xyXG4uY29sb3ItZXJyb3J7Y29sb3I6JGNvbG9yLWVycm9yO31cclxuLmJhY2tncm91bmQtZXJyb3J7YmFja2dyb3VuZC1jb2xvcjokY29sb3ItZXJyb3I7fVxyXG4vKjEzIMOiwoDClCDDkMKvw5HCgMOQwrvDkcKLw5DCusOQwrgvw5DCvMOQwrXDkcKCw5DCusOQwrggw5DCv8OQwr7DkMKyw5DCtcORwoDDkcKFIMORwoTDkMK+w5HCgsOQwr4gKi9cclxuJGNvbG9yLWxhYmVsOiAjMUQzQzQ4O1xyXG4uY29sb3ItbGFiZWwgeyBjb2xvcjogJGNvbG9yLWxhYmVsOyB9XHJcbi5iYWNrZ3JvdW5kLWxhYmVsIHsgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWxhYmVsOyB9XHJcbi8qIC0tLS0gw5DCpsOQwpLDkMKVw5DCosOQwpAgRU5EIC0tLS0qLyJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 8284:
/*!*********************************************************!*\
  !*** ./src/app/static/lowermenu/lowermenu.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LowermenuComponent: () => (/* binding */ LowermenuComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
var _LowermenuComponent;

class LowermenuComponent {}
_LowermenuComponent = LowermenuComponent;
_LowermenuComponent.ɵfac = function LowermenuComponent_Factory(t) {
  return new (t || _LowermenuComponent)();
};
_LowermenuComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _LowermenuComponent,
  selectors: [["app-lowermenu"]],
  decls: 2,
  vars: 0,
  template: function LowermenuComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "lowermenu works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb3dlcm1lbnUuY29tcG9uZW50LmNzcyJ9 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc3RhdGljL2xvd2VybWVudS9sb3dlcm1lbnUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esb0tBQW9LIiwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 399:
/*!*******************************************************!*\
  !*** ./src/app/static/oservice/oservice.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OserviceComponent: () => (/* binding */ OserviceComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 27947);
var _OserviceComponent;


class OserviceComponent {
  constructor(_router) {
    this._router = _router;
  }
  goToMain() {
    this._router.navigate(['/']);
  }
}
_OserviceComponent = OserviceComponent;
_OserviceComponent.ɵfac = function OserviceComponent_Factory(t) {
  return new (t || _OserviceComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router));
};
_OserviceComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _OserviceComponent,
  selectors: [["app-oservice"]],
  decls: 30,
  vars: 0,
  consts: [[1, "cont-vert", "left-right20mob"], [1, "w100", 2, "max-width", "1200px"], [1, "cont-horiz-start", "margin-top50", "margin-bottom50"], [1, "cont-horiz", "btn-back", 2, "cursor", "pointer", 3, "click"], [1, "cont-vert", "w100"], [2, "max-width", "600px"], [1, "txt-green-light", 2, "text-decoration-line", "underline"], [1, "cont-horiz", "w100"], ["src", "/assets/img/phone.svg"]],
  template: function OserviceComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OserviceComponent_Template_div_click_3_listener() {
        return ctx.goToMain();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div")(5, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "\u041E\u00A0\u0441\u0435\u0440\u0432\u0438\u0441\u0435");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4)(8, "div", 5)(9, "p")(10, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "OnWaves \u2014 \u0437\u0430\u043F\u0438\u0441\u044C, \u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0438 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u0432 \u043E\u0434\u043D\u043E\u043C \u043C\u0435\u0441\u0442\u0435");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "\u041F\u043B\u043E\u0449\u0430\u0434\u043A\u0430, \u043F\u043E\u043C\u043E\u0433\u0430\u044E\u0449\u0430\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C \u043D\u0430\u0439\u0442\u0438 \u0443\u0441\u043B\u0443\u0433\u0443 \u0438 \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043A \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044E. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "\u0414\u043B\u044F \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044F \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D \u043F\u0430\u043A\u0435\u0442 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u0432, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0445 \u0434\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 ONLINE.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "\u0421\u0435\u0440\u0432\u0438\u0441 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u0435\u043D \u0434\u043B\u044F \u0432\u0441\u0435\u0445!");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "\u0414\u043B\u044F \u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432 \u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439:");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "p", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, " support@onwaves.online ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "img", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvc2VydmljZS5jb21wb25lbnQuY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc3RhdGljL29zZXJ2aWNlL29zZXJ2aWNlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG9LQUFvSyIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 52681:
/*!*******************************************************!*\
  !*** ./src/app/static/policies/policies.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PoliciesComponent: () => (/* binding */ PoliciesComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
var _PoliciesComponent;

class PoliciesComponent {}
_PoliciesComponent = PoliciesComponent;
_PoliciesComponent.ɵfac = function PoliciesComponent_Factory(t) {
  return new (t || _PoliciesComponent)();
};
_PoliciesComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _PoliciesComponent,
  selectors: [["app-policies"]],
  decls: 2,
  vars: 0,
  template: function PoliciesComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "policies works!");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwb2xpY2llcy5jb21wb25lbnQuY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc3RhdGljL3BvbGljaWVzL3BvbGljaWVzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG9LQUFvSyIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 87870:
/*!*****************************************************!*\
  !*** ./src/app/static/pravila/pravila.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PravilaComponent: () => (/* binding */ PravilaComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
var _PravilaComponent;

class PravilaComponent {}
_PravilaComponent = PravilaComponent;
_PravilaComponent.ɵfac = function PravilaComponent_Factory(t) {
  return new (t || _PravilaComponent)();
};
_PravilaComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _PravilaComponent,
  selectors: [["app-pravila"]],
  decls: 189,
  vars: 0,
  consts: [[2, "max-width", "1200px", "margin", "0 auto"], [1, "modal-body"]],
  template: function PravilaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1)(4, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "\u0414\u0430\u0442\u0430 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438: 06.05.2025\u0433. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "\u041D\u0430\u0441\u0442\u043E\u044F\u0449\u0430\u044F \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 (\u0434\u0430\u043B\u0435\u0435\u00A0\u2014 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430) \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0438 \u0437\u0430\u0449\u0438\u0442\u044B \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043B\u0438\u0446 (\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439), \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u044E\u0442\u0441\u044F \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u043C\u0443 \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044E/\u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u043E\u043C\u0443 \u043B\u0438\u0446\u0443\u00A0\u2014 [\u041A\u043B\u0438\u043C\u043E\u0432\u0430 \u0410\u043D\u043D\u0430 \u0413\u0435\u043D\u043D\u0430\u0434\u0438\u0435\u0432\u043D\u0430] (\u0434\u0430\u043B\u0435\u0435\u00A0\u2014 \u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u043C\u044B, \u043D\u0430\u0448 \u0441\u0435\u0440\u0432\u0438\u0441) \u043F\u0440\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 \u0432\u0435\u0431\u2011\u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B Onwaves \u0438 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0441 \u043D\u0435\u0439 \u0441\u0435\u0440\u0432\u0438\u0441\u043E\u0432 \u043E\u043D\u043B\u0430\u0439\u043D\u2011\u0437\u0430\u043F\u0438\u0441\u0438. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "\u0412\u0430\u0436\u043D\u043E: \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u043E\u0440\u0438\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u043D\u0430 \u0440\u0435\u0437\u0438\u0434\u0435\u043D\u0442\u043E\u0432 \u0420\u043E\u0441\u0441\u0438\u0439\u0441\u043A\u043E\u0439 \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u0438; \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0432 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 \u0424\u0435\u0434\u0435\u0440\u0430\u043B\u044C\u043D\u044B\u043C \u0437\u0430\u043A\u043E\u043D\u043E\u043C \u043E\u0442\u00A027.07.2006\u00A0\u2116\u202F152\u2011\u0424\u0417 \u00AB\u041E \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445\u00BB (\u0434\u0430\u043B\u0435\u0435\u00A0\u2014 152\u2011\u0424\u0417).");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "ul")(13, "li");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "1. \u0422\u0435\u0440\u043C\u0438\u043D\u044B \u0438 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435\u00A0\u0434\u0430\u043D\u043D\u044B\u0435");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " \u2014 \u041B\u044E\u0431\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F, \u043E\u0442\u043D\u043E\u0441\u044F\u0449\u0430\u044F\u0441\u044F \u043A \u043F\u0440\u044F\u043C\u043E \u0438\u043B\u0438 \u043A\u043E\u0441\u0432\u0435\u043D\u043D\u043E \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0451\u043D\u043D\u043E\u043C\u0443 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u043E\u043C\u0443 \u043B\u0438\u0446\u0443 (\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E). ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430\u00A0\u0434\u0430\u043D\u043D\u044B\u0445");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " \u2014 \u041B\u044E\u0431\u044B\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F (\u0441\u0431\u043E\u0440, \u0437\u0430\u043F\u0438\u0441\u044C, \u0441\u0438\u0441\u0442\u0435\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F, \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435, \u0430\u043A\u0442\u0443\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435, \u043E\u0431\u0435\u0437\u043B\u0438\u0447\u0438\u0432\u0430\u043D\u0438\u0435, \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435, \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435). ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " \u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "\t\u2014 \u041B\u0438\u0446\u043E, \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E \u0438\u043B\u0438 \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u043D\u043E \u0441 \u0434\u0440\u0443\u0433\u0438\u043C\u0438 \u043B\u0438\u0446\u0430\u043C\u0438 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0443\u044E\u0449\u0435\u0435 \u0438 (\u0438\u043B\u0438) \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u044F\u044E\u0449\u0435\u0435 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u041F\u0414\u043D. \u0412 \u0440\u0430\u043C\u043A\u0430\u0445 \u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u2014 [\u0424.\u202F\u0418.\u202F\u041E. \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430], \u043F\u0430\u0441\u043F\u043E\u0440\u0442 \u2026, \u0418\u041D\u041D \u2026 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, " \u0421\u0435\u0440\u0432\u0438\u0441 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "\t\u2014 \u0412\u0435\u0431\u2011\u0441\u0430\u0439\u0442 https://onwaves.online \u0438 PWA/Telegram\u2011MiniApp, \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u043E\u043D\u043B\u0430\u0439\u043D\u2011\u0437\u0430\u043F\u0438\u0441\u0438 \u043A \u043C\u0430\u0441\u0442\u0435\u0440\u0430\u043C. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "li")(34, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "2. \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "br")(37, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435:");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, " \u2022\u0418\u043C\u044F \u0438 \u0444\u0430\u043C\u0438\u043B\u0438\u044F;");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, " \u2022\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430;");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, " \u2022\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430 (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E).");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](46, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, " \u2022\u0414\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u043C\u0430\u0441\u0442\u0435\u0440\u0430: \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438, \u0430\u0434\u0440\u0435\u0441 \u043E\u043A\u0430\u0437\u0430\u043D\u0438\u044F \u0443\u0441\u043B\u0443\u0433, \u0441\u043F\u0438\u0441\u043E\u043A \u0443\u0441\u043B\u0443\u0433 \u0438 \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, " \u2022\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F: IP\u2011\u0430\u0434\u0440\u0435\u0441, cookie\u2011\u0444\u0430\u0439\u043B\u044B, \u0434\u0430\u043D\u043D\u044B\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430, \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, " \u041C\u044B \u043D\u0435 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 (\u0441\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u043E \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u0435, \u043F\u043E\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0432\u0437\u0433\u043B\u044F\u0434\u0430\u0445 \u0438 \u0442.\u202F\u043F.).");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "li")(53, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "3. \u0426\u0435\u043B\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "table")(56, "tr")(57, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "\u2116");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "\u0426\u0435\u043B\u044C");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "\u041F\u0440\u0430\u0432\u043E\u0432\u043E\u0435 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0435 (\u043F.\u202F1\u00A0\u0447.\u202F1\u00A0\u0441\u0442.\u202F6\u00A0152\u2011\u0424\u0417)");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "tr")(64, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "3.1");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u0438 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, "\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u0441\u0443\u0431\u044A\u0435\u043A\u0442\u0430 \u041F\u0414\u043D");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "tr")(71, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "3.2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "\u041E\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u0443\u0441\u043B\u0443\u0433 \u043E\u043D\u043B\u0430\u0439\u043D\u2011\u0437\u0430\u043F\u0438\u0441\u0438, \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u0435 \u0441\u0432\u044F\u0437\u0438 \u043C\u0435\u0436\u0434\u0443 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C \u0438 \u043C\u0430\u0441\u0442\u0435\u0440\u043E\u043C");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, "\u0418\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430, \u0441\u0442\u043E\u0440\u043E\u043D\u043E\u0439 \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0441\u0443\u0431\u044A\u0435\u043A\u0442");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "tr")(78, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "3.3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, "\u0418\u043D\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043E \u0441\u0442\u0430\u0442\u0443\u0441\u0435 \u0431\u0440\u043E\u043D\u0438, \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](83, "\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "tr")(85, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "3.4");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](88, "\u041F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u0443\u0441\u043B\u0443\u0433 \u043C\u0430\u0441\u0442\u0435\u0440\u043E\u0432 (\u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0435 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438, \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438)");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](90, "\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435, \u0441 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C\u044E \u043E\u0442\u043F\u0438\u0441\u043A\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "tr")(92, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](93, "3.5");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0440\u0430\u0431\u043E\u0442\u044B \u0441\u0435\u0440\u0432\u0438\u0441\u0430, \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u0435 UX");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](97, "\u0417\u0430\u043A\u043E\u043D\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0435\u0441 \u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "tr");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](99, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](100, "3.6 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](102, "\u0421\u043E\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u0435 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0439 \u0437\u0430\u043A\u043E\u043D\u043E\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430 (\u043D\u0430\u043B\u043E\u0433\u043E\u0432\u0430\u044F \u043E\u0442\u0447\u0451\u0442\u043D\u043E\u0441\u0442\u044C)");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](104, "\u0418\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u043E\u0431\u044F\u0437\u0430\u043D\u043D\u043E\u0441\u0442\u0435\u0439 \u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](105, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](107, "4. \u0421\u0440\u043E\u043A\u0438 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](108, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](109, " \u041F\u0414\u043D \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0434\u043E\u00A0\u043E\u0442\u0437\u044B\u0432\u0430 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044F \u043B\u0438\u0431\u043E \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 3\u00A0\u043B\u0435\u0442 \u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F. \u0414\u0430\u043D\u043D\u044B\u0435, \u043F\u043E\u0434\u043B\u0435\u0436\u0430\u0449\u0438\u0435 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044E \u043F\u043E \u0437\u0430\u043A\u043E\u043D\u0443 (\u0431\u0443\u0445\u0433\u0430\u043B\u0442\u0435\u0440\u0441\u043A\u0438\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B), \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u044E\u0442\u0441\u044F \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0441\u0440\u043E\u043A\u0430, \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u0437\u0430\u043A\u043E\u043D\u043E\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E\u043C \u0420\u0424. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](110, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](112, "5. \u041F\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u0438 \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](113, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "table")(115, "tr")(116, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](117, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](119, "\u0426\u0435\u043B\u044C \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "th");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](121, "\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u044F \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "tr")(123, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](124, "\u041F\u043B\u0430\u0442\u0451\u0436\u043D\u044B\u0435 \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u044B (\u041E\u041E\u041E\u00A0\u00AB\u041F\u0421\u00A0\u0421\u0431\u0435\u0440\u0431\u0430\u043D\u043A\u00BB \u0438 \u0434\u0440.)");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](126, "\u041F\u0440\u0438\u0451\u043C \u0431\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0445 \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](127, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](128, "\u0414\u043E\u0433\u043E\u0432\u043E\u0440 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430, PCI\u00A0DSS");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "tr")(130, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](131, "\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0435 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B (VK\u00A0Ads, Telegram\u00A0Ads)");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](133, "\u0422\u0430\u0440\u0433\u0435\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u0443\u0441\u043B\u0443\u0433 \u043C\u0430\u0441\u0442\u0435\u0440\u043E\u0432");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](134, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](135, "\u041F\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u043E\u0431\u0435\u0437\u043B\u0438\u0447\u0435\u043D\u043D\u044B\u0445 \u0438\u043B\u0438 \u0445\u0435\u0448\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "tr")(137, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](138, "\u0425\u043E\u0441\u0442\u0438\u043D\u0433\u2011\u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](139, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](140, "\u0420\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0441\u0435\u0440\u0432\u0435\u0440\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](141, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](142, "\u0414\u043E\u0433\u043E\u0432\u043E\u0440 \u043E \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](143, "tr")(144, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](145, "\u0413\u043E\u0441\u043E\u0440\u0433\u0430\u043D\u044B");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](146, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](147, "\u041F\u043E \u0437\u0430\u043A\u043E\u043D\u043D\u043E\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](148, "td");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](149, "\u041D\u0430 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0438 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u0439 \u0437\u0430\u043A\u043E\u043D\u043E\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](150, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](151, " \u041C\u044B \u043D\u0435 \u043F\u0440\u043E\u0434\u0430\u0451\u043C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438 \u043D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u0451\u043C \u0438\u0445 \u0437\u0430 \u043F\u0440\u0435\u0434\u0435\u043B\u044B \u0420\u0424 \u0431\u0435\u0437 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044F \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](152, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](153, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](154, "6. \u041F\u0440\u0430\u0432\u0430 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](155, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](156, " \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0432\u043F\u0440\u0430\u0432\u0435:");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](157, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](158, " \u2022\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u0441\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u043E\u0431 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u0441\u0432\u043E\u0438\u0445 \u041F\u0414\u043D (\u0441\u0442.\u202F14\u00A0152\u2011\u0424\u0417);");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](159, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](160, " \u2022\u0422\u0440\u0435\u0431\u043E\u0432\u0430\u0442\u044C \u0443\u0442\u043E\u0447\u043D\u0435\u043D\u0438\u044F, \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0438\u043B\u0438 \u0443\u043D\u0438\u0447\u0442\u043E\u0436\u0435\u043D\u0438\u044F \u041F\u0414\u043D (\u0441\u0442.\u202F14,\u00A015\u00A0152\u2011\u0424\u0417);");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](161, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](162, " \u2022\u041E\u0442\u043E\u0437\u0432\u0430\u0442\u044C \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u0432 \u043B\u044E\u0431\u043E\u0439 \u043C\u043E\u043C\u0435\u043D\u0442, \u043D\u0430\u043F\u0440\u0430\u0432\u0438\u0432 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 privacy@onwaves.online;");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](163, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](164, " \u2022\u041E\u0431\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F (\u0431\u0435\u0437\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435) \u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u0432 \u0420\u043E\u0441\u043A\u043E\u043C\u043D\u0430\u0434\u0437\u043E\u0440 \u0438\u043B\u0438 \u0432\u00A0\u0441\u0443\u0434 (\u0441\u0442.\u202F17\u00A0152\u2011\u0424\u0417).");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](165, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](166, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](167, "7. \u041C\u0435\u0440\u044B \u043F\u043E \u0437\u0430\u0449\u0438\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0445");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](168, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](169, " \u2022HTTPS/SSL\u2011\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0435;");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](170, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](171, " \u2022\u0425\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0432 \u0438\u0437\u043E\u043B\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0441\u0435\u0442\u0438 \u0441 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0451\u043D\u043D\u044B\u043C \u0434\u043E\u0441\u0442\u0443\u043F\u043E\u043C \u043F\u043E VPN;");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](172, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](173, " \u2022\u0414\u0432\u0443\u0445\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430\u044F \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u0434\u043B\u044F \u0430\u0434\u043C\u0438\u043D\u2011\u043F\u0430\u043D\u0435\u043B\u0438;");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](174, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](175, " \u2022\u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E\u0435 \u0440\u0435\u0437\u0435\u0440\u0432\u043D\u043E\u0435 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438 \u0430\u043D\u0442\u0438\u0432\u0438\u0440\u0443\u0441\u043D\u0430\u044F \u0437\u0430\u0449\u0438\u0442\u0430;");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](176, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](177, " \u2022\u041E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432 \u043F\u0440\u0438\u043D\u0446\u0438\u043F\u0430\u043C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u041F\u0414\u043D.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](178, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](179, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](180, "8. Cookie\u2011\u0444\u0430\u0439\u043B\u044B \u0438 \u0441\u0447\u0451\u0442\u0447\u0438\u043A\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](181, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](182, " \u0421\u0435\u0440\u0432\u0438\u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 cookies\u00A0(\u042F\u043D\u0434\u0435\u043A\u0441.\u041C\u0435\u0442\u0440\u0438\u043A\u0430, Top.Mail.Ru / VK\u00A0Ads) \u0434\u043B\u044F \u0441\u0431\u043E\u0440\u0430 \u043E\u0431\u0435\u0437\u043B\u0438\u0447\u0435\u043D\u043D\u043E\u0439 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438 \u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0445 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A. \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043C\u043E\u0436\u0435\u0442 \u043E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F \u043E\u0442 cookies \u0432\u00A0\u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430; \u044D\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0438\u0442\u044C \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0441\u0435\u0440\u0432\u0438\u0441\u0430.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](183, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](184, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](185, "9. \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](186, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](187, " \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0430 \u0431\u0435\u0437 \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F. \u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u0432\u0441\u0435\u0433\u0434\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443: https://onwaves.online/privacy. \u0414\u0430\u0442\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0443\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0432 \u043D\u0430\u0447\u0430\u043B\u0435 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](188, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
  },
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcmF2aWxhLmNvbXBvbmVudC5jc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc3RhdGljL3ByYXZpbGEvcHJhdmlsYS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxvS0FBb0siLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ }),

/***/ 48967:
/*!*************************************************!*\
  !*** ./src/app/static/static-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StaticRoutingModule: () => (/* binding */ StaticRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _help_help_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./help/help.component */ 54714);
/* harmony import */ var _help_question_help_question_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./help-question/help-question.component */ 31150);
/* harmony import */ var _help_questions_answer_help_questions_answer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./help-questions-answer/help-questions-answer.component */ 87901);
/* harmony import */ var _oservice_oservice_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./oservice/oservice.component */ 399);
/* harmony import */ var _pravila_pravila_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pravila/pravila.component */ 87870);
/* harmony import */ var _stranica_stranica_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stranica/stranica.component */ 28180);
/* harmony import */ var _policies_policies_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./policies/policies.component */ 52681);
/* harmony import */ var _typography_typography_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./typography/typography.component */ 80207);
/* harmony import */ var _lowermenu_lowermenu_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lowermenu/lowermenu.component */ 8284);
/* harmony import */ var _profile_user_settings_settings_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../profile-user/settings/settings.component */ 54743);
/* harmony import */ var _ui_header_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../ui/header/notifications/notifications.component */ 63708);
/* harmony import */ var _guards_profile_edit_guard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../guards/profile-edit.guard */ 48335);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 61699);
var _StaticRoutingModule;















/**
 * Пути здесь заданы без префикса `static/` — он навешивается в AppRoutingModule
 * через `{ path: 'static', loadChildren: ... }`.
 *
 * `settings` и `notifications` живут в других папках, но их URL начинается с
 * `static/`, поэтому маршруты обязаны быть здесь: иначе роутер, зайдя в ленивый
 * `static`, не нашёл бы их и пришлось бы качать чанк впустую перед откатом.
 */
const routes = [{
  path: 'help',
  component: _help_help_component__WEBPACK_IMPORTED_MODULE_0__.HelpComponent,
  data: {
    title: 'Центр помощи OnWaves — ответы на вопросы',
    description: 'Как записаться, перенести или отменить запись, настроить профиль ' + 'и график. Ответы на частые вопросы о сервисе OnWaves.'
  }
}, {
  path: 'settings',
  component: _profile_user_settings_settings_component__WEBPACK_IMPORTED_MODULE_9__.SettingsComponent,
  canActivate: [_guards_profile_edit_guard__WEBPACK_IMPORTED_MODULE_11__.profileEditGuard],
  data: {
    noindex: true
  }
}, {
  path: 'helpQuestion',
  component: _help_question_help_question_component__WEBPACK_IMPORTED_MODULE_1__.HelpQuestionComponent,
  data: {
    title: 'Помощь — вопрос | OnWaves'
  }
}, {
  path: 'helpQuestionAnswer',
  component: _help_questions_answer_help_questions_answer_component__WEBPACK_IMPORTED_MODULE_2__.HelpQuestionsAnswerComponent,
  data: {
    title: 'Помощь — ответ | OnWaves'
  }
}, {
  path: 'oservice',
  component: _oservice_oservice_component__WEBPACK_IMPORTED_MODULE_3__.OserviceComponent,
  data: {
    title: 'О сервисе OnWaves — онлайн-запись для мастеров и клиентов',
    description: 'Что такое OnWaves: онлайн-запись без комиссий, личная страница ' + 'мастера, график и напоминания клиентам.'
  }
}, {
  path: 'pravila',
  component: _pravila_pravila_component__WEBPACK_IMPORTED_MODULE_4__.PravilaComponent,
  data: {
    title: 'Правила сервиса | OnWaves'
  }
}, {
  path: 'stranica',
  component: _stranica_stranica_component__WEBPACK_IMPORTED_MODULE_5__.StranicaComponent,
  data: {
    noindex: true
  }
}, {
  path: 'notifications',
  component: _ui_header_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_10__.NotificationsComponent,
  data: {
    noindex: true
  }
},
// Служебные экраны вёрстки — публичного смысла не несут.
{
  path: 'lowermenu',
  component: _lowermenu_lowermenu_component__WEBPACK_IMPORTED_MODULE_8__.LowermenuComponent,
  data: {
    noindex: true
  }
}, {
  path: 'typography',
  component: _typography_typography_component__WEBPACK_IMPORTED_MODULE_7__.TypographyComponent,
  data: {
    noindex: true
  }
}, {
  path: 'policies',
  component: _policies_policies_component__WEBPACK_IMPORTED_MODULE_6__.PoliciesComponent,
  data: {
    title: 'Политика конфиденциальности | OnWaves'
  }
}];
class StaticRoutingModule {}
_StaticRoutingModule = StaticRoutingModule;
_StaticRoutingModule.ɵfac = function StaticRoutingModule_Factory(t) {
  return new (t || _StaticRoutingModule)();
};
_StaticRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({
  type: _StaticRoutingModule
});
_StaticRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](StaticRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterModule]
  });
})();

/***/ }),

/***/ 12252:
/*!*****************************************!*\
  !*** ./src/app/static/static.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StaticModule: () => (/* binding */ StaticModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-mask */ 97728);
/* harmony import */ var _static_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./static-routing.module */ 48967);
/* harmony import */ var _ui_ui_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/ui.module */ 34608);
/* harmony import */ var _help_help_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./help/help.component */ 54714);
/* harmony import */ var _help_question_help_question_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./help-question/help-question.component */ 31150);
/* harmony import */ var _help_questions_answer_help_questions_answer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./help-questions-answer/help-questions-answer.component */ 87901);
/* harmony import */ var _oservice_oservice_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./oservice/oservice.component */ 399);
/* harmony import */ var _pravila_pravila_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pravila/pravila.component */ 87870);
/* harmony import */ var _stranica_stranica_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stranica/stranica.component */ 28180);
/* harmony import */ var _policies_policies_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./policies/policies.component */ 52681);
/* harmony import */ var _typography_typography_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./typography/typography.component */ 80207);
/* harmony import */ var _lowermenu_lowermenu_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lowermenu/lowermenu.component */ 8284);
/* harmony import */ var _footern_footern_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./footern/footern.component */ 67137);
/* harmony import */ var _common_faq_question_faq_question_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../common/faq-question/faq-question.component */ 62653);
/* harmony import */ var _profile_user_settings_settings_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../profile-user/settings/settings.component */ 54743);
/* harmony import */ var _profile_user_settings_subscribe_channel_modal_subscribe_channel_modal_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../profile-user/settings/subscribe-channel-modal/subscribe-channel-modal.component */ 42363);
/* harmony import */ var _profile_user_settings_revoke_channel_modal_revoke_channel_modal_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../profile-user/settings/revoke-channel-modal/revoke-channel-modal.component */ 41758);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 61699);
var _StaticModule;




















/**
 * Ленивый чанк для всего раздела `/static/*` — самая крупная и самая
 * изолированная часть приложения (~850 КБ исходников, 11 маршрутов, ни один
 * компонент не встречается в шаблонах за пределами раздела).
 *
 * SubscribeChannelModalComponent открывается из SettingsComponent программно
 * через NgbModal, поэтому объявлен здесь же — в шаблонах он не используется.
 */
class StaticModule {}
_StaticModule = StaticModule;
_StaticModule.ɵfac = function StaticModule_Factory(t) {
  return new (t || _StaticModule)();
};
_StaticModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineNgModule"]({
  type: _StaticModule
});
_StaticModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.ReactiveFormsModule, _ui_ui_module__WEBPACK_IMPORTED_MODULE_1__.UIModule, _static_routing_module__WEBPACK_IMPORTED_MODULE_0__.StaticRoutingModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵsetNgModuleScope"](StaticModule, {
    declarations: [_help_help_component__WEBPACK_IMPORTED_MODULE_2__.HelpComponent, _help_question_help_question_component__WEBPACK_IMPORTED_MODULE_3__.HelpQuestionComponent, _help_questions_answer_help_questions_answer_component__WEBPACK_IMPORTED_MODULE_4__.HelpQuestionsAnswerComponent, _oservice_oservice_component__WEBPACK_IMPORTED_MODULE_5__.OserviceComponent, _pravila_pravila_component__WEBPACK_IMPORTED_MODULE_6__.PravilaComponent, _stranica_stranica_component__WEBPACK_IMPORTED_MODULE_7__.StranicaComponent, _policies_policies_component__WEBPACK_IMPORTED_MODULE_8__.PoliciesComponent, _typography_typography_component__WEBPACK_IMPORTED_MODULE_9__.TypographyComponent, _lowermenu_lowermenu_component__WEBPACK_IMPORTED_MODULE_10__.LowermenuComponent, _footern_footern_component__WEBPACK_IMPORTED_MODULE_11__.FooternComponent, _common_faq_question_faq_question_component__WEBPACK_IMPORTED_MODULE_12__.FaqQuestionComponent, _profile_user_settings_settings_component__WEBPACK_IMPORTED_MODULE_13__.SettingsComponent, _profile_user_settings_subscribe_channel_modal_subscribe_channel_modal_component__WEBPACK_IMPORTED_MODULE_14__.SubscribeChannelModalComponent, _profile_user_settings_revoke_channel_modal_revoke_channel_modal_component__WEBPACK_IMPORTED_MODULE_15__.RevokeChannelModalComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.ReactiveFormsModule, ngx_mask__WEBPACK_IMPORTED_MODULE_19__.NgxMaskDirective, _ui_ui_module__WEBPACK_IMPORTED_MODULE_1__.UIModule, _static_routing_module__WEBPACK_IMPORTED_MODULE_0__.StaticRoutingModule]
  });
})();

/***/ }),

/***/ 28180:
/*!*******************************************************!*\
  !*** ./src/app/static/stranica/stranica.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StranicaComponent: () => (/* binding */ StranicaComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 28849);
var _StranicaComponent;


class StranicaComponent {}
_StranicaComponent = StranicaComponent;
_StranicaComponent.ɵfac = function StranicaComponent_Factory(t) {
  return new (t || _StranicaComponent)();
};
_StranicaComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _StranicaComponent,
  selectors: [["app-stranica"]],
  decls: 3207,
  vars: 0,
  consts: [[1, "w100", "cont-vert"], [1, "w100", 2, "max-width", "540px", "padding", "50px", "background-color", "#21334E"], [1, "cont-vert"], [1, "margin-bottom40", 2, "color", "#fff", "text-align", "center"], [1, "margin-bottom40", 2, "color", "#fff", "text-align", "center", "max-width", "500px"], ["xmlns", "http://www.w3.org/2000/svg", "width", "258", "height", "191", "fill", "none", 1, "margin-bottom60"], ["fill", "#9196A4", "d", "M226.065 29.481s-1.026-15.082-2.178-21.054c-1.151-5.972-6.318-8.57-11.314-6.958 0 0-3.086.36-4.097 1.826-2.099 3.04-2.201 7.016-1.458 21.316 0 0 .35.374 1.521-.578 1.172-.952 1.39-2.763.03-4.414a10.387 10.387 0 0 1-.875-3.66c0-1.744.044-6.56.044-6.56 3.222-1.166 4.296-4.924 4.296-4.924.899 3.311 3.941 9.308 9.943 10.648 0 0-.709 1.549-1.355 1.806a2.319 2.319 0 0 1-.822.243l-1.025 7.4s-.36.971 2.07 2.297c2.43 1.325 5.22 2.612 5.22 2.612Z"], ["fill", "#67C4B2", "d", "M55.963 189.289a71.617 71.617 0 0 1 21.005-50.664 71.747 71.747 0 0 1 50.709-20.985 71.746 71.746 0 0 1 50.71 20.985 71.617 71.617 0 0 1 21.005 50.664H55.962Z"], ["stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "m255.5 188.961-255 1"], ["fill", "#fff", "stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "M184.944 189.366h12.981l.306-3.399s-10.031-.636-13.54 2.816a.377.377 0 0 0-.073.175.393.393 0 0 0 .03.185.348.348 0 0 0 .121.145c.05.042.111.068.175.078ZM231.937 189.663h-12.359l-.447-3.399s9.55-.651 13.059 2.782a.337.337 0 0 1 .102.18.355.355 0 0 1 0 .209.354.354 0 0 1-.336.213l-.019.015Z"], ["fill", "#9196A4", "d", "m230.168 88.001.394 3.365a90.096 90.096 0 0 1 .403 16.388l-5.186 78.505-7.29-.486-9.559-97.403c3.525.402 7.071.603 10.619.602 3.562 0 7.116-.325 10.619-.971Z"], ["fill", "#9196A4", "d", "M192.152 84.616a60.142 60.142 0 0 0 10.07 2.685c5.696.996 11.717 1.69 11.717 1.69-.486 1.015-16.038 96.743-16.038 96.743h-6.648l-.073-80.749c0-4.078.137-8.152.413-12.221l.559-8.148Z"], ["fill", "#9196A4", "d", "m209.649 96.605-7.29 59.665 8.428-48.041-1.138-11.624Z"], ["stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "m208.924 88.37 4.938 50.596M232.461 82.587l1.162 4.72c-.384.106-.778.203-1.162.296v-5.016ZM249.5 109.822l-4.938-9.712h3.553l2.26 9.377a.481.481 0 0 1-.049.32.488.488 0 0 1-.243.214.493.493 0 0 1-.324.011.492.492 0 0 1-.259-.196v-.014ZM193.528 43.567c-.443 28.042-5.376 40.215-5.376 40.215 5.434 1.845 13.706 4.277 19.406 4.928a73.054 73.054 0 0 0 21.234-.37 48.07 48.07 0 0 0 3.606-.752M232.417 82.581l-2.522-19.665"], ["stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "m219.855 26.436 10.561 5.298a5.177 5.177 0 0 1 2.712 3.423l15.552 64.959h-4.86l-11.44-25.94"], ["stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "m232.417 74.152-2.522-11.236-1.186-12.367M205.916 25.207c-9.477 1.34-28.295 5.958-28.295 5.958L155.007 8.558l-3.003 1.743s18.186 32.047 20.295 32.362l21.229.904"], ["fill", "#9196A4", "d", "m233.575 87.301-1.156.248-3.626.791 1.103-25.424 2.523 19.665 1.156 4.72Z"], ["stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "M219.854 26.436a2.152 2.152 0 0 1-1.088-2.184l1.011-7.06s3.28-.661 2.313-5.235M207.588 8.47c-.112 3.016.155 7.007.155 7.007v.059a11.89 11.89 0 0 0 .457 3.603l1.118 1.636a3.359 3.359 0 0 0 3.679 1.34l4.01-1.122"], ["stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "M205.828 25.222a4.034 4.034 0 0 0 3.888-3.884M205.674 25.363c.773.971 6.459 7.502 14.176 1.054"], ["fill", "#21334E", "stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-width", ".87", "d", "M209.556 12.2a2.115 2.115 0 0 1-4.228 0c0-1.166.943-1.554 2.109-1.554 1.167 0 2.119.388 2.119 1.553Z"], ["stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-width", ".87", "d", "M215.37 12.2a2.097 2.097 0 0 1-2.109 2 2.1 2.1 0 0 1-2.105-2c0-1.166.943-1.554 2.109-1.554 1.167 0 2.105.388 2.105 1.553Z"], ["stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-width", ".58", "d", "m215.189 11.34 6.547.588-.229.486-6.128-.229M209.1 11.107s.675-.515 2.512 0"], ["fill", "#9196A4", "d", "M208.132 24.455c.486 1.612 5.686 5.133 11.081 2.205 0 0-6.439 6.113-13.297-1.2l2.216-1.005ZM193.363 57.143l1.667-13.702-1.813-.107.146 13.81Z"], ["fill", "#9196A4", "d", "M205.084 27.558a11.43 11.43 0 0 0 3.193 2.534 8.317 8.317 0 0 0 3.956.903 10.978 10.978 0 0 0 4.01-.922 20.05 20.05 0 0 0 3.621-2.05 20.112 20.112 0 0 1-3.573 2.162c-1.273.601-2.648.959-4.053 1.053a8.584 8.584 0 0 1-4.121-.82 11.719 11.719 0 0 1-3.402-2.535l.369-.325Z"], ["stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "M152.442 10.049c.029 0-4.223-6.545-5.37-8.575a.199.199 0 0 1 .316-.233l7.62 7.317"], ["stroke", "#9196A4", "stroke-miterlimit", "10", "d", "M257.5 151.58c-64.249 84.456-222.316-116.719-255 29.389"], [1, "btn-green", 2, "text-align", "center"], [1, "w100", 2, "max-width", "540px", "padding", "50px"], [1, "margin-bottom40", 2, "text-align", "center"], [1, "margin-bottom40", 2, "text-align", "center", "max-width", "500px"], ["fill", "#11142D", "d", "M226.065 29.481s-1.026-15.082-2.178-21.054c-1.151-5.972-6.318-8.57-11.314-6.958 0 0-3.086.36-4.097 1.826-2.099 3.04-2.201 7.016-1.458 21.316 0 0 .35.374 1.521-.578 1.172-.952 1.39-2.763.03-4.414a10.387 10.387 0 0 1-.875-3.66c0-1.744.044-6.56.044-6.56 3.222-1.166 4.296-4.924 4.296-4.924.899 3.311 3.941 9.308 9.943 10.648 0 0-.709 1.549-1.355 1.806a2.319 2.319 0 0 1-.822.243l-1.025 7.4s-.36.971 2.07 2.297c2.43 1.325 5.22 2.612 5.22 2.612Z"], ["stroke", "#11142D", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "m255.5 188.961-255 1"], ["fill", "#fff", "stroke", "#11142D", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "M184.944 189.366h12.981l.306-3.399s-10.031-.636-13.54 2.816a.377.377 0 0 0-.073.175.393.393 0 0 0 .03.185.348.348 0 0 0 .121.145c.05.042.111.068.175.078ZM231.937 189.663h-12.359l-.447-3.399s9.55-.651 13.059 2.782a.337.337 0 0 1 .102.18.355.355 0 0 1 0 .209.354.354 0 0 1-.336.213l-.019.015Z"], ["fill", "#11142D", "d", "m230.168 88.001.394 3.365a90.096 90.096 0 0 1 .403 16.388l-5.186 78.505-7.29-.486-9.559-97.403c3.525.402 7.071.603 10.619.602 3.562 0 7.116-.325 10.619-.971Z"], ["fill", "#11142D", "d", "M192.152 84.616a60.142 60.142 0 0 0 10.07 2.685c5.696.996 11.717 1.69 11.717 1.69-.486 1.015-16.038 96.743-16.038 96.743h-6.648l-.073-80.749c0-4.078.137-8.152.413-12.221l.559-8.148Z"], ["fill", "#11142D", "d", "m209.649 96.605-7.29 59.665 8.428-48.041-1.138-11.624Z"], ["stroke", "#11142D", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "m208.924 88.37 4.938 50.596M232.461 82.587l1.162 4.72c-.384.106-.778.203-1.162.296v-5.016ZM249.5 109.822l-4.938-9.712h3.553l2.26 9.377a.481.481 0 0 1-.049.32.488.488 0 0 1-.243.214.493.493 0 0 1-.324.011.492.492 0 0 1-.259-.196v-.014ZM193.528 43.567c-.443 28.042-5.376 40.215-5.376 40.215 5.434 1.845 13.706 4.277 19.406 4.928a73.054 73.054 0 0 0 21.234-.37 48.07 48.07 0 0 0 3.606-.752M232.417 82.581l-2.522-19.665"], ["stroke", "#11142D", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "m219.855 26.436 10.561 5.298a5.177 5.177 0 0 1 2.712 3.423l15.552 64.959h-4.86l-11.44-25.94"], ["stroke", "#11142D", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "m232.417 74.152-2.522-11.236-1.186-12.367M205.916 25.207c-9.477 1.34-28.295 5.958-28.295 5.958L155.007 8.558l-3.003 1.743s18.186 32.047 20.295 32.362l21.229.904"], ["fill", "#11142D", "d", "m233.575 87.301-1.156.248-3.626.791 1.103-25.424 2.523 19.665 1.156 4.72Z"], ["stroke", "#11142D", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "M219.854 26.436a2.152 2.152 0 0 1-1.088-2.184l1.011-7.06s3.28-.661 2.313-5.235M207.588 8.47c-.112 3.016.155 7.007.155 7.007v.059a11.89 11.89 0 0 0 .457 3.603l1.118 1.636a3.359 3.359 0 0 0 3.679 1.34l4.01-1.122"], ["stroke", "#11142D", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "M205.828 25.222a4.034 4.034 0 0 0 3.888-3.884M205.674 25.363c.773.971 6.459 7.502 14.176 1.054"], ["fill", "#fff", "stroke", "#11142D", "stroke-miterlimit", "10", "stroke-width", ".87", "d", "M209.556 12.2a2.115 2.115 0 0 1-4.228 0c0-1.166.943-1.554 2.109-1.554 1.167 0 2.119.388 2.119 1.553Z"], ["stroke", "#11142D", "stroke-miterlimit", "10", "stroke-width", ".87", "d", "M215.37 12.2a2.097 2.097 0 0 1-2.109 2 2.1 2.1 0 0 1-2.105-2c0-1.166.943-1.554 2.109-1.554 1.167 0 2.105.388 2.105 1.553Z"], ["stroke", "#11142D", "stroke-miterlimit", "10", "stroke-width", ".58", "d", "m215.189 11.34 6.547.588-.229.486-6.128-.229M209.1 11.107s.675-.515 2.512 0"], ["fill", "#11142D", "d", "M208.132 24.455c.486 1.612 5.686 5.133 11.081 2.205 0 0-6.439 6.113-13.297-1.2l2.216-1.005ZM193.363 57.143l1.667-13.702-1.813-.107.146 13.81Z"], ["fill", "#11142D", "d", "M205.084 27.558a11.43 11.43 0 0 0 3.193 2.534 8.317 8.317 0 0 0 3.956.903 10.978 10.978 0 0 0 4.01-.922 20.05 20.05 0 0 0 3.621-2.05 20.112 20.112 0 0 1-3.573 2.162c-1.273.601-2.648.959-4.053 1.053a8.584 8.584 0 0 1-4.121-.82 11.719 11.719 0 0 1-3.402-2.535l.369-.325Z"], ["stroke", "#11142D", "stroke-miterlimit", "10", "stroke-width", "1.16", "d", "M152.442 10.049c.029 0-4.223-6.545-5.37-8.575a.199.199 0 0 1 .316-.233l7.62 7.317"], ["stroke", "#11142D", "stroke-miterlimit", "10", "d", "M257.5 151.58c-64.249 84.456-222.316-116.719-255 29.389"], [1, "w100", "modal_540_black"], [1, "margin-bottom10"], [1, "txt-green-bold", 2, "font-size", "1.5rem", "text-align", "center"], [1, "w100", "modal_540_black", 2, "padding-left", "20px", "padding-right", "20px"], [1, "margin-bottom50", 2, "color", "#fff", "text-align", "center"], [1, "cont-horiz", "wrap", 2, "gap", "15px 15px"], [1, "margin-bottom20", "cont-horiz", "w100"], [2, "font-size", "1.125rem", "color", "#fff"], [1, "cont-horiz-center-end", "margin-bottom70"], [1, "w100", "cont-horiz", "color-grey-dark", "margin-bottom10"], [1, "input-line-mini", "cont-horiz-start", 2, "width", "100px"], [2, "border", "none"], [1, "cont-vert", "margin-right10", "margin-left10", 2, "height", "50px"], [1, "w100", "cont-horiz", "margin-bottom20"], [1, "w100", "modal_540", 2, "padding-left", "20px", "padding-right", "20px"], [1, "margin-bottom50", 2, "text-align", "center"], [2, "font-size", "1.125rem"], [1, "w100", "cont-horiz-center-end", "margin-bottom70"], [1, "w100", "cont-horiz", "color-grey-dark"], [1, "w100", "modal_540"], [1, "margin-bottom30", 2, "color", "#fff", "text-align", "center"], [1, "margin-bottom30", 2, "text-align", "center"], [1, "txt-green-bold", 2, "font-size", "1.5rem"], [1, "btn-green", "margin-bottom30", 2, "text-align", "center"], ["xmlns", "http://www.w3.org/2000/svg", "width", "104", "height", "104", "fill", "none", 1, "margin-bottom20", "ava-user-border"], ["clip-path", "url(#a)"], ["fill", "#FAFAFC", "d", "M52 104c28.719 0 52-23.281 52-52S80.719 0 52 0 0 23.281 0 52s23.281 52 52 52Z"], ["fill", "#C0C5D5", "d", "M51.9 58.3c11.267 0 20.4-9.133 20.4-20.4s-9.133-20.4-20.4-20.4-20.4 9.133-20.4 20.4 9.133 20.4 20.4 20.4ZM52 103.5c13.2 0 25.2-5 34.3-13.1-.3-1.7-.5-3.4-.8-5.3-2.1-13.3-9.6-29-20-19.2-8.3 7.8-19.9 2.4-24.6-1.3-3.5-2.4-12.6-5.4-20.4 1.3-3.8 3.2-6.9 10.1-9.3 17.4 9.3 12.3 24.1 20.2 40.8 20.2Z"], ["id", "a"], ["fill", "#fff", "d", "M0 0h104v104H0z"], [1, "w100", "btn-green", "margin-bottom30", 2, "text-align", "center"], [1, "w100", "btn-danger_no_contour", 2, "text-align", "center"], [1, "margin-bottom40", 2, "color", "#fff", "text-align", "center", "max-width", "360px"], [1, "margin-bottom40", 2, "text-align", "center", "max-width", "360px"], [2, "color", "#C0C5D5"], [2, "color", "#9196A4"], [1, "w100", "cont-horiz-start", "margin-bottom30"], ["xmlns", "http://www.w3.org/2000/svg", "width", "60", "height", "60", "fill", "none", 1, "margin-right20", "ava-ba-border"], ["fill", "#FAFAFC", "d", "M30 60c16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0 13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30Z"], ["fill", "#C0C5D5", "d", "M29.942 33.635c6.5 0 11.77-5.27 11.77-11.77s-5.27-11.769-11.77-11.769-11.769 5.27-11.769 11.77 5.27 11.769 11.77 11.769ZM30 59.711c7.615 0 14.538-2.884 19.788-7.557-.173-.981-.288-1.962-.461-3.058-1.212-7.673-5.539-16.73-11.539-11.077-4.788 4.5-11.48 1.385-14.192-.75-2.02-1.385-7.27-3.115-11.77.75-2.192 1.846-3.98 5.827-5.365 10.038C11.827 55.154 20.365 59.712 30 59.712Z"], ["fill", "#fff", "d", "M0 0h60v60H0z"], [2, "color", "#fff"], [1, "w100", "margin-bottom20", 2, "color", "#fff", "text-align", "left"], [1, "margin-bottom30", 2, "max-width", "500px", "color", "#fff"], [2, "text-align", "center", "color", "#fff"], [1, "cont-horiz-around", "w100", "margin-top-bottom30", 2, "max-width", "320px"], ["xmlns", "http://www.w3.org/2000/svg", "width", "48", "height", "48", "viewBox", "0 0 48 48", "fill", "none"], ["d", "M24 3C23.3762 3 22.7654 3.17846 22.2398 3.51431C21.7208 3.84586 21.3062 4.31714 21.0435 4.87373L16.0527 14.9495C16.0429 14.9693 16.0335 14.9893 16.0245 15.0095C16.0223 15.0145 16.0188 15.0189 16.0143 15.0221C16.0099 15.0254 16.0047 15.0274 15.9992 15.028C15.9801 15.0301 15.961 15.0326 15.9419 15.0354L4.95299 16.6634C4.34563 16.7224 3.76644 16.9504 3.28132 17.322C2.77937 17.7065 2.39967 18.2282 2.18823 18.8241C1.97678 19.42 1.94267 20.0644 2.09001 20.6793C2.23679 21.2919 2.55738 21.8489 3.01317 22.2836L11.057 30.0446L11.0753 30.062C11.0868 30.0727 11.0954 30.0862 11.1004 30.1011C11.1054 30.116 11.1065 30.1319 11.1038 30.1474L11.102 30.1576L9.1852 41.3756L9.18471 41.3785C9.07942 41.9863 9.14657 42.6115 9.37858 43.1832C9.61095 43.7557 9.99937 44.2516 10.4996 44.6143C10.9999 44.977 11.5919 45.1919 12.2083 45.2348C12.8239 45.2775 13.4391 45.1469 13.9841 44.8578L13.9864 44.8565L23.8873 39.6238C23.9228 39.6084 23.9612 39.6004 24 39.6004C24.0389 39.6004 24.0772 39.6084 24.1128 39.6238L34.0136 44.8565L34.0149 44.8573C34.5602 45.1468 35.1758 45.2776 35.7917 45.2348C36.4081 45.1919 37.0001 44.977 37.5004 44.6143C38.0006 44.2516 38.389 43.7557 38.6214 43.1832C38.8533 42.6118 38.9205 41.9869 38.8154 41.3793L38.8148 41.3756L36.898 30.1576L36.8962 30.1474C36.8935 30.1319 36.8946 30.116 36.8996 30.1011C36.9046 30.0862 36.9132 30.0727 36.9247 30.062L36.943 30.0446L44.9816 22.2885L44.9868 22.2835C45.4426 21.8489 45.7632 21.2919 45.91 20.6793C46.0573 20.0644 46.0232 19.42 45.8118 18.8241C45.6003 18.2282 45.2206 17.7065 44.7187 17.322C44.2336 16.9504 43.6544 16.7224 43.047 16.6634L32.0581 15.0354C32.039 15.0326 32.0199 15.0301 32.0008 15.028C31.9953 15.0274 31.9901 15.0254 31.9857 15.0221C31.9832 15.0203 31.981 15.0181 31.9792 15.0157C31.9777 15.0138 31.9765 15.0117 31.9755 15.0095C31.9665 14.9893 31.9571 14.9693 31.9473 14.9495L26.9566 4.87382C26.6938 4.31719 26.2792 3.84588 25.7603 3.51431C25.2346 3.17846 24.6238 3 24 3Z", "fill", "#FFAB00"], ["rows", "5", "cols", "45", "name", "text", "placeholder", "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", 1, "textarea-reg-ba", "margin-bottom50"], [1, "margin-bottom20", 2, "text-align", "left"], [1, "margin-bottom30", 2, "max-width", "500px"], [2, "text-align", "center"], [1, "cont-horiz-around", "w100", "margin-top-bottom70"], ["src", "/assets/img/ico/icons_all_size/WhatsappToUser_btn.svg"], [1, "ico-svg-whatsApp", "margin-bottom10"], ["src", "/assets/img/ico/icons_all_size/ico_TG.svg"], [1, "txt_telegram_w"], ["src", "/assets/img/ico/icons_all_size/ico_chat_to_user.svg", 1, "ico-svg-vk", "margin-bottom10"], [1, "txt_vk_w"], ["src", "/assets/img/ico/icons_all_size/WhatsappToUser_btn.svg", 1, "ico-svg-whatsApp", "margin-bottom10"], [1, "txt_WhatsApp_b"], ["src", "/assets/img/ico/icons_all_size/ico_TG.svg", 1, "ico-svg-telegram", "margin-bottom10"], [1, "txt_telegram_b"], [1, "txt_vk_b"], ["xmlns", "http://www.w3.org/2000/svg", "width", "36", "height", "36", 1, "ico-svg-whatsApp", "margin-bottom10"], ["d", "M.902 17.785c-.001 3.024.789 5.978 2.292 8.58L.758 35.26l9.102-2.386a17.163 17.163 0 0 0 8.205 \n                    2.088h.007c9.463 0 17.165-7.7 17.17-17.164a17.058 17.058 0 0 0-5.025-12.143A17.062 17.062 0 0 0 18.071.621C8.608.621.906 \n                    8.321.901 17.785", 1, "ico-svg-whatsApp1"], ["d", "M13.63 10.346c-.334-.74-.684-.755-1-.768-.26-.01-.556-.01-.852-.01-.297 \n                    0-.778.112-1.185.556-.408.445-1.556 1.52-1.556 3.706 0 2.187 1.593 4.3 1.815 4.596.222.297 3.074 4.927 \n                    7.591 6.708 3.754 1.48 4.518 1.186 5.333 1.112.815-.074 2.63-1.075 3-2.112.37-1.038.37-1.928.259-2.113-.111-.186-.408-.297-.852-.519-.445-.222-2.63-1.297-3.037-1.446-.407-.148-.704-.222-1 .223-.296.445-1.147 1.445-1.407 \n                    1.742-.259.297-.518.334-.963.111-.444-.223-1.875-.691-3.573-2.205-1.321-1.178-2.213-2.633-2.473-3.078-.259-.444-.027-.685.195-.906.2-.2.445-.52.667-.778.222-.26.296-.445.444-.742.149-.296.074-.556-.037-.778-.111-.222-.975-2.42-1.37-3.299", 1, "ico-svg-whatsApp2"], [1, "txt_WhatsApp_w"], ["xmlns", "http://www.w3.org/2000/svg", "width", "36", "height", "36", "viewBox", "0 0 36 36", 1, "ico-svg-telegram", "margin-bottom10"], ["d", "M18 0C13.2272 0 8.64563 1.89759 5.27344 5.27203C1.89777 8.64781 0.000935072 13.226 0 18C0 22.772 1.89844 \n                    27.3535 5.27344 30.728C8.64563 34.1024 13.2272 36 18 36C22.7728 36 27.3544 34.1024 30.7266 30.728C34.1016 27.3535 36 22.772 36 18C36 \n                    13.228 34.1016 8.64647 30.7266 5.27203C27.3544 1.89759 22.7728 0 18 0Z", 1, "ico-svg-telegram1"], ["d", "M8.14825 17.8101C13.3964 15.5241 16.8951 14.0168 18.6445 13.2887C23.6451 11.2094 24.6829 10.8483 25.3608 \n                        10.836C25.5098 10.8337 25.8417 10.8705 26.0583 11.0456C26.2383 11.1932 26.2889 11.3929 26.3142 11.5331C26.3367 11.6732 \n                        26.3676 11.9924 26.3423 12.2416C26.0723 15.0878 24.8995 21.9948 24.3033 25.1827C24.0529 26.5316 23.5551 26.9839 23.0742 \n                        27.028C22.0279 27.1242 21.2348 26.3373 20.2223 25.6738C18.6389 24.6352 17.7445 23.9888 16.2061 22.9755C14.4286 21.8044 15.5817 \n                        21.1606 16.5942 20.1087C16.8586 19.8334 21.4654 15.6442 21.5526 15.2642C21.5639 15.2167 21.5751 15.0395 21.4683 14.9461C21.3642 \n                        14.8524 21.2095 14.8845 21.097 14.9098C20.9367 14.9458 18.4083 16.6187 13.5033 19.9282C12.7861 20.4215 12.1364 20.6619 11.5514 \n                        20.6493C10.9101 20.6355 9.67263 20.2859 8.75294 19.9872C7.62794 19.6207 6.73075 19.427 6.8095 18.8046C6.84888 18.4806 7.29607 18.149 \n                        8.14825 17.8101Z", 1, "ico-svg-telegram2"], ["id", "paint0_linear_8131_7124", "x1", "18", "y1", "0", "x2", "18", "y2", "36", "gradientUnits", "userSpaceOnUse", 1, "ico-svg-telegram2"], ["stop-color", "#2AABEE"], ["offset", "1", "stop-color", "#229ED9"], ["xmlns", "http://www.w3.org/2000/svg", "width", "37", "height", "36", 1, "ico-svg-vk", "margin-bottom10"], ["width", "36", "height", "36", "x", ".5", "fill", "#2688EB", "rx", "18", 1, "ico-svg-vk1"], ["fill-rule", "evenodd", "d", "M7.5 12c.177 8.502 4.686 13.619 12.117 13.619h.431v-4.864c2.707.272 \n                    4.726 2.276 5.55 4.864H29.5c-1.059-3.871-3.804-6.011-5.51-6.83 1.705-1.01 4.118-3.462 4.686-6.789h-3.55c-.745 2.706-2.962 \n                    5.157-5.079 5.39V12H16.44v9.436c-2.195-.544-5.059-3.19-5.176-9.436H7.5Z", "clip-rule", "evenodd", 1, "ico-svg-vk2"], [1, "cont-horiz"], ["xmlns", "http://www.w3.org/2000/svg", "width", "24", "height", "24", 1, "margin-right20"], ["fill", "#00DAB3", "fill-rule", "evenodd", "d", "M13.163 5.7 11.32 7.544a.818.818 0 1 1-1.157-1.157l1.843-1.844a5.269 5.269 0 0 1 7.45 7.45l-1.842 1.844a.818.818 0 1 1-1.158-1.157l1.844-1.843A3.632 3.632 0 0 0 13.163 5.7ZM7.543 10.162c.32.32.32.838 0 1.158L5.7 13.163a3.632 3.632 0 0 0 5.137 5.137l1.843-1.844a.818.818 0 0 1 1.157 1.157l-1.843 1.844a5.269 5.269 0 0 1-7.45-7.451l1.842-1.843a.818.818 0 0 1 1.157 0Z", "clip-rule", "evenodd"], ["fill", "#00DAB3", "fill-rule", "evenodd", "d", "M15.096 8.904c.32.32.32.838 0 1.157l-5.035 5.035a.818.818 0 0 1-1.157-1.157l5.035-5.035a.818.818 0 0 1 1.157 0Z", "clip-rule", "evenodd"], [1, "w100", 2, "max-width", "540px", "padding", "30px 50px 50px 50px"], [1, "cont-vert", "modal_540_black"], [1, "margin-bottom30", 2, "color", "#E24414"], [1, "margin-bottom10", 2, "color", "#fff"], [1, "margin-bottom30", "cont-horiz"], [1, "margin-right10", 2, "color", "#fff"], [2, "color", "#FFAB00"], [1, "margin-bottom30", 2, "color", "#fff"], ["rows", "10", "cols", "45", "name", "text", "placeholder", "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", 1, "textarea-reg-ba", "margin-bottom40"], [1, "btn-green"], [1, "cont-vert", "modal_540"], [1, "margin-right10"], [1, "margin-bottom30"], [1, "margin-bottom10", 2, "color", "#fff", "text-align", "center", "max-width", "500px"], ["xmlns", "http://www.w3.org/2000/svg", "width", "256", "height", "242", "viewBox", "0 0 256 242", "fill", "none", 1, "margin-bottom30"], ["clip-path", "url(#clip0_7659_134042)"], ["d", "M73.7852 242.834C74.0028 221.826 82.4908 201.753 97.4052 186.975C112.32 172.198 132.456 163.908 153.439 163.908C174.423 163.908 194.559 172.198 209.474 186.975C224.388 201.753 232.876 221.826 233.094 242.834H73.7852Z", "fill", "#00DAB3"], ["d", "M105.251 133.13L104.316 237.653", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M104.711 119.52C104.711 119.52 114.418 124.278 113.775 124.471C112.862 124.801 109.562 123.424 109.562 123.424C109.562 123.424 108.109 124.814 107.359 124.634C106.417 124.416 105.506 124.082 104.646 123.639", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M101.695 122.549C101.695 122.549 110.455 126.518 109.812 126.711C108.899 127.041 105.599 125.66 105.599 125.66C105.599 125.66 104.146 127.05 103.396 126.87C102.454 126.652 101.543 126.318 100.684 125.874", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M128.416 126.612H102.148V128.118H128.416V126.612Z", "fill", "#9196A4"], ["d", "M126.758 126.651L135.604 106.635L136.641 106.982L128.219 126.613L126.758 126.651Z", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M26.236 154.498L21.046 112.02C20.9472 110.881 21.1481 109.736 21.6288 108.698C21.7643 108.396 21.9418 108.114 22.156 107.862C22.7668 107.174 23.52 106.628 24.3632 106.261L36.2988 98.8125", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M35.2621 81.0439C33.4321 86.4546 37.3107 87.729 37.3107 87.729L37.5207 96.4392C37.5327 96.972 37.383 97.4959 37.0915 97.9417C36.8 98.3876 36.3803 98.7344 35.8878 98.9365", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M40.1309 92.7663L45.9509 95.1691C46.4035 95.355 46.9056 95.383 47.376 95.2483C47.8464 95.1136 48.2578 94.8242 48.5438 94.4268L50.5752 91.5907C51.4607 90.3599 51.9995 88.9135 52.1351 87.4028V87.4028C52.1351 87.4028 52.8509 82.5156 53.1466 78.8213", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M49.1209 93.9209C49.0909 95.1652 49.4466 95.7401 50.2651 96.667C51.0837 97.5938 52.2537 98.4691 53.488 98.5892", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M36.3242 98.7953C45.2771 107.192 52.6485 99.6534 53.6556 98.4863", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M48.0762 81.5462C50.3733 81.1858 51.1191 81.9067 51.1191 81.9067", "stroke", "#9196A4", "stroke-width", "0.58", "stroke-miterlimit", "10"], ["d", "M53.3424 98.5853C44.4924 107.038 37.0566 99.1346 37.0566 99.1346C43.4209 103.078 50.0081 99.1346 50.6981 97.208L53.3424 98.5853Z", "fill", "#9196A4"], ["d", "M54.5647 101.567C53.3268 102.769 51.8822 103.737 50.3004 104.425C48.703 105.085 46.9666 105.338 45.2476 105.159C43.549 104.951 41.9038 104.429 40.3961 103.618L39.2818 103L38.2189 102.292C37.8616 102.061 37.5182 101.809 37.1904 101.537L36.1875 100.752L37.2076 101.516C37.5411 101.779 37.8887 102.024 38.249 102.249L39.3204 102.932L40.4476 103.524C41.9514 104.296 43.5871 104.778 45.269 104.944C46.9456 105.085 48.6308 104.805 50.1718 104.129C51.6984 103.428 53.0852 102.455 54.2647 101.258L54.5647 101.567Z", "fill", "#9196A4"], ["d", "M174.285 129.079L94.2069 128.054L94.1426 133.022L174.225 134.048", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M25.9531 154.469C32.866 152.774 91.7689 139.451 91.7689 139.451C94.1003 138.996 146.253 199.522 146.253 199.522L141.11 199.835L85.9016 160.562C64.5845 175.674 33.0031 180.582 25.9531 154.469Z", "fill", "#9196A4"], ["d", "M49.5579 237.225C59.3508 237.349 67.7851 239.155 71.3079 241.614L27.7051 241.052C31.2922 238.688 39.7522 237.1 49.5579 237.225Z", "fill", "white", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M49.558 237.224L47.8438 177.402", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M98.9605 241.065L98.0605 237.572L105.243 237.667C107.841 237.701 110.386 238.525 112.782 239.7C112.911 239.761 113.016 239.865 113.079 239.993C113.142 240.122 113.16 240.268 113.129 240.407C113.098 240.547 113.02 240.672 112.909 240.762C112.798 240.852 112.659 240.901 112.516 240.902L98.9605 241.065Z", "fill", "white", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M141.728 203.023L140.828 199.534L148.007 199.624C150.608 199.659 153.15 200.482 155.55 201.662C155.677 201.725 155.779 201.828 155.841 201.956C155.902 202.084 155.918 202.229 155.887 202.368C155.856 202.506 155.779 202.63 155.669 202.719C155.558 202.809 155.421 202.858 155.28 202.86L141.728 203.023Z", "fill", "white", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M75.5431 160.917L98.0346 237.516L104.339 237.95L91.8588 139.532L25.9531 154.468L75.5431 160.917Z", "fill", "#9196A4"], ["d", "M23.642 176.849L68.6856 177.424C70.2097 177.443 71.461 176.223 71.4804 174.698C71.4999 173.173 70.28 171.921 68.7558 171.902L23.7123 171.327C22.1881 171.308 20.9368 172.528 20.9174 174.053C20.898 175.578 22.1178 176.83 23.642 176.849Z", "fill", "white", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M53.3438 98.585L59.6523 99.898C60.9289 100.163 62.0924 100.818 62.9832 101.771C63.8739 102.724 64.4485 103.93 64.6281 105.223L67.3152 125.531", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M34.3433 112.191L43.0519 129.003L96.3876 121.67L97.0777 126.965L37.669 140.785C36.4991 141.06 35.2708 140.928 34.1853 140.412C33.0999 139.896 32.2217 139.026 31.6948 137.945L21.752 117.937", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M66.332 119.189L104.586 119.443L104.886 123.965", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M2.21484 241.571H255.501", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M96.4531 121.76C96.6031 121.73 101.677 122.365 101.677 122.365L100.82 126.094L96.9974 126.703", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M67.875 133.546L68.9979 144.934", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M22.5078 119.867L31.0535 142.059C31.5158 143.258 32.4197 144.234 33.579 144.785C34.7383 145.337 36.0646 145.422 37.285 145.024L67.9664 134.057L67.615 133.829L37.2549 140.974C36.2455 141.211 35.1855 141.101 34.2467 140.66C33.3078 140.219 32.5451 139.474 32.0821 138.545L22.5078 119.867Z", "fill", "#9196A4"], ["d", "M69.7399 125.347L67.5242 119.387L66.4785 119.417L67.2371 125.78L69.7399 125.347Z", "fill", "#9196A4"], ["d", "M52.5539 77.6375C52.9824 78.4956 53.0167 80.2805 52.8324 82.1685C52.6481 84.0564 51.8509 88.9308 51.3024 90.3725C50.7538 91.8142 48.5424 94.4273 48.5424 94.4273C48.0281 100.563 49.5967 125.531 62.5053 121.575C70.8967 119.001 60.1824 104.12 55.5324 95.3327C50.8824 86.5451 60.551 80.8598 53.1452 71.7633C52.0824 70.4761 46.4424 67.0864 40.4124 69.6179C30.4267 73.7757 32.5653 92.6938 37.091 97.9586C37.091 97.9586 37.4595 97.0747 37.4081 91.9515C37.3567 86.8283 36.7481 87.8281 35.2653 85.9144C33.7824 84.0007 34.8838 81.4906 36.1224 80.7053C37.361 79.9201 40.8367 77.8133 40.9138 75.3247C40.9138 75.3247 45.161 78.1695 48.4696 78.457C51.7781 78.7445 52.5539 77.6375 52.5539 77.6375Z", "fill", "#9196A4"], ["d", "M35.998 80.3921C36.2466 81.1987 36.7137 83.091 36.9409 84.0349C36.9409 84.0486 36.9463 84.0617 36.9559 84.0714C36.9656 84.0811 36.9787 84.0865 36.9924 84.0865C37.006 84.0865 37.019 84.0811 37.0287 84.0714C37.0383 84.0617 37.0437 84.0486 37.0437 84.0349C37.0052 82.855 37.0866 80.1518 38.458 78.8431C40.2366 77.1268 36.1866 78.2467 36.1866 78.2467L35.998 80.3921Z", "fill", "#9196A4"], ["d", "M53.1846 81.5854C54.5989 81.7527 55.6831 82.3577 55.516 83.7736C55.4343 84.2601 55.2147 84.713 54.8834 85.0781C54.552 85.4433 54.1228 85.7054 53.6469 85.8333C53.1711 85.9612 52.6684 85.9496 52.199 85.7997C51.7295 85.6498 51.3129 85.3681 50.9988 84.9879C50.5775 84.479 50.3661 83.8284 50.4075 83.1687C50.5789 81.7527 51.7789 81.418 53.1846 81.5854Z", "fill", "#21334E", "stroke", "#9196A4", "stroke-width", "0.87", "stroke-miterlimit", "10"], ["d", "M43.3616 82.3316L35.9088 81.7266L35.7031 81.083L43.7131 81.3146", "fill", "white"], ["d", "M43.3617 82.3316L35.9088 81.7266L35.7031 81.083L43.7131 81.3146", "stroke", "#9196A4", "stroke-width", "0.58", "stroke-miterlimit", "10"], ["d", "M46.1433 80.7484C47.5533 80.9158 48.6419 81.525 48.4748 82.941C48.3741 83.6011 48.0211 84.1962 47.4904 84.6007C46.9597 85.0052 46.2928 85.1874 45.6305 85.1089C44.9681 85.0304 44.3621 84.6973 43.9405 84.1799C43.5188 83.6626 43.3144 83.0014 43.3704 82.336C43.5376 80.9158 44.729 80.5811 46.1433 80.7484Z", "stroke", "#9196A4", "stroke-width", "0.87", "stroke-miterlimit", "10"], ["d", "M174.075 239.696V35.1548C174.074 25.8942 170.399 17.0132 163.859 10.465C157.318 3.91674 148.448 0.237466 139.198 0.236328H101.248", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M66.4707 10.4524H146.292L119.001 2.04241C109.93 -0.754537 100.215 -0.661528 91.1993 2.30849L66.4707 10.4524Z", "fill", "#9196A4"], ["d", "M234.029 241.484H195.766", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M193.426 212.989H222.286L219.414 241.467H195.637L193.426 212.989Z", "fill", "white", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M174.928 242.145C175.515 242.145 195.555 235.279 195.555 235.279L195.983 241.286L174.928 242.145Z", "fill", "#9196A4"], ["d", "M195.059 177.921L207.161 188.163C207.161 188.163 206.973 208.025 206.994 209.359", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M204.105 185.584L207.35 163.907L225.727 153.034", "stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-linecap", "round"], ["d", "M214.914 159.432L199.653 130.237L183.984 121.66", "stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-linecap", "round"], ["d", "M201.028 178.084C200.599 178.603 199.477 178.389 199.477 178.389C199.477 178.389 199.005 177.329 199.417 176.806C199.492 176.677 199.594 176.565 199.717 176.479C199.839 176.393 199.978 176.335 200.125 176.308C200.272 176.28 200.423 176.285 200.568 176.321C200.712 176.357 200.848 176.424 200.965 176.518C201.081 176.611 201.177 176.728 201.244 176.862C201.312 176.995 201.35 177.141 201.356 177.291C201.362 177.44 201.336 177.589 201.279 177.727C201.222 177.866 201.137 177.99 201.028 178.093V178.084Z", "fill", "#9196A4"], ["d", "M199.39 180.44C198.961 179.929 199.39 178.856 199.39 178.856C199.39 178.856 200.525 178.612 200.95 179.122C201.063 179.222 201.153 179.345 201.214 179.482C201.276 179.62 201.306 179.769 201.305 179.92C201.303 180.071 201.268 180.219 201.203 180.355C201.138 180.491 201.045 180.612 200.929 180.708C200.814 180.804 200.678 180.875 200.533 180.914C200.387 180.953 200.235 180.96 200.087 180.934C199.939 180.909 199.798 180.851 199.673 180.766C199.549 180.681 199.445 180.569 199.368 180.44H199.39Z", "fill", "#9196A4"], ["d", "M197.62 179.019C198.224 179.294 199.137 178.59 199.137 178.59C199.137 178.59 199.069 177.432 198.464 177.157C198.339 177.075 198.197 177.021 198.049 176.999C197.901 176.977 197.75 176.987 197.606 177.028C197.462 177.07 197.328 177.142 197.215 177.24C197.101 177.338 197.01 177.46 196.948 177.596C196.886 177.732 196.853 177.881 196.854 178.031C196.854 178.181 196.886 178.329 196.949 178.465C197.011 178.602 197.103 178.723 197.216 178.821C197.33 178.919 197.463 178.991 197.607 179.032L197.62 179.019Z", "fill", "#9196A4"], ["d", "M193.164 174.63C193.661 175.059 193.382 176.196 193.382 176.196C193.382 176.196 192.298 176.625 191.801 176.166C191.676 176.084 191.571 175.976 191.491 175.85C191.412 175.724 191.361 175.582 191.341 175.434C191.321 175.286 191.334 175.136 191.377 174.993C191.421 174.851 191.495 174.719 191.594 174.608C191.693 174.496 191.814 174.407 191.951 174.347C192.087 174.287 192.235 174.257 192.384 174.259C192.533 174.261 192.679 174.295 192.814 174.359C192.949 174.423 193.068 174.515 193.164 174.63Z", "fill", "#9196A4"], ["d", "M195.406 176.397C194.874 176.792 193.829 176.286 193.829 176.286C193.829 176.286 193.653 175.14 194.184 174.745C194.29 174.64 194.417 174.56 194.557 174.508C194.696 174.457 194.845 174.436 194.994 174.447C195.142 174.459 195.286 174.502 195.416 174.574C195.546 174.646 195.66 174.745 195.748 174.865C195.837 174.985 195.898 175.122 195.929 175.268C195.96 175.413 195.959 175.564 195.927 175.709C195.894 175.855 195.831 175.991 195.741 176.11C195.651 176.229 195.537 176.327 195.406 176.397Z", "fill", "#9196A4"], ["d", "M193.905 178.088C194.214 177.5 193.549 176.548 193.549 176.548C193.549 176.548 192.392 176.548 192.084 177.14C191.997 177.261 191.937 177.399 191.908 177.545C191.879 177.691 191.882 177.842 191.917 177.987C191.951 178.132 192.017 178.267 192.108 178.385C192.2 178.502 192.315 178.598 192.447 178.667C192.579 178.736 192.724 178.775 192.873 178.783C193.022 178.79 193.17 178.766 193.308 178.711C193.447 178.656 193.571 178.572 193.674 178.465C193.777 178.357 193.856 178.229 193.905 178.088Z", "fill", "#9196A4"], ["d", "M197.35 185.108C197.732 184.563 198.88 184.713 198.88 184.713C198.88 184.713 199.412 185.743 199.03 186.288C198.963 186.421 198.869 186.539 198.752 186.632C198.636 186.725 198.501 186.792 198.357 186.829C198.212 186.865 198.062 186.87 197.915 186.843C197.769 186.816 197.63 186.758 197.508 186.672C197.386 186.586 197.284 186.475 197.209 186.347C197.133 186.218 197.087 186.074 197.072 185.926C197.057 185.778 197.074 185.628 197.122 185.487C197.17 185.346 197.248 185.216 197.35 185.108Z", "fill", "#9196A4"], ["d", "M198.846 182.675C199.3 183.16 198.914 184.254 198.914 184.254C198.914 184.254 197.8 184.563 197.346 184.078C197.23 183.985 197.135 183.868 197.068 183.735C197.001 183.602 196.963 183.456 196.958 183.307C196.952 183.159 196.979 183.01 197.035 182.872C197.092 182.735 197.177 182.611 197.286 182.509C197.395 182.407 197.524 182.33 197.665 182.283C197.806 182.236 197.956 182.22 198.104 182.235C198.252 182.251 198.395 182.299 198.523 182.374C198.651 182.45 198.761 182.553 198.846 182.675Z", "fill", "#9196A4"], ["d", "M200.698 183.971C200.081 183.735 199.211 184.503 199.211 184.503C199.211 184.503 199.344 185.653 199.965 185.893C200.096 185.969 200.241 186.016 200.392 186.03C200.542 186.045 200.694 186.026 200.836 185.976C200.979 185.925 201.109 185.845 201.217 185.739C201.325 185.634 201.409 185.506 201.463 185.364C201.517 185.223 201.539 185.072 201.529 184.921C201.519 184.77 201.475 184.623 201.403 184.49C201.33 184.358 201.229 184.243 201.108 184.153C200.986 184.063 200.846 184.001 200.698 183.971Z", "fill", "#9196A4"], ["d", "M209.951 180.088C209.291 180.011 208.875 178.925 208.875 178.925C208.875 178.925 209.531 177.968 210.186 178.045C210.338 178.037 210.489 178.063 210.629 178.119C210.77 178.176 210.897 178.262 211 178.373C211.104 178.483 211.183 178.615 211.23 178.759C211.278 178.903 211.293 179.056 211.276 179.206C211.259 179.357 211.209 179.502 211.13 179.631C211.05 179.761 210.944 179.871 210.818 179.955C210.692 180.039 210.549 180.094 210.399 180.117C210.249 180.14 210.096 180.13 209.951 180.088Z", "fill", "#9196A4"], ["d", "M207.105 179.925C207.315 179.294 208.459 179.109 208.459 179.109C208.459 179.109 209.26 179.968 209.05 180.577C209.024 180.724 208.967 180.863 208.882 180.986C208.797 181.109 208.687 181.212 208.559 181.288C208.431 181.364 208.288 181.412 208.139 181.428C207.991 181.443 207.841 181.427 207.7 181.38C207.559 181.332 207.429 181.255 207.32 181.153C207.212 181.051 207.126 180.927 207.07 180.789C207.013 180.651 206.987 180.502 206.993 180.353C206.999 180.204 207.037 180.058 207.105 179.925Z", "fill", "#9196A4"], ["d", "M207.361 177.676C207.447 178.337 208.535 178.736 208.535 178.736C208.535 178.736 209.483 178.066 209.393 177.41C209.395 177.261 209.365 177.113 209.305 176.977C209.245 176.841 209.156 176.719 209.045 176.62C208.934 176.521 208.803 176.447 208.661 176.403C208.519 176.36 208.369 176.347 208.221 176.366C208.074 176.385 207.932 176.436 207.806 176.515C207.68 176.594 207.572 176.699 207.49 176.823C207.408 176.948 207.354 177.088 207.331 177.235C207.308 177.382 207.317 177.533 207.357 177.676H207.361Z", "fill", "#9196A4"], ["d", "M210.872 168.24C210.216 168.163 209.801 167.077 209.801 167.077C209.801 167.077 210.452 166.121 211.112 166.198C211.263 166.19 211.414 166.216 211.555 166.273C211.695 166.33 211.821 166.417 211.925 166.527C212.028 166.638 212.106 166.77 212.153 166.914C212.2 167.058 212.216 167.211 212.198 167.361C212.18 167.512 212.13 167.656 212.051 167.785C211.971 167.915 211.865 168.025 211.739 168.108C211.613 168.192 211.47 168.247 211.32 168.27C211.17 168.293 211.018 168.283 210.872 168.24Z", "fill", "#9196A4"], ["d", "M208.027 168.078C208.237 167.447 209.381 167.263 209.381 167.263C209.381 167.263 210.182 168.121 209.972 168.73C209.946 168.877 209.889 169.017 209.804 169.139C209.719 169.262 209.609 169.365 209.481 169.441C209.353 169.517 209.21 169.565 209.061 169.581C208.913 169.597 208.763 169.58 208.622 169.533C208.481 169.486 208.351 169.408 208.242 169.306C208.134 169.204 208.048 169.08 207.992 168.942C207.935 168.804 207.909 168.655 207.915 168.506C207.921 168.357 207.959 168.211 208.027 168.078Z", "fill", "#9196A4"], ["d", "M208.283 165.851C208.369 166.512 209.457 166.911 209.457 166.911C209.457 166.911 210.404 166.246 210.314 165.585C210.317 165.436 210.287 165.288 210.227 165.152C210.167 165.016 210.078 164.894 209.967 164.795C209.856 164.696 209.725 164.622 209.583 164.578C209.441 164.534 209.291 164.522 209.143 164.541C208.996 164.56 208.854 164.611 208.728 164.69C208.602 164.769 208.494 164.874 208.412 164.998C208.33 165.122 208.276 165.263 208.253 165.41C208.23 165.557 208.239 165.707 208.279 165.851H208.283Z", "fill", "#9196A4"], ["d", "M211.507 188.806C210.89 189.051 210.016 188.291 210.016 188.291C210.016 188.291 210.136 187.137 210.753 186.892C210.883 186.815 211.027 186.766 211.178 186.75C211.328 186.734 211.48 186.751 211.623 186.8C211.766 186.848 211.897 186.928 212.007 187.032C212.116 187.136 212.201 187.263 212.257 187.404C212.312 187.545 212.337 187.696 212.328 187.847C212.319 187.998 212.278 188.146 212.206 188.279C212.135 188.412 212.035 188.529 211.915 188.62C211.794 188.711 211.655 188.774 211.507 188.806Z", "fill", "#9196A4"], ["d", "M208.921 190.008C208.81 189.351 209.731 188.647 209.731 188.647C209.731 188.647 210.833 189.008 210.944 189.664C210.991 189.806 211.006 189.957 210.989 190.105C210.972 190.253 210.923 190.396 210.846 190.524C210.769 190.652 210.665 190.761 210.542 190.845C210.419 190.929 210.279 190.985 210.132 191.01C209.985 191.035 209.834 191.028 209.69 190.99C209.546 190.951 209.412 190.882 209.297 190.787C209.182 190.691 209.089 190.573 209.024 190.438C208.96 190.304 208.924 190.157 208.921 190.008Z", "fill", "#9196A4"], ["d", "M208.09 187.901C208.476 188.441 209.624 188.283 209.624 188.283C209.624 188.283 210.147 187.244 209.757 186.708C209.69 186.574 209.595 186.456 209.478 186.362C209.361 186.269 209.225 186.201 209.08 186.165C208.934 186.129 208.783 186.125 208.635 186.153C208.488 186.181 208.349 186.241 208.227 186.328C208.105 186.416 208.004 186.528 207.929 186.658C207.855 186.789 207.81 186.934 207.797 187.083C207.784 187.232 207.803 187.383 207.854 187.524C207.905 187.665 207.985 187.794 208.09 187.901Z", "fill", "#9196A4"], ["d", "M203.316 197.998C203.971 198.101 204.348 199.195 204.348 199.195C204.348 199.195 203.663 200.13 203.007 200.032C202.856 200.034 202.706 200.003 202.568 199.941C202.43 199.879 202.307 199.788 202.208 199.674C202.108 199.56 202.035 199.426 201.993 199.28C201.95 199.135 201.94 198.982 201.963 198.832C201.986 198.683 202.041 198.54 202.124 198.414C202.208 198.287 202.317 198.181 202.446 198.101C202.575 198.022 202.719 197.972 202.869 197.954C203.02 197.936 203.172 197.951 203.316 197.998Z", "fill", "#9196A4"], ["d", "M206.157 198.263C205.921 198.886 204.773 199.027 204.773 199.027C204.773 199.027 204.001 198.169 204.233 197.538C204.263 197.39 204.324 197.25 204.413 197.129C204.503 197.007 204.617 196.906 204.749 196.833C204.881 196.759 205.027 196.716 205.178 196.705C205.328 196.694 205.479 196.716 205.62 196.769C205.762 196.822 205.889 196.905 205.995 197.013C206.101 197.121 206.183 197.25 206.234 197.392C206.285 197.534 206.304 197.686 206.291 197.836C206.278 197.987 206.232 198.132 206.157 198.263Z", "fill", "#9196A4"], ["d", "M205.815 200.499C205.755 199.838 204.683 199.4 204.683 199.4C204.683 199.4 203.71 200.031 203.77 200.688C203.759 200.839 203.781 200.991 203.834 201.133C203.888 201.275 203.972 201.403 204.08 201.51C204.188 201.616 204.318 201.697 204.461 201.748C204.604 201.799 204.756 201.817 204.907 201.803C205.058 201.789 205.204 201.742 205.335 201.665C205.465 201.589 205.578 201.485 205.664 201.36C205.751 201.235 205.809 201.093 205.835 200.944C205.861 200.794 205.854 200.641 205.815 200.495V200.499Z", "fill", "#9196A4"], ["d", "M202.995 167.683C203.501 168.112 203.252 169.245 203.252 169.245C203.252 169.245 202.181 169.674 201.671 169.245C201.541 169.167 201.43 169.063 201.345 168.938C201.26 168.813 201.203 168.671 201.178 168.522C201.153 168.373 201.161 168.221 201.201 168.075C201.241 167.93 201.312 167.794 201.409 167.679C201.506 167.563 201.627 167.47 201.764 167.406C201.9 167.342 202.049 167.308 202.2 167.308C202.351 167.307 202.5 167.339 202.637 167.401C202.774 167.464 202.896 167.556 202.995 167.67V167.683Z", "fill", "#9196A4"], ["d", "M205.283 169.39C204.76 169.819 203.706 169.322 203.706 169.322C203.706 169.322 203.496 168.18 204.019 167.768C204.122 167.664 204.247 167.582 204.384 167.529C204.522 167.477 204.669 167.453 204.816 167.462C204.963 167.47 205.106 167.509 205.237 167.577C205.367 167.644 205.482 167.739 205.574 167.854C205.665 167.97 205.731 168.103 205.768 168.246C205.804 168.389 205.809 168.538 205.784 168.683C205.758 168.828 205.702 168.966 205.62 169.088C205.537 169.21 205.43 169.313 205.304 169.39H205.283Z", "fill", "#9196A4"], ["d", "M203.852 171.124C204.143 170.523 203.458 169.592 203.458 169.592C203.458 169.592 202.296 169.622 202.005 170.218C201.918 170.342 201.859 170.482 201.832 170.631C201.804 170.779 201.81 170.932 201.847 171.078C201.884 171.224 201.953 171.36 202.048 171.477C202.143 171.594 202.263 171.689 202.398 171.756C202.533 171.822 202.681 171.858 202.832 171.862C202.983 171.865 203.132 171.836 203.271 171.776C203.409 171.715 203.533 171.626 203.633 171.513C203.733 171.401 203.808 171.268 203.852 171.124Z", "fill", "#9196A4"], ["d", "M181.193 117.502C181.703 117.931 181.45 119.064 181.45 119.064C181.45 119.064 180.379 119.493 179.873 119.064C179.745 118.986 179.636 118.882 179.552 118.758C179.469 118.633 179.413 118.493 179.389 118.345C179.364 118.197 179.372 118.046 179.412 117.901C179.452 117.757 179.522 117.623 179.619 117.508C179.715 117.394 179.835 117.302 179.97 117.238C180.105 117.174 180.253 117.14 180.402 117.139C180.552 117.137 180.7 117.168 180.837 117.23C180.973 117.291 181.095 117.381 181.193 117.494V117.502Z", "fill", "#9196A4"], ["d", "M183.483 119.21C182.96 119.639 181.901 119.137 181.901 119.137C181.901 119.137 181.696 117.996 182.218 117.588C182.321 117.477 182.446 117.389 182.586 117.331C182.725 117.273 182.876 117.247 183.027 117.253C183.178 117.259 183.326 117.298 183.46 117.367C183.595 117.436 183.712 117.534 183.805 117.653C183.898 117.772 183.964 117.911 183.999 118.058C184.033 118.205 184.035 118.358 184.004 118.506C183.973 118.655 183.911 118.794 183.821 118.916C183.731 119.037 183.615 119.138 183.483 119.21Z", "fill", "#9196A4"], ["d", "M182.025 120.939C182.316 120.343 181.63 119.407 181.63 119.407C181.63 119.407 180.473 119.442 180.182 120.038C180.097 120.161 180.04 120.301 180.014 120.448C179.988 120.595 179.994 120.746 180.032 120.891C180.07 121.036 180.138 121.171 180.233 121.286C180.327 121.402 180.446 121.496 180.58 121.561C180.714 121.627 180.861 121.663 181.01 121.666C181.16 121.67 181.308 121.641 181.445 121.582C181.582 121.523 181.705 121.435 181.805 121.324C181.905 121.213 181.98 121.082 182.025 120.939Z", "fill", "#9196A4"], ["d", "M184.455 126.671C184.806 126.109 185.963 126.195 185.963 126.195C185.963 126.195 186.55 127.195 186.199 127.757C186.139 127.893 186.051 128.015 185.94 128.113C185.829 128.212 185.698 128.286 185.556 128.33C185.414 128.374 185.265 128.387 185.117 128.368C184.97 128.349 184.829 128.298 184.702 128.22C184.576 128.141 184.469 128.036 184.386 127.913C184.304 127.789 184.249 127.649 184.226 127.502C184.202 127.355 184.211 127.205 184.25 127.062C184.29 126.919 184.359 126.785 184.455 126.671Z", "fill", "#9196A4"], ["d", "M185.818 124.162C186.298 124.621 185.973 125.737 185.973 125.737C185.973 125.737 184.876 126.106 184.396 125.647C184.271 125.561 184.166 125.449 184.089 125.319C184.012 125.189 183.964 125.044 183.949 124.893C183.933 124.743 183.951 124.591 184 124.448C184.049 124.305 184.129 124.174 184.233 124.065C184.338 123.956 184.465 123.871 184.606 123.816C184.747 123.761 184.898 123.737 185.048 123.746C185.199 123.755 185.346 123.797 185.479 123.869C185.612 123.941 185.728 124.041 185.818 124.162Z", "fill", "#9196A4"], ["d", "M187.738 125.354C187.108 125.153 186.281 125.968 186.281 125.968C186.281 125.968 186.478 127.109 187.108 127.315C187.243 127.383 187.39 127.421 187.541 127.427C187.691 127.432 187.841 127.405 187.98 127.347C188.118 127.288 188.243 127.201 188.345 127.09C188.447 126.979 188.523 126.847 188.569 126.704C188.615 126.56 188.63 126.409 188.612 126.259C188.594 126.11 188.543 125.966 188.464 125.837C188.385 125.709 188.28 125.6 188.154 125.516C188.029 125.433 187.887 125.378 187.738 125.354Z", "fill", "#9196A4"], ["d", "M195.216 123.466C194.912 124.058 193.75 124.062 193.75 124.062C193.75 124.062 193.086 123.114 193.39 122.522C193.437 122.378 193.514 122.246 193.617 122.135C193.719 122.024 193.845 121.936 193.985 121.878C194.124 121.821 194.275 121.794 194.426 121.801C194.577 121.807 194.725 121.847 194.859 121.916C194.993 121.985 195.111 122.083 195.204 122.203C195.297 122.322 195.362 122.461 195.396 122.608C195.43 122.756 195.432 122.909 195.4 123.057C195.369 123.205 195.306 123.345 195.216 123.466Z", "fill", "#9196A4"], ["d", "M194.055 126.075C193.541 125.646 193.777 124.517 193.777 124.517C193.777 124.517 194.844 124.063 195.354 124.483C195.489 124.555 195.607 124.657 195.699 124.78C195.791 124.903 195.855 125.045 195.885 125.195C195.916 125.346 195.913 125.502 195.877 125.651C195.84 125.8 195.771 125.94 195.675 126.059C195.578 126.179 195.456 126.276 195.318 126.343C195.18 126.409 195.029 126.445 194.875 126.446C194.722 126.448 194.57 126.415 194.43 126.351C194.29 126.287 194.167 126.193 194.068 126.075H194.055Z", "fill", "#9196A4"], ["d", "M192.049 125.037C192.691 125.191 193.454 124.316 193.454 124.316C193.454 124.316 193.163 123.192 192.52 123.029C192.382 122.973 192.233 122.949 192.084 122.956C191.935 122.964 191.79 123.004 191.658 123.073C191.525 123.141 191.41 123.238 191.318 123.356C191.227 123.474 191.162 123.61 191.127 123.755C191.093 123.9 191.091 124.051 191.12 124.197C191.149 124.344 191.209 124.482 191.297 124.603C191.384 124.723 191.497 124.824 191.626 124.897C191.756 124.971 191.9 125.015 192.049 125.028V125.037Z", "fill", "#9196A4"], ["d", "M203.697 129.117C203.178 129.546 202.12 129.066 202.12 129.066C202.12 129.066 201.897 127.929 202.416 127.512C202.517 127.405 202.641 127.32 202.778 127.264C202.916 127.208 203.063 127.182 203.211 127.188C203.359 127.194 203.504 127.232 203.637 127.299C203.769 127.366 203.885 127.46 203.978 127.576C204.071 127.692 204.138 127.826 204.174 127.97C204.211 128.114 204.216 128.264 204.19 128.41C204.164 128.556 204.106 128.694 204.022 128.816C203.938 128.938 203.828 129.041 203.701 129.117H203.697Z", "fill", "#9196A4"], ["d", "M201.581 131.031C201.281 130.439 201.958 129.495 201.958 129.495C201.958 129.495 203.115 129.495 203.415 130.104C203.504 130.227 203.566 130.367 203.596 130.515C203.626 130.664 203.623 130.817 203.587 130.964C203.552 131.111 203.485 131.249 203.391 131.368C203.297 131.486 203.179 131.583 203.044 131.651C202.909 131.72 202.761 131.758 202.61 131.763C202.458 131.768 202.308 131.74 202.169 131.681C202.03 131.622 201.905 131.533 201.803 131.421C201.702 131.309 201.626 131.176 201.581 131.031Z", "fill", "#9196A4"], ["d", "M200.165 129.268C200.693 129.667 201.743 129.178 201.743 129.178C201.743 129.178 201.935 128.032 201.408 127.629C201.304 127.519 201.178 127.433 201.037 127.377C200.897 127.322 200.746 127.297 200.596 127.305C200.445 127.314 200.298 127.355 200.164 127.426C200.031 127.496 199.915 127.596 199.823 127.716C199.732 127.836 199.668 127.975 199.636 128.123C199.603 128.271 199.603 128.423 199.636 128.571C199.668 128.719 199.733 128.857 199.824 128.978C199.916 129.098 200.032 129.197 200.165 129.268Z", "fill", "#9196A4"], ["d", "M210.376 142.097C209.857 142.526 208.794 142.05 208.794 142.05C208.794 142.05 208.576 140.909 209.09 140.493C209.191 140.38 209.315 140.29 209.454 140.231C209.593 140.171 209.743 140.142 209.894 140.146C210.045 140.15 210.194 140.187 210.329 140.254C210.464 140.322 210.583 140.418 210.678 140.536C210.773 140.654 210.84 140.791 210.877 140.938C210.913 141.085 210.917 141.238 210.888 141.387C210.859 141.535 210.799 141.676 210.71 141.798C210.622 141.921 210.507 142.023 210.376 142.097Z", "fill", "#9196A4"], ["d", "M208.259 144.011C207.959 143.419 208.631 142.475 208.631 142.475C208.631 142.475 209.793 142.475 210.089 143.084C210.175 143.206 210.235 143.345 210.263 143.492C210.291 143.639 210.287 143.79 210.251 143.935C210.215 144.08 210.148 144.216 210.055 144.333C209.962 144.45 209.845 144.545 209.712 144.613C209.579 144.68 209.432 144.718 209.283 144.724C209.134 144.73 208.985 144.703 208.847 144.646C208.709 144.589 208.585 144.502 208.484 144.393C208.382 144.283 208.305 144.153 208.259 144.011Z", "fill", "#9196A4"], ["d", "M206.853 142.251C207.38 142.65 208.43 142.161 208.43 142.161C208.43 142.161 208.623 141.015 208.096 140.612C207.992 140.502 207.865 140.417 207.725 140.361C207.585 140.305 207.434 140.28 207.283 140.289C207.132 140.297 206.985 140.338 206.852 140.409C206.719 140.48 206.602 140.579 206.511 140.699C206.419 140.82 206.355 140.959 206.323 141.106C206.291 141.254 206.291 141.407 206.323 141.554C206.356 141.702 206.42 141.841 206.512 141.961C206.603 142.081 206.719 142.18 206.853 142.251Z", "fill", "#9196A4"], ["d", "M194.016 132.224C194.444 131.713 195.576 131.958 195.576 131.958C195.576 131.958 196.004 133.031 195.576 133.541C195.499 133.672 195.395 133.785 195.271 133.871C195.147 133.958 195.005 134.016 194.856 134.043C194.707 134.069 194.554 134.062 194.408 134.023C194.261 133.984 194.125 133.913 194.009 133.816C193.893 133.719 193.799 133.598 193.734 133.461C193.67 133.324 193.636 133.174 193.635 133.023C193.634 132.871 193.666 132.721 193.729 132.583C193.791 132.445 193.884 132.323 193.998 132.224H194.016Z", "fill", "#9196A4"], ["d", "M195.71 129.929C196.138 130.448 195.646 131.508 195.646 131.508C195.646 131.508 194.505 131.722 194.094 131.199C193.987 131.096 193.904 130.971 193.849 130.833C193.794 130.695 193.77 130.547 193.777 130.398C193.784 130.25 193.822 130.105 193.89 129.973C193.957 129.841 194.052 129.725 194.168 129.632C194.284 129.54 194.419 129.473 194.563 129.437C194.706 129.401 194.856 129.396 195.002 129.422C195.148 129.448 195.287 129.506 195.409 129.59C195.531 129.675 195.633 129.784 195.71 129.911V129.929Z", "fill", "#9196A4"], ["d", "M197.45 131.375C196.85 131.087 195.92 131.778 195.92 131.778C195.92 131.778 195.958 132.941 196.554 133.228C196.678 133.315 196.819 133.373 196.967 133.4C197.115 133.426 197.268 133.42 197.413 133.382C197.559 133.344 197.695 133.275 197.811 133.179C197.928 133.083 198.022 132.963 198.088 132.827C198.153 132.691 198.189 132.543 198.191 132.392C198.194 132.241 198.164 132.092 198.103 131.954C198.043 131.816 197.953 131.692 197.84 131.592C197.727 131.492 197.594 131.418 197.45 131.375Z", "fill", "#9196A4"], ["d", "M205.467 152C205.895 151.49 207.027 151.738 207.027 151.738C207.027 151.738 207.455 152.807 207.027 153.317C206.95 153.448 206.847 153.561 206.722 153.648C206.598 153.734 206.456 153.793 206.307 153.819C206.158 153.845 206.005 153.838 205.859 153.799C205.712 153.76 205.576 153.69 205.46 153.592C205.344 153.495 205.25 153.374 205.186 153.237C205.121 153.1 205.087 152.95 205.086 152.799C205.085 152.647 205.117 152.497 205.18 152.359C205.243 152.221 205.335 152.099 205.45 152H205.467Z", "fill", "#9196A4"], ["d", "M207.164 149.704C207.593 150.228 207.1 151.287 207.1 151.287C207.1 151.287 205.96 151.498 205.553 150.978C205.444 150.876 205.359 150.752 205.302 150.613C205.246 150.475 205.219 150.326 205.225 150.176C205.231 150.027 205.269 149.881 205.337 149.747C205.404 149.614 205.5 149.497 205.616 149.403C205.733 149.31 205.869 149.243 206.013 149.207C206.158 149.171 206.309 149.166 206.456 149.193C206.603 149.221 206.742 149.279 206.864 149.365C206.987 149.451 207.089 149.562 207.164 149.691V149.704Z", "fill", "#9196A4"], ["d", "M208.901 151.155C208.305 150.863 207.371 151.558 207.371 151.558C207.371 151.558 207.41 152.716 208.005 153.004C208.129 153.087 208.268 153.143 208.415 153.168C208.562 153.193 208.712 153.186 208.856 153.147C208.999 153.109 209.133 153.039 209.248 152.945C209.362 152.85 209.455 152.731 209.52 152.597C209.585 152.463 209.621 152.317 209.624 152.168C209.627 152.019 209.599 151.871 209.54 151.734C209.481 151.597 209.394 151.475 209.284 151.375C209.173 151.275 209.043 151.2 208.901 151.155Z", "fill", "#9196A4"], ["d", "M199.588 138.39C200.235 138.24 200.985 139.124 200.985 139.124C200.985 139.124 200.694 140.244 200.047 140.411C199.907 140.469 199.756 140.496 199.604 140.49C199.453 140.484 199.305 140.445 199.17 140.375C199.035 140.306 198.917 140.208 198.824 140.088C198.731 139.968 198.666 139.829 198.632 139.681C198.598 139.533 198.597 139.38 198.628 139.231C198.66 139.083 198.723 138.943 198.814 138.822C198.905 138.701 199.022 138.601 199.156 138.529C199.289 138.458 199.437 138.416 199.588 138.407V138.39Z", "fill", "#9196A4"], ["d", "M202.327 137.587C202.327 138.252 201.32 138.81 201.32 138.81C201.32 138.81 200.283 138.286 200.27 137.625C200.244 137.477 200.25 137.325 200.288 137.179C200.326 137.034 200.396 136.898 200.491 136.781C200.587 136.665 200.706 136.571 200.842 136.505C200.977 136.44 201.125 136.404 201.276 136.402C201.426 136.399 201.576 136.429 201.713 136.489C201.851 136.55 201.974 136.639 202.074 136.752C202.174 136.864 202.248 136.997 202.292 137.142C202.336 137.286 202.348 137.438 202.327 137.587Z", "fill", "#9196A4"], ["d", "M202.833 139.793C202.529 139.2 201.371 139.188 201.371 139.188C201.371 139.188 200.699 140.136 201.003 140.728C201.049 140.872 201.125 141.005 201.227 141.116C201.329 141.228 201.454 141.316 201.594 141.374C201.734 141.433 201.884 141.46 202.035 141.454C202.186 141.448 202.334 141.41 202.469 141.341C202.604 141.272 202.722 141.175 202.815 141.056C202.908 140.937 202.975 140.798 203.009 140.651C203.044 140.504 203.046 140.351 203.016 140.202C202.985 140.054 202.923 139.914 202.833 139.793Z", "fill", "#9196A4"], ["d", "M229.211 152.549C228.594 152.798 227.711 152.047 227.711 152.047C227.711 152.047 227.827 150.893 228.44 150.644C228.568 150.564 228.713 150.514 228.864 150.496C229.014 150.478 229.167 150.493 229.311 150.54C229.455 150.587 229.587 150.665 229.698 150.769C229.809 150.872 229.896 150.999 229.952 151.139C230.009 151.28 230.035 151.431 230.027 151.583C230.02 151.734 229.979 151.882 229.909 152.017C229.838 152.151 229.739 152.268 229.619 152.36C229.498 152.452 229.359 152.517 229.211 152.549Z", "fill", "#9196A4"], ["d", "M226.636 153.755C226.516 153.103 227.433 152.391 227.433 152.391C227.433 152.391 228.539 152.742 228.655 153.395C228.703 153.536 228.72 153.687 228.704 153.836C228.689 153.984 228.642 154.128 228.566 154.257C228.49 154.386 228.387 154.497 228.264 154.582C228.142 154.668 228.002 154.725 227.855 154.752C227.708 154.778 227.557 154.772 227.412 154.735C227.267 154.697 227.132 154.628 227.017 154.534C226.901 154.439 226.807 154.321 226.741 154.186C226.675 154.052 226.64 153.905 226.636 153.755Z", "fill", "#9196A4"], ["d", "M225.787 151.657C226.177 152.193 227.321 152.026 227.321 152.026C227.321 152.026 227.836 150.983 227.446 150.447C227.376 150.315 227.279 150.2 227.162 150.108C227.044 150.017 226.908 149.952 226.763 149.919C226.617 149.885 226.467 149.883 226.321 149.912C226.175 149.942 226.037 150.003 225.917 150.091C225.796 150.179 225.696 150.291 225.623 150.421C225.55 150.551 225.506 150.696 225.494 150.844C225.481 150.993 225.501 151.142 225.552 151.283C225.602 151.423 225.683 151.551 225.787 151.657Z", "fill", "#9196A4"], ["d", "M223.481 160.11C222.842 159.93 222.598 158.797 222.598 158.797C222.598 158.797 223.391 157.939 224.033 158.128C224.183 158.144 224.328 158.194 224.457 158.272C224.586 158.35 224.697 158.455 224.781 158.581C224.866 158.706 224.922 158.848 224.946 158.997C224.97 159.146 224.962 159.299 224.921 159.444C224.881 159.59 224.809 159.725 224.711 159.84C224.613 159.955 224.492 160.047 224.355 160.111C224.218 160.174 224.068 160.207 223.917 160.207C223.767 160.207 223.617 160.174 223.481 160.11Z", "fill", "#9196A4"], ["d", "M220.695 159.505C220.999 158.917 222.156 158.913 222.156 158.913C222.156 158.913 222.821 159.866 222.516 160.453C222.467 160.594 222.389 160.722 222.286 160.83C222.183 160.937 222.058 161.021 221.92 161.076C221.781 161.131 221.633 161.156 221.484 161.148C221.336 161.141 221.191 161.101 221.059 161.032C220.927 160.964 220.811 160.867 220.72 160.75C220.628 160.633 220.563 160.497 220.528 160.352C220.494 160.207 220.491 160.057 220.52 159.91C220.548 159.764 220.608 159.626 220.695 159.505Z", "fill", "#9196A4"], ["d", "M221.299 157.325C221.299 157.99 222.294 158.552 222.294 158.552C222.294 158.552 223.335 158.041 223.352 157.38C223.382 157.232 223.378 157.078 223.342 156.931C223.306 156.784 223.239 156.646 223.144 156.527C223.049 156.409 222.93 156.313 222.795 156.245C222.659 156.177 222.51 156.14 222.359 156.136C222.207 156.132 222.057 156.161 221.918 156.221C221.779 156.281 221.654 156.371 221.553 156.484C221.453 156.597 221.378 156.731 221.334 156.876C221.29 157.021 221.278 157.174 221.299 157.325Z", "fill", "#9196A4"], ["d", "M218.951 152.759C218.908 153.425 217.854 153.901 217.854 153.901C217.854 153.901 216.859 153.3 216.898 152.639C216.883 152.489 216.9 152.337 216.949 152.195C216.998 152.052 217.078 151.922 217.182 151.813C217.286 151.704 217.413 151.619 217.553 151.563C217.694 151.508 217.844 151.484 217.995 151.493C218.145 151.502 218.292 151.543 218.425 151.614C218.558 151.686 218.674 151.785 218.765 151.905C218.856 152.026 218.919 152.164 218.952 152.312C218.984 152.459 218.983 152.612 218.951 152.759Z", "fill", "#9196A4"], ["d", "M218.946 155.617C218.307 155.441 218.059 154.33 218.059 154.33C218.059 154.33 218.847 153.471 219.49 153.656C219.641 153.671 219.787 153.719 219.917 153.796C220.047 153.874 220.159 153.978 220.245 154.103C220.331 154.229 220.388 154.371 220.413 154.521C220.438 154.67 220.43 154.823 220.39 154.97C220.35 155.116 220.279 155.252 220.181 155.367C220.083 155.483 219.961 155.576 219.823 155.64C219.686 155.703 219.536 155.736 219.384 155.736C219.233 155.736 219.083 155.702 218.946 155.638V155.617Z", "fill", "#9196A4"], ["d", "M216.71 155.484C217.361 155.359 217.7 154.252 217.7 154.252C217.7 154.252 216.98 153.338 216.328 153.463C216.177 153.466 216.028 153.502 215.892 153.569C215.756 153.635 215.637 153.731 215.541 153.848C215.446 153.966 215.377 154.103 215.34 154.25C215.303 154.397 215.299 154.55 215.327 154.699C215.355 154.848 215.415 154.989 215.503 155.112C215.591 155.235 215.705 155.338 215.836 155.412C215.968 155.487 216.114 155.532 216.265 155.544C216.416 155.557 216.568 155.536 216.71 155.484Z", "fill", "#9196A4"], ["d", "M191.115 209.363H224.518C224.633 209.363 224.747 209.389 224.851 209.439C224.955 209.489 225.046 209.561 225.119 209.65C225.192 209.74 225.244 209.845 225.271 209.957C225.298 210.069 225.3 210.186 225.276 210.299L224.848 212.375C224.81 212.548 224.715 212.703 224.578 212.813C224.441 212.924 224.27 212.985 224.093 212.985H191.92C191.763 212.985 191.61 212.938 191.481 212.849C191.351 212.76 191.252 212.634 191.196 212.487L190.412 210.41C190.369 210.295 190.354 210.171 190.369 210.048C190.383 209.926 190.426 209.809 190.495 209.706C190.564 209.604 190.656 209.52 190.764 209.46C190.871 209.4 190.992 209.367 191.115 209.363Z", "fill", "white", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M193.764 216.258C194.137 216.258 222.29 212.984 222.29 212.984H193.426L193.764 216.258Z", "fill", "#9196A4"], ["id", "clip0_7659_134042"], ["width", "255", "height", "242", "fill", "white", "transform", "translate(0.5)"], [1, "margin-bottom40", 2, "color", "#fff"], [1, "margin-bottom10", 2, "text-align", "center", "max-width", "500px"], ["clip-path", "url(#clip0_6685_108179)"], ["d", "M105.251 133.13L104.316 237.653", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M104.711 119.52C104.711 119.52 114.418 124.278 113.775 124.471C112.862 124.801 109.562 123.424 109.562 123.424C109.562 123.424 108.109 124.814 107.359 124.634C106.417 124.416 105.506 124.082 104.646 123.639", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M101.695 122.549C101.695 122.549 110.455 126.518 109.812 126.711C108.899 127.041 105.599 125.66 105.599 125.66C105.599 125.66 104.146 127.05 103.396 126.87C102.454 126.652 101.543 126.318 100.684 125.874", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M128.416 126.612H102.148V128.118H128.416V126.612Z", "fill", "#11142D"], ["d", "M126.758 126.651L135.604 106.635L136.641 106.982L128.219 126.613L126.758 126.651Z", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M26.236 154.498L21.046 112.02C20.9472 110.881 21.1481 109.736 21.6288 108.698C21.7643 108.396 21.9418 108.114 22.156 107.862C22.7668 107.174 23.52 106.628 24.3632 106.261L36.2988 98.8125", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M35.2621 81.0439C33.4321 86.4546 37.3107 87.729 37.3107 87.729L37.5207 96.4392C37.5327 96.972 37.383 97.4959 37.0915 97.9417C36.8 98.3876 36.3803 98.7344 35.8878 98.9365", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M40.1309 92.7663L45.9509 95.1691C46.4035 95.355 46.9056 95.383 47.376 95.2483C47.8464 95.1136 48.2578 94.8242 48.5438 94.4268L50.5752 91.5907C51.4607 90.3599 51.9995 88.9135 52.1351 87.4028V87.4028C52.1351 87.4028 52.8509 82.5156 53.1466 78.8213", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M49.1209 93.9209C49.0909 95.1652 49.4466 95.7401 50.2651 96.667C51.0837 97.5938 52.2537 98.4691 53.488 98.5892", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M36.3242 98.7953C45.2771 107.192 52.6485 99.6534 53.6556 98.4863", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M48.0762 81.5462C50.3733 81.1858 51.1191 81.9067 51.1191 81.9067", "stroke", "#11142D", "stroke-width", "0.58", "stroke-miterlimit", "10"], ["d", "M53.3424 98.5853C44.4924 107.038 37.0566 99.1346 37.0566 99.1346C43.4209 103.078 50.0081 99.1346 50.6981 97.208L53.3424 98.5853Z", "fill", "#11142D"], ["d", "M54.5647 101.567C53.3268 102.769 51.8822 103.737 50.3004 104.425C48.703 105.085 46.9666 105.338 45.2476 105.159C43.549 104.951 41.9038 104.429 40.3961 103.618L39.2818 103L38.2189 102.292C37.8616 102.061 37.5182 101.809 37.1904 101.537L36.1875 100.752L37.2076 101.516C37.5411 101.779 37.8887 102.024 38.249 102.249L39.3204 102.932L40.4476 103.524C41.9514 104.296 43.5871 104.778 45.269 104.944C46.9456 105.085 48.6308 104.805 50.1718 104.129C51.6984 103.428 53.0852 102.455 54.2647 101.258L54.5647 101.567Z", "fill", "#11142D"], ["d", "M174.285 129.079L94.2069 128.054L94.1426 133.022L174.225 134.048", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M25.9531 154.469C32.866 152.774 91.7689 139.451 91.7689 139.451C94.1003 138.996 146.253 199.522 146.253 199.522L141.11 199.835L85.9016 160.562C64.5845 175.674 33.0031 180.582 25.9531 154.469Z", "fill", "#11142D"], ["d", "M49.5579 237.225C59.3508 237.349 67.7851 239.155 71.3079 241.614L27.7051 241.052C31.2922 238.688 39.7522 237.1 49.5579 237.225Z", "fill", "white", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M49.558 237.224L47.8438 177.402", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M98.9605 241.065L98.0605 237.572L105.243 237.667C107.841 237.701 110.386 238.525 112.782 239.7C112.911 239.761 113.016 239.865 113.079 239.993C113.142 240.122 113.16 240.268 113.129 240.407C113.098 240.547 113.02 240.672 112.909 240.762C112.798 240.852 112.659 240.901 112.516 240.902L98.9605 241.065Z", "fill", "white", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M141.728 203.023L140.828 199.534L148.007 199.624C150.608 199.659 153.15 200.482 155.55 201.662C155.677 201.725 155.779 201.828 155.841 201.956C155.902 202.084 155.918 202.229 155.887 202.368C155.856 202.506 155.779 202.63 155.669 202.719C155.558 202.809 155.421 202.858 155.28 202.86L141.728 203.023Z", "fill", "white", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M75.5431 160.917L98.0346 237.516L104.339 237.95L91.8588 139.532L25.9531 154.468L75.5431 160.917Z", "fill", "#11142D"], ["d", "M23.642 176.849L68.6856 177.424C70.2097 177.443 71.461 176.223 71.4804 174.698C71.4999 173.173 70.28 171.921 68.7558 171.902L23.7123 171.327C22.1881 171.308 20.9368 172.528 20.9174 174.053C20.898 175.578 22.1178 176.83 23.642 176.849Z", "fill", "white", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M53.3438 98.585L59.6523 99.898C60.9289 100.163 62.0924 100.818 62.9832 101.771C63.8739 102.724 64.4485 103.93 64.6281 105.223L67.3152 125.531", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M34.3433 112.191L43.0519 129.003L96.3876 121.67L97.0777 126.965L37.669 140.785C36.4991 141.06 35.2708 140.928 34.1853 140.412C33.0999 139.896 32.2217 139.026 31.6948 137.945L21.752 117.937", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M66.332 119.189L104.586 119.443L104.886 123.965", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M2.21484 241.571H255.501", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M96.4531 121.76C96.6031 121.73 101.677 122.365 101.677 122.365L100.82 126.094L96.9974 126.703", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M67.875 133.546L68.9979 144.934", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M22.5078 119.867L31.0535 142.059C31.5158 143.258 32.4197 144.234 33.579 144.785C34.7383 145.337 36.0646 145.422 37.285 145.024L67.9664 134.057L67.615 133.829L37.2549 140.974C36.2455 141.211 35.1855 141.101 34.2467 140.66C33.3078 140.219 32.5451 139.474 32.0821 138.545L22.5078 119.867Z", "fill", "#11142D"], ["d", "M69.7399 125.347L67.5242 119.387L66.4785 119.417L67.2371 125.78L69.7399 125.347Z", "fill", "#11142D"], ["d", "M52.5539 77.6375C52.9824 78.4956 53.0167 80.2805 52.8324 82.1685C52.6481 84.0564 51.8509 88.9308 51.3024 90.3725C50.7538 91.8142 48.5424 94.4273 48.5424 94.4273C48.0281 100.563 49.5967 125.531 62.5053 121.575C70.8967 119.001 60.1824 104.12 55.5324 95.3327C50.8824 86.5451 60.551 80.8598 53.1452 71.7633C52.0824 70.4761 46.4424 67.0864 40.4124 69.6179C30.4267 73.7757 32.5653 92.6938 37.091 97.9586C37.091 97.9586 37.4595 97.0747 37.4081 91.9515C37.3567 86.8283 36.7481 87.8281 35.2653 85.9144C33.7824 84.0007 34.8838 81.4906 36.1224 80.7053C37.361 79.9201 40.8367 77.8133 40.9138 75.3247C40.9138 75.3247 45.161 78.1695 48.4696 78.457C51.7781 78.7445 52.5539 77.6375 52.5539 77.6375Z", "fill", "#11142D"], ["d", "M35.998 80.3921C36.2466 81.1987 36.7137 83.091 36.9409 84.0349C36.9409 84.0486 36.9463 84.0617 36.9559 84.0714C36.9656 84.0811 36.9787 84.0865 36.9924 84.0865C37.006 84.0865 37.019 84.0811 37.0287 84.0714C37.0383 84.0617 37.0437 84.0486 37.0437 84.0349C37.0052 82.855 37.0866 80.1518 38.458 78.8431C40.2366 77.1268 36.1866 78.2467 36.1866 78.2467L35.998 80.3921Z", "fill", "#11142D"], ["d", "M53.1846 81.5854C54.5989 81.7527 55.6831 82.3577 55.516 83.7736C55.4343 84.2601 55.2147 84.713 54.8834 85.0781C54.552 85.4433 54.1228 85.7054 53.6469 85.8333C53.1711 85.9612 52.6684 85.9496 52.199 85.7997C51.7295 85.6498 51.3129 85.3681 50.9988 84.9879C50.5775 84.479 50.3661 83.8284 50.4075 83.1687C50.5789 81.7527 51.7789 81.418 53.1846 81.5854Z", "fill", "white", "stroke", "#11142D", "stroke-width", "0.87", "stroke-miterlimit", "10"], ["d", "M43.3617 82.3316L35.9088 81.7266L35.7031 81.083L43.7131 81.3146", "stroke", "#11142D", "stroke-width", "0.58", "stroke-miterlimit", "10"], ["d", "M46.1433 80.7484C47.5533 80.9158 48.6419 81.525 48.4748 82.941C48.3741 83.6011 48.0211 84.1962 47.4904 84.6007C46.9597 85.0052 46.2928 85.1874 45.6305 85.1089C44.9681 85.0304 44.3621 84.6973 43.9405 84.1799C43.5188 83.6626 43.3144 83.0014 43.3704 82.336C43.5376 80.9158 44.729 80.5811 46.1433 80.7484Z", "stroke", "#11142D", "stroke-width", "0.87", "stroke-miterlimit", "10"], ["d", "M174.075 239.696V35.1548C174.074 25.8942 170.399 17.0132 163.859 10.465C157.318 3.91674 148.448 0.237466 139.198 0.236328H101.248", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M66.4707 10.4524H146.292L119.001 2.04241C109.93 -0.754537 100.215 -0.661528 91.1993 2.30849L66.4707 10.4524Z", "fill", "#11142D"], ["d", "M234.029 241.484H195.766", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M193.426 212.989H222.286L219.414 241.467H195.637L193.426 212.989Z", "fill", "white", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M174.928 242.145C175.515 242.145 195.555 235.279 195.555 235.279L195.983 241.286L174.928 242.145Z", "fill", "#11142D"], ["d", "M195.059 177.921L207.161 188.163C207.161 188.163 206.973 208.025 206.994 209.359", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M204.105 185.584L207.35 163.907L225.727 153.034", "stroke", "#11142D", "stroke-miterlimit", "10", "stroke-linecap", "round"], ["d", "M214.914 159.432L199.653 130.237L183.984 121.66", "stroke", "#11142D", "stroke-miterlimit", "10", "stroke-linecap", "round"], ["d", "M201.028 178.084C200.599 178.603 199.477 178.389 199.477 178.389C199.477 178.389 199.005 177.329 199.417 176.806C199.492 176.677 199.594 176.565 199.717 176.479C199.839 176.393 199.978 176.335 200.125 176.308C200.272 176.28 200.423 176.285 200.568 176.321C200.712 176.357 200.848 176.424 200.965 176.518C201.081 176.611 201.177 176.728 201.244 176.862C201.312 176.995 201.35 177.141 201.356 177.291C201.362 177.44 201.336 177.589 201.279 177.727C201.222 177.866 201.137 177.99 201.028 178.093V178.084Z", "fill", "#11142D"], ["d", "M199.39 180.44C198.961 179.929 199.39 178.856 199.39 178.856C199.39 178.856 200.525 178.612 200.95 179.122C201.063 179.222 201.153 179.345 201.214 179.482C201.276 179.62 201.306 179.769 201.305 179.92C201.303 180.071 201.268 180.219 201.203 180.355C201.138 180.491 201.045 180.612 200.929 180.708C200.814 180.804 200.678 180.875 200.533 180.914C200.387 180.953 200.235 180.96 200.087 180.934C199.939 180.909 199.798 180.851 199.673 180.766C199.549 180.681 199.445 180.569 199.368 180.44H199.39Z", "fill", "#11142D"], ["d", "M197.62 179.019C198.224 179.294 199.137 178.59 199.137 178.59C199.137 178.59 199.069 177.432 198.464 177.157C198.339 177.075 198.197 177.021 198.049 176.999C197.901 176.977 197.75 176.987 197.606 177.028C197.462 177.07 197.328 177.142 197.215 177.24C197.101 177.338 197.01 177.46 196.948 177.596C196.886 177.732 196.853 177.881 196.854 178.031C196.854 178.181 196.886 178.329 196.949 178.465C197.011 178.602 197.103 178.723 197.216 178.821C197.33 178.919 197.463 178.991 197.607 179.032L197.62 179.019Z", "fill", "#11142D"], ["d", "M193.164 174.63C193.661 175.059 193.382 176.196 193.382 176.196C193.382 176.196 192.298 176.625 191.801 176.166C191.676 176.084 191.571 175.976 191.491 175.85C191.412 175.724 191.361 175.582 191.341 175.434C191.321 175.286 191.334 175.136 191.377 174.993C191.421 174.851 191.495 174.719 191.594 174.608C191.693 174.496 191.814 174.407 191.951 174.347C192.087 174.287 192.235 174.257 192.384 174.259C192.533 174.261 192.679 174.295 192.814 174.359C192.949 174.423 193.068 174.515 193.164 174.63Z", "fill", "#11142D"], ["d", "M195.406 176.397C194.874 176.792 193.829 176.286 193.829 176.286C193.829 176.286 193.653 175.14 194.184 174.745C194.29 174.64 194.417 174.56 194.557 174.508C194.696 174.457 194.845 174.436 194.994 174.447C195.142 174.459 195.286 174.502 195.416 174.574C195.546 174.646 195.66 174.745 195.748 174.865C195.837 174.985 195.898 175.122 195.929 175.268C195.96 175.413 195.959 175.564 195.927 175.709C195.894 175.855 195.831 175.991 195.741 176.11C195.651 176.229 195.537 176.327 195.406 176.397Z", "fill", "#11142D"], ["d", "M193.905 178.088C194.214 177.5 193.549 176.548 193.549 176.548C193.549 176.548 192.392 176.548 192.084 177.14C191.997 177.261 191.937 177.399 191.908 177.545C191.879 177.691 191.882 177.842 191.917 177.987C191.951 178.132 192.017 178.267 192.108 178.385C192.2 178.502 192.315 178.598 192.447 178.667C192.579 178.736 192.724 178.775 192.873 178.783C193.022 178.79 193.17 178.766 193.308 178.711C193.447 178.656 193.571 178.572 193.674 178.465C193.777 178.357 193.856 178.229 193.905 178.088Z", "fill", "#11142D"], ["d", "M197.35 185.108C197.732 184.563 198.88 184.713 198.88 184.713C198.88 184.713 199.412 185.743 199.03 186.288C198.963 186.421 198.869 186.539 198.752 186.632C198.636 186.725 198.501 186.792 198.357 186.829C198.212 186.865 198.062 186.87 197.915 186.843C197.769 186.816 197.63 186.758 197.508 186.672C197.386 186.586 197.284 186.475 197.209 186.347C197.133 186.218 197.087 186.074 197.072 185.926C197.057 185.778 197.074 185.628 197.122 185.487C197.17 185.346 197.248 185.216 197.35 185.108Z", "fill", "#11142D"], ["d", "M198.846 182.675C199.3 183.16 198.914 184.254 198.914 184.254C198.914 184.254 197.8 184.563 197.346 184.078C197.23 183.985 197.135 183.868 197.068 183.735C197.001 183.602 196.963 183.456 196.958 183.307C196.952 183.159 196.979 183.01 197.035 182.872C197.092 182.735 197.177 182.611 197.286 182.509C197.395 182.407 197.524 182.33 197.665 182.283C197.806 182.236 197.956 182.22 198.104 182.235C198.252 182.251 198.395 182.299 198.523 182.374C198.651 182.45 198.761 182.553 198.846 182.675Z", "fill", "#11142D"], ["d", "M200.698 183.971C200.081 183.735 199.211 184.503 199.211 184.503C199.211 184.503 199.344 185.653 199.965 185.893C200.096 185.969 200.241 186.016 200.392 186.03C200.542 186.045 200.694 186.026 200.836 185.976C200.979 185.925 201.109 185.845 201.217 185.739C201.325 185.634 201.409 185.506 201.463 185.364C201.517 185.223 201.539 185.072 201.529 184.921C201.519 184.77 201.475 184.623 201.403 184.49C201.33 184.358 201.229 184.243 201.108 184.153C200.986 184.063 200.846 184.001 200.698 183.971Z", "fill", "#11142D"], ["d", "M209.951 180.088C209.291 180.011 208.875 178.925 208.875 178.925C208.875 178.925 209.531 177.968 210.186 178.045C210.338 178.037 210.489 178.063 210.629 178.119C210.77 178.176 210.897 178.262 211 178.373C211.104 178.483 211.183 178.615 211.23 178.759C211.278 178.903 211.293 179.056 211.276 179.206C211.259 179.357 211.209 179.502 211.13 179.631C211.05 179.761 210.944 179.871 210.818 179.955C210.692 180.039 210.549 180.094 210.399 180.117C210.249 180.14 210.096 180.13 209.951 180.088Z", "fill", "#11142D"], ["d", "M207.105 179.925C207.315 179.294 208.459 179.109 208.459 179.109C208.459 179.109 209.26 179.968 209.05 180.577C209.024 180.724 208.967 180.863 208.882 180.986C208.797 181.109 208.687 181.212 208.559 181.288C208.431 181.364 208.288 181.412 208.139 181.428C207.991 181.443 207.841 181.427 207.7 181.38C207.559 181.332 207.429 181.255 207.32 181.153C207.212 181.051 207.126 180.927 207.07 180.789C207.013 180.651 206.987 180.502 206.993 180.353C206.999 180.204 207.037 180.058 207.105 179.925Z", "fill", "#11142D"], ["d", "M207.361 177.676C207.447 178.337 208.535 178.736 208.535 178.736C208.535 178.736 209.483 178.066 209.393 177.41C209.395 177.261 209.365 177.113 209.305 176.977C209.245 176.841 209.156 176.719 209.045 176.62C208.934 176.521 208.803 176.447 208.661 176.403C208.519 176.36 208.369 176.347 208.221 176.366C208.074 176.385 207.932 176.436 207.806 176.515C207.68 176.594 207.572 176.699 207.49 176.823C207.408 176.948 207.354 177.088 207.331 177.235C207.308 177.382 207.317 177.533 207.357 177.676H207.361Z", "fill", "#11142D"], ["d", "M210.872 168.24C210.216 168.163 209.801 167.077 209.801 167.077C209.801 167.077 210.452 166.121 211.112 166.198C211.263 166.19 211.414 166.216 211.555 166.273C211.695 166.33 211.821 166.417 211.925 166.527C212.028 166.638 212.106 166.77 212.153 166.914C212.2 167.058 212.216 167.211 212.198 167.361C212.18 167.512 212.13 167.656 212.051 167.785C211.971 167.915 211.865 168.025 211.739 168.108C211.613 168.192 211.47 168.247 211.32 168.27C211.17 168.293 211.018 168.283 210.872 168.24Z", "fill", "#11142D"], ["d", "M208.027 168.078C208.237 167.447 209.381 167.263 209.381 167.263C209.381 167.263 210.182 168.121 209.972 168.73C209.946 168.877 209.889 169.017 209.804 169.139C209.719 169.262 209.609 169.365 209.481 169.441C209.353 169.517 209.21 169.565 209.061 169.581C208.913 169.597 208.763 169.58 208.622 169.533C208.481 169.486 208.351 169.408 208.242 169.306C208.134 169.204 208.048 169.08 207.992 168.942C207.935 168.804 207.909 168.655 207.915 168.506C207.921 168.357 207.959 168.211 208.027 168.078Z", "fill", "#11142D"], ["d", "M208.283 165.851C208.369 166.512 209.457 166.911 209.457 166.911C209.457 166.911 210.404 166.246 210.314 165.585C210.317 165.436 210.287 165.288 210.227 165.152C210.167 165.016 210.078 164.894 209.967 164.795C209.856 164.696 209.725 164.622 209.583 164.578C209.441 164.534 209.291 164.522 209.143 164.541C208.996 164.56 208.854 164.611 208.728 164.69C208.602 164.769 208.494 164.874 208.412 164.998C208.33 165.122 208.276 165.263 208.253 165.41C208.23 165.557 208.239 165.707 208.279 165.851H208.283Z", "fill", "#11142D"], ["d", "M211.507 188.806C210.89 189.051 210.016 188.291 210.016 188.291C210.016 188.291 210.136 187.137 210.753 186.892C210.883 186.815 211.027 186.766 211.178 186.75C211.328 186.734 211.48 186.751 211.623 186.8C211.766 186.848 211.897 186.928 212.007 187.032C212.116 187.136 212.201 187.263 212.257 187.404C212.312 187.545 212.337 187.696 212.328 187.847C212.319 187.998 212.278 188.146 212.206 188.279C212.135 188.412 212.035 188.529 211.915 188.62C211.794 188.711 211.655 188.774 211.507 188.806Z", "fill", "#11142D"], ["d", "M208.921 190.008C208.81 189.351 209.731 188.647 209.731 188.647C209.731 188.647 210.833 189.008 210.944 189.664C210.991 189.806 211.006 189.957 210.989 190.105C210.972 190.253 210.923 190.396 210.846 190.524C210.769 190.652 210.665 190.761 210.542 190.845C210.419 190.929 210.279 190.985 210.132 191.01C209.985 191.035 209.834 191.028 209.69 190.99C209.546 190.951 209.412 190.882 209.297 190.787C209.182 190.691 209.089 190.573 209.024 190.438C208.96 190.304 208.924 190.157 208.921 190.008Z", "fill", "#11142D"], ["d", "M208.09 187.901C208.476 188.441 209.624 188.283 209.624 188.283C209.624 188.283 210.147 187.244 209.757 186.708C209.69 186.574 209.595 186.456 209.478 186.362C209.361 186.269 209.225 186.201 209.08 186.165C208.934 186.129 208.783 186.125 208.635 186.153C208.488 186.181 208.349 186.241 208.227 186.328C208.105 186.416 208.004 186.528 207.929 186.658C207.855 186.789 207.81 186.934 207.797 187.083C207.784 187.232 207.803 187.383 207.854 187.524C207.905 187.665 207.985 187.794 208.09 187.901Z", "fill", "#11142D"], ["d", "M203.316 197.998C203.971 198.101 204.348 199.195 204.348 199.195C204.348 199.195 203.663 200.13 203.007 200.032C202.856 200.034 202.706 200.003 202.568 199.941C202.43 199.879 202.307 199.788 202.208 199.674C202.108 199.56 202.035 199.426 201.993 199.28C201.95 199.135 201.94 198.982 201.963 198.832C201.986 198.683 202.041 198.54 202.124 198.414C202.208 198.287 202.317 198.181 202.446 198.101C202.575 198.022 202.719 197.972 202.869 197.954C203.02 197.936 203.172 197.951 203.316 197.998Z", "fill", "#11142D"], ["d", "M206.157 198.263C205.921 198.886 204.773 199.027 204.773 199.027C204.773 199.027 204.001 198.169 204.233 197.538C204.263 197.39 204.324 197.25 204.413 197.129C204.503 197.007 204.617 196.906 204.749 196.833C204.881 196.759 205.027 196.716 205.178 196.705C205.328 196.694 205.479 196.716 205.62 196.769C205.762 196.822 205.889 196.905 205.995 197.013C206.101 197.121 206.183 197.25 206.234 197.392C206.285 197.534 206.304 197.686 206.291 197.836C206.278 197.987 206.232 198.132 206.157 198.263Z", "fill", "#11142D"], ["d", "M205.815 200.499C205.755 199.838 204.683 199.4 204.683 199.4C204.683 199.4 203.71 200.031 203.77 200.688C203.759 200.839 203.781 200.991 203.834 201.133C203.888 201.275 203.972 201.403 204.08 201.51C204.188 201.616 204.318 201.697 204.461 201.748C204.604 201.799 204.756 201.817 204.907 201.803C205.058 201.789 205.204 201.742 205.335 201.665C205.465 201.589 205.578 201.485 205.664 201.36C205.751 201.235 205.809 201.093 205.835 200.944C205.861 200.794 205.854 200.641 205.815 200.495V200.499Z", "fill", "#11142D"], ["d", "M202.995 167.683C203.501 168.112 203.252 169.245 203.252 169.245C203.252 169.245 202.181 169.674 201.671 169.245C201.541 169.167 201.43 169.063 201.345 168.938C201.26 168.813 201.203 168.671 201.178 168.522C201.153 168.373 201.161 168.221 201.201 168.075C201.241 167.93 201.312 167.794 201.409 167.679C201.506 167.563 201.627 167.47 201.764 167.406C201.9 167.342 202.049 167.308 202.2 167.308C202.351 167.307 202.5 167.339 202.637 167.401C202.774 167.464 202.896 167.556 202.995 167.67V167.683Z", "fill", "#11142D"], ["d", "M205.283 169.39C204.76 169.819 203.706 169.322 203.706 169.322C203.706 169.322 203.496 168.18 204.019 167.768C204.122 167.664 204.247 167.582 204.384 167.529C204.522 167.477 204.669 167.453 204.816 167.462C204.963 167.47 205.106 167.509 205.237 167.577C205.367 167.644 205.482 167.739 205.574 167.854C205.665 167.97 205.731 168.103 205.768 168.246C205.804 168.389 205.809 168.538 205.784 168.683C205.758 168.828 205.702 168.966 205.62 169.088C205.537 169.21 205.43 169.313 205.304 169.39H205.283Z", "fill", "#11142D"], ["d", "M203.852 171.124C204.143 170.523 203.458 169.592 203.458 169.592C203.458 169.592 202.296 169.622 202.005 170.218C201.918 170.342 201.859 170.482 201.832 170.631C201.804 170.779 201.81 170.932 201.847 171.078C201.884 171.224 201.953 171.36 202.048 171.477C202.143 171.594 202.263 171.689 202.398 171.756C202.533 171.822 202.681 171.858 202.832 171.862C202.983 171.865 203.132 171.836 203.271 171.776C203.409 171.715 203.533 171.626 203.633 171.513C203.733 171.401 203.808 171.268 203.852 171.124Z", "fill", "#11142D"], ["d", "M181.193 117.502C181.703 117.931 181.45 119.064 181.45 119.064C181.45 119.064 180.379 119.493 179.873 119.064C179.745 118.986 179.636 118.882 179.552 118.758C179.469 118.633 179.413 118.493 179.389 118.345C179.364 118.197 179.372 118.046 179.412 117.901C179.452 117.757 179.522 117.623 179.619 117.508C179.715 117.394 179.835 117.302 179.97 117.238C180.105 117.174 180.253 117.14 180.402 117.139C180.552 117.137 180.7 117.168 180.837 117.23C180.973 117.291 181.095 117.381 181.193 117.494V117.502Z", "fill", "#11142D"], ["d", "M183.483 119.21C182.96 119.639 181.901 119.137 181.901 119.137C181.901 119.137 181.696 117.996 182.218 117.588C182.321 117.477 182.446 117.389 182.586 117.331C182.725 117.273 182.876 117.247 183.027 117.253C183.178 117.259 183.326 117.298 183.46 117.367C183.595 117.436 183.712 117.534 183.805 117.653C183.898 117.772 183.964 117.911 183.999 118.058C184.033 118.205 184.035 118.358 184.004 118.506C183.973 118.655 183.911 118.794 183.821 118.916C183.731 119.037 183.615 119.138 183.483 119.21Z", "fill", "#11142D"], ["d", "M182.025 120.939C182.316 120.343 181.63 119.407 181.63 119.407C181.63 119.407 180.473 119.442 180.182 120.038C180.097 120.161 180.04 120.301 180.014 120.448C179.988 120.595 179.994 120.746 180.032 120.891C180.07 121.036 180.138 121.171 180.233 121.286C180.327 121.402 180.446 121.496 180.58 121.561C180.714 121.627 180.861 121.663 181.01 121.666C181.16 121.67 181.308 121.641 181.445 121.582C181.582 121.523 181.705 121.435 181.805 121.324C181.905 121.213 181.98 121.082 182.025 120.939Z", "fill", "#11142D"], ["d", "M184.455 126.671C184.806 126.109 185.963 126.195 185.963 126.195C185.963 126.195 186.55 127.195 186.199 127.757C186.139 127.893 186.051 128.015 185.94 128.113C185.829 128.212 185.698 128.286 185.556 128.33C185.414 128.374 185.265 128.387 185.117 128.368C184.97 128.349 184.829 128.298 184.702 128.22C184.576 128.141 184.469 128.036 184.386 127.913C184.304 127.789 184.249 127.649 184.226 127.502C184.202 127.355 184.211 127.205 184.25 127.062C184.29 126.919 184.359 126.785 184.455 126.671Z", "fill", "#11142D"], ["d", "M185.818 124.162C186.298 124.621 185.973 125.737 185.973 125.737C185.973 125.737 184.876 126.106 184.396 125.647C184.271 125.561 184.166 125.449 184.089 125.319C184.012 125.189 183.964 125.044 183.949 124.893C183.933 124.743 183.951 124.591 184 124.448C184.049 124.305 184.129 124.174 184.233 124.065C184.338 123.956 184.465 123.871 184.606 123.816C184.747 123.761 184.898 123.737 185.048 123.746C185.199 123.755 185.346 123.797 185.479 123.869C185.612 123.941 185.728 124.041 185.818 124.162Z", "fill", "#11142D"], ["d", "M187.738 125.354C187.108 125.153 186.281 125.968 186.281 125.968C186.281 125.968 186.478 127.109 187.108 127.315C187.243 127.383 187.39 127.421 187.541 127.427C187.691 127.432 187.841 127.405 187.98 127.347C188.118 127.288 188.243 127.201 188.345 127.09C188.447 126.979 188.523 126.847 188.569 126.704C188.615 126.56 188.63 126.409 188.612 126.259C188.594 126.11 188.543 125.966 188.464 125.837C188.385 125.709 188.28 125.6 188.154 125.516C188.029 125.433 187.887 125.378 187.738 125.354Z", "fill", "#11142D"], ["d", "M195.216 123.466C194.912 124.058 193.75 124.062 193.75 124.062C193.75 124.062 193.086 123.114 193.39 122.522C193.437 122.378 193.514 122.246 193.617 122.135C193.719 122.024 193.845 121.936 193.985 121.878C194.124 121.821 194.275 121.794 194.426 121.801C194.577 121.807 194.725 121.847 194.859 121.916C194.993 121.985 195.111 122.083 195.204 122.203C195.297 122.322 195.362 122.461 195.396 122.608C195.43 122.756 195.432 122.909 195.4 123.057C195.369 123.205 195.306 123.345 195.216 123.466Z", "fill", "#11142D"], ["d", "M194.055 126.075C193.541 125.646 193.777 124.517 193.777 124.517C193.777 124.517 194.844 124.063 195.354 124.483C195.489 124.555 195.607 124.657 195.699 124.78C195.791 124.903 195.855 125.045 195.885 125.195C195.916 125.346 195.913 125.502 195.877 125.651C195.84 125.8 195.771 125.94 195.675 126.059C195.578 126.179 195.456 126.276 195.318 126.343C195.18 126.409 195.029 126.445 194.875 126.446C194.722 126.448 194.57 126.415 194.43 126.351C194.29 126.287 194.167 126.193 194.068 126.075H194.055Z", "fill", "#11142D"], ["d", "M192.049 125.037C192.691 125.191 193.454 124.316 193.454 124.316C193.454 124.316 193.163 123.192 192.52 123.029C192.382 122.973 192.233 122.949 192.084 122.956C191.935 122.964 191.79 123.004 191.658 123.073C191.525 123.141 191.41 123.238 191.318 123.356C191.227 123.474 191.162 123.61 191.127 123.755C191.093 123.9 191.091 124.051 191.12 124.197C191.149 124.344 191.209 124.482 191.297 124.603C191.384 124.723 191.497 124.824 191.626 124.897C191.756 124.971 191.9 125.015 192.049 125.028V125.037Z", "fill", "#11142D"], ["d", "M203.697 129.117C203.178 129.546 202.12 129.066 202.12 129.066C202.12 129.066 201.897 127.929 202.416 127.512C202.517 127.405 202.641 127.32 202.778 127.264C202.916 127.208 203.063 127.182 203.211 127.188C203.359 127.194 203.504 127.232 203.637 127.299C203.769 127.366 203.885 127.46 203.978 127.576C204.071 127.692 204.138 127.826 204.174 127.97C204.211 128.114 204.216 128.264 204.19 128.41C204.164 128.556 204.106 128.694 204.022 128.816C203.938 128.938 203.828 129.041 203.701 129.117H203.697Z", "fill", "#11142D"], ["d", "M201.581 131.031C201.281 130.439 201.958 129.495 201.958 129.495C201.958 129.495 203.115 129.495 203.415 130.104C203.504 130.227 203.566 130.367 203.596 130.515C203.626 130.664 203.623 130.817 203.587 130.964C203.552 131.111 203.485 131.249 203.391 131.368C203.297 131.486 203.179 131.583 203.044 131.651C202.909 131.72 202.761 131.758 202.61 131.763C202.458 131.768 202.308 131.74 202.169 131.681C202.03 131.622 201.905 131.533 201.803 131.421C201.702 131.309 201.626 131.176 201.581 131.031Z", "fill", "#11142D"], ["d", "M200.165 129.268C200.693 129.667 201.743 129.178 201.743 129.178C201.743 129.178 201.935 128.032 201.408 127.629C201.304 127.519 201.178 127.433 201.037 127.377C200.897 127.322 200.746 127.297 200.596 127.305C200.445 127.314 200.298 127.355 200.164 127.426C200.031 127.496 199.915 127.596 199.823 127.716C199.732 127.836 199.668 127.975 199.636 128.123C199.603 128.271 199.603 128.423 199.636 128.571C199.668 128.719 199.733 128.857 199.824 128.978C199.916 129.098 200.032 129.197 200.165 129.268Z", "fill", "#11142D"], ["d", "M210.376 142.097C209.857 142.526 208.794 142.05 208.794 142.05C208.794 142.05 208.576 140.909 209.09 140.493C209.191 140.38 209.315 140.29 209.454 140.231C209.593 140.171 209.743 140.142 209.894 140.146C210.045 140.15 210.194 140.187 210.329 140.254C210.464 140.322 210.583 140.418 210.678 140.536C210.773 140.654 210.84 140.791 210.877 140.938C210.913 141.085 210.917 141.238 210.888 141.387C210.859 141.535 210.799 141.676 210.71 141.798C210.622 141.921 210.507 142.023 210.376 142.097Z", "fill", "#11142D"], ["d", "M208.259 144.011C207.959 143.419 208.631 142.475 208.631 142.475C208.631 142.475 209.793 142.475 210.089 143.084C210.175 143.206 210.235 143.345 210.263 143.492C210.291 143.639 210.287 143.79 210.251 143.935C210.215 144.08 210.148 144.216 210.055 144.333C209.962 144.45 209.845 144.545 209.712 144.613C209.579 144.68 209.432 144.718 209.283 144.724C209.134 144.73 208.985 144.703 208.847 144.646C208.709 144.589 208.585 144.502 208.484 144.393C208.382 144.283 208.305 144.153 208.259 144.011Z", "fill", "#11142D"], ["d", "M206.853 142.251C207.38 142.65 208.43 142.161 208.43 142.161C208.43 142.161 208.623 141.015 208.096 140.612C207.992 140.502 207.865 140.417 207.725 140.361C207.585 140.305 207.434 140.28 207.283 140.289C207.132 140.297 206.985 140.338 206.852 140.409C206.719 140.48 206.602 140.579 206.511 140.699C206.419 140.82 206.355 140.959 206.323 141.106C206.291 141.254 206.291 141.407 206.323 141.554C206.356 141.702 206.42 141.841 206.512 141.961C206.603 142.081 206.719 142.18 206.853 142.251Z", "fill", "#11142D"], ["d", "M194.016 132.224C194.444 131.713 195.576 131.958 195.576 131.958C195.576 131.958 196.004 133.031 195.576 133.541C195.499 133.672 195.395 133.785 195.271 133.871C195.147 133.958 195.005 134.016 194.856 134.043C194.707 134.069 194.554 134.062 194.408 134.023C194.261 133.984 194.125 133.913 194.009 133.816C193.893 133.719 193.799 133.598 193.734 133.461C193.67 133.324 193.636 133.174 193.635 133.023C193.634 132.871 193.666 132.721 193.729 132.583C193.791 132.445 193.884 132.323 193.998 132.224H194.016Z", "fill", "#11142D"], ["d", "M195.71 129.929C196.138 130.448 195.646 131.508 195.646 131.508C195.646 131.508 194.505 131.722 194.094 131.199C193.987 131.096 193.904 130.971 193.849 130.833C193.794 130.695 193.77 130.547 193.777 130.398C193.784 130.25 193.822 130.105 193.89 129.973C193.957 129.841 194.052 129.725 194.168 129.632C194.284 129.54 194.419 129.473 194.563 129.437C194.706 129.401 194.856 129.396 195.002 129.422C195.148 129.448 195.287 129.506 195.409 129.59C195.531 129.675 195.633 129.784 195.71 129.911V129.929Z", "fill", "#11142D"], ["d", "M197.45 131.375C196.85 131.087 195.92 131.778 195.92 131.778C195.92 131.778 195.958 132.941 196.554 133.228C196.678 133.315 196.819 133.373 196.967 133.4C197.115 133.426 197.268 133.42 197.413 133.382C197.559 133.344 197.695 133.275 197.811 133.179C197.928 133.083 198.022 132.963 198.088 132.827C198.153 132.691 198.189 132.543 198.191 132.392C198.194 132.241 198.164 132.092 198.103 131.954C198.043 131.816 197.953 131.692 197.84 131.592C197.727 131.492 197.594 131.418 197.45 131.375Z", "fill", "#11142D"], ["d", "M205.467 152C205.895 151.49 207.027 151.738 207.027 151.738C207.027 151.738 207.455 152.807 207.027 153.317C206.95 153.448 206.847 153.561 206.722 153.648C206.598 153.734 206.456 153.793 206.307 153.819C206.158 153.845 206.005 153.838 205.859 153.799C205.712 153.76 205.576 153.69 205.46 153.592C205.344 153.495 205.25 153.374 205.186 153.237C205.121 153.1 205.087 152.95 205.086 152.799C205.085 152.647 205.117 152.497 205.18 152.359C205.243 152.221 205.335 152.099 205.45 152H205.467Z", "fill", "#11142D"], ["d", "M207.164 149.704C207.593 150.228 207.1 151.287 207.1 151.287C207.1 151.287 205.96 151.498 205.553 150.978C205.444 150.876 205.359 150.752 205.302 150.613C205.246 150.475 205.219 150.326 205.225 150.176C205.231 150.027 205.269 149.881 205.337 149.747C205.404 149.614 205.5 149.497 205.616 149.403C205.733 149.31 205.869 149.243 206.013 149.207C206.158 149.171 206.309 149.166 206.456 149.193C206.603 149.221 206.742 149.279 206.864 149.365C206.987 149.451 207.089 149.562 207.164 149.691V149.704Z", "fill", "#11142D"], ["d", "M208.901 151.155C208.305 150.863 207.371 151.558 207.371 151.558C207.371 151.558 207.41 152.716 208.005 153.004C208.129 153.087 208.268 153.143 208.415 153.168C208.562 153.193 208.712 153.186 208.856 153.147C208.999 153.109 209.133 153.039 209.248 152.945C209.362 152.85 209.455 152.731 209.52 152.597C209.585 152.463 209.621 152.317 209.624 152.168C209.627 152.019 209.599 151.871 209.54 151.734C209.481 151.597 209.394 151.475 209.284 151.375C209.173 151.275 209.043 151.2 208.901 151.155Z", "fill", "#11142D"], ["d", "M199.588 138.39C200.235 138.24 200.985 139.124 200.985 139.124C200.985 139.124 200.694 140.244 200.047 140.411C199.907 140.469 199.756 140.496 199.604 140.49C199.453 140.484 199.305 140.445 199.17 140.375C199.035 140.306 198.917 140.208 198.824 140.088C198.731 139.968 198.666 139.829 198.632 139.681C198.598 139.533 198.597 139.38 198.628 139.231C198.66 139.083 198.723 138.943 198.814 138.822C198.905 138.701 199.022 138.601 199.156 138.529C199.289 138.458 199.437 138.416 199.588 138.407V138.39Z", "fill", "#11142D"], ["d", "M202.327 137.587C202.327 138.252 201.32 138.81 201.32 138.81C201.32 138.81 200.283 138.286 200.27 137.625C200.244 137.477 200.25 137.325 200.288 137.179C200.326 137.034 200.396 136.898 200.491 136.781C200.587 136.665 200.706 136.571 200.842 136.505C200.977 136.44 201.125 136.404 201.276 136.402C201.426 136.399 201.576 136.429 201.713 136.489C201.851 136.55 201.974 136.639 202.074 136.752C202.174 136.864 202.248 136.997 202.292 137.142C202.336 137.286 202.348 137.438 202.327 137.587Z", "fill", "#11142D"], ["d", "M202.833 139.793C202.529 139.2 201.371 139.188 201.371 139.188C201.371 139.188 200.699 140.136 201.003 140.728C201.049 140.872 201.125 141.005 201.227 141.116C201.329 141.228 201.454 141.316 201.594 141.374C201.734 141.433 201.884 141.46 202.035 141.454C202.186 141.448 202.334 141.41 202.469 141.341C202.604 141.272 202.722 141.175 202.815 141.056C202.908 140.937 202.975 140.798 203.009 140.651C203.044 140.504 203.046 140.351 203.016 140.202C202.985 140.054 202.923 139.914 202.833 139.793Z", "fill", "#11142D"], ["d", "M229.211 152.549C228.594 152.798 227.711 152.047 227.711 152.047C227.711 152.047 227.827 150.893 228.44 150.644C228.568 150.564 228.713 150.514 228.864 150.496C229.014 150.478 229.167 150.493 229.311 150.54C229.455 150.587 229.587 150.665 229.698 150.769C229.809 150.872 229.896 150.999 229.952 151.139C230.009 151.28 230.035 151.431 230.027 151.583C230.02 151.734 229.979 151.882 229.909 152.017C229.838 152.151 229.739 152.268 229.619 152.36C229.498 152.452 229.359 152.517 229.211 152.549Z", "fill", "#11142D"], ["d", "M226.636 153.755C226.516 153.103 227.433 152.391 227.433 152.391C227.433 152.391 228.539 152.742 228.655 153.395C228.703 153.536 228.72 153.687 228.704 153.836C228.689 153.984 228.642 154.128 228.566 154.257C228.49 154.386 228.387 154.497 228.264 154.582C228.142 154.668 228.002 154.725 227.855 154.752C227.708 154.778 227.557 154.772 227.412 154.735C227.267 154.697 227.132 154.628 227.017 154.534C226.901 154.439 226.807 154.321 226.741 154.186C226.675 154.052 226.64 153.905 226.636 153.755Z", "fill", "#11142D"], ["d", "M225.787 151.657C226.177 152.193 227.321 152.026 227.321 152.026C227.321 152.026 227.836 150.983 227.446 150.447C227.376 150.315 227.279 150.2 227.162 150.108C227.044 150.017 226.908 149.952 226.763 149.919C226.617 149.885 226.467 149.883 226.321 149.912C226.175 149.942 226.037 150.003 225.917 150.091C225.796 150.179 225.696 150.291 225.623 150.421C225.55 150.551 225.506 150.696 225.494 150.844C225.481 150.993 225.501 151.142 225.552 151.283C225.602 151.423 225.683 151.551 225.787 151.657Z", "fill", "#11142D"], ["d", "M223.481 160.11C222.842 159.93 222.598 158.797 222.598 158.797C222.598 158.797 223.391 157.939 224.033 158.128C224.183 158.144 224.328 158.194 224.457 158.272C224.586 158.35 224.697 158.455 224.781 158.581C224.866 158.706 224.922 158.848 224.946 158.997C224.97 159.146 224.962 159.299 224.921 159.444C224.881 159.59 224.809 159.725 224.711 159.84C224.613 159.955 224.492 160.047 224.355 160.111C224.218 160.174 224.068 160.207 223.917 160.207C223.767 160.207 223.617 160.174 223.481 160.11Z", "fill", "#11142D"], ["d", "M220.695 159.505C220.999 158.917 222.156 158.913 222.156 158.913C222.156 158.913 222.821 159.866 222.516 160.453C222.467 160.594 222.389 160.722 222.286 160.83C222.183 160.937 222.058 161.021 221.92 161.076C221.781 161.131 221.633 161.156 221.484 161.148C221.336 161.141 221.191 161.101 221.059 161.032C220.927 160.964 220.811 160.867 220.72 160.75C220.628 160.633 220.563 160.497 220.528 160.352C220.494 160.207 220.491 160.057 220.52 159.91C220.548 159.764 220.608 159.626 220.695 159.505Z", "fill", "#11142D"], ["d", "M221.299 157.325C221.299 157.99 222.294 158.552 222.294 158.552C222.294 158.552 223.335 158.041 223.352 157.38C223.382 157.232 223.378 157.078 223.342 156.931C223.306 156.784 223.239 156.646 223.144 156.527C223.049 156.409 222.93 156.313 222.795 156.245C222.659 156.177 222.51 156.14 222.359 156.136C222.207 156.132 222.057 156.161 221.918 156.221C221.779 156.281 221.654 156.371 221.553 156.484C221.453 156.597 221.378 156.731 221.334 156.876C221.29 157.021 221.278 157.174 221.299 157.325Z", "fill", "#11142D"], ["d", "M218.951 152.759C218.908 153.425 217.854 153.901 217.854 153.901C217.854 153.901 216.859 153.3 216.898 152.639C216.883 152.489 216.9 152.337 216.949 152.195C216.998 152.052 217.078 151.922 217.182 151.813C217.286 151.704 217.413 151.619 217.553 151.563C217.694 151.508 217.844 151.484 217.995 151.493C218.145 151.502 218.292 151.543 218.425 151.614C218.558 151.686 218.674 151.785 218.765 151.905C218.856 152.026 218.919 152.164 218.952 152.312C218.984 152.459 218.983 152.612 218.951 152.759Z", "fill", "#11142D"], ["d", "M218.946 155.617C218.307 155.441 218.059 154.33 218.059 154.33C218.059 154.33 218.847 153.471 219.49 153.656C219.641 153.671 219.787 153.719 219.917 153.796C220.047 153.874 220.159 153.978 220.245 154.103C220.331 154.229 220.388 154.371 220.413 154.521C220.438 154.67 220.43 154.823 220.39 154.97C220.35 155.116 220.279 155.252 220.181 155.367C220.083 155.483 219.961 155.576 219.823 155.64C219.686 155.703 219.536 155.736 219.384 155.736C219.233 155.736 219.083 155.702 218.946 155.638V155.617Z", "fill", "#11142D"], ["d", "M216.71 155.484C217.361 155.359 217.7 154.252 217.7 154.252C217.7 154.252 216.98 153.338 216.328 153.463C216.177 153.466 216.028 153.502 215.892 153.569C215.756 153.635 215.637 153.731 215.541 153.848C215.446 153.966 215.377 154.103 215.34 154.25C215.303 154.397 215.299 154.55 215.327 154.699C215.355 154.848 215.415 154.989 215.503 155.112C215.591 155.235 215.705 155.338 215.836 155.412C215.968 155.487 216.114 155.532 216.265 155.544C216.416 155.557 216.568 155.536 216.71 155.484Z", "fill", "#11142D"], ["d", "M191.115 209.363H224.518C224.633 209.363 224.747 209.389 224.851 209.439C224.955 209.489 225.046 209.561 225.119 209.65C225.192 209.74 225.244 209.845 225.271 209.957C225.298 210.069 225.3 210.186 225.276 210.299L224.848 212.375C224.81 212.548 224.715 212.703 224.578 212.813C224.441 212.924 224.27 212.985 224.093 212.985H191.92C191.763 212.985 191.61 212.938 191.481 212.849C191.351 212.76 191.252 212.634 191.196 212.487L190.412 210.41C190.369 210.295 190.354 210.171 190.369 210.048C190.383 209.926 190.426 209.809 190.495 209.706C190.564 209.604 190.656 209.52 190.764 209.46C190.871 209.4 190.992 209.367 191.115 209.363Z", "fill", "white", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M193.764 216.258C194.137 216.258 222.29 212.984 222.29 212.984H193.426L193.764 216.258Z", "fill", "#11142D"], ["id", "clip0_6685_108179"], [1, "margin-bottom40"], ["xmlns", "http://www.w3.org/2000/svg", "width", "254", "height", "243", "viewBox", "0 0 254 243", "fill", "none", 1, "margin-bottom60"], ["d", "M71.9297 242.823C72.1474 221.816 80.6353 201.743 95.5498 186.965C110.464 172.187 130.6 163.897 151.584 163.897C172.568 163.897 192.704 172.187 207.618 186.965C222.533 201.743 231.021 221.816 231.238 242.823H71.9297Z", "fill", "#00DAB3"], ["d", "M0.357422 242H253.643", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M172.218 241.685V37.144C172.217 27.8834 168.542 19.0024 162.001 12.4542C155.461 5.906 146.59 2.22672 137.341 2.22559H99.3906", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M64.6133 10.4416H144.435L117.143 2.03167C108.072 -0.76528 98.3577 -0.672271 89.3418 2.29775L64.6133 10.4416Z", "fill", "#9196A4"], ["d", "M232.173 241.474H193.91", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M191.57 212.979H220.43L217.559 241.456H193.782L191.57 212.979Z", "fill", "#FAFAFC", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M173.072 242.134C173.659 242.134 193.699 235.269 193.699 235.269L194.128 241.276L173.072 242.134Z", "fill", "#9196A4"], ["d", "M193.203 177.91L205.306 188.152C205.306 188.152 205.117 208.014 205.139 209.349", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M202.25 185.573L205.494 163.896L223.871 153.023", "stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-linecap", "round"], ["d", "M213.059 159.421L197.797 130.227L182.129 121.649", "stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-linecap", "round"], ["d", "M199.173 178.073C198.744 178.593 197.621 178.378 197.621 178.378C197.621 178.378 197.15 177.318 197.561 176.795C197.637 176.666 197.739 176.555 197.861 176.469C197.983 176.383 198.123 176.324 198.269 176.297C198.416 176.27 198.567 176.274 198.712 176.31C198.857 176.347 198.992 176.414 199.109 176.507C199.226 176.6 199.321 176.717 199.389 176.851C199.456 176.984 199.494 177.131 199.5 177.28C199.506 177.429 199.48 177.578 199.424 177.717C199.367 177.855 199.281 177.98 199.173 178.082V178.073Z", "fill", "#9196A4"], ["d", "M197.534 180.429C197.106 179.918 197.534 178.846 197.534 178.846C197.534 178.846 198.67 178.601 199.094 179.112C199.207 179.211 199.298 179.334 199.359 179.471C199.42 179.609 199.451 179.759 199.449 179.909C199.447 180.06 199.413 180.208 199.348 180.344C199.283 180.481 199.19 180.601 199.074 180.697C198.958 180.794 198.823 180.864 198.677 180.903C198.532 180.942 198.38 180.949 198.231 180.923C198.083 180.898 197.942 180.84 197.818 180.755C197.694 180.67 197.59 180.558 197.513 180.429H197.534Z", "fill", "#9196A4"], ["d", "M195.765 179.008C196.369 179.283 197.282 178.579 197.282 178.579C197.282 178.579 197.213 177.421 196.609 177.146C196.483 177.064 196.342 177.01 196.194 176.988C196.045 176.966 195.894 176.976 195.75 177.018C195.606 177.059 195.473 177.132 195.359 177.23C195.246 177.328 195.155 177.449 195.092 177.585C195.03 177.722 194.998 177.87 194.998 178.02C194.998 178.17 195.031 178.318 195.093 178.455C195.156 178.591 195.247 178.712 195.361 178.81C195.474 178.908 195.608 178.98 195.752 179.021L195.765 179.008Z", "fill", "#9196A4"], ["d", "M191.308 174.619C191.805 175.048 191.527 176.185 191.527 176.185C191.527 176.185 190.442 176.614 189.945 176.155C189.821 176.073 189.715 175.965 189.636 175.839C189.556 175.713 189.505 175.571 189.486 175.423C189.466 175.275 189.478 175.125 189.522 174.982C189.566 174.84 189.639 174.708 189.738 174.597C189.837 174.485 189.959 174.396 190.095 174.336C190.232 174.276 190.379 174.246 190.528 174.248C190.677 174.25 190.824 174.284 190.959 174.348C191.093 174.412 191.212 174.505 191.308 174.619Z", "fill", "#9196A4"], ["d", "M193.55 176.386C193.019 176.781 191.973 176.275 191.973 176.275C191.973 176.275 191.797 175.129 192.329 174.734C192.434 174.63 192.561 174.549 192.701 174.497C192.841 174.446 192.99 174.425 193.138 174.437C193.286 174.448 193.43 174.491 193.561 174.563C193.691 174.635 193.804 174.734 193.893 174.854C193.981 174.974 194.043 175.111 194.074 175.257C194.104 175.403 194.104 175.553 194.071 175.699C194.039 175.844 193.975 175.981 193.885 176.099C193.796 176.218 193.681 176.316 193.55 176.386Z", "fill", "#9196A4"], ["d", "M192.05 178.078C192.358 177.49 191.694 176.537 191.694 176.537C191.694 176.537 190.537 176.537 190.228 177.129C190.141 177.25 190.081 177.388 190.053 177.534C190.024 177.681 190.027 177.831 190.062 177.976C190.096 178.121 190.161 178.257 190.253 178.374C190.344 178.491 190.46 178.588 190.592 178.656C190.724 178.725 190.869 178.765 191.018 178.772C191.166 178.78 191.315 178.755 191.453 178.7C191.591 178.645 191.716 178.561 191.819 178.454C191.922 178.346 192 178.218 192.05 178.078Z", "fill", "#9196A4"], ["d", "M195.495 185.097C195.876 184.552 197.025 184.703 197.025 184.703C197.025 184.703 197.556 185.732 197.175 186.277C197.108 186.411 197.013 186.528 196.897 186.621C196.781 186.714 196.646 186.782 196.501 186.818C196.357 186.854 196.206 186.859 196.06 186.832C195.913 186.805 195.774 186.747 195.652 186.661C195.53 186.575 195.428 186.465 195.353 186.336C195.278 186.207 195.231 186.064 195.216 185.915C195.201 185.767 195.218 185.617 195.266 185.476C195.314 185.335 195.392 185.206 195.495 185.097Z", "fill", "#9196A4"], ["d", "M196.99 182.665C197.445 183.149 197.059 184.244 197.059 184.244C197.059 184.244 195.945 184.552 195.49 184.068C195.374 183.974 195.279 183.857 195.212 183.724C195.146 183.591 195.108 183.445 195.102 183.297C195.097 183.148 195.123 182.999 195.18 182.862C195.236 182.724 195.322 182.6 195.431 182.498C195.539 182.397 195.669 182.32 195.81 182.272C195.951 182.225 196.1 182.209 196.248 182.225C196.396 182.24 196.539 182.288 196.667 182.364C196.795 182.44 196.905 182.542 196.99 182.665Z", "fill", "#9196A4"], ["d", "M198.843 183.96C198.225 183.724 197.355 184.492 197.355 184.492C197.355 184.492 197.488 185.642 198.11 185.882C198.24 185.959 198.386 186.005 198.536 186.02C198.687 186.034 198.838 186.015 198.981 185.965C199.123 185.915 199.253 185.834 199.361 185.728C199.47 185.623 199.554 185.495 199.607 185.354C199.661 185.212 199.684 185.061 199.673 184.91C199.663 184.759 199.62 184.612 199.547 184.48C199.474 184.347 199.374 184.232 199.252 184.142C199.13 184.052 198.991 183.99 198.843 183.96Z", "fill", "#9196A4"], ["d", "M208.095 180.077C207.435 180 207.02 178.914 207.02 178.914C207.02 178.914 207.675 177.957 208.331 178.035C208.482 178.027 208.633 178.052 208.774 178.108C208.915 178.165 209.041 178.251 209.145 178.362C209.249 178.472 209.327 178.604 209.375 178.748C209.422 178.892 209.438 179.045 209.421 179.196C209.403 179.346 209.353 179.491 209.274 179.621C209.195 179.75 209.089 179.86 208.962 179.944C208.836 180.028 208.693 180.084 208.543 180.107C208.394 180.13 208.241 180.119 208.095 180.077Z", "fill", "#9196A4"], ["d", "M205.249 179.914C205.459 179.283 206.604 179.099 206.604 179.099C206.604 179.099 207.405 179.957 207.195 180.566C207.169 180.713 207.112 180.853 207.027 180.975C206.942 181.098 206.832 181.201 206.703 181.277C206.575 181.353 206.432 181.401 206.284 181.417C206.136 181.433 205.986 181.416 205.845 181.369C205.703 181.322 205.574 181.244 205.465 181.142C205.356 181.04 205.271 180.916 205.214 180.778C205.158 180.64 205.132 180.491 205.138 180.342C205.144 180.193 205.182 180.047 205.249 179.914Z", "fill", "#9196A4"], ["d", "M205.506 177.665C205.591 178.326 206.68 178.725 206.68 178.725C206.68 178.725 207.627 178.056 207.537 177.399C207.539 177.25 207.509 177.103 207.449 176.966C207.389 176.83 207.301 176.708 207.19 176.609C207.078 176.51 206.947 176.437 206.805 176.393C206.663 176.349 206.513 176.336 206.366 176.355C206.218 176.375 206.077 176.425 205.951 176.504C205.824 176.583 205.717 176.688 205.635 176.813C205.553 176.937 205.498 177.077 205.475 177.224C205.452 177.372 205.461 177.522 205.501 177.665H205.506Z", "fill", "#9196A4"], ["d", "M209.017 168.229C208.361 168.152 207.945 167.067 207.945 167.067C207.945 167.067 208.597 166.11 209.257 166.187C209.408 166.18 209.559 166.205 209.699 166.262C209.84 166.319 209.966 166.406 210.069 166.517C210.172 166.627 210.25 166.759 210.298 166.903C210.345 167.047 210.36 167.2 210.342 167.35C210.325 167.501 210.275 167.646 210.195 167.775C210.116 167.904 210.009 168.014 209.883 168.098C209.757 168.181 209.614 168.237 209.465 168.259C209.315 168.282 209.162 168.272 209.017 168.229Z", "fill", "#9196A4"], ["d", "M206.171 168.067C206.381 167.436 207.525 167.252 207.525 167.252C207.525 167.252 208.327 168.11 208.117 168.719C208.091 168.866 208.033 169.006 207.949 169.129C207.864 169.251 207.754 169.354 207.625 169.43C207.497 169.507 207.354 169.554 207.206 169.57C207.058 169.586 206.908 169.57 206.767 169.522C206.625 169.475 206.496 169.398 206.387 169.296C206.278 169.194 206.193 169.069 206.136 168.931C206.08 168.793 206.053 168.644 206.059 168.495C206.066 168.346 206.104 168.2 206.171 168.067Z", "fill", "#9196A4"], ["d", "M206.428 165.84C206.513 166.501 207.602 166.9 207.602 166.9C207.602 166.9 208.549 166.235 208.459 165.574C208.461 165.425 208.431 165.278 208.371 165.141C208.311 165.005 208.223 164.883 208.112 164.784C208 164.685 207.869 164.611 207.727 164.567C207.585 164.524 207.435 164.511 207.288 164.53C207.14 164.549 206.999 164.6 206.872 164.679C206.746 164.758 206.639 164.863 206.557 164.987C206.475 165.112 206.42 165.252 206.397 165.399C206.374 165.546 206.383 165.697 206.423 165.84H206.428Z", "fill", "#9196A4"], ["d", "M209.652 188.795C209.035 189.04 208.16 188.281 208.16 188.281C208.16 188.281 208.28 187.126 208.897 186.882C209.027 186.804 209.172 186.755 209.322 186.739C209.473 186.723 209.625 186.74 209.768 186.789C209.911 186.838 210.042 186.917 210.151 187.021C210.261 187.126 210.346 187.253 210.401 187.393C210.457 187.534 210.481 187.685 210.472 187.836C210.464 187.987 210.422 188.135 210.351 188.268C210.279 188.402 210.18 188.518 210.059 188.609C209.938 188.7 209.799 188.764 209.652 188.795Z", "fill", "#9196A4"], ["d", "M207.066 189.997C206.955 189.34 207.876 188.637 207.876 188.637C207.876 188.637 208.977 188.997 209.089 189.654C209.135 189.796 209.15 189.946 209.133 190.094C209.116 190.242 209.068 190.385 208.99 190.513C208.913 190.641 208.81 190.75 208.686 190.834C208.563 190.918 208.423 190.975 208.276 191C208.129 191.025 207.979 191.018 207.835 190.979C207.69 190.94 207.556 190.871 207.442 190.776C207.327 190.681 207.234 190.562 207.169 190.427C207.104 190.293 207.069 190.146 207.066 189.997Z", "fill", "#9196A4"], ["d", "M206.235 187.89C206.62 188.431 207.769 188.272 207.769 188.272C207.769 188.272 208.292 187.234 207.902 186.697C207.835 186.563 207.739 186.445 207.622 186.351C207.505 186.258 207.369 186.191 207.224 186.154C207.079 186.118 206.927 186.114 206.78 186.142C206.633 186.171 206.494 186.23 206.372 186.318C206.25 186.405 206.148 186.517 206.074 186.648C206 186.778 205.954 186.923 205.941 187.072C205.928 187.222 205.948 187.372 205.999 187.513C206.049 187.654 206.13 187.783 206.235 187.89Z", "fill", "#9196A4"], ["d", "M201.46 197.987C202.116 198.09 202.493 199.184 202.493 199.184C202.493 199.184 201.807 200.119 201.152 200.021C201 200.023 200.851 199.992 200.712 199.93C200.574 199.869 200.451 199.777 200.352 199.663C200.253 199.549 200.179 199.415 200.137 199.269C200.095 199.124 200.085 198.971 200.107 198.822C200.13 198.672 200.185 198.529 200.269 198.403C200.352 198.277 200.462 198.17 200.591 198.091C200.719 198.011 200.864 197.961 201.014 197.943C201.164 197.925 201.316 197.94 201.46 197.987Z", "fill", "#9196A4"], ["d", "M204.302 198.253C204.066 198.875 202.917 199.016 202.917 199.016C202.917 199.016 202.146 198.158 202.377 197.527C202.407 197.379 202.469 197.24 202.558 197.118C202.647 196.996 202.762 196.895 202.894 196.822C203.026 196.749 203.172 196.705 203.322 196.694C203.473 196.683 203.624 196.705 203.765 196.758C203.906 196.811 204.034 196.895 204.14 197.002C204.246 197.11 204.327 197.239 204.378 197.381C204.429 197.523 204.449 197.675 204.435 197.825C204.422 197.976 204.377 198.122 204.302 198.253Z", "fill", "#9196A4"], ["d", "M203.959 200.488C203.899 199.827 202.828 199.39 202.828 199.39C202.828 199.39 201.855 200.02 201.915 200.677C201.904 200.828 201.926 200.98 201.979 201.122C202.032 201.264 202.116 201.393 202.224 201.499C202.333 201.605 202.463 201.686 202.605 201.737C202.748 201.788 202.9 201.807 203.051 201.792C203.202 201.778 203.348 201.731 203.479 201.655C203.61 201.578 203.722 201.474 203.809 201.349C203.895 201.225 203.954 201.083 203.98 200.933C204.005 200.784 203.999 200.63 203.959 200.484V200.488Z", "fill", "#9196A4"], ["d", "M201.139 167.672C201.645 168.101 201.397 169.234 201.397 169.234C201.397 169.234 200.325 169.663 199.815 169.234C199.686 169.157 199.575 169.052 199.49 168.927C199.405 168.802 199.348 168.661 199.323 168.512C199.298 168.363 199.306 168.21 199.345 168.064C199.385 167.919 199.456 167.784 199.553 167.668C199.651 167.552 199.772 167.459 199.908 167.395C200.045 167.331 200.194 167.298 200.344 167.297C200.495 167.296 200.644 167.328 200.782 167.391C200.919 167.453 201.041 167.545 201.139 167.659V167.672Z", "fill", "#9196A4"], ["d", "M203.427 169.38C202.905 169.809 201.85 169.311 201.85 169.311C201.85 169.311 201.64 168.17 202.163 167.758C202.267 167.653 202.391 167.572 202.529 167.519C202.666 167.466 202.813 167.443 202.96 167.451C203.107 167.459 203.251 167.498 203.381 167.566C203.512 167.634 203.627 167.728 203.718 167.844C203.81 167.959 203.876 168.093 203.912 168.235C203.948 168.378 203.954 168.527 203.928 168.672C203.903 168.817 203.847 168.955 203.764 169.077C203.682 169.199 203.574 169.302 203.449 169.38H203.427Z", "fill", "#9196A4"], ["d", "M201.996 171.113C202.288 170.512 201.602 169.581 201.602 169.581C201.602 169.581 200.441 169.611 200.149 170.208C200.062 170.331 200.003 170.472 199.976 170.62C199.949 170.768 199.954 170.921 199.992 171.067C200.029 171.213 200.098 171.35 200.193 171.467C200.288 171.584 200.407 171.678 200.543 171.745C200.678 171.811 200.826 171.847 200.977 171.851C201.127 171.854 201.277 171.825 201.415 171.765C201.553 171.705 201.677 171.615 201.777 171.503C201.878 171.39 201.952 171.257 201.996 171.113Z", "fill", "#9196A4"], ["d", "M179.338 117.492C179.848 117.921 179.595 119.053 179.595 119.053C179.595 119.053 178.523 119.482 178.018 119.053C177.89 118.976 177.78 118.871 177.697 118.747C177.613 118.623 177.557 118.482 177.533 118.334C177.509 118.186 177.517 118.035 177.557 117.891C177.596 117.746 177.667 117.612 177.763 117.498C177.859 117.383 177.979 117.291 178.115 117.227C178.25 117.163 178.397 117.129 178.547 117.128C178.697 117.127 178.845 117.158 178.981 117.219C179.118 117.28 179.239 117.37 179.338 117.483V117.492Z", "fill", "#9196A4"], ["d", "M181.627 119.199C181.104 119.629 180.046 119.127 180.046 119.127C180.046 119.127 179.84 117.985 180.363 117.578C180.465 117.466 180.591 117.379 180.73 117.321C180.87 117.263 181.02 117.236 181.171 117.242C181.322 117.248 181.47 117.287 181.605 117.356C181.739 117.425 181.857 117.523 181.95 117.642C182.043 117.762 182.109 117.9 182.143 118.047C182.178 118.195 182.179 118.348 182.149 118.496C182.118 118.644 182.055 118.784 181.965 118.905C181.875 119.027 181.76 119.127 181.627 119.199Z", "fill", "#9196A4"], ["d", "M180.169 120.928C180.461 120.332 179.775 119.396 179.775 119.396C179.775 119.396 178.618 119.431 178.326 120.027C178.242 120.15 178.184 120.29 178.158 120.437C178.132 120.585 178.139 120.736 178.176 120.88C178.214 121.025 178.283 121.16 178.377 121.275C178.472 121.391 178.59 121.485 178.725 121.551C178.859 121.616 179.006 121.652 179.155 121.656C179.304 121.659 179.452 121.63 179.59 121.571C179.727 121.512 179.85 121.424 179.95 121.313C180.05 121.202 180.125 121.071 180.169 120.928Z", "fill", "#9196A4"], ["d", "M182.599 126.661C182.951 126.099 184.108 126.184 184.108 126.184C184.108 126.184 184.695 127.184 184.343 127.746C184.284 127.882 184.195 128.004 184.084 128.103C183.973 128.201 183.842 128.275 183.701 128.319C183.559 128.363 183.409 128.376 183.262 128.357C183.115 128.338 182.973 128.287 182.847 128.209C182.721 128.13 182.613 128.026 182.531 127.902C182.449 127.778 182.394 127.638 182.371 127.491C182.347 127.345 182.355 127.194 182.395 127.051C182.434 126.908 182.504 126.775 182.599 126.661Z", "fill", "#9196A4"], ["d", "M183.963 124.151C184.443 124.61 184.117 125.726 184.117 125.726C184.117 125.726 183.02 126.095 182.54 125.636C182.416 125.55 182.311 125.439 182.234 125.309C182.157 125.178 182.109 125.033 182.093 124.883C182.078 124.732 182.095 124.58 182.145 124.437C182.194 124.294 182.273 124.163 182.378 124.054C182.482 123.945 182.61 123.86 182.75 123.805C182.891 123.75 183.042 123.726 183.193 123.735C183.344 123.745 183.491 123.787 183.624 123.858C183.757 123.93 183.872 124.03 183.963 124.151Z", "fill", "#9196A4"], ["d", "M185.883 125.344C185.253 125.142 184.426 125.957 184.426 125.957C184.426 125.957 184.623 127.099 185.253 127.304C185.387 127.372 185.535 127.41 185.685 127.416C185.836 127.421 185.985 127.394 186.124 127.336C186.263 127.278 186.387 127.19 186.489 127.079C186.591 126.968 186.668 126.837 186.714 126.693C186.76 126.55 186.774 126.398 186.756 126.248C186.738 126.099 186.688 125.955 186.609 125.827C186.53 125.698 186.424 125.589 186.299 125.505C186.174 125.422 186.032 125.367 185.883 125.344Z", "fill", "#9196A4"], ["d", "M193.361 123.455C193.056 124.047 191.895 124.052 191.895 124.052C191.895 124.052 191.231 123.103 191.535 122.511C191.581 122.367 191.659 122.235 191.761 122.124C191.864 122.013 191.989 121.925 192.129 121.868C192.269 121.81 192.419 121.784 192.571 121.79C192.722 121.797 192.869 121.836 193.004 121.905C193.138 121.975 193.256 122.073 193.348 122.192C193.441 122.312 193.507 122.45 193.541 122.598C193.575 122.745 193.576 122.898 193.545 123.046C193.514 123.194 193.451 123.334 193.361 123.455Z", "fill", "#9196A4"], ["d", "M192.2 126.064C191.685 125.635 191.921 124.507 191.921 124.507C191.921 124.507 192.988 124.052 193.498 124.472C193.634 124.544 193.752 124.646 193.844 124.769C193.936 124.892 193.999 125.034 194.03 125.185C194.061 125.335 194.058 125.491 194.021 125.64C193.985 125.79 193.916 125.929 193.819 126.049C193.723 126.168 193.601 126.265 193.463 126.332C193.324 126.399 193.173 126.434 193.02 126.436C192.866 126.437 192.714 126.405 192.575 126.34C192.435 126.276 192.311 126.182 192.213 126.064H192.2Z", "fill", "#9196A4"], ["d", "M190.193 125.026C190.836 125.18 191.599 124.305 191.599 124.305C191.599 124.305 191.307 123.181 190.665 123.018C190.526 122.963 190.377 122.938 190.229 122.946C190.08 122.953 189.934 122.993 189.802 123.062C189.67 123.131 189.554 123.227 189.463 123.345C189.371 123.463 189.306 123.599 189.272 123.744C189.238 123.889 189.235 124.04 189.264 124.186C189.294 124.333 189.354 124.471 189.441 124.592C189.529 124.713 189.641 124.813 189.771 124.887C189.901 124.96 190.045 125.005 190.193 125.017V125.026Z", "fill", "#9196A4"], ["d", "M201.842 129.106C201.323 129.535 200.264 129.055 200.264 129.055C200.264 129.055 200.042 127.918 200.56 127.502C200.662 127.394 200.786 127.309 200.923 127.253C201.06 127.197 201.208 127.172 201.356 127.178C201.504 127.184 201.649 127.221 201.781 127.288C201.914 127.355 202.03 127.45 202.123 127.565C202.215 127.681 202.282 127.815 202.319 127.959C202.355 128.103 202.361 128.253 202.334 128.399C202.308 128.545 202.251 128.684 202.167 128.806C202.082 128.928 201.973 129.03 201.846 129.106H201.842Z", "fill", "#9196A4"], ["d", "M199.725 131.02C199.425 130.428 200.102 129.484 200.102 129.484C200.102 129.484 201.259 129.484 201.559 130.094C201.649 130.216 201.711 130.356 201.74 130.504C201.77 130.653 201.767 130.806 201.732 130.953C201.697 131.1 201.63 131.238 201.536 131.357C201.442 131.476 201.323 131.572 201.188 131.641C201.053 131.709 200.905 131.747 200.754 131.752C200.603 131.757 200.453 131.729 200.313 131.67C200.174 131.611 200.049 131.522 199.948 131.41C199.846 131.298 199.77 131.165 199.725 131.02Z", "fill", "#9196A4"], ["d", "M198.31 129.257C198.837 129.656 199.887 129.167 199.887 129.167C199.887 129.167 200.08 128.021 199.553 127.618C199.449 127.508 199.322 127.423 199.182 127.367C199.042 127.311 198.891 127.286 198.74 127.295C198.589 127.303 198.442 127.344 198.309 127.415C198.175 127.486 198.059 127.585 197.968 127.705C197.876 127.826 197.812 127.964 197.78 128.112C197.748 128.26 197.748 128.413 197.78 128.56C197.813 128.708 197.877 128.847 197.969 128.967C198.06 129.087 198.176 129.186 198.31 129.257Z", "fill", "#9196A4"], ["d", "M208.52 142.087C208.002 142.516 206.939 142.039 206.939 142.039C206.939 142.039 206.72 140.898 207.234 140.482C207.335 140.369 207.459 140.28 207.598 140.22C207.737 140.16 207.887 140.131 208.039 140.135C208.19 140.139 208.338 140.176 208.473 140.244C208.609 140.311 208.728 140.407 208.823 140.525C208.917 140.643 208.985 140.78 209.021 140.927C209.058 141.074 209.061 141.227 209.033 141.376C209.004 141.524 208.943 141.665 208.855 141.788C208.766 141.91 208.652 142.012 208.52 142.087Z", "fill", "#9196A4"], ["d", "M206.403 144C206.103 143.408 206.776 142.464 206.776 142.464C206.776 142.464 207.938 142.464 208.233 143.073C208.32 143.195 208.379 143.334 208.407 143.481C208.435 143.628 208.431 143.779 208.395 143.924C208.36 144.069 208.293 144.205 208.2 144.322C208.107 144.439 207.99 144.535 207.857 144.602C207.723 144.67 207.577 144.707 207.428 144.713C207.279 144.719 207.13 144.692 206.992 144.635C206.854 144.578 206.73 144.491 206.628 144.382C206.527 144.272 206.45 144.142 206.403 144Z", "fill", "#9196A4"], ["d", "M204.997 142.24C205.525 142.639 206.575 142.15 206.575 142.15C206.575 142.15 206.767 141.005 206.24 140.601C206.136 140.492 206.01 140.406 205.87 140.35C205.729 140.294 205.578 140.27 205.428 140.278C205.277 140.286 205.13 140.327 204.996 140.398C204.863 140.469 204.747 140.568 204.655 140.689C204.564 140.809 204.5 140.948 204.468 141.095C204.435 141.243 204.435 141.396 204.468 141.544C204.5 141.691 204.565 141.83 204.656 141.95C204.747 142.071 204.864 142.17 204.997 142.24Z", "fill", "#9196A4"], ["d", "M192.16 132.213C192.589 131.703 193.72 131.947 193.72 131.947C193.72 131.947 194.149 133.02 193.72 133.531C193.644 133.661 193.54 133.774 193.416 133.861C193.291 133.947 193.15 134.006 193.001 134.032C192.851 134.058 192.698 134.051 192.552 134.012C192.406 133.973 192.27 133.903 192.154 133.806C192.037 133.708 191.944 133.587 191.879 133.45C191.814 133.313 191.78 133.163 191.779 133.012C191.778 132.86 191.81 132.71 191.873 132.572C191.936 132.434 192.028 132.312 192.143 132.213H192.16Z", "fill", "#9196A4"], ["d", "M193.854 129.918C194.283 130.437 193.79 131.497 193.79 131.497C193.79 131.497 192.65 131.711 192.239 131.188C192.132 131.085 192.048 130.96 191.993 130.822C191.939 130.684 191.914 130.536 191.921 130.388C191.928 130.239 191.967 130.094 192.034 129.962C192.102 129.83 192.197 129.714 192.313 129.621C192.429 129.529 192.563 129.462 192.707 129.426C192.851 129.39 193.001 129.385 193.147 129.411C193.293 129.438 193.431 129.495 193.553 129.579C193.675 129.664 193.778 129.773 193.854 129.901V129.918Z", "fill", "#9196A4"], ["d", "M195.594 131.364C194.994 131.076 194.064 131.767 194.064 131.767C194.064 131.767 194.103 132.93 194.699 133.218C194.822 133.304 194.963 133.362 195.111 133.389C195.26 133.415 195.412 133.409 195.558 133.371C195.704 133.333 195.839 133.264 195.956 133.168C196.072 133.072 196.167 132.952 196.232 132.817C196.298 132.681 196.333 132.532 196.336 132.381C196.339 132.231 196.309 132.081 196.248 131.943C196.187 131.805 196.098 131.682 195.985 131.582C195.872 131.482 195.739 131.407 195.594 131.364Z", "fill", "#9196A4"], ["d", "M203.611 151.989C204.04 151.479 205.171 151.728 205.171 151.728C205.171 151.728 205.6 152.796 205.171 153.307C205.095 153.438 204.991 153.55 204.867 153.637C204.743 153.723 204.601 153.782 204.452 153.808C204.303 153.834 204.15 153.828 204.003 153.788C203.857 153.749 203.721 153.679 203.605 153.582C203.488 153.485 203.395 153.363 203.33 153.226C203.265 153.089 203.231 152.94 203.23 152.788C203.229 152.636 203.262 152.486 203.324 152.348C203.387 152.211 203.479 152.088 203.594 151.989H203.611Z", "fill", "#9196A4"], ["d", "M205.309 149.693C205.738 150.217 205.245 151.277 205.245 151.277C205.245 151.277 204.105 151.487 203.698 150.968C203.589 150.865 203.503 150.741 203.447 150.602C203.39 150.464 203.364 150.315 203.37 150.166C203.376 150.016 203.414 149.87 203.481 149.737C203.549 149.603 203.644 149.486 203.761 149.393C203.878 149.299 204.013 149.232 204.158 149.196C204.303 149.16 204.454 149.155 204.601 149.183C204.747 149.21 204.887 149.268 205.009 149.354C205.131 149.44 205.234 149.552 205.309 149.681V149.693Z", "fill", "#9196A4"], ["d", "M207.046 151.144C206.45 150.852 205.516 151.547 205.516 151.547C205.516 151.547 205.554 152.706 206.15 152.993C206.273 153.077 206.413 153.133 206.559 153.157C206.706 153.182 206.856 153.175 207 153.136C207.144 153.098 207.278 153.029 207.392 152.934C207.507 152.839 207.6 152.72 207.665 152.586C207.73 152.452 207.765 152.306 207.768 152.157C207.772 152.008 207.743 151.86 207.684 151.723C207.626 151.587 207.538 151.464 207.428 151.364C207.318 151.264 207.187 151.189 207.046 151.144Z", "fill", "#9196A4"], ["d", "M197.733 138.379C198.38 138.229 199.13 139.113 199.13 139.113C199.13 139.113 198.838 140.233 198.191 140.4C198.051 140.459 197.9 140.486 197.749 140.479C197.597 140.473 197.449 140.434 197.314 140.364C197.18 140.295 197.062 140.197 196.969 140.077C196.876 139.957 196.81 139.818 196.776 139.671C196.742 139.523 196.741 139.369 196.773 139.221C196.804 139.072 196.868 138.933 196.959 138.811C197.05 138.69 197.166 138.59 197.3 138.518C197.434 138.447 197.581 138.405 197.733 138.397V138.379Z", "fill", "#9196A4"], ["d", "M200.471 137.576C200.471 138.241 199.464 138.799 199.464 138.799C199.464 138.799 198.427 138.276 198.414 137.615C198.388 137.466 198.394 137.314 198.433 137.168C198.471 137.023 198.54 136.887 198.636 136.771C198.731 136.654 198.851 136.56 198.986 136.495C199.122 136.429 199.27 136.394 199.42 136.391C199.571 136.388 199.72 136.418 199.858 136.478C199.996 136.539 200.119 136.628 200.219 136.741C200.319 136.854 200.393 136.987 200.437 137.131C200.48 137.275 200.492 137.427 200.471 137.576Z", "fill", "#9196A4"], ["d", "M200.977 139.782C200.673 139.19 199.516 139.177 199.516 139.177C199.516 139.177 198.843 140.125 199.147 140.717C199.193 140.861 199.27 140.994 199.372 141.106C199.474 141.217 199.599 141.305 199.739 141.364C199.878 141.422 200.029 141.449 200.18 141.444C200.331 141.438 200.479 141.399 200.613 141.33C200.748 141.261 200.866 141.164 200.959 141.045C201.053 140.926 201.119 140.788 201.154 140.64C201.188 140.493 201.191 140.34 201.16 140.192C201.13 140.043 201.067 139.903 200.977 139.782Z", "fill", "#9196A4"], ["d", "M227.355 152.539C226.738 152.787 225.855 152.037 225.855 152.037C225.855 152.037 225.971 150.882 226.584 150.633C226.713 150.554 226.858 150.503 227.008 150.485C227.159 150.467 227.311 150.482 227.455 150.529C227.599 150.576 227.732 150.654 227.842 150.758C227.953 150.861 228.04 150.988 228.097 151.128C228.154 151.269 228.18 151.42 228.172 151.572C228.164 151.724 228.124 151.872 228.053 152.006C227.983 152.14 227.884 152.257 227.763 152.349C227.643 152.441 227.504 152.506 227.355 152.539Z", "fill", "#9196A4"], ["d", "M224.78 153.744C224.66 153.092 225.578 152.38 225.578 152.38C225.578 152.38 226.683 152.732 226.799 153.384C226.847 153.526 226.864 153.676 226.849 153.825C226.834 153.974 226.786 154.117 226.711 154.246C226.635 154.375 226.532 154.486 226.409 154.572C226.286 154.657 226.146 154.715 225.999 154.741C225.852 154.767 225.701 154.761 225.556 154.724C225.412 154.686 225.277 154.618 225.161 154.523C225.045 154.428 224.951 154.31 224.886 154.175C224.82 154.041 224.784 153.894 224.78 153.744Z", "fill", "#9196A4"], ["d", "M223.931 151.646C224.321 152.183 225.466 152.015 225.466 152.015C225.466 152.015 225.98 150.973 225.59 150.436C225.521 150.304 225.424 150.189 225.306 150.098C225.188 150.006 225.052 149.942 224.907 149.908C224.762 149.874 224.611 149.872 224.465 149.902C224.319 149.931 224.182 149.992 224.061 150.08C223.941 150.168 223.841 150.281 223.768 150.411C223.695 150.541 223.651 150.685 223.638 150.833C223.626 150.982 223.646 151.132 223.696 151.272C223.747 151.412 223.827 151.54 223.931 151.646Z", "fill", "#9196A4"], ["d", "M221.625 160.099C220.986 159.919 220.742 158.786 220.742 158.786C220.742 158.786 221.535 157.928 222.178 158.117C222.328 158.134 222.473 158.183 222.602 158.261C222.731 158.339 222.841 158.445 222.926 158.57C223.01 158.695 223.067 158.837 223.091 158.986C223.115 159.135 223.106 159.288 223.066 159.434C223.025 159.579 222.954 159.714 222.856 159.829C222.758 159.944 222.636 160.037 222.499 160.1C222.362 160.163 222.213 160.196 222.062 160.196C221.911 160.196 221.762 160.163 221.625 160.099Z", "fill", "#9196A4"], ["d", "M218.839 159.494C219.144 158.907 220.301 158.902 220.301 158.902C220.301 158.902 220.965 159.855 220.661 160.443C220.612 160.583 220.533 160.712 220.43 160.819C220.327 160.927 220.202 161.011 220.064 161.066C219.926 161.12 219.777 161.145 219.629 161.137C219.48 161.13 219.335 161.09 219.203 161.022C219.071 160.953 218.956 160.857 218.864 160.739C218.773 160.622 218.707 160.486 218.673 160.341C218.638 160.196 218.635 160.046 218.664 159.9C218.693 159.754 218.753 159.615 218.839 159.494Z", "fill", "#9196A4"], ["d", "M219.444 157.314C219.444 157.979 220.438 158.541 220.438 158.541C220.438 158.541 221.48 158.03 221.497 157.37C221.526 157.221 221.523 157.067 221.487 156.92C221.451 156.773 221.383 156.635 221.289 156.517C221.194 156.398 221.075 156.302 220.939 156.234C220.803 156.167 220.655 156.129 220.503 156.125C220.352 156.121 220.201 156.15 220.062 156.21C219.923 156.27 219.799 156.36 219.698 156.473C219.597 156.587 219.522 156.72 219.478 156.866C219.434 157.011 219.423 157.164 219.444 157.314Z", "fill", "#9196A4"], ["d", "M217.095 152.749C217.052 153.414 215.998 153.89 215.998 153.89C215.998 153.89 215.004 153.289 215.042 152.629C215.027 152.478 215.045 152.327 215.094 152.184C215.143 152.041 215.222 151.911 215.327 151.802C215.431 151.693 215.558 151.608 215.698 151.553C215.838 151.497 215.989 151.473 216.139 151.482C216.29 151.491 216.437 151.532 216.57 151.604C216.703 151.675 216.818 151.774 216.909 151.894C217 152.015 217.064 152.154 217.096 152.301C217.128 152.449 217.128 152.601 217.095 152.749Z", "fill", "#9196A4"], ["d", "M217.09 155.606C216.452 155.43 216.203 154.319 216.203 154.319C216.203 154.319 216.992 153.461 217.635 153.645C217.785 153.66 217.931 153.708 218.061 153.785C218.192 153.863 218.304 153.968 218.389 154.093C218.475 154.218 218.533 154.36 218.558 154.51C218.583 154.659 218.575 154.813 218.535 154.959C218.495 155.105 218.423 155.241 218.325 155.357C218.227 155.472 218.105 155.565 217.968 155.629C217.83 155.693 217.68 155.725 217.529 155.725C217.377 155.725 217.228 155.692 217.09 155.627V155.606Z", "fill", "#9196A4"], ["d", "M214.854 155.473C215.506 155.349 215.844 154.242 215.844 154.242C215.844 154.242 215.124 153.328 214.473 153.452C214.321 153.455 214.173 153.491 214.037 153.558C213.901 153.625 213.781 153.72 213.686 153.838C213.59 153.955 213.522 154.092 213.485 154.239C213.448 154.386 213.443 154.539 213.471 154.688C213.499 154.837 213.56 154.978 213.648 155.101C213.736 155.224 213.849 155.327 213.981 155.402C214.113 155.476 214.259 155.521 214.41 155.534C214.56 155.546 214.712 155.525 214.854 155.473Z", "fill", "#9196A4"], ["d", "M189.259 209.353H222.662C222.777 209.353 222.891 209.378 222.995 209.428C223.099 209.478 223.191 209.55 223.264 209.64C223.336 209.729 223.388 209.834 223.415 209.946C223.442 210.058 223.444 210.175 223.421 210.288L222.992 212.365C222.955 212.537 222.86 212.692 222.723 212.803C222.585 212.914 222.414 212.974 222.238 212.974H190.065C189.908 212.975 189.755 212.927 189.625 212.838C189.496 212.749 189.397 212.623 189.341 212.476L188.556 210.399C188.514 210.284 188.499 210.16 188.513 210.037C188.528 209.915 188.571 209.798 188.64 209.696C188.708 209.593 188.8 209.509 188.908 209.449C189.016 209.39 189.136 209.356 189.259 209.353Z", "fill", "#FAFAFC", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M191.909 216.247C192.282 216.247 220.435 212.974 220.435 212.974H191.57L191.909 216.247Z", "fill", "#9196A4"], ["d", "M121.787 241.62L120.357 238H127.607C130.507 238 132.117 239.16 134.337 240.53C134.425 240.576 134.496 240.65 134.537 240.74C134.571 240.834 134.571 240.936 134.537 241.03C134.509 241.126 134.449 241.211 134.367 241.27C134.287 241.331 134.187 241.359 134.087 241.35L121.787 241.62Z", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M65.3021 81.6625L65.3142 81.6488L65.3254 81.6343C66.3964 80.236 68.2127 78.032 70.1491 75.9865C72.0577 73.9701 74.0279 72.1679 75.4984 71.4002H76.0185H76.0988L76.1751 71.375L78.1751 70.715L78.288 70.6778L78.372 70.5938C78.6914 70.2744 79.2018 69.7863 79.6901 69.3814C79.9353 69.1781 80.1645 69.0044 80.3551 68.8843C80.4288 68.8378 80.491 68.803 80.5416 68.7785C80.6054 68.8314 80.688 68.905 80.7897 69.0006C81.0488 69.2442 81.3997 69.6004 81.8178 70.0414C82.6521 70.9216 83.7338 72.119 84.843 73.3804C87.0726 75.916 89.3701 78.6615 90.0028 79.6081C90.6183 80.529 90.7357 81.0808 90.7347 81.5241C90.7342 81.7585 90.701 81.9793 90.6597 82.2535L90.6567 82.2737C90.6152 82.5497 90.5685 82.8693 90.5685 83.2402C90.5685 83.4219 90.5293 83.4901 90.5184 83.5056C90.5123 83.5141 90.5049 83.524 90.4693 83.5325C90.4245 83.5431 90.3519 83.5453 90.2555 83.5268C90.1616 83.5088 90.0692 83.4758 89.9979 83.4409L89.3803 83.1393L89.2834 83.8198L86.6834 102.09L86.6677 102.2L86.7004 102.307L88.7004 108.827L88.8622 109.354L89.3712 109.142L117.04 97.5817L119.87 103.242C112.091 107.244 96.434 115.328 92.8504 117.376L92.8433 117.38L92.8364 117.384C90.5259 118.806 87.9165 119.672 85.2142 119.912L84.813 119.948L84.7624 120.347L84.1578 125.12H56.4285C54.3846 125.12 52.805 124.806 51.669 124.414C50.6752 124.071 50.0444 123.678 49.7316 123.403C49.3924 112.438 52.0861 101.591 57.5178 92.0566C59.8162 88.3796 62.4202 84.9026 65.3021 81.6625Z", "fill", "white", "stroke", "#9196A4"], ["d", "M84.0864 88.5105C84.6064 92.1305 88.9764 109.07 88.9764 109.07L127.616 92.6505L131.766 97.8405C131.766 97.8405 106.366 111.84 90.8164 119.05C75.2664 126.26 72.6764 107.67 69.5664 86.9805", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M91.2981 80.2404L90.8681 84.0304C90.8541 84.1172 90.8198 84.1994 90.7681 84.2704C90.7155 84.3393 90.6469 84.3942 90.5681 84.4304C90.4833 84.4554 90.393 84.4554 90.3081 84.4304C90.2217 84.4218 90.1389 84.3908 90.0681 84.3404L89.8381 84.1704L89.9381 82.7204C90.0401 81.495 89.7976 80.2654 89.2381 79.1704C88.6877 78.0695 87.8476 77.1395 86.8081 76.4804L78.3281 71.0904C78.0141 70.9059 77.6781 70.7614 77.3281 70.6604L79.2481 68.5504C79.3869 68.3914 79.5618 68.2679 79.7581 68.1904C79.9508 68.109 80.1591 68.0714 80.3681 68.0804C80.5762 68.0806 80.7815 68.1285 80.9681 68.2204C81.1581 68.3129 81.3254 68.446 81.4581 68.6104L91.2981 80.2404Z", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M77.3574 70.6611C77.7074 70.7621 78.0434 70.9066 78.3574 71.0911L86.8474 76.4911C87.8862 77.1467 88.7264 78.0733 89.2774 79.1711C89.827 80.2732 90.0688 81.5031 89.9774 82.7311L89.8674 84.1711", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M89.867 84.1904L87.457 102.87", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M49.3568 124.461C47.0868 98.051 65.8768 78.591 73.8768 71.461C74.3383 71.0382 74.901 70.7415 75.5106 70.5997C76.1202 70.4578 76.756 70.4755 77.3568 70.651", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M85.6676 63.7425C85.6964 63.8205 85.7245 63.8928 85.7512 63.9589C84.2712 64.6793 82.8481 64.6447 81.6181 64.076C80.2622 63.4491 79.089 62.1471 78.3504 60.3601C77.6611 58.6925 78.0293 56.166 79.6543 53.7285C81.2654 51.3119 84.0778 49.0477 88.1298 47.9435C92.1477 46.8486 95.062 47.7969 96.9607 49.4108C98.7869 50.9631 99.6984 53.1492 99.748 54.8385C98.7259 55.4678 97.7939 56.2335 96.9776 57.1147C96.5367 57.5565 96.0108 57.9043 95.4317 58.1372L95.4317 58.1372L95.4246 58.1401C94.855 58.3795 94.2423 58.4989 93.6246 58.4911L93.3247 58.4874L93.1801 58.7502C92.5799 59.842 91.5832 60.9579 90.7979 61.6135C90.6886 61.7048 90.5858 61.785 90.4911 61.8537C90.5507 61.503 90.5761 61.1054 90.5642 60.7054C90.5466 60.1191 90.4475 59.4827 90.2242 58.9417C90.0038 58.4074 89.6265 57.8864 89.0079 57.6918C88.3846 57.4957 87.6812 57.6822 86.9299 58.1858C85.3313 59.2573 85.1173 60.8827 85.272 62.1456C85.3493 62.7772 85.5192 63.3401 85.6676 63.7425ZM90.0155 62.1259C90.0155 62.1259 90.0163 62.1257 90.0178 62.1255C90.0177 62.1255 90.0177 62.1255 90.0177 62.1255C90.0162 62.1258 90.0155 62.1259 90.0155 62.1259Z", "fill", "#9196A4", "stroke", "#9196A4"], ["d", "M86.9483 46.7433L86.9483 46.7433L86.9451 46.7453L82.5692 49.4453C81.0452 48.0915 79.0811 47.3274 77.0341 47.3009L77.0341 47.3007L77.02 47.3009C76.3658 47.3109 75.661 46.9918 75.0632 46.4133C74.4686 45.8378 74.0162 45.0378 73.857 44.1649C73.6993 43.2995 73.8288 42.3616 74.3964 41.4805C74.9666 40.5956 76.0041 39.7298 77.727 39.0675L77.7277 39.0673C80.622 37.9501 82.9319 38.6105 84.6148 39.9429C86.3247 41.2967 87.3973 43.3568 87.7168 45.0059L87.7169 45.0065C87.7818 45.3398 87.743 45.6851 87.6055 45.9957C87.4681 46.3063 87.2387 46.5672 86.9483 46.7433Z", "fill", "#9196A4", "stroke", "#9196A4"], ["d", "M88.0078 68.0905C88.0078 68.0905 94.3378 73.8805 95.6678 73.0905C96.9978 72.3005 98.7578 66.8605 98.7578 66.8605C99.4832 66.9593 100.221 66.9117 100.928 66.7205C101.598 66.3705 99.7378 63.6205 99.8578 61.4905C99.9778 59.3605 100.598 56.5705 99.9278 55.2705", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M80.9375 68.331C82.3296 67.0375 83.58 65.5994 84.6675 64.041", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M91.7681 71.2109C91.7681 71.2109 88.1382 75.4409 88.1682 77.0909", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M99.9472 55.291C99.5872 56.911 96.7472 60.291 94.1172 59.971", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M83.1464 50.8005C82.3164 50.0005 79.8464 48.1105 77.7064 48.5505C75.5664 48.9905 75.0664 47.9805 75.0664 47.9805", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M117.178 97.0703L120.688 103.8", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M128.088 93.171C128.547 91.9896 129.159 90.8734 129.908 89.851C130.338 89.461 131.588 89.851 132.418 90.281C132.498 90.3101 132.568 90.3623 132.618 90.431C132.659 90.5017 132.686 90.5798 132.698 90.661C132.707 90.7475 132.689 90.8346 132.648 90.911C132.615 90.989 132.559 91.0552 132.488 91.101L131.188 91.931C131.188 91.931 131.188 93.281 132.128 93.331C132.808 93.331 137.028 91.261 139.308 90.081C139.359 90.0609 139.416 90.0609 139.468 90.081C139.521 90.0989 139.569 90.1298 139.608 90.171C139.621 90.2235 139.621 90.2785 139.608 90.331C139.602 90.3873 139.577 90.4399 139.538 90.481C137.278 92.591 134.778 95.671 131.158 97.351", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M131.874 92.1349L144.089 86.3957L144.138 86.4038L144.321 86.9437C144.326 86.9611 144.328 86.9793 144.327 86.9972C144.321 87.0026 144.315 87.0072 144.308 87.0107L132.205 92.7973L131.874 92.1349Z", "fill", "#9196A4", "stroke", "#9196A4"], ["d", "M69.6966 92.5567C70.0367 94.3817 70.4573 96.5551 70.9326 98.8387C71.5667 101.885 72.2991 105.132 73.0689 108.012C73.8343 110.876 74.6455 113.411 75.4457 115.023C76.2564 116.849 77.5813 118.398 79.2586 119.483C80.7833 120.469 82.539 121.032 84.346 121.119L84.1172 123.365C80.1831 123.243 77.3178 121.136 75.2096 117.94C73.0102 114.605 71.6614 110.114 70.8493 105.568C70.0387 101.03 69.7701 96.4822 69.705 93.0642C69.7017 92.8921 69.6989 92.7228 69.6966 92.5567Z", "fill", "#9196A4", "stroke", "#9196A4"], ["d", "M87.3668 99.419L87.2854 100.043L86.2597 96.0702L87.3668 99.419Z", "fill", "#9196A4", "stroke", "#9196A4"], ["d", "M81.7124 68.2881L82.3051 67.6867L84.7969 71.7489L81.7124 68.2881Z", "fill", "#9196A4", "stroke", "#9196A4"], ["d", "M61.431 129.861L87.7552 125.168L126.506 237.301H120.284L61.431 129.861Z", "fill", "#9196A4", "stroke", "#9196A4"], ["d", "M83.9668 211.321L85.3468 207.791L90.5768 207.851C93.4768 207.851 95.0868 209.011 97.3168 210.391C97.4057 210.436 97.4763 210.51 97.5164 210.602C97.5565 210.693 97.5637 210.795 97.5368 210.891C97.5264 210.941 97.5059 210.987 97.4767 211.029C97.4474 211.07 97.41 211.105 97.3668 211.131C97.2837 211.184 97.1853 211.209 97.0868 211.201L83.9668 211.321Z", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["id", "path-92-inside-1_8207_159316", "fill", "white"], ["d", "M95.7267 144.961C86.6167 147.321 73.5267 148.321 62.9467 145.141C54.1867 142.491 50.7567 133.961 49.1367 123.971C52.8167 126.531 63.5867 124.691 80.2467 124.331L117.247 124.761C118.431 124.78 119.593 125.081 120.637 125.641C122.206 126.493 123.411 127.889 124.024 129.566C124.637 131.244 124.617 133.087 123.967 134.751L91.9667 207.901L85.2667 207.791L104.567 141.481C101.785 143.075 98.7825 144.248 95.6567 144.961C86.5367 147.321 73.4467 148.321 62.8667 145.141"], ["d", "M95.7267 144.961C86.6167 147.321 73.5267 148.321 62.9467 145.141C54.1867 142.491 50.7567 133.961 49.1367 123.971C52.8167 126.531 63.5867 124.691 80.2467 124.331L117.247 124.761C118.431 124.78 119.593 125.081 120.637 125.641C122.206 126.493 123.411 127.889 124.024 129.566C124.637 131.244 124.617 133.087 123.967 134.751L91.9667 207.901L85.2667 207.791L104.567 141.481C101.785 143.075 98.7825 144.248 95.6567 144.961C86.5367 147.321 73.4467 148.321 62.8667 145.141", "fill", "#9196A4"], ["d", "M62.9467 145.141L62.6572 146.098L62.6589 146.098L62.9467 145.141ZM49.1367 123.971L49.7078 123.15L47.7722 121.803L48.1496 124.131L49.1367 123.971ZM80.2467 124.331L80.2583 123.331L80.2417 123.331L80.2251 123.331L80.2467 124.331ZM117.247 124.761L117.263 123.761L117.258 123.761L117.247 124.761ZM120.637 125.641L121.114 124.762L121.109 124.759L120.637 125.641ZM123.967 134.751L124.883 135.151L124.891 135.133L124.898 135.115L123.967 134.751ZM91.9667 207.901L91.9503 208.901L92.616 208.912L92.8829 208.301L91.9667 207.901ZM85.2667 207.791L84.3066 207.511L83.9405 208.769L85.2503 208.791L85.2667 207.791ZM104.567 141.481L105.527 141.76L106.219 139.381L104.069 140.613L104.567 141.481ZM95.6567 144.961L95.4343 143.986L95.4202 143.989L95.4062 143.993L95.6567 144.961ZM95.4759 143.993C86.478 146.324 73.5845 147.294 63.2346 144.183L62.6589 146.098C73.4689 149.348 86.7555 148.318 95.9775 145.929L95.4759 143.993ZM63.2363 144.184C55.0858 141.718 51.7384 133.767 50.1238 123.811L48.1496 124.131C49.775 134.154 53.2877 143.263 62.6572 146.098L63.2363 144.184ZM48.5657 124.792C49.6985 125.58 51.2698 125.966 53.1061 126.152C54.9646 126.342 57.2327 126.338 59.8595 126.245C65.1851 126.057 71.9148 125.511 80.2683 125.33L80.2251 123.331C71.9186 123.51 64.9333 124.065 59.7889 124.246C57.1807 124.338 55.0251 124.337 53.3086 124.163C51.5699 123.986 50.4149 123.642 49.7078 123.15L48.5657 124.792ZM80.2351 125.331L117.235 125.761L117.258 123.761L80.2583 123.331L80.2351 125.331ZM117.231 125.761C118.255 125.777 119.261 126.038 120.164 126.522L121.109 124.759C119.925 124.125 118.606 123.782 117.263 123.761L117.231 125.761ZM120.16 126.52C121.515 127.255 122.555 128.461 123.085 129.909L124.963 129.223C124.266 127.317 122.898 125.73 121.114 124.762L120.16 126.52ZM123.085 129.909C123.614 131.358 123.597 132.95 123.035 134.387L124.898 135.115C125.637 133.224 125.66 131.129 124.963 129.223L123.085 129.909ZM123.051 134.35L91.0505 207.5L92.8829 208.301L124.883 135.151L123.051 134.35ZM91.9831 206.901L85.2831 206.791L85.2503 208.791L91.9503 208.901L91.9831 206.901ZM86.2269 208.07L105.527 141.76L103.607 141.201L84.3066 207.511L86.2269 208.07ZM104.069 140.613C101.374 142.158 98.4636 143.295 95.4343 143.986L95.8791 145.936C99.1013 145.201 102.197 143.992 105.064 142.348L104.069 140.613ZM95.4062 143.993C86.3979 146.324 73.5045 147.294 63.1546 144.183L62.5789 146.098C73.3889 149.348 86.6755 148.318 95.9072 145.929L95.4062 143.993Z", "fill", "#9196A4", "mask", "url(#path-92-inside-1_8207_159316)"], ["d", "M97.3776 146.871H52.7076C52.354 146.87 52.0036 146.938 51.6766 147.073C51.3497 147.208 51.0526 147.406 50.8025 147.656C50.5525 147.906 50.3544 148.203 50.2197 148.53C50.085 148.857 50.0163 149.207 50.0176 149.561V150.561C50.0176 151.275 50.301 151.959 50.8055 152.463C51.3099 152.968 51.9942 153.251 52.7076 153.251H97.3776C98.091 153.251 98.7752 152.968 99.2797 152.463C99.7842 151.959 100.068 151.275 100.068 150.561V149.561C100.069 149.207 100 148.857 99.8655 148.53C99.7308 148.203 99.5327 147.906 99.2827 147.656C99.0326 147.406 98.7355 147.208 98.4086 147.073C98.0816 146.938 97.7312 146.87 97.3776 146.871Z", "fill", "white", "stroke", "#9196A4", "stroke-width", "1.29", "stroke-miterlimit", "10"], ["d", "M58.0074 153.301L44.3574 241.371", "stroke", "#9196A4", "stroke-width", "1.29", "stroke-miterlimit", "10"], ["d", "M93.5371 153.301L107.197 241.371", "stroke", "#9196A4", "stroke-width", "1.29", "stroke-miterlimit", "10"], ["d", "M75.7773 153.44V241.37", "stroke", "#9196A4", "stroke-width", "1.29", "stroke-miterlimit", "10"], ["d", "M49.6074 211.091L101.807 211.421", "stroke", "#9196A4", "stroke-width", "1.29", "stroke-miterlimit", "10"], ["d", "M84.8976 120.631L84.5176 124.531", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M210.177 92.58C213.892 92.574 217.522 91.467 220.608 89.3987C223.694 87.3304 226.098 84.3938 227.516 80.9598C228.933 77.5259 229.301 73.7488 228.573 70.1059C227.844 66.463 226.052 63.1177 223.423 60.4929C220.794 57.868 217.446 56.0815 213.802 55.3589C210.158 54.6363 206.382 55.0101 202.95 56.4332C199.518 57.8562 196.585 60.2646 194.522 63.3539C192.459 66.4433 191.357 70.0749 191.357 73.79C191.363 78.777 193.348 83.5577 196.877 87.0813C200.406 90.6048 205.19 92.5826 210.177 92.58Z", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M210.178 61.0898V73.7898H221.978", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M0.357422 242H253.643", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M172.218 241.685V37.144C172.217 27.8834 168.542 19.0024 162.001 12.4542C155.461 5.906 146.59 2.22672 137.341 2.22559H99.3906", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M64.6133 10.4416H144.435L117.143 2.03167C108.072 -0.76528 98.3577 -0.672271 89.3418 2.29775L64.6133 10.4416Z", "fill", "#11142D"], ["d", "M232.173 241.474H193.91", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M191.57 212.979H220.43L217.559 241.456H193.782L191.57 212.979Z", "fill", "#FAFAFC", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M173.072 242.134C173.659 242.134 193.699 235.269 193.699 235.269L194.128 241.276L173.072 242.134Z", "fill", "#11142D"], ["d", "M193.203 177.91L205.306 188.152C205.306 188.152 205.117 208.014 205.139 209.349", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M202.25 185.573L205.494 163.896L223.871 153.023", "stroke", "#11142D", "stroke-miterlimit", "10", "stroke-linecap", "round"], ["d", "M213.059 159.421L197.797 130.227L182.129 121.649", "stroke", "#11142D", "stroke-miterlimit", "10", "stroke-linecap", "round"], ["d", "M199.173 178.073C198.744 178.593 197.621 178.378 197.621 178.378C197.621 178.378 197.15 177.318 197.561 176.795C197.637 176.666 197.739 176.555 197.861 176.469C197.983 176.383 198.123 176.324 198.269 176.297C198.416 176.27 198.567 176.274 198.712 176.31C198.857 176.347 198.992 176.414 199.109 176.507C199.226 176.6 199.321 176.717 199.389 176.851C199.456 176.984 199.494 177.131 199.5 177.28C199.506 177.429 199.48 177.578 199.424 177.717C199.367 177.855 199.281 177.98 199.173 178.082V178.073Z", "fill", "#11142D"], ["d", "M197.534 180.429C197.106 179.918 197.534 178.846 197.534 178.846C197.534 178.846 198.67 178.601 199.094 179.112C199.207 179.211 199.298 179.334 199.359 179.471C199.42 179.609 199.451 179.759 199.449 179.909C199.447 180.06 199.413 180.208 199.348 180.344C199.283 180.481 199.19 180.601 199.074 180.697C198.958 180.794 198.823 180.864 198.677 180.903C198.532 180.942 198.38 180.949 198.231 180.923C198.083 180.898 197.942 180.84 197.818 180.755C197.694 180.67 197.59 180.558 197.513 180.429H197.534Z", "fill", "#11142D"], ["d", "M195.765 179.008C196.369 179.283 197.282 178.579 197.282 178.579C197.282 178.579 197.213 177.421 196.609 177.146C196.483 177.064 196.342 177.01 196.194 176.988C196.045 176.966 195.894 176.976 195.75 177.018C195.606 177.059 195.473 177.132 195.359 177.23C195.246 177.328 195.155 177.449 195.092 177.585C195.03 177.722 194.998 177.87 194.998 178.02C194.998 178.17 195.031 178.318 195.093 178.455C195.156 178.591 195.247 178.712 195.361 178.81C195.474 178.908 195.608 178.98 195.752 179.021L195.765 179.008Z", "fill", "#11142D"], ["d", "M191.308 174.619C191.805 175.048 191.527 176.185 191.527 176.185C191.527 176.185 190.442 176.614 189.945 176.155C189.821 176.073 189.715 175.965 189.636 175.839C189.556 175.713 189.505 175.571 189.486 175.423C189.466 175.275 189.478 175.125 189.522 174.982C189.566 174.84 189.639 174.708 189.738 174.597C189.837 174.485 189.959 174.396 190.095 174.336C190.232 174.276 190.379 174.246 190.528 174.248C190.677 174.25 190.824 174.284 190.959 174.348C191.093 174.412 191.212 174.505 191.308 174.619Z", "fill", "#11142D"], ["d", "M193.55 176.386C193.019 176.781 191.973 176.275 191.973 176.275C191.973 176.275 191.797 175.129 192.329 174.734C192.434 174.63 192.561 174.549 192.701 174.497C192.841 174.446 192.99 174.425 193.138 174.437C193.286 174.448 193.43 174.491 193.561 174.563C193.691 174.635 193.804 174.734 193.893 174.854C193.981 174.974 194.043 175.111 194.074 175.257C194.104 175.403 194.104 175.553 194.071 175.699C194.039 175.844 193.975 175.981 193.885 176.099C193.796 176.218 193.681 176.316 193.55 176.386Z", "fill", "#11142D"], ["d", "M192.05 178.078C192.358 177.49 191.694 176.537 191.694 176.537C191.694 176.537 190.537 176.537 190.228 177.129C190.141 177.25 190.081 177.388 190.053 177.534C190.024 177.681 190.027 177.831 190.062 177.976C190.096 178.121 190.161 178.257 190.253 178.374C190.344 178.491 190.46 178.588 190.592 178.656C190.724 178.725 190.869 178.765 191.018 178.772C191.166 178.78 191.315 178.755 191.453 178.7C191.591 178.645 191.716 178.561 191.819 178.454C191.922 178.346 192 178.218 192.05 178.078Z", "fill", "#11142D"], ["d", "M195.495 185.097C195.876 184.552 197.025 184.703 197.025 184.703C197.025 184.703 197.556 185.732 197.175 186.277C197.108 186.411 197.013 186.528 196.897 186.621C196.781 186.714 196.646 186.782 196.501 186.818C196.357 186.854 196.206 186.859 196.06 186.832C195.913 186.805 195.774 186.747 195.652 186.661C195.53 186.575 195.428 186.465 195.353 186.336C195.278 186.207 195.231 186.064 195.216 185.915C195.201 185.767 195.218 185.617 195.266 185.476C195.314 185.335 195.392 185.206 195.495 185.097Z", "fill", "#11142D"], ["d", "M196.99 182.665C197.445 183.149 197.059 184.244 197.059 184.244C197.059 184.244 195.945 184.552 195.49 184.068C195.374 183.974 195.279 183.857 195.212 183.724C195.146 183.591 195.108 183.445 195.102 183.297C195.097 183.148 195.123 182.999 195.18 182.862C195.236 182.724 195.322 182.6 195.431 182.498C195.539 182.397 195.669 182.32 195.81 182.272C195.951 182.225 196.1 182.209 196.248 182.225C196.396 182.24 196.539 182.288 196.667 182.364C196.795 182.44 196.905 182.542 196.99 182.665Z", "fill", "#11142D"], ["d", "M198.843 183.96C198.225 183.724 197.355 184.492 197.355 184.492C197.355 184.492 197.488 185.642 198.11 185.882C198.24 185.959 198.386 186.005 198.536 186.02C198.687 186.034 198.838 186.015 198.981 185.965C199.123 185.915 199.253 185.834 199.361 185.728C199.47 185.623 199.554 185.495 199.607 185.354C199.661 185.212 199.684 185.061 199.673 184.91C199.663 184.759 199.62 184.612 199.547 184.48C199.474 184.347 199.374 184.232 199.252 184.142C199.13 184.052 198.991 183.99 198.843 183.96Z", "fill", "#11142D"], ["d", "M208.095 180.077C207.435 180 207.02 178.914 207.02 178.914C207.02 178.914 207.675 177.957 208.331 178.035C208.482 178.027 208.633 178.052 208.774 178.108C208.915 178.165 209.041 178.251 209.145 178.362C209.249 178.472 209.327 178.604 209.375 178.748C209.422 178.892 209.438 179.045 209.421 179.196C209.403 179.346 209.353 179.491 209.274 179.621C209.195 179.75 209.089 179.86 208.962 179.944C208.836 180.028 208.693 180.084 208.543 180.107C208.394 180.13 208.241 180.119 208.095 180.077Z", "fill", "#11142D"], ["d", "M205.249 179.914C205.459 179.283 206.604 179.099 206.604 179.099C206.604 179.099 207.405 179.957 207.195 180.566C207.169 180.713 207.112 180.853 207.027 180.975C206.942 181.098 206.832 181.201 206.703 181.277C206.575 181.353 206.432 181.401 206.284 181.417C206.136 181.433 205.986 181.416 205.845 181.369C205.703 181.322 205.574 181.244 205.465 181.142C205.356 181.04 205.271 180.916 205.214 180.778C205.158 180.64 205.132 180.491 205.138 180.342C205.144 180.193 205.182 180.047 205.249 179.914Z", "fill", "#11142D"], ["d", "M205.506 177.665C205.591 178.326 206.68 178.725 206.68 178.725C206.68 178.725 207.627 178.056 207.537 177.399C207.539 177.25 207.509 177.103 207.449 176.966C207.389 176.83 207.301 176.708 207.19 176.609C207.078 176.51 206.947 176.437 206.805 176.393C206.663 176.349 206.513 176.336 206.366 176.355C206.218 176.375 206.077 176.425 205.951 176.504C205.824 176.583 205.717 176.688 205.635 176.813C205.553 176.937 205.498 177.077 205.475 177.224C205.452 177.372 205.461 177.522 205.501 177.665H205.506Z", "fill", "#11142D"], ["d", "M209.017 168.229C208.361 168.152 207.945 167.067 207.945 167.067C207.945 167.067 208.597 166.11 209.257 166.187C209.408 166.18 209.559 166.205 209.699 166.262C209.84 166.319 209.966 166.406 210.069 166.517C210.172 166.627 210.25 166.759 210.298 166.903C210.345 167.047 210.36 167.2 210.342 167.35C210.325 167.501 210.275 167.646 210.195 167.775C210.116 167.904 210.009 168.014 209.883 168.098C209.757 168.181 209.614 168.237 209.465 168.259C209.315 168.282 209.162 168.272 209.017 168.229Z", "fill", "#11142D"], ["d", "M206.171 168.067C206.381 167.436 207.525 167.252 207.525 167.252C207.525 167.252 208.327 168.11 208.117 168.719C208.091 168.866 208.033 169.006 207.949 169.129C207.864 169.251 207.754 169.354 207.625 169.43C207.497 169.507 207.354 169.554 207.206 169.57C207.058 169.586 206.908 169.57 206.767 169.522C206.625 169.475 206.496 169.398 206.387 169.296C206.278 169.194 206.193 169.069 206.136 168.931C206.08 168.793 206.053 168.644 206.059 168.495C206.066 168.346 206.104 168.2 206.171 168.067Z", "fill", "#11142D"], ["d", "M206.428 165.84C206.513 166.501 207.602 166.9 207.602 166.9C207.602 166.9 208.549 166.235 208.459 165.574C208.461 165.425 208.431 165.278 208.371 165.141C208.311 165.005 208.223 164.883 208.112 164.784C208 164.685 207.869 164.611 207.727 164.567C207.585 164.524 207.435 164.511 207.288 164.53C207.14 164.549 206.999 164.6 206.872 164.679C206.746 164.758 206.639 164.863 206.557 164.987C206.475 165.112 206.42 165.252 206.397 165.399C206.374 165.546 206.383 165.697 206.423 165.84H206.428Z", "fill", "#11142D"], ["d", "M209.652 188.795C209.035 189.04 208.16 188.281 208.16 188.281C208.16 188.281 208.28 187.126 208.897 186.882C209.027 186.804 209.172 186.755 209.322 186.739C209.473 186.723 209.625 186.74 209.768 186.789C209.911 186.838 210.042 186.917 210.151 187.021C210.261 187.126 210.346 187.253 210.401 187.393C210.457 187.534 210.481 187.685 210.472 187.836C210.464 187.987 210.422 188.135 210.351 188.268C210.279 188.402 210.18 188.518 210.059 188.609C209.938 188.7 209.799 188.764 209.652 188.795Z", "fill", "#11142D"], ["d", "M207.066 189.997C206.955 189.34 207.876 188.637 207.876 188.637C207.876 188.637 208.977 188.997 209.089 189.654C209.135 189.796 209.15 189.946 209.133 190.094C209.116 190.242 209.068 190.385 208.99 190.513C208.913 190.641 208.81 190.75 208.686 190.834C208.563 190.918 208.423 190.975 208.276 191C208.129 191.025 207.979 191.018 207.835 190.979C207.69 190.94 207.556 190.871 207.442 190.776C207.327 190.681 207.234 190.562 207.169 190.427C207.104 190.293 207.069 190.146 207.066 189.997Z", "fill", "#11142D"], ["d", "M206.235 187.89C206.62 188.431 207.769 188.272 207.769 188.272C207.769 188.272 208.292 187.234 207.902 186.697C207.835 186.563 207.739 186.445 207.622 186.351C207.505 186.258 207.369 186.191 207.224 186.154C207.079 186.118 206.927 186.114 206.78 186.142C206.633 186.171 206.494 186.23 206.372 186.318C206.25 186.405 206.148 186.517 206.074 186.648C206 186.778 205.954 186.923 205.941 187.072C205.928 187.222 205.948 187.372 205.999 187.513C206.049 187.654 206.13 187.783 206.235 187.89Z", "fill", "#11142D"], ["d", "M201.46 197.987C202.116 198.09 202.493 199.184 202.493 199.184C202.493 199.184 201.807 200.119 201.152 200.021C201 200.023 200.851 199.992 200.712 199.93C200.574 199.869 200.451 199.777 200.352 199.663C200.253 199.549 200.179 199.415 200.137 199.269C200.095 199.124 200.085 198.971 200.107 198.822C200.13 198.672 200.185 198.529 200.269 198.403C200.352 198.277 200.462 198.17 200.591 198.091C200.719 198.011 200.864 197.961 201.014 197.943C201.164 197.925 201.316 197.94 201.46 197.987Z", "fill", "#11142D"], ["d", "M204.302 198.253C204.066 198.875 202.917 199.016 202.917 199.016C202.917 199.016 202.146 198.158 202.377 197.527C202.407 197.379 202.469 197.24 202.558 197.118C202.647 196.996 202.762 196.895 202.894 196.822C203.026 196.749 203.172 196.705 203.322 196.694C203.473 196.683 203.624 196.705 203.765 196.758C203.906 196.811 204.034 196.895 204.14 197.002C204.246 197.11 204.327 197.239 204.378 197.381C204.429 197.523 204.449 197.675 204.435 197.825C204.422 197.976 204.377 198.122 204.302 198.253Z", "fill", "#11142D"], ["d", "M203.959 200.488C203.899 199.827 202.828 199.39 202.828 199.39C202.828 199.39 201.855 200.02 201.915 200.677C201.904 200.828 201.926 200.98 201.979 201.122C202.032 201.264 202.116 201.393 202.224 201.499C202.333 201.605 202.463 201.686 202.605 201.737C202.748 201.788 202.9 201.807 203.051 201.792C203.202 201.778 203.348 201.731 203.479 201.655C203.61 201.578 203.722 201.474 203.809 201.349C203.895 201.225 203.954 201.083 203.98 200.933C204.005 200.784 203.999 200.63 203.959 200.484V200.488Z", "fill", "#11142D"], ["d", "M201.139 167.672C201.645 168.101 201.397 169.234 201.397 169.234C201.397 169.234 200.325 169.663 199.815 169.234C199.686 169.157 199.575 169.052 199.49 168.927C199.405 168.802 199.348 168.661 199.323 168.512C199.298 168.363 199.306 168.21 199.345 168.064C199.385 167.919 199.456 167.784 199.553 167.668C199.651 167.552 199.772 167.459 199.908 167.395C200.045 167.331 200.194 167.298 200.344 167.297C200.495 167.296 200.644 167.328 200.782 167.391C200.919 167.453 201.041 167.545 201.139 167.659V167.672Z", "fill", "#11142D"], ["d", "M203.427 169.38C202.905 169.809 201.85 169.311 201.85 169.311C201.85 169.311 201.64 168.17 202.163 167.758C202.267 167.653 202.391 167.572 202.529 167.519C202.666 167.466 202.813 167.443 202.96 167.451C203.107 167.459 203.251 167.498 203.381 167.566C203.512 167.634 203.627 167.728 203.718 167.844C203.81 167.959 203.876 168.093 203.912 168.235C203.948 168.378 203.954 168.527 203.928 168.672C203.903 168.817 203.847 168.955 203.764 169.077C203.682 169.199 203.574 169.302 203.449 169.38H203.427Z", "fill", "#11142D"], ["d", "M201.996 171.113C202.288 170.512 201.602 169.581 201.602 169.581C201.602 169.581 200.441 169.611 200.149 170.208C200.062 170.331 200.003 170.472 199.976 170.62C199.949 170.768 199.954 170.921 199.992 171.067C200.029 171.213 200.098 171.35 200.193 171.467C200.288 171.584 200.407 171.678 200.543 171.745C200.678 171.811 200.826 171.847 200.977 171.851C201.127 171.854 201.277 171.825 201.415 171.765C201.553 171.705 201.677 171.615 201.777 171.503C201.878 171.39 201.952 171.257 201.996 171.113Z", "fill", "#11142D"], ["d", "M179.338 117.492C179.848 117.921 179.595 119.053 179.595 119.053C179.595 119.053 178.523 119.482 178.018 119.053C177.89 118.976 177.78 118.871 177.697 118.747C177.613 118.623 177.557 118.482 177.533 118.334C177.509 118.186 177.517 118.035 177.557 117.891C177.596 117.746 177.667 117.612 177.763 117.498C177.859 117.383 177.979 117.291 178.115 117.227C178.25 117.163 178.397 117.129 178.547 117.128C178.697 117.127 178.845 117.158 178.981 117.219C179.118 117.28 179.239 117.37 179.338 117.483V117.492Z", "fill", "#11142D"], ["d", "M181.627 119.199C181.104 119.629 180.046 119.127 180.046 119.127C180.046 119.127 179.84 117.985 180.363 117.578C180.465 117.466 180.591 117.379 180.73 117.321C180.87 117.263 181.02 117.236 181.171 117.242C181.322 117.248 181.47 117.287 181.605 117.356C181.739 117.425 181.857 117.523 181.95 117.642C182.043 117.762 182.109 117.9 182.143 118.047C182.178 118.195 182.179 118.348 182.149 118.496C182.118 118.644 182.055 118.784 181.965 118.905C181.875 119.027 181.76 119.127 181.627 119.199Z", "fill", "#11142D"], ["d", "M180.169 120.928C180.461 120.332 179.775 119.396 179.775 119.396C179.775 119.396 178.618 119.431 178.326 120.027C178.242 120.15 178.184 120.29 178.158 120.437C178.132 120.585 178.139 120.736 178.176 120.88C178.214 121.025 178.283 121.16 178.377 121.275C178.472 121.391 178.59 121.485 178.725 121.551C178.859 121.616 179.006 121.652 179.155 121.656C179.304 121.659 179.452 121.63 179.59 121.571C179.727 121.512 179.85 121.424 179.95 121.313C180.05 121.202 180.125 121.071 180.169 120.928Z", "fill", "#11142D"], ["d", "M182.599 126.661C182.951 126.099 184.108 126.184 184.108 126.184C184.108 126.184 184.695 127.184 184.343 127.746C184.284 127.882 184.195 128.004 184.084 128.103C183.973 128.201 183.842 128.275 183.701 128.319C183.559 128.363 183.409 128.376 183.262 128.357C183.115 128.338 182.973 128.287 182.847 128.209C182.721 128.13 182.613 128.026 182.531 127.902C182.449 127.778 182.394 127.638 182.371 127.491C182.347 127.345 182.355 127.194 182.395 127.051C182.434 126.908 182.504 126.775 182.599 126.661Z", "fill", "#11142D"], ["d", "M183.963 124.151C184.443 124.61 184.117 125.726 184.117 125.726C184.117 125.726 183.02 126.095 182.54 125.636C182.416 125.55 182.311 125.439 182.234 125.309C182.157 125.178 182.109 125.033 182.093 124.883C182.078 124.732 182.095 124.58 182.145 124.437C182.194 124.294 182.273 124.163 182.378 124.054C182.482 123.945 182.61 123.86 182.75 123.805C182.891 123.75 183.042 123.726 183.193 123.735C183.344 123.745 183.491 123.787 183.624 123.858C183.757 123.93 183.872 124.03 183.963 124.151Z", "fill", "#11142D"], ["d", "M185.883 125.344C185.253 125.142 184.426 125.957 184.426 125.957C184.426 125.957 184.623 127.099 185.253 127.304C185.387 127.372 185.535 127.41 185.685 127.416C185.836 127.421 185.985 127.394 186.124 127.336C186.263 127.278 186.387 127.19 186.489 127.079C186.591 126.968 186.668 126.837 186.714 126.693C186.76 126.55 186.774 126.398 186.756 126.248C186.738 126.099 186.688 125.955 186.609 125.827C186.53 125.698 186.424 125.589 186.299 125.505C186.174 125.422 186.032 125.367 185.883 125.344Z", "fill", "#11142D"], ["d", "M193.361 123.455C193.056 124.047 191.895 124.052 191.895 124.052C191.895 124.052 191.231 123.103 191.535 122.511C191.581 122.367 191.659 122.235 191.761 122.124C191.864 122.013 191.989 121.925 192.129 121.868C192.269 121.81 192.419 121.784 192.571 121.79C192.722 121.797 192.869 121.836 193.004 121.905C193.138 121.975 193.256 122.073 193.348 122.192C193.441 122.312 193.507 122.45 193.541 122.598C193.575 122.745 193.576 122.898 193.545 123.046C193.514 123.194 193.451 123.334 193.361 123.455Z", "fill", "#11142D"], ["d", "M192.2 126.064C191.685 125.635 191.921 124.507 191.921 124.507C191.921 124.507 192.988 124.052 193.498 124.472C193.634 124.544 193.752 124.646 193.844 124.769C193.936 124.892 193.999 125.034 194.03 125.185C194.061 125.335 194.058 125.491 194.021 125.64C193.985 125.79 193.916 125.929 193.819 126.049C193.723 126.168 193.601 126.265 193.463 126.332C193.324 126.399 193.173 126.434 193.02 126.436C192.866 126.437 192.714 126.405 192.575 126.34C192.435 126.276 192.311 126.182 192.213 126.064H192.2Z", "fill", "#11142D"], ["d", "M190.193 125.026C190.836 125.18 191.599 124.305 191.599 124.305C191.599 124.305 191.307 123.181 190.665 123.018C190.526 122.963 190.377 122.938 190.229 122.946C190.08 122.953 189.934 122.993 189.802 123.062C189.67 123.131 189.554 123.227 189.463 123.345C189.371 123.463 189.306 123.599 189.272 123.744C189.238 123.889 189.235 124.04 189.264 124.186C189.294 124.333 189.354 124.471 189.441 124.592C189.529 124.713 189.641 124.813 189.771 124.887C189.901 124.96 190.045 125.005 190.193 125.017V125.026Z", "fill", "#11142D"], ["d", "M201.842 129.106C201.323 129.535 200.264 129.055 200.264 129.055C200.264 129.055 200.042 127.918 200.56 127.502C200.662 127.394 200.786 127.309 200.923 127.253C201.06 127.197 201.208 127.172 201.356 127.178C201.504 127.184 201.649 127.221 201.781 127.288C201.914 127.355 202.03 127.45 202.123 127.565C202.215 127.681 202.282 127.815 202.319 127.959C202.355 128.103 202.361 128.253 202.334 128.399C202.308 128.545 202.251 128.684 202.167 128.806C202.082 128.928 201.973 129.03 201.846 129.106H201.842Z", "fill", "#11142D"], ["d", "M199.725 131.02C199.425 130.428 200.102 129.484 200.102 129.484C200.102 129.484 201.259 129.484 201.559 130.094C201.649 130.216 201.711 130.356 201.74 130.504C201.77 130.653 201.767 130.806 201.732 130.953C201.697 131.1 201.63 131.238 201.536 131.357C201.442 131.476 201.323 131.572 201.188 131.641C201.053 131.709 200.905 131.747 200.754 131.752C200.603 131.757 200.453 131.729 200.313 131.67C200.174 131.611 200.049 131.522 199.948 131.41C199.846 131.298 199.77 131.165 199.725 131.02Z", "fill", "#11142D"], ["d", "M198.31 129.257C198.837 129.656 199.887 129.167 199.887 129.167C199.887 129.167 200.08 128.021 199.553 127.618C199.449 127.508 199.322 127.423 199.182 127.367C199.042 127.311 198.891 127.286 198.74 127.295C198.589 127.303 198.442 127.344 198.309 127.415C198.175 127.486 198.059 127.585 197.968 127.705C197.876 127.826 197.812 127.964 197.78 128.112C197.748 128.26 197.748 128.413 197.78 128.56C197.813 128.708 197.877 128.847 197.969 128.967C198.06 129.087 198.176 129.186 198.31 129.257Z", "fill", "#11142D"], ["d", "M208.52 142.087C208.002 142.516 206.939 142.039 206.939 142.039C206.939 142.039 206.72 140.898 207.234 140.482C207.335 140.369 207.459 140.28 207.598 140.22C207.737 140.16 207.887 140.131 208.039 140.135C208.19 140.139 208.338 140.176 208.473 140.244C208.609 140.311 208.728 140.407 208.823 140.525C208.917 140.643 208.985 140.78 209.021 140.927C209.058 141.074 209.061 141.227 209.033 141.376C209.004 141.524 208.943 141.665 208.855 141.788C208.766 141.91 208.652 142.012 208.52 142.087Z", "fill", "#11142D"], ["d", "M206.403 144C206.103 143.408 206.776 142.464 206.776 142.464C206.776 142.464 207.938 142.464 208.233 143.073C208.32 143.195 208.379 143.334 208.407 143.481C208.435 143.628 208.431 143.779 208.395 143.924C208.36 144.069 208.293 144.205 208.2 144.322C208.107 144.439 207.99 144.535 207.857 144.602C207.723 144.67 207.577 144.707 207.428 144.713C207.279 144.719 207.13 144.692 206.992 144.635C206.854 144.578 206.73 144.491 206.628 144.382C206.527 144.272 206.45 144.142 206.403 144Z", "fill", "#11142D"], ["d", "M204.997 142.24C205.525 142.639 206.575 142.15 206.575 142.15C206.575 142.15 206.767 141.005 206.24 140.601C206.136 140.492 206.01 140.406 205.87 140.35C205.729 140.294 205.578 140.27 205.428 140.278C205.277 140.286 205.13 140.327 204.996 140.398C204.863 140.469 204.747 140.568 204.655 140.689C204.564 140.809 204.5 140.948 204.468 141.095C204.435 141.243 204.435 141.396 204.468 141.544C204.5 141.691 204.565 141.83 204.656 141.95C204.747 142.071 204.864 142.17 204.997 142.24Z", "fill", "#11142D"], ["d", "M192.16 132.213C192.589 131.703 193.72 131.947 193.72 131.947C193.72 131.947 194.149 133.02 193.72 133.531C193.644 133.661 193.54 133.774 193.416 133.861C193.291 133.947 193.15 134.006 193.001 134.032C192.851 134.058 192.698 134.051 192.552 134.012C192.406 133.973 192.27 133.903 192.154 133.806C192.037 133.708 191.944 133.587 191.879 133.45C191.814 133.313 191.78 133.163 191.779 133.012C191.778 132.86 191.81 132.71 191.873 132.572C191.936 132.434 192.028 132.312 192.143 132.213H192.16Z", "fill", "#11142D"], ["d", "M193.854 129.918C194.283 130.437 193.79 131.497 193.79 131.497C193.79 131.497 192.65 131.711 192.239 131.188C192.132 131.085 192.048 130.96 191.993 130.822C191.939 130.684 191.914 130.536 191.921 130.388C191.928 130.239 191.967 130.094 192.034 129.962C192.102 129.83 192.197 129.714 192.313 129.621C192.429 129.529 192.563 129.462 192.707 129.426C192.851 129.39 193.001 129.385 193.147 129.411C193.293 129.438 193.431 129.495 193.553 129.579C193.675 129.664 193.778 129.773 193.854 129.901V129.918Z", "fill", "#11142D"], ["d", "M195.594 131.364C194.994 131.076 194.064 131.767 194.064 131.767C194.064 131.767 194.103 132.93 194.699 133.218C194.822 133.304 194.963 133.362 195.111 133.389C195.26 133.415 195.412 133.409 195.558 133.371C195.704 133.333 195.839 133.264 195.956 133.168C196.072 133.072 196.167 132.952 196.232 132.817C196.298 132.681 196.333 132.532 196.336 132.381C196.339 132.231 196.309 132.081 196.248 131.943C196.187 131.805 196.098 131.682 195.985 131.582C195.872 131.482 195.739 131.407 195.594 131.364Z", "fill", "#11142D"], ["d", "M203.611 151.989C204.04 151.479 205.171 151.728 205.171 151.728C205.171 151.728 205.6 152.796 205.171 153.307C205.095 153.438 204.991 153.55 204.867 153.637C204.743 153.723 204.601 153.782 204.452 153.808C204.303 153.834 204.15 153.828 204.003 153.788C203.857 153.749 203.721 153.679 203.605 153.582C203.488 153.485 203.395 153.363 203.33 153.226C203.265 153.089 203.231 152.94 203.23 152.788C203.229 152.636 203.262 152.486 203.324 152.348C203.387 152.211 203.479 152.088 203.594 151.989H203.611Z", "fill", "#11142D"], ["d", "M205.309 149.693C205.738 150.217 205.245 151.277 205.245 151.277C205.245 151.277 204.105 151.487 203.698 150.968C203.589 150.865 203.503 150.741 203.447 150.602C203.39 150.464 203.364 150.315 203.37 150.166C203.376 150.016 203.414 149.87 203.481 149.737C203.549 149.603 203.644 149.486 203.761 149.393C203.878 149.299 204.013 149.232 204.158 149.196C204.303 149.16 204.454 149.155 204.601 149.183C204.747 149.21 204.887 149.268 205.009 149.354C205.131 149.44 205.234 149.552 205.309 149.681V149.693Z", "fill", "#11142D"], ["d", "M207.046 151.144C206.45 150.852 205.516 151.547 205.516 151.547C205.516 151.547 205.554 152.706 206.15 152.993C206.273 153.077 206.413 153.133 206.559 153.157C206.706 153.182 206.856 153.175 207 153.136C207.144 153.098 207.278 153.029 207.392 152.934C207.507 152.839 207.6 152.72 207.665 152.586C207.73 152.452 207.765 152.306 207.768 152.157C207.772 152.008 207.743 151.86 207.684 151.723C207.626 151.587 207.538 151.464 207.428 151.364C207.318 151.264 207.187 151.189 207.046 151.144Z", "fill", "#11142D"], ["d", "M197.733 138.379C198.38 138.229 199.13 139.113 199.13 139.113C199.13 139.113 198.838 140.233 198.191 140.4C198.051 140.459 197.9 140.486 197.749 140.479C197.597 140.473 197.449 140.434 197.314 140.364C197.18 140.295 197.062 140.197 196.969 140.077C196.876 139.957 196.81 139.818 196.776 139.671C196.742 139.523 196.741 139.369 196.773 139.221C196.804 139.072 196.868 138.933 196.959 138.811C197.05 138.69 197.166 138.59 197.3 138.518C197.434 138.447 197.581 138.405 197.733 138.397V138.379Z", "fill", "#11142D"], ["d", "M200.471 137.576C200.471 138.241 199.464 138.799 199.464 138.799C199.464 138.799 198.427 138.276 198.414 137.615C198.388 137.466 198.394 137.314 198.433 137.168C198.471 137.023 198.54 136.887 198.636 136.771C198.731 136.654 198.851 136.56 198.986 136.495C199.122 136.429 199.27 136.394 199.42 136.391C199.571 136.388 199.72 136.418 199.858 136.478C199.996 136.539 200.119 136.628 200.219 136.741C200.319 136.854 200.393 136.987 200.437 137.131C200.48 137.275 200.492 137.427 200.471 137.576Z", "fill", "#11142D"], ["d", "M200.977 139.782C200.673 139.19 199.516 139.177 199.516 139.177C199.516 139.177 198.843 140.125 199.147 140.717C199.193 140.861 199.27 140.994 199.372 141.106C199.474 141.217 199.599 141.305 199.739 141.364C199.878 141.422 200.029 141.449 200.18 141.444C200.331 141.438 200.479 141.399 200.613 141.33C200.748 141.261 200.866 141.164 200.959 141.045C201.053 140.926 201.119 140.788 201.154 140.64C201.188 140.493 201.191 140.34 201.16 140.192C201.13 140.043 201.067 139.903 200.977 139.782Z", "fill", "#11142D"], ["d", "M227.355 152.539C226.738 152.787 225.855 152.037 225.855 152.037C225.855 152.037 225.971 150.882 226.584 150.633C226.713 150.554 226.858 150.503 227.008 150.485C227.159 150.467 227.311 150.482 227.455 150.529C227.599 150.576 227.732 150.654 227.842 150.758C227.953 150.861 228.04 150.988 228.097 151.128C228.154 151.269 228.18 151.42 228.172 151.572C228.164 151.724 228.124 151.872 228.053 152.006C227.983 152.14 227.884 152.257 227.763 152.349C227.643 152.441 227.504 152.506 227.355 152.539Z", "fill", "#11142D"], ["d", "M224.78 153.744C224.66 153.092 225.578 152.38 225.578 152.38C225.578 152.38 226.683 152.732 226.799 153.384C226.847 153.526 226.864 153.676 226.849 153.825C226.834 153.974 226.786 154.117 226.711 154.246C226.635 154.375 226.532 154.486 226.409 154.572C226.286 154.657 226.146 154.715 225.999 154.741C225.852 154.767 225.701 154.761 225.556 154.724C225.412 154.686 225.277 154.618 225.161 154.523C225.045 154.428 224.951 154.31 224.886 154.175C224.82 154.041 224.784 153.894 224.78 153.744Z", "fill", "#11142D"], ["d", "M223.931 151.646C224.321 152.183 225.466 152.015 225.466 152.015C225.466 152.015 225.98 150.973 225.59 150.436C225.521 150.304 225.424 150.189 225.306 150.098C225.188 150.006 225.052 149.942 224.907 149.908C224.762 149.874 224.611 149.872 224.465 149.902C224.319 149.931 224.182 149.992 224.061 150.08C223.941 150.168 223.841 150.281 223.768 150.411C223.695 150.541 223.651 150.685 223.638 150.833C223.626 150.982 223.646 151.132 223.696 151.272C223.747 151.412 223.827 151.54 223.931 151.646Z", "fill", "#11142D"], ["d", "M221.625 160.099C220.986 159.919 220.742 158.786 220.742 158.786C220.742 158.786 221.535 157.928 222.178 158.117C222.328 158.134 222.473 158.183 222.602 158.261C222.731 158.339 222.841 158.445 222.926 158.57C223.01 158.695 223.067 158.837 223.091 158.986C223.115 159.135 223.106 159.288 223.066 159.434C223.025 159.579 222.954 159.714 222.856 159.829C222.758 159.944 222.636 160.037 222.499 160.1C222.362 160.163 222.213 160.196 222.062 160.196C221.911 160.196 221.762 160.163 221.625 160.099Z", "fill", "#11142D"], ["d", "M218.839 159.494C219.144 158.907 220.301 158.902 220.301 158.902C220.301 158.902 220.965 159.855 220.661 160.443C220.612 160.583 220.533 160.712 220.43 160.819C220.327 160.927 220.202 161.011 220.064 161.066C219.926 161.12 219.777 161.145 219.629 161.137C219.48 161.13 219.335 161.09 219.203 161.022C219.071 160.953 218.956 160.857 218.864 160.739C218.773 160.622 218.707 160.486 218.673 160.341C218.638 160.196 218.635 160.046 218.664 159.9C218.693 159.754 218.753 159.615 218.839 159.494Z", "fill", "#11142D"], ["d", "M219.444 157.314C219.444 157.979 220.438 158.541 220.438 158.541C220.438 158.541 221.48 158.03 221.497 157.37C221.526 157.221 221.523 157.067 221.487 156.92C221.451 156.773 221.383 156.635 221.289 156.517C221.194 156.398 221.075 156.302 220.939 156.234C220.803 156.167 220.655 156.129 220.503 156.125C220.352 156.121 220.201 156.15 220.062 156.21C219.923 156.27 219.799 156.36 219.698 156.473C219.597 156.587 219.522 156.72 219.478 156.866C219.434 157.011 219.423 157.164 219.444 157.314Z", "fill", "#11142D"], ["d", "M217.095 152.749C217.052 153.414 215.998 153.89 215.998 153.89C215.998 153.89 215.004 153.289 215.042 152.629C215.027 152.478 215.045 152.327 215.094 152.184C215.143 152.041 215.222 151.911 215.327 151.802C215.431 151.693 215.558 151.608 215.698 151.553C215.838 151.497 215.989 151.473 216.139 151.482C216.29 151.491 216.437 151.532 216.57 151.604C216.703 151.675 216.818 151.774 216.909 151.894C217 152.015 217.064 152.154 217.096 152.301C217.128 152.449 217.128 152.601 217.095 152.749Z", "fill", "#11142D"], ["d", "M217.09 155.606C216.452 155.43 216.203 154.319 216.203 154.319C216.203 154.319 216.992 153.461 217.635 153.645C217.785 153.66 217.931 153.708 218.061 153.785C218.192 153.863 218.304 153.968 218.389 154.093C218.475 154.218 218.533 154.36 218.558 154.51C218.583 154.659 218.575 154.813 218.535 154.959C218.495 155.105 218.423 155.241 218.325 155.357C218.227 155.472 218.105 155.565 217.968 155.629C217.83 155.693 217.68 155.725 217.529 155.725C217.377 155.725 217.228 155.692 217.09 155.627V155.606Z", "fill", "#11142D"], ["d", "M214.854 155.473C215.506 155.349 215.844 154.242 215.844 154.242C215.844 154.242 215.124 153.328 214.473 153.452C214.321 153.455 214.173 153.491 214.037 153.558C213.901 153.625 213.781 153.72 213.686 153.838C213.59 153.955 213.522 154.092 213.485 154.239C213.448 154.386 213.443 154.539 213.471 154.688C213.499 154.837 213.56 154.978 213.648 155.101C213.736 155.224 213.849 155.327 213.981 155.402C214.113 155.476 214.259 155.521 214.41 155.534C214.56 155.546 214.712 155.525 214.854 155.473Z", "fill", "#11142D"], ["d", "M189.259 209.353H222.662C222.777 209.353 222.891 209.378 222.995 209.428C223.099 209.478 223.191 209.55 223.264 209.64C223.336 209.729 223.388 209.834 223.415 209.946C223.442 210.058 223.444 210.175 223.421 210.288L222.992 212.365C222.955 212.537 222.86 212.692 222.723 212.803C222.585 212.914 222.414 212.974 222.238 212.974H190.065C189.908 212.975 189.755 212.927 189.625 212.838C189.496 212.749 189.397 212.623 189.341 212.476L188.556 210.399C188.514 210.284 188.499 210.16 188.513 210.037C188.528 209.915 188.571 209.798 188.64 209.696C188.708 209.593 188.8 209.509 188.908 209.449C189.016 209.39 189.136 209.356 189.259 209.353Z", "fill", "#FAFAFC", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M191.909 216.247C192.282 216.247 220.435 212.974 220.435 212.974H191.57L191.909 216.247Z", "fill", "#11142D"], ["d", "M121.787 241.62L120.357 238H127.607C130.507 238 132.117 239.16 134.337 240.53C134.425 240.576 134.496 240.65 134.537 240.74C134.571 240.834 134.571 240.936 134.537 241.03C134.509 241.126 134.449 241.211 134.367 241.27C134.287 241.331 134.187 241.359 134.087 241.35L121.787 241.62Z", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M65.3021 81.6625L65.3142 81.6488L65.3254 81.6343C66.3964 80.236 68.2127 78.032 70.1491 75.9865C72.0577 73.9701 74.0279 72.1679 75.4984 71.4002H76.0185H76.0988L76.1751 71.375L78.1751 70.715L78.288 70.6778L78.372 70.5938C78.6914 70.2744 79.2018 69.7863 79.6901 69.3814C79.9353 69.1781 80.1645 69.0044 80.3551 68.8843C80.4288 68.8378 80.491 68.803 80.5416 68.7785C80.6054 68.8314 80.688 68.905 80.7897 69.0006C81.0488 69.2442 81.3997 69.6004 81.8178 70.0414C82.6521 70.9216 83.7338 72.119 84.843 73.3804C87.0726 75.916 89.3701 78.6615 90.0028 79.6081C90.6183 80.529 90.7357 81.0808 90.7347 81.5241C90.7342 81.7585 90.701 81.9793 90.6597 82.2535L90.6567 82.2737C90.6152 82.5497 90.5685 82.8693 90.5685 83.2402C90.5685 83.4219 90.5293 83.4901 90.5184 83.5056C90.5123 83.5141 90.5049 83.524 90.4693 83.5325C90.4245 83.5431 90.3519 83.5453 90.2555 83.5268C90.1616 83.5088 90.0692 83.4758 89.9979 83.4409L89.3803 83.1393L89.2834 83.8198L86.6834 102.09L86.6677 102.2L86.7004 102.307L88.7004 108.827L88.8622 109.354L89.3712 109.142L117.04 97.5817L119.87 103.242C112.091 107.244 96.434 115.328 92.8504 117.376L92.8433 117.38L92.8364 117.384C90.5259 118.806 87.9165 119.672 85.2142 119.912L84.813 119.948L84.7624 120.347L84.1578 125.12H56.4285C54.3846 125.12 52.805 124.806 51.669 124.414C50.6752 124.071 50.0444 123.678 49.7316 123.403C49.3924 112.438 52.0861 101.591 57.5178 92.0566C59.8162 88.3796 62.4202 84.9026 65.3021 81.6625Z", "fill", "white", "stroke", "#11142D"], ["d", "M84.0864 88.5105C84.6064 92.1305 88.9764 109.07 88.9764 109.07L127.616 92.6505L131.766 97.8405C131.766 97.8405 106.366 111.84 90.8164 119.05C75.2664 126.26 72.6764 107.67 69.5664 86.9805", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M91.2981 80.2404L90.8681 84.0304C90.8541 84.1172 90.8198 84.1994 90.7681 84.2704C90.7155 84.3393 90.6469 84.3942 90.5681 84.4304C90.4833 84.4554 90.393 84.4554 90.3081 84.4304C90.2217 84.4218 90.1389 84.3908 90.0681 84.3404L89.8381 84.1704L89.9381 82.7204C90.0401 81.495 89.7976 80.2654 89.2381 79.1704C88.6877 78.0695 87.8476 77.1395 86.8081 76.4804L78.3281 71.0904C78.0141 70.9059 77.6781 70.7614 77.3281 70.6604L79.2481 68.5504C79.3869 68.3914 79.5618 68.2679 79.7581 68.1904C79.9508 68.109 80.1591 68.0714 80.3681 68.0804C80.5762 68.0806 80.7815 68.1285 80.9681 68.2204C81.1581 68.3129 81.3254 68.446 81.4581 68.6104L91.2981 80.2404Z", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M77.3574 70.6611C77.7074 70.7621 78.0434 70.9066 78.3574 71.0911L86.8474 76.4911C87.8862 77.1467 88.7264 78.0733 89.2774 79.1711C89.827 80.2732 90.0688 81.5031 89.9774 82.7311L89.8674 84.1711", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M89.867 84.1904L87.457 102.87", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M49.3568 124.461C47.0868 98.051 65.8768 78.591 73.8768 71.461C74.3383 71.0382 74.901 70.7415 75.5106 70.5997C76.1202 70.4578 76.756 70.4755 77.3568 70.651", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M85.6676 63.7425C85.6964 63.8205 85.7245 63.8928 85.7512 63.9589C84.2712 64.6793 82.8481 64.6447 81.6181 64.076C80.2622 63.4491 79.089 62.1471 78.3504 60.3601C77.6611 58.6925 78.0293 56.166 79.6543 53.7285C81.2654 51.3119 84.0778 49.0477 88.1298 47.9435C92.1477 46.8486 95.062 47.7969 96.9607 49.4108C98.7869 50.9631 99.6984 53.1492 99.748 54.8385C98.7259 55.4678 97.7939 56.2335 96.9776 57.1147C96.5367 57.5565 96.0108 57.9043 95.4317 58.1372L95.4317 58.1372L95.4246 58.1401C94.855 58.3795 94.2423 58.4989 93.6246 58.4911L93.3247 58.4874L93.1801 58.7502C92.5799 59.842 91.5832 60.9579 90.7979 61.6135C90.6886 61.7048 90.5858 61.785 90.4911 61.8537C90.5507 61.503 90.5761 61.1054 90.5642 60.7054C90.5466 60.1191 90.4475 59.4827 90.2242 58.9417C90.0038 58.4074 89.6265 57.8864 89.0079 57.6918C88.3846 57.4957 87.6812 57.6822 86.9299 58.1858C85.3313 59.2573 85.1173 60.8827 85.272 62.1456C85.3493 62.7772 85.5192 63.3401 85.6676 63.7425ZM90.0155 62.1259C90.0155 62.1259 90.0163 62.1257 90.0178 62.1255C90.0177 62.1255 90.0177 62.1255 90.0177 62.1255C90.0162 62.1258 90.0155 62.1259 90.0155 62.1259Z", "fill", "#11142D", "stroke", "#11142D"], ["d", "M86.9483 46.7433L86.9483 46.7433L86.9451 46.7453L82.5692 49.4453C81.0452 48.0915 79.0811 47.3274 77.0341 47.3009L77.0341 47.3007L77.02 47.3009C76.3658 47.3109 75.661 46.9918 75.0632 46.4133C74.4686 45.8378 74.0162 45.0378 73.857 44.1649C73.6993 43.2995 73.8288 42.3616 74.3964 41.4805C74.9666 40.5956 76.0041 39.7298 77.727 39.0675L77.7277 39.0673C80.622 37.9501 82.9319 38.6105 84.6148 39.9429C86.3247 41.2967 87.3973 43.3568 87.7168 45.0059L87.7169 45.0065C87.7818 45.3398 87.743 45.6851 87.6055 45.9957C87.4681 46.3063 87.2387 46.5672 86.9483 46.7433Z", "fill", "#11142D", "stroke", "#11142D"], ["d", "M88.0078 68.0905C88.0078 68.0905 94.3378 73.8805 95.6678 73.0905C96.9978 72.3005 98.7578 66.8605 98.7578 66.8605C99.4832 66.9593 100.221 66.9117 100.928 66.7205C101.598 66.3705 99.7378 63.6205 99.8578 61.4905C99.9778 59.3605 100.598 56.5705 99.9278 55.2705", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M80.9375 68.331C82.3296 67.0375 83.58 65.5994 84.6675 64.041", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M91.7681 71.2109C91.7681 71.2109 88.1382 75.4409 88.1682 77.0909", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M99.9472 55.291C99.5872 56.911 96.7472 60.291 94.1172 59.971", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M83.1464 50.8005C82.3164 50.0005 79.8464 48.1105 77.7064 48.5505C75.5664 48.9905 75.0664 47.9805 75.0664 47.9805", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M117.178 97.0703L120.688 103.8", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M128.088 93.171C128.547 91.9896 129.159 90.8734 129.908 89.851C130.338 89.461 131.588 89.851 132.418 90.281C132.498 90.3101 132.568 90.3623 132.618 90.431C132.659 90.5017 132.686 90.5798 132.698 90.661C132.707 90.7475 132.689 90.8346 132.648 90.911C132.615 90.989 132.559 91.0552 132.488 91.101L131.188 91.931C131.188 91.931 131.188 93.281 132.128 93.331C132.808 93.331 137.028 91.261 139.308 90.081C139.359 90.0609 139.416 90.0609 139.468 90.081C139.521 90.0989 139.569 90.1298 139.608 90.171C139.621 90.2235 139.621 90.2785 139.608 90.331C139.602 90.3873 139.577 90.4399 139.538 90.481C137.278 92.591 134.778 95.671 131.158 97.351", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M131.874 92.1349L144.089 86.3957L144.138 86.4038L144.321 86.9437C144.326 86.9611 144.328 86.9793 144.327 86.9972C144.321 87.0026 144.315 87.0072 144.308 87.0107L132.205 92.7973L131.874 92.1349Z", "fill", "#11142D", "stroke", "#11142D"], ["d", "M69.6966 92.5567C70.0367 94.3817 70.4573 96.5551 70.9326 98.8387C71.5667 101.885 72.2991 105.132 73.0689 108.012C73.8343 110.876 74.6455 113.411 75.4457 115.023C76.2564 116.849 77.5813 118.398 79.2586 119.483C80.7833 120.469 82.539 121.032 84.346 121.119L84.1172 123.365C80.1831 123.243 77.3178 121.136 75.2096 117.94C73.0102 114.605 71.6614 110.114 70.8493 105.568C70.0387 101.03 69.7701 96.4822 69.705 93.0642C69.7017 92.8921 69.6989 92.7228 69.6966 92.5567Z", "fill", "#11142D", "stroke", "#11142D"], ["d", "M87.3668 99.419L87.2854 100.043L86.2597 96.0702L87.3668 99.419Z", "fill", "#11142D", "stroke", "#11142D"], ["d", "M81.7124 68.2881L82.3051 67.6867L84.7969 71.7489L81.7124 68.2881Z", "fill", "#11142D", "stroke", "#11142D"], ["d", "M61.431 129.861L87.7552 125.168L126.506 237.301H120.284L61.431 129.861Z", "fill", "#11142D", "stroke", "#11142D"], ["d", "M83.9668 211.321L85.3468 207.791L90.5768 207.851C93.4768 207.851 95.0868 209.011 97.3168 210.391C97.4057 210.436 97.4763 210.51 97.5164 210.602C97.5565 210.693 97.5637 210.795 97.5368 210.891C97.5264 210.941 97.5059 210.987 97.4767 211.029C97.4474 211.07 97.41 211.105 97.3668 211.131C97.2837 211.184 97.1853 211.209 97.0868 211.201L83.9668 211.321Z", "stroke", "#11142D", "stroke-miterlimit", "10"], ["id", "path-92-inside-1_8207_159526", "fill", "white"], ["d", "M95.7267 144.961C86.6167 147.321 73.5267 148.321 62.9467 145.141C54.1867 142.491 50.7567 133.961 49.1367 123.971C52.8167 126.531 63.5867 124.691 80.2467 124.331L117.247 124.761C118.431 124.78 119.593 125.081 120.637 125.641C122.206 126.493 123.411 127.889 124.024 129.566C124.637 131.244 124.617 133.087 123.967 134.751L91.9667 207.901L85.2667 207.791L104.567 141.481C101.785 143.075 98.7825 144.248 95.6567 144.961C86.5367 147.321 73.4467 148.321 62.8667 145.141", "fill", "#11142D"], ["d", "M62.9467 145.141L62.6572 146.098L62.6589 146.098L62.9467 145.141ZM49.1367 123.971L49.7078 123.15L47.7722 121.803L48.1496 124.131L49.1367 123.971ZM80.2467 124.331L80.2583 123.331L80.2417 123.331L80.2251 123.331L80.2467 124.331ZM117.247 124.761L117.263 123.761L117.258 123.761L117.247 124.761ZM120.637 125.641L121.114 124.762L121.109 124.759L120.637 125.641ZM123.967 134.751L124.883 135.151L124.891 135.133L124.898 135.115L123.967 134.751ZM91.9667 207.901L91.9503 208.901L92.616 208.912L92.8829 208.301L91.9667 207.901ZM85.2667 207.791L84.3066 207.511L83.9405 208.769L85.2503 208.791L85.2667 207.791ZM104.567 141.481L105.527 141.76L106.219 139.381L104.069 140.613L104.567 141.481ZM95.6567 144.961L95.4343 143.986L95.4202 143.989L95.4062 143.993L95.6567 144.961ZM95.4759 143.993C86.478 146.324 73.5845 147.294 63.2346 144.183L62.6589 146.098C73.4689 149.348 86.7555 148.318 95.9775 145.929L95.4759 143.993ZM63.2363 144.184C55.0858 141.718 51.7384 133.767 50.1238 123.811L48.1496 124.131C49.775 134.154 53.2877 143.263 62.6572 146.098L63.2363 144.184ZM48.5657 124.792C49.6985 125.58 51.2698 125.966 53.1061 126.152C54.9646 126.342 57.2327 126.338 59.8595 126.245C65.1851 126.057 71.9148 125.511 80.2683 125.33L80.2251 123.331C71.9186 123.51 64.9333 124.065 59.7889 124.246C57.1807 124.338 55.0251 124.337 53.3086 124.163C51.5699 123.986 50.4149 123.642 49.7078 123.15L48.5657 124.792ZM80.2351 125.331L117.235 125.761L117.258 123.761L80.2583 123.331L80.2351 125.331ZM117.231 125.761C118.255 125.777 119.261 126.038 120.164 126.522L121.109 124.759C119.925 124.125 118.606 123.782 117.263 123.761L117.231 125.761ZM120.16 126.52C121.515 127.255 122.555 128.461 123.085 129.909L124.963 129.223C124.266 127.317 122.898 125.73 121.114 124.762L120.16 126.52ZM123.085 129.909C123.614 131.358 123.597 132.95 123.035 134.387L124.898 135.115C125.637 133.224 125.66 131.129 124.963 129.223L123.085 129.909ZM123.051 134.35L91.0505 207.5L92.8829 208.301L124.883 135.151L123.051 134.35ZM91.9831 206.901L85.2831 206.791L85.2503 208.791L91.9503 208.901L91.9831 206.901ZM86.2269 208.07L105.527 141.76L103.607 141.201L84.3066 207.511L86.2269 208.07ZM104.069 140.613C101.374 142.158 98.4636 143.295 95.4343 143.986L95.8791 145.936C99.1013 145.201 102.197 143.992 105.064 142.348L104.069 140.613ZM95.4062 143.993C86.3979 146.324 73.5045 147.294 63.1546 144.183L62.5789 146.098C73.3889 149.348 86.6755 148.318 95.9072 145.929L95.4062 143.993Z", "fill", "#11142D", "mask", "url(#path-92-inside-1_8207_159526)"], ["d", "M97.3776 146.871H52.7076C52.354 146.87 52.0036 146.938 51.6766 147.073C51.3497 147.208 51.0526 147.406 50.8025 147.656C50.5525 147.906 50.3544 148.203 50.2197 148.53C50.085 148.857 50.0163 149.207 50.0176 149.561V150.561C50.0176 151.275 50.301 151.959 50.8055 152.463C51.3099 152.968 51.9942 153.251 52.7076 153.251H97.3776C98.091 153.251 98.7752 152.968 99.2797 152.463C99.7842 151.959 100.068 151.275 100.068 150.561V149.561C100.069 149.207 100 148.857 99.8655 148.53C99.7308 148.203 99.5327 147.906 99.2827 147.656C99.0326 147.406 98.7355 147.208 98.4086 147.073C98.0816 146.938 97.7312 146.87 97.3776 146.871Z", "fill", "white", "stroke", "#11142D", "stroke-width", "1.29", "stroke-miterlimit", "10"], ["d", "M58.0074 153.301L44.3574 241.371", "stroke", "#11142D", "stroke-width", "1.29", "stroke-miterlimit", "10"], ["d", "M93.5371 153.301L107.197 241.371", "stroke", "#11142D", "stroke-width", "1.29", "stroke-miterlimit", "10"], ["d", "M75.7773 153.44V241.37", "stroke", "#11142D", "stroke-width", "1.29", "stroke-miterlimit", "10"], ["d", "M49.6074 211.091L101.807 211.421", "stroke", "#11142D", "stroke-width", "1.29", "stroke-miterlimit", "10"], ["d", "M84.8976 120.631L84.5176 124.531", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M210.177 92.58C213.892 92.574 217.522 91.467 220.608 89.3987C223.694 87.3304 226.098 84.3938 227.516 80.9598C228.933 77.5259 229.301 73.7488 228.573 70.1059C227.844 66.463 226.052 63.1177 223.423 60.4929C220.794 57.868 217.446 56.0815 213.802 55.3589C210.158 54.6363 206.382 55.0101 202.95 56.4332C199.518 57.8562 196.585 60.2646 194.522 63.3539C192.459 66.4433 191.357 70.0749 191.357 73.79C191.363 78.777 193.348 83.5577 196.877 87.0813C200.406 90.6048 205.19 92.5826 210.177 92.58Z", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M210.178 61.0898V73.7898H221.978", "stroke", "#11142D", "stroke-miterlimit", "10"], [1, "w100", "modal_540_black", "cont-vert"], [1, "cont-vert", 2, "max-width", "360px"], [1, "margin-bottom10", 2, "color", "#fff", "text-align", "center"], ["xmlns", "http://www.w3.org/2000/svg", "width", "254", "height", "243", "viewBox", "0 0 254 243", "fill", "none"], ["id", "path-92-inside-1_7659_134277", "fill", "white"], ["d", "M62.9467 145.141L62.6572 146.098L62.6589 146.098L62.9467 145.141ZM49.1367 123.971L49.7078 123.15L47.7722 121.803L48.1496 124.131L49.1367 123.971ZM80.2467 124.331L80.2583 123.331L80.2417 123.331L80.2251 123.331L80.2467 124.331ZM117.247 124.761L117.263 123.761L117.258 123.761L117.247 124.761ZM120.637 125.641L121.114 124.762L121.109 124.759L120.637 125.641ZM123.967 134.751L124.883 135.151L124.891 135.133L124.898 135.115L123.967 134.751ZM91.9667 207.901L91.9503 208.901L92.616 208.912L92.8829 208.301L91.9667 207.901ZM85.2667 207.791L84.3066 207.511L83.9405 208.769L85.2503 208.791L85.2667 207.791ZM104.567 141.481L105.527 141.76L106.219 139.381L104.069 140.613L104.567 141.481ZM95.6567 144.961L95.4343 143.986L95.4202 143.989L95.4062 143.993L95.6567 144.961ZM95.4759 143.993C86.478 146.324 73.5845 147.294 63.2346 144.183L62.6589 146.098C73.4689 149.348 86.7555 148.318 95.9775 145.929L95.4759 143.993ZM63.2363 144.184C55.0858 141.718 51.7384 133.767 50.1238 123.811L48.1496 124.131C49.775 134.154 53.2877 143.263 62.6572 146.098L63.2363 144.184ZM48.5657 124.792C49.6985 125.58 51.2698 125.966 53.1061 126.152C54.9646 126.342 57.2327 126.338 59.8595 126.245C65.1851 126.057 71.9148 125.511 80.2683 125.33L80.2251 123.331C71.9186 123.51 64.9333 124.065 59.7889 124.246C57.1807 124.338 55.0251 124.337 53.3086 124.163C51.5699 123.986 50.4149 123.642 49.7078 123.15L48.5657 124.792ZM80.2351 125.331L117.235 125.761L117.258 123.761L80.2583 123.331L80.2351 125.331ZM117.231 125.761C118.255 125.777 119.261 126.038 120.164 126.522L121.109 124.759C119.925 124.125 118.606 123.782 117.263 123.761L117.231 125.761ZM120.16 126.52C121.515 127.255 122.555 128.461 123.085 129.909L124.963 129.223C124.266 127.317 122.898 125.73 121.114 124.762L120.16 126.52ZM123.085 129.909C123.614 131.358 123.597 132.95 123.035 134.387L124.898 135.115C125.637 133.224 125.66 131.129 124.963 129.223L123.085 129.909ZM123.051 134.35L91.0505 207.5L92.8829 208.301L124.883 135.151L123.051 134.35ZM91.9831 206.901L85.2831 206.791L85.2503 208.791L91.9503 208.901L91.9831 206.901ZM86.2269 208.07L105.527 141.76L103.607 141.201L84.3066 207.511L86.2269 208.07ZM104.069 140.613C101.374 142.158 98.4636 143.295 95.4343 143.986L95.8791 145.936C99.1013 145.201 102.197 143.992 105.064 142.348L104.069 140.613ZM95.4062 143.993C86.3979 146.324 73.5045 147.294 63.1546 144.183L62.5789 146.098C73.3889 149.348 86.6755 148.318 95.9072 145.929L95.4062 143.993Z", "fill", "#9196A4", "mask", "url(#path-92-inside-1_7659_134277)"], [1, "modal_540", "w100", "cont-vert"], ["id", "path-92-inside-1_6685_108195", "fill", "white"], ["d", "M62.9467 145.141L62.6572 146.098L62.6589 146.098L62.9467 145.141ZM49.1367 123.971L49.7078 123.15L47.7722 121.803L48.1496 124.131L49.1367 123.971ZM80.2467 124.331L80.2583 123.331L80.2417 123.331L80.2251 123.331L80.2467 124.331ZM117.247 124.761L117.263 123.761L117.258 123.761L117.247 124.761ZM120.637 125.641L121.114 124.762L121.109 124.759L120.637 125.641ZM123.967 134.751L124.883 135.151L124.891 135.133L124.898 135.115L123.967 134.751ZM91.9667 207.901L91.9503 208.901L92.616 208.912L92.8829 208.301L91.9667 207.901ZM85.2667 207.791L84.3066 207.511L83.9405 208.769L85.2503 208.791L85.2667 207.791ZM104.567 141.481L105.527 141.76L106.219 139.381L104.069 140.613L104.567 141.481ZM95.6567 144.961L95.4343 143.986L95.4202 143.989L95.4062 143.993L95.6567 144.961ZM95.4759 143.993C86.478 146.324 73.5845 147.294 63.2346 144.183L62.6589 146.098C73.4689 149.348 86.7555 148.318 95.9775 145.929L95.4759 143.993ZM63.2363 144.184C55.0858 141.718 51.7384 133.767 50.1238 123.811L48.1496 124.131C49.775 134.154 53.2877 143.263 62.6572 146.098L63.2363 144.184ZM48.5657 124.792C49.6985 125.58 51.2698 125.966 53.1061 126.152C54.9646 126.342 57.2327 126.338 59.8595 126.245C65.1851 126.057 71.9148 125.511 80.2683 125.33L80.2251 123.331C71.9186 123.51 64.9333 124.065 59.7889 124.246C57.1807 124.338 55.0251 124.337 53.3086 124.163C51.5699 123.986 50.4149 123.642 49.7078 123.15L48.5657 124.792ZM80.2351 125.331L117.235 125.761L117.258 123.761L80.2583 123.331L80.2351 125.331ZM117.231 125.761C118.255 125.777 119.261 126.038 120.164 126.522L121.109 124.759C119.925 124.125 118.606 123.782 117.263 123.761L117.231 125.761ZM120.16 126.52C121.515 127.255 122.555 128.461 123.085 129.909L124.963 129.223C124.266 127.317 122.898 125.73 121.114 124.762L120.16 126.52ZM123.085 129.909C123.614 131.358 123.597 132.95 123.035 134.387L124.898 135.115C125.637 133.224 125.66 131.129 124.963 129.223L123.085 129.909ZM123.051 134.35L91.0505 207.5L92.8829 208.301L124.883 135.151L123.051 134.35ZM91.9831 206.901L85.2831 206.791L85.2503 208.791L91.9503 208.901L91.9831 206.901ZM86.2269 208.07L105.527 141.76L103.607 141.201L84.3066 207.511L86.2269 208.07ZM104.069 140.613C101.374 142.158 98.4636 143.295 95.4343 143.986L95.8791 145.936C99.1013 145.201 102.197 143.992 105.064 142.348L104.069 140.613ZM95.4062 143.993C86.3979 146.324 73.5045 147.294 63.1546 144.183L62.5789 146.098C73.3889 149.348 86.6755 148.318 95.9072 145.929L95.4062 143.993Z", "fill", "#11142D", "mask", "url(#path-92-inside-1_6685_108195)"], ["xmlns", "http://www.w3.org/2000/svg", "width", "256", "height", "242", "viewBox", "0 0 256 242", "fill", "none", 1, "margin-bottom60"], ["clip-path", "url(#clip0_7659_134394)"], ["d", "M40.1289 92.7673L45.9489 95.1701C46.4016 95.356 46.9036 95.3839 47.374 95.2493C47.8444 95.1146 48.2558 94.8252 48.5418 94.4278L50.5732 91.5916C51.4587 90.3609 51.9975 88.9145 52.1332 87.4038V87.4038C52.1332 87.4038 52.849 82.5166 53.1447 78.8223", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M34.3453 112.191L43.0539 129.003L96.3896 121.67L97.0796 126.965L37.671 140.785C36.5011 141.06 35.2728 140.928 34.1873 140.412C33.1018 139.896 32.2236 139.026 31.6967 137.945L21.7539 117.937", "stroke", "#9196A4", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M53.1846 81.5844C54.5989 81.7517 55.6831 82.3567 55.516 83.7726C55.4343 84.2592 55.2147 84.712 54.8834 85.0772C54.552 85.4423 54.1228 85.7044 53.6469 85.8323C53.1711 85.9603 52.6684 85.9486 52.199 85.7987C51.7295 85.6488 51.3129 85.3671 50.9988 84.987C50.5775 84.478 50.3661 83.8274 50.4075 83.1677C50.5789 81.7517 51.7789 81.4171 53.1846 81.5844Z", "fill", "#21334E", "stroke", "#9196A4", "stroke-width", "0.87", "stroke-miterlimit", "10"], ["d", "M174.073 239.696V35.1548C174.072 25.8942 170.397 17.0132 163.857 10.465C157.316 3.91674 148.446 0.237466 139.196 0.236328H101.246", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M66.4688 10.4524H146.29L118.999 2.04241C109.928 -0.754537 100.213 -0.661528 91.1973 2.30849L66.4688 10.4524Z", "fill", "#9196A4"], ["d", "M234.03 241.484H195.768", "stroke", "#9196A4", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M193.428 212.989H222.288L219.416 241.467H195.639L193.428 212.989Z", "fill", "white", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M174.93 242.145C175.517 242.145 195.557 235.279 195.557 235.279L195.985 241.286L174.93 242.145Z", "fill", "#9196A4"], ["d", "M195.061 177.921L207.163 188.163C207.163 188.163 206.975 208.025 206.996 209.359", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M204.107 185.584L207.352 163.907L225.729 153.034", "stroke", "#9196A4", "stroke-miterlimit", "10", "stroke-linecap", "round"], ["d", "M201.03 178.084C200.601 178.603 199.479 178.389 199.479 178.389C199.479 178.389 199.007 177.329 199.418 176.806C199.494 176.677 199.596 176.565 199.719 176.479C199.841 176.393 199.98 176.335 200.127 176.308C200.274 176.28 200.425 176.285 200.57 176.321C200.714 176.357 200.85 176.424 200.967 176.518C201.083 176.611 201.179 176.728 201.246 176.862C201.314 176.995 201.352 177.141 201.358 177.291C201.364 177.44 201.337 177.589 201.281 177.727C201.224 177.866 201.139 177.99 201.03 178.093V178.084Z", "fill", "#9196A4"], ["d", "M199.394 180.44C198.965 179.929 199.394 178.856 199.394 178.856C199.394 178.856 200.529 178.612 200.954 179.122C201.067 179.222 201.157 179.345 201.218 179.482C201.28 179.62 201.31 179.769 201.308 179.92C201.307 180.071 201.272 180.219 201.207 180.355C201.142 180.491 201.049 180.612 200.933 180.708C200.817 180.804 200.682 180.875 200.537 180.914C200.391 180.953 200.239 180.96 200.091 180.934C199.942 180.909 199.801 180.851 199.677 180.766C199.553 180.681 199.449 180.569 199.372 180.44H199.394Z", "fill", "#9196A4"], ["d", "M197.622 179.019C198.226 179.294 199.139 178.59 199.139 178.59C199.139 178.59 199.071 177.432 198.466 177.157C198.341 177.075 198.199 177.021 198.051 176.999C197.903 176.977 197.752 176.987 197.608 177.028C197.464 177.07 197.33 177.142 197.217 177.24C197.103 177.338 197.012 177.46 196.95 177.596C196.887 177.732 196.855 177.881 196.855 178.031C196.856 178.181 196.888 178.329 196.951 178.465C197.013 178.602 197.104 178.723 197.218 178.821C197.332 178.919 197.465 178.991 197.609 179.032L197.622 179.019Z", "fill", "#9196A4"], ["d", "M193.165 174.63C193.663 175.059 193.384 176.196 193.384 176.196C193.384 176.196 192.3 176.625 191.803 176.166C191.678 176.084 191.572 175.976 191.493 175.85C191.414 175.724 191.363 175.582 191.343 175.434C191.323 175.286 191.336 175.136 191.379 174.993C191.423 174.851 191.497 174.719 191.596 174.608C191.695 174.496 191.816 174.407 191.953 174.347C192.089 174.287 192.237 174.257 192.386 174.259C192.535 174.261 192.681 174.295 192.816 174.359C192.95 174.423 193.07 174.515 193.165 174.63Z", "fill", "#9196A4"], ["d", "M195.408 176.397C194.876 176.792 193.831 176.286 193.831 176.286C193.831 176.286 193.655 175.14 194.186 174.745C194.292 174.64 194.419 174.56 194.559 174.508C194.698 174.457 194.847 174.436 194.995 174.447C195.144 174.459 195.288 174.502 195.418 174.574C195.548 174.646 195.661 174.745 195.75 174.865C195.838 174.985 195.9 175.122 195.931 175.268C195.962 175.413 195.961 175.564 195.929 175.709C195.896 175.855 195.833 175.991 195.743 176.11C195.653 176.229 195.539 176.327 195.408 176.397Z", "fill", "#9196A4"], ["d", "M193.907 178.088C194.216 177.5 193.551 176.548 193.551 176.548C193.551 176.548 192.394 176.548 192.086 177.14C191.999 177.261 191.939 177.399 191.91 177.545C191.881 177.691 191.884 177.842 191.919 177.987C191.953 178.132 192.019 178.267 192.11 178.385C192.202 178.502 192.317 178.598 192.449 178.667C192.581 178.736 192.726 178.775 192.875 178.783C193.023 178.79 193.172 178.766 193.31 178.711C193.448 178.656 193.573 178.572 193.676 178.465C193.779 178.357 193.858 178.229 193.907 178.088Z", "fill", "#9196A4"], ["d", "M197.352 185.108C197.734 184.563 198.882 184.713 198.882 184.713C198.882 184.713 199.414 185.743 199.032 186.288C198.965 186.421 198.871 186.539 198.754 186.632C198.638 186.725 198.503 186.792 198.359 186.829C198.214 186.865 198.064 186.87 197.917 186.843C197.771 186.816 197.632 186.758 197.51 186.672C197.388 186.586 197.286 186.475 197.211 186.347C197.135 186.218 197.089 186.074 197.074 185.926C197.059 185.778 197.076 185.628 197.124 185.487C197.172 185.346 197.25 185.216 197.352 185.108Z", "fill", "#9196A4"], ["d", "M198.848 182.675C199.302 183.16 198.916 184.254 198.916 184.254C198.916 184.254 197.802 184.563 197.348 184.078C197.232 183.985 197.137 183.868 197.07 183.735C197.003 183.602 196.965 183.456 196.96 183.307C196.954 183.159 196.981 183.01 197.037 182.872C197.094 182.735 197.179 182.611 197.288 182.509C197.397 182.407 197.526 182.33 197.667 182.283C197.808 182.236 197.958 182.22 198.106 182.235C198.254 182.251 198.397 182.299 198.525 182.374C198.653 182.45 198.763 182.553 198.848 182.675Z", "fill", "#9196A4"], ["d", "M200.7 183.971C200.083 183.735 199.213 184.503 199.213 184.503C199.213 184.503 199.346 185.653 199.967 185.893C200.098 185.969 200.243 186.016 200.394 186.03C200.544 186.045 200.696 186.026 200.838 185.976C200.981 185.925 201.111 185.845 201.219 185.739C201.327 185.634 201.411 185.506 201.465 185.364C201.519 185.223 201.541 185.072 201.531 184.921C201.521 184.77 201.477 184.623 201.405 184.49C201.332 184.358 201.231 184.243 201.109 184.153C200.988 184.063 200.848 184.001 200.7 183.971Z", "fill", "#9196A4"], ["d", "M209.953 180.088C209.293 180.011 208.877 178.925 208.877 178.925C208.877 178.925 209.533 177.968 210.188 178.045C210.34 178.037 210.491 178.063 210.631 178.119C210.772 178.176 210.899 178.262 211.002 178.373C211.106 178.483 211.185 178.615 211.232 178.759C211.28 178.903 211.295 179.056 211.278 179.206C211.261 179.357 211.211 179.502 211.131 179.631C211.052 179.761 210.946 179.871 210.82 179.955C210.694 180.039 210.551 180.094 210.401 180.117C210.251 180.14 210.098 180.13 209.953 180.088Z", "fill", "#9196A4"], ["d", "M207.107 179.925C207.317 179.294 208.461 179.109 208.461 179.109C208.461 179.109 209.262 179.968 209.052 180.577C209.026 180.724 208.969 180.863 208.884 180.986C208.799 181.109 208.689 181.212 208.561 181.288C208.433 181.364 208.29 181.412 208.141 181.428C207.993 181.443 207.843 181.427 207.702 181.38C207.561 181.332 207.431 181.255 207.322 181.153C207.214 181.051 207.128 180.927 207.071 180.789C207.015 180.651 206.989 180.502 206.995 180.353C207.001 180.204 207.039 180.058 207.107 179.925Z", "fill", "#9196A4"], ["d", "M207.363 177.676C207.449 178.337 208.537 178.736 208.537 178.736C208.537 178.736 209.484 178.066 209.394 177.41C209.397 177.261 209.367 177.113 209.307 176.977C209.247 176.841 209.158 176.719 209.047 176.62C208.936 176.521 208.805 176.447 208.663 176.403C208.521 176.36 208.371 176.347 208.223 176.366C208.076 176.385 207.934 176.436 207.808 176.515C207.682 176.594 207.574 176.699 207.492 176.823C207.41 176.948 207.356 177.088 207.333 177.235C207.31 177.382 207.319 177.533 207.359 177.676H207.363Z", "fill", "#9196A4"], ["d", "M210.874 168.24C210.218 168.163 209.803 167.077 209.803 167.077C209.803 167.077 210.454 166.121 211.114 166.198C211.265 166.19 211.416 166.216 211.557 166.273C211.697 166.33 211.823 166.417 211.927 166.527C212.03 166.638 212.108 166.77 212.155 166.914C212.202 167.058 212.218 167.211 212.2 167.361C212.182 167.512 212.132 167.656 212.053 167.785C211.973 167.915 211.867 168.025 211.741 168.108C211.615 168.192 211.472 168.247 211.322 168.27C211.172 168.293 211.019 168.283 210.874 168.24Z", "fill", "#9196A4"], ["d", "M208.029 168.078C208.239 167.447 209.383 167.263 209.383 167.263C209.383 167.263 210.184 168.121 209.974 168.73C209.948 168.877 209.891 169.017 209.806 169.139C209.721 169.262 209.611 169.365 209.483 169.441C209.355 169.517 209.212 169.565 209.063 169.581C208.915 169.597 208.765 169.58 208.624 169.533C208.483 169.486 208.353 169.408 208.244 169.306C208.135 169.204 208.05 169.08 207.993 168.942C207.937 168.804 207.911 168.655 207.917 168.506C207.923 168.357 207.961 168.211 208.029 168.078Z", "fill", "#9196A4"], ["d", "M208.285 165.851C208.371 166.512 209.459 166.911 209.459 166.911C209.459 166.911 210.406 166.246 210.316 165.585C210.318 165.436 210.288 165.288 210.229 165.152C210.169 165.016 210.08 164.894 209.969 164.795C209.858 164.696 209.727 164.622 209.585 164.578C209.442 164.534 209.293 164.522 209.145 164.541C208.998 164.56 208.856 164.611 208.73 164.69C208.604 164.769 208.496 164.874 208.414 164.998C208.332 165.122 208.278 165.263 208.255 165.41C208.232 165.557 208.241 165.707 208.281 165.851H208.285Z", "fill", "#9196A4"], ["d", "M211.509 188.806C210.892 189.051 210.018 188.291 210.018 188.291C210.018 188.291 210.138 187.137 210.755 186.892C210.884 186.815 211.029 186.766 211.18 186.75C211.33 186.734 211.482 186.751 211.625 186.8C211.768 186.848 211.899 186.928 212.008 187.032C212.118 187.136 212.203 187.263 212.259 187.404C212.314 187.545 212.339 187.696 212.33 187.847C212.321 187.998 212.28 188.146 212.208 188.279C212.137 188.412 212.037 188.529 211.917 188.62C211.796 188.711 211.657 188.774 211.509 188.806Z", "fill", "#9196A4"], ["d", "M208.923 190.008C208.812 189.351 209.733 188.647 209.733 188.647C209.733 188.647 210.835 189.008 210.946 189.664C210.993 189.806 211.008 189.957 210.991 190.105C210.974 190.253 210.925 190.396 210.848 190.524C210.771 190.652 210.667 190.761 210.544 190.845C210.421 190.929 210.281 190.985 210.134 191.01C209.987 191.035 209.836 191.028 209.692 190.99C209.548 190.951 209.414 190.882 209.299 190.787C209.184 190.691 209.091 190.573 209.026 190.438C208.962 190.304 208.926 190.157 208.923 190.008Z", "fill", "#9196A4"], ["d", "M208.092 187.901C208.478 188.441 209.626 188.283 209.626 188.283C209.626 188.283 210.149 187.244 209.759 186.708C209.692 186.574 209.597 186.456 209.48 186.362C209.363 186.269 209.227 186.201 209.081 186.165C208.936 186.129 208.785 186.125 208.637 186.153C208.49 186.181 208.351 186.241 208.229 186.328C208.107 186.416 208.006 186.528 207.931 186.658C207.857 186.789 207.812 186.934 207.799 187.083C207.786 187.232 207.805 187.383 207.856 187.524C207.907 187.665 207.987 187.794 208.092 187.901Z", "fill", "#9196A4"], ["d", "M203.317 197.998C203.973 198.101 204.35 199.195 204.35 199.195C204.35 199.195 203.665 200.13 203.009 200.032C202.858 200.034 202.708 200.003 202.57 199.941C202.432 199.879 202.309 199.788 202.21 199.674C202.11 199.56 202.037 199.426 201.995 199.28C201.952 199.135 201.942 198.982 201.965 198.832C201.988 198.683 202.043 198.54 202.126 198.414C202.209 198.287 202.319 198.181 202.448 198.101C202.577 198.022 202.721 197.972 202.871 197.954C203.021 197.936 203.174 197.951 203.317 197.998Z", "fill", "#9196A4"], ["d", "M206.159 198.263C205.923 198.886 204.775 199.027 204.775 199.027C204.775 199.027 204.003 198.169 204.235 197.538C204.265 197.39 204.326 197.25 204.415 197.129C204.505 197.007 204.619 196.906 204.751 196.833C204.883 196.759 205.029 196.716 205.18 196.705C205.33 196.694 205.481 196.716 205.622 196.769C205.764 196.822 205.891 196.905 205.997 197.013C206.103 197.121 206.185 197.25 206.236 197.392C206.287 197.534 206.306 197.686 206.293 197.836C206.28 197.987 206.234 198.132 206.159 198.263Z", "fill", "#9196A4"], ["d", "M205.817 200.499C205.757 199.838 204.685 199.4 204.685 199.4C204.685 199.4 203.712 200.031 203.772 200.688C203.761 200.839 203.783 200.991 203.836 201.133C203.89 201.275 203.974 201.403 204.082 201.51C204.19 201.616 204.32 201.697 204.463 201.748C204.606 201.799 204.758 201.817 204.909 201.803C205.06 201.789 205.206 201.742 205.336 201.665C205.467 201.589 205.58 201.485 205.666 201.36C205.753 201.235 205.811 201.093 205.837 200.944C205.863 200.794 205.856 200.641 205.817 200.495V200.499Z", "fill", "#9196A4"], ["d", "M202.997 167.683C203.503 168.112 203.254 169.245 203.254 169.245C203.254 169.245 202.182 169.674 201.672 169.245C201.543 169.167 201.432 169.063 201.347 168.938C201.262 168.813 201.205 168.671 201.18 168.522C201.155 168.373 201.163 168.221 201.203 168.075C201.243 167.93 201.314 167.794 201.411 167.679C201.508 167.563 201.629 167.47 201.766 167.406C201.902 167.342 202.051 167.308 202.202 167.308C202.353 167.307 202.502 167.339 202.639 167.401C202.776 167.464 202.898 167.556 202.997 167.67V167.683Z", "fill", "#9196A4"], ["d", "M205.285 169.39C204.762 169.819 203.708 169.322 203.708 169.322C203.708 169.322 203.498 168.18 204.021 167.768C204.124 167.664 204.249 167.582 204.386 167.529C204.524 167.477 204.671 167.453 204.818 167.462C204.964 167.47 205.108 167.509 205.239 167.577C205.369 167.644 205.484 167.739 205.576 167.854C205.667 167.97 205.733 168.103 205.769 168.246C205.806 168.389 205.811 168.538 205.786 168.683C205.76 168.828 205.704 168.966 205.622 169.088C205.539 169.21 205.432 169.313 205.306 169.39H205.285Z", "fill", "#9196A4"], ["d", "M203.854 171.124C204.145 170.523 203.46 169.592 203.46 169.592C203.46 169.592 202.298 169.622 202.007 170.218C201.92 170.342 201.861 170.482 201.834 170.631C201.806 170.779 201.812 170.932 201.849 171.078C201.886 171.224 201.955 171.36 202.05 171.477C202.145 171.594 202.265 171.689 202.4 171.756C202.535 171.822 202.683 171.858 202.834 171.862C202.985 171.865 203.134 171.836 203.273 171.776C203.411 171.715 203.534 171.626 203.635 171.513C203.735 171.401 203.81 171.268 203.854 171.124Z", "fill", "#9196A4"], ["d", "M181.195 117.502C181.705 117.931 181.452 119.064 181.452 119.064C181.452 119.064 180.381 119.493 179.875 119.064C179.747 118.986 179.638 118.882 179.554 118.758C179.471 118.633 179.415 118.493 179.391 118.345C179.366 118.197 179.374 118.046 179.414 117.901C179.454 117.757 179.524 117.623 179.621 117.508C179.717 117.394 179.837 117.302 179.972 117.238C180.107 117.174 180.255 117.14 180.404 117.139C180.554 117.137 180.702 117.168 180.838 117.23C180.975 117.291 181.097 117.381 181.195 117.494V117.502Z", "fill", "#9196A4"], ["d", "M183.485 119.21C182.962 119.639 181.903 119.137 181.903 119.137C181.903 119.137 181.697 117.996 182.22 117.588C182.323 117.477 182.448 117.389 182.588 117.331C182.727 117.273 182.878 117.247 183.029 117.253C183.18 117.259 183.328 117.298 183.462 117.367C183.597 117.436 183.714 117.534 183.807 117.653C183.9 117.772 183.966 117.911 184.001 118.058C184.035 118.205 184.037 118.358 184.006 118.506C183.975 118.655 183.913 118.794 183.823 118.916C183.733 119.037 183.617 119.138 183.485 119.21Z", "fill", "#9196A4"], ["d", "M182.027 120.939C182.318 120.343 181.632 119.407 181.632 119.407C181.632 119.407 180.475 119.442 180.184 120.038C180.099 120.161 180.042 120.301 180.016 120.448C179.99 120.595 179.996 120.746 180.034 120.891C180.072 121.036 180.14 121.171 180.235 121.286C180.329 121.402 180.448 121.496 180.582 121.561C180.716 121.627 180.863 121.663 181.012 121.666C181.162 121.67 181.31 121.641 181.447 121.582C181.584 121.523 181.707 121.435 181.807 121.324C181.907 121.213 181.982 121.082 182.027 120.939Z", "fill", "#9196A4"], ["d", "M184.457 126.671C184.808 126.109 185.965 126.195 185.965 126.195C185.965 126.195 186.552 127.195 186.201 127.757C186.141 127.893 186.053 128.015 185.942 128.113C185.831 128.212 185.7 128.286 185.558 128.33C185.416 128.374 185.267 128.387 185.119 128.368C184.972 128.349 184.831 128.298 184.704 128.22C184.578 128.141 184.471 128.036 184.388 127.913C184.306 127.789 184.251 127.649 184.228 127.502C184.204 127.355 184.213 127.205 184.252 127.062C184.292 126.919 184.361 126.785 184.457 126.671Z", "fill", "#9196A4"], ["d", "M185.82 124.162C186.3 124.621 185.975 125.737 185.975 125.737C185.975 125.737 184.878 126.106 184.398 125.647C184.273 125.561 184.168 125.449 184.091 125.319C184.014 125.189 183.966 125.044 183.951 124.893C183.935 124.743 183.953 124.591 184.002 124.448C184.051 124.305 184.131 124.174 184.235 124.065C184.34 123.956 184.467 123.871 184.608 123.816C184.748 123.761 184.9 123.737 185.05 123.746C185.201 123.755 185.348 123.797 185.481 123.869C185.614 123.941 185.73 124.041 185.82 124.162Z", "fill", "#9196A4"], ["d", "M187.74 125.354C187.11 125.153 186.283 125.968 186.283 125.968C186.283 125.968 186.48 127.109 187.11 127.315C187.245 127.383 187.392 127.421 187.543 127.427C187.693 127.432 187.843 127.405 187.981 127.347C188.12 127.288 188.245 127.201 188.347 127.09C188.449 126.979 188.525 126.847 188.571 126.704C188.617 126.56 188.632 126.409 188.614 126.259C188.596 126.11 188.545 125.966 188.466 125.837C188.387 125.709 188.282 125.6 188.156 125.516C188.031 125.433 187.889 125.378 187.74 125.354Z", "fill", "#9196A4"], ["d", "M195.218 123.466C194.914 124.058 193.752 124.062 193.752 124.062C193.752 124.062 193.088 123.114 193.392 122.522C193.439 122.378 193.516 122.246 193.619 122.135C193.721 122.024 193.847 121.936 193.986 121.878C194.126 121.821 194.277 121.794 194.428 121.801C194.579 121.807 194.727 121.847 194.861 121.916C194.995 121.985 195.113 122.083 195.206 122.203C195.299 122.322 195.364 122.461 195.398 122.608C195.432 122.756 195.433 122.909 195.402 123.057C195.371 123.205 195.308 123.345 195.218 123.466Z", "fill", "#9196A4"], ["d", "M194.057 126.075C193.543 125.646 193.779 124.517 193.779 124.517C193.779 124.517 194.846 124.063 195.356 124.483C195.491 124.555 195.609 124.657 195.701 124.78C195.793 124.903 195.857 125.045 195.887 125.195C195.918 125.346 195.915 125.502 195.879 125.651C195.842 125.8 195.773 125.94 195.677 126.059C195.58 126.179 195.458 126.276 195.32 126.343C195.182 126.409 195.031 126.445 194.877 126.446C194.724 126.448 194.571 126.415 194.432 126.351C194.292 126.287 194.169 126.193 194.07 126.075H194.057Z", "fill", "#9196A4"], ["d", "M192.05 125.037C192.693 125.191 193.456 124.316 193.456 124.316C193.456 124.316 193.165 123.192 192.522 123.029C192.383 122.973 192.235 122.949 192.086 122.956C191.937 122.964 191.792 123.004 191.66 123.073C191.527 123.141 191.412 123.238 191.32 123.356C191.229 123.474 191.164 123.61 191.129 123.755C191.095 123.9 191.093 124.051 191.122 124.197C191.151 124.344 191.211 124.482 191.299 124.603C191.386 124.723 191.499 124.824 191.628 124.897C191.758 124.971 191.902 125.015 192.05 125.028V125.037Z", "fill", "#9196A4"], ["d", "M203.699 129.117C203.18 129.546 202.122 129.066 202.122 129.066C202.122 129.066 201.899 127.929 202.418 127.512C202.519 127.405 202.643 127.32 202.78 127.264C202.918 127.208 203.065 127.182 203.213 127.188C203.361 127.194 203.506 127.232 203.639 127.299C203.771 127.366 203.887 127.46 203.98 127.576C204.073 127.692 204.14 127.826 204.176 127.97C204.213 128.114 204.218 128.264 204.192 128.41C204.166 128.556 204.108 128.694 204.024 128.816C203.94 128.938 203.83 129.041 203.703 129.117H203.699Z", "fill", "#9196A4"], ["d", "M201.583 131.031C201.283 130.439 201.96 129.495 201.96 129.495C201.96 129.495 203.117 129.495 203.417 130.104C203.506 130.227 203.568 130.367 203.598 130.515C203.628 130.664 203.625 130.817 203.589 130.964C203.554 131.111 203.487 131.249 203.393 131.368C203.299 131.486 203.181 131.583 203.046 131.651C202.911 131.72 202.763 131.758 202.611 131.763C202.46 131.768 202.31 131.74 202.171 131.681C202.032 131.622 201.907 131.533 201.805 131.421C201.704 131.309 201.628 131.176 201.583 131.031Z", "fill", "#9196A4"], ["d", "M200.167 129.268C200.694 129.667 201.745 129.178 201.745 129.178C201.745 129.178 201.937 128.032 201.41 127.629C201.306 127.519 201.18 127.433 201.039 127.377C200.899 127.322 200.748 127.297 200.598 127.305C200.447 127.314 200.3 127.355 200.166 127.426C200.033 127.496 199.916 127.596 199.825 127.716C199.734 127.836 199.67 127.975 199.637 128.123C199.605 128.271 199.605 128.423 199.638 128.571C199.67 128.719 199.735 128.857 199.826 128.978C199.917 129.098 200.034 129.197 200.167 129.268Z", "fill", "#9196A4"], ["d", "M210.378 142.097C209.859 142.526 208.796 142.05 208.796 142.05C208.796 142.05 208.578 140.909 209.092 140.493C209.193 140.38 209.317 140.29 209.456 140.231C209.595 140.171 209.745 140.142 209.896 140.146C210.047 140.15 210.196 140.187 210.331 140.254C210.466 140.322 210.585 140.418 210.68 140.536C210.775 140.654 210.842 140.791 210.879 140.938C210.915 141.085 210.919 141.238 210.89 141.387C210.861 141.535 210.8 141.676 210.712 141.798C210.624 141.921 210.509 142.023 210.378 142.097Z", "fill", "#9196A4"], ["d", "M208.261 144.011C207.961 143.419 208.633 142.475 208.633 142.475C208.633 142.475 209.795 142.475 210.091 143.084C210.177 143.206 210.237 143.345 210.265 143.492C210.293 143.639 210.289 143.79 210.253 143.935C210.217 144.08 210.15 144.216 210.057 144.333C209.964 144.45 209.847 144.545 209.714 144.613C209.581 144.68 209.434 144.718 209.285 144.724C209.136 144.73 208.987 144.703 208.849 144.646C208.711 144.589 208.587 144.502 208.486 144.393C208.384 144.283 208.307 144.153 208.261 144.011Z", "fill", "#9196A4"], ["d", "M206.855 142.251C207.382 142.65 208.432 142.161 208.432 142.161C208.432 142.161 208.625 141.015 208.098 140.612C207.994 140.502 207.867 140.417 207.727 140.361C207.587 140.305 207.436 140.28 207.285 140.289C207.134 140.297 206.987 140.338 206.854 140.409C206.72 140.48 206.604 140.579 206.513 140.699C206.421 140.82 206.357 140.959 206.325 141.106C206.293 141.254 206.293 141.407 206.325 141.554C206.358 141.702 206.422 141.841 206.513 141.961C206.605 142.081 206.721 142.18 206.855 142.251Z", "fill", "#9196A4"], ["d", "M194.018 132.224C194.446 131.713 195.578 131.958 195.578 131.958C195.578 131.958 196.006 133.031 195.578 133.541C195.501 133.672 195.397 133.785 195.273 133.871C195.149 133.958 195.007 134.016 194.858 134.043C194.709 134.069 194.556 134.062 194.41 134.023C194.263 133.984 194.127 133.913 194.011 133.816C193.895 133.719 193.801 133.598 193.736 133.461C193.672 133.324 193.638 133.174 193.637 133.023C193.636 132.871 193.668 132.721 193.731 132.583C193.793 132.445 193.885 132.323 194 132.224H194.018Z", "fill", "#9196A4"], ["d", "M195.712 129.929C196.14 130.448 195.647 131.508 195.647 131.508C195.647 131.508 194.507 131.722 194.096 131.199C193.989 131.096 193.906 130.971 193.851 130.833C193.796 130.695 193.771 130.547 193.779 130.398C193.786 130.25 193.824 130.105 193.892 129.973C193.959 129.841 194.054 129.725 194.17 129.632C194.286 129.54 194.421 129.473 194.565 129.437C194.708 129.401 194.858 129.396 195.004 129.422C195.15 129.448 195.289 129.506 195.411 129.59C195.533 129.675 195.635 129.784 195.712 129.911V129.929Z", "fill", "#9196A4"], ["d", "M197.452 131.375C196.852 131.087 195.922 131.778 195.922 131.778C195.922 131.778 195.96 132.941 196.556 133.228C196.68 133.315 196.821 133.373 196.969 133.4C197.117 133.426 197.27 133.42 197.415 133.382C197.561 133.344 197.697 133.275 197.813 133.179C197.93 133.083 198.024 132.963 198.09 132.827C198.155 132.691 198.191 132.543 198.193 132.392C198.196 132.241 198.166 132.092 198.105 131.954C198.045 131.816 197.955 131.692 197.842 131.592C197.729 131.492 197.596 131.418 197.452 131.375Z", "fill", "#9196A4"], ["d", "M205.469 152C205.897 151.49 207.029 151.738 207.029 151.738C207.029 151.738 207.457 152.807 207.029 153.317C206.952 153.448 206.849 153.561 206.724 153.648C206.6 153.734 206.458 153.793 206.309 153.819C206.16 153.845 206.007 153.838 205.861 153.799C205.714 153.76 205.578 153.69 205.462 153.592C205.346 153.495 205.252 153.374 205.188 153.237C205.123 153.1 205.089 152.95 205.088 152.799C205.087 152.647 205.119 152.497 205.182 152.359C205.245 152.221 205.337 152.099 205.452 152H205.469Z", "fill", "#9196A4"], ["d", "M207.166 149.704C207.595 150.228 207.102 151.287 207.102 151.287C207.102 151.287 205.962 151.498 205.555 150.978C205.446 150.876 205.361 150.752 205.304 150.613C205.247 150.475 205.221 150.326 205.227 150.176C205.233 150.027 205.271 149.881 205.339 149.747C205.406 149.614 205.502 149.497 205.618 149.403C205.735 149.31 205.871 149.243 206.015 149.207C206.16 149.171 206.311 149.166 206.458 149.193C206.605 149.221 206.744 149.279 206.866 149.365C206.989 149.451 207.091 149.562 207.166 149.691V149.704Z", "fill", "#9196A4"], ["d", "M208.903 151.155C208.307 150.863 207.373 151.558 207.373 151.558C207.373 151.558 207.412 152.716 208.007 153.004C208.13 153.087 208.27 153.143 208.417 153.168C208.564 153.193 208.714 153.186 208.858 153.147C209.001 153.109 209.135 153.039 209.25 152.945C209.364 152.85 209.457 152.731 209.522 152.597C209.587 152.463 209.622 152.317 209.626 152.168C209.629 152.019 209.601 151.871 209.542 151.734C209.483 151.597 209.396 151.475 209.286 151.375C209.175 151.275 209.045 151.2 208.903 151.155Z", "fill", "#9196A4"], ["d", "M199.59 138.39C200.237 138.24 200.987 139.124 200.987 139.124C200.987 139.124 200.696 140.244 200.049 140.411C199.909 140.469 199.758 140.496 199.606 140.49C199.455 140.484 199.307 140.445 199.172 140.375C199.037 140.306 198.919 140.208 198.826 140.088C198.733 139.968 198.668 139.829 198.634 139.681C198.6 139.533 198.599 139.38 198.63 139.231C198.662 139.083 198.725 138.943 198.816 138.822C198.907 138.701 199.024 138.601 199.157 138.529C199.291 138.458 199.439 138.416 199.59 138.407V138.39Z", "fill", "#9196A4"], ["d", "M202.329 137.587C202.329 138.252 201.322 138.81 201.322 138.81C201.322 138.81 200.285 138.286 200.272 137.625C200.246 137.477 200.252 137.325 200.29 137.179C200.328 137.034 200.398 136.898 200.493 136.781C200.589 136.665 200.708 136.571 200.844 136.505C200.979 136.44 201.127 136.404 201.278 136.402C201.428 136.399 201.578 136.429 201.715 136.489C201.853 136.55 201.976 136.639 202.076 136.752C202.176 136.864 202.25 136.997 202.294 137.142C202.338 137.286 202.35 137.438 202.329 137.587Z", "fill", "#9196A4"], ["d", "M202.835 139.793C202.531 139.2 201.373 139.188 201.373 139.188C201.373 139.188 200.7 140.136 201.005 140.728C201.051 140.872 201.127 141.005 201.229 141.116C201.331 141.228 201.456 141.316 201.596 141.374C201.735 141.433 201.886 141.46 202.037 141.454C202.188 141.448 202.336 141.41 202.471 141.341C202.606 141.272 202.724 141.175 202.817 141.056C202.91 140.937 202.976 140.798 203.011 140.651C203.046 140.504 203.048 140.351 203.017 140.202C202.987 140.054 202.925 139.914 202.835 139.793Z", "fill", "#9196A4"], ["d", "M229.213 152.549C228.596 152.798 227.713 152.047 227.713 152.047C227.713 152.047 227.829 150.893 228.442 150.644C228.57 150.564 228.715 150.514 228.866 150.496C229.016 150.478 229.169 150.493 229.313 150.54C229.457 150.587 229.589 150.665 229.7 150.769C229.811 150.872 229.897 150.999 229.954 151.139C230.011 151.28 230.037 151.431 230.029 151.583C230.022 151.734 229.981 151.882 229.911 152.017C229.84 152.151 229.741 152.268 229.621 152.36C229.5 152.452 229.361 152.517 229.213 152.549Z", "fill", "#9196A4"], ["d", "M226.638 153.755C226.518 153.103 227.435 152.391 227.435 152.391C227.435 152.391 228.541 152.742 228.656 153.395C228.705 153.536 228.722 153.687 228.706 153.836C228.691 153.984 228.644 154.128 228.568 154.257C228.492 154.386 228.389 154.497 228.266 154.582C228.144 154.668 228.004 154.725 227.857 154.752C227.71 154.778 227.559 154.772 227.414 154.735C227.269 154.697 227.134 154.628 227.019 154.534C226.903 154.439 226.809 154.321 226.743 154.186C226.677 154.052 226.641 153.905 226.638 153.755Z", "fill", "#9196A4"], ["d", "M225.789 151.657C226.179 152.193 227.323 152.026 227.323 152.026C227.323 152.026 227.838 150.983 227.448 150.447C227.378 150.315 227.281 150.2 227.164 150.108C227.046 150.017 226.91 149.952 226.765 149.919C226.619 149.885 226.469 149.883 226.323 149.912C226.177 149.942 226.039 150.003 225.919 150.091C225.798 150.179 225.698 150.291 225.625 150.421C225.552 150.551 225.508 150.696 225.496 150.844C225.483 150.993 225.503 151.142 225.554 151.283C225.604 151.423 225.685 151.551 225.789 151.657Z", "fill", "#9196A4"], ["d", "M223.482 160.11C222.844 159.93 222.6 158.797 222.6 158.797C222.6 158.797 223.393 157.939 224.035 158.128C224.185 158.144 224.33 158.194 224.459 158.272C224.588 158.35 224.699 158.455 224.783 158.581C224.868 158.706 224.924 158.848 224.948 158.997C224.972 159.146 224.964 159.299 224.923 159.444C224.883 159.59 224.811 159.725 224.713 159.84C224.615 159.955 224.494 160.047 224.357 160.111C224.22 160.174 224.07 160.207 223.919 160.207C223.768 160.207 223.619 160.174 223.482 160.11Z", "fill", "#9196A4"], ["d", "M220.697 159.505C221.001 158.917 222.158 158.913 222.158 158.913C222.158 158.913 222.823 159.866 222.518 160.453C222.469 160.594 222.391 160.722 222.288 160.83C222.185 160.937 222.06 161.021 221.922 161.076C221.783 161.131 221.635 161.156 221.486 161.148C221.338 161.141 221.193 161.101 221.061 161.032C220.929 160.964 220.813 160.867 220.722 160.75C220.63 160.633 220.565 160.497 220.53 160.352C220.496 160.207 220.493 160.057 220.521 159.91C220.55 159.764 220.61 159.626 220.697 159.505Z", "fill", "#9196A4"], ["d", "M221.301 157.325C221.301 157.99 222.296 158.552 222.296 158.552C222.296 158.552 223.337 158.041 223.354 157.38C223.384 157.232 223.38 157.078 223.344 156.931C223.308 156.784 223.241 156.646 223.146 156.527C223.051 156.409 222.932 156.313 222.796 156.245C222.661 156.177 222.512 156.14 222.361 156.136C222.209 156.132 222.059 156.161 221.92 156.221C221.781 156.281 221.656 156.371 221.555 156.484C221.455 156.597 221.38 156.731 221.336 156.876C221.292 157.021 221.28 157.174 221.301 157.325Z", "fill", "#9196A4"], ["d", "M218.953 152.759C218.91 153.425 217.856 153.901 217.856 153.901C217.856 153.901 216.861 153.3 216.9 152.639C216.885 152.489 216.902 152.337 216.951 152.195C217 152.052 217.08 151.922 217.184 151.813C217.288 151.704 217.415 151.619 217.555 151.563C217.696 151.508 217.846 151.484 217.997 151.493C218.147 151.502 218.294 151.543 218.427 151.614C218.56 151.686 218.676 151.785 218.767 151.905C218.858 152.026 218.921 152.164 218.954 152.312C218.986 152.459 218.985 152.612 218.953 152.759Z", "fill", "#9196A4"], ["d", "M218.948 155.617C218.309 155.441 218.061 154.33 218.061 154.33C218.061 154.33 218.849 153.471 219.492 153.656C219.643 153.671 219.788 153.719 219.919 153.796C220.049 153.874 220.161 153.978 220.247 154.103C220.333 154.229 220.39 154.371 220.415 154.521C220.44 154.67 220.432 154.823 220.392 154.97C220.352 155.116 220.28 155.252 220.183 155.367C220.085 155.483 219.963 155.576 219.825 155.64C219.688 155.703 219.538 155.736 219.386 155.736C219.235 155.736 219.085 155.702 218.948 155.638V155.617Z", "fill", "#9196A4"], ["d", "M216.712 155.484C217.363 155.359 217.702 154.252 217.702 154.252C217.702 154.252 216.982 153.338 216.33 153.463C216.179 153.466 216.03 153.502 215.894 153.569C215.758 153.635 215.638 153.731 215.543 153.848C215.448 153.966 215.379 154.103 215.342 154.25C215.305 154.397 215.301 154.55 215.329 154.699C215.357 154.848 215.417 154.989 215.505 155.112C215.593 155.235 215.707 155.338 215.838 155.412C215.97 155.487 216.116 155.532 216.267 155.544C216.418 155.557 216.57 155.536 216.712 155.484Z", "fill", "#9196A4"], ["d", "M191.117 209.363H224.52C224.635 209.363 224.749 209.389 224.853 209.439C224.957 209.489 225.048 209.561 225.121 209.65C225.194 209.74 225.246 209.845 225.273 209.957C225.3 210.069 225.302 210.186 225.278 210.299L224.85 212.375C224.812 212.548 224.717 212.703 224.58 212.813C224.443 212.924 224.272 212.985 224.095 212.985H191.922C191.765 212.985 191.612 212.938 191.483 212.849C191.353 212.76 191.254 212.634 191.198 212.487L190.414 210.41C190.371 210.295 190.356 210.171 190.371 210.048C190.385 209.926 190.428 209.809 190.497 209.706C190.566 209.604 190.658 209.52 190.766 209.46C190.873 209.4 190.994 209.367 191.117 209.363Z", "fill", "white", "stroke", "#9196A4", "stroke-miterlimit", "10"], ["d", "M193.766 216.258C194.139 216.258 222.292 212.984 222.292 212.984H193.428L193.766 216.258Z", "fill", "#9196A4"], ["id", "clip0_7659_134394"], ["clip-path", "url(#clip0_6685_107549)"], ["d", "M40.1289 92.7673L45.9489 95.1701C46.4016 95.356 46.9036 95.3839 47.374 95.2493C47.8444 95.1146 48.2558 94.8252 48.5418 94.4278L50.5732 91.5916C51.4587 90.3609 51.9975 88.9145 52.1332 87.4038V87.4038C52.1332 87.4038 52.849 82.5166 53.1447 78.8223", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M34.3453 112.191L43.0539 129.003L96.3896 121.67L97.0796 126.965L37.671 140.785C36.5011 141.06 35.2728 140.928 34.1873 140.412C33.1018 139.896 32.2236 139.026 31.6967 137.945L21.7539 117.937", "stroke", "#11142D", "stroke-width", "1.16", "stroke-miterlimit", "10"], ["d", "M53.1846 81.5844C54.5989 81.7517 55.6831 82.3567 55.516 83.7726C55.4343 84.2592 55.2147 84.712 54.8834 85.0772C54.552 85.4423 54.1228 85.7044 53.6469 85.8323C53.1711 85.9603 52.6684 85.9486 52.199 85.7987C51.7295 85.6488 51.3129 85.3671 50.9988 84.987C50.5775 84.478 50.3661 83.8274 50.4075 83.1677C50.5789 81.7517 51.7789 81.4171 53.1846 81.5844Z", "fill", "white", "stroke", "#11142D", "stroke-width", "0.87", "stroke-miterlimit", "10"], ["d", "M174.073 239.696V35.1548C174.072 25.8942 170.397 17.0132 163.857 10.465C157.316 3.91674 148.446 0.237466 139.196 0.236328H101.246", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M66.4688 10.4524H146.29L118.999 2.04241C109.928 -0.754537 100.213 -0.661528 91.1973 2.30849L66.4688 10.4524Z", "fill", "#11142D"], ["d", "M234.03 241.484H195.768", "stroke", "#11142D", "stroke-width", "1.56", "stroke-miterlimit", "10"], ["d", "M193.428 212.989H222.288L219.416 241.467H195.639L193.428 212.989Z", "fill", "white", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M174.93 242.145C175.517 242.145 195.557 235.279 195.557 235.279L195.985 241.286L174.93 242.145Z", "fill", "#11142D"], ["d", "M195.061 177.921L207.163 188.163C207.163 188.163 206.975 208.025 206.996 209.359", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M204.107 185.584L207.352 163.907L225.729 153.034", "stroke", "#11142D", "stroke-miterlimit", "10", "stroke-linecap", "round"], ["d", "M201.03 178.084C200.601 178.603 199.479 178.389 199.479 178.389C199.479 178.389 199.007 177.329 199.418 176.806C199.494 176.677 199.596 176.565 199.719 176.479C199.841 176.393 199.98 176.335 200.127 176.308C200.274 176.28 200.425 176.285 200.57 176.321C200.714 176.357 200.85 176.424 200.967 176.518C201.083 176.611 201.179 176.728 201.246 176.862C201.314 176.995 201.352 177.141 201.358 177.291C201.364 177.44 201.337 177.589 201.281 177.727C201.224 177.866 201.139 177.99 201.03 178.093V178.084Z", "fill", "#11142D"], ["d", "M199.394 180.44C198.965 179.929 199.394 178.856 199.394 178.856C199.394 178.856 200.529 178.612 200.954 179.122C201.067 179.222 201.157 179.345 201.218 179.482C201.28 179.62 201.31 179.769 201.308 179.92C201.307 180.071 201.272 180.219 201.207 180.355C201.142 180.491 201.049 180.612 200.933 180.708C200.817 180.804 200.682 180.875 200.537 180.914C200.391 180.953 200.239 180.96 200.091 180.934C199.942 180.909 199.801 180.851 199.677 180.766C199.553 180.681 199.449 180.569 199.372 180.44H199.394Z", "fill", "#11142D"], ["d", "M197.622 179.019C198.226 179.294 199.139 178.59 199.139 178.59C199.139 178.59 199.071 177.432 198.466 177.157C198.341 177.075 198.199 177.021 198.051 176.999C197.903 176.977 197.752 176.987 197.608 177.028C197.464 177.07 197.33 177.142 197.217 177.24C197.103 177.338 197.012 177.46 196.95 177.596C196.887 177.732 196.855 177.881 196.855 178.031C196.856 178.181 196.888 178.329 196.951 178.465C197.013 178.602 197.104 178.723 197.218 178.821C197.332 178.919 197.465 178.991 197.609 179.032L197.622 179.019Z", "fill", "#11142D"], ["d", "M193.165 174.63C193.663 175.059 193.384 176.196 193.384 176.196C193.384 176.196 192.3 176.625 191.803 176.166C191.678 176.084 191.572 175.976 191.493 175.85C191.414 175.724 191.363 175.582 191.343 175.434C191.323 175.286 191.336 175.136 191.379 174.993C191.423 174.851 191.497 174.719 191.596 174.608C191.695 174.496 191.816 174.407 191.953 174.347C192.089 174.287 192.237 174.257 192.386 174.259C192.535 174.261 192.681 174.295 192.816 174.359C192.95 174.423 193.07 174.515 193.165 174.63Z", "fill", "#11142D"], ["d", "M195.408 176.397C194.876 176.792 193.831 176.286 193.831 176.286C193.831 176.286 193.655 175.14 194.186 174.745C194.292 174.64 194.419 174.56 194.559 174.508C194.698 174.457 194.847 174.436 194.995 174.447C195.144 174.459 195.288 174.502 195.418 174.574C195.548 174.646 195.661 174.745 195.75 174.865C195.838 174.985 195.9 175.122 195.931 175.268C195.962 175.413 195.961 175.564 195.929 175.709C195.896 175.855 195.833 175.991 195.743 176.11C195.653 176.229 195.539 176.327 195.408 176.397Z", "fill", "#11142D"], ["d", "M193.907 178.088C194.216 177.5 193.551 176.548 193.551 176.548C193.551 176.548 192.394 176.548 192.086 177.14C191.999 177.261 191.939 177.399 191.91 177.545C191.881 177.691 191.884 177.842 191.919 177.987C191.953 178.132 192.019 178.267 192.11 178.385C192.202 178.502 192.317 178.598 192.449 178.667C192.581 178.736 192.726 178.775 192.875 178.783C193.023 178.79 193.172 178.766 193.31 178.711C193.448 178.656 193.573 178.572 193.676 178.465C193.779 178.357 193.858 178.229 193.907 178.088Z", "fill", "#11142D"], ["d", "M197.352 185.108C197.734 184.563 198.882 184.713 198.882 184.713C198.882 184.713 199.414 185.743 199.032 186.288C198.965 186.421 198.871 186.539 198.754 186.632C198.638 186.725 198.503 186.792 198.359 186.829C198.214 186.865 198.064 186.87 197.917 186.843C197.771 186.816 197.632 186.758 197.51 186.672C197.388 186.586 197.286 186.475 197.211 186.347C197.135 186.218 197.089 186.074 197.074 185.926C197.059 185.778 197.076 185.628 197.124 185.487C197.172 185.346 197.25 185.216 197.352 185.108Z", "fill", "#11142D"], ["d", "M198.848 182.675C199.302 183.16 198.916 184.254 198.916 184.254C198.916 184.254 197.802 184.563 197.348 184.078C197.232 183.985 197.137 183.868 197.07 183.735C197.003 183.602 196.965 183.456 196.96 183.307C196.954 183.159 196.981 183.01 197.037 182.872C197.094 182.735 197.179 182.611 197.288 182.509C197.397 182.407 197.526 182.33 197.667 182.283C197.808 182.236 197.958 182.22 198.106 182.235C198.254 182.251 198.397 182.299 198.525 182.374C198.653 182.45 198.763 182.553 198.848 182.675Z", "fill", "#11142D"], ["d", "M200.7 183.971C200.083 183.735 199.213 184.503 199.213 184.503C199.213 184.503 199.346 185.653 199.967 185.893C200.098 185.969 200.243 186.016 200.394 186.03C200.544 186.045 200.696 186.026 200.838 185.976C200.981 185.925 201.111 185.845 201.219 185.739C201.327 185.634 201.411 185.506 201.465 185.364C201.519 185.223 201.541 185.072 201.531 184.921C201.521 184.77 201.477 184.623 201.405 184.49C201.332 184.358 201.231 184.243 201.109 184.153C200.988 184.063 200.848 184.001 200.7 183.971Z", "fill", "#11142D"], ["d", "M209.953 180.088C209.293 180.011 208.877 178.925 208.877 178.925C208.877 178.925 209.533 177.968 210.188 178.045C210.34 178.037 210.491 178.063 210.631 178.119C210.772 178.176 210.899 178.262 211.002 178.373C211.106 178.483 211.185 178.615 211.232 178.759C211.28 178.903 211.295 179.056 211.278 179.206C211.261 179.357 211.211 179.502 211.131 179.631C211.052 179.761 210.946 179.871 210.82 179.955C210.694 180.039 210.551 180.094 210.401 180.117C210.251 180.14 210.098 180.13 209.953 180.088Z", "fill", "#11142D"], ["d", "M207.107 179.925C207.317 179.294 208.461 179.109 208.461 179.109C208.461 179.109 209.262 179.968 209.052 180.577C209.026 180.724 208.969 180.863 208.884 180.986C208.799 181.109 208.689 181.212 208.561 181.288C208.433 181.364 208.29 181.412 208.141 181.428C207.993 181.443 207.843 181.427 207.702 181.38C207.561 181.332 207.431 181.255 207.322 181.153C207.214 181.051 207.128 180.927 207.071 180.789C207.015 180.651 206.989 180.502 206.995 180.353C207.001 180.204 207.039 180.058 207.107 179.925Z", "fill", "#11142D"], ["d", "M207.363 177.676C207.449 178.337 208.537 178.736 208.537 178.736C208.537 178.736 209.484 178.066 209.394 177.41C209.397 177.261 209.367 177.113 209.307 176.977C209.247 176.841 209.158 176.719 209.047 176.62C208.936 176.521 208.805 176.447 208.663 176.403C208.521 176.36 208.371 176.347 208.223 176.366C208.076 176.385 207.934 176.436 207.808 176.515C207.682 176.594 207.574 176.699 207.492 176.823C207.41 176.948 207.356 177.088 207.333 177.235C207.31 177.382 207.319 177.533 207.359 177.676H207.363Z", "fill", "#11142D"], ["d", "M210.874 168.24C210.218 168.163 209.803 167.077 209.803 167.077C209.803 167.077 210.454 166.121 211.114 166.198C211.265 166.19 211.416 166.216 211.557 166.273C211.697 166.33 211.823 166.417 211.927 166.527C212.03 166.638 212.108 166.77 212.155 166.914C212.202 167.058 212.218 167.211 212.2 167.361C212.182 167.512 212.132 167.656 212.053 167.785C211.973 167.915 211.867 168.025 211.741 168.108C211.615 168.192 211.472 168.247 211.322 168.27C211.172 168.293 211.019 168.283 210.874 168.24Z", "fill", "#11142D"], ["d", "M208.029 168.078C208.239 167.447 209.383 167.263 209.383 167.263C209.383 167.263 210.184 168.121 209.974 168.73C209.948 168.877 209.891 169.017 209.806 169.139C209.721 169.262 209.611 169.365 209.483 169.441C209.355 169.517 209.212 169.565 209.063 169.581C208.915 169.597 208.765 169.58 208.624 169.533C208.483 169.486 208.353 169.408 208.244 169.306C208.135 169.204 208.05 169.08 207.993 168.942C207.937 168.804 207.911 168.655 207.917 168.506C207.923 168.357 207.961 168.211 208.029 168.078Z", "fill", "#11142D"], ["d", "M208.285 165.851C208.371 166.512 209.459 166.911 209.459 166.911C209.459 166.911 210.406 166.246 210.316 165.585C210.318 165.436 210.288 165.288 210.229 165.152C210.169 165.016 210.08 164.894 209.969 164.795C209.858 164.696 209.727 164.622 209.585 164.578C209.442 164.534 209.293 164.522 209.145 164.541C208.998 164.56 208.856 164.611 208.73 164.69C208.604 164.769 208.496 164.874 208.414 164.998C208.332 165.122 208.278 165.263 208.255 165.41C208.232 165.557 208.241 165.707 208.281 165.851H208.285Z", "fill", "#11142D"], ["d", "M211.509 188.806C210.892 189.051 210.018 188.291 210.018 188.291C210.018 188.291 210.138 187.137 210.755 186.892C210.884 186.815 211.029 186.766 211.18 186.75C211.33 186.734 211.482 186.751 211.625 186.8C211.768 186.848 211.899 186.928 212.008 187.032C212.118 187.136 212.203 187.263 212.259 187.404C212.314 187.545 212.339 187.696 212.33 187.847C212.321 187.998 212.28 188.146 212.208 188.279C212.137 188.412 212.037 188.529 211.917 188.62C211.796 188.711 211.657 188.774 211.509 188.806Z", "fill", "#11142D"], ["d", "M208.923 190.008C208.812 189.351 209.733 188.647 209.733 188.647C209.733 188.647 210.835 189.008 210.946 189.664C210.993 189.806 211.008 189.957 210.991 190.105C210.974 190.253 210.925 190.396 210.848 190.524C210.771 190.652 210.667 190.761 210.544 190.845C210.421 190.929 210.281 190.985 210.134 191.01C209.987 191.035 209.836 191.028 209.692 190.99C209.548 190.951 209.414 190.882 209.299 190.787C209.184 190.691 209.091 190.573 209.026 190.438C208.962 190.304 208.926 190.157 208.923 190.008Z", "fill", "#11142D"], ["d", "M208.092 187.901C208.478 188.441 209.626 188.283 209.626 188.283C209.626 188.283 210.149 187.244 209.759 186.708C209.692 186.574 209.597 186.456 209.48 186.362C209.363 186.269 209.227 186.201 209.081 186.165C208.936 186.129 208.785 186.125 208.637 186.153C208.49 186.181 208.351 186.241 208.229 186.328C208.107 186.416 208.006 186.528 207.931 186.658C207.857 186.789 207.812 186.934 207.799 187.083C207.786 187.232 207.805 187.383 207.856 187.524C207.907 187.665 207.987 187.794 208.092 187.901Z", "fill", "#11142D"], ["d", "M203.317 197.998C203.973 198.101 204.35 199.195 204.35 199.195C204.35 199.195 203.665 200.13 203.009 200.032C202.858 200.034 202.708 200.003 202.57 199.941C202.432 199.879 202.309 199.788 202.21 199.674C202.11 199.56 202.037 199.426 201.995 199.28C201.952 199.135 201.942 198.982 201.965 198.832C201.988 198.683 202.043 198.54 202.126 198.414C202.209 198.287 202.319 198.181 202.448 198.101C202.577 198.022 202.721 197.972 202.871 197.954C203.021 197.936 203.174 197.951 203.317 197.998Z", "fill", "#11142D"], ["d", "M206.159 198.263C205.923 198.886 204.775 199.027 204.775 199.027C204.775 199.027 204.003 198.169 204.235 197.538C204.265 197.39 204.326 197.25 204.415 197.129C204.505 197.007 204.619 196.906 204.751 196.833C204.883 196.759 205.029 196.716 205.18 196.705C205.33 196.694 205.481 196.716 205.622 196.769C205.764 196.822 205.891 196.905 205.997 197.013C206.103 197.121 206.185 197.25 206.236 197.392C206.287 197.534 206.306 197.686 206.293 197.836C206.28 197.987 206.234 198.132 206.159 198.263Z", "fill", "#11142D"], ["d", "M205.817 200.499C205.757 199.838 204.685 199.4 204.685 199.4C204.685 199.4 203.712 200.031 203.772 200.688C203.761 200.839 203.783 200.991 203.836 201.133C203.89 201.275 203.974 201.403 204.082 201.51C204.19 201.616 204.32 201.697 204.463 201.748C204.606 201.799 204.758 201.817 204.909 201.803C205.06 201.789 205.206 201.742 205.336 201.665C205.467 201.589 205.58 201.485 205.666 201.36C205.753 201.235 205.811 201.093 205.837 200.944C205.863 200.794 205.856 200.641 205.817 200.495V200.499Z", "fill", "#11142D"], ["d", "M202.997 167.683C203.503 168.112 203.254 169.245 203.254 169.245C203.254 169.245 202.182 169.674 201.672 169.245C201.543 169.167 201.432 169.063 201.347 168.938C201.262 168.813 201.205 168.671 201.18 168.522C201.155 168.373 201.163 168.221 201.203 168.075C201.243 167.93 201.314 167.794 201.411 167.679C201.508 167.563 201.629 167.47 201.766 167.406C201.902 167.342 202.051 167.308 202.202 167.308C202.353 167.307 202.502 167.339 202.639 167.401C202.776 167.464 202.898 167.556 202.997 167.67V167.683Z", "fill", "#11142D"], ["d", "M205.285 169.39C204.762 169.819 203.708 169.322 203.708 169.322C203.708 169.322 203.498 168.18 204.021 167.768C204.124 167.664 204.249 167.582 204.386 167.529C204.524 167.477 204.671 167.453 204.818 167.462C204.964 167.47 205.108 167.509 205.239 167.577C205.369 167.644 205.484 167.739 205.576 167.854C205.667 167.97 205.733 168.103 205.769 168.246C205.806 168.389 205.811 168.538 205.786 168.683C205.76 168.828 205.704 168.966 205.622 169.088C205.539 169.21 205.432 169.313 205.306 169.39H205.285Z", "fill", "#11142D"], ["d", "M203.854 171.124C204.145 170.523 203.46 169.592 203.46 169.592C203.46 169.592 202.298 169.622 202.007 170.218C201.92 170.342 201.861 170.482 201.834 170.631C201.806 170.779 201.812 170.932 201.849 171.078C201.886 171.224 201.955 171.36 202.05 171.477C202.145 171.594 202.265 171.689 202.4 171.756C202.535 171.822 202.683 171.858 202.834 171.862C202.985 171.865 203.134 171.836 203.273 171.776C203.411 171.715 203.534 171.626 203.635 171.513C203.735 171.401 203.81 171.268 203.854 171.124Z", "fill", "#11142D"], ["d", "M181.195 117.502C181.705 117.931 181.452 119.064 181.452 119.064C181.452 119.064 180.381 119.493 179.875 119.064C179.747 118.986 179.638 118.882 179.554 118.758C179.471 118.633 179.415 118.493 179.391 118.345C179.366 118.197 179.374 118.046 179.414 117.901C179.454 117.757 179.524 117.623 179.621 117.508C179.717 117.394 179.837 117.302 179.972 117.238C180.107 117.174 180.255 117.14 180.404 117.139C180.554 117.137 180.702 117.168 180.838 117.23C180.975 117.291 181.097 117.381 181.195 117.494V117.502Z", "fill", "#11142D"], ["d", "M183.485 119.21C182.962 119.639 181.903 119.137 181.903 119.137C181.903 119.137 181.697 117.996 182.22 117.588C182.323 117.477 182.448 117.389 182.588 117.331C182.727 117.273 182.878 117.247 183.029 117.253C183.18 117.259 183.328 117.298 183.462 117.367C183.597 117.436 183.714 117.534 183.807 117.653C183.9 117.772 183.966 117.911 184.001 118.058C184.035 118.205 184.037 118.358 184.006 118.506C183.975 118.655 183.913 118.794 183.823 118.916C183.733 119.037 183.617 119.138 183.485 119.21Z", "fill", "#11142D"], ["d", "M182.027 120.939C182.318 120.343 181.632 119.407 181.632 119.407C181.632 119.407 180.475 119.442 180.184 120.038C180.099 120.161 180.042 120.301 180.016 120.448C179.99 120.595 179.996 120.746 180.034 120.891C180.072 121.036 180.14 121.171 180.235 121.286C180.329 121.402 180.448 121.496 180.582 121.561C180.716 121.627 180.863 121.663 181.012 121.666C181.162 121.67 181.31 121.641 181.447 121.582C181.584 121.523 181.707 121.435 181.807 121.324C181.907 121.213 181.982 121.082 182.027 120.939Z", "fill", "#11142D"], ["d", "M184.457 126.671C184.808 126.109 185.965 126.195 185.965 126.195C185.965 126.195 186.552 127.195 186.201 127.757C186.141 127.893 186.053 128.015 185.942 128.113C185.831 128.212 185.7 128.286 185.558 128.33C185.416 128.374 185.267 128.387 185.119 128.368C184.972 128.349 184.831 128.298 184.704 128.22C184.578 128.141 184.471 128.036 184.388 127.913C184.306 127.789 184.251 127.649 184.228 127.502C184.204 127.355 184.213 127.205 184.252 127.062C184.292 126.919 184.361 126.785 184.457 126.671Z", "fill", "#11142D"], ["d", "M185.82 124.162C186.3 124.621 185.975 125.737 185.975 125.737C185.975 125.737 184.878 126.106 184.398 125.647C184.273 125.561 184.168 125.449 184.091 125.319C184.014 125.189 183.966 125.044 183.951 124.893C183.935 124.743 183.953 124.591 184.002 124.448C184.051 124.305 184.131 124.174 184.235 124.065C184.34 123.956 184.467 123.871 184.608 123.816C184.748 123.761 184.9 123.737 185.05 123.746C185.201 123.755 185.348 123.797 185.481 123.869C185.614 123.941 185.73 124.041 185.82 124.162Z", "fill", "#11142D"], ["d", "M187.74 125.354C187.11 125.153 186.283 125.968 186.283 125.968C186.283 125.968 186.48 127.109 187.11 127.315C187.245 127.383 187.392 127.421 187.543 127.427C187.693 127.432 187.843 127.405 187.981 127.347C188.12 127.288 188.245 127.201 188.347 127.09C188.449 126.979 188.525 126.847 188.571 126.704C188.617 126.56 188.632 126.409 188.614 126.259C188.596 126.11 188.545 125.966 188.466 125.837C188.387 125.709 188.282 125.6 188.156 125.516C188.031 125.433 187.889 125.378 187.74 125.354Z", "fill", "#11142D"], ["d", "M195.218 123.466C194.914 124.058 193.752 124.062 193.752 124.062C193.752 124.062 193.088 123.114 193.392 122.522C193.439 122.378 193.516 122.246 193.619 122.135C193.721 122.024 193.847 121.936 193.986 121.878C194.126 121.821 194.277 121.794 194.428 121.801C194.579 121.807 194.727 121.847 194.861 121.916C194.995 121.985 195.113 122.083 195.206 122.203C195.299 122.322 195.364 122.461 195.398 122.608C195.432 122.756 195.433 122.909 195.402 123.057C195.371 123.205 195.308 123.345 195.218 123.466Z", "fill", "#11142D"], ["d", "M194.057 126.075C193.543 125.646 193.779 124.517 193.779 124.517C193.779 124.517 194.846 124.063 195.356 124.483C195.491 124.555 195.609 124.657 195.701 124.78C195.793 124.903 195.857 125.045 195.887 125.195C195.918 125.346 195.915 125.502 195.879 125.651C195.842 125.8 195.773 125.94 195.677 126.059C195.58 126.179 195.458 126.276 195.32 126.343C195.182 126.409 195.031 126.445 194.877 126.446C194.724 126.448 194.571 126.415 194.432 126.351C194.292 126.287 194.169 126.193 194.07 126.075H194.057Z", "fill", "#11142D"], ["d", "M192.05 125.037C192.693 125.191 193.456 124.316 193.456 124.316C193.456 124.316 193.165 123.192 192.522 123.029C192.383 122.973 192.235 122.949 192.086 122.956C191.937 122.964 191.792 123.004 191.66 123.073C191.527 123.141 191.412 123.238 191.32 123.356C191.229 123.474 191.164 123.61 191.129 123.755C191.095 123.9 191.093 124.051 191.122 124.197C191.151 124.344 191.211 124.482 191.299 124.603C191.386 124.723 191.499 124.824 191.628 124.897C191.758 124.971 191.902 125.015 192.05 125.028V125.037Z", "fill", "#11142D"], ["d", "M203.699 129.117C203.18 129.546 202.122 129.066 202.122 129.066C202.122 129.066 201.899 127.929 202.418 127.512C202.519 127.405 202.643 127.32 202.78 127.264C202.918 127.208 203.065 127.182 203.213 127.188C203.361 127.194 203.506 127.232 203.639 127.299C203.771 127.366 203.887 127.46 203.98 127.576C204.073 127.692 204.14 127.826 204.176 127.97C204.213 128.114 204.218 128.264 204.192 128.41C204.166 128.556 204.108 128.694 204.024 128.816C203.94 128.938 203.83 129.041 203.703 129.117H203.699Z", "fill", "#11142D"], ["d", "M201.583 131.031C201.283 130.439 201.96 129.495 201.96 129.495C201.96 129.495 203.117 129.495 203.417 130.104C203.506 130.227 203.568 130.367 203.598 130.515C203.628 130.664 203.625 130.817 203.589 130.964C203.554 131.111 203.487 131.249 203.393 131.368C203.299 131.486 203.181 131.583 203.046 131.651C202.911 131.72 202.763 131.758 202.611 131.763C202.46 131.768 202.31 131.74 202.171 131.681C202.032 131.622 201.907 131.533 201.805 131.421C201.704 131.309 201.628 131.176 201.583 131.031Z", "fill", "#11142D"], ["d", "M200.167 129.268C200.694 129.667 201.745 129.178 201.745 129.178C201.745 129.178 201.937 128.032 201.41 127.629C201.306 127.519 201.18 127.433 201.039 127.377C200.899 127.322 200.748 127.297 200.598 127.305C200.447 127.314 200.3 127.355 200.166 127.426C200.033 127.496 199.916 127.596 199.825 127.716C199.734 127.836 199.67 127.975 199.637 128.123C199.605 128.271 199.605 128.423 199.638 128.571C199.67 128.719 199.735 128.857 199.826 128.978C199.917 129.098 200.034 129.197 200.167 129.268Z", "fill", "#11142D"], ["d", "M210.378 142.097C209.859 142.526 208.796 142.05 208.796 142.05C208.796 142.05 208.578 140.909 209.092 140.493C209.193 140.38 209.317 140.29 209.456 140.231C209.595 140.171 209.745 140.142 209.896 140.146C210.047 140.15 210.196 140.187 210.331 140.254C210.466 140.322 210.585 140.418 210.68 140.536C210.775 140.654 210.842 140.791 210.879 140.938C210.915 141.085 210.919 141.238 210.89 141.387C210.861 141.535 210.8 141.676 210.712 141.798C210.624 141.921 210.509 142.023 210.378 142.097Z", "fill", "#11142D"], ["d", "M208.261 144.011C207.961 143.419 208.633 142.475 208.633 142.475C208.633 142.475 209.795 142.475 210.091 143.084C210.177 143.206 210.237 143.345 210.265 143.492C210.293 143.639 210.289 143.79 210.253 143.935C210.217 144.08 210.15 144.216 210.057 144.333C209.964 144.45 209.847 144.545 209.714 144.613C209.581 144.68 209.434 144.718 209.285 144.724C209.136 144.73 208.987 144.703 208.849 144.646C208.711 144.589 208.587 144.502 208.486 144.393C208.384 144.283 208.307 144.153 208.261 144.011Z", "fill", "#11142D"], ["d", "M206.855 142.251C207.382 142.65 208.432 142.161 208.432 142.161C208.432 142.161 208.625 141.015 208.098 140.612C207.994 140.502 207.867 140.417 207.727 140.361C207.587 140.305 207.436 140.28 207.285 140.289C207.134 140.297 206.987 140.338 206.854 140.409C206.72 140.48 206.604 140.579 206.513 140.699C206.421 140.82 206.357 140.959 206.325 141.106C206.293 141.254 206.293 141.407 206.325 141.554C206.358 141.702 206.422 141.841 206.513 141.961C206.605 142.081 206.721 142.18 206.855 142.251Z", "fill", "#11142D"], ["d", "M194.018 132.224C194.446 131.713 195.578 131.958 195.578 131.958C195.578 131.958 196.006 133.031 195.578 133.541C195.501 133.672 195.397 133.785 195.273 133.871C195.149 133.958 195.007 134.016 194.858 134.043C194.709 134.069 194.556 134.062 194.41 134.023C194.263 133.984 194.127 133.913 194.011 133.816C193.895 133.719 193.801 133.598 193.736 133.461C193.672 133.324 193.638 133.174 193.637 133.023C193.636 132.871 193.668 132.721 193.731 132.583C193.793 132.445 193.885 132.323 194 132.224H194.018Z", "fill", "#11142D"], ["d", "M195.712 129.929C196.14 130.448 195.647 131.508 195.647 131.508C195.647 131.508 194.507 131.722 194.096 131.199C193.989 131.096 193.906 130.971 193.851 130.833C193.796 130.695 193.771 130.547 193.779 130.398C193.786 130.25 193.824 130.105 193.892 129.973C193.959 129.841 194.054 129.725 194.17 129.632C194.286 129.54 194.421 129.473 194.565 129.437C194.708 129.401 194.858 129.396 195.004 129.422C195.15 129.448 195.289 129.506 195.411 129.59C195.533 129.675 195.635 129.784 195.712 129.911V129.929Z", "fill", "#11142D"], ["d", "M197.452 131.375C196.852 131.087 195.922 131.778 195.922 131.778C195.922 131.778 195.96 132.941 196.556 133.228C196.68 133.315 196.821 133.373 196.969 133.4C197.117 133.426 197.27 133.42 197.415 133.382C197.561 133.344 197.697 133.275 197.813 133.179C197.93 133.083 198.024 132.963 198.09 132.827C198.155 132.691 198.191 132.543 198.193 132.392C198.196 132.241 198.166 132.092 198.105 131.954C198.045 131.816 197.955 131.692 197.842 131.592C197.729 131.492 197.596 131.418 197.452 131.375Z", "fill", "#11142D"], ["d", "M205.469 152C205.897 151.49 207.029 151.738 207.029 151.738C207.029 151.738 207.457 152.807 207.029 153.317C206.952 153.448 206.849 153.561 206.724 153.648C206.6 153.734 206.458 153.793 206.309 153.819C206.16 153.845 206.007 153.838 205.861 153.799C205.714 153.76 205.578 153.69 205.462 153.592C205.346 153.495 205.252 153.374 205.188 153.237C205.123 153.1 205.089 152.95 205.088 152.799C205.087 152.647 205.119 152.497 205.182 152.359C205.245 152.221 205.337 152.099 205.452 152H205.469Z", "fill", "#11142D"], ["d", "M207.166 149.704C207.595 150.228 207.102 151.287 207.102 151.287C207.102 151.287 205.962 151.498 205.555 150.978C205.446 150.876 205.361 150.752 205.304 150.613C205.247 150.475 205.221 150.326 205.227 150.176C205.233 150.027 205.271 149.881 205.339 149.747C205.406 149.614 205.502 149.497 205.618 149.403C205.735 149.31 205.871 149.243 206.015 149.207C206.16 149.171 206.311 149.166 206.458 149.193C206.605 149.221 206.744 149.279 206.866 149.365C206.989 149.451 207.091 149.562 207.166 149.691V149.704Z", "fill", "#11142D"], ["d", "M208.903 151.155C208.307 150.863 207.373 151.558 207.373 151.558C207.373 151.558 207.412 152.716 208.007 153.004C208.13 153.087 208.27 153.143 208.417 153.168C208.564 153.193 208.714 153.186 208.858 153.147C209.001 153.109 209.135 153.039 209.25 152.945C209.364 152.85 209.457 152.731 209.522 152.597C209.587 152.463 209.622 152.317 209.626 152.168C209.629 152.019 209.601 151.871 209.542 151.734C209.483 151.597 209.396 151.475 209.286 151.375C209.175 151.275 209.045 151.2 208.903 151.155Z", "fill", "#11142D"], ["d", "M199.59 138.39C200.237 138.24 200.987 139.124 200.987 139.124C200.987 139.124 200.696 140.244 200.049 140.411C199.909 140.469 199.758 140.496 199.606 140.49C199.455 140.484 199.307 140.445 199.172 140.375C199.037 140.306 198.919 140.208 198.826 140.088C198.733 139.968 198.668 139.829 198.634 139.681C198.6 139.533 198.599 139.38 198.63 139.231C198.662 139.083 198.725 138.943 198.816 138.822C198.907 138.701 199.024 138.601 199.157 138.529C199.291 138.458 199.439 138.416 199.59 138.407V138.39Z", "fill", "#11142D"], ["d", "M202.329 137.587C202.329 138.252 201.322 138.81 201.322 138.81C201.322 138.81 200.285 138.286 200.272 137.625C200.246 137.477 200.252 137.325 200.29 137.179C200.328 137.034 200.398 136.898 200.493 136.781C200.589 136.665 200.708 136.571 200.844 136.505C200.979 136.44 201.127 136.404 201.278 136.402C201.428 136.399 201.578 136.429 201.715 136.489C201.853 136.55 201.976 136.639 202.076 136.752C202.176 136.864 202.25 136.997 202.294 137.142C202.338 137.286 202.35 137.438 202.329 137.587Z", "fill", "#11142D"], ["d", "M202.835 139.793C202.531 139.2 201.373 139.188 201.373 139.188C201.373 139.188 200.7 140.136 201.005 140.728C201.051 140.872 201.127 141.005 201.229 141.116C201.331 141.228 201.456 141.316 201.596 141.374C201.735 141.433 201.886 141.46 202.037 141.454C202.188 141.448 202.336 141.41 202.471 141.341C202.606 141.272 202.724 141.175 202.817 141.056C202.91 140.937 202.976 140.798 203.011 140.651C203.046 140.504 203.048 140.351 203.017 140.202C202.987 140.054 202.925 139.914 202.835 139.793Z", "fill", "#11142D"], ["d", "M229.213 152.549C228.596 152.798 227.713 152.047 227.713 152.047C227.713 152.047 227.829 150.893 228.442 150.644C228.57 150.564 228.715 150.514 228.866 150.496C229.016 150.478 229.169 150.493 229.313 150.54C229.457 150.587 229.589 150.665 229.7 150.769C229.811 150.872 229.897 150.999 229.954 151.139C230.011 151.28 230.037 151.431 230.029 151.583C230.022 151.734 229.981 151.882 229.911 152.017C229.84 152.151 229.741 152.268 229.621 152.36C229.5 152.452 229.361 152.517 229.213 152.549Z", "fill", "#11142D"], ["d", "M226.638 153.755C226.518 153.103 227.435 152.391 227.435 152.391C227.435 152.391 228.541 152.742 228.656 153.395C228.705 153.536 228.722 153.687 228.706 153.836C228.691 153.984 228.644 154.128 228.568 154.257C228.492 154.386 228.389 154.497 228.266 154.582C228.144 154.668 228.004 154.725 227.857 154.752C227.71 154.778 227.559 154.772 227.414 154.735C227.269 154.697 227.134 154.628 227.019 154.534C226.903 154.439 226.809 154.321 226.743 154.186C226.677 154.052 226.641 153.905 226.638 153.755Z", "fill", "#11142D"], ["d", "M225.789 151.657C226.179 152.193 227.323 152.026 227.323 152.026C227.323 152.026 227.838 150.983 227.448 150.447C227.378 150.315 227.281 150.2 227.164 150.108C227.046 150.017 226.91 149.952 226.765 149.919C226.619 149.885 226.469 149.883 226.323 149.912C226.177 149.942 226.039 150.003 225.919 150.091C225.798 150.179 225.698 150.291 225.625 150.421C225.552 150.551 225.508 150.696 225.496 150.844C225.483 150.993 225.503 151.142 225.554 151.283C225.604 151.423 225.685 151.551 225.789 151.657Z", "fill", "#11142D"], ["d", "M223.482 160.11C222.844 159.93 222.6 158.797 222.6 158.797C222.6 158.797 223.393 157.939 224.035 158.128C224.185 158.144 224.33 158.194 224.459 158.272C224.588 158.35 224.699 158.455 224.783 158.581C224.868 158.706 224.924 158.848 224.948 158.997C224.972 159.146 224.964 159.299 224.923 159.444C224.883 159.59 224.811 159.725 224.713 159.84C224.615 159.955 224.494 160.047 224.357 160.111C224.22 160.174 224.07 160.207 223.919 160.207C223.768 160.207 223.619 160.174 223.482 160.11Z", "fill", "#11142D"], ["d", "M220.697 159.505C221.001 158.917 222.158 158.913 222.158 158.913C222.158 158.913 222.823 159.866 222.518 160.453C222.469 160.594 222.391 160.722 222.288 160.83C222.185 160.937 222.06 161.021 221.922 161.076C221.783 161.131 221.635 161.156 221.486 161.148C221.338 161.141 221.193 161.101 221.061 161.032C220.929 160.964 220.813 160.867 220.722 160.75C220.63 160.633 220.565 160.497 220.53 160.352C220.496 160.207 220.493 160.057 220.521 159.91C220.55 159.764 220.61 159.626 220.697 159.505Z", "fill", "#11142D"], ["d", "M221.301 157.325C221.301 157.99 222.296 158.552 222.296 158.552C222.296 158.552 223.337 158.041 223.354 157.38C223.384 157.232 223.38 157.078 223.344 156.931C223.308 156.784 223.241 156.646 223.146 156.527C223.051 156.409 222.932 156.313 222.796 156.245C222.661 156.177 222.512 156.14 222.361 156.136C222.209 156.132 222.059 156.161 221.92 156.221C221.781 156.281 221.656 156.371 221.555 156.484C221.455 156.597 221.38 156.731 221.336 156.876C221.292 157.021 221.28 157.174 221.301 157.325Z", "fill", "#11142D"], ["d", "M218.953 152.759C218.91 153.425 217.856 153.901 217.856 153.901C217.856 153.901 216.861 153.3 216.9 152.639C216.885 152.489 216.902 152.337 216.951 152.195C217 152.052 217.08 151.922 217.184 151.813C217.288 151.704 217.415 151.619 217.555 151.563C217.696 151.508 217.846 151.484 217.997 151.493C218.147 151.502 218.294 151.543 218.427 151.614C218.56 151.686 218.676 151.785 218.767 151.905C218.858 152.026 218.921 152.164 218.954 152.312C218.986 152.459 218.985 152.612 218.953 152.759Z", "fill", "#11142D"], ["d", "M218.948 155.617C218.309 155.441 218.061 154.33 218.061 154.33C218.061 154.33 218.849 153.471 219.492 153.656C219.643 153.671 219.788 153.719 219.919 153.796C220.049 153.874 220.161 153.978 220.247 154.103C220.333 154.229 220.39 154.371 220.415 154.521C220.44 154.67 220.432 154.823 220.392 154.97C220.352 155.116 220.28 155.252 220.183 155.367C220.085 155.483 219.963 155.576 219.825 155.64C219.688 155.703 219.538 155.736 219.386 155.736C219.235 155.736 219.085 155.702 218.948 155.638V155.617Z", "fill", "#11142D"], ["d", "M216.712 155.484C217.363 155.359 217.702 154.252 217.702 154.252C217.702 154.252 216.982 153.338 216.33 153.463C216.179 153.466 216.03 153.502 215.894 153.569C215.758 153.635 215.638 153.731 215.543 153.848C215.448 153.966 215.379 154.103 215.342 154.25C215.305 154.397 215.301 154.55 215.329 154.699C215.357 154.848 215.417 154.989 215.505 155.112C215.593 155.235 215.707 155.338 215.838 155.412C215.97 155.487 216.116 155.532 216.267 155.544C216.418 155.557 216.57 155.536 216.712 155.484Z", "fill", "#11142D"], ["d", "M191.117 209.363H224.52C224.635 209.363 224.749 209.389 224.853 209.439C224.957 209.489 225.048 209.561 225.121 209.65C225.194 209.74 225.246 209.845 225.273 209.957C225.3 210.069 225.302 210.186 225.278 210.299L224.85 212.375C224.812 212.548 224.717 212.703 224.58 212.813C224.443 212.924 224.272 212.985 224.095 212.985H191.922C191.765 212.985 191.612 212.938 191.483 212.849C191.353 212.76 191.254 212.634 191.198 212.487L190.414 210.41C190.371 210.295 190.356 210.171 190.371 210.048C190.385 209.926 190.428 209.809 190.497 209.706C190.566 209.604 190.658 209.52 190.766 209.46C190.873 209.4 190.994 209.367 191.117 209.363Z", "fill", "white", "stroke", "#11142D", "stroke-miterlimit", "10"], ["d", "M193.766 216.258C194.139 216.258 222.292 212.984 222.292 212.984H193.428L193.766 216.258Z", "fill", "#11142D"], ["id", "clip0_6685_107549"], [1, "modal-kebab-black"], [2, "color", "#E24414"], [1, "modal-kebab-white"], [1, "cont-horiz-start", "margin-bottom30"], [1, "margin-right15"], ["xmlns", "http://www.w3.org/2000/svg", "width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M20.5649 6.43451C20.8773 6.74693 20.8773 7.25346 20.5649 7.56588L10.5649 17.5659C10.2525 17.8783 9.74595 17.8783 9.43353 17.5659L4.43353 12.5659C4.12111 12.2535 4.12111 11.7469 4.43353 11.4345C4.74595 11.1221 5.25248 11.1221 5.5649 11.4345L9.99922 15.8688L19.4335 6.43451C19.746 6.12209 20.2525 6.12209 20.5649 6.43451Z"], [1, "cont-horiz-start"], ["fill", "#FF6464", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M3 6.13672C3 5.69489 3.35817 5.33672 3.8 5.33672H19.8C20.2418 5.33672 20.6 5.69489 20.6 6.13672C20.6 6.57855 20.2418 6.93672 19.8 6.93672H3.8C3.35817 6.93672 3 6.57855 3 6.13672Z"], ["fill", "#FF6464", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M6.6 6.2V18.7C6.6 18.826 6.65114 18.951 6.749 19.0464C6.84756 19.1425 6.98544 19.2 7.13333 19.2H16.4667C16.6146 19.2 16.7524 19.1425 16.851 19.0464C16.9489 18.951 17 18.826 17 18.7V6.2H18.6V18.7C18.6 19.2636 18.3702 19.7999 17.968 20.192C17.5664 20.5835 17.026 20.8 16.4667 20.8H7.13333C6.57398 20.8 6.03359 20.5835 5.63204 20.192C5.22981 19.7999 5 19.2636 5 18.7V6.2H6.6Z"], ["fill", "#FF6464", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M9.4 5.33333V6H7.8V5.33333C7.8 4.44928 8.22143 3.60143 8.97157 2.97631C9.72172 2.35119 10.7391 2 11.8 2C12.8609 2 13.8783 2.35119 14.6284 2.97631C15.3786 3.60143 15.8 4.44928 15.8 5.33333V6H14.2V5.33333C14.2 4.97756 14.0326 4.56254 13.6041 4.20546C13.1671 3.84129 12.5213 3.6 11.8 3.6C11.0787 3.6 10.4329 3.84129 9.99587 4.20546C9.56737 4.56254 9.4 4.97756 9.4 5.33333Z"], ["fill", "#FF6464", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M9.8 9.2C10.2418 9.2 10.6 9.55817 10.6 10V15.3333C10.6 15.7752 10.2418 16.1333 9.8 16.1333C9.35817 16.1333 9 15.7752 9 15.3333V10C9 9.55817 9.35817 9.2 9.8 9.2Z"], ["fill", "#FF6464", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M13.8 9.2C14.2418 9.2 14.6 9.55817 14.6 10V15.3333C14.6 15.7752 14.2418 16.1333 13.8 16.1333C13.3582 16.1333 13 15.7752 13 15.3333V10C13 9.55817 13.3582 9.2 13.8 9.2Z"], [2, "color", "#FF6464"], ["fill", "#E24414", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M3 6.13672C3 5.69489 3.35817 5.33672 3.8 5.33672H19.8C20.2418 5.33672 20.6 5.69489 20.6 6.13672C20.6 6.57855 20.2418 6.93672 19.8 6.93672H3.8C3.35817 6.93672 3 6.57855 3 6.13672Z"], ["fill", "#E24414", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M6.6 6.2V18.7C6.6 18.826 6.65114 18.951 6.749 19.0464C6.84756 19.1425 6.98544 19.2 7.13333 19.2H16.4667C16.6146 19.2 16.7524 19.1425 16.851 19.0464C16.9489 18.951 17 18.826 17 18.7V6.2H18.6V18.7C18.6 19.2636 18.3702 19.7999 17.968 20.192C17.5664 20.5835 17.026 20.8 16.4667 20.8H7.13333C6.57398 20.8 6.03359 20.5835 5.63204 20.192C5.22981 19.7999 5 19.2636 5 18.7V6.2H6.6Z"], ["fill", "#E24414", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M9.4 5.33333V6H7.8V5.33333C7.8 4.44928 8.22143 3.60143 8.97157 2.97631C9.72172 2.35119 10.7391 2 11.8 2C12.8609 2 13.8783 2.35119 14.6284 2.97631C15.3786 3.60143 15.8 4.44928 15.8 5.33333V6H14.2V5.33333C14.2 4.97756 14.0326 4.56254 13.6041 4.20546C13.1671 3.84129 12.5213 3.6 11.8 3.6C11.0787 3.6 10.4329 3.84129 9.99587 4.20546C9.56737 4.56254 9.4 4.97756 9.4 5.33333Z"], ["fill", "#E24414", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M9.8 9.2C10.2418 9.2 10.6 9.55817 10.6 10V15.3333C10.6 15.7752 10.2418 16.1333 9.8 16.1333C9.35817 16.1333 9 15.7752 9 15.3333V10C9 9.55817 9.35817 9.2 9.8 9.2Z"], ["fill", "#E24414", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M13.8 9.2C14.2418 9.2 14.6 9.55817 14.6 10V15.3333C14.6 15.7752 14.2418 16.1333 13.8 16.1333C13.3582 16.1333 13 15.7752 13 15.3333V10C13 9.55817 13.3582 9.2 13.8 9.2Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M15.0586 2.01934C15.37 1.97689 15.6869 2.00453 15.9862 2.10024C16.2856 2.19596 16.5597 2.35734 16.7887 2.57259C16.7946 2.57822 16.8005 2.58395 16.8064 2.58976L21.0101 6.79346C21.0159 6.79928 21.0216 6.80518 21.0272 6.81117C21.2425 7.04013 21.4039 7.31428 21.4996 7.61359C21.5953 7.9129 21.6229 8.22982 21.5805 8.54119C21.538 8.85255 21.4265 9.1505 21.2542 9.41325C21.0841 9.67254 20.859 9.8911 20.5949 10.0534L16.5907 12.6372L15.2771 18.1393L15.2736 18.1532C15.2049 18.4197 15.0686 18.6639 14.8779 18.8623C14.6871 19.0607 14.4484 19.2064 14.1848 19.2855C13.9213 19.3646 13.6417 19.3743 13.3733 19.3137C13.1049 19.2531 12.8566 19.1242 12.6526 18.9395C12.6426 18.9305 12.6328 18.9212 12.6233 18.9116L4.56019 10.8354C4.36616 10.6346 4.22867 10.3861 4.16148 10.115C4.0943 9.84399 4.09987 9.56002 4.17765 9.29183C4.25542 9.02363 4.40264 8.78074 4.60441 8.5877C4.80618 8.39466 5.05534 8.25832 5.32671 8.19247L5.34144 8.18904L10.9085 6.94917L13.5503 2.99871C13.7122 2.73732 13.9293 2.5144 14.1866 2.34565C14.4493 2.17329 14.7473 2.0618 15.0586 2.01934ZM15.4989 3.62421C15.4266 3.60109 15.35 3.59442 15.2748 3.60467C15.1996 3.61493 15.1276 3.64186 15.0642 3.68349C15.0007 3.72513 14.9473 3.78041 14.908 3.84532C14.9019 3.85541 14.8955 3.86536 14.889 3.87517L12.0603 8.10506C11.9459 8.27609 11.77 8.39649 11.5692 8.44122L5.7293 9.74186L13.7249 17.7505L15.109 11.9533C15.1568 11.7528 15.2802 11.5786 15.4533 11.4668L19.7356 8.70367C19.7419 8.69964 19.7482 8.6957 19.7545 8.69185C19.8194 8.65249 19.8747 8.59912 19.9163 8.53565C19.958 8.47218 19.9849 8.40021 19.9952 8.32501C20.0054 8.2498 19.9987 8.17324 19.9756 8.10094C19.9535 8.03166 19.9167 7.96795 19.8679 7.91409L15.6857 3.73188C15.6319 3.6831 15.5682 3.64637 15.4989 3.62421Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M9.71973 13.8367C10.0333 14.148 10.0351 14.6545 9.72386 14.9681L4.36775 20.3635C4.05647 20.6771 3.54994 20.6789 3.23639 20.3676C2.92283 20.0564 2.92098 19.5498 3.23225 19.2363L8.58837 13.8409C8.89964 13.5273 9.40617 13.5255 9.71973 13.8367Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M6.90967 20.8C6.90967 20.3582 7.26784 20 7.70967 20H18.7999C19.2417 20 19.5999 20.3582 19.5999 20.8C19.5999 21.2418 19.2417 21.6 18.7999 21.6H7.70967C7.26784 21.6 6.90967 21.2418 6.90967 20.8Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M11.6034 2.56266C11.9934 2.20097 12.5056 2 13.0375 2C13.5694 2 14.0816 2.20097 14.4716 2.56266C14.4792 2.56971 14.4867 2.5769 14.494 2.58424L19.8176 7.92087C20.0103 8.1091 20.1637 8.33381 20.2688 8.58195C20.3748 8.83242 20.4295 9.10164 20.4295 9.37363C20.4295 9.64563 20.3748 9.91485 20.2688 10.1653C20.1636 10.4136 20.0101 10.6385 19.8172 10.8268L13.9774 16.6665C13.7895 16.8638 13.5633 17.0207 13.3126 17.1276C13.059 17.2357 12.7858 17.2904 12.5102 17.2882H8.22029C7.94676 17.288 7.67575 17.2319 7.42472 17.1233C7.17827 17.0166 6.95581 16.8615 6.77053 16.6672L3.58471 13.4945C3.57721 13.487 3.56986 13.4794 3.56266 13.4716C3.20097 13.0816 3 12.5694 3 12.0375C3 11.5056 3.20097 10.9934 3.56266 10.6034C3.56949 10.596 3.57645 10.5888 3.58355 10.5817L11.5817 2.58355C11.5888 2.57645 11.596 2.56949 11.6034 2.56266ZM12.6999 3.72803L4.72803 11.6999C4.64563 11.7929 4.6 11.913 4.6 12.0375C4.6 12.1618 4.64548 12.2817 4.72761 12.3746L7.90777 15.5417C7.91403 15.5479 7.92019 15.5543 7.92625 15.5607C7.96403 15.6009 8.00964 15.633 8.06028 15.6549C8.11092 15.6768 8.16551 15.6881 8.22068 15.6882H12.5222C12.5781 15.6888 12.6335 15.6778 12.6849 15.6558C12.7364 15.6339 12.7827 15.6015 12.821 15.5608C12.8267 15.5547 12.8325 15.5487 12.8383 15.5429L18.6985 9.68269C18.7399 9.64255 18.7729 9.59458 18.7954 9.54148C18.8179 9.48838 18.8295 9.4313 18.8295 9.37363C18.8295 9.31597 18.8179 9.25889 18.7954 9.20579C18.7729 9.15269 18.74 9.10465 18.6986 9.06451L18.6889 9.05512L13.3748 3.72778C13.2818 3.64554 13.1619 3.6 13.0375 3.6C12.913 3.6 12.7929 3.64563 12.6999 3.72803Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M9.22999 3.79971C7.95124 3.79971 6.9146 4.83634 6.9146 6.11509C6.9146 7.39384 7.95124 8.43048 9.22999 8.43048C10.5087 8.43048 11.5454 7.39384 11.5454 6.11509C11.5454 4.83634 10.5087 3.79971 9.22999 3.79971ZM5.3146 6.11509C5.3146 3.95268 7.06758 2.19971 9.22999 2.19971C11.3924 2.19971 13.1454 3.95268 13.1454 6.11509C13.1454 8.2775 11.3924 10.0305 9.22999 10.0305C7.06758 10.0305 5.3146 8.2775 5.3146 6.11509Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M16.4992 12.7997C14.4558 12.7997 12.7992 14.4563 12.7992 16.4997C12.7992 18.5432 14.4558 20.1997 16.4992 20.1997C18.5427 20.1997 20.1992 18.5432 20.1992 16.4997C20.1992 14.4563 18.5427 12.7997 16.4992 12.7997ZM11.1992 16.4997C11.1992 13.5726 13.5721 11.1997 16.4992 11.1997C19.4263 11.1997 21.7992 13.5726 21.7992 16.4997C21.7992 19.4268 19.4263 21.7997 16.4992 21.7997C13.5721 21.7997 11.1992 19.4268 11.1992 16.4997Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M20.2495 12.7497C20.5619 13.0621 20.5619 13.5686 20.2495 13.881L13.8802 20.2503C13.5678 20.5627 13.0613 20.5627 12.7489 20.2503C12.4364 19.9379 12.4364 19.4313 12.7489 19.1189L19.1181 12.7497C19.4305 12.4373 19.937 12.4373 20.2495 12.7497Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M7.66177 10.675C8.69312 10.4407 9.76408 10.4426 10.7946 10.6805C11.2251 10.7799 11.4935 11.2094 11.3941 11.6399C11.2947 12.0704 10.8652 12.3389 10.4347 12.2395C9.63914 12.0558 8.81238 12.0544 8.0162 12.2352C7.22002 12.4161 6.47503 12.7746 5.83691 13.2839C5.1988 13.7932 4.68407 14.4402 4.33122 15.1765C3.97836 15.9128 3.79651 16.7193 3.79925 17.5358L3.79926 17.5384L3.79925 18.8154H8.53772C8.97954 18.8154 9.33772 19.1735 9.33772 19.6154C9.33772 20.0572 8.97954 20.4154 8.53772 20.4154H2.99925C2.55743 20.4154 2.19925 20.0572 2.19925 19.6154V17.5397C2.19591 16.4826 2.43148 15.4384 2.88835 14.485C3.34543 13.5313 4.01219 12.6932 4.83879 12.0334C5.66538 11.3736 6.63043 10.9092 7.66177 10.675Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M10.2284 19.9698C10.5274 19.846 10.7223 19.5543 10.7223 19.2307V15.8769H11.3069C15.1111 15.8769 17.4187 13.9409 18.9113 11.5154C20.0749 9.62464 20.7778 7.37008 21.3533 5.52435C21.4943 5.07224 21.6276 4.64465 21.7582 4.25295C21.8719 3.9119 21.7441 3.5369 21.4458 3.33622C21.1475 3.13554 20.752 3.15846 20.4789 3.39227C19.9284 3.86364 19.4413 4.28971 19.0007 4.6751C17.7779 5.74473 16.9133 6.50094 16.0449 7.0422C14.946 7.72712 13.8603 8.04612 11.9992 8.04612H10.7223V4.69228C10.7223 4.36177 10.519 4.06528 10.2108 3.9461C9.9025 3.82692 9.55267 3.90958 9.33035 4.15414L2.40727 11.7695C2.12001 12.0855 2.13158 12.5714 2.43353 12.8733L9.35661 19.7964C9.58541 20.0252 9.9295 20.0937 10.2284 19.9698ZM4.10429 12.2814L9.1223 6.76156V8.84612C9.1223 9.28795 9.48047 9.64612 9.9223 9.64612H11.9992C14.0981 9.64612 15.4909 9.27282 16.8912 8.40005C17.6676 7.91616 18.4537 7.26999 19.3702 6.47683C18.8986 7.91308 18.3458 9.38143 17.5487 10.6768C16.2721 12.7513 14.4258 14.2769 11.3069 14.2769H9.9223C9.48047 14.2769 9.1223 14.6351 9.1223 15.0769V17.2994L4.10429 12.2814Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M8.853 4.63636C8.60968 4.63636 8.41244 4.83361 8.41244 5.07692V15.1469C8.41244 15.3902 8.60968 15.5874 8.853 15.5874H18.9229C19.1662 15.5874 19.3635 15.3902 19.3635 15.1469V5.07692C19.3635 4.83361 19.1662 4.63636 18.9229 4.63636H8.853ZM6.77608 5.07692C6.77608 3.92987 7.70595 3 8.853 3H18.9229C20.07 3 20.9999 3.92987 20.9999 5.07692V15.1469C20.9999 16.2939 20.07 17.2238 18.9229 17.2238H8.853C7.70595 17.2238 6.77608 16.2939 6.77608 15.1469V5.07692Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M17.2238 20.1818C17.2238 20.6337 16.8575 21 16.4056 21H5.07692C4.52609 21 3.99782 20.7812 3.60832 20.3917C3.21882 20.0022 3 19.4739 3 18.9231V7.5944C3 7.14253 3.36631 6.77622 3.81818 6.77622C4.27005 6.77622 4.63636 7.14253 4.63636 7.5944V18.9231C4.63636 19.0399 4.68278 19.152 4.7654 19.2346C4.84802 19.3172 4.96008 19.3636 5.07692 19.3636H16.4056C16.8575 19.3636 17.2238 19.7299 17.2238 20.1818Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M4 20.5217C4 20.0799 4.35817 19.7217 4.8 19.7217H17.8C18.2418 19.7217 18.6 20.0799 18.6 20.5217C18.6 20.9635 18.2418 21.3217 17.8 21.3217H4.8C4.35817 21.3217 4 20.9635 4 20.5217Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M17.116 4.6C17.0497 4.6 16.984 4.61309 16.923 4.63843C16.8619 4.66377 16.8067 4.70082 16.7604 4.74728L16.7573 4.75045L8.19681 13.2515L7.77388 15.8126L10.3097 15.358L18.8534 6.82296C18.9001 6.77688 18.937 6.72224 18.962 6.66226C18.9871 6.60228 19 6.53807 19 6.47329C19 6.40852 18.9871 6.34431 18.962 6.28433C18.937 6.22435 18.9001 6.1697 18.8535 6.12363L18.8511 6.12132L17.4739 4.7496L17.4716 4.74728C17.4253 4.70082 17.3701 4.66377 17.3091 4.63843C17.248 4.61309 17.1824 4.6 17.116 4.6ZM16.3097 3.16061C16.5653 3.05456 16.8393 3 17.116 3C17.3927 3 17.6667 3.05456 17.9223 3.16061C18.1773 3.26644 18.409 3.42148 18.6041 3.617L18.6054 3.61829L19.9779 4.98538L19.9791 4.98657C20.1755 5.18085 20.3315 5.41203 20.4381 5.66692C20.545 5.92233 20.6 6.1964 20.6 6.47329C20.6 6.75018 20.545 7.02426 20.4381 7.27967C20.3316 7.53433 20.1757 7.76532 19.9797 7.95949L19.9779 7.96121L11.2631 16.6672C11.1476 16.7826 10.9996 16.8598 10.8389 16.8886L6.94118 17.5874C6.68537 17.6333 6.42324 17.5521 6.23822 17.3696C6.05319 17.1871 5.96835 16.9261 6.01069 16.6697L6.66031 12.7357C6.6877 12.5698 6.76663 12.4168 6.88591 12.2984L15.6267 3.61829L15.6284 3.61653C15.8234 3.42123 16.0549 3.26635 16.3097 3.16061Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M18.8271 3.12427C20.2828 2.56437 21.7131 3.99471 21.1532 5.45045L15.5097 20.1236C14.9366 21.6136 12.8516 21.6756 12.191 20.2223L9.64857 14.6289L4.05518 12.0865C2.60192 11.4259 2.66392 9.34085 4.15386 8.7678L18.8271 3.12427ZM19.6599 4.87608C19.7221 4.71434 19.5632 4.55541 19.4014 4.61762L4.72823 10.2612C4.56268 10.3248 4.55579 10.5565 4.71727 10.6299L10.5838 13.2965C10.7599 13.3765 10.901 13.5176 10.981 13.6937L13.6476 19.5602C13.721 19.7217 13.9527 19.7148 14.0163 19.5493L19.6599 4.87608Z"], ["fill", "#00DAB3", "fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M15.203 9.07457C15.5154 9.38699 15.5154 9.89353 15.203 10.2059L10.8184 14.5906C10.506 14.903 9.99945 14.903 9.68703 14.5906C9.37461 14.2781 9.37461 13.7716 9.68703 13.4592L14.0716 9.07457C14.3841 8.76215 14.8906 8.76215 15.203 9.07457Z"], [1, "margin-bottom40", 2, "color", "#fff", "max-width", "360px"], [1, "margin-bottom60"], ["xmlns", "http://www.w3.org/2000/svg", "width", "256", "height", "242", "viewBox", "0 0 256 242", "fill", "none"], [1, "margin-bottom40", 2, "max-width", "360px"], [1, "cont-vert", "w100", "modal_540_black"], [1, "margin-bottom20"], [1, "cont-vert", "w100", "modal_540"], [1, "modal_540_black", "cont-vert-start-start"], [1, "margin-bottom50", "w100", "cont-horiz-start-start", 2, "color", "#FF6464"], [1, "margin-bottom10", "w100", 2, "color", "#fff"], [1, "margin-bottom70"], [1, "w100", "cont-horiz"], [1, "modal_540", "cont-vert-start-start"], [1, "margin-bottom50", "w100", "cont-horiz-start-start", 2, "color", "#E24414"], [1, "margin-bottom50", 2, "color", "#fff"], [1, "margin-bottom100", 2, "color", "#00DAB3"], [1, "btn-danger_no_contour", "margin-bottom40"], [1, "btn-green", "w100"], [1, "margin-bottom50"], [1, "margin-bottom20", 2, "color", "#00DAB3"], [1, "margin-bottom70", 2, "color", "#fff"], [1, "modal_540_black", "cont-vert"], [1, "modal_540", "cont-vert"], [1, "margin-bottom100", 2, "color", "#409B89"], [1, "w100", "modal_540_black", "cont-horiz"], [1, "cont-horiz-start-start", "w100", "margin-bottom60", 2, "color", "#fff"], [1, "cont-horiz-start-start", "w100", "margin-bottom20", "txt-green-light"], [1, "cont-horiz-start", "w100", "input-line", "margin-bottom10"], [1, "cont-horiz-between", "w100"], ["type", "text", "size", "16", "placeholder", "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 - \u043F\u0440\u0438\u043C\u0435\u0440"], [1, "cont-horiz-start-start", "w100", "margin-bottom100", "txt-gray-small", "margin-left20"], [1, "btn-green", "w100", "button-text", "cont-vert", 2, "max-width", "320px"], [1, "w100", "cont-horiz", "modal_540", 2, "background", "#FAFAFC", "z-index", "0"], [1, "cont-horiz-start-start", "w100", "margin-bottom60"], [1, "w100", "cont-horiz", "modal_540_black"], [1, "w100", "cont-horiz", "modal_540"], [1, "w100", "margin-bottom30", 2, "color", "#00DAB3"], [1, "cont-horiz-start-start", "w100", "margin-bottom60", "txt-gray-small", "margin-left20"], [1, "margin-bottom100", "cont-horiz-start", "w100", "input-line"], ["type", "text", "size", "16", "placeholder", "\u041F\u0435\u0434\u0438\u043A\u044E\u0440 - \u043F\u0440\u0438\u043C\u0435\u0440"], [1, "btn-green", "w100", "button-text", "cont-vert"], [1, "w100", "margin-bottom30", 2, "color", "#409B89"], [1, "cont-horiz-start-start", "w100", "margin-bottom50", 2, "color", "#fff"], [1, "w100", "margin-bottom100", 2, "color", "#00DAB3"], [1, "btn-danger_no_contour", "margin-bottom40", "w100", "cont-vert"], [1, "btn-green", "w100", "cont-vert"], [1, "cont-horiz-start-start", "w100", "margin-bottom50"], [1, "w100", "margin-bottom100", 2, "color", "#409B89"], [1, "w100", "margin-bottom40"], [1, "input-line", "cont-horiz-start", "margin-bottom60", 2, "min-width", "25px"], ["type", "number", "size", "5", 2, "border", "none", "width", "35px"], [1, "cont-vert", 2, "max-width", "360px", "text-align", "center"], [1, "w100", "margin-bottom10"], [1, "w100", "margin-bottom60"], [1, "w100", "margin-bottom10", "txt-green-light"], [1, "cont-horiz-start-start", "w100", "margin-bottom10", "txt-green-bold"], [1, "cont-horiz-start-start", "w100", "margin-bottom100", "txt-red-day"], [1, "cont-horiz-start-start", "w100", "margin-bottom100", "txt-green-bold"], [1, "w100", "margin-bottom20"], [1, "w100", "margin-bottom70"], [1, "cont-vert-start-start", 2, "max-width", "360px"], [1, "txt-green-light", "w100", "margin-bottom20"], [1, "cont-horiz-start", "margin-bottom40"], [1, "margin-right20"], ["xmlns", "http://www.w3.org/2000/svg", "width", "104", "height", "104", "viewBox", "0 0 104 104", "fill", "none"], ["id", "mask0_8966_8978", "maskUnits", "userSpaceOnUse", "x", "0", "y", "0", "width", "104", "height", "104", 2, "mask-type", "alpha"], ["cx", "52", "cy", "52", "r", "52", "fill", "white"], ["mask", "url(#mask0_8966_8978)"], ["cx", "52", "cy", "52", "r", "52", "fill", "#FAFAFC"], ["cx", "51.9157", "cy", "37.944", "r", "20.4332", "fill", "#C0C5D5"], ["d", "M20.4311 65.8833C12.5914 72.5553 7.43446 95.143 5.83594 104.665H88.6115C88.2639 102.58 87.1519 95.7407 85.4839 85.0654C83.3989 71.7212 75.8928 56.0835 65.4677 65.8833C57.1276 73.723 45.5904 68.3158 40.8644 64.6323C37.3198 62.2692 28.2708 59.2112 20.4311 65.8833Z", "fill", "#C0C5D5"], ["cx", "52", "cy", "52", "r", "51.5", "stroke", "#00DAB3"], [1, "cont-vert-start-center"], [1, "cont-horiz-start", "margin-right20"], ["xmlns", "http://www.w3.org/2000/svg", "width", "24", "height", "25", "viewBox", "0 0 24 25", "fill", "none"], ["d", "M12 2.5C11.7165 2.5 11.4388 2.58112 11.1999 2.73378C10.964 2.88448 10.7755 3.0987 10.6561 3.35169L8.38758 7.93159C8.38312 7.94059 8.37885 7.94968 8.37477 7.95886C8.37376 7.96114 8.37217 7.96312 8.37015 7.96459C8.36814 7.96607 8.36577 7.96699 8.36329 7.96726C8.35458 7.96823 8.3459 7.96935 8.33724 7.97064L3.34227 8.71063C3.06619 8.73747 2.80293 8.84108 2.58242 9.00998C2.35426 9.18475 2.18167 9.42193 2.08556 9.69279C1.98945 9.96364 1.97394 10.2566 2.04091 10.5361C2.10763 10.8145 2.25336 11.0677 2.46053 11.2653L6.11681 14.793L6.12514 14.8009C6.13036 14.8058 6.13428 14.8119 6.13654 14.8187C6.1388 14.8254 6.13933 14.8327 6.13808 14.8397L6.13727 14.8444L5.266 19.9435L5.26578 19.9448C5.21792 20.2211 5.24844 20.5052 5.3539 20.7651C5.45952 21.0253 5.63607 21.2507 5.86347 21.4156C6.09086 21.5804 6.35996 21.6782 6.64015 21.6976C6.91995 21.7171 7.19958 21.6577 7.44732 21.5263L7.44838 21.5257L11.9488 19.1472C11.9649 19.1402 11.9824 19.1365 12 19.1365C12.0177 19.1365 12.0351 19.1402 12.0513 19.1472L16.5516 21.5257C16.7995 21.6573 17.0799 21.7171 17.3598 21.6976C17.64 21.6782 17.9091 21.5804 18.1365 21.4156C18.3639 21.2507 18.5405 21.0253 18.6461 20.7651C18.7515 20.5054 18.7821 20.2213 18.7343 19.9451L18.734 19.9435L17.8627 14.8444L17.8619 14.8397C17.8607 14.8327 17.8612 14.8254 17.8635 14.8187C17.8657 14.8119 17.8696 14.8058 17.8749 14.8009L17.8832 14.793L21.5371 11.2675L21.5395 11.2652C21.7466 11.0677 21.8924 10.8145 21.9591 10.5361C22.0261 10.2566 22.0105 9.96364 21.9144 9.69279C21.8183 9.42193 21.6457 9.18475 21.4176 9.00998C21.1971 8.84108 20.9338 8.73747 20.6577 8.71063L15.6628 7.97064C15.6541 7.96935 15.6454 7.96823 15.6367 7.96726C15.6342 7.96699 15.6319 7.96607 15.6298 7.96459C15.6278 7.96312 15.6262 7.96114 15.6252 7.95886C15.6212 7.94968 15.6169 7.94059 15.6124 7.93159L13.3439 3.35173C13.2245 3.09872 13.036 2.88449 12.8001 2.73378C12.5612 2.58112 12.2835 2.5 12 2.5Z", "fill", "#FFAB00"], ["d", "M15.9115 4.39207C14.6913 3.80416 13.3542 3.49923 11.9998 3.5C10.3719 3.50054 8.77442 3.94261 7.37788 4.77913C5.98128 5.61568 4.83774 6.81537 4.06905 8.25044C3.30037 9.68551 2.93533 11.3022 3.01281 12.9283C3.08495 14.4425 3.53824 15.912 4.32822 17.2015L3.04139 20.6251C2.95944 20.8432 3.00097 21.0884 3.15015 21.2673C3.29932 21.4462 3.53311 21.5311 3.76231 21.4897L8.24833 20.6785C9.41231 21.2131 10.6778 21.4935 11.9604 21.4999C13.3148 21.5066 14.6533 21.2075 15.8761 20.6249C17.0989 20.0423 18.1744 19.1912 19.0225 18.1351C19.8705 17.0789 20.4693 15.845 20.7741 14.5253C21.0789 13.2055 21.0819 11.834 20.7828 10.513C20.4838 9.19192 19.8904 7.9554 19.047 6.89558C18.2035 5.83577 17.1317 4.98 15.9115 4.39207Z", "fill", "#67C4B2"], [1, "txt-gray-small", "w100", "margin-bottom40"], [1, "cont-horiz-start", "w100", "margin-bottom40"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M8.45718 3.8C8.45718 3.35817 8.09901 3 7.65718 3C7.21535 3 6.85718 3.35817 6.85718 3.8V5.72871V7.65714C6.85718 8.09897 7.21535 8.45714 7.65718 8.45714C8.09901 8.45714 8.45718 8.09897 8.45718 7.65714V6.52871H14.0857C14.5276 6.52871 14.8857 6.17054 14.8857 5.72871C14.8857 5.28688 14.5276 4.92871 14.0857 4.92871H8.45718V3.8ZM3.61089 5.5396C4.00204 5.14846 4.53255 4.92871 5.08571 4.92871C5.52754 4.92871 5.88571 5.28688 5.88571 5.72871C5.88571 6.17054 5.52754 6.52871 5.08571 6.52871C4.95689 6.52871 4.83335 6.57988 4.74226 6.67097C4.65117 6.76206 4.6 6.88561 4.6 7.01443V9.42871H19.7143V7.01443C19.7143 6.88561 19.6631 6.76206 19.572 6.67097C19.4809 6.57988 19.3574 6.52871 19.2286 6.52871H17.4572V7.65714C17.4572 8.09897 17.099 8.45714 16.6572 8.45714C16.2154 8.45714 15.8572 8.09897 15.8572 7.65714V5.7363L15.8571 5.72871L15.8572 5.72112V3.8C15.8572 3.35817 16.2154 3 16.6572 3C17.099 3 17.4572 3.35817 17.4572 3.8V4.92871H19.2286C19.7817 4.92871 20.3122 5.14846 20.7034 5.5396C21.0945 5.93075 21.3143 6.46126 21.3143 7.01443V10.2287V19.2287C21.3143 19.7819 21.0945 20.3124 20.7034 20.7035C20.3122 21.0947 19.7817 21.3144 19.2286 21.3144H5.08571C4.53255 21.3144 4.00204 21.0947 3.61089 20.7035C3.21974 20.3124 3 19.7819 3 19.2287V10.2287V7.01443C3 6.46126 3.21974 5.93075 3.61089 5.5396ZM4.6 19.2287V11.0287H19.7143V19.2287C19.7143 19.3575 19.6631 19.4811 19.572 19.5722C19.4809 19.6633 19.3574 19.7144 19.2286 19.7144H5.08571C4.9569 19.7144 4.83335 19.6633 4.74226 19.5722C4.65117 19.4811 4.6 19.3575 4.6 19.2287Z", "fill", "#67C4B2"], [1, "txt-green-light", "w100", "margin-bottom50"], [1, "cont-horiz", "w100", "margin-bottom50"], ["width", "228", "height", "228", "viewBox", "0 0 228 228", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["x", "0.5", "y", "0.5", "width", "227", "height", "227", "fill", "#67C4B2"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M109.644 100.667C109.934 100.659 110.218 100.75 110.449 100.925C110.681 101.101 110.844 101.35 110.914 101.632L110.915 101.635L111.653 104.588C111.777 105.082 112.221 105.429 112.731 105.429H127.017C127.353 105.429 127.676 105.563 127.914 105.801C128.153 106.04 128.286 106.363 128.286 106.699V126.937C128.286 127.274 128.153 127.597 127.914 127.835C127.676 128.073 127.353 128.207 127.017 128.207H123.649L110.633 116.016C110.617 116.001 110.601 115.987 110.585 115.973C110.155 115.615 109.614 115.419 109.054 115.419C108.51 115.419 107.983 115.605 107.559 115.944L99.5562 121.7V101.937C99.5562 101.601 99.69 101.278 99.9281 101.039C100.166 100.801 100.489 100.668 100.826 100.668H109.612C109.623 100.668 109.633 100.667 109.644 100.667ZM99.5562 124.437V126.937C99.5562 127.274 99.69 127.597 99.9281 127.835C100.166 128.073 100.489 128.207 100.826 128.207H120.398L109.149 117.67C109.121 117.651 109.088 117.641 109.054 117.641C109.015 117.641 108.977 117.655 108.946 117.68C108.926 117.697 108.905 117.713 108.884 117.729L99.5562 124.437ZM123.187 130.429H100.826C99.8999 130.429 99.0117 130.062 98.3568 129.407C97.7019 128.752 97.334 127.864 97.334 126.937V101.937C97.334 101.011 97.7019 100.123 98.3568 99.4681C99.0117 98.8133 99.8999 98.4453 100.826 98.4453H109.597C110.389 98.4263 111.163 98.6768 111.794 99.1562C112.429 99.6387 112.88 100.324 113.071 101.098L113.071 101.1L113.598 103.207H127.017C127.943 103.207 128.831 103.575 129.486 104.23C130.141 104.885 130.509 105.773 130.509 106.699V126.937C130.509 127.864 130.141 128.752 129.486 129.407C128.831 130.062 127.943 130.429 127.017 130.429H123.233C123.218 130.43 123.202 130.43 123.187 130.429ZM120.729 110.498C122.088 110.498 123.19 111.6 123.19 112.959C123.19 114.317 122.088 115.419 120.729 115.419C119.37 115.419 118.269 114.317 118.269 112.959C118.269 111.6 119.37 110.498 120.729 110.498ZM125.412 112.959C125.412 110.373 123.315 108.276 120.729 108.276C118.143 108.276 116.047 110.373 116.047 112.959C116.047 115.545 118.143 117.641 120.729 117.641C123.315 117.641 125.412 115.545 125.412 112.959Z", "fill", "white"], ["x", "0.5", "y", "0.5", "width", "227", "height", "227", "stroke", "#9196A4"], [1, "w100", "btn-danger_no_contour", "margin-bottom40", 2, "text-align", "center"], [1, "margin-bottom60", 2, "color", "#fff"], [1, "txt-green-light", "w100", "margin-bottom30"], ["type", "text", "size", "16", "placeholder", "\u041C\u0430\u043D\u0438\u043A\u044E\u0440"], [1, "cont-horiz-start", "w100", "margin-bottom30", "txt-green-light"], [1, "w100", "margin-bottom30"], [1, "w100", "margin-bottom50"], [2, "max-width", "540px", "padding", "30px 30px 50px 30px", "background-color", "#fff"], [1, "box-white", "margin-bottom10"], [1, "txt-green-light", "margin-bottom10"], [1, "box-white"], [1, "modal_540_black"], [1, "box-black", "margin-bottom10"], [1, "txt-green-light2", "margin-bottom10"], [1, "box-black"], [1, "modal_540"], [1, "btn-green", "margin-bottom30", "cont-horiz"], ["width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M4.83456 4.83431C4.98459 4.68429 5.18807 4.6 5.40024 4.6H18.2002C18.4124 4.6 18.6159 4.68429 18.7659 4.83431C18.916 4.98434 19.0002 5.18783 19.0002 5.4V9.03077C19.0002 9.4726 19.3584 9.83077 19.8002 9.83077C20.2421 9.83077 20.6002 9.4726 20.6002 9.03077V5.4C20.6002 4.76348 20.3474 4.15303 19.8973 3.70294C19.4472 3.25286 18.8368 3 18.2002 3H5.40024C4.76372 3 4.15328 3.25286 3.70319 3.70294C3.2531 4.15303 3.00024 4.76348 3.00024 5.4V11.9806C2.99992 11.9937 2.99992 12.0068 3.00024 12.02V18.2C3.00024 18.8365 3.2531 19.447 3.70319 19.8971C4.15327 20.3471 4.76372 20.6 5.40024 20.6H8.45409C8.89592 20.6 9.25409 20.2418 9.25409 19.8C9.25409 19.3582 8.89592 19 8.45409 19H5.40024C5.18807 19 4.98459 18.9157 4.83456 18.7657C4.68453 18.6157 4.60024 18.4122 4.60024 18.2V12.6887C5.07644 12.6302 5.56168 12.6 6.05429 12.6C7.99414 12.6 9.82237 13.0679 11.4345 13.8963C11.8275 14.0982 12.3098 13.9433 12.5117 13.5503C12.7136 13.1574 12.5587 12.6751 12.1658 12.4732C10.3327 11.5312 8.25436 11 6.05429 11C5.56321 11 5.07806 11.0265 4.60024 11.0781V5.4C4.60024 5.18783 4.68453 4.98434 4.83456 4.83431ZM18.1011 10.8159C17.9509 10.6657 17.7473 10.5814 17.535 10.5815C17.3227 10.5817 17.1191 10.6662 16.9691 10.8165L11.1845 16.6134C11.0621 16.7361 10.9828 16.8952 10.9586 17.0669L10.5894 19.6884C10.5544 19.9366 10.6378 20.1868 10.8146 20.3644C10.9914 20.542 11.2412 20.6265 11.4895 20.5927L14.111 20.2358C14.2843 20.2122 14.4451 20.1324 14.5688 20.0088L20.3657 14.2118C20.6781 13.8994 20.6781 13.3929 20.3657 13.0805L18.1011 10.8159ZM12.5057 17.5545L17.536 12.5135L18.6686 13.6462L13.628 18.6868L12.3212 18.8647L12.5057 17.5545ZM14.2784 6.80898C13.8706 6.80898 13.5399 7.13961 13.5399 7.54745C13.5399 7.95529 13.8706 8.28591 14.2784 8.28591C14.6862 8.28591 15.0169 7.95529 15.0169 7.54745C15.0169 7.13961 14.6862 6.80898 14.2784 6.80898ZM11.9399 7.54745C11.9399 6.25595 12.9869 5.20898 14.2784 5.20898C15.5699 5.20898 16.6169 6.25595 16.6169 7.54745C16.6169 8.83894 15.5699 9.88591 14.2784 9.88591C12.9869 9.88591 11.9399 8.83894 11.9399 7.54745Z", "fill", "white"], [2, "gap", "20px 20px", "display", "flex", "flex-flow", "column nowrap"], [1, "cont-horiz-start", "toast_day"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M20.5649 6.43451C20.8773 6.74693 20.8773 7.25346 20.5649 7.56588L10.5649 17.5659C10.2525 17.8783 9.74595 17.8783 9.43353 17.5659L4.43353 12.5659C4.12111 12.2535 4.12111 11.7469 4.43353 11.4345C4.74595 11.1221 5.25248 11.1221 5.5649 11.4345L9.99922 15.8688L19.4335 6.43451C19.746 6.12209 20.2525 6.12209 20.5649 6.43451Z", "fill", "#67C4B2"], [1, "txt-green-bold"], [1, "cont-horiz-start", "toast_night"], [1, "cont-horiz-start", "toast_day_no"], ["d", "M13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V8Z", "fill", "#E24414"], ["d", "M12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16C11 15.7348 11.1054 15.4804 11.2929 15.2929C11.4804 15.1054 11.7348 15 12 15C12.2652 15 12.5196 15.1054 12.7071 15.2929C12.8946 15.4804 13 15.7348 13 16C13 16.2652 12.8946 16.5196 12.7071 16.7071Z", "fill", "#E24414"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M12 20.4C16.6392 20.4 20.4 16.6392 20.4 12C20.4 7.36081 16.6392 3.6 12 3.6C7.36081 3.6 3.6 7.36081 3.6 12C3.6 16.6392 7.36081 20.4 12 20.4ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z", "fill", "#E24414"], [1, "txt-red-day-bold"], [1, "cont-horiz-start", "toast_night_no"], ["d", "M13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V8Z", "fill", "#FF6464"], ["d", "M12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16C11 15.7348 11.1054 15.4804 11.2929 15.2929C11.4804 15.1054 11.7348 15 12 15C12.2652 15 12.5196 15.1054 12.7071 15.2929C12.8946 15.4804 13 15.7348 13 16C13 16.2652 12.8946 16.5196 12.7071 16.7071Z", "fill", "#FF6464"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M12 20.4C16.6392 20.4 20.4 16.6392 20.4 12C20.4 7.36081 16.6392 3.6 12 3.6C7.36081 3.6 3.6 7.36081 3.6 12C3.6 16.6392 7.36081 20.4 12 20.4ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z", "fill", "#FF6464"], [1, "txt-red-night-bold"]],
  template: function StranicaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " \u0412\u044B \u0441\u043E\u0437\u0434\u0430\u043B\u0438 \u043F\u0435\u0440\u0432\u044B\u0439 \u0433\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " \u041C\u043E\u0436\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0433\u0440\u0430\u0444\u0438\u043A\u043E\u0432 \u0440\u0430\u0431\u043E\u0442\u044B, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440:");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " \u041F\u0440\u0430\u0437\u0434\u043D\u0438\u0447\u043D\u044B\u0435 \u0434\u043D\u0438, \u041B\u0435\u0442\u043D\u0438\u0439 \u0433\u0440\u0430\u0444\u0438\u043A \u0438 \u0442.\u043F. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "path", 6)(11, "path", 7)(12, "path", 8)(13, "path", 9)(14, "path", 10)(15, "path", 11)(16, "path", 12)(17, "path", 13)(18, "path", 14)(19, "path", 15)(20, "path", 16)(21, "path", 17)(22, "path", 18)(23, "path", 19)(24, "path", 20)(25, "path", 21)(26, "path", 22)(27, "path", 23)(28, "path", 24)(29, "path", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, " \u0425\u043E\u0440\u043E\u0448\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 27)(33, "div", 2)(34, "h1", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, " \u0412\u044B \u0441\u043E\u0437\u0434\u0430\u043B\u0438 \u043F\u0435\u0440\u0432\u044B\u0439 \u0433\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "p", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, " \u041C\u043E\u0436\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0433\u0440\u0430\u0444\u0438\u043A\u043E\u0432 \u0440\u0430\u0431\u043E\u0442\u044B, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440:");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, " \u041F\u0440\u0430\u0437\u0434\u043D\u0438\u0447\u043D\u044B\u0435 \u0434\u043D\u0438, \u041B\u0435\u0442\u043D\u0438\u0439 \u0433\u0440\u0430\u0444\u0438\u043A \u0438 \u0442.\u043F. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "svg", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "path", 30)(42, "path", 7)(43, "path", 31)(44, "path", 32)(45, "path", 33)(46, "path", 34)(47, "path", 35)(48, "path", 36)(49, "path", 37)(50, "path", 38)(51, "path", 39)(52, "path", 40)(53, "path", 41)(54, "path", 42)(55, "path", 43)(56, "path", 44)(57, "path", 45)(58, "path", 46)(59, "path", 47)(60, "path", 48);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, " \u0425\u043E\u0440\u043E\u0448\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 49)(64, "div", 2)(65, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, " \u041A\u043E\u043D\u0442\u0430\u043A\u0442 \u0434\u043B\u044F \u0441\u0432\u044F\u0437\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, " \u0418\u043C\u044F \u0411\u0410 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, " \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 52)(72, "div", 2)(73, "h1", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, " \u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0432\u0440\u0435\u043C\u044F \u0434\u043B\u044F \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "div", 54)(76, "div")(77, "div", 55)(78, "div", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, " \u041D\u0430\u0447\u0430\u043B\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "div", 57)(81, "div")(82, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](83, " \u0447\u0430\u0441\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "div", 59)(85, "select", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](86, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "div", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](88, " : ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "div")(90, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91, " \u043C\u0438\u043D\u0443\u0442\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "div", 59)(93, "select", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](94, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "div")(96, "div", 62)(97, "div", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](98, " \u041A\u043E\u043D\u0435\u0446 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "div", 57)(100, "div")(101, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](102, " \u0447\u0430\u0441\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "div", 59)(104, "select", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](105, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "div", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](107, " : ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "div")(109, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](110, " \u043C\u0438\u043D\u0443\u0442\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "div", 59)(112, "select", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](113, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](115, " \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "div", 63)(117, "div", 2)(118, "h1", 64);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](119, " \u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0432\u0440\u0435\u043C\u044F \u0434\u043B\u044F \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "div", 54)(121, "div")(122, "div", 55)(123, "div", 65);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](124, " \u041D\u0430\u0447\u0430\u043B\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "div", 57)(126, "div")(127, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](128, " \u0447\u0430\u0441\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "div", 59)(130, "select", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](131, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "div", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](133, " : ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](134, "div")(135, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](136, " \u043C\u0438\u043D\u0443\u0442\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](137, "div", 59)(138, "select", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](139, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](140, "div")(141, "div", 62)(142, "div", 65);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](143, " \u041A\u043E\u043D\u0435\u0446 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "div", 57)(145, "div")(146, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](147, " \u0447\u0430\u0441\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](148, "div", 59)(149, "select", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](150, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](151, "div", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](152, " : ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](153, "div")(154, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](155, " \u043C\u0438\u043D\u0443\u0442\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](156, "div", 59)(157, "select", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](158, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](159, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](160, " \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](161, "div", 49)(162, "div", 2)(163, "h1", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](164, " \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](165, "div", 66)(166, "div")(167, "div", 67);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](168, " \u0447\u0430\u0441\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](169, "div", 59)(170, "select", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](171, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](172, "div", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](173, " : ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](174, "div")(175, "div", 67);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](176, " \u043C\u0438\u043D\u0443\u0442\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](177, "div", 59)(178, "select", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](179, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](180, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](181, " \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](182, "div", 68)(183, "div", 2)(184, "h1", 64);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](185, " \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](186, "div", 66)(187, "div")(188, "div", 67);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](189, " \u0447\u0430\u0441\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](190, "div", 59)(191, "select", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](192, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](193, "div", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](194, " : ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](195, "div")(196, "div", 67);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](197, " \u043C\u0438\u043D\u0443\u0442\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](198, "div", 59)(199, "select", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](200, "option");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](201, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](202, " \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](203, "div", 49)(204, "div", 2)(205, "h1", 69);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](206, " \u0413\u043E\u0442\u043E\u0432\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](207, "p", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](208, " \u0420\u0430\u0441\u0447\u0451\u0442\u043D\u043E\u0439 \u0432\u0430\u043B\u044E\u0442\u043E\u0439 \u0432\u044B\u0431\u0440\u0430\u043D\u043E");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](209, "br")(210, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](211, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](212, "\u0410\u0437\u0435\u0440\u0431\u0430\u0439\u0434\u0436\u0430\u043D\u0441\u043A\u0438\u0439 \u043C\u0430\u043D\u0430\u0442");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](213, "br")(214, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](215, " \u0412 \u044D\u0442\u043E\u0439 \u0432\u0430\u043B\u044E\u0442\u0435 \u0431\u0443\u0434\u0443\u0442 \u0443\u043A\u0430\u0437\u0430\u043D\u044B \u0432\u0430\u0448\u0438 \u0443\u0441\u043B\u0443\u0433\u0438.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](216, "br")(217, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](218, " \u0412 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435 \u0432\u0441\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u0443\u043A\u0430\u0437\u0430\u043D\u0430 \u0432 \u0440\u0443\u0431\u043B\u044F\u0445. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](219, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](220, " \u041E\u0442\u043B\u0438\u0447\u043D\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](221, "div", 68)(222, "div", 2)(223, "h1", 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](224, " \u0413\u043E\u0442\u043E\u0432\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](225, "p", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](226, " \u0420\u0430\u0441\u0447\u0451\u0442\u043D\u043E\u0439 \u0432\u0430\u043B\u044E\u0442\u043E\u0439 \u0432\u044B\u0431\u0440\u0430\u043D\u043E");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](227, "br")(228, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](229, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](230, "\u0410\u0437\u0435\u0440\u0431\u0430\u0439\u0434\u0436\u0430\u043D\u0441\u043A\u0438\u0439 \u043C\u0430\u043D\u0430\u0442");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](231, "br")(232, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](233, " \u0412 \u044D\u0442\u043E\u0439 \u0432\u0430\u043B\u044E\u0442\u0435 \u0431\u0443\u0434\u0443\u0442 \u0443\u043A\u0430\u0437\u0430\u043D\u044B \u0432\u0430\u0448\u0438 \u0443\u0441\u043B\u0443\u0433\u0438.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](234, "br")(235, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](236, " \u0412 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435 \u0432\u0441\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u0443\u043A\u0430\u0437\u0430\u043D\u0430 \u0432 \u0440\u0443\u0431\u043B\u044F\u0445. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](237, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](238, " \u041E\u0442\u043B\u0438\u0447\u043D\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](239, "div", 49)(240, "div", 2)(241, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](242, " \u041A\u043E\u043D\u0442\u0430\u043A\u0442 \u0434\u043B\u044F \u0441\u0432\u044F\u0437\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](243, "div", 29)(244, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](245, " \u0418\u043C\u044F \u0411\u0410 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](246, "div", 71);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](247, " +7 (911) 123-45-67 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](248, "div", 68)(249, "div", 2)(250, "h1", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](251, " \u041A\u043E\u043D\u0442\u0430\u043A\u0442 \u0434\u043B\u044F \u0441\u0432\u044F\u0437\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](252, "div", 29)(253, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](254, " \u0418\u043C\u044F \u0411\u0410 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](255, "div", 71);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](256, " +7 (911) 123-45-67 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](257, "div", 49)(258, "div", 2)(259, "h2", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](260, " \u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0444\u0430\u0439\u043B \u0438\u0437: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](261, "div", 72);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](262, " \u0413\u0430\u043B\u0435\u0440\u0435\u044F \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](263, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](264, " \u0410\u043B\u044C\u0431\u043E\u043C\u044B \u043F\u0440\u043E\u0444\u0438\u043B\u044F ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](265, "div", 68)(266, "div", 2)(267, "h2", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](268, " \u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0444\u0430\u0439\u043B \u0438\u0437: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](269, "div", 72);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](270, " \u0413\u0430\u043B\u0435\u0440\u0435\u044F \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](271, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](272, " \u0410\u043B\u044C\u0431\u043E\u043C\u044B \u043F\u0440\u043E\u0444\u0438\u043B\u044F ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](273, "div", 49)(274, "div", 2)(275, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](276, " \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0432 \u0447\u0435\u0440\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](277, "svg", 73)(278, "g", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](279, "path", 75)(280, "path", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](281, "defs")(282, "clipPath", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](283, "path", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](284, "p", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](285, " \u0412\u044B \u0442\u043E\u0447\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](286, "br")(287, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](288, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](289, "\u0418\u043D\u0441\u0442\u0430\u0441\u0430\u043C\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](290, "br")(291, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](292, " \u0432 \u0447\u0435\u0440\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A?");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](293, "br")(294, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](295, " \u0427\u0435\u0440\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A\u2014 \u044D\u0442\u043E \u0441\u043F\u0438\u0441\u043E\u043A \u043D\u043E\u043C\u0435\u0440\u043E\u0432, \u0441 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0432\u044B \u043D\u0435 \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](296, "div", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](297, " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](298, "div", 80);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](299, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](300, "div", 68)(301, "div", 2)(302, "h1", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](303, " \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0432 \u0447\u0435\u0440\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](304, "svg", 73)(305, "g", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](306, "path", 75)(307, "path", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](308, "defs")(309, "clipPath", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](310, "path", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](311, "p", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](312, " \u0412\u044B \u0442\u043E\u0447\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](313, "br")(314, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](315, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](316, "\u0418\u043D\u0441\u0442\u0430\u0441\u0430\u043C\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](317, "br")(318, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](319, " \u0432 \u0447\u0435\u0440\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A?");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](320, "br")(321, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](322, " \u0427\u0435\u0440\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A\u2014 \u044D\u0442\u043E \u0441\u043F\u0438\u0441\u043E\u043A \u043D\u043E\u043C\u0435\u0440\u043E\u0432, \u0441 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0432\u044B \u043D\u0435 \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](323, "div", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](324, " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](325, "div", 80);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](326, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](327, "div", 49)(328, "div", 2)(329, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](330, " \u041E\u0447\u0438\u0441\u0442\u043A\u0430 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](331, "svg", 73)(332, "g", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](333, "path", 75)(334, "path", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](335, "defs")(336, "clipPath", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](337, "path", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](338, "p", 81);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](339, " \u0412\u044B \u0442\u043E\u0447\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0431\u0435\u0437\u0432\u043E\u0437\u0432\u0440\u0430\u0442\u043D\u043E \u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0443 \u0441");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](340, "br")(341, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](342, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](343, "\u0418\u043D\u0441\u0442\u0430\u0441\u0430\u043C\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](344, "br")(345, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](346, "div", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](347, " \u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](348, "div", 80);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](349, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](350, "div", 68)(351, "div", 2)(352, "h1", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](353, " \u041E\u0447\u0438\u0441\u0442\u043A\u0430 \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](354, "svg", 73)(355, "g", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](356, "path", 75)(357, "path", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](358, "defs")(359, "clipPath", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](360, "path", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](361, "p", 82);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](362, " \u0412\u044B \u0442\u043E\u0447\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0431\u0435\u0437\u0432\u043E\u0437\u0432\u0440\u0430\u0442\u043D\u043E \u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0443 \u0441");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](363, "br")(364, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](365, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](366, "\u0418\u043D\u0441\u0442\u0430\u0441\u0430\u043C\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](367, "br")(368, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](369, "div", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](370, " \u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](371, "div", 80);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](372, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](373, "div", 49)(374, "div", 2)(375, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](376, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0447\u0430\u0442\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](377, "svg", 73)(378, "g", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](379, "path", 75)(380, "path", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](381, "defs")(382, "clipPath", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](383, "path", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](384, "p", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](385, " \u0412\u044B \u0442\u043E\u0447\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0431\u0435\u0437\u0432\u043E\u0437\u0432\u0440\u0430\u0442\u043D\u043E \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0435\u0441\u044C \u0447\u0430\u0442 \u0441");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](386, "br")(387, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](388, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](389, "\u0418\u043D\u0441\u0442\u0430\u0441\u0430\u043C\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](390, "br")(391, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](392, "div", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](393, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](394, "div", 80);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](395, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](396, "div", 68)(397, "div", 2)(398, "h1", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](399, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0447\u0430\u0442\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](400, "svg", 73)(401, "g", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](402, "path", 75)(403, "path", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](404, "defs")(405, "clipPath", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](406, "path", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](407, "p", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](408, " \u0412\u044B \u0442\u043E\u0447\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0431\u0435\u0437\u0432\u043E\u0437\u0432\u0440\u0430\u0442\u043D\u043E \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0435\u0441\u044C \u0447\u0430\u0442 \u0441");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](409, "br")(410, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](411, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](412, "\u0418\u043D\u0441\u0442\u0430\u0441\u0430\u043C\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](413, "br")(414, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](415, "div", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](416, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](417, "div", 80);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](418, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](419, "div", 49)(420, "div", 2)(421, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](422, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0438\u0437 \u0447\u0435\u0440\u043D\u043E\u0433\u043E \u0441\u043F\u0438\u0441\u043A\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](423, "svg", 73)(424, "g", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](425, "path", 75)(426, "path", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](427, "defs")(428, "clipPath", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](429, "path", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](430, "p", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](431, " \u0412\u044B \u0442\u043E\u0447\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](432, "br")(433, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](434, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](435, "\u0418\u043D\u0441\u0442\u0430\u0441\u0430\u043C\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](436, "br")(437, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](438, " \u0438\u0437 \u0447\u0435\u0440\u043D\u043E\u0433\u043E \u0441\u043F\u0438\u0441\u043A\u0430?");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](439, "br")(440, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](441, "span", 83);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](442, " \u041F\u043E\u0441\u043B\u0435 \u044D\u0442\u043E\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441\u043D\u043E\u0432\u0430 \u0441\u043C\u043E\u0436\u0435\u0442 \u043F\u0438\u0441\u0430\u0442\u044C \u0432\u0430\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](443, "div", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](444, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](445, "div", 80);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](446, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](447, "div", 68)(448, "div", 2)(449, "h1", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](450, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0438\u0437 \u0447\u0435\u0440\u043D\u043E\u0433\u043E \u0441\u043F\u0438\u0441\u043A\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](451, "svg", 73)(452, "g", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](453, "path", 75)(454, "path", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](455, "defs")(456, "clipPath", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](457, "path", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](458, "p", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](459, " \u0412\u044B \u0442\u043E\u0447\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](460, "br")(461, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](462, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](463, "\u0418\u043D\u0441\u0442\u0430\u0441\u0430\u043C\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](464, "br")(465, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](466, " \u0438\u0437 \u0447\u0435\u0440\u043D\u043E\u0433\u043E \u0441\u043F\u0438\u0441\u043A\u0430?");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](467, "br")(468, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](469, "span", 84);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](470, " \u041F\u043E\u0441\u043B\u0435 \u044D\u0442\u043E\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441\u043D\u043E\u0432\u0430 \u0441\u043C\u043E\u0436\u0435\u0442 \u043F\u0438\u0441\u0430\u0442\u044C \u0432\u0430\u043C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](471, "div", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](472, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](473, "div", 80);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](474, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](475, "div", 49)(476, "div", 2)(477, "div", 85);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](478, "svg", 86)(479, "g", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](480, "path", 87)(481, "path", 88);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](482, "defs")(483, "clipPath", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](484, "path", 89);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](485, "h3", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](486, " \u0420\u043E\u043C\u0430\u0448\u043A\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](487, "p", 91)(488, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](489, "\u0421\u0435\u0430\u043D\u0441 \u043E\u043A\u043E\u043D\u0447\u0435\u043D!");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](490, "p", 92);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](491, " \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u043E\u0431 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u0435 \u0438 \u043E\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0445 \u0443\u0441\u043B\u0443\u0433\u0430\u0445. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](492, "br")(493, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](494, " \u0425\u043E\u0440\u043E\u0448\u0438\u0439 \u043E\u0442\u0437\u044B\u0432 \u043C\u043E\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044F, \u0430 \u043D\u0435\u0433\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0443\u0431\u0435\u0440\u0435\u0436\u0435\u0442 \u0434\u0440\u0443\u0433\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043E\u0442 \u043D\u0435\u0434\u043E\u0431\u0440\u043E\u0441\u043E\u0432\u0435\u0441\u0442\u043D\u044B\u0445 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u0435\u0439! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](495, "p", 93)(496, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](497, "\u041F\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](498, "div", 94);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](499, "svg", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](500, "path", 96);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](501, "svg", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](502, "path", 96);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](503, "svg", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](504, "path", 96);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](505, "svg", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](506, "path", 96);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](507, "svg", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](508, "path", 96);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](509, "textarea", 97);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](510, "            ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](511, "div", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](512, " \u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](513, "div", 68)(514, "div", 2)(515, "div", 85);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](516, "svg", 86)(517, "g", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](518, "path", 87)(519, "path", 88);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](520, "defs")(521, "clipPath", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](522, "path", 89);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](523, "h3")(524, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](525, "\u0420\u043E\u043C\u0430\u0448\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](526, "div", 98);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](527, " \u0421\u0435\u0430\u043D\u0441 \u043E\u043A\u043E\u043D\u0447\u0435\u043D! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](528, "p", 99);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](529, " \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u043E\u0431 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u0435 \u0438 \u043E\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0445 \u0443\u0441\u043B\u0443\u0433\u0430\u0445. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](530, "br")(531, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](532, " \u0425\u043E\u0440\u043E\u0448\u0438\u0439 \u043E\u0442\u0437\u044B\u0432 \u043C\u043E\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044F, \u0430 \u043D\u0435\u0433\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0443\u0431\u0435\u0440\u0435\u0436\u0435\u0442 \u0434\u0440\u0443\u0433\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043E\u0442 \u043D\u0435\u0434\u043E\u0431\u0440\u043E\u0441\u043E\u0432\u0435\u0441\u0442\u043D\u044B\u0445 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u0435\u0439! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](533, "p", 100)(534, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](535, "\u041F\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](536, "div", 94);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](537, "svg", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](538, "path", 96);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](539, "svg", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](540, "path", 96);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](541, "svg", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](542, "path", 96);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](543, "svg", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](544, "path", 96);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](545, "svg", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](546, "path", 96);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](547, "textarea", 97);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](548, "            ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](549, "div", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](550, " \u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](551, "div", 49)(552, "h2", 93);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](553, " \u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](554, "div", 101)(555, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](556, "img", 102);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](557, "div", 103);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](558, " WhatsApp ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](559, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](560, "img", 104);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](561, "div", 105);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](562, " Telegram ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](563, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](564, "img", 106);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](565, "div", 107);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](566, " SMS ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](567, "div", 68)(568, "h2", 100);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](569, " \u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](570, "div", 101)(571, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](572, "img", 108);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](573, "div", 109);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](574, " WhatsApp ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](575, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](576, "img", 110);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](577, "div", 111);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](578, " Telegram ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](579, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](580, "img", 106);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](581, "div", 112);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](582, " SMS ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](583, "div", 49)(584, "h2", 93);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](585, " \u041F\u0440\u0438\u0433\u043B\u0430\u0441\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](586, "div", 101)(587, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](588, "svg", 113);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](589, "path", 114)(590, "path", 115);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](591, "div", 116);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](592, " WhatsApp ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](593, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](594, "svg", 117);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](595, "path", 118)(596, "path", 119);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](597, "defs")(598, "linearGradient", 120);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](599, "stop", 121)(600, "stop", 122);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](601, "div", 105);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](602, " Telegram ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](603, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](604, "svg", 123);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](605, "rect", 124)(606, "path", 125);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](607, "div", 107);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](608, " VK ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](609, "div", 126)(610, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](611, "svg", 127);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](612, "path", 128)(613, "path", 129);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](614, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](615, " \u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](616, "div", 130)(617, "h2", 100);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](618, " \u041F\u0440\u0438\u0433\u043B\u0430\u0441\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](619, "div", 101)(620, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](621, "svg", 113);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](622, "path", 114)(623, "path", 115);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](624, "div", 109);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](625, " WhatsApp ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](626, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](627, "svg", 117);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](628, "path", 118)(629, "path", 119);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](630, "defs")(631, "linearGradient", 120);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](632, "stop", 121)(633, "stop", 122);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](634, "div", 111);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](635, " Telegram ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](636, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](637, "svg", 123);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](638, "rect", 124)(639, "path", 125);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](640, "div", 112);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](641, " VK ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](642, "div", 126)(643, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](644, "svg", 127);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](645, "path", 128)(646, "path", 129);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](647, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](648, " \u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](649, "div", 131)(650, "div", 132)(651, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](652, "\u041E\u0442\u043C\u0435\u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](653, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](654, "svg", 73)(655, "g", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](656, "path", 75)(657, "path", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](658, "defs")(659, "clipPath", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](660, "path", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](661, "div", 133)(662, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](663, "\u0421\u0432\u0435\u0442\u043B\u0430\u043D\u0430 \u0425\u0440\u0430\u043C\u043E\u0432\u0441\u043A\u0438\u0445");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](664, "div", 134)(665, "div", 135);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](666, " \u0421\u0442\u0430\u0442\u0443\u0441: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](667, "div", 136)(668, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](669, "\u041D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](670, "div", 133);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](671, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C \u043D\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](672, "div", 137)(673, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](674, "14 \u043C\u0430\u044F \u0432 12:30 ?");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](675, "textarea", 138);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](676, "        ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](677, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](678, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](679, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](680, "div", 140)(681, "div", 132)(682, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](683, "\u041E\u0442\u043C\u0435\u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](684, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](685, "svg", 73)(686, "g", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](687, "path", 75)(688, "path", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](689, "defs")(690, "clipPath", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](691, "path", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](692, "div", 50)(693, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](694, "\u0421\u0432\u0435\u0442\u043B\u0430\u043D\u0430 \u0425\u0440\u0430\u043C\u043E\u0432\u0441\u043A\u0438\u0445");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](695, "div", 134)(696, "div", 141);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](697, " \u0421\u0442\u0430\u0442\u0443\u0441: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](698, "div", 136)(699, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](700, "\u041D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](701, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](702, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C \u043D\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](703, "div", 142)(704, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](705, "14 \u043C\u0430\u044F \u0432 12:30 ?");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](706, "textarea", 138);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](707, "        ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](708, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](709, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](710, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](711, "div", 49)(712, "div", 2)(713, "h1", 69);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](714, " \u041E\u0442\u043B\u0438\u0447\u043D\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](715, "p", 143);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](716, " \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](717, "p", 137)(718, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](719, "\u041F\u043E\u0447\u0430\u0441\u043E\u0432\u0430\u044F \u0430\u0440\u0435\u043D\u0434\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](720, "svg", 144)(721, "g", 145);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](722, "path", 146)(723, "path", 147)(724, "path", 148)(725, "path", 149)(726, "path", 150)(727, "path", 151)(728, "path", 152)(729, "path", 153)(730, "path", 154)(731, "path", 155)(732, "path", 156)(733, "path", 157)(734, "path", 158)(735, "path", 159)(736, "path", 160)(737, "path", 161)(738, "path", 162)(739, "path", 163)(740, "path", 164)(741, "path", 165)(742, "path", 166)(743, "path", 167)(744, "path", 168)(745, "path", 169)(746, "path", 170)(747, "path", 171)(748, "path", 172)(749, "path", 173)(750, "path", 174)(751, "path", 175)(752, "path", 176)(753, "path", 177)(754, "path", 178)(755, "path", 179)(756, "path", 180)(757, "path", 181)(758, "path", 182)(759, "path", 183)(760, "path", 184)(761, "path", 185)(762, "path", 186)(763, "path", 187)(764, "path", 188)(765, "path", 189)(766, "path", 190)(767, "path", 191)(768, "path", 192)(769, "path", 193)(770, "path", 194)(771, "path", 195)(772, "path", 196)(773, "path", 197)(774, "path", 198)(775, "path", 199)(776, "path", 200)(777, "path", 201)(778, "path", 202)(779, "path", 203)(780, "path", 204)(781, "path", 205)(782, "path", 206)(783, "path", 207)(784, "path", 208)(785, "path", 209)(786, "path", 210)(787, "path", 211)(788, "path", 212)(789, "path", 213)(790, "path", 214)(791, "path", 215)(792, "path", 216)(793, "path", 217)(794, "path", 218)(795, "path", 219)(796, "path", 220)(797, "path", 221)(798, "path", 222)(799, "path", 223)(800, "path", 224)(801, "path", 225)(802, "path", 226)(803, "path", 227)(804, "path", 228)(805, "path", 229)(806, "path", 230)(807, "path", 231)(808, "path", 232)(809, "path", 233)(810, "path", 234)(811, "path", 235)(812, "path", 236)(813, "path", 237)(814, "path", 238)(815, "path", 239)(816, "path", 240)(817, "path", 241)(818, "path", 242)(819, "path", 243)(820, "path", 244)(821, "path", 245)(822, "path", 246)(823, "path", 247)(824, "path", 248);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](825, "defs")(826, "clipPath", 249);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](827, "rect", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](828, "p", 133);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](829, " \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](830, "p", 137)(831, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](832, "\u041F\u043E\u0441\u0443\u0442\u043E\u0447\u043D\u0430\u044F\u044F \u0430\u0440\u0435\u043D\u0434\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](833, "p", 251);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](834, " \u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438, \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u201C\u041C\u043E\u0438 \u0437\u0430\u043F\u0438\u0441\u0438\u201D ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](835, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](836, " \u0414\u0430\u043B\u0435\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](837, "div", 68)(838, "div", 2)(839, "h1", 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](840, " \u041E\u0442\u043B\u0438\u0447\u043D\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](841, "p", 252);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](842, " \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](843, "p", 142)(844, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](845, "\u041F\u043E\u0447\u0430\u0441\u043E\u0432\u0430\u044F \u0430\u0440\u0435\u043D\u0434\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](846, "svg", 144)(847, "g", 253);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](848, "path", 146)(849, "path", 254)(850, "path", 255)(851, "path", 256)(852, "path", 257)(853, "path", 258)(854, "path", 259)(855, "path", 260)(856, "path", 261)(857, "path", 262)(858, "path", 263)(859, "path", 264)(860, "path", 265)(861, "path", 266)(862, "path", 267)(863, "path", 268)(864, "path", 269)(865, "path", 270)(866, "path", 271)(867, "path", 272)(868, "path", 273)(869, "path", 274)(870, "path", 275)(871, "path", 276)(872, "path", 277)(873, "path", 278)(874, "path", 279)(875, "path", 280)(876, "path", 281)(877, "path", 282)(878, "path", 283)(879, "path", 284)(880, "path", 285)(881, "path", 179)(882, "path", 286)(883, "path", 287)(884, "path", 288)(885, "path", 289)(886, "path", 290)(887, "path", 291)(888, "path", 292)(889, "path", 293)(890, "path", 294)(891, "path", 295)(892, "path", 296)(893, "path", 297)(894, "path", 298)(895, "path", 299)(896, "path", 300)(897, "path", 301)(898, "path", 302)(899, "path", 303)(900, "path", 304)(901, "path", 305)(902, "path", 306)(903, "path", 307)(904, "path", 308)(905, "path", 309)(906, "path", 310)(907, "path", 311)(908, "path", 312)(909, "path", 313)(910, "path", 314)(911, "path", 315)(912, "path", 316)(913, "path", 317)(914, "path", 318)(915, "path", 319)(916, "path", 320)(917, "path", 321)(918, "path", 322)(919, "path", 323)(920, "path", 324)(921, "path", 325)(922, "path", 326)(923, "path", 327)(924, "path", 328)(925, "path", 329)(926, "path", 330)(927, "path", 331)(928, "path", 332)(929, "path", 333)(930, "path", 334)(931, "path", 335)(932, "path", 336)(933, "path", 337)(934, "path", 338)(935, "path", 339)(936, "path", 340)(937, "path", 341)(938, "path", 342)(939, "path", 343)(940, "path", 344)(941, "path", 345)(942, "path", 346)(943, "path", 347)(944, "path", 348)(945, "path", 349)(946, "path", 350)(947, "path", 351)(948, "path", 352)(949, "path", 353)(950, "path", 354);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](951, "defs")(952, "clipPath", 355);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](953, "rect", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](954, "p", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](955, " \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](956, "p", 142)(957, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](958, "\u041F\u043E\u0441\u0443\u0442\u043E\u0447\u043D\u0430\u044F\u044F \u0430\u0440\u0435\u043D\u0434\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](959, "p", 356);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](960, " \u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438, \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u201C\u041C\u043E\u0438 \u0437\u0430\u043F\u0438\u0441\u0438\u201D ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](961, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](962, " \u0414\u0430\u043B\u0435\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](963, "div", 49)(964, "div", 2)(965, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](966, " \u041E\u0442\u043B\u0438\u0447\u043D\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](967, "p", 81);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](968, " \u0417\u0430\u043F\u0438\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](969, "br")(970, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](971, " \u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438, \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](972, "br")(973, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](974, " \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u201C\u041C\u043E\u0438 \u0437\u0430\u043F\u0438\u0441\u0438\u201D ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](975, "svg", 357);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](976, "path", 358)(977, "path", 359)(978, "path", 360)(979, "path", 361)(980, "path", 362)(981, "path", 363)(982, "path", 364)(983, "path", 365)(984, "path", 366)(985, "path", 367)(986, "path", 368)(987, "path", 369)(988, "path", 370)(989, "path", 371)(990, "path", 372)(991, "path", 373)(992, "path", 374)(993, "path", 375)(994, "path", 376)(995, "path", 377)(996, "path", 378)(997, "path", 379)(998, "path", 380)(999, "path", 381)(1000, "path", 382)(1001, "path", 383)(1002, "path", 384)(1003, "path", 385)(1004, "path", 386)(1005, "path", 387)(1006, "path", 388)(1007, "path", 389)(1008, "path", 390)(1009, "path", 391)(1010, "path", 392)(1011, "path", 393)(1012, "path", 394)(1013, "path", 395)(1014, "path", 396)(1015, "path", 397)(1016, "path", 398)(1017, "path", 399)(1018, "path", 400)(1019, "path", 401)(1020, "path", 402)(1021, "path", 403)(1022, "path", 404)(1023, "path", 405)(1024, "path", 406)(1025, "path", 407)(1026, "path", 408)(1027, "path", 409)(1028, "path", 410)(1029, "path", 411)(1030, "path", 412)(1031, "path", 413)(1032, "path", 414)(1033, "path", 415)(1034, "path", 416)(1035, "path", 417)(1036, "path", 418)(1037, "path", 419)(1038, "path", 420)(1039, "path", 421)(1040, "path", 422)(1041, "path", 423)(1042, "path", 424)(1043, "path", 425)(1044, "path", 426)(1045, "path", 427)(1046, "path", 428)(1047, "path", 429)(1048, "path", 430)(1049, "path", 431)(1050, "path", 432)(1051, "path", 433)(1052, "path", 434)(1053, "path", 435)(1054, "path", 436)(1055, "path", 437)(1056, "path", 438)(1057, "path", 439)(1058, "path", 440)(1059, "path", 441)(1060, "path", 442)(1061, "path", 443)(1062, "path", 444)(1063, "path", 445)(1064, "path", 446)(1065, "path", 447)(1066, "path", 448);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1067, "mask", 449);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1068, "path", 450);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1069, "path", 451)(1070, "path", 452)(1071, "path", 453)(1072, "path", 454)(1073, "path", 455)(1074, "path", 456)(1075, "path", 457)(1076, "path", 458)(1077, "path", 459)(1078, "path", 460);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1079, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1080, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1081, "div", 68)(1082, "div", 2)(1083, "h1", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1084, " \u041E\u0442\u043B\u0438\u0447\u043D\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1085, "p", 82);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1086, " \u0417\u0430\u043F\u0438\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1087, "br")(1088, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1089, " \u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438, \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1090, "br")(1091, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1092, " \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u201C\u041C\u043E\u0438 \u0437\u0430\u043F\u0438\u0441\u0438\u201D ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1093, "svg", 357);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1094, "path", 358)(1095, "path", 461)(1096, "path", 462)(1097, "path", 463)(1098, "path", 464)(1099, "path", 465)(1100, "path", 466)(1101, "path", 467)(1102, "path", 468)(1103, "path", 469)(1104, "path", 470)(1105, "path", 471)(1106, "path", 472)(1107, "path", 473)(1108, "path", 474)(1109, "path", 475)(1110, "path", 476)(1111, "path", 477)(1112, "path", 478)(1113, "path", 479)(1114, "path", 480)(1115, "path", 481)(1116, "path", 482)(1117, "path", 483)(1118, "path", 484)(1119, "path", 485)(1120, "path", 486)(1121, "path", 487)(1122, "path", 488)(1123, "path", 489)(1124, "path", 490)(1125, "path", 491)(1126, "path", 492)(1127, "path", 493)(1128, "path", 494)(1129, "path", 495)(1130, "path", 496)(1131, "path", 497)(1132, "path", 498)(1133, "path", 499)(1134, "path", 500)(1135, "path", 501)(1136, "path", 502)(1137, "path", 503)(1138, "path", 504)(1139, "path", 505)(1140, "path", 506)(1141, "path", 507)(1142, "path", 508)(1143, "path", 509)(1144, "path", 510)(1145, "path", 511)(1146, "path", 512)(1147, "path", 513)(1148, "path", 514)(1149, "path", 515)(1150, "path", 516)(1151, "path", 517)(1152, "path", 518)(1153, "path", 519)(1154, "path", 520)(1155, "path", 521)(1156, "path", 522)(1157, "path", 523)(1158, "path", 524)(1159, "path", 525)(1160, "path", 526)(1161, "path", 527)(1162, "path", 528)(1163, "path", 529)(1164, "path", 530)(1165, "path", 531)(1166, "path", 532)(1167, "path", 533)(1168, "path", 534)(1169, "path", 535)(1170, "path", 536)(1171, "path", 537)(1172, "path", 538)(1173, "path", 539)(1174, "path", 540)(1175, "path", 541)(1176, "path", 542)(1177, "path", 543)(1178, "path", 544)(1179, "path", 545)(1180, "path", 546)(1181, "path", 547)(1182, "path", 548)(1183, "path", 549)(1184, "path", 550);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1185, "mask", 551);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1186, "path", 450);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1187, "path", 552)(1188, "path", 553)(1189, "path", 554)(1190, "path", 555)(1191, "path", 556)(1192, "path", 557)(1193, "path", 558)(1194, "path", 559)(1195, "path", 560)(1196, "path", 561);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1197, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1198, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1199, "div", 562)(1200, "div", 563)(1201, "h1", 69);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1202, " \u041E\u0442\u043B\u0438\u0447\u043D\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1203, "p", 564);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1204, " \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1205, "p", 137)(1206, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1207, "\u041F\u043E\u0441\u0443\u0442\u043E\u0447\u043D\u0430\u044F\u044F \u0430\u0440\u0435\u043D\u0434\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1208, "svg", 565);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1209, "path", 358)(1210, "path", 359)(1211, "path", 360)(1212, "path", 361)(1213, "path", 362)(1214, "path", 363)(1215, "path", 364)(1216, "path", 365)(1217, "path", 366)(1218, "path", 367)(1219, "path", 368)(1220, "path", 369)(1221, "path", 370)(1222, "path", 371)(1223, "path", 372)(1224, "path", 373)(1225, "path", 374)(1226, "path", 375)(1227, "path", 376)(1228, "path", 377)(1229, "path", 378)(1230, "path", 379)(1231, "path", 380)(1232, "path", 381)(1233, "path", 382)(1234, "path", 383)(1235, "path", 384)(1236, "path", 385)(1237, "path", 386)(1238, "path", 387)(1239, "path", 388)(1240, "path", 389)(1241, "path", 390)(1242, "path", 391)(1243, "path", 392)(1244, "path", 393)(1245, "path", 394)(1246, "path", 395)(1247, "path", 396)(1248, "path", 397)(1249, "path", 398)(1250, "path", 399)(1251, "path", 400)(1252, "path", 401)(1253, "path", 402)(1254, "path", 403)(1255, "path", 404)(1256, "path", 405)(1257, "path", 406)(1258, "path", 407)(1259, "path", 408)(1260, "path", 409)(1261, "path", 410)(1262, "path", 411)(1263, "path", 412)(1264, "path", 413)(1265, "path", 414)(1266, "path", 415)(1267, "path", 416)(1268, "path", 417)(1269, "path", 418)(1270, "path", 419)(1271, "path", 420)(1272, "path", 421)(1273, "path", 422)(1274, "path", 423)(1275, "path", 424)(1276, "path", 425)(1277, "path", 426)(1278, "path", 427)(1279, "path", 428)(1280, "path", 429)(1281, "path", 430)(1282, "path", 431)(1283, "path", 432)(1284, "path", 433)(1285, "path", 434)(1286, "path", 435)(1287, "path", 436)(1288, "path", 437)(1289, "path", 438)(1290, "path", 439)(1291, "path", 440)(1292, "path", 441)(1293, "path", 442)(1294, "path", 443)(1295, "path", 444)(1296, "path", 445)(1297, "path", 446)(1298, "path", 447)(1299, "path", 448);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1300, "mask", 566);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1301, "path", 450);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1302, "path", 451)(1303, "path", 567)(1304, "path", 453)(1305, "path", 454)(1306, "path", 455)(1307, "path", 456)(1308, "path", 457)(1309, "path", 458)(1310, "path", 459)(1311, "path", 460);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1312, "p", 133);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1313, " \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1314, "p", 137)(1315, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1316, "\u041F\u043E\u0447\u0430\u0441\u043E\u0432\u0430\u044F \u0430\u0440\u0435\u043D\u0434\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1317, "p", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1318, " \u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438, \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u201C\u041C\u043E\u0438 \u0437\u0430\u043F\u0438\u0441\u0438\u201D ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1319, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1320, " \u0414\u0430\u043B\u0435\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1321, "div", 568)(1322, "div", 563)(1323, "h1", 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1324, " \u041E\u0442\u043B\u0438\u0447\u043D\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1325, "p", 252);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1326, " \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1327, "p", 142)(1328, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1329, "\u041F\u043E\u0441\u0443\u0442\u043E\u0447\u043D\u0430\u044F\u044F \u0430\u0440\u0435\u043D\u0434\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1330, "svg", 565);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1331, "path", 358)(1332, "path", 461)(1333, "path", 462)(1334, "path", 463)(1335, "path", 464)(1336, "path", 465)(1337, "path", 466)(1338, "path", 467)(1339, "path", 468)(1340, "path", 469)(1341, "path", 470)(1342, "path", 471)(1343, "path", 472)(1344, "path", 473)(1345, "path", 474)(1346, "path", 475)(1347, "path", 476)(1348, "path", 477)(1349, "path", 478)(1350, "path", 479)(1351, "path", 480)(1352, "path", 481)(1353, "path", 482)(1354, "path", 483)(1355, "path", 484)(1356, "path", 485)(1357, "path", 486)(1358, "path", 487)(1359, "path", 488)(1360, "path", 489)(1361, "path", 490)(1362, "path", 491)(1363, "path", 492)(1364, "path", 493)(1365, "path", 494)(1366, "path", 495)(1367, "path", 496)(1368, "path", 497)(1369, "path", 498)(1370, "path", 499)(1371, "path", 500)(1372, "path", 501)(1373, "path", 502)(1374, "path", 503)(1375, "path", 504)(1376, "path", 505)(1377, "path", 506)(1378, "path", 507)(1379, "path", 508)(1380, "path", 509)(1381, "path", 510)(1382, "path", 511)(1383, "path", 512)(1384, "path", 513)(1385, "path", 514)(1386, "path", 515)(1387, "path", 516)(1388, "path", 517)(1389, "path", 518)(1390, "path", 519)(1391, "path", 520)(1392, "path", 521)(1393, "path", 522)(1394, "path", 523)(1395, "path", 524)(1396, "path", 525)(1397, "path", 526)(1398, "path", 527)(1399, "path", 528)(1400, "path", 529)(1401, "path", 530)(1402, "path", 531)(1403, "path", 532)(1404, "path", 533)(1405, "path", 534)(1406, "path", 535)(1407, "path", 536)(1408, "path", 537)(1409, "path", 538)(1410, "path", 539)(1411, "path", 540)(1412, "path", 541)(1413, "path", 542)(1414, "path", 543)(1415, "path", 544)(1416, "path", 545)(1417, "path", 546)(1418, "path", 547)(1419, "path", 548)(1420, "path", 549)(1421, "path", 550);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1422, "mask", 569);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1423, "path", 450);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1424, "path", 552)(1425, "path", 570)(1426, "path", 554)(1427, "path", 555)(1428, "path", 556)(1429, "path", 557)(1430, "path", 558)(1431, "path", 559)(1432, "path", 560)(1433, "path", 561);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1434, "p", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1435, " \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1436, "p", 142)(1437, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1438, "\u041F\u043E\u0447\u0430\u0441\u043E\u0432\u0430\u044F \u0430\u0440\u0435\u043D\u0434\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1439, "p", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1440, " \u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438, \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u201C\u041C\u043E\u0438 \u0437\u0430\u043F\u0438\u0441\u0438\u201D ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1441, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1442, " \u0414\u0430\u043B\u0435\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1443, "div", 49)(1444, "div", 2)(1445, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1446, " \u041E\u0442\u043B\u0438\u0447\u043D\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1447, "p", 81);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1448, " \u0417\u0430\u043F\u0438\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1449, "br")(1450, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1451, " \u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438, \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1452, "br")(1453, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1454, " \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u201C\u041C\u043E\u0438 \u0437\u0430\u043F\u0438\u0441\u0438\u201D ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1455, "svg", 571)(1456, "g", 572);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1457, "path", 146)(1458, "path", 147)(1459, "path", 148)(1460, "path", 149)(1461, "path", 150)(1462, "path", 151)(1463, "path", 152)(1464, "path", 153)(1465, "path", 573)(1466, "path", 155)(1467, "path", 156)(1468, "path", 157)(1469, "path", 158)(1470, "path", 159)(1471, "path", 160)(1472, "path", 161)(1473, "path", 162)(1474, "path", 163)(1475, "path", 164)(1476, "path", 165)(1477, "path", 166)(1478, "path", 167)(1479, "path", 168)(1480, "path", 574)(1481, "path", 170)(1482, "path", 171)(1483, "path", 172)(1484, "path", 173)(1485, "path", 174)(1486, "path", 175)(1487, "path", 176)(1488, "path", 177)(1489, "path", 575)(1490, "path", 179)(1491, "path", 180)(1492, "path", 181)(1493, "path", 576)(1494, "path", 577)(1495, "path", 578)(1496, "path", 579)(1497, "path", 580)(1498, "path", 581)(1499, "path", 582)(1500, "path", 189)(1501, "path", 583)(1502, "path", 584)(1503, "path", 585)(1504, "path", 586)(1505, "path", 587)(1506, "path", 588)(1507, "path", 589)(1508, "path", 590)(1509, "path", 591)(1510, "path", 592)(1511, "path", 593)(1512, "path", 594)(1513, "path", 595)(1514, "path", 596)(1515, "path", 597)(1516, "path", 598)(1517, "path", 599)(1518, "path", 600)(1519, "path", 601)(1520, "path", 602)(1521, "path", 603)(1522, "path", 604)(1523, "path", 605)(1524, "path", 606)(1525, "path", 607)(1526, "path", 608)(1527, "path", 609)(1528, "path", 610)(1529, "path", 611)(1530, "path", 612)(1531, "path", 613)(1532, "path", 614)(1533, "path", 615)(1534, "path", 616)(1535, "path", 617)(1536, "path", 618)(1537, "path", 619)(1538, "path", 620)(1539, "path", 621)(1540, "path", 622)(1541, "path", 623)(1542, "path", 624)(1543, "path", 625)(1544, "path", 626)(1545, "path", 627)(1546, "path", 628)(1547, "path", 629)(1548, "path", 630)(1549, "path", 631)(1550, "path", 632)(1551, "path", 633)(1552, "path", 634)(1553, "path", 635)(1554, "path", 636)(1555, "path", 637)(1556, "path", 638)(1557, "path", 639)(1558, "path", 640)(1559, "path", 641);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1560, "defs")(1561, "clipPath", 642);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1562, "rect", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1563, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1564, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1565, "div", 68)(1566, "div", 2)(1567, "h1", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1568, " \u041E\u0442\u043B\u0438\u0447\u043D\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1569, "p", 82);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1570, " \u0417\u0430\u043F\u0438\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1571, "br")(1572, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1573, " \u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438, \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1574, "br")(1575, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1576, " \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u201C\u041C\u043E\u0438 \u0437\u0430\u043F\u0438\u0441\u0438\u201D ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1577, "svg", 571)(1578, "g", 643);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1579, "path", 146)(1580, "path", 254)(1581, "path", 255)(1582, "path", 256)(1583, "path", 257)(1584, "path", 258)(1585, "path", 259)(1586, "path", 260)(1587, "path", 644)(1588, "path", 262)(1589, "path", 263)(1590, "path", 264)(1591, "path", 265)(1592, "path", 266)(1593, "path", 267)(1594, "path", 268)(1595, "path", 269)(1596, "path", 270)(1597, "path", 271)(1598, "path", 272)(1599, "path", 273)(1600, "path", 274)(1601, "path", 275)(1602, "path", 645)(1603, "path", 277)(1604, "path", 278)(1605, "path", 279)(1606, "path", 280)(1607, "path", 281)(1608, "path", 282)(1609, "path", 283)(1610, "path", 284)(1611, "path", 646)(1612, "path", 179)(1613, "path", 286)(1614, "path", 287)(1615, "path", 647)(1616, "path", 648)(1617, "path", 649)(1618, "path", 650)(1619, "path", 651)(1620, "path", 652)(1621, "path", 653)(1622, "path", 295)(1623, "path", 654)(1624, "path", 655)(1625, "path", 656)(1626, "path", 657)(1627, "path", 658)(1628, "path", 659)(1629, "path", 660)(1630, "path", 661)(1631, "path", 662)(1632, "path", 663)(1633, "path", 664)(1634, "path", 665)(1635, "path", 666)(1636, "path", 667)(1637, "path", 668)(1638, "path", 669)(1639, "path", 670)(1640, "path", 671)(1641, "path", 672)(1642, "path", 673)(1643, "path", 674)(1644, "path", 675)(1645, "path", 676)(1646, "path", 677)(1647, "path", 678)(1648, "path", 679)(1649, "path", 680)(1650, "path", 681)(1651, "path", 682)(1652, "path", 683)(1653, "path", 684)(1654, "path", 685)(1655, "path", 686)(1656, "path", 687)(1657, "path", 688)(1658, "path", 689)(1659, "path", 690)(1660, "path", 691)(1661, "path", 692)(1662, "path", 693)(1663, "path", 694)(1664, "path", 695)(1665, "path", 696)(1666, "path", 697)(1667, "path", 698)(1668, "path", 699)(1669, "path", 700)(1670, "path", 701)(1671, "path", 702)(1672, "path", 703)(1673, "path", 704)(1674, "path", 705)(1675, "path", 706)(1676, "path", 707)(1677, "path", 708)(1678, "path", 709)(1679, "path", 710)(1680, "path", 711)(1681, "path", 712);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1682, "defs")(1683, "clipPath", 713);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1684, "rect", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1685, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1686, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1687, "div", 714)(1688, "div", 137);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1689, " \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1690, "div", 715);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1691, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1692, "div", 716)(1693, "div", 142);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1694, " \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1695, "div", 715);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1696, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1697, "div", 714)(1698, "div", 137);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1699, " \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1700, "div", 137);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1701, " \u0412 \u0433\u0440\u0443\u043F\u043F\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1702, "div", 715);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1703, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1704, "div", 716)(1705, "div", 142);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1706, " \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1707, "div", 142);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1708, " \u0412 \u0433\u0440\u0443\u043F\u043F\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1709, "div", 715);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1710, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1711, "div", 714)(1712, "div", 717)(1713, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1714, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1715, "path", 720);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1716, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1717, " \u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0433\u043B\u0430\u0432\u043D\u044B\u043C \u0444\u043E\u0442\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1718, "div", 721)(1719, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1720, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1721, "path", 722)(1722, "path", 723)(1723, "path", 724)(1724, "path", 725)(1725, "path", 726);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1726, "div", 727);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1727, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1728, "div", 716)(1729, "div", 717)(1730, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1731, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1732, "path", 720);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1733, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1734, " \u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0433\u043B\u0430\u0432\u043D\u044B\u043C \u0444\u043E\u0442\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1735, "div", 721)(1736, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1737, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1738, "path", 728)(1739, "path", 729)(1740, "path", 730)(1741, "path", 731)(1742, "path", 732);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1743, "div", 715);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1744, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1745, "div", 714)(1746, "div", 717)(1747, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1748, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1749, "path", 733)(1750, "path", 734);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1751, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1752, " \u0417\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0447\u0430\u0442 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1753, "div", 717)(1754, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1755, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1756, "path", 735)(1757, "path", 736);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1758, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1759, " \u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1760, "div", 717)(1761, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1762, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1763, "path", 737)(1764, "path", 738)(1765, "path", 739)(1766, "path", 740);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1767, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1768, " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0430\u0434\u0440\u0435\u0441\u0430\u0442\u0430 \u0432 \u0447\u0435\u0440\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1769, "div", 721)(1770, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1771, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1772, "path", 722)(1773, "path", 723)(1774, "path", 724)(1775, "path", 725)(1776, "path", 726);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1777, "div", 727);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1778, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1779, "div", 716)(1780, "div", 717)(1781, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1782, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1783, "path", 733)(1784, "path", 734);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1785, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1786, " \u0417\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0447\u0430\u0442 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1787, "div", 717)(1788, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1789, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1790, "path", 735)(1791, "path", 736);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1792, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1793, " \u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1794, "div", 717)(1795, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1796, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1797, "path", 737)(1798, "path", 738)(1799, "path", 739)(1800, "path", 740);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1801, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1802, " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0430\u0434\u0440\u0435\u0441\u0430\u0442\u0430 \u0432 \u0447\u0435\u0440\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1803, "div", 721)(1804, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1805, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1806, "path", 728)(1807, "path", 729)(1808, "path", 730)(1809, "path", 731)(1810, "path", 732);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1811, "div", 715);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1812, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1813, "div", 714)(1814, "div", 717)(1815, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1816, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1817, "path", 741);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1818, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1819, " \u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1820, "div", 717)(1821, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1822, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1823, "path", 742)(1824, "path", 743);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1825, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1826, " \u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1827, "div", 717)(1828, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1829, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1830, "path", 744)(1831, "path", 745);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1832, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1833, " \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1834, "div", 717)(1835, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1836, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1837, "path", 746)(1838, "path", 747);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1839, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1840, " \u041F\u0435\u0440\u0435\u0441\u043B\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1841, "div", 717)(1842, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1843, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1844, "path", 720);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1845, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1846, " \u0412\u044B\u0431\u0440\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1847, "div", 721)(1848, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1849, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1850, "path", 722)(1851, "path", 723)(1852, "path", 724)(1853, "path", 725)(1854, "path", 726);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1855, "div", 727);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1856, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1857, "div", 716)(1858, "div", 717)(1859, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1860, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1861, "path", 741);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1862, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1863, " \u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1864, "div", 717)(1865, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1866, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1867, "path", 742)(1868, "path", 743);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1869, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1870, " \u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1871, "div", 717)(1872, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1873, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1874, "path", 744)(1875, "path", 745);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1876, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1877, " \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1878, "div", 717)(1879, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1880, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1881, "path", 746)(1882, "path", 747);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1883, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1884, " \u041F\u0435\u0440\u0435\u0441\u043B\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1885, "div", 717)(1886, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1887, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1888, "path", 720);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1889, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1890, " \u0412\u044B\u0431\u0440\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1891, "div", 721)(1892, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1893, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1894, "path", 728)(1895, "path", 729)(1896, "path", 730)(1897, "path", 731)(1898, "path", 732);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1899, "div", 715);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1900, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1901, "div", 714)(1902, "div", 717)(1903, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1904, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1905, "path", 741);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1906, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1907, " \u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1908, "div", 717)(1909, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1910, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1911, "path", 742)(1912, "path", 743);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1913, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1914, " \u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1915, "div", 717)(1916, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1917, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1918, "path", 746)(1919, "path", 747);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1920, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1921, " \u041F\u0435\u0440\u0435\u0441\u043B\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1922, "div", 717)(1923, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1924, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1925, "path", 720);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1926, "div", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1927, " \u0412\u044B\u0431\u0440\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1928, "div", 721)(1929, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1930, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1931, "path", 722)(1932, "path", 723)(1933, "path", 724)(1934, "path", 725)(1935, "path", 726);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1936, "div", 727);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1937, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1938, "div", 716)(1939, "div", 717)(1940, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1941, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1942, "path", 741);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1943, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1944, " \u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1945, "div", 717)(1946, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1947, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1948, "path", 742)(1949, "path", 743);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1950, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1951, " \u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1952, "div", 717)(1953, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1954, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1955, "path", 746)(1956, "path", 747);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1957, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1958, " \u041F\u0435\u0440\u0435\u0441\u043B\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1959, "div", 717)(1960, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1961, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1962, "path", 720);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1963, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1964, " \u0412\u044B\u0431\u0440\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1965, "div", 721)(1966, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1967, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1968, "path", 728)(1969, "path", 729)(1970, "path", 730)(1971, "path", 731)(1972, "path", 732);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1973, "div", 715);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1974, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1975, "div", 131)(1976, "h2", 251);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1977, " \u0423\u043F\u0441... ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1978, "div", 748);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1979, " \u0412\u044B \u043F\u0440\u0435\u0432\u044B\u0441\u0438\u043B\u0438 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430 \u0447\u0435\u0440\u0435\u0437 60 \u043C\u0438\u043D\u0443\u0442. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1980, "div", 749);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1981, "svg", 750)(1982, "g", 145);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1983, "path", 146)(1984, "path", 147)(1985, "path", 148)(1986, "path", 149)(1987, "path", 150)(1988, "path", 151)(1989, "path", 152)(1990, "path", 153)(1991, "path", 573)(1992, "path", 155)(1993, "path", 156)(1994, "path", 157)(1995, "path", 158)(1996, "path", 159)(1997, "path", 160)(1998, "path", 161)(1999, "path", 162)(2000, "path", 163)(2001, "path", 164)(2002, "path", 165)(2003, "path", 166)(2004, "path", 167)(2005, "path", 168)(2006, "path", 574)(2007, "path", 170)(2008, "path", 171)(2009, "path", 172)(2010, "path", 173)(2011, "path", 174)(2012, "path", 175)(2013, "path", 176)(2014, "path", 177)(2015, "path", 575)(2016, "path", 179)(2017, "path", 180)(2018, "path", 181)(2019, "path", 576)(2020, "path", 577)(2021, "path", 578)(2022, "path", 579)(2023, "path", 580)(2024, "path", 581)(2025, "path", 582)(2026, "path", 189)(2027, "path", 583)(2028, "path", 584)(2029, "path", 585)(2030, "path", 586)(2031, "path", 587)(2032, "path", 588)(2033, "path", 589)(2034, "path", 590)(2035, "path", 591)(2036, "path", 592)(2037, "path", 593)(2038, "path", 594)(2039, "path", 595)(2040, "path", 596)(2041, "path", 597)(2042, "path", 598)(2043, "path", 599)(2044, "path", 600)(2045, "path", 601)(2046, "path", 602)(2047, "path", 603)(2048, "path", 604)(2049, "path", 605)(2050, "path", 606)(2051, "path", 607)(2052, "path", 608)(2053, "path", 609)(2054, "path", 610)(2055, "path", 611)(2056, "path", 612)(2057, "path", 613)(2058, "path", 614)(2059, "path", 615)(2060, "path", 616)(2061, "path", 617)(2062, "path", 618)(2063, "path", 619)(2064, "path", 620)(2065, "path", 621)(2066, "path", 622)(2067, "path", 623)(2068, "path", 624)(2069, "path", 625)(2070, "path", 626)(2071, "path", 627)(2072, "path", 628)(2073, "path", 629)(2074, "path", 630)(2075, "path", 631)(2076, "path", 632)(2077, "path", 633)(2078, "path", 634)(2079, "path", 635)(2080, "path", 636)(2081, "path", 637)(2082, "path", 638)(2083, "path", 639)(2084, "path", 640)(2085, "path", 641);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2086, "defs")(2087, "clipPath", 249);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2088, "rect", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2089, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2090, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2091, "div", 140)(2092, "h2", 356);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2093, " \u0423\u043F\u0441... ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2094, "div", 751);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2095, " \u0412\u044B \u043F\u0440\u0435\u0432\u044B\u0441\u0438\u043B\u0438 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0441\u043D\u043E\u0432\u0430 \u0447\u0435\u0440\u0435\u0437 60 \u043C\u0438\u043D\u0443\u0442. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2096, "div", 749);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2097, "svg", 750)(2098, "g", 253);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2099, "path", 146)(2100, "path", 254)(2101, "path", 255)(2102, "path", 256)(2103, "path", 257)(2104, "path", 258)(2105, "path", 259)(2106, "path", 260)(2107, "path", 644)(2108, "path", 262)(2109, "path", 263)(2110, "path", 264)(2111, "path", 265)(2112, "path", 266)(2113, "path", 267)(2114, "path", 268)(2115, "path", 269)(2116, "path", 270)(2117, "path", 271)(2118, "path", 272)(2119, "path", 273)(2120, "path", 274)(2121, "path", 275)(2122, "path", 645)(2123, "path", 277)(2124, "path", 278)(2125, "path", 279)(2126, "path", 280)(2127, "path", 281)(2128, "path", 282)(2129, "path", 283)(2130, "path", 284)(2131, "path", 646)(2132, "path", 179)(2133, "path", 286)(2134, "path", 287)(2135, "path", 647)(2136, "path", 648)(2137, "path", 649)(2138, "path", 650)(2139, "path", 651)(2140, "path", 652)(2141, "path", 653)(2142, "path", 295)(2143, "path", 654)(2144, "path", 655)(2145, "path", 656)(2146, "path", 657)(2147, "path", 658)(2148, "path", 659)(2149, "path", 660)(2150, "path", 661)(2151, "path", 662)(2152, "path", 663)(2153, "path", 664)(2154, "path", 665)(2155, "path", 666)(2156, "path", 667)(2157, "path", 668)(2158, "path", 669)(2159, "path", 670)(2160, "path", 671)(2161, "path", 672)(2162, "path", 673)(2163, "path", 674)(2164, "path", 675)(2165, "path", 676)(2166, "path", 677)(2167, "path", 678)(2168, "path", 679)(2169, "path", 680)(2170, "path", 681)(2171, "path", 682)(2172, "path", 683)(2173, "path", 684)(2174, "path", 685)(2175, "path", 686)(2176, "path", 687)(2177, "path", 688)(2178, "path", 689)(2179, "path", 690)(2180, "path", 691)(2181, "path", 692)(2182, "path", 693)(2183, "path", 694)(2184, "path", 695)(2185, "path", 696)(2186, "path", 697)(2187, "path", 698)(2188, "path", 699)(2189, "path", 700)(2190, "path", 701)(2191, "path", 702)(2192, "path", 703)(2193, "path", 704)(2194, "path", 705)(2195, "path", 706)(2196, "path", 707)(2197, "path", 708)(2198, "path", 709)(2199, "path", 710)(2200, "path", 711)(2201, "path", 712);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2202, "defs")(2203, "clipPath", 355);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2204, "rect", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2205, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2206, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2207, "div", 752)(2208, "h2", 251);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2209, " \u0413\u043E\u0442\u043E\u0432\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2210, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2211, " \u0423\u0441\u043B\u0443\u0433\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2212, "div", 753)(2213, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2214, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0443\u0441\u043B\u0443\u0433\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2215, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2216, " \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0432 \u0433\u0440\u0443\u043F\u043F\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2217, "div", 749)(2218, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2219, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2220, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2221, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2222, "div", 754)(2223, "h2", 356);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2224, " \u0413\u043E\u0442\u043E\u0432\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2225, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2226, " \u0423\u0441\u043B\u0443\u0433\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2227, "div", 753)(2228, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2229, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0443\u0441\u043B\u0443\u0433\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2230, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2231, " \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0432 \u0433\u0440\u0443\u043F\u043F\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2232, "div", 749)(2233, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2234, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2235, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2236, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2237, "div", 752)(2238, "h2", 251);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2239, " \u0413\u043E\u0442\u043E\u0432\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2240, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2241, " \u0423\u0441\u043B\u0443\u0433\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2242, "div", 753)(2243, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2244, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0443\u0441\u043B\u0443\u0433\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2245, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2246, " \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0431\u0435\u0437 \u0433\u0440\u0443\u043F\u043F\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2247, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2248, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2249, "div", 754)(2250, "h2", 356);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2251, " \u0413\u043E\u0442\u043E\u0432\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2252, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2253, " \u0423\u0441\u043B\u0443\u0433\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2254, "div", 753)(2255, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2256, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0443\u0441\u043B\u0443\u0433\u0438");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2257, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2258, " \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0431\u0435\u0437 \u0433\u0440\u0443\u043F\u043F\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2259, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2260, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2261, "div", 755)(2262, "h2", 756);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2263, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2264, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2265, " \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u0443\u0436\u043D\u043E \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2266, "div", 757)(2267, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2268, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2269, "div", 758);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2270, " \u0432 \u043F\u0440\u043E\u0444\u0438\u043B\u0435 \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2271, "div", 759)(2272, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2273, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2274, "div", 760)(2275, "h2", 761);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2276, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2277, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2278, " \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u0443\u0436\u043D\u043E \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2279, "div", 50)(2280, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2281, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2282, "div", 758);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2283, " \u0432 \u043F\u0440\u043E\u0444\u0438\u043B\u0435 \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2284, "div", 759)(2285, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2286, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2287, "div", 755)(2288, "h2", 762);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2289, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u0432\u0435\u0442\u0430 \u043D\u0430 \u043E\u0442\u0437\u044B\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2290, "div", 763);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2291, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0432\u043E\u0439 \u043E\u0442\u0432\u0435\u0442 \u043D\u0430 \u043E\u0442\u0437\u044B\u0432? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2292, "div", 0)(2293, "div", 764);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2294, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2295, "div", 765);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2296, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2297, "div", 760)(2298, "h2", 766);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2299, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u0432\u0435\u0442\u0430 \u043D\u0430 \u043E\u0442\u0437\u044B\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2300, "div", 763);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2301, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0432\u043E\u0439 \u043E\u0442\u0432\u0435\u0442 \u043D\u0430 \u043E\u0442\u0437\u044B\u0432? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2302, "div", 0)(2303, "div", 764);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2304, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2305, "div", 765);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2306, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2307, "div", 755)(2308, "h2", 762);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2309, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2310, "div", 767);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2311, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0432\u043E\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2312, "div", 768)(2313, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2314, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u044E\u0437\u0435\u0440-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2315, "div", 764);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2316, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2317, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2318, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2319, "div", 760)(2320, "h2", 766);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2321, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2322, "div", 767);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2323, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0432\u043E\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2324, "div", 758)(2325, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2326, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u044E\u0437\u0435\u0440-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2327, "div", 764);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2328, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2329, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2330, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2331, "div", 769)(2332, "h2", 762);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2333, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B \u0443\u0441\u043B\u0443\u0433 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2334, "div", 763);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2335, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443 \u0443\u0441\u043B\u0443\u0433 \u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2336, "div", 764);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2337, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2338, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2339, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2340, "div", 770)(2341, "h2", 766);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2342, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B \u0443\u0441\u043B\u0443\u0433 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2343, "div", 771);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2344, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443 \u0443\u0441\u043B\u0443\u0433 \u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2345, "div", 764);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2346, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2347, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2348, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2349, "div", 49)(2350, "div", 2)(2351, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2352, " \u0412\u044B \u0440\u0430\u0437\u043C\u0435\u0441\u0442\u0438\u043B\u0438 \u0441\u0432\u043E\u044E \u043F\u0435\u0440\u0432\u0443\u044E \u0443\u0441\u043B\u0443\u0433\u0443! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2353, "p", 81);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2354, " \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u043D\u0430 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0441\u0442\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0432\u0441\u0435\u0445 \u043F\u043E\u043B\u0435\u0439.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2355, "br")(2356, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2357, " \u0414\u043B\u044F \u0443\u0434\u043E\u0431\u0441\u0442\u0432\u0430 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0432\u0430\u0448\u0438\u043C\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0443\u0434\u043E\u0431\u0441\u0442\u0432\u0430, \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443\". ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2358, "svg", 571)(2359, "g", 145);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2360, "path", 146)(2361, "path", 147)(2362, "path", 148)(2363, "path", 149)(2364, "path", 150)(2365, "path", 151)(2366, "path", 152)(2367, "path", 153)(2368, "path", 154)(2369, "path", 155)(2370, "path", 156)(2371, "path", 157)(2372, "path", 158)(2373, "path", 159)(2374, "path", 160)(2375, "path", 161)(2376, "path", 162)(2377, "path", 163)(2378, "path", 164)(2379, "path", 165)(2380, "path", 166)(2381, "path", 167)(2382, "path", 168)(2383, "path", 169)(2384, "path", 170)(2385, "path", 171)(2386, "path", 172)(2387, "path", 173)(2388, "path", 174)(2389, "path", 175)(2390, "path", 176)(2391, "path", 177)(2392, "path", 178)(2393, "path", 179)(2394, "path", 180)(2395, "path", 181)(2396, "path", 182)(2397, "path", 183)(2398, "path", 184)(2399, "path", 185)(2400, "path", 186)(2401, "path", 187)(2402, "path", 188)(2403, "path", 189)(2404, "path", 190)(2405, "path", 191)(2406, "path", 192)(2407, "path", 193)(2408, "path", 194)(2409, "path", 195)(2410, "path", 196)(2411, "path", 197)(2412, "path", 198)(2413, "path", 199)(2414, "path", 200)(2415, "path", 201)(2416, "path", 202)(2417, "path", 203)(2418, "path", 204)(2419, "path", 205)(2420, "path", 206)(2421, "path", 207)(2422, "path", 208)(2423, "path", 209)(2424, "path", 210)(2425, "path", 211)(2426, "path", 212)(2427, "path", 213)(2428, "path", 214)(2429, "path", 215)(2430, "path", 216)(2431, "path", 217)(2432, "path", 218)(2433, "path", 219)(2434, "path", 220)(2435, "path", 221)(2436, "path", 222)(2437, "path", 223)(2438, "path", 224)(2439, "path", 225)(2440, "path", 226)(2441, "path", 227)(2442, "path", 228)(2443, "path", 229)(2444, "path", 230)(2445, "path", 231)(2446, "path", 232)(2447, "path", 233)(2448, "path", 234)(2449, "path", 235)(2450, "path", 236)(2451, "path", 237)(2452, "path", 238)(2453, "path", 239)(2454, "path", 240)(2455, "path", 241)(2456, "path", 242)(2457, "path", 243)(2458, "path", 244)(2459, "path", 245)(2460, "path", 246)(2461, "path", 247)(2462, "path", 248);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2463, "defs")(2464, "clipPath", 249);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2465, "rect", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2466, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2467, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2468, "div", 68)(2469, "div", 2)(2470, "h1", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2471, " \u0412\u044B \u0440\u0430\u0437\u043C\u0435\u0441\u0442\u0438\u043B\u0438 \u0441\u0432\u043E\u044E \u043F\u0435\u0440\u0432\u0443\u044E \u0443\u0441\u043B\u0443\u0433\u0443! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2472, "p", 82);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2473, " \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u043D\u0430 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0441\u0442\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0432\u0441\u0435\u0445 \u043F\u043E\u043B\u0435\u0439.");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2474, "br")(2475, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2476, " \u0414\u043B\u044F \u0443\u0434\u043E\u0431\u0441\u0442\u0432\u0430 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0432\u0430\u0448\u0438\u043C\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0443\u0434\u043E\u0431\u0441\u0442\u0432\u0430, \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \"\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443\". ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2477, "svg", 144)(2478, "g", 253);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2479, "path", 146)(2480, "path", 254)(2481, "path", 255)(2482, "path", 256)(2483, "path", 257)(2484, "path", 258)(2485, "path", 259)(2486, "path", 260)(2487, "path", 261)(2488, "path", 262)(2489, "path", 263)(2490, "path", 264)(2491, "path", 265)(2492, "path", 266)(2493, "path", 267)(2494, "path", 268)(2495, "path", 269)(2496, "path", 270)(2497, "path", 271)(2498, "path", 272)(2499, "path", 273)(2500, "path", 274)(2501, "path", 275)(2502, "path", 276)(2503, "path", 277)(2504, "path", 278)(2505, "path", 279)(2506, "path", 280)(2507, "path", 281)(2508, "path", 282)(2509, "path", 283)(2510, "path", 284)(2511, "path", 285)(2512, "path", 179)(2513, "path", 286)(2514, "path", 287)(2515, "path", 288)(2516, "path", 289)(2517, "path", 290)(2518, "path", 291)(2519, "path", 292)(2520, "path", 293)(2521, "path", 294)(2522, "path", 295)(2523, "path", 296)(2524, "path", 297)(2525, "path", 298)(2526, "path", 299)(2527, "path", 300)(2528, "path", 301)(2529, "path", 302)(2530, "path", 303)(2531, "path", 304)(2532, "path", 305)(2533, "path", 306)(2534, "path", 307)(2535, "path", 308)(2536, "path", 309)(2537, "path", 310)(2538, "path", 311)(2539, "path", 312)(2540, "path", 313)(2541, "path", 314)(2542, "path", 315)(2543, "path", 316)(2544, "path", 317)(2545, "path", 318)(2546, "path", 319)(2547, "path", 320)(2548, "path", 321)(2549, "path", 322)(2550, "path", 323)(2551, "path", 324)(2552, "path", 325)(2553, "path", 326)(2554, "path", 327)(2555, "path", 328)(2556, "path", 329)(2557, "path", 330)(2558, "path", 331)(2559, "path", 332)(2560, "path", 333)(2561, "path", 334)(2562, "path", 335)(2563, "path", 336)(2564, "path", 337)(2565, "path", 338)(2566, "path", 339)(2567, "path", 340)(2568, "path", 341)(2569, "path", 342)(2570, "path", 343)(2571, "path", 344)(2572, "path", 345)(2573, "path", 346)(2574, "path", 347)(2575, "path", 348)(2576, "path", 349)(2577, "path", 350)(2578, "path", 351)(2579, "path", 352)(2580, "path", 353)(2581, "path", 354);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2582, "defs")(2583, "clipPath", 355);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2584, "rect", 250);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2585, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2586, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2587, "div", 772)(2588, "div", 2)(2589, "h2", 773);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2590, " \u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B \u0443\u0441\u043B\u0443\u0433 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2591, "div", 774);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2592, " \u041F\u0440\u0438\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u0435 \u0443\u0441\u043B\u0443\u0433 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2593, "div", 775)(2594, "div", 776);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2595, "input", 777);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2596, "div", 778);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2597, " \u0414\u043E 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2598, "div", 779);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2599, " \u0421\u043E\u0437\u0434\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2600, "div", 780)(2601, "div", 2)(2602, "h2", 781);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2603, " \u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B \u0443\u0441\u043B\u0443\u0433 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2604, "div", 774);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2605, " \u041F\u0440\u0438\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u0435 \u0443\u0441\u043B\u0443\u0433 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2606, "div", 775)(2607, "div", 776);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2608, "input", 777);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2609, "div", 778);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2610, " \u0414\u043E 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2611, "div", 779);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2612, " \u0421\u043E\u0437\u0434\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2613, "div", 782)(2614, "div", 2)(2615, "h2", 773);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2616, " \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B \u0443\u0441\u043B\u0443\u0433 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2617, "div", 775)(2618, "div", 776);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2619, "input", 777);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2620, "div", 778);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2621, " \u0414\u043E 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2622, "div", 779);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2623, " \u0421\u043E\u0437\u0434\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2624, "div", 783)(2625, "div", 2)(2626, "h2", 781);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2627, " \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B \u0443\u0441\u043B\u0443\u0433 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2628, "div", 775)(2629, "div", 776);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2630, "input", 777);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2631, "div", 778);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2632, " \u0414\u043E 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2633, "div", 779);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2634, " \u0421\u043E\u0437\u0434\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2635, "div", 782)(2636, "div", 563)(2637, "h2", 773);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2638, " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443 \u0432 \u0433\u0440\u0443\u043F\u043F\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2639, "div", 784);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2640, " \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043D\u043E\u0432\u0443\u044E \u0433\u0440\u0443\u043F\u043F\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2641, "div", 775)(2642, "div", 776);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2643, "input", 777);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2644, "div", 785);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2645, " \u0414\u043E 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2646, "div", 784);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2647, " \u041B\u0438\u0431\u043E \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0432 \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0443\u044E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2648, "div", 786)(2649, "div", 776);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2650, "input", 787);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2651, "div", 788);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2652, " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2653, "div", 783)(2654, "div", 563)(2655, "h2", 781);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2656, " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443 \u0432 \u0433\u0440\u0443\u043F\u043F\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2657, "div", 789);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2658, " \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043D\u043E\u0432\u0443\u044E \u0433\u0440\u0443\u043F\u043F\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2659, "div", 775)(2660, "div", 776);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2661, "input", 777);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2662, "div", 785);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2663, " \u0414\u043E 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2664, "div", 789);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2665, " \u041B\u0438\u0431\u043E \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0432 \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0443\u044E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2666, "div", 786)(2667, "div", 776);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2668, "input", 787);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2669, "div", 788);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2670, " \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2671, "div", 782)(2672, "div", 563)(2673, "h2", 790);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2674, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0443\u0441\u043B\u0443\u0433\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2675, "div", 791);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2676, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443 \u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u0430\u044F \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2677, "div", 792);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2678, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2679, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2680, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2681, "div", 783)(2682, "div", 563)(2683, "h2", 794);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2684, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0443\u0441\u043B\u0443\u0433\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2685, "div", 795);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2686, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443 \u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u0430\u044F \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2687, "div", 792);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2688, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2689, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2690, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2691, "div", 782)(2692, "div", 563)(2693, "div", 796);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2694, " \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0447\u0430\u0441\u043E\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2695, "div", 797);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2696, "input", 798);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2697, " \u0447. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2698, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2699, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2700, "div", 783)(2701, "div", 563)(2702, "div", 796);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2703, " \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0447\u0430\u0441\u043E\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2704, "div", 797);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2705, "input", 798);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2706, " \u0447. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2707, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2708, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2709, "div", 782)(2710, "div", 799)(2711, "h2", 251);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2712, " \u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0435 \u043E \u0437\u0430\u043F\u0438\u0441\u0438! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2713, "div", 800);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2714, " \u0417\u0430\u0432\u0442\u0440\u0430 \u0432 12:00 \u0432\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B \u043A: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2715, "div", 800)(2716, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2717, "\u041E\u041E\u041E \u0420\u043E\u043C\u0430\u0448\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2718, "div", 801);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2719, " \u043D\u0430 \u0434\u0435\u0442\u0441\u043A\u0438\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2720, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2721, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2722, "div", 783)(2723, "div", 799)(2724, "h2", 356);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2725, " \u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0435 \u043E \u0437\u0430\u043F\u0438\u0441\u0438! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2726, "div", 800);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2727, " \u0417\u0430\u0432\u0442\u0440\u0430 \u0432 12:00 \u0432\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B \u043A: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2728, "div", 800)(2729, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2730, "\u041E\u041E\u041E \u0420\u043E\u043C\u0430\u0448\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2731, "div", 801);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2732, " \u043D\u0430 \u0434\u0435\u0442\u0441\u043A\u0438\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2733, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2734, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2735, "div", 783)(2736, "div", 799)(2737, "h2", 356);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2738, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0430\u043B\u044C\u0431\u043E\u043C\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2739, "div", 802);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2740, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0430\u043B\u044C\u0431\u043E\u043C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2741, "div", 803);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2742, " \u041F\u0440\u0438\u0447\u0435\u0441\u043A\u0438 ? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2743, "div", 804);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2744, " \u0412 \u0430\u043B\u044C\u0431\u043E\u043C\u0435 \u0435\u0441\u0442\u044C \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2745, "div", 792);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2746, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2747, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2748, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2749, "div", 782)(2750, "div", 799)(2751, "h2", 251);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2752, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0430\u043B\u044C\u0431\u043E\u043C\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2753, "div", 802);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2754, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0430\u043B\u044C\u0431\u043E\u043C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2755, "div", 805);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2756, " \u041F\u0440\u0438\u0447\u0435\u0441\u043A\u0438 ? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2757, "div", 792);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2758, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2759, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2760, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2761, "div", 782)(2762, "div", 799)(2763, "h2", 251);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2764, " \u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0435 \u043E \u0437\u0430\u043F\u0438\u0441\u0438! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2765, "div", 800);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2766, " \u0427\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430 \u0443 \u0432\u0430\u0441 \u0437\u0430\u043F\u0438\u0441\u044C \u043A: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2767, "div", 800)(2768, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2769, "\u041E\u041E\u041E \u0420\u043E\u043C\u0430\u0448\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2770, "div", 801);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2771, " \u043D\u0430 \u0434\u0435\u0442\u0441\u043A\u0438\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2772, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2773, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2774, "div", 783)(2775, "div", 799)(2776, "h2", 356);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2777, " \u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0435 \u043E \u0437\u0430\u043F\u0438\u0441\u0438! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2778, "div", 800);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2779, " \u0427\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430 \u0443 \u0432\u0430\u0441 \u0437\u0430\u043F\u0438\u0441\u044C \u043A: ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2780, "div", 800)(2781, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2782, "\u041E\u041E\u041E \u0420\u043E\u043C\u0430\u0448\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2783, "div", 801);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2784, " \u043D\u0430 \u0434\u0435\u0442\u0441\u043A\u0438\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2785, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2786, " \u041E\u043A ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2787, "div", 782)(2788, "div", 799)(2789, "h2", 762);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2790, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0433\u0440\u0430\u0444\u0438\u043A\u0430 \u0440\u0430\u0431\u043E\u0442\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2791, "div", 806);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2792, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0433\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2793, "div", 807)(2794, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2795, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0430\u0444\u0438\u043A\u0430 \u0440\u0430\u0431\u043E\u0442\u044B");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2796, "div", 792);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2797, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2798, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2799, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2800, "div", 783)(2801, "div", 799)(2802, "h2", 766);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2803, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0433\u0440\u0430\u0444\u0438\u043A\u0430 \u0440\u0430\u0431\u043E\u0442\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2804, "div", 806);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2805, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0433\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2806, "div", 807)(2807, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2808, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0430\u0444\u0438\u043A\u0430 \u0440\u0430\u0431\u043E\u0442\u044B");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2809, "div", 792);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2810, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2811, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2812, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2813, "div", 782)(2814, "div", 808)(2815, "h2", 762);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2816, " \u0413\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B \u0442\u0435\u043F\u0435\u0440\u044C \u043D\u0435 \u0430\u043A\u0442\u0438\u0432\u0435\u043D! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2817, "div", 806);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2818, " \u0412 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u043E\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438, \u043A \u0432\u0430\u043C \u043D\u0435 \u0441\u043C\u043E\u0433\u0443\u0442 \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u043E\u0432\u044B\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u044B! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2819, "div", 807);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2820, " \u041A\u043B\u0438\u0435\u043D\u0442\u0430\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043B\u0438\u0441\u044C \u043A \u0432\u0430\u043C \u0440\u0430\u043D\u0435\u0435, \u0432\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0433\u043E\u0432\u043E\u0440\u0435\u043D\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2821, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2822, " \u041Ek ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2823, "div", 783)(2824, "div", 808)(2825, "h2", 766);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2826, " \u0413\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B \u0442\u0435\u043F\u0435\u0440\u044C \u043D\u0435 \u0430\u043A\u0442\u0438\u0432\u0435\u043D! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2827, "div", 806);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2828, " \u0412 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u043E\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438, \u043A \u0432\u0430\u043C \u043D\u0435 \u0441\u043C\u043E\u0433\u0443\u0442 \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u043E\u0432\u044B\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u044B! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2829, "div", 807);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2830, " \u041A\u043B\u0438\u0435\u043D\u0442\u0430\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043B\u0438\u0441\u044C \u043A \u0432\u0430\u043C \u0440\u0430\u043D\u0435\u0435, \u0432\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0433\u043E\u0432\u043E\u0440\u0435\u043D\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2831, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2832, " \u041Ek ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2833, "div", 782)(2834, "div", 808)(2835, "h2", 762);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2836, " \u0413\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B \u0442\u0435\u043F\u0435\u0440\u044C \u043D\u0435 \u0430\u043A\u0442\u0438\u0432\u0435\u043D! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2837, "div", 807);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2838, " \u0412 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u043E\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438, \u043A \u0432\u0430\u043C \u043D\u0435 \u0441\u043C\u043E\u0433\u0443\u0442 \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u043E\u0432\u044B\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u044B! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2839, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2840, " \u041Ek ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2841, "div", 783)(2842, "div", 808)(2843, "h2", 766);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2844, " \u0413\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B \u0442\u0435\u043F\u0435\u0440\u044C \u043D\u0435 \u0430\u043A\u0442\u0438\u0432\u0435\u043D! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2845, "div", 807);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2846, " \u0412 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u043E\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438, \u043A \u0432\u0430\u043C \u043D\u0435 \u0441\u043C\u043E\u0433\u0443\u0442 \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u043E\u0432\u044B\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u044B! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2847, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2848, " \u041Ek ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2849, "div", 782)(2850, "div", 808)(2851, "h2", 762);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2852, " \u0412\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438 \u0433\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2853, "div", 807);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2854, " \u041A\u043B\u0438\u0435\u043D\u0442\u0430\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043B\u0438\u0441\u044C \u043A \u0432\u0430\u043C \u0440\u0430\u043D\u0435\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0433\u0440\u0430\u0444\u0438\u043A\u0430, \u0432\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0438 \u0432 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2855, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2856, " \u041Ek ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2857, "div", 783)(2858, "div", 808)(2859, "h2", 766);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2860, " \u0412\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438 \u0433\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2861, "div", 807);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2862, " \u041A\u043B\u0438\u0435\u043D\u0442\u0430\u043C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043B\u0438\u0441\u044C \u043A \u0432\u0430\u043C \u0440\u0430\u043D\u0435\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0433\u0440\u0430\u0444\u0438\u043A\u0430, \u0432\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0438 \u0432 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2863, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2864, " \u041Ek ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2865, "div", 782)(2866, "div", 808)(2867, "h2", 762);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2868, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2869, "div", 809);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2870, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2871, "div", 807)(2872, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2873, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2874, "div", 792);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2875, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2876, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2877, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2878, "div", 783)(2879, "div", 808)(2880, "h2", 766);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2881, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2882, "div", 809);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2883, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2884, "div", 807)(2885, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2886, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2887, "div", 792);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2888, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2889, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2890, " \u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2891, "div", 782)(2892, "div", 808)(2893, "h2", 251);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2894, " \u041D\u043E\u0432\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2895, "div", 810)(2896, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2897, "svg", 812)(2898, "mask", 813);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2899, "circle", 814);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2900, "g", 815);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2901, "circle", 816)(2902, "circle", 817)(2903, "path", 818)(2904, "circle", 819);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2905, "div", 820)(2906, "div", 753)(2907, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2908, "\u0421\u0438\u0442\u043D\u0438\u043A\u043E\u0432\u0430 \u042D\u043B\u044C\u0432\u0438\u0440\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2909, "div", 721)(2910, "div", 821)(2911, "div", 141);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2912, "svg", 822);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2913, "path", 823);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2914, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2915, " 4,6 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2916, "div", 721);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2917, "svg", 822);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2918, "path", 824);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2919, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2920, " 100 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2921, "div", 796);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2922, " \u0423 \u0432\u0430\u0441 \u043D\u043E\u0432\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2923, "div", 800)(2924, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2925, "\u0414\u0435\u0442\u0441\u043A\u0438\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2926, "div", 825);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2927, " ( 1,5 \u0447) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2928, "div", 826)(2929, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2930, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2931, "path", 827);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2932, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2933, " 22 \u043C\u0430\u044F, 11:00 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2934, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2935, " \u041Ek ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2936, "div", 783)(2937, "div", 808)(2938, "h2", 356);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2939, " \u041D\u043E\u0432\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2940, "div", 810)(2941, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2942, "svg", 812)(2943, "mask", 813);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2944, "circle", 814);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2945, "g", 815);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2946, "circle", 816)(2947, "circle", 817)(2948, "path", 818)(2949, "circle", 819);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2950, "div", 820)(2951, "div", 753)(2952, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2953, "\u0421\u0438\u0442\u043D\u0438\u043A\u043E\u0432\u0430 \u042D\u043B\u044C\u0432\u0438\u0440\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2954, "div", 721)(2955, "div", 821)(2956, "div", 141);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2957, "svg", 822);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2958, "path", 823);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2959, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2960, " 4,6 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2961, "div", 721);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2962, "svg", 822);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2963, "path", 824);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2964, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2965, " 100 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2966, "div", 796);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2967, " \u0423 \u0432\u0430\u0441 \u043D\u043E\u0432\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2968, "div", 800)(2969, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2970, "\u0414\u0435\u0442\u0441\u043A\u0438\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2971, "div", 825);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2972, " ( 1,5 \u0447) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2973, "div", 826)(2974, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2975, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2976, "path", 827);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2977, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2978, " 22 \u043C\u0430\u044F, 11:00 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2979, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2980, " \u041Ek ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2981, "div", 782)(2982, "div", 808)(2983, "h2", 762);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2984, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0444\u043E\u0442\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2985, "div", 828);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2986, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u0443 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044E? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2987, "div", 829);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2988, "svg", 830);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2989, "rect", 831)(2990, "path", 832)(2991, "rect", 833);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2992, "div", 834);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2993, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2994, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2995, " \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2996, "div", 783)(2997, "div", 808)(2998, "h2", 766);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2999, " \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0444\u043E\u0442\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3000, "div", 828);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3001, " \u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u0443 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044E? ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3002, "div", 829);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3003, "svg", 830);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3004, "rect", 831)(3005, "path", 832)(3006, "rect", 833);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3007, "div", 834);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3008, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3009, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3010, " \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3011, "div", 782)(3012, "div", 808)(3013, "h2", 835);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3014, " \u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043B\u044C\u0431\u043E\u043C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3015, "div", 836);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3016, " \u041F\u0440\u0438\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0430\u043B\u044C\u0431\u043E\u043C\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3017, "div", 775);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3018, "input", 837);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3019, "div", 838);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3020, " \u0414\u043E 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3021, "div", 839);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3022, " \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u043F\u0435\u0440\u0432\u043E\u0435 \u0444\u043E\u0442\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3023, "div", 840);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3024, "svg", 830);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3025, "rect", 831)(3026, "path", 832)(3027, "rect", 833);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3028, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3029, " \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3030, "div", 783)(3031, "div", 808)(3032, "h2", 749);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3033, " \u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043B\u044C\u0431\u043E\u043C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3034, "div", 836);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3035, " \u041F\u0440\u0438\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0430\u043B\u044C\u0431\u043E\u043C\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3036, "div", 775);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3037, "input", 837);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3038, "div", 838);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3039, " \u0414\u043E 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3040, "div", 839);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3041, " \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u043F\u0435\u0440\u0432\u043E\u0435 \u0444\u043E\u0442\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3042, "div", 840);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3043, "svg", 830);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3044, "rect", 831)(3045, "path", 832)(3046, "rect", 833);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3047, "div", 793);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3048, " \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3049, "div", 841)(3050, "div", 753)(3051, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3052, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0430\u0442 \u0440\u0430\u0431\u043E\u0442\u044B \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438:");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3053, "div", 842)(3054, "div", 843);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3055, " \u0423\u0441\u043B\u0443\u0433\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3056, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3057, " \u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0441\u044F \u0437\u0430 \u043E\u043A\u0430\u0437\u0430\u043D\u043D\u0443\u044E \u0443\u0441\u043B\u0443\u0433\u0443. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3058, "div", 842)(3059, "div", 843);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3060, " \u0427\u0430\u0441 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3061, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3062, " \u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0441\u044F \u0437\u0430 \u0447\u0430\u0441 \u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u043C\u043E\u0439 \u0443\u0441\u043B\u0443\u0433\u0438 \u0438\u043B\u0438 \u0430\u0440\u0435\u043D\u0434\u0443\u0435\u043C\u043E\u0433\u043E \u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3063, "div", 844)(3064, "div", 843);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3065, " \u0410\u0440\u0435\u043D\u0434\u0430 \u043F\u043E\u0441\u0443\u0442\u043E\u0447\u043D\u0430\u044F ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3066, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3067, " \u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0441\u044F \u0437\u0430 \u0441\u0443\u0442\u043A\u0438 \u0430\u0440\u0435\u043D\u0434\u0443\u0435\u043C\u043E\u0433\u043E \u043F\u043E\u043C\u0435\u0449\u0435\u043D\u0438\u044F. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3068, "div", 845)(3069, "div", 753)(3070, "h2", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3071, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0430\u0442 \u0440\u0430\u0431\u043E\u0442\u044B \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438:");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3072, "div", 846)(3073, "div", 847);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3074, " \u0423\u0441\u043B\u0443\u0433\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3075, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3076, " \u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0441\u044F \u0437\u0430 \u043E\u043A\u0430\u0437\u0430\u043D\u043D\u0443\u044E \u0443\u0441\u043B\u0443\u0433\u0443. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3077, "div", 846)(3078, "div", 847);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3079, " \u0427\u0430\u0441 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3080, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3081, " \u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0441\u044F \u0437\u0430 \u0447\u0430\u0441 \u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u043C\u043E\u0439 \u0443\u0441\u043B\u0443\u0433\u0438 \u0438\u043B\u0438 \u0430\u0440\u0435\u043D\u0434\u0443\u0435\u043C\u043E\u0433\u043E \u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3082, "div", 848)(3083, "div", 847);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3084, " \u0410\u0440\u0435\u043D\u0434\u0430 \u043F\u043E\u0441\u0443\u0442\u043E\u0447\u043D\u0430\u044F ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3085, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3086, " \u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0441\u044F \u0437\u0430 \u0441\u0443\u0442\u043A\u0438 \u0430\u0440\u0435\u043D\u0434\u0443\u0435\u043C\u043E\u0433\u043E \u043F\u043E\u043C\u0435\u0449\u0435\u043D\u0438\u044F. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3087, "div", 849)(3088, "div", 126)(3089, "div", 563)(3090, "h2", 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3091, " \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3092, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3093, "div", 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3094, " \u041F\u043E\u0434\u0445\u043E\u0434\u044F\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0430\u0445 png, jpg. gif, bmp \u0434\u043E 10 \u041C\u0411 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3095, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3096, "div", 850)(3097, "div", 718);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3098, " \u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3099, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3100, "svg", 851);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3101, "path", 852);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3102, "img")(3103, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3104, "div", 142);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3105, " vajhgfajhldvjsh.jpg ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3106, "div", 139);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3107, " \u0413\u043E\u0442\u043E\u0432\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3108, "div", 853)(3109, "div", 854)(3110, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3111, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3112, "path", 855);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3113, "div", 856);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3114, " \u0410\u043B\u044C\u0431\u043E\u043C \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3115, "div", 854)(3116, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3117, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3118, "path", 855);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3119, "div", 856);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3120, " \u0410\u043B\u044C\u0431\u043E\u043C \u0443\u0434\u0430\u043B\u0435\u043D! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3121, "div", 854)(3122, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3123, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3124, "path", 855);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3125, "div", 856);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3126, " \u0423\u0441\u043B\u0443\u0433\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3127, "div", 854)(3128, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3129, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3130, "path", 855);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3131, "div", 856);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3132, " \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3133, "div", 854)(3134, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3135, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3136, "path", 855);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3137, "div", 856);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3138, " \u0413\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3139, "div", 857)(3140, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3141, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3142, "path", 855);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3143, "div", 856);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3144, " \u0423\u0441\u043B\u0443\u0433\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3145, "div", 857)(3146, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3147, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3148, "path", 855);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3149, "div", 856);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3150, " \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3151, "div", 857)(3152, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3153, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3154, "path", 855);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3155, "div", 856);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3156, " \u0413\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3157, "div", 858)(3158, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3159, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3160, "path", 859)(3161, "path", 860)(3162, "path", 861);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3163, "div", 862);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3164, " \u0423\u0441\u043B\u0443\u0433\u0430 \u041D\u0415 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3165, "div", 858)(3166, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3167, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3168, "path", 859)(3169, "path", 860)(3170, "path", 861);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3171, "div", 862);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3172, " \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u041D\u0415 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3173, "div", 858)(3174, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3175, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3176, "path", 859)(3177, "path", 860)(3178, "path", 861);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3179, "div", 862);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3180, " \u0413\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B \u041D\u0415 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3181, "div", 863)(3182, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3183, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3184, "path", 864)(3185, "path", 865)(3186, "path", 866);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3187, "div", 867);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3188, " \u0423\u0441\u043B\u0443\u0433\u0430 \u041D\u0415 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3189, "div", 863)(3190, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3191, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3192, "path", 864)(3193, "path", 865)(3194, "path", 866);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3195, "div", 867);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3196, " \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u041D\u0415 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3197, "div", 863)(3198, "div", 811);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3199, "svg", 719);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3200, "path", 864)(3201, "path", 865)(3202, "path", 866);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3203, "div", 867);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3204, " \u0413\u0440\u0430\u0444\u0438\u043A \u0440\u0430\u0431\u043E\u0442\u044B \u041D\u0415 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3205, "div")(3206, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
  },
  dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgSelectMultipleOption"]],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzdHJhbmljYS5jb21wb25lbnQuY3NzIn0= */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc3RhdGljL3N0cmFuaWNhL3N0cmFuaWNhLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG9LQUFvSyIsInNvdXJjZVJvb3QiOiIifQ== */"]
});

/***/ }),

/***/ 80207:
/*!***********************************************************!*\
  !*** ./src/app/static/typography/typography.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypographyComponent: () => (/* binding */ TypographyComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 28849);
var _TypographyComponent;


class TypographyComponent {}
_TypographyComponent = TypographyComponent;
_TypographyComponent.ɵfac = function TypographyComponent_Factory(t) {
  return new (t || _TypographyComponent)();
};
_TypographyComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: _TypographyComponent,
  selectors: [["app-typography"]],
  decls: 602,
  vars: 0,
  consts: [[1, "hmenu"], [1, "cont-horiz-between"], ["src", "img/logo-ocpio.png", 1, "logo"], [1, "cont-horiz"], [1, "btn-green", "gb-st1", "none768"], [1, "cont-horiz", "white-btn"], [1, "none768", 2, "display", "inline-block"], ["src", "img/bx-log-in-circle.png", 1, "none768", 2, "height", "38px"], ["src", "img/ico_botton/burger.png", 1, "burger"], [1, "cont-horiz", 2, "background", "#FAFAFC"], [1, "typograph-left-column"], [1, "typograph-right-column"], [1, "marker-green"], [1, "h4-name"], ["href", "http://cssworld.ru/flex/"], [1, "cont-horiz", "wrap"], [1, "cont-vert"], [1, "cont-horiz-start-start", "test-parent-box"], [1, "test-box"], [1, "cont-horiz-start", "test-parent-box"], [1, "cont-horiz-start-end", "test-parent-box"], [1, "cont-horiz-center-start", "test-parent-box"], [1, "cont-horiz", "test-parent-box"], [1, "cont-horiz-center-end", "test-parent-box"], [1, "cont-horiz-end-start", "test-parent-box"], [1, "cont-horiz-end-center", "test-parent-box"], [1, "cont-horiz-end-end", "test-parent-box"], [1, "cont-horiz-around-start", "test-parent-box"], [1, "cont-horiz-around", "test-parent-box"], [1, "cont-horiz-around-end", "test-parent-box"], [1, "cont-horiz-between-start", "test-parent-box"], [1, "cont-horiz-between", "test-parent-box"], [1, "cont-horiz-between-end", "test-parent-box"], [1, "cont-vert-start-start", "test-parent-box2"], [1, "cont-vert-start-center", "test-parent-box2"], [1, "cont-vert-start-end", "test-parent-box2"], [1, "cont-vert-center-start", "test-parent-box2"], [1, "cont-vert", "test-parent-box2"], [1, "cont-vert-center-end", "test-parent-box2"], [1, "cont-vert-end-start", "test-parent-box2"], [1, "cont-vert-end-center", "test-parent-box2"], [1, "cont-vert-end-end", "test-parent-box2"], [1, "cont-vert-around-left", "test-parent-box2"], [1, "cont-vert-around", "test-parent-box2"], [1, "cont-vert-around-end", "test-parent-box2"], [1, "cont-vert-between-start", "test-parent-box2"], [1, "cont-vert-center-between", "test-parent-box2"], [1, "cont-vert-between-end", "test-parent-box2"], [1, "cont-horiz-around-start", "wrap", 2, "background-color", "#ababab"], [1, "cont-horiz", "margin10"], [1, "round40", "background-green-dark"], [1, "color-green-dark"], [1, "round40", "background-green-basic"], [1, "color-green-basic", "txt-nowrap"], [1, "round40", "background-green-light"], [1, "color-green-light", "txt-nowrap"], [1, "round40", "background-black"], [1, "color-black", "txt-nowrap"], [1, "round40", "background-grey-dark"], [1, "color-grey-dark", "txt-nowrap"], [1, "round40", "background-grey"], [1, "color-grey", "txt-nowrap"], [1, "round40", "background-grey-light"], [1, "color-grey-light", "txt-nowrap"], [1, "round40", "background-white"], [1, "color-white", "txt-nowrap"], [1, "round40", "background-success"], [1, "color-success", "txt-nowrap"], [1, "round40", "background-info"], [1, "color-info", "txt-nowrap"], [1, "round40", "background-warning"], [1, "color-warning", "txt-nowrap"], [1, "round40", "background-error"], [1, "color-error", "txt-nowrap"], [1, "intro"], [1, "txt-green-light"], [1, "txt-gray-light"], [1, "cont-horiz-start"], [1, "cont-horiz", "btn-back"], [1, "btn-eror", "cont-vert"], [1, "btn-green", "cont-vert"], [1, "btn-black", "cont-vert"], [1, "btn-gray", "cont-vert"], [1, "btn-white", "cont-vert"], [1, "round30", "background-green-dark"], ["src", "img/ico_botton/Arrow-right-white.png", 1, "search-arr-right"], [1, "cont-horiz-start-start"], [1, "card", "cont-vert-center-between"], ["href", "@@card-service-link", 2, "height", "280px"], ["src", "img/page1/popular/1.jpg", 1, "card-img"], [1, "description_card"], [1, "cont-horiz-start-start", 2, "padding", "5PX"], [1, "cont-horiz", "margin-top10", "margin-bottom20"], ["src", "img/page1/popular/Ellipse-21.png", 1, "ico-comment"], [1, "margin-right20"], ["src", "./assets/img/ico/ico_rating_pc24.svg", 1, "card-usl-img-raiting", "margin-right10"], [1, "card-service-title", "margin-bottom10"], ["href", "@@card-service-link"], [1, ""], [1, "card-adress", "margin-bottom20"], [1, "teg-green"], [1, "description_card", "comment"], ["src", "img/1.22_b_a/ava_comments.png", 1, "comment-foto"], [1, "cont-vert-start"], [2, "margin", "0px!important"], ["src", "./assets/img/ico/ico_rating_pc24.svg", 1, "comment-img-raiting"], [1, "raiting-numb"], [1, "contest", "cont-vert-between", 2, "background-image", "url(img/1.8_u_a/contest1.jpg)"], [1, "contest-name"], ["src", "img/1.8_u_a/Ico-location.png"], [1, "margin-right10"], ["src", "img/1.8_u_a/arr-right-white.png"], ["Style", "min-width:300px;", 1, "width100"], ["name", "test", "method", "post", "action", "input1.php", 1, "search-line"], [1, "cont-horiz-between", "search-line-in"], ["type", "text", "size", "11", "placeholder", "\u0427\u0442\u043E \u0432\u044B \u0438\u0449\u0435\u0442\u0435?", 2, "border", "0px"], [1, "round30"]],
  template: function TypographyComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3)(4, "div", 4)(5, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 5)(8, "p", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "\u0412\u0445\u043E\u0434");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "img", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "img", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 9)(16, "div", 10)(17, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " \u0420\u0430\u0437\u043E\u0431\u0440\u0430\u0442\u044C ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 11)(20, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Onwaves (.marker-green) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "\u0422\u0435\u043A\u0441\u0442 (.h4-name)");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 9)(25, "div", 10)(26, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " \u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 11)(29, "a", 14)(30, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "\u0413\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 flex, flexbox - http://cssworld.ru/flex/");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 15)(33, "div", 16)(34, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, " (.cont-horiz-start-start) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 17)(37, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 16)(44, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, " (.cont-horiz-start) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 19)(47, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 16)(54, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, " (.cont-horiz-start-end) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 20)(57, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 16)(64, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, " (.cont-horiz-center-start) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 21)(67, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "div", 16)(74, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, " (.cont-horiz) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "div", 22)(77, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](78, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "div", 16)(84, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, " (.cont-horiz-center-end) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "div", 23)(87, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](88, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](90, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "div", 16)(94, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, " (.cont-horiz-end-start) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 24)(97, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](98, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](100, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](102, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "div", 16)(104, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](105, " (.cont-horiz-end-center) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "div", 25)(107, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](108, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](110, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](112, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "div", 16)(114, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](115, " (.cont-horiz-end-end) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "div", 26)(117, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](118, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](120, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](122, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](123, "div", 16)(124, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](125, " (.cont-horiz-around-start) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "div", 27)(127, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](128, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](130, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](131, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](132, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "div", 16)(134, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](135, " (.cont-horiz-around) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "div", 28)(137, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](138, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](139, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](140, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](141, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](142, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](143, "div", 16)(144, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](145, " (.cont-horiz-around-end) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](146, "div", 29)(147, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](148, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](149, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](150, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](151, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](152, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](153, "div", 16)(154, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](155, " (.cont-horiz-between-start) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](156, "div", 30)(157, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](158, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](159, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](160, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](161, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](162, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](163, "div", 16)(164, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](165, " (.cont-horiz-between) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](166, "div", 31)(167, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](168, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](169, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](170, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](171, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](172, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](173, "div", 16)(174, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](175, " (.cont-horiz-between-end) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](176, "div", 32)(177, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](178, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](179, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](180, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](181, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](182, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](183, "div", 16)(184, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](185, " (.cont-vert-start-start) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](186, "div", 33)(187, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](188, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](189, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](190, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](191, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](192, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](193, "br")(194, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](195, "div", 16)(196, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](197, " (.cont-vert-start-center) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](198, "div", 34)(199, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](200, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](201, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](202, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](203, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](204, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](205, "br")(206, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](207, "div", 16)(208, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](209, " (.cont-vert-start-end) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](210, "div", 35)(211, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](212, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](213, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](214, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](215, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](216, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](217, "br")(218, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](219, "div", 16)(220, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](221, " (.cont-vert-center-start) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](222, "div", 36)(223, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](224, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](225, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](226, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](227, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](228, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](229, "br")(230, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](231, "div", 16)(232, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](233, " (.cont-vert) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](234, "div", 37)(235, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](236, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](237, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](238, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](239, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](240, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](241, "br")(242, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](243, "div", 16)(244, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](245, " (.cont-vert-center-end) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](246, "div", 38)(247, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](248, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](249, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](250, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](251, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](252, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](253, "br")(254, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](255, "div", 16)(256, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](257, " (.cont-vert-end-start) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](258, "div", 39)(259, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](260, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](261, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](262, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](263, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](264, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](265, "br")(266, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](267, "div", 16)(268, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](269, " (.cont-vert-end-center) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](270, "div", 40)(271, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](272, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](273, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](274, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](275, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](276, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](277, "br")(278, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](279, "div", 16)(280, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](281, " (.cont-vert-end-end) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](282, "div", 41)(283, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](284, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](285, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](286, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](287, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](288, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](289, "br")(290, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](291, "div", 16)(292, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](293, " (.cont-vert-around-left) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](294, "div", 42)(295, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](296, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](297, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](298, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](299, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](300, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](301, "div", 16)(302, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](303, " (.cont-vert-around) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](304, "div", 43)(305, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](306, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](307, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](308, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](309, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](310, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](311, "div", 16)(312, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](313, " (.cont-vert-around-end) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](314, "div", 44)(315, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](316, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](317, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](318, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](319, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](320, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](321, "div", 16)(322, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](323, " (.cont-vert-between-start) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](324, "div", 45)(325, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](326, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](327, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](328, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](329, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](330, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](331, "div", 16)(332, "div")(333, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](334, "(.cont-vert-center-between)");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](335, "div", 46)(336, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](337, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](338, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](339, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](340, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](341, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](342, "div", 16)(343, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](344, " (.cont-vert-between-end) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](345, "div", 47)(346, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](347, "\u0411\u043B\u043E\u043A 1 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](348, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](349, "\u0411\u043B\u043E\u043A 2 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](350, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](351, "\u0411\u043B\u043E\u043A 3 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](352, "div", 9)(353, "div", 10)(354, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](355, " \u0426\u0432\u0435\u0442\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](356, "div", 11)(357, "div", 48)(358, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](359, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](360, "\u00A0\u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](361, "div", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](362, " (.color-green-dark) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](363, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](364, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](365, "#409B89");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](366, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](367, "div", 52);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](368, "\u00A0\u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](369, "div", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](370, " (.color-green-basic) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](371, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](372, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](373, "$green-basic");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](374, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](375, "div", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](376, "\u00A0\u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](377, "div", 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](378, " (.color-green-light) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](379, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](380, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](381, "#00DAB3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](382, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](383, "div", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](384, "\u00A0\u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](385, "div", 57);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](386, " (.color-black) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](387, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](388, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](389, "#23262F");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](390, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](391, "div", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](392, "\u00A0\u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](393, "div", 59);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](394, " (.color-grey-dark) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](395, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](396, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](397, "#C0C5D5");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](398, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](399, "div", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](400, "\u00A0\u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](401, "div", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](402, " (.color-grey) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](403, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](404, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](405, "#DDE2ED");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](406, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](407, "div", 62);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](408, "\u00A0\u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](409, "div", 63);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](410, " (.color-grey-light) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](411, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](412, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](413, "#FAFAFC");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](414, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](415, "div", 64);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](416, "\u00A0\u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](417, "div", 65);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](418, " (.color-white) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](419, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](420, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](421, "#FFF");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](422, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](423, "div", 66);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](424, "\u00A0\u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](425, "div", 67);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](426, " (.color-success) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](427, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](428, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](429, "#4FB229");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](430, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](431, "div", 68);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](432, "\u00A0\u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](433, "div", 69);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](434, " (.color-info) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](435, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](436, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](437, "#0A6ED8");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](438, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](439, "div", 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](440, "div", 71);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](441, " (.color-warning) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](442, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](443, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](444, "#FFAB00");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](445, "div", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](446, "div", 72);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](447, "\u00A0\u00A0 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](448, "div", 73);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](449, " (.color-error) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](450, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](451, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](452, "#E24414");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](453, "div", 9)(454, "div", 10)(455, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](456, " \u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u043D\u0430 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0435 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](457, "div", 11)(458, "div", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](459, " \u0412\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0435(.intro) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](460, "div")(461, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](462, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 1 (1.5rem)");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](463, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](464, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 2 (1.25rem)");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](465, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](466, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 3 (1rem)");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](467, "div", 75);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](468, " \u0417\u0435\u043B\u0435\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 (.txt-green-light) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](469, "p", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](470, " \u0421\u0435\u0440\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 (.txt-gray-light) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](471, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](472, "\u0421\u0441\u044B\u043B\u043A\u0430");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](473, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](474, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](475, "\u0410\u0431\u0437\u0430\u0446 (p) - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](476, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](477, " \u0422\u0435\u043A\u0441\u0442 ( div ) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](478, "div", 3)(479, "div", 10)(480, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](481, " \u041A\u043D\u043E\u043F\u043A\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](482, "div", 11)(483, "div", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](484, "div", 78);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](485, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](486, " \u041A\u043D\u043E\u043F\u043A\u0430 \u043D\u0430\u0437\u0430\u0434 (.btn-back) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](487, "br")(488, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](489, "div", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](490, " .btn-eror ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](491, "br")(492, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](493, "div", 80);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](494, " .btn-green ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](495, "br")(496, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](497, "div", 81);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](498, " .btn-black ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](499, "br")(500, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](501, "div", 82);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](502, " .btn-gray ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](503, "br")(504, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](505, "div", 83);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](506, " .btn-white ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](507, "br")(508, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](509, "div", 77)(510, "div", 84);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](511, "img", 85);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](512, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](513, " \u041A\u043D\u043E\u043F\u043A\u0430 \u043F\u043E\u0438\u0441\u043A (.round30) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](514, "br")(515, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](516, "div", 9)(517, "div", 10)(518, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](519, " \u0424\u043E\u0440\u043C\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](520, "div", 11)(521, "div", 86)(522, "div", 87)(523, "a", 88);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](524, "img", 89);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](525, "div", 90)(526, "div", 91)(527, "div", 92);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](528, "img", 93);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](529, "p", 94);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](530, "100");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](531, "img", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](532, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](533, "4,6");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](534, "div", 96)(535, "a", 97)(536, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](537, "BarberShop");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](538, "p", 98);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](539, "p", 99);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](540, " \u041F\u0440\u043E\u0441\u043F\u0435\u043A\u0442 \u042E\u043D\u043D\u044B\u0445 \u041F\u0442\u0438\u0440\u0430\u0434\u0430\u043A\u0442\u0435\u043B\u0435\u0439, 666\n");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](541, "div", 100)(542, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](543, " \u0410\u0432\u0442\u043E/\u041C\u043E\u0442\u043E ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](544, "div", 101)(545, "div", 77)(546, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](547, "img", 102);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](548, "div", 103)(549, "div")(550, "h4", 104);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](551, " \u0417\u0438\u043D\u0430\u0438\u0434\u0430\u00A0\u0421\u043C\u0438\u0440\u043D\u043E\u0432\u0430 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](552, "div", 1)(553, "div", 1)(554, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](555, "img", 105);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](556, "div", 106)(557, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](558, " 4,6 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](559, "div", 1)(560, "div")(561, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](562, "22\u00A0\u043C\u0430\u044F\u00A02021");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](563, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](564, " \u041E\u0441\u0442\u0430\u043B\u0430\u0441\u044C \u043E\u0447\u0435\u043D\u044C \u0434\u043E\u0432\u043E\u043B\u044C\u043D\u0430 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u0435\u043C \u0441\u0442\u0443\u0434\u0438\u0438, \u043C\u0430\u0441\u0442\u0435\u0440 \u0434\u043E\u0431\u0440\u0430\u044F \u0438 \u043E\u0442\u0437\u044B\u0432\u0447\u0438\u0432\u0430\u044F, \u044F\u0432\u043D\u043E \u0431\u044B\u043B\u0430 \u0437\u0430\u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043E\u0432\u0430\u043D\u0430 \u0432 \u0442\u043E\u043C, \u0447\u0442\u043E\u0431\u044B \u0440\u0430\u0431\u043E\u0442\u0430 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0430\u0441\u044C \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439, \u043F\u043E\u043C\u043E\u0433\u0430\u043B\u0430 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0446\u0432\u0435\u0442 \u0438 \u0434\u0438\u0437\u0430\u0439\u043D. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](565, "div", 107)(566, "div", 108)(567, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](568, "\u041F\u0443\u0448\u0438\u0441\u0442\u044B\u0435-\u0448\u0435\u0440\u0441\u0442\u0438\u0442\u0441\u044B\u0435 \u0431\u0440\u043E\u0432\u0438 \u0448\u0435\u043B\u043A\u043E\u0432\u0438\u0441\u0442\u044B\u0435");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](569, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](570, " \u041B\u0443\u0447\u0448\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430 \u0432 \u0442\u0435\u0445\u043D\u0438\u043A\u0435 airbrow\n");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](571, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](572, "img", 109);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](573, "\u00A0 \u0420\u043E\u0441\u0441\u0438\u044F\n");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](574, "div", 1)(575, "div", 110);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](576, " 1.01\u00A0\u2013\u00A031.01 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](577, "div", 110);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](578, " \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C 3\u00A0\u0434\u043D\u044F ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](579, "div", 3)(580, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](581, "\u0427\u0438\u0442\u0430\u0442\u044C\u00A0\u0443\u0441\u043B\u043E\u0432\u0438\u044F\u00A0\u00A0");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](582, "img", 111);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](583, "div", 112)(584, "form", 113)(585, "div", 114)(586, "div");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](587, "input", 115);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](588, "div", 116);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](589, "img", 85);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](590, "div", 9)(591, "div", 10)(592, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](593, " \u0421\u043F\u0438\u0441\u043A\u0438 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](594, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](595, "div", 9)(596, "div", 10)(597, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](598, " \u041E\u0442\u0441\u0442\u0443\u043F\u044B ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](599, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](600, " (hr) ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](601, "hr");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
  },
  dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgForm],
  styles: ["/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0eXBvZ3JhcGh5LmNvbXBvbmVudC5jc3MifQ== */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc3RhdGljL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSx3S0FBd0siLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_static_static_module_ts.js.map