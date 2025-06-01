import PostCard from "./PostCard"

function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
        <p className="text-gray-600">Be the first to post something!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList
