import { ClientStatus } from "../../enums/clientStatus";

export interface IViewClient {
    id: string|null;
    name: string;
    avatar: string|null;
    visitCount: number;
    lastVisit: Date;
    statusClient: ClientStatus;
}