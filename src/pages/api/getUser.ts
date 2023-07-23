import type { NextApiRequest, NextApiResponse } from 'next'

import fs from 'fs'
import path from 'path'

type User = {
  name: string
  money: number
  xp: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const usersPath = path.join(
    process.cwd(),
    'dataBase',
    'users.json'
  )
  const usersJson = fs.readFileSync(usersPath, 'utf8')
  const users: User[] = JSON.parse(usersJson)

  const { userName } = req.query
  const user = users.find(user => user.name === userName)

  res.status(200).json(user!)
}
