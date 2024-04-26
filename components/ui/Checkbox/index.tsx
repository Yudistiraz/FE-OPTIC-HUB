import { Checkbox, FormHelperText, Typography } from "@mui/material";
import { useState } from "react";

interface CustomCheckboxProps {
  label: string;
  name: string;
  disabled?: boolean;
  className?: string;
  helperText?: string;
  value: boolean;
  onChange: (value: boolean) => void; // Fix the function type
}

function CustomCheckbox({
  label,
  name,
  onChange,
  disabled = false,
  className = "",
  helperText = "",
  value = false,
  ...rest
}: CustomCheckboxProps) {
  const [checked, SetChecked] = useState(value);

  return (
    <div className="tw-w-full">
      <div className="tw-flex tw-items-center tw-gap-2">
        <Checkbox
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
      </div>

      {helperText.length > 0 && (
        <FormHelperText error className="tw-italic tw-mx-0">
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
}

export default CustomCheckbox;
