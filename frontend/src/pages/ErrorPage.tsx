import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import "../Styles/ErrorPage.css";
import Header from "../Components/Header";

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
    <div className="error-page">
      <Header />
      <h1>Uh oh!</h1>
      <p>
        {errorStatus} {errorMessage}
      </p>
      <Link className="error-link" to="/">
        Take me home
      </Link>
    </div>
  );
};

export default ErrorPage;
