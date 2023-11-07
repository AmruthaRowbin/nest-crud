import { EntityManager } from 'typeorm';
import * as crypto from 'crypto';

export async function tokenGenerator(entityManager: EntityManager): Promise<any> {

    let  uniqueString;
    let result = [];
    do {
        uniqueString = generateRandomString(165);
        const qry = `SELECT id FROM user where token = '${uniqueString}'`;
        result = await entityManager.query(qry);
    } while (result.length > 0);
    return uniqueString;
}

function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, chars.length);
        result += chars.charAt(randomIndex);
    }
    return result;
}
