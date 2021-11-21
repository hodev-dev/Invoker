UPDATE users
SET password = $2
WHERE phone = $1;