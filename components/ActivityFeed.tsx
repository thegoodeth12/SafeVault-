import React from 'react'

export default function ActivityFeed({ activities }) {
  return (
    <div className="bg-white border rounded p-4 shadow mt-4">
      <h3 className="text-md font-semibold mb-3">📜 Activity Feed</h3>
      <ul className="text-sm list-disc list-inside">
        {activities.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
