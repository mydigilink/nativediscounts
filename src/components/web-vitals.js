'use client'

import { useState } from 'react'
import { useReportWebVitals } from 'next/web-vitals'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

export function WebVitalsChart() {
  const [metrics, setMetrics] = useState([])

  // Capture web vitals
  const handleWebVitals = (metric) => {
    const newMetric = {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      rating: metric.rating,
      timestamp: Date.now(),
    }

    setMetrics((prev) => [...prev, newMetric])

    // Optional: send metrics to backend
    // fetch('/api/web-vitals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newMetric),
    // }).catch((err) => console.error(err))
  }

  useReportWebVitals(handleWebVitals)

  // Prepare chart data grouped by metric type
  const chartData = metrics.map((m) => ({
    name: `${m.name} (${new Date(m.timestamp).toLocaleTimeString()})`,
    value: parseFloat(m.value.toFixed(2)),
  }))

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Web Vitals Real-Time Chart</h2>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
