"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  BedDouble, 
  ConciergeBell, 
  WashingMachine, 
  Hammer, 
  Users, 
  CalendarCheck, 
  BarChart3, 
  Settings,
  Hotel,
  Tablet,
  Smartphone,
  ChevronRight,
  Sparkles
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Inventory", icon: BedDouble, url: "/rooms" },
  { title: "Service Hub", icon: ConciergeBell, url: "/requests" },
  { title: "Housekeeping", icon: WashingMachine, url: "/housekeeping" },
  { title: "Maintenance", icon: Hammer, url: "/maintenance" },
  { title: "Team Hub", icon: Users, url: "/staff" },
  { title: "Attendance", icon: CalendarCheck, url: "/attendance" },
  { title: "Analytics", icon: BarChart3, url: "/reports" },
]

const externalTools = [
  { title: "Guest Kiosk", icon: Tablet, url: "/kiosk" },
  { title: "Staff Mobile", icon: Smartphone, url: "/mobile" },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 shadow-2xl">
      <SidebarHeader className="px-5 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/10">
            <Hotel className="h-6 w-6" />
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-lg leading-tight tracking-tight">HostUp Pro</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-70">Enterprise v2.0</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden px-2 mb-2 text-[10px] font-black uppercase tracking-widest opacity-60">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className={`h-9 rounded-xl transition-all duration-200 ${
                      pathname === item.url 
                        ? 'bg-primary/5 text-primary shadow-sm ring-1 ring-primary/10' 
                        : 'hover:bg-secondary/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${pathname === item.url ? 'text-primary' : ''}`} />
                      <span className="text-xs font-bold tracking-tight">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden px-2 mb-2 text-[10px] font-black uppercase tracking-widest opacity-60">Interfaces</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {externalTools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="text-xs font-bold tracking-tight">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-8 px-2 group-data-[collapsible=icon]:hidden">
           <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 relative overflow-hidden group hover:bg-primary/10 transition-all">
              <Sparkles className="absolute -top-2 -right-2 h-12 w-12 text-primary/10 rotate-12 group-hover:scale-125 transition-transform" />
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">AI Assistant</p>
              <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">Triage is active. 12 requests categorized today.</p>
           </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" className="h-10 rounded-xl hover:bg-secondary/80 transition-all">
              <Link href="/settings" className="flex items-center gap-3">
                <Settings className="h-4 w-4" />
                <span className="text-xs font-bold tracking-tight">System Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}