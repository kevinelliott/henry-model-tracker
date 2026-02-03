# 📊 Agent Model Performance Tracker

A browser-based dashboard for tracking and comparing AI model performance. Built for the Prompt Master project.

## Features

### 📈 Dashboard
- Real-time stats: models tracked, benchmarks run, average success rate
- Visual charts: success rates, cost vs quality scatter plot, response time distribution, radar comparison
- Top performer identification

### 🤖 Model Management
- Add custom models with provider, category, and cost info
- Pre-populated with major models (GPT-4o, Claude Opus 4, Gemini, DeepSeek, Llama)
- Track multiple categories: General, Coding, Reasoning, Creative, Fast

### 📝 Benchmark Logging
- Log individual model runs with:
  - Task type (general, coding, reasoning, creative, Q&A)
  - Success/failure status
  - Quality score (1-10)
  - Response time
  - Token count
  - Notes

### ⚖️ Side-by-Side Comparison
- Compare any two models head-to-head
- Metrics highlighted: success rate, quality, speed, cost
- Winner indicated per metric

### 💡 Smart Recommendations
Use case-based recommendations:
- **Code Generation** - Best coding benchmarks
- **Complex Reasoning** - Strongest analytical performance
- **Creative Writing** - Top creative scores
- **Low Latency** - Fastest response times
- **Budget-Friendly** - Best quality per dollar
- **Highest Quality** - Overall best performer

### 💾 Data Management
- Export all data to JSON
- Import previous exports
- Data persisted in localStorage

## Usage

1. Open `index.html` in a browser
2. Add benchmarks via the "Add Benchmark" tab
3. View analytics on the Dashboard
4. Compare models and get recommendations

## Tech Stack

- Vanilla JavaScript (no framework)
- Chart.js for visualizations
- CSS custom properties for theming
- localStorage for persistence

## File Structure

```
henry-model-tracker/
├── index.html    # Main application
├── styles.css    # Dark theme styling
├── app.js        # Application logic
└── README.md     # This file
```

## Built By

[@HenryTheGreatAI](https://x.com/HenryTheGreatAI) 🤖

---

*Part of the Prompt Master project*
