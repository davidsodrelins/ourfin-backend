-- Creating 'users' table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    login VARCHAR(255) NOT NULL UNIQUE,
    status ENUM('Active', 'Inactive') NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Creating 'types' table
CREATE TABLE types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

-- Creating 'acquirers' table
CREATE TABLE acquirers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description ENUM('individual', 'family') NOT NULL
);

-- Creating 'frequencies' table
CREATE TABLE frequencies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description ENUM('Fixed', 'Recurring', 'One-time') NOT NULL
);

-- Creating 'incomes' table
CREATE TABLE incomes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type_id INT NOT NULL,
    frequency_id INT NOT NULL,
    acquirer_id INT NOT NULL,
    estimated_value DECIMAL(10, 2) NOT NULL,
    expected_date DATE NOT NULL,
    received_value DECIMAL(10, 2),
    receipt_date DATE,
    status_id INT NOT NULL,
    alert BOOLEAN NOT NULL DEFAULT FALSE,
    alert_date DATE,
    payer_user INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (type_id) REFERENCES types (id),
    FOREIGN KEY (frequency_id) REFERENCES frequencies (id),
    FOREIGN KEY (acquirer_id) REFERENCES acquirers (id)
);

-- Creating 'expenses' table
CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type_id INT NOT NULL,
    frequency_id INT NOT NULL,
    acquirer_id INT NOT NULL,
    estimated_value DECIMAL(10, 2) NOT NULL,
    expected_date DATE NOT NULL,
    paid_value DECIMAL(10, 2),
    payment_date DATE,
    status ENUM('Pending', 'Paid', 'Canceled', 'Late', 'Rescheduled') NOT NULL,
    alert BOOLEAN NOT NULL DEFAULT FALSE,
    alert_date DATE,
    receiver_user INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (type_id) REFERENCES types (id),
    FOREIGN KEY (frequency_id) REFERENCES frequencies (id),
    FOREIGN KEY (acquirer_id) REFERENCES acquirers (id)
);

-- Creating 'families' table
CREATE TABLE families (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    status ENUM('Active', 'Inactive', 'Suspended') NOT NULL
);

-- Creating 'user_families' table
CREATE TABLE user_families (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    family_id INT NOT NULL,
    status ENUM('Active', 'Inactive') NOT NULL,
    role VARCHAR(255) NOT NULL,
    profile_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (family_id) REFERENCES families (id)
);

-- Creating 'profiles' table
CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description ENUM('Administrator', 'Member') NOT NULL
);