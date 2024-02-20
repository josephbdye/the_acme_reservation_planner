const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acmedb');

const createTables = async()=> {
    const SQL = `
        DROP TABLE IF EXISTS reservations;
        DROP TABLE IF EXISTS customers;
        DROP TABLE IF EXISTS restaurants;
        CREATE TABLE customers(
            id UUID PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );
        CREATE TABLE restaurants(
            id UUID PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        );
        CREATE TABLE reservations(
            id UUID PRIMARY KEY,
            date DATE NOT NULL,
            party_count INTEGER DEFAULT 5 NOT NULL,
            restaurants_id UUID REFERENCES restaurants(id) NOT NULL,
            customers_id UUID REFERENCES customers(id) NOT NULL
        );
    `;
    await client.query(SQL);
};


module.exports = {
    client,
    createTables
};