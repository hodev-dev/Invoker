CREATE TABLE IF NOT EXISTS tickets
(
    id         SERIAL,
    title      VARCHAR NOT NULL,
    status     INT     NOT NULL,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    PRIMARY KEY (id)
);