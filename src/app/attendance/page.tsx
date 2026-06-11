"use client"

import { PortalLayout } from "@/components/layout/portal-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock, Download } from "lucide-react"

const attendanceData = [
  { name: "John Doe", role: "Manager", date: "Today", in: "08:45 AM", out: "-", status: "Present", location: "Main Lobby" },
  { name: "Rahul Kumar", role: "Technician", date: "Today", in: "09:02 AM", out: "-", status: "Present", location: "Service Area" },
  { name: "Anita Sharma", role: "Housekeeper", date: "Today", in: "08:30 AM", out: "04:30 PM", status: "Completed", location: "3rd Floor" },
  { name: "Meena Roy", role: "Receptionist", date: "Today", in: "09:15 AM", out: "-", status: "Present", location: "Front Desk" },
]

export default function AttendancePage() {
  return (
    <PortalLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">Attendance Tracking</h1>
            <p className="text-muted-foreground">Monitor GPS-verified staff check-ins and shifts.</p>
          </div>
          <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Presence</p>
                <h3 className="text-2xl font-bold">18 / 22</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Punch In</p>
                <h3 className="text-2xl font-bold">08:52 AM</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verification</p>
                <h3 className="text-2xl font-bold">100% Verified</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-muted/20 pb-4">
            <CardTitle className="text-lg font-headline">Live Logs</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 hover:bg-muted/10">
                  <TableHead className="w-[200px]">Staff Member</TableHead>
                  <TableHead>Shift Date</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verification Area</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((row) => (
                  <TableRow key={row.name} className="hover:bg-secondary/20">
                    <TableCell className="font-bold">{row.name}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.in}</TableCell>
                    <TableCell>{row.out}</TableCell>
                    <TableCell>
                      <Badge className={
                        row.status === 'Present' ? 'bg-blue-100 text-blue-600 border-none' : 'bg-green-100 text-green-600 border-none'
                      }>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-primary" /> {row.location}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  )
}