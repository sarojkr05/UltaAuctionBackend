import { User } from "../schema/userSchema.js";
import { BadRequestError } from '../utils/badRequestError.js'
import { InternalServerError } from '../utils/internalServerError.js'

export async function findUser(filter) {
  try {
    const response = await User.findOne(filter);
    return response;
  } catch (error) {
    console.log("Error in findUser:", error);
    throw new InternalServerError();
  }
}


export async function createUser(userDetails) {
    try {
        const response = await User.create(userDetails);
        return response;
    } catch(error) {
        if(error.name === 'ValidationError') {

            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            });
            console.log(errorMessageList)
            throw new BadRequestError(errorMessageList);
        } 
        console.log("Error in crreatin user", error);
        throw new InternalServerError();
    }  
}