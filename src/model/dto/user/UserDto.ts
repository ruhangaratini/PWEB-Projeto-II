export class UserDto {
    public readonly id: string;
    public personID: string;
    public password: string;

    constructor(id: string, personID: string, password: string) {
        this.id = id;
        this.personID = personID;
        this.password = password;
    }

}