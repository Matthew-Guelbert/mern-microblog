"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { samplePosts, sampleUsers } from "../data/sampleData"

function ProfilePage() {
  const { username } = useParams()
  const navigate = useNavigate()
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("posts")
  const [user, setUser] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [profileForm, setProfileForm] = useState({
    name: "",
    username: "",
    bio: "",
    location: "",
    website: "",
  })
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/users/${username || 'current'}`)
        // const userData = await response.json()

        // For demo purposes, simulate API call with sample data
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Check if viewing own profile or someone else's
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
        const isOwnProfile = !username || (currentUser && currentUser.username === username)
        setIsCurrentUser(isOwnProfile)

        // Get user data
        let userData
        if (isOwnProfile) {
          // If viewing own profile, use stored user data or default
          userData = currentUser || {
            name: "Current User",
            username: "currentuser",
            bio: "This is your profile. Edit it to tell others about yourself!",
            location: "San Francisco, CA",
            website: "https://example.com",
            followers: 42,
            following: 73,
            joinDate: "January 2023",
          }
        } else {
          // If viewing someone else's profile, find them in sample users
          userData = sampleUsers.find((u) => u.username === username) || {
            name: username,
            username: username,
            bio: "User not found",
          }

          // Add some extra fields for demo purposes if using sample data
          if (userData && !userData.followers) {
            userData.followers = Math.floor(Math.random() * 1000)
            userData.following = Math.floor(Math.random() * 500)
            userData.joinDate = "January 2023"
            userData.bio = `Hi, I'm ${userData.name}! I'm interested in technology, design, and innovation.`
            userData.location = ["New York, NY", "San Francisco, CA", "London, UK"][Math.floor(Math.random() * 3)]
            userData.website = "https://example.com"
          }
        }

        setUser(userData)
        setProfileForm({
          name: userData.name || "",
          username: userData.username || "",
          bio: userData.bio || "",
          location: userData.location || "",
          website: userData.website || "",
        })

        // Get user posts
        const filteredPosts = samplePosts.filter((post) => post.author.username === (userData.username || ""))
        setUserPosts(filteredPosts)
      } catch (error) {
        console.error("Error fetching profile data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [username])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!profileForm.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!profileForm.username.trim()) {
      newErrors.username = "Username is required"
    } else if (!/^[a-zA-Z0-9_]+$/.test(profileForm.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores"
    }

    if (
      profileForm.website &&
      !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(profileForm.website)
    ) {
      newErrors.website = "Please enter a valid URL"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSaving(true)
    setErrors({})

    try {
      // Here you would typically make an API call to your backend
      // const formData = new FormData()
      // formData.append('name', profileForm.name)
      // formData.append('username', profileForm.username)
      // formData.append('bio', profileForm.bio)
      // formData.append('location', profileForm.location)
      // formData.append('website', profileForm.website)
      // if (profileImage) {
      //   formData.append('profileImage', profileImage)
      // }
      // const response = await fetch('/api/users/profile', {
      //   method: 'PUT',
      //   body: formData
      // })
      // const data = await response.json()

      // For demo purposes, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local user data
      const updatedUser = {
        ...user,
        ...profileForm,
      }
      setUser(updatedUser)

      // If this is the current user, update localStorage
      if (isCurrentUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }

      // Exit edit mode
      setIsEditing(false)
    } catch (error) {
      setErrors({ general: "Failed to update profile. Please try again." })
    } finally {
      setIsSaving(false)
    }
  }

  const handleFollow = () => {
    // In a real app, you would make an API call to follow/unfollow
    alert(`You are now following ${user.name}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">User not found</h1>
            <p className="text-gray-600 mb-6">The user you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-full transition-colors"
            >
              Return to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="relative">
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-lg"></div>

            {/* Profile Picture */}
            <div className="absolute left-6 -bottom-16">
              <div className="relative">
                <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                  {previewImage ? (
                    <img
                      src={previewImage || "/placeholder.svg"}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-500 text-4xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Edit/Follow Button */}
            <div className="absolute right-6 bottom-6">
              {isCurrentUser ? (
                isEditing ? (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSaving}
                      className={`px-4 py-2 rounded-full text-white font-medium ${
                        isSaving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 transition-colors"
                      }`}
                    >
                      {isSaving ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </div>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Edit Profile
                  </button>
                )
              ) : (
                <button
                  onClick={handleFollow}
                  className="px-4 py-2 bg-blue-500 rounded-full text-white font-medium hover:bg-blue-600 transition-colors"
                >
                  Follow
                </button>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 px-6 pb-6">
            {isEditing ? (
              <form className="space-y-4">
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{errors.general}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileForm.username}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.username ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="3"
                    value={profileForm.bio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profileForm.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={profileForm.website}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.website ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                    }`}
                  />
                  {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
                </div>
              </form>
            ) : (
              <>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-500">@{user.username}</p>

                {user.bio && <p className="mt-4">{user.bio}</p>}

                <div className="mt-4 flex flex-wrap gap-y-2">
                  {user.location && (
                    <div className="flex items-center text-gray-600 mr-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{user.location}</span>
                    </div>
                  )}

                  {user.website && (
                    <div className="flex items-center text-blue-500 mr-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {user.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}

                  {user.joinDate && (
                    <div className="flex items-center text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                      </svg>
                      <span>Joined {user.joinDate}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex">
                  <div className="mr-6">
                    <span className="font-bold">{user.following || 0}</span>{" "}
                    <span className="text-gray-600">Following</span>
                  </div>
                  <div>
                    <span className="font-bold">{user.followers || 0}</span>{" "}
                    <span className="text-gray-600">Followers</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Profile Tabs */}
        {!isEditing && (
          <>
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 text-center font-medium text-sm focus:outline-none ${
                    activeTab === "posts"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("posts")}
                >
                  Posts
                </button>
                <button
                  className={`flex-1 py-3 text-center font-medium text-sm focus:outline-none ${
                    activeTab === "media"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("media")}
                >
                  Media
                </button>
                <button
                  className={`flex-1 py-3 text-center font-medium text-sm focus:outline-none ${
                    activeTab === "likes"
                      ? "text-blue-600 border-b-2 border-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("likes")}
                >
                  Likes
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === "posts" && (
                <>
                  {userPosts.length > 0 ? (
                    userPosts.map((post) => (
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
                              <span key={index} className="text-blue-500 text-sm">
                                #{tag}
                              </span>
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
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                      <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                      <p className="text-gray-600 mb-6">
                        {isCurrentUser
                          ? "Share your thoughts with the world by creating your first post!"
                          : `${user.name} hasn't posted anything yet.`}
                      </p>
                      {isCurrentUser && (
                        <button
                          onClick={() => navigate("/")}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-full transition-colors"
                        >
                          Create a post
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}

              {activeTab === "media" && (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No media yet</h3>
                  <p className="text-gray-600">
                    {isCurrentUser
                      ? "Share photos and videos in your posts to see them here."
                      : `${user.name} hasn't shared any media yet.`}
                  </p>
                </div>
              )}

              {activeTab === "likes" && (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No likes yet</h3>
                  <p className="text-gray-600">
                    {isCurrentUser ? "Posts you like will appear here." : `${user.name} hasn't liked any posts yet.`}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default ProfilePage
