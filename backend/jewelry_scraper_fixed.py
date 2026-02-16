"""
Async script to fetch jewelry making charges from brand websites,
analyze with Google Gemini, and store in MongoDB.
Windows-compatible version (no emoji)
"""

import asyncio
import httpx
import google.generativeai as genai
from pydantic import BaseModel, Field, ValidationError
from typing import Dict, Optional
from pymongo import MongoClient
import os
from datetime import datetime
import json
import sys
from dotenv import load_dotenv

load_dotenv()

# Set UTF-8 encoding for Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# Brand website sources
BRAND_WEBSITE_SOURCE = {
    "kalyan": "https://gullak.money/blog/kalyan-jewellers-making-charges/",
    "tanishq": "https://gullak.money/blog/tanishq-making-charges/",
    "Malabar": "https://gullak.money/blog/malabar-gold-making-charges/",
    "joylukkas": "https://gullak.money/blog/joyalukkas-making-charges/"
}

# Pydantic models for validation
class BrandData(BaseModel):
    """Model for brand data structure"""
    brand: str
    categories: Dict[str, str] = Field(description="Category to making charge range and verification link mapping")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    source_url: str 
    

def check_environment():
    """Check if all required environment variables are set"""
    print("Checking environment setup...\n")
    
    # Check Gemini API key
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("[ERROR] GEMINI_API_KEY environment variable not set!")
        print("\nTo fix this:")
        print("   Windows CMD: set GEMINI_API_KEY=your_api_key_here")
        print("   PowerShell: $env:GEMINI_API_KEY=\"your_api_key_here\"")
        print("   Linux/Mac: export GEMINI_API_KEY=your_api_key_here")
        print("\n   Get your API key from: https://aistudio.google.com/app/apikey")
        sys.exit(1)
    else:
        print(f"[OK] Gemini API key found")
    
    # Check MongoDB URI
    mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
    print(f"[OK] MongoDB URI: {mongo_uri}")
    
    print()

def configure_gemini():
    """Configure Google Gemini API"""
    api_key = os.getenv("GEMINI_API_KEY")
    genai.configure(api_key=api_key)

async def fetch_html(url: str, brand: str) -> tuple[str, str, str]:
    """
    Fetch HTML content from URL asynchronously
    
    Args:
        url: Website URL
        brand: Brand name
        
    Returns:
        Tuple of (brand, url, html_content)
    """
    async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
        try:
            print(f"  -> Fetching {brand}...")
            response = await client.get(url)
            response.raise_for_status()
            print(f"  [OK] Fetched HTML for {brand} ")
            return brand, url, response.text
        except httpx.HTTPError as e:
            print(f"  [ERROR] Error fetching {brand}: {e}")
            return brand, url, ""
        except Exception as e:
            print(f"  [ERROR] Unexpected error fetching {brand}: {e}")
            return brand, url, ""

async def analyze_with_gemini(brand: str, html_content: str, url: str) -> Optional[BrandData]:
    """
    Send HTML to Gemini for analysis using structured output
    
    Args:
        brand: Brand name
        html_content: HTML content to analyze
        url: Source URL
        
    Returns:
        BrandData object with extracted information or None
    """
    prompt = f"""You are an expert data analyst. Here is the HTML page for extracting the making charges of particular jewelry categories in a structured format.

{html_content}

Extract the making charges for different jewelry categories (e.g., gold rings, gold chains, diamond jewelry, etc.) and provide the range of making charges for each category.
also extract the verification link if available on the website for that particular category.

Output ONLY valid JSON in the following format (no other text):
{{
    "{brand}": {{
        "<category>": "<range of making charge>" :  "<Verification link if available>",
        "<category2>": "<range of making charge> :   "<Verification link if available>",
    }}
}}

Be precise and extract all available categories and their making charge ranges and their.Verification links if available. If no verification link is available for a category, set it to null."""

    try:
        print(f"  -> Analyzing {brand} with Gemini...")
        
        # Configure model with JSON response mode
        model = genai.GenerativeModel(
            model_name='gemini-2.5-flash',
            generation_config=
            {
                "response_mime_type": "application/json",
            }
        )
        
        response = model.generate_content(prompt)
        result_text = response.text
        
        # Parse the JSON responsex
        parsed_data = json.loads(result_text)
        
        # Extract categories for this brand - try multiple keys
        categories = parsed_data.get(brand, parsed_data.get(brand.lower(), {}))
        
        if not categories:
            # Try to find any dict value in the response
            for key, value in parsed_data.items():
                if isinstance(value, dict):
                    categories = value
                    break
        
        # Create and validate BrandData
        brand_data = BrandData(
            brand=brand,
            categories=categories,
            source_url=url
            
        )
        
        print(f"  [OK] Analyzed {brand} - found {len(categories)} categories")
        return brand_data
        
    except json.JSONDecodeError as e:
        print(f"  [ERROR] JSON decode error for {brand}: {e}")
        print(f"     Response was: {result_text[:200]}...")
        return None
    except ValidationError as e:
        print(f"  [ERROR] Validation error for {brand}: {e}")
        return None
    except Exception as e:
        print(f"  [ERROR] Gemini API error for {brand}: {type(e).__name__}: {e}")
        return None

def store_in_mongodb(data: BrandData, db_name: str = "jewelry_db", collection_name: str = "making_charges"):
    """
    Store validated data in MongoDB
    Inserts a new document only if data has changed, maintaining history
    
    Args:
        data: BrandData object to store
        db_name: Database name
        collection_name: Collection name
    """
    try:
        print(f"  -> Checking {data.brand} in MongoDB...")
        
        # Connect to MongoDB
        mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
        with MongoClient(mongo_uri, serverSelectionTimeoutMS=5000) as client:
            # Test connection
            client.server_info()
        
            db = client[db_name]
            collection = db[collection_name]
        
            # Get the latest document for this brand (sorted by timestamp descending)
            latest_doc = collection.find_one(
                {"brand": data.brand},
                sort=[("timestamp", -1)]
            )
            
            # Convert Pydantic model to dict
            document = data.model_dump()
            
            # Compare existing data with new data
            if latest_doc:
                # Compare only the categories (ignore timestamp and _id)
                existing_categories = latest_doc.get("categories", {})
                new_categories = document.get("categories", {})
                
                if existing_categories == new_categories:
                    print(f"  [INFO] No changes detected for {data.brand} - skipping insert")
                    return
                else:
                    print(f"  -> Data changed for {data.brand} - inserting new document...")
            else:
                print(f"  -> New brand {data.brand} - inserting first document...")
            
            # Insert new document (keeping history)
            result = collection.insert_one(document)
            print(f"  [OK] Inserted new document for {data.brand} (ID: {result.inserted_id})")
            
        
        
    except Exception as e:
        print(f"  [ERROR] MongoDB error for {data.brand}: {type(e).__name__}: {e}")
        print(f"     Make sure MongoDB is running on {mongo_uri}")

def fetch_data(db_name: str = "jewelry_db", collection_name: str = "making_charges") -> Dict[str, Dict]:
    """
    Fetch latest data for all brands from MongoDB
    Groups documents by brand and returns the latest entry for each
    
    Args:
        db_name: Database name
        collection_name: Collection name
        
    Returns:
        Dictionary mapping brand names to their latest data
    """
    try:
        # Connect to MongoDB
        mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
        with MongoClient(mongo_uri, serverSelectionTimeoutMS=5000) as client:
            client.server_info()
            
            db = client[db_name]
            collection = db[collection_name]
            
            # Get all unique brands
            brands = collection.distinct("brand")
            
            data = {}
            
            for brand in brands:
                # Get all documents for this brand, sorted by timestamp descending
                docs = list(collection.find(
                    {"brand": brand},
                    sort=[("timestamp", -1)]
                ))
                
                if docs:
                    # The first document (index 0) is the latest
                    data[brand] = docs
            
            return data
            
    except Exception as e:
        print(f"  [ERROR] MongoDB fetch error: {type(e).__name__}: {e}")
        return {}

async def process_brand(brand: str, url: str):

    """
    Process a single brand: fetch HTML, analyze, validate, and store
    
    Args:
        brand: Brand name
        url: Brand website URL
    """
    print(f"\n[Processing {brand}]")
    
    try:
        # Step 1: Fetch HTML
        _, source_url, html_content = await fetch_html(url, brand)
        
        if not html_content:
            print(f"  [WARN] Skipping {brand} - no HTML content")
            return
        
        # Step 2: Analyze with Gemini (with structured output)
        brand_data = await analyze_with_gemini(brand, html_content, source_url)
        
        if not brand_data:
            print(f"  [WARN] Skipping {brand} - analysis failed")
            return
        
        # Step 3: Store in MongoDB (already validated by Pydantic)
        if brand_data.categories:
            store_in_mongodb(brand_data)
        else:
            print(f"  [WARN] Skipping MongoDB insert for {brand} - no data extracted")
            
    except Exception as e:
        print(f"  [ERROR] Error processing {brand}: {type(e).__name__}: {e}")

async def main():
    """Main async function to orchestrate the entire process"""
    print("=" * 60)
    print("Starting Jewelry Making Charges Extraction")
    print("=" * 60)
    
    # Check environment
    check_environment()
    
    # Configure Gemini API
    try:
        configure_gemini()
        print("[OK] Gemini API configured\n")
    except Exception as e:
        print(f"[ERROR] Failed to configure Gemini API: {e}")
        sys.exit(1)
    
    # Create tasks for all brands
    tasks = [
        process_brand(brand, url) 
        for brand, url in BRAND_WEBSITE_SOURCE.items()
    ]
    
    # Run all tasks concurrently
    await asyncio.gather(*tasks, return_exceptions=True)
    
    print("\n" + "=" * 60)
    print("All brands processed!")
    print("=" * 60)

if __name__ == "__main__":
    try:
        # Run the async main function
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n\n[WARN] Interrupted by user")
        sys.exit(0)
    except Exception as e:
        print(f"\n\n[ERROR] Fatal error: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
