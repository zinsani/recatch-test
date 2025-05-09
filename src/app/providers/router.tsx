import UserListPage from "@/pages/user-list";
import type { PropsWithChildren } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function RouterProvider(children: PropsWithChildren) {
  return (
    <BrowserRouter>
      {/* TODO: common Layout wrapping */}
      <Routes>
        <Route path="/" element={<UserListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterProvider;
