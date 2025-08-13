"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History } from "lucide-react"

export function HistorikVy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Historik
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Här kommer tidigare kalkyleringar att visas. Funktionaliteten kommer att implementeras i nästa steg.
        </p>
      </CardContent>
    </Card>
  )
}
