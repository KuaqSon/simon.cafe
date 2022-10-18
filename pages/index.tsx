import PublicLayout from 'components/layout/PublicLayout';
import FallbackLoader from 'components/loading/FallbackLoader';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const FeedsContainer = dynamic(() => import('src/container/feeds'), {
  suspense: true,
});

export default function IndexPage() {
  return (
    <>
      <PublicLayout>
        <Suspense fallback={<FallbackLoader />}>
          <FeedsContainer />
        </Suspense>
      </PublicLayout>
    </>
  );
}
