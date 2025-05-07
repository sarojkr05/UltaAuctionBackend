import { AppError } from "./appError.js";

export class NotFoundError extends AppError {
    constructor(resource) {
        super(`Not able to find ${resource}`, 404);
    }
}
