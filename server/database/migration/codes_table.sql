CREATE TABLE IF NOT EXISTS codes (
    id SERIAL,
    code TEXT NOT NULL UNIQUE,
    gift_id BIGINT NOT NULL,
    PRIMARY KEY (id)
);