import { Link } from "react-router-dom"
import { TrendingUp } from "lucide-react"

function TrendingTopics({ topics }) {
  if (!topics || topics.length === 0) return null

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
          Trending Topics
        </h2>
      </div>

      <div className="p-4">
        <ul className="space-y-4">
          {topics.map((topic) => (
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
  )
}

export default TrendingTopics
