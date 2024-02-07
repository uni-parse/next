/* eslint-disable no-case-declarations */
import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

const filePath = path.join(
  process.cwd(),
  'dataBase',
  'users.json'
)

interface User {
  name: string
  money: number
  xp: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fileData = fs.readFileSync(filePath, 'utf8')
  const users: User[] = JSON.parse(fileData)

  switch (req.method) {
    case 'GET': // get user | users
      if (req?.query?.userName) {
        const { userName } = req.query

        const user = users.find(
          (user: any) => user.name === userName
        )
        res.status(200).json(user)
        break
      }

      res.status(200).json(users)
      break

    case 'POST': // add user
      const { name, money, xp } = req.body
      const user: User = { name, money: +money, xp: +xp }
      users.push(user)
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
      res.status(200).json({
        users,
        message: `${user.name} added successfully`,
      })
      break

    case 'DELETE': // remove user
      const { userName } = req.query
      const updatedUsers = users.filter(
        (user: any) => user.name !== userName
      )
      fs.writeFileSync(
        filePath,
        JSON.stringify(updatedUsers, null, 2)
      )
      res.status(200).json({
        users: updatedUsers,
        message: `${userName} deleted successfully`,
      })
      break

    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}
