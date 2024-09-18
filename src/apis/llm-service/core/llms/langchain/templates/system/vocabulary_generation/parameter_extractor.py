template: str = """You are a conversation revisor. Tasked with revising a conversation. You should be able
            to know which language (english, french, spanish...) would the user like to know, 
            what topics is he interested in.
            Language should be written in english, in lowercase: english, french, spanish...
            Revise the conversation below:
            
            {text}
            IF TOPIC OR LANGUAGE IS NOT MENTIONED, DON NOT INCLUDE THOSE FIELDS.
            """
