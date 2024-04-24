// pages/[page].tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

const DynamicPage: React.FC = () => {
  const router = useRouter();
  const { page } = router.query;

  // Function to render content based on the page query parameter
  const renderPageContent = () => {
    switch (page) {
      case 'center-a-div':
        return <div>This is the page for Exercise One</div>;
      case 'table':
        return <div>This is the page for Exercise Two</div>;
      case 'javascript':
        return <div>This is the page for Exercise Three</div>;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className='containerss'>
      <h2>Page: {page}</h2> {/* Display page name dynamically */}
      {renderPageContent()}
      <Link href="/" className='btn btn-back'>Back to Home</Link>
    </div>
  );
}

export default DynamicPage;
