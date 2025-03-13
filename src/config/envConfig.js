import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

/**
@returns {string[]}
 */
export const getEnvVarsFromFile = () => {
    const envFilePath = path.resolve(process.cwd(), '.env');

    if (!fs.existsSync(envFilePath)) {
        console.error('Error: ".env" file not found.');
        process.exit(1);
    }

    const envFileContent = fs.readFileSync(envFilePath, 'utf-8');

    //Extract the keys of the environment variables (the parts before the '=')
    return envFileContent
        .split('\n') //Split the content into lines
        .map(line => line.trim()) //Remove whitespace
        .filter(key => key && !key.startsWith('#')) //Filter out comments and empty lines
        .map(line => line.split('=')[0].trim()); //Extract only the key from each line
};

export const validateEnvVars = () => {
    const requiredEnvVars = getEnvVarsFromFile();
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingEnvVars.length > 0) {
        console.error(`Missing environment variables:\n• ${missingEnvVars.join('\n• ')}`);
        process.exit(1);
    }

    console.log('All required environment variables are properly set.');
};