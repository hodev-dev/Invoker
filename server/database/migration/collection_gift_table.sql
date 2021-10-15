CREATE TABLE IF NOT EXISTS collection_gift(
    id SERIAL,
    collection_id SERIAL,
    gift_id SERIAL,
    PRIMARY KEY(id),
    FOREIGN KEY(collection_id) REFERENCES collections(id),
    FOREIGN KEY(gift_id) REFERENCES gifts(id)
);