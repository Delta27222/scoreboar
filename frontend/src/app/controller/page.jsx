'use client'
import React from 'react'
import { HeroScoreboard } from '../../components/controller/HeroScoreboard'
import { CardScoreboard } from '../../components/controller/CardScoreboard'

const Board = () => {
  return (
    <>
      <HeroScoreboard />
      <CardScoreboard />
    </>
  )
}

export default Board