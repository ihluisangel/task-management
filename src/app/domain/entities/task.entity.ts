export interface TaskEntity {
    id?:            string;
    name:          string;
    createdAt?:     Date;
    pointEstimate: string;
    status:        string;
    dueDate:       Date;
    tags:          string[];
    position:      number;
    assignee:      AssigneeEntity;
}

export interface AssigneeEntity {
    avatar:   string;
    id:       string;
    fullName: string;
}
