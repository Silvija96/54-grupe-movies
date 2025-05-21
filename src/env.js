import dotenv from 'dotenv';

let envFile = '.env';

for (const str of process.argv.slice(2)) {
    if (str.startsWith('--env=')) {
        envFile = str.split('=')[1];
    }
}

dotenv.config({
    path: envFile,
});

export const PORT = process.env.PORT ?? 3000;