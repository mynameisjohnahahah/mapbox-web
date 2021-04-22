import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';

import 'react-toastify/dist/ReactToastify.css';

import { getFloorMap, getBeacon } from './utils/api';
import MallToLocation from './lib/location/mall-to-location-sdk-es';
import { getQueryVariable } from './helper';

import './app.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VmZm9saXUiLCJhIjoiY2pvZm9xeWN3MDFoejNrcnhrZWJ3cWY3byJ9.QlGQk9NBBKzz7dsWpU6a6A';

const mallToLocation = new MallToLocation({
  appId: '999',
  appSecret: 'testsecret',
  uuid: getQueryVariable('uuid'),
  host: process.env.REACT_APP_BASE_URL
});

const App = () => {
  const [macValue, setMacValue] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectOption] = useState('mac');
  const [mapState, setMap] = useState(null);
  const [floor, setFloor] = useState(null);
  const [isShowBeacon, setShowBeacon] = useState(false);

  let map = null;
  let loadMap = false;

  const options = [
    { value: 'mac', label: '工卡' },
    { value: 'openid', label: '微信' }
  ];

  const marker = new mapboxgl.Marker(); // 定义坐标点

  // 初始经纬度
  let oldCoordinate = null;
  let newCoordinate = null;

  const moveTime = 5000; // 平滑移动到下一个位置的时间
  let useTime = 0; // 已经平滑移动的时间
  let delay = 0;
  let interval = 5000;

  // 定位sdk返回的点位信息
  const update = ressult => {
    if (ressult.success) {
      const point = ressult.data.position;
      if (!newCoordinate) {
        newCoordinate = JSON.parse(JSON.stringify(point));
      } else {
        oldCoordinate = JSON.parse(JSON.stringify(newCoordinate));
        newCoordinate = JSON.parse(JSON.stringify(point));
      }
      useTime = 0;
    }
  };

  // 逐帧更新坐标点
  const animateMarker = () => {
    // 每帧的移动时间
    useTime += moveTime / 60;
    // 确保有定位点
    if (!oldCoordinate || !newCoordinate) {
      return;
    }
    // 阈值处理
    if (useTime > moveTime) {
      useTime = moveTime;
    }
    const [x1, y1] = oldCoordinate;
    const [x2, y2] = newCoordinate;
    // 每一帧在地图上的经纬度
    const stampX = x1 + (useTime / moveTime) * (x2 - x1);
    const stampY = y1 + (useTime / moveTime) * (y2 - y1);

    // 根据动画时间戳将数据更新到新位置
    // “moveTime” 控制动画速度。
    marker.setLngLat([stampX, stampY]);
    // 确保它已添加到地图中。如果已经添加了，可以安全地调用它。
    marker.addTo(map);

    //请求动画的下一帧。
    requestAnimationFrame(animateMarker);
  };

  // 搜索
  const searchLocation = () => {
    if (!macValue) {
      toast.error(selectedOption === 'mac' ? '请输入工卡！' : '请输入微信号！', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }

    setLoading(true);
    loadMap = true;

    mallToLocation.onPosition(
      selectedOption === 'openid' ? { openid: macValue } : { mac: macValue },
      { delay, interval },
      res => {
        if (res.success) {
          if (loadMap) {
            getFloorMap({
              floor_id: res.data.floor_id
            }).then(response => {
              const mapContainer = new mapboxgl.Map({
                container: 'map',
                style: response
              });

              map = mapContainer;
              setMap(mapContainer);
            });

            setLoading(false);
            loadMap = false;
            setFloor(res.data.floor_id);
          }
          update(res);
          animateMarker();
        }
      }
    );
  };

  // 显示beacon
  const showBeacon = () => {
    if (!mapState || isShowBeacon) return;

    getBeacon({
      floor_id: floor
    }).then(res => {
      const features = res.map(v => {
        return {
          type: 'Feature',
          properties: {
            type: 'gateway',
            name: v.mac
          },
          geometry: {
            type: 'Point',
            coordinates: [Number(v.longitude), Number(v.latitude)]
          }
        };
      });

      mapState.addSource('gateway', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      });

      mapState.addLayer({
        id: 'gateway-point',
        type: 'circle',
        source: 'gateway',
        paint: {
          'circle-radius': 6,
          'circle-color': '#223b53'
        }
      });

      mapState.addLayer({
        id: 'gateway',
        type: 'symbol',
        source: 'gateway',
        layout: {
          'text-font': ['PingFang SC Regular'],
          'text-field': ['get', 'name'],
          'text-size': 12,
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      });

      setShowBeacon(true);
    });
  };

  return (
    <div className="main">
      <div className="search">
        <Select
          className="selectOption"
          placeholder="请选择..."
          defaultValue={{ label: '工卡', value: 'mac' }}
          onChange={e => setSelectOption(e.value)}
          options={options}
        />
        <input
          style={{ margin: '0 0 0 10px' }}
          value={macValue}
          id={'macId'}
          placeholder={selectedOption === 'mac' ? '请输入工卡...' : '请输入微信号...'}
          onChange={e => setMacValue(e.target.value)}
        />
        <button style={{ margin: '0 0 0 10px' }} onClick={() => searchLocation()}>
          查询
        </button>

        <button style={{ margin: '0 0 0 10px' }} onClick={() => showBeacon()} disabled={isShowBeacon}>
          显示beacon
        </button>
      </div>
      <ToastContainer />
      {loading && <ReactLoading type="cylon" color="red" />}
      {!loading && <div id="map" className="map"></div>}
    </div>
  );
};

export default App;
