import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServerRequest from "../http/ServerRequest";
import translations from "../utils/translations";
import { format } from "date-fns";

const GenerateDoc = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [activitiesMenu, setActivitiesMenu] = useState([]);

    useEffect(() => {
        if (id) {
            ServerRequest().get("Main/MainTableGetById", { id }, setData);
        }
    }, [id]);

    useEffect(() => {
        ServerRequest().get("ActivityType/ActivitiesGetAll", {}, setActivitiesMenu);
    }, []);

    const dList = data && JSON.parse(data.damageList);
    const activityType =
        data && activitiesMenu && activitiesMenu.find((x) => x.activityTypeId === data.activityTypeId);
    const court = data && JSON.parse(data.courtCases);
    const removalProcedure = data && JSON.parse(data.removalResultsList);
    console.log("removalProcedure", removalProcedure && removalProcedure);

    const tableFilled = data && dList && (
        <div className="table-responsive mt15">
            <table className="table table-bordered border-secondary">
                <thead>
                    <tr align="center">
                        <th scope="col">{"№"}</th>
                        <th scope="col">{"Въпроси"}</th>
                        <th scope="col">{"Данни"}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" rowSpan={Object.keys(dList).length + 1}>
                            1.
                        </th>
                        <td>
                            {`Вид на ${
                                data.isDamage
                                    ? "екологичните"
                                    : "непосредствената заплаха за възникване на екологични"
                            } щети, дата на възникването и/или откриването на ${
                                data.isDamage ? "щетите" : "непосредствената заплаха"
                            } и дата,
                            на която е започнала процедурата съгласно директивата`}
                        </td>
                        <td>
                            {Object.keys(dList)
                                .map((key) => dList[key])
                                .reduce((acc, currentValue) => acc + currentValue.length, 0)}
                        </td>
                    </tr>
                    {Object.keys(dList).map((option) => (
                        <tr key={option}>
                            <td>{`${data.isDamage ? "щети" : "заплаха"} ${translations.types[option]}`}</td>
                            <td>{dList[option].length}</td>
                        </tr>
                    ))}
                    <tr>
                        <th scope="row">2.</th>
                        <td>Класификационен код на дейността на отговорното юридическо лице/а</td>
                        <td>{activityType && activityType.activityTypeNameBG}</td>
                    </tr>
                    <tr>
                        <th scope="row">3.</th>
                        <td>
                            Дали се е прибягнало до процедури за съдебен преглед от отговорните страни или
                            имащи това право лица (да се посочат ищците и резултатът от процедурата)
                        </td>
                        <td>
                            <p>{`${court && court.length > 0 ? "Да" : "Не"}`}</p>{" "}
                            <ol>
                                {court &&
                                    court.length > 0 &&
                                    court.map((ccase, idx) => (
                                        <li key={idx}>{`Дело: "${ccase.description}", с ищци: ${ccase.complainant} и резултат: "${ccase.result}"`}</li>
                                    ))}
                            </ol>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">4.</th>
                        <td>Резултат от процеса на отстраняване</td>
                        <td>{removalProcedure && <ul>{Object.keys(removalProcedure).map((x, idx) => (removalProcedure[x].length > 0 && <li key={idx}>{`${translations.types[x]}: ${removalProcedure[x].join(", ")}` }</li>))}</ul>}</td>
                    </tr>
                    <tr>
                        <th scope="row">5.</th>
                        <td>Дата на приключване на процедурата</td>
                        <td>{data && format(new Date(data.endDate), "dd/MM/yyyy")}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
    console.log("data", data);
    return (
        <main>
            <div className="container">
                <div className="row text-center">
                    <h1>Антоматично генериране на запис</h1>
                </div>
            </div>
            <hr />
            <div className="wrapper">
                <div className="content">
                    <div className="row justify-content-end">
                        <div className="col-2">
                            <button
                                onClick={() =>
                                    navigate(`/list/${data && data.isDamage ? "damage" : "menace"}`)
                                }
                            >
                                <i className="fa-solid fa-circle-chevron-left"></i> Обратно
                            </button>
                        </div>
                    </div>
                    {tableFilled}
                </div>
            </div>
        </main>
    );
};

export default GenerateDoc;
