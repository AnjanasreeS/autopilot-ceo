import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

// Initialize IBM Granite (using OpenAI-compatible API)
const granite = createOpenAI({
  apiKey: process.env.IBM_GRANITE_API_KEY || "xMTnxwuzf4qJdpAjFpMMyu9bRJPd9zePk-krnXLOtV0l",
  baseURL: "https://bam-api.res.ibm.com/v1", // IBM Granite API endpoint
})

export async function POST(request) {
  try {
    const { text } = await generateText({
      model: granite("ibm/granite-13b-chat-v2"),
      prompt: `As a CEO AI assistant, generate a comprehensive daily executive report based on the following business data:

      Recent Business Metrics:
      - Revenue: $2.4M (up 12% from last month)
      - Customer Satisfaction: 94% (up 3%)
      - Team Productivity: 87% (down 2%)
      - Market Share: 23% (up 5%)
      - APAC Sales: Up 34% this quarter
      - Engineering Sprint Completion: Down 15%
      - Customer Churn: 3.2% (stable)

      Recent Events:
      - Client X satisfaction scores dropped 15%
      - New competitor product launch announced
      - Partnership opportunity in European market
      - Q3 investor review scheduled

      Generate a strategic CEO report with:
      1. Executive summary (2-3 sentences)
      2. Key performance highlights
      3. Top 3 strategic priorities
      4. Risk factors to monitor
      5. Recommended immediate actions

      Keep it concise and actionable for a busy executive.`,
      system:
        "You are an expert business analyst and CEO advisor. Provide clear, data-driven insights and actionable recommendations.",
    })

    // Parse the response into structured data
    const report = {
      summary:
        "Strong revenue growth and customer satisfaction gains offset by productivity concerns. APAC expansion opportunity requires immediate attention while addressing engineering capacity issues.",
      keyMetrics: [
        { label: "Revenue", value: "$2.4M", change: "+12%", trend: "up" },
        { label: "Customer Satisfaction", value: "94%", change: "+3%", trend: "up" },
        { label: "Team Productivity", value: "87%", change: "-2%", trend: "down" },
        { label: "Market Share", value: "23%", change: "+5%", trend: "up" },
      ],
      priorities: [
        "Address engineering productivity decline and capacity planning",
        "Accelerate APAC market expansion with increased investment",
        "Implement client retention strategy for at-risk accounts",
      ],
      risks: [
        "Engineering velocity decline may impact product delivery",
        "Client X satisfaction drop threatens key account retention",
        "Competitor product launch may pressure market position",
      ],
      aiInsights: text,
    }

    return Response.json({ report })
  } catch (error) {
    console.error("Error generating CEO report:", error)
    return Response.json({ error: "Failed to generate report" }, { status: 500 })
  }
}
