import { AppError } from "./appError.js";

export class ForbiddenError extends AppError {
    constructor() {
        super(`You do not have permission to access this resource`, 403);
    }
}