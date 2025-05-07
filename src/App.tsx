import { useState, useEffect } from 'react'
import './App.css'

// --- DeviceUUID adapted for React ---
function hashMD5(str: string) {
  // Simple hash fallback (not real MD5, for demo only)
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
  // Hanya gunakan data yang kemungkinan besar sama di semua browser pada device yang sama
  const screenRes = window.screen.width + 'x' + window.screen.height;
  const colorDepth = window.screen.colorDepth;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  // Jangan gunakan userAgent, platform, dsb!
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

// Helper untuk cookies
function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days*24*60*60*1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Helper untuk IndexedDB
function setIndexedDB(key: string, value: string) {
  const request = window.indexedDB.open('DeviceDB', 1);
  request.onupgradeneeded = function(event) {
    const db = (event.target as IDBOpenDBRequest).result;
    if (!db.objectStoreNames.contains('deviceStore')) {
      db.createObjectStore('deviceStore');
    }
  };
  request.onsuccess = function(event) {
    const db = (event.target as IDBOpenDBRequest).result;
    const tx = db.transaction('deviceStore', 'readwrite');
    tx.objectStore('deviceStore').put(value, key);
  };
}
function getIndexedDB(key: string, callback: (value: string | null) => void) {
  const request = window.indexedDB.open('DeviceDB', 1);
  request.onsuccess = function(event) {
    const db = (event.target as IDBOpenDBRequest).result;
    if (!db.objectStoreNames.contains('deviceStore')) {
      callback(null);
      return;
    }
    const tx = db.transaction('deviceStore', 'readonly');
    const store = tx.objectStore('deviceStore');
    const getReq = store.get(key);
    getReq.onsuccess = function() {
      callback(getReq.result ?? null);
    };
    getReq.onerror = function() {
      callback(null);
    };
  };
  request.onerror = function() {
    callback(null);
  };
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
