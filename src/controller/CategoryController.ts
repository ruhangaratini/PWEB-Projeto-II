import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { ErrorCode } from "../model/ErrorCode";
import { BaseResponseDto } from "../model/dto/BaseResponseDto";
import { createCategoryService } from "../service/category/createCategoryService";
import { CreateCategoryDto } from "../model/dto/category/CreateCategory";
import { getCategoryByIDService } from "../service/category/getCategoryByIDService";
import { CategoryEntity } from "../model/entity/CategoryEntity";
import { BaseErrorResponseDto } from "../model/dto/BaseErrorResponseDto";
import { getCategoriesService } from "../service/category/getCategoriesService";
import { CategoryDto } from "../model/dto/category/CategoryDto";
import { updateCategoryService } from "../service/category/updateCategoryService";
import { deleteCategoryService } from "../service/category/deleteCategoryService";

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

        if (response instanceof ErrorCode)
            fail(400, new BaseErrorResponseDto(response.message));

        success(201, new BaseResponseDto('Categoria criada com sucesso!', <CategoryEntity>response));
    }

    @Get('{categoryID}')
    public async getCategoryByID(
        @Path() categoryID: string,
        @Res() notFound: TsoaResponse<404, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<CategoryEntity>>
    ): Promise<void> {
        const response = await getCategoryByIDService(categoryID);

        if (response instanceof ErrorCode)
            notFound(404, new BaseErrorResponseDto(response.message));

        success(200, new BaseResponseDto('Categoria encontrada!', <CategoryEntity>response));
    }

    @Get()
    public async getCategories(
        @Res() notFound: TsoaResponse<500, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<CategoryEntity[]>>
    ): Promise<void> {
        const response = await getCategoriesService();

        if (response instanceof ErrorCode)
            notFound(500, new BaseErrorResponseDto(response.message));

        success(200, new BaseResponseDto('Listando Categorias!', <CategoryEntity[]>response));
    }

    @Put()
    public async updateCategory(
        @Body() dto: CategoryDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<CategoryEntity>>
    ): Promise<void> {
        const response = await updateCategoryService(dto);

        if (response instanceof ErrorCode)
            fail(400, new BaseErrorResponseDto(response.message));

        success(200, new BaseResponseDto('Categoria atualizada com sucesso!', <CategoryEntity>response));
    }

    @Delete('{categoryID}')
    public async deleteCategory(
        @Path() categoryID: string,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<202, BaseResponseDto<string>>
    ): Promise<void> {
        const response = await deleteCategoryService(categoryID);

        if (response instanceof ErrorCode)
            fail(400, new BaseErrorResponseDto(response.message));

        success(202, new BaseResponseDto('Categoria deletada com sucesso!', <string>response));
    }
}