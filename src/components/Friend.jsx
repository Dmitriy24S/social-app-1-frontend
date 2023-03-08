import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFriends } from '../state'
import FlexBetween from './FlexBetween'
import UserImage from './UserImage'

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const friends = useSelector((state) => state.user.friends)

  const { palette } = useTheme()
  const primaryLight = palette.primary.light // cyan
  const primaryDark = palette.primary.dark // muted cyan
  const main = palette.primary.main // cyan
  const medium = palette.neutral.medium // muted gray

  const isFriend = friends.find((friend) => friend._id === friendId)

  const patchFriend = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // !
      },
    })
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={userPicturePath} size='55px' />
        {/* // ! */}
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`)
            navigate(0) // ! quick fix to refresh page, after 2nd user profile redirect url & page content refresh?
          }}
        >
          {/* NAME */}
          <Typography
            color={main} // cyan
            variant='h5'
            fontWeight='500'
            sx={{
              '&:hover': {
                color: palette.primary.light, // muted cyan
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          {/* LOCATION */}
          <Typography color={medium} fontSize='0.75rem'>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {/* Add/Remove FRIEND Icon Button */}
      <IconButton
        onClick={() => patchFriend()}
        sx={{
          backgroundColor: primaryLight, // cyan, hover: dark circle
          p: '0.6rem',
        }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} /> // muted cyan svg inside
        ) : (
          // <PersonRemoveOutlined /> // white svg inside
          <PersonAddOutlined sx={{ color: primaryDark }} /> // muted cyan svg inside
          // <PersonAddOutlined /> // white svg inside
        )}
      </IconButton>
    </FlexBetween>
  )
}

export default Friend
