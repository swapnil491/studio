"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Hotel, 
  WashingMachine, 
  ConciergeBell, 
  Hammer, 
  CheckCircle2, 
  ChevronLeft,
  Bath
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function GuestKioskPage() {
  const [step, setStep] = useState<'welcome' | 'room' | 'success'>('welcome')
  const [requestType, setRequestType] = useState("")
  const [roomNumber, setRoomNumber] = useState("")

  const services = [
    { id: "cleaning", label: "Room Cleaning", icon: WashingMachine, color: "bg-blue-600" },
    { id: "towels", label: "Fresh Towels", icon: Bath, color: "bg-teal-600" },
    { id: "service", label: "Room Service", icon: ConciergeBell, color: "bg-indigo-600" },
    { id: "maintenance", label: "Maintenance", icon: Hammer, color: "bg-orange-600" },
  ]

  const handleServiceSelect = (service: string) => {
    setRequestType(service)
    setStep('room')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (roomNumber) setStep('success')
  }

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex flex-col font-body p-6 md:p-12">
      <header className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
            <Hotel className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-headline font-black text-primary leading-tight">HostUp Pro</h1>
            <p className="text-muted-foreground font-medium">Grand Palms Resort Guest Portal</p>
          </div>
        </div>
        {step !== 'welcome' && step !== 'success' && (
          <Button variant="ghost" onClick={() => setStep('welcome')} className="text-lg font-bold">
            <ChevronLeft className="mr-2 h-6 w-6" /> Back
          </Button>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
        {step === 'welcome' && (
          <div className="text-center w-full animate-in fade-in zoom-in duration-500">
            <h2 className="text-5xl font-black mb-4 leading-tight">Welcome to <span className="text-primary">Paradise</span></h2>
            <p className="text-xl text-muted-foreground mb-16 font-medium">How can we assist you today?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {services.map((service) => (
                <Card 
                  key={service.id} 
                  className="cursor-pointer overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 group"
                  onClick={() => handleServiceSelect(service.label)}
                >
                  <CardContent className="p-10 flex items-center gap-8">
                    <div className={`h-24 w-24 rounded-3xl ${service.color} flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform`}>
                      <service.icon className="h-12 w-12" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-black mb-1">{service.label}</h3>
                      <p className="text-muted-foreground font-medium">Touch to request service</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 'room' && (
          <div className="text-center w-full max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="mb-12 h-24 w-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto">
              <ConciergeBell className="h-12 w-12" />
            </div>
            <h2 className="text-4xl font-black mb-4">Requesting {requestType}</h2>
            <p className="text-xl text-muted-foreground mb-12">Please enter your room number to continue.</p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <Input 
                autoFocus
                placeholder="Room Number (e.g. 302)" 
                className="h-24 text-4xl text-center font-black rounded-3xl border-4 focus-visible:ring-primary/20 border-primary/10"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
              <Button type="submit" size="lg" className="h-20 w-full text-2xl font-black rounded-3xl shadow-xl">
                Submit Request
              </Button>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center w-full max-w-xl animate-in fade-in zoom-in duration-700">
            <div className="mb-12 h-40 w-40 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto shadow-inner">
              <CheckCircle2 className="h-20 w-20" />
            </div>
            <h2 className="text-5xl font-black mb-6">Request Submitted!</h2>
            <p className="text-2xl text-muted-foreground mb-12 leading-relaxed">
              We've received your request for <span className="font-bold text-slate-800">{requestType}</span> in <span className="font-bold text-slate-800">Room {roomNumber}</span>.
            </p>
            
            <div className="p-8 bg-white rounded-3xl shadow-xl border mb-16">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Estimated Response Time</p>
              <p className="text-4xl font-black text-primary">15 Minutes</p>
            </div>

            <Button onClick={() => setStep('welcome')} variant="outline" size="lg" className="h-20 px-12 text-2xl font-black rounded-3xl border-2">
              Done
            </Button>
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-muted-foreground font-medium">
        <p>© 2024 HostUp Pro. Built for modern hospitality.</p>
      </footer>
    </div>
  )
}