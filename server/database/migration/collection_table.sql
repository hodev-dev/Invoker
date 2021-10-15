CREATE TABLE IF NOT EXISTS collections (
    id SERIAL,
    title VARCHAR(50) NOT NULL,
    country VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);