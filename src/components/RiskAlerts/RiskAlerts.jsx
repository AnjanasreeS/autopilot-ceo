// "use client"

// import { useState } from "react"
// import { Card, CardContent, Typography, Box, Chip, Button, Grid, IconButton, Alert, AlertTitle } from "@mui/material"
// import { Close, Schedule, Business } from "@mui/icons-material"

// const RiskAlerts = () => {
//   const [alerts, setAlerts] = useState([
//     {
//       id: 1,
//       type: "risk",
//       severity: "high",
//       title: "Client X Satisfaction Declining",
//       description: "Recent support tickets show frustration with response times",
//       action: "Schedule immediate call with account manager",
//       timestamp: "2 hours ago",
//       department: "Customer Success",
//     },
//     {
//       id: 2,
//       type: "opportunity",
//       severity: "high",
//       title: "APAC Sales Surge Detected",
//       description: "Q3 sales in Asia-Pacific up 34% vs last quarter",
//       action: "Consider increasing regional marketing budget",
//       timestamp: "4 hours ago",
//       department: "Sales",
//     },
//     {
//       id: 3,
//       type: "risk",
//       severity: "medium",
//       title: "Engineering Velocity Dropping",
//       description: "Sprint completion rate down 15% over last 3 weeks",
//       action: "Review team capacity and blockers",
//       timestamp: "6 hours ago",
//       department: "Engineering",
//     },
//     {
//       id: 4,
//       type: "opportunity",
//       severity: "medium",
//       title: "Competitor Pricing Gap Identified",
//       description: "Market analysis shows 20% pricing advantage opportunity",
//       action: "Prepare pricing strategy proposal",
//       timestamp: "1 day ago",
//       department: "Strategy",
//     },
//   ])

//   const dismissAlert = (id) => {
//     setAlerts(alerts.filter((alert) => alert.id !== id))
//   }

//   const getSeverityColor = (severity) => {
//     switch (severity) {
//       case "high":
//         return "error"
//       case "medium":
//         return "warning"
//       case "low":
//         return "info"
//       default:
//         return "default"
//     }
//   }

//   const getAlertSeverity = (type, severity) => {
//     if (type === "opportunity") return "success"
//     switch (severity) {
//       case "high":
//         return "error"
//       case "medium":
//         return "warning"
//       case "low":
//         return "info"
//       default:
//         return "info"
//     }
//   }

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Risk & Opportunity Alerts
//       </Typography>
//       <Typography variant="body1" color="textSecondary" paragraph>
//         AI-detected insights requiring executive attention
//       </Typography>

//       <Grid container spacing={3}>
//         {alerts.map((alert) => (
//           <Grid item xs={12} key={alert.id}>
//             <Alert
//               severity={getAlertSeverity(alert.type, alert.severity)}
//               action={
//                 <IconButton aria-label="close" color="inherit" size="small" onClick={() => dismissAlert(alert.id)}>
//                   <Close fontSize="inherit" />
//                 </IconButton>
//               }
//             >
//               <AlertTitle>
//                 <Box display="flex" alignItems="center" gap={1}>
//                   {alert.title}
//                   <Chip
//                     label={`${alert.severity} ${alert.type}`}
//                     size="small"
//                     color={getSeverityColor(alert.severity)}
//                   />
//                 </Box>
//               </AlertTitle>

//               <Typography variant="body2" paragraph>
//                 {alert.description}
//               </Typography>

//               <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//                 <Box display="flex" alignItems="center" gap={2}>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Schedule fontSize="small" color="action" />
//                     <Typography variant="caption" color="textSecondary">
//                       {alert.timestamp}
//                     </Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Business fontSize="small" color="action" />
//                     <Typography variant="caption" color="textSecondary">
//                       {alert.department}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Button variant="outlined" size="small" color={alert.type === "opportunity" ? "success" : "primary"}>
//                   {alert.action}
//                 </Button>
//               </Box>
//             </Alert>
//           </Grid>
//         ))}
//       </Grid>

//       {alerts.length === 0 && (
//         <Card elevation={2}>
//           <CardContent sx={{ textAlign: "center", py: 4 }}>
//             <Typography variant="h6" color="textSecondary">
//               No active alerts
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               All risks and opportunities have been addressed
//             </Typography>
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   )
// }

// export default RiskAlerts
"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Button, 
  Grid, 
  IconButton, 
  Alert, 
  AlertTitle,
  useTheme,
  Collapse,
  Fade,
  Slide,
  CircularProgress,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox
} from "@mui/material"
import { 
  Close, 
  Schedule, 
  Business, 
  CheckCircle, 
  ArrowForward, 
  ExpandMore,
  ExpandLess,
  NotificationsActive,
  Refresh,
  Add,
  Delete
} from "@mui/icons-material"

const generateAIRisk = () => {
  const riskTypes = ["Customer", "Financial", "Operational", "Compliance", "Strategic"]
  const departments = ["Sales", "Engineering", "Marketing", "Customer Success", "Finance"]
  const actions = [
    "Review with team", 
    "Schedule meeting", 
    "Allocate resources", 
    "Contact client", 
    "Update strategy"
  ]
  
  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]
  const randomSeverity = () => ["low", "medium", "high"][Math.floor(Math.random() * 3)]
  const randomHoursAgo = () => `${Math.floor(Math.random() * 24) + 1} hours ago`

  return {
    id: Math.random().toString(36).substring(7),
    type: Math.random() > 0.5 ? "risk" : "opportunity",
    severity: randomSeverity(),
    title: `${randomItem(riskTypes)} ${Math.random() > 0.5 ? "Risk" : "Opportunity"} Detected`,
    description: `AI detected ${Math.random() > 0.5 ? "emerging" : "potential"} ${
      Math.random() > 0.5 ? "issue" : "opportunity"
    } in ${randomItem(["process", "strategy", "performance", "market"])}`,
    action: randomItem(actions),
    timestamp: randomHoursAgo(),
    department: randomItem(departments),
    expanded: false
  }
}

const RiskAlerts = () => {
  const [alerts, setAlerts] = useState([])
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [loading, setLoading] = useState(true)
  const theme = useTheme()

  useEffect(() => {
    generateNewAlerts()
  }, [])

  const generateNewAlerts = () => {
    setLoading(true)
    setTimeout(() => {
      setAlerts(Array.from({ length: 4 }, () => generateAIRisk()))
      setLoading(false)
    }, 1000)
  }

  const dismissAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const toggleExpand = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, expanded: !alert.expanded } : alert
    ))
  }

  const handleActionClick = (alert) => {
    // Add to todos when action button is clicked
    setTodos([...todos, {
      id: Math.random().toString(36).substring(7),
      text: `${alert.action}: ${alert.title}`,
      completed: false,
      createdAt: new Date().toISOString()
    }])
    dismissAlert(alert.id)
  }

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Math.random().toString(36).substring(7),
        text: newTodo,
        completed: false,
        createdAt: new Date().toISOString()
      }])
      setNewTodo("")
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high": return "error"
      case "medium": return "warning"
      case "low": return "info"
      default: return "default"
    }
  }

  const getAlertSeverity = (type, severity) => {
    if (type === "opportunity") return "success"
    return getSeverityColor(severity)
  }

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 },
      height: '100vh',
      overflow: 'auto',
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Section */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <NotificationsActive color="primary" sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            AI Risk Monitor
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Real-time risk detection and mitigation
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={loading ? <CircularProgress size={20} /> : <Refresh />}
          onClick={generateNewAlerts}
          disabled={loading}
          sx={{ ml: 'auto' }}
        >
          Refresh Risks
        </Button>
      </Box>

      {/* Main Content - Two Column Layout */}
      <Box sx={{ display: 'flex', flex: 1, gap: 3, overflow: 'hidden' }}>
        {/* Left Column - Risk Alerts */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress size={60} />
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {alerts.map((alert) => (
                <Grid item xs={12} key={alert.id}>
                  <Slide direction="up" in timeout={500}>
                    <Card elevation={3} sx={{ 
                      borderRadius: 2,
                      borderLeft: `6px solid ${
                        theme.palette[getAlertSeverity(alert.type, alert.severity)].main
                      }`
                    }}>
                      <CardContent sx={{ p: 0 }}>
                        <Alert
                          severity={getAlertSeverity(alert.type, alert.severity)}
                          icon={false}
                          sx={{ 
                            alignItems: 'flex-start',
                            p: 2,
                            '& .MuiAlert-message': { width: '100%' }
                          }}
                          action={
                            <Box display="flex" gap={1}>
                              <IconButton 
                                size="small" 
                                onClick={() => toggleExpand(alert.id)}
                                color="inherit"
                              >
                                {alert.expanded ? <ExpandLess /> : <ExpandMore />}
                              </IconButton>
                              <IconButton 
                                size="small" 
                                onClick={() => dismissAlert(alert.id)}
                                color="inherit"
                              >
                                <Close fontSize="small" />
                              </IconButton>
                            </Box>
                          }
                        >
                          <AlertTitle sx={{ mb: 1, fontWeight: 'bold' }}>
                            {alert.title}
                          </AlertTitle>

                          <Typography variant="body2" paragraph>
                            {alert.description}
                          </Typography>

                          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} flexWrap="wrap" gap={1}>
                            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                              <Chip
                                label={`${alert.severity} priority`}
                                size="small"
                                color={getSeverityColor(alert.severity)}
                                icon={<Schedule fontSize="small" />}
                              />
                              <Chip
                                label={alert.department}
                                size="small"
                                color="default"
                                icon={<Business fontSize="small" />}
                              />
                              <Typography variant="caption" color="textSecondary">
                                {alert.timestamp}
                              </Typography>
                            </Box>

                            <Button 
                              variant="contained" 
                              size="small" 
                              color={getAlertSeverity(alert.type, alert.severity)}
                              endIcon={<ArrowForward />}
                              onClick={() => handleActionClick(alert)}
                              sx={{ 
                                borderRadius: 2,
                                minWidth: 180
                              }}
                            >
                              {alert.action}
                            </Button>
                          </Box>

                          <Collapse in={alert.expanded}>
                            <Box sx={{ 
                              mt: 2, 
                              p: 2, 
                              backgroundColor: 'background.paper', 
                              borderRadius: 1
                            }}>
                              <Typography variant="body2">
                                AI confidence: {Math.floor(Math.random() * 60) + 40}% | 
                                Last occurrence: {Math.floor(Math.random() * 30) + 1} days ago | 
                                Related to: {["process", "strategy", "performance"][Math.floor(Math.random() * 3)]}
                              </Typography>
                            </Box>
                          </Collapse>
                        </Alert>
                      </CardContent>
                    </Card>
                  </Slide>
                </Grid>
              ))}
            </Grid>
          )}

          {!loading && alerts.length === 0 && (
            <Fade in timeout={500}>
              <Card elevation={0} sx={{ 
                textAlign: "center", 
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  No risks detected
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  All systems operating normally
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary"
                  startIcon={<Refresh />}
                  onClick={generateNewAlerts}
                  sx={{ mt: 2 }}
                >
                  Scan Again
                </Button>
              </Card>
            </Fade>
          )}
        </Box>

        {/* Right Column - To-Do List */}
        <Box sx={{ 
          width: { xs: '100%', md: 350 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: theme.shadows[1],
          overflow: 'auto'
        }}>
          <Typography variant="h6" fontWeight="bold">
            Action Items
          </Typography>
          
          <Box display="flex" gap={1} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Add new action item..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <Button 
              variant="contained" 
              color="primary"
              onClick={addTodo}
              disabled={!newTodo.trim()}
              sx={{ minWidth: 40 }}
            >
              <Add />
            </Button>
          </Box>

          <List dense sx={{ flex: 1, overflow: 'auto' }}>
            {todos.length === 0 ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                p: 2
              }}>
                <Typography variant="body2" color="textSecondary">
                  No action items yet. Add tasks or click action buttons on risks.
                </Typography>
              </Box>
            ) : (
              [...todos]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((todo) => (
                  <ListItem 
                    key={todo.id} 
                    sx={{ 
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      opacity: todo.completed ? 0.7 : 1
                    }}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      color="primary"
                      size="small"
                    />
                    <ListItemText 
                      primary={todo.text} 
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        onClick={() => deleteTodo(todo.id)}
                        size="small"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
            )}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default RiskAlerts