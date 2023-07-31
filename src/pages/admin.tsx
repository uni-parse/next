/* eslint-disable jsx-a11y/label-has-associated-control */
import fs from 'fs'
import path from 'path'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import Head from 'next/head'
import Layout from '@/components/layout'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps =
  async () => {
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

export default function Admin({ users: ssrUsers }: any) {
  const [users, setUsers] = useState(ssrUsers)
  useAuthAdmin()

  return (
    <Layout title='Admin'>
      <Head>
        <meta name='robots' content='noindex,nofollow' />
        <meta name='googlebot' content='noindex,nofollow' />
        <meta name='google' content='nositelinkssearchbox' />
        <meta name='google' content='notranslate' />
      </Head>

      <section className='mb-4 rounded-lg bg-[#222] p-2'>
        <h1>ssr:</h1>
        <GetUsersSsr users={ssrUsers} />
      </section>

      <hr />

      <section className='mt-4 rounded-lg bg-[#222] p-2'>
        <h1>csr:</h1>
        <GetUser />
        <AddUserForm setUsers={setUsers} />
        <DeleteUserForm setUsers={setUsers} />
        <GetUsersCsr users={users} />
      </section>
    </Layout>
  )
}

function useAuthAdmin() {
  useEffect(() => {
    authAdmin()
  }, [])
}

async function authAdmin() {
  const pw = prompt('Enter Password', '')
  const res = await fetch(`/api/authAdmin?pw=${pw}`, {
    method: 'GET',
  })
  const { message } = await res.json()

  if (res.status === 200) alert(message)
  else {
    alert(message)
    authAdmin()
  }
}

function GetUsersSsr({ users }: any) {
  return (
    <div className='rounded-xl bg-cyan-900 p-2'>
      <h3>get users:</h3>
      {users.map((user: any) => (
        <details key={user.name}>
          <summary>{user.name}</summary>
          <ul>
            <li>money: {user.money}</li>
            <li>xp: {user.xp}</li>
          </ul>
        </details>
      ))}
    </div>
  )
}

function AddUserForm({ setUsers }: any) {
  const [name, setName] = useState('')
  const [money, setMoney] = useState('')
  const [xp, setXp] = useState('')
  const [output, setOutput] = useState('waiting...')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, money, xp }),
    })
    const { message, users } = await res.json()
    setOutput(message)
    setName('')
    setMoney('')
    setXp('')
    setUsers(users)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='my-2 rounded-xl bg-cyan-900 p-2'>
      <h3>add user:</h3>
      <input
        type='text'
        placeholder='name'
        value={name}
        onChange={e => setName(e.target.value)}
        required
        pattern='\w{5,8}'
        title='enter 5~8 characters: a~z or 0~9 or _'
      />
      <br />

      <input
        type='number'
        placeholder='money'
        value={money}
        onChange={e => setMoney(e.target.value)}
        required
        pattern='\d+'
        title='enter one digit or more'
      />
      <br />

      <input
        type='number'
        placeholder='xp'
        value={xp}
        onChange={e => setXp(e.target.value)}
        required
        pattern='\d+'
        title='enter one digit or more'
      />
      <br />

      <input type='submit' value='Submit' />
      <br />

      <output>{output}</output>
    </form>
  )
}

function DeleteUserForm({ setUsers }: any) {
  const [name, setName] = useState('')
  const [output, setOutput] = useState('waiting...')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await fetch(`/api/users?userName=${name}`, {
      method: 'DELETE',
    })
    const { message, users } = await res.json()
    setOutput(message)
    setName('')
    setUsers(users)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='my-2 rounded-xl bg-cyan-900 p-2'>
      <h3>delete user:</h3>

      <input
        type='text'
        value={name}
        placeholder='userName'
        onChange={e => setName(e.target.value)}
        required
        pattern='\w{5,8}'
        title='enter 5~8 characters: a~z or 0~9 or _'
      />
      <br />

      <input type='submit' value='Submit' />
      <br />

      <output>{output}</output>
    </form>
  )
}

function GetUsersCsr({ users }: any) {
  return (
    <div className='rounded-xl bg-cyan-900 p-2'>
      <h3>get users:</h3>
      {users.map((user: any) => (
        <details key={user.name}>
          <summary>{user.name}</summary>
          <ul>
            <li>money: {user.money}</li>
            <li>xp: {user.xp}</li>
          </ul>
        </details>
      ))}
    </div>
  )
}

function GetUser() {
  const [userName, setUserName] = useState('')

  return (
    <div className='my-2 rounded-xl bg-cyan-900 p-2'>
      <h3>get user:</h3>
      <input
        type='text'
        placeholder='name'
        onChange={e => setUserName(e.target.value)}
      />

      {userName ? <User name={userName} /> : <p>waiting...</p>}
    </div>
  )
}

function User({ name }: any) {
  const url = `/api/users?userName=${name}`

  const fetcher = async (url: URL) => {
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
