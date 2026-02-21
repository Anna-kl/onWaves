export interface IAIState {
    isWait: boolean;
    operation: string;
    data: IAData|null;
    message?: string;
}

export interface IAData {
    date: string|null;
    service: string|null;
    serviceId: string|null;
    dayId: string|null;
    name: string|null;
    phone: string|null;
    slot: string|null;
}