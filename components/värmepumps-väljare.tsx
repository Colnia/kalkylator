"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCurrentPricing } from "@/lib/pricing-context"
import { formatPrice } from "@/lib/utils"
import { useState } from "react"

interface VärmepumpsVäljareProps {
  state: any
  updateState: (key: string, value: any) => void
}

export function VärmepumpsVäljare({ state, updateState }: VärmepumpsVäljareProps) {
  const { heatPumps } = useCurrentPricing()
  const [customPricing, setCustomPricing] = useState({
    inköpspris: "",
    påslag: "",
  })
  const [showCustomPricing, setShowCustomPricing] = useState(false)

  const handleTillverkareChange = (tillverkare: string) => {
    updateState("värmepumpTillverkare", tillverkare)
    updateState("värmepumpModell", null)
    updateState("värmepumpStorlek", null)
    updateState("värmepump", null)
    setShowCustomPricing(false)
  }

  const handleModellChange = (modell: string) => {
    updateState("värmepumpModell", modell)
    updateState("värmepumpStorlek", null)
    updateState("värmepump", null)
    setShowCustomPricing(false)
  }

  const handleStorlekChange = (storlek: string) => {
    updateState("värmepumpStorlek", storlek)

    const tillverkare = state.värmepumpTillverkare
    const modell = state.värmepumpModell
    const pump = heatPumps[tillverkare]?.[modell]?.[storlek]

    if (pump) {
      updateState("värmepump", {
        ...pump,
        tillverkare,
        modell,
        storlek,
        key: `${tillverkare}-${modell}-${storlek}`,
      })
    }
  }

  const applyCustomPricing = () => {
    if (!state.värmepump || !customPricing.inköpspris || !customPricing.påslag) return

    const inköpspris = Number.parseFloat(customPricing.inköpspris)
    const påslag = Number.parseFloat(customPricing.påslag)

    if (isNaN(inköpspris) || isNaN(påslag)) return

    const slutpris = inköpspris * (1 + påslag / 100)

    updateState("värmepump", {
      ...state.värmepump,
      ordinarie: slutpris,
      kampanj: slutpris,
      inköpspris: inköpspris,
      påslag: påslag,
      customPricing: true,
    })
  }

  const getAvailableModels = () => {
    if (!state.värmepumpTillverkare) return []
    const tillverkare = heatPumps[state.värmepumpTillverkare]
    return tillverkare ? Object.keys(tillverkare) : []
  }

  const getAvailableSizes = () => {
    if (!state.värmepumpTillverkare || !state.värmepumpModell) return []
    const modell = heatPumps[state.värmepumpTillverkare]?.[state.värmepumpModell]
    return modell ? Object.keys(modell) : []
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Välj värmepump</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="värmepumpTillverkare" className="text-sm font-medium">
              Tillverkare
            </Label>
            <Select value={state.värmepumpTillverkare} onValueChange={handleTillverkareChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Välj tillverkare..." />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(heatPumps).map((tillverkare) => (
                  <SelectItem key={tillverkare} value={tillverkare} className="cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{tillverkare}</span>
                      <Badge variant="outline" className="text-xs">
                        {Object.keys(heatPumps[tillverkare]).length} modeller
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {state.värmepumpTillverkare && (
            <div>
              <Label htmlFor="värmepumpModell" className="text-sm font-medium">
                Modell
              </Label>
              <Select value={state.värmepumpModell} onValueChange={handleModellChange}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Välj modell..." />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableModels().map((modell) => (
                    <SelectItem key={modell} value={modell} className="cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{modell}</span>
                        <Badge variant="outline" className="text-xs">
                          {Object.keys(heatPumps[state.värmepumpTillverkare][modell]).length} storlekar
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {state.värmepumpModell && (
            <div>
              <Label htmlFor="värmepumpStorlek" className="text-sm font-medium">
                Storlek & Effekt
              </Label>
              <Select value={state.värmepumpStorlek} onValueChange={handleStorlekChange}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Välj storlek..." />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableSizes().map((storlek) => (
                    <SelectItem key={storlek} value={storlek} className="cursor-pointer">
                      <div className="flex flex-col">
                        <span className="font-medium">{storlek}</span>
                        <span className="text-xs text-gray-500">
                          {heatPumps[state.värmepumpTillverkare][state.värmepumpModell][storlek].effekt}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {state.värmepump && (
          <div className="space-y-4">
            <Card className="border-blue-500 bg-blue-50">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">{state.värmepump.namn}</h4>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Vald
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Tillverkare:</span>
                      <p className="font-medium">{state.värmepump.tillverkare}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Modell:</span>
                      <p className="font-medium">{state.värmepump.modell}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Storlek:</span>
                      <p className="font-medium">{state.värmepump.storlek}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Effekt:</span>
                      <p className="font-medium">{state.värmepump.effekt}</p>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    {state.värmepump.customPricing ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Inköpspris:</span>
                          <span className="font-medium">{formatPrice(state.värmepump.inköpspris)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Påslag:</span>
                          <span className="font-medium">{state.värmepump.påslag}%</span>
                        </div>
                        <div className="flex items-center justify-between border-t pt-2">
                          <span className="text-sm font-medium">Slutpris:</span>
                          <span className="font-bold text-green-600">{formatPrice(state.värmepump.ordinarie)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {state.kundTyp === "privat" ? (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Kampanjpris:</span>
                              <span className="font-bold text-green-600">{formatPrice(state.värmepump.kampanj)}</span>
                            </div>
                            {state.värmepump.ordinarie !== state.värmepump.kampanj && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Ordinarie:</span>
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(state.värmepump.ordinarie)}
                                </span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Pris:</span>
                            <span className="font-bold">
                              {formatPrice(state.värmepump.ordinarie)}{" "}
                              <span className="text-xs text-gray-500">exkl. moms</span>
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium">Anpassad prissättning</h5>
                  <Button variant="outline" size="sm" onClick={() => setShowCustomPricing(!showCustomPricing)}>
                    {showCustomPricing ? "Dölj" : "Visa"}
                  </Button>
                </div>

                {showCustomPricing && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="inköpspris" className="text-sm">
                          Inköpspris (kr)
                        </Label>
                        <Input
                          id="inköpspris"
                          type="number"
                          placeholder="0"
                          value={customPricing.inköpspris}
                          onChange={(e) => setCustomPricing((prev) => ({ ...prev, inköpspris: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="påslag" className="text-sm">
                          Påslag (%)
                        </Label>
                        <Input
                          id="påslag"
                          type="number"
                          placeholder="0"
                          value={customPricing.påslag}
                          onChange={(e) => setCustomPricing((prev) => ({ ...prev, påslag: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={applyCustomPricing}
                      disabled={!customPricing.inköpspris || !customPricing.påslag}
                      className="w-full"
                    >
                      Tillämpa anpassad prissättning
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
