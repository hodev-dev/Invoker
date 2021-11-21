SELECT users.id,
    users.phone,
    users.password,
    ARRAY_AGG(DISTINCT roles.role_name) as roles,
    ARRAY_AGG(DISTINCT permissions.permission_name) as permissions,
    users.confirmed
FROM users
    LEFT JOIN user_role ON users.id = user_role.user_id
    LEFT JOIN roles ON roles.id = user_role.role_id
    LEFT JOIN role_permission ON roles.id = role_permission.role_id
    LEFT JOIN permissions ON permissions.id = role_permission.permission_id
WHERE users.phone = CAST($1 AS VARCHAR) --ARG-1
GROUP BY users.id;