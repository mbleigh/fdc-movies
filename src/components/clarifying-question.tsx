"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

interface ClarifyingQuestionProps {
  question: Question;
  answer: string;
  onAnswer: (answer: string) => void;
}

export function ClarifyingQuestion({ question, answer, onAnswer }: ClarifyingQuestionProps) {
  const [freeformInput, setFreeformInput] = useState("");
  
  const handleFreeformSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (freeformInput.trim()) {
      onAnswer(freeformInput);
      setFreeformInput("");
    }
  };
  
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{question.question}</CardTitle>
        {answer && (
          <CardDescription>
            Your answer: <span className="font-medium">{answer}</span>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {question.type === "multiple-choice" && !answer && (
          <div className="flex flex-wrap gap-2">
            {question.options.map((option, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`px-4 py-2 cursor-pointer hover:bg-accent transition-colors`}
                onClick={() => onAnswer(option)}
              >
                {option}
              </Badge>
            ))}
          </div>
        )}
        
        {question.type === "freeform" && !answer && (
          <form onSubmit={handleFreeformSubmit} className="space-y-2">
            <Input
              placeholder="Type your answer..."
              value={freeformInput}
              onChange={(e) => setFreeformInput(e.target.value)}
            />
            <Button 
              type="submit" 
              size="sm"
              disabled={!freeformInput.trim()}
            >
              Submit
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}