# [SentimentAI](sentiment-frontend-seven.vercel.app)

A React + Vite frontend featuring stock charts, market news, and an AI assistant to help you understand technical analysis.



## Features
- **Sentibot Chat Assistant** — Educates and provides technical insights using OHLC chart data
- **Headline Articles** — Provides overview on financial headlines
- **Stockpage Dashboard**
  - Stock price charts
  - Company profile
  - Recent stock related news

### Tech Stack

- React, TypeScript, Vite
- Custom CSS
- ApexCharts for chart rendering
- Deployed to Vercel

### Getting started

1. Clone the project

```bash
git clone https://github.com/Nevin-Chen/sentiment-frontend
cd sentiment-frontend
```

2. Install dependencies

```bash
npm install
```

- Create an .env file in the project root and add your [backend URL](https://github.com/Nevin-Chen/sentiment-backend) as the `VITE_API_URL` API key

or

- Have the backend running on http://localhost:8080


3. Run the app locally

```bash
npm run dev
```

### Roadmap

- Auth/Oauth
- Improve Charting feature
  - Integrate additional visual indicators and timeframes
  - Charting based on AI model feedback

### Author

**Nevin Chen**
[LinkedIn](https://linkedin.com/in/nevin-chen)
