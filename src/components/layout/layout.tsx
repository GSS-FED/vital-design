import { ReactNode, useState } from 'react';
import styled from 'styled-components';

type LayoutProps = {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const { header, sidebar, children } = props;
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleHeaderCollapsed = () => {
    setIsHeaderCollapsed((prev) => !prev);
  };
  const handleSidebarCollapsed = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <Container isHeaderCollapsed={isHeaderCollapsed}>
      <HeaderContainer isCollapsed={isHeaderCollapsed}>
        <HomeButton>合</HomeButton>
        <BurgerButton onClick={handleSidebarCollapsed}>
          三
        </BurgerButton>
        {header}
        <PinButton onClick={handleHeaderCollapsed}>章</PinButton>
      </HeaderContainer>
      <Main>
        <div className="main-1 dashboard"></div>
        <div className="main-2">{children}</div>
      </Main>
      <SidebarContainer isCollapsed={isSidebarCollapsed}>
        {sidebar}
      </SidebarContainer>
    </Container>
  );
}

const Container = styled.div<{ isHeaderCollapsed: boolean }>`
  display: grid;
  grid-template-rows: ${({ isHeaderCollapsed }) =>
      isHeaderCollapsed ? '16px' : 'auto'} 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    'head'
    'main';
  height: 100dvh;
  overflow: hidden;
  body:has([class*='dashboard']) & {
    grid-area: side;
    grid-template-columns: 240px 1fr;
    grid-template-areas:
      'head head'
      'side main';
  }
`;

const Main = styled.div`
  grid-area: main;
`;

const HeaderContainer = styled.div<{ isCollapsed: boolean }>`
  grid-area: head;
  border: 1px solid red;
`;

const SidebarContainer = styled.div<{ isCollapsed: boolean }>`
  grid-area: main;
  z-index: 1;
  width: min(240px, 100%);
  height: 100%;
  border: 1px solid red;
  transform: ${({ isCollapsed }) =>
    isCollapsed
      ? 'translate3d(-200%, 0, 0)'
      : 'translate3d(0, 0, 0)'};
  body:has([class*='dashboard']) & {
    grid-area: side;
    transform: translate3d(0, 0, 0);
  }
`;

const PinButton = styled.div``;

const HomeButton = styled.div``;

const BurgerButton = styled.div``;
