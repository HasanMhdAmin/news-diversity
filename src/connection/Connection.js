import axios from 'axios';

const BASE_API_URL = 'http://192.168.1.103:7777/api/';
const SOURCE = BASE_API_URL + "source";
const KEYWORD = BASE_API_URL + "keyword";


export {
    getSources,
    getKeyword
};

function getSources() {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return axios.get(SOURCE, axiosConfig)
        .then(response => {
            console.log("connection ==> " + JSON.stringify(response));
            return response
        })
        .catch(error => {
            console.log(JSON.stringify(error));
            return error
        });
}


function getKeyword(url, period) {
    let axiosConfig = {
        params: {
            period: period,
            limit: 50
        }
    };
    return axios.get(KEYWORD, axiosConfig)
        .then(response => {
            console.log("connection ==> " + JSON.stringify(response));
            return response
        })
        .catch(error => {
            console.log(JSON.stringify(error));
            return error
        });
}