import { Page, PageSection, PageSectionVariants } from '@patternfly/react-core'
import Header from './Header'
import Sidebar from './SideBar'

const Layout = (props) => {
  const { children } = props

  return (
    <Page header={<Header />} sidebar={<Sidebar />}>
      <PageSection isFilled variant={PageSectionVariants.light}>
        {children}
      </PageSection>
    </Page>
  )
}

export default Layout
