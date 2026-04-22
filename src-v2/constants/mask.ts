const masks = {
  FULL_MASK: `linear-gradient(
      to top,
      transparent,
      transparent 40px,
      black 40px,
      black calc(100% - 40px),
      transparent
    ),
    linear-gradient(
      to bottom,
      transparent,
      transparent 40px,
      black 40px,
      black calc(100% - 40px),
      transparent
    )` as const,

  HIDE_TOP_MASK: `
    linear-gradient(
      to top,
      transparent,
      transparent 40px,
      black 40px,
      black calc(100% - 40px),
      transparent
    ),
    linear-gradient(
      to bottom,
      black,
      black 40px,
      black 40px,
      black calc(100% - 40px),
      transparent
    )` as const,

  HIDE_BOTTOM_MASK: `
    linear-gradient(
      to top,
      black,
      black 40px,
      black 40px,
      black calc(100% - 40px),
      transparent
    ),
    linear-gradient(
      to bottom,
      transparent,
      transparent 40px,
      black 40px,
      black calc(100% - 40px),
      transparent
    )` as const,
};

export default masks;
