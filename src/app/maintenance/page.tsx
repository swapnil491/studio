"use client"

import { PortalLayout } from "@/components/layout/portal-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Hammer, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  User,
  Plus,
  ArrowRight,
  MapPin
} from "lucide-react"

const tickets = [
  { id: "MT-102", room: "302", issue: "Leaking Faucet", priority: "High", staff: "Rahul K.", status: "Work in Progress", time: "2h ago" },
  { id: "MT-103", room: "105", issue: "TV Remote Broken", priority: "Medium", staff: "Rahul K.", status: "Pending", time: "3h ago" },
  { id: "MT-104", room: "Common", issue: "Elevator B Rattling", priority: "High", staff: "External Vendor", status: "Scheduled", time: "1d ago" },
  { id: "MT-105", room: "202", issue: "Light Bulb Replacement", priority: "Low", staff: "Suresh P.", status: "Completed", time: "1d ago" },
]

export default function MaintenancePage() {
  return (
    <PortalLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Maintenance Tickets</h1>
            <p className="text-muted-foreground">Track repairs, assets, and prevent operational downtime.</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Ticket
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
           {[
             { label: "Active Tickets", value: "4", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
             { label: "Avg. Resolution", value: "45m", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
             { label: "Preventive Due", value: "12", icon: Hammer, color: "text-orange-600", bg: "bg-orange-50" },
             { label: "Completed (7d)", value: "28", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
           ].map((stat) => (
             <Card key={stat.label} className="border-none shadow-md">
                <CardContent className="p-6 flex items-center justify-between">
                   <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</p>
                      <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
                   </div>
                   <div className={`h-10 w-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="h-5 w-5" />
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
           <Card className="lg:col-span-2 border-none shadow-md overflow-hidden">
              <CardHeader className="bg-muted/10 border-b">
                 <CardTitle className="text-lg font-headline">Recent Maintenance Tickets</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y">
                    {tickets.map((ticket) => (
                       <div key={ticket.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                             <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 border border-slate-200">
                                <Hammer className="h-6 w-6" />
                             </div>
                             <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                   <h4 className="font-bold text-slate-800">{ticket.issue}</h4>
                                   <Badge className={
                                      ticket.priority === 'High' ? 'bg-red-100 text-red-600' : 
                                      ticket.priority === 'Medium' ? 'bg-orange-100 text-orange-600' : 
                                      'bg-blue-100 text-blue-600'
                                   }>
                                      {ticket.priority}
                                   </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-medium">
                                   <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Room {ticket.room}</span>
                                   <span className="flex items-center gap-1"><User className="h-3 w-3" /> {ticket.staff}</span>
                                   <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {ticket.time}</span>
                                </div>
                             </div>
                          </div>
                          <div className="flex items-center gap-3">
                             <Badge variant="outline" className={
                                ticket.status === 'Completed' ? 'border-green-200 text-green-600 bg-green-50' : 
                                ticket.status === 'Work in Progress' ? 'border-blue-200 text-blue-600 bg-blue-50' :
                                'border-slate-200 text-slate-600 bg-slate-50'
                             }>
                                {ticket.status}
                             </Badge>
                             <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                                <ArrowRight className="h-4 w-4" />
                             </Button>
                          </div>
                       </div>
                    ))}
                 </div>
              </CardContent>
           </Card>

           <div className="space-y-6">
              <Card className="border-none shadow-md">
                 <CardHeader>
                    <CardTitle className="text-lg font-headline">Upcoming Maintenance</CardTitle>
                    <CardDescription>Scheduled preventive checks.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    {[
                       { task: "Kitchen Exhaust Cleaning", due: "Tomorrow", priority: "Medium" },
                       { task: "Pool Filtration Check", due: "in 3 days", priority: "Low" },
                       { task: "Fire Safety Inspection", due: "Jun 12", priority: "High" },
                    ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <div>
                             <p className="text-sm font-bold">{item.task}</p>
                             <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Due {item.due}</p>
                          </div>
                          <Badge variant="secondary" className="text-[10px] py-0">{item.priority}</Badge>
                       </div>
                    ))}
                    <Button variant="outline" className="w-full mt-4 border-2">Schedule Maintenance</Button>
                 </CardContent>
              </Card>

              <Card className="border-none shadow-md bg-primary text-white">
                 <CardContent className="p-6">
                    <h4 className="text-lg font-black mb-2">Emergency?</h4>
                    <p className="text-sm opacity-80 mb-6 leading-relaxed">Instantly alert all available maintenance staff for critical property issues.</p>
                    <Button variant="secondary" className="w-full h-12 bg-white text-primary hover:bg-white/90 font-bold border-none shadow-lg">
                       Trigger Property Alert
                    </Button>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </PortalLayout>
  )
}
