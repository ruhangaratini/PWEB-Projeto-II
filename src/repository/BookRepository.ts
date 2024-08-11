import { ResultSetHeader } from "mysql2";
import { MySql } from "../database/mysql";
import { ErrorCode } from "../model/ErrorCode";
import { CategoryEntity } from "../model/entity/CategoryEntity";
import KSUID from "ksuid";
import { CreateCategoryDto } from "../model/dto/category/CreateCategory";
import { CategoryDto } from "../model/dto/category/CategoryDto";
import { CreateBookDto } from "../model/dto/book/CreateBookDto";
import { BookEntity } from "../model/entity/BookEntity";
import { BookDto } from "../model/dto/book/BookDto";

export class BookRepository {
    private static instance: BookRepository;
    private db: MySql;

    private constructor() {
        this.db = MySql.getInstance();
        this.createTable();
    }

    public static getInstance(): BookRepository {
        if (!BookRepository.instance)
            BookRepository.instance = new BookRepository();

        return BookRepository.instance;
    }

    private async createTable() {
        const response = await this.db.query(
            `CREATE TABLE IF NOT EXISTS book (
                id VARCHAR(27) NOT NULL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                categoryID VARCHAR(27) NOT NULL,
                FOREIGN KEY (categoryID) REFERENCES category(id)
        )`);

        if (response instanceof Error) {
            console.log('Erro ao criar tabela: ', response.message);
        }
    }

    public async create(book: CreateBookDto): Promise<BookEntity | ErrorCode> {
        const uuid: string = KSUID.randomSync().string;
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`INSERT INTO book (id, title, author, categoryID) VALUES (?, ?, ?, ?)`, 
            [uuid, book.title, book.author, book.categoryID]);

        if (response instanceof ErrorCode)
            return response;

        return new BookEntity(uuid, book.categoryID, book.title, book.author);
    }

    public async getByID(id: string): Promise<BookEntity | ErrorCode> {
        const response = <BookEntity[] | ErrorCode>await this.db.query(`SELECT * FROM book WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.length == 0)
            return new ErrorCode(404, 'Livro não encontrado');

        return response[0];
    }

    public async getAll(): Promise<BookEntity[] | ErrorCode> {
        const response = <BookEntity[] | ErrorCode>await this.db.query(`SELECT * FROM book`);

        return response;
    }

    public async getByCategory(categoryID: string): Promise<BookEntity[] | ErrorCode> {
        const response = <BookEntity[] | ErrorCode>await this.db.query(`SELECT * FROM book WHERE categoryID = ?`, [categoryID]);

        return response;
    }

    public async update(book: BookDto): Promise<BookEntity | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`UPDATE book SET title = ?, author = ?, categoryID = ? WHERE id = ?`, 
            [book.title, book.author, book.categoryID, book.id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(400, 'Livro não encontrado');

        const bookEntity = <BookEntity[] | ErrorCode>await this.db.query(`SELECT * FROM book WHERE id = ?`, [book.id]);

        if (bookEntity instanceof ErrorCode)
            return bookEntity;

        return bookEntity[0];
    }

    public async delete(id: string): Promise<string | ErrorCode> {
        const response = <ResultSetHeader | ErrorCode>await this.db.query(`DELETE FROM book WHERE id = ?`, [id]);

        if (response instanceof ErrorCode)
            return response;

        if (response.affectedRows == 0)
            return new ErrorCode(400, 'Livro não encontrado');

        return id;
    }
}