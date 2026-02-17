# Dino Game Server

A Socket.IO server that relays shake events from a phone controller to a desktop browser running the Dino game.

## How It Works

1. The desktop browser opens the game and creates a session.
2. A phone joins the same session by scanning a QR code or entering the session ID.
3. Shaking the phone sends a `shake` event through this server, which relays it to the desktop to make the dino jump.

## Tech Stack

- Node.js
- Socket.IO

## Getting Started

```bash
npm install
npm start
```

The server runs on port `8080` by default (configurable via the `PORT` environment variable).

## Live Demo

https://dino-game-frontend.vercel.app
