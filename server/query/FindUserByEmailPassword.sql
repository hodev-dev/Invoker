SELECT *
FROM users
WHERE email = $1 --ARG-1
    AND password = $2 --ARG-2;