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
	amount DECIMAL(20, 2) NOT NULL,
	description VARCHAR(128) NOT NULL,
	date DATE NOT NULL,
	imported_id VARCHAR(64) NULL,
	account_id SERIAL NOT NULL REFERENCES account(id),
	CONSTRAINT unique_imported_id_per_account_id UNIQUE (imported_id, account_id)
);

CREATE TABLE IF NOT EXISTS tag (
	id SERIAL PRIMARY KEY,
	name VARCHAR(32),
	user_id SERIAL NOT NULL REFERENCES "user"(id),
	CONSTRAINT unique_tag_name_per_user UNIQUE (name, user_id)
);

CREATE TABLE IF NOT EXISTS tagged (
    transaction_id SERIAL REFERENCES transaction(id),
    tag_id SERIAL REFERENCES tag(id),
    PRIMARY KEY (transaction_id, tag_id)
);

CREATE TABLE attribute (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32),
    user_id SERIAL NOT NULL REFERENCES "user"(id),
    CONSTRAINT unique_attribute_name_per_user UNIQUE (name, user_id)
);

CREATE TABLE attribute_value (
    transaction_id SERIAL REFERENCES transaction(id),
    attribute_id SERIAL REFERENCES attribute(id),
    value VARCHAR(50),
    PRIMARY KEY (transaction_id, attribute_id)
);
