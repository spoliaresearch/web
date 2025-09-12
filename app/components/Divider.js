export default function Divider({ size = "m" }) {
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
    xxs: "8px",
    xs: "16px",
    s: "32px",
    m: "48px",
    ml: "78px",
    l: "128px",
    xl: "256px",
  };

  return (
    <div
      style={{
        height: sizeMap[size] || sizeMap.m,
        width: "100%",
        "--mobile-height": mobileSizeMap[size] || mobileSizeMap.m,
      }}
      className="divider-component"
    />
  );
}
