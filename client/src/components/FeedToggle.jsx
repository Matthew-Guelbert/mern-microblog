"use client"

function FeedToggle({ activeTab, onTabChange }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-center font-medium text-sm focus:outline-none ${
            activeTab === "for-you" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => onTabChange("for-you")}
        >
          For You
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium text-sm focus:outline-none ${
            activeTab === "following" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => onTabChange("following")}
        >
          Following
        </button>
      </div>
    </div>
  )
}

export default FeedToggle
