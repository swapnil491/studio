"use client"

import { PortalLayout } from "@/components/layout/portal-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MoreVertical,
  ShieldCheck,
  Smartphone
} from "lucide-react"

const staff = [
  { name: "John Doe", role: "Manager", dept: "Management", phone: "+91 98765 43210", status: "On Duty", img: "https://picsum.photos/seed/staff1/200/200" },
  { name: "Rahul Kumar", role: "Technician", dept: "Maintenance", phone: "+91 98765 11111", status: "On Duty", img: "https://picsum.photos/seed/staff2/200/200" },
  { name: "Anita Sharma", role: "Housekeeper", dept: "Housekeeping", phone: "+91 98765 22222", status: "Off Duty", img: "https://picsum.photos/seed/staff3/200/200" },
  { name: "Meena Roy", role: "Receptionist", dept: "Front Desk", phone: "+91 98765 33333", status: "On Duty", img: "https://picsum.photos/seed/staff4/200/200" },
  { name: "Suresh P.", role: "Supervisor", dept: "Housekeeping", phone: "+91 98765 44444", status: "On Duty", img: "https://picsum.photos/seed/staff5/200/200" },
]

export default function StaffPage() {
  return (
    <PortalLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Staff Directory</h1>
            <p className="text-muted-foreground">Manage your team, roles, and communication.</p>
          </div>
          <Button className="w-full sm:w-auto flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Staff Member
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or department..." className="pl-10" />
          </div>
          <Button variant="outline" className="hidden md:flex">Filter Roles</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {staff.map((person) => (
            <Card key={person.name} className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary/10">
                      <AvatarImage src={person.img} alt={person.name} />
                      <AvatarFallback className="bg-primary/5 text-primary font-bold">{person.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl font-headline">{person.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1.5 font-medium">
                        {person.dept} • {person.role}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={`${person.status === 'On Duty' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'} border-none shadow-none`}>
                    {person.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="secondary" className="w-full flex items-center justify-center gap-2 bg-slate-50 border border-slate-200">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  <Button variant="secondary" className="w-full flex items-center justify-center gap-2 bg-slate-50 border border-slate-200">
                    <Mail className="h-4 w-4" />
                    Message
                  </Button>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                    <Smartphone className="h-3 w-3" /> Mobile App Active
                   </div>
                   <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                   </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalLayout>
  )
}