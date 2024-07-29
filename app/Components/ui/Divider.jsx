export default function Divider({ children, color, darkColor }) {
  return (
    <div className={`divider ${color} dark:text-white dark:${darkColor}`}>
      {children}
    </div>
  );
}
