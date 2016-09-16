CREATE TABLE users (
	id serial PRIMARY KEY,
	username varchar(16) NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE discussions (
  id serial PRIMARY KEY
);

CREATE TABLE users_discussions (
  user_id integer references users,
  discussion_id integer references discussions
);
