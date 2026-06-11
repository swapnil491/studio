"use client"

import { PortalLayout } from "@/components/layout/portal-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  BedDouble, 
  CheckCircle2, 
  Clock, 
  Users, 
  TrendingUp,
  Plus,
  ArrowRight,
  Hammer,
  BarChart3,
  Calendar,
  Zap,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip as ChartTooltip,
} from "recharts"

const stats = [
  { label: "Total Revenue", value: "₹1,24,500", icon: TrendingUp, color: "text-blue-500", trend: "+12%", bg: "bg-blue-500/10" },
  { label: "Occupancy Rate", value: "84%", icon: BedDouble, color: "text-emerald-500", trend: "+5%", bg: "bg-emerald-500/10" },
  { label: "Active Requests", value: "12", icon: Zap, color: "text-orange-500", trend: "-2", bg: "bg-orange-500/10" },
  { label: "Guest Rating", value: "4.8", icon: Star, color: "text-purple-500", trend: "0.1", bg: "bg-purple-500/10" },
]

const revenueData = [
  { time: "08:00", value: 4000 },
  { time: "10:00", value: 3000 },
  { time: "12:00", value: 5000 },
  { time: "14:00", value: 4500 },
  { time: "16:00", value: 6000 },
  { time: "18:00", value: 5500 },
  { time: "20:00", value: 7000 },
]

export default function DashboardPage() {
  return (
    <PortalLayout>
      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">System Overview</h1>
            <p className="text-sm text-muted-foreground">Monitor real-time hospitality operations and metrics.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg h-9 text-xs font-bold border-border/50 shadow-sm bg-background/50">
              <Calendar className="mr-2 h-3.5 w-3.5" />
              May 20, 2024
            </Button>
            <Button size="sm" className="rounded-lg h-9 text-xs font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              <Plus className="mr-2 h-3.5 w-3.5" />
              New Booking
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border border-border/50 shadow-sm overflow-hidden bg-card/40 hover:bg-card transition-all hover:shadow-md group">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 text-[10px] font-bold border-none">
                    {stat.trend}
                  </Badge>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <Card className="md:col-span-4 border-border/50 shadow-sm bg-card/40">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold">Revenue Pulse</CardTitle>
                <CardDescription className="text-[11px]">Daily performance monitoring.</CardDescription>
              </div>
              <Badge variant="outline" className="text-[10px] font-bold px-2 py-0 border-border/50">Live</Badge>
            </CardHeader>
            <CardContent className="h-[300px] pt-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.05} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'hsl(var(--muted-foreground))'}} />
                  <YAxis hide />
                  <ChartTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-3 border-border/50 shadow-sm bg-card/40 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm font-bold">Activity Feed</CardTitle>
              <CardDescription className="text-[11px]">Latest updates from the floor.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/30">
                {[
                  { user: "Anita S.", action: "cleaned Room 105", time: "5m ago", type: "cleaning" },
                  { user: "Rahul K.", action: "started AC repair", time: "12m ago", type: "maintenance" },
                  { user: "Meena R.", action: "processed check-in", time: "25m ago", type: "guest" },
                  { user: "System", action: "generated daily report", time: "1h ago", type: "system" },
                ].map((item, i) => (
                  <div key={i} className="p-4 flex items-start gap-3 hover:bg-secondary/30 transition-colors">
                    <div className="h-2 w-2 rounded-full mt-1.5 shrink-0 bg-primary/40" />
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium leading-none">
                        <span className="font-bold">{item.user}</span> {item.action}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-muted/20 text-center border-t border-border/30">
                <Button variant="ghost" size="sm" className="text-[10px] font-bold h-7">View all activity</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
           <Card className="border-border/50 shadow-sm bg-card/40">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold">Priority Operations</CardTitle>
                <CardDescription className="text-[11px]">Tasks requiring immediate attention.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { room: "302", task: "Leaking Faucet", priority: "High", time: "20m ago" },
                { room: "105", task: "Checkout Cleaning", priority: "Medium", time: "45m ago" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-background font-bold text-[11px] text-primary shadow-sm border border-border/50">
                      {task.room}
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-none">{task.task}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{task.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-[9px] font-black tracking-tight ${
                    task.priority === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                  }`}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm bg-card/40">
            <CardHeader>
              <CardTitle className="text-sm font-bold">Action Center</CardTitle>
              <CardDescription className="text-[11px]">Quick shortcuts for managers.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-1.5 rounded-xl border-border/50 bg-background/50 hover:bg-primary/5 hover:border-primary/20 transition-all">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-bold">Manage Staff</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-1.5 rounded-xl border-border/50 bg-background/50 hover:bg-primary/5 hover:border-primary/20 transition-all">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-bold">Analytics</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-1.5 rounded-xl border-border/50 bg-background/50 hover:bg-primary/5 hover:border-primary/20 transition-all">
                <Hammer className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-bold">Maint. Logs</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-1.5 rounded-xl border-border/50 bg-background/50 hover:bg-primary/5 hover:border-primary/20 transition-all">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-bold">View More</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  )
}