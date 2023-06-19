import { MouseEvent } from "react";
interface ButtonProps {
  openForm: (e: MouseEvent<HTMLButtonElement>) => void;
}

const HomePage = ({ openForm}: ButtonProps ) => {
  return (
    <section>
      <button onClick={openForm}>Add New Recipe</button>
    </section>
  );
};

export default HomePage;
