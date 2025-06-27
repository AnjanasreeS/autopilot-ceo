"use client"

import { useState } from "react"
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  Chip,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Assessment as ReportIcon,
  Warning as AlertIcon,
  Psychology as BrainIcon,
  AutoMode as AutoIcon,
  Terminal as CommandIcon,
  Email as EmailIcon,
} from "@mui/icons-material"

import Dashboard from "./components/Dashboard"
import CEOReport from "./components/CEOReport"
import RiskAlerts from "./components/RiskAlerts"
import DecisionAssist from "./components/DecisionAssist"
import AutopilotMode from "./components/AutopilotMode"
import CommandCenter from "./components/CommandCenter"
import EmailProcessor from "./components/EmailProcessor"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
})

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function App() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <BrainIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Autopilot CEO Dashboard
          </Typography>
          <Chip
            label="Granite AI Active"
            color="success"
            variant="outlined"
            sx={{ color: "white", borderColor: "white" }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab icon={<DashboardIcon />} label="Dashboard" />
            <Tab icon={<ReportIcon />} label="CEO Report" />
            <Tab icon={<AlertIcon />} label="Risk Alerts" />
            <Tab icon={<BrainIcon />} label="Decision Assist" />
            <Tab icon={<AutoIcon />} label="Autopilot" />
            <Tab icon={<CommandIcon />} label="Command Center" />
            <Tab icon={<EmailIcon />} label="Email Intelligence" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Dashboard />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <CEOReport />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <RiskAlerts />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <DecisionAssist />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <AutopilotMode />
        </TabPanel>
        <TabPanel value={tabValue} index={5}>
          <CommandCenter />
        </TabPanel>
        <TabPanel value={tabValue} index={6}>
          <EmailProcessor />
        </TabPanel>
      </Container>
    </ThemeProvider>
  )
}

export default App
