"use strict";
(self["webpackChunkMainSiteOcpio"] = self["webpackChunkMainSiteOcpio"] || []).push([["src_app_maks_clients_module_ts"],{

/***/ 7546:
/*!*******************************************!*\
  !*** ./src/app/DTO/enums/clientStatus.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientStatus: () => (/* binding */ ClientStatus)
/* harmony export */ });
var ClientStatus;
(function (ClientStatus) {
  ClientStatus[ClientStatus["CONSTANT"] = 0] = "CONSTANT";
  ClientStatus[ClientStatus["NEW"] = 1] = "NEW";
  ClientStatus[ClientStatus["BLACK"] = 2] = "BLACK";
})(ClientStatus || (ClientStatus = {}));

/***/ }),

/***/ 65096:
/*!****************************************!*\
  !*** ./src/app/maks/clients.module.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientsModule: () => (/* binding */ ClientsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _pageClient1_pageClient1_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageClient1/pageClient1.component */ 96261);
/* harmony import */ var _common_common_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/common.module */ 87677);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
var _ClientsModule;







/** Ленивый чанк `/clients` — список клиентов мастера. */
class ClientsModule {}
_ClientsModule = ClientsModule;
_ClientsModule.ɵfac = function ClientsModule_Factory(t) {
  return new (t || _ClientsModule)();
};
_ClientsModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _ClientsModule
});
_ClientsModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _common_common_module__WEBPACK_IMPORTED_MODULE_1__.CommonComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild([{
    path: '',
    component: _pageClient1_pageClient1_component__WEBPACK_IMPORTED_MODULE_0__.PageClient1Component
  }])]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ClientsModule, {
    declarations: [_pageClient1_pageClient1_component__WEBPACK_IMPORTED_MODULE_0__.PageClient1Component],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _common_common_module__WEBPACK_IMPORTED_MODULE_1__.CommonComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 96261:
/*!***********************************************************!*\
  !*** ./src/app/maks/pageClient1/pageClient1.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageClient1Component: () => (/* binding */ PageClient1Component)
/* harmony export */ });
/* harmony import */ var D_Project_Front_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngrx/store */ 36270);
/* harmony import */ var src_app_DTO_enums_clientStatus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/DTO/enums/clientStatus */ 7546);
/* harmony import */ var src_app_DTO_enums_paymentMethodType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/DTO/enums/paymentMethodType */ 36618);
/* harmony import */ var src_app_DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/DTO/enums/recordStatus */ 63345);
/* harmony import */ var src_app_ngrx_store_mainClient_store_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/ngrx-store/mainClient/store.select */ 20334);
/* harmony import */ var src_helpers_common_address__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/helpers/common/address */ 85572);
/* harmony import */ var src_helpers_common_avatar1__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/helpers/common/avatar1 */ 86824);
/* harmony import */ var src_helpers_common_timeHelpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/helpers/common/timeHelpers */ 7825);
/* harmony import */ var src_helpers_dateUtils_dateUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/helpers/dateUtils/dateUtils */ 15899);
/* harmony import */ var src_services_record_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/services/record.service */ 27789);
/* harmony import */ var src_services_statistic_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/services/statistic.service */ 62841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 26575);

var _PageClient1Component;


















function PageClient1Component_div_0_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 7)(1, "div", 8)(2, "div", 9)(3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 12)(6, "div", 13)(7, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div", 14)(10, "b", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div", 9)(13, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](14, " \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u0439:\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](15, "b", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "div", 18)(18, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](19, " \u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u0435:\u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](20, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](22, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()()()();
  }
  if (rf & 2) {
    const record_r3 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("src", ctx_r2.getAvatar(record_r3.avatar), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](record_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("color", ctx_r2.getColorLine(record_r3));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r2.getStatus(record_r3));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](record_r3.visitCount);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](22, 7, record_r3.lastVisit, "dd-MM-YYYY"));
  }
}
function PageClient1Component_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, "\u041A\u043B\u0438\u0435\u043D\u0442\u044B");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 4)(6, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function PageClient1Component_div_0_Template_div_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r4.setTypeClient("all"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7, "\u0412\u0441\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u044B");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function PageClient1Component_div_0_Template_div_click_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r5);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r6.setTypeClient("constant"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](9, "\u041F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0435");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function PageClient1Component_div_0_Template_div_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r5);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r7.setTypeClient("new"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](11, "\u041D\u043E\u0432\u044B\u0435");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function PageClient1Component_div_0_Template_div_click_12_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r5);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r8.setTypeClient("black"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](13, "\u0427\u0435\u0440\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](14, PageClient1Component_div_0_div_14_Template, 23, 10, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const records_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngClass", ctx_r0.getTypeClient("all") ? "btn-green" : "btn-white");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngClass", ctx_r0.getTypeClient("constant") ? "btn-green" : "btn-white");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngClass", ctx_r0.getTypeClient("new") ? "btn-green" : "btn-white");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngClass", ctx_r0.getTypeClient("black") ? "btn-green" : "btn-white");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r0.getClients(records_r1));
  }
}
class PageClient1Component {
  getClients(_t3) {
    switch (this.currentTypeClient) {
      case 'all':
        return _t3;
      case 'new':
        return _t3.filter(_ => _.visitCount === 1);
      case 'constant':
        return _t3.filter(_ => _.visitCount > 1);
      default:
        return _t3.filter(_ => _.statusClient === src_app_DTO_enums_clientStatus__WEBPACK_IMPORTED_MODULE_1__.ClientStatus.BLACK);
    }
  }
  setTypeClient(arg0) {
    this.currentTypeClient = arg0;
  }
  getTypeClient(arg0) {
    if (arg0 === this.currentTypeClient) {
      return true;
    } else {
      return false;
    }
  }
  constructor(_apiRecords, route, store$, _router, _statistic, sanitizer) {
    this._apiRecords = _apiRecords;
    this.route = route;
    this.store$ = store$;
    this._router = _router;
    this._statistic = _statistic;
    this.sanitizer = sanitizer;
    this.currentTypeClient = 'all';
    this.records$ = null;
    this.getHours = src_helpers_common_timeHelpers__WEBPACK_IMPORTED_MODULE_7__.getHours;
    this.getMinutes = src_helpers_common_timeHelpers__WEBPACK_IMPORTED_MODULE_7__.getMinutes;
    this.getAddressProfile = src_helpers_common_address__WEBPACK_IMPORTED_MODULE_5__.getAddressProfile;
    this.PaymentMethodType = src_app_DTO_enums_paymentMethodType__WEBPACK_IMPORTED_MODULE_2__.PaymentMethodType;
    this.toLocale = src_helpers_dateUtils_dateUtils__WEBPACK_IMPORTED_MODULE_8__.UTCToLocale;
  }
  getColorLine(sch) {
    if (sch.visitCount > 1) {
      return '#4FB229';
    }
    if (sch.visitCount === 1) {
      return '#0A6ED8';
    }
    return '#E24414';
  }
  getListRecords(id) {
    this.records$ = this._statistic.getListClients(id);
    // .subscribe(_=>{
    //   this.records = this._apiRecords.recordsUser$.value;
    //   this.records.forEach(item => {
    //     item.start = item.start ? toConstantTime(new Date(item.start)) : null;
    //     switch (item.recordStatus){
    //       case RecordStatus.Pending:{
    //         item.statusText = "Подтверждено";
    //         item.isCanCancel = true;
    //         break;
    //       }
    //       case RecordStatus.Confirm: {
    //         item.statusText = "В ожидании";
    //         item.isCanCancel = true;
    //         break;
    //       }
    //       case RecordStatus.Success: {
    //         item.statusText = "Выполнено";
    //         item.isCanCancel = false;
    //         break;
    //       }
    //       case RecordStatus.Created: {
    //         item.statusText = "Не подтверждено";
    //         item.isCanCancel = true;
    //         break;
    //       }
    //       case RecordStatus.Canceled: {
    //         item.statusText = "Отменено";
    //         item.isCanCancel = true;
    //         break;
    //       }
    //     }
    //   });
    // });
  }
  getStatus(item) {
    if (item.visitCount > 1) {
      return "Постоянный";
    }
    if (item.visitCount === 1) {
      return "Новый ";
    }
    return 'В чернoм списке';
  }
  ngOnInit() {
    var _this = this;
    return (0,D_Project_Front_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.id = '51643f0d-f417-42ae-bc6b-7551b65ec0fb';
      // this.id = this.route.snapshot.paramMap.get('id');
      _this.store$.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_12__.select)(src_app_ngrx_store_mainClient_store_select__WEBPACK_IMPORTED_MODULE_4__.selectProfileMainClient)).subscribe(result => {
        if (result?.id) {
          _this.getListRecords(result.id);
        }
      });
    })();
  }
  cancel(record) {
    if (this.id) {
      this._apiRecords.confirmRecord(this.id, {
        status: src_app_DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_3__.RecordStatus.Canceled,
        id: record.id
      }).subscribe(result => {
        // if (result.code === 200){
        //     record.status = RecordStatus.Canceled;
        //   record.isCanCancel = false;
        // }
      });
    }
  }
  getAvatar(avatar) {
    return (0,src_helpers_common_avatar1__WEBPACK_IMPORTED_MODULE_6__.resolveAvatarUrl)(avatar);
  }
  checkStatus(recordStatus) {
    return recordStatus === src_app_DTO_enums_recordStatus__WEBPACK_IMPORTED_MODULE_3__.RecordStatus.Success;
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
_PageClient1Component = PageClient1Component;
_PageClient1Component.ɵfac = function PageClient1Component_Factory(t) {
  return new (t || _PageClient1Component)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_services_record_service__WEBPACK_IMPORTED_MODULE_9__.RecordService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_12__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_services_statistic_service__WEBPACK_IMPORTED_MODULE_10__.StatisticService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__.DomSanitizer));
};
_PageClient1Component.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
  type: _PageClient1Component,
  selectors: [["app-PageClient1"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵProvidersFeature"]([src_services_record_service__WEBPACK_IMPORTED_MODULE_9__.RecordService, src_services_statistic_service__WEBPACK_IMPORTED_MODULE_10__.StatisticService])],
  decls: 2,
  vars: 3,
  consts: [["class", "cont-vert w100", "style", "margin-bottom: 20px;", 4, "ngIf"], [1, "cont-vert", "w100", 2, "margin-bottom", "20px"], [1, "cont-vert-center-start", "page1200"], [1, "margin-bottom50", "cont-horiz-between", "w100"], [1, "cont-horiz-start-start", "w100", "row", 2, "gap", "10px 10px", "margin-left", "20px", "margin-right", "20px"], [1, "col", 2, "margin-left", "20px", "margin-right", "20px", 3, "ngClass", "click"], ["class", "row border-2 w-100", "style", "max-width: 1200px;\n     margin-top: 20px;\n     border: 1px solid #9196A4;\n     border-radius: 12px;\n     padding: 20px 20px;", 4, "ngFor", "ngForOf"], [1, "row", "border-2", "w-100", 2, "max-width", "1200px", "margin-top", "20px", "border", "1px solid #9196A4", "border-radius", "12px", "padding", "20px 20px"], [1, ""], [1, "row"], [1, "col-2", "m-1", 2, "max-width", "60px"], ["alt", "", 1, "avatar-ba", 2, "max-width", "50px", 3, "src"], [1, "col-10", "row", 2, "flex", "0 0 auto", "width", "94%"], [1, "col-6", "cont-horiz-start"], [1, "col-6", "cont-horiz-end-start"], [2, "display", "flex", "padding-top", "20px"], [1, "col-6", 2, "min-width", "500px"], [1, "col-2"], [1, "col-6"], [2, "justify-content", "flex-end", "min-width", "300px", "display", "flex"]],
  template: function PageClient1Component_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, PageClient1Component_div_0_Template, 15, 5, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](1, 1, ctx.records$));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_15__.DatePipe],
  styles: [".page1200[_ngcontent-%COMP%]{\n    width: 100%;\n    max-width: 1200px;\n}\n\n.row[_ngcontent-%COMP%]{\n  overflow: hidden!important;\n}\n.head-notes[_ngcontent-%COMP%]{\n    margin-top: 30px;\n    margin-bottom: 50px;\n    margin-right: 20px;\n  }\n  @media screen and (max-width: 480px) {\n    .head-notes[_ngcontent-%COMP%]{\n      margin-top: 0px;\n      margin-bottom: 20px;\n      margin-right: 20px;\n    }\n  }\n  .color-note_ready[_ngcontent-%COMP%] {\n    color: #4FB229;\n  } \n  .color-note_no_confirm[_ngcontent-%COMP%] {\n    color: #FFAB00;\n  } \n  .color-note_wait[_ngcontent-%COMP%] {\n    color: #0A6ED8;\n  } \n  .color-note_cancel[_ngcontent-%COMP%]{\n    color: #E24414;\n  }\n  .around_1024-beetween_large[_ngcontent-%COMP%]{\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n  @media screen and (max-width: 1024px) {\n    .around_1024-beetween_large[_ngcontent-%COMP%]{\n        display: flex;\n        justify-content: space-around;\n        align-items: center;\n        gap: 30px 10px;\n    }\n  }\n  .stl-cancel[_ngcontent-%COMP%]{\n    color:#E24414 ; \n    border: 0px solid #E24414;\n    max-width: 240px;\n    display: flex;\n    align-items: center; \n  } \n  @media screen and (max-width: 768px) {\n    .stl-cancel[_ngcontent-%COMP%]{ \n      display: flex;\n      justify-content: center;\n      align-items: center; \n    }\n  }\n  .ua-my-notes[_ngcontent-%COMP%]{\n    border-bottom: 1px solid #DDE2ED ;\n    padding: 20px 0em;\n  }\n  .type-of-pay[_ngcontent-%COMP%]{ \n    min-width: calc(245px);\n  }\n  .stl-feedback[_ngcontent-%COMP%]{\n    max-width: 410px; \n    width: calc(50% - 20px);\n  }\n  @media screen and (max-width: 480px) {\n    .stl-feedback[_ngcontent-%COMP%]{ \n      width: 100%;\n    }\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhZ2VDbGllbnQxLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsaUJBQWlCO0FBQ3JCOztBQUVBO0VBQ0UsMEJBQTBCO0FBQzVCO0FBQ0E7SUFDSSxnQkFBZ0I7SUFDaEIsbUJBQW1CO0lBQ25CLGtCQUFrQjtFQUNwQjtFQUNBO0lBQ0U7TUFDRSxlQUFlO01BQ2YsbUJBQW1CO01BQ25CLGtCQUFrQjtJQUNwQjtFQUNGO0VBQ0E7SUFDRSxjQUFjO0VBQ2hCO0VBQ0E7SUFDRSxjQUFjO0VBQ2hCO0VBQ0E7SUFDRSxjQUFjO0VBQ2hCO0VBQ0E7SUFDRSxjQUFjO0VBQ2hCO0VBQ0E7SUFDRSxhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLG1CQUFtQjtFQUNyQjtFQUNBO0lBQ0U7UUFDSSxhQUFhO1FBQ2IsNkJBQTZCO1FBQzdCLG1CQUFtQjtRQUNuQixjQUFjO0lBQ2xCO0VBQ0Y7RUFDQTtJQUNFLGNBQWM7SUFDZCx5QkFBeUI7SUFDekIsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixtQkFBbUI7RUFDckI7RUFDQTtJQUNFO01BQ0UsYUFBYTtNQUNiLHVCQUF1QjtNQUN2QixtQkFBbUI7SUFDckI7RUFDRjtFQUNBO0lBQ0UsaUNBQWlDO0lBQ2pDLGlCQUFpQjtFQUNuQjtFQUNBO0lBQ0Usc0JBQXNCO0VBQ3hCO0VBQ0E7SUFDRSxnQkFBZ0I7SUFDaEIsdUJBQXVCO0VBQ3pCO0VBQ0E7SUFDRTtNQUNFLFdBQVc7SUFDYjtFQUNGIiwiZmlsZSI6IlBhZ2VDbGllbnQxLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGFnZTEyMDB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1heC13aWR0aDogMTIwMHB4O1xyXG59XHJcblxyXG4ucm93e1xyXG4gIG92ZXJmbG93OiBoaWRkZW4haW1wb3J0YW50O1xyXG59XHJcbi5oZWFkLW5vdGVze1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDUwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgfVxyXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgICAuaGVhZC1ub3Rlc3tcclxuICAgICAgbWFyZ2luLXRvcDogMHB4O1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5jb2xvci1ub3RlX3JlYWR5IHtcclxuICAgIGNvbG9yOiAjNEZCMjI5O1xyXG4gIH0gXHJcbiAgLmNvbG9yLW5vdGVfbm9fY29uZmlybSB7XHJcbiAgICBjb2xvcjogI0ZGQUIwMDtcclxuICB9IFxyXG4gIC5jb2xvci1ub3RlX3dhaXQge1xyXG4gICAgY29sb3I6ICMwQTZFRDg7XHJcbiAgfSBcclxuICAuY29sb3Itbm90ZV9jYW5jZWx7XHJcbiAgICBjb2xvcjogI0UyNDQxNDtcclxuICB9XHJcbiAgLmFyb3VuZF8xMDI0LWJlZXR3ZWVuX2xhcmdle1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEwMjRweCkge1xyXG4gICAgLmFyb3VuZF8xMDI0LWJlZXR3ZWVuX2xhcmdle1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBnYXA6IDMwcHggMTBweDtcclxuICAgIH1cclxuICB9XHJcbiAgLnN0bC1jYW5jZWx7XHJcbiAgICBjb2xvcjojRTI0NDE0IDsgXHJcbiAgICBib3JkZXI6IDBweCBzb2xpZCAjRTI0NDE0O1xyXG4gICAgbWF4LXdpZHRoOiAyNDBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyBcclxuICB9IFxyXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAuc3RsLWNhbmNlbHsgXHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyOyBcclxuICAgIH1cclxuICB9XHJcbiAgLnVhLW15LW5vdGVze1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNEREUyRUQgO1xyXG4gICAgcGFkZGluZzogMjBweCAwZW07XHJcbiAgfVxyXG4gIC50eXBlLW9mLXBheXsgXHJcbiAgICBtaW4td2lkdGg6IGNhbGMoMjQ1cHgpO1xyXG4gIH1cclxuICAuc3RsLWZlZWRiYWNre1xyXG4gICAgbWF4LXdpZHRoOiA0MTBweDsgXHJcbiAgICB3aWR0aDogY2FsYyg1MCUgLSAyMHB4KTtcclxuICB9XHJcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDgwcHgpIHtcclxuICAgIC5zdGwtZmVlZGJhY2t7IFxyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxuICB9Il19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbWFrcy9wYWdlQ2xpZW50MS9QYWdlQ2xpZW50MS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztJQUNYLGlCQUFpQjtBQUNyQjs7QUFFQTtFQUNFLDBCQUEwQjtBQUM1QjtBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixrQkFBa0I7RUFDcEI7RUFDQTtJQUNFO01BQ0UsZUFBZTtNQUNmLG1CQUFtQjtNQUNuQixrQkFBa0I7SUFDcEI7RUFDRjtFQUNBO0lBQ0UsY0FBYztFQUNoQjtFQUNBO0lBQ0UsY0FBYztFQUNoQjtFQUNBO0lBQ0UsY0FBYztFQUNoQjtFQUNBO0lBQ0UsY0FBYztFQUNoQjtFQUNBO0lBQ0UsYUFBYTtJQUNiLDhCQUE4QjtJQUM5QixtQkFBbUI7RUFDckI7RUFDQTtJQUNFO1FBQ0ksYUFBYTtRQUNiLDZCQUE2QjtRQUM3QixtQkFBbUI7UUFDbkIsY0FBYztJQUNsQjtFQUNGO0VBQ0E7SUFDRSxjQUFjO0lBQ2QseUJBQXlCO0lBQ3pCLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsbUJBQW1CO0VBQ3JCO0VBQ0E7SUFDRTtNQUNFLGFBQWE7TUFDYix1QkFBdUI7TUFDdkIsbUJBQW1CO0lBQ3JCO0VBQ0Y7RUFDQTtJQUNFLGlDQUFpQztJQUNqQyxpQkFBaUI7RUFDbkI7RUFDQTtJQUNFLHNCQUFzQjtFQUN4QjtFQUNBO0lBQ0UsZ0JBQWdCO0lBQ2hCLHVCQUF1QjtFQUN6QjtFQUNBO0lBQ0U7TUFDRSxXQUFXO0lBQ2I7RUFDRjtBQUNGLG9wR0FBb3BHIiwic291cmNlc0NvbnRlbnQiOlsiLnBhZ2UxMjAwe1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBtYXgtd2lkdGg6IDEyMDBweDtcclxufVxyXG5cclxuLnJvd3tcclxuICBvdmVyZmxvdzogaGlkZGVuIWltcG9ydGFudDtcclxufVxyXG4uaGVhZC1ub3Rlc3tcclxuICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gIH1cclxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA0ODBweCkge1xyXG4gICAgLmhlYWQtbm90ZXN7XHJcbiAgICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gICAgfVxyXG4gIH1cclxuICAuY29sb3Itbm90ZV9yZWFkeSB7XHJcbiAgICBjb2xvcjogIzRGQjIyOTtcclxuICB9IFxyXG4gIC5jb2xvci1ub3RlX25vX2NvbmZpcm0ge1xyXG4gICAgY29sb3I6ICNGRkFCMDA7XHJcbiAgfSBcclxuICAuY29sb3Itbm90ZV93YWl0IHtcclxuICAgIGNvbG9yOiAjMEE2RUQ4O1xyXG4gIH0gXHJcbiAgLmNvbG9yLW5vdGVfY2FuY2Vse1xyXG4gICAgY29sb3I6ICNFMjQ0MTQ7XHJcbiAgfVxyXG4gIC5hcm91bmRfMTAyNC1iZWV0d2Vlbl9sYXJnZXtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMDI0cHgpIHtcclxuICAgIC5hcm91bmRfMTAyNC1iZWV0d2Vlbl9sYXJnZXtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgZ2FwOiAzMHB4IDEwcHg7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5zdGwtY2FuY2Vse1xyXG4gICAgY29sb3I6I0UyNDQxNCA7IFxyXG4gICAgYm9yZGVyOiAwcHggc29saWQgI0UyNDQxNDtcclxuICAgIG1heC13aWR0aDogMjQwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgXHJcbiAgfSBcclxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgLnN0bC1jYW5jZWx7IFxyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgXHJcbiAgICB9XHJcbiAgfVxyXG4gIC51YS1teS1ub3Rlc3tcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRERFMkVEIDtcclxuICAgIHBhZGRpbmc6IDIwcHggMGVtO1xyXG4gIH1cclxuICAudHlwZS1vZi1wYXl7IFxyXG4gICAgbWluLXdpZHRoOiBjYWxjKDI0NXB4KTtcclxuICB9XHJcbiAgLnN0bC1mZWVkYmFja3tcclxuICAgIG1heC13aWR0aDogNDEwcHg7IFxyXG4gICAgd2lkdGg6IGNhbGMoNTAlIC0gMjBweCk7XHJcbiAgfVxyXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgICAuc3RsLWZlZWRiYWNreyBcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgfSJdLCJzb3VyY2VSb290IjoiIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_maks_clients_module_ts.js.map