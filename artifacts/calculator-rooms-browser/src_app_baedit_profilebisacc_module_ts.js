"use strict";
(self["webpackChunkMainSiteOcpio"] = self["webpackChunkMainSiteOcpio"] || []).push([["src_app_baedit_profilebisacc_module_ts"],{

/***/ 82907:
/*!************************************************!*\
  !*** ./src/app/baedit/profilebisacc.module.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfilebisaccModule: () => (/* binding */ ProfilebisaccModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _ba_edit_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ba-edit-shared.module */ 73191);
/* harmony import */ var _profilebisacc_profilebisacc_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profilebisacc/profilebisacc.component */ 69907);
/* harmony import */ var _profilebisacc_profile_bainfo_profile_bainfo_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profilebisacc/profile-bainfo/profile-bainfo.component */ 13113);
/* harmony import */ var _profilebisacc_reviews_reviews_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profilebisacc/reviews/reviews.component */ 1556);
/* harmony import */ var _common_profile_lenta_lenta_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/profile/lenta/lenta.component */ 68440);
/* harmony import */ var _common_profile_addPost_addPost_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/profile/addPost/addPost.component */ 59906);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);
var _ProfilebisaccModule;









/**
 * Ленивый чанк раздела `/profilebisacc/*` — «как мой профиль видят клиенты».
 * Открывается только изнутри кабинета (baedit.component, contacts, galereya,
 * column-baprofile), публичных входов нет.
 *
 * Делит объявления с BaEditModule через BaEditSharedModule: webpack вынесет их
 * в общий чанк, который скачается один раз на оба раздела.
 */
const routes = [{
  path: ':id',
  component: _profilebisacc_profilebisacc_component__WEBPACK_IMPORTED_MODULE_1__.ProfileBasicComponent,
  children: [{
    path: '',
    component: _profilebisacc_profile_bainfo_profile_bainfo_component__WEBPACK_IMPORTED_MODULE_2__.ProfileBAInfoComponent
  }, {
    path: 'reviews',
    component: _profilebisacc_reviews_reviews_component__WEBPACK_IMPORTED_MODULE_3__.ReviewsComponent
  }, {
    path: 'lenta',
    component: _common_profile_lenta_lenta_component__WEBPACK_IMPORTED_MODULE_4__.LentaComponent
  }, {
    path: 'add-post',
    component: _common_profile_addPost_addPost_component__WEBPACK_IMPORTED_MODULE_5__.AddPostComponent
  }]
}];
class ProfilebisaccModule {}
_ProfilebisaccModule = ProfilebisaccModule;
_ProfilebisaccModule.ɵfac = function ProfilebisaccModule_Factory(t) {
  return new (t || _ProfilebisaccModule)();
};
_ProfilebisaccModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
  type: _ProfilebisaccModule
});
_ProfilebisaccModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
  imports: [_ba_edit_shared_module__WEBPACK_IMPORTED_MODULE_0__.BaEditSharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes)]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](ProfilebisaccModule, {
    imports: [_ba_edit_shared_module__WEBPACK_IMPORTED_MODULE_0__.BaEditSharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_baedit_profilebisacc_module_ts.js.map