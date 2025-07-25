your-app/
├── github/
│   ├── githubApp.ts        ← GitHub app handler
│   └── parseCommand.ts     ← Parses "/safe send" etc.
├── safe/
│   └── proposeTx.ts        ← Builds and submits Safe proposals
├── pages/
│   └── api/
│       └── github/
│           └── webhook.ts  ← GitHub webhook endpoint (Next.js API route)
├── .env.local              ← Secrets
└── package.json
