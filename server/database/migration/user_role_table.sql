CREATE TABLE IF NOT EXISTS user_role(
    id SERIAL,
    user_id SERIAL,
    role_id SERIAL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);