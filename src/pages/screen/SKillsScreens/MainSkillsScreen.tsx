import React from 'react'
import MakeSkill from './MakeSkill'
import SkillsScreen from './SkillsScreen'
const MainSkillsScreen = () => {
  const style = {
    section: `  flex items-center justify-center flex-col h-[90%]`,
  }
  return (
    <section className={style.section}>
      <MakeSkill />
      <SkillsScreen />
    </section>
  )
}

export default MainSkillsScreen
