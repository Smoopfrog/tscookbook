import { useState } from "react";

interface RecipeListItemProps {
  classes: string;
  children: React.ReactNode;
  key: number;
}

const RecipeListItem = ({ classes, children, key }: RecipeListItemProps) => {
  const [linethrough, setLineThrough] = useState(false);

  const toggleLinethrough = () => {
    setLineThrough((prev) => !prev);
  };

  return (
    <li
      className={`${classes} ${linethrough && "linethrough"}`}
      key={key}
      onClick={toggleLinethrough}
    >
      {children}
    </li>
  );
};

export default RecipeListItem;
