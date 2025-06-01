"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { samplePosts, sampleTopics, sampleUsers } from "../data/sampleData"

function HomePage() {
  const [posts] = useState(samplePosts)
  const [activeTab, setActiveTab] = useState("for-you")
  const [postContent, setPostContent] = useState("")

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (!postContent.trim()) return

    // Here you would typically send the post to your API
    console.log("New post:", postContent)

    // Clear the input
    setPostContent("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create post card */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-bold text-lg mb-4">Create Post</h2>
              <form onSubmit={handlePostSubmit}>
                <div className="flex space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="What's happening?"
                      className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                    <div className="flex justify-end mt-3">
                      <button
                        type="submit"
                        disabled={!postContent.trim()}
                        className={`px-4 py-2 rounded-full font-medium text-white ${
                          postContent.trim() ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-300 cursor-not-allowed"
                        }`}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Feed tabs */}
            <div className="bg-white rounded-lg shadow">
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 text-center font-medium text-sm focus:outline-none ${
                    activeTab === "for-you"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("for-you")}
                >
                  For You
                </button>
                <button
                  className={`flex-1 py-3 text-center font-medium text-sm focus:outline-none ${
                    activeTab === "following"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("following")}
                >
                  Following
                </button>
              </div>
            </div>

            {/* Posts */}
            {activeTab === "for-you" ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between">
                      <div className="flex space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500">
                          {post.author.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{post.author.name}</div>
                          <div className="text-gray-500 text-sm flex items-center">
                            <span>@{post.author.username}</span>
                            <span className="mx-1">·</span>
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="19" cy="12" r="1"></circle>
                          <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                      </button>
                    </div>

                    <p className="mt-3">{post.content}</p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.map((tag, index) => (
                          <Link key={index} to={`/tag/${tag}`} className="text-blue-500 text-sm hover:underline">
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t flex justify-between">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                        </svg>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                        </svg>
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="18" cy="5" r="3"></circle>
                          <circle cx="6" cy="12" r="3"></circle>
                          <circle cx="18" cy="19" r="3"></circle>
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">Your following feed is empty</h3>
                <p className="text-gray-600 mb-6">Follow some users to see their posts here.</p>
                <Link
                  to="/explore/people"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-full transition-colors inline-block"
                >
                  Discover people
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-blue-500"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                  Trending Topics
                </h2>
              </div>
              <div className="p-4">
                <ul className="space-y-4">
                  {sampleTopics.slice(0, 5).map((topic) => (
                    <li key={topic.id}>
                      <Link to={`/tag/${topic.name}`} className="block">
                        <span className="font-medium text-blue-500 hover:underline">#{topic.name}</span>
                        <p className="text-xs text-gray-500 mt-1">
                          {topic.postCount} {topic.postCount === 1 ? "post" : "posts"}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border-t">
                <Link to="/explore" className="text-blue-500 hover:underline text-sm">
                  Show more
                </Link>
              </div>
            </div>

            {/* Who to follow */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Who to follow</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-4">
                  {sampleUsers.slice(0, 3).map((user) => (
                    <li key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-gray-500 text-sm">@{user.username}</div>
                        </div>
                      </div>
                      <button className="px-3 py-1 text-sm bg-transparent border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50">
                        Follow
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border-t">
                <Link to="/explore/people" className="text-blue-500 hover:underline text-sm">
                  Show more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
