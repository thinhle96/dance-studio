import {createCipheriv, scrypt} from 'crypto';
import {promisify} from 'util';
import * as bcrypt from 'bcrypt';

const iv = '0000000000000000';
const password = 'rKQEhvvmuvpJdqCa';
const saltOrRounds = 10;

export const encrypt = async (textToEncrypt: string) => {
// The key length is dependent on the algorithm.
// In this case for aes256, it is 32 bytes.
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    return Buffer.concat([
        cipher.update(textToEncrypt),
        cipher.final(),
    ])
};

// const decrypt = async (text: string) => {
//     const decipher = createDecipheriv('aes-256-ctr', password, iv);
//     const decryptedText = Buffer.concat([
//         decipher.update(text),
//         decipher.final(),
//     ]);
// }

export function hash(text: string): Promise<string> {
    return bcrypt.hash(text, saltOrRounds);
}