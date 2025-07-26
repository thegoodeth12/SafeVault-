export const summarizeContent = inngest.createFunction(
  { name: 'Summarize content via GPT-4', id: 'summarize-content' },
  { event: 'ai/summarize.content' },
  async ({ event, step, attempt }) => {
    const results = await step.run('query-vectordb', async () => {
      return {
        matches: [
          {
            id: 'vec3',
            score: 0,
            values: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
            text: casual.sentences(3),
          },
          {
            id: 'vec4',
            score: 0.0799999237,
            values: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
            text: casual.sentences(3),
          },
          {
            id: 'vec2',
            score: 0.0800000429,
            values: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
            text: casual.sentences(3),
          },
        ],
        namespace: 'ns1',
        usage: { readUnits: 6 },
      };
    });

    const transcript = await step.run('read-s3-file', async () => {
      return casual.sentences(10);
    });

    // We can globally share throttle limited functions like this using invoke
    const completion = await step.invoke('generate-summary-via-gpt-4', {
      function: chatCompletion,
      data: {
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant that summaries content for product launches.',
          },
          {
            role: 'user',
            content: `Question: Summarize my content: \n${transcript}. \nInformation: ${results.matches
              .map((m) => m.text)
              .join('. ')}`,
          },
        ],
      },
    });
    // You might use the response like this:
    const summary = completion.choices[0].message.content;

    await step.run('save-to-db', async () => {
      return casual.uuid;
    });

    await step.run('websocket-push-to-client', async () => {
      return casual.uuid;
    });
    return { success: true, summaryId: casual.uuid };
  }
);
