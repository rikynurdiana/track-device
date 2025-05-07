import { useState, useEffect } from 'react'
import './App.css'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

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
  const [deviceInfo, setDeviceInfo] = useState({
    browser: '',
    os: '',
    deviceType: '',
    deviceId: ''
  })

  useEffect(() => {
    const storageKey = 'deviceId';

    // Cek semua storage
    const getFromAllStorage = (callback: (id: string | null) => void) => {
      let id = localStorage.getItem(storageKey)
        || sessionStorage.getItem(storageKey)
        || getCookie(storageKey);

      if (id) {
        callback(id);
      } else {
        getIndexedDB(storageKey, (idbId: string | null) => {
          callback(idbId);
        });
      }
    };

    // Simpan ke semua storage
    const saveToAllStorage = (id: string) => {
      localStorage.setItem(storageKey, id);
      sessionStorage.setItem(storageKey, id);
      setCookie(storageKey, id);
      setIndexedDB(storageKey, id);
    };

    // Function to detect device type (improved)
    const getDeviceType = () => {
      const ua = navigator.userAgent.toLowerCase();
      if (/iphone/.test(ua)) return 'iPhone';
      if (/ipad/.test(ua)) return 'iPad';
      if (/ipod/.test(ua)) return 'iPod';
      if (/android/.test(ua)) {
        if (/samsung/.test(ua)) return 'Samsung';
        if (/xiaomi/.test(ua)) return 'Xiaomi';
        if (/huawei/.test(ua)) return 'Huawei';
        if (/oppo/.test(ua)) return 'Oppo';
        if (/vivo/.test(ua)) return 'Vivo';
        return 'Android Device';
      }
      if (/windows phone/.test(ua)) return 'Windows Phone';
      if (/macintosh|mac os x/.test(ua)) return 'Mac';
      if (/windows/.test(ua)) return 'Windows PC';
      return 'Unknown Device';
    }

    // Function to detect OS
    const getOS = () => {
      const ua = navigator.userAgent.toLowerCase()
      if (ua.includes('android')) return 'Android'
      if (ua.includes('iphone') || ua.includes('ipad')) return 'iOS'
      return 'Unknown OS'
    }

    // Function to detect browser (improved for iOS)
    const getBrowser = () => {
      const ua = navigator.userAgent;
      if (/CriOS/i.test(ua)) return 'Chrome (iOS)';
      if (/FxiOS/i.test(ua)) return 'Firefox (iOS)';
      if (/EdgiOS/i.test(ua)) return 'Edge (iOS)';
      if (/OPiOS/i.test(ua)) return 'Opera (iOS)';
      if (/Chrome/i.test(ua)) return 'Chrome';
      if (/Firefox/i.test(ua)) return 'Firefox';
      if (/Edg/i.test(ua)) return 'Edge';
      if (/Opera|OPR/i.test(ua)) return 'Opera';
      if (/Safari/i.test(ua)) return 'Safari';
      return 'Unknown Browser';
    }

    getFromAllStorage(async (existingId: string | null) => {
      if (existingId) {
        setDeviceInfo({
          browser: getBrowser(),
          os: getOS(),
          deviceType: getDeviceType(),
          deviceId: existingId
        });
      } else {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        saveToAllStorage(result.visitorId);
        setDeviceInfo({
          browser: getBrowser(),
          os: getOS(),
          deviceType: getDeviceType(),
          deviceId: result.visitorId
        });
      }
    });
  }, [])

  return (
    <div className="device-info-container">
      <h1>Device Information</h1>
      <div className="info-card">
        <h2>Browser Information</h2>
        <p><strong>Browser:</strong> {deviceInfo.browser}</p>
        <p><strong>Operating System:</strong> {deviceInfo.os}</p>
        <p><strong>Device Type:</strong> {deviceInfo.deviceType}</p>
        <p><strong>Unique Device ID:</strong> {deviceInfo.deviceId}</p>
      </div>
    </div>
  )
}

export default App
