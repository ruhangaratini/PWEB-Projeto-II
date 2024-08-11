export class BookEntity {
    private id: string;
    public categoryID: number;
    public title: string;
    public author: string;

    constructor(id: string, categoryID: number, title: string, author: string) {
        this.id = id;
        this.categoryID = categoryID;
        this.title = title;
        this.author = author;
    }

    public get getID(): string {
        return this.id;
    }

}