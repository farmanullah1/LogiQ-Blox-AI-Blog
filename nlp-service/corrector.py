import language_tool_python
from spellchecker import SpellChecker

class NLPProcessor:
    def __init__(self):
        # Initialize LanguageTool (this takes time, so we do it once)
        print("Initializing LanguageTool...")
        self.tool = language_tool_python.LanguageTool('en-US')
        self.spell = SpellChecker()

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
                
            original = text[match.offset : match.offset + match.errorLength]
            replacement = match.replacements[0]
            
            start_in_corrected = match.offset + offset_shift
            end_in_corrected = start_in_corrected + len(replacement)
            
            # Apply correction to the string
            corrected_text = corrected_text[:start_in_corrected] + replacement + corrected_text[end_in_corrected - len(replacement) + match.errorLength:]
            
            changes.append({
                "original": original,
                "corrected": replacement,
                "start_index": start_in_corrected,
                "end_index": end_in_corrected,
                "explanation": match.message
            })
            
            # Update the shift for subsequent matches
            offset_shift += len(replacement) - match.errorLength

        return {
            "original": text,
            "corrected": corrected_text,
            "changes": changes,
            "correction_count": len(changes)
        }

# Singleton instance
processor = NLPProcessor()
