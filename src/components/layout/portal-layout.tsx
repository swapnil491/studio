"use client"

import { AppSidebar } from "./app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Bell, Search, User, Moon, Sun, Command, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export function PortalLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="flex min-h-screen w-full bg-background font-body">
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b bg-background/80 backdrop-blur-md px-4 transition-all lg:px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="hover:bg-secondary/80" />
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <div className="hidden md:flex relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <Input 
                placeholder="Search anything..." 
                className="pl-9 h-8 w-[240px] lg:w-[320px] bg-secondary/40 border-transparent text-xs focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:bg-background transition-all"
              />
              <div className="absolute right-2 inset-y-0 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <div className="hidden sm:flex items-center gap-1 bg-secondary/50 rounded-full p-1 border border-border/50">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-7 w-7 rounded-full ${!isDark ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
                  onClick={() => setIsDark(false)}
                >
                  <Sun className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-7 w-7 rounded-full ${isDark ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
                  onClick={() => setIsDark(true)}
                >
                  <Moon className="h-3.5 w-3.5" />
                </Button>
             </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 hover:bg-secondary/80 rounded-full">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0 overflow-hidden rounded-xl shadow-2xl border-border/50">
                <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Notifications</h4>
                  <Badge variant="secondary" className="text-[10px] font-bold">3 New</Badge>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {[
                    { title: "New Maintenance Ticket", time: "2m ago", desc: "Room 302: Leak reported", icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10" },
                    { title: "Shift Starting Soon", time: "15m ago", desc: "Rahul K. is due in 15 mins", icon: User, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { title: "Occupancy Alert", time: "1h ago", desc: "Hotel is 95% full for tonight", icon: Command, color: "text-purple-500", bg: "bg-purple-500/10" },
                  ].map((n, i) => (
                    <div key={i} className="p-4 hover:bg-secondary/50 cursor-pointer border-b last:border-0 transition-colors">
                      <div className="flex gap-3">
                        <div className={`h-8 w-8 rounded-lg ${n.bg} flex items-center justify-center shrink-0`}>
                          <n.icon className={`h-4 w-4 ${n.color}`} />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold leading-none">{n.title}</p>
                          <p className="text-[10px] text-muted-foreground">{n.desc}</p>
                          <p className="text-[9px] text-muted-foreground/60 font-medium">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t bg-muted/10 text-center">
                  <Button variant="link" className="text-[11px] h-auto p-0 font-bold">View all notifications</Button>
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-2 pl-2 cursor-pointer group">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-[10px] ring-2 ring-background shadow-sm group-hover:scale-105 transition-transform">
                JD
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
          {children}
        </main>
      </SidebarInset>
    </div>
  )
}