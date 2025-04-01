"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MovieRecommendationsDisplay } from "@/components/movie-recommendations-display";
import { ClarifyingQuestion } from "@/components/clarifying-question";
import { HomePageData } from "@app/data";
import MoviePoster from "./movie-poster";
import type { MessageData } from "genkit";
import { runFlow } from "genkit/beta/client";
import { auth } from "@/lib/firebase";
import { Fireworks } from "@fireworks-js/react";

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

// Define suggested ideas for the input stage
const SUGGESTED_IDEAS = [
	"Something scary",
	"Family friendly",
	"Sci-fi classic",
	"New releases",
	"90s comedy",
];

// Update Stage type to include loading and selected states
type Stage =
	| "input"
	| "recommendations"
	| "clarifying"
	| "loading"
	| "selected";

// Loading state component with animated sayings
function LoadingState() {
	// Array of funny loading quotes
	const loadingSayings = [
		"Rubbing elbows with celebrities",
		"Watching movies on 23 screens at once",
		"Arguing with film critics",
		"Digging through the archives",
		"Popping fresh popcorn",
		"Interviewing fictional characters",
		"Bribing the Academy for insider info",
		"Scanning through director's cuts",
		"Rewinding VHS tapes",
		"Calculating the perfect movie-to-snack ratio",
		"Consulting with retired stunt doubles",
		"Decoding secret movie Easter eggs",
		"Analyzing plot twists and character arcs",
		"Checking if that one actor is in this movie",
		"Debating whether the book was better",
		"Counting Wilhelm screams",
		"Measuring the scientific accuracy of sci-fi films",
		"Calculating the probability of surviving horror scenarios",
		"Determining the exact shade of lightsaber blue",
		"Translating alien languages",
		"Checking if dogs survive in these movies",
		"Measuring the physics of impossible action scenes",
		"Counting the number of explosions per minute",
		"Analyzing the historical accuracy of period pieces",
		"Calculating how many cups of coffee were consumed on set",
	];

	// Randomize the order of sayings on component mount
	const [randomizedSayings, setRandomizedSayings] = useState<string[]>([]);
	const [currentSayingIndex, setCurrentSayingIndex] = useState(0);

	// Randomize sayings on mount
	useEffect(() => {
		// Fisher-Yates shuffle algorithm
		const shuffleArray = (array: string[]) => {
			const newArray = [...array];
			for (let i = newArray.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
			}
			return newArray;
		};

		setRandomizedSayings(shuffleArray(loadingSayings));
	}, []);

	// Use useEffect to cycle through sayings
	useEffect(() => {
		if (randomizedSayings.length === 0) return;

		const interval = setInterval(() => {
			setCurrentSayingIndex((prev) => (prev + 1) % randomizedSayings.length);
		}, 3000); // Change every 3 seconds

		return () => clearInterval(interval);
	}, [randomizedSayings]);

	return (
		<div className="flex flex-col items-center justify-center space-y-6">
			<div className="relative w-16 h-16">
				{/* Loading spinner animation */}
				<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
			</div>

			{/* AnimatePresence for the saying transitions */}
			<AnimatePresence mode="wait">
				<motion.p
					key={currentSayingIndex}
					initial={{ opacity: 0, x: 50 }} // Start from right
					animate={{ opacity: 1, x: 0 }} // Fade in and slide to position
					exit={{ opacity: 0, x: -50 }} // Exit to left
					transition={{
						type: "spring",
						stiffness: 300,
						damping: 30,
						mass: 1,
					}}
					className="text-lg font-medium text-center min-h-[28px]"
				>
					{randomizedSayings[currentSayingIndex] || "Loading..."}
				</motion.p>
			</AnimatePresence>
		</div>
	);
}

export function MovieRecommender({
	recentMovies,
}: { recentMovies?: HomePageData["newReleases"] }) {
	const [prompt, setPrompt] = useState("");
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [messages, setMessages] = useState<MessageData[]>([]);
	const [selectedMovie, setSelectedMovie] = useState<{
		movie: any;
		reason?: string;
	} | null>(null);

	// Helper function to determine the current stage based on messages and selected movie
	function determineStage(messages: MessageData[]): Stage {
		// If a movie is selected, show the selected stage
		if (selectedMovie) return "selected";

		if (messages.length === 0) return "input";

		const lastMessage = messages[messages.length - 1];

		// If last message is from user or tool, show loading state
		if (["user", "tool"].includes(lastMessage.role)) return "loading";

		// Check for toolRequest in the content array
		for (const contentItem of lastMessage.content) {
			if ("toolRequest" in contentItem && contentItem.toolRequest) {
				if (contentItem.toolRequest.name === "recommendMovies")
					return "recommendations";
				if (contentItem.toolRequest.name === "askQuestion") return "clarifying";
			}
		}

		// Default fallback
		return "input";
	}

	// Handle selecting a movie
	const handleSelectMovie = (movie: any, reason?: string) => {
		setSelectedMovie({ movie, reason });
	};

	// Extract recommendations from messages
	function extractRecommendations(messages: MessageData[]) {
		// Look for toolResponse with name "recommendMovies"
		for (let i = messages.length - 1; i >= 0; i--) {
			const message = messages[i];
			for (const contentItem of message.content) {
				if (
					"toolResponse" in contentItem &&
					contentItem.toolResponse &&
					contentItem.toolResponse.name === "recommendMovies"
				) {
					return contentItem.toolResponse.output as any[];
				}
			}
		}
		return [];
	}

	// Extract questions from messages
	function extractQuestions(messages: MessageData[]): Question[] {
		// Look for the most recent message with a toolRequest for askQuestion
		for (let i = messages.length - 1; i >= 0; i--) {
			const message = messages[i];
			for (const contentItem of message.content) {
				// Check for toolRequest with name "askQuestion"
				if (
					"toolRequest" in contentItem &&
					contentItem.toolRequest &&
					contentItem.toolRequest.name === "askQuestion"
				) {
					const input = contentItem.toolRequest.input as {
						type: string;
						question: string;
						choices?: string[];
					};

					// Convert the toolRequest input to our Question format
					if (input.type === "MULTIPLE_CHOICE") {
						return [
							{
								id: Date.now(), // Generate a unique ID
								question: input.question,
								type: "multiple-choice",
								options: input.choices || [],
							} as MultipleChoiceQuestion,
						];
					} else {
						return [
							{
								id: Date.now(), // Generate a unique ID
								question: input.question,
								type: "freeform",
							} as FreeformQuestion,
						];
					}
				}

				// Also check for toolResponse with name "askQuestion" (for backward compatibility)
				if (
					"toolResponse" in contentItem &&
					contentItem.toolResponse &&
					contentItem.toolResponse.name === "askQuestion"
				) {
					return contentItem.toolResponse.output as Question[];
				}
			}
		}
		return [];
	}

	// Consolidated function to send messages to the recommender API
	async function sendMessages(newMessages: MessageData[]) {
		try {
			// Get auth token
			const token = await auth.currentUser?.getIdToken();

			// Call the agent
			const response = await runFlow({
				url: "/api/recommender",
				input: { messages: newMessages },
				headers: token
					? {
							authorization: `Bearer ${token}`,
						}
					: undefined,
			});

			// Update messages with agent response
			setMessages((prev) => [...prev, ...response]);
		} catch (error) {
			console.error("Error calling recommender:", error);
		}
	}

	async function handleSubmit(data: FormData) {
		if (!data.get("message")?.toString()) return;
		const userMessage = data.get("message")!.toString();
		const newMessages: MessageData[] = [
			...messages,
			{ role: "user", content: [{ text: userMessage }] },
		];
		setMessages(newMessages);
		setPrompt("");

		// Call the consolidated function
		await sendMessages(newMessages);
	}

	// Handle question answers
	const handleQuestionAnswer = async (questionId: number, answer: string) => {
		setAnswers((prev) => ({ ...prev, [questionId]: answer }));

		// Find the ref from the original askQuestion toolRequest
		let ref = "0"; // Default ref if not found
		for (let i = messages.length - 1; i >= 0; i--) {
			const message = messages[i];
			for (const contentItem of message.content) {
				if (
					"toolRequest" in contentItem &&
					contentItem.toolRequest &&
					contentItem.toolRequest.name === "askQuestion" &&
					contentItem.toolRequest.ref
				) {
					ref = contentItem.toolRequest.ref;
					break;
				}
			}
			if (ref !== "0") break; // Stop if we found a ref
		}

		// Create a new message with the answer as a tool response
		const newMessages: MessageData[] = [
			...messages,
			{
				role: "tool",
				content: [
					{
						toolResponse: {
							name: "askQuestion",
							ref: ref,
							output: answer,
						},
					},
				],
			},
		];
		setMessages(newMessages);

		// Call the consolidated function
		await sendMessages(newMessages);
	};

	// Handle suggestion clicks
	const handleSuggestionClick = (suggestion: string) => {
		setPrompt(suggestion);

		// Create a form and submit it
		const formData = new FormData();
		formData.append("message", suggestion);
		handleSubmit(formData);
	};

	// Handle refinement input
	const handleRefinement = async (refinementText: string) => {
		// Create a new message with the refinement
		const newMessages: MessageData[] = [
			...messages,
			{ role: "user", content: [{ text: refinementText }] },
		];
		setMessages(newMessages);

		// Call the consolidated function
		await sendMessages(newMessages);
	};

	// Reset the flow
	const resetFlow = () => {
		setMessages([]);
		setPrompt("");
		setAnswers({});
	};

	// Get current stage
	console.log("stage:", determineStage(messages));
	const currentStage = determineStage(messages);

	// Get recommendations and questions from messages
	const recommendations = extractRecommendations(messages);
	const clarifyingQuestions = extractQuestions(messages);

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

	// Recommendation animation variants
	const recommendationVariants = {
		hidden: { opacity: 0, x: 100 },
		visible: (custom: number) => ({
			opacity: 1,
			x: 0,
			transition: {
				delay: custom * 0.2,
				duration: 0.5,
				type: "spring",
				stiffness: 300,
				damping: 30,
			},
		}),
	};

	// Fireworks options
	const fireworksOptions = {
		opacity: 0.5,
		acceleration: 1.05,
		friction: 0.97,
		gravity: 1.5,
		particles: 50,
		explosion: 5,
		intensity: 30,
		traceLength: 3,
		traceSpeed: 10,
		flickering: 50,
		lineWidth: {
			explosion: {
				min: 1,
				max: 3,
			},
			trace: {
				min: 1,
				max: 2,
			},
		},
		hue: {
			min: 0,
			max: 360,
		},
	};

	return (
		<div className="min-h-[80vh] flex items-center justify-center">
			<div className="max-w-3xl mx-auto w-full relative">
				<AnimatePresence mode="wait">
					{currentStage === "input" && (
						<motion.div
							key="input-stage"
							className="space-y-6"
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={stageVariants}
						>
							<h1 className="text-2xl text-center mb-4">
								Let's find your next movie&hellip;
							</h1>
							<div className="grid grid-cols-5 mx-auto max-w-4xl gap-2 relative">
								{recentMovies?.toReversed().map((movie) => (
									<div key={movie.id}>
										<MoviePoster movie={movie} size="small" variant="minimal" />
									</div>
								))}
								<div className="aspect-[3/4] border-2 dark:border-amber-200 border-amber-400 rounded-lg"></div>
								<div className="absolute top-0 left-0 right-1/4 bottom-0 bg-gradient-to-l from-transparent to-background"></div>
							</div>

							<form action={handleSubmit} className="space-y-4">
								<Input
									name="message"
									placeholder="What do you want to watch tonight?"
									value={prompt}
									onChange={(e) => setPrompt(e.target.value)}
									className="text-lg py-6 px-6 rounded-full shadow-md"
								/>
								<Button
									type="submit"
									className="w-full rounded-full"
									disabled={!prompt.trim()}
								>
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

					{currentStage === "loading" && (
						<motion.div
							key="loading-stage"
							className="space-y-8"
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={stageVariants}
						>
							<LoadingState />
						</motion.div>
					)}

					{currentStage === "clarifying" && (
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

							<h2 className="text-xl font-semibold mb-6">
								Let's find the perfect movie for you
							</h2>

							<div className="space-y-6">
								{clarifyingQuestions && clarifyingQuestions.length > 0 ? (
									clarifyingQuestions.map((question, index) => (
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
												onAnswer={(answer) =>
													handleQuestionAnswer(question.id, answer)
												}
											/>
										</motion.div>
									))
								) : (
									<p>No questions available at the moment.</p>
								)}
							</div>
						</motion.div>
					)}

					{currentStage === "recommendations" && (
						<motion.div
							key="recommendations-stage"
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={stageVariants}
						>
							{/* Extract the recommendedMovies from the toolRequest */}
							{(() => {
								// Find the recommendMovies toolRequest in the messages
								for (let i = messages.length - 1; i >= 0; i--) {
									const message = messages[i];
									for (const contentItem of message.content) {
										if (
											"toolRequest" in contentItem &&
											contentItem.toolRequest &&
											contentItem.toolRequest.name === "recommendMovies"
										) {
											// Extract the recommendedMovies from the input
											const input = contentItem.toolRequest.input as {
												recommendedMovies: Array<{
													id: string;
													reason: string;
												}>;
											};

											return (
												<MovieRecommendationsDisplay
													recommendedMovies={input.recommendedMovies}
													onRefinement={handleRefinement}
													onReset={resetFlow}
													onSelectMovie={handleSelectMovie}
												/>
											);
										}
									}
								}

								// Fallback if no recommendMovies toolRequest is found
								return <p>No recommendations available at the moment.</p>;
							})()}
						</motion.div>
					)}

					{currentStage === "selected" && selectedMovie && (
						<motion.div
							key="selected-stage"
							className="relative"
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={stageVariants}
						>
							{/* Fireworks background */}
							<div className="absolute inset-0 overflow-hidden">
								<Fireworks
									options={fireworksOptions}
									style={{
										top: 0,
										left: 0,
										width: "100%",
										height: "100%",
										position: "absolute",
										background: "transparent",
										zIndex: 1,
									}}
								/>
							</div>

							<div className="relative z-10 flex flex-col items-center">
								<Button
									variant="ghost"
									className="self-start mb-4"
									onClick={() => setSelectedMovie(null)}
								>
									← Back to recommendations
								</Button>

								<div className="w-64 mx-auto">
									<MoviePoster
										movie={selectedMovie.movie}
										size="medium"
										variant="default"
									/>
								</div>

								<div className="mt-6 text-center">
									<h2 className="text-2xl font-bold">
										{selectedMovie.movie.title}
									</h2>
									<p className="text-lg mt-2">
										Great choice! Enjoy your movie!
									</p>
									{selectedMovie.reason && (
										<p className="mt-4 text-muted-foreground italic">
											"{selectedMovie.reason}"
										</p>
									)}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Height transition div */}
				<motion.div
					animate={{
						height: currentStage === "input" ? 240 : 550,
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
