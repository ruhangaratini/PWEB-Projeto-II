import { LoanEntity } from "../../model/entity/LoanEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { LoanRepository } from "../../repository/LoanRepository";

export async function getLoanByIDService(loanID: string): Promise<LoanEntity | ErrorCode> {
    const repository = LoanRepository.getInstance();

    return await repository.getByID(loanID);
}