import React, { useState, useRef, useEffect } from "react";
import { TextField as RadixTextField, Popover, Button } from "@radix-ui/themes";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export interface DatePickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  size?: "1" | "2" | "3";
  locale?: string;
}

const DAYS_SV = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDate(str: string): Date | null {
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return isNaN(date.getTime()) ? null : date;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DatePicker: React.FC<DatePickerProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "YYYY-MM-DD",
  size = "2",
}) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const value = controlledValue ?? internalValue;

  const selected = parseDate(value);
  const [viewYear, setViewYear] = useState(
    selected?.getFullYear() ?? new Date().getFullYear(),
  );
  const [viewMonth, setViewMonth] = useState(
    selected?.getMonth() ?? new Date().getMonth(),
  );

  const days = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfWeek = (days[0].getDay() + 6) % 7; // Monday = 0

  const handleSelect = (date: Date) => {
    const formatted = formatDate(date);
    if (controlledValue === undefined) {
      setInternalValue(formatted);
    }
    onChange?.(formatted);
    setOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <RadixTextField.Root
          size={size}
          value={value}
          placeholder={placeholder}
          readOnly
          style={{ cursor: "pointer" }}
        >
          <RadixTextField.Slot side="right">
            <Calendar size={14} />
          </RadixTextField.Slot>
        </RadixTextField.Root>
      </Popover.Trigger>
      <Popover.Content style={{ width: 280, padding: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Button variant="ghost" color="gray" size="1" onClick={prevMonth}>
            <ChevronLeft size={14} />
          </Button>
          <span style={{ fontWeight: 600, fontSize: 14 }}>
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <Button variant="ghost" color="gray" size="1" onClick={nextMonth}>
            <ChevronRight size={14} />
          </Button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 2,
            textAlign: "center",
          }}
        >
          {DAYS_SV.map((d) => (
            <div
              key={d}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--gray-9)",
                padding: "4px 0",
              }}
            >
              {d}
            </div>
          ))}

          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {days.map((date) => {
            const isSelected =
              selected && formatDate(date) === formatDate(selected);
            const isToday = formatDate(date) === formatDate(new Date());

            return (
              <button
                key={date.getDate()}
                type="button"
                onClick={() => handleSelect(date)}
                style={{
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 0",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: isToday ? 700 : 400,
                  background: isSelected
                    ? "var(--accent-9)"
                    : "transparent",
                  color: isSelected
                    ? "white"
                    : isToday
                      ? "var(--accent-11)"
                      : "inherit",
                }}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};
