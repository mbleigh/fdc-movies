"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MovieRecommendation } from "@/components/movie-recommendation";
import { ClarifyingQuestion } from "@/components/clarifying-question";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Dummy data
const SUGGESTED_IDEAS = [
  "Something scary",
  "Family friendly",
  "Sci-fi classic",
  "New releases",
  "90s comedy",
];

const DUMMY_RECOMMENDATIONS = [
  {
    id: 1,
    title: "The Matrix",
    year: 1999,
    description: "A computer hacker learns about the true nature of reality.",
    image: "https://picsum.photos/seed/matrix/300/300",
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    description: "A thief who enters people's dreams to steal their secrets.",
    image: "https://picsum.photos/seed/inception/300/300",
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    description: "Explorers travel through a wormhole in space in an attempt to save humanity.",
    image: "https://picsum.photos/seed/interstellar/300/300",
  },
  {
    id: 4,
    title: "The Dark Knight",
    year: 2008,
    description: "Batman faces off against the Joker in a battle for Gotham City.",
    image: "https://picsum.photos/seed/darkknight/300/300",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    year: 1994,
    description: "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine.",
    image: "https://picsum.photos/seed/pulpfiction/300/300",
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    year: 1994,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption.",
    image: "https://picsum.photos/seed/shawshank/300/300",
  },
];

// Import types from clarifying-question
interface QuestionBase {
  id: number;
  question: string;
  type: string;
}

interface MultipleChoiceQuestion extends QuestionBase {
  type: "multiple-choice";
  options: string[];
}

interface FreeformQuestion extends QuestionBase {
  type: "freeform";
}

type Question = MultipleChoiceQuestion | FreeformQuestion;

const CLARIFYING_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What mood are you in today?",
    type: "multiple-choice",
    options: ["Happy", "Thoughtful", "Excited", "Relaxed"],
  },
  {
    id: 2,
    question: "Do you prefer newer movies or classics?",
    type: "multiple-choice",
    options: ["New releases only", "Last 10 years", "Classics only", "No preference"],
  },
  {
    id: 3,
    question: "Any actors or directors you particularly enjoy?",
    type: "freeform",
  },
];

type Stage = "input" | "recommendations" | "clarifying";

export function MovieRecommender() {
  const [stage, setStage] = useState<Stage>("input");
  const [prompt, setPrompt] = useState("");
  const [recommendations, setRecommendations] = useState(DUMMY_RECOMMENDATIONS);
  const [clarifyingQuestions, setClarifyingQuestions] = useState(CLARIFYING_QUESTIONS);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Transition configurations for Framer Motion
  const transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 1,
  };

  // Animation variants for stages
  const stageVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
      transition,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition,
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: { ...transition, duration: 0.2 },
    },
  };

  // Staggered item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: custom * 0.05, // Stagger based on item index
        duration: 0.3,
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    }),
  };

  // Simple stage transition function
  const transitionToStage = (newStage: Stage) => {
    setStage(newStage);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    // Randomly decide whether to show recommendations or clarifying questions
    // In a real implementation, this would be based on AI response
    const showRecommendations = Math.random() > 0.5;

    if (showRecommendations) {
      transitionToStage("recommendations");
    } else {
      transitionToStage("clarifying");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    // Simulate processing
    setTimeout(() => {
      transitionToStage("recommendations");
    }, 300);
  };

  const handleQuestionAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    // If all questions are answered, show recommendations
    if (Object.keys(answers).length === clarifyingQuestions.length - 1) {
      setTimeout(() => {
        transitionToStage("recommendations");
      }, 500);
    }
  };

  const handleRefinement = (refinementText: string) => {
    // In a real app, this would send the refinement to the AI
    // For now, just shuffle the recommendations
    setRecommendations([...recommendations].sort(() => Math.random() - 0.5));
  };

  const resetFlow = () => {
    transitionToStage("input");
    setPrompt("");
    setAnswers({});
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-3xl mx-auto w-full relative">
        <AnimatePresence mode="wait">
          {stage === "input" && (
            <motion.div
              key="input-stage"
              className="space-y-6"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={stageVariants}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="What do you want to watch tonight?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="text-lg py-6 px-6 rounded-full shadow-md"
                />
                <Button type="submit" className="w-full rounded-full" disabled={!prompt.trim()}>
                  Find Movies
                </Button>
              </form>

              <motion.div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTED_IDEAS.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index} // Used for staggered animations
                  >
                    <Badge
                      variant="outline"
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {stage === "clarifying" && (
            <motion.div
              key="clarifying-stage"
              className="space-y-8"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={stageVariants}
            >
              <Button variant="ghost" className="mb-4" onClick={resetFlow}>
                ← Start over
              </Button>

              <h2 className="text-xl font-semibold mb-6">Let's find the perfect movie for you</h2>

              <div className="space-y-6">
                {clarifyingQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index} // Used for staggered animations
                  >
                    <ClarifyingQuestion
                      question={question}
                      answer={answers[question.id] || ""}
                      onAnswer={(answer) => handleQuestionAnswer(question.id, answer)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {stage === "recommendations" && (
            <motion.div
              key="recommendations-stage"
              className="space-y-8"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={stageVariants}
            >
              <Button variant="ghost" className="mb-4" onClick={resetFlow}>
                ← Start over
              </Button>

              <h2 className="text-xl font-semibold">Here are some movies you might enjoy:</h2>

              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-[640px] mx-auto"
              >
                <CarouselContent>
                  {recommendations.slice(0, 2).map((movie, index) => (
                    <CarouselItem key={movie.id} className="md:basis-1/3 sm:basis-1/2 basis-full">
                      <motion.div
                        className="flex justify-center"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index} // Used for staggered animations
                      >
                        <MovieRecommendation movie={movie} />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="mr-2" />
                  <CarouselNext className="" />
                </div>
              </Carousel>

              <Card className="p-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Want something different?</h3>
                <Input
                  placeholder="Tell us more about what you're looking for..."
                  className="mb-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRefinement((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
                <p className="text-sm text-muted-foreground">
                  Press Enter to refine your recommendations
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Height transition div */}
        <motion.div
          animate={{
            height: stage === "input" ? 240 : 550,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>
    </div>
  );
}
