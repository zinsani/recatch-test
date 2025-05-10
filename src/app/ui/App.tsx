import "./App.css";
import RouterProvider from "../providers/RouteProvider";
import QueryProvider from "../providers/QueryProvider";
import Theme from "../providers/ConfigProvider";

function App() {
  return (
    <QueryProvider>
      <Theme>
        <RouterProvider />
      </Theme>
    </QueryProvider>
  );
}

export default App;
