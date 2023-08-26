import { useState } from "react";

interface RecipeListItemProps {
  classes: string;
  children: React.ReactNode;
}

const RecipeListItem = ({ classes, children }: RecipeListItemProps) => {
  const [linethrough, setLineThrough] = useState(false);

  const toggleLinethrough = () => {
    setLineThrough((prev) => !prev);
  };

  return (
    <li
      className={`${classes} ${linethrough && "linethrough"}`}
      onClick={toggleLinethrough}
    >
      {children}
    </li>
  );
};

export default RecipeListItem;
