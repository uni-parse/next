import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { remark } from 'remark'
import remarkHtml from 'remark-html'

// Get the working directory url
const postsDirectory = path.join(
  process.cwd(),
  'dataBase',
  'posts'
)

export function getAllPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    return getPostData(id)
  })

  // Sort posts by date (new to old)
  return allPostsData.sort((a, b) => +b.date - +a.date)
}

export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // parse metadata
  const { data } = matter(fileContents)
  const { title, date } = data

  interface PostData {
    id: string
    title: string
    date: Date
  }

  // combine id with data: { id, title, date }
  return { id, title, date } as PostData
}

export async function getPostDataAsync(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // parse the metadata section by gray-matter
  const { data: metaData, content } = matter(fileContents)
  const { title, date } = metaData

  // compile markdown to HTML string by remark
  const htmlContent = (
    await remark().use(remarkHtml).process(content)
  ).toString()

  // Combine the data with the id and Html and metaData
  const postData = { id, title, date, htmlContent }

  return postData
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  const paths = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const path = { params: { id } }
    return path
  })

  return paths
  // paths = [
  //   { params: { id: 'ssg-ssr' } },
  //   { params: { id: 'pre-rendering' } }
  // ]
}
