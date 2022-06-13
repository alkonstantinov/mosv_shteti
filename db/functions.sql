-- ActivitiesGetAll
create or replace function ActivitiesGetAll ()
returns Table(
	ActivityTypeId int,
	ActivityTypeKey character varying,
	ActivityTypeNameBG character varying,
	ActivityTypeNameEn character varying
)
as $$
	select
		ActivityTypeId,
		ActivityTypeKey,
		ActivityTypeNameBG,
		ActivityTypeNameEn
	from ActivityType
	order by ActivityTypeId;
$$ LANGUAGE sql;

-- select * from ActivitiesGetAll();

-- kid-2008 const
create or replace function KIDGetAll ()
returns Table(
	KidId int,
	KidValue character varying,
	KidLabelBg character varying,
	KidLabelEn character varying,
	KidSelectable boolean
)
as $$
	select
		KidId,
		KidValue,
		KidLabelBg,
		KidLabelEn,
		KidSelectable
	from Kid
	order by KidId;
$$ LANGUAGE sql;

-- select * from KIDGetAll();

create or replace function MainTableGetAll (_startIndex int, _count int, _IsDeleted boolean)
returns Table(
	MainTableId int,
	IsDamage boolean,
	DamageList jsonb,
	AppearanceDate timestamp,
	ProcedureDate timestamp,
	ActivityTypeId int,
	Applicant character varying,
	KidId int,
	CourtCases jsonb,
	PreventResultsList jsonb,
	RemovalResultsList jsonb,
	EndDate timestamp,
	PaidCosts decimal,
	ReimbursedCosts decimal,
	UnpaidCosts decimal,
	PaymentSourceOperator boolean,
	PaymentSource character varying,
	FinancialAssurance jsonb,
	AdministativeCosts decimal,
	Other character varying,
	CreatedOn timestamp,
	ChangedOn timestamp
)
as $$
	select
		MainTableId,
		IsDamage,
		DamageList,
		AppearanceDate,
		ProcedureDate,
		ActivityTypeId,
		Applicant,
		KidId,
		CourtCases,
		PreventResultsList,
		RemovalResultsList,
		EndDate,
		PaidCosts,
		ReimbursedCosts,
		UnpaidCosts,
		PaymentSourceOperator,
		PaymentSource,
		FinancialAssurance,
		AdministativeCosts,
		Other,
		CreatedOn,
		ChangedOn 
	from MainTable as mt
	where mt.IsDeleted = _IsDeleted
	order by mt.ChangedOn asc, mt.MainTableId asc
	limit _count offset _startIndex - 1;
$$ LANGUAGE sql;


create or replace function DamageGetAll (_startIndex int, _count int, _IsDeleted boolean)
returns Table(
	MainTableId int,
	IsDamage boolean,
	DamageList jsonb,
	AppearanceDate timestamp,
	ProcedureDate timestamp,
	ActivityTypeId int,
	Applicant character varying,
	KidId int,
	CourtCases jsonb,
	PreventResultsList jsonb,
	RemovalResultsList jsonb,
	EndDate timestamp,
	PaidCosts decimal,
	ReimbursedCosts decimal,
	UnpaidCosts decimal,
	PaymentSourceOperator boolean,
	PaymentSource character varying,
	FinancialAssurance jsonb,
	AdministativeCosts decimal,
	Other character varying,
	CreatedOn timestamp,
	ChangedOn timestamp
)
as $$
	select
		MainTableId,
		IsDamage,
		DamageList,
		AppearanceDate,
		ProcedureDate,
		ActivityTypeId,
		Applicant,
		KidId,
		CourtCases,
		PreventResultsList,
		RemovalResultsList,
		EndDate,
		PaidCosts,
		ReimbursedCosts,
		UnpaidCosts,
		PaymentSourceOperator,
		PaymentSource,
		FinancialAssurance,
		AdministativeCosts,
		Other,
		CreatedOn,
		ChangedOn 
	from MainTable as mt
	where mt.IsDeleted = _IsDeleted and IsDamage = true
	order by mt.ChangedOn asc, mt.MainTableId asc
	limit _count offset _startIndex - 1;
$$ LANGUAGE sql;

-- select * from DamageGetAll(1, 10, false);

create or replace function MainTableGetById (_mainTableId int)
returns Table(
	MainTableId int,
	IsDamage boolean,
	DamageList jsonb,
	AppearanceDate timestamp,
	ProcedureDate timestamp,
	ActivityTypeId int,
	Applicant character varying,
	KidId int,
	CourtCases jsonb,
	PreventResultsList jsonb,
	RemovalResultsList jsonb,
	EndDate timestamp,
	PaidCosts decimal,
	ReimbursedCosts decimal,
	UnpaidCosts decimal,
	PaymentSourceOperator boolean,
	PaymentSource character varying,
	FinancialAssurance jsonb,
	AdministativeCosts decimal,
	Other character varying,
	CreatedOn timestamp,
	ChangedOn timestamp
)
as $$
	select
		MainTableId,
		IsDamage,
		DamageList,
		AppearanceDate,
		ProcedureDate,
		ActivityTypeId,
		Applicant,
		KidId,
		CourtCases,
		PreventResultsList,
		RemovalResultsList,
		EndDate,
		PaidCosts,
		ReimbursedCosts,
		UnpaidCosts,
		PaymentSourceOperator,
		PaymentSource,
		FinancialAssurance,
		AdministativeCosts,
		Other,
		CreatedOn,
		ChangedOn 
	from MainTable as mt
	where mt.IsDeleted = false and mt.MainTableId = _MainTableId;
$$ LANGUAGE sql;

-- select * from MainTableGetById(1);

create or replace function MenaceGetAll (_startIndex int, _count int, _IsDeleted boolean)
returns Table(
	MainTableId int,
	IsDamage boolean,
	DamageList jsonb,
	AppearanceDate timestamp,
	ProcedureDate timestamp,
	ActivityTypeId int,
	Applicant character varying,
	KidId int,
	CourtCases jsonb,
	PreventResultsList jsonb,
	RemovalResultsList jsonb,
	EndDate timestamp,
	PaidCosts decimal,
	ReimbursedCosts decimal,
	UnpaidCosts decimal,
	PaymentSourceOperator boolean,
	PaymentSource character varying,
	FinancialAssurance jsonb,
	AdministativeCosts decimal,
	Other character varying,
	CreatedOn timestamp,
	ChangedOn timestamp
)
as $$
	select
		MainTableId,
		IsDamage,
		DamageList,
		AppearanceDate,
		ProcedureDate,
		ActivityTypeId,
		Applicant,
		KidId,
		CourtCases,
		PreventResultsList,
		RemovalResultsList,
		EndDate,
		PaidCosts,
		ReimbursedCosts,
		UnpaidCosts,
		PaymentSourceOperator,
		PaymentSource,
		FinancialAssurance,
		AdministativeCosts,
		Other,
		CreatedOn,
		ChangedOn 
	from MainTable as mt
	where mt.IsDeleted = _IsDeleted and mt.IsDamage = false
	order by mt.ChangedOn asc, mt.MainTableId asc
	limit _count offset _startIndex - 1;
$$ LANGUAGE sql;

-- select * from MenaceGetAll(1, 10, false);

create or replace function MainTableInsert(
	_IsDamage boolean,
	_DamageList jsonb,
	_AppearanceDate timestamp,
	_ProcedureDate timestamp,
	_ActivityTypeId int,
	_Applicant character varying,
	_KidId int,
	_CourtCases jsonb,
	_PreventResultsList jsonb,
	_RemovalResultsList jsonb,
	_EndDate timestamp,
	_PaidCosts decimal,
	_ReimbursedCosts decimal,
	_UnpaidCosts decimal,
	_PaymentSourceOperator boolean,
	_PaymentSource character varying,
	_FinancialAssurance jsonb,
	_AdministativeCosts decimal,
	_Other character varying
)
returns int
 as $$
   declare _id int;
   BEGIN
	INSERT INTO MainTable (
		IsDamage,
		DamageList,
		AppearanceDate,
		ProcedureDate,
		ActivityTypeId,
		Applicant,
		KidId,
		CourtCases,
		PreventResultsList,
		RemovalResultsList,
		EndDate,
		PaidCosts,
		ReimbursedCosts,
		UnpaidCosts,
		PaymentSourceOperator,
		PaymentSource,
		FinancialAssurance,
		AdministativeCosts,
		Other
	)
		VALUES (
			_IsDamage,
			_DamageList,
			_AppearanceDate,
			_ProcedureDate,
			_ActivityTypeId,
			_Applicant,
			_KidId,
			_CourtCases,
			_PreventResultsList,
			_RemovalResultsList,
			_EndDate,
			_PaidCosts,
			_ReimbursedCosts,
			_UnpaidCosts,
			_PaymentSourceOperator,
			_PaymentSource,
			_FinancialAssurance,
			_AdministativeCosts,
			_Other
		)
	returning MainTableId into _id;
	RETURN _id;
   END
$$ LANGUAGE 'plpgsql';

create or replace function GetRecordsCount(_IsDamage boolean)
returns int
as $$
	declare
		_count int;
	BEGIN
	select into _count COUNT(MainTableId)
	from MainTable
	where _IsDamage = IsDamage and IsDeleted = false;
return _count;
end $$ LANGUAGE plpgsql;

create or replace function MainTableUpdate(
	_MainTableId int,
	_IsDamage boolean,
	_DamageList jsonb,
	_AppearanceDate timestamp,
	_ProcedureDate timestamp,
	_ActivityTypeId int,
	_Applicant character varying,
	_KidId int,
	_CourtCases jsonb,
	_PreventResultsList jsonb,
	_RemovalResultsList jsonb,
	_EndDate timestamp,
	_PaidCosts decimal,
	_ReimbursedCosts decimal,
	_UnpaidCosts decimal,
	_PaymentSourceOperator boolean,
	_PaymentSource character varying,
	_FinancialAssurance jsonb,
	_AdministativeCosts decimal,
	_Other character varying,
	_IsDeleted boolean
)
returns void
as $$
	UPDATE MainTable
	set 
		IsDamage = _IsDamage,
		DamageList = _DamageList,
		AppearanceDate = _AppearanceDate,
		ProcedureDate = _ProcedureDate,
		ActivityTypeId = _ActivityTypeId,
		Applicant = _Applicant,
		KidId = _KidId,
		CourtCases = _CourtCases,
		PreventResultsList = _PreventResultsList,
		RemovalResultsList = _RemovalResultsList,
		EndDate = _EndDate,
		PaidCosts = _PaidCosts,
		ReimbursedCosts = _ReimbursedCosts,
		UnpaidCosts = _UnpaidCosts,
		PaymentSourceOperator = _PaymentSourceOperator,
		PaymentSource = _PaymentSource,
		FinancialAssurance = _FinancialAssurance,
		AdministativeCosts = _AdministativeCosts,
		Other = _Other,
		IsDeleted = _IsDeleted
	where MainTableId = _MainTableId;
$$ LANGUAGE sql;
