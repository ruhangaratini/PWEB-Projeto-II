import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { ErrorCode } from "../model/ErrorCode";
import { BaseResponseDto } from "../model/dto/BaseResponseDto";
import { createCategoryService } from "../service/category/CreateCategoryService";
import { CreateCategoryDto } from "../model/dto/category/CreateCategoryDto";
import { getCategoryByIDService } from "../service/category/GetCategoryByIDService";
import { CategoryEntity } from "../model/entity/CategoryEntity";
import { BaseErrorResponseDto } from "../model/dto/BaseErrorResponseDto";
import { getCategoriesService } from "../service/category/GetCategoriesService";
import { CategoryDto } from "../model/dto/category/CategoryDto";
import { updateCategoryService } from "../service/category/UpdateCategoryService";
import { deleteCategoryService } from "../service/category/DeleteCategoryService";

@Route('category')
@Tags('Category')
export class CategoryController extends Controller {

    @Post()
    public async registerCategory(
        @Body() dto: CreateCategoryDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<201, BaseResponseDto<CategoryEntity>>
    ): Promise<void> {
        const response = await createCategoryService(dto);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(201, new BaseResponseDto('Categoria registrada com sucesso!', response));
    }

    @Get('{categoryID}')
    public async getCategoryByID(
        @Path() categoryID: string,
        @Res() notFound: TsoaResponse<404, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<CategoryEntity>>
    ): Promise<void> {
        const response = await getCategoryByIDService(categoryID);

        if (response instanceof ErrorCode) {
            notFound(404, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Categoria encontrada!', response));
    }

    @Get()
    public async getCategories(
        @Res() fail: TsoaResponse<500, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<CategoryEntity[]>>
    ): Promise<void> {
        const response = await getCategoriesService();

        if (response instanceof ErrorCode) {
            fail(500, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Listando Categorias!', response));
    }

    @Put()
    public async updateCategory(
        @Body() dto: CategoryDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<CategoryEntity>>
    ): Promise<void> {
        const response = await updateCategoryService(dto);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Categoria atualizada com sucesso!', response));
    }

    @Delete('{categoryID}')
    public async deleteCategory(
        @Path() categoryID: string,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<202, BaseResponseDto<string>>
    ): Promise<void> {
        const response = await deleteCategoryService(categoryID);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(202, new BaseResponseDto('Categoria deletada com sucesso!', response));
    }
}