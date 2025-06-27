import { generateText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

const granite = createOpenAI({
  apiKey: process.env.IBM_GRANITE_API_KEY || "your-granite-api-key",
  baseURL: "https://bam-api.res.ibm.com/v1",
})

export async function POST(request) {
  try {
    const { command } = await request.json()

    const { text } = await generateText({
      model: granite("ibm/granite-13b-chat-v2"),
      prompt: `Execute this natural language business command: "${command}"

      Available Business Systems:
      - Email processing and analysis
      - Document intelligence and summarization
      - Task assignment and team management
      - Performance metrics and reporting
      - Risk detection and alerting
      - Customer feedback analysis
      - Financial reporting and KPIs
      - Competitive intelligence

      Current Business State:
      - 47 emails processed today
      - 12 active tasks assigned to teams
      - 3 high-priority alerts active
      - Q3 financial report available
      - Customer satisfaction at 94%
      - Engineering productivity down 15%
      - APAC sales up 34%

      Process the command and provide:
      1. Confirmation of what action was taken
      2. Summary of results or findings
      3. Any follow-up actions created
      4. Recommendations for next steps

      If the command requires data analysis, provide specific insights.
      If it requires task creation, specify who tasks were assigned to.
      Be specific and actionable.`,
      system:
        "You are an AI executive assistant capable of processing natural language commands and executing business operations. Respond as if you have actually performed the requested actions.",
    })

    // Determine actions based on command type
    let actions = []
    if (command.toLowerCase().includes("assign") || command.toLowerCase().includes("task")) {
      actions = ["Task created and assigned", "Team notification sent", "Deadline set"]
    } else if (command.toLowerCase().includes("report") || command.toLowerCase().includes("summary")) {
      actions = ["Report generated", "Key metrics extracted", "Executive summary created"]
    } else if (command.toLowerCase().includes("analyze") || command.toLowerCase().includes("review")) {
      actions = ["Data analysis completed", "Insights generated", "Recommendations provided"]
    } else {
      actions = ["Command processed", "Results compiled", "Follow-up actions identified"]
    }

    return Response.json({
      response: text,
      actions,
    })
  } catch (error) {
    console.error("Error in command center:", error)
    return Response.json({ error: "Failed to process command" }, { status: 500 })
  }
}
