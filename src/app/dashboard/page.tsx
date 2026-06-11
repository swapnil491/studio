
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
  BarChart3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip as ChartTooltip,
  Cell,
  PieChart,
  Pie
} from "recharts"

const stats = [
  { label: "Total Rooms", value: "128", icon: BedDouble, color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Occupied Rooms", value: "94", icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
  { label: "Pending Requests", value: "12", icon: Clock, color: "text-red-600", bg: "bg-red-100" },
  { label: "Active Staff", value: "18", icon: Users, color: "text-green-600", bg: "bg-green-100" },
]

const occupancyData = [
  { day: "Mon", rate: 65 },
  { day: "Tue", rate: 70 },
  { day: "Wed", rate: 85 },
  { day: "Thu", rate: 82 },
  { day: "Fri", rate: 94 },
  { day: "Sat", rate: 98 },
  { day: "Sun", rate: 90 },
]

const requestStatusData = [
  { name: 'Completed', value: 45, color: 'hsl(var(--chart-4))' },
  { name: 'Pending', value: 12, color: 'hsl(var(--chart-1))' },
  { name: 'In Progress', value: 18, color: 'hsl(var(--chart-2))' },
]

export default function DashboardPage() {
  return (
    <PortalLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Operations Dashboard</h1>
            <p className="text-muted-foreground">Real-time overview of hotel status and staff performance.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="hidden sm:flex">
              Export PDF
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Service Request
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`h-12 w-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <Card className="md:col-span-4 border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Weekly Occupancy Trend</CardTitle>
              <CardDescription>Average percentage of occupied rooms over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] pt-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
                  <ChartTooltip 
                    cursor={{fill: 'hsl(var(--primary))', opacity: 0.05}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-3 border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Service Request Distribution</CardTitle>
              <CardDescription>Breakdown of current task statuses.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] pt-0 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={requestStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {requestStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-4">
                {requestStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
           <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-headline">Quick Actions</CardTitle>
                <CardDescription>Frequent operational tasks.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all">
                <Plus className="h-5 w-5" />
                Add Room
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all">
                <Users className="h-5 w-5" />
                Assign Staff
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all">
                <Hammer className="h-5 w-5" />
                Maintenance Log
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all">
                <BarChart3 className="h-5 w-5" />
                View Reports
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-headline">Upcoming Tasks</CardTitle>
                <CardDescription>Critical tasks requiring attention.</CardDescription>
              </div>
              <Button variant="link" size="sm" className="text-primary p-0 h-auto">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { room: "302", task: "Leaking Faucet", priority: "High", time: "20m ago" },
                { room: "105", task: "Checkout Cleaning", priority: "Medium", time: "45m ago" },
                { room: "212", task: "Fresh Towels Request", priority: "Low", time: "1h ago" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white font-bold text-xs text-primary shadow-sm">
                      {task.room}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{task.task}</p>
                      <p className="text-xs text-muted-foreground">{task.time}</p>
                    </div>
                  </div>
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    task.priority === 'High' ? 'bg-red-100 text-red-600' : 
                    task.priority === 'Medium' ? 'bg-orange-100 text-orange-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {task.priority}
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
