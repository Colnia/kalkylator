"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HistorikVy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📊</span>
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
