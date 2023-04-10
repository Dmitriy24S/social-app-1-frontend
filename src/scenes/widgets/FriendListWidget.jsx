import { Box, Typography, useTheme } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Friend from '../../components/Friend'
import WidgetWrapper from '../../components/WidgetWrapper'
import { setFriends } from '../../state'

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)
  //   const { friends } = useSelector((state) => state.user)
  const { palette } = useTheme()

  // not just use from user, because will be used when open other user profiles so not only current user
  const getFriends = async () => {
    try {
      // const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${userId}/friends`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      console.log('Friend:ist getFriends data:', data) // []
      // [
      //     {
      //         "_id": "6405a9ae4e4d5865bc7d1456",
      //         "firstName": "test1",
      //         "lastName": "test1",
      //         "occupation": "test1",
      //         "location": "test1",
      //         "picturePath": "p3.jpeg"
      //     }
      // ]
      dispatch(setFriends({ friends: data }))
    } catch (error) {
      console.log('Error getFriends', error)
      alert('Error getFriends')
    }
  }

  useEffect(() => {
    getFriends()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant='h5'
        fontWeight={500}
        sx={{ mb: '1.5rem' }}
      >
        Friend List
      </Typography>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            // subtitle={friend.location}
            subtitle={friend.occupation}
            // userPicturePath={friend.userPicturePath} // ! src="http://localhost:3001/assets/undefined"
            userPicturePath={friend.picturePath} // !
          />
        ))}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendListWidget
