export interface ISendMessage {
    text: string;
    dateCreate: string;
    receiverId: string;
    avatar: string|null;
    senderId: string;
    id: string;
    showAvatar: boolean;
}