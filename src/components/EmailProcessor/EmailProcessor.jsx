"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
} from "@mui/material"
import { Email, Warning, Business, TrendingUp, Person, Schedule, Refresh } from "@mui/icons-material"

const EmailProcessor = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [emails] = useState([
    {
      id: 1,
      from: "john.client@techcorp.com",
      subject: "Urgent: System Performance Issues",
      preview: "We've been experiencing significant slowdowns in the dashboard...",
      priority: "high",
      sentiment: "negative",
      category: "support",
      aiSummary: "Client reporting critical performance issues. Requires immediate technical response.",
      suggestedAction: "Escalate to technical team immediately",
      timestamp: "2 hours ago",
      processed: true,
    },
    {
      id: 2,
      from: "sarah.partner@acmecorp.com",
      subject: "Partnership Expansion Opportunity",
      preview: "I wanted to discuss expanding our partnership into the European market...",
      priority: "medium",
      sentiment: "positive",
      category: "business",
      aiSummary: "Partnership expansion opportunity in European market. Potential revenue increase.",
      suggestedAction: "Schedule call with business development team",
      timestamp: "4 hours ago",
      processed: true,
    },
    {
      id: 3,
      from: "team@competitor.com",
      subject: "New Product Launch Announcement",
      preview: "We're excited to announce our latest product that revolutionizes...",
      priority: "medium",
      sentiment: "neutral",
      category: "competitive",
      aiSummary: "Competitor launching new product. Analyze features and market impact.",
      suggestedAction: "Forward to product strategy team",
      timestamp: "6 hours ago",
      processed: true,
    },
    {
      id: 4,
      from: "investor@vcfund.com",
      subject: "Q3 Performance Review",
      preview: "Looking forward to our quarterly review meeting...",
      priority: "high",
      sentiment: "neutral",
      category: "investor",
      aiSummary: "Investor requesting Q3 performance review. Prepare financial metrics.",
      suggestedAction: "Schedule with CFO and prepare Q3 report",
      timestamp: "1 day ago",
      processed: true,
    },
  ])

  const categories = [
    { value: "all", label: "All", count: emails.length },
    { value: "support", label: "Support", count: emails.filter((e) => e.category === "support").length },
    { value: "business", label: "Business", count: emails.filter((e) => e.category === "business").length },
    { value: "competitive", label: "Competitive", count: emails.filter((e) => e.category === "competitive").length },
    { value: "investor", label: "Investor", count: emails.filter((e) => e.category === "investor").length },
  ]

  const filteredEmails =
    selectedCategory === "all" ? emails : emails.filter((email) => email.category === selectedCategory)

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

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "success"
      case "negative":
        return "error"
      case "neutral":
        return "default"
      default:
        return "default"
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "support":
        return <Warning color="error" />
      case "business":
        return <Business color="primary" />
      case "competitive":
        return <TrendingUp color="warning" />
      case "investor":
        return <Person color="info" />
      default:
        return <Email color="action" />
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Email Intelligence
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        AI-powered email processing and insights
      </Typography>

      <Card elevation={2} sx={{ mb: 3, bgcolor: "primary.light" }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" color="primary.contrastText">
              Processing Statistics
            </Typography>
            <Button variant="contained" startIcon={<Refresh />} size="small">
              Process New Emails
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Box textAlign="center">
                <Typography variant="h4" color="primary.contrastText">
                  47
                </Typography>
                <Typography variant="body2" color="primary.contrastText">
                  Emails Processed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box textAlign="center">
                <Typography variant="h4" color="error.main">
                  3
                </Typography>
                <Typography variant="body2" color="primary.contrastText">
                  High Priority
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box textAlign="center">
                <Typography variant="h4" color="success.main">
                  12
                </Typography>
                <Typography variant="body2" color="primary.contrastText">
                  Actions Created
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box textAlign="center">
                <Typography variant="h4" color="secondary.main">
                  94%
                </Typography>
                <Typography variant="body2" color="primary.contrastText">
                  Accuracy Rate
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={2}>
        <CardContent>
          <Box display="flex" justifyContent="between" alignItems="center" mb={2}>
            <Typography variant="h6">Processed Emails</Typography>
          </Box>

          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => setSelectedCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 3 }}
          >
            {categories.map((category) => (
              <Tab
                key={category.value}
                value={category.value}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    {category.label}
                    <Chip label={category.count} size="small" />
                  </Box>
                }
              />
            ))}
          </Tabs>

          <List>
            {filteredEmails.map((email, index) => (
              <Box key={email.id}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>{getCategoryIcon(email.category)}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
                          {email.from.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="subtitle2">{email.from}</Typography>
                        <Chip label={email.priority} size="small" color={getPriorityColor(email.priority)} />
                        <Chip
                          label={email.sentiment}
                          size="small"
                          color={getSentimentColor(email.sentiment)}
                          variant="outlined"
                        />
                        <Box display="flex" alignItems="center" gap={1} ml="auto">
                          <Schedule fontSize="small" color="action" />
                          <Typography variant="caption" color="textSecondary">
                            {email.timestamp}
                          </Typography>
                        </Box>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="subtitle1" gutterBottom>
                          {email.subject}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" paragraph>
                          {email.preview}
                        </Typography>

                        <Box sx={{ bgcolor: "info.light", p: 2, borderRadius: 1, mb: 2 }}>
                          <Typography variant="caption" fontWeight="bold" color="info.main">
                            AI Summary:
                          </Typography>
                          <Typography variant="body2" color="info.main">
                            {email.aiSummary}
                          </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box sx={{ bgcolor: "success.light", px: 2, py: 1, borderRadius: 1 }}>
                            <Typography variant="caption" fontWeight="bold" color="success.main">
                              Suggested Action:
                            </Typography>
                            <Typography variant="body2" color="success.main">
                              {email.suggestedAction}
                            </Typography>
                          </Box>

                          <Box display="flex" gap={1}>
                            <Button variant="outlined" size="small">
                              View Full Email
                            </Button>
                            <Button variant="contained" size="small" color="success">
                              Execute Action
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < filteredEmails.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

export default EmailProcessor
