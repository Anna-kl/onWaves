"use strict";
(self["webpackChunkMainSiteOcpio"] = self["webpackChunkMainSiteOcpio"] || []).push([["src_app_pages_chat-main_chat_module_ts"],{

/***/ 16495:
/*!********************************************************!*\
  !*** ./src/app/pages/chat-main/chat-main.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatMainComponent: () => (/* binding */ ChatMainComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 12235);
/* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/message.service */ 93080);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngrx/store */ 36270);
/* harmony import */ var src_app_ngrx_store_mainClient_store_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/ngrx-store/mainClient/store.select */ 20334);
/* harmony import */ var src_helpers_dateUtils_dateUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/helpers/dateUtils/dateUtils */ 15899);
/* harmony import */ var src_helpers_common_avatar1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/helpers/common/avatar1 */ 86824);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 61699);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser */ 36480);
/* harmony import */ var src_services_profile_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/services/profile.service */ 13178);
/* harmony import */ var _services_app_signalr_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/app-signalr.service */ 57306);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 28849);
var _ChatMainComponent;















function ChatMainComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 32)(1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "img", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 35)(4, "div", 36)(5, "h3", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r0.getAvatar(ctx_r0.newChat, false), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r0.newChat.nameReceiver);
  }
}
function ChatMainComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ChatMainComponent_div_19_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r6);
      const chat_r3 = restoredCtx.$implicit;
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r5.loadMessages(chat_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "img", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 35)(4, "div", 41)(5, "h3", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](9, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 42)(11, "p", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const chat_r3 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngClass", chat_r3.receiverId === ctx_r1.receiverId ? "border-active" : "border-noactive");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r1.getAvatar(chat_r3, true), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](chat_r3.nameReceiver);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind3"](9, 5, ctx_r1.toLocaleTime(chat_r3.lastDateTimeMessage), "HH:MM", "ru-RU"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.getTextFromMessage(chat_r3), "");
  }
}
function ChatMainComponent_div_23_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 51)(1, "p", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const message_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](3, 1, message_r7.dateCreate, "fullDate"), "");
  }
}
function ChatMainComponent_div_23_img_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "img", 53);
  }
  if (rf & 2) {
    const message_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r9.getAvatarMessage(message_r7), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
  }
}
function ChatMainComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, ChatMainComponent_div_23_div_1_Template, 4, 4, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 46)(4, "div", 47)(5, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, ChatMainComponent_div_23_img_6_Template, 1, 1, "img", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 50)(8, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const message_r7 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.checkShowDate(message_r7, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](2, 6, message_r7.dateCreate, "fullDate")));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", message_r7.showAvatar);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleProp"]("background", message_r7.receiverId === ctx_r2.profile.id ? "#E1F5DE" : "white");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](message_r7.text);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind3"](12, 9, ctx_r2.toLocaleTime(message_r7.dateCreate), "HH:MM", "ru-RU"));
  }
}
class ChatMainComponent {
  getHeigthWindow(flag) {
    if (this.messages.length === 0) {
      return flag ? '200px' : '100px';
    } else {
      if (this.messages.length > 3) {
        return flag ? '800px' : '650px;';
      }
    }
    return flag ? `600px!important` : `450px!important`;
  }
  checkShowDate(message, date) {
    if (date) {
      let temp = this.showMessageDate.find(_ => _.date === date);
      if (temp) {
        if (temp.id === message.id) {
          return true;
        } else {
          return false;
        }
      } else {
        this.showMessageDate.push({
          id: message.id,
          date: date
        });
      }
    }
    return false;
  }
  getTextFromMessage(chat) {
    if (chat.lastMessage) {
      if (chat.lastMessage.length > 40) {
        return `${chat.lastMessage.substring(0, 40)}...`;
      } else {
        return chat.lastMessage;
      }
    }
    return '';
  }
  getAvatarMessage(message) {
    return (0,src_helpers_common_avatar1__WEBPACK_IMPORTED_MODULE_3__.resolveAvatarUrl)(message.avatar);
  }
  loadMessages(message) {
    this.unsubscribe$ = this._apiChat.getMessages(this.profile?.id, message.receiverId).subscribe(result => {
      this.messages = result;
      this.receiverId = message.receiverId;
    });
  }
  sendMessage() {
    if (this.profile && this.receiverId && this.textMessage) {
      this.unsubscribe$ = this._apiChat.sendMessage(this.profile.id, this.textMessage, this.receiverId).subscribe(result => {
        if (result.code === 201) {
          this.textMessage = null;
          this.messages.push(result.data);
          this.signalRService.sendMessage(JSON.stringify(result.data));
        }
      });
    }
  }
  constructor(sanitizer, _apiProfile, _apiChat, store$, signalRService, _activate) {
    this.sanitizer = sanitizer;
    this._apiProfile = _apiProfile;
    this._apiChat = _apiChat;
    this.store$ = store$;
    this.signalRService = signalRService;
    this._activate = _activate;
    this.showMessageDate = [];
    this.messages$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable();
    this.isNewChat = true;
    this.profile = null;
    this.textMessage = null;
    this.chats$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable();
    this.newChat = null;
    this.messages = [];
    this.btnProfile = true;
    this.receiverId = null;
    // chats: IChat[] = [];
    this.unsubscribe$ = null;
    this.toLocaleTime = src_helpers_dateUtils_dateUtils__WEBPACK_IMPORTED_MODULE_2__.toLocaleTime;
  }
  ngOnDestroy() {
    this.unsubscribe$?.unsubscribe();
  }
  ngOnInit() {
    this.signalRService.startConnection().subscribe(() => {
      // this.signalRService.receiveMessage().subscribe((message: ISendMessage) => {
      //   this.receivedMessage = message;
      //   if (message.receiverId === this.profile?.id){
      //     if (this.messages.length > 0){
      //       if (this.messages
      //         .find(_ => _.receiverId === message.receiverId)){
      //           this.messages.push(message);
      //         }
      //     }
      //   }
      // });
    });
    this.unsubscribe$ = this.store$.pipe((0,_ngrx_store__WEBPACK_IMPORTED_MODULE_8__.select)(src_app_ngrx_store_mainClient_store_select__WEBPACK_IMPORTED_MODULE_1__.selectProfileMainClient)).subscribe(result => {
      if (result) {
        this.profile = result;
        this.chats$ = this._apiChat.getChats(this.profile?.id);
      }
    });
    this.receiverId = this._activate.snapshot.queryParamMap.get('receiverId');
    if (this.receiverId) {
      // if (this.chats$)
      // this.chats$.subscribe(result => {
      //   console.log(result);
      // });
      // this.chats$.pipe(find(x => x.find(_ => _.receiverId === this.receiverId) !== undefined)).subscribe(res =>
      //  {
      //      console.log(res);
      // });
      // if (a === undefined){
      this.unsubscribe$ = this._apiProfile.getBusinessProfileById(this.receiverId).subscribe(result => {
        let profile = result.data;
        this.newChat = {
          nameReceiver: profile.name,
          avatar: profile.avatar,
          receiverId: profile.id,
          lastDateTimeMessage: null
        };
      });
    }
  }
  getAvatar(chat, flag) {
    if (chat === null) {
      return '/assets/img/onwaves/user.png';
    }
    if (chat.receiverId === this.receiverId && flag) {
      this.isNewChat = false;
    }
    return (0,src_helpers_common_avatar1__WEBPACK_IMPORTED_MODULE_3__.resolveAvatarUrl)(chat.avatar);
  }
}
_ChatMainComponent = ChatMainComponent;
_ChatMainComponent.ɵfac = function ChatMainComponent_Factory(t) {
  return new (t || _ChatMainComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_9__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_services_profile_service__WEBPACK_IMPORTED_MODULE_4__.ProfileService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_message_service__WEBPACK_IMPORTED_MODULE_0__.ChatService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_8__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_app_signalr_service__WEBPACK_IMPORTED_MODULE_5__.AppSignalRService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute));
};
_ChatMainComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _ChatMainComponent,
  selectors: [["app-ChatMain"]],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵProvidersFeature"]([_services_message_service__WEBPACK_IMPORTED_MODULE_0__.ChatService])],
  decls: 33,
  vars: 6,
  consts: [[1, "row", 2, "margin-left", "5%", "margin-right", "10px", "justify-content", "center", "margin-top", "20px"], [1, "col-6", 2, "max-width", "450px", "margin-bottom", "20px", "min-width", "350px"], [1, "cont-horiz", "padding-bottom20", "row"], [1, "col-2"], ["width", "50", "height", "50", "viewBox", "0 0 50 50", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["width", "50", "height", "50", "fill", "#E5E5E5"], ["width", "640", "height", "1855", "transform", "translate(-15 -144)", "fill", "#FAFAFC"], ["width", "300", "height", "537", "transform", "translate(0 -60)", "fill", "white"], ["width", "50", "height", "50", "rx", "25", "fill", "#67C4B2"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M18.5692 16.6C18.4142 16.6 18.2655 16.6616 18.1559 16.7712C18.0462 16.8809 17.9846 17.0296 17.9846 17.1846V29.6462C17.9846 29.7321 17.9708 29.8176 17.9436 29.8991L17.0198 32.6704L21.1444 31.6393C21.2079 31.6234 21.2731 31.6154 21.3385 31.6154H32.4154C32.5704 31.6154 32.7192 31.5538 32.8288 31.4442C32.9384 31.3345 33 31.1858 33 31.0308V24.1077C33 23.6659 33.3582 23.3077 33.8 23.3077C34.2418 23.3077 34.6 23.6659 34.6 24.1077V31.0308C34.6 31.6102 34.3699 32.1658 33.9602 32.5755C33.5505 32.9852 32.9948 33.2154 32.4154 33.2154H21.437L15.994 34.5761C15.7108 34.6469 15.4114 34.5578 15.213 34.3436C15.0146 34.1293 14.9487 33.824 15.0411 33.547L16.3846 29.5163V17.1846C16.3846 16.6052 16.6148 16.0496 17.0245 15.6399C17.4342 15.2302 17.9899 15 18.5692 15H25.4923C25.9342 15 26.2923 15.3582 26.2923 15.8C26.2923 16.2418 25.9342 16.6 25.4923 16.6H18.5692Z", "fill", "white"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M30.7584 16.7812C30.6812 16.7812 30.6048 16.7965 30.5336 16.8262C30.4623 16.8558 30.3977 16.8993 30.3433 16.9541L30.3398 16.9577L23.9736 23.297L23.507 26.1335L26.2983 25.6311L32.6423 19.2601L32.6458 19.2566C32.7006 19.2023 32.7441 19.1376 32.7738 19.0664C32.8035 18.9951 32.8187 18.9187 32.8187 18.8415C32.8187 18.7644 32.8035 18.6879 32.7738 18.6167C32.7441 18.5455 32.7006 18.4808 32.6458 18.4264L32.6435 18.4241L31.1758 16.9564L31.1735 16.9541C31.1191 16.8993 31.0545 16.8558 30.9832 16.8262C30.912 16.7965 30.8356 16.7812 30.7584 16.7812ZM29.9183 15.3492C30.1845 15.2383 30.47 15.1812 30.7584 15.1812C31.0468 15.1812 31.3323 15.2383 31.5986 15.3492C31.8642 15.4599 32.1054 15.6219 32.3082 15.8261C32.3086 15.8265 32.309 15.827 32.3095 15.8274L33.7725 17.2904C33.773 17.2909 33.7734 17.2913 33.7739 17.2918C33.978 17.4946 34.1401 17.7357 34.2507 18.0014C34.3616 18.2676 34.4187 18.5531 34.4187 18.8415C34.4187 19.1299 34.3616 19.4155 34.2507 19.6817C34.1402 19.9471 33.9783 20.188 33.7745 20.3907L27.2545 26.9383C27.139 27.0544 26.9906 27.1322 26.8294 27.1612L22.6755 27.9089C22.4197 27.9549 22.1575 27.8738 21.9724 27.6915C21.7872 27.5091 21.7022 27.2481 21.7444 26.9917L22.4367 22.7825C22.464 22.6168 22.5426 22.4639 22.6616 22.3454L29.2093 15.8254C29.412 15.6216 29.6529 15.4598 29.9183 15.3492Z", "fill", "white"], [1, "col-10"], [1, "search-line", 2, "flex", "1", "min-width", "220px"], [1, "cont-horiz-between", "search-line-in"], ["type", "text", "size", "11", "placeholder", "\u0427\u0442\u043E \u0432\u044B \u0438\u0449\u0435\u0442\u0435?", 2, "border", "0px"], [1, "round30", "ico-background-green"], ["width", "24", "height", "24", "fill", "none"], ["fill-rule", "evenodd", "d", "M4.6 10.723a6.123 6.123 0 1 1 12.246 0 6.123 6.123 0 0 1-12.246 0ZM10.723 3a7.723 7.723 0 1 0 4.866 13.72l4.009 4.01a.8.8 0 0 0 1.131-1.132l-4.008-4.009A7.723 7.723 0 0 0 10.723 3Z", "clip-rule", "evenodd", 1, "svg-ico1"], ["class", "row border", 4, "ngIf"], ["class", "row", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "col", "card", "container", 2, "max-width", "795px", "min-width", "350px", "max-height", "850px"], [1, "container-fluid", 2, "overflow-y", "auto", "max-height", "650px", "height", "100vh"], ["style", "margin-top:10px", 4, "ngFor", "ngForOf"], [1, "row", 2, "height", "90px", "width", "100%", "margin-left", "0!important", "border", "0px, 0px, 1px, 0px", "padding", "20px", "margin-top", "60px", "bottom", "0", "position", "absolute", "gap", "16px", "background-color", "$green-basic"], [1, "search-line", "col-10", 2, "max-width", "620px"], [1, "search-line-in", "col-11", 2, "padding-top", "10px!important", "padding-left", "0"], ["type", "text", "size", "11", "placeholder", "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435", 2, "border", "0px", 3, "ngModel", "ngModelChange"], [1, "col-1", 2, "padding", "0!important", "margin", "0!important", 3, "click"], ["width", "60", "height", "60", "viewBox", "0 0 50 50", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 2, "padding-bottom", "6px"], ["cx", "25", "cy", "25", "r", "25", "fill", "#409B89"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M31.8271 16.1245C33.2828 15.5646 34.7132 16.995 34.1533 18.4507L28.5098 33.1239C27.9367 34.6138 25.8517 34.6758 25.1911 33.2226L22.6486 27.6292L17.0552 25.0867C15.602 24.4262 15.664 22.3411 17.1539 21.768L31.8271 16.1245ZM32.6599 17.8763C32.7222 17.7146 32.5632 17.5557 32.4015 17.6179L17.7283 23.2614C17.5627 23.3251 17.5559 23.5567 17.7173 23.6301L23.5838 26.2967C23.7599 26.3768 23.901 26.5179 23.9811 26.694L26.6477 32.5605C26.7211 32.722 26.9527 32.7151 27.0164 32.5495L32.6599 17.8763Z", "fill", "white"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M28.2031 22.0748C28.5155 22.3872 28.5155 22.8938 28.2031 23.2062L23.8185 27.5908C23.506 27.9032 22.9995 27.9032 22.6871 27.5908C22.3747 27.2784 22.3747 26.7719 22.6871 26.4594L27.0717 22.0748C27.3841 21.7624 27.8907 21.7624 28.2031 22.0748Z", "fill", "white"], [1, "row", "border"], [1, "col-3", 2, "padding", "2px"], [1, "avatar-ba", 2, "width", "50px!important", 3, "src"], [1, "col-8", 2, "padding", "0", "margin-top", "15px"], [1, "row", 2, "width", "Fill (199px)px", "height", "Hug (21px)px", "gap", "10px", "opacity", "0px"], [1, "col-8", 2, "padding", "0", "font-size", "16px", "font-weight", "700", "line-height", "20.8px", "text-align", "left"], [1, "row", 2, "margin-top", "15px", "width", "Fill (199px)px", "height", "Hug (21px)px", "gap", "10px", "opacity", "0px"], [1, "row", 3, "ngClass", "click"], [1, "avatar-ba", 2, "width", "80px!important", 3, "src"], [1, "row", 2, "width", "100%", "margin-left", "2%", "gap", "10px", "opacity", "0px"], [1, "row", 2, "margin-top", "15px", "width", "100%", "margin-left", "2%", "gap", "10px", "opacity", "0px"], [1, "col-8", 2, "font-size", "14px", "font-weight", "400", "line-height", "18.2px", "text-align", "left"], [2, "margin-top", "10px"], ["class", "row justify-content-center", 4, "ngIf"], [1, "row"], [1, "col-2", 2, "margin-left", "10px"], [2, "justify-content", "flex-end", "display", "flex"], ["class", "avatar-ba", "style", "width: 50px;", "alt", "", 3, "src", 4, "ngIf"], [1, "col-10", "card", "justify-content-start", 2, "width", "400px", "border-radius", "12px", "padding", "20px", "gap", "10px"], [1, "row", "justify-content-center"], [2, "display", "flex", "justify-content", "center", "font-family", "Montserrat", "font-size", "16px", "font-weight", "400", "line-height", "20.8px", "text-align", "center", "color", "#9196A4"], ["alt", "", 1, "avatar-ba", 2, "width", "50px", 3, "src"]],
  template: function ChatMainComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "svg", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "rect", 5)(6, "rect", 6)(7, "rect", 7)(8, "rect", 8)(9, "path", 9)(10, "path", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div", 11)(12, "div", 12)(13, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](14, "input", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "svg", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](17, "path", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, ChatMainComponent_div_18_Template, 9, 2, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, ChatMainComponent_div_19_Template, 13, 9, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](20, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceHTML"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "div", 20)(22, "div", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](23, ChatMainComponent_div_23_Template, 13, 13, "div", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "div", 23)(25, "div", 24)(26, "div", 25)(27, "input", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function ChatMainComponent_Template_input_ngModelChange_27_listener($event) {
        return ctx.textMessage = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ChatMainComponent_Template_div_click_28_listener() {
        return ctx.sendMessage();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "svg", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](30, "circle", 29)(31, "path", 30)(32, "path", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](18);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isNewChat && ctx.newChat);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](20, 4, ctx.chats$));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.messages);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.textMessage);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_11__.DatePipe],
  styles: ["[_nghost-%COMP%]     {\n    .p-toast-message-custom {\n        background-color: #E1CFE7;\n        border: solid #8A427A;\n        border-width: 0 0 0 6px;\n        color: #2c1e30;\n        .p-toast-icon-close {\n            color: #2c1e30;\n        }\n    }\n}\n.btn-recommend3[_ngcontent-%COMP%] {\n    width: 50%;\n    padding: 10px 0px;\n    border-radius: 100px;\n    cursor: pointer;\n}\n\n.btn-recommend3[_ngcontent-%COMP%]{\n\tbackground-color: #FFFFFF;\n\tcolor:  #23262F;\n\tbox-shadow: 2px 2px 10px 2px #23262F14;\n\tmargin-right: -30px;\n\tz-index: 2;\n\tfont-style: normal;\n\tfont-weight: normal;\n\tline-height: 130%;\n}\n\n.disp1[_ngcontent-%COMP%] {\n    max-width: 95%!important;\n    width: 100%;\n}\n.chat-cont[_ngcontent-%COMP%]{\n    min-width: 220px; padding-left: 25px;  white-space: nowrap; padding-right: 35px;\n}\n\n.border-active[_ngcontent-%COMP%] {\n   border: 2px solid #006174;\n}\n\n\n.border-noactive[_ngcontent-%COMP%] {\n    border: 2px solid #DDE2ED;\n }\n.round-number[_ngcontent-%COMP%], .count_bell_main_menu[_ngcontent-%COMP%]{\n    background: #00DAB3;\n  }\n  .round-number[_ngcontent-%COMP%] {\n    font-size: 10px;\n    font-weight: 600;\n    color: #11142D; \n    border-radius: 100px;\n    text-align:center;  \n\n    padding-top:1px;\n    cursor: pointer;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQtbWFpbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUNJO1FBQ0kseUJBQXlCO1FBQ3pCLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsY0FBYztRQUNkO1lBQ0ksY0FBYztRQUNsQjtJQUNKO0FBQ0o7QUFDQTtJQUNJLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLGVBQWU7QUFDbkI7O0FBRUE7Q0FDQyx5QkFBeUI7Q0FDekIsZUFBZTtDQUNmLHNDQUFzQztDQUN0QyxtQkFBbUI7Q0FDbkIsVUFBVTtDQUNWLGtCQUFrQjtDQUNsQixtQkFBbUI7Q0FDbkIsaUJBQWlCO0FBQ2xCOztBQUVBO0lBQ0ksd0JBQXdCO0lBQ3hCLFdBQVc7QUFDZjtBQUNBO0lBQ0ksZ0JBQWdCLEVBQUUsa0JBQWtCLEdBQUcsbUJBQW1CLEVBQUUsbUJBQW1CO0FBQ25GOztBQUVBO0dBQ0cseUJBQXlCO0FBQzVCOzs7QUFHQTtJQUNJLHlCQUF5QjtDQUM1QjtBQUNEO0lBQ0ksbUJBQW1CO0VBQ3JCO0VBQ0E7SUFDRSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxvQkFBb0I7SUFDcEIsaUJBQWlCOztJQUVqQixlQUFlO0lBQ2YsZUFBZTtFQUNqQiIsImZpbGUiOiJjaGF0LW1haW4uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG46aG9zdCA6Om5nLWRlZXAge1xyXG4gICAgLnAtdG9hc3QtbWVzc2FnZS1jdXN0b20ge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNFMUNGRTc7XHJcbiAgICAgICAgYm9yZGVyOiBzb2xpZCAjOEE0MjdBO1xyXG4gICAgICAgIGJvcmRlci13aWR0aDogMCAwIDAgNnB4O1xyXG4gICAgICAgIGNvbG9yOiAjMmMxZTMwO1xyXG4gICAgICAgIC5wLXRvYXN0LWljb24tY2xvc2Uge1xyXG4gICAgICAgICAgICBjb2xvcjogIzJjMWUzMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLmJ0bi1yZWNvbW1lbmQzIHtcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uYnRuLXJlY29tbWVuZDN7XHJcblx0YmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcclxuXHRjb2xvcjogICMyMzI2MkY7XHJcblx0Ym94LXNoYWRvdzogMnB4IDJweCAxMHB4IDJweCAjMjMyNjJGMTQ7XHJcblx0bWFyZ2luLXJpZ2h0OiAtMzBweDtcclxuXHR6LWluZGV4OiAyO1xyXG5cdGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuXHRmb250LXdlaWdodDogbm9ybWFsO1xyXG5cdGxpbmUtaGVpZ2h0OiAxMzAlO1xyXG59XHJcblxyXG4uZGlzcDEge1xyXG4gICAgbWF4LXdpZHRoOiA5NSUhaW1wb3J0YW50O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuLmNoYXQtY29udHtcclxuICAgIG1pbi13aWR0aDogMjIwcHg7IHBhZGRpbmctbGVmdDogMjVweDsgIHdoaXRlLXNwYWNlOiBub3dyYXA7IHBhZGRpbmctcmlnaHQ6IDM1cHg7XHJcbn1cclxuXHJcbi5ib3JkZXItYWN0aXZlIHtcclxuICAgYm9yZGVyOiAycHggc29saWQgIzAwNjE3NDtcclxufVxyXG5cclxuXHJcbi5ib3JkZXItbm9hY3RpdmUge1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgI0RERTJFRDtcclxuIH1cclxuLnJvdW5kLW51bWJlciwgLmNvdW50X2JlbGxfbWFpbl9tZW51e1xyXG4gICAgYmFja2dyb3VuZDogIzAwREFCMztcclxuICB9XHJcbiAgLnJvdW5kLW51bWJlciB7XHJcbiAgICBmb250LXNpemU6IDEwcHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY29sb3I6ICMxMTE0MkQ7IFxyXG4gICAgYm9yZGVyLXJhZGl1czogMTAwcHg7XHJcbiAgICB0ZXh0LWFsaWduOmNlbnRlcjsgIFxyXG5cclxuICAgIHBhZGRpbmctdG9wOjFweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9Il19 */\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvY2hhdC1tYWluL2NoYXQtbWFpbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUNJO1FBQ0kseUJBQXlCO1FBQ3pCLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsY0FBYztRQUNkO1lBQ0ksY0FBYztRQUNsQjtJQUNKO0FBQ0o7QUFDQTtJQUNJLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLGVBQWU7QUFDbkI7O0FBRUE7Q0FDQyx5QkFBeUI7Q0FDekIsZUFBZTtDQUNmLHNDQUFzQztDQUN0QyxtQkFBbUI7Q0FDbkIsVUFBVTtDQUNWLGtCQUFrQjtDQUNsQixtQkFBbUI7Q0FDbkIsaUJBQWlCO0FBQ2xCOztBQUVBO0lBQ0ksd0JBQXdCO0lBQ3hCLFdBQVc7QUFDZjtBQUNBO0lBQ0ksZ0JBQWdCLEVBQUUsa0JBQWtCLEdBQUcsbUJBQW1CLEVBQUUsbUJBQW1CO0FBQ25GOztBQUVBO0dBQ0cseUJBQXlCO0FBQzVCOzs7QUFHQTtJQUNJLHlCQUF5QjtDQUM1QjtBQUNEO0lBQ0ksbUJBQW1CO0VBQ3JCO0VBQ0E7SUFDRSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxvQkFBb0I7SUFDcEIsaUJBQWlCOztJQUVqQixlQUFlO0lBQ2YsZUFBZTtFQUNqQjtBQUNGLGdoRkFBZ2hGIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbjpob3N0IDo6bmctZGVlcCB7XHJcbiAgICAucC10b2FzdC1tZXNzYWdlLWN1c3RvbSB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0UxQ0ZFNztcclxuICAgICAgICBib3JkZXI6IHNvbGlkICM4QTQyN0E7XHJcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAwIDAgMCA2cHg7XHJcbiAgICAgICAgY29sb3I6ICMyYzFlMzA7XHJcbiAgICAgICAgLnAtdG9hc3QtaWNvbi1jbG9zZSB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjMmMxZTMwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4uYnRuLXJlY29tbWVuZDMge1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIHBhZGRpbmc6IDEwcHggMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTAwcHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5idG4tcmVjb21tZW5kM3tcclxuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xyXG5cdGNvbG9yOiAgIzIzMjYyRjtcclxuXHRib3gtc2hhZG93OiAycHggMnB4IDEwcHggMnB4ICMyMzI2MkYxNDtcclxuXHRtYXJnaW4tcmlnaHQ6IC0zMHB4O1xyXG5cdHotaW5kZXg6IDI7XHJcblx0Zm9udC1zdHlsZTogbm9ybWFsO1xyXG5cdGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcblx0bGluZS1oZWlnaHQ6IDEzMCU7XHJcbn1cclxuXHJcbi5kaXNwMSB7XHJcbiAgICBtYXgtd2lkdGg6IDk1JSFpbXBvcnRhbnQ7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG4uY2hhdC1jb250e1xyXG4gICAgbWluLXdpZHRoOiAyMjBweDsgcGFkZGluZy1sZWZ0OiAyNXB4OyAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgcGFkZGluZy1yaWdodDogMzVweDtcclxufVxyXG5cclxuLmJvcmRlci1hY3RpdmUge1xyXG4gICBib3JkZXI6IDJweCBzb2xpZCAjMDA2MTc0O1xyXG59XHJcblxyXG5cclxuLmJvcmRlci1ub2FjdGl2ZSB7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjRERFMkVEO1xyXG4gfVxyXG4ucm91bmQtbnVtYmVyLCAuY291bnRfYmVsbF9tYWluX21lbnV7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMDBEQUIzO1xyXG4gIH1cclxuICAucm91bmQtbnVtYmVyIHtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogIzExMTQyRDsgXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMDBweDtcclxuICAgIHRleHQtYWxpZ246Y2VudGVyOyAgXHJcblxyXG4gICAgcGFkZGluZy10b3A6MXB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH0iXSwic291cmNlUm9vdCI6IiJ9 */"]
});

/***/ }),

/***/ 41138:
/*!************************************************!*\
  !*** ./src/app/pages/chat-main/chat.module.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatModule: () => (/* binding */ ChatModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 26575);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 28849);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 27947);
/* harmony import */ var _chat_main_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat-main.component */ 16495);
/* harmony import */ var _common_common_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/common.module */ 87677);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
var _ChatModule;







/**
 * Ленивый чанк `/chat-page`. Вместе с компонентом из главного бандла уезжает
 * `@microsoft/signalr` (~48 КБ минифицированного), который нужен только здесь.
 */
class ChatModule {}
_ChatModule = ChatModule;
_ChatModule.ɵfac = function ChatModule_Factory(t) {
  return new (t || _ChatModule)();
};
_ChatModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _ChatModule
});
_ChatModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _common_common_module__WEBPACK_IMPORTED_MODULE_1__.CommonComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild([{
    path: '',
    component: _chat_main_component__WEBPACK_IMPORTED_MODULE_0__.ChatMainComponent
  }])]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ChatModule, {
    declarations: [_chat_main_component__WEBPACK_IMPORTED_MODULE_0__.ChatMainComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _common_common_module__WEBPACK_IMPORTED_MODULE_1__.CommonComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 57306:
/*!*****************************************************************!*\
  !*** ./src/app/pages/chat-main/services/app-signalr.service.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppSignalRService: () => (/* binding */ AppSignalRService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 58071);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 12235);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
var _AppSignalRService;
// import * as signalR from '@microsoft/signalr';


class AppSignalRService {
  constructor() {
    // this.hubConnection = new signalR.HubConnectionBuilder()
    //   .withUrl('/chat') // SignalR hub URL
    //   .build();
    // this.hubConnection = new signalR.HubConnectionBuilder()
    // .configureLogging(signalR.LogLevel.Debug)
    // .withUrl("https://ocpio-client.ru/chat", {
    //   skipNegotiation: true,
    //   transport: signalR.HttpTransportType.WebSockets
    // })
    // .build();
    // private hubConnection: signalR.HubConnection;
    this.message$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
  }
  startConnection() {
    return new rxjs__WEBPACK_IMPORTED_MODULE_1__.Observable(observer => {
      // this.hubConnection
      //   .start()
      //   .then(() => {
      //     console.log('Connection established with SignalR hub');
      //     observer.next();
      //     observer.complete();
      //   })
      //   .catch((error: any) => {
      //     console.error('Error connecting to SignalR hub:', error);
      //     observer.error(error);
      //   });
    });
  }
  receiveMessage() {
    // return new Observable<ISendMessage>((observer) => {
    //   this.hubConnection.on('ReceiveMessage', (message: string) => {
    //     let mes = JSON.parse(message) as ISendMessage;
    //     observer.next(mes);
    //     // this.message$.next(mes);
    //   });
    // });
  }
  sendMessage(message) {
    // this.hubConnection.invoke('SendMessage', message);
  }
}
_AppSignalRService = AppSignalRService;
_AppSignalRService.ɵfac = function AppSignalRService_Factory(t) {
  return new (t || _AppSignalRService)();
};
_AppSignalRService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _AppSignalRService,
  factory: _AppSignalRService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 93080:
/*!*************************************************************!*\
  !*** ./src/app/pages/chat-main/services/message.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChatService: () => (/* binding */ ChatService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 54860);
/* harmony import */ var src_enviroments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/enviroments/environment */ 21420);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 61699);
var _ChatService;




class ChatService {
  constructor(http) {
    this.http = http;
    this.url = src_enviroments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.Uri + 'chats/';
  }
  sendMessage(id, message, receiverId) {
    let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders();
    return this.http.post(`${this.url}send-message/${id}`, {
      text: message,
      receiverId: receiverId
    }, {
      headers
    });
  }
  getChats(id) {
    return this.http.get(`${this.url}get-chats/${id}`);
  }
  getMessages(id, receiverId) {
    return this.http.get(`${this.url}load-message/${id}?receiverId=${receiverId}`);
  }
}
_ChatService = ChatService;
_ChatService.ɵfac = function ChatService_Factory(t) {
  return new (t || _ChatService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
};
_ChatService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _ChatService,
  factory: _ChatService.ɵfac
});

/***/ })

}]);
//# sourceMappingURL=src_app_pages_chat-main_chat_module_ts.js.map