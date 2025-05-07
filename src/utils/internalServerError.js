import { AppError } from "./appError.js";

export class InternalServerError extends AppError {
    constructor() {
        super(`It's not you it's our server where something went wrong`, 500);
    }
}