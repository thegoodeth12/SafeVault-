import { Probot } from 'probot';
import { parseSafeCommand } from './parseCommand';
import { proposeSafeTx } from '../safe/proposeTx';

export const App = (app: Probot) => {
  app.on('issue_comment.created', async (context) => {
    const body = context.payload.comment.body;

    if (!body.startsWith('/safe')) return;

    const tx = parseSafeCommand(body);
    if (!tx) {
      await context.octokit.issues.createComment(context.issue({
        body: '❌ Invalid Safe command. Use `/safe send [amount] ETH to [address]`',
      }));
      return;
    }

    await proposeSafeTx(tx);

    await context.octokit.issues.createComment(context.issue({
      body: `✅ Proposed transaction to send ${tx.value} wei to ${tx.to}`,
    }));
  });
};
