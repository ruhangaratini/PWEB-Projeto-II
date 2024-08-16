export class LoanDto {
    public readonly id: string;
    public readonly bookID: string;
    public readonly userID: string;
    public readonly loanDate: Date;
    public returnDate: Date;

    constructor(id: string, bookID: string, userID: string, loanDate: string, returnDate: string) {
        this.id = id;
        this.bookID = bookID;
        this.userID = userID;
        this.loanDate = new Date(loanDate);
        this.returnDate = new Date(returnDate);
    }

}