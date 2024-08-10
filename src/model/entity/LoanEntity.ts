export class LoanEntity {
    private id: number;
    private bookID: number;
    private userID: number;
    private loadDate: Date;
    public returnDate: Date;

    constructor(id: number, bookID: number, userID: number, loadDate: Date, returnDate: Date) {
        this.id = id;
        this.bookID = bookID;
        this.userID = userID;
        this.loadDate = loadDate;
        this.returnDate = returnDate;
    }

    public get getID(): number {
        return this.id;
    }

    public get getBookID(): number {
        return this.bookID;
    }

    public get getUserID(): number {
        return this.userID;
    }

    public get getLoadDate(): Date {
        return this.loadDate;
    }

}