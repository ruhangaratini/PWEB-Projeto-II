export class UserEntity  {
    private id: number;
    public password: string;

    constructor(id: number, password: string) {
        this.id = id;
        this.password = password;
    }

    public get getID(): number {
        return this.id;
    }

}