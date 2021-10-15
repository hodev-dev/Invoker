CREATE TABLE IF NOT EXISTS gifts(
    id SERIAL,
    type VARCHAR(20),
    label VARCHAR(40),
    price INTEGER,
    PRIMARY KEY(id)
);