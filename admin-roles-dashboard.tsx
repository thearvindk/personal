"use client"

import { useEffect } from "react"
import { RefreshCw, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRolesDashboard } from "./hooks/use-roles-dashboard"
import { SearchBar } from "./components/search-bar"
import { RoleCard } from "./components/role-card"
import { UserSearchResults } from "./components/user-search-results"

export default function AdminRolesDashboard() {
  const { data, searchQuery, searchResults, searchMode, isLoading, handleSearch, toggleSearchMode, fetchData } =
    useRolesDashboard()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const displayData = searchQuery ? searchResults : searchMode === "roles" ? data.roles : []
  const totalUsers = data.roles.reduce((acc, role) => acc + role.members.length, 0)
  const uniqueUsers = new Set(data.roles.flatMap((role) => role.members.map((m) => m.userId))).size

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-natwest-purple flex items-center gap-3">
                <Shield className="h-8 w-8" />
                Admin Roles Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Manage user roles and permissions across your organization</p>
            </div>
            <Button
              onClick={fetchData}
              disabled={isLoading}
              variant="outline"
              className="border-natwest-purple text-natwest-purple hover:bg-natwest-purple hover:text-white bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh Data
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg border border-natwest-purple/20 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-natwest-purple/10 rounded-lg">
                  <Shield className="h-5 w-5 text-natwest-purple" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-natwest-purple">{data.roles.length}</div>
                  <div className="text-sm text-gray-600">Total Roles</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-natwest-purple/20 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-natwest-purple/10 rounded-lg">
                  <Users className="h-5 w-5 text-natwest-purple" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-natwest-purple">{uniqueUsers}</div>
                  <div className="text-sm text-gray-600">Unique Users</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-natwest-purple/20 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-natwest-purple/10 rounded-lg">
                  <Users className="h-5 w-5 text-natwest-purple" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-natwest-purple">{totalUsers}</div>
                  <div className="text-sm text-gray-600">Total Assignments</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar
            searchQuery={searchQuery}
            searchMode={searchMode}
            onSearch={handleSearch}
            onToggleMode={toggleSearchMode}
            resultsCount={Array.isArray(displayData) ? displayData.length : 0}
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-natwest-purple" />
              <span className="ml-3 text-natwest-purple">Loading roles data...</span>
            </div>
          ) : searchMode === "users" && searchQuery ? (
            <UserSearchResults results={displayData as Array<{ user: any; roles: any[] }>} />
          ) : (
            <>
              {!searchQuery && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-natwest-purple mb-4">All Roles</h2>
                </div>
              )}
              <div className="grid gap-6 lg:grid-cols-2">
                {(displayData as any[]).map((role) => (
                  <RoleCard key={role.id} role={role} />
                ))}
              </div>
              {searchQuery && displayData.length === 0 && (
                <div className="text-center py-12">
                  <svg
                    className="h-12 w-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
                  <p className="text-gray-600">Try adjusting your search terms</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
