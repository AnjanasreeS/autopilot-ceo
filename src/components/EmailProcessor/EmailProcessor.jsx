// "use client"

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
  Snackbar,
  useTheme,
  Collapse,
  IconButton,
} from "@mui/material"
import {
  Email,
  Warning,
  Business,
  TrendingUp,
  Person,
  Schedule,
  Refresh,
  AutoAwesome,
  Bolt,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material"

const EmailProcessor = () => {
  const theme = useTheme()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [emails, setEmails] = useState([])
  const [expandedEmailId, setExpandedEmailId] = useState(null)
  const [snack, setSnack] = useState({ open: false, message: "" })

  const sampleEmails = [
    {
      id: 1,
      from: "alice@company.com",
      subject: "Follow-up on Sales Meeting",
      preview: "Thanks for the demo, we are interested in...",
      priority: "medium",
      sentiment: "positive",
      category: "business",
      aiSummary: "Client interested post-demo. Requires next step proposal.",
      suggestedAction: "Assign to sales lead",
      fullContent: "Dear Team,\n\nWe were very impressed with your solution during yesterday's demo. The features you demonstrated align perfectly with our needs. Specifically, we're interested in the advanced analytics module and the custom reporting functionality.\n\nWe'd like to discuss next steps, including pricing options and implementation timelines. Could you prepare a formal proposal by the end of this week?\n\nBest regards,\nAlice Johnson\nProcurement Manager",
    },
    {
      id: 2,
      from: "support@client.org",
      subject: "Bug in new release",
      preview: "The latest update caused issues with...",
      priority: "high",
      sentiment: "negative",
      category: "support",
      aiSummary: "Client reported urgent bug. Needs hotfix.",
      suggestedAction: "Escalate to engineering",
      fullContent: "URGENT: System Failure After Update\n\nHello Support Team,\n\nAfter applying the latest update (v2.3.1), our dashboard fails to load completely. Users receive a 500 error when trying to access any reporting features. This is impacting our entire team's ability to work.\n\nError details:\n- Occurs on both Chrome and Firefox\n- Console shows 'TypeError: Cannot read properties of null'\n- Started immediately after update\n\nPlease treat this as critical priority as it's blocking our operations.\n\nRegards,\nMichael Chen\nIT Director",
    },
  ]

  const fetchEmails = () => {
    const randomEmail = sampleEmails[Math.floor(Math.random() * sampleEmails.length)]
    const newEmail = {
      ...randomEmail,
      id: Date.now(),
      timestamp: "just now",
    }
    setEmails((prev) => [newEmail, ...prev])
    setSnack({ open: true, message: "New email processed" })
  }

  const handleExecuteAction = (email) => {
    setSnack({ open: true, message: `Action executed: ${email.suggestedAction}` })
  }

  const toggleEmailExpansion = (id) => {
    setExpandedEmailId(expandedEmailId === id ? null : id)
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "support": return <Warning color="error" />
      case "business": return <Business color="primary" />
      case "competitive": return <TrendingUp color="warning" />
      case "investor": return <Person color="info" />
      default: return <Email color="action" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "error"
      case "medium": return "warning"
      case "low": return "info"
      default: return "default"
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive": return "success"
      case "negative": return "error"
      case "neutral": return "default"
      default: return "default"
    }
  }

  const categories = [
    { value: "all", label: "All", count: emails.length },
    ...["support", "business", "competitive", "investor"].map((cat) => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: emails.filter((e) => e.category === cat).length,
    })),
  ]

  const filteredEmails = selectedCategory === "all"
    ? emails
    : emails.filter((email) => email.category === selectedCategory)

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <AutoAwesome sx={{ fontSize: 40, color: theme.palette.primary.main }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">Email Intelligence</Typography>
          <Typography variant="body1" color="textSecondary">
            AI-powered email processing and insights
          </Typography>
        </Box>
      </Box>

      <Card sx={{ 
        mb: 3, 
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        boxShadow: 'none'
      }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Processed Emails</Typography>
            <Button 
              variant="contained" 
              startIcon={<Refresh />} 
              onClick={fetchEmails}
              sx={{ borderRadius: 2 }}
            >
              Process New Emails
            </Button>
          </Box>

          <Tabs
            value={selectedCategory}
            onChange={(e, val) => setSelectedCategory(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              mb: 2,
              '& .MuiTab-root': {
                minHeight: 48,
                textTransform: 'none',
                fontWeight: 'bold'
              }
            }}
          >
            {categories.map((cat) => (
              <Tab
                key={cat.value}
                value={cat.value}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    {cat.label}
                    <Chip 
                      label={cat.count} 
                      size="small" 
                      sx={{ 
                        backgroundColor: theme.palette.action.selected,
                        color: theme.palette.text.primary
                      }} 
                    />
                  </Box>
                }
              />
            ))}
          </Tabs>

          <List sx={{ p: 0 }}>
            {filteredEmails.map((email, index) => (
              <Box key={email.id}>
                <ListItem 
                  alignItems="flex-start" 
                  sx={{ 
                    p: 3,
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                      borderRadius: 1
                    }
                  }}
                >
                  <Box width="100%" display="flex" alignItems="center">
                    <ListItemIcon sx={{ minWidth: 48 }}>
                      {getCategoryIcon(email.category)}
                    </ListItemIcon>
                    <Box flexGrow={1}>
                      <Box display="flex" alignItems="center" gap={1} mb={1.5}>
                        <Avatar sx={{ width: 36, height: 36 }}>
                          {email.from.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {email.from}
                        </Typography>
                        <Chip 
                          label={email.priority} 
                          size="small" 
                          color={getPriorityColor(email.priority)} 
                          sx={{ fontWeight: 'bold' }}
                        />
                        <Chip 
                          label={email.sentiment} 
                          size="small" 
                          color={getSentimentColor(email.sentiment)} 
                          variant="outlined" 
                          sx={{ fontWeight: 'bold' }}
                        />
                        <Box ml="auto" display="flex" alignItems="center" gap={1}>
                          <Schedule fontSize="small" color="action" />
                          <Typography variant="body2" color="textSecondary">
                            {email.timestamp}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="h6" fontWeight="bold" mb={1}>
                        {email.subject}
                      </Typography>
                      <Typography variant="body1" color="textSecondary" mb={2}>
                        {email.preview}
                      </Typography>
                    </Box>
                    <IconButton 
                      onClick={() => toggleEmailExpansion(email.id)}
                      sx={{ ml: 2 }}
                    >
                      {expandedEmailId === email.id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Box>

                  <Collapse in={expandedEmailId === email.id} timeout="auto" unmountOnExit>
                    <Box width="100%" mt={2} pl={6}>
                      {/* Full Email Content */}
                      <Box 
                        mb={3} 
                        p={3} 
                        sx={{ 
                          backgroundColor: theme.palette.mode === 'dark' ? 
                            theme.palette.grey[900] : 
                            theme.palette.grey[100],
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.divider}`
                        }}
                      >
                        <Typography 
                          variant="body1" 
                          component="pre" 
                          sx={{ 
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            lineHeight: 1.6
                          }}
                        >
                          {email.fullContent}
                        </Typography>
                      </Box>

                      {/* AI Summary Box */}
                      <Box 
                        mb={2} 
                        p={2} 
                        sx={{ 
                          backgroundColor: theme.palette.mode === 'dark' ? 
                            theme.palette.primary.dark : 
                            theme.palette.primary.light,
                          borderRadius: 1,
                          borderLeft: `4px solid ${theme.palette.primary.main}`
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <Bolt color="primary" fontSize="small" />
                          <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                            AI SUMMARY
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                          {email.aiSummary}
                        </Typography>
                      </Box>
                      
                      {/* Suggested Action Box */}
                      <Box 
                        mb={2} 
                        p={2} 
                        sx={{ 
                          backgroundColor: theme.palette.mode === 'dark' ? 
                            theme.palette.success.dark : 
                            theme.palette.success.light,
                          borderRadius: 1,
                          borderLeft: `4px solid ${theme.palette.success.main}`
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <AutoAwesome color="success" fontSize="small" />
                          <Typography variant="subtitle1" fontWeight="bold" color="success.main">
                            SUGGESTED ACTION
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                          {email.suggestedAction}
                        </Typography>
                      </Box>
                      
                      <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={() => handleExecuteAction(email)}
                          sx={{ borderRadius: 2 }}
                        >
                          Execute Action
                        </Button>
                      </Box>
                    </Box>
                  </Collapse>
                </ListItem>
                {index < filteredEmails.length - 1 && (
                  <Divider sx={{ mx: 3 }} />
                )}
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        message={snack.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        ContentProps={{
          sx: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontWeight: 'bold',
            borderRadius: 2
          }
        }}
      />
    </Box>
  )
}

export default EmailProcessor