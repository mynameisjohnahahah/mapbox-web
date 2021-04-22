import http from './http';

function getFloorList() {
  return new Promise((resolve, reject) => {
    http('get', '/api/floor').then(res => {
      resolve(res);
    });
  });
}

function getFloorMap(param) {
  return new Promise((resolve, reject) => {
    http('get', '/api/map_data/floor_index', param).then(res => {
      resolve(res);
    });
  });
}

function getBeacon(params) {
  return new Promise((resolve, reject) => {
    http('get', '/api/beacon', params).then(res => {
      resolve(res);
    });
  });
}

export { getFloorList, getFloorMap, getBeacon };
