import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { Popover } from "@radix-ui/themes";
import { Calendar } from "lucide-react";
import { Button } from "../Button/Button";
import { TextField } from "../TextField/TextField";
import s from "./DatePicker.module.css";

import "react-day-picker/style.css";

interface DatePickerProps extends Omit<
  React.ComponentProps<typeof TextField.Root>,
  "onChange" | "value" | "color"
> {
  value?: Date | null;
  /** Date format function. Default: yyyy-MM-dd */
  formatDate?: (date: Date) => string;
  /** Date parse function. Default: parses yyyy-MM-dd */
  parseDate?: (str: string) => Date | null;
  /** Optional props passed to internal DayPicker */
  pickerProps?: Omit<
    React.ComponentProps<typeof DayPicker>,
    "onSelect" | "selected" | "mode"
  >;
  onChange?: (v: Date | null) => void;
}

function defaultFormatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function defaultParseDate(str: string): Date | null {
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return isNaN(date.getTime()) ? null : date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  value = null,
  pickerProps,
  formatDate: formatFn = defaultFormatDate,
  parseDate: parseFn = defaultParseDate,
  disabled = false,
  ...rest
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [rawValue, setRawValue] = useState("");
  const [curatedValue, setCuratedValue] = useState<Date | null>(null);
  const [activeMonth, setActiveMonth] = useState<Date>(new Date());

  useEffect(() => {
    tryToSetValue(value);
  }, []);

  // Sync internal state when external value changes
  useEffect(() => {
    if (value === null && curatedValue !== null) {
      setRawValue("");
      setCuratedValue(null);
    } else if (value && value.valueOf() !== curatedValue?.valueOf()) {
      setRawValue(formatFn(value));
      setCuratedValue(value);
      setActiveMonth(value);
    }
  }, [value]);

  function setValue(v: Date | null) {
    if ((!v || isNaN(v.valueOf())) && v !== curatedValue) {
      setCuratedValue(null);
      onChange?.(null);
    } else if (v && v.valueOf() !== curatedValue?.valueOf()) {
      setCuratedValue(v);
      onChange?.(v);
      setActiveMonth(v);
    }
  }

  function tryToSetValue(newValue: Date | string | null | undefined) {
    if (newValue instanceof Date) {
      setRawValue(formatFn(newValue));
      setValue(newValue);
    } else if (typeof newValue === "string") {
      setRawValue(newValue);
      if (newValue === "") {
        setValue(null);
      } else {
        const parsed = parseFn(newValue);
        setValue(parsed);
      }
    } else {
      setRawValue("");
      setValue(null);
    }
  }

  function handleKeyUp(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setShowPicker(false);
    }
  }

  useEffect(() => {
    if (disabled) {
      setShowPicker(false);
    }
  }, [disabled]);

  return (
    <div className={s.DatePicker}>
      <Popover.Root
        open={disabled ? false : showPicker}
        onOpenChange={(open) => {
          if (!disabled) setShowPicker(open);
        }}
      >
        <TextField.Root
          {...rest}
          disabled={disabled}
          value={rawValue}
          onChange={(e) => tryToSetValue(e.currentTarget.value)}
          onKeyUp={handleKeyUp}
          onClick={() => { if (!disabled) setShowPicker(true); }}
          onFocus={() => { if (!disabled) setShowPicker(true); }}
        >
          <TextField.Slot side="right" className={s.Slot}>
            {/* @ts-ignore - asChild works at runtime but missing from Radix types */}
            <Popover.Trigger asChild>
              <Button
                icon={Calendar}
                variant="ghost"
                aria-label="Toggle calendar"
                disabled={disabled}
                className={s.CalendarButton}
              />
            </Popover.Trigger>
          </TextField.Slot>
        </TextField.Root>

        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={8}
          onKeyUp={handleKeyUp}
          className={s.PopoverContent}
        >
          <DayPicker
            {...pickerProps}
            mode="single"
            onSelect={(selectedDay: Date | undefined) => {
              tryToSetValue(selectedDay ?? null);
              setShowPicker(false);
            }}
            onMonthChange={setActiveMonth}
            selected={curatedValue || undefined}
            month={activeMonth}
          />
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export type { DatePickerProps };
