// src/database.js
const mysql = require('mysql2/promise'); // Promise-based MySQL library

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost' || 'host.docker.internal',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    connectionLimit: 10,
};

// Define the database name
const dbName = process.env.DB_NAME || 'contact_app_db';

// Create a connection pool (without selecting database yet)
const pool = mysql.createPool(dbConfig);

async function setupDatabase() {
    try {
        const connection = await pool.getConnection();

        // ✅ Step 1: Create database if not exists
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log(`✅ Database "${dbName}" is ready.`);

        // ✅ Step 2: Use this database
        await connection.query(`USE \`${dbName}\``);
        console.log(`🗂  Using database "${dbName}"`);

        // ✅ Step 3: Create table with additional fields
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                phone VARCHAR(20),
                email VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await connection.query(createTableQuery);
        console.log('📇 Table "contacts" is ready.');

        connection.release();
    } catch (err) {
        console.error('❌ Error during database setup:', err.message);
    }
}

// Run setup immediately
setupDatabase();

// Export a pool that uses the created database
const dbWithDatabase = mysql.createPool({
    ...dbConfig,
    database: dbName,
    waitForConnections: true,
});

module.exports = dbWithDatabase;
