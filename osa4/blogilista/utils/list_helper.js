
const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const favorite = blogs.reduce((mostLikes, thisLikes) => (
    mostLikes.likes > thisLikes.likes
      ? mostLikes : thisLikes))
  return favorite
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
