import React, { useState } from "react";
import CheckControl from "../../controls/CheckContorl";
import CourtCaseElement from "./CourtCaseElement";

const CourtCases = ({ name, title, checkLabel = "Да", courtCases, setCourtCases, disabled }) => {
    const [hasCourtCases, setHasCourtCases] = useState(courtCases.length > 0);

    const addToList = (caseDescr, complainant, caseResult) => {
        if (!caseDescr || !complainant || !caseResult) {
            return;
        }
        const newCase = { description: caseDescr, complainant, result: caseResult };
        setCourtCases([...courtCases, newCase]);
    };

    const removeItem = (index) => {
        courtCases.splice(index, 1);
        setCourtCases([...courtCases]);
    };
    return (
        <div className={`form-item${disabled ? " disabled" : ""}`}>
            <label htmlFor={name}>{title}</label>
            <CheckControl
                name={`check_${name}`}
                label={checkLabel}
                value={hasCourtCases}
                setValue={setHasCourtCases}
                disabled={disabled}
            />
            {hasCourtCases && courtCases.length > 0 && (
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Описание</th>
                                <th scope="col">Ищци</th>
                                <th scope="col">Резултати</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {courtCases.map((cc, idx) => (
                                <tr key={idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td>{cc.description}</td>
                                    <td>{cc.complainant}</td>
                                    <td>{cc.result}</td>
                                    <th scope="row">
                                        <i
                                            className="fa-solid fa-file-circle-minus"
                                            onClick={() => removeItem(idx)}
                                        ></i>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {hasCourtCases && <CourtCaseElement name={name} addToList={addToList} disabled={disabled}/>}
        </div>
    );
};

export default CourtCases;
