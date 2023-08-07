import { useLoaderData } from "react-router-dom";

const TagsPage = () => {
  // const tags = useLoaderData() as String[];

  return (
    <div>
      <h1>Tags</h1>
      <button>Add Tag</button>
      {/* <ul>
        {tags.map((tag) => {
          return <li>{tag}</li>;
        })}
      </ul> */}
    </div>
  );
};

export default TagsPage;
