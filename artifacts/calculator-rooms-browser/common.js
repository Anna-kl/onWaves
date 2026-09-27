"use strict";
(self["webpackChunkMainSiteOcpio"] = self["webpackChunkMainSiteOcpio"] || []).push([["common"],{

/***/ 63509:
/*!********************************************************************************!*\
  !*** ./src/app/profile-user/components/reviews-user/reviews-user.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReviewsUserComponent: () => (/* binding */ ReviewsUserComponent)
/* harmony export */ });
/* harmony import */ var _services_rating_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../services/rating.service */ 48735);
/* harmony import */ var _DTO_enums_reviewType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../DTO/enums/reviewType */ 62234);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 76101);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 28849);
var _ReviewsUserComponent;







function ReviewsUserComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ReviewsUserComponent_div_18_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3);
      const rating_r1 = restoredCtx.$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r2.setRating(rating_r1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rating_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"](rating_r1.class);
  }
}
class ReviewsUserComponent {
  constructor(_apiRating, _modal) {
    this._apiRating = _apiRating;
    this._modal = _modal;
    this.ratings = [];
    this.rating = 0;
    this.text = '';
    this.profileId = null;
    this.recordId = null;
    this.avatar = null;
    this.name = null;
    for (let i of [1, 2, 3, 4, 5]) {
      this.ratings.push({
        class: 'ico_rating_default',
        isChoose: false,
        step: i
      });
    }
  }
  ngOnInit() {}
  setRating(rat) {
    this.rating = rat.step;
    this.ratings.forEach(item => {
      if (item.step <= rat.step) {
        item.class = 'ico_rating_color';
        item.isChoose = true;
      } else {
        item.class = 'ico_rating_default';
        item.isChoose = false;
      }
    });
  }
  getColor() {
    if (this.rating > 0 && this.text.length > 0) {
      return 'btn-green';
    } else {
      return 'btn-gray';
    }
  }
  saveRating() {
    if (this.profileId && this.recordId) {
      this._apiRating.saveRating(this.profileId, {
        rating: this.rating,
        recordId: this.recordId,
        text: this.text,
        ratingParentId: null,
        reviewType: _DTO_enums_reviewType__WEBPACK_IMPORTED_MODULE_1__.ReviewType.REVIEW
      }).subscribe(result => {
        if (result.code === 201) {
          this._modal.close(true);
        } else {
          this._modal.close(false);
        }
      });
    }
  }
}
_ReviewsUserComponent = ReviewsUserComponent;
_ReviewsUserComponent.ɵfac = function ReviewsUserComponent_Factory(t) {
  return new (t || _ReviewsUserComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_rating_service__WEBPACK_IMPORTED_MODULE_0__.RatingService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbActiveModal));
};
_ReviewsUserComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _ReviewsUserComponent,
  selectors: [["app-reviews-user"]],
  inputs: {
    profileId: "profileId",
    recordId: "recordId",
    avatar: "avatar",
    name: "name"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([_services_rating_service__WEBPACK_IMPORTED_MODULE_0__.RatingService])],
  decls: 23,
  vars: 6,
  consts: [[1, "w100", 2, "max-width", "540px"], [1, "cont-vert"], [1, "w100", "cont-horiz-start", "margin-bottom30"], [2, "max-width", "60px", "height", "60px", "border-radius", "60px", "margin-right", "20px", 3, "src"], [2, "font-size", "1.25rem"], [1, "margin-bottom20", "w100", 2, "text-align", "left"], [1, "margin-bottom30", 2, "max-width", "500px"], [2, "text-align", "center"], [1, "cont-horiz-around", "w100", "margin-top-bottom30", 2, "max-width", "320px"], [3, "class", "click", 4, "ngFor", "ngForOf"], ["rows", "5", "cols", "45", "name", "text", "placeholder", "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", 1, "textarea-reg-ba", "margin-bottom50", 3, "ngModel", "ngModelChange"], [1, "w100", "margin-bottom30", 2, "text-align", "center", 3, "click"], [3, "click"]],
  template: function ReviewsUserComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "img", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "h2", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 5)(7, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "\u0421\u0435\u0430\u043D\u0441 \u043E\u043A\u043E\u043D\u0447\u0435\u043D!");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "p", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, " \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u043E\u0431 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u0435 \u0438 \u043E\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0445 \u0443\u0441\u043B\u0443\u0433\u0430\u0445. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "br")(12, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, " \u0425\u043E\u0440\u043E\u0448\u0438\u0439 \u043E\u0442\u0437\u044B\u0432 \u043C\u043E\u0442\u0438\u0432\u0438\u0440\u0443\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044F, \u0430 \u043D\u0435\u0433\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0443\u0431\u0435\u0440\u0435\u0436\u0435\u0442 \u0434\u0440\u0443\u0433\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043E\u0442 \u043D\u0435\u0434\u043E\u0431\u0440\u043E\u0441\u043E\u0432\u0435\u0441\u0442\u043D\u044B\u0445 \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u0435\u0439! ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "p", 7)(15, "b");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "\u041F\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0446\u0435\u043D\u043A\u0443 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, ReviewsUserComponent_div_18_Template, 1, 2, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "textarea", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ReviewsUserComponent_Template_textarea_ngModelChange_19_listener($event) {
        return ctx.text = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "            ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ReviewsUserComponent_Template_div_click_21_listener() {
        return ctx.saveRating();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, " \u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432 ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx.avatar, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.name, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.ratings);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.text);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMap"](ctx.getColor());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel],
  styles: [".ico_rating_default{\n    background-image:url(/assets/svg/rating_default.svg);\n    height: 50px;\n    width: 50px;\n} \n.ico_rating_color{\n    background-image:url(/assets/svg/rating_color.svg);\n    height: 50px;\n    width: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJldmlld3MtdXNlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksb0RBQW9EO0lBQ3BELFlBQVk7SUFDWixXQUFXO0FBQ2Y7QUFDQTtJQUNJLGtEQUFrRDtJQUNsRCxZQUFZO0lBQ1osV0FBVztBQUNmIiwiZmlsZSI6InJldmlld3MtdXNlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmljb19yYXRpbmdfZGVmYXVsdHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6dXJsKC9hc3NldHMvc3ZnL3JhdGluZ19kZWZhdWx0LnN2Zyk7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICB3aWR0aDogNTBweDtcclxufSBcclxuLmljb19yYXRpbmdfY29sb3J7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOnVybCgvYXNzZXRzL3N2Zy9yYXRpbmdfY29sb3Iuc3ZnKTtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIHdpZHRoOiA1MHB4O1xyXG59Il19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcHJvZmlsZS11c2VyL2NvbXBvbmVudHMvcmV2aWV3cy11c2VyL3Jldmlld3MtdXNlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksb0RBQW9EO0lBQ3BELFlBQVk7SUFDWixXQUFXO0FBQ2Y7QUFDQTtJQUNJLGtEQUFrRDtJQUNsRCxZQUFZO0lBQ1osV0FBVztBQUNmO0FBQ0EsZ3JCQUFnckIiLCJzb3VyY2VzQ29udGVudCI6WyIuaWNvX3JhdGluZ19kZWZhdWx0e1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTp1cmwoL2Fzc2V0cy9zdmcvcmF0aW5nX2RlZmF1bHQuc3ZnKTtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIHdpZHRoOiA1MHB4O1xyXG59IFxyXG4uaWNvX3JhdGluZ19jb2xvcntcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6dXJsKC9hc3NldHMvc3ZnL3JhdGluZ19jb2xvci5zdmcpO1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgd2lkdGg6IDUwcHg7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"],
  encapsulation: 2
});

/***/ })

}]);
//# sourceMappingURL=common.js.map