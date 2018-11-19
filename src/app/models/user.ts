import { UserType } from './usertype';
import { Guid } from 'guid-typescript';
export class User {
    public id: Guid;
    public name: string;
    public avatar: any;
    public time: number;
    public userType: UserType;

    public constructor() {
        this.id = Guid.create();
    }
}
