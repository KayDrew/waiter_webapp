
CREATE TABLE days(dayID INT PRIMARY KEY,day VARCHAR(255))
CREATE TABLE waiters(waiterID INT PRIMARY KEY,name VARCHAR(255), password VARCHAR(255) NOT NULL);
CREATE TABLE admin(dayID INT,waiterID INT, FOREIGN KEY(dayID) REFERENCES days(dayID), FOREIGN KEY(waiterID) REFERENCES waiters(waiterID))
