"use client"

import { PortalLayout } from "@/components/layout/portal-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building2, 
  Bell, 
  Shield, 
  CreditCard, 
  User,
  Save,
  Hotel
} from "lucide-react"

export default function SettingsPage() {
  return (
    <PortalLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-headline font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your property, team, and account preferences.</p>
        </div>

        <Tabs defaultValue="property" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-muted/20 p-1 rounded-xl mb-8">
            <TabsTrigger value="property" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Building2 className="h-4 w-4" /> Property
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <User className="h-4 w-4" /> My Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <CreditCard className="h-4 w-4" /> Subscription
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Shield className="h-4 w-4" /> Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="property" className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
                <CardDescription>Public details of your hotel as seen on reports and kiosks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-4 border-2 border-dashed border-slate-200 p-8 rounded-2xl bg-slate-50 md:w-1/3">
                    <Hotel className="h-16 w-16 text-primary/30" />
                    <Button variant="outline" size="sm">Change Logo</Button>
                  </div>
                  <div className="flex-1 grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="prop-name">Property Name</Label>
                      <Input id="prop-name" defaultValue="Grand Palms Resort" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="prop-address">Address</Label>
                      <Input id="prop-address" defaultValue="Goa Main Beach Road, North Goa, 403512" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="prop-phone">Primary Phone</Label>
                        <Input id="prop-phone" defaultValue="+91 98220 12345" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="prop-email">Support Email</Label>
                        <Input id="prop-email" defaultValue="hello@grandpalms.com" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>System Config</CardTitle>
                <CardDescription>Core behavior of HostUp Pro for your team.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">AI Triage for Service Requests</p>
                    <p className="text-sm text-muted-foreground">Automatically suggest categories using GenAI.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">GPS Verified Check-in</p>
                    <p className="text-sm text-muted-foreground">Staff must be within 100m of property to punch in.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">Photo Proof for Maintenance</p>
                    <p className="text-sm text-muted-foreground">Require photo upload before marking tasks complete.</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="border-none shadow-md overflow-hidden">
              <div className="bg-primary p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary-foreground/80 font-bold uppercase tracking-widest text-xs mb-1">Current Plan</p>
                    <h2 className="text-4xl font-black">Pro Property Plus</h2>
                  </div>
                  <Badge className="bg-white text-primary hover:bg-white/90 text-sm py-1.5 px-4 font-bold">Active</Badge>
                </div>
                <p className="mt-8 text-lg opacity-90">Your next billing of <span className="font-bold">₹12,499</span> is on <span className="font-bold">July 15, 2024</span>.</p>
              </div>
              <CardContent className="p-8 space-y-8">
                 <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 text-center">
                       <Hotel className="h-8 w-8 text-primary" />
                       <h5 className="font-bold">Max Rooms</h5>
                       <p className="text-3xl font-black text-slate-800">150</p>
                       <p className="text-xs text-muted-foreground">128 Used</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 text-center">
                       <Users className="h-8 w-8 text-primary" />
                       <h5 className="font-bold">Staff Slots</h5>
                       <p className="text-3xl font-black text-slate-800">50</p>
                       <p className="text-xs text-muted-foreground">18 Used</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 text-center">
                       <BarChart3 className="h-8 w-8 text-primary" />
                       <h5 className="font-bold">Reports</h5>
                       <p className="text-3xl font-black text-slate-800">Unlimited</p>
                       <p className="text-xs text-muted-foreground">Advanced Analytics Enabled</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <Button className="flex-1 h-12 text-lg font-bold">Manage Billing</Button>
                    <Button variant="outline" className="flex-1 h-12 text-lg font-bold border-2">Change Plan</Button>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  )
}