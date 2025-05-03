export interface IChat {
    receiverId: string;
    nameReceiver: string;
    avatar: string;
    lastDateTimeMessage : Date|null;
    lastMessage: string|null;
}