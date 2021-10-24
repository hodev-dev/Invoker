SELECT *
FROM users
WHERE username LIKE '%' || $1 || '%'
    OR email LIKE '%' || $1 || '%';