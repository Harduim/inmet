import React, { useState } from 'react'
import {
  Page,
  Masthead,
  MastheadToggle,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  PageSidebar,
  PageSection,
  PageSectionVariants,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Nav,
  NavItem,
  NavList
} from '@patternfly/react-core'

import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon'

const PageFrame = (props) => {
  const { children } = props
  const [isNavOpen, setNavOpen] = useState(true)

  const headerToolbar = (
    <Toolbar id='toolbar'>
      <ToolbarContent>
        <ToolbarItem>INMET Browser</ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  )

  const Header = (
    <Masthead>
      <MastheadToggle>
        <PageToggleButton
          variant='plain'
          aria-label='Global navigation'
          isNavOpen={isNavOpen}
          onNavToggle={() => setNavOpen(!isNavOpen)}
        >
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  )
  const nav = (
    <Nav aria-label='Nav'>
      <NavList>
        <NavItem
          groupId='grp-1'
          itemId='grp-1'
          isActive
        >
          Home
        </NavItem>
        <NavItem
          groupId='grp-2'
          itemId='grp-2'
          isActive={false}
        >
          <a href='/estacoes/map'>Map</a>
        </NavItem>
        <NavItem
          groupId='grp-2'
          itemId='grp-2'
          isActive={false}
        >
          <a href='#/estacoes/bar'>Bar</a>
        </NavItem>
        <NavItem
          groupId='grp-2'
          itemId='grp-2'
          isActive={false}
        >
          <a href='/estacoes/line'>Line</a>
        </NavItem>
        <NavItem
          groupId='grp-2'
          itemId='grp-2'
          isActive={false}
        >
          <a href='https://portal.inmet.gov.br/manual'>Manual</a>
        </NavItem>

      </NavList>
    </Nav>
  )
  const Sidebar = <PageSidebar nav={nav} isNavOpen={isNavOpen} />

  return (
    <Page header={Header} sidebar={Sidebar} isManagedSidebar mainContainerId='mainContainerId'>
      <PageSection isFilled variant={PageSectionVariants.light}>
        {children}
      </PageSection>
    </Page>
  )
}

export default PageFrame
