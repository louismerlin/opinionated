CREATE TABLE users (
	id serial PRIMARY KEY,
	username varchar(16) NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE discussions (
  id serial PRIMARY KEY,
  last_link_date date
);

CREATE TABLE reactions (
  id serial PRIMARY KEY,
  emotion integer,
  read boolean
);
 
CREATE TABLE links (
  id serial PRIMARY KEY,
  discussion_id integer REFERENCES discussions,
  user_id integer REFERENCES users,
  url text NOT NULL,
  date timestamp NOT NULL,
  reaction_id integer REFERENCES reactions
);

/*
CREATE TABLE messages (
  id serial PRIMARY KEY,
  link_id integer REFERENCES links,
  date timestamp NOT NULL
)
*/
CREATE TABLE discussions_users (
  user_id integer REFERENCES users,
  discussion_id integer REFERENCES discussions
);
