from langchain_openai import ChatOpenAI
from core.llms.langchain.multi_agents.agents.difficulty_evaluator_agent import (
    DifficultyEvaluatorAgent,
)
from core.llms.langchain.multi_agents.agents.parameter_extractor import (
    ParameterExtractorAgent,
)
from core.llms.langchain.multi_agents.agents.example_generator import (
    ExamplesGeneratorAgent,
)
from core.llms.langchain.multi_agents.agents.response import ResponseAgent
from core.llms.langchain.multi_agents.agents.word_generator import WordGeneratorAgent
from core.llms.langchain.config import OPEN_AI_CONFIG, OPEN_AI_LIGHT_CONFIG
from core.llms.langchain.multi_agents.memory.vocabulary_state import (
    VocabularyGeneratorState,
)
from langgraph.graph import StateGraph
from langgraph.graph import START, END
from IPython.display import Image, display


class VocabularyAgentTeam:
    def __init__(self):
        self.llm = ChatOpenAI(
            model=OPEN_AI_CONFIG["model"],
            temperature=OPEN_AI_CONFIG["temperature"],
            api_key=OPEN_AI_CONFIG["api_key"],
        )
        self.llm_light = ChatOpenAI(
            model=OPEN_AI_LIGHT_CONFIG["model"],
            temperature=OPEN_AI_LIGHT_CONFIG["temperature"],
            api_key=OPEN_AI_LIGHT_CONFIG["api_key"],
        )

    def init_vocabulary_team(self):
        # summarizer_agent = SummarizerAgent()
        data_extractor_agent = ParameterExtractorAgent(llm=self.llm_light)
        example_generator_agent = ExamplesGeneratorAgent(llm=self.llm)
        word_generator_agent = WordGeneratorAgent(llm=self.llm_light)
        difficulty_evaluator_agent = DifficultyEvaluatorAgent(llm=self.llm_light)
        response_agent = ResponseAgent(llm=self.llm)

        workflow = StateGraph(VocabularyGeneratorState)

        workflow.add_node("data_extractor_agent", data_extractor_agent.run)
        # workflow.add_node("summarizer", summarizer_agent.run)
        workflow.add_node("word_generator_agent", word_generator_agent.run)
        workflow.add_node("difficulty_evaluator_agent", difficulty_evaluator_agent.run)
        workflow.add_node("example_generator_agent", example_generator_agent.run)
        workflow.add_node("response_agent", response_agent.run)

        workflow.add_edge(START, "data_extractor_agent")
        workflow.add_conditional_edges(
            "data_extractor_agent",
            (
                lambda state: (
                    "accept"
                    if (
                        state["language"] is not None
                        and state["native_language"] is not None
                        and state["topics"] is not None
                    )
                    else "exit"
                )
            ),
            {"accept": "word_generator_agent", "exit": "response_agent"},
        )

        workflow.add_edge("word_generator_agent", "example_generator_agent")
        workflow.add_edge("word_generator_agent", "difficulty_evaluator_agent")
        workflow.add_edge("difficulty_evaluator_agent", "response_agent")
        workflow.add_edge("example_generator_agent", "response_agent")
        workflow.add_edge("response_agent", END)

        workflow.set_entry_point("data_extractor_agent")
        workflow.set_finish_point("response_agent")

        return workflow

    async def generate_vocabulary(self, input: VocabularyGeneratorState):
        vocabulary_team = self.init_vocabulary_team()
        chain = vocabulary_team.compile()

        response = await chain.ainvoke(input)
        return {
            "examples": response["examples"],
            "words": response["words"],
            "topics": response["topics"],
            "language": response["language"],
            "native_language": response["native_language"],
            "response": response["response"].content,
            "difficulty": response["difficulty"],
        }

    def paint_diagram(self):
        vocabulary_team = self.init_vocabulary_team()
        graph = vocabulary_team.compile()
        try:
            display(Image(graph.get_graph(xray=True).draw_mermaid_png()))
        except Exception:
            pass
