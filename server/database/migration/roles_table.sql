CREATE TABLE IF NOT EXISTS roles(
    id SERIAL,
    role_name VARCHAR(20) NOT NULL,
    label TEXT,
    PRIMARY KEY (id)
);