import React, { useState } from "react";
import TypeDescription from "./typeDescr/TypeDecription";
import Calendar from "../controls/Calendar";
import SelectControl from "../controls/SelectControl";
import translations from "../utils/translations";
import TextControl from "../controls/TextControl";
import CourtCases from "./courtCases/CourtCases";

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

    let isMenace = !damage ? "непосредствената заплаха за" : "причинените";

    // console.log("kid", kid);
    console.log("damageList", damageList);
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
                            title={`Вид на ${damage} екологични щети`}
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
                            damageList={preventResultsList}
                            setDamageList={setPreventResultsList}
                        />
                        
                        <TypeDescription
                            name="removal-result"
                            title={`Резултат от процедурата по отстраняване на ${isMenace} екологичните щети`}
                            damage={isMenace}
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
                            />
                        </div>
                        
                        <div className="form-item">
                            <label htmlFor="costs">
                                Разходи за съответните превантивни или оздравителни мерки
                            </label>
                            <input
                                type="number"
                                id="costs-paid"
                                name="costs-paid"
                                step="0.01"
                                placeholder="заплатени пряко от отговорните страни"
                            />
                            {/* <span className="validity"></span> */}
                            <input
                                type="number"
                                id="costs-reimbursed"
                                name="costs-reimbursed"
                                step="0.01"
                                placeholder="възстановени впоследствие от отговорните страни"
                            />
                            <input
                                type="number"
                                id="costs-unpaid"
                                name="costs-unpaid"
                                step="0.01"
                                placeholder="невъзстановени от отговорните страни, като се посочват причините за невъзстановяването"
                            />
                            {/* <span className="validity"></span> */}
                            <textarea
                                id="costs-descr"
                                name="costs-descr"
                                placeholder="Причини за невъзстановяването"
                            ></textarea>
                        </div>
                        <div className="form-item">
                            <label htmlFor="payment-source">Източник за заплащане на разходите</label>
                            <input type="text" id="payment-source" name="payment-source" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="add-payment-source">
                                Прилагане на финансово осигуряване от застраховка, банкова гаранция, ипотека
                                или залог по чл. 43, 43а и 43б
                            </label>
                            <input type="text" id="add-payment-source" name="add-payment-source" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="adm-costs">
                                Годишни административни разходи на компетентните органи по прилагане на закона
                            </label>
                            <input type="number" id="adm-costs" name="adm-costs" step="0.01" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="other-info">Друга информация</label>
                            <textarea id="other-info" name="other-info"></textarea>
                        </div>
                        <div>
                            <input type="submit" value="Вписване" />
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Application;
