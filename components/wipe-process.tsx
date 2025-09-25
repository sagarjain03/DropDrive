"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Pause,
  Square,
  HardDrive,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Settings,
  FileText,
} from "lucide-react"

type WipeStatus = "idle" | "running" | "paused" | "completed" | "error"



function formatBytes(bytes: number) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function WipeProcess() {
  const [wipeStatus, setWipeStatus] = useState<WipeStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [wipeMethod, setWipeMethod] = useState("dod-5220")
  const [drives, setDrives] = useState<any[]>([]);
  const [loadingDrives, setLoadingDrives] = useState(true);
  const [selectedDrive, setSelectedDrive] = useState<string | null>(null);

  useEffect(() => {
    // @ts-ignore (Electron preload should expose this)
    window.api.getDrives().then((result: any[]) => {
      setDrives(result);
      setLoadingDrives(false);
    });
  }, []);



  const wipeMethods = [
    { id: "dod-5220", name: "DoD 5220.22-M (3 passes)", description: "US Department of Defense standard" },
    { id: "nist-800", name: "NIST 800-88 (1 pass)", description: "NIST purge method for SSDs" },
    { id: "gutmann", name: "Gutmann (35 passes)", description: "Most secure, longest duration" },
    { id: "random", name: "Random Data (1 pass)", description: "Fast single pass with random data" },
  ]

  const handleStartWipe = () => {
    if (!selectedDrive) return
    setWipeStatus("running")
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setWipeStatus("completed")
          return 100
        }
        return prev + 1
      })
    }, 100)
  }

  const handlePauseWipe = () => {
    setWipeStatus("paused")
  }

  const handleStopWipe = () => {
    setWipeStatus("idle")
    setProgress(0)
  }

  const getStatusColor = () => {
    switch (wipeStatus) {
      case "idle":
        return "text-muted-foreground"
      case "running":
        return "text-primary"
      case "paused":
        return "text-yellow-500"
      case "completed":
        return "text-secondary"
      case "error":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = () => {
    switch (wipeStatus) {
      case "idle":
        return <Clock className="h-4 w-4" />
      case "running":
        return <Play className="h-4 w-4" />
      case "paused":
        return <Pause className="h-4 w-4" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = () => {
    switch (wipeStatus) {
      case "idle":
        return "Ready to start"
      case "running":
        return "Wiping in progress..."
      case "paused":
        return "Wipe paused"
      case "completed":
        return "Wipe completed successfully"
      case "error":
        return "Error occurred during wipe"
      default:
        return "Unknown status"
    }
  }

  {
    selectedDrive && (() => {
      const drive = drives.find(d => d.device === selectedDrive);
      return (
        <div className="my-2 p-2 border rounded">
          <div><b>Name:</b> {drive?.description}</div>
          <div><b>Device:</b> {drive?.device}</div>
          <div><b>Size:</b> {formatBytes(drive?.size)}</div>
          <div><b>Type:</b> {drive?.busType}{drive?.isRemovable ? ' (Removable)' : ''}</div>
          <div><b>Mountpoints:</b> {(drive?.mountpoints || []).map((mp: { path: string }) => mp.path).join(', ')}</div>
        </div>
      );
    })()
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Secure Wipe Process</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Configure and execute secure data wiping operations with industry-standard methods
        </p>
      </div>

      {/* Configuration Panel */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
        {/* Drive Selection */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Drive Selection
              </CardTitle>
              <CardDescription>Choose the storage device to securely wipe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={selectedDrive || undefined}
                onValueChange={setSelectedDrive}
                disabled={wipeStatus === 'running'}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a drive to wipe" />
                </SelectTrigger>
                <SelectContent>
                  {loadingDrives ? <div>Loading drives...</div> : drives.map((drive, idx) =>
                    drive.mountpoints.map((mp: { path: string, total?: number, free?: number }, midx: number) => (
                      <SelectItem key={drive.device + mp.path} value={mp.path}>
                        <div className="flex items-center gap-2 w-full">
                          <span className="flex-1 truncate">{drive.description || drive.device} [{mp.path}]</span>
                          <Badge variant="outline" className="ml-auto flex-shrink-0">
                            {formatBytes(mp.total || drive.size)} total
                          </Badge>
                          <Badge variant="outline" className="ml-2 flex-shrink-0">
                            {formatBytes(mp.free ?? 0)} free
                          </Badge>
                          <Badge variant="outline" className="ml-2 flex-shrink-0 ">{drive.busType}</Badge>
                        </div>
                      </SelectItem>
                    )))
                  }
                </SelectContent>
              </Select>


              {selectedDrive && (
                <div className="p-4 rounded-lg border border-border bg-card/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-card-foreground">
                        {drives.find((d) => d.id === selectedDrive)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {drives.find((d) => d.id === selectedDrive)?.type} •{" "}
                        {drives.find((d) => d.id === selectedDrive)?.size}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      Ready
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wipe Method */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Wipe Method
              </CardTitle>
              <CardDescription>Select the security standard for data destruction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={wipeMethod} onValueChange={setWipeMethod} disabled={wipeStatus === "running"}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {wipeMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{method.name}</span>
                        <span className="text-xs text-muted-foreground">{method.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {wipeMethod && (
                <div className="p-4 rounded-lg border border-border bg-card/50">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-card-foreground">
                        {wipeMethods.find((m) => m.id === wipeMethod)?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {wipeMethods.find((m) => m.id === wipeMethod)?.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Progress Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Wipe Progress
              </CardTitle>
              <CardDescription>Real-time status and progress of the wipe operation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className={`flex items-center gap-2 ${getStatusColor()}`}>
                  {getStatusIcon()}
                  <span className="font-medium text-sm md:text-base">{getStatusText()}</span>
                </div>
                <Badge
                  variant={wipeStatus === "completed" ? "default" : "secondary"}
                  className={wipeStatus === "completed" ? "bg-secondary text-secondary-foreground" : ""}
                >
                  {wipeStatus.charAt(0).toUpperCase() + wipeStatus.slice(1)}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-card-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              {/* Estimated Time */}
              {wipeStatus === "running" && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated time remaining</span>
                  <span className="font-medium text-card-foreground">
                    {Math.max(0, Math.ceil((100 - progress) * 0.5))} minutes
                  </span>
                </div>
              )}

              <Separator />

              {/* Control Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleStartWipe}
                  disabled={!selectedDrive || wipeStatus === "running"}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Wipe
                </Button>

                {wipeStatus === "running" && (
                  <Button onClick={handlePauseWipe} variant="outline" className="flex-1 bg-transparent">
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </Button>
                )}

                {(wipeStatus === "running" || wipeStatus === "paused") && (
                  <Button onClick={handleStopWipe} variant="destructive" className="flex-1">
                    <Square className="mr-2 h-4 w-4" />
                    Stop
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Panel */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground">Operation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-sm text-muted-foreground">Selected Drive</span>
                  <span className="text-sm font-medium text-card-foreground text-right">
                    {selectedDrive ? drives.find((d) => d.id === selectedDrive)?.name : "None"}
                  </span>
                </div>

                <div className="flex justify-between items-start gap-2">
                  <span className="text-sm text-muted-foreground">Wipe Method</span>
                  <span className="text-sm font-medium text-card-foreground text-right">
                    {wipeMethods.find((m) => m.id === wipeMethod)?.name.split(" ")[0] || "DoD"}
                  </span>
                </div>

                <div className="flex justify-between items-start gap-2">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className={`text-sm font-medium ${getStatusColor()}`}>{getStatusText()}</span>
                </div>

                {wipeStatus === "running" && (
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-sm text-muted-foreground">Current Pass</span>
                    <span className="text-sm font-medium text-card-foreground">{Math.ceil(progress / 33)} of 3</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {wipeStatus === "completed" && (
            <Card className="bg-card border-border border-secondary">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  Wipe Complete
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The secure wipe operation has been completed successfully. A certificate will be generated
                  automatically.
                </p>
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Certificate
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
