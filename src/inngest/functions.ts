import { openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert nextjs developer. You write readable,maintainable and scalable code. You write simple Next,js & React snippets.",
      model: openai({
        model: "openai/gpt-oss-20b:free",
        baseUrl: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
      }),
    });
    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`
    );
    return { output };
  }
);
