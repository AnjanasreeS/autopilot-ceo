"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Inbox, AlertTriangle, CheckCircle, Clock, User } from "lucide-react"

export default function EmailProcessor() {
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 border-green-200"
      case "negative":
        return "bg-red-100 text-red-800 border-red-200"
      case "neutral":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "support":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "business":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "competitive":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "investor":
        return <User className="w-4 h-4 text-blue-500" />
      default:
        return <Mail className="w-4 h-4 text-gray-500" />
    }
  }

  const categories = ["all", "support", "business", "competitive", "investor"]
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredEmails =
    selectedCategory === "all" ? emails : emails.filter((email) => email.category === selectedCategory)

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Mail className="w-5 h-5" />
            Email Intelligence
          </CardTitle>
          <p className="text-blue-600 text-sm">AI-powered email processing and insights</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-blue-700">47</div>
              <div className="text-sm text-blue-600">Emails Processed</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-red-700">3</div>
              <div className="text-sm text-red-600">High Priority</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-green-700">12</div>
              <div className="text-sm text-green-600">Actions Created</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <div className="text-2xl font-bold text-purple-700">94%</div>
              <div className="text-sm text-purple-600">Accuracy Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Inbox className="w-5 h-5" />
              Processed Emails
            </CardTitle>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Process New Emails
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <div className="space-y-4">
                {filteredEmails.map((email) => (
                  <div key={email.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getCategoryIcon(email.category)}
                          <span className="font-medium text-slate-900">{email.from}</span>
                          <Badge className={getPriorityColor(email.priority)}>{email.priority}</Badge>
                          <Badge className={getSentimentColor(email.sentiment)}>{email.sentiment}</Badge>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1">{email.subject}</h3>
                        <p className="text-slate-600 text-sm mb-2">{email.preview}</p>
                      </div>
                      <span className="text-xs text-slate-500">{email.timestamp}</span>
                    </div>

                    <div className="bg-blue-50 p-3 rounded border border-blue-200 mb-3">
                      <div className="text-xs text-blue-600 font-medium mb-1">AI Summary:</div>
                      <div className="text-sm text-blue-800">{email.aiSummary}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="bg-green-50 px-3 py-1 rounded border border-green-200">
                        <span className="text-xs text-green-600 font-medium">Suggested Action: </span>
                        <span className="text-sm text-green-800">{email.suggestedAction}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Full Email
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Execute Action
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
