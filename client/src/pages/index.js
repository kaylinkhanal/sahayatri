import React from 'react'
import Banner from '@/components/Banner'
import {useSelector} from 'react-redux'
import Home from './home'
import Layout from '@/components/Layout'

const index = () => {
  const {isLoggedIn} = useSelector(state => state.user)
  if(isLoggedIn){
    return <Home/>
  }
  return (
    <>
    <Layout>
      <Banner />
    </Layout>
    </>
  )
}

export default index

