import React, { useState } from "react";
import TextControl from "../../controls/TextControl";

const emptyField = { isWrong: true, message: "Моля попълнете полето!" };
const okField = { isWrong: false, message: "" };

const CourtCaseElement = ({ name, addToList, disabled}) => {
    const [caseDescr, setCaseDescr] = useState("");
    const [complainant, setComplainant] = useState("");
    const [caseResult, setCaseResult] = useState("");
    const [caseDescrError, setCaseDescrError] = useState(okField);
    const [complainantError, setComplainantError] = useState(okField);
    const [caseResultError, setCaseResultError] = useState(okField);

    const addToListHandler = () => {
        if (!caseDescr) {
            setCaseDescrError(emptyField);
            return;
        } else {
            setCaseDescrError(okField);
        }
        if (!complainant) {
            setComplainantError(emptyField);
            return;
        } else {
            setComplainantError(okField);
        }
        if (!caseResult) {
            setCaseResultError(emptyField);
            return;
        } else {
            setCaseResultError(okField);
        }
        addToList(caseDescr, complainant, caseResult);
        setCaseDescr("");
        setComplainant("");
        setCaseResult("");
    };

    return (
        <fieldset>
            <div className="row align-items-center">
                <div className="col-10">
                    <TextControl
                        name={`${name}-descr`}
                        title={"Описание на образуваните досъдебни производства или съдебни дела"}
                        placeHolder="Въведете описание на образувани производства или дела"
                        value={caseDescr}
                        setValue={setCaseDescr}
                        mini
                        errors={caseDescrError}
                        disabled={disabled}
                    />

                    <TextControl
                        name={`${name}-complainant`}
                        title={"Ищци"}
                        placeHolder="Въведете ищци по образуваните производства или дела"
                        value={complainant}
                        setValue={setComplainant}
                        mini
                        errors={complainantError}
                        disabled={disabled}
                    />

                    <TextControl
                        name={`${name}-results`}
                        title={"Резултат от досъдебните производства или съдебните дела"}
                        placeHolder="Въведете резултати от досъдебните производства или съдебните дела"
                        value={caseResult}
                        setValue={setCaseResult}
                        mini
                        errors={caseResultError}
                        disabled={disabled}
                    />
                </div>
                <div className="col-2" style={{ textAlign: "center" }}>
                    <i className="fa-solid fa-file-circle-plus fa-2x" onClick={addToListHandler}></i>
                </div>
            </div>
        </fieldset>
    );
};

export default CourtCaseElement;
