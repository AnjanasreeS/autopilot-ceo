"use client"

import { useState, useEffect } from "react"
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
  Grow,
  Fade,
  Slide,
  useTheme,
} from "@mui/material"
import {
  AutoMode,
  CheckCircle,
  Schedule,
  Person,
  Psychology,
} from "@mui/icons-material"

const generateAITask = () => {
  const subjects = [
    "Client Satisfaction Review",
    "Market Analysis Update",
    "Product Bug Report",
    "Quarterly Strategy Meeting",
    "Budget Reallocation",
    "Team Performance Review",
    "New Feature Proposal",
    "Competitor Analysis",
    "Customer Feedback Summary",
    "Technical Debt Assessment"
  ]

  const contents = [
    "Immediate attention required for critical issue",
    "Review needed for upcoming deadline",
    "Strategic planning session required",
    "Data analysis shows concerning trends",
    "Opportunity identified for process improvement",
    "Customer feedback indicates need for changes",
    "Team collaboration needed for cross-functional project",
    "Metrics show positive growth in target area",
    "Resource allocation needs adjustment",
    "New market opportunity identified"
  ]

  const assignees = [
    "Sarah Johnson",
    "Mike Chen",
    "Alex Rodriguez",
    "Jamie Smith",
    "Taylor Wong",
    "Jordan Lee",
    "Casey Kim",
    "Riley Patel",
    "Morgan Gupta",
    "Drew Wilson"
  ]

  const teams = ["Sales", "Marketing", "Engineering", "Strategy", "Operations", "Product", "HR"]
  const priorities = ["high", "medium", "low"]
  const statuses = ["assigned", "in-progress", "completed"]

  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]

  return {
    subject: randomItem(subjects),
    content: randomItem(contents),
    suggestedAssignee: randomItem(assignees),
    team: randomItem(teams),
    priority: randomItem(priorities),
    status: randomItem(statuses),
    estimatedTime: `${Math.ceil(Math.random() * 6)} hour${Math.ceil(Math.random() * 6) > 1 ? 's' : ''}`,
    deadline: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

const AutopilotMode = () => {
  const theme = useTheme()
  const [autopilotEnabled, setAutopilotEnabled] = useState(true)
  const [tasks, setTasks] = useState([])
  const [hoveredTask, setHoveredTask] = useState(null)

  useEffect(() => {
    if (autopilotEnabled) {
      // const parsedTasks = Array.from({ length: 5 }, (_, index) => {
        const taskCount = Math.floor(Math.random() * 6) + 3 // between 3 and 8 tasks
    const parsedTasks = Array.from({ length: taskCount }, (_, index) => {
        const mail = generateAITask()
        return {
          id: index + 1,
          title: mail.subject,
          description: mail.content,
          assignee: mail.suggestedAssignee,
          team: mail.team,
          priority: mail.priority,
          status: mail.status,
          aiReasoning: `AI detected this as ${mail.priority} priority based on content analysis and historical patterns. Suggested ${mail.suggestedAssignee} as assignee due to expertise in this area.`,
          estimatedTime: mail.estimatedTime,
          deadline: mail.deadline,
        }
      })
      setTasks(parsedTasks)
    } else {
      setTasks([])
    }
  }, [autopilotEnabled])

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
      Operations: "warning",
      Product: "error",
      HR: "inherit",
    }
    return colors[team] || "default"
  }

  const cardStyles = {
    mb: 3,
    bgcolor: theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[4]
    }
  }

  const taskItemStyles = {
    backgroundColor: theme.palette.mode === 'dark' ? '#334155' : '#ffffff',
    borderRadius: 2,
    mb: 2,
    transition: 'transform 0.2s, box-shadow 0.2s',
    transform: 'scale(1)',
    boxShadow: theme.shadows[1],
    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows[4],
      backgroundColor: theme.palette.mode === 'dark' ? '#3c4a5f' : '#f3f4f6'
    }
  }

  const aiReasoningStyles = {
    bgcolor: theme.palette.mode === 'dark' ? '#3c414f' : '#dbeafe',
    p: 1.5,
    borderRadius: 1,
    mt: 1.5,
    borderLeft: `4px solid ${theme.palette.secondary.main}`
  }

  return (
    <Fade in timeout={600}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Autopilot Mode
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          AI parses emails and auto-assigns tasks based on detected actions
        </Typography>

        <Grow in timeout={700}>
          <Card elevation={0} sx={cardStyles}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                  <AutoMode sx={{ mr: 2, fontSize: 40, color: autopilotEnabled ? theme.palette.secondary.main : theme.palette.text.disabled }} />
                  <Box>
                    <Typography variant="h6">Autopilot Status</Typography>
                    <Typography variant="body2">
                      {autopilotEnabled ? "AI is actively managing tasks" : "AI task management is paused"}
                    </Typography>
                  </Box>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autopilotEnabled}
                      onChange={(e) => setAutopilotEnabled(e.target.checked)}
                      color="secondary"
                    />
                  }
                  label={autopilotEnabled ? "Active" : "Inactive"}
                />
              </Box>

              {autopilotEnabled && (
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Typography variant="h4">{tasks.length}</Typography>
                      <Typography variant="body2">Tasks Auto-Generated</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Typography variant="h4">{tasks.filter(t => t.status === 'completed').length}</Typography>
                      <Typography variant="body2">Completed</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box textAlign="center">
                      <Typography variant="h4">
                        {tasks.length > 0
                          ? `${Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%`
                          : "0%"}
                      </Typography>
                      <Typography variant="body2">Success Rate</Typography>
                    </Box>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grow>

        {autopilotEnabled && (
          <Slide direction="up" in={autopilotEnabled} timeout={500}>
            <Card elevation={0} sx={cardStyles}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AutoMode fontSize="small" /> Auto-Generated Tasks
                </Typography>

                <List>
                  {tasks.map((task, index) => (
                    <Grow in timeout={(index + 1) * 200} key={task.id}>
                      <Box
                        sx={taskItemStyles}
                        onMouseEnter={() => setHoveredTask(task.id)}
                        onMouseLeave={() => setHoveredTask(null)}
                      >
                        <ListItem>
                          <ListItemIcon>
                            <Fade in timeout={500}>
                              {getStatusIcon(task.status)}
                            </Fade>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box display="flex" alignItems="center" gap={1} mb={1}>
                                <Typography variant="subtitle1">{task.title}</Typography>
                                <Chip 
                                  label={task.priority} 
                                  size="small" 
                                  color={getPriorityColor(task.priority)} 
                                  sx={{ transform: hoveredTask === task.id ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s' }} 
                                />
                                <Chip 
                                  label={task.team} 
                                  size="small" 
                                  color={getTeamColor(task.team)} 
                                  variant="outlined" 
                                  sx={{ transform: hoveredTask === task.id ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s' }}
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                  {task.description}
                                </Typography>

                                <Box display="flex" alignItems="center" gap={2} mb={1} flexWrap="wrap">
                                  <Box display="flex" alignItems="center" gap={1}>
                                    <Avatar sx={{ 
                                      width: 24, 
                                      height: 24, 
                                      fontSize: 12,
                                      transform: hoveredTask === task.id ? 'scale(1.2)' : 'scale(1)',
                                      transition: 'transform 0.2s'
                                    }}>
                                      {task.assignee.split(" ").map((n) => n[0]).join("")}
                                    </Avatar>
                                    <Typography variant="caption">{task.assignee}</Typography>
                                  </Box>
                                  <Typography variant="caption">Due: {task.deadline}</Typography>
                                  <Typography variant="caption" sx={{ 
                                    ml: 'auto',
                                    fontWeight: 'bold',
                                    color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark
                                  }}>
                                    {task.estimatedTime}
                                  </Typography>
                                </Box>

                                <Box sx={aiReasoningStyles}>
                                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                    <Psychology fontSize="small" />
                                    <Typography variant="caption" fontWeight="bold">
                                      AI Reasoning:
                                    </Typography>
                                  </Box>
                                  <Typography variant="caption">{task.aiReasoning}</Typography>
                                </Box>
                              </Box>
                            }
                          />
                        </ListItem>
                      </Box>
                    </Grow>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Slide>
        )}
      </Box>
    </Fade>
  )
}

export default AutopilotMode
