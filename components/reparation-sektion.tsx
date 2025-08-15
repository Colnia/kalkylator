"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCurrentPricing } from "@/lib/pricing-context"
import { formatPrice } from "@/lib/utils"

interface ReparationSektionProps {
  state: any
  updateState: (key: string, value: any) => void
}

export function ReparationSektion({ state, updateState }: ReparationSektionProps) {
  const { companyMarkup, repairs, refrigerants, extraMaterials } = useCurrentPricing()

  const addSparePart = () => {
    const newPart = {
      id: Date.now().toString(),
      namn: "",
      beskrivning: "",
      inköpspris: 0,
      antal: 1,
    }
    const currentParts = state.reservdelar || []
    updateState("reservdelar", [...currentParts, newPart])
  }

  const removeSparePart = (id: string) => {
    const currentParts = state.reservdelar || []
    updateState(
      "reservdelar",
      currentParts.filter((part: any) => part.id !== id),
    )
  }

  const updateSparePart = (id: string, field: string, value: any) => {
    const currentParts = state.reservdelar || []
    const updatedParts = currentParts.map((part: any) => (part.id === id ? { ...part, [field]: value } : part))
    updateState("reservdelar", updatedParts)
  }

  const calculateSparePartPrice = (inköpspris: number) => {
    return inköpspris * (1 + companyMarkup / 100)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">🔧</span>
            Reparationsdetaljer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="anläggning">Typ av anläggning</Label>
            <Input
              id="anläggning"
              value={state.anläggning || ""}
              onChange={(e) => updateState("anläggning", e.target.value)}
              placeholder="T.ex. Luftvärmepump, Bergvärmepump, Kylmaskin"
            />
          </div>

          {state.kundTyp === "företag" && (
            <div>
              <Label htmlFor="aggregatNummer">Aggregatnummer</Label>
              <Input
                id="aggregatNummer"
                value={state.aggregatNummer || ""}
                onChange={(e) => updateState("aggregatNummer", e.target.value)}
                placeholder="Ange aggregatnummer"
              />
            </div>
          )}

          <div>
            <Label htmlFor="beskrivning">Beskrivning av problem/arbete</Label>
            <Textarea
              id="beskrivning"
              value={state.beskrivning || ""}
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
            <span className="text-lg">📦</span>
            Felsökning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="tidigareFelsökning"
              checked={state.tidigareFelsökning || false}
              onCheckedChange={(checked) => updateState("tidigareFelsökning", checked)}
            />
            <Label htmlFor="tidigareFelsökning">Tidigare utförd felsökning</Label>
          </div>

          {state.tidigareFelsökning && (
            <div className="ml-6 space-y-3 p-3 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="tidigareTimmar">Tidigare arbetade timmar</Label>
                <Input
                  id="tidigareTimmar"
                  type="number"
                  min="0"
                  step="0.5"
                  value={state.tidigareTimmar || ""}
                  onChange={(e) => updateState("tidigareTimmar", Number.parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
                <p className="text-sm text-muted-foreground mt-1">{formatPrice(repairs.TIMPRIS)}/timme exkl. moms</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">📦</span>
              Reservdelar
            </div>
            <Button onClick={addSparePart} size="sm" variant="outline">
              <span className="mr-2">➕</span>
              Lägg till reservdel
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(state.reservdelar || []).map((part: any) => (
            <div key={part.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`part-name-${part.id}`}>Reservdel</Label>
                      <Input
                        id={`part-name-${part.id}`}
                        value={part.namn || ""}
                        onChange={(e) => updateSparePart(part.id, "namn", e.target.value)}
                        placeholder="Namn på reservdel"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`part-quantity-${part.id}`}>Antal</Label>
                      <Input
                        id={`part-quantity-${part.id}`}
                        type="number"
                        min="1"
                        value={part.antal || 1}
                        onChange={(e) => updateSparePart(part.id, "antal", Number.parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`part-description-${part.id}`}>Förklaring</Label>
                    <Textarea
                      id={`part-description-${part.id}`}
                      value={part.beskrivning || ""}
                      onChange={(e) => updateSparePart(part.id, "beskrivning", e.target.value)}
                      placeholder="Förklaring av reservdelen och varför den behövs"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`part-cost-${part.id}`}>Inköpspris (kr)</Label>
                      <Input
                        id={`part-cost-${part.id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={part.inköpspris || ""}
                        onChange={(e) => updateSparePart(part.id, "inköpspris", Number.parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label>Försäljningspris (inkl. påslag)</Label>
                      <div className="p-2 bg-gray-50 rounded border">
                        <span className="font-medium">
                          {formatPrice(calculateSparePartPrice(part.inköpspris || 0) * (part.antal || 1))}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">({companyMarkup}% påslag)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => removeSparePart(part.id)}
                  size="sm"
                  variant="outline"
                  className="ml-3 text-red-600 hover:text-red-700"
                >
                  <span>🗑️</span>
                </Button>
              </div>
            </div>
          ))}

          {(!state.reservdelar || state.reservdelar.length === 0) && (
            <div className="text-center py-8 text-muted-foreground">
              <span className="text-4xl block mb-3 opacity-50">📦</span>
              <p>Inga reservdelar tillagda än</p>
              <p className="text-sm">Klicka på "Lägg till reservdel" för att lägga till</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">⏰</span>
            Arbetstid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="timmar">Antal timmar för reparation</Label>
            <Input
              id="timmar"
              type="number"
              min="0"
              step="0.5"
              value={state.timmar || ""}
              onChange={(e) => updateState("timmar", Number.parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
            <p className="text-sm text-muted-foreground mt-1">{formatPrice(repairs.TIMPRIS)}/timme exkl. moms</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">📦</span>
            Material och köldmedium
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="köldmediumTyp">Typ av köldmedium</Label>
            <Select value={state.köldmediumTyp || ""} onValueChange={(value) => updateState("köldmediumTyp", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Välj köldmedium" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(refrigerants).map(([key, medium]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex justify-between items-center w-full">
                      <span>{medium.namn}</span>
                      <Badge variant="outline" className="ml-2">
                        {formatPrice(medium.pris)}/kg
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="köldmediaMängd">Köldmedia mängd (kg)</Label>
            <Input
              id="köldmediaMängd"
              type="number"
              min="0"
              step="0.1"
              value={state.köldmediaMängd || ""}
              onChange={(e) => updateState("köldmediaMängd", Number.parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
            {state.köldmediumTyp && state.köldmediaMängd > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                Kostnad: {formatPrice(refrigerants[state.köldmediumTyp]?.pris * state.köldmediaMängd)} exkl. moms
              </p>
            )}
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="provtryckning"
                checked={state.provtryckning || false}
                onCheckedChange={(checked) => updateState("provtryckning", checked)}
              />
              <Label htmlFor="provtryckning">Provtryckning</Label>
              <Badge variant="outline">
                {formatPrice(
                  state.köldmediaMängd > 3 ? repairs.PROVTRYCKNING_ÖVER_3KG : repairs.PROVTRYCKNING_UNDER_3KG,
                )}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="svetsMaterial"
                checked={state.svetsMaterial || false}
                onCheckedChange={(checked) => updateState("svetsMaterial", checked)}
              />
              <Label htmlFor="svetsMaterial">Svets och material</Label>
              <Badge variant="outline">{formatPrice(repairs.SVETS_MATERIAL)}</Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="certifiering"
                checked={state.certifiering || false}
                onCheckedChange={(checked) => updateState("certifiering", checked)}
              />
              <Label htmlFor="certifiering">Certifieringsavgift</Label>
              <Badge variant="outline">{formatPrice(repairs.CERTIFIERING)}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">🚗</span>
            Resa och övriga kostnader
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="framkörning"
              checked={state.framkörning || false}
              onCheckedChange={(checked) => updateState("framkörning", checked)}
            />
            <Label htmlFor="framkörning">Framkörning</Label>
            <Badge variant="outline">{formatPrice(repairs.FRAMKÖRNING)}</Badge>
          </div>

          <div>
            <Label htmlFor="resaKm">Resa (km)</Label>
            <Input
              id="resaKm"
              type="number"
              min="0"
              value={state.resaKm || ""}
              onChange={(e) => updateState("resaKm", Number.parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
            {state.resaKm > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                Kostnad: {formatPrice(repairs.RESA_PER_KM * state.resaKm)} ({formatPrice(repairs.RESA_PER_KM)}/km)
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="övrigt">Övriga kostnader</Label>
            <Input
              id="övrigt"
              type="number"
              min="0"
              value={state.övrigKostnad || ""}
              onChange={(e) => updateState("övrigKostnad", Number.parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="övrigtBeskrivning">Beskrivning av övriga kostnader</Label>
            <Textarea
              id="övrigtBeskrivning"
              value={state.övrigtBeskrivning || ""}
              onChange={(e) => updateState("övrigtBeskrivning", e.target.value)}
              placeholder="Beskriv övriga kostnader..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            Teknikernoteringar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="teknikerNoteringar">Interna noteringar</Label>
            <Textarea
              id="teknikerNoteringar"
              value={state.teknikerNoteringar || ""}
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
