import { useState, useEffect } from 'react'
import './App.css'

function hashMD5(str: string) {
  let hash = 0, i, chr;
  if (str.length === 0) return '00000000';
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(8, '0').repeat(4).slice(0, 32);
}

function roundToNearest(value: number, nearest: number) {
  return Math.round(value / nearest) * nearest;
}

function getDeviceUUID() {
  const width = roundToNearest(
    Math.max(window.screen.width, window.screen.availWidth, window.innerWidth),
    100
  );
  const height = roundToNearest(
    Math.max(window.screen.height, window.screen.availHeight, window.innerHeight),
    100
  );
  const screenRes = width + 'x' + height;
  const colorDepth = 24;
  const cpu = 4;
  const dpr = '1.00';
  const dua = [screenRes, colorDepth, cpu, dpr].join(':');
  const tmpUuid = hashMD5(dua);
  const uuid = [
    tmpUuid.slice(0, 8),
    tmpUuid.slice(8, 12),
    '4' + tmpUuid.slice(12, 15),
    'b' + tmpUuid.slice(15, 18),
    tmpUuid.slice(20)
  ].join('-');
  return uuid;
}

function App() {
  const [deviceUUID, setDeviceUUID] = useState('');

  useEffect(() => {
    setDeviceUUID(getDeviceUUID());
  }, []);

  return (
    <div className="device-info-container">
      <h1>Device Information</h1>
      <div className="info-card">
        <h2>Device UUID</h2>
        <p><strong>Device UUID:</strong> {deviceUUID}</p>
      </div>
    </div>
  );
}

export default App;
