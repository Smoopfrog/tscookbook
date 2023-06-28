import { MouseEvent } from "react";

interface ButtonProps {
  openForm: (e: MouseEvent<HTMLButtonElement>) => void;
}

const HomePage = ({ openForm }: ButtonProps) => {
  return (
    <section>
      <h1>TS Cookbook</h1>
      <button>New Recipe</button>
      <button>My Recipes</button>
      <button>Search</button>
    </section>
  );
};

export default HomePage;
