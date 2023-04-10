import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../navbar'
import AdvertWidget from '../widgets/AdvertWidget'
import CreatePostWidget from '../widgets/CreatePostWidget'
import FriendListWidget from '../widgets/FriendListWidget'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'

const ProfilePage = () => {
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
  console.log('isNonMobileScreen:', isNonMobileScreen)
  const token = useSelector((state) => state.token) // !
  // const userId = useSelector((state) => state.user._id)
  const { _id, picturePath } = useSelector((state) => state.user) // ! this time not logged in user, url user therefore:
  const { userId } = useParams() // selected userId
  const [user, setUser] = useState(null)
  console.log('state user _id', _id, 'url params userId', userId)

  const getUser = async () => {
    try {
      // const response = await fetch(`http://localhost:3001/users/${userId}`, {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      console.log('profilePage getUser data:', data)
      setUser(data)
    } catch (error) {
      console.log('trycatch error:', error)
    }
  }

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) return null // ! prevent page crash otherwise?

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        // width={isNonMobileScreen ? '100%' : '60%'}
        maxWidth={isNonMobileScreen ? undefined : '550px'}
        margin='0 auto'
        // padding='2rem 6%'
        padding='2rem 1rem'
        display={isNonMobileScreen ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='space-between'
      >
        {/* <h1>HomePage</h1> */}
        {/* USER INFO */}
        <Box
          flexBasis={isNonMobileScreen ? '26%' : undefined} // !
        >
          {/* <UserWidget userId={user._id} picturePath={user.picturePath} /> */}
          <UserWidget userId={userId} picturePath={user.picturePath} />
        </Box>
        {/* POSTS */}
        <Box
          flexBasis={isNonMobileScreen ? '42%' : undefined}
          mt={isNonMobileScreen ? undefined : '2rem'}
          // on smaller screen stacked give spacing?
        >
          {/* Posts Widget */}
          {_id === userId && <CreatePostWidget picturePath={picturePath} />}
          <PostsWidget userId={userId} isProfile />
        </Box>
        {/* ADVERT */}
        {/* FRIEND LIST DESKTOP ONLY? */}
        {/* {isNonMobileScreen && ( */}
        <Box flexBasis={isNonMobileScreen ? '26%' : undefined}>
          <AdvertWidget />
          <Box m='2rem 0'>
            {/* Friends Widgets */}
            <FriendListWidget userId={userId} />
            {/* // ! userId: selected profile userId (
            {/* // ! _id: logged in user */}
          </Box>
        </Box>
        {/* )} */}
      </Box>
    </Box>
  )
}

export default ProfilePage
