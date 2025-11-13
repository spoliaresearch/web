export default function Divider({ size = "m", mobileSize }) {
  const sizeMap = {
    xxs: "16px",
    xs: "32px",
    s: "64px",
    m: "96px",
    ml: "156px",
    l: "256px",
    xl: "512px",
  };

  const mobileSizeMap = {
    xxs: "12px",
    xs: "24px",
    s: "48px",
    m: "72px",
    ml: "117px",
    l: "192px",
    xl: "384px",
  };

  const effectiveMobileSize = mobileSize || size;

  return (
    <div
      style={{
        height: sizeMap[size] || sizeMap.m,
        width: "100%",
        "--mobile-height": mobileSizeMap[effectiveMobileSize] || mobileSizeMap.m,
      }}
      className="divider-component"
    />
  );
}
