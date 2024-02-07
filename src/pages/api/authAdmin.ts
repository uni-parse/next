import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // user password
  const { pw: userPw } = req.query

  // dataBase password
  const filePath = path.join(
    process.cwd(),
    'dataBase',
    'authAdmin.json'
  )
  const pwJson = fs.readFileSync(filePath, 'utf8')
  const { pw: dataBasePw } = JSON.parse(pwJson)

  // validate password
  const access = userPw === dataBasePw

  // response
  res.status(access ? 200 : 404).json({
    message: access ? 'Access Granted!!' : 'Invalid Password',
  })
}
