"use client"

import { useState } from "react"
import { PortalLayout } from "@/components/layout/portal-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  Sparkles, 
  Loader2, 
  ConciergeBell,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Search,
  Filter,
  Zap
} from "lucide-react"
import { aiPoweredRequestTriage } from "@/ai/flows/ai-powered-request-triage-flow"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export default function ServiceRequestsPage() {
  const [description, setDescription] = useState("")
  const [isTriaging, setIsTriaging] = useState(false)
  const [triageResult, setTriageResult] = useState<{ category: string, details: string } | null>(null)
  const [open, setOpen] = useState(false)

  const handleTriage = async () => {
    if (!description) return
    setIsTriaging(true)
    try {
      const result = await aiPoweredRequestTriage({ requestDescription: description })
      setTriageResult({
        category: result.suggestedCategory,
        details: result.extractedDetails
      })
    } catch (error) {
      toast({ title: "Triage failed", description: "AI could not process this request.", variant: "destructive" })
    } finally {
      setIsTriaging(false)
    }
  }

  const handleCreateRequest = () => {
    toast({ title: "Request Created", description: "The service request has been assigned." })
    setOpen(false)
    setDescription("")
    setTriageResult(null)
  }

  const requests = [
    { id: "REQ-001", room: "302", type: "Maintenance", staff: "Rahul K.", status: "Pending", time: "10m ago" },
    { id: "REQ-002", room: "105", type: "Housekeeping", staff: "Anita S.", status: "In Progress", time: "25m ago" },
    { id: "REQ-003", room: "212", type: "Guest Service", staff: "Meena R.", status: "Completed", time: "1h ago" },
  ]

  return (
    <PortalLayout>
      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Active Queue</h1>
            <p className="text-sm text-muted-foreground">Manage guest demands with real-time AI assistance.</p>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-9 text-xs font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                <Plus className="mr-2 h-3.5 w-3.5" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-2xl border-border/50 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">New Service Request</DialogTitle>
                <DialogDescription className="text-xs">
                  Describe the guest's need. Our AI will handle categorization and details.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-5 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="room" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Room Reference</Label>
                  <Input id="room" placeholder="e.g. 302" className="h-9 text-xs border-border/50 bg-secondary/30" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Request Context</Label>
                  <div className="relative">
                    <Textarea 
                      id="description" 
                      placeholder="e.g. Guest mentioned AC is making a rattling noise..."
                      className="min-h-[120px] text-xs pr-10 border-border/50 bg-secondary/30 rounded-xl"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="absolute right-2 bottom-2 h-7 w-7 text-primary hover:text-primary hover:bg-primary/10 rounded-lg"
                      onClick={handleTriage}
                      disabled={isTriaging || !description}
                    >
                      {isTriaging ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </div>

                {triageResult && (
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3" /> AI Triage Suggestion
                      </span>
                      <Badge variant="secondary" className="bg-primary text-white text-[9px] font-bold h-5 px-2">
                        {triageResult.category}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-foreground/80 leading-relaxed font-medium">
                        {triageResult.details}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="staff" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Assign Agent</Label>
                  <Select>
                    <SelectTrigger className="h-9 text-xs border-border/50 bg-secondary/30">
                      <SelectValue placeholder="Choose staff member" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="rahul" className="text-xs font-medium">Rahul K. (Maintenance)</SelectItem>
                      <SelectItem value="anita" className="text-xs font-medium">Anita S. (Housekeeping)</SelectItem>
                      <SelectItem value="meena" className="text-xs font-medium">Meena R. (Guest Services)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" size="sm" onClick={() => setOpen(false)} className="rounded-lg text-xs font-bold h-9">Cancel</Button>
                <Button size="sm" onClick={handleCreateRequest} className="rounded-lg text-xs font-bold h-9 px-6">Submit Ticket</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          <Card className="border-border/50 shadow-sm bg-card/40 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/30 pb-4">
              <div className="flex items-center gap-2">
                <div className="relative w-64 hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Filter requests..." className="pl-9 h-8 text-xs border-border/50 bg-secondary/30" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold border-border/50 bg-background/50">
                  <Filter className="mr-1.5 h-3 w-3" /> Sort
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/30">
                {requests.map((req) => (
                  <div key={req.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-secondary/20 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-background text-primary font-bold text-xs shadow-sm border border-border/50 shrink-0 group-hover:scale-105 transition-transform">
                        {req.room}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm tracking-tight">{req.type}</h4>
                          <span className="text-[9px] text-muted-foreground font-black bg-muted px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">#{req.id}</span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-medium">
                          <span className="flex items-center gap-1.5 uppercase tracking-wide"><Users className="h-3 w-3" /> {req.staff}</span>
                          <span className="flex items-center gap-1.5 uppercase tracking-wide"><Clock className="h-3 w-3" /> {req.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`text-[9px] font-black uppercase tracking-tight px-3 h-6 flex items-center gap-1.5 border-none shadow-none ${
                        req.status === 'Pending' ? 'bg-orange-500/10 text-orange-500' :
                        req.status === 'In Progress' ? 'bg-blue-500/10 text-blue-600' :
                        'bg-emerald-500/10 text-emerald-600'
                      }`}>
                        {req.status === 'Pending' && <Clock className="h-2.5 w-2.5" />}
                        {req.status === 'In Progress' && <Loader2 className="h-2.5 w-2.5 animate-spin" />}
                        {req.status === 'Completed' && <CheckCircle2 className="h-2.5 w-2.5" />}
                        {req.status}
                      </Badge>
                      <Button variant="secondary" size="sm" className="h-7 text-[10px] font-bold px-4 rounded-lg bg-background border border-border/50 shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  )
}