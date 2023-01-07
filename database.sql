CREATE DATABASE ftracker;

-- set extentiom
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE finances(
    id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_id VARCHAR(255),
    finance_value INT NOT NULL,
    finance_type VARCHAR(255) NOT NULL,
    finance_date VARCHAR(255) NOT NULL,
    finance_name VARCHAR(255) NOT NULL
);

INSERT INTO finances (user_id, finance_value, 
finance_type, finance_date, finance_name) VALUES ('da4ea79e-1c26-4c94-886a-349bb556ad49',
260, 'income', '20.12.2022', 'Book');


INSERT INTO finances (user_id, finance_value, 
finance_type, finance_date, finance_name) VALUES ('da4ea79e-1c26-4c94-886a-349bb556ad49',
210, 'expense', '21.12.2022', 'Creatin');

INSERT INTO finances (user_id, finance_value, 
finance_type, finance_date, finance_name) VALUES ('da4ea79e-1c26-4c94-886a-349bb556ad49',
100, 'expense', '23.12.2022', 'Hrana');
