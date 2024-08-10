export class PersonEntity {
    private personID: number;
    public name: string;
    public email: string;

    constructor(id: number, name: string, email: string) {
        this.personID = id;
        this.name = name;
        this.email = email;
    }

    public get getPersonID(): number {
        return this.personID;
    }

}