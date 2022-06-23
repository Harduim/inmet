import Layout from "../shared/Layout";

const Home = () => {
  const Component = ({children}) => {
    return <div>{children}</div>;
  };

  return (
    <Layout>
      <Component style={{margin: '30px'}}>
        <div>Home</div>
        <div>Text</div>
      </Component>
    </Layout>
  );
};

export default Home;
