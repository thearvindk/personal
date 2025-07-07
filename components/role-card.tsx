"use client"

import { Users, Mail, Hash, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Role } from "../types/roles"

interface RoleCardProps {
  role: Role
}

export function RoleCard({ role }: RoleCardProps) {
  return (
    <Card className="border-natwest-purple/20 hover:border-natwest-purple/40 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-natwest-purple flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {role.name}
          </CardTitle>
          <Badge variant="secondary" className="bg-natwest-purple/10 text-natwest-purple">
            <Users className="h-3 w-3 mr-1" />
            {role.members.length} {role.members.length === 1 ? "member" : "members"}
          </Badge>
        </div>
        <CardDescription className="text-gray-600">{role.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <h4 className="font-medium text-natwest-purple text-sm">Members</h4>
          <div className="grid gap-3">
            {role.members.map((member) => (
              <div
                key={member.userId}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-natwest-purple/5 transition-colors"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-natwest-purple text-white text-xs">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-3 w-3 text-natwest-purple" />
                    <span className="font-medium text-sm truncate">{member.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Hash className="h-3 w-3" />
                      <span>{member.userId}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Shield({ className }: { className?: string }) {
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
