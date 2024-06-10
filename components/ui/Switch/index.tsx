import { useLanguage } from "@/context/Language";
import { FormHelperText, Switch, Typography } from "@mui/material";
import { useState } from "react";

interface CustomSwitchProps {
  label: string;
  name: string;
  disabled?: boolean;
  className?: string;
  activeText?: string;
  inactiveText?: string;
  helperText?: string;
  value: boolean;
  onChange: (value: boolean) => void; // Fix the function type
}

function CustomSwitch({
  label,
  name,
  onChange,
  disabled = false,
  activeText = "",
  inactiveText = "",
  className = "",
  helperText = "",
  value = false,
  ...rest
}: CustomSwitchProps) {
  const [checked, SetChecked] = useState(value);
  const { translations } = useLanguage();
  return (
    <div className="tw-w-full">
      {label && (
        <div>
          <Typography
            variant="labelSmall"
            className="!tw-text-gray-600 tw-uppercase"
          >
            {label}
          </Typography>
        </div>
      )}

      <div className="tw-flex tw-items-center tw-gap-4">
        <Switch
          className={className}
          name={name}
          disabled={disabled}
          onChange={() => {
            SetChecked(!checked);
            onChange(!checked);
          }}
          checked={checked}
          {...rest}
        />
        <Typography variant="labelSmall">
          {checked
            ? activeText || translations?.badgeText?.active
            : inactiveText || translations?.badgeText?.inactive}
        </Typography>
      </div>

      {helperText.length > 0 && (
        <FormHelperText error className="tw-italic tw-mx-0">
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
}

export default CustomSwitch;
