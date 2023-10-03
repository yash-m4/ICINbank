export class CheckBookRequest {
    id?: number;
    userName?:string;
    userId?:number;
    acountType: String = '';
    description: String = '';
    status: number = 1;
    isApproved: boolean = false;
}