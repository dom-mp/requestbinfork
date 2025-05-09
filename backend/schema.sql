CREATE TABLE tokens(
  id serial PRIMARY KEY,
  token_value varchar(255)
);

CREATE TABLE baskets(
  id serial PRIMARY KEY,
  name varchar(255) UNIQUE NOT NULL,
  token_id bigint NOT NULL REFERENCES tokens(id) ON DELETE CASCADE
);

CREATE TABLE notifications(
  id serial PRIMARY KEY,
  basket_id bigint NOT NULL REFERENCES baskets(id) ON DELETE CASCADE,
  sent_at timestamp NOT NULL,
  method varchar(6) NOT NULL,
  headers text NOT NULL,
  body_mongo_id VARCHAR(255) NOT NULL
);