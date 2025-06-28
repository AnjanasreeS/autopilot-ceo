
"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Chip, 
  CircularProgress,
  IconButton,
  useTheme,
  Slide,
  Snackbar,
  Alert
} from "@mui/material"
import { 
  Terminal, 
  Send, 
  TrendingUp, 
  CheckCircle, 
  Refresh,
  KeyboardVoice,
  Stop
} from "@mui/icons-material"

const CommandCenter = () => {
  const theme = useTheme()
  const [command, setCommand] = useState("")
  const [loading, setLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [history, setHistory] = useState([])
  const [error, setError] = useState(null)
  const recognitionRef = useRef(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          setCommand(prev => prev ? `${prev} ${transcript}` : transcript)
          setIsRecording(false)
        }

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error', event.error)
          setIsRecording(false)
          setError('Speech recognition error. Please try again.')
        }
      } else {
        setError('Speech recognition not supported in your browser')
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop()
      setIsRecording(false)
    } else {
      recognitionRef.current?.start()
      setIsRecording(true)
    }
  }

  const executeCommandHandler = async () => {
    if (!command.trim()) return

    setLoading(true)
    setError(null)
    
    try {
      // Call Granite API
      const response = await fetchGraniteResponse(command)
      
      // Parse the response
      const aiResponse = response.results?.[0]?.generated_text || 
                       response.generated_text || 
                       "No response from AI"
      
      const newCommand = {
        id: Date.now(),
        command,
        response: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
        actions: extractActionsFromResponse(aiResponse)
      }
      
      setHistory([newCommand, ...history])
      setCommand("")
    } catch (error) {
      console.error("Error executing command:", error)
      setError(error.message || "Failed to get AI response. Please check your API key and connection.")
    } finally {
      setLoading(false)
    }
  }

  const extractActionsFromResponse = (response) => {
    const actions = []
    if (response.includes("recommend")) {
      actions.push("Recommendation generated")
    }
    if (response.includes("analyze") || response.includes("analysis")) {
      actions.push("Analysis completed")
    }
    if (response.includes("report")) {
      actions.push("Report generated")
    }
    return actions.length > 0 ? actions : ["Task completed"]
  }

  const fetchGraniteResponse = async (prompt) => {
    const GRANITE_API_URL = 'https://bam-api.res.ibm.com/v1/generate'
    const API_KEY = 'xMTnxwuzf4qJdpAjFpMMyu9bRJPd9zePk-krnXLOtV0l'
    
    const requestBody = {
      model_id: "ibm/granite-13b-chat-v2",
      input: prompt,
      parameters: {
        max_new_tokens: 1024,
        min_new_tokens: 10,
        temperature: 0.7,
        top_p: 0.9,
        repetition_penalty: 1.1,
        stop_sequences: ["\n"]
      }
    }

    const response = await fetch(GRANITE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        errorData = { message: await response.text() }
      }
      throw new Error(errorData.message || `API request failed with status ${response.status}`)
    }

    return await response.json()
  }

  const clearHistory = () => {
    setHistory([])
  }

  const quickCommands = [
    "Generate weekly executive summary",
    "Show top 3 business risks",
    "Analyze team performance metrics",
    "Review customer feedback trends",
    "Check competitor activity",
    "Summarize financial KPIs",
  ]

  const commandCardStyles = {
    mb: 2,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 2,
    '&:hover': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`
    }
  }

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.background.paper,
      '& fieldset': {
        borderColor: theme.palette.divider,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: 1
      },
    },
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
    }
  }

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Terminal sx={{ fontSize: 40, color: theme.palette.primary.main }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">Executive Command Center</Typography>
          <Typography variant="body1" color="textSecondary">
            Natural language interface powered by IBM Granite AI
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Card elevation={0} sx={{ 
        mb: 3,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2
      }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            AI Command Interface
          </Typography>

          <Box display="flex" gap={2} mb={3}>
            <TextField
              fullWidth
              placeholder="Ask for business insights or actions..."
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && executeCommandHandler()}
              variant="outlined"
              sx={inputStyles}
              multiline
              maxRows={4}
            />
            <IconButton
              onClick={toggleRecording}
              sx={{
                backgroundColor: isRecording ? theme.palette.error.main : theme.palette.action.selected,
                color: isRecording ? theme.palette.error.contrastText : theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: isRecording ? theme.palette.error.dark : theme.palette.action.hover
                }
              }}
            >
              {isRecording ? <Stop /> : <KeyboardVoice />}
            </IconButton>
            <Button
              variant="contained"
              onClick={executeCommandHandler}
              disabled={loading || !command.trim()}
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
              sx={{ 
                minWidth: 120,
                borderRadius: 2,
                fontWeight: 'bold'
              }}
            >
              {loading ? "Processing..." : "Execute"}
            </Button>
          </Box>

          <Box>
            <Typography variant="body2" color="textSecondary" mb={1}>
              Try these quick commands:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {quickCommands.map((cmd, index) => (
                <Chip
                  key={index}
                  label={cmd}
                  variant="outlined"
                  size="small"
                  onClick={() => setCommand(cmd)}
                  sx={{ 
                    cursor: "pointer",
                    '&:hover': {
                      backgroundColor: theme.palette.action.selected,
                      borderColor: theme.palette.primary.main
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Command History
        </Typography>
        <Button 
          startIcon={<Refresh />} 
          onClick={clearHistory}
          size="small"
          color="inherit"
        >
          Clear History
        </Button>
      </Box>

      {history.length === 0 ? (
        <Card elevation={0} sx={{ 
          textAlign: 'center', 
          p: 4,
          backgroundColor: theme.palette.background.paper,
          border: `1px dashed ${theme.palette.divider}`,
          borderRadius: 2
        }}>
          <Typography variant="body1" color="textSecondary">
            No commands executed yet. Enter a query to begin.
          </Typography>
        </Card>
      ) : (
        history.map((item, index) => (
          <Slide key={item.id} direction="up" in timeout={(index + 1) * 100}>
            <Card elevation={0} sx={commandCardStyles}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Terminal fontSize="small" color="primary" />
                  <Typography variant="subtitle2" fontWeight="bold">Command</Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ ml: 'auto' }}>
                    {item.timestamp}
                  </Typography>
                </Box>

                <Box sx={{ 
                  p: 2, 
                  mb: 2,
                  backgroundColor: theme.palette.mode === 'dark' ? 
                    theme.palette.grey[900] : 
                    theme.palette.grey[100],
                  borderRadius: 1,
                  borderLeft: `3px solid ${theme.palette.primary.main}`
                }}>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                    {item.command}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <TrendingUp fontSize="small" color="success" />
                  <Typography variant="subtitle2" fontWeight="bold">AI Response</Typography>
                </Box>

                <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                  {item.response}
                </Typography>

                {item.actions && item.actions.length > 0 && (
                  <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <CheckCircle fontSize="small" color="success" />
                      <Typography variant="subtitle2" fontWeight="bold">Actions Taken</Typography>
                    </Box>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {item.actions.map((action, idx) => (
                        <Chip 
                          key={idx} 
                          label={action} 
                          size="small" 
                          color="success" 
                          variant="outlined"
                          sx={{ fontWeight: 'medium' }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Slide>
        ))
      )}
    </Box>
  )
}

export default CommandCenter