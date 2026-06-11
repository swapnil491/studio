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
  Smartphone,
  Filter
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
      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Hub</h1>
            <p className="text-sm text-muted-foreground">Manage organizational structure and staff presence.</p>
          </div>
          <Button className="h-9 text-xs font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 px-6">
            <Plus className="mr-2 h-3.5 w-3.5" />
            Add Member
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input placeholder="Search member..." className="pl-9 h-9 text-xs border-border/50 bg-secondary/30" />
          </div>
          <Button variant="outline" size="sm" className="h-9 text-[10px] font-bold border-border/50 bg-background/50">
            <Filter className="mr-1.5 h-3 w-3" /> Filters
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {staff.map((person) => (
            <Card key={person.name} className="border-border/50 shadow-sm bg-card/40 hover:bg-card transition-all hover:shadow-md group overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14 rounded-2xl border border-border/50 group-hover:scale-105 transition-transform">
                      <AvatarImage src={person.img} alt={person.name} className="object-cover" />
                      <AvatarFallback className="bg-primary/5 text-primary font-bold text-xs">{person.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5">
                      <CardTitle className="text-sm font-bold tracking-tight">{person.name}</CardTitle>
                      <CardDescription className="text-[10px] font-bold uppercase text-muted-foreground/70 tracking-tighter">
                        {person.dept} • {person.role}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={`text-[9px] font-black uppercase px-2 py-0 border-none shadow-none ${
                    person.status === 'On Duty' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-500/10 text-slate-500'
                  }`}>
                    {person.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="secondary" size="sm" className="h-8 text-[10px] font-bold bg-background border border-border/50 shadow-sm hover:bg-primary/5 transition-all">
                    <Phone className="h-3 w-3 mr-1.5" />
                    Call
                  </Button>
                  <Button variant="secondary" size="sm" className="h-8 text-[10px] font-bold bg-background border border-border/50 shadow-sm hover:bg-primary/5 transition-all">
                    <Mail className="h-3 w-3 mr-1.5" />
                    Mail
                  </Button>
                </div>
                <div className="pt-3 border-t border-border/30 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                    <Smartphone className="h-3 w-3" /> App Active
                   </div>
                   <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                    <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
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