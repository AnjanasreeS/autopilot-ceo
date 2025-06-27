"use client"

import { useState } from "react"
import { Card, CardContent, Typography, TextField, Button, Box, Chip, CircularProgress } from "@mui/material"
import { Terminal, Send, Mic, TrendingUp, CheckCircle } from "@mui/icons-material"
import { executeCommand } from "./api/graniteApi"

const CommandCenter = () => {
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

  const executeCommandHandler = async () => {
    if (!command.trim()) return

    setLoading(true)
    try {
      const response = await executeCommand(command)
      setHistory([
        {
          command,
          response: response.response,
          timestamp: "Just now",
          actions: response.actions || [],
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
    <Box>
      <Typography variant="h4" gutterBottom>
        Command Center
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Natural language commands for instant business insights
      </Typography>

      <Card elevation={2} sx={{ mb: 3, bgcolor: "grey.50" }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Terminal color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Executive Command Interface</Typography>
          </Box>

          <Box display="flex" gap={2} mb={2}>
            <TextField
              fullWidth
              placeholder="Enter natural language command..."
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && executeCommandHandler()}
              variant="outlined"
            />
            <Button variant="outlined" size="large">
              <Mic />
            </Button>
            <Button
              variant="contained"
              onClick={executeCommandHandler}
              disabled={loading || !command.trim()}
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
              sx={{ minWidth: 120 }}
            >
              {loading ? "Processing..." : "Execute"}
            </Button>
          </Box>

          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Quick Commands:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {quickCommands.map((cmd, index) => (
                <Chip
                  key={index}
                  label={cmd}
                  variant="outlined"
                  size="small"
                  onClick={() => setCommand(cmd)}
                  sx={{ cursor: "pointer" }}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Command History
      </Typography>

      {history.map((item, index) => (
        <Card key={index} elevation={2} sx={{ mb: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Terminal fontSize="small" color="primary" />
              <Typography variant="subtitle2">Command:</Typography>
              <Typography variant="caption" color="textSecondary">
                {item.timestamp}
              </Typography>
            </Box>

            <Box sx={{ bgcolor: "primary.light", p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                {item.command}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <TrendingUp fontSize="small" color="success" />
              <Typography variant="subtitle2">Response:</Typography>
            </Box>

            <Typography variant="body2" paragraph>
              {item.response}
            </Typography>

            {item.actions.length > 0 && (
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <CheckCircle fontSize="small" color="success" />
                  <Typography variant="subtitle2">Actions Taken:</Typography>
                </Box>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {item.actions.map((action, idx) => (
                    <Chip key={idx} label={action} size="small" color="success" variant="outlined" />
                  ))}
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default CommandCenter
