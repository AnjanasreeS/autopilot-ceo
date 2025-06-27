"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Zap, Users, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function AutopilotMode() {
  const [autopilotEnabled, setAutopilotEnabled] = useState(true)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Schedule client retention call",
      description: "Client X satisfaction scores dropped. Auto-assigned to Sarah (Account Manager)",
      assignee: "Sarah Johnson",
      team: "Sales",
      priority: "high",
      status: "assigned",
      aiReasoning: "Client satisfaction score dropped 15% based on recent survey data",
      estimatedTime: "2 hours",
      deadline: "Today, 5:00 PM",
    },
    {
      id: 2,
      title: "Review APAC marketing budget",
      description: "Sales surge detected in Asia-Pacific. Auto-assigned to Marketing team",
      assignee: "Mike Chen",
      team: "Marketing",
      priority: "medium",
      status: "in-progress",
      aiReasoning: "34% sales increase in APAC suggests opportunity for budget reallocation",
      estimatedTime: "4 hours",
      deadline: "Tomorrow, 2:00 PM",
    },
    {
      id: 3,
      title: "Engineering capacity analysis",
      description: "Sprint velocity declining. Auto-assigned to Engineering Manager",
      assignee: "Alex Rodriguez",
      team: "Engineering",
      priority: "medium",
      status: "completed",
      aiReasoning: "15% drop in sprint completion rate over 3 weeks indicates capacity issues",
      estimatedTime: "3 hours",
      deadline: "Completed",
    },
    {
      id: 4,
      title: "Competitor pricing analysis",
      description: "Market gap identified. Auto-assigned to Strategy team",
      assignee: "Emma Davis",
      team: "Strategy",
      priority: "low",
      status: "assigned",
      aiReasoning: "20% pricing advantage opportunity detected through market analysis",
      estimatedTime: "6 hours",
      deadline: "Next week",
    },
  ])

  const getPriorityColor = (priority) => {
    switch (priority) {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "assigned":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getTeamColor = (team) => {
    const colors = {
      Sales: "bg-green-100 text-green-800",
      Marketing: "bg-purple-100 text-purple-800",
      Engineering: "bg-blue-100 text-blue-800",
      Strategy: "bg-indigo-100 text-indigo-800",
    }
    return colors[team] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Autopilot Control */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Zap className="w-5 h-5" />
                Autopilot Mode
              </CardTitle>
              <p className="text-green-600 text-sm mt-1">AI automatically assigns tasks based on detected problems</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-green-700">{autopilotEnabled ? "Active" : "Inactive"}</span>
              <Switch checked={autopilotEnabled} onCheckedChange={setAutopilotEnabled} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <div className="text-2xl font-bold text-green-700">24</div>
              <div className="text-sm text-green-600">Tasks Auto-Assigned</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <div className="text-2xl font-bold text-green-700">18</div>
              <div className="text-sm text-green-600">Tasks Completed</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-green-100">
              <div className="text-2xl font-bold text-green-700">92%</div>
              <div className="text-sm text-green-600">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Auto-Assigned Tasks
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(task.status)}
                    <h3 className="font-semibold text-slate-900">{task.title}</h3>
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  </div>
                  <p className="text-slate-700 text-sm mb-2">{task.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-xs text-slate-500">Assigned to:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                    <span className="text-sm font-medium">{task.assignee}</span>
                    <Badge variant="outline" className={getTeamColor(task.team)}>
                      {task.team}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Deadline:</span>
                  <div className="text-sm font-medium mt-1">{task.deadline}</div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <div className="text-xs text-blue-600 font-medium mb-1">AI Reasoning:</div>
                <div className="text-sm text-blue-800">{task.aiReasoning}</div>
                <div className="text-xs text-blue-600 mt-1">Estimated time: {task.estimatedTime}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
