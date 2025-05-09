import { ConfigProvider, type ThemeConfig } from "antd";
import type { PropsWithChildren } from "react";

function Theme({ children }: PropsWithChildren) {
  const config: ThemeConfig = {
    // tokens: {},
  };
  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
}

export default Theme;
