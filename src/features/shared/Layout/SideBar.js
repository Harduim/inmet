import {
  Nav,
  NavItem,
  NavList,
  PageSidebar
} from '@patternfly/react-core'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const { pathname } = useLocation()

  return (
    <PageSidebar nav={
      <Nav aria-label='Nav'>
        <NavList>
          <NavItem
            groupId='grp-0'
            itemId='itn-0'
            isActive={pathname === '/'}
          >
            <Link to='/'>Home</Link>
          </NavItem>
          <NavItem
            groupId='grp-1'
            itemId='itn-1'
            isActive={pathname.includes('/estacoes')}
          >
            <Link to='/estacoes'>Estações</Link>
          </NavItem>
          <NavItem
            groupId='grp-4'
            itemId='itn-4'
            isActive={false}
          >
            <a target='blank' href='https://portal.inmet.gov.br/manual'>Manual</a>
          </NavItem>
        </NavList>
      </Nav>
    }
    />
  )
}

export default Sidebar
