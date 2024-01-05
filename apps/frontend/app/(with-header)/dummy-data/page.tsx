import { dummyDataApi } from 'api-client';

import { DummyData } from 'src/components/DummyData';
import ReactQueryProvider from 'src/components/QueryProvider';

export default async function DummyDataPage() {
  const { data } = await dummyDataApi.getData({ offset: 0 }).throwOnError();

  return (
    <ReactQueryProvider>
      <DummyData initialData={data} />
    </ReactQueryProvider>
  );
}
