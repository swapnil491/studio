"use client"

import { PortalLayout } from "@/components/layout/portal-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  WashingMachine, 
  Hammer, 
  Download,
  Calendar
} from "lucide-react"
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip as ChartTooltip,
} from "recharts"

const performanceData = [
  { month: "Jan", occupancy: 60, requests: 40 },
  { month: "Feb", occupancy: 65, requests: 45 },
  { month: "Mar", occupancy: 85, requests: 70 },
  { month: "Apr", occupancy: 75, requests: 60 },
  { month: "May", occupancy: 90, requests: 85 },
  { month: "Jun", occupancy: 95, requests: 90 },
]

export default function ReportsPage() {
  return (
    <PortalLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Analytics & Reports</h1>
            <p className="text-muted-foreground">Performance insights for informed decision making.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Last 30 Days
            </Button>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "RevPAR", value: "₹4,250", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Avg. Occupancy", value: "84%", icon: BarChart3, color: "text-indigo-600", bg: "bg-indigo-100" },
            { label: "Clean Time", value: "18m", icon: WashingMachine, color: "text-orange-600", bg: "bg-orange-100" },
            { label: "Maint. Response", value: "12m", icon: Hammer, color: "text-green-600", bg: "bg-green-100" },
          ].map((stat) => (
            <Card key={stat.label} className="border-none shadow-md overflow-hidden bg-white">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`h-10 w-10 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Operations Overview</CardTitle>
            <CardDescription>Correlation between occupancy and service request volume.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <ChartTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="occupancy" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorOcc)" strokeWidth={3} />
                <Area type="monotone" dataKey="requests" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorReq)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Department Efficiency</CardTitle>
              <CardDescription>Average task completion time by department.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Housekeeping", time: "22 mins", progress: 85, color: "bg-blue-600" },
                { label: "Maintenance", time: "38 mins", progress: 65, color: "bg-orange-600" },
                { label: "Front Desk", time: "5 mins", progress: 95, color: "bg-green-600" },
                { label: "Room Service", time: "15 mins", progress: 80, color: "bg-indigo-600" },
              ].map((dept) => (
                <div key={dept.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>{dept.label}</span>
                    <span className="text-muted-foreground">{dept.time}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${dept.color} transition-all duration-1000`} style={{ width: `${dept.progress}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Recent Reports</CardTitle>
              <CardDescription>Available for download.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Monthly Occupancy Analysis - May", size: "2.4 MB", date: "Jun 1, 2024" },
                { name: "Staff Performance Audit Q1", size: "4.8 MB", date: "May 20, 2024" },
                { name: "Revenue Breakdown FY23-24", size: "1.1 MB", date: "Apr 15, 2024" },
                { name: "Maintenance Cost Summary", size: "850 KB", date: "Apr 02, 2024" },
              ].map((report) => (
                <div key={report.name} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Download className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.date} • {report.size}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  )
}