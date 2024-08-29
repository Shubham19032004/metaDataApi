CREATE TABLE MetaData (
    product VARCHAR(60) NOT NULL,
    title VARCHAR(60) NOT NULL,
    category VARCHAR(40) NOT NULL,
    geography VARCHAR(80) NOT NULL,
    frequency VARCHAR(40) NOT NULL,
    timePeriod VARCHAR(40) NOT NULL,
    dataSource VARCHAR(300) NOT NULL,
    description VARCHAR(800) NOT NULL,
    lastUpdateDate DATE NOT NULL,
    futureRelease VARCHAR(40) NOT NULL,
    basePeriod VARCHAR(60) NOT NULL,
    keystatistics VARCHAR(300) NOT NULL,
    NMDS VARCHAR(300) NOT NULL,
    nmdslink VARCHAR(300) NOT NULL,
    remarks VARCHAR(200) NOT NULL,
    UNIQUE (product),
    PRIMARY KEY (product)
);
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100),
    title VARCHAR(100) NOT NULL,
    UNIQUE (email)
);

INSERT INTO Users(email, password, title) VALUES('shubham@gmail.com', '$2a$12$0RGhGnlNzDiYeUvnZHX9LOuKCIINCVJetTtuPKQxIUOhiS.CN6TNK', 'DEV');

INSERT INTO Users(email, password, title) VALUES('rahul@gmail.com', '$2a$12$0RGhGnlNzDiYeUvnZHX9LOuKCIINCVJetTtuPKQxIUOhiS.CN6TNK', 'CPI');
INSERT INTO Users(email, password, title) VALUES('rohit@gmail.com', '$2a$12$0RGhGnlNzDiYeUvnZHX9LOuKCIINCVJetTtuPKQxIUOhiS.CN6TNK', 'IIP');
