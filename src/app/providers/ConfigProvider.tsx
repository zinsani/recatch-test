import { ConfigProvider, type ThemeConfig } from "antd";
import type { PropsWithChildren } from "react";

function Theme({ children }: PropsWithChildren) {
  const config: ThemeConfig = {
    token: {
      fontFamily: `Pretendard, -apple-system, BlinkMacSystemFont, 
'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 
'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    },
    components: {
      Table: {
        cellPaddingBlock: 7.5,
        cellPaddingInline: 7.5,
      },
    },
  };
  return <ConfigProvider theme={config}>{children}</ConfigProvider>;
}

export default Theme;
