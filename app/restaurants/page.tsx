import { SimpleTable } from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function RestaurantsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Restaurants
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Browse partner restaurants. Filters and sorting will connect to the
            new API later.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button className="rounded-full border border-gray-300 px-3 py-1 text-gray-700 hover:border-emerald-500 hover:text-emerald-700">
            All cuisines
          </button>
          <button className="rounded-full border border-gray-300 px-3 py-1 text-gray-700 hover:border-emerald-500 hover:text-emerald-700">
            Nearby
          </button>
          <button className="rounded-full border border-gray-300 px-3 py-1 text-gray-700 hover:border-emerald-500 hover:text-emerald-700">
            Featured
          </button>
        </div>
      </div>

      <SimpleTable
        columns={[
          { key: "name", label: "Restaurant" },
          { key: "location", label: "Neighborhood" },
          { key: "cuisine", label: "Cuisine" },
          { key: "status", label: "Status" },
        ]}
      >
        <tr className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm font-medium text-gray-900">
            Willow Street Wine Bar
          </td>
          <td className="px-4 py-3 text-sm text-gray-600">Downtown</td>
          <td className="px-4 py-3 text-sm text-gray-600">Modern American</td>
          <td className="px-4 py-3">
            <StatusBadge status="active" />
          </td>
        </tr>
        <tr className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm font-medium text-gray-900">
            La Plaza Cantina
          </td>
          <td className="px-4 py-3 text-sm text-gray-600">Midtown</td>
          <td className="px-4 py-3 text-sm text-gray-600">Mexican</td>
          <td className="px-4 py-3">
            <StatusBadge status="active" />
          </td>
        </tr>
        <tr className="hover:bg-gray-50">
          <td className="px-4 py-3 text-sm font-medium text-gray-900">
            Harbor Roof Lounge
          </td>
          <td className="px-4 py-3 text-sm text-gray-600">Waterfront</td>
          <td className="px-4 py-3 text-sm text-gray-600">Cocktails</td>
          <td className="px-4 py-3">
            <StatusBadge status="pending" />
          </td>
        </tr>
      </SimpleTable>
    </div>
  );
}
