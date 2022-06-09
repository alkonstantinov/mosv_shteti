import React, { useEffect, useState } from "react";
import translations from "../../utils/translations";

const TypeDescrElement = ({ damage, typeOption, setTypeOption, option, setAllDamagesList, allDamagesList }) => {
    const [description, setDescription] = useState("");
    const [damageList, setDamageList] = useState(allDamagesList[option]);
    const textElement = translations.types[option]
    // option = "species"
    const open = (opt) => {
        setTypeOption(opt);
    };

    const addToList = () => {
        setDamageList([...damageList, description]);
        setDescription("");
        setTypeOption("");
    };

    const removeItem = (index) => {
        damageList.splice(index, 1);
        setDamageList([...damageList]);
    };

    useEffect(() => {
        allDamagesList[option] = damageList;
        setAllDamagesList({ ...allDamagesList })
    }, [damageList]);
    return (
        <div id="type-descr" className="col-xs-12 col-md-4">
            {textElement}{" "}
            {typeOption === option ? (
                <>
                    <i className="fa-solid fa-circle-xmark fa-lg" onClick={() => { open(""); setDescription(""); }}></i>
                    <div className="row align-items-center">
                        <div className="col-10">
                            <div className="form-item">
                                <textarea
                                    id="type-descr"
                                    name="type-descr"
                                    rows="3"
                                    placeholder={`Описание на ${damage} екологични щети ${textElement}`}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="col">
                            <i className="fa-solid fa-file-circle-plus fa-lg" onClick={addToList}></i>
                        </div>
                    </div>
                </>
            ) : (
                <i className="fa-solid fa-circle-plus fa-lg" onClick={() => open(option)}></i>
            )}
            {damageList.length > 0 && (
                <ul>
                    {damageList.map((item, index) => (
                        <li key={index}>
                            {item}{" "}
                            <i
                                className="fa-solid fa-file-circle-minus"
                                onClick={() => removeItem(index)}
                            ></i>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TypeDescrElement;
