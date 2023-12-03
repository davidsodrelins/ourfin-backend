-- Inserting data into 'users' table
INSERT INTO users (name, email, cpf, login, status, password) VALUES
('Ana Silva', 'ana.silva@example.com', '000.000.000-01', 'anasilva', 'Active', 'hashed_pass_ana'),
('Bruno Santos', 'bruno.santos@example.com', '000.000.000-02', 'brunosantos', 'Active', 'hashed_pass_bruno'),
('Carla Perez', 'carla.perez@example.com', '000.000.000-03', 'carlaperez', 'Inactive', 'hashed_pass_carla'),
('David Costa', 'david.costa@example.com', '000.000.000-04', 'davidcosta', 'Active', 'hashed_pass_david'),
('Elena Souza', 'elena.souza@example.com', '000.000.000-05', 'elenasouza', 'Inactive', 'hashed_pass_elena');

-- Inserting data into 'types' table
INSERT INTO types (description) VALUES
('Salary'),
('Bonus'),
('Freelance'),
('Interest'),
('Investment');

-- Inserting data into 'acquirers' table
INSERT INTO acquirers (description) VALUES
('individual'),
('family');

-- Inserting data into 'frequencies' table
INSERT INTO frequencies (description) VALUES
('Fixed'),
('Recurring'),
('One-time');

-- Inserting data into 'incomes' table
INSERT INTO incomes (user_id, type_id, frequency_id, acquirer_id, estimated_value, expected_date, status_id, alert, payer_user) VALUES
(1, 1, 1, 1, 5000.00, '2023-12-01', 1, FALSE, 1),
(2, 2, 2, 1, 700.00, '2023-12-15', 1, TRUE, 2),
(3, 3, 3, 2, 2000.00, '2023-12-20', 1, FALSE, 3),
(4, 4, 1, 1, 300.00, '2023-12-25', 1, TRUE, 4),
(5, 5, 2, 2, 1500.00, '2023-12-30', 1, FALSE, 5);

-- Inserting data into 'expenses' table
INSERT INTO expenses (user_id, type_id, frequency_id, acquirer_id, estimated_value, expected_date, status, alert, receiver_user) VALUES
(1, 1, 1, 1, 1200.00, '2023-12-05', 'Paid', FALSE, 1),
(2, 2, 2, 1, 300.00, '2023-12-10', 'Pending', TRUE, 2),
(3, 3, 3, 2, 750.00, '2023-12-15', 'Canceled', FALSE, 3),
(4, 4, 1, 1, 500.00, '2023-12-20', 'Late', TRUE, 4),
(5, 5, 2, 2, 250.00, '2023-12-25', 'Rescheduled', FALSE, 5);

-- Inserting data into 'families' table
INSERT INTO families (description, status) VALUES
('The Silva Family', 'Active'),
('The Souza Clan', 'Inactive');

-- Inserting data into 'user_families' table
INSERT INTO user_families (user_id, family_id, status, role, profile_id) VALUES
(1, 1, 'Active', 'Father', 1),
(2, 1, 'Active', 'Mother', 2);

-- Inserting data into 'profiles' table
INSERT INTO profiles (description) VALUES
('Administrator'),
('Member');
