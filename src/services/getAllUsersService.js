import { getAllUsers } from "../repositories/getAllUsersRepository.js";

export async function getAllUsersService() {
    try {
        const users = await getAllUsers();
        return users;
    } catch (error) {
        throw new Error('Error fetching all users');
    }
}