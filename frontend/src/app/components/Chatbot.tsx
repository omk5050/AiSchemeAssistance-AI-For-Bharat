import { useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { useI18n } from "../i18n"

export function Chatbot({ profile, results }: any) {

  const { t } = useI18n()

  const [isOpen, setIsOpen] = useState(false)

  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([
    {
      text: "Hello! I am the YojnaSetu assistant. Ask me anything about government schemes.",
      sender: "bot"
    }
  ])

  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {

    if (!inputValue.trim()) return

    const userMessage = inputValue

    setMessages(prev => [
      ...prev,
      { text: userMessage, sender: "user" }
    ])

    setInputValue("")
    setLoading(true)

    try {

      const payload: any = {
        state: "maharashtra",
        question: userMessage
      }

      if (profile?.age !== undefined) payload.age = profile.age;
      if (profile?.income !== undefined) payload.income = profile.income;
      if (profile?.occupation) payload.occupation = profile.occupation.toLowerCase();
      if (profile?.category) payload.category = profile.category.toLowerCase();

      const response = await fetch(
        "https://w7le5stpkl.execute-api.ap-south-1.amazonaws.com/evaluate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Server error")
      }

      const text =
        data.explanation ||
        "Sorry, I couldn't generate a response right now."

      setMessages(prev => [
        ...prev,
        { text, sender: "bot" }
      ])

    } catch (error) {

      console.error("Chatbot error:", error)

      setMessages(prev => [
        ...prev,
        {
          text: "Sorry, I couldn't process that request. Please try again.",
          sender: "bot"
        }
      ])

    }

    setLoading(false)

  }

  const handleKeyPress = (e: React.KeyboardEvent) => {

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }

  }

  return (
    <>
      <AnimatePresence>

        {!isOpen && (

          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl flex items-center justify-center ring-4 ring-blue-600/30 animate-pulse"
          >

            <MessageCircle className="h-8 w-8" />

          </motion.button>

        )}

      </AnimatePresence>

      <AnimatePresence>

        {isOpen && (

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 right-8 z-50 w-[90vw] sm:w-96 bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden"
            style={{ maxHeight: "600px" }}
          >

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold">YojnaSetu Assistant</h3>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">

              {messages.map((message, index) => (

                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border shadow-sm"
                    }`}
                  >

                    <div className="text-sm prose prose-sm max-w-none">
                      <ReactMarkdown>
                        {message.text}
                      </ReactMarkdown>
                    </div>

                  </div>

                </div>

              ))}

              {loading && (
                <p className="text-xs text-gray-500">
                  Assistant typing...
                </p>
              )}

            </div>

            <div className="p-4 border-t bg-white flex gap-2">

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.chatbot.placeholder}
                className="flex-1 px-4 py-2 border rounded-full text-sm"
              />

              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
              >
                <Send className="h-5 w-5" />
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  )
}