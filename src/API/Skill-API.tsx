import axios from 'axios'
import { SkillsTypes } from '../types/skills-types'

const baseUrl = 'http://localhost:3000'

export const PostSkill = async (data: SkillsTypes) => {
  const skill = await axios.post(`${baseUrl}/skill/post`, data)
  return skill
}

export const FetchSkills = async () => {
  const skill = await axios.get(`${baseUrl}/skill/post`)
  return skill
}

export const DeleteSkills = async (_id: string) => {
  const skill = await axios.delete(`${baseUrl}/skill/post/${_id}`)
  return skill
}

export const UpdateSkills = async (_id: string, data: SkillsTypes) => {
  const skill = await axios
    .patch(`${baseUrl}/skill/post/${_id}`, data)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  return skill
}
