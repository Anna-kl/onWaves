import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IChat } from './views/IChat';
import { ProfileService } from 'src/services/profile.service';
import { Observable, Subscription, filter, find, from, map, merge, takeUntil } from 'rxjs';
import { IViewBusinessProfile } from 'src/app/DTO/views/business/IViewBussinessProfile';
import { ChatService } from './services/message.service';
import { AppSignalRService } from './services/app-signalr.service';
import { Store, select } from '@ngrx/store';
import { selectProfileMainClient } from 'src/app/ngrx-store/mainClient/store.select';
import { toLocaleTime } from 'src/helpers/dateUtils/dateUtils';
import { IMessage } from './views/IMessage';
import { ISendMessage } from './views/ISendMessage';


interface IShowDate {
  date: string;
  id: string;
}

@Component({
  selector: 'app-ChatMain',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.css'],
  providers: [ChatService]
})
export class ChatMainComponent implements OnInit, OnDestroy {

  getHeigthWindow(flag: boolean) {
    if (this.messages.length === 0){
      return flag ?'200px':'100px';
    } else {
      if (this.messages.length > 3){
        return flag ?'800px':'650px;';
      }
    }
    return flag ?`600px!important`:`450px!important`;
  }
  showMessageDate: IShowDate[] = [];

  checkShowDate(message: ISendMessage, date: string|null): boolean {
    if (date){
      let temp = this.showMessageDate.find(_ => _.date === date);
      if (temp){
        if (temp.id === message.id){
          return true;
        } else {
          return false;
        }
      } else {
        this.showMessageDate.push({id: message.id, date: date});
      }
    }
    return false;
  }

  getTextFromMessage(chat: IChat): string {
    if (chat.lastMessage){
      if (chat.lastMessage.length > 40){
        return `${chat.lastMessage.substring(0,40)}...`;
      }
      else {
        return chat.lastMessage;
      }
    }
    return '';
  }

  getAvatarMessage(message: ISendMessage) {
    if (message.avatar) {
      return  this.sanitizer
      .bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${message.avatar}`);
    } else {
      return  '/assets/img/AvatarBig.png';
    }
  }

  messages$: Observable<ISendMessage[]> = new Observable();
  isNewChat: boolean = true;


  loadMessages(message: IChat) {
    this.unsubscribe$ = this._apiChat.getMessages(this.profile?.id!, message.receiverId)
    .subscribe(result => {
      this.messages = result;
      this.receiverId = message.receiverId;
    });
  }
  receivedMessage: any;
  profile: IViewBusinessProfile|null = null;
  textMessage: string|null = null;
  chats$: Observable<IChat[]> = new Observable();
  newChat: IChat|null = null;
  messages: ISendMessage[] = [];
  
  sendMessage(): void {
    if (this.profile && this.receiverId && this.textMessage){
      this.unsubscribe$ = this._apiChat.sendMessage(this.profile.id!, this.textMessage, this.receiverId)
      .subscribe(result => {
        if (result.code === 201){
          this.textMessage = null;
          this.messages.push(result.data);
          this.signalRService.sendMessage(JSON.stringify(result.data));
        }
      });
    }
  }

  btnProfile = true;
  receiverId: string | null = null;
  // chats: IChat[] = [];
  private unsubscribe$: Subscription|null = null;

  constructor(private sanitizer: DomSanitizer,
    private _apiProfile: ProfileService,
    private _apiChat: ChatService,
    private store$: Store,
    private signalRService: AppSignalRService,
    private _activate: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
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
    this.unsubscribe$ = this.store$.pipe(select(selectProfileMainClient)).subscribe(
      result => {
        if (result){
          this.profile = result;        
          this.chats$ = this._apiChat.getChats(this.profile?.id!);  
        }
      }
  );
    this.receiverId = this._activate.snapshot.queryParamMap.get('receiverId');
    if (this.receiverId){
      // if (this.chats$)
      // this.chats$.subscribe(result => {
      //   console.log(result);
      // });
      // this.chats$.pipe(find(x => x.find(_ => _.receiverId === this.receiverId) !== undefined)).subscribe(res =>
      //  {
      //      console.log(res);
      // });
      // if (a === undefined){
        this.unsubscribe$ = this._apiProfile.getBusinessProfileById(this.receiverId)
        .subscribe(result => {
          let profile = result.data as IViewBusinessProfile;
          this.newChat = {
            nameReceiver: profile.name,
            avatar: profile.avatar,
            receiverId: profile.id,
            lastDateTimeMessage: null,
          } as IChat;      
        });
      }
    }
   
  protected readonly toLocaleTime = toLocaleTime;

  getAvatar(chat: IChat|null, flag: boolean) {
    if (chat === null){
      return  '/assets/img/AvatarBig.png';
    }
    if (chat.receiverId === this.receiverId && flag){
      this.isNewChat = false;
    }
   
    if (chat.avatar) {
      return  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${chat.avatar}`);
    } else {
      return  '/assets/img/AvatarBig.png';
    }
  }

}
