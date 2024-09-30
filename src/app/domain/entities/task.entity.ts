import { Tag } from "./tag.type";
import { UserEntity } from "./user.entity";

export type StatusTask = 'BACKLOG'| 'CANCELLED'|'DONE'|'IN_PROGRESS'|'TODO'


export interface TaskEntity {
    id?:            string;
    name:          string;
    createdAt?:     Date;
    pointEstimate: string;
    status:        StatusTask;
    dueDate:       Date;
    tags:          Tag[];
    position:      number;
    assignee:      UserEntity;
}


