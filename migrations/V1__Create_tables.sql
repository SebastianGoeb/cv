CREATE TABLE users (
    PRIMARY KEY (user_id),

       user_id BIGINT NOT NULL AUTO_INCREMENT,
    google_sub VARCHAR(255),

    UNIQUE INDEX google_sub_unique (google_sub ASC)
);
