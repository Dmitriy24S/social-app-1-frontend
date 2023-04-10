import { Box } from '@mui/material'

const UserImage = ({ image, size = '60px' }) => {
  return (
    <Box width={size} height={size}>
      <img
        // src={image}
        // src={`http://localhost:3001/assets/${image}`}
        src={`${process.env.REACT_APP_API_URL}/assets/${image}`}
        alt='user'
        width={size}
        height={size}
        style={{ objectFit: 'cover', borderRadius: '50%' }}
      />
    </Box>
  )
}

export default UserImage
