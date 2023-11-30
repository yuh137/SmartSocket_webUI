import React from 'react'
import NavBar from '../components/NavBar'
import { SortedHisTable } from '../components/SortedHisTable'
import { FilterHisTable } from '../components/FilterHisTable'

const History = () => {
  return (
    <>
      <NavBar />
      <SortedHisTable />
      {/* <FilterHisTable /> */}
    </>
  )
}

export default History