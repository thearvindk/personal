"use client"

import { Search, Users, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SearchBarProps {
  searchQuery: string
  searchMode: "roles" | "users"
  onSearch: (query: string) => void
  onToggleMode: () => void
  resultsCount: number
}

export function SearchBar({ searchQuery, searchMode, onSearch, onToggleMode, resultsCount }: SearchBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-natwest-purple/60 h-4 w-4" />
          <Input
            type="text"
            placeholder={
              searchMode === "users" ? "Search users by name, email, or ID..." : "Search roles or members..."
            }
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 border-natwest-purple/20 focus:border-natwest-purple focus:ring-natwest-purple/20"
          />
        </div>
        <Button
          onClick={onToggleMode}
          variant="outline"
          className="border-natwest-purple text-natwest-purple hover:bg-natwest-purple hover:text-white bg-transparent"
        >
          {searchMode === "users" ? (
            <>
              <Shield className="h-4 w-4 mr-2" />
              Search Roles
            </>
          ) : (
            <>
              <Users className="h-4 w-4 mr-2" />
              Search Users
            </>
          )}
        </Button>
      </div>

      {searchQuery && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-natwest-purple/10 text-natwest-purple">
            {resultsCount} {searchMode === "users" ? "users" : "roles"} found
          </Badge>
          <span className="text-sm text-gray-600">
            Searching in: <strong>{searchMode === "users" ? "Users" : "Roles"}</strong>
          </span>
        </div>
      )}
    </div>
  )
}
