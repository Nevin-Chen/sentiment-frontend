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

### Tech Stack

- React, TypeScript, Vite, CSS, ApexCharts, and Vercel

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
- Create an .env file in the project root and add your [backend](https://github.com/Nevin-Chen/sentiment-backend) URL as the `VITE_API_URL` API key.  
*or*
- Have the backend running on http://localhost:8080.

3. Run the app locally

```bash
npm run dev
```

## Roadmap

- Auth/Oauth
- Improve Charting feature
  - Integrate additional visual indicators and timeframes
  - Charting based on AI model feedback

## Author

**Nevin Chen**  
- [LinkedIn](https://linkedin.com/in/nevin-chen)
