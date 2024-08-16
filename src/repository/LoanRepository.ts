import { ResultSetHeader, RowDataPacket } from "mysql2";
import KSUID from "ksuid";

import { MySql } from "../database/mysql";
import { ErrorCode } from "../model/ErrorCode";
import { CreateLoanDto } from "../model/dto/loan/CreateLoanDto";
import { LoanEntity } from "../model/entity/LoanEntity";
import { LoanDto } from "../model/dto/loan/LoanDto";
import { formatIsoDateUtil } from "../util/FormatIsoDateUtil";

export class LoanRepository {
    private static instance: LoanRepository;
    private db: MySql;

    private constructor() {
        this.db = MySql.getInstance();
        this.createTable();
    }

    public static getInstance(): LoanRepository {
        if (!LoanRepository.instance)
            LoanRepository.instance = new LoanRepository();

        return LoanRepository.instance;
    }

    private async createTable() {
        const response = await this.db.query(
            `CREATE TABLE IF NOT EXISTS loan (
                id VARCHAR(27) NOT NULL PRIMARY KEY,
                bookID VARCHAR(27) NOT NULL,
                userID VARCHAR(27) NOT NULL,
                loanDate DATE NOT NULL,
                returnDate DATE NOT NULL,
                FOREIGN KEY (bookID) REFERENCES book(id),
                FOREIGN KEY (userID) REFERENCES user(id)
        )`);

        if (response instanceof Error) {
            console.log('Erro ao criar tabela: ', response.message);
        }
    }

    public async create(loan: CreateLoanDto): Promise<LoanEntity | ErrorCode> {
        const uuid: string = KSUID.randomSync().string;
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`INSERT INTO loan (id, bookID, userID, loanDate, returnDate) VALUES (?, ?, ?, ?, ?)`,
            [uuid, loan.bookID, loan.userID, formatIsoDateUtil(loan.loanDate), formatIsoDateUtil(loan.returnDate)]);

        if (response instanceof ErrorCode)
            return response;

        return new LoanEntity(uuid, loan.bookID, loan.userID, loan.loanDate, loan.returnDate);
    }

    public async getByID(id: string): Promise<LoanEntity | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM loan WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.length == 0)
            return new ErrorCode(404, 'Empréstimo não encontrado');

        return new LoanEntity(response[0].id, response[0].bookID, response[0].userID, response[0].loanDate, response[0].returnDate);
    }

    public async getAll(): Promise<any[] | ErrorCode> {
        const response = <RowDataPacket[] | ErrorCode>await this.db.query(`SELECT * FROM loan`);

        return response;
    }

    public async update(loan: LoanDto): Promise<LoanEntity | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`UPDATE loan SET bookID = ?, userID = ?, loanDate = ?, returnDate = ? WHERE id = ?`,
            [loan.bookID, loan.userID, formatIsoDateUtil(loan.loanDate), formatIsoDateUtil(loan.returnDate), loan.id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(404, 'Empréstimo não encontrado');

        return await this.getByID(loan.id);
    }

    public async delete(id: string): Promise<string | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`DELETE FROM loan WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(404, 'Empréstimo não encontrado');

        return id;
    }
}