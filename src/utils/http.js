import axios from 'axios';
import moment from 'moment';

// 网络请求配置
axios.defaults.timeout = 100000;
axios.defaults.baseURL = 'https://test-easy.mall-to.com';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json',
      UUID: 4006,
      'App-Id': 999,
      'app-secret': 'testsecret',
      'Signature-Version': 4,
      Timestamp: moment().format('YYYY-MM-DD hh:mm:ss'),
      Accept: 'application/json'
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // msag(error);
    console.log('请求出错：', error);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        if (response && response.status === 200) {
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        msag(err);
        reject(err);
      }
    );
  });
}

//失败提示
function msag(err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 401:
        alert('未授权，请登录');
        break;

      case 403:
        alert('拒绝访问');
        break;

      case 404:
        alert('请求地址出错');
        break;

      case 428:
        alert('请求指定的一些前提条件缺失');
        break;

      case 500:
        alert('服务器内部错误');
        break;
      default:
    }
  }
}

//统一接口处理，返回数据
export default function http(fecth, url, param) {
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case 'get':
        console.log('begin a get request,and url:', url);
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log('get request GET failed.', error);
            reject(error);
          });
        break;
      case 'post':
        post(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log('get request POST failed.', error);
            reject(error);
          });
        break;
      default:
        break;
    }
  });
}
