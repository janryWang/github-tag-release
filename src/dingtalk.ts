import axios from 'axios'
import { getInput, debug } from '@actions/core'
import { createHmac } from 'crypto'
import { ReleaseTitle } from './constants'

export const createDingTalkNote = async (content: string) => {
  const tokens = getInput('dingtalk_tokens')
  if (tokens) {
    const results = tokens.split(/\s*,\s*/)
    for (let i = 0; i < results.length; i++) {
      const [token, secret] = results[i]?.split(':') ?? []
      const timestamp = Date.now()
      const sign = createHmac('sha256', secret)
        .update(`${timestamp}\n${secret}`)
        .digest('base64')
      const requestUrl = `https://oapi.dingtalk.com/robot/send?access_token=${token}&timestamp=${timestamp}&sign=${sign}`
      const response = await axios.post(
        requestUrl,
        JSON.stringify({
          msgtype: 'markdown',
          markdown: {
            title: ReleaseTitle,
            text: content,
          },
          at: {
            isAtAll: true,
          },
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      debug(`Result is ${response.data.errcode}, ${response.data.errmsg}.`)
      if (response.data.errcode === 310000) {
        debug(`Send Failed: ${response.data}`)
        debug(`Please check safe config : ${response.data}`)
      }
    }
  }
}
