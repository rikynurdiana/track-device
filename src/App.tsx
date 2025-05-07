import { useState, useEffect } from 'react'
import './App.css'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

function App() {
  const [deviceInfo, setDeviceInfo] = useState({
    browser: '',
    os: '',
    deviceType: '',
    deviceId: ''
  })

  useEffect(() => {
    // Function to detect device type
    const getDeviceType = () => {
      const ua = navigator.userAgent.toLowerCase()
      if (ua.includes('iphone') || ua.includes('ipad')) return 'iPhone/iPad'
      if (ua.includes('samsung')) return 'Samsung'
      if (ua.includes('xiaomi')) return 'Xiaomi'
      if (ua.includes('huawei')) return 'Huawei'
      if (ua.includes('oppo')) return 'Oppo'
      if (ua.includes('vivo')) return 'Vivo'
      if (ua.includes('android')) return 'Android Device'
      return 'Unknown Device'
    }

    // Function to detect OS
    const getOS = () => {
      const ua = navigator.userAgent.toLowerCase()
      if (ua.includes('android')) return 'Android'
      if (ua.includes('iphone') || ua.includes('ipad')) return 'iOS'
      return 'Unknown OS'
    }

    // Function to detect browser
    const getBrowser = () => {
      const ua = navigator.userAgent.toLowerCase()
      if (ua.includes('chrome')) return 'Chrome'
      if (ua.includes('safari')) return 'Safari'
      if (ua.includes('firefox')) return 'Firefox'
      if (ua.includes('opera')) return 'Opera'
      if (ua.includes('edge')) return 'Edge'
      return 'Unknown Browser'
    }

    // Get FingerprintJS visitorId
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      setDeviceInfo({
        browser: getBrowser(),
        os: getOS(),
        deviceType: getDeviceType(),
        deviceId: result.visitorId
      })
    }

    getFingerprint()
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
