CREATE TABLE IF NOT EXISTS "user" (
	id SERIAL PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
	password_hash CHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS account (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	type VARCHAR(20) NOT NULL,
	user_id SERIAL NOT NULL REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS transaction (
	id SERIAL PRIMARY KEY,
	amount DECIMAL(6, 2) NOT NULL,
	description VARCHAR(128) NOT NULL,
	account_id SERIAL NOT NULL REFERENCES account(id)
);

CREATE TABLE IF NOT EXISTS label (
	id SERIAL PRIMARY KEY,
	name VARCHAR(32),
	user_id SERIAL NOT NULL REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS transaction_label (
    transaction_id SERIAL REFERENCES transaction(id),
    label_id SERIAL REFERENCES label(id),
    PRIMARY KEY(transaction_id, label_id)
);
