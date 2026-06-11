"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ClipboardList, 
  Camera, 
  Navigation,
  Bell,
  User,
  LogOut,
  ChevronRight
} from "lucide-react"

const tasks = [
  { id: "T1", room: "302", type: "AC Repair", priority: "High", status: "Active" },
  { id: "T2", room: "105", type: "Checkout Cleaning", priority: "Medium", status: "Pending" },
  { id: "T3", room: "212", type: "Towels Delivery", priority: "Low", status: "Pending" },
]

export default function StaffMobilePage() {
  const [activeTask, setActiveTask] = useState<any>(null)

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Phone Mockup Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-[#F6F8FA] rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Status Bar */}
        <div className="h-12 bg-white flex items-center justify-between px-8 pt-4">
          <span className="text-xs font-bold">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full border-2 border-black" />
            <div className="h-3 w-4 border-2 border-black rounded-sm" />
          </div>
        </div>

        {/* App Header */}
        <header className="px-6 pt-4 pb-6 bg-white border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              RK
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">Rahul Kumar</h3>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">On Duty • Maintenance</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-destructive" />
          </Button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {!activeTask ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-none shadow-sm bg-blue-600 text-white">
                  <CardContent className="p-4">
                    <p className="text-[10px] font-bold uppercase opacity-80 mb-1">My Tasks</p>
                    <h4 className="text-2xl font-black">03</h4>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-4 text-slate-800">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Completed</p>
                    <h4 className="text-2xl font-black">12</h4>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Upcoming Assignments</h4>
                {tasks.map((task) => (
                  <Card 
                    key={task.id} 
                    className={`cursor-pointer border-none shadow-md overflow-hidden transition-all active:scale-95 ${task.status === 'Active' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setActiveTask(task)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-sm shrink-0 ${
                          task.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {task.room}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{task.type}</p>
                          <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground mt-0.5">
                            <Clock className="h-3 w-3" /> Assigned 15m ago
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="animate-in slide-in-from-right duration-300 space-y-8">
              <Button variant="ghost" onClick={() => setActiveTask(null)} className="p-0 h-auto font-bold text-muted-foreground">
                <ChevronRight className="rotate-180 h-4 w-4 mr-1" /> Back to Dashboard
              </Button>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-black">{activeTask.type}</h2>
                    <p className="text-muted-foreground font-medium">Task ID: #{activeTask.id}</p>
                  </div>
                  <Badge variant="destructive" className="animate-pulse">Active</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                   <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-1">
                      <MapPin className="h-6 w-6 text-primary" />
                      <span className="text-xs font-bold">Room {activeTask.room}</span>
                      <span className="text-[10px] text-muted-foreground">3rd Floor</span>
                   </div>
                   <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-1">
                      <Clock className="h-6 w-6 text-orange-500" />
                      <span className="text-xs font-bold">Due in 20m</span>
                      <span className="text-[10px] text-muted-foreground">SLA Target</span>
                   </div>
                </div>

                <div className="space-y-4 pt-6">
                   <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Actions</h5>
                   <Button size="lg" className="w-full h-16 rounded-2xl text-lg font-bold gap-3 shadow-lg">
                      <Navigation className="h-6 w-6" /> I'm on my way
                   </Button>
                   <Button size="lg" variant="outline" className="w-full h-16 rounded-2xl text-lg font-bold gap-3 border-2">
                      <Camera className="h-6 w-6" /> Upload Photo
                   </Button>
                   <Button size="lg" variant="secondary" className="w-full h-16 rounded-2xl text-lg font-bold gap-3 bg-green-100 text-green-700 hover:bg-green-200 border-none">
                      <CheckCircle2 className="h-6 w-6" /> Mark Complete
                   </Button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Bottom Nav */}
        <nav className="h-20 bg-white border-t flex items-center justify-around px-6">
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 items-center h-auto text-primary">
            <ClipboardList className="h-6 w-6" />
            <span className="text-[10px] font-bold">Tasks</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 items-center h-auto text-muted-foreground">
            <User className="h-6 w-6" />
            <span className="text-[10px] font-bold">Profile</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 items-center h-auto text-muted-foreground">
            <LogOut className="h-6 w-6" />
            <span className="text-[10px] font-bold">Logout</span>
          </Button>
        </nav>

        {/* Home Indicator */}
        <div className="h-1.5 w-1/3 bg-slate-200 rounded-full mx-auto mb-2 shrink-0" />
      </div>
    </div>
  )
}