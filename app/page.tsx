"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw, Shield, Users, UserCheck, ChevronRight, ChevronDown, Mail, User } from "lucide-react"

// Mock data structure
const mockData = {
  roles: [
    {
      id: 1,
      name: "System Administrator",
      description: "Full system access with administrative privileges",
      members: [
        { id: 1, name: "John Smith", email: "john.smith@natwest.com", userId: "JS001" },
        { id: 2, name: "Sarah Johnson", email: "sarah.johnson@natwest.com", userId: "SJ002" },
      ],
    },
    {
      id: 2,
      name: "Finance Manager",
      description: "Manages financial operations and reporting",
      members: [
        { id: 3, name: "Michael Brown", email: "michael.brown@natwest.com", userId: "MB003" },
        { id: 4, name: "Emma Wilson", email: "emma.wilson@natwest.com", userId: "EW004" },
        { id: 5, name: "David Lee", email: "david.lee@natwest.com", userId: "DL005" },
      ],
    },
    {
      id: 3,
      name: "HR Specialist",
      description: "Human resources management and employee relations",
      members: [
        { id: 6, name: "Lisa Davis", email: "lisa.davis@natwest.com", userId: "LD006" },
        { id: 7, name: "Robert Taylor", email: "robert.taylor@natwest.com", userId: "RT007" },
      ],
    },
    {
      id: 4,
      name: "Project Manager",
      description: "Oversees project planning, execution, and delivery",
      members: [
        { id: 8, name: "Jennifer White", email: "jennifer.white@natwest.com", userId: "JW008" },
        { id: 9, name: "Thomas Anderson", email: "thomas.anderson@natwest.com", userId: "TA009" },
        { id: 10, name: "Amanda Clark", email: "amanda.clark@natwest.com", userId: "AC010" },
      ],
    },
  ],
}

export default function AdminRolesDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedRoles, setExpandedRoles] = useState<Set<number>>(new Set())
  const [searchMode, setSearchMode] = useState<"roles" | "users">("roles")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Calculate statistics
  const totalRoles = mockData.roles.length
  const uniqueUsers = mockData.roles.reduce((acc, role) => acc + role.members.length, 0)
  const totalAssignments = uniqueUsers

  // Filter and search logic
  const filteredData = useMemo(() => {
    if (!searchTerm) return mockData.roles

    if (searchMode === "users") {
      // Search for users and return their roles
      const userRoles = mockData.roles.filter((role) =>
        role.members.some(
          (member) =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.userId.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
      return userRoles
    } else {
      // Search for roles
      return mockData.roles.filter(
        (role) =>
          role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.members.some(
            (member) =>
              member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              member.email.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      )
    }
  }, [searchTerm, searchMode])

  const toggleRole = (roleId: number) => {
    const newExpanded = new Set(expandedRoles)
    if (newExpanded.has(roleId)) {
      newExpanded.delete(roleId)
    } else {
      newExpanded.add(roleId)
    }
    setExpandedRoles(newExpanded)
  }

  const expandAll = () => {
    setExpandedRoles(new Set(filteredData.map((role) => role.id)))
  }

  const collapseAll = () => {
    setExpandedRoles(new Set())
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would fetch fresh data from your API here
    // const freshData = await fetchRolesData()

    console.log("Data refreshed successfully!")
    setIsRefreshing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-natwest-purple" />
            <div>
              <h1 className="text-3xl font-bold text-natwest-purple">Admin Roles Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage user roles and permissions across your organization</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="border-natwest-purple text-natwest-purple hover:bg-natwest-purple hover:text-white bg-transparent disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-natwest-purple">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-natwest-purple/10 rounded-full">
                  <Shield className="h-6 w-6 text-natwest-purple" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-natwest-purple">{totalRoles}</p>
                  <p className="text-gray-600">Total Roles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-natwest-purple">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-natwest-purple/10 rounded-full">
                  <Users className="h-6 w-6 text-natwest-purple" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-natwest-purple">{uniqueUsers}</p>
                  <p className="text-gray-600">Unique Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-natwest-purple">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-natwest-purple/10 rounded-full">
                  <UserCheck className="h-6 w-6 text-natwest-purple" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-natwest-purple">{totalAssignments}</p>
                  <p className="text-gray-600">Total Assignments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search roles or members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-natwest-purple focus:ring-natwest-purple"
            />
          </div>
          <Button
            variant={searchMode === "users" ? "default" : "outline"}
            onClick={() => setSearchMode(searchMode === "users" ? "roles" : "users")}
            className={
              searchMode === "users"
                ? "bg-natwest-purple hover:bg-natwest-purple/90"
                : "border-natwest-purple text-natwest-purple hover:bg-natwest-purple hover:text-white"
            }
          >
            <User className="h-4 w-4 mr-2" />
            Search Users
          </Button>
        </div>

        {/* Expand/Collapse Controls */}
        <div className="flex gap-4">
          <Button variant="ghost" onClick={expandAll} className="text-natwest-purple hover:bg-natwest-purple/10">
            Expand All
          </Button>
          <Button variant="ghost" onClick={collapseAll} className="text-natwest-purple hover:bg-natwest-purple/10">
            Collapse All
          </Button>
        </div>

        {/* Roles Section */}
        <div>
          <h2 className="text-xl font-semibold text-natwest-purple mb-4">All Roles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredData.map((role) => (
              <Card key={role.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div
                    className="p-6 cursor-pointer flex items-center justify-between hover:bg-gray-50"
                    onClick={() => toggleRole(role.id)}
                  >
                    <div className="flex items-center gap-4">
                      {expandedRoles.has(role.id) ? (
                        <ChevronDown className="h-5 w-5 text-natwest-purple" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-natwest-purple" />
                      )}
                      <Shield className="h-5 w-5 text-natwest-purple" />
                      <div>
                        <h3 className="font-semibold text-natwest-purple">{role.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{role.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-natwest-purple" />
                      <span className="text-natwest-purple font-medium">{role.members.length} members</span>
                    </div>
                  </div>

                  {expandedRoles.has(role.id) && (
                    <div className="border-t bg-gray-50 p-6">
                      <h4 className="font-medium text-natwest-purple mb-4">Role Members</h4>
                      <div className="space-y-3">
                        {role.members.map((member) => (
                          <div key={member.id} className="flex items-center gap-4 p-3 bg-white rounded-lg border">
                            <div className="p-2 bg-natwest-purple/10 rounded-full">
                              <User className="h-4 w-4 text-natwest-purple" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{member.name}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {member.email}
                                </div>
                                <Badge variant="secondary" className="bg-natwest-purple/10 text-natwest-purple">
                                  {member.userId}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No roles or users found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
