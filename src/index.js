import { validateEnvVars } from './config/envConfig.js';
import app from './app.js';
import db from './config/connectionConfig.js';

validateEnvVars();

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Successfully connected to the database");
        connection.release();

        const port = process.env.SERVER_PORT;

        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error starting the application:', err);
        process.exit(1);
    }
})();