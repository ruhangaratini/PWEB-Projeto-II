export class ErrorCode {
    public code: number;
    public message: string;

    constructor(code: number, message: any) {
        this.code = code;
        this.message = message;
    }

}