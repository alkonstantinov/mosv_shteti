// import React from "react";
import Axios from "axios";

const ServerRequest = () => {
    const baseUrl = process.env.REACT_APP_API; //"https://localhost:44372/api";// "https://localhost:5001/api";
    const settings = {
        baseURL: baseUrl,
        headers: { "Access-Control-Allow-Origin": "*" },
        timeout: 10 * 60 * 1000,
    };


    return {
        get: (url, getParams, callBack) => {
            if (typeof getParams === "object") {
                // remove empty values
                getParams = Object.entries(getParams).reduce((acc, x) => {
                    const key = x[0];
                    const value = x[1];
                    const hasValue = value !== null && value !== undefined && value !== "";

                    if (hasValue) {
                        acc[key] = value;
                    }
                    return acc;
                }, {});

                const queryParams = new URLSearchParams(getParams).toString();
                url += `?${queryParams}`;
            }

            Axios.create(settings)
                .get(url)
                .then((r) => {
                    if (callBack) {
                        callBack(r.data);
                    }
                })
                // .catch(handleError);
        },

        post: (url, postParams, callBack) => {
            Axios.create(settings)
                .post(url, postParams)
                .then((r) => {
                    if (callBack) {
                        callBack(r.data);
                    }
                })
                // .catch(handleError);
        },
        put: (url, putParams, callBack) => {
            Axios.create(settings)
                .put(url, putParams)
                .then((r) => {
                    if (callBack) {
                        callBack(r.data);
                    }
                })
                // .catch(handleError);
        },
    };
};

export default ServerRequest;
