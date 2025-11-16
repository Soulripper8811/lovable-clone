import { openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandBoxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("lovable-nextjs-template");
      return sandbox.sandboxId;
    });
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert nextjs developer. You write readable,maintainable and scalable code. You write simple Next,js & React snippets.",
      model: openai({
        model: "openai/gpt-oss-20b:free",
        baseUrl: "https://openrouter.ai/api/v1",
      }),
    });
    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`
    );
    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandBoxId);
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    });
    return { output, sandboxUrl };
  }
);
