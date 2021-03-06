import { Page, PageSection, PageSectionVariants } from "@patternfly/react-core";
import Header from "./Header";
import Sidebar from "./SideBar";

const Layout = (props) => {
  const { children, filters } = props;

  return (
    <Page
      isManagedSidebar
      header={<Header />}
      sidebar={<Sidebar />}
      additionalGroupedContent={filters}
			groupProps={{ sticky: "top" }}
    >
      <PageSection isFilled variant={PageSectionVariants.light}>
        {children}
      </PageSection>
    </Page>
  );
};

export default Layout;
