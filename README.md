# [SentimentAI](https://sentiment-frontend-seven.vercel.app/)

A React + Vite frontend featuring stock charts, market news, and an AI assistant to help you understand technical analysis.

![Demo](https://res.cloudinary.com/dkdkftvsq/video/upload/v1762202106/CleanShot_2025-11-03_at_15.32.59_brtmxj.jpg)
[Demo](https://res.cloudinary.com/dkdkftvsq/video/upload/v1762202106/CleanShot_2025-11-03_at_15.32.59_brtmxj.mp4)

## Features

- **Chat Assistant** - Educates and provides technical insights using OHLC chart data
- **Headline Articles** - Provides overview on financial headlines
- **Stockpage Dashboard**:
  - Stock price charts - A customized Candlestick Chart, presenting OHLC data
  - Stock news - Provides the most recent news on a company
  - Company profile - Presents general company information

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

- Create an .env file in the project root following `.env.example`
- Add your [backend](https://github.com/Nevin-Chen/sentiment-backend) URL
 - Set it to either `VITE_API_URL`  
  *or*
 - Use the default http://localhost:8080 and have the backend running locally

#### Auth0

- Register for Auth0 and set the `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` key
- Reference the following [docs](https://auth0.com/docs/quickstart/spa/react)

## Technologies

- TypeScript
- React
- Vite
- Auth0
- Vercel
- ApexCharts

## Features Roadmap

- Improve Charting feature
  - Integrate additional visual indicators and timeframes
  - Charting based on AI model feedback

## Author

**Nevin Chen**  
- [LinkedIn](https://linkedin.com/in/nevin-chen)
