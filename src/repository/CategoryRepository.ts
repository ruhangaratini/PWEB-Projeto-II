import { ResultSetHeader } from "mysql2";
import { MySql } from "../database/mysql";
import { CategoryDto } from "../model/dto/CategoryDto";
import { ErrorDto } from "../model/dto/ErrorDto";
import { CategoryEntity } from "../model/entity/CategoryEntity";

export class CategoryRepository {
    private static instance: CategoryRepository;
    private db: MySql;

    private constructor() {
        this.db = MySql.getInstance();
        this.createTable();
    }

    public static getInstace(): CategoryRepository {
        if (!CategoryRepository.instance)
            CategoryRepository.instance = new CategoryRepository();

        return CategoryRepository.instance;
    }

    private async createTable() {
        const response = await this.db.query(
            `CREATE TABLE IF NOT EXISTS category (
            id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL
        )`);

        if (response instanceof Error) {
            console.log('Erro ao criar tabela: ', response.message);
        }
    }

    public async create(category: CategoryDto): Promise<CategoryEntity | ErrorDto> {
        const response = <ResultSetHeader>await this.db.query(`INSERT INTO category (name) VALUES (?)`, [category.name]);

        if (response instanceof Error)
            return new ErrorDto(500, 'Ocorreu um erro ao inserir nova categoria');

        return new CategoryEntity(response.insertId, category.name);
    }
}