	DROP SCHEMA public CASCADE; 
	CREATE SCHEMA public;

	CREATE TABLE PCSUser(
	emailAddr VARCHAR(1000),
	pcsPass VARCHAR(10000),
	firstName VARCHAR(1000),
	lastName VARCHAR(1000),
	DOB Date,
	homeAddr VARCHAR(1000),
	PRIMARY KEY(emailAddr)
	);

	CREATE TABLE PetOwner(
	emailAddr VARCHAR(1000),
	pcsPass VARCHAR(10000),
	firstName VARCHAR(1000),
	lastName VARCHAR(1000),
	DOB Date,
	homeAddr VARCHAR(1000),
	creditCard INTEGER,
	creditCardType VARCHAR(1000),
	FOREIGN KEY (emailAddr) REFERENCES PCSUser (emailAddr),
	PRIMARY KEY (emailAddr)
	);

	CREATE TABLE CareTaker(
	emailAddr VARCHAR(1000),
	pcsPass VARCHAR(10000),
	firstName VARCHAR(1000),
	lastName VARCHAR(1000),
	DOB Date,
	homeAddr VARCHAR(1000),
	avgRating NUMERIC(2,1),
	petDays INTEGER,
	availLeave INTEGER,
	employmentType INTEGER,
	baseSalary NUMERIC(7,2),
	FOREIGN KEY (emailAddr) REFERENCES PCSUser(emailAddr),
	PRIMARY KEY (emailAddr)
	);



	CREATE TABLE BaseDailyPrice(
	emailAddr VARCHAR(1000) REFERENCES CareTaker(emailAddr),
	petType VARCHAR(1000),
	price INTEGER,
	PRIMARY KEY (emailAddr,petType),
	CONSTRAINT chk_petType CHECK (petType IN ('Cat', 'Dog', 'Rabbit'))
	);

	CREATE TABLE AppliedLeave(
	emailAddr VARCHAR(1000) REFERENCES CareTaker(emailAddr),
	startDate DATE,
	endDate DATE,
	leaveType VARCHAR(1000),
	accepted CHAR(1),
	PRIMARY KEY (emailAddr, startDate , endDate),
	CONSTRAINT chk_EndLaterThanStart CHECK (endDate >= startDate)

	);
	CREATE TABLE Owns(
	emailAddr VARCHAR(1000) REFERENCES PetOwner(emailAddr),
	petName VARCHAR(1000),
	petType VARCHAR(1000),
	breed VARCHAR(1000),
	weight NUMERIC(5,2),
	ageYear INTEGER,
	ageMonths INTEGER,
	sex CHAR(1),
	specialRequirements TEXT,
	PRIMARY KEY(emailAddr, petName)
	);


	CREATE TABLE Availability(
	emailAddr VARCHAR (1000),
	serviceType VARCHAR (1000),
	serviceDescription VARCHAR (1000),
	dailyPrice INTEGER,
	totalCost INTEGER,
	petSlotsLeft INTEGER,
	startDate DATE,
	endDate DATE,
	CONSTRAINT chk_serviceDescription CHECK (serviceDescription IN ('Boarding', 'DayCare')),
	FOREIGN KEY(emailAddr,serviceType) REFERENCES BaseDailyPrice(emailAddr, petType),
	PRIMARY KEY(emailAddr, startDate, endDate, petSlotsLeft,serviceType,totalCost)
	);


	CREATE TABLE PCSAdmin(
	adminEmailAddr VARCHAR(1000),
	pcsAdminPass VARCHAR(10000),
	PRIMARY KEY (adminEmailAddr)
	);



	CREATE TABLE Bids (
	rating NUMERIC(2,1),
	review VARCHAR (1000),
	transportMethod INTEGER,
	success INTEGER,
	paymentType VARCHAR(1000),
	POemail VARCHAR(1000),
	petName VARCHAR(1000),
	CTemail VARCHAR(1000),
	serviceType VARCHAR(1000),
	totalCost INTEGER,
	startDate DATE,
	endDate DATE,
	petSlotsLeft INTEGER,
	FOREIGN KEY(POemail, petName) REFERENCES Owns(emailAddr,petName),
	FOREIGN KEY(CTemail, startDate, endDate,serviceType,totalCost,petSlotsLeft) REFERENCES Availability(emailAddr,startDate,endDate,serviceType,totalCost,petSlotsLeft),
	PRIMARY KEY (POemail, CTemail, startDate, endDate, petName)
	);


