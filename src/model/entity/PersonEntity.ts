export class PersonEntity {
    private id: number;
    public name: string;
    public email: string;

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public get getID(): number {
        return this.id;
    }

}