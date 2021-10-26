UPDATE collections
SET title = $2,
    country = $3
WHERE id = $1;