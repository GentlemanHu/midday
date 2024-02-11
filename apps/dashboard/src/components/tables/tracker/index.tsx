import { DataTable } from "@/components/tables/tracker/data-table";
import { getCountryInfo } from "@midday/location";
import { getTrackerProjects, getUser } from "@midday/supabase/cached-queries";
import { EmptyState, NoResults } from "./empty-states";

const pageSize = 10;

export async function Table({ initialTrackerId, status, sort, query }) {
  const { currencyCode } = getCountryInfo();
  const { data: userData } = await getUser();
  const { data, meta } = await getTrackerProjects({
    from: 0,
    to: pageSize,
    sort,
    filter: { status },
    search: {
      query,
      fuzzy: true,
    },
  });

  async function loadMore({ from, to }) {
    "use server";

    return getTrackerProjects({
      to,
      from,
      sort,
      filter: { status },
    });
  }

  if (!data?.length && !query.length) {
    return <EmptyState currencyCode={currencyCode} />;
  }

  if (!data?.length && query.length) {
    return <NoResults currencyCode={currencyCode} />;
  }

  return (
    <DataTable
      data={data}
      initialTrackerId={initialTrackerId}
      currencyCode={currencyCode}
      pageSize={pageSize}
      loadMore={loadMore}
      meta={meta}
      user={userData}
    />
  );
}
