import Head from "next/head";
import Header from "./Header";

export default function Layout({ children, title, description, keywords }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header/>
      {children}
    </div>
  );
}

Layout.defaultProps = {
  title: "Feeminder | Managing Fees For Better Operations",
  description: "Manage all students and their fees on one platform",
  keywords: "fees, school, management, dashboard, payment",
};
