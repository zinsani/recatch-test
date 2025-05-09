import type { PropsWithChildren } from "react";
import { Layout as ALayout } from "antd";

function Layout({ children }: PropsWithChildren) {
  return (
    <ALayout style={{ minHeight: "100vh" }}>
      <ALayout.Content>{children}</ALayout.Content>
    </ALayout>
  );
}

export default Layout;
