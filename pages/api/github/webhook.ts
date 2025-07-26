import type { NextApiRequest, NextApiResponse } from 'next';
import { createNodeMiddleware, createProbot } from 'probot';
import { App } from '../../../../../github/githubApp';

const probot = createProbot({
  overrides: {
    // Supply environment secrets
    env: process.env,
  },
});

const middleware = createNodeMiddleware(App, { probot });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  return middleware(req, res);
}
