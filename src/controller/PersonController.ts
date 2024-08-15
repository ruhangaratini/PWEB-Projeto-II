import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BaseErrorResponseDto } from "../model/dto/BaseErrorResponseDto";
import { BaseResponseDto } from "../model/dto/BaseResponseDto";
import { ErrorCode } from "../model/ErrorCode";
import { CreatePersonDto } from "../model/dto/person/CreatePersonDto";
import { PersonEntity } from "../model/entity/PersonEntity";
import { createPersonService } from "../service/person/CreatePersonService";
import { getPersonByIDService } from "../service/person/GetPersonByIDService";
import { getPersonsService } from "../service/person/GetPersonsService";
import { PersonDto } from "../model/dto/person/PersonDto";
import { updatePersonService } from "../service/person/UpdatePersonService";
import { deletePersonService } from "../service/person/DeletePersonService";

@Route('person')
@Tags('Person')
export class PersonController extends Controller {

    @Post()
    public async registerPerson(
        @Body() dto: CreatePersonDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<201, BaseResponseDto<PersonEntity>>
    ): Promise<void> {
        const response = await createPersonService(dto);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(201, new BaseResponseDto('Pessoa registrada com sucesso!', response));
    }

    @Get('{personID}')
    public async getPersonByID(
        @Path() personID: string,
        @Res() notFound: TsoaResponse<404, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<PersonEntity>>
    ): Promise<void> {
        const response = await getPersonByIDService(personID);

        if (response instanceof ErrorCode) {
            notFound(404, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Pessoa encontrada!', response));
    }

    @Get()
    public async getPersons(
        @Res() fail: TsoaResponse<500, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<PersonEntity[]>>
    ): Promise<void> {
        const response = await getPersonsService();

        if (response instanceof ErrorCode) {
            fail(500, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Listando Pessoas!', response));
    }

    @Put()
    public async updatePerson(
        @Body() dto: PersonDto,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<200, BaseResponseDto<PersonEntity>>
    ): Promise<void> {
        const response = await updatePersonService(dto);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(200, new BaseResponseDto('Pessoa atualizada com sucesso!', response));
    }

    @Delete('{personID}')
    public async deletePerson(
        @Path() personID: string,
        @Res() fail: TsoaResponse<400, BaseErrorResponseDto>,
        @Res() success: TsoaResponse<202, BaseResponseDto<string>>
    ): Promise<void> {
        const response = await deletePersonService(personID);

        if (response instanceof ErrorCode) {
            fail(400, new BaseErrorResponseDto(response.message));
            return;
        }

        success(202, new BaseResponseDto('Pessoa deletada com sucesso!', response));
    }
}