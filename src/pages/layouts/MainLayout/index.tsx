import { Layout } from 'antd';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <Layout.Content className={styles.content}>
        <Outlet />
        <ScrollRestoration />
      </Layout.Content>
    </Layout>
  );
};
