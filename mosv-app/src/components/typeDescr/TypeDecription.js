import React, { useEffect, useState } from "react";

const TypeDescription = ({ damage, damageList, setDamageList }) => {
    const [typeOption, setTypeOption] = useState("");
    const [speciesDescription, setSpeciesDescription] = useState("");
    const [waterDescription, setWaterDescription] = useState("");
    const [soilDescription, setSoilDescription] = useState("");
    const [speciesDamageList, setSpeciesDamageList] = useState(damageList.species);
    const [waterDamageList, setWaterDamageList] = useState(damageList.water);
    const [soilDamageList, setSoilDamageList] = useState(damageList.soil);

    const open = (option) => {
        // if (option === typeOption) {
        //     setTypeOption("");
        // } else {
        setTypeOption(option);
        // }
    };
    console.log("speciesDamageList", speciesDamageList);
    const addToList = (listType) => {
        switch (listType) {
            case "onspecies":
                setSpeciesDamageList([...speciesDamageList, speciesDescription]);
                setSpeciesDescription("");
                setTypeOption("");
                break;
            case "onwater":
                setWaterDamageList([...waterDamageList, waterDescription]);
                setWaterDescription("");
                setTypeOption("");
                break;
            case "onsoil":
                setSoilDamageList([...soilDamageList, soilDescription]);
                setSoilDescription("");
                setTypeOption("");
                break;
            default:
                console.log("default");
        }
    };

    const removeItem = (listType, index) => {
        switch (listType) {
            case "onspecies":
                speciesDamageList.splice(index, 1);
                setSpeciesDamageList([...speciesDamageList]);
                break;
            case "onwater":
                waterDamageList.splice(index, 1);
                setWaterDamageList([...waterDamageList]);
                break;
            case "onsoil":
                soilDamageList.splice(index, 1);
                setSoilDamageList([...soilDamageList]);
                break;
            default:
                console.log("default");
        }
    };

    useEffect(() => {
        setDamageList({ ...damageList, species: speciesDamageList })
    }, [speciesDamageList]);
    useEffect(() => {
        setDamageList({ ...damageList, water: waterDamageList })
    }, [waterDamageList]);
    useEffect(() => {
        setDamageList({ ...damageList, soil: soilDamageList })
    }, [soilDamageList]);
    
    return (
        <div className="form-item">
            <label htmlFor="type">{`Вид на ${damage} екологични щети`}</label>
            <div className="row">
                <div className="col-xs-12 col-md-4">
                    върху защитени видове и местообитания{" "}
                    {typeOption === "onspecies" ? (
                        <>
                            <i className="fa-solid fa-circle-xmark fa-lg" onClick={() => open("")}></i>
                            <div className="row align-items-center">
                                <div className="col-10">
                                    <div className="form-item">
                                        <textarea
                                            id="type-descr"
                                            name="type-descr"
                                            rows="3"
                                            placeholder={`Описание на ${damage} екологични щети върху защитени видове и местообитания`}
                                            value={speciesDescription}
                                            onChange={(e) => setSpeciesDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col">
                                    <i
                                        className="fa-solid fa-file-circle-plus fa-lg"
                                        onClick={() => addToList("onspecies")}
                                    ></i>
                                </div>
                            </div>
                        </>
                    ) : (
                        <i className="fa-solid fa-circle-plus fa-lg" onClick={() => open("onspecies")}></i>
                    )}
                    {speciesDamageList.length > 0 && (
                        <ul>
                            {speciesDamageList.map((item, index) => (
                                <li key={index}>
                                    {item}{" "}
                                    <i
                                        className="fa-solid fa-file-circle-minus"
                                        onClick={() => removeItem("onspecies", index)}
                                    ></i>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="col-xs-12 col-md-4">
                    върху водите{" "}
                    {typeOption === "onwater" ? (
                        <>
                            <i className="fa-solid fa-circle-xmark fa-lg" onClick={() => open("")}></i>
                            <div className="row align-items-center">
                                <div className="col-10">
                                    <div className="form-item">
                                        <textarea
                                            id="type-descr"
                                            name="type-descr"
                                            rows="3"
                                            placeholder={`Описание на ${damage} екологични щети върху водите`}
                                            value={waterDescription}
                                            onChange={(e) => setWaterDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col">
                                    <i
                                        className="fa-solid fa-file-circle-plus fa-lg"
                                        onClick={() => addToList("onwater")}
                                    ></i>
                                </div>
                            </div>
                        </>
                    ) : (
                        <i className="fa-solid fa-circle-plus fa-lg" onClick={() => open("onwater")}></i>
                    )}
                    {waterDamageList.length > 0 && (
                        <ul>
                            {waterDamageList.map((item, index) => (
                                <li key={index}>
                                    {item}{" "}
                                    <i
                                        className="fa-solid fa-file-circle-minus"
                                        onClick={() => removeItem("onwater", index)}
                                    ></i>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="col-xs-12 col-md-4">
                    върху почвите{" "}
                    {typeOption === "onsoil" ? (
                        <>
                            <i className="fa-solid fa-circle-xmark fa-lg" onClick={() => open("")}></i>
                            <div className="row align-items-center">
                                <div className="col-10">
                                    <div className="form-item">
                                        <textarea
                                            id="type-descr"
                                            name="type-descr"
                                            rows="3"
                                            placeholder={`Описание на ${damage} екологични щети върху почвите`}
                                            value={soilDescription}
                                            onChange={(e) => setSoilDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col">
                                    <i
                                        className="fa-solid fa-file-circle-plus fa-lg"
                                        onClick={() => addToList("onsoil")}
                                    ></i>
                                </div>
                            </div>
                        </>
                    ) : (
                        <i className="fa-solid fa-circle-plus fa-lg" onClick={() => open("onsoil")}></i>
                    )}
                    {soilDamageList.length > 0 && (
                        <ul>
                            {soilDamageList.map((item, index) => (
                                <li key={index}>
                                    {item}{" "}
                                    <i
                                        className="fa-solid fa-file-circle-minus"
                                        onClick={() => removeItem("onsoil", index)}
                                    ></i>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TypeDescription;
