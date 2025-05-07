import { AppError } from "./appError.js";

export class ConflictError extends AppError {
    constructor(resource) {
        super(`${resource} already exists and cannot be duplicated`, 409);
    }
}