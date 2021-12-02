CREATE TABLE IF NOT EXISTS users
(
    id        SERIAL,
    phone     VARCHAR(30) NOT NULL UNIQUE,
    password  VARCHAR(80) NOT NULL,
    confirmed BOOLEAN     NOT NULL DEFAULT (TRUE),
    PRIMARY KEY (id)
);