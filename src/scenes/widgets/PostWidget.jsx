import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material'
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FlexBetween from '../../components/FlexBetween'
import Friend from '../../components/Friend'
// import { setPost } from '../../state/'
import { setPost } from 'state' // !
import WidgetWrapper from '../../components/WidgetWrapper'

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  // console.log('picturePath', picturePath) //  picturePath post5.jpeg // post img?
  // console.log('userPicturePath', userPicturePath) // userPicturePath p8.jpeg // user img? http://localhost:3001/assets/p3.jpeg

  const [isComments, setIsComments] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token) // !
  const loggedInUserId = useSelector((state) => state.user._id)
  const isLiked = Boolean(likes[loggedInUserId]) // in backend Posts' likes is Map {}
  // backend each post has: likes = { 'userId123: true, userId456: true}, check if it exists, liked or not
  const likeCount = Object.keys(likes).length // !

  const { palette } = useTheme()
  const neutral = palette.neutral.main // gray
  const primary = palette.primary.main // cyan

  const patchLike = async () => {
    try {
      // const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/like`,
        {
          method: 'PATCH',
          // TODO: wrapper for repeat Bearer etc.?
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: loggedInUserId }), // ! backend keep track whether current userid has liked the post
        }
      )
      const updatedPost = await response.json()
      // dispatch(setPost(updatedPost))
      dispatch(setPost({ post: updatedPost })) // !
    } catch (error) {
      console.log('patchLike error:', error)
      alert('patchLike error')
    }
  }

  return (
    // <Box
    //   mb='1.5rem'
    //   p='1rem'
    //   borderRadius='0.75rem'
    //   backgroundColor={palette.background.alt}
    // >
    <WidgetWrapper mb='2rem'>
      {/* PostWidget */}
      {/* AUTHOR INFO */}
      <Friend
        friendId={postUserId} // !
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      {/* POST */}
      <Typography color={neutral} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {/* PICTURE */}
      {picturePath && (
        <img
          // src={`http://localhost:3001/assets/${picturePath}`} // !
          src={`${process.env.REACT_APP_API_URL}/assets/${picturePath}`} // !
          alt='post'
          width='100%'
          height='auto'
          style={{
            borderRadius: '0.75rem',
            marginTop: '0.75rem',
          }}
        />
      )}
      {/* POST ACTIONS */}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          {/* LIKE */}
          {/* <FlexBetween gap='0.3rem'> */}
          <FlexBetween>
            <IconButton onClick={patchLike}>
              {/* // ! */}
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/* OPEN/CLOSE COMMENTS */}
          {/* <FlexBetween gap='0.3rem'> */}
          <FlexBetween>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        {/*  */}
        <IconButton>
          <ShareOutlined sx={{ color: neutral }} />
        </IconButton>
      </FlexBetween>
      {/* COMMENTS */}
      {isComments && (
        <Box mt='0.5rem'>
          {comments.map((comment, index) => (
            // COMMENT
            <Box key={`${name}-${index}`}>
              <Divider />
              <Typography sx={{ color: neutral, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      {/* <Divider margin='1rem' /> */}
      {/* <Divider sx={{ margin: '1.5rem 0' }} /> */}
    </WidgetWrapper>
  )
}

export default PostWidget
