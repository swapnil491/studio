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
  Users
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
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Service Requests</h1>
            <p className="text-muted-foreground">Manage guest needs with AI-powered triage support.</p>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>New Service Request</DialogTitle>
                <DialogDescription>
                  Enter the request details. AI will help categorize and extract key info.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="room">Room Number</Label>
                  <Input id="room" placeholder="e.g. 302" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">What does the guest need?</Label>
                  <div className="relative">
                    <Textarea 
                      id="description" 
                      placeholder="e.g. The guest mentioned that the AC is making a weird rattling noise and it's getting hot."
                      className="min-h-[100px] pr-10"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="absolute right-2 bottom-2 h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                      onClick={handleTriage}
                      disabled={isTriaging || !description}
                    >
                      {isTriaging ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> AI Triage enabled
                  </p>
                </div>

                {triageResult && (
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary uppercase">AI Suggested Category</span>
                      <Badge variant="secondary" className="bg-primary text-white hover:bg-primary">
                        {triageResult.category}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-primary uppercase">Extracted Details</span>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {triageResult.details}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="staff">Assign Staff</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rahul">Rahul K. (Maintenance)</SelectItem>
                      <SelectItem value="anita">Anita S. (Housekeeping)</SelectItem>
                      <SelectItem value="meena">Meena R. (Guest Services)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateRequest}>Create Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <CardTitle className="text-lg font-headline">Active Queue</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Filter</Button>
                <Button variant="outline" size="sm">Sort</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {requests.map((req) => (
                  <div key={req.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary font-bold shadow-sm shrink-0">
                        {req.room}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-lg">{req.type}</h4>
                          <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">#{req.id}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {req.staff}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {req.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={req.status === 'Completed' ? 'default' : 'secondary'} className={
                        req.status === 'Pending' ? 'bg-red-100 text-red-600 border-red-200' :
                        req.status === 'In Progress' ? 'bg-orange-100 text-orange-600 border-orange-200' :
                        'bg-green-100 text-green-600 border-green-200'
                      }>
                        {req.status === 'Pending' && <Clock className="h-3 w-3 mr-1" />}
                        {req.status === 'In Progress' && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                        {req.status === 'Completed' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {req.status}
                      </Badge>
                      <Button variant="outline" size="sm">Manage</Button>
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
