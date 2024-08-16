import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BaseErrorResponseDto } from "../model/dto/BaseErrorResponseDto";
import { BaseResponseDto } from "../model/dto/BaseResponseDto";
import { ErrorCode } from "../model/ErrorCode";
import { CreateLoanDto } from "../model/dto/loan/CreateLoanDto";
import { LoanEntity } from "../model/entity/LoanEntity";
import { createLoanService } from "../service/loan/CreateLoanService";
import { getLoanByIDService } from "../service/loan/GetLoanByIDService";
import { LoanDto } from "../model/dto/loan/LoanDto";
import { deleteLoanService } from "../service/loan/DeleteLoanService";
import { getLoansService } from "../service/loan/GetLoansService";
import { updateLoanService } from "../service/loan/UpdateLoanService";

@Route('loan')
@Tags('Loan')
export class LoanController extends Controller {

    @Post()
    public async registerLoan(
        @Body() dto: CreateLoanDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<201, BaseResponseDto<LoanEntity>>
    ): Promise<void> {
        const response = await createLoanService(dto);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(201, new BaseResponseDto('Empréstimo registrado com sucesso!', response));
    }

    @Get('{loanID}')
    public async getLoanByID(
        @Path() loanID: string,
        @Res() notFound: TsoaResponse<404, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<LoanEntity>>
    ): Promise<void> {
        const response = await getLoanByIDService(loanID);

        if (response instanceof ErrorCode) {
            notFound(404, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Empréstimo encontrado!', response));
    }

    @Get()
    public async getLoans(
        @Res() fail: TsoaResponse<500, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<LoanEntity[]>>
    ): Promise<void> {
        const response = await getLoansService();

        if (response instanceof ErrorCode) {
            fail(500, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Listando Empréstimos!', response));
    }

    @Put()
    public async updateLoan(
        @Body() dto: LoanDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<LoanEntity>>
    ): Promise<void> {
        const response = await updateLoanService(dto);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Empréstimo atualizado com sucesso!', response));
    }

    @Delete('{loanID}')
    public async deleteLoan(
        @Path() loanID: string,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<202, BaseResponseDto<string>>
    ): Promise<void> {
        const response = await deleteLoanService(loanID);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(202, new BaseResponseDto('Empréstimo deletado com sucesso!', response));
    }
}