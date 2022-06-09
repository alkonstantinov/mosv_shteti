import React, { useState } from "react";
import TypeDescription from "./typeDescr/TypeDecription";

const Application = () => {
    const [damage, setDamage] = useState(false);
    const [damageList, setDamageList] = useState({
        species: [],
        water: [],
        soil: [],
    });
    const [appearanceDate, setAppearanceDate] = useState(new Date().toISOString().slice(0, 10));

    let isMenace = !damage ? "непосредствената заплаха за" : "причинените";
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
                            damage={isMenace}
                            damageList={damageList}
                            setDamageList={setDamageList}
                        />

                        <div className="form-item">
                            <label htmlFor="start-date">
                                {`Дата на възникване на ${isMenace} екологични щети и/или датата, на която това е установено`}
                            </label>

                            <input
                                type="date"
                                // lang="bg-BG"
                                id="start-date"
                                name="start-date"
                                value={appearanceDate}
                                min="2000-01-01"
                                max="2999-12-31"
                                placeholder="dd-mm-yyyy"
                                onChange={(e) => setAppearanceDate(e.target.value)}
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="type">
                                Дейност съгласно приложение № 1, в резултат на която е възникнала
                                непосредствената заплаха за екологични щети или са причинени екологични щети
                            </label>
                            <div className="select">
                                <select id="type" name="type">
                                    <option value="title">Изберете</option>
                                    <option value="1">
                                        Експлоатация на инсталации и съоръжения, за които се изисква издаване
                                        на комплексно разрешително по чл. 117 от ЗООС
                                    </option>
                                    <option value="2">
                                        За дейности по събиране, транспортиране, оползотворяване или
                                        обезвреждане на отпадъци
                                    </option>
                                    <option value="3">
                                        Извършване на дейности по използване на водите и водните обекти
                                    </option>
                                    <option value="4">
                                        Извършване на дейности по производство, употреба, съхранение,
                                        обработка, пълнене и изпускане в околната среда на химични вещества и
                                        смеси
                                    </option>
                                    <option value="5">
                                        Извършване на дейности по производство, употреба, съхранение,
                                        обработка, пълнене и изпускане в околната среда на продукти за
                                        растителна защита
                                    </option>
                                    <option value="6">
                                        Извършване на дейности по производство, употреба, съхранение,
                                        обработка, пълнене и изпускане в околната среда на биоциди
                                    </option>
                                    <option value="7">
                                        Извършване на дейности по превоз на опасни товари
                                    </option>
                                    <option value="8">
                                        Извършване на дейности по работа с генетично модифицирани организми
                                        (ГМО)
                                    </option>
                                    <option value="9">
                                        Извършване на дейности по превоз на отпадъци, в т.ч. внос, износ и
                                        транзит на отпадъци
                                    </option>
                                    <option value="10">
                                        Извършване на дейности по управление на минните отпадъци
                                    </option>
                                    <option value="11">
                                        Експлоатация на места за съхранение в съответствие със Закона за
                                        съхранение на въглероден диоксид в земните недра
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="form-item">
                            <label htmlFor="start date">
                                Дата, на която е започнала процедура за предотвратяване или отстраняване на
                                непосредствена заплаха за екологични щети или на причинените екологични щети
                            </label>
                            <input
                                type="date"
                                lang="bg-BG"
                                id="start date"
                                name="start date"
                                value="2022-01-01"
                                min="2000-01-01"
                                max="2999-12-31"
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="applicant">
                                Заявител на процедурата по предотвратяване или отстраняване на непосредствена
                                заплаха за екологични щети или на причинени екологични щети - отговорен
                                оператор, компетентен орган или представител на обществеността
                            </label>
                            <input type="text" id="applicant" name="applicant" placeholder="Заявител" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="kid2008">
                                Класификационен код по Класификацията на икономическите дейности на
                                Националния статистически институт на дейността, в резултат на която е
                                настъпила екологичната щета
                            </label>
                            <div className="select">
                                <select id="kid2008" name="kid2008">
                                    <option value="title">Изберете класификационен код по КИД-2008</option>
                                    <option value="location1">Черна металургия</option>
                                    <option value="location1">Военна промишленост</option>
                                    <option value="location1">Корабоплаване</option>
                                    <option value="location1">Транспорт и логистика</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-item">
                            <label htmlFor="court-proceedings">
                                Образувани досъдебни производства или съдебни дела във връзка с непосредствена
                                заплаха за екологични щети или с причинени екологични щети
                            </label>
                            <input
                                type="text"
                                id="court-proceedings"
                                name="court-proceedings"
                                placeholder="Образувани производства или дела"
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="proceedings-results">
                                Резултат от досъдебните производства или съдебните дела
                            </label>
                            <input
                                type="text"
                                id="proceedings-results"
                                name="proceedings-results"
                                placeholder="Резултати от досъдебните производства или съдебните дела"
                            />
                        </div>
                        <div className="form-item">
                            <label htmlFor="prevention-result">
                                Резултат от процедурата по предотвратяване на непосредствената заплаха за
                                екологични щети или на екологичните щети
                            </label>
                            <div className="select">
                                <select id="prevention-result" name="prevention-result">
                                    <option value="title">Изберете</option>
                                    <option value="loc">върху защитени видове и местообитания</option>
                                    <option value="loc">върху водите</option>
                                    <option value="loc">върху почвите</option>
                                </select>
                            </div>
                            <textarea
                                id="prevention-result-descr"
                                name="prevention-result-descr"
                                placeholder="Описание"
                            ></textarea>
                        </div>
                        <div className="form-item">
                            <label htmlFor="removal-result">
                                Резултат от процедурата по отстраняване на непосредствената заплаха за
                                екологични щети или на екологичните щети
                            </label>
                            <div className="select">
                                <select id="removal-result" name="removal-result">
                                    <option value="title">Изберете</option>
                                    <option value="loc">върху защитени видове и местообитания</option>
                                    <option value="loc">върху водите</option>
                                    <option value="loc">върху почвите</option>
                                </select>
                            </div>
                            <textarea
                                id="removal-result-descr"
                                name="removal-result-descr"
                                placeholder="Описание"
                            ></textarea>
                        </div>
                        <div className="form-item">
                            <label htmlFor="end-date">
                                Дата на приключване на процедурата по предотвратяване или отстраняване на
                                непосредствената заплаха за екологични щети или на причинените екологични щети
                            </label>
                            <input
                                type="date"
                                lang="bg-BG"
                                id="end-date"
                                name="end-date"
                                value="2022-01-01"
                                min="2000-01-01"
                                max="2999-12-31"
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
