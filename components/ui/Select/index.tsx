import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface optionsProps {
  label: string;
  value: string;
}

interface TextFieldProps {
  label?: string;
  // defaultValue?: { label: string; value: string }
  disabled?: boolean;
  placeholder?: string;
  name: string;
  value: string;
  options: optionsProps[] | [];
  helperText?: string;
  error?: boolean;
  variant?: "filled" | "outlined" | "standard";
  classNamees?: string;
  fullWidth?: boolean;
  allOption?: string;
  notes?: string;
  // onChange: (event: SelectChangeEvent) => void
  onChange: (option: optionsProps) => void; // Pass the selected option as well
}

function CustomDropdown({
  label,
  placeholder,
  name,
  value,
  options = [],
  helperText,
  error = false,
  // defaultValue = { label: '', value: '' },
  disabled = false,
  onChange,
  variant = "outlined",
  classNamees = "",
  fullWidth = false,
  allOption = "",
  notes = "",
  ...rest
}: TextFieldProps) {
  // const onHandleChange = (event: SelectChangeEvent) => {
  //   onChange(event)
  // }

  const onHandleChange = (event: SelectChangeEvent) => {
    const selectedValue = options.find(
      (option) => option.value === event.target.value
    );
    const selectedOption = selectedValue || { label: "", value: "" };
    onChange(selectedOption);
  };

  return (
    <div className={`${fullWidth && "tw-w-full"}`}>
      {label && (
        <div>
          <Typography variant="labelSmall" className="tw-text-gray-600">
            {label}
          </Typography>
        </div>
      )}

      <Select
        MenuProps={{ disableScrollLock: true }}
        fullWidth
        className={classNamees}
        variant={variant}
        name={name}
        value={value}
        displayEmpty
        placeholder={placeholder}
        // defaultValue={defaultValue.value}
        disabled={disabled}
        error={error}
        onChange={onHandleChange}
        renderValue={() => {
          const item = options.find(({ value: v }) => v === value);
          if (allOption.length > 0 && !item) {
            return allOption;
          }
          return (
            item?.label || (
              <Typography variant="body1" color="#B5B5C4">
                {placeholder}
              </Typography>
            )
          );
        }}
        {...rest}
      >
        {allOption.length > 0 && <MenuItem value={""}>{allOption}</MenuItem>}
        {(options || []).map((option, index) => {
          return (
            <MenuItem key={`options-${index}`} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>

      {error && (
        <Typography variant="helperText" className="text-danger">
          {helperText}
        </Typography>
      )}

      {notes && (
        <Typography variant="helperText" color="#50565C">
          {notes}
        </Typography>
      )}
    </div>
  );
}

export default CustomDropdown;
