import "./App.css";
import RouterProvider from "../providers/router";
import QueryProvider from "../providers/tanstack-query";

function App() {
  return (
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  );
}

export default App;
