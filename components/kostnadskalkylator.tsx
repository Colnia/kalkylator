"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { KundSektion } from "./kund-sektion"
import { VärmepumpSektion } from "./värmepump-sektion"
import { ReparationSektion } from "./reparation-sektion"
import { VärmepumpSummering } from "./värmepump-summering"
import { ReparationSummering } from "./reparation-summering"
import { KALKYLATOR_TYPER } from "@/lib/constants"

interface KalkylatorState {
  kalkylatorsTyp: string
  kundTyp: "privat" | "företag"
  kundNamn: string
  fornamn: string
  efternamn: string
  kontaktperson: string
  kundAdress: string
  kundTelefon: string
  kundEmail: string
  värmepump: any
  installationsTyp: string
  väggtyp: string
  utomhusenhetPlacering: string
  extraMaterial: any[]
  extraRörlängd: number
  extraRörlängdKostnad: number
  anläggning: string
  beskrivning: string
  timmar: number
  material: any[]
  provtryckning: boolean
  svetsMaterial: boolean
  köldmediaMängd: number
  datum: string
  teknikerNoteringar: string
}

const initialState: KalkylatorState = {
  kalkylatorsTyp: KALKYLATOR_TYPER.LUFT_LUFT,
  kundTyp: "privat",
  kundNamn: "",
  fornamn: "",
  efternamn: "",
  kontaktperson: "",
  kundAdress: "",
  kundTelefon: "",
  kundEmail: "",
  värmepump: null,
  installationsTyp: "",
  väggtyp: "",
  utomhusenhetPlacering: "",
  extraMaterial: [],
  extraRörlängd: 0,
  extraRörlängdKostnad: 0,
  anläggning: "",
  beskrivning: "",
  timmar: 0,
  material: [],
  provtryckning: false,
  svetsMaterial: false,
  köldmediaMängd: 0,
  datum: new Date().toISOString().split("T")[0],
  teknikerNoteringar: "",
}

export function KostnadsKalkylator() {
  const [state, setState] = useState<KalkylatorState>(initialState)

  const updateState = (key: keyof KalkylatorState, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Välj kalkylatortyp */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Välj typ av kalkylator</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={state.kalkylatorsTyp} onValueChange={(value) => updateState("kalkylatorsTyp", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Välj kalkylatortyp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={KALKYLATOR_TYPER.LUFT_LUFT}>Luftvärmepump installation</SelectItem>
              <SelectItem value={KALKYLATOR_TYPER.REPARATION}>Reparation</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Kundinformation */}
      <KundSektion state={state} updateState={updateState} />

      {/* Visa relevant sektion baserat på vald kalkylatortyp */}
      {state.kalkylatorsTyp === KALKYLATOR_TYPER.LUFT_LUFT ? (
        <>
          <VärmepumpSektion state={state} updateState={updateState} />
          <VärmepumpSummering state={state} />
        </>
      ) : (
        <>
          <ReparationSektion state={state} updateState={updateState} />
          <ReparationSummering state={state} />
        </>
      )}
    </div>
  )
}
