export class LoanEntity {
    private id: string;
    private bookID: string;
    private userID: string;
    private loadDate: Date;
    public returnDate: Date;

    constructor(id: string, bookID: string, userID: string, loadDate: Date, returnDate: Date) {
        this.id = id;
        this.bookID = bookID;
        this.userID = userID;
        this.loadDate = loadDate;
        this.returnDate = returnDate;
    }

    public get getID(): string {
        return this.id;
    }

    public get getBookID(): string {
        return this.bookID;
    }

    public get getUserID(): string {
        return this.userID;
    }

    public get getLoadDate(): Date {
        return this.loadDate;
    }

}