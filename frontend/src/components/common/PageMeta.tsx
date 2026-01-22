import { Helmet, HelmetProvider } from "react-helmet-async";

const PageMeta = ({
  description,
}: {
  title?: string;
  description?: string;
}) => {
 return (
  <Helmet>
    <title>{"E-COMMERCE (TEST)"}</title>
    <meta name="description" content={description} />
  </Helmet>
)};


export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
