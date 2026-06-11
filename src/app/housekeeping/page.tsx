"use client"

import { PortalLayout } from "@/components/layout/portal-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  WashingMachine, 
  Clock, 
  CheckCircle2, 
  User, 
  RefreshCw,
  Plus
} from "lucide-react"

const queue = [
  { room: "105", type: "Checkout Cleaning", priority: "Urgent", staff: "Anita S.", status: "Cleaning", timer: "12m" },
  { room: "204", type: "Standard Cleaning", priority: "Medium", staff: "Suresh P.", status: "Assigned", timer: "2h ago" },
  { room: "312", type: "Deep Cleaning", priority: "Low", staff: "Anita S.", status: "Pending", timer: "4h ago" },
  { room: "108", type: "Checkout Cleaning", priority: "High", staff: "Unassigned", status: "Unassigned", timer: "5m" },
]

export default function HousekeepingPage() {
  return (
    <PortalLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Housekeeping Queue</h1>
            <p className="text-muted-foreground">Optimize turnover time and manage cleaning staff.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Assign Task
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {[
            { label: "Rooms Cleaning", value: "6", color: "text-orange-600" },
            { label: "Ready for Check-in", value: "42", color: "text-green-600" },
            { label: "Avg. Turnaround", value: "24m", color: "text-blue-600" },
            { label: "Staff Active", value: "8", color: "text-indigo-600" },
          ].map((item) => (
            <Card key={item.label} className="border-none shadow-md">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                <h3 className={`text-2xl font-black mt-1 ${item.color}`}>{item.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Live Cleaning Queue</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y">
                {queue.map((task) => (
                  <div key={task.room} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                       <div className="h-14 w-14 rounded-2xl bg-slate-100 flex flex-col items-center justify-center shrink-0 border border-slate-200">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">Room</span>
                          <span className="text-xl font-black text-slate-800">{task.room}</span>
                       </div>
                       <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <h4 className="font-bold">{task.type}</h4>
                             <Badge variant="outline" className={`${
                                task.priority === 'Urgent' ? 'border-red-200 text-red-600 bg-red-50' : 
                                task.priority === 'High' ? 'border-orange-200 text-orange-600 bg-orange-50' : 
                                'border-blue-200 text-blue-600 bg-blue-50'
                             }`}>
                                {task.priority}
                             </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                             <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {task.staff}</span>
                             <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {task.timer} elapsed</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <Badge className={
                          task.status === 'Cleaning' ? 'bg-orange-100 text-orange-600 border-none' :
                          task.status === 'Assigned' ? 'bg-blue-100 text-blue-600 border-none' :
                          task.status === 'Unassigned' ? 'bg-red-600 text-white animate-pulse' :
                          'bg-slate-100 text-slate-600 border-none'
                       }>
                          {task.status}
                       </Badge>
                       <Button variant="outline" size="sm">Manage</Button>
                       <Button variant="default" size="sm" className="hidden sm:flex">Mark Ready</Button>
                    </div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  )
}