export class PersonEntity {
    public readonly id: string;
    public name: string;
    public email: string;

    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

}