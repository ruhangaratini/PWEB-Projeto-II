export class CategoryEntity {
    private id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public get getID(): number {
        return this.id;
    }

}