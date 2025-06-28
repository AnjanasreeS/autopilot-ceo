import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

const granite = createOpenAI({
  apiKey: process.env.IBM_GRANITE_API_KEY || "xMTnxwuzf4qJdpAjFpMMyu9bRJPd9zePk-krnXLOtV0l",
  baseURL: "https://bam-api.res.ibm.com/v1",
})

export async function POST(request) {
  try {
    const { question } = await request.json()

    const { text } = await generateText({
      model: granite("ibm/granite-13b-chat-v2"),
      prompt: `As a strategic business advisor with access to comprehensive business data, answer this executive question: "${question}"

      Current Business Context:
      - Company Revenue: $2.4M monthly, growing 12%
      - Customer Base: 15,000 active users, 94% satisfaction
      - Team Size: 85 employees across 5 departments
      - Market Position: 23% market share, competitive landscape
      - Financial Health: Strong cash flow, 6 months runway
      - Recent Trends: APAC growth 34%, engineering productivity down 15%
      - Key Metrics: CAC $120, LTV $2,400, Churn 3.2%

      Provide a data-backed recommendation with:
      1. Clear yes/no recommendation with reasoning
      2. Key factors that support this decision
      3. Potential risks and mitigation strategies
      4. Expected impact and timeline
      5. Confidence level (1-100%)

      Be specific and actionable.`,
      system:
        "You are a senior business strategist with expertise in data-driven decision making. Provide clear, actionable recommendations based on quantitative analysis and business best practices.",
    })

    // Structure the response
    const response = {
      question,
      answer: text,
      confidence: 87,
      factors: [
        { icon: "DollarSign", label: "Current ROI", value: "3.2x", positive: true },
        { icon: "TrendingUp", label: "Market Growth", value: "+34%", positive: true },
        { icon: "Users", label: "CAC Trend", value: "-12%", positive: true },
      ],
      recommendation:
        "Based on current metrics, proceed with measured expansion while monitoring key performance indicators",
    }

    return Response.json({ response })
  } catch (error) {
    console.error("Error in decision assist:", error)
    return Response.json({ error: "Failed to process decision request" }, { status: 500 })
  }
}
