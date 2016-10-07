CREATE TABLE educations (
    PRIMARY KEY (education_id),

        education_id BIGINT       NOT NULL AUTO_INCREMENT,
             user_id BIGINT       NOT NULL,
         institution VARCHAR(255) NOT NULL,
              degree VARCHAR(255) NOT NULL,
    date_specificity VARCHAR(255) NOT NULL,
           from_date DATE         NOT NULL,
             to_date DATE,

    CONSTRAINT educations_user_id_foreign_key FOREIGN KEY (user_id) REFERENCES users (user_id)
);
