import styles from './styles.module.scss';
import Header from '../../components/header';
import { PageList } from '@chat-app/layouts/main/page-list';
import { useIsSidebarExpandedSelector } from '@chat-app/context/ui/selectors';
import { useCallback } from 'react';
import ExpandButton from '@chat-app/components/expand-button';
import { Outlet, useLocation } from 'react-router-dom';
import { Home } from '@chat-app/routes/home';
import { RouteName } from '@chat-app/routes/namespaces';

export const MainLayout = () => {
  const isSidebarExpanded = useIsSidebarExpandedSelector();

  const handleExpandSidebar = useCallback(
    () => isSidebarExpanded?.actions.toggleIsSidebarExpanded(),
    [isSidebarExpanded?.actions],
  );

  const currentRoute = useLocation().pathname;

  return (
    <div id={styles.mainContainer}>
      <div id={styles.header}>
        <Header />
      </div>
      <div id={styles.leftPane}>
        <PageList />
        <ExpandButton
          className={styles.leftPane__expandButton}
          onClick={handleExpandSidebar}
          isExpanded={isSidebarExpanded?.value ?? true}
        />
      </div>
      <div id={styles.contentContainer}>{currentRoute === RouteName.Routes.HOME ? <Home /> : <Outlet />}</div>
    </div>
  );
};
