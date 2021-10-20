export class KanbanTask{
    id: number;
    description: string;
    status: string;

    constructor(_id: number, _description: string, _status: string){
        this.id = _id;
        this.description = _description;
        this.status = _status;
    }
}