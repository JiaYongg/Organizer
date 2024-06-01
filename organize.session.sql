

--@block
DROP TABLE prompt_category;
DROP TABLE prompts;
DROP TABLE journal_prompt;
DROP TABLE images;
DROP TABLE journal_entries;
DROP TABLE calendar_reminders;
DROP TABLE calendar_entry;
DROP TABLE reminder_categories;
DROP TABLE users;


--@block
SHOW DATABASES;


--@block 
SHOW TABLES

--@block
CREATE DATABASE organize;

--@block
CREATE TABLE users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_date DATETIME NOT NULL,
    updated_date DATETIME
)

--@block
SELECT * FROM users


--@block 
CREATE TABLE calendar_entry (
    calendar_date DATE NOT NULL,
    user_id INT NOT NULL,
    created_date DATETIME NOT NULL,
    updated_date DATETIME,
    PRIMARY KEY(calendar_date, user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)

--@block
SELECT * FROM calendar_entry


--@block 
CREATE TABLE reminder_categories (
    category_id INT NOT NULL PRIMARY KEY,
    category VARCHAR(50) NOT NULL 
)

--@block
SELECT * FROM reminder_categories


--@block
CREATE TABLE calendar_reminders (
    reminder_id INT NOT NULL PRIMARY KEY,
    reminder_time TIMESTAMP NOT NULL,
    reminder_message TEXT NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    calendar_date DATE NOT NULL,
    created_date DATETIME NOT NULL,
    updated_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES calendar_entry(user_id),
    FOREIGN KEY (category_id) REFERENCES reminder_categories(category_id),
    FOREIGN KEY (calendar_date) REFERENCES calendar_entry(calendar_date)

)

--@block
SELECT * FROM calendar_reminders

--@block
CREATE TABLE journal_entries (
    journal_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    content TEXT,
    created_date DATETIME NOT NULL,
    updated_date DATETIME,
    user_id INT NOT NULL,
    calendar_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES calendar_entry(user_id),
    FOREIGN KEY (calendar_date) REFERENCES calendar_entry(calendar_date)
)

--@block
SELECT * FROM journal_entries

--@block
CREATE TABLE images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    journal_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_date DATETIME NOT NULL,
    updated_date DATETIME,
    FOREIGN KEY (journal_id) REFERENCES journal_entries(journal_id)
)

--@block
SELECT * FROM images

--@block
CREATE TABLE prompt_category(
    category_id INT PRIMARY KEY  AUTO_INCREMENT,
    category VARCHAR(255)
)

--@block
SELECT * FROM prompt_category


--@block
CREATE TABLE prompts (
    prompt_id INT PRIMARY KEY AUTO_INCREMENT, 
    prompt TEXT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES prompt_category(category_id)
)

--@block 
SELECT * FROM prompts

--@block
CREATE TABLE journal_prompt (
    journal_id INT,
    prompt_id INT,
    PRIMARY KEY (journal_id, prompt_id),
    FOREIGN KEY (journal_id) REFERENCES journal_entries(journal_id),
    FOREIGN KEY (prompt_id) REFERENCES prompts(prompt_id)
)

--@block 
SELECT * FROM journal_prompt


