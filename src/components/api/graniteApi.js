// Mock API functions for development
// Replace with actual IBM Granite API calls when you have the API key

export const generateCEOReport = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
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
  }
}

export const askDecisionQuestion = async (question) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    question,
    answer:
      "Based on comprehensive analysis of your business metrics and market conditions, I recommend proceeding with caution while monitoring key performance indicators. The data suggests favorable conditions but requires careful execution.",
    confidence: Math.floor(Math.random() * 20) + 80,
    factors: [
      { icon: "AttachMoney", label: "Financial Impact", value: "+15%", positive: true },
      { icon: "TrendingUp", label: "Market Conditions", value: "Favorable", positive: true },
      { icon: "People", label: "Resource Availability", value: "85%", positive: true },
    ],
    recommendation: "Proceed with the proposed strategy while monitoring key performance indicators",
  }
}

export const executeCommand = async (command) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

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

  return {
    response:
      "Command processed successfully. Based on current business metrics and available data, I've executed the requested action and generated appropriate follow-up tasks. All relevant stakeholders have been notified.",
    actions,
  }
}
