import { PersonEntity } from "./PersonEntity";

export class UserEntity extends PersonEntity {
    private userID: number;
    public password: string;

    constructor(id: number, password: string, personID: number, name: string, email: string) {
        super(personID, name, email);
        this.userID = id;
        this.password = password;
    }

    public get getUserID(): number {
        return this.userID;
    }

}

const a = new UserEntity(1, 'senha', 5, 'nome', 'email');