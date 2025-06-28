"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, TrendingUp, Brain, Zap, MessageSquare, Mail, FileText, Users } from "lucide-react"
import DailyCEOReport from "./components/daily-ceo-report"
import RiskAlerts from "./components/risk-alerts"
import DecisionAssist from "./components/decision-assist"
import AutopilotMode from "./components/autopilot-mode"
import CommandCenter from "./components/command-center"
import EmailProcessor from "./components/email-processor"
import DocumentManager from "./components/document-manager"

export default function CEODashboard() {
  const [activeAlerts, setActiveAlerts] = useState(3)
  const [pendingTasks, setPendingTasks] = useState(12)
  const [processedEmails, setProcessedEmails] = useState(47)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Autopilot CEO</h1>
            <p className="text-slate-600 mt-2">AI-Powered Executive Command Center</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Zap className="w-4 h-4 mr-1" />
              Granite AI Active
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {processedEmails} Emails Processed
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Active Alerts</p>
                  <p className="text-2xl font-bold text-red-700">{activeAlerts}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Pending Tasks</p>
                  <p className="text-2xl font-bold text-blue-700">{pendingTasks}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Opportunities</p>
                  <p className="text-2xl font-bold text-green-700">8</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">AI Decisions</p>
                  <p className="text-2xl font-bold text-purple-700">24</p>
                </div>
                <Brain className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white border">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              CEO Report
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="decisions" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Decisions
            </TabsTrigger>
            <TabsTrigger value="autopilot" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Autopilot
            </TabsTrigger>
            <TabsTrigger value="command" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Command
            </TabsTrigger>
            <TabsTrigger value="emails" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Emails
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyCEOReport />
              <RiskAlerts />
            </div>
            <DocumentManager />
          </TabsContent>

          <TabsContent value="report">
            <DailyCEOReport expanded={true} />
          </TabsContent>

          <TabsContent value="alerts">
            <RiskAlerts expanded={true} />
          </TabsContent>

          <TabsContent value="decisions">
            <DecisionAssist />
          </TabsContent>

          <TabsContent value="autopilot">
            <AutopilotMode />
          </TabsContent>

          <TabsContent value="command">
            <CommandCenter />
          </TabsContent>

          <TabsContent value="emails">
            <EmailProcessor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
