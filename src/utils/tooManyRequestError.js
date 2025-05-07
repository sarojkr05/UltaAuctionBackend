import { AppError } from "./appError.js";

export class TooManyRequestsError extends AppError {
    constructor() {
        super(`Too many requests. Please try again later.`, 429);
    }
}