"use client"

import { useState, useMemo, useCallback } from "react"
import type { Role, User, ApiResponse } from "../types/roles"

// Mock API data - replace with your actual API call
const mockApiResponse: ApiResponse = {
  roles: [
    {
      id: "1",
      name: "System Administrator",
      description: "Full system access with administrative privileges",
      members: [
        { userId: "USR001", name: "John Smith", email: "john.smith@company.com" },
        { userId: "USR002", name: "Sarah Johnson", email: "sarah.johnson@company.com" },
      ],
    },
    {
      id: "2",
      name: "Finance Manager",
      description: "Manages financial operations and reporting",
      members: [
        { userId: "USR003", name: "Michael Brown", email: "michael.brown@company.com" },
        { userId: "USR004", name: "Emma Wilson", email: "emma.wilson@company.com" },
        { userId: "USR005", name: "David Lee", email: "david.lee@company.com" },
      ],
    },
    {
      id: "3",
      name: "HR Specialist",
      description: "Human resources management and employee relations",
      members: [
        { userId: "USR006", name: "Lisa Davis", email: "lisa.davis@company.com" },
        { userId: "USR007", name: "Robert Taylor", email: "robert.taylor@company.com" },
      ],
    },
    {
      id: "4",
      name: "Project Manager",
      description: "Oversees project planning, execution, and delivery",
      members: [
        { userId: "USR008", name: "Jennifer Martinez", email: "jennifer.martinez@company.com" },
        { userId: "USR009", name: "Christopher Anderson", email: "christopher.anderson@company.com" },
        { userId: "USR010", name: "Amanda Thompson", email: "amanda.thompson@company.com" },
      ],
    },
  ],
}

export function useRolesDashboard() {
  const [data, setData] = useState<ApiResponse>(mockApiResponse)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchMode, setSearchMode] = useState<"roles" | "users">("roles")

  // Memoized search results for performance
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return searchMode === "roles" ? data.roles : []
    }

    const query = searchQuery.toLowerCase()

    if (searchMode === "users") {
      // Search for users across all roles
      const userResults: Array<{ user: User; roles: Role[] }> = []
      const userMap = new Map<string, { user: User; roles: Role[] }>()

      data.roles.forEach((role) => {
        role.members.forEach((member) => {
          const matchesSearch =
            member.name.toLowerCase().includes(query) ||
            member.email.toLowerCase().includes(query) ||
            member.userId.toLowerCase().includes(query)

          if (matchesSearch) {
            if (userMap.has(member.userId)) {
              userMap.get(member.userId)!.roles.push(role)
            } else {
              userMap.set(member.userId, { user: member, roles: [role] })
            }
          }
        })
      })

      return Array.from(userMap.values())
    } else {
      // Search for roles
      return data.roles.filter(
        (role) =>
          role.name.toLowerCase().includes(query) ||
          role.description.toLowerCase().includes(query) ||
          role.members.some(
            (member) =>
              member.name.toLowerCase().includes(query) ||
              member.email.toLowerCase().includes(query) ||
              member.userId.toLowerCase().includes(query),
          ),
      )
    }
  }, [data.roles, searchQuery, searchMode])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const toggleSearchMode = useCallback(() => {
    setSearchMode((prev) => (prev === "roles" ? "users" : "roles"))
    setSearchQuery("")
  }, [])

  // Mock API fetch function
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setData(mockApiResponse)
    } catch (error) {
      console.error("Failed to fetch roles data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    data,
    searchQuery,
    searchResults,
    searchMode,
    isLoading,
    handleSearch,
    toggleSearchMode,
    fetchData,
  }
}
