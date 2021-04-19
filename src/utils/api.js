import http from './http';

function getFloorList() {
  return new Promise((resolve, reject) => {
    http('get', '/api/floor').then(res => {
      resolve(res);
    });
  });
}

export { getFloorList };
