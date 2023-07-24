import fs from 'fs'
import path from 'path'
import { useState } from 'react'
import useSWR from 'swr'

import Layout from '@/components/layout'

export async function getServerSideProps() {
  const usersPath = path.join(
    process.cwd(),
    'dataBase',
    'users.json'
  )
  const usersJsonStr = fs.readFileSync(usersPath, 'utf8')
  const users = await JSON.parse(usersJsonStr)

  const props = { users }
  return { props }
}

export default function Ssr({ users }: any) {
  const [userName, setUserName] = useState('user1')

  return (
    <Layout title='ssr-csr'>
      <h1>ssr:</h1>
      <ul>
        users:
        {users.map((user: any) => (
          <details key={user.name}>
            <summary>{user.name}</summary>
            <ul>
              <li>money: {user.money}</li>
              <li>xp: {user.xp}</li>
            </ul>
          </details>
        ))}
      </ul>

      <h1>csr:</h1>
      <input
        type='text'
        placeholder='userName'
        onChange={e => setUserName(e.target.value)}
      />

      <User name={userName} />
    </Layout>
  )
}

function User({ name }: any) {
  const apiRoutUrl = '/api/getUser'
  const query = `?userName=${name}`
  const url = apiRoutUrl + query

  async function fetcher(url: URL) {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }

  const { data: user, error } = useSWR(url, fetcher)

  if (error) return <div>invalid userName / failed to load</div>
  if (!user) return <div>loading...</div>
  return (
    <details>
      <summary>{user.name}</summary>
      <ul>
        <li>money: {user.money}</li>
        <li>xp: {user.xp}</li>
      </ul>
    </details>
  )
}
