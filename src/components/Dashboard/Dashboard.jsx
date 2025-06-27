import { Grid, Card, CardContent, Typography, Box, Chip, LinearProgress } from "@mui/material"
import { TrendingUp, TrendingDown, Warning, CheckCircle, People, AttachMoney } from "@mui/icons-material"

const Dashboard = () => {
  const metrics = [
    {
      title: "Revenue",
      value: "$2.4M",
      change: "+12%",
      trend: "up",
      icon: <AttachMoney color="success" />,
    },
    {
      title: "Active Alerts",
      value: "3",
      change: "High Priority",
      trend: "warning",
      icon: <Warning color="warning" />,
    },
    {
      title: "Team Productivity",
      value: "87%",
      change: "-2%",
      trend: "down",
      icon: <People color="primary" />,
    },
    {
      title: "Tasks Completed",
      value: "24",
      change: "+8 today",
      trend: "up",
      icon: <CheckCircle color="success" />,
    },
  ]

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp color="success" />
      case "down":
        return <TrendingDown color="error" />
      case "warning":
        return <Warning color="warning" />
      default:
        return null
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up":
        return "success"
      case "down":
        return "error"
      case "warning":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Executive Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      {metric.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {metric.value}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      {getTrendIcon(metric.trend)}
                      <Chip label={metric.change} size="small" color={getTrendColor(metric.trend)} sx={{ ml: 1 }} />
                    </Box>
                  </Box>
                  <Box>{metric.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  AI processed 47 emails in the last hour
                </Typography>
                <LinearProgress variant="determinate" value={85} sx={{ mt: 1 }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  12 tasks auto-assigned to teams
                </Typography>
                <LinearProgress variant="determinate" value={60} sx={{ mt: 1 }} />
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  3 high-priority alerts generated
                </Typography>
                <LinearProgress variant="determinate" value={100} color="warning" sx={{ mt: 1 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Insights
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip label="APAC Sales +34%" color="success" sx={{ mr: 1, mb: 1 }} />
                <Chip label="Client X Risk" color="error" sx={{ mr: 1, mb: 1 }} />
                <Chip label="Engineering Capacity" color="warning" sx={{ mr: 1, mb: 1 }} />
              </Box>
              <Typography variant="body2" color="textSecondary">
                AI has identified 3 immediate action items requiring executive attention. Revenue growth is strong but
                operational efficiency needs review.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
