export class CreateBookDto {
    public categoryID: string;
    public title: string;
    public author: string;

    constructor(categoryID: string, title: string, author: string) {
        this.categoryID = categoryID;
        this.title = title;
        this.author = author;
    }

}