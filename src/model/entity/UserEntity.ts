export class UserEntity  {
    private id: string;
    public password: string;

    constructor(id: string, password: string) {
        this.id = id;
        this.password = password;
    }

    public get getID(): string {
        return this.id;
    }

}