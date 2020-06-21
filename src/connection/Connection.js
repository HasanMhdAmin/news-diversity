import axios from 'axios';

// const BASE_API_URL = 'https://192.168.1.103:7777/api/';
const BASE_API_URL = 'https://ariadne.is.inf.uni-due.de:7777/api/';

const SOURCE = BASE_API_URL + "source";
const KEYWORD = BASE_API_URL + "keyword";
const DIVERSITY = BASE_API_URL + "diversity";
const ARTICLES_BY_KEYWORD = BASE_API_URL + "articles/keyword";
const ARTICLES_BY_CATEGORY = BASE_API_URL + "articles/category";


export {
    getSources,
    getKeyword,
    getDiversity,
    getArticlesByKeyword,
    getArticlesByCategory
};

function getSources() {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return axios.get(SOURCE, axiosConfig)
        .then(response => {
            // console.log("SOURCE: connection ==> " + JSON.stringify(response));
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
            url: url,
            period: period,
            limit: 50
        }
    };
    return axios.get(KEYWORD, axiosConfig)
        .then(response => {
            // console.log("KEYWORD: connection ==> " + JSON.stringify(response));
            return response
        })
        .catch(error => {
            console.log(JSON.stringify(error));
            return error
        });
}


function getDiversity(url, period) {
    let axiosConfig = {
        params: {
            url: url,
            period: period,
        }
    };
    return axios.get(DIVERSITY, axiosConfig)
        .then(response => {
            // console.log("DIVERSITY: connection ==> " + JSON.stringify(response));
            return response
        })
        .catch(error => {
            console.log(JSON.stringify(error));
            return error
        });
}


function getArticlesByKeyword(q, url, page) {
    let axiosConfig = {
        params: {
            q: q,
            url: url,
            page: page
        }
    };
    return axios.get(ARTICLES_BY_KEYWORD, axiosConfig)
        .then(response => {
            console.log("ARTICLES_BY_KEYWORD: connection ==> ");
            // console.log("ARTICLES_BY_KEYWORD: connection ==> " + JSON.stringify(response));
            return response
        })
        .catch(error => {
            console.log("ARTICLES_BY_KEYWORD : " + JSON.stringify(error));
            return error
        });
}


function getArticlesByCategory(q, url, page) {
    let axiosConfig = {
        params: {
            q: q,
            url: url,
            page: page
        }
    };
    return axios.get(ARTICLES_BY_CATEGORY, axiosConfig)
        .then(response => {
            console.log("ARTICLES_BY_CATEGORY: connection ==> ");
            return response
        })
        .catch(error => {
            console.log("ARTICLES_BY_KEYWORD : " + JSON.stringify(error));
            return error
        });
}