"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MOMS, MAX_ROT, MATERIAL_PRISER, STANDARD_INSTALLATION } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"
import { PDFGenerator } from "./pdf-generator"

interface VärmepumpSummeringProps {
  state: any
}

export function VärmepumpSummering({ state }: VärmepumpSummeringProps) {
  const beräknaKostnader = () => {
    const kostnader = {
      materialkostnadExklMoms: 0,
      arbetskostnadExklMoms: 0,
      totalMaterialKostnad: 0,
      totalArbetskostnad: 0,
      rotAvdrag: 0,
      totalExklMoms: 0,
      momsBelopp: 0,
      totalInklMoms: 0,
      total: 0,
    }

    if (state.värmepump) {
      // Värmepumpspris
      const pumpPris = state.kundTyp === "privat" ? state.värmepump.kampanj : state.värmepump.ordinarie

      kostnader.materialkostnadExklMoms = state.kundTyp === "privat" ? pumpPris / (1 + MOMS) : pumpPris

      // Installationskostnad
      if (state.kundTyp === "privat") {
        const installationsPris = STANDARD_INSTALLATION.TIMMAR * MATERIAL_PRISER.KOSTNAD_TIM
        kostnader.arbetskostnadExklMoms = installationsPris

        // Standardmaterial
        const standardMaterialKostnad = Object.entries(STANDARD_INSTALLATION.MATERIAL).reduce((total, [key, antal]) => {
          const kostnad = (MATERIAL_PRISER as any)[key] * (antal as number)
          return total + kostnad
        }, 0)

        kostnader.materialkostnadExklMoms += standardMaterialKostnad
      } else {
        kostnader.arbetskostnadExklMoms = state.värmepump.installationspris / (1 + MOMS)
      }

      // Extra rörlängd
      if (state.extraRörlängd > 0) {
        kostnader.materialkostnadExklMoms += state.extraRörlängd * MATERIAL_PRISER.EXTRA_RÖRLÄNGD
      }
    }

    // Beräkna totaler
    kostnader.totalMaterialKostnad = kostnader.materialkostnadExklMoms
    kostnader.totalArbetskostnad = kostnader.arbetskostnadExklMoms
    kostnader.totalExklMoms = kostnader.totalMaterialKostnad + kostnader.totalArbetskostnad
    kostnader.momsBelopp = kostnader.totalExklMoms * MOMS
    kostnader.totalInklMoms = kostnader.totalExklMoms + kostnader.momsBelopp

    if (state.kundTyp === "privat") {
      let schablonProcent = 0.65 // Default för luft/luft

      const värmepumpstyp = state.värmepump?.model?.toLowerCase() || ""
      if (värmepumpstyp.includes("berg") || värmepumpstyp.includes("mark")) {
        schablonProcent = 0.4 // Bergvärmepump
      } else if (värmepumpstyp.includes("luft/vatten") || värmepumpstyp.includes("luftvatten")) {
        schablonProcent = 0.55 // Luft/vatten-värmepump
      } else if (värmepumpstyp.includes("frånluft")) {
        schablonProcent = 0.65 // Frånluftsvärmepump
      } else {
        schablonProcent = 0.65 // Luft/luft-värmepump (default)
      }

      const arbetskostnadInklMoms = kostnader.totalInklMoms * schablonProcent
      const arbetskostnadExklMoms = arbetskostnadInklMoms / 1.25
      kostnader.rotAvdrag = Math.min(arbetskostnadExklMoms * 0.5, MAX_ROT)
    }

    kostnader.total = kostnader.totalInklMoms - (kostnader.rotAvdrag || 0)

    return kostnader
  }

  const kostnader = beräknaKostnader()

  if (!state.värmepump) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🧮</span>
            Kostnadssummering
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Välj en värmepump för att se kostnadssummering.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🧮</span>
          Kostnadssummering
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Materialkostnader */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>📦</span>
            Materialkostnader
          </h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Värmepump ({state.värmepump.model}):</span>
              <span>
                {state.kundTyp === "privat"
                  ? formatPrice(state.värmepump.kampanj)
                  : formatPrice(state.värmepump.ordinarie)}
              </span>
            </div>
            {state.extraRörlängd > 0 && (
              <div className="flex justify-between">
                <span>Extra rörlängd ({state.extraRörlängd}m):</span>
                <span>{formatPrice(state.extraRörlängd * MATERIAL_PRISER.EXTRA_RÖRLÄNGD)}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Arbetskostnader */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>🧾</span>
            Arbetskostnader
          </h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Installation:</span>
              <span>
                {state.kundTyp === "privat"
                  ? formatPrice(STANDARD_INSTALLATION.TIMMAR * MATERIAL_PRISER.KOSTNAD_TIM * (1 + MOMS))
                  : formatPrice(state.värmepump.installationspris)}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Totaler */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Totalt exkl. moms:</span>
            <span>{formatPrice(kostnader.totalExklMoms)}</span>
          </div>
          <div className="flex justify-between">
            <span>Moms (25%):</span>
            <span>{formatPrice(kostnader.momsBelopp)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Totalt inkl. moms:</span>
            <span>{formatPrice(kostnader.totalInklMoms)}</span>
          </div>

          {state.kundTyp === "privat" && kostnader.rotAvdrag > 0 && (
            <>
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1">
                  <span>💰</span>
                  ROT-avdrag (schablon):
                </span>
                <span>-{formatPrice(kostnader.rotAvdrag)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Att betala:</span>
                <span className="text-green-600">{formatPrice(kostnader.total)}</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                ROT-avdrag enligt Skatteverkets schablon
              </Badge>
            </>
          )}
        </div>

        {state.värmepump && (
          <div className="pt-4 border-t">
            <PDFGenerator state={state} type="värmepump" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
