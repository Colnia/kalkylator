"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MOMS, ROT_PROCENT, MAX_ROT, MATERIAL_PRISER } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"
import { Calculator, Clock, Package, Percent } from "lucide-react"

interface ReparationSummeringProps {
  state: any
}

export function ReparationSummering({ state }: ReparationSummeringProps) {
  const beräknaKostnader = () => {
    const kostnader = {
      arbetskostnadExklMoms: 0,
      materialkostnadExklMoms: 0,
      totalExklMoms: 0,
      momsBelopp: 0,
      totalInklMoms: 0,
      rotAvdrag: 0,
      total: 0,
    }

    // Arbetstid
    kostnader.arbetskostnadExklMoms = (state.timmar || 0) * MATERIAL_PRISER.KOSTNAD_TIM

    // Material och extra arbeten
    if (state.provtryckning) {
      kostnader.materialkostnadExklMoms += 500 // Fast kostnad för provtryckning
    }

    if (state.svetsMaterial) {
      kostnader.materialkostnadExklMoms += 800 // Fast kostnad för svets och material
    }

    if (state.köldmediaMängd > 0) {
      kostnader.materialkostnadExklMoms += state.köldmediaMängd * 150 // 150 kr per kg köldmedia
    }

    // Beräkna totaler
    kostnader.totalExklMoms = kostnader.arbetskostnadExklMoms + kostnader.materialkostnadExklMoms
    kostnader.momsBelopp = kostnader.totalExklMoms * MOMS
    kostnader.totalInklMoms = kostnader.totalExklMoms + kostnader.momsBelopp

    if (state.kundTyp === "privat") {
      kostnader.rotAvdrag = Math.min(kostnader.arbetskostnadExklMoms * ROT_PROCENT, MAX_ROT)
    }

    kostnader.total = kostnader.totalInklMoms - (kostnader.rotAvdrag || 0)

    return kostnader
  }

  const kostnader = beräknaKostnader()

  if (!state.timmar && !state.provtryckning && !state.svetsMaterial && !state.köldmediaMängd) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Kostnadssummering
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Ange arbetstid och material för att se kostnadssummering.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Kostnadssummering - Reparation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Arbetskostnader */}
        {state.timmar > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Arbetskostnader
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>
                  Arbetstid ({state.timmar}h à {formatPrice(MATERIAL_PRISER.KOSTNAD_TIM)}):
                </span>
                <span>{formatPrice(kostnader.arbetskostnadExklMoms * (1 + MOMS))}</span>
              </div>
            </div>
          </div>
        )}

        {/* Materialkostnader */}
        {kostnader.materialkostnadExklMoms > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Material och extra arbeten
              </h4>
              <div className="space-y-1 text-sm">
                {state.provtryckning && (
                  <div className="flex justify-between">
                    <span>Provtryckning:</span>
                    <span>{formatPrice(500 * (1 + MOMS))}</span>
                  </div>
                )}
                {state.svetsMaterial && (
                  <div className="flex justify-between">
                    <span>Svets och material:</span>
                    <span>{formatPrice(800 * (1 + MOMS))}</span>
                  </div>
                )}
                {state.köldmediaMängd > 0 && (
                  <div className="flex justify-between">
                    <span>
                      Köldmedia ({state.köldmediaMängd}kg à {formatPrice(150)}):
                    </span>
                    <span>{formatPrice(state.köldmediaMängd * 150 * (1 + MOMS))}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

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
                  <Percent className="h-4 w-4" />
                  ROT-avdrag (50%):
                </span>
                <span>-{formatPrice(kostnader.rotAvdrag)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Att betala:</span>
                <span className="text-green-600">{formatPrice(kostnader.total)}</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                ROT-avdrag tillämpat
              </Badge>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
