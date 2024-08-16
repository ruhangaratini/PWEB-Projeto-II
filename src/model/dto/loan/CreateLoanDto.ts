export class CreateLoanDto {
    public readonly bookID: string;
    public readonly userID: string;
    public readonly loanDate: Date;
    public returnDate: Date;

    constructor(bookID: string, userID: string, loanDate: string, returnDate: string) {
        this.bookID = bookID;
        this.userID = userID;
        this.loanDate = new Date(loanDate);
        this.returnDate = new Date(returnDate);
    }

}