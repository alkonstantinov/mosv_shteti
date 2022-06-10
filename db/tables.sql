CREATE EXTENSION IF NOT EXISTS citext;

-- kid
drop table if exists Kid CASCADE;
create table Kid
(
	KidId serial not null primary key,
	KidValue citext not null,
	KidLabelBg character varying not null,
	KidlabelEn character varying,
	KidSelectable boolean
);

-- ActivityType
drop table if exists ActivityType CASCADE;
create table ActivityType
(
	ActivityTypeId int not null primary key,
	ActivityTypeKey citext not null,
	ActivityTypeNameBG character varying unique not null,
	ActivityTypeNameEn character varying
);

-- MainTable
drop table if exists MainTable CASCADE;
create table MainTable
(
	MainTableId serial not null PRIMARY KEY,
	IsDamage boolean not null DEFAULT false,
	DamageList jsonb,
	AppearanceDate timestamp,
	ProcedureDate timestamp,
	ActivityTypeId int REFERENCES ActivityType(ActivityTypeId),
	Applicant character varying,
	KidId int REFERENCES Kid(KidId),
	CourtCases jsonb,
	PreventResultsList jsonb,
	RemovalResultsList jsonb,
	EndDate timestamp,
	PaidCosts decimal(18, 2),
	ReimbursedCosts decimal(18, 2),
	UnpaidCosts decimal(18, 2),
	PaymentSourceOperator boolean not null DEFAULT true,
	PaymentSource character varying,
	FinancialAssurance jsonb,
	AdministativeCosts decimal(18, 2),
	Other character varying,
	IsDeleted boolean not null DEFAULT false,
	CreatedOn timestamp not null DEFAULT NOW(),
	ChangedOn timestamp not null DEFAULT NOW()
);


CREATE OR REPLACE FUNCTION f_MainTable_ChangedOn()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ChangedOn = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_MainTable_ChangedOn
BEFORE UPDATE ON MainTable
FOR EACH ROW
EXECUTE PROCEDURE f_MainTable_ChangedOn();