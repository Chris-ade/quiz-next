import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function useTitle(title: string) {
  const router = useRouter();
  const { pathname } = router;
  const [documentTitle, setDocumentTitle] = useState(title);

  useEffect(() => {
    // Update title based on route
    setDocumentTitle(title);
  }, [pathname]);

  document.title = documentTitle;
}

export default useTitle;