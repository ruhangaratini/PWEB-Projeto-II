export class ResponseDto {
    public code: number;
    public message: any;

    constructor(code: number, message: any) {
        this.code = code;
        this.message = message;
    }
    
}