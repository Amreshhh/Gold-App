# Jewelry Making Charges Scraper

Async Python script to fetch jewelry making charges from brand websites, analyze with Google Gemini, and store in MongoDB.

## Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Set environment variables:**
```bash
# Google Gemini API Key (required)
export GEMINI_API_KEY="your_gemini_api_key_here"

# MongoDB URI (optional - defaults to localhost)
export MONGODB_URI="mongodb://localhost:27017/"
```

## How to Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Usage

Run the script:
```bash
python jewelry_scraper.py
```

## What it does

1. **Fetches HTML** asynchronously from 4 jewelry brand websites using `httpx`
2. **Analyzes content** using Google Gemini SDK with structured JSON output
3. **Validates data** using Pydantic models
4. **Stores in MongoDB** with upsert functionality

## Output Format

Data stored in MongoDB follows this structure:
```json
{
    "brand": "kalyan",
    "categories": {
        "Gold Rings": "₹300-500 per gram",
        "Gold Chains": "₹200-400 per gram",
        ...
    },
    "timestamp": "2024-02-10T12:00:00Z",
    "source_url": "https://..."
}
```

## Database

- **Database:** `jewelry_db`
- **Collection:** `making_charges`
- Updates existing records or inserts new ones based on brand name

## Features

✅ Async/await patterns for concurrent fetching  
✅ Structured output from Gemini API  
✅ Pydantic validation  
✅ MongoDB storage with upsert  
✅ Error handling for each step  
✅ Progress logging
