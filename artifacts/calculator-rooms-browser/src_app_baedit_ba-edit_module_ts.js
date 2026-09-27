"use strict";
(self["webpackChunkMainSiteOcpio"] = self["webpackChunkMainSiteOcpio"] || []).push([["src_app_baedit_ba-edit_module_ts"],{

/***/ 21245:
/*!******************************************!*\
  !*** ./src/app/baedit/ba-edit.module.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaEditModule: () => (/* binding */ BaEditModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _ba_edit_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ba-edit-shared.module */ 73191);
/* harmony import */ var _baedit_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./baedit.component */ 69437);
/* harmony import */ var _components_main_profile_main_profile_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/main-profile/main-profile.component */ 80243);
/* harmony import */ var _components_promo_promo_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/promo/promo.component */ 3840);
/* harmony import */ var _components_promo_promo_template_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/promo/promo-template.component */ 58043);
/* harmony import */ var _components_promo_promo_editor_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/promo/promo-editor.component */ 30693);
/* harmony import */ var _components_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/contacts/contacts.component */ 3593);
/* harmony import */ var _components_uslugi_uslugi_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/uslugi/uslugi.component */ 13238);
/* harmony import */ var _components_galereya_galereya_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/galereya/galereya.component */ 23302);
/* harmony import */ var _components_grafik_grafik_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/grafik/grafik.component */ 80688);
/* harmony import */ var _components_oplata_oplata_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/oplata/oplata.component */ 65806);
/* harmony import */ var _components_rubric_rubric_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/rubric/rubric.component */ 60842);
/* harmony import */ var _components_uslugi_arenda_arenda_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/uslugi/arenda/arenda.component */ 38057);
/* harmony import */ var _components_uslugi_arenda2_arenda2_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/uslugi/arenda2/arenda2.component */ 94482);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 61699);
var _BaEditModule;

















/**
 * Ленивый чанк раздела `/ba-edit/*` — кабинет редактирования бизнес-профиля.
 * Раздел закрыт profileEditGuard (гард навешен на маршрут в AppRoutingModule),
 * то есть рекламный и поисковый трафик сюда не попадает никогда — а раньше его
 * код ехал в главном бандле.
 *
 * Пути относительны префикса `ba-edit`, который навешивается в AppRoutingModule
 * через loadChildren.
 */
const routes = [{
  path: ':id',
  component: _baedit_component__WEBPACK_IMPORTED_MODULE_1__.BAEditComponent,
  children: [{
    path: '',
    component: _components_main_profile_main_profile_component__WEBPACK_IMPORTED_MODULE_2__.MainProfileComponent
  }, {
    path: 'galereya',
    component: _components_galereya_galereya_component__WEBPACK_IMPORTED_MODULE_8__.GalereyaComponent
  }, {
    path: 'uslugi',
    component: _components_uslugi_uslugi_component__WEBPACK_IMPORTED_MODULE_7__.UslugiComponent
  }, {
    path: 'promo',
    component: _components_promo_promo_component__WEBPACK_IMPORTED_MODULE_3__.PromoComponent
  }, {
    path: 'promo/template',
    component: _components_promo_promo_template_component__WEBPACK_IMPORTED_MODULE_4__.PromoTemplateComponent
  }, {
    path: 'promo/edit',
    component: _components_promo_promo_editor_component__WEBPACK_IMPORTED_MODULE_5__.PromoEditorComponent
  }, {
    path: 'promo/edit/:offerId',
    component: _components_promo_promo_editor_component__WEBPACK_IMPORTED_MODULE_5__.PromoEditorComponent
  }, {
    path: 'contacts',
    component: _components_contacts_contacts_component__WEBPACK_IMPORTED_MODULE_6__.ContactsComponent
  }, {
    path: 'rubric',
    component: _components_rubric_rubric_component__WEBPACK_IMPORTED_MODULE_11__.RubricComponent
  }, {
    path: 'schedule',
    component: _components_grafik_grafik_component__WEBPACK_IMPORTED_MODULE_9__.GrafikComponent
  }, {
    path: 'oplata',
    component: _components_oplata_oplata_component__WEBPACK_IMPORTED_MODULE_10__.OplataComponent
  }, {
    path: 'arenda-hour',
    component: _components_uslugi_arenda_arenda_component__WEBPACK_IMPORTED_MODULE_12__.ArendaComponent
  }, {
    path: 'arenda-service',
    component: _components_uslugi_arenda2_arenda2_component__WEBPACK_IMPORTED_MODULE_13__.Arenda2Component
  }]
}];
class BaEditModule {}
_BaEditModule = BaEditModule;
_BaEditModule.ɵfac = function BaEditModule_Factory(t) {
  return new (t || _BaEditModule)();
};
_BaEditModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({
  type: _BaEditModule
});
_BaEditModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjector"]({
  imports: [_ba_edit_shared_module__WEBPACK_IMPORTED_MODULE_0__.BaEditSharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule.forChild(routes)]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](BaEditModule, {
    imports: [_ba_edit_shared_module__WEBPACK_IMPORTED_MODULE_0__.BaEditSharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule]
  });
})();

/***/ })

}]);
//# sourceMappingURL=src_app_baedit_ba-edit_module_ts.js.map