import { UserPage } from "@/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/shared/ui";

function RouterProvider() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<UserPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default RouterProvider;
