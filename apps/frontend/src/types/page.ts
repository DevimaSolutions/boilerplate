export interface PageProps<TSearchParams = never, TParams = never> {
  params: TParams;
  searchParams: TSearchParams;
}
