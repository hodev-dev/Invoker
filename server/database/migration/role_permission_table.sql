CREATE TABLE IF NOT EXISTS role_permission(
    id SERIAL,
    role_id SERIAL,
    permission_id SERIAL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);