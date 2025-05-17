CREATE TABLE IF NOT Exists baskets (
  name varchar(255) PRIMARY KEY,
  token varchar(255)
);

CREATE TABLE IF NOT EXISTS requests (
  id serial PRIMARY KEY,
  basket_name varchar(255) NOT NULL REFERENCES baskets(name) ON DELETE CASCADE,
  sent_at timestamp NOT NULL,
  method varchar(16) NOT NULL,
  headers text NOT NULL,
  body_mongo_id VARCHAR(255)
);