import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import 'antd/lib/style/themes/default.less';
import React from 'react';

export const ConfigProviderWrapper = ({children}) => (
  <ConfigProvider locale={enUS}>
    {children}
  </ConfigProvider>
);