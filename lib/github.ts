// lib/github.ts
import { Octokit } from 'octokit'

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function getPullRequestComment(prNumber: number, repo: string, owner: string) {
  const { data } = await octokit.rest.issues.listComments({
    owner,
    repo,
    issue_number: prNumber
  })

  return data.map(comment => comment.body).join('\n')
}
