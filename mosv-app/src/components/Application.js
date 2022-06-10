import React, { useState } from "react";
import TypeDescription from "./typeDescr/TypeDecription";
import Calendar from "../controls/Calendar";
import SelectControl from "../controls/SelectControl";
import translations from "../utils/translations";
import TextControl from "../controls/TextControl";
import CourtCases from "./courtCases/CourtCases";
import NumControl from "../controls/NumControl";
import TextareaControl from "../controls/TextareaControl";
import CheckControl from "../controls/CheckContorl";

const Application = () => {
    const [damage, setDamage] = useState(false);
    const [damageList, setDamageList] = useState({
        species: [],
        water: [],
        soil: [],
    });
    const [appearanceDate, setAppearanceDate] = useState(new Date());
    const [procedureDate, setProcedureDate] = useState(new Date());
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
    const [endDate, setEndDate] = useState(new Date());
    const [paidCosts, setPaidCosts] = useState(0);
    const [reimbursedCosts, setReimbursedCosts] = useState(0);
    const [unpaidCosts, setUnpaidCosts] = useState(0);
    const [unpaidCostsDescription, setUnpaidCostsDescription] = useState("");
    const [paymentSourceOperator, setPaymentSourceOperator] = useState(true);
    const [paymentSource, setPaymentSource] = useState("");
    const [financialAssuranceUsed, setFinancialAssuranceUsed] = useState(false);
    const [financialAssurance, setFinancialAssurance] = useState([false, false, false, false]);
    const [admCosts, setAdmCosts] = useState(0);
    const [others, setOthers] = useState("");

    let isMenace = !damage ? "непосредствената заплаха за" : "причинените";

    const financialAssuranceHandler = (v, idx) => {
        financialAssurance[idx] = v;
        setFinancialAssurance([...financialAssurance]);
    };
    // console.log("kid", kid);

    const SubmitHandler = (e) => {
        e.preventDefault();

        console.log(e);
    }
    return (
        <main>
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <h1>Заявяване от РИОСВ на информация за екологични щети</h1>
                </div>
            </div>
            <hr />
            <div className="wrapper">
                <div className="content">
                    <form action="">
                        {/* IMPORTANT When disable input, put class .disabled in the .form-item class */}
                        <div className="form-check form-check-inline">
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
                        </div>

                        <TypeDescription
                            name="type"
                            title={`Вид на ${isMenace} екологични щети`}
                            damage={isMenace}
                            damageList={damageList}
                            setDamageList={setDamageList}
                        />

                        <div className="form-item">
                            <label htmlFor="start-date">
                                {`Дата на възникване на ${isMenace} екологични щети и/или датата, на която това е установено`}
                            </label>
                            <Calendar
                                id="start-date"
                                value={appearanceDate}
                                setValue={setAppearanceDate}
                                locale="bg"
                            />
                        </div>

                        <SelectControl
                            name="type"
                            title={`Дейност съгласно приложение № 1, в резултат на която ${
                                damage ? "са" : "е възникнала"
                            }
                                ${isMenace} екологични щети`}
                            listObject={translations.activities}
                            placeHolder="Изберете"
                            value={activity}
                            setValue={setActivity}
                        />

                        <div className="form-item">
                            <label htmlFor="procedure-date">
                                {`Дата, на която е започнала процедура за предотвратяване или отстраняване на
                                ${isMenace} екологични щети`}
                            </label>
                            <Calendar
                                id="procedure-date"
                                value={procedureDate}
                                setValue={setProcedureDate}
                                locale="bg"
                            />
                        </div>

                        <TextControl
                            name="applicant"
                            title={`Заявител на процедурата по предотвратяване или отстраняване на ${isMenace} екологични щети - отговорен
                            оператор, компетентен орган или представител на обществеността`}
                            placeHolder="Заявител - отговорен оператор, компетентен орган или представител на обществеността"
                            value={applicant}
                            setValue={setApplicant}
                        />

                        <SelectControl
                            name="kid2008"
                            title={`Класификационен код по Класификацията на икономическите дейности на
                            Националния статистически институт на дейността, в резултат на която е
                            настъпила екологичната щета`}
                            listObject={translations.kid}
                            placeHolder="Изберете класификационен код по КИД-2008"
                            value={kid}
                            setValue={setKid}
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

                        <div className="form-item">
                            <label htmlFor="end-date">
                                {`Дата на приключване на процедурата по предотвратяване или отстраняване на ${isMenace} екологични щети`}
                            </label>
                            <Calendar
                                id="end-date"
                                value={endDate}
                                setValue={setEndDate}
                                locale="bg"
                                min={procedureDate}
                            />
                        </div>

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
                            value={others}
                            setValue={setOthers}
                        />
                        <div>
                            <input type="submit" value="Вписване" onClick={SubmitHandler}/>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Application;
