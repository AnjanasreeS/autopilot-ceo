"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Brain, Send, TrendingUp, DollarSign, Users, Calendar } from "lucide-react"

export default function DecisionAssist() {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [responses, setResponses] = useState([
    {
      question: "Should we increase ad spend in Q3?",
      answer:
        "Based on current ROI data and market trends, I recommend a 25% increase in digital ad spend, focusing on APAC markets where we're seeing 34% growth.",
      confidence: 87,
      factors: [
        { icon: DollarSign, label: "Current ROI", value: "3.2x", positive: true },
        { icon: TrendingUp, label: "Market Growth", value: "+34%", positive: true },
        { icon: Users, label: "CAC Trend", value: "-12%", positive: true },
      ],
      recommendation: "Increase budget by $50K, allocate 60% to APAC",
    },
  ])

  const askQuestion = async () => {
    if (!question.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/decision-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      })
      const data = await response.json()

      setResponses([data.response, ...responses])
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
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Brain className="w-5 h-5" />
            Decision Assist
          </CardTitle>
          <p className="text-purple-600 text-sm">Get data-backed answers to strategic questions</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask a strategic question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && askQuestion()}
              className="flex-1"
            />
            <Button
              onClick={askQuestion}
              disabled={loading || !question.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, index) => (
              <Button key={index} variant="outline" size="sm" onClick={() => setQuestion(q)} className="text-xs">
                {q}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Responses */}
      <div className="space-y-4">
        {responses.map((response, index) => (
          <Card key={index} className="bg-white border-slate-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">"{response.question}"</h3>
                  <p className="text-slate-700">{response.answer}</p>
                </div>

                <div className="flex items-center gap-4">
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {response.confidence}% Confidence
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    Based on last 90 days data
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {response.factors.map((factor, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <factor.icon className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-600">{factor.label}</span>
                      </div>
                      <div className={`text-lg font-bold ${factor.positive ? "text-green-600" : "text-red-600"}`}>
                        {factor.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-1">Recommendation</h4>
                  <p className="text-blue-800">{response.recommendation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
