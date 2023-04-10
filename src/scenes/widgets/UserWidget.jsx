import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material'
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
// import UserImage from '../../components/UserImage'
import UserImage from 'components/UserImage'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null)
  const { palette } = useTheme()
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const dark = palette.neutral.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main

  const getUser = async () => {
    try {
      // const response = await fetch(`http://localhost:3001/users/${userId}`, {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      console.log('getUser data', data)
      // {
      //     "_id": "6405a9ae4e4d5865bc7d1456",
      //     "firstName": "test1",
      //     "lastName": "test1",
      //     "email": "test1@test.com",
      //     "password": "$2b$10$vrFEF3bJgUwr4TAUWpiL.e7/yTaNwiP9/s7unr1fCBi3lqEZXVky.",
      //     "picturePath": "p3.jpeg",
      //     "friends": [],
      //     "location": "test1",
      //     "occupation": "test1",
      //     "viewedProfile": 2164,
      //     "impressions": 8147,
      //     "createdAt": "2023-03-06T08:51:58.441Z",
      //     "updatedAt": "2023-03-06T08:51:58.441Z",
      //     "__v": 0
      // }
      setUser(data)
    } catch (error) {
      console.log('UserWidget, getUser error:', error)
      alert('UserWidget, getUser error')
    }
  }

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) {
    return null
  }

  // TODO: add loading state?

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap='0.5rem' pb='1.1rem'>
        <FlexBetween gap='1rem'>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant='h4'
              color={dark}
              fontWeight={500}
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
              onClick={() => navigate(`/profile/${userId}`)}
            >
              {firstName} {lastName}
            </Typography>
            {friends && (
              <Typography color={medium}>
                {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
              </Typography>
            )}
          </Box>
        </FlexBetween>
        {/* <Button> */}
        <IconButton onClick={() => navigate(`/profile/${userId}`)}>
          <ManageAccountsOutlined
            sx={{
              color: main,
            }}
          />
        </IconButton>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p='1rem 0'>
        <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
          <LocationOnOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap='1rem'>
          {/* <WorkOutlineOutlined fontSize='large' color={main} /> // ! */}
          <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      {/* medium clr = gray */}
      {/* main clr = light gray */}
      <Box p='1rem 0'>
        {/* 1rem top 0 left/right */}
        <FlexBetween mb='0.5rem' pr='0.4rem' gap='0.3rem'>
          {/* because if use IconButton have extra added spacing? add pr 0.4rem? */}
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight='500'>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween pr='0.4rem' gap='0.3rem'>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight='500'>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p='1rem 0'>
        <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>
          Social Profiles
        </Typography>
        <FlexBetween gap='1rem' mb='0.5rem'>
          <FlexBetween gap='1rem'>
            {/* <img src='../assets/twitter.png' alt='twitter' // ! /> */}
            <img src='/assets/twitter.png' alt='twitter' />
            <Box>
              <Typography color={main} fontWeight='500'>
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <IconButton>
            <EditOutlined
              sx={{
                color: main,
              }}
            />
          </IconButton>
        </FlexBetween>

        <FlexBetween gap='1rem'>
          <FlexBetween gap='1rem'>
            <img src='/assets/linkedin.png' alt='linkedin' />
            <Box>
              <Typography color={main} fontWeight='500'>
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <IconButton>
            <EditOutlined
              sx={{
                color: main,
              }}
            />
          </IconButton>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
}

export default UserWidget
