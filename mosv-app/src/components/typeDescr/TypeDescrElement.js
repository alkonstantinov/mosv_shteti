import React, { useEffect, useState } from "react";
import translations from "../../utils/translations";

const TypeDescrElement = ({
    damage,
    typeOption,
    setTypeOption,
    option,
    setAllDamagesList,
    allDamagesList,
    isResults,
}) => {
    const [description, setDescription] = useState("");
    const [damageList, setDamageList] = useState(allDamagesList[option]);

    const [tmpIdx, setTmpIdx] = useState(null);
    const textElement = translations.types[option];
    // option = "species"
    const open = (opt) => {
        setTypeOption(opt);
    };

    const addToList = () => {
        if (description.trim()) {
            if (tmpIdx !== null) {
                damageList.splice(tmpIdx, 0, description);
                setDamageList([...damageList]);
                setTmpIdx(null);
            } else {
                setDamageList([...damageList, description]);
            }
            setDescription("");
            setTypeOption("");
        }
    };

    const editItem = (index, option) => {
        setDescription(damageList[index]);
        setTypeOption(option);
        damageList.splice(index, 1);
        setDamageList([...damageList]);
        setTmpIdx(index);
    }

    const removeItem = (index) => {
        damageList.splice(index, 1);
        setDamageList([...damageList]);
    };

    useEffect(() => {
        allDamagesList[option] = damageList;
        setAllDamagesList({ ...allDamagesList });
    }, [damageList]);
    return (
        <div id="type-descr" className="col-xs-12 col-md-4">
            {textElement}{" "}
            {typeOption === option ? (
                <>
                    <i
                        className="fa-solid fa-circle-xmark fa-lg"
                        onClick={() => {
                            open("");
                            setDescription("");
                        }}
                    ></i>
                    <div className="row align-items-center">
                        <div className="col-10">
                            <div className="form-item">
                                <textarea
                                    id="type-descr"
                                    name="type-descr"
                                    rows="3"
                                    placeholder={`Описание${
                                        isResults ? isResults : ""
                                    } на ${damage} екологични щети ${textElement}`}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="col">
                            <i
                                className="fa-solid fa-file-circle-plus fa-lg"
                                onClick={addToList}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Запис"
                            ></i>
                        </div>
                    </div>
                </>
            ) : (
                <i
                    className="fa-solid fa-circle-plus fa-lg"
                    onClick={() => open(option)}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Добавяне"
                ></i>
            )}
            {damageList.length > 0 && (
                <ul>
                    {damageList.map((item, index) => (
                        <li key={index}>
                            {item}{" "}
                            <i
                                className="fa-solid fa-file-pen"
                                onClick={() => editItem(index, option)}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Промяна"
                            ></i>{" "}
                            <i
                                className="fa-solid fa-file-circle-minus"
                                onClick={() => removeItem(index)}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Изтриване"
                            ></i>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TypeDescrElement;
