UPDATE users
SET confirmed = TRUE
WHERE id = $1;