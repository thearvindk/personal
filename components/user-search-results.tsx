"use client"

import { Mail, Hash, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { User as UserType, Role } from "../types/roles"

interface UserSearchResultsProps {
  results: Array<{ user: UserType; roles: Role[] }>
}

export function UserSearchResults({ results }: UserSearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
        <p className="text-gray-600">Try adjusting your search terms</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {results.map(({ user, roles }) => (
        <Card key={user.userId} className="border-natwest-purple/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-natwest-purple text-white">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-natwest-purple flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {user.name}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Hash className="h-4 w-4" />
                    {user.userId}
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-natwest-purple/10 text-natwest-purple">
                {roles.length} {roles.length === 1 ? "role" : "roles"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <h4 className="font-medium text-natwest-purple text-sm">Assigned Roles</h4>
              <div className="grid gap-2">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <UserShield className="h-4 w-4 text-natwest-purple" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{role.name}</div>
                      <div className="text-xs text-gray-600">{role.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function UserShield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  )
}
