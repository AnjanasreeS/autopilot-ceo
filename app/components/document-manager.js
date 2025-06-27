"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, Search, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

export default function DocumentManager() {
  const [documents] = useState([
    {
      id: 1,
      name: "Q3 Financial Report.pdf",
      type: "financial",
      size: "2.4 MB",
      uploadedAt: "2 hours ago",
      status: "processed",
      insights: ["Revenue up 12% vs Q2", "APAC region showing strong growth", "Operating costs increased 8%"],
      keyMetrics: {
        revenue: "$2.4M",
        growth: "+12%",
        margin: "23%",
      },
    },
    {
      id: 2,
      name: "Customer Feedback Survey.xlsx",
      type: "customer",
      size: "1.8 MB",
      uploadedAt: "4 hours ago",
      status: "processed",
      insights: ["Overall satisfaction: 94%", "Support response time concerns", "Feature requests trending up"],
      keyMetrics: {
        satisfaction: "94%",
        nps: "67",
        responses: "1,247",
      },
    },
    {
      id: 3,
      name: "Engineering Sprint Report.docx",
      type: "operational",
      size: "856 KB",
      uploadedAt: "6 hours ago",
      status: "processing",
      insights: [],
      keyMetrics: {},
    },
    {
      id: 4,
      name: "Market Analysis Q3.pdf",
      type: "strategic",
      size: "3.2 MB",
      uploadedAt: "1 day ago",
      status: "processed",
      insights: [
        "Competitor X gaining market share",
        "New market opportunities in Europe",
        "Pricing pressure in core segments",
      ],
      keyMetrics: {
        marketShare: "23%",
        competition: "High",
        opportunity: "Medium",
      },
    },
  ])

  const getTypeColor = (type) => {
    const colors = {
      financial: "bg-green-100 text-green-800 border-green-200",
      customer: "bg-blue-100 text-blue-800 border-blue-200",
      operational: "bg-purple-100 text-purple-800 border-purple-200",
      strategic: "bg-orange-100 text-orange-800 border-orange-200",
    }
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "processed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "processing":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Document Intelligence
            </CardTitle>
            <p className="text-slate-600 text-sm mt-1">AI-powered document analysis and insights</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(doc.status)}
                    <span className="font-medium text-slate-900">{doc.name}</span>
                    <Badge className={getTypeColor(doc.type)}>{doc.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>{doc.size}</span>
                    <span>{doc.uploadedAt}</span>
                  </div>
                </div>
              </div>

              {doc.status === "processed" && doc.insights.length > 0 && (
                <>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Key Insights:</h4>
                    <ul className="space-y-1">
                      {doc.insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-slate-600">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {Object.keys(doc.keyMetrics).length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {Object.entries(doc.keyMetrics).map(([key, value]) => (
                        <div key={key} className="bg-white p-2 rounded border border-slate-200">
                          <div className="text-xs text-slate-500 capitalize">{key}</div>
                          <div className="text-sm font-semibold text-slate-900">{value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {doc.status === "processing" && (
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200 mb-3">
                  <div className="text-sm text-yellow-800">Processing document with Granite AI...</div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View Details
                </Button>
                {doc.status === "processed" && (
                  <Button size="sm" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Generate Report
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
