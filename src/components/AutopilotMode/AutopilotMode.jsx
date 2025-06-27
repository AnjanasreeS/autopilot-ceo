"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Switch,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@mui/material"
import { AutoMode, CheckCircle, Schedule, Person, Psychology } from "@mui/icons-material"

const AutopilotMode = () => {
  const [autopilotEnabled, setAutopilotEnabled] = useState(true)
  const [tasks] = useState([
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
  ])

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error"
      case "medium":
        return "warning"
      case "low":
        return "info"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle color="success" />
      case "in-progress":
        return <Schedule color="primary" />
      case "assigned":
        return <Person color="warning" />
      default:
        return <Schedule color="action" />
    }
  }

  const getTeamColor = (team) => {
    const colors = {
      Sales: "success",
      Marketing: "secondary",
      Engineering: "primary",
      Strategy: "info",
    }
    return colors[team] || "default"
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Autopilot Mode
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        AI automatically assigns tasks based on detected problems
      </Typography>

      <Card elevation={2} sx={{ mb: 3, bgcolor: "success.light", color: "success.contrastText" }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <AutoMode sx={{ mr: 2, fontSize: 40 }} />
              <Box>
                <Typography variant="h6">Autopilot Status</Typography>
                <Typography variant="body2">AI automatically assigns tasks based on detected problems</Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={autopilotEnabled}
                  onChange={(e) => setAutopilotEnabled(e.target.checked)}
                  color="default"
                />
              }
              label={autopilotEnabled ? "Active" : "Inactive"}
            />
          </Box>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={4}>
              <Box textAlign="center">
                <Typography variant="h4">24</Typography>
                <Typography variant="body2">Tasks Auto-Assigned</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box textAlign="center">
                <Typography variant="h4">18</Typography>
                <Typography variant="body2">Tasks Completed</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box textAlign="center">
                <Typography variant="h4">92%</Typography>
                <Typography variant="body2">Success Rate</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Auto-Assigned Tasks
          </Typography>

          <List>
            {tasks.map((task, index) => (
              <ListItem key={task.id} divider={index < tasks.length - 1}>
                <ListItemIcon>{getStatusIcon(task.status)}</ListItemIcon>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="subtitle1">{task.title}</Typography>
                      <Chip label={task.priority} size="small" color={getPriorityColor(task.priority)} />
                      <Chip label={task.team} size="small" color={getTeamColor(task.team)} variant="outlined" />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {task.description}
                      </Typography>

                      <Box display="flex" alignItems="center" gap={2} mb={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                            {task.assignee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar>
                          <Typography variant="caption">{task.assignee}</Typography>
                        </Box>
                        <Typography variant="caption">Due: {task.deadline}</Typography>
                      </Box>

                      <Box sx={{ bgcolor: "info.light", p: 1, borderRadius: 1, mt: 1 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <Psychology fontSize="small" />
                          <Typography variant="caption" fontWeight="bold">
                            AI Reasoning:
                          </Typography>
                        </Box>
                        <Typography variant="caption">{task.aiReasoning}</Typography>
                        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                          Estimated time: {task.estimatedTime}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AutopilotMode
