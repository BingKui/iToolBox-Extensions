// 接口调用封装
import axios from 'axios';
let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;

// 设置基础路径
// axios.defaults.baseURL = 'http://121.40.250.93:8080';
// axios.defaults.baseURL = 'https://3000kr.cn';
//设置默认请求头
// axios.defaults.headers = {
//     'X-Requested-With': 'XMLHttpRequest'
// };
axios.defaults.timeout = 10000;
//请求拦截器
axios.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消');
        promiseArr[config.url] = cancel;
    } else {
        promiseArr[config.url] = cancel;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    const { error_code, error_message } = response.data;
    if (error_code) {
        console.error('发生错误：', error_code, error_message);
        return false;
    }
    return response;
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
        case 400:
            err.message = '错误请求';
            break;
        case 401:
            err.message = '未授权，请重新登录';
            break;
        case 403:
            err.message = '拒绝访问';
            break;
        case 404:
            err.message = '请求错误,未找到该资源';
            break;
        case 405:
            err.message = '请求方法未允许';
            break;
        case 408:
            err.message = '请求超时';
            break;
        case 500:
            err.message = '服务器端出错';
            break;
        case 501:
            err.message = '网络未实现';
            break;
        case 502:
            err.message = '网络错误';
            break;
        case 503:
            err.message = '服务不可用';
            break;
        case 504:
            err.message = '网络超时';
            break;
        case 505:
            err.message = 'http版本不支持该请求';
            break;
        case 513:
            err.message = err.response.data.message;
            break;
        case 641:
            err.message = err.response.data.message;
            break;
        default:
            err.message = `连接错误${err.response.status}`;
        }
    } else if (!cancel) {
        err.message = '连接到服务器失败';
    }
    return Promise.reject(err);
});

export const get = (url, param) =>  {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url,
            params: {
                ...param,
            },
            cancelToken: new CancelToken(c => {
                cancel = c;
            })
        }).then(res => {
            resolve(res.data);
            // 清除所有的提示
            // ClearTip();
        }).catch(error => {
            reject(error);
        });
    });
};
//     // get请求，不存在认证信息
//     getNormal(url, param) {
//         return new Promise((resolve, reject) => {
//             axios({
//                 method: 'get',
//                 url,
//                 params: {
//                     ...param,
//                 },
//                 cancelToken: new CancelToken(c => {
//                     cancel = c;
//                 })
//             }).then(res => {
//                 resolve(res.data);
//                 // 清除所有的提示
//                 // ClearTip();
//             }).catch(error => {
//                 reject(error);
//             });
//         });
//     },
//     //post请求
//     post(url, param) {
//         return new Promise((resolve, reject) => {
//             axios({
//                 method: 'post',
//                 url,
//                 data: {
//                     ...param,
//                 },
//                 cancelToken: new CancelToken(c => {
//                     cancel = c;
//                 })
//             }).then(res => {
//                 resolve(res.data);
//                 // 清除所有的提示
//                 // ClearTip();
//             }).catch(error => {
//                 reject(error);
//             });
//         });
//     },
//     //post请求
//     postNormal(url, param) {
//         return new Promise((resolve, reject) => {
//             axios({
//                 method: 'post',
//                 url,
//                 data: {
//                     ...param,
//                 },
//                 cancelToken: new CancelToken(c => {
//                     cancel = c;
//                 })
//             }).then(res => {
//                 resolve(res.data);
//                 // 清除所有的提示
//                 // ClearTip();
//             }).catch(error => {
//                 reject(error);
//             });
//         });
//     },
//     // put
//     put(url, param) {
//         return new Promise((resolve, reject) => {
//             axios({
//                 method: 'put',
//                 url,
//                 data: {
//                     ...param,
//                 },
//                 cancelToken: new CancelToken(c => {
//                     cancel = c;
//                 })
//             }).then(res => {
//                 resolve(res.data);
//                 // 清除所有的提示
//                 // ClearTip();
//             }).catch(error => {
//                 reject(error);
//             });
//         });
//     },
//     // delete
//     del(url, param) {
//         return new Promise((resolve, reject) => {
//             axios({
//                 method: 'delete',
//                 url,
//                 data: {
//                     ...param,
//                 },
//                 headers: {
//                     'Content-Type': 'application/json;charset=UTF-8',
//                 },
//                 cancelToken: new CancelToken(c => {
//                     cancel = c;
//                 })
//             }).then(res => {
//                 resolve(res.data);
//                 // 清除所有的提示
//                 // ClearTip();
//             }).catch(error => {
//                 reject(error);
//             });
//         });
//     },
//     // patch
//     patch(url, param) {
//         return new Promise((resolve, reject) => {
//             axios({
//                 method: 'patch',
//                 url,
//                 data: {
//                     ...param,
//                 },
//                 headers: {
//                     'Content-Type': 'application/json;charset=UTF-8',
//                 },
//                 cancelToken: new CancelToken(c => {
//                     cancel = c;
//                 })
//             }).then(res => {
//                 resolve(res.data);
//                 // 清除所有的提示
//                 // ClearTip();
//             }).catch(error => {
//                 reject(error);
//             });
//         });
//     },
// };
