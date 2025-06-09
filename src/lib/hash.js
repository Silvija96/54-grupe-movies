import crypto from 'crypto';

export function hash(text) {
    try {
        return crypto.createHash('sha512').update(text).digest('hex');
    } catch (error) {
        return '';
    }
}