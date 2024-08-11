import { Body, Controller, Get, Path, Post, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { ErrorCode } from "../model/ErrorCode";
import { ResponseDto } from "../model/dto/ResponseDto";
import { createCategory } from "../service/category/createCategory";
import { CreateCategoryDto } from "../model/dto/category/CreateCategory";
import { getCategoryByID } from "../service/category/getCategoryByID";

@Route('category')
@Tags('Category')
export class CategoryController extends Controller {

    @Post()
    public async registerCategory(
        @Body() dto: CreateCategoryDto,
        @Res() fail: TsoaResponse<400, ResponseDto>,
        @Res() success: TsoaResponse<201, ResponseDto>
    ): Promise<void> {
        const response = await createCategory(dto);

        if (response instanceof ErrorCode) {
            fail(400, new ResponseDto(response.message));
        }

        success(201, new ResponseDto('Categoria criada com sucesso!', response));
    }

    @Get('{categoryID}')
    public async getCategoryByID(
        @Path() categoryID: string,
        @Res() notFound: TsoaResponse<404, ResponseDto>,
        @Res() success: TsoaResponse<200, ResponseDto>
    ): Promise<void> {
        const response = await getCategoryByID(categoryID);

        if (response instanceof ErrorCode) {
            notFound(404, new ResponseDto(response.message));
        }

        success(200, new ResponseDto('Categoria encontrada com sucesso!', response));
    }
}