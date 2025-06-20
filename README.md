# Insight Docs

Transform how you interact with your documents. Ask questions, get instant answers, and discover insights from your docs with our intelligent chat interface.

## Author

- lwshakib

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/lwshakib/insight-docs.git
cd insight-docs
```

### 2. Set Up the Web Client

```bash
cd web
# Copy the example environment variables file
cp .env.example .env
# Edit .env as needed (refer to .env.example for required values)

# Install dependencies
npm install

# Start the development server
yarn dev
```

### 3. Clerk Webhooks (Authentication)

For Clerk webhooks, we use [ngrok](https://ngrok.com/):

- Start an ngrok tunnel to your local server (e.g., `ngrok http 3000`).
- Go to the ngrok dashboard to get your public URL.
- Add this URL to your Clerk dashboard as a webhook endpoint (see Clerk documentation for details).

### 4. Set Up the Server

```bash
cd ../server
# Start services with Docker Compose
docker compose up -d

# Install server dependencies
npm install

# Start the server
yarn dev
```

---

## Additional Notes

- Make sure you have [Node.js](https://nodejs.org/) and [Docker](https://www.docker.com/) installed.
- For more details, refer to the documentation in each subfolder or contact the author.
