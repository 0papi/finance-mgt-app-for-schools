import Layout from "../components/Layout";
export default function Home() {
  return (
    <Layout>
      <div className="h-screen pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]">
        <h2 className="text-lg font-sans">
          Hello world, say hi to a cool landing page
        </h2>
      </div>
    </Layout>
  );
}
