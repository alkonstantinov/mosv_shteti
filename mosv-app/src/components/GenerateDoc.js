import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useNavigate, useParams } from "react-router-dom";
import ServerRequest from "../http/ServerRequest";
import WysiwygControl from "../controls/WysiwygControl";
import TableData from "./tableData";

const GenerateDoc = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    // const [activitiesMenu, setActivitiesMenu] = useState([]);
    const [kidMenu, setKidMenu] = useState([]);
    const [valueEditor, setValueEditor] = useState();

    useEffect(() => {
        if (id) {
            ServerRequest().get("Main/MainTableGetById", { id }, setData);
        }
    }, [id]);

    const download = (value) => {
        ServerRequest().postForFile(`Main/TableDownload`, { value }, (res) => {
            const filename = res.headers["content-disposition"].split('; ')[1].split("filename=")[1];
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(new Blob([res.data], { type: 'application/octet-stream' }));
            link.setAttribute('download', `${filename}`);
            document.body.appendChild(link);
            link.click();
        })
    };
    
    const tableFilled = ReactDOMServer.renderToStaticMarkup(<TableData data={data} kidMenu={kidMenu}/>);

    useEffect(() => {
        ServerRequest().get("Kid/KIDGetAll", {}, setKidMenu);
        // ServerRequest().get("ActivityType/ActivitiesGetAll", {}, setActivitiesMenu);
    }, []);
    
    return (
        <main>
            <div className="container">
                <div className="row text-center">
                    <h1>Автоматично генериране на запис</h1>
                </div>
            </div>
            <hr />
            <div className="wrapper">
                <div className="content">
                    <div className="row justify-content-between">
                        <div className="col col-sm-2">
                            <button onClick={() => download(valueEditor || tableFilled)}>
                                <i className="fa-solid fa-file-arrow-down"></i> Сваляне
                            </button>
                        </div>
                        <div className="col-md-2 col-xs-12" style={{ textAlign: 'right' }}>
                            <button
                                onClick={() =>
                                    navigate(`/list/${data && data.isDamage ? "damage" : "menace"}`)
                                }
                            >
                                <i className="fa-solid fa-circle-chevron-left"></i> Обратно
                            </button>
                        </div>
                    </div>
                    <div className="mt15">
                        <WysiwygControl
                            id="myWysiwyg"
                            setValue={setValueEditor}
                            initialValue={tableFilled}
                            isAdmin
                            lang="bg"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default GenerateDoc;
