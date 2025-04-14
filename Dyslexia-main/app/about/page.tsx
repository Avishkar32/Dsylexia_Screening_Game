import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-500 to-blue-900 flex flex-col items-center justify-center p-4">
      <Card className="max-w-3xl w-full border-4 border-cyan-300 bg-white/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-800">About Ocean Letters</CardTitle>
          <CardDescription className="text-xl">An Underwater Adventure for Literacy Skills</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-700">What is Ocean Letters?</h2>
            <p>
              Ocean Letters is an engaging, aquatic-themed game designed to help children practice important literacy
              skills that are often challenging for those with dyslexia. Through a series of fun underwater adventures,
              children can improve their reading, spelling, and language processing abilities.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-700">Game Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-bold">Bubble Bay:</span> Practice letter recognition and differentiate between
                commonly confused letters like b/d and p/q.
              </li>
              <li>
                <span className="font-bold">Word Reef:</span> Identify correctly spelled words among similar-looking
                options to improve word recognition.
              </li>
              <li>
                <span className="font-bold">Memory Cove:</span> Enhance working memory by remembering and repeating
                sequences of sea creatures.
              </li>
              <li>
                <span className="font-bold">Spell Shore:</span> Practice spelling by identifying correctly spelled words
                from options with common dyslexic spelling errors.
              </li>
              <li>
                <span className="font-bold">Sentence Sea:</span> Improve sentence structure understanding by arranging
                words in the correct order.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-700">Benefits</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Improves letter and word recognition</li>
              <li>Enhances working memory</li>
              <li>Develops spelling skills</li>
              <li>Strengthens sentence structure understanding</li>
              <li>Builds confidence through engaging gameplay</li>
              <li>Provides personalized feedback and recommendations</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-700">For Parents and Teachers</h2>
            <p>
              Ocean Letters is designed to be both fun and educational. The game collects data on performance to help
              identify areas where a child might need additional support. The results page provides specific
              recommendations for each skill area.
            </p>
            <p>
              This game is not a diagnostic tool for dyslexia, but it can help identify specific literacy skills that
              may need additional practice and support.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center p-6">
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
            >
              Return to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
