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
  Hammer
} from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

const rooms = [
  { id: "101", type: "Standard", floor: "1st", status: "Available" },
  { id: "102", type: "Standard", floor: "1st", status: "Occupied" },
  { id: "103", type: "Deluxe", floor: "1st", status: "Cleaning" },
  { id: "201", type: "Deluxe", floor: "2nd", status: "Available" },
  { id: "202", type: "Suite", floor: "2nd", status: "Occupied" },
  { id: "203", type: "Suite", floor: "2nd", status: "Maintenance" },
  { id: "301", type: "Presidential", floor: "3rd", status: "Available" },
  { id: "302", type: "Deluxe", floor: "3rd", status: "Occupied" },
]

export default function RoomsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-700 border-green-200"
      case "Occupied": return "bg-blue-100 text-blue-700 border-blue-200"
      case "Cleaning": return "bg-orange-100 text-orange-700 border-orange-200"
      case "Maintenance": return "bg-red-100 text-red-700 border-red-200"
      default: return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Available": return <DoorOpen className="h-4 w-4" />
      case "Occupied": return <Bed className="h-4 w-4" />
      case "Cleaning": return <WashingMachine className="h-4 w-4" />
      case "Maintenance": return <Hammer className="h-4 w-4" />
      default: return null
    }
  }

  return (
    <PortalLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Room Management</h1>
            <p className="text-muted-foreground">Monitor room status and manage occupancy efficiently.</p>
          </div>
          <Button className="w-full sm:w-auto flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Room
          </Button>
        </div>

        <Card className="border-none shadow-md">
          <CardHeader className="border-b bg-muted/20 pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search room number..." className="pl-10" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">All Rooms</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary bg-white text-green-600 border-green-200">Available (42)</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary bg-white text-blue-600 border-blue-200">Occupied (94)</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary bg-white text-orange-600 border-orange-200">Cleaning (6)</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary bg-white text-red-600 border-red-200">Maintenance (2)</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {rooms.map((room) => (
                <div key={room.id} className="bg-white p-6 hover:bg-secondary/20 transition-colors group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 flex items-center justify-center rounded-xl font-bold text-lg shadow-sm ${
                        room.status === 'Available' ? 'bg-green-50 text-green-600' :
                        room.status === 'Occupied' ? 'bg-blue-50 text-blue-600' :
                        room.status === 'Cleaning' ? 'bg-orange-50 text-orange-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {room.id}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{room.type}</p>
                        <p className="text-xs text-muted-foreground">{room.floor} Floor</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuItem>Assign Staff</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Mark Unavailable</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className={`flex items-center gap-1.5 px-3 py-1 font-medium ${getStatusColor(room.status)}`}>
                      {getStatusIcon(room.status)}
                      {room.status}
                    </Badge>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {room.status === 'Occupied' ? '2 Nights Left' : 'Ready'}
                    </span>
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