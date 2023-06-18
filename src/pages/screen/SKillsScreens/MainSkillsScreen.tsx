import React from 'react'
import MakeSkill from './MakeSkill'
const MainSkillsScreen = () => {
  const style = {
    section: `  flex items-center justify-center `,
  }
  return (
    <section className={style.section}>
      <MakeSkill />
    </section>
  )
}

export default MainSkillsScreen
