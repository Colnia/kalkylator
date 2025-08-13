"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Wrench, Clock, Package } from "lucide-react"

interface ReparationSektionProps {
  state: any
  updateState: (key: string, value: any) => void
}

export function ReparationSektion({ state, updateState }: ReparationSektionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Reparationsdetaljer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="anläggning">Typ av anläggning</Label>
            <Input
              id="anläggning"
              value={state.anläggning}
              onChange={(e) => updateState("anläggning", e.target.value)}
              placeholder="T.ex. Luftvärmepump, Bergvärmepump"
            />
          </div>

          <div>
            <Label htmlFor="beskrivning">Beskrivning av problem/arbete</Label>
            <Textarea
              id="beskrivning"
              value={state.beskrivning}
              onChange={(e) => updateState("beskrivning", e.target.value)}
              placeholder="Beskriv problemet eller det arbete som ska utföras..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Arbetstid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="timmar">Antal timmar</Label>
            <Input
              id="timmar"
              type="number"
              min="0"
              step="0.5"
              value={state.timmar || 0}
              onChange={(e) => updateState("timmar", Number.parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Material och extra arbeten
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="provtryckning"
                checked={state.provtryckning}
                onCheckedChange={(checked) => updateState("provtryckning", checked)}
              />
              <Label htmlFor="provtryckning">Provtryckning</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="svetsMaterial"
                checked={state.svetsMaterial}
                onCheckedChange={(checked) => updateState("svetsMaterial", checked)}
              />
              <Label htmlFor="svetsMaterial">Svets och material</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="köldmediaMängd">Köldmedia mängd (kg)</Label>
            <Input
              id="köldmediaMängd"
              type="number"
              min="0"
              step="0.1"
              value={state.köldmediaMängd || 0}
              onChange={(e) => updateState("köldmediaMängd", Number.parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="teknikerNoteringar">Teknikernoteringar</Label>
            <Textarea
              id="teknikerNoteringar"
              value={state.teknikerNoteringar}
              onChange={(e) => updateState("teknikerNoteringar", e.target.value)}
              placeholder="Interna noteringar för tekniker..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
