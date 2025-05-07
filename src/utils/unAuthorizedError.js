import { AppError } from "./appError.js";

export class UnAuthorisedError extends AppError {
    constructor() {
        super(`User is not authroised properly`, 401);
    }
}