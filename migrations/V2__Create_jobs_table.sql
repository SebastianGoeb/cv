CREATE TABLE jobs (
    PRIMARY KEY (job_id),

              job_id BIGINT       NOT NULL AUTO_INCREMENT,
             user_id BIGINT       NOT NULL,
             company VARCHAR(255) NOT NULL,
               title VARCHAR(255) NOT NULL,
         description VARCHAR(512) NOT NULL,
    date_specificity VARCHAR(255) NOT NULL,
           from_date DATE         NOT NULL,
             to_date DATE,

    CONSTRAINT jobs_user_id_foreign_key FOREIGN KEY (user_id) REFERENCES users (user_id)
);
