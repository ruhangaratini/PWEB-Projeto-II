export class BookEntity {
    private id: number;
    public categoryID: number;
    public title: string;
    public author: string;

    constructor(id: number, categoryID: number, title: string, author: string) {
        this.id = id;
        this.categoryID = categoryID;
        this.title = title;
        this.author = author;
    }

    public get getID(): number {
        return this.id;
    }

}