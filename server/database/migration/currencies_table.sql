CREATE TABLE IF NOT EXISTS currencies (
    id SERIAL,
    name VARCHAR(30) NOT NULL,
    value BIGINT NOT NULL,
    PRIMARY KEY (id)
);