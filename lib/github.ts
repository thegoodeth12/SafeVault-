import { Octokit } from '@octokit/rest';

export function getGitHubClient(token: string) {
  return new Octokit({ auth:bf57373b0a7182b6829c379f5c03c91b485dd56e });
}

export async function commentOnIssue(octokit: Octokit, owner: string, repo: string, issue_number: number, message: string) {
  await octokit.issues.createComment({ owner, repo, issue_number, body: message });
}
