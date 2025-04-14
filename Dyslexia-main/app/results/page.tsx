"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getAllGameData } from "@/lib/game-data"

export default function ResultsPage() {
  const router = useRouter()
  const [playerName, setPlayerName] = useState("")
  const [gameResults, setGameResults] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [overallScore, setOverallScore] = useState(0)

  useEffect(() => {
    // Get player info from localStorage
    const playerInfo = localStorage.getItem("playerInfo")
    if (playerInfo) {
      const { name } = JSON.parse(playerInfo)
      setPlayerName(name)
    }

    // Get all game data
    const results = getAllGameData()
    setGameResults(results)

    // Calculate overall score
    let totalScore = 0
    let totalPossible = 0

    if (results["bubble-bay"]) {
      totalScore += results["bubble-bay"].score
      totalPossible += 10
    }

    if (results["word-reef"]) {
      totalScore += results["word-reef"].score
      totalPossible += 10
    }

    if (results["memory-cove"]) {
      totalScore += results["memory-cove"].maxSequenceReached
      totalPossible += 7
    }

    if (results["spell-shore"]) {
      totalScore += results["spell-shore"].score
      totalPossible += 10
    }

    if (results["sentence-sea"]) {
      totalScore += results["sentence-sea"].score
      totalPossible += 5
    }

    const calculatedScore = Math.round((totalScore / totalPossible) * 100)
    setOverallScore(calculatedScore)
    setLoading(false)
  }, [])

  const getSkillAssessment = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 75) return "Good"
    if (score >= 60) return "Developing"
    return "Needs Practice"
  }

  const getRecommendations = (gameId: string, score: number) => {
    const recommendations = {
      "bubble-bay": {
        low: "Practice letter recognition with flashcards or letter games.",
        medium: "Continue practicing similar-looking letters like b/d and p/q.",
        high: "Great job! Keep reading to reinforce letter recognition.",
      },
      "word-reef": {
        low: "Practice reading simple words aloud and identifying them.",
        medium: "Read short stories and identify sight words.",
        high: "Challenge yourself with more complex words and reading materials.",
      },
      "memory-cove": {
        low: "Practice remembering short sequences of items in daily activities.",
        medium: "Play memory games that gradually increase in difficulty.",
        high: "Challenge your memory with longer sequences and patterns.",
      },
      "spell-shore": {
        low: "Practice spelling common words using letter tiles or writing.",
        medium: "Focus on words with similar spelling patterns.",
        high: "Challenge yourself with more complex spelling patterns.",
      },
      "sentence-sea": {
        low: "Practice arranging simple sentences with word cards.",
        medium: "Read sentences aloud and identify the correct word order.",
        high: "Try writing your own sentences and stories.",
      },
    }

    if (score < 60) return recommendations[gameId].low
    if (score < 80) return recommendations[gameId].medium
    return recommendations[gameId].high
  }

  const getScoreForGame = (gameId: string) => {
    if (!gameResults[gameId]) return 0

    switch (gameId) {
      case "bubble-bay":
      case "word-reef":
      case "spell-shore":
        return (gameResults[gameId].score / 10) * 100
      case "memory-cove":
        return (gameResults[gameId].maxSequenceReached / 7) * 100
      case "sentence-sea":
        return (gameResults[gameId].score / 5) * 100
      default:
        return 0
    }
  }

  const restartGame = () => {
    // Clear game data
    localStorage.removeItem("gameData")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-500 to-blue-900 flex flex-col items-center justify-center p-4">
        <Card className="max-w-3xl w-full border-4 border-cyan-300 bg-white/90 backdrop-blur-sm shadow-xl">
          <CardContent className="p-8 flex justify-center">
            <p className="text-xl">Loading your results...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-500 to-blue-900 flex flex-col items-center justify-center p-4">
      <Card className="max-w-3xl w-full border-4 border-cyan-300 bg-white/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-800">Ocean Adventure Results</CardTitle>
          <CardDescription className="text-xl">
            Great job, {playerName}! You've completed all the challenges!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Overall Performance</h2>
            <div className="w-full bg-blue-100 rounded-full h-6 mb-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-cyan-500 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ width: `${overallScore}%` }}
              >
                {overallScore}%
              </div>
            </div>
            <p className="text-lg font-medium">
              Overall Assessment: <span className="text-blue-700">{getSkillAssessment(overallScore)}</span>
            </p>
          </div>

          <div className="grid gap-6">
            <h2 className="text-xl font-bold">Game Performance</h2>

            {/* Bubble Bay */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="font-medium">Bubble Bay (Letter Recognition)</h3>
                <span>{getScoreForGame("bubble-bay")}%</span>
              </div>
              <Progress value={getScoreForGame("bubble-bay")} className="h-2" />
              <p className="text-sm text-gray-600">{getRecommendations("bubble-bay", getScoreForGame("bubble-bay"))}</p>
            </div>

            {/* Word Reef */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="font-medium">Word Reef (Word Recognition)</h3>
                <span>{getScoreForGame("word-reef")}%</span>
              </div>
              <Progress value={getScoreForGame("word-reef")} className="h-2" />
              <p className="text-sm text-gray-600">{getRecommendations("word-reef", getScoreForGame("word-reef"))}</p>
            </div>

            {/* Memory Cove */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="font-medium">Memory Cove (Working Memory)</h3>
                <span>{getScoreForGame("memory-cove")}%</span>
              </div>
              <Progress value={getScoreForGame("memory-cove")} className="h-2" />
              <p className="text-sm text-gray-600">
                {getRecommendations("memory-cove", getScoreForGame("memory-cove"))}
              </p>
            </div>

            {/* Spell Shore */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="font-medium">Spell Shore (Spelling)</h3>
                <span>{getScoreForGame("spell-shore")}%</span>
              </div>
              <Progress value={getScoreForGame("spell-shore")} className="h-2" />
              <p className="text-sm text-gray-600">
                {getRecommendations("spell-shore", getScoreForGame("spell-shore"))}
              </p>
            </div>

            {/* Sentence Sea */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="font-medium">Sentence Sea (Sentence Structure)</h3>
                <span>{getScoreForGame("sentence-sea")}%</span>
              </div>
              <Progress value={getScoreForGame("sentence-sea")} className="h-2" />
              <p className="text-sm text-gray-600">
                {getRecommendations("sentence-sea", getScoreForGame("sentence-sea"))}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">Next Steps</h3>
            <p>
              This game helps identify areas where you might need more practice. Continue playing to improve your
              skills! Remember, practice makes progress!
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center p-6">
          <Button
            onClick={restartGame}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
          >
            Play Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
