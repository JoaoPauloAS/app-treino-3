import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'

const ProgressPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Progress</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
    </div>
  )
}

export default ProgressPage
