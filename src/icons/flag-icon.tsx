type FlagIconProps = {
  width?: number;
  height?: number;
};

export default function FlagIcon(props: FlagIconProps) {
  const { width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      width={width}
      height={height}
      data-testid="flag-icon"
    >
      <path
        d="M1.875 1.063v.656l1.992-.492a3.84 3.84 0 0 1 2.648.305c1.078.539 2.367.539 3.445 0l.234-.117a.74.74 0 0 1 1.055.656v6.539c0 .328-.211.586-.492.703l-.82.305c-1.078.422-2.273.352-3.328-.164a4.17 4.17 0 0 0-2.859-.328l-1.875.469v2.344c0 .328-.258.563-.562.563a.54.54 0 0 1-.562-.562V9.875 8.727 2v-.937C.75.758.984.5 1.313.5a.57.57 0 0 1 .563.563zm0 1.828v5.555l1.594-.398c1.219-.305 2.531-.164 3.656.398.75.375 1.617.422 2.414.117l.586-.211V2.68c-1.336.539-2.836.492-4.102-.141a2.67 2.67 0 0 0-1.898-.211l-2.25.563z"
        fill="currentColor"
      />
    </svg>
  );
}
