"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, Clock, X } from "lucide-react"

export default function RiskAlerts({ expanded = false }) {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "risk",
      severity: "high",
      title: "Client X Satisfaction Declining",
      description: "Recent support tickets show frustration with response times",
      action: "Schedule immediate call with account manager",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "opportunity",
      severity: "medium",
      title: "APAC Sales Surge Detected",
      description: "Q3 sales in Asia-Pacific up 34% vs last quarter",
      action: "Consider increasing regional marketing budget",
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      type: "risk",
      severity: "medium",
      title: "Engineering Velocity Dropping",
      description: "Sprint completion rate down 15% over last 3 weeks",
      action: "Review team capacity and blockers",
      timestamp: "6 hours ago",
    },
    {
      id: 4,
      type: "opportunity",
      severity: "high",
      title: "Competitor Pricing Gap Identified",
      description: "Market analysis shows 20% pricing advantage opportunity",
      action: "Prepare pricing strategy proposal",
      timestamp: "1 day ago",
    },
  ])

  const dismissAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type) => {
    return type === "risk" ? (
      <AlertTriangle className="w-4 h-4 text-red-500" />
    ) : (
      <TrendingUp className="w-4 h-4 text-green-500" />
    )
  }

  const displayAlerts = expanded ? alerts : alerts.slice(0, 3)

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-900">
          <AlertTriangle className="w-5 h-5" />
          Risk & Opportunity Alerts
        </CardTitle>
        <p className="text-orange-600 text-sm">AI-detected insights requiring attention</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayAlerts.map((alert) => (
          <div key={alert.id} className="bg-white p-4 rounded-lg border border-orange-100 relative">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getTypeIcon(alert.type)}
                <h3 className="font-semibold text-slate-900">{alert.title}</h3>
                <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert(alert.id)}
                className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-slate-700 text-sm mb-3">{alert.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {alert.timestamp}
              </div>
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                {alert.action}
              </Button>
            </div>
          </div>
        ))}

        {!expanded && alerts.length > 3 && (
          <div className="text-center pt-2">
            <Button variant="ghost" size="sm" className="text-orange-600">
              View {alerts.length - 3} more alerts
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
