import {
  AttachFileOutlined,
  DeleteOutlined,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import FlexBetween from '../../components/FlexBetween'
import UserImage from '../../components/UserImage'
import WidgetWrapper from '../../components/WidgetWrapper'
import { setPosts } from '../../state'

const CreatePostWidget = ({ picturePath }) => {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false) // open file drop for image
  const [image, setImage] = useState(null)
  // const [image, setImage] = useState({ name: '1' })
  const [post, setPost] = useState('') // actual post content
  const { palette } = useTheme()
  const { _id } = useSelector((state) => state.user) // send to backend to know who is posting content
  const token = useSelector((state) => state.token) // used to authorize this user to call api
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)') // !
  const mediumMain = palette.neutral.mediumMain
  const medium = palette.neutral.medium // ! destructure?

  const handlePost = async () => {
    const formData = new FormData() // going to manually append again
    formData.append('userId', _id) // !
    formData.append('description', post)
    if (image) {
      formData.append('picture', image) // picture = key, 'picture' in backend, multer
      formData.append('picturePath', image.name) // !
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    const posts = await response.json() // backend returns the list of updated posts
    dispatch(setPosts({ posts })) // ! {}
    setImage(null) // reset once make api call
    setPosts('')
  }

  return (
    <WidgetWrapper>
      {/* INPUT */}
      <FlexBetween gap='1.5rem'>
        <UserImage image={picturePath} />
        <InputBase
          placeholder={`What's on your mind...`}
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>
      {/* IMAGE */}
      {isImage && (
        <Box borderRadius='5px' border={`1px solid ${medium}`} mt='1.5rem' p='1rem'>
          <Dropzone
            acceptedFiles='.jpeg,.jpg,.png'
            multiple={false}
            // onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])} // set formik picture value manually
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])} // set formik picture value manually
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p='1rem'
                  width='100%'
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  {/* // TODO: red error text & border on submit? helperText={touched.picture && errors.picture}
                   */}
                  <input {...getInputProps()} />
                  {/* {!values.picture ? ( */}
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      {/* <Typography>{values.picture.name}</Typography> */}
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    //   sx={{ width: '15%' }}
                    // ml='1rem'
                    sx={{
                      marginLeft: '0.75rem',
                    }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {/* <Divider sx={{ margin: '1.5rem 0 1.25rem ' }} /> */}
      <Divider sx={{ margin: '1.5rem 0 1rem ' }} />

      {/* <FlexBetween> */}
      <Box display='flex' gap='0.25rem'>
        <FlexBetween gap='0.25rem'>
          {/* <IconButton onClick={() => setIsImage(!isImage)} sx={{ color: mediumMain }}> */}
          <Button onClick={() => setIsImage(!isImage)} sx={{ color: mediumMain }}>
            <ImageOutlined />
            <Typography
              textTransform='capitalize'
              color={medium}
              ml='0.25rem'
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                  color: medium,
                },
              }}
            >
              Image
            </Typography>
          </Button>
        </FlexBetween>

        {isNonMobileScreen ? (
          <>
            {/* <FlexBetween gap='0.25rem'> */}
            <Button>
              <GifBoxOutlined sx={{ color: medium }} />
              {/* // ! medium / mediumMain ? */}
              <Typography
                color={mediumMain}
                marginLeft='0.25rem'
                textTransform='capitalize'
              >
                Clip
              </Typography>
            </Button>
            <Button>
              <AttachFileOutlined sx={{ color: medium }} />
              <Typography
                color={mediumMain}
                marginLeft='0.25rem'
                textTransform='capitalize'
              >
                Attachment
              </Typography>
            </Button>
            <Button>
              <MicOutlined sx={{ color: medium }} />
              <Typography
                color={mediumMain}
                marginLeft='0.25rem'
                textTransform='capitalize'
              >
                Audio
              </Typography>
            </Button>
          </>
        ) : (
          <IconButton>
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </IconButton>
        )}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: !post ? palette.primary.light : palette.primary.main,
            borderRadius: '3rem',
            marginLeft: 'auto',
          }}
        >
          POST
        </Button>
      </Box>
    </WidgetWrapper>
  )
}

export default CreatePostWidget
