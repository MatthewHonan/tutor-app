CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    userType ENUM('student', 'tutor') NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    university VARCHAR(255),
    fieldOfStudy VARCHAR(255),
    levelOfEducation VARCHAR(255),
    profilePicture VARCHAR(255),
    profileDescription VARCHAR(255)

);
