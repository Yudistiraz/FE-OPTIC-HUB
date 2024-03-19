import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'

interface LoadingProps {
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

export default function LoadingCircular({ color = 'primary' }: LoadingProps) {
  return (
    <Box className="tw-flex tw-justify-center tw-items-center tw-min-h-[100%]">
      <CircularProgress color={color} />
    </Box>
  )
}
