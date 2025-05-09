import type { PropsWithChildren } from "react";
import { Layout as ALayout } from "antd";

function Layout({ children }: PropsWithChildren) {
  return (
    <ALayout>
      <ALayout.Content>{children}</ALayout.Content>
    </ALayout>
  );
}

export default Layout;
