"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material"
import { Refresh, TrendingUp, TrendingDown, CheckCircle, Warning, Assessment } from "@mui/icons-material"
import { generateCEOReport } from "./api/graniteApi"

const CEOReport = () => {
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState({
    summary:
      "Strong performance across key metrics with emerging opportunities in APAC market. Engineering productivity requires immediate attention.",
    keyMetrics: [
      { label: "Revenue", value: "$2.4M", change: "+12%", trend: "up" },
      { label: "Customer Satisfaction", value: "94%", change: "+3%", trend: "up" },
      { label: "Team Productivity", value: "87%", change: "-2%", trend: "down" },
      { label: "Market Share", value: "23%", change: "+5%", trend: "up" },
    ],
    priorities: [
      "Address engineering productivity decline and capacity planning",
      "Accelerate APAC market expansion with increased investment",
      "Implement client retention strategy for at-risk accounts",
    ],
    risks: [
      "Engineering velocity decline may impact product delivery",
      "Client X satisfaction drop threatens key account retention",
      "Competitor product launch may pressure market position",
    ],
  })

  const generateReport = async () => {
    setLoading(true)
    try {
      const newReport = await generateCEOReport()
      setReport(newReport)
    } catch (error) {
      console.error("Error generating report:", error)
    }
    setLoading(false)
  }

  const getTrendIcon = (trend) => {
    return trend === "up" ? <TrendingUp color="success" /> : <TrendingDown color="error" />
  }

  const getTrendColor = (trend) => {
    return trend === "up" ? "success" : "error"
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Daily CEO Report
        </Typography>
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <Refresh />}
          onClick={generateReport}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Report"}
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Assessment color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Executive Summary</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {report.summary}
              </Typography>
              <Chip label="3-minute read" size="small" color="primary" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Performance Metrics
              </Typography>
              <Grid container spacing={2}>
                {report.keyMetrics.map((metric, index) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        {metric.label}
                      </Typography>
                      <Typography variant="h6" sx={{ my: 1 }}>
                        {metric.value}
                      </Typography>
                      <Box display="flex" alignItems="center" justifyContent="center">
                        {getTrendIcon(metric.trend)}
                        <Chip label={metric.change} size="small" color={getTrendColor(metric.trend)} sx={{ ml: 1 }} />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <CheckCircle color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Top Priorities</Typography>
              </Box>
              <List dense>
                {report.priorities.map((priority, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={priority} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Warning color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Risk Factors</Typography>
              </Box>
              <List dense>
                {report.risks.map((risk, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "warning.main",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={risk} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CEOReport
