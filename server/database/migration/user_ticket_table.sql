CREATE TABLE IF NOT EXISTS user_ticket
(
    id        SERIAL,
    user_id   SERIAL,
    ticket_id SERIAL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (ticket_id) REFERENCES user_ticket (id)
);