import { useEffect, useMemo, useRef, useState } from 'react';
import RCalendar, { CalendarType } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled, {
  CSSProperties,
  FlattenSimpleInterpolation,
  css,
  keyframes,
} from 'styled-components';
import { colors, shadows } from '../../constants';
import {
  DownIcon,
  NextIcon,
  NextYearIcon,
  PreviousIcon,
  PreviousYearIcon,
  UpIcon,
} from './utils';

/* ---------------------------------- Types --------------------------------- */
export type CalendarProps = {
  className?: string;
  value?: Date | null | [Date | null, Date | null];
  calendarType?: CalendarType;
  onChange?: (
    value: Date | null | [Date | null, Date | null],
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void | undefined;
  showFixedNumberOfWeeks?: boolean;
  disabledMonth?: boolean;
  disabledYear?: boolean;
  style?: CSSProperties;
  formatShortWeekday?:
    | ((locale: string | undefined, date: Date) => string)
    | undefined;
  activeStartDate?: Date;
  isROCYear?: boolean;
  selectedYear?: number;
  selectedROCYear?: number;
  selectedMonth?: number;
  showQuickOption?: boolean;
};

/* ---------------------------------- Component --------------------------------- */
export default function Calendar(props: CalendarProps) {
  const {
    className,
    value,
    calendarType = 'gregory',
    formatShortWeekday,
    showFixedNumberOfWeeks = true,
    disabledMonth = false,
    disabledYear = false,
    showQuickOption = false,
    style,
    onChange,
    activeStartDate,
    isROCYear = false,
    selectedYear,
    selectedMonth,
    selectedROCYear,
  } = props;

  // 這邊的寫法是從 react-calendar 的 Usage (https://www.npmjs.com/package/react-calendar) 那裡複製貼上的，若刪掉 [ValuePiece, ValuePiece] 則會出現 error
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const [isYearDropdownShow, setIsYearDropdownShow] = useState(false);
  const [isMonthDropdownShow, setIsMonthDropdownShow] =
    useState(false);
  const [isClicked, setIsClicked] = useState(false); // toggle year 面板的上下鍵的 animation

  const [isScrolled, setIsScrolled] = useState(false);

  const [years, setYears] = useState<number[]>([]);

  const [year, setYear] = useState(
    selectedYear || new Date().getFullYear(),
  );
  const [month, setMonth] = useState(
    selectedMonth || new Date().getMonth(),
  );

  const [rocYear, setROCYear] = useState(
    (selectedROCYear ?? new Date().getFullYear()) - 1911,
  );
  const [rocYears, setROCYears] = useState<number[]>([]);

  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const yearButtonRef = useRef<HTMLButtonElement>(null);
  const monthButtonRef = useRef<HTMLButtonElement>(null);

  // 在 year 的面板將 active 的年份設為第二個
  const numberOfComingYears = 5;
  const numberOfPastYears = 1;

  const [localValue, setLocalValue] = useState<Value>(value ?? null);

  // 取得 browser 的 default language
  const userLanguage = navigator.language;

  let chineseLanguage;
  if (userLanguage.includes('zh')) {
    chineseLanguage = true;
  } else {
    chineseLanguage = false;
  }

  const monthText = new Date(year, month).toLocaleDateString(
    userLanguage,
    {
      month: 'short',
    },
  );

  const handleFormatShortWeekday = (
    locale: string | undefined,
    date: Date,
  ) => {
    const effectiveLocale = locale ?? navigator.language;

    if (!formatShortWeekday) {
      return date.toLocaleDateString(effectiveLocale, {
        weekday: 'narrow',
      });
    }

    return formatShortWeekday(effectiveLocale, date);
  };

  const handleChange = (
    newValue: Value,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    onChange?.(newValue, event);
    setLocalValue(newValue);
  };

  // 若 selectedMonth 為一月時，calendar 無法直接跳到 1 月份，因此要多一個 useEffect 來確保 calendar 是 1月
  useEffect(() => {
    if (value && selectedMonth === 0) {
      setMonth(0);
    }
  }, [selectedMonth, value]);

  // 點擊白色部分關閉面板
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isMonthDropdownShow &&
        monthRef.current &&
        !monthRef.current.contains(e.target as Node) &&
        monthButtonRef.current &&
        !monthButtonRef.current.contains(e.target as Node)
      ) {
        setIsMonthDropdownShow(false);
      }

      if (
        isYearDropdownShow &&
        yearRef.current &&
        !yearRef.current.contains(e.target as Node) &&
        yearButtonRef.current &&
        !yearButtonRef.current.contains(e.target as Node)
      ) {
        setIsYearDropdownShow(false);
        setIsScrolled(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener(
        'mousedown',
        checkIfClickedOutside,
      );
    };
  }, [isMonthDropdownShow, isYearDropdownShow]);

  // 在年份面板上 hover 年份可以滾動
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    setIsScrolled(true);
    if (event.deltaY > 0) {
      if (isROCYear) {
        setROCYears((previousYear) =>
          previousYear.map((eachYear) => eachYear + 1),
        );
      } else {
        setYears((previousYear) =>
          previousYear.map((eachYear) => eachYear + 1),
        );
      }
    } else {
      if (isROCYear) {
        setROCYears((previousYear) =>
          previousYear.map((eachYear) => eachYear - 1),
        );
      } else {
        setYears((previousYear) =>
          previousYear.map((eachYear) => eachYear - 1),
        );
      }
    }
  };

  // ---------------------- Header 的 箭頭 Icon Buttons --------------------------
  const handlePreviousMonth = () => {
    // Month 的 index 是從 0 (1月) 到 11 (12月)
    if (month === 0) {
      setMonth(11);
      isROCYear ? setROCYear(rocYear - 1) : setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handlePreviousYear = () => {
    isROCYear ? setROCYear(rocYear - 1) : setYear(year - 1);
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      isROCYear ? setROCYear(rocYear + 1) : setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleNextYear = () => {
    isROCYear ? setROCYear(rocYear + 1) : setYear(year + 1);
  };

  // ------------------------ Header 的 Month Button -------------------------------
  const handleMonthChange = (index: number) => {
    setMonth(index);
    setIsMonthDropdownShow(false);
  };

  const months = [];
  for (let i = 1; i <= 12; i++) {
    const monthName = new Date(year, i - 1).toLocaleDateString(
      userLanguage,
      {
        month: 'short',
      },
    );

    months.push(`${monthName}`);
  }

  // ------------------------ Header 的 Year Button -------------------------------
  // 更新面板的值
  useEffect(() => {
    const newYears: number[] = [];

    // DatePicker: 就算沒有這個 check ，當在 DatePicker 的 Calendar 的年份面板上 scroll 時如果不選擇年份直接關掉面板，再次打開時也會自動把選擇的年份放在第二個。
    // 但是如果只用 Calendar 元件，不加上 DatePicker的時候，如果沒有這個 if (!isScrolled || rocYear || year)，scroll 完後關掉面板，再打開時面板上的年份會留在上次 scroll 後的年份
    // (例如: 如果 scroll 後的面板為: 2030 ~ 2036，那麼再次打開面板時會是 2030 ~ 2036 的年份，而不是 2024 ~ 2030 的年份)
    if (!isScrolled || rocYear || year) {
      if (isROCYear) {
        for (
          let i = rocYear;
          i <= rocYear + numberOfComingYears;
          i++
        ) {
          newYears.push(i);
        }
        for (
          let i = rocYear - 1;
          i >= rocYear - numberOfPastYears;
          i--
        ) {
          newYears.push(i);
        }
      } else {
        for (let i = year; i <= year + numberOfComingYears; i++) {
          newYears.push(i);
        }
        for (let i = year - 1; i >= year - numberOfPastYears; i--) {
          newYears.push(i);
        }
      }

      newYears.sort();
      if (isROCYear) {
        setROCYears(newYears);
      } else {
        setYears(newYears);
      }
    }
  }, [year, isROCYear, rocYear, isScrolled]);

  const handleYearChange = (index: number) => {
    const currentYear =
      (isROCYear ? rocYears : years).at(index) ?? -1;
    isROCYear ? setROCYear(currentYear) : setYear(currentYear);
    setIsYearDropdownShow(false);
  };

  // 新增點擊上下鍵的 animation
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  const handlePreviousYearButton = () => {
    setIsClicked(true);
    setDirection('down');

    if (isROCYear) {
      setROCYears((previousYear) =>
        previousYear.map((eachYear) => eachYear - 4),
      );
    } else {
      setYears((previousYear) =>
        previousYear.map((eachYear) => eachYear - 4),
      );
    }

    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const handleNextYearButton = () => {
    setIsClicked(true);
    setDirection('up');

    if (isROCYear) {
      setROCYears((previousYear) =>
        previousYear.map((eachYear) => eachYear + 4),
      );
    } else {
      setYears((previousYear) =>
        previousYear.map((eachYear) => eachYear + 4),
      );
    }

    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const updatedActiveStartDate = useMemo(() => {
    if (isROCYear) {
      return activeStartDate ?? new Date(rocYear + 1911, month, 1);
    }
    return activeStartDate ?? new Date(year, month, 1);
  }, [rocYear, year, month, isROCYear, activeStartDate]);

  // 快速選取特定日期
  const handleQuickOption = (
    event: React.MouseEvent<HTMLButtonElement>,
    option?: string,
  ) => {
    const today = new Date();
    let updatedDate = new Date();

    if (option === 'yesterday') {
      const yesterday = today.setDate(today.getDate() - 1);
      updatedDate = new Date(yesterday);
    } else if (option === 'lastMonth') {
      const lastMonth = today.setMonth(today.getMonth() - 1);
      updatedDate = new Date(lastMonth);
    }

    updatedDate.setHours(0, 0, 0, 0);

    handleChange(updatedDate, event);
    setYear(updatedDate.getFullYear());
    setMonth(updatedDate.getMonth());
  };

  return (
    <Container className={className} style={style}>
      {showQuickOption && (
        <QuickOptionContainer>
          <div>
            <QuickOptionButton
              $isChinese={chineseLanguage}
              onClick={(e) => {
                handleQuickOption(e, 'today');
              }}
            >
              {chineseLanguage ? '今天' : 'Today'}
            </QuickOptionButton>
          </div>
          <div>
            <QuickOptionButton
              $isChinese={chineseLanguage}
              onClick={(e) => {
                handleQuickOption(e, 'yesterday');
              }}
            >
              {chineseLanguage ? '昨天' : 'Yesterday'}
            </QuickOptionButton>
          </div>
          <div>
            <QuickOptionButton
              $isChinese={chineseLanguage}
              onClick={(e) => {
                handleQuickOption(e, 'lastMonth');
              }}
            >
              {chineseLanguage ? '上個月' : 'Last month'}
            </QuickOptionButton>
          </div>
        </QuickOptionContainer>
      )}
      <Header>
        {/* Pevious Year/Month Buttons */}
        <PreviousContainer>
          {!disabledYear && (
            <PreviousYearButton onClick={handlePreviousYear}>
              <PreviousYearIcon />
            </PreviousYearButton>
          )}

          {!disabledMonth && (
            <PreviousMonthButton onClick={handlePreviousMonth}>
              <PreviousIcon />
            </PreviousMonthButton>
          )}
        </PreviousContainer>

        {/* Year and Month Labels */}
        <LabelContainer>
          {/* Year */}
          <YearContainer>
            <YearButton
              $disabled={disabledYear}
              ref={yearButtonRef}
              onClick={() => {
                setIsYearDropdownShow((prev) => !prev);
              }}
            >
              {isROCYear ? `${rocYear}年` : year}
            </YearButton>
            {isYearDropdownShow && !disabledYear && (
              <YearPicker ref={yearRef}>
                <PreviousNextButton
                  onClick={handlePreviousYearButton}
                >
                  <UpIcon />
                </PreviousNextButton>
                <AllYearContainer
                  onWheel={handleWheel}
                  $isAnimation={isClicked}
                  $direction={direction}
                >
                  {(isROCYear ? rocYears : years).map(
                    (eachYear, index) => (
                      <EachYearContainer
                        key={index}
                        onClick={() => handleYearChange(index)}
                        $isAnimation={isClicked}
                      >
                        <EachYearButton
                          $isActive={
                            eachYear === year || eachYear === rocYear
                          }
                        >
                          {eachYear}
                          {isROCYear && '年'}
                        </EachYearButton>
                      </EachYearContainer>
                    ),
                  )}
                </AllYearContainer>
                <PreviousNextButton onClick={handleNextYearButton}>
                  <DownIcon />
                </PreviousNextButton>
              </YearPicker>
            )}
          </YearContainer>

          {/* Month */}
          <MonthContainer>
            <MonthButton
              $disabled={disabledMonth}
              ref={monthButtonRef}
              onClick={() =>
                setIsMonthDropdownShow(!isMonthDropdownShow)
              }
            >
              {monthText}
            </MonthButton>
            {isMonthDropdownShow && !disabledMonth && (
              <MonthPicker ref={monthRef}>
                <InnerMonthContainer>
                  {months.map((eachMonth, index) => (
                    <EachMonthContainer
                      key={index}
                      onClick={() => handleMonthChange(index)}
                    >
                      <EachMonthButton $isActive={index === month}>
                        {eachMonth}
                      </EachMonthButton>
                    </EachMonthContainer>
                  ))}
                </InnerMonthContainer>
              </MonthPicker>
            )}
          </MonthContainer>
        </LabelContainer>

        {/* Next Year/Month Buttons */}
        <NextContainer>
          {!disabledMonth && (
            <NextMonthButton onClick={handleNextMonth}>
              <NextIcon />
            </NextMonthButton>
          )}
          {!disabledYear && (
            <NextYearButton onClick={handleNextYear}>
              <NextYearIcon />
            </NextYearButton>
          )}
        </NextContainer>
      </Header>
      <StyledCalendar
        onChange={handleChange}
        value={localValue}
        showFixedNumberOfWeeks={showFixedNumberOfWeeks}
        calendarType={calendarType}
        activeStartDate={updatedActiveStartDate}
        showNavigation={false}
        formatDay={(_, date) =>
          date.toLocaleDateString('en', { day: 'numeric' })
        }
        formatShortWeekday={handleFormatShortWeekday}
      />
    </Container>
  );
}

Calendar.displayName = 'Calendar';

/* ------------------------- Style -------------------------- */
const Container = styled.div`
  width: 302px;
  box-shadow: ${shadows.EMPHASIS};
  border-radius: 4px;
`;

const QuickOptionContainer = styled.div`
  width: 302px;
  height: 47px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* display: flex; */
  /* justify-content: space-around; */
`;

const QuickOptionButton = styled.button<{
  $isChinese: boolean;
}>`
  all: unset;
  /* width: ${({ $isChinese }) => ($isChinese ? '60px' : '140px')};
  height: ${({ $isChinese }) => ($isChinese ? '30px' : '24px')}; */
  border-radius: 15px;
  border: 1px solid rgba(35, 35, 50, 0.15);
  font-size: 14px;
  font-family: 'Noto Sans TC';
  color: ${colors.grayscale800};
  text-align: center;

  // 因 border 會加一，因此整個 button 的寬和高會各多 1px，為了跟設計稿一樣，在這邊 padding 減一
  padding: ${({ $isChinese }) =>
    $isChinese ? '5px 15px' : '3px 11px'};
  cursor: pointer;

  &:hover {
    background-color: ${colors.grayscale100};
    border: 1px solid rgba(35, 35, 50, 0.15);
  }
`;

/* ------------------------- Header style -------------------------- */
const Header = styled.div`
  width: 302px;
  height: 48px;
  border-bottom: 1px solid ${colors.grayscale200};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

// 包含 previous year / month 的 buttons
const PreviousContainer = styled.div`
  display: flex;
  gap: 4px;
  margin: 14px 0px 14px 20px;
`;

// 包含 next year / month 的 buttons
const NextContainer = styled.div`
  display: flex;
  gap: 4px;
  margin: 14px 20px 14px 0px;
`;

const Button = styled.button<{ $disabled?: boolean }>`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 20px;
  height: 20px;
  color: ${colors.grayscale600};

  &:hover {
    color: ${colors.grayscale700};
  }

  &:hover:active {
    color: ${colors.grayscale900};
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: none;
      pointer-events: none;
    `}
`;

const PreviousYearButton = Button;
const PreviousMonthButton = Button;
const NextMonthButton = Button;
const NextYearButton = Button;

const TextButton = styled.button<{ $disabled: boolean }>`
  all: unset;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 24px;
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 700;
  color: ${colors.grayscale900};
  cursor: pointer;

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: none;
      pointer-events: none;
    `}
`;

const LabelContainer = styled.div`
  display: flex;
  width: 126px;
  height: 24px;
  gap: 12px;
  justify-content: center;
  align-items: center;
  margin: 12px 24px;
`;

// -------------- 年份的面板 --------------
const YearContainer = styled.div`
  position: relative;
`;

const YearPicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 1;
  width: 84px;
  left: -20px;
  top: 28px;
  background-color: white;
  box-shadow: 0px 6px 20px 0px rgba(67, 67, 75, 0.2);
  border-radius: 4px;
`;

const upAnimation = keyframes` 0% { transform: translateY(0); } 100% { transform: translateY(-12px); } `;
const downAnimation = keyframes` 0% { transform: translateY(0); } 100% { transform: translateY(12px); } `;

const AllYearContainer = styled.div<{
  $isAnimation?: boolean;
  $direction?: 'up' | 'down';
}>`
  display: flex;
  flex-direction: column;
  width: 84px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-align: center;

  ${({
    $isAnimation,
    $direction,
  }): FlattenSimpleInterpolation | undefined =>
    $isAnimation
      ? css`
          animation: ${$direction === 'up'
              ? upAnimation
              : downAnimation}
            0.2s ease-in-out;
        `
      : undefined}
`;

const EachYearContainer = styled.div<{ $isAnimation?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 32px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.grayscale100};
  }
`;

const YearButton = styled(TextButton)`
  width: 44px;
  font-family: 'Roboto';
  font-weight: 700;
  font-size: '16px';

  &:focus {
    color: ${colors.primary500};
  }

  &:hover {
    color: ${colors.primary500};
  }
`;

type ActiveProps = {
  $isActive: boolean;
};

const EachYearButton = styled.button<ActiveProps>`
  all: unset;
  width: 44px;
  height: 20px;
  font-family: 'Noto Sans TC';
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: ${({ $isActive }) =>
    $isActive ? `${colors.primary500}` : `${colors.grayscale800}`};
`;

const PreviousNextButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;
  color: ${colors.grayscale500};
  cursor: pointer;

  &:first-child {
    margin-top: 6px;
  }

  &:last-child {
    margin-bottom: 6px;
  }

  &:hover {
    color: ${colors.grayscale700};
  }

  &:hover:active {
    color: ${colors.grayscale900};
  }
`;

// -------------- 月份的面板 ----------------
const MonthContainer = styled.div`
  position: relative;
`;

const MonthPicker = styled.div`
  position: absolute;
  z-index: 1;
  width: 236px;
  height: 164px;
  left: -123px;
  top: 30px;
  background-color: white;
  box-shadow: 0px 6px 20px 0px rgba(67, 67, 75, 0.2);
  border-radius: 4px;
`;

const InnerMonthContainer = styled.div`
  margin: 6px 12px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 8px;
`;

const MonthButton = styled(TextButton)`
  width: 35px;
  &:focus {
    color: ${colors.primary500};
  }
  &:hover {
    color: ${colors.primary500};
  }
`;

const EachMonthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 32px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.grayscale200};
    border-radius: 16px;
  }
`;

const EachMonthButton = styled.button<ActiveProps>`
  all: unset;
  height: 20px;
  font-family: 'Noto Sans TC';
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
  color: ${({ $isActive }) =>
    $isActive ? `${colors.primary500}` : `${colors.grayscale800}`};

  &:focus {
    color: ${colors.primary500};
  }
`;

/* ------------------------- React Calendar 套件 style -------------------------- */
const StyledCalendar = styled(RCalendar)`
  &.react-calendar {
    width: 302px;
    height: 296px;
    border: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .react-calendar__viewContainer {
    padding: 0px 20px;
    padding-bottom: 20px;
  }

  .react-calendar__month-view__weekdays {
    padding-top: 20px;
    padding-bottom: 12px;
    display: flex;
    gap: 4px;
  }

  .react-calendar__month-view__weekdays__weekday {
    flex: none !important;
    padding: 0px;
    width: 34px;
    color: ${colors.grayscale600};
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    font-family: 'Noto Sans TC';
    text-align: center;

    abbr[title] {
      text-decoration: none;
    }
  }

  .react-calendar__month-view__days {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 4px;
  }

  .react-calendar__month-view__days__day {
    height: 34px;
    width: 34px;
    text-align: center;
    align-items: center;
  }

  .react-calendar__month-view__days__day abbr {
    width: 24px;
    height: 14px;
    top: 10px;
    left: 5px;
  }

  .react-calendar__tile {
    flex: none !important;
    font-family: 'Roboto';
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    align-items: center;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${colors.grayscale600};
    font-weight: 400;
  }

  .react-calendar__tile:not(
      .react-calendar__month-view__days__day--neighboringMonth
    ):not(.react-calendar__tile--active):not(
      .react-calendar__tile--now
    ) {
    color: ${colors.grayscale800};
    font-weight: 500;
  }

  .react-calendar__tile--active {
    color: white;
    background-color: ${colors.primary500};
    border-radius: 17px;
  }

  .react-calendar__tile--now {
    color: ${colors.primary500};
    font-weight: 500;
    background-color: transparent;
    position: relative;
  }

  .react-calendar__tile--now::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 45%;
    width: 4px;
    height: 4px;
    background-color: ${colors.primary500};
    border-radius: 50%;
  }

  .react-calendar__tile--now.react-calendar__tile--active {
    color: white;
    background: ${colors.primary500};
  }

  .react-calendar__tile:not(.react-calendar__tile--active):hover {
    outline: 2px solid ${colors.primary500};
    background-color: transparent;
    border-radius: 17px;
  }

  .react-calendar__month-view__days__day--weekend:not(
      .react-calendar__month-view__days__day--neighboringMonth
    ) {
    color: ${colors.grayscale800};
  }

  .react-calendar__month-view__days__day--weekend.react-calendar__tile--active {
    background: ${colors.primary500};
    border-radius: 17px;
    color: white;
  }
`;
