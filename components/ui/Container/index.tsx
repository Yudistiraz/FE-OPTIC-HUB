import { Container } from '@mui/material'
import type { SxProps } from '@mui/material'
import React, { ReactNode } from 'react'

interface ContainerWrapperProps {
  children: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  sx?: SxProps
  className?: string
}

function ContainerWrapper({
  children,
  maxWidth = 'xl',
  sx = { paddingTop: '32px', paddingBottom: '40px' },
  className,
}: ContainerWrapperProps) {
  return (
    <Container
      maxWidth={maxWidth}
      // style={{ paddingTop: '32px', paddingBottom: '40px' }}
      className={className}
      sx={sx}
    >
      {children}
    </Container>
  )
}

export default ContainerWrapper
