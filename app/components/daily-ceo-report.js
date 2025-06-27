"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react"

export default function DailyCEOReport({ expanded = false }) {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)

  const generateReport = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/generate-ceo-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      setReport(data.report)
    } catch (error) {
      console.error("Error generating report:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (expanded) {
      generateReport()
    }
  }, [expanded])

  const mockReport = {
    summary: "Strong performance across key metrics with emerging opportunities in APAC market.",
    keyMetrics: [
      { label: "Revenue", value: "$2.4M", change: "+12%", trend: "up" },
      { label: "Customer Satisfaction", value: "94%", change: "+3%", trend: "up" },
      { label: "Team Productivity", value: "87%", change: "-2%", trend: "down" },
      { label: "Market Share", value: "23%", change: "+5%", trend: "up" },
    ],
    priorities: [
      "Address team productivity decline in Engineering",
      "Capitalize on APAC expansion opportunity",
      "Review Q3 marketing budget allocation",
    ],
    risks: ["Competitor X launching similar product next month", "Key client renewal at risk (TechCorp)"],
  }

  const displayReport = report || mockReport

  return (
    <Card className={`${expanded ? "col-span-full" : ""} bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Clock className="w-5 h-5" />
            Daily CEO Report
          </CardTitle>
          <p className="text-blue-600 text-sm mt-1">3-minute strategic digest</p>
        </div>
        <Button onClick={generateReport} disabled={loading} size="sm" className="bg-blue-600 hover:bg-blue-700">
          {loading ? "Generating..." : "Refresh"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Executive Summary */}
        <div className="bg-white p-4 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-slate-900 mb-2">Executive Summary</h3>
          <p className="text-slate-700">{displayReport.summary}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {displayReport.keyMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-3 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">{metric.label}</span>
                {metric.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-slate-900">{metric.value}</span>
                <Badge
                  variant="outline"
                  className={metric.trend === "up" ? "text-green-700 border-green-200" : "text-red-700 border-red-200"}
                >
                  {metric.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {expanded && (
          <>
            {/* Top Priorities */}
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                Top Priorities
              </h3>
              <ul className="space-y-2">
                {displayReport.priorities.map((priority, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700">{priority}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Factors */}
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                Risk Factors
              </h3>
              <ul className="space-y-2">
                {displayReport.risks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
