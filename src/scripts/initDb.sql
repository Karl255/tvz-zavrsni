CREATE TABLE IF NOT EXISTS "user" (
	id SERIAL PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
	password_hash CHAR(128) NOT NULL,
	is_admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS account (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	type VARCHAR(20) NOT NULL,
	user_id SERIAL NOT NULL REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS transaction (
	id SERIAL PRIMARY KEY,
	amount DECIMAL(20, 2) NOT NULL,
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

INSERT INTO "user" (email, password_hash, is_admin)
VALUES (
	'admin@tvz.hr',
	'da85fa81709b77d7002c9e88ffe22047dc1c03f4eec2a162953edb723650f6e6cc8eb2e741bb33f489f77e59fad7a23bcf737cdbee07644cf388adff83b0dc43',
	TRUE
);
