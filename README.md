# [SentimentAI](https://sentiment-frontend-seven.vercel.app/)

A React + Vite frontend for Sentiment AI. See the [main repository](https://github.com/Nevin-Chen/sentiment-backend)

## Getting started

1. Clone the project

```bash
git clone https://github.com/Nevin-Chen/sentiment-frontend
cd sentiment-frontend
```

2. Install dependencies

```bash
npm install
```

3. Run the app locally

```bash
npm run dev
```

## Setting up the environment

- Create a .env file in the project root following `.env.example`
- Add your [backend](https://github.com/Nevin-Chen/sentiment-backend) URL
- Set it to either `VITE_API_URL`  
  _or_
- Use the default http://localhost:8080 and have the backend running locally

#### Auth0

- Register for Auth0 and set the `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` key
- Reference the following [docs](https://auth0.com/docs/quickstart/spa/react)

## Technologies

- React + Vite
- TypeScript
- Auth0-React
- CSS

**Author:** [Nevin Chen](https://linkedin.com/in/nevin-chen) | [Portfolio](https://nevinchen.dev)
