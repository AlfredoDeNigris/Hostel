import { jest } from '@jest/globals';
import fs from 'fs';
import * as envConfig from '../../config/envConfig.js';

describe('envConfig.js', () => {
    beforeAll(() => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        jest.spyOn(fs, 'readFileSync').mockReturnValue(`
            MYSQL_HOST=localhost
            MYSQL_USER=root
            MYSQL_PASSWORD=1234
            MYSQL_DATABASE=testdb
            MYSQL_PORT=3306
            JWT_SECRET=mysecret
            JWT_EXPIRES=7d
            SERVER_PORT=8080
        `);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('getEnvVarsFromFile should return all environment variables', () => {
        const envVars = envConfig.getEnvVarsFromFile();
        expect(envVars).toEqual([
            'MYSQL_HOST',
            'MYSQL_USER',
            'MYSQL_PASSWORD',
            'MYSQL_DATABASE',
            'MYSQL_PORT',
            'JWT_SECRET',
            'JWT_EXPIRES',
            'SERVER_PORT'
        ]);
    });

    test('getEnvVarsFromFile should throw an error if the .env file does not exist', () => {
        const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { });

        jest.spyOn(fs, 'existsSync').mockReturnValue(false);

        envConfig.getEnvVarsFromFile();

        expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    test('validateEnvVars should detect missing variables', () => {
        process.env = {
            MYSQL_HOST: 'localhost',
            MYSQL_PASSWORD: '1234',
            MYSQL_DATABASE: 'testdb',
            MYSQL_PORT: '3306',
            JWT_SECRET: 'mysecret',
        };

        const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { });

        envConfig.validateEnvVars();

        expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    test('validateEnvVars should pass if all variables are defined', () => {
        process.env = {
            MYSQL_HOST: 'localhost',
            MYSQL_USER: 'root',
            MYSQL_PASSWORD: '1234',
            MYSQL_DATABASE: 'testdb',
            MYSQL_PORT: '3306',
            JWT_SECRET: 'mysecret',
            JWT_EXPIRES: '7d',
            SERVER_PORT: '8080'
        };

        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        envConfig.validateEnvVars();

        expect(consoleLogSpy).toHaveBeenCalledWith('All required environment variables are properly set.');
    });
});