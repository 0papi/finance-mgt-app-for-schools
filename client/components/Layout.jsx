import Head from "next/head";

export default function Layout({ children, title, description, keywords }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {children}
    </div>
  );
}

Layout.defaultProps = {
  title: "Feeminder | Managing Fees For Better Operations",
  description: "Manage all students and their fees on one platform",
  keywords: "fees, school, management, dashboard, payment",
};
