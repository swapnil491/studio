"use client"

import { PortalLayout } from "@/components/layout/portal-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Bell, 
  Shield, 
  CreditCard, 
  User,
  Save,
  Hotel,
  Users,
  BarChart3,
  Globe,
  Monitor,
  Zap
} from "lucide-react"

export default function SettingsPage() {
  return (
    <PortalLayout>
      <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Preferences</h1>
          <p className="text-sm text-muted-foreground">Configure your property infrastructure and system behavior.</p>
        </div>

        <Tabs defaultValue="property" className="w-full">
          <TabsList className="flex items-center gap-1 w-full md:w-auto bg-secondary/30 p-1 rounded-xl mb-8 border border-border/30 overflow-x-auto scrollbar-hide">
            {[
              { id: 'property', icon: Building2, label: 'Property' },
              { id: 'profile', icon: User, label: 'Account' },
              { id: 'notifications', icon: Bell, label: 'Alerts' },
              { id: 'billing', icon: CreditCard, label: 'Plans' },
              { id: 'security', icon: Shield, label: 'Access' },
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-1.5 text-xs font-bold transition-all"
              >
                <tab.icon className="h-3.5 w-3.5" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="property" className="space-y-6 animate-in fade-in duration-300">
            <Card className="border-border/50 shadow-sm bg-card/40">
              <CardHeader>
                <CardTitle className="text-sm font-bold">Base Profile</CardTitle>
                <CardDescription className="text-[11px]">System details for client-facing interfaces.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center gap-4 border border-dashed border-border p-8 rounded-2xl bg-secondary/20 md:w-1/4">
                    <Hotel className="h-10 w-10 text-primary/40" />
                    <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold rounded-lg border-border/50 bg-background shadow-sm">Upload Logo</Button>
                  </div>
                  <div className="flex-1 grid gap-5">
                    <div className="grid gap-2">
                      <Label htmlFor="prop-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Property Title</Label>
                      <Input id="prop-name" defaultValue="Grand Palms Resort" className="h-9 text-xs border-border/50 bg-secondary/30" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="prop-address" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Location</Label>
                      <Input id="prop-address" defaultValue="Goa Main Beach Road, North Goa" className="h-9 text-xs border-border/50 bg-secondary/30" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="prop-phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact</Label>
                        <Input id="prop-phone" defaultValue="+91 98220 12345" className="h-9 text-xs border-border/50 bg-secondary/30" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="prop-email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</Label>
                        <Input id="prop-email" defaultValue="ops@grandpalms.com" className="h-9 text-xs border-border/50 bg-secondary/30" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t border-border/30">
                  <Button className="h-9 text-xs font-bold px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                    <Save className="mr-2 h-3.5 w-3.5" /> Update Identity
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm bg-card/40">
              <CardHeader>
                <CardTitle className="text-sm font-bold">Module Controls</CardTitle>
                <CardDescription className="text-[11px]">Toggle intelligent system features.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "GenAI Request Triage", desc: "Automate task categorization with LLMs.", active: true },
                  { title: "GPS Check-in", desc: "Require proximity for staff punch-in.", active: true },
                  { title: "Visual Proofs", desc: "Mandatory photos for maintenance completion.", active: false },
                  { title: "Smart Escalation", desc: "Auto-notify managers on SLA breaches.", active: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/20 transition-colors border border-transparent hover:border-border/30">
                    <div>
                      <p className="text-xs font-bold tracking-tight">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.active} className="scale-75" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="animate-in fade-in duration-300">
            <Card className="border-border/50 shadow-sm bg-card/40 overflow-hidden">
              <div className="bg-primary p-10 text-primary-foreground relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Zap className="h-40 w-40" />
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Enterprise Account</p>
                    <h2 className="text-4xl font-black tracking-tight">HostUp Pro Plus</h2>
                  </div>
                  <Badge className="bg-white text-primary hover:bg-white text-[10px] font-black uppercase tracking-wider py-1.5 px-6 rounded-full shadow-2xl">Premium Tier</Badge>
                </div>
                <div className="mt-10 flex flex-wrap gap-10 relative z-10">
                   <div>
                      <p className="text-[10px] font-bold uppercase opacity-60">Billing Amount</p>
                      <p className="text-2xl font-black tracking-tighter">₹12,499<span className="text-xs font-medium opacity-60 ml-1">/mo</span></p>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold uppercase opacity-60">Renewal Date</p>
                      <p className="text-2xl font-black tracking-tighter">July 15, 2024</p>
                   </div>
                </div>
              </div>
              <CardContent className="p-8 space-y-8">
                 <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { icon: Hotel, label: 'Room Limit', val: '150', sub: '128 Used' },
                      { icon: Users, label: 'Staff Seats', val: '50', sub: '18 Active' },
                      { icon: BarChart3, label: 'Reports', val: '∞', sub: 'Advanced Audit' },
                    ].map((feat, i) => (
                      <div key={i} className="p-6 bg-secondary/20 rounded-2xl border border-border/30 flex flex-col items-center gap-2 text-center group hover:bg-background transition-colors shadow-sm hover:shadow-md">
                         <feat.icon className="h-5 w-5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                         <h5 className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">{feat.label}</h5>
                         <p className="text-3xl font-black tracking-tighter">{feat.val}</p>
                         <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-tighter">{feat.sub}</p>
                      </div>
                    ))}
                 </div>
                 <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 h-11 text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">Payment Portal</Button>
                    <Button variant="outline" className="flex-1 h-11 text-xs font-black uppercase tracking-widest border-border/50 bg-background shadow-sm">Plan Details</Button>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  )
}
