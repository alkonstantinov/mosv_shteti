import React, { useState } from "react";
import TypeDescrElement from "./TypeDescrElement";

const TypeDescription = ({ damage, damageList, setDamageList }) => {
    const [typeOption, setTypeOption] = useState("");

    let allDamagesList = Object.keys(damageList);
    return (
        <div className="form-item">
            <label htmlFor="type">{`Вид на ${damage} екологични щети`}</label>
            <div className="row">
                {allDamagesList.length > 0 &&
                    allDamagesList.map((x, idx) => (
                        <TypeDescrElement
                            key={x + idx}
                            damage={damage}
                            typeOption={typeOption}
                            setTypeOption={setTypeOption}
                            option={x}
                            allDamagesList={damageList}
                            setAllDamagesList={setDamageList}
                        />
                    ))}
            </div>
        </div>
    );
};

export default TypeDescription;
