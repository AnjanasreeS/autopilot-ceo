"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Mic, Users, TrendingUp } from "lucide-react"

export default function CommandCenter() {
  const [command, setCommand] = useState("")
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([
    {
      command: "Summarize operations report & assign follow-up",
      response:
        "Operations report summarized. Key findings: 15% productivity drop in Engineering, 34% APAC growth. Auto-assigned capacity analysis to Alex Rodriguez and budget review to Mike Chen.",
      timestamp: "10 minutes ago",
      actions: ["Task assigned to Alex Rodriguez", "Task assigned to Mike Chen", "Report generated"],
    },
    {
      command: "Show me client satisfaction trends",
      response:
        "Client satisfaction analysis complete. Overall score: 94% (+3% vs last month). Alert: Client X satisfaction dropped 15%. Recommended action: immediate retention call scheduled.",
      timestamp: "1 hour ago",
      actions: ["Generated satisfaction report", "Created alert for Client X", "Scheduled retention call"],
    },
  ])

  const executeCommand = async () => {
    if (!command.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/command-center", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      })
      const data = await response.json()

      setHistory([
        {
          command,
          response: data.response,
          timestamp: "Just now",
          actions: data.actions || [],
        },
        ...history,
      ])
      setCommand("")
    } catch (error) {
      console.error("Error executing command:", error)
    }
    setLoading(false)
  }

  const quickCommands = [
    "Generate weekly executive summary",
    "Show top 3 business risks",
    "Analyze team performance metrics",
    "Review customer feedback trends",
    "Check competitor activity",
    "Summarize financial KPIs",
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <MessageSquare className="w-5 h-5" />
            Command Center
          </CardTitle>
          <p className="text-slate-600 text-sm">Natural language commands for instant business insights</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter natural language command..."
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && executeCommand()}
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              onClick={executeCommand}
              disabled={loading || !command.trim()}
              className="bg-slate-700 hover:bg-slate-800"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">Quick Commands:</div>
            <div className="flex flex-wrap gap-2">
              {quickCommands.map((cmd, index) => (
                <Button key={index} variant="outline" size="sm" onClick={() => setCommand(cmd)} className="text-xs">
                  {cmd}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Command History */}
      <div className="space-y-4">
        {history.map((item, index) => (
          <Card key={index} className="bg-white border-slate-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-slate-900">Command:</span>
                    <span className="text-sm text-slate-500">{item.timestamp}</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <code className="text-blue-800">{item.command}</code>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-slate-900">Response:</span>
                  </div>
                  <p className="text-slate-700">{item.response}</p>
                </div>

                {item.actions.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-slate-900">Actions Taken:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.actions.map((action, idx) => (
                        <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
