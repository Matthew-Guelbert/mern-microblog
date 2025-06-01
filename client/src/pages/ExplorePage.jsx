"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { samplePosts, sampleTopics, sampleUsers } from "../data/sampleData"

function ExplorePage({ initialTab = "topics" }) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTopics, setFilteredTopics] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const { tagName } = useParams()
  const navigate = useNavigate()

  // If a tag name is provided in the URL, set it as the search query
  useEffect(() => {
    if (tagName) {
      setSearchQuery(tagName)
      setActiveTab("topics")
    }
  }, [tagName])

  // Filter data based on search query
  useEffect(() => {
    const query = searchQuery.toLowerCase()

    // Filter topics
    setFilteredTopics(
      sampleTopics
        .filter((topic) => (query ? topic.name.toLowerCase().includes(query) : true))
        .sort((a, b) => b.postCount - a.postCount),
    )

    // Filter users
    setFilteredUsers(
      sampleUsers.filter((user) =>
        query ? user.name.toLowerCase().includes(query) || user.username.toLowerCase().includes(query) : true,
      ),
    )

    // Filter posts
    setFilteredPosts(
      samplePosts.filter((post) =>
        query
          ? post.content.toLowerCase().includes(query) ||
            post.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
            post.author.name.toLowerCase().includes(query) ||
            post.author.username.toLowerCase().includes(query)
          : true,
      ),
    )
  }, [searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    // You could navigate to a search results page or just update the current filters
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold">Explore</h1>
            <p className="text-gray-600">Discover trending topics, posts, and people to follow</p>
          </div>

          <div className="p-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search topics, posts, or people..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="border-b">
              <div className="flex">
                <button
                  className={`py-3 px-4 font-medium text-sm focus:outline-none ${
                    activeTab === "topics"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("topics")}
                >
                  Trending Topics
                </button>
                <button
                  className={`py-3 px-4 font-medium text-sm focus:outline-none ${
                    activeTab === "posts"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("posts")}
                >
                  Popular Posts
                </button>
                <button
                  className={`py-3 px-4 font-medium text-sm focus:outline-none ${
                    activeTab === "people"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("people")}
                >
                  People to Follow
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-lg shadow">
          {/* Trending Topics Tab */}
          {activeTab === "topics" && (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic) => (
                    <div key={topic.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <a
                        href={`/tag/${topic.name}`}
                        className="block"
                        onClick={(e) => {
                          e.preventDefault()
                          navigate(`/tag/${topic.name}`)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-blue-500 text-lg">#{topic.name}</span>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {topic.postCount} posts
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                          Trending in {["technology", "development", "programming"][Math.floor(Math.random() * 3)]}
                        </p>
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No topics found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Popular Posts Tab */}
          {activeTab === "posts" && (
            <div className="p-4">
              <div className="space-y-4">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
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
                            <a
                              key={index}
                              href={`/tag/${tag}`}
                              className="text-blue-500 text-sm hover:underline"
                              onClick={(e) => {
                                e.preventDefault()
                                navigate(`/tag/${tag}`)
                              }}
                            >
                              #{tag}
                            </a>
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
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No posts found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* People to Follow Tab */}
          {activeTab === "people" && (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
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
                      </div>
                      <p className="text-gray-600 text-sm mt-3">
                        {
                          ["Web Developer", "UX Designer", "Software Engineer", "Data Scientist"][
                            Math.floor(Math.random() * 4)
                          ]
                        }{" "}
                        at {["Tech Co.", "Design Studio", "Startup Inc.", "Big Corp"][Math.floor(Math.random() * 4)]}
                      </p>
                      <div className="mt-3 flex items-center text-sm text-gray-500">
                        <span className="mr-4">
                          <span className="font-medium text-gray-700">{Math.floor(Math.random() * 500)}</span> Following
                        </span>
                        <span>
                          <span className="font-medium text-gray-700">{Math.floor(Math.random() * 2000)}</span>{" "}
                          Followers
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No users found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ExplorePage
