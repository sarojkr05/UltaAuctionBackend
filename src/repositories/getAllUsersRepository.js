// Fetching all the users from the database
import { User } from '../schema/userSchema.js';

export async function getAllUsers() {
    try {
        const users = await User.find().select('-password -__v');
        // Exclude sensitive information like password and __v
        return users;
    } catch (error) {
        throw new Error('Error fetching all users');
    }
}