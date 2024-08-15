export class CreateUserDto {
    public personID: string;
    public password: string;

    constructor(personID: string, password: string) {
        this.personID = personID;
        this.password = password;
    }

}