"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { HardDrive, Monitor, Cpu, MemoryStick, Shield, Clock, CheckCircle2, AlertTriangle } from "lucide-react"

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome to DropDrive</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Professional data wiping solution for secure data destruction and compliance
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Shield className="mr-2 h-4 w-4" />
              Start Secure Wipe
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">Last Wipe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-secondary" />
              <span className="text-sm text-card-foreground">2 hours ago</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">SSD Drive - 512GB</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                24 Total
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-secondary"></div>
              <span className="text-sm text-card-foreground">Ready</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              System Information
            </CardTitle>
            <CardDescription>Current system specifications and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-card-foreground">Processor</span>
                </div>
                <span className="text-sm font-medium text-card-foreground">Intel Core i7-12700K</span>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <MemoryStick className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-card-foreground">Memory</span>
                </div>
                <span className="text-sm font-medium text-card-foreground">32 GB DDR4</span>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-card-foreground">Storage</span>
                </div>
                <span className="text-sm font-medium text-card-foreground">2 TB NVMe SSD</span>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-card-foreground">OS</span>
                </div>
                <span className="text-sm font-medium text-card-foreground">Windows 11 Pro</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest wipe operations and system events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-card-foreground">Secure wipe completed</p>
                  <p className="text-xs text-muted-foreground">Samsung SSD 970 EVO - 512GB • 2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-card-foreground">Certificate generated</p>
                  <p className="text-xs text-muted-foreground">DOD 5220.22-M standard • 2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-card-foreground">System update available</p>
                  <p className="text-xs text-muted-foreground">SecureWipe Pro v2.1.1 • 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Connected Storage Devices
          </CardTitle>
          <CardDescription>Available drives for secure wiping operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <div className="p-4 rounded-lg border border-border bg-card/50">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="text-sm font-medium text-card-foreground">Primary SSD (C:)</span>
                <Badge variant="outline" className="text-xs">
                  System
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Used: 245 GB</span>
                  <span>Total: 512 GB</span>
                </div>
                <Progress value={48} className="h-2" />
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card/50">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="text-sm font-medium text-card-foreground">External HDD (E:)</span>
                <Badge variant="secondary" className="text-xs bg-secondary text-secondary-foreground">
                  Available
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Used: 1.2 TB</span>
                  <span>Total: 2 TB</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card/50">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="text-sm font-medium text-card-foreground">USB Drive (F:)</span>
                <Badge variant="secondary" className="text-xs bg-secondary text-secondary-foreground">
                  Available
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Used: 8 GB</span>
                  <span>Total: 64 GB</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
