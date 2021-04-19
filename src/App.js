import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import { getFloorList } from './utils/api';

import './app.css';

const App = () => {
  const [macValue, setMacValue] = useState();
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VmZm9saXUiLCJhIjoiY2pvZm9xeWN3MDFoejNrcnhrZWJ3cWY3byJ9.QlGQk9NBBKzz7dsWpU6a6A';
    new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });
    getFloorList().then(res => {
      console.log('res', res);
    });
  }, []);

  return (
    <div className="main">
      <div className="search">
        工卡mac: <input value={macValue} onChange={e => setMacValue(e.target.value)} />
        <span>
          <button style={{ margin: '0 0 0 10px' }}>search</button>
          <button style={{ margin: '0 0 0 10px' }} onClick={() => setMacValue('')}>
            clear
          </button>
        </span>
      </div>

      <div id="map" className="map"></div>
    </div>
  );
};

export default App;
