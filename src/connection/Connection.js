import axios from 'axios';

const BASE_API_URL = 'http://192.168.1.103:7777/api/';
const SOURCE = BASE_API_URL + "source";


export {
    getSources,
};

function getSources() {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // var data = {
    //     'UserID': userId,
    //     'ConnectID': connectId,
    // };
    // console.log("request body: " + JSON.stringify(data));
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