import { AppError } from "./appError.js";

export class UnprocessableEntityError extends AppError {
    constructor(errors) {
        let message = "Request contains invalid data:\n";
        errors.forEach(error => message += `${error}\n`);
        super(message, 422);
    }
}