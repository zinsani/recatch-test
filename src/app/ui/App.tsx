import "./App.css";
import RouterProvider from "../providers/router";
import QueryProvider from "../providers/tanstack-query";
import Theme from "../providers/theme";
import { Layout } from "@/shared/ui";

function App() {
  return (
    <QueryProvider>
      <Theme>
        <Layout>
          <RouterProvider />
        </Layout>
      </Theme>
    </QueryProvider>
  );
}

export default App;
