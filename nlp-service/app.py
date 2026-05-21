from flask import Flask, request, jsonify
from flask_cors import CORS
from corrector import processor
import time

app = Flask(__name__)
CORS(app)

# Basic in-memory cache
cache = {}

@app.route('/nlp/correct', methods=['POST'])
def correct():
    data = request.json
    text = data.get('text', '')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # Check cache
    if text in cache:
        cached_entry = cache[text]
        if time.time() - cached_entry['timestamp'] < 60:
            return jsonify(cached_entry['result'])

    try:
        result = processor.correct_text(text)
        
        # Update cache
        cache[text] = {
            'result': result,
            'timestamp': time.time()
        }
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/nlp/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "engine": "language_tool_python"
    })

if __name__ == '__main__':
    app.run(port=8000)
