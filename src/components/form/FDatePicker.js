import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormContext, Controller } from "react-hook-form";
import dayjs from "dayjs";

function FDatePicker({ name, ...other }) {
  const startDay = dayjs("1800-01-01T00:00:00.000");
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                disableFuture
                minDate={startDay}
                format="DD/MM/YYYY"
                label="Date"
                inputRef={field.ref}
                onChange={(date) => {
                  field.onChange(date);
                }}
                slotProps={{
                  textField: {
                    helperText: error?.message,
                  },
                }}
                {...other}
              />
            </DemoContainer>
          );
        }}
      />
    </LocalizationProvider>
  );
}

export default FDatePicker;
