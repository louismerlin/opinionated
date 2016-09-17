CREATE TABLE users (
	id serial PRIMARY KEY,
	username varchar(16) NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE discussions (
  id serial PRIMARY KEY,
  last_link_date date
);

CREATE TABLE links (
  id serial PRIMARY KEY,
  discussion_id integer REFERENCES discussions,
  user_id integer REFERENCES users,
  url text NOT NULL,
  date timestamp NOT NULL,
  status boolean
);

CREATE TABLE discussions_users (
  user_id integer REFERENCES users,
  discussion_id integer REFERENCES discussions
);
