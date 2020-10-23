CREATE TABLE Pet(
    petType VARCHAR(10) breed VARCHAR(30) petName VARCHAR(20) petWeight NUMERIC(4, 2) ageYear INTEGER ageMonths INTEGER sex CHAR(1) specialRequirements TEXT
);
TABLE Owns (
    ownerName VARCHAR(10) 
    emailAddr VARCHAR(20) 
    FOREIGN KEY(ownerName, emailAddr)
);