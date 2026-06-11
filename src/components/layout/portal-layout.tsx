"use client"

import { AppSidebar } from "./app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background px-6 transition-all">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <div className="hidden md:flex relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search rooms, staff, tasks..." 
                className="pl-10 w-[300px] bg-secondary/50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <div className="flex items-center gap-2 pl-2 cursor-pointer hover:bg-secondary/80 p-1.5 rounded-lg transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                JD
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-semibold leading-none">John Doe</span>
                <span className="text-xs text-muted-foreground">Manager</span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 space-y-8 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </div>
  )
}