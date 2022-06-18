import {
  Masthead,
  MastheadToggle,
  MastheadContent,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarItem
} from '@patternfly/react-core'
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon'

const Header = () => {
  return (
    <Masthead>
      <MastheadToggle>
        <PageToggleButton
          variant='plain'
          aria-label='Global navigation'
        >
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadContent>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>INMET Browser</ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  )
}
export default Header
