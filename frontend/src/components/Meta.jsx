import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Jamciya Project',
  description: 'Your project management solution',
  keywords: 'project management, collaboration, Jamciya',
};

export default Meta;
