import TrendingTopics from "./TrendingTopics"
import SuggestedUsers from "./SuggestedUsers"

function Sidebar({ topics, users }) {
  return (
    <div className="space-y-6">
      <TrendingTopics topics={topics} />
      <SuggestedUsers users={users} />
    </div>
  )
}

export default Sidebar
