export class LoanEntity {
    public readonly id: string;
    public readonly bookID: string;
    public readonly userID: string;
    public readonly loanDate: Date;
    public returnDate: Date;

    constructor(id: string, bookID: string, userID: string, loanDate: Date, returnDate: Date) {
        this.id = id;
        this.bookID = bookID;
        this.userID = userID;
        this.loanDate = loanDate;
        this.returnDate = returnDate;
    }

}