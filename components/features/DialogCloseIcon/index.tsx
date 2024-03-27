import { Close as CloseIcon } from '@mui/icons-material'

interface DialogCloseIconProps {
  onClick?: () => void
}

function DialogCloseIcon({ onClick = () => {} }: DialogCloseIconProps) {
  return (
    <div className="tw-flex tw-justify-end tw-mb-1">
      <CloseIcon
        className="!tw-text-black-500 tw-cursor-pointer"
        onClick={() => onClick()}
      />
    </div>
  )
}

export default DialogCloseIcon
