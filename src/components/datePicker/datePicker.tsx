import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import IMask, { InputMask } from 'imask';
import { useEffect, useRef, useState } from 'react';
import { CalendarType } from 'react-calendar';
import styled, { css } from 'styled-components';
import { colors, shadows } from '../../constants';
import Calendar from '../calendar/calendar';

export type DatePickerProps = {
  value: Date | null;
  onChange: (value: Date | null) => void;
  disabled?: boolean;
  isError?: boolean;
  disabledTimePicker?: boolean;
  disabledSeconds?: boolean;
  calendarType?: CalendarType;
  datePlaceholder?: string;
  timePlaceholder?: string;
  showFixedNumberOfWeeks?: boolean;
  disabledMonth?: boolean;
  disabledYear?: boolean;
  showQuickOption?: boolean;
  formatShortWeekday?:
    | ((locale: string | undefined, date: Date) => string)
    | undefined;
  isROCYear?: boolean;
  dateFormat?: string;
};

export default function DatePicker(props: DatePickerProps) {
  const {
    value,
    isError,
    disabled = false,
    disabledTimePicker = false,
    disabledSeconds = false,
    datePlaceholder,
    timePlaceholder,
    showFixedNumberOfWeeks = true,
    disabledMonth = false,
    disabledYear = false,
    showQuickOption = false,
    isROCYear = false,
    calendarType = 'gregory',
    dateFormat = isROCYear ? 'YYYY/MM/DD' : 'YYYY/MM/DD',
    onChange,
    formatShortWeekday,
  } = props;

  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [isTimeShow, setIsTimeShow] = useState(false);
  const [completedInput, setCompletedInput] = useState(false); // 確認日期與時間是否都填完
  const [completedDateInput, setCompletedDateInput] = useState(false);
  const [dateInputError, setDateInputError] = useState(false);
  const [timeInputError, setTimeInputError] = useState(false);

  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedMinute, setSelectedMinute] = useState<string>('');
  const [selectedSecond, setSelectedSecond] = useState<string>('');

  const [currentSelectedYear, setCurrentSelectedYear] =
    useState<number>();
  const [currentSelectedMonth, setCurrentSelectedMonth] =
    useState<number>();

  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const timeRefs = {
    hours: useRef<(HTMLButtonElement | null)[]>([]),
    minutes: useRef<(HTMLButtonElement | null)[]>([]),
    seconds: useRef<(HTMLButtonElement | null)[]>([]),
  };

  // date input 的 value
  const [localDateValue, setLocalDateValue] = useState<string>(
    value instanceof Date ? value.toLocaleDateString() : '',
  );

  const [dateValue, setDateValue] = useState<Value>(); // 傳到 calendar 的 value
  const [timeValue, setTimeValue] = useState<string>(
    value instanceof Date ? value.toLocaleDateString() : '',
  );

  const hour = 24;
  const minute = 60;

  // 日期的 IMask
  useEffect(() => {
    const getDynamicMask = (
      dateFormat: string,
      isROCYear: boolean,
    ): string => {
      if (!isROCYear) {
        return dateFormat.replace(/(YYYY|YY|MM|DD)/g, (match) => {
          switch (match) {
            case 'YYYY':
              return '0000';
            case 'YY':
              return '00';
            case 'MM':
              return '00';
            case 'DD':
              return '00';
            default:
              return match;
          }
        });
      } else {
        if (localDateValue[0] === '1') {
          return '000/00/00';
        } else {
          return '00/00/00';
        }
      }
    };

    if (dateInputRef.current) {
      const mask = IMask(dateInputRef.current, {
        mask: getDynamicMask(dateFormat, isROCYear),
        pattern: dateFormat,
        blocks: {
          d: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
            maxLength: 2,
          },
          m: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
          },
          Y: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 9999,
          },
        },
        onAccept: (masked: InputMask) => {
          const value = masked.value;
          setLocalDateValue(value);
        },
      });

      return () => {
        mask.destroy();
      };
    }
  }, [dateFormat, isROCYear, localDateValue]);

  // 時間的 IMask
  const timeMaskOptions = {
    mask: disabledSeconds ? '00:00' : '00:00:00',
    blocks: {
      h: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 23,
        maxLength: 2,
      },
      m: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 59,
        maxLength: 2,
      },
      s: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 59,
        maxLength: 2,
      },
    },
    onAccept: (masked: InputMask) => {
      const value = masked.value;
      setTimeValue(value);
    },
  };

  useEffect(() => {
    if (timeInputRef.current) {
      const mask = IMask(timeInputRef.current, timeMaskOptions);
      return () => {
        mask.destroy();
      };
    }
  });

  // Check 輸入的時間是否為 valid 的值
  useEffect(() => {
    const [hour, minute, second] = timeValue.split(':');

    if (
      Number(hour) > 23 ||
      Number(minute) > 59 ||
      (!disabledSeconds && Number(second) > 59 && hour && minute)
    ) {
      setTimeInputError(true);
    } else {
      setTimeInputError(false);
    }
  }, [disabledSeconds, timeValue]);

  // 自動把選擇的時間顯示在面板的正中間 (如果選擇 13:30:20，13、30 和 20 會在面板的中間)
  useEffect(() => {
    if (isTimeShow) {
      if (selectedHour && timeRefs.hours.current) {
        const hourElement =
          timeRefs.hours.current[parseInt(selectedHour)];
        if (hourElement) {
          hourElement.scrollIntoView({
            behavior: 'instant',
            block: 'center',
          });
        }
      }

      if (selectedMinute && timeRefs.minutes.current) {
        const minuteElement =
          timeRefs.minutes.current[parseInt(selectedMinute)];
        if (minuteElement) {
          minuteElement.scrollIntoView({
            behavior: 'instant',
            block: 'center',
          });
        }
      }

      if (selectedSecond && timeRefs.seconds.current) {
        const secondElement =
          timeRefs.seconds.current[parseInt(selectedSecond)];
        if (secondElement) {
          secondElement.scrollIntoView({
            behavior: 'instant',
            block: 'center',
          });
        }
      }
    }
  }, [
    isTimeShow,
    selectedHour,
    timeRefs.hours,
    selectedMinute,
    timeRefs.minutes,
    selectedSecond,
    timeRefs.seconds,
  ]);

  // 點擊白色部分關閉面板
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isCalendarShow &&
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(e.target as Node)
      ) {
        setIsCalendarShow(false);
      }

      if (
        !disabledTimePicker &&
        isTimeShow &&
        timeRef.current &&
        !timeRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(e.target as Node)
      ) {
        setIsTimeShow(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener(
        'mousedown',
        checkIfClickedOutside,
      );
    };
  });

  useEffect(() => {
    // 更新 Calendar 的面板，確保打開時是輸入的年月份
    if (localDateValue) {
      if (isROCYear) {
        const year = localDateValue.split('/')[0];
        setCurrentSelectedYear(Number(year) + 1911);
        setCurrentSelectedMonth(new Date(localDateValue).getMonth());
      } else {
        dayjs.extend(customParseFormat);
        const updatedDate = dayjs(
          localDateValue,
          dateFormat,
          true,
        ).toString();

        setCurrentSelectedYear(new Date(updatedDate).getFullYear());
        setCurrentSelectedMonth(new Date(updatedDate).getMonth());
      }
    }

    // 當填完 date 時自動 focus 到 time input
    if (completedDateInput && !timeValue) {
      timeInputRef.current?.focus();
      setIsCalendarShow(false);
      setIsTimeShow(true);
    }

    // 只有在填入 valid 的時間 input 時才會關閉 time 的面板
    if (
      !timeInputError &&
      ((timeValue.length === 8 && !disabledSeconds) ||
        (timeValue.length === 5 && disabledSeconds))
    ) {
      setIsTimeShow(false);
      setCompletedInput(true);
    }
  }, [
    completedDateInput,
    dateFormat,
    disabledSeconds,
    isROCYear,
    localDateValue,
    selectedHour,
    selectedMinute,
    selectedSecond,
    timeInputError,
    timeValue,
  ]);

  // 合併 date value 和 time value 並轉成 Date 傳出去
  useEffect(() => {
    // 當是國歷時轉成西元
    const convertROCYearToWesternYear = () => {
      const [yearValue, monthValue, dayValue] =
        localDateValue.split('/');
      const year = Number(yearValue) + 1911;
      return `${year}/${monthValue}/${dayValue}`;
    };

    if (value !== null) {
      dayjs.extend(customParseFormat);
      const updatedDate = dayjs(
        localDateValue,
        dateFormat,
        true,
      ).toString();

      if (
        !disabledTimePicker &&
        localDateValue &&
        ((disabledSeconds && timeValue.length === 5) ||
          (!disabledSeconds && timeValue.length === 8))
      ) {
        let dateTimeString;
        if (!isROCYear) {
          const parsedDate = dayjs(updatedDate).format('YYYY/MM/DD');
          dateTimeString = `${parsedDate} ${timeValue}`;
        } else {
          const dateString = convertROCYearToWesternYear();
          dateTimeString = `${dateString} ${timeValue}`;
        }

        const combinedDate = new Date(dateTimeString);
        onChange(combinedDate);
      } else if (
        !disabledTimePicker &&
        localDateValue &&
        !timeValue
      ) {
        if (!isROCYear) {
          onChange(new Date(dayjs(updatedDate).format('YYYY/MM/DD')));
        } else {
          const dateString = convertROCYearToWesternYear();
          onChange(new Date(dateString));
        }
      }

      if (disabledTimePicker && localDateValue) {
        if (!isROCYear) {
          onChange(new Date(updatedDate));
        } else {
          const dateString = convertROCYearToWesternYear();
          const combinedDate = new Date(dateString);
          onChange(combinedDate);
        }
      }
    }
  }, [
    value,
    localDateValue,
    timeValue,
    dateFormat,
    disabledTimePicker,
    isROCYear,
    onChange,
    disabledSeconds,
  ]);

  const hours: string[] = [];
  for (let i = 0; i < hour; i++) {
    hours.push(i < 10 ? `0${i}` : `${i}`);
  }

  const minutes: string[] = [];
  for (let i = 0; i < minute; i++) {
    minutes.push(i < 10 ? `0${i}` : `${i}`);
  }

  const seconds = minutes;

  const checkValidDate = (newValue: string) => {
    dayjs.extend(customParseFormat);
    return dayjs(newValue, dateFormat, true).isValid();
  };

  const checkValidROCDate = (newValue: string) => {
    const [year, month, day] = newValue.split('/');
    const westernYear = Number(year) + 1911;
    const formattedInput = `${westernYear}/${month}/${day}`;

    return dayjs(formattedInput, 'YYYY/MM/DD', true).isValid();
  };

  const invalidInput = () => {
    setDateInputError(true);
    setCompletedDateInput(false);
    setCurrentSelectedYear(undefined);
    setCurrentSelectedMonth(undefined);
  };

  const handleDateInputChange = (newValue: string) => {
    if (isEmpty(newValue)) {
      onChange(null);
      setCompletedDateInput(false);
      setLocalDateValue('');
      setDateValue(null);
      setDateInputError(false);
      setCurrentSelectedYear(undefined);
      setCurrentSelectedMonth(undefined);
      return;
    }

    setLocalDateValue(newValue);

    const validROCRegex = /^(\d{2,3})\/(\d{2})\/(\d{2})$/; // Regex for formats like 112/11/11 or 92/01/01

    try {
      // check 西元
      if (newValue.length === dateFormat.length && !isROCYear) {
        // 不直接用 new Date(newValue) 是因為 Date() 不支援 DD/MM/YYYY 等 DD 在前面的 format
        dayjs.extend(customParseFormat);
        const updatedDate = dayjs(
          newValue,
          dateFormat,
          true,
        ).toString();

        if (checkValidDate(newValue)) {
          setCompletedDateInput(true);
          setDateInputError(false);
          onChange(new Date(updatedDate));
          setDateValue(new Date(updatedDate));
        } else {
          invalidInput();
        }
      } else if (
        completedDateInput &&
        newValue.length !== dateFormat.length
      ) {
        setCompletedDateInput(false);
      }

      // check 國歷
      if (isROCYear && validROCRegex.test(newValue)) {
        if (checkValidROCDate(newValue)) {
          setCompletedDateInput(true);

          // 將國歷轉成西元
          const [yearValue, monthValue, dayValue] =
            newValue.split('/');
          const year = Number(yearValue) + 1911;
          const formattedFullDate = new Date(
            year,
            Number(monthValue) - 1,
            Number(dayValue),
          );

          setDateValue(formattedFullDate);
          onChange(formattedFullDate);
          setDateInputError(false);
        } else {
          invalidInput();
        }
      }
    } catch (e) {
      // 輸入 invalid 日期時，console 會出現 date 的 RangeError
      if (e instanceof RangeError) {
        setDateInputError(true);
      }
    }
  };

  const handleTimeInputChange = (newValue: string) => {
    setTimeValue(newValue);

    if (isEmpty(newValue)) {
      setSelectedHour('');
      setSelectedMinute('');
      setSelectedSecond('');
      setCompletedInput(false);
    }

    if (
      (newValue.length < 8 && !disabledSeconds) ||
      (newValue.length < 5 && disabledSeconds)
    ) {
      setCompletedInput(false);
      setIsTimeShow(true);
    }

    // 打字時更新面板的值
    if (newValue.length === 2) {
      setSelectedHour(newValue);
    } else if (newValue.length === 5) {
      setSelectedMinute(newValue.substring(3, 5));
    } else if (newValue.length === 8) {
      setSelectedSecond(newValue.substring(6, 8));
    }

    const [hour = '', minute = '', second = ''] = newValue.split(':');
    if (!disabledSeconds) {
      if (hour) setSelectedHour(hour);
      if (minute) setSelectedMinute(minute);
      if (second) {
        setSelectedSecond(second);
      }
    } else {
      if (hour) setSelectedHour(hour);
      if (minute) setSelectedMinute(minute);
    }
  };

  const handleCalendarPickerChange = (newValue: Value) => {
    if (newValue instanceof Date) {
      if (!isROCYear) {
        const formattedDate = dayjs(newValue).format(dateFormat);
        setLocalDateValue(formattedDate);
      } else {
        const year = newValue.getFullYear() - 1911;
        const month = newValue.getMonth() + 1;
        const day = newValue.getDate();

        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;

        setLocalDateValue(
          `${year}/${formattedMonth}/${formattedDay}`,
        );
      }

      onChange(newValue);
      setDateValue(newValue);
      setIsCalendarShow(false);
      setIsTimeShow(true);
      setCompletedDateInput(true);
      setDateInputError(false);
    }
  };

  const isEmpty = (value: string) => {
    return value.length === 0;
  };

  const handleTimePickerChange = (time: string, newValue: string) => {
    const formattedValue = newValue.padStart(2, '');

    let updatedHour = selectedHour;
    let updatedMinute = selectedMinute;
    let updatedSecond = selectedSecond;

    if (time === 'hour') {
      setSelectedHour(formattedValue);
      updatedHour = formattedValue;
    } else if (time === 'minute') {
      setSelectedMinute(formattedValue);
      updatedMinute = formattedValue;
    } else if (time === 'second') {
      setSelectedSecond(formattedValue);
      updatedSecond = formattedValue;
    }

    const timeParts = [
      updatedHour,
      updatedMinute,
      updatedSecond,
    ].filter((part) => !isEmpty(part));

    const updatedTimeValue = timeParts.join(':');

    setTimeValue(updatedTimeValue);
  };

  const toggleDateDropdown = () => {
    if (isTimeShow) {
      setIsTimeShow(false);
      setIsCalendarShow(true);
    } else {
      setIsCalendarShow(!isCalendarShow);
    }
  };

  const toggleTimeDropdown = () => {
    if (isCalendarShow) {
      setIsCalendarShow(false);
      setIsTimeShow(true);
    }
    if (
      !isCalendarShow &&
      localDateValue &&
      !timeValue &&
      isTimeShow
    ) {
      setIsTimeShow(true);
    } else {
      setIsTimeShow(!isTimeShow);
    }
  };

  const handleClear = () => {
    onChange(null);
    setDateValue(null);
    setLocalDateValue('');
    setTimeValue('');
    setSelectedHour('');
    setSelectedMinute('');
    setSelectedSecond('');
    setIsCalendarShow(false);
    setIsTimeShow(false);
    setCompletedInput(false);
    setCurrentSelectedYear(undefined);
    setCurrentSelectedMonth(undefined);
    setCompletedDateInput(false);
    setDateInputError(false);
  };

  const handleTimePicker = () => {
    return (
      isTimeShow || completedInput || timeValue || completedDateInput
    );
  };

  const handleTimeInputBlur = () => {
    if (
      timeValue &&
      ((!disabledSeconds && timeValue.length !== 8) ||
        (disabledSeconds && timeValue.length !== 5))
    ) {
      setTimeInputError(true);
    } else {
      setTimeInputError(false);
    }
  };

  const handleDateInputBlur = () => {
    if (localDateValue && !completedDateInput) {
      setDateInputError(true);
    } else {
      setDateInputError(false);
    }
  };

  return (
    <>
      <Container
        ref={inputRef}
        $isFocus={isCalendarShow || isTimeShow}
        $isError={isError || dateInputError || timeInputError}
        $disabled={disabled}
      >
        <InputContainer>
          <CalendarInput
            ref={dateInputRef}
            onClick={toggleDateDropdown}
            value={localDateValue}
            onInput={(e) =>
              handleDateInputChange(e.currentTarget.value)
            }
            onBlur={() => handleDateInputBlur()}
            placeholder={datePlaceholder}
            disabled={disabled}
            $isTimeActive={isTimeShow}
          />

          {!disabledTimePicker && handleTimePicker() && (
            <TimeInput
              ref={timeInputRef}
              onClick={toggleTimeDropdown}
              value={timeValue}
              onInput={(e) =>
                handleTimeInputChange(e.currentTarget.value)
              }
              onBlur={() => handleTimeInputBlur()}
              placeholder={timePlaceholder}
              disabled={disabled}
            />
          )}
        </InputContainer>

        <IconContainer ref={iconRef}>
          {localDateValue ? (
            <div onClick={handleClear}>
              <RemovedIcon />
            </div>
          ) : (
            <div
              onClick={() => {
                setIsCalendarShow(!isCalendarShow);
                setIsTimeShow(false);
              }}
            >
              <CalendarIcon />
            </div>
          )}
        </IconContainer>
      </Container>

      {isCalendarShow && (
        <CalendarContainer
          ref={calendarRef}
          $isQuickOptionShow={showQuickOption}
        >
          <Calendar
            value={dateValue}
            onChange={handleCalendarPickerChange}
            showFixedNumberOfWeeks={showFixedNumberOfWeeks}
            formatShortWeekday={formatShortWeekday}
            calendarType={calendarType}
            disabledMonth={disabledMonth}
            disabledYear={disabledYear}
            isROCYear={isROCYear}
            selectedYear={isROCYear ? undefined : currentSelectedYear}
            selectedROCYear={
              isROCYear ? currentSelectedYear : undefined
            }
            selectedMonth={currentSelectedMonth}
            showQuickOption={showQuickOption}
          />
        </CalendarContainer>
      )}

      {isTimeShow && !disabledTimePicker && (
        <TimeContainer
          ref={timeRef}
          $disabledSecondsOption={disabledSeconds}
        >
          <HourContainer>
            {hours.map((eachHour, index) => (
              <EachButtonContainer key={index}>
                <EachButton
                  $isActive={eachHour === selectedHour}
                  onClick={() =>
                    handleTimePickerChange('hour', eachHour)
                  }
                  ref={(element) =>
                    (timeRefs.hours.current[index] = element)
                  }
                >
                  {eachHour}
                </EachButton>
              </EachButtonContainer>
            ))}
          </HourContainer>
          <MinuteContainer $disabled={disabledSeconds}>
            {minutes.map((eachMinute, index) => (
              <EachButtonContainer key={index}>
                <EachButton
                  $isActive={eachMinute === selectedMinute}
                  onClick={() =>
                    handleTimePickerChange('minute', eachMinute)
                  }
                  ref={(element) =>
                    (timeRefs.minutes.current[index] = element)
                  }
                >
                  {eachMinute}
                </EachButton>
              </EachButtonContainer>
            ))}
          </MinuteContainer>
          {!disabledSeconds && (
            <SecondContainer>
              {seconds.map((eachSecond, index) => (
                <EachButtonContainer key={index}>
                  <EachButton
                    $isActive={eachSecond === selectedSecond}
                    onClick={() =>
                      handleTimePickerChange('second', eachSecond)
                    }
                    ref={(element) =>
                      (timeRefs.seconds.current[index] = element)
                    }
                  >
                    {eachSecond}
                  </EachButton>
                </EachButtonContainer>
              ))}
            </SecondContainer>
          )}
        </TimeContainer>
      )}
    </>
  );
}

DatePicker.displayName = 'DatePicker';

/* --------------------------------- Style --------------------------------- */
type TimeProp = { $isActive: boolean };
type DateInputProp = { $isTimeActive: boolean };
type TimePickerProp = { $disabledSecondsOption: boolean };

const Container = styled.div<{
  $disabled?: boolean;
  $isError?: boolean;
  $isFocus: boolean;
}>`
  display: flex;
  width: 280px;
  height: 32px;
  border: 1px solid ${colors.grayscale300};
  border-radius: 4px;
  transition: 0.2s;
  align-items: center;
  color: ${colors.grayscale500};
  background-color: ${colors.white};

  border: ${({ $isFocus }) =>
    $isFocus ? `1px solid ${colors.primary500};` : ''};

  &:hover {
    border: ${({ $isFocus }) =>
      $isFocus
        ? `1px solid ${colors.primary500};`
        : `1px solid ${colors.grayscale500}`};
  }
  &:focus-within {
    border: 1px solid ${colors.primary500};
  }

  ${({ $isError }) =>
    $isError &&
    css`
      border: 1px solid ${colors.alarm500};
      &:hover,
      &:focus-within {
        border: 1px solid ${colors.alarm500};
      }
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      border: 1px solid ${colors.grayscale300};
      background-color: ${colors.grayscale200};
      pointer-events: none;
      &:hover {
        border: 1px solid ${colors.grayscale300};
      }
    `}
`;

const InputContainer = styled.div`
  display: flex;
  width: 232px;
  height: 32px;
  margin-left: 12px;
`;

const CalendarInput = styled.input<DateInputProp>`
  all: unset;
  width: 100%;
  font-size: 14px;
  font-family: 'Noto Sans TC';
  font-weight: 400;
  line-height: 20px;
  color: ${colors.grayscale800};

  ::placeholder {
    color: ${colors.grayscale400};
  }

  &:placeholder-shown {
    text-overflow: ${({ $isTimeActive }) =>
      $isTimeActive ? 'ellipsis' : ''};
  }

  &:disabled {
    color: ${colors.grayscale500};
  }
`;

const TimeInput = styled.input`
  all: unset;
  width: 170%;
  font-size: 14px;
  font-family: 'Noto Sans TC';
  font-weight: 400;
  line-height: 20px;
  color: ${colors.grayscale800};

  ::placeholder {
    color: ${colors.grayscale400};
  }

  &:disabled {
    color: ${colors.grayscale500};
  }
`;

const IconContainer = styled.div`
  display: flex;
  width: 36px;
  height: 32px;
  line-height: 2px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CalendarContainer = styled.div<{ $isQuickOptionShow: boolean }>`
  display: flex;
  margin-top: 8px;
  width: 302px;
  height: ${({ $isQuickOptionShow }) =>
    $isQuickOptionShow ? '390px' : '344px'};
`;

const TimeContainer = styled.div<TimePickerProp>`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  margin-left: 98px;
  width: ${({ $disabledSecondsOption }) =>
    $disabledSecondsOption ? '112px' : '170px'};
  height: 300px;
  box-shadow: ${shadows.EMPHASIS};
  border-radius: 2px;
`;

const EachTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 56px;
  height: 300px;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  color: rgba(0, 0, 0, 0.85);
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  cursor: pointer;

  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-align: center;
`;

const HourContainer = styled(EachTimeContainer)`
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
`;

const MinuteContainer = styled(EachTimeContainer)<{
  $disabled?: boolean;
}>`
  box-shadow: 1px 0px 0px 0px rgba(240, 240, 240, 1) inset;
  ${({ $disabled }) =>
    $disabled &&
    css`
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    `}
`;

const SecondContainer = styled(EachTimeContainer)`
  border-left: 1px solid rgba(240, 240, 242, 1);
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
`;

const EachButtonContainer = styled.div`
  width: 56px;
  height: 32px;

  &:first-child {
    margin-top: 8px;
  }

  &:last-child {
    margin-bottom: 8px;
  }
`;

const EachButton = styled.button<TimeProp>`
  all: unset;
  width: 56px;
  height: 32px;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.grayscale100};
  }

  color: ${({ $isActive }) =>
    $isActive ? `${colors.primary500}` : ``};
`;

/* --------------------------------- Icon --------------------------------- */
function CalendarIcon() {
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.03125 1.40625V2.5H8.96875V1.40625C8.96875 1.05078 9.24219 0.75 9.625 0.75C9.98047 0.75 10.2812 1.05078 10.2812 1.40625V2.5H11.375C12.332 2.5 13.125 3.29297 13.125 4.25V4.6875V6V13C13.125 13.9844 12.332 14.75 11.375 14.75H2.625C1.64062 14.75 0.875 13.9844 0.875 13V6V4.6875V4.25C0.875 3.29297 1.64062 2.5 2.625 2.5H3.71875V1.40625C3.71875 1.05078 3.99219 0.75 4.375 0.75C4.73047 0.75 5.03125 1.05078 5.03125 1.40625ZM2.1875 6V7.53125H4.375V6H2.1875ZM2.1875 8.84375V10.5938H4.375V8.84375H2.1875ZM5.6875 8.84375V10.5938H8.3125V8.84375H5.6875ZM9.625 8.84375V10.5938H11.8125V8.84375H9.625ZM11.8125 7.53125V6H9.625V7.53125H11.8125ZM11.8125 11.9062H9.625V13.4375H11.375C11.5938 13.4375 11.8125 13.2461 11.8125 13V11.9062ZM8.3125 11.9062H5.6875V13.4375H8.3125V11.9062ZM4.375 11.9062H2.1875V13C2.1875 13.2461 2.37891 13.4375 2.625 13.4375H4.375V11.9062ZM8.3125 7.53125V6H5.6875V7.53125H8.3125Z"
        fill="#232332"
        fillOpacity="0.4"
      />
    </svg>
  );
}

function RemovedIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.71484 7.53516L10 8.82031L11.2852 7.53516C11.5312 7.28906 11.9414 7.28906 12.1875 7.53516C12.4609 7.80859 12.4609 8.21875 12.1875 8.46484L10.9023 9.75L12.1875 11.0352C12.4609 11.3086 12.4609 11.7188 12.1875 11.9648C11.9414 12.2383 11.5312 12.2383 11.2852 11.9648L10 10.6797L8.71484 11.9648C8.44141 12.2383 8.03125 12.2383 7.78516 11.9648C7.51172 11.7188 7.51172 11.3086 7.78516 11.0352L9.07031 9.75L7.78516 8.46484C7.51172 8.21875 7.51172 7.80859 7.78516 7.53516C8.03125 7.28906 8.44141 7.28906 8.71484 7.53516Z"
        fill="#232332"
        fillOpacity="0.55"
      />
      <path
        d="M10 16.75C7.48438 16.75 5.1875 15.4375 3.92969 13.25C2.67188 11.0898 2.67188 8.4375 3.92969 6.25C5.1875 4.08984 7.48438 2.75 10 2.75C12.4883 2.75 14.7852 4.08984 16.043 6.25C17.3008 8.4375 17.3008 11.0898 16.043 13.25C14.7852 15.4375 12.4883 16.75 10 16.75ZM7.78516 7.53516C7.51172 7.80859 7.51172 8.21875 7.78516 8.46484L9.07031 9.75L7.78516 11.0352C7.51172 11.3086 7.51172 11.7188 7.78516 11.9648C8.03125 12.2383 8.44141 12.2383 8.6875 11.9648L9.97266 10.6797L11.2578 11.9648C11.5312 12.2383 11.9414 12.2383 12.1875 11.9648C12.4609 11.7188 12.4609 11.3086 12.1875 11.0352L10.9023 9.75L12.1875 8.46484C12.4609 8.21875 12.4609 7.80859 12.1875 7.53516C11.9414 7.28906 11.5312 7.28906 11.2578 7.53516L9.97266 8.82031L8.6875 7.53516C8.44141 7.28906 8.03125 7.28906 7.78516 7.53516Z"
        fill="#232332"
        fillOpacity="0.15"
      />
    </svg>
  );
}
