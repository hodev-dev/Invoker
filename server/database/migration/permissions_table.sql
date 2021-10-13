CREATE TABLE IF NOT EXISTS permissions(
    id SERIAL,
    permission_name VARCHAR(20) NOT NULL,
    label TEXT,
    PRIMARY KEY (id)
);