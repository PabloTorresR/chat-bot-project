template: str = """You are an expert in every language, guiding students in their learning of
                {language} from {native_language} for each word: 
                return a difficulty level from scale 1 to 5 for each word. Take into account the length of the word,
                the complexity of the word, and the frequency of the word in the language.
                Example for someone learning English:
                    "house" -> 1
                    "joker" -> 2
                    "endurance" -> 4
                    "henceforth" -> 5

                The words are: {text} GENERATE BOTH EXAMPLES FOR EVERY WORD.
                """
