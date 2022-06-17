import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const divStyle = {
        visibility: "visible",
        // maxWidth: "30%",
        animationDuration: "0.4s",
        animationDelay: "0s",
        animationName: "fadeInLeft",
    };

    return (
        <main>
            <div className="container">
                <div className="row text-center">
                    <h1>Начална</h1>
                </div>
            </div>
            <hr />
            <div className="wrapper">
                <div className="flex-row-wrap-center card-box">
                    <Link
                        className="card card-icon expanded fadeInLeft"
                        style={divStyle}
                        to={`/application/menace`}
                        key={`/application/menace`}
                    >
                        <figure>
                            <i className="fa-brands fa-wpforms fa-5x"></i>
                        </figure>
                        <h6>Вписване на информация за непосредствена заплаха за екологични щети</h6>
                        <hr />
                        <p>Заявяване от РИОСВ на информация за непосредствена заплаха за екологични щети</p>
                        <button className="btn-round btn-border-black">Към формуляра</button>
                    </Link>
                    <Link
                        className="card card-icon expanded fadeInLeft"
                        style={divStyle}
                        to={`/application/damage`}
                        key={`/application/damage`}
                    >
                        <figure>
                            <i className="fa-brands fa-wpforms fa-5x"></i>
                        </figure>
                        <h6>Вписване на информация за причинени екологични щети</h6>
                        <hr />
                        <p>Заявяване от РИОСВ на информация за причинени екологични щети</p>
                        <button className="btn-round btn-border-black">Към формуляра</button>
                    </Link>
                    <Link
                        className="card card-icon expanded fadeInLeft"
                        style={divStyle}
                        to={`/list`}
                        key={`/list`}
                    >
                        <figure>
                            <i className="fa-solid fa-clipboard-list fa-5x"></i>
                        </figure>
                        <h6>Списък с вписани заявления</h6>
                        <hr />
                        <p>Списък с подадени заявления по тип и подредени по дата на подаване</p>
                        <button className="btn-round btn-border-black">Към списъка</button>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Home;
