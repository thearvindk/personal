"use client"

import type React from "react"

import { useState, useMemo, useRef, useEffect } from "react"
import styles from "./dashboard.module.css"
import {
  Search,
  RefreshCw,
  Shield,
  Users,
  UserCheck,
  ChevronRight,
  ChevronDown,
  Mail,
  User,
  AlertCircle,
  Activity,
  Filter,
  X,
} from "lucide-react"

// Enhanced mock data with more roles and users
const mockData = {
  roles: [
    {
      id: 1,
      name: "System Administrator",
      description: "Full system access with administrative privileges",
      category: "Technical",
      riskLevel: "High",
      lastModified: "2024-01-15",
      members: [
        {
          id: 1,
          name: "John Smith",
          email: "john.smith@natwest.com",
          userId: "JS001",
          department: "IT",
          joinDate: "2023-06-15",
          status: "Active",
        },
        {
          id: 2,
          name: "Sarah Johnson",
          email: "sarah.johnson@natwest.com",
          userId: "SJ002",
          department: "IT",
          joinDate: "2023-08-20",
          status: "Active",
        },
      ],
    },
    {
      id: 2,
      name: "Finance Manager",
      description: "Manages financial operations and reporting",
      category: "Business",
      riskLevel: "Medium",
      lastModified: "2024-01-10",
      members: [
        {
          id: 3,
          name: "Michael Brown",
          email: "michael.brown@natwest.com",
          userId: "MB003",
          department: "Finance",
          joinDate: "2023-05-10",
          status: "Active",
        },
        {
          id: 4,
          name: "Emma Wilson",
          email: "emma.wilson@natwest.com",
          userId: "EW004",
          department: "Finance",
          joinDate: "2023-07-25",
          status: "Active",
        },
        {
          id: 5,
          name: "David Lee",
          email: "david.lee@natwest.com",
          userId: "DL005",
          department: "Finance",
          joinDate: "2023-09-12",
          status: "Inactive",
        },
        {
          id: 11,
          name: "Rachel Green",
          email: "rachel.green@natwest.com",
          userId: "RG011",
          department: "Finance",
          joinDate: "2023-11-05",
          status: "Active",
        },
        {
          id: 12,
          name: "Mark Thompson",
          email: "mark.thompson@natwest.com",
          userId: "MT012",
          department: "Finance",
          joinDate: "2023-12-01",
          status: "Active",
        },
      ],
    },
    {
      id: 3,
      name: "HR Specialist",
      description: "Human resources management and employee relations",
      category: "Business",
      riskLevel: "Low",
      lastModified: "2024-01-12",
      members: [
        {
          id: 6,
          name: "Lisa Davis",
          email: "lisa.davis@natwest.com",
          userId: "LD006",
          department: "HR",
          joinDate: "2023-04-18",
          status: "Active",
        },
        {
          id: 7,
          name: "Robert Taylor",
          email: "robert.taylor@natwest.com",
          userId: "RT007",
          department: "HR",
          joinDate: "2023-11-03",
          status: "Active",
        },
        {
          id: 13,
          name: "Anna Martinez",
          email: "anna.martinez@natwest.com",
          userId: "AM013",
          department: "HR",
          joinDate: "2023-09-15",
          status: "Active",
        },
      ],
    },
    {
      id: 4,
      name: "Project Manager",
      description: "Oversees project planning, execution, and delivery",
      category: "Management",
      riskLevel: "Medium",
      lastModified: "2024-01-08",
      members: [
        {
          id: 8,
          name: "Jennifer White",
          email: "jennifer.white@natwest.com",
          userId: "JW008",
          department: "Operations",
          joinDate: "2023-03-22",
          status: "Active",
        },
        {
          id: 9,
          name: "Thomas Anderson",
          email: "thomas.anderson@natwest.com",
          userId: "TA009",
          department: "Operations",
          joinDate: "2023-10-15",
          status: "Active",
        },
        {
          id: 10,
          name: "Amanda Clark",
          email: "amanda.clark@natwest.com",
          userId: "AC010",
          department: "Operations",
          joinDate: "2023-12-01",
          status: "Active",
        },
        {
          id: 14,
          name: "Kevin Rodriguez",
          email: "kevin.rodriguez@natwest.com",
          userId: "KR014",
          department: "Operations",
          joinDate: "2023-08-10",
          status: "Active",
        },
      ],
    },
    {
      id: 5,
      name: "Security Analyst",
      description: "Monitors and analyzes security threats and vulnerabilities",
      category: "Technical",
      riskLevel: "High",
      lastModified: "2024-01-14",
      members: [
        {
          id: 15,
          name: "Alex Chen",
          email: "alex.chen@natwest.com",
          userId: "AC015",
          department: "Security",
          joinDate: "2023-07-01",
          status: "Active",
        },
        {
          id: 16,
          name: "Maria Garcia",
          email: "maria.garcia@natwest.com",
          userId: "MG016",
          department: "Security",
          joinDate: "2023-09-20",
          status: "Active",
        },
        {
          id: 17,
          name: "James Wilson",
          email: "james.wilson@natwest.com",
          userId: "JW017",
          department: "Security",
          joinDate: "2023-11-12",
          status: "Active",
        },
      ],
    },
    {
      id: 6,
      name: "Data Analyst",
      description: "Analyzes business data and creates reports",
      category: "Technical",
      riskLevel: "Low",
      lastModified: "2024-01-11",
      members: [
        {
          id: 18,
          name: "Sophie Turner",
          email: "sophie.turner@natwest.com",
          userId: "ST018",
          department: "Analytics",
          joinDate: "2023-06-05",
          status: "Active",
        },
        {
          id: 19,
          name: "Daniel Kim",
          email: "daniel.kim@natwest.com",
          userId: "DK019",
          department: "Analytics",
          joinDate: "2023-08-15",
          status: "Active",
        },
        {
          id: 20,
          name: "Laura Johnson",
          email: "laura.johnson@natwest.com",
          userId: "LJ020",
          department: "Analytics",
          joinDate: "2023-10-01",
          status: "Active",
        },
        {
          id: 21,
          name: "Ryan Murphy",
          email: "ryan.murphy@natwest.com",
          userId: "RM021",
          department: "Analytics",
          joinDate: "2023-12-10",
          status: "Active",
        },
      ],
    },
    {
      id: 7,
      name: "Marketing Coordinator",
      description: "Coordinates marketing campaigns and initiatives",
      category: "Business",
      riskLevel: "Low",
      lastModified: "2024-01-09",
      members: [
        {
          id: 22,
          name: "Emily Davis",
          email: "emily.davis@natwest.com",
          userId: "ED022",
          department: "Marketing",
          joinDate: "2023-05-20",
          status: "Active",
        },
        {
          id: 23,
          name: "Chris Brown",
          email: "chris.brown@natwest.com",
          userId: "CB023",
          department: "Marketing",
          joinDate: "2023-07-08",
          status: "Active",
        },
        {
          id: 24,
          name: "Jessica Lee",
          email: "jessica.lee@natwest.com",
          userId: "JL024",
          department: "Marketing",
          joinDate: "2023-09-25",
          status: "Active",
        },
      ],
    },
    {
      id: 8,
      name: "Customer Support Lead",
      description: "Leads customer support team and escalations",
      category: "Business",
      riskLevel: "Medium",
      lastModified: "2024-01-13",
      members: [
        {
          id: 25,
          name: "Peter Parker",
          email: "peter.parker@natwest.com",
          userId: "PP025",
          department: "Support",
          joinDate: "2023-04-12",
          status: "Active",
        },
        {
          id: 26,
          name: "Mary Jane",
          email: "mary.jane@natwest.com",
          userId: "MJ026",
          department: "Support",
          joinDate: "2023-06-18",
          status: "Active",
        },
        {
          id: 27,
          name: "Harry Osborn",
          email: "harry.osborn@natwest.com",
          userId: "HO027",
          department: "Support",
          joinDate: "2023-08-22",
          status: "Active",
        },
        {
          id: 28,
          name: "Gwen Stacy",
          email: "gwen.stacy@natwest.com",
          userId: "GS028",
          department: "Support",
          joinDate: "2023-11-15",
          status: "Active",
        },
      ],
    },
    {
      id: 9,
      name: "DevOps Engineer",
      description: "Manages deployment pipelines and infrastructure",
      category: "Technical",
      riskLevel: "High",
      lastModified: "2024-01-16",
      members: [
        {
          id: 29,
          name: "Tony Stark",
          email: "tony.stark@natwest.com",
          userId: "TS029",
          department: "Engineering",
          joinDate: "2023-03-15",
          status: "Active",
        },
        {
          id: 30,
          name: "Bruce Banner",
          email: "bruce.banner@natwest.com",
          userId: "BB030",
          department: "Engineering",
          joinDate: "2023-05-28",
          status: "Active",
        },
        {
          id: 31,
          name: "Natasha Romanoff",
          email: "natasha.romanoff@natwest.com",
          userId: "NR031",
          department: "Engineering",
          joinDate: "2023-07-12",
          status: "Active",
        },
      ],
    },
    {
      id: 10,
      name: "Compliance Officer",
      description: "Ensures regulatory compliance and risk management",
      category: "Compliance",
      riskLevel: "High",
      lastModified: "2024-01-17",
      members: [
        {
          id: 32,
          name: "Steve Rogers",
          email: "steve.rogers@natwest.com",
          userId: "SR032",
          department: "Compliance",
          joinDate: "2023-02-20",
          status: "Active",
        },
        {
          id: 33,
          name: "Carol Danvers",
          email: "carol.danvers@natwest.com",
          userId: "CD033",
          department: "Compliance",
          joinDate: "2023-04-05",
          status: "Active",
        },
        {
          id: 34,
          name: "Scott Lang",
          email: "scott.lang@natwest.com",
          userId: "SL034",
          department: "Compliance",
          joinDate: "2023-06-30",
          status: "Active",
        },
        {
          id: 35,
          name: "Hope Van Dyne",
          email: "hope.vandyne@natwest.com",
          userId: "HV035",
          department: "Compliance",
          joinDate: "2023-09-08",
          status: "Active",
        },
      ],
    },
    {
      id: 11,
      name: "Business Analyst",
      description: "Analyzes business processes and requirements",
      category: "Business",
      riskLevel: "Medium",
      lastModified: "2024-01-18",
      members: [
        {
          id: 36,
          name: "Wanda Maximoff",
          email: "wanda.maximoff@natwest.com",
          userId: "WM036",
          department: "Business",
          joinDate: "2023-01-15",
          status: "Active",
        },
        {
          id: 37,
          name: "Vision",
          email: "vision@natwest.com",
          userId: "V037",
          department: "Business",
          joinDate: "2023-03-08",
          status: "Active",
        },
        {
          id: 38,
          name: "Sam Wilson",
          email: "sam.wilson@natwest.com",
          userId: "SW038",
          department: "Business",
          joinDate: "2023-05-22",
          status: "Active",
        },
      ],
    },
    {
      id: 12,
      name: "Quality Assurance Lead",
      description: "Leads quality assurance testing and processes",
      category: "Technical",
      riskLevel: "Medium",
      lastModified: "2024-01-19",
      members: [
        {
          id: 39,
          name: "Bucky Barnes",
          email: "bucky.barnes@natwest.com",
          userId: "BB039",
          department: "QA",
          joinDate: "2023-02-10",
          status: "Active",
        },
        {
          id: 40,
          name: "T'Challa",
          email: "tchalla@natwest.com",
          userId: "T040",
          department: "QA",
          joinDate: "2023-04-25",
          status: "Active",
        },
        {
          id: 41,
          name: "Shuri",
          email: "shuri@natwest.com",
          userId: "S041",
          department: "QA",
          joinDate: "2023-07-18",
          status: "Active",
        },
        {
          id: 42,
          name: "Okoye",
          email: "okoye@natwest.com",
          userId: "O042",
          department: "QA",
          joinDate: "2023-10-12",
          status: "Active",
        },
      ],
    },
  ],
}

export default function AdminRolesDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedRoles, setExpandedRoles] = useState<Set<number>>(new Set())
  const [activeTab, setActiveTab] = useState<"roles" | "members">("roles")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20) // For members view pagination
  const searchRef = useRef<HTMLInputElement>(null)

  // Calculate enhanced statistics
  const totalRoles = mockData.roles.length
  const allMembers = mockData.roles.flatMap((role) =>
    role.members.map((member) => ({ ...member, roleName: role.name, roleId: role.id })),
  )
  const uniqueUsers = allMembers.filter(
    (member, index, self) => index === self.findIndex((m) => m.id === member.id),
  ).length
  const totalAssignments = allMembers.length
  const activeUsers = allMembers.filter((member) => member.status === "Active").length
  const highRiskRoles = mockData.roles.filter((role) => role.riskLevel === "High").length
  const recentlyModified = mockData.roles.filter(
    (role) => new Date(role.lastModified) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).length

  // Get suggestions based on active tab and search term
  const suggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return []

    const term = searchTerm.toLowerCase()
    const results: Array<{ id: string; text: string; type: string; subtitle?: string }> = []

    if (activeTab === "roles") {
      // Role suggestions
      mockData.roles.forEach((role) => {
        if (role.name.toLowerCase().includes(term) || role.description.toLowerCase().includes(term)) {
          results.push({
            id: `role-${role.id}`,
            text: role.name,
            type: "role",
            subtitle: role.description,
          })
        }
      })
    } else {
      // Member suggestions
      const uniqueMembers = allMembers.filter(
        (member, index, self) => index === self.findIndex((m) => m.id === member.id),
      )

      uniqueMembers.forEach((member) => {
        if (
          member.name.toLowerCase().includes(term) ||
          member.email.toLowerCase().includes(term) ||
          member.userId.toLowerCase().includes(term) ||
          member.department.toLowerCase().includes(term)
        ) {
          results.push({
            id: `member-${member.id}`,
            text: member.name,
            type: "member",
            subtitle: `${member.email} • ${member.department}`,
          })
        }
      })
    }

    return results.slice(0, 8) // Increased to 8 suggestions for better UX
  }, [searchTerm, activeTab, allMembers])

  // Filter data based on search and tab - HIDE NON-MATCHING ROLES
  const filteredData = useMemo(() => {
    if (activeTab === "roles") {
      if (!searchTerm) return mockData.roles

      // Only show roles that match the search term
      return mockData.roles.filter(
        (role) =>
          role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          role.members.some(
            (member) =>
              member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              member.department.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      )
    } else {
      // Members view - group by user with pagination
      const uniqueMembers = allMembers.filter(
        (member, index, self) => index === self.findIndex((m) => m.id === member.id),
      )

      let filtered = uniqueMembers
      if (searchTerm) {
        filtered = uniqueMembers.filter(
          (member) =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.department.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      // Pagination for members
      const startIndex = (currentPage - 1) * itemsPerPage
      return filtered.slice(startIndex, startIndex + itemsPerPage)
    }
  }, [searchTerm, activeTab, allMembers, currentPage, itemsPerPage])

  // Get total count for pagination
  const totalFilteredMembers = useMemo(() => {
    if (activeTab !== "members") return 0

    const uniqueMembers = allMembers.filter(
      (member, index, self) => index === self.findIndex((m) => m.id === member.id),
    )

    if (!searchTerm) return uniqueMembers.length

    return uniqueMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.department.toLowerCase().includes(searchTerm.toLowerCase()),
    ).length
  }, [searchTerm, activeTab, allMembers])

  const totalPages = Math.ceil(totalFilteredMembers / itemsPerPage)

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
    if (activeTab === "roles") {
      setExpandedRoles(new Set(filteredData.map((role: any) => role.id)))
    }
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setShowSuggestions(true)
    setSelectedSuggestion(-1)
    setCurrentPage(1) // Reset to first page when searching
  }

  const clearSearch = () => {
    setSearchTerm("")
    setShowSuggestions(false)
    setCurrentPage(1)
  }

  const handleSuggestionClick = (suggestion: any) => {
    setSearchTerm(suggestion.text)
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedSuggestion((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedSuggestion((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (selectedSuggestion >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestion])
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedSuggestion(-1)
        break
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "High":
        return styles.riskHigh
      case "Medium":
        return styles.riskMedium
      case "Low":
        return styles.riskLow
      default:
        return styles.riskMedium
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? styles.statusActive : styles.statusInactive
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Compact Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Shield className={styles.headerIcon} />
            <div>
              <h1 className={styles.title}>Admin Roles Dashboard</h1>
              <p className={styles.subtitle}>
                Managing {totalRoles} roles • {uniqueUsers} users • {totalAssignments} assignments
              </p>
            </div>
          </div>
          <button
            className={`${styles.button} ${styles.buttonOutline} ${isRefreshing ? styles.buttonDisabled : ""}`}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`${styles.buttonIcon} ${isRefreshing ? styles.spinning : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Compact Statistics Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIconWrapper}>
                <Shield className={styles.statIcon} />
              </div>
              <div>
                <p className={styles.statNumber}>{totalRoles}</p>
                <p className={styles.statLabel}>Roles</p>
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
                <p className={styles.statLabel}>Users</p>
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
                <p className={styles.statLabel}>Assignments</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIconWrapper}>
                <AlertCircle className={styles.statIcon} />
              </div>
              <div>
                <p className={styles.statNumber}>{highRiskRoles}</p>
                <p className={styles.statLabel}>High Risk</p>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statIconWrapper}>
                <Activity className={styles.statIcon} />
              </div>
              <div>
                <p className={styles.statNumber}>{activeUsers}</p>
                <p className={styles.statLabel}>Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "roles" ? styles.tabActive : ""}`}
              onClick={() => {
                setActiveTab("roles")
                setCurrentPage(1)
              }}
            >
              <Shield className={styles.tabIcon} />
              Roles ({totalRoles})
            </button>
            <button
              className={`${styles.tab} ${activeTab === "members" ? styles.tabActive : ""}`}
              onClick={() => {
                setActiveTab("members")
                setCurrentPage(1)
              }}
            >
              <Users className={styles.tabIcon} />
              Members ({uniqueUsers})
            </button>
          </div>
        </div>

        {/* Enhanced Search Bar with Clear Button */}
        <div className={styles.searchContainer} ref={searchRef}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder={
                activeTab === "roles"
                  ? "Search roles, descriptions, categories, or members..."
                  : "Search members, emails, departments, or user IDs..."
              }
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button className={styles.clearButton} onClick={clearSearch}>
                <X className={styles.clearIcon} />
              </button>
            )}

            {/* Enhanced Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className={styles.suggestionsDropdown}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion.id}
                    className={`${styles.suggestionItem} ${index === selectedSuggestion ? styles.suggestionSelected : ""}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className={styles.suggestionIcon}>{suggestion.type === "role" ? <Shield /> : <User />}</div>
                    <div className={styles.suggestionContent}>
                      <div className={styles.suggestionText}>{suggestion.text}</div>
                      {suggestion.subtitle && <div className={styles.suggestionSubtitle}>{suggestion.subtitle}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className={styles.searchInfo}>
            <Filter className={styles.searchInfoIcon} />
            <span>
              {activeTab === "roles"
                ? `Showing ${filteredData.length} of ${totalRoles} roles`
                : `Showing ${filteredData.length} of ${totalFilteredMembers} members`}
              {searchTerm && ` matching "${searchTerm}"`}
            </span>
            {searchTerm && (
              <button className={styles.clearSearchButton} onClick={clearSearch}>
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Compact Controls - Only for roles view */}
        {activeTab === "roles" && filteredData.length > 0 && (
          <div className={styles.controls}>
            <button className={styles.controlButton} onClick={expandAll}>
              Expand All ({filteredData.length})
            </button>
            <button className={styles.controlButton} onClick={collapseAll}>
              Collapse All
            </button>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === "roles" ? (
          <div>
            <div className={styles.rolesGrid}>
              {(filteredData as any[]).map((role) => (
                <div key={role.id} className={styles.roleCard}>
                  <div className={styles.roleHeader} onClick={() => toggleRole(role.id)}>
                    <div className={styles.roleHeaderContent}>
                      {expandedRoles.has(role.id) ? (
                        <ChevronDown className={styles.chevron} />
                      ) : (
                        <ChevronRight className={styles.chevron} />
                      )}
                      <Shield className={styles.roleIcon} />
                      <div className={styles.roleInfo}>
                        <div className={styles.roleNameRow}>
                          <h3 className={styles.roleName}>{role.name}</h3>
                          <span className={`${styles.riskBadge} ${getRiskLevelColor(role.riskLevel)}`}>
                            {role.riskLevel}
                          </span>
                        </div>
                        <p className={styles.roleDescription}>{role.description}</p>
                        <div className={styles.roleMetadata}>
                          <span className={styles.roleCategory}>{role.category}</span>
                          <span className={styles.roleModified}>{role.lastModified}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.memberCount}>
                      <Users className={styles.memberCountIcon} />
                      <span>{role.members.length}</span>
                    </div>
                  </div>

                  {expandedRoles.has(role.id) && (
                    <div className={styles.roleMembers}>
                      <h4 className={styles.membersTitle}>Members ({role.members.length})</h4>
                      <div className={styles.membersList}>
                        {role.members.map((member: any) => (
                          <div key={member.id} className={styles.memberCard}>
                            <div className={styles.memberIconWrapper}>
                              <User className={styles.memberIcon} />
                            </div>
                            <div className={styles.memberInfo}>
                              <div className={styles.memberNameRow}>
                                <p className={styles.memberName}>{member.name}</p>
                                <span className={`${styles.statusBadge} ${getStatusColor(member.status)}`}>
                                  {member.status}
                                </span>
                              </div>
                              <div className={styles.memberDetails}>
                                <div className={styles.memberEmail}>
                                  <Mail className={styles.emailIcon} />
                                  {member.email}
                                </div>
                                <span className={styles.memberBadge}>{member.userId}</span>
                                <span className={styles.memberDepartment}>{member.department}</span>
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
        ) : (
          <div>
            <div className={styles.membersGrid}>
              {(filteredData as any[]).map((member) => {
                const memberRoles = allMembers.filter((m) => m.id === member.id)
                return (
                  <div key={member.id} className={styles.memberDetailCard}>
                    <div className={styles.memberDetailHeader}>
                      <div className={styles.memberDetailIconWrapper}>
                        <User className={styles.memberDetailIcon} />
                      </div>
                      <div className={styles.memberDetailInfo}>
                        <div className={styles.memberDetailNameRow}>
                          <h3 className={styles.memberDetailName}>{member.name}</h3>
                          <span className={`${styles.statusBadge} ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                        </div>
                        <div className={styles.memberDetailContact}>
                          <Mail className={styles.emailIcon} />
                          {member.email}
                        </div>
                        <div className={styles.memberDetailMeta}>
                          <span className={styles.memberBadge}>{member.userId}</span>
                          <span className={styles.memberDepartment}>{member.department}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.memberRoles}>
                      <h4 className={styles.memberRolesTitle}>Roles ({memberRoles.length})</h4>
                      <div className={styles.memberRolesList}>
                        {memberRoles.map((roleAssignment) => {
                          const role = mockData.roles.find((r) => r.id === roleAssignment.roleId)
                          return (
                            <div key={`${member.id}-${roleAssignment.roleId}`} className={styles.memberRoleItem}>
                              <Shield className={styles.memberRoleIcon} />
                              <div className={styles.memberRoleInfo}>
                                <span className={styles.memberRoleName}>{roleAssignment.roleName}</span>
                                <span
                                  className={`${styles.riskBadge} ${getRiskLevelColor(role?.riskLevel || "Medium")}`}
                                >
                                  {role?.riskLevel}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination for Members */}
            {activeTab === "members" && totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  className={`${styles.paginationButton} ${currentPage === 1 ? styles.paginationDisabled : ""}`}
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <div className={styles.paginationInfo}>
                  Page {currentPage} of {totalPages} • {totalFilteredMembers} total members
                </div>

                <button
                  className={`${styles.paginationButton} ${currentPage === totalPages ? styles.paginationDisabled : ""}`}
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {filteredData.length === 0 && (
          <div className={styles.emptyState}>
            <Users className={styles.emptyIcon} />
            <p className={styles.emptyText}>
              No {activeTab === "roles" ? "roles" : "members"} found matching your search.
            </p>
            {searchTerm && (
              <button className={styles.clearSearchButton} onClick={clearSearch}>
                Clear search to see all {activeTab}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
