export class CategoryDto {
    private id: string;
    public name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    public get getID(): string {
        return this.id;
    }

}