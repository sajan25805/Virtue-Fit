import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>{error.statusText || error.message}</p>
    </div>  )
}

export default ErrorPage