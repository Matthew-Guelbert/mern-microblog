"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, MessageCircle, Share2, MoreHorizontal, User } from "lucide-react"

function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    // In a real app, you would call your API here
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        {/* Post header */}
        <div className="flex justify-between">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
              )}
            </div>
            <div>
              <Link to={`/profile/${post.author.username}`} className="font-medium hover:underline">
                {post.author.name}
              </Link>
              <div className="flex items-center text-gray-500 text-sm">
                <span>@{post.author.username}</span>
                <span className="mx-1">·</span>
                <span>{post.timeAgo}</span>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Post content */}
        <div className="mt-3">
          <p className="whitespace-pre-line">{post.content}</p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.map((tag, index) => (
                <Link key={index} to={`/tag/${tag}`} className="text-blue-500 hover:underline text-sm">
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Post actions */}
        <div className="mt-4 pt-3 border-t flex justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 ${liked ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
          >
            <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
            <span>{likeCount}</span>
          </button>

          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments}</span>
          </button>

          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
            <Share2 className="h-5 w-5" />
            <span>{post.shares}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCard
