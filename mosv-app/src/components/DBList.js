import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "../controls/Pagination";
import SelectControl from "../controls/SelectControl";
import ServerRequest from "../http/ServerRequest";
import { format } from 'date-fns'

const PAGE_SIZE = 3;
const MAX_COUNT = 1000000;
const START_INDEX = 1;

const DBList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [docList, setDocList] = useState([]);
    const [startIndex, setStartIndex] = useState(START_INDEX);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [totalRecs, setTotalRecs] = useState(START_INDEX);
    const pageSizeMenu = { 3: "3", 5: "5", 10: "10", 20: "20", 50: "50" };
    
    const [kidMenu, setKidMenu] = useState([]);

    const askServer = useCallback((id, pageSize, startIndex) => {
        if (id === "menace") {
            ServerRequest().get("Main/MenaceGetAll", { startIndex: startIndex, count: pageSize }, setDocList);
            ServerRequest().get("Main/GetRecordsCount", { isDamage: false }, setTotalRecs);
        } else if (id === "damage") {
            ServerRequest().get("Main/DamageGetAll", { startIndex: startIndex, count: pageSize }, setDocList);
            ServerRequest().get("Main/GetRecordsCount", { isDamage: true }, setTotalRecs);
        } else {
            ServerRequest().get("Main/MainTableGetAll", { startIndex: START_INDEX, count: MAX_COUNT }, (r) => {
                setTotalRecs(r.length);
            });
            ServerRequest().get("Main/MainTableGetAll", { startIndex: startIndex, count: pageSize }, setDocList);
        }
    }, []);

    useEffect(() => {
        askServer(id, pageSize, startIndex);
    }, [pageSize, startIndex]);

    useEffect(() => {
        askServer(id, pageSize, START_INDEX);
    }, [pageSize]);

    useEffect(() => {   
        setPageSize(PAGE_SIZE);
        setStartIndex(START_INDEX);
        askServer(id, PAGE_SIZE, START_INDEX);
    }, [id]);

    useEffect(() => {
        ServerRequest().get("Kid/KIDGetAll", {}, setKidMenu);
    }, []);

    return (
        <main>
            <div className="container">
                <div className="row text-center">
                    <h1>Списък с подадени заявления</h1>
                </div>
            </div>
            <hr />
            <div className="wrapper">
                <div className="content">
                    <div className="row justify-content-end">
                        <div className="col-2">
                            <button onClick={() => navigate("/")}><i className="fa-solid fa-circle-chevron-left"></i> Обратно</button>
                        </div>
                    </div>
                    <ul className="nav nav-tabs justify-content-center" role="tablist">
                        <li className="nav-item" role="presentation">
                            <Link
                                className={`nav-link ${!id ? "active" : ""}`}
                                aria-current="page"
                                to={"/list"}
                                role="tab"
                                >
                                Общо
                            </Link>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link
                                className={`nav-link ${id === "damage" ? "active" : ""}`}
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
                    <div className="row">
                        <div className="col-xs-12 col-sm-2">
                            <b>Дата на последна промяна:</b>
                        </div>
                        <div className="col-xs-12 col-sm-2">
                            <b>Дата на появяване на заплахата/щетата: </b>
                        </div>
                        <div className="col-xs-12 col-sm-2">
                            <b>Дата на откриване на процедура: </b>
                        </div>
                        <div className="col-xs-12 col-sm-3">
                            <b>Класификационен код на дейността:</b>
                        </div>
                        <div className="col-xs-12 col-sm-3">
                            {" "} 
                        </div>
                    </div>
                        <hr />
                    {docList &&
                        docList.length > 0 &&
                        docList.map((doc) => {
                            const kid = doc && kidMenu && kidMenu.find((x) => x.kidId === doc.kidId);
                            return (
                                <div className="row" key={doc.mainTableId}>
                                    <div className="col-xs-12 col-sm-2">{format(new Date(doc.changedOn), 'dd/MM/yyyy')}</div>
                                    <div className="col-xs-12 col-sm-2">{format(new Date(doc.appearanceDate), 'dd/MM/yyyy')}</div>
                                    <div className="col-xs-12 col-sm-2">
                                        {format(new Date(doc.procedureDate), 'dd/MM/yyyy')}
                                    </div>
                                    <div className="col-xs-12 col-sm-3">
                                        {kid && kid.kidLabelBg}
                                    </div>
                                    <div className="col-xs-12 col-sm-3">
                                        <button onClick={() => navigate(`/generate/${doc.mainTableId}`)}>Генериране на справка</button>
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
