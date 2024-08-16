import { ErrorCode } from "../../model/ErrorCode";
import { LoanRepository } from "../../repository/LoanRepository";

export async function getLoansService(): Promise<any[] | ErrorCode> {
    const repository = LoanRepository.getInstance();

    return await repository.getAll();
}