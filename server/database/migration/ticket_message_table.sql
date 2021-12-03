CREATE TABLE IF NOT EXISTS user_ticket
(
    id        SERIAL,
    ticket_id   SERIAL,
    message_id SERIAL,
    PRIMARY KEY (id),
    FOREIGN KEY (ticket_id) REFERENCES tickets (id),
    FOREIGN KEY (message_id) REFERENCES messages (id)
);