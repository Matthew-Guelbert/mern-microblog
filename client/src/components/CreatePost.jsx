"use client"

import { useState } from "react"
import { User, ImageIcon, Link, Smile } from "lucide-react"

function CreatePost({ onCreatePost }) {
  const [content, setContent] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) return

    onCreatePost({ content })
    setContent("")
    setIsExpanded(false)
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-500" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className={`border border-gray-300 rounded-lg ${isExpanded ? "rounded-b-none" : "rounded-full"}`}>
                <textarea
                  placeholder="What's happening?"
                  className="w-full px-4 py-2 bg-transparent resize-none focus:outline-none"
                  rows={isExpanded ? 3 : 1}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onFocus={() => setIsExpanded(true)}
                />
              </div>

              {isExpanded && (
                <div className="border border-t-0 border-gray-300 rounded-b-lg p-2 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button type="button" className="p-2 text-blue-500 rounded-full hover:bg-blue-50">
                      <ImageIcon className="h-5 w-5" />
                    </button>
                    <button type="button" className="p-2 text-blue-500 rounded-full hover:bg-blue-50">
                      <Link className="h-5 w-5" />
                    </button>
                    <button type="button" className="p-2 text-blue-500 rounded-full hover:bg-blue-50">
                      <Smile className="h-5 w-5" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!content.trim()}
                    className={`px-4 py-1.5 rounded-full font-medium text-white ${
                      content.trim() ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"
                    }`}
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
