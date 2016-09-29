CREATE TABLE jobs (
    PRIMARY KEY (job_id),

              job_id BIGINT       NOT NULL AUTO_INCREMENT,
             user_id BIGINT       NOT NULL,
           from_time DATE         NOT NULL,
    from_specificity VARCHAR(255) NOT NULL,
             to_time DATE,
      to_specificity VARCHAR(255),
            employer VARCHAR(255),
               title VARCHAR(255),
         description VARCHAR(512),

    CONSTRAINT user_id_foreign_key FOREIGN KEY (user_id) REFERENCES users (user_id)
);
