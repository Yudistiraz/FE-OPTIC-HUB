import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  ClickAwayListener,
  Grow,
  MenuList,
  MenuItem,
  Paper,
  Popper,
  Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import { PHONE_PREFIX } from '@/utils/constants'

interface PrefixProps {
  item: string
  onChange: (value: string) => void
}

export default function PhoneCodeMenu({ item, onChange }: PrefixProps) {
  const [open, setOpen] = useState<boolean>(false)
  const anchorRef = useRef<HTMLDivElement | null>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  // event: Event | React.SyntheticEvent
  const onHandleChange = (selectedPrefix: string) => {
    setOpen(false)
    onChange(selectedPrefix)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div className="tw-cursor-pointer tw-z-50">
      <div
        className="tw-flex tw-justify-center tw-items-center tw-gap-x-1 tw-mr-2"
        onClick={handleToggle}
      >
        <Typography ref={anchorRef} variant="subtitle2Reg">
          {item}
        </Typography>

        <KeyboardArrowDownIcon fontSize="small" />
      </div>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {PHONE_PREFIX.map((prefix, index) => {
                    return (
                      <MenuItem
                        key={`prefix-${index}`}
                        value={prefix.value}
                        onClick={() => onHandleChange(prefix.value)}
                      >
                        <Typography variant="subtitle2Reg">
                          {prefix.label} ({prefix.value})
                        </Typography>
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
