import language_tool_python
from spellchecker import SpellChecker
from textblob import TextBlob
import re

class NLPProcessor:
    def __init__(self):
        # Initialize LanguageTool (this takes time, so we do it once)
        print("Initializing LanguageTool...")
        self.tool = language_tool_python.LanguageTool('en-US')
        self.spell = SpellChecker()

    def _detect_tone(self, text):
        professional_keywords = ['regards', 'sincerely', 'consequently', 'furthermore', 'however', 'moreover', 'attached', 'please find']
        casual_keywords = ['hey', 'hi', 'thanks', 'btw', 'lol', 'awesome', 'cool', 'stuff', 'gotta']
        
        text_lower = text.lower()
        prof_count = sum(1 for word in professional_keywords if word in text_lower)
        cas_count = sum(1 for word in casual_keywords if word in text_lower)
        
        if prof_count > cas_count: return "Professional"
        if cas_count > prof_count: return "Casual"
        return "Neutral"

    def paraphrase(self, text, style):
        """
        Mock paraphrasing logic. 
        In a production environment, this would hit a GPT-like model.
        For now, we simulate transformations based on style.
        """
        if style == "professional":
            # Add common professional filler/intro if short, or just return as is
            return f"It is recommended that {text.lower()}" if not text.lower().startswith('it') else text
        elif style == "creative":
            # Simulate a creative spin
            return f"Imagine a world where {text.lower()}"
        elif style == "simple":
            # Just return original but stripped of some punctuation
            return text.replace(',', '').replace(';', '.')
        return text

    def correct_text(self, text):
        matches = self.tool.check(text)
        
        # Sort matches by offset to calculate shifts correctly
        sorted_matches = sorted(matches, key=lambda x: x.offset)
        
        changes = []
        corrected_text = text
        offset_shift = 0
        
        for match in sorted_matches:
            if not match.replacements:
                continue
                
            original = text[match.offset : match.offset + match.error_length]
            replacement = match.replacements[0]
            
            start_in_corrected = match.offset + offset_shift
            end_in_corrected = start_in_corrected + len(replacement)
            
            # Apply correction to the string
            corrected_text = corrected_text[:start_in_corrected] + replacement + corrected_text[start_in_corrected + match.error_length:]
            
            changes.append({
                "original": original,
                "corrected": replacement,
                "start_index": start_in_corrected,
                "end_index": end_in_corrected,
                "explanation": match.message,
                "category": match.category
            })
            
            # Update the shift for subsequent matches
            offset_shift += len(replacement) - match.error_length

        # Extra Insights
        blob = TextBlob(text)
        word_count = len(blob.words)
        reading_time = max(1, round(word_count / 200 * 60)) # Seconds
        sentiment = "Positive" if blob.sentiment.polarity > 0.1 else "Negative" if blob.sentiment.polarity < -0.1 else "Neutral"

        return {
            "original": text,
            "corrected": corrected_text,
            "changes": changes,
            "correction_count": len(changes),
            "insights": {
                "tone": self._detect_tone(text),
                "sentiment": sentiment,
                "word_count": word_count,
                "reading_time_sec": reading_time
            }
        }

# Singleton instance
processor = NLPProcessor()
