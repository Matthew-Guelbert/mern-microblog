import { Link } from "react-router-dom"
import { User } from "lucide-react"

function SuggestedUsers({ users }) {
  if (!users || users.length === 0) return null

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Who to follow</h2>
      </div>

      <div className="p-4">
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {user.avatar ? (
                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-10 w-10 rounded-full" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                  )}
                </div>
                <div>
                  <Link to={`/profile/${user.username}`} className="font-medium hover:underline">
                    {user.name}
                  </Link>
                  <p className="text-gray-500 text-sm">@{user.username}</p>
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
  )
}

export default SuggestedUsers
