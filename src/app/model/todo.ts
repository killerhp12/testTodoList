export interface toDo {
    id:number;
    title:string;
    description:string;
    dueDate: Date;
    priority:string;
}

export class toDoModel{
    id:number;
    title:string;
    description:string;
    dueDate: Date;
    priority:string;
}

export const dataList:Array<toDo> = [
    {
      id: 1,
      title: 'Angular',
      description: 'Học lập trình angular',
      dueDate: new Date('2020/10/15'),
      priority: 'low',
    },
    {
      id:2,
      title: 'NodeJs',
      description: 'Học lập trình NodeJs',
      dueDate: new Date('2020/10/5'),
      priority: 'normal',
    },
    {
      id:3,
      title: 'PHP',
      description: 'Học lập trình PHP',
      dueDate: new Date('2020/10/10'),
      priority: 'high',
    },
    {
      id:4,
      title: 'Laravel',
      description: 'Học framework Laravel',
      dueDate: new Date('2020/10/8'),
      priority: 'high',
    },
    {
      id:5,
      title: 'Ng-Zorro',
      description: 'Học framework Ng-Zorro',
      dueDate: new Date('2020/10/20'),
      priority: 'high',
    },
  ];