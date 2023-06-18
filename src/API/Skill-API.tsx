import axios from 'axios'
import { SkillsTypes } from '../types/skills-types'

const baseUrl = 'http://localhost:3000'

export const PostSkill = async (data: SkillsTypes) => {
  const skill = await axios.post(`${baseUrl}/skill/post`, data)
  return skill
}
