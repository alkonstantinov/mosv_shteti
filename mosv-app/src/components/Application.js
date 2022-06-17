import React, { useEffect, useState } from "react";
import TypeDescription from "./typeDescr/TypeDecription";
import SelectControl from "../controls/SelectControl";
import TextControl from "../controls/TextControl";
import CourtCases from "./courtCases/CourtCases";
import NumControl from "../controls/NumControl";
import TextareaControl from "../controls/TextareaControl";
import CheckControl from "../controls/CheckContorl";
import ServerRequest from "../http/ServerRequest";
import DateControl from "../controls/DateControl";
import { useNavigate, useParams } from "react-router-dom";

const required = (
    <span className="red">
        <i className="fa-solid fa-circle-exclamation red"></i>{" Задължително поле"}
    </span>
);
const initError = { isWrong: true, message: required };
// const noError = { isWrong: false, message: "" };

const Application = () => {
    const { isDamaged } = useParams();
    const navigate = useNavigate();
    const [damage, ] = useState(isDamaged === "damage" ? true : false);
    const [damageList, setDamageList] = useState({
        species: [],
        water: [],
        soil: [],
    });
    const [appearanceDate, setAppearanceDate] = useState(null);
    const [procedureDate, setProcedureDate] = useState(null);
    const [activity, setActivity] = useState("");
    const [applicant, setApplicant] = useState("");
    const [kid, setKid] = useState("");
    const [courtCases, setCourtCases] = useState([]);
    const [preventResultsList, setPreventResultsList] = useState({
        species: [],
        water: [],
        soil: [],
    });
    const [removalResultsList, setRemovalResultsList] = useState({
        species: [],
        water: [],
        soil: [],
    });
    const [endDate, setEndDate] = useState(null);
    const [paidCosts, setPaidCosts] = useState(0);
    const [reimbursedCosts, setReimbursedCosts] = useState(0);
    const [unpaidCosts, setUnpaidCosts] = useState(0);
    const [unpaidCostsDescription, setUnpaidCostsDescription] = useState("");
    const [paymentSourceOperator, setPaymentSourceOperator] = useState(true);
    const [paymentSource, setPaymentSource] = useState("");
    const [financialAssuranceUsed, setFinancialAssuranceUsed] = useState(false);
    const [financialAssurance, setFinancialAssurance] = useState([false, false, false, false]);
    const [admCosts, setAdmCosts] = useState(0);
    const [other, setOther] = useState("");

    const [kidMenu, setKidMenu] = useState({});
    const [activitiesMenu, setActivitiesMenu] = useState({});
    const [riosvMenu, setRiosvMenu] = useState({})

    let isMenace = !damage ? "непосредствената заплаха за" : "причинените";

    const financialAssuranceHandler = (v, idx) => {
        financialAssurance[idx] = v;
        setFinancialAssurance([...financialAssurance]);
    };

    // !!!!!!!!!!!!!!!!!!!!!!!! add errors to some fields
    const [errors, ] = useState({
        kid: initError,
        activity: initError,
        appearanceDate: initError,
        applicant: initError,
        damageList: initError
    });

    const validate = () => {
        if (
            Object.keys(damageList).filter((x) => damageList[x].length > 0).length === 0 || // damageList empty
            appearanceDate === null || // appearanceDate
            (!kid || kid === "0") || // kidId !== 0
            (!activity || activity === "0") || // activity !== 0
            (!applicant || applicant === "0") // applicant
        ) {
            return true;
        }
        return false;      
    };
    
    const fillData = () => {
        if (validate()) return;

        const data = {
            isDamage: damage,
            damageList: JSON.stringify(damageList),
            appearanceDate,
            procedureDate,
            activityTypeId: activity,
            applicant,
            kidId: kid,
            courtCases: JSON.stringify(courtCases),
            preventResultsList: JSON.stringify(preventResultsList),
            removalResultsList: JSON.stringify(removalResultsList),
            endDate: endDate || new Date("1000-01-01"),
            paidCosts,
            reimbursedCosts,
            unpaidCosts,
            paymentSourceOperator,
            paymentSource: !paymentSourceOperator ? paymentSource : "",
            financialAssurance: JSON.stringify(financialAssurance),
            administativeCosts: admCosts,
            other,
        };

        return data;
    };

    const SubmitHandler = (e) => {
        e.preventDefault();

        const payload = fillData();
        if (payload) {
            ServerRequest().post("Main/MainTableInsert", payload, () => {
                console.log("inserted successfully");
            });
            navigate("/");
        }

    };

    useEffect(() => {
        ServerRequest().get("Kid/KIDGetAll", {}, (response) => {
            const initialValue = {};
            const result = response.reduce(
                (previousValue, currentValue) => ({
                    ...previousValue,
                    [currentValue.kidId]: currentValue.kidLabelBg,
                }),
                initialValue
            );
            setKidMenu(result);
        });
        ServerRequest().get("ActivityType/ActivitiesGetAll", {}, (response) => {
            const initialValue = {};
            const result = response.reduce(
                (previousValue, currentValue) => ({
                    ...previousValue,
                    [currentValue.activityTypeId]: currentValue.activityTypeNameBG,
                }),
                initialValue
            );
            setActivitiesMenu(result);
        });
        ServerRequest().get("Riosv/RIOSVGetAll", {}, (response) => {
            const initialValue = {};
            const result = response.reduce(
                (previousValue, currentValue) => ({
                    ...previousValue,
                    [currentValue.riosvId]: currentValue.riosvNameBG,
                }),
                initialValue
            );
            setRiosvMenu(result);
        });
    }, []);
    return (
        <main>
            <div className="container">
                <div className="row text-center">
                    <h1>{`Заявяване от РИОСВ на информация за ${!damage ? "непосредствена заплаха за" : "причинени"} екологични щети`}</h1>
                </div>
            </div>
            <hr />
            <div className="wrapper">
                <div className="content">
                    <form action="">
                        {/* IMPORTANT When disable input, put class .disabled in the .form-item class */}
                        {/* <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="menace"
                                name="menace"
                                checked={!damage}
                                onChange={() => setDamage(false)}
                            />
                            <label htmlFor="menace" className="form-check-label">
                                Непосредствената заплаха за екологични щети
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="damage"
                                name="damage"
                                checked={damage}
                                onChange={() => setDamage(true)}
                            />
                            <label htmlFor="damage" className="form-check-label">
                                Причинени екологични щети
                            </label>
                        </div> */}

                        <TypeDescription
                            name="type"
                            title={`Вид на ${isMenace} екологични щети`}
                            damage={isMenace}
                            damageList={damageList}
                            setDamageList={setDamageList}
                            errors={Object.keys(damageList).filter((x) => damageList[x].length > 0).length === 0 && errors.damageList}
                        />

                        <DateControl
                            title={`Дата на възникване на ${isMenace} екологични щети и/или датата, на която това е установено`}
                            name="start-date"
                            value={appearanceDate}
                            setValue={setAppearanceDate}
                            locale="bg"
                            placeholderText="дд/мм/гггг"
                            errors={appearanceDate === null && errors.appearanceDate}
                        />

                        <SelectControl
                            name="type"
                            title={`Дейност съгласно приложение № 1, в резултат на която ${
                                damage ? "са" : "е възникнала"
                            }
                                ${isMenace} екологични щети`}
                            listObject={activitiesMenu}
                            placeHolder="Изберете дейност"
                            value={activity}
                            setValue={setActivity}
                            errors={(!activity || activity === "0") && errors.activity}
                        />

                        <DateControl
                            title={`Дата, на която е започнала процедура за предотвратяване или отстраняване на
                                ${isMenace} екологични щети`}
                            name="procedure-date"
                            value={procedureDate}
                            setValue={setProcedureDate}
                            locale="bg"
                            placeholderText="дд/мм/гггг"
                        />

                        <SelectControl
                            name="applicant"
                            title={`Заявител на процедурата по предотвратяване или отстраняване на ${isMenace} екологични щети`}//  - отговорен оператор, компетентен орган или представител на обществеността
                            listObject={riosvMenu}
                            placeHolder="Изберете регионална инспекция"
                            value={applicant}
                            setValue={setApplicant}
                            errors={!applicant && errors.applicant}
                        />

                        <SelectControl
                            name="kid2008"
                            title={`Класификационен код по Класификацията на икономическите дейности на
                            Националния статистически институт на дейността, в резултат на която е
                            настъпила екологичната щета`}
                            listObject={kidMenu}
                            placeHolder="Изберете класификационен код по КИД-2008"
                            value={kid}
                            setValue={setKid}
                            errors={(!kid || kid === "0") && errors.kid}
                        />

                        <CourtCases
                            name="court-proceedings"
                            title={`Образувани досъдебни производства или съдебни дела във връзка с ${isMenace} екологични щети`}
                            courtCases={courtCases}
                            setCourtCases={setCourtCases}
                        />

                        <TypeDescription
                            name="prevention-result"
                            title={`Резултат от процедурата по предотвратяване на ${isMenace} екологичните щети`}
                            damage={isMenace}
                            resultsType={" на резултатите от процедурата по предотвратяване"}
                            damageList={preventResultsList}
                            setDamageList={setPreventResultsList}
                        />

                        <TypeDescription
                            name="removal-result"
                            title={`Резултат от процедурата по отстраняване на ${isMenace} екологичните щети`}
                            damage={isMenace}
                            resultsType={" на резултатите от процедурата по отстраняване"}
                            damageList={removalResultsList}
                            setDamageList={setRemovalResultsList}
                        />

                        <DateControl
                            title={`Дата на приключване на процедурата по предотвратяване или отстраняване на ${isMenace} екологични щети`}
                            name="end-date"
                            value={endDate}
                            setValue={setEndDate}
                            min={procedureDate}
                            locale="bg"
                            placeholderText="дд/мм/гггг"
                        />

                        <div className="form-item">
                            <label htmlFor="costs">
                                Разходи за съответните превантивни или оздравителни мерки:
                            </label>
                            <fieldset>
                                <NumControl
                                    title={"- Заплатени пряко от отговорните страни"}
                                    name="costs-paid"
                                    mini
                                    placeHolder={"Сума заплатена пряко от отговорните страни"}
                                    value={paidCosts}
                                    setValue={setPaidCosts}
                                />
                                <NumControl
                                    title={"- Възстановени впоследствие от отговорните страни"}
                                    name="costs-reimbursed"
                                    mini
                                    placeHolder={"Сума възстановена впоследствие от отговорните страни"}
                                    value={reimbursedCosts}
                                    setValue={setReimbursedCosts}
                                />
                                <NumControl
                                    title={
                                        "- Невъзстановени от отговорните страни, като се посочват причините за невъзстановяването"
                                    }
                                    name="costs-unpaid"
                                    mini
                                    placeHolder={
                                        "Сума невъзстановена от отговорните страни, като се посочват причините за невъзстановяването"
                                    }
                                    value={unpaidCosts}
                                    setValue={setUnpaidCosts}
                                />
                                {unpaidCosts > 0 && (
                                    <TextareaControl
                                        id="costs-descr"
                                        name="costs-descr"
                                        placeholder="Причини за невъзстановяването"
                                        value={unpaidCostsDescription}
                                        setValue={setUnpaidCostsDescription}
                                    />
                                )}
                            </fieldset>
                        </div>

                        <div className="form-item">
                            <label htmlFor="payment-source">Източник за заплащане на разходите</label>
                            <CheckControl
                                name="payment-source"
                                label="Отговорeн оператор"
                                value={paymentSourceOperator}
                                setValue={setPaymentSourceOperator}
                            />
                            {!paymentSourceOperator && (
                                <TextControl
                                    name="payment-source"
                                    title="Други:"
                                    mini
                                    value={paymentSource}
                                    setValue={setPaymentSource}
                                    placeHolder="Описание на източниците на заплащане на разходите"
                                />
                            )}
                        </div>
                        <div className="form-item">
                            <label htmlFor="financial-assurance">
                                Прилагане на финансово осигуряване от застраховка, банкова гаранция, ипотека
                                или залог по чл. 43, 43а и 43б
                            </label>
                            <CheckControl
                                name="financial-assurance"
                                label="Да"
                                value={financialAssuranceUsed}
                                setValue={(e) => {
                                    setFinancialAssuranceUsed(e);
                                    setFinancialAssurance([false, false, false, false]);
                                }}
                            />
                            {financialAssuranceUsed && (
                                <fieldset>
                                    {[
                                        "от застраховка",
                                        "от банкова гаранция",
                                        "от ипотека върху недвижими имоти и/или вещни права върху тях",
                                        "от залог върху вземания, движими вещи или ценни книжа",
                                    ].map((x, idx) => (
                                        <CheckControl
                                            key={x + idx}
                                            name={x}
                                            label={x}
                                            value={financialAssurance[idx]}
                                            setValue={(v) => financialAssuranceHandler(v, idx)}
                                        />
                                    ))}
                                </fieldset>
                            )}
                        </div>

                        <NumControl
                            name="adm-costs"
                            title="Годишни административни разходи на компетентните органи по прилагане на закона"
                            value={admCosts}
                            setValue={setAdmCosts}
                        />

                        <TextareaControl
                            id="other-info"
                            name="other-info"
                            title="Друга информация"
                            value={other}
                            setValue={setOther}
                        />
                        <div className="row row-cols-auto">
                            <div className="col">
                            <input type="submit" value="Вписване" onClick={SubmitHandler} />
                            </div>
                            <div className="col">
                            <button onClick={() => navigate("/")}><i className="fa-solid fa-circle-chevron-left"></i> Обратно</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Application;
