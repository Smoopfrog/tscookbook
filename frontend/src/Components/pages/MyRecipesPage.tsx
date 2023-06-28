import RecipeThumbnail from "../RecipeThumbnail";

const MyRecipesPage = () => {
  return (
    <section>
      <h1>My Recipes</h1>
      <ul>
        <li>
          <RecipeThumbnail />
        </li>
        <li>
          <RecipeThumbnail />
        </li>
        <li>
          <RecipeThumbnail />
        </li>
      </ul>
    </section>
  );
};

export default MyRecipesPage;
