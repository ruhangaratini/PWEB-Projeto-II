import { ErrorCode } from "../../model/ErrorCode";
import { LoanRepository } from "../../repository/LoanRepository";

export async function deleteLoanService(loanID: string): Promise<string | ErrorCode> {
    const repository = LoanRepository.getInstance();

    return await repository.delete(loanID);
}