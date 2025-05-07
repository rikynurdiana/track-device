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

function getDeviceUUID() {
  const screenRes = window.screen.width + 'x' + window.screen.height;
  const colorDepth = window.screen.colorDepth;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  const dua = [screenRes, colorDepth, timezone, language].join(':');
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
