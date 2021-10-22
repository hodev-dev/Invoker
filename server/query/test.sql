SELECT filtered_codes.gift_id,
    count(code) as count,
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'code_id',
            filtered_codes.id,
            'code',
            filtered_codes.code,
            'label',
            gifts.label,
            'price',
            gifts.price
        )
    ) as cod
FROM (
        SELECT *
        FROM codes
        WHERE codes.gift_id = 2
        LIMIT 3
    ) as filtered_codes
    INNER JOIN gifts ON filtered_codes.gift_id = gifts.id
GROUP BY filtered_codes.gift_id;