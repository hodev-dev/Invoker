CREATE TABLE IF NOT EXISTS messages
(
    id         SERIAL,
    body       TEXT NOT NULL,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    PRIMARY KEY (id)
);