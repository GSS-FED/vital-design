'use client';

// Re-exports from the Vital Design component library
// Used in MDX docs pages for live previews

// Atomic components
export {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '../../../src-v2/components/alert/Alert';
export { Button } from '../../../src-v2/components/button/Button';
export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '../../../src-v2/components/button/button-group/ButtonGroup';
export {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  AvatarRoot,
} from '../../../src-v2/components/avatar/Avatar';
export { Badge } from '../../../src-v2/components/badge/Badge';
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../src-v2/components/card/Card';
export { Chip } from '../../../src-v2/components/chip/Chip';
export {
  Editable,
  EditableDisplay,
  EditableInput,
  EditableTextarea,
} from '../../../src-v2/components/editable/Editable';
export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '../../../src-v2/components/field/Field';
export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '../../../src-v2/components/item/Item';
export { Label } from '../../../src-v2/components/label/Label';
export {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '../../../src-v2/components/scroll-area/ScrollArea';
export { Separator } from '../../../src-v2/components/separator/Separator';
export { Input } from '../../../src-v2/components/input/input/Input';
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '../../../src-v2/components/input/input-group/InputGroup';
export {
  NumberInput,
  NumberInputControl,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputScrubArea,
  NumberInputScrubAreaCursor,
  NumberInputSteppers,
} from '../../../src-v2/components/input/number-input/NumberInput';
export { PasswordInput } from '../../../src-v2/components/input/password-input/PasswordInput';
export { Textarea } from '../../../src-v2/components/textarea/Textarea';
export { Select } from '../../../src-v2/components/select/Select';
export {
  Autocomplete,
  AutocompleteArrow,
  AutocompleteBackdrop,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteItemText,
  AutocompleteList,
  AutocompletePopup,
  AutocompletePortal,
  AutocompletePositioner,
  AutocompleteRow,
  AutocompleteSeparator,
  AutocompleteStatus,
  AutocompleteTrigger,
  AutocompleteValue,
} from '../../../src-v2/components/autocomplete/Autocomplete';
export { Combobox } from '../../../src-v2/components/combobox/Combobox';
export {
  Command,
  CommandBackButton,
  CommandEmpty,
  CommandGroup,
  CommandHeader,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
  CommandShortcut,
} from '../../../src-v2/components/command/Command';
export {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
} from '../../../src-v2/components/popover/Popover';
export {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from '../../../src-v2/components/tooltip/Tooltip';
export {
  createToastManager,
  Toast,
  ToastAction,
  ToastCancel,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toaster,
  useToast,
} from '../../../src-v2/components/toast/Toast';
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../../src-v2/components/dropdown-menu/DropdownMenu';
export {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from '../../../src-v2/components/dialog/Dialog';
export { Switch } from '../../../src-v2/components/switch/Switch';
export { Tag } from '../../../src-v2/components/tag/Tag';
export { Checkbox } from '../../../src-v2/components/checkbox/Checkbox';
export { RadioGroup } from '../../../src-v2/components/radio-group/RadioGroup';
export { RadioGroupItem } from '../../../src-v2/components/radio-group/RadioGroup';
export { SearchBar } from '../../../src-v2/components/search-bar/SearchBar';
export { Skeleton } from '../../../src-v2/components/skeleton/Skeleton';
export { Spinner } from '../../../src-v2/components/spinner/Spinner';
export {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressSegment,
  ProgressSegments,
  ProgressTrack,
  ProgressValue,
} from '../../../src-v2/components/progress/Progress';
export { SplitButton } from '../../../src-v2/components/button/split-button/SplitButton';
export {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from '../../../src-v2/components/slider/Slider';
export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../../../src-v2/components/resizable/Resizable';

// Blocks
export { DataTableGroup01 } from '../../../src-v2/blocks/data-table/data-table-group-01/DataTableGroup01';
export { DataTableGroup02 } from '../../../src-v2/blocks/data-table/data-table-group-02/DataTableGroup02';
export { DataTableGroup04 } from '../../../src-v2/blocks/data-table/data-table-group-04/DataTableGroup04';
