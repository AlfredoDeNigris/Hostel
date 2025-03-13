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

    //Extrae las claves de las variables de entorno (las partes antes del "=")
    return envFileContent
        .split('\n') // Divide el contenido en líneas
        .map(line => line.trim()) // Elimina espacios en blanco
        .filter(key => key && !key.startsWith('#')) // Filtra comentarios y líneas vacías
        .map(line => line.split('=')[0].trim()); //Extrae solo la clave de cada línea
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