"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCurrentPricing } from "@/lib/pricing-context"
import { MOMS, MAX_ROT } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"
import { PDFGenerator } from "./pdf-generator"

interface ReparationSummeringProps {
  state: any
}

export function ReparationSummering({ state }: ReparationSummeringProps) {
  const currentPricing = useCurrentPricing()

  const beräknaKostnader = () => {
    const kostnader = {
      arbetskostnadExklMoms: 0,
      materialkostnadExklMoms: 0,
      felsökningKostnad: 0,
      resaKostnad: 0,
      reservdelarKostnad: 0,
      totalExklMoms: 0,
      momsBelopp: 0,
      totalInklMoms: 0,
      rotAvdrag: 0,
      total: 0,
    }

    const reparationsPriser = currentPricing.repairs
    const köldmediaTyper = currentPricing.refrigerants
    const felsökningTyper = currentPricing.troubleshooting

    if (!reparationsPriser || !köldmediaTyper || !felsökningTyper) {
      return kostnader
    }

    // Arbetstid
    kostnader.arbetskostnadExklMoms = (state.timmar || 0) * reparationsPriser.TIMPRIS

    // Tidigare felsökning
    if (state.tidigareFelsökning && state.tidigareTimmar) {
      kostnader.arbetskostnadExklMoms += state.tidigareTimmar * reparationsPriser.TIMPRIS
    }

    // Ny felsökning
    if (state.utförFelsökning && state.felsökningTyp) {
      kostnader.felsökningKostnad = felsökningTyper[state.felsökningTyp]?.pris || 0
    }

    // Framkörning
    if (state.framkörning) {
      kostnader.arbetskostnadExklMoms += reparationsPriser.FRAMKÖRNING
    }

    // Certifiering
    if (state.certifiering) {
      kostnader.arbetskostnadExklMoms += reparationsPriser.CERTIFIERING
    }

    // Material och extra arbeten
    if (state.provtryckning) {
      kostnader.materialkostnadExklMoms +=
        state.köldmediaMängd > 3 ? reparationsPriser.PROVTRYCKNING_ÖVER_3KG : reparationsPriser.PROVTRYCKNING_UNDER_3KG
    }

    if (state.svetsMaterial) {
      kostnader.materialkostnadExklMoms += reparationsPriser.SVETS_MATERIAL
    }

    // Köldmedium
    if (state.köldmediumTyp && state.köldmediaMängd > 0) {
      const mediumPris = köldmediaTyper[state.köldmediumTyp]?.pris || 0
      kostnader.materialkostnadExklMoms += state.köldmediaMängd * mediumPris
    }

    if (state.reservdelar && state.reservdelar.length > 0) {
      state.reservdelar.forEach((reservdel: any) => {
        if (reservdel.inköpspris && reservdel.antal) {
          const påslag = (currentPricing.materials?.materialpåslag?.reservdelar || 50) / 100
          const försäljningspris = reservdel.inköpspris * (1 + påslag)
          kostnader.reservdelarKostnad += försäljningspris * reservdel.antal
        }
      })
    }

    // Resa
    if (state.resaKm > 0) {
      kostnader.resaKostnad = state.resaKm * reparationsPriser.RESA_PER_KM
    }

    // Övriga kostnader
    if (state.övrigKostnad > 0) {
      kostnader.materialkostnadExklMoms += state.övrigKostnad
    }

    // Beräkna totaler
    kostnader.totalExklMoms =
      kostnader.arbetskostnadExklMoms +
      kostnader.materialkostnadExklMoms +
      kostnader.felsökningKostnad +
      kostnader.resaKostnad +
      kostnader.reservdelarKostnad
    kostnader.momsBelopp = kostnader.totalExklMoms * MOMS
    kostnader.totalInklMoms = kostnader.totalExklMoms + kostnader.momsBelopp

    if (state.kundTyp === "privat") {
      const rotGrundlag = kostnader.arbetskostnadExklMoms + kostnader.felsökningKostnad + kostnader.reservdelarKostnad
      kostnader.rotAvdrag = Math.min(rotGrundlag * 0.5, MAX_ROT)
    }

    kostnader.total = kostnader.totalInklMoms - (kostnader.rotAvdrag || 0)

    return kostnader
  }

  const kostnader = beräknaKostnader()

  const harKostnader =
    state.timmar > 0 ||
    state.tidigareTimmar > 0 ||
    state.utförFelsökning ||
    state.provtryckning ||
    state.svetsMaterial ||
    state.köldmediaMängd > 0 ||
    state.framkörning ||
    state.certifiering ||
    state.resaKm > 0 ||
    state.övrigKostnad > 0 ||
    (state.reservdelar && state.reservdelar.length > 0)

  if (!harKostnader) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🧮 Kostnadssummering</CardTitle>
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
        <CardTitle className="flex items-center gap-2">🧮 Kostnadssummering - Reparation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Arbetskostnader */}
        {kostnader.arbetskostnadExklMoms > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">⏰ Arbetskostnader</h4>
            <div className="space-y-1 text-sm">
              {state.timmar > 0 && (
                <div className="flex justify-between">
                  <span>
                    Reparation ({state.timmar}h à {formatPrice(currentPricing.repairs.TIMPRIS)}):
                  </span>
                  <span>{formatPrice(state.timmar * currentPricing.repairs.TIMPRIS * (1 + MOMS))}</span>
                </div>
              )}
              {state.tidigareFelsökning && state.tidigareTimmar > 0 && (
                <div className="flex justify-between">
                  <span>Tidigare felsökning ({state.tidigareTimmar}h):</span>
                  <span>{formatPrice(state.tidigareTimmar * currentPricing.repairs.TIMPRIS * (1 + MOMS))}</span>
                </div>
              )}
              {state.framkörning && (
                <div className="flex justify-between">
                  <span>Framkörning:</span>
                  <span>{formatPrice(currentPricing.repairs.FRAMKÖRNING * (1 + MOMS))}</span>
                </div>
              )}
              {state.certifiering && (
                <div className="flex justify-between">
                  <span>Certifieringsavgift:</span>
                  <span>{formatPrice(currentPricing.repairs.CERTIFIERING * (1 + MOMS))}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Felsökning */}
        {kostnader.felsökningKostnad > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">🔍 Felsökning</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>{currentPricing.troubleshooting[state.felsökningTyp]?.namn}:</span>
                  <span>{formatPrice(kostnader.felsökningKostnad * (1 + MOMS))}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Materialkostnader */}
        {kostnader.materialkostnadExklMoms > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">📦 Material och extra arbeten</h4>
              <div className="space-y-1 text-sm">
                {state.köldmediumTyp && state.köldmediaMängd > 0 && (
                  <div className="flex justify-between">
                    <span>
                      {currentPricing.refrigerants[state.köldmediumTyp].namn} ({state.köldmediaMängd}kg):
                    </span>
                    <span>
                      {formatPrice(
                        state.köldmediaMängd * currentPricing.refrigerants[state.köldmediumTyp].pris * (1 + MOMS),
                      )}
                    </span>
                  </div>
                )}
                {state.provtryckning && (
                  <div className="flex justify-between">
                    <span>Provtryckning:</span>
                    <span>
                      {formatPrice(
                        (state.köldmediaMängd > 3
                          ? currentPricing.repairs.PROVTRYCKNING_ÖVER_3KG
                          : currentPricing.repairs.PROVTRYCKNING_UNDER_3KG) *
                          (1 + MOMS),
                      )}
                    </span>
                  </div>
                )}
                {state.svetsMaterial && (
                  <div className="flex justify-between">
                    <span>Svets och material:</span>
                    <span>{formatPrice(currentPricing.repairs.SVETS_MATERIAL * (1 + MOMS))}</span>
                  </div>
                )}
                {state.övrigKostnad > 0 && (
                  <div className="flex justify-between">
                    <span>Övriga kostnader:</span>
                    <span>{formatPrice(state.övrigKostnad * (1 + MOMS))}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Reservdelar */}
        {kostnader.reservdelarKostnad > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">🔧 Reservdelar</h4>
              <div className="space-y-1 text-sm">
                {state.reservdelar?.map((reservdel: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span>
                      {reservdel.namn} ({reservdel.antal}st):
                    </span>
                    <span>{formatPrice(reservdel.försäljningspris * reservdel.antal * (1 + MOMS))}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Resa */}
        {kostnader.resaKostnad > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">🚗 Resa</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>
                    Resa ({state.resaKm}km à {formatPrice(currentPricing.repairs.RESA_PER_KM)}):
                  </span>
                  <span>{formatPrice(kostnader.resaKostnad * (1 + MOMS))}</span>
                </div>
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
                <span className="flex items-center gap-1">💰 ROT-avdrag (50% på arbete):</span>
                <span>-{formatPrice(kostnader.rotAvdrag)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Att betala:</span>
                <span className="text-green-600">{formatPrice(kostnader.total)}</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                ROT-avdrag på arbetstid och reservdelar
              </Badge>
            </>
          )}
        </div>

        {harKostnader && (
          <div className="pt-4 border-t">
            <PDFGenerator state={state} type="reparation" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
