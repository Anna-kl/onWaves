export interface ICoupon {       
       
    id: string;
    phone: string;
    profileUserId: string;

    created: Date;
    options: string;
    isActive: boolean;
    balance: number;
}