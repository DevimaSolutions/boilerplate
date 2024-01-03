import { DummyData } from 'src/components/DummyData';
import ReactQueryProvider from 'src/components/QueryProvider';

export default function DummyDataPage() {
  return (
    <ReactQueryProvider>
      <DummyData />
    </ReactQueryProvider>
  );
}
