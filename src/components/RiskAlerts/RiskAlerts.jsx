"use client"

import { useState } from "react"
import { Card, CardContent, Typography, Box, Chip, Button, Grid, IconButton, Alert, AlertTitle } from "@mui/material"
import { Close, Schedule, Business } from "@mui/icons-material"

const RiskAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "risk",
      severity: "high",
      title: "Client X Satisfaction Declining",
      description: "Recent support tickets show frustration with response times",
      action: "Schedule immediate call with account manager",
      timestamp: "2 hours ago",
      department: "Customer Success",
    },
    {
      id: 2,
      type: "opportunity",
      severity: "high",
      title: "APAC Sales Surge Detected",
      description: "Q3 sales in Asia-Pacific up 34% vs last quarter",
      action: "Consider increasing regional marketing budget",
      timestamp: "4 hours ago",
      department: "Sales",
    },
    {
      id: 3,
      type: "risk",
      severity: "medium",
      title: "Engineering Velocity Dropping",
      description: "Sprint completion rate down 15% over last 3 weeks",
      action: "Review team capacity and blockers",
      timestamp: "6 hours ago",
      department: "Engineering",
    },
    {
      id: 4,
      type: "opportunity",
      severity: "medium",
      title: "Competitor Pricing Gap Identified",
      description: "Market analysis shows 20% pricing advantage opportunity",
      action: "Prepare pricing strategy proposal",
      timestamp: "1 day ago",
      department: "Strategy",
    },
  ])

  const dismissAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
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

  const getAlertSeverity = (type, severity) => {
    if (type === "opportunity") return "success"
    switch (severity) {
      case "high":
        return "error"
      case "medium":
        return "warning"
      case "low":
        return "info"
      default:
        return "info"
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Risk & Opportunity Alerts
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        AI-detected insights requiring executive attention
      </Typography>

      <Grid container spacing={3}>
        {alerts.map((alert) => (
          <Grid item xs={12} key={alert.id}>
            <Alert
              severity={getAlertSeverity(alert.type, alert.severity)}
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={() => dismissAlert(alert.id)}>
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>
                <Box display="flex" alignItems="center" gap={1}>
                  {alert.title}
                  <Chip
                    label={`${alert.severity} ${alert.type}`}
                    size="small"
                    color={getSeverityColor(alert.severity)}
                  />
                </Box>
              </AlertTitle>

              <Typography variant="body2" paragraph>
                {alert.description}
              </Typography>

              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Schedule fontSize="small" color="action" />
                    <Typography variant="caption" color="textSecondary">
                      {alert.timestamp}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Business fontSize="small" color="action" />
                    <Typography variant="caption" color="textSecondary">
                      {alert.department}
                    </Typography>
                  </Box>
                </Box>

                <Button variant="outlined" size="small" color={alert.type === "opportunity" ? "success" : "primary"}>
                  {alert.action}
                </Button>
              </Box>
            </Alert>
          </Grid>
        ))}
      </Grid>

      {alerts.length === 0 && (
        <Card elevation={2}>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No active alerts
            </Typography>
            <Typography variant="body2" color="textSecondary">
              All risks and opportunities have been addressed
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default RiskAlerts
