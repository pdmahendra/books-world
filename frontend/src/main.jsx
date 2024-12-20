import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/userContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {" "}
    <QueryClientProvider client={queryClient}>
      {" "}
      <UserProvider>
        <App />{" "}
      </UserProvider>
    </QueryClientProvider>
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);
