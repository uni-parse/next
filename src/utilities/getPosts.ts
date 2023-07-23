import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { remark } from 'remark'
import html from 'remark-html'

// Get the working directory url
const postsDirectory = path.join(
  process.cwd(),
  'dataBase',
  'posts'
)

export function getAllPostData() {
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

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processContent.toString()

  // Combine the data with the id and contentHtml
  return { id, contentHtml, ...matterResult.data }
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
