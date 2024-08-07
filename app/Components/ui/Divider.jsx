export default function Divider({ children, color, darkColor }) {
  return (
    <div className={`divider ${color} ${darkColor ? `dark:${darkColor}` : ""}`}>
      {children}
    </div>
  );
}
