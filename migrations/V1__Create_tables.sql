CREATE TABLE users (
    PRIMARY KEY (username),

        username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),

    UNIQUE INDEX email_unique (email ASC)
);
