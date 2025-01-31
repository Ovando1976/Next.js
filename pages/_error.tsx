import React from "react";
import { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
  message?: string;
}

const ErrorPage = ({ statusCode, message }: ErrorProps) => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Oops! Something went wrong.</h1>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on the server`
          : "An error occurred on the client"}
      </p>
      {message && <p style={{ color: "gray" }}>{message}</p>}
      <a href="/" style={{ color: "#007BFF" }}>
        Go back to Home
      </a>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = err ? err.message : "Page Not Found";
  return { statusCode, message };
};

export default ErrorPage;
