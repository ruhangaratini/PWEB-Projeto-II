import { LoanDto } from "../../model/dto/loan/LoanDto";
import { LoanEntity } from "../../model/entity/LoanEntity";
import { ErrorCode } from "../../model/ErrorCode";
import { BookRepository } from "../../repository/BookRepository";
import { LoanRepository } from "../../repository/LoanRepository";
import { UserRepository } from "../../repository/UserRepository";

export async function updateLoanService(loan: LoanDto): Promise<LoanEntity | ErrorCode> {
    const repository = LoanRepository.getInstance();
    const bookRepository = BookRepository.getInstance();
    const userRepository = UserRepository.getInstance();

    const checkBook = await bookRepository.getByID(loan.bookID);
    if (checkBook instanceof ErrorCode)
        return new ErrorCode(400, `Livro inválido: ${loan.bookID}`);

    const checkUser = await userRepository.getByID(loan.userID);
    if (checkUser instanceof ErrorCode)
        return new ErrorCode(400, `Usuário inválido: ${loan.bookID}`);

    return await repository.update(loan);
}