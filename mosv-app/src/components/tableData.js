import React from "react";
import translations from "../utils/translations";
import { format } from "date-fns";

const TableData = ({ data, kidMenu }) => {
    const dList = data && JSON.parse(data.damageList);
    // const activityType =
    //     data && activitiesMenu && activitiesMenu.find((x) => x.activityTypeId === data.activityTypeId);
    const kid =
        data && kidMenu && kidMenu.find((x) => x.kidId === data.kidId);
    const court = data && JSON.parse(data.courtCases);
    const removalProcedure = data && JSON.parse(data.removalResultsList);

    return (
        data && (
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                <table style={{ width: "100%", marginBottom: "1rem", color: "#212529" }}>
                    <thead style={{ verticalAlign: "bottom" }}>
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
                                <strong>
                                    <em>
                                        {`Вид на ${
                                            data.isDamage
                                                ? "екологичните"
                                                : "непосредствената заплаха за възникване на екологични"
                                        } щети, дата на възникването и/или откриването на ${
                                            data.isDamage ? "щетите" : "непосредствената заплаха"
                                        } и дата,
                    на която е започнала процедурата съгласно директивата`}
                                    </em>
                                </strong>
                            </td>
                            <td>
                                {Object.keys(dList)
                                    .map((key) => dList[key])
                                    .reduce((acc, currentValue) => acc + currentValue.length, 0)}
                            </td>
                        </tr>
                        {Object.keys(dList)
                            .sort((a, b) => (a.length > b.length ? -1 : 0))
                            .map((option) => (
                                <tr key={option}>
                                    <td>{`${data.isDamage ? "щети" : "заплаха"} ${
                                        translations.types[option]
                                    }`}</td>
                                    <td>{dList[option].length}</td>
                                </tr>
                            ))}
                        <tr>
                            <th scope="row">2.</th>
                            <td>
                                <strong>
                                    <em>Класификационен код на дейността на отговорното юридическо лице/а</em>
                                </strong>
                            </td>
                            <td>{kid && kid.kidLabelBg}</td>
                        </tr>
                        <tr>
                            <th scope="row">3.</th>
                            <td>
                                <strong>
                                    <em>
                                        Дали се е прибягнало до процедури за съдебен преглед от отговорните
                                        страни или имащи това право лица (да се посочат ищците и резултатът от
                                        процедурата)
                                    </em>
                                </strong>
                            </td>
                            <td>
                                <p>{`${court && court.length > 0 ? "Да" : "Не"}`}</p>{" "}
                                <ol>
                                    {court &&
                                        court.length > 0 &&
                                        court.map((ccase, idx) => (
                                            <li
                                                key={idx}
                                            >{`Дело: "${ccase.description}", с ищци: ${ccase.complainant} и резултат: "${ccase.result}"`}</li>
                                        ))}
                                </ol>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">4.</th>
                            <td>
                                <strong>
                                    <em>Резултат от процеса на отстраняване</em>
                                </strong>
                            </td>
                            <td>
                                {removalProcedure && (
                                    <ul>
                                        {Object.keys(removalProcedure).map(
                                            (x, idx) =>
                                                removalProcedure[x].length > 0 && (
                                                    <li key={idx}>{`${
                                                        translations.types[x]
                                                    }: ${removalProcedure[x].join(", ")}`}</li>
                                                )
                                        )}
                                    </ul>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">5.</th>
                            <td>
                                <strong>
                                    <em>Дата на приключване на процедурата</em>
                                </strong>
                            </td>
                            <td>{data && data.endDate > new Date("1000-01-01") ? format(new Date(data.endDate), "dd/MM/yyyy") : ""}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    );
};

export default TableData;
