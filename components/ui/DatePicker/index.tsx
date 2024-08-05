import { Box, Typography } from "@mui/material";
import { DatePicker, DatePickerToolbarProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

import { checkDateValidity } from "@/utils/function";

type DatePickerActions = "clear" | "today";

interface DatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onDateChange: (newValue: Dayjs | null, name: string) => void;
  toolbarLabel?: string;
  orientation?: "portrait" | "landscape";
  disableFuture?: boolean;
  disablePast?: boolean;
  className?: string;
  helperText?: string;
  disabled?: boolean;
  isFieldReadOnly?: boolean;
  fullWidth?: boolean;
  dateFormat?: string;
  moreActions?: DatePickerActions[];
  format?: string;
  positionTop?: boolean;
  error?: boolean;
  popperHeight?: string;
}

export default function CustomDatePicker({
  name,
  label,
  placeholder,
  value,
  onDateChange,
  toolbarLabel = "Select Date",
  orientation = "portrait",
  disableFuture = false,
  disablePast = false,
  className = "",
  helperText = "",
  disabled = false,
  isFieldReadOnly = false,
  moreActions = [],
  fullWidth = false,
  dateFormat = "MMM DD, YYYY",
  format = "MM/DD/YYYY",
  positionTop,
  error,
  popperHeight = "350px",
}: DatePickerProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleSetOpen = () => {
    setOpen(!open);
  };

  // DatePickerToolbar
  const CustomToolbar = (props: DatePickerToolbarProps<Dayjs>) => {
    const { className, value } = props;

    const renderToolbarValue = () => {
      const isDateValid = checkDateValidity(dayjs(value));
      if (!value || !isDateValid) return "-- --";
      else {
        return dayjs(value).format(dateFormat);
      }
    };

    return (
      <Box
        // Pass the className to the root element to get correct layout
        className={`tw-mx-6 tw-pt-4 ${className}`}
      >
        <div className="tw-flex tw-flex-col">
          <Typography variant="subtitle1Reg" className="tw-mb-3">
            {toolbarLabel}
          </Typography>

          <Typography variant="display2">{renderToolbarValue()}</Typography>
        </div>
      </Box>
    );
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

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-au">
        <DatePicker
          className={`tw-w-[100%] ${className}`}
          value={value ? dayjs(value) : null}
          slots={{
            toolbar: CustomToolbar,
          }}
          slotProps={{
            popper: {
              placement: positionTop ? "top-start" : "bottom-start",
              sx: {
                height: popperHeight,
                overflowY: "auto",
              },
              className: "no-scrollbar",
            },
            actionBar: {
              actions: [...moreActions, "cancel", "accept"],
            },
            textField: {
              error: error,
              helperText: helperText,
              ...(placeholder && { placeholder: placeholder }),
              FormHelperTextProps: { style: { marginLeft: 0 } },
            },
            field: {
              readOnly: isFieldReadOnly,
            },
          }}
          showDaysOutsideCurrentMonth
          disableFuture={disableFuture}
          disablePast={disablePast}
          orientation={orientation}
          onChange={(newValue) => {
            onDateChange(newValue, name); // to accomodate change from keyboard input
          }}
          onAccept={(newValue) => {
            onDateChange(newValue, name); // handle on date change onAccept Click
            handleSetOpen();
          }}
          open={open}
          onOpen={() => handleSetOpen()}
          onClose={() => handleSetOpen()}
          // closeOnSelect={false} // keep the datepicker open until user interacts with actions
          disabled={disabled}
          format={format}
        />
      </LocalizationProvider>
    </div>
  );
}
