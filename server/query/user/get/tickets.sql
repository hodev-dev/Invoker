SELECT (SELECT count(*) FROM user_ticket WHERE user_ticket.user_id = $1) as total,
       json_agg(t.*)                                                     as data,
       $2                                                                as index,
       $3                                                                as per_page
FROM (
         SELECT tickets.id, tickets.title, tickets.status, tickets.created_at, tickets.updated_at
         FROM tickets
                  INNER JOIN user_ticket ut
                             ON tickets.id = ut.ticket_id AND ut.user_id = $1
         ORDER BY tickets.created_at
         OFFSET $2 LIMIT $3
     ) as t;