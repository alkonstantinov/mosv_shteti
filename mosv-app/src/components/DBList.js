import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "../controls/Pagination";
import SelectControl from "../controls/SelectControl";
import ServerRequest from "../http/ServerRequest";

const PAGE_SIZE = 3;

const DBList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [docList, setDocList] = useState([]);
    const [startIndex, setStartIndex] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [totalRecs, setTotalRecs] = useState(1);
    const pageSizeMenu = { 3: "3", 5: "5", 10: "10", 20: "20", 50: "50" };

    const askServer = useCallback((id, pageSize, startIndex) => {
        if (id === "menace") {
            ServerRequest().get("Main/MenaceGetAll", { startIndex: startIndex, count: pageSize }, setDocList);
            ServerRequest().get("Main/GetRecordsCount", { isDamage: false }, setTotalRecs);
        } else if (id === "damage") {
            ServerRequest().get("Main/DamageGetAll", { startIndex: startIndex, count: pageSize }, setDocList);
            ServerRequest().get("Main/GetRecordsCount", { isDamage: true }, setTotalRecs);
        }
    }, []);

    useEffect(() => {
        askServer(id, pageSize, startIndex);
    }, [pageSize, startIndex]);

    useEffect(() => {
        if (id && id !== "damage") {
            navigate("/list/menace");
            setPageSize(PAGE_SIZE);
        } else {
            navigate("/list/damage");
            setPageSize(PAGE_SIZE);
        }

        askServer(id, PAGE_SIZE, 1);
    }, [id]);

    console.log(docList);
    return (
        <main>
            <div className="container">
                <div className="row text-center">
                    <h1>Заявяване от РИОСВ на информация за екологични щети</h1>
                </div>
            </div>
            <hr />
            <div className="wrapper">
                <div className="content">
                    <ul className="nav nav-tabs justify-content-center" role="tablist">
                        <li className="nav-item" role="presentation">
                            <Link
                                className={`nav-link ${!id || id === "damage" ? "active" : ""}`}
                                aria-current="page"
                                to={"/list/damage"}
                                role="tab"
                            >
                                Екологична щета
                            </Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link
                                className={`nav-link ${id === "menace" ? "active" : ""}`}
                                to={"/list/menace"}
                                role="tab"
                            >
                                Заплаха за екологична щета
                            </Link>
                        </li>
                    </ul>
                    <div className="row justify-content-end mt15 mb15">
                        <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                            <SelectControl
                                name="page-size"
                                title="Брой записи на страница:  "
                                oneRow
                                value={pageSize}
                                setValue={setPageSize}
                                listObject={pageSizeMenu}
                            />
                        </div>
                    </div>
                    {docList &&
                        docList.length > 0 &&
                        docList.map((doc) => {
                            return (
                                <div className="row" key={doc.mainTableId}>
                                    <div className="col">Дата на запис: {doc.createdOn}</div>
                                    <div className="col">Дата на появяване: {doc.appearanceDate}</div>
                                    <div className="col">
                                        Дата на откриване на процедура: {doc.procedureDate}
                                    </div>
                                    <div className="col">
                                        <button>Генериране на справка</button>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })}
                </div>
                <div className="row justify-content-center react-datepicker__tab-loop">
                    <Pagination
                        totalRecs={totalRecs}
                        indexes={[startIndex, setStartIndex]}
                        pageSize={pageSize}
                    />
                </div>
            </div>
        </main>
    );
};

export default DBList;
