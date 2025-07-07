"use client"

import { useState, useMemo } from "react"
import styles from "./dashboard.module.css"
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
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Data refreshed successfully!")
    setIsRefreshing(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Shield className={styles.headerIcon} />
            <div>
              <h1 className={styles.title}>Admin Roles Dashboard</h1>
              <p className={styles.subtitle}>Manage user roles and permissions across your organization</p>
            </div>
          </div>
          <button
            className={`${styles.button} ${styles.buttonOutline} ${isRefreshing ? styles.buttonDisabled : ""}`}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`${styles.buttonIcon} ${isRefreshing ? styles.spinning : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        {/* Statistics Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIconWrapper}>
                <Shield className={styles.statIcon} />
              </div>
              <div>
                <p className={styles.statNumber}>{totalRoles}</p>
                <p className={styles.statLabel}>Total Roles</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIconWrapper}>
                <Users className={styles.statIcon} />
              </div>
              <div>
                <p className={styles.statNumber}>{uniqueUsers}</p>
                <p className={styles.statLabel}>Unique Users</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIconWrapper}>
                <UserCheck className={styles.statIcon} />
              </div>
              <div>
                <p className={styles.statNumber}>{totalAssignments}</p>
                <p className={styles.statLabel}>Total Assignments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search roles or members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button
            className={`${styles.button} ${searchMode === "users" ? styles.buttonPrimary : styles.buttonOutline}`}
            onClick={() => setSearchMode(searchMode === "users" ? "roles" : "users")}
          >
            <User className={styles.buttonIcon} />
            Search Users
          </button>
        </div>

        {/* Expand/Collapse Controls */}
        <div className={styles.controls}>
          <button className={styles.controlButton} onClick={expandAll}>
            Expand All
          </button>
          <button className={styles.controlButton} onClick={collapseAll}>
            Collapse All
          </button>
        </div>

        {/* Roles Section */}
        <div>
          <h2 className={styles.sectionTitle}>All Roles</h2>
          <div className={styles.rolesGrid}>
            {filteredData.map((role) => (
              <div key={role.id} className={styles.roleCard}>
                <div className={styles.roleHeader} onClick={() => toggleRole(role.id)}>
                  <div className={styles.roleHeaderContent}>
                    {expandedRoles.has(role.id) ? (
                      <ChevronDown className={styles.chevron} />
                    ) : (
                      <ChevronRight className={styles.chevron} />
                    )}
                    <Shield className={styles.roleIcon} />
                    <div>
                      <h3 className={styles.roleName}>{role.name}</h3>
                      <p className={styles.roleDescription}>{role.description}</p>
                    </div>
                  </div>
                  <div className={styles.memberCount}>
                    <Users className={styles.memberCountIcon} />
                    <span>{role.members.length} members</span>
                  </div>
                </div>

                {expandedRoles.has(role.id) && (
                  <div className={styles.roleMembers}>
                    <h4 className={styles.membersTitle}>Role Members</h4>
                    <div className={styles.membersList}>
                      {role.members.map((member) => (
                        <div key={member.id} className={styles.memberCard}>
                          <div className={styles.memberIconWrapper}>
                            <User className={styles.memberIcon} />
                          </div>
                          <div className={styles.memberInfo}>
                            <p className={styles.memberName}>{member.name}</p>
                            <div className={styles.memberDetails}>
                              <div className={styles.memberEmail}>
                                <Mail className={styles.emailIcon} />
                                {member.email}
                              </div>
                              <span className={styles.memberBadge}>{member.userId}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {filteredData.length === 0 && (
          <div className={styles.emptyState}>
            <Users className={styles.emptyIcon} />
            <p className={styles.emptyText}>No roles or users found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
