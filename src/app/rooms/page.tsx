"use client"

import { PortalLayout } from "@/components/layout/portal-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Bed, 
  DoorOpen,
  WashingMachine,
  Hammer,
  ChevronDown
} from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

const rooms = [
  { id: "101", type: "Standard", floor: "1st", status: "Available", lastCleaned: "2h ago" },
  { id: "102", type: "Standard", floor: "1st", status: "Occupied", checkout: "Tomorrow" },
  { id: "103", type: "Deluxe", floor: "1st", status: "Cleaning", staff: "Anita S." },
  { id: "201", type: "Deluxe", floor: "2nd", status: "Available", lastCleaned: "1h ago" },
  { id: "202", type: "Suite", floor: "2nd", status: "Occupied", checkout: "Today" },
  { id: "203", type: "Suite", floor: "2nd", status: "Maintenance", issue: "AC" },
  { id: "301", type: "Presidential", floor: "3rd", status: "Available", lastCleaned: "15m ago" },
  { id: "302", type: "Deluxe", floor: "3rd", status: "Occupied", checkout: "3 days" },
]

export default function RoomsPage() {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Available": return { color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: <DoorOpen className="h-3 w-3" /> }
      case "Occupied": return { color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: <Bed className="h-3 w-3" /> }
      case "Cleaning": return { color: "bg-orange-500/10 text-orange-600 border-orange-500/20", icon: <WashingMachine className="h-3 w-3" /> }
      case "Maintenance": return { color: "bg-red-500/10 text-red-600 border-red-500/20", icon: <Hammer className="h-3 w-3" /> }
      default: return { color: "bg-slate-500/10 text-slate-600 border-slate-500/20", icon: null }
    }
  }

  return (
    <PortalLayout>
      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
            <p className="text-sm text-muted-foreground">Manage property rooms and live availability status.</p>
          </div>
          <Button className="w-full sm:w-auto h-9 text-xs font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            <Plus className="mr-2 h-3.5 w-3.5" />
            New Room
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Find room..." className="pl-9 h-9 text-xs border-border/50 bg-secondary/30" />
            </div>
            <Button variant="outline" size="sm" className="h-9 w-9 rounded-md border-border/50">
              <Filter className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            {['All', 'Available', 'Occupied', 'Cleaning', 'Maintenance'].map((tab) => (
              <Badge key={tab} variant={tab === 'All' ? 'default' : 'outline'} className={`cursor-pointer text-[10px] font-bold px-3 py-1 ${tab !== 'All' ? 'border-border/50 hover:bg-secondary' : ''}`}>
                {tab}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rooms.map((room) => {
            const status = getStatusInfo(room.status)
            return (
              <Card key={room.id} className="border-border/50 shadow-sm bg-card/40 hover:bg-card transition-all hover:shadow-md group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 flex items-center justify-center rounded-xl font-bold text-sm shadow-sm border border-border/50 ${
                        room.status === 'Available' ? 'bg-emerald-500/10 text-emerald-600' :
                        room.status === 'Occupied' ? 'bg-blue-500/10 text-blue-600' :
                        room.status === 'Cleaning' ? 'bg-orange-500/10 text-orange-600' :
                        'bg-red-500/10 text-red-600'
                      }`}>
                        {room.id}
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-none">{room.type}</p>
                        <p className="text-[10px] text-muted-foreground mt-1 tracking-tight uppercase font-medium">{room.floor} Floor</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                          <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl shadow-2xl border-border/50">
                        <DropdownMenuItem className="text-xs">View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs">Edit Config</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs text-destructive">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <Badge className={`flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-black uppercase tracking-tight ${status.color}`}>
                      {status.icon}
                      {room.status}
                    </Badge>
                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                      {room.status === 'Occupied' ? room.checkout : room.lastCleaned || 'N/A'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </PortalLayout>
  )
}