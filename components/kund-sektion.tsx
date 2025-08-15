"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface KundSektionProps {
  state: any
  updateState: (key: string, value: any) => void
}

export function KundSektion({ state, updateState }: KundSektionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">{state.kundTyp === "privat" ? "👤" : "🏢"}</span>
          Kundinformation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="kundTyp">Kundtyp</Label>
            <Select value={state.kundTyp} onValueChange={(value) => updateState("kundTyp", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="privat">Privatperson</SelectItem>
                <SelectItem value="företag">Företag</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="datum">Datum</Label>
            <Input id="datum" type="date" value={state.datum} onChange={(e) => updateState("datum", e.target.value)} />
          </div>
        </div>

        {state.kundTyp === "privat" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fornamn">Förnamn</Label>
              <Input
                id="fornamn"
                value={state.fornamn}
                onChange={(e) => updateState("fornamn", e.target.value)}
                placeholder="Ange förnamn"
              />
            </div>
            <div>
              <Label htmlFor="efternamn">Efternamn</Label>
              <Input
                id="efternamn"
                value={state.efternamn}
                onChange={(e) => updateState("efternamn", e.target.value)}
                placeholder="Ange efternamn"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="kundNamn">Företagsnamn</Label>
              <Input
                id="kundNamn"
                value={state.kundNamn}
                onChange={(e) => updateState("kundNamn", e.target.value)}
                placeholder="Ange företagsnamn"
              />
            </div>
            <div>
              <Label htmlFor="kontaktperson">Kontaktperson</Label>
              <Input
                id="kontaktperson"
                value={state.kontaktperson}
                onChange={(e) => updateState("kontaktperson", e.target.value)}
                placeholder="Ange kontaktperson"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="kundTelefon">Telefon</Label>
            <Input
              id="kundTelefon"
              value={state.kundTelefon}
              onChange={(e) => updateState("kundTelefon", e.target.value)}
              placeholder="Ange telefonnummer"
            />
          </div>
          <div>
            <Label htmlFor="kundEmail">E-post</Label>
            <Input
              id="kundEmail"
              type="email"
              value={state.kundEmail}
              onChange={(e) => updateState("kundEmail", e.target.value)}
              placeholder="Ange e-postadress"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="kundAdress">Adress</Label>
          <Input
            id="kundAdress"
            value={state.kundAdress}
            onChange={(e) => updateState("kundAdress", e.target.value)}
            placeholder="Ange fullständig adress"
          />
        </div>
      </CardContent>
    </Card>
  )
}
