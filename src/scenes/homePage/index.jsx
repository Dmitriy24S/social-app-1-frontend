import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import Navbar from 'scenes/navbar'
import AdvertWidget from '../widgets/AdvertWidget'
import CreatePostWidget from '../widgets/CreatePostWidget'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
  console.log('isNonMobileScreen:', isNonMobileScreen)
  // const userId = useSelector((state) => state.user._id)
  const { _id, picturePath } = useSelector((state) => state.user)

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
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        {/* POSTS */}
        <Box
          flexBasis={isNonMobileScreen ? '42%' : undefined}
          mt={isNonMobileScreen ? undefined : '2rem'}
          // on smaller screen stacked give spacing?
        >
          {/* Posts Widgets */}
          <CreatePostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {/* FRIEND LIST DESKTOP ONLY? */}
        {/* {isNonMobileScreen && ( */}
        <Box flexBasis={isNonMobileScreen ? '26%' : undefined}>
          <AdvertWidget />
          Friends Widgets
        </Box>
        {/* )} */}
      </Box>
    </Box>
  )
}

export default HomePage
