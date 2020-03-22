export interface Meeting {
    id?: number;
    title: string;
    description: string;
    creatorId: number;
    roomId: number;
    startDate: Date;
    endDate: Date;
    freeEntry: boolean;
    isCanceled: boolean;
}