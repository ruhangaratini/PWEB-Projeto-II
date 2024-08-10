import { Body, Controller, Get, Post, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { CategoryDto } from "../model/dto/CategoryDto";
import { ErrorDto } from "../model/dto/ErrorDto";
import { ResponseDto } from "../model/dto/ResponseDto";
import { createCategory } from "../service/category/createCategory";

@Route('category')
@Tags('Category')
export class CategoryController extends Controller {
    @Post()
    public async registerCategory(
        @Body() dto: CategoryDto,
        @Res() fail: TsoaResponse<500, ResponseDto>,
        @Res() success: TsoaResponse<201, ResponseDto>
    ): Promise<void> {
        const response = await createCategory(dto);

        if (response instanceof ErrorDto) {
            fail(500, response.message);
        }

        success(201, new ResponseDto('Categoria criada com sucesso!', response));
    }

    // @Get()
    // public async getCategoryByID(
    //     @Query id: string,
    //     @Res() notFound: TsoaResponse<404, any>,
    // )
}