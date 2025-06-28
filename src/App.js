
import { useState, useRef, useEffect } from "react"
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
  Fade,
  Grow,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Assessment as ReportIcon,
  Warning as AlertIcon,
  Psychology as BrainIcon,
  AutoMode as AutoIcon,
  Terminal as CommandIcon,
  Email as EmailIcon,
  Description as FileTextIcon,
} from "@mui/icons-material"

import Dashboard from "./components/Dashboard/Dashboard.jsx"
import CEOReport from "./components/CEOReport/CEOReport.jsx"
import RiskAlerts from "./components/RiskAlerts/RiskAlerts.jsx"
import DecisionAssist from "./components/DecisionAssist/DecisionAssist.jsx"
import AutopilotMode from "./components/AutopilotMode/AutopilotMode.jsx"
import CommandCenter from "./components/CommandCenter/CommandCenter.jsx"
import EmailProcessor from "./components/EmailProcessor/EmailProcessor.jsx"
import DocumentManager from "./components/DocumentManager/DocumentManager.jsx"

const AILogo = () => (
  <Box sx={{
    position: 'relative',
    width: 40,
    height: 40,
    mr: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Box sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #64b5f6 0%, #f50057 100%)',
      animation: 'rotate 8s linear infinite',
      '@keyframes rotate': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    }} />
    <BrainIcon sx={{
      position: 'relative',
      fontSize: 24,
      color: 'white',
      filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))',
    }} />
  </Box>
)

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64b5f6",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#0a1929",
      paper: "rgba(16, 20, 24, 0.8)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3e5fc",
    },
  },
  typography: {
    fontFamily: ['"Inter"', 'sans-serif'].join(","),
    h5: {
      fontWeight: 800,
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(10, 25, 41, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.85rem',
          fontWeight: 600,
          minHeight: '64px',
          minWidth: '120px',
          textTransform: 'none',
          padding: '12px 16px',
          '&.Mui-selected': {
            color: '#ffffff',
            fontWeight: 700,
          },
          '& .MuiTab-iconWrapper': {
            marginBottom: '4px',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: '3px',
          background: 'linear-gradient(90deg, #64b5f6 0%, #f50057 100%)',
        },
        flexContainer: {
          gap: '8px',
        }
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          color: '#a5d6a7',
          fontWeight: 600,
          letterSpacing: '0.05em',
          padding: '4px 8px',
          border: '1px solid rgba(165, 214, 167, 0.3)',
        },
      },
    },
  },
})

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Grow in={value === index} timeout={600}>
        <Box sx={{ 
          p: 3,
          backgroundColor: 'rgba(16, 20, 24, 0.6)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}>
          {children}
        </Box>
      </Grow>
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
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ minHeight: 80, px: 4 }}>
          <AILogo />
          <Box sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Typography variant="h5" sx={{
              background: 'linear-gradient(135deg, #64b5f6, #f50057)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2,
            }}>
              AUTOPILOT CEO
            </Typography>
            <Typography variant="caption" sx={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Enterprise AI Management System
            </Typography>
          </Box>
          <Fade in timeout={1500}>
            <Chip label="GRANITE AI ACTIVE" />
          </Fade>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
        <Fade in timeout={800}>
          <Box
            sx={{
              mb: 4,
              backgroundColor: 'rgba(25, 35, 50, 0.5)',
              borderRadius: '12px',
              p: 1,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                minHeight: '64px',
              }}
            >
              <Tab icon={<DashboardIcon />} label="Dashboard" />
              <Tab icon={<ReportIcon />} label="CEO Report" />
              <Tab icon={<AlertIcon />} label="Risk Alerts" />
              <Tab icon={<BrainIcon />} label="Decision Assist" />
              <Tab icon={<AutoIcon />} label="Autopilot" />
              <Tab icon={<CommandIcon />} label="Command Center" />
              <Tab icon={<EmailIcon />} label="Email Processor" />
              <Tab icon={<FileTextIcon />} label="Documents" />
            </Tabs>
          </Box>
        </Fade>

        <Box sx={{ minHeight: '60vh' }}>
          <TabPanel value={tabValue} index={0}><Dashboard /></TabPanel>
          <TabPanel value={tabValue} index={1}><CEOReport /></TabPanel>
          <TabPanel value={tabValue} index={2}><RiskAlerts /></TabPanel>
          <TabPanel value={tabValue} index={3}><DecisionAssist /></TabPanel>
          <TabPanel value={tabValue} index={4}><AutopilotMode /></TabPanel>
          <TabPanel value={tabValue} index={5}><CommandCenter /></TabPanel>
          <TabPanel value={tabValue} index={6}><EmailProcessor /></TabPanel>
          <TabPanel value={tabValue} index={7}><DocumentManager /></TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App