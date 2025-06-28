
import React, { useState, useEffect } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, Chip, LinearProgress,
  CircularProgress, Alert, Snackbar, IconButton, Grow, Fade, Slide, Zoom
} from "@mui/material";
import { 
  TrendingUp, TrendingDown, Warning, CheckCircle, 
  People, AttachMoney, Refresh 
} from "@mui/icons-material";

const generateFinancialData = () => ({
  current: `$${(Math.random() * 3 + 1).toFixed(1)}M`,
  change: (Math.random() * 20 - 5).toFixed(1)
});

const generateAlertData = () => ({
  count: Math.floor(Math.random() * 5) + 1,
  priority: Math.random() > 0.7 ? "High" : "Normal"
});

const generateProductivityData = () => ({
  percentage: Math.floor(Math.random() * 30) + 70,
  change: (Math.random() * 10 - 3).toFixed(1)
});

const generateTaskData = () => ({
  completed: Math.floor(Math.random() * 20) + 10,
  today: Math.floor(Math.random() * 5) + 1
});

const generateActivityData = () => ({
  emailsProcessed: Math.floor(Math.random() * 50) + 20,
  emailProcessingRate: Math.floor(Math.random() * 30) + 70,
  tasksAssigned: Math.floor(Math.random() * 15) + 5,
  taskAssignmentRate: Math.floor(Math.random() * 40) + 50,
  highPriorityAlerts: Math.floor(Math.random() * 4) + 1
});

const generateInsightsData = () => {
  const regions = ["APAC", "EMEA", "NA", "LATAM"];
  const tags = [
    { label: `${regions[Math.floor(Math.random() * regions.length)]} Sales +${Math.floor(Math.random() * 30) + 5}%`, color: "success" },
    { label: "Client X Risk", color: "error" },
    { label: "Engineering Capacity", color: "warning" }
  ];
  
  const summaries = [
    "AI has identified immediate action items requiring executive attention. Revenue growth shows positive trends but operational efficiency needs review.",
    "Market analysis indicates emerging opportunities in the APAC region. Customer satisfaction metrics show improvement across all segments.",
    "Recent performance metrics suggest optimization opportunities in supply chain operations. Team productivity exceeds quarterly targets."
  ];
  
  return {
    tags,
    summary: summaries[Math.floor(Math.random() * summaries.length)]
  };
};

const fetchFinancialData = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return generateFinancialData();
};

const fetchAlertData = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return generateAlertData();
};

const fetchProductivityData = async () => {
  await new Promise(resolve => setTimeout(resolve, 700));
  return generateProductivityData();
};

const fetchTaskData = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return generateTaskData();
};

const fetchActivityData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return generateActivityData();
};

const fetchInsightsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 900));
  return generateInsightsData();
};

const MetricCard = ({ title, value, change, trend, icon, loading }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up": return <TrendingUp color="success" />;
      case "down": return <TrendingDown color="error" />;
      case "warning": return <Warning color="warning" />;
      default: return null;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up": return "success";
      case "down": return "error";
      case "warning": return "warning";
      default: return "default";
    }
  };

  return (
    <Zoom in={true} style={{ transitionDelay: '100ms' }}>
      <Card sx={{ 
        height: '100%',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" alignItems="flex-start" justifyContent="space-between">
            <Box>
              <Typography 
                color="text.secondary" 
                gutterBottom 
                variant="overline"
                sx={{ fontSize: '0.7rem', fontWeight: 600 }}
              >
                {title}
              </Typography>
              {loading ? (
                <Box height={56} display="flex" alignItems="center">
                  <CircularProgress size={24} />
                </Box>
              ) : (
                <>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                    {value}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1.5}>
                    {getTrendIcon(trend)}
                    <Chip 
                      label={change} 
                      size="small" 
                      color={getTrendColor(trend)} 
                      sx={{ ml: 1, fontWeight: 600 }} 
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box sx={{
              backgroundColor: 'action.hover',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {React.cloneElement(icon, { fontSize: 'medium' })}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Zoom>
  );
};

const ActivityItem = ({ label, value, color = 'primary', loading }) => {
  return (
    <Fade in={true}>
      <Box sx={{ mb: 2 }}>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontSize: '0.85rem', mb: 0.5 }}
        >
          {label}
        </Typography>
        {loading ? (
          <LinearProgress />
        ) : (
          <Box display="flex" alignItems="center">
            <LinearProgress 
              variant="determinate" 
              value={value} 
              color={color}
              sx={{ 
                flexGrow: 1,
                height: 6,
                borderRadius: 3,
                mr: 1,
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3
                }
              }} 
            />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
              {value}%
            </Typography>
          </Box>
        )}
      </Box>
    </Fade>
  );
};

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [
        financialData, 
        alertData, 
        productivityData, 
        taskData,
        activityResponse,
        insightsResponse
      ] = await Promise.all([
        fetchFinancialData(),
        fetchAlertData(),
        fetchProductivityData(),
        fetchTaskData(),
        fetchActivityData(),
        fetchInsightsData()
      ]);

      setMetrics([
        {
          title: "Revenue",
          value: financialData.current,
          change: `${financialData.change > 0 ? '+' : ''}${financialData.change}%`,
          trend: financialData.change >= 0 ? "up" : "down",
          icon: <AttachMoney color={financialData.change >= 0 ? "success" : "error"} />,
        },
        {
          title: "Active Alerts",
          value: alertData.count,
          change: alertData.priority,
          trend: alertData.priority === "High" ? "warning" : "up",
          icon: <Warning color="warning" />,
        },
        {
          title: "Team Productivity",
          value: `${productivityData.percentage}%`,
          change: `${productivityData.change > 0 ? '+' : ''}${productivityData.change}%`,
          trend: productivityData.change >= 0 ? "up" : "down",
          icon: <People color={productivityData.change >= 0 ? "success" : "error"} />,
        },
        {
          title: "Tasks Completed",
          value: taskData.completed,
          change: `+${taskData.today} today`,
          trend: "up",
          icon: <CheckCircle color="success" />,
        }
      ]);

      setActivityData([
        {
          label: `AI processed ${activityResponse.emailsProcessed} emails in the last hour`,
          value: activityResponse.emailProcessingRate,
        },
        {
          label: `${activityResponse.tasksAssigned} tasks auto-assigned to teams`,
          value: activityResponse.taskAssignmentRate,
        },
        {
          label: `${activityResponse.highPriorityAlerts} high-priority alerts generated`,
          value: 100,
          color: "warning",
        }
      ]);

      setInsights(insightsResponse);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 300000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchAllData();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Slide direction="down" in={true}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4}
          sx={{ pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              Executive Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real-time business performance overview
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            {lastUpdated && (
              <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </Typography>
            )}
            <IconButton 
              onClick={handleRefresh} 
              disabled={loading}
              sx={{ 
                backgroundColor: 'action.hover',
                '&:hover': { 
                  backgroundColor: 'action.selected',
                  transform: 'rotate(90deg)'
                },
              }}
            >
              <Refresh fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Slide>

      {error && (
        <Snackbar open autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MetricCard {...metric} loading={loading} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grow in={!loading} style={{ transitionDelay: '200ms' }}>
            <Card sx={{ 
              height: '100%',
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                  Recent Activity
                </Typography>
                {loading ? (
                  <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                  </Box>
                ) : (
                  activityData.map((activity, index) => (
                    <ActivityItem 
                      key={index}
                      label={activity.label}
                      value={activity.value}
                      color={activity.color}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </Grow>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grow in={!loading} style={{ transitionDelay: '300ms' }}>
            <Card sx={{ 
              height: '100%',
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                  AI Insights
                </Typography>
                {loading ? (
                  <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    <Box sx={{ mb: 2 }}>
                      {insights.tags?.map((tag, index) => (
                        <Chip 
                          key={index}
                          label={tag.label}
                          color={tag.color}
                          size="small"
                          sx={{ mr: 1, mb: 1, fontWeight: 600 }}
                        />
                      ))}
                    </Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        lineHeight: 1.7,
                        backgroundColor: 'action.hover',
                        p: 2,
                        borderRadius: 1,
                        borderLeft: '4px solid',
                        borderColor: 'primary.main'
                      }}
                    >
                      {insights.summary}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grow>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;