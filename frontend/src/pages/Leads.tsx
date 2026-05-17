import { useEffect, useState } from "react";

import { Plus, Pencil, Trash2, Search } from "lucide-react";

import toast from "react-hot-toast";

import { deleteLead, getLeads } from "../api/leads.api";

import type { LeadWithId } from "../types/lead.types";

import LeadModal from "../components/leads/LeadModal";

const Leads = () => {
  const [leads, setLeads] = useState<LeadWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingLead, setEditingLead] = useState<LeadWithId | null>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const data = await getLeads({
        page,
        search,
        status,
        source,
      });

      setLeads(data.data || []);

      setPages(data.pagination?.pages || 1);
    } catch (error) {
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, search, status, source]);

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this lead?",
      );

      if (!confirmDelete) return;

      await deleteLead(id);

      toast.success("Lead deleted successfully");

      fetchLeads();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Leads Management
          </h1>

          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Manage and track all sales leads
          </p>
        </div>

        <button
          onClick={() => {
            setEditingLead(null);

            setOpenModal(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow-lg transition hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Lead
        </button>
      </div>

      {/* Filters */}
      <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-900 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            placeholder="Search name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setPage(1);
            }}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);

            setPage(1);
          }}
          className="rounded-xl border border-gray-200 bg-gray-50 p-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Status</option>

          <option value="New">New</option>

          <option value="Contacted">Contacted</option>

          <option value="Qualified">Qualified</option>

          <option value="Lost">Lost</option>
        </select>

        <select
          value={source}
          onChange={(e) => {
            setSource(e.target.value);

            setPage(1);
          }}
          className="rounded-xl border border-gray-200 bg-gray-50 p-3 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Sources</option>

          <option value="Website">Website</option>

          <option value="Instagram">Instagram</option>

          <option value="Referral">Referral</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Source
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500">
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-500">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-t border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {lead.name}
                    </td>

                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {lead.email}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          lead.status === "Qualified"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : lead.status === "Lost"
                              ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                              : lead.status === "Contacted"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {lead.source}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {(user?.role === "admin" ||
                          lead.assignedUser?._id === user?.id) && (
                          <button
                            onClick={() => {
                              setEditingLead(lead);

                              setOpenModal(true);
                            }}
                            className="flex items-center gap-1 rounded-lg bg-yellow-500 px-3 py-2 text-sm text-white transition hover:bg-yellow-600"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </button>
                        )}

                        {user?.role === "admin" && (
                          <button
                            onClick={() => handleDelete(lead._id)}
                            className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-2 text-sm text-white transition hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`rounded-lg px-4 py-2 transition ${
              page === p
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Modal */}
      <LeadModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);

          setEditingLead(null);
        }}
        onSuccess={fetchLeads}
        editingLead={editingLead}
      />
    </div>
  );
};

export default Leads;
