SELECT collections.id,
    collections.title,
    collections.country,
    JSON_AGG(
        (
            json_build_object(
                'type',
                gifts.type,
                'price',
                gifts.price,
                'label',
                gifts.label
            )
        )
        ORDER BY gifts.price
    ) as gifts
FROM collections
    INNER JOIN collection_gift ON collections.id = collection_gift.collection_id
    INNER JOIN gifts ON gifts.id = collection_gift.gift_id
GROUP BY collections.id,
    collections.title,
    collections.country