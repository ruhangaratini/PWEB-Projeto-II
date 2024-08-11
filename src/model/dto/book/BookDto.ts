export class BookDto {
    public readonly id: string;
    public categoryID: string;
    public title: string;
    public author: string;

    constructor(id: string, categoryID: string, title: string, author: string) {
        this.id = id;
        this.categoryID = categoryID;
        this.title = title;
        this.author = author;
    }

}