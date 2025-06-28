
"use client"

import { useState, useEffect } from "react"
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
  Divider,
  useTheme,
  Fade,
  Grow,
  Slide,
} from "@mui/material"
import {
  Refresh,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Warning,
  Assessment,
  Equalizer,
  PriorityHigh,
  Timeline,
  Business,
  People,
  AttachMoney,
} from "@mui/icons-material"

const generateRandomReport = () => {
  // Helper functions
  const randomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
  const randomTrend = () => (Math.random() > 0.5 ? "up" : "down")
  const randomChange = (trend, min, max) => {
    const value = randomValue(min, max)
    return trend === "up" ? `+${value}%` : `-${value}%`
  }

  // Possible content variations
  const summaries = [
    "Strong performance across key metrics with emerging opportunities in APAC market. Engineering productivity requires immediate attention.",
    "Revenue growth remains steady but operational costs are rising. Focus needed on margin improvement initiatives.",
    "Market expansion showing promising results, but customer churn has increased in core markets.",
    "Product innovation driving customer acquisition, though implementation delays are affecting delivery timelines.",
    "Strategic partnerships yielding results, but internal alignment needs improvement for maximum impact."
  ]

  const priorities = [
    "Address engineering productivity decline and capacity planning",
    "Accelerate APAC market expansion with increased investment",
    "Implement client retention strategy for at-risk accounts",
    "Optimize operational costs to improve margins",
    "Align cross-functional teams for product launch",
    "Enhance customer support infrastructure",
    "Develop talent pipeline for key growth areas"
  ]

  const risks = [
    "Engineering velocity decline may impact product delivery",
    "Client X satisfaction drop threatens key account retention",
    "Competitor product launch may pressure market position",
    "Supply chain disruptions could affect Q3 deliveries",
    "Talent shortage in key technical roles",
    "Regulatory changes in EU market",
    "Economic downturn affecting customer budgets"
  ]

  // Generate random metrics
  const metrics = [
    {
      label: "Revenue",
      icon: <AttachMoney fontSize="small" />,
      value: `$${(randomValue(1, 5) + Math.random()).toFixed(1)}M`,
      trend: randomTrend(),
      change: randomChange("up", 2, 15)
    },
    {
      label: "Customer Satisfaction",
      icon: <People fontSize="small" />,
      value: `${randomValue(85, 98)}%`,
      trend: randomTrend(),
      change: randomChange("up", 1, 5)
    },
    {
      label: "Team Productivity",
      icon: <Business fontSize="small" />,
      value: `${randomValue(75, 95)}%`,
      trend: randomTrend(),
      change: randomChange("down", 1, 10)
    },
    {
      label: "Market Share",
      icon: <Equalizer fontSize="small" />,
      value: `${randomValue(15, 30)}%`,
      trend: randomTrend(),
      change: randomChange("up", 1, 8)
    }
  ]

  return {
    summary: summaries[randomValue(0, summaries.length - 1)],
    keyMetrics: metrics,
    priorities: priorities
      .sort(() => 0.5 - Math.random())
      .slice(0, randomValue(3, 5)),
    risks: risks
      .sort(() => 0.5 - Math.random())
      .slice(0, randomValue(2, 4))
  }
}

const CEOReport = () => {
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  // Generate initial report on mount
  useEffect(() => {
    generateReport()
  }, [])

  const generateReport = async () => {
    setLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      const newReport = generateRandomReport()
      setReport(newReport)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTrendIcon = (trend) => {
    return trend === "up" ? (
      <TrendingUp color="success" fontSize="small" />
    ) : (
      <TrendingDown color="error" fontSize="small" />
    )
  }

  const getTrendColor = (trend) => {
    return trend === "up" ? "success" : "error"
  }

  const metricCardStyles = {
    p: 2,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 2,
    height: "100%",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.shadows[4],
      borderColor: theme.palette.primary.main
    }
  }

  if (!report) return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />

  return (
    <Box sx={{ p: { xs: 1, md: 3 } }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Executive Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lastUpdated &&
              `Last updated: ${lastUpdated.toLocaleTimeString()} ${lastUpdated.toLocaleDateString()}`}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <Refresh />}
          onClick={generateReport}
          disabled={loading}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            fontWeight: "bold"
          }}
        >
          {loading ? "Generating..." : "Refresh Data"}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Card */}
        <Grid item xs={12}>
          <Slide direction="down" in={!!report} timeout={500}>
            <Card
              elevation={0}
              sx={{
                background: theme.palette.mode === "dark" 
                  ? "linear-gradient(135deg, #1a237e 0%, #283593 100%)" 
                  : "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Assessment
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: 32,
                      mr: 2
                    }}
                  />
                  <Typography variant="h5" fontWeight="bold">
                    Executive Summary
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
                  {report.summary}
                </Typography>
                <Box display="flex" gap={1} mt={2} flexWrap="wrap">
                  <Chip
                    label="AI-generated insights"
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label="Real-time data"
                    color="secondary"
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label="3-minute read"
                    color="info"
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Slide>
        </Grid>

        {/* Metrics Cards */}
        {report.keyMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Grow in={!!report} timeout={index * 200 + 500}>
              <Card elevation={0} sx={{ height: "100%", borderRadius: 3 }}>
                <CardContent sx={metricCardStyles}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Box
                      sx={{
                        p: 1,
                        mr: 2,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? theme.palette.background.paper
                            : theme.palette.grey[100],
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {metric.icon}
                    </Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      fontWeight="bold"
                    >
                      {metric.label}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ my: 1, textAlign: "center" }}
                  >
                    {metric.value}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={1}
                  >
                    {getTrendIcon(metric.trend)}
                    <Chip
                      label={metric.change}
                      size="small"
                      color={getTrendColor(metric.trend)}
                      sx={{ ml: 1, fontWeight: "bold" }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}

        {/* Priorities Card */}
        <Grid item xs={12} md={6}>
          <Fade in={!!report} timeout={800}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <CheckCircle
                    color="primary"
                    sx={{ fontSize: 32, mr: 2 }}
                  />
                  <Typography variant="h5" fontWeight="bold">
                    Strategic Priorities
                  </Typography>
                </Box>
                <List dense>
                  {report.priorities.map((priority, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        py: 1,
                        px: 0,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        "&:last-child": { borderBottom: "none" }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor: "primary.main",
                            boxShadow: `0 0 8px ${theme.palette.primary.main}`
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1">{priority}</Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Risks Card */}
        <Grid item xs={12} md={6}>
          <Fade in={!!report} timeout={1000}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Warning
                    color="warning"
                    sx={{ fontSize: 32, mr: 2 }}
                  />
                  <Typography variant="h5" fontWeight="bold">
                    Risk Factors
                  </Typography>
                </Box>
                <List dense>
                  {report.risks.map((risk, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        py: 1,
                        px: 0,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        "&:last-child": { borderBottom: "none" }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <PriorityHigh
                          color="warning"
                          fontSize="small"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1">{risk}</Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CEOReport
