

--@block
DROP TABLE journal_prompt;
DROP TABLE prompts;
DROP TABLE prompt_category;
DROP TABLE journal_entries;
DROP TABLE calendar_reminders;
DROP TABLE calendar_entry;
DROP TABLE reminder_categories;
-- DROP TABLE users;


--@block
DROP TABLE calendar_reminders;


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
    password_hash VARCHAR(255) NOT NULL
)

--@block
SELECT * FROM users


--@block 
-- CREATE TABLE calendar_entry (
--     calendar_date DATE NOT NULL,
--     user_id INT NOT NULL,
--     PRIMARY KEY(calendar_date, user_id),
--     FOREIGN KEY (user_id) REFERENCES users(user_id)
-- )

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
    reminder_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL,
    -- category_id INT NOT NULL,
    user_id INT NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    -- FOREIGN KEY (category_id) REFERENCES reminder_categories(category_id),
)

--@block
INSERT INTO calendar_reminders (reminder_id, title, user_id, start, end)
VALUES 
(1, 'Doctor appointment', 1, '2024-06-10 09:00:00', '2024-06-10 10:00:00'),
(2, 'Meeting with team', 1, '2024-06-15 14:00:00', '2024-06-15 15:00:00'),
(3, 'Lunch with friend', 1, '2024-06-20 12:30:00', '2024-06-20 13:30:00'),
(4, 'Gym session', 1, '2024-06-25 18:00:00', '2024-06-25 19:00:00');

--@block
INSERT INTO calendar_reminders (title, user_id, start, end)
VALUES 
('Gym session', 1, '2024-06-06 18:00:00', '2024-06-06 19:00:00');


--@block
SELECT * FROM calendar_reminders WHERE user_id = 1

--@block 
SELECT * FROM calendar_reminders WHERE user_id = 1 AND start BETWEEN "2024-06-10 00:00:00" AND "2024-06-11 00:00:00"

--@block
CREATE TABLE journal_entries (
    journal_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    content TEXT,
    user_id INT NOT NULL,
    calendar_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)

--@block
SELECT * FROM journal_entries

--@block
CREATE TABLE images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    journal_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
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


