"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  Grid,
  CircularProgress,
  Divider,
} from "@mui/material"
import { Psychology, Send, AttachMoney, TrendingUp, People, Schedule } from "@mui/icons-material"
import { askDecisionQuestion } from "../api/graniteApi"

const DecisionAssist = () => {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [responses, setResponses] = useState([
    {
      question: "Should we increase ad spend in Q3?",
      answer:
        "Based on current ROI data and market trends, I recommend a 25% increase in digital ad spend, focusing on APAC markets where we're seeing 34% growth.",
      confidence: 87,
      factors: [
        { icon: AttachMoney, label: "Current ROI", value: "3.2x", positive: true },
        { icon: TrendingUp, label: "Market Growth", value: "+34%", positive: true },
        { icon: People, label: "CAC Trend", value: "-12%", positive: true },
      ],
      recommendation: "Increase budget by $50K, allocate 60% to APAC",
    },
  ])

  const askQuestion = async () => {
    if (!question.trim()) return

    setLoading(true)
    try {
      const response = await askDecisionQuestion(question)
      setResponses([response, ...responses])
      setQuestion("")
    } catch (error) {
      console.error("Error asking question:", error)
    }
    setLoading(false)
  }

  const suggestedQuestions = [
    "Should we hire more engineers this quarter?",
    "Is it time to expand to European markets?",
    "Should we increase our pricing by 15%?",
    "Is our customer churn rate concerning?",
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Decision Assist
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Get data-backed answers to strategic questions
      </Typography>

      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Psychology color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Ask a Strategic Question</Typography>
          </Box>

          <Box display="flex" gap={2} mb={2}>
            <TextField
              fullWidth
              placeholder="Ask a strategic question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && askQuestion()}
              multiline
              rows={2}
            />
            <Button
              variant="contained"
              onClick={askQuestion}
              disabled={loading || !question.trim()}
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
              sx={{ minWidth: 120 }}
            >
              {loading ? "Analyzing..." : "Ask"}
            </Button>
          </Box>

          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Suggested questions:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {suggestedQuestions.map((q, index) => (
                <Chip
                  key={index}
                  label={q}
                  variant="outlined"
                  size="small"
                  onClick={() => setQuestion(q)}
                  sx={{ cursor: "pointer" }}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {responses.map((response, index) => (
        <Card key={index} elevation={2} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              "{response.question}"
            </Typography>

            <Typography variant="body1" paragraph>
              {response.answer}
            </Typography>

            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Chip label={`${response.confidence}% Confidence`} color="success" variant="outlined" />
              <Box display="flex" alignItems="center" gap={1}>
                <Schedule fontSize="small" color="action" />
                <Typography variant="caption" color="textSecondary">
                  Based on last 90 days data
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Key Factors:
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {response.factors.map((factor, idx) => (
                <Grid item xs={12} sm={4} key={idx}>
                  <Box
                    sx={{
                      p: 2,
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      textAlign: "center",
                    }}
                  >
                    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                      <factor.icon fontSize="small" color="action" />
                      <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                        {factor.label}
                      </Typography>
                    </Box>
                    <Typography variant="h6" color={factor.positive ? "success.main" : "error.main"}>
                      {factor.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ bgcolor: "primary.light", p: 2, borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Recommendation:
              </Typography>
              <Typography variant="body2">{response.recommendation}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}

export default DecisionAssist
