import React, { useState } from "react";
import TypeDescrElement from "./TypeDescrElement";

const TypeDescription = ({ title, name, damage, damageList, setDamageList, resultsType, errors }) => {
    const [typeOption, setTypeOption] = useState("");

    let allDamagesList = Object.keys(damageList);
    return (
        <div className="form-item">
            <label htmlFor={name}>{title}</label>
            <div className="row">
                {allDamagesList.length > 0 &&
                    allDamagesList.map((x, idx) => (
                        <TypeDescrElement
                            key={x + idx}
                            damage={damage}
                            typeOption={typeOption}
                            setTypeOption={setTypeOption}
                            option={x}
                            isResults={resultsType}
                            allDamagesList={damageList}
                            setAllDamagesList={setDamageList}
                        />
                    ))}
            </div>
            {errors && errors.isWrong && <label className="mini red">{errors.message}</label>}
        </div>
    );
};

export default TypeDescription;
