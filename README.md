This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Telegram notifications for contact forms

All submissions from the contact form are sent by a Telegram bot. Add these server-side variables locally in `.env.local` and in the environment settings of the deployed site:

```bash
TELEGRAM_BOT_TOKEN=123456:replace-with-token-from-botfather
TELEGRAM_CHAT_ID=-1001234567890
```

Create the bot through [@BotFather](https://t.me/BotFather), add it to the target chat (or start a private chat with it), then obtain the chat ID. Do not use the `NEXT_PUBLIC_` prefix: the bot token must never be exposed to the browser.

## Google Analytics 4

To enable Google Analytics, add the GA4 Measurement ID to `.env.local` and to the environment variables of the deployed site:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The identifier is public and starts with `G-`. The tag is omitted when this variable is unset. Existing interaction events (contact clicks, forms, and calculator actions) will then be sent to GA4 as well.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
