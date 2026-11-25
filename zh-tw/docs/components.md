# 總覽

> 一頁看完所有 Vital Design 元件。點卡片進入該元件的文件、範例與 API。

## 基礎

- [Button](/zh-tw/docs/components/button): 用 default、text、ghost 變體、多種主題與圖示觸發動作。
- [ButtonGroup](/zh-tw/docs/components/button-group): 把按鈕控制項排成一組的版面 primitive。
- [Avatar](/zh-tw/docs/components/avatar): 顯示使用者頭像；圖片載入失敗時改為姓名縮寫或預設圖示，有 12 種色彩變體。
- [Badge](/zh-tw/docs/components/badge): 小型狀態指示膠囊，有語意色彩變體，內容可以是數字或文字。
- [Chip](/zh-tw/docs/components/chip): 可切換的膠囊，用來做篩選、標籤與多選。
- [Tag](/zh-tw/docs/components/tag): 用來分類、表示狀態與篩選的標籤。支援 12 種顏色、兩種變體，以及可選的移除動作。
- [Label](/zh-tw/docs/components/label): 與表單控制項關聯的無障礙標籤文字。
- [Separator](/zh-tw/docs/components/separator): 水平或垂直分隔線。
- [Skeleton](/zh-tw/docs/components/skeleton): 內容還在載入時用的佔位區塊。
- [Spinner](/zh-tw/docs/components/spinner): 等待中的動作與非同步內容用的載入指示器。
- [Icons](/zh-tw/docs/components/icons): Vittal Design 元件共用的內建 SVG 圖示集。

## 輸入

- [Field](/zh-tw/docs/components/field): 可組合的表單欄位版面，包含標籤、說明、錯誤與群組。
- [Input](/zh-tw/docs/components/input): 文字輸入元件，包含 Input、PasswordInput 與 Textarea。
- [InputGroup](/zh-tw/docs/components/input-group): 可組合的輸入外框，在 input 或 textarea 周圍放前綴、後綴、文字與動作。
- [NumberInput](/zh-tw/docs/components/number-input): 帶增減按鈕的數字輸入，可依語系格式化，步進時會限制在範圍內。
- [Textarea](/zh-tw/docs/components/textarea): 多行文字輸入，框線、焦點與停用狀態一致。
- [SearchBar](/zh-tw/docs/components/search-bar): 帶圖示的搜尋輸入。支援即時 onChange，以及按 Enter 或點圖示觸發的 onSearch。
- [Editable](/zh-tw/docs/components/editable): 行內可編輯文字欄位，包含顯示、單行輸入與多行輸入部件。
- [Checkbox](/zh-tw/docs/components/checkbox): 支援已核取、未核取與不確定狀態的核取方塊。以 Base UI 處理無障礙。
- [RadioGroup](/zh-tw/docs/components/radio-group): 只能選一個的 radio 按鈕群組。
- [Switch](/zh-tw/docs/components/switch): 用來切換布林開／關設定的開關。
- [Slider](/zh-tw/docs/components/slider): 在有上下限的刻度上選一個數值或一段範圍。

## 選擇器與選單

- [Select](/zh-tw/docs/components/select): 從平面清單選一個或多個選項的下拉。
- [Autocomplete](/zh-tw/docs/components/autocomplete): 可自由輸入的文字欄，附篩選建議，也可選擇行內補完。
- [Combobox](/zh-tw/docs/components/combobox): 可搜尋並選取一個或多個選項的輸入選擇器。
- [Command](/zh-tw/docs/components/command): 建立在 cmdk 上、可組合的命令面板 primitive，含輸入、清單、項目、群組與快捷鍵。
- [DropdownMenu](/zh-tw/docs/components/dropdown-menu): 每一項都會觸發 callback 的動作選單。項目是在執行動作，不是綁定表單值。
- [Popover](/zh-tw/docs/components/popover): 錨在觸發元素上的浮動面板，用來放內容較豐富的提示、個人資料卡與情境覆蓋層。
- [Calendar](/zh-tw/docs/components/calendar): 建立在 react-day-picker 上的日期選擇月曆。支援單選、範圍與多選，並可完整覆寫 classNames 與 components。
- [Time Picker](/zh-tw/docs/components/time-picker): 三欄時間選擇器（時、分、秒），點一下就選取，並使用 CSS scroll-snap。

## 覆蓋層與回饋

- [Alert](/zh-tw/docs/components/alert): 可組合的訊息表面，用來放確認、警告與情境提示。
- [Toast](/zh-tw/docs/components/toast): 依狀態上色的通知，可從應用任何地方以命令式送出。
- [Dialog](/zh-tw/docs/components/dialog): 用來確認、做決定，以及填簡短表單的模態表面。
- [Alert Dialog](/zh-tw/docs/components/alert-dialog): 打斷使用者、需要回應後才能繼續的模態確認視窗。
- [Sheet](/zh-tw/docs/components/sheet): 從任一側滑入的對話框，用來做導覽、篩選、表單與檢視面板。
- [Tooltip](/zh-tw/docs/components/tooltip): 錨在觸發元素上的簡短提示，可控制箭頭與側邊。

## 版面與導覽

- [Card](/zh-tw/docs/components/card): 可組合的卡片表面，包含標題列、標題、說明、動作、內容與頁尾這些 slot。
- [Tabs](/zh-tw/docs/components/tabs): 用底線或膠囊頁籤，在相關面板之間切換。
- [Breadcrumb](/zh-tw/docs/components/breadcrumb): 一串連結，顯示目前頁面在網站階層中的位置。
- [Pagination](/zh-tw/docs/components/pagination): Composable page navigation with page links, first and last controls, and ellipsis.
- [Sidebar](/zh-tw/docs/components/sidebar): 應用側邊欄，含結構、行為，以及基本的中性預設外觀。產品專用外觀放在區塊。
- [Table of Contents](/zh-tw/docs/components/table-of-contents): 由章節刻度組成的精簡軌道，滑過或取得焦點時展開成完整的標題清單。
- [Collapsible](/zh-tw/docs/components/collapsible): 可展開與收合的互動面板，用來顯示額外內容。
- [Item](/zh-tw/docs/components/item): 含媒體、標題、說明與動作的內容列。
- [Table](/zh-tw/docs/components/table): 語意化的 \<table> primitive，用 VD token 做靜態表格與自訂組合。
- [Toolbar](/zh-tw/docs/components/toolbar): 帶 role="toolbar" 的 flex 版面 primitive。把動作、分隔線與間隔排在表格、編輯器或面板上方。
- [SplitButton](/zh-tw/docs/components/split-button): 由 ButtonGroup 組成的分割動作，含主要動作與獨立的切換觸發。
- [Progress](/zh-tw/docs/components/progress): 進度 primitive 與分段狀態指示。
- [Scroll Area](/zh-tw/docs/components/scroll-area): 可捲動的視埠，邊緣淡出可選。
- [Resizable](/zh-tw/docs/components/resizable): 以 react-resizable-panels 實作的無障礙可調整面板。
