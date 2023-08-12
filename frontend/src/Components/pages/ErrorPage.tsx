import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown error";
  }

  return (
    <div>
      <h1>Error</h1>
      <h2>
        {errorStatus} {errorMessage}
      </h2>
      <Link to="/">Take me home</Link>
    </div>
  );
};

export default ErrorPage;
