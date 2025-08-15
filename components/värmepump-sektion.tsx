"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { VärmepumpsVäljare } from "./värmepumps-väljare"
import { INSTALLATION_TYPER, VÄGG_TYPER, PLACERINGAR } from "@/lib/constants"

interface VärmepumpSektionProps {
  state: any
  updateState: (key: string, value: any) => void
}

export function VärmepumpSektion({ state, updateState }: VärmepumpSektionProps) {
  const handleExtraMaterialChange = (material: string, checked: boolean) => {
    const newExtraMaterial = checked
      ? [...state.extraMaterial, material]
      : state.extraMaterial.filter((item: string) => item !== material)
    updateState("extraMaterial", newExtraMaterial)
  }

  return (
    <div className="space-y-6">
      <Alert>
        <span className="text-lg">🌡️</span>
        <AlertDescription>
          <strong>Information:</strong>{" "}
          {state.kundTyp === "privat"
            ? "Alla priser är inklusive moms. Kampanjpriser gäller vid installation och ROT-avdrag kan utnyttjas på arbetskostnaden."
            : "Alla priser är exklusive moms. Ordinarie priser gäller för företag."}
        </AlertDescription>
      </Alert>

      {/* Värmepumpsväljare */}
      <VärmepumpsVäljare state={state} updateState={updateState} />

      {/* Installationsdetaljer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">⚙️</span>
            Installationsdetaljer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="installationsTyp">Installationstyp</Label>
            <Select value={state.installationsTyp} onValueChange={(value) => updateState("installationsTyp", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Välj typ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={INSTALLATION_TYPER.STANDARD}>Standardinstallation</SelectItem>
                <SelectItem value={INSTALLATION_TYPER.UTBYTE}>Utbytesinstallation</SelectItem>
                <SelectItem value={INSTALLATION_TYPER.KOMPLEX}>Komplex installation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="väggtyp">Väggtyp</Label>
              <Select value={state.väggtyp} onValueChange={(value) => updateState("väggtyp", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Välj väggtyp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={VÄGG_TYPER.TRÄ}>Trävägg</SelectItem>
                  <SelectItem value={VÄGG_TYPER.TEGEL}>Tegelvägg</SelectItem>
                  <SelectItem value={VÄGG_TYPER.BETONG}>Betongvägg</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="utomhusenhetPlacering">Placering av utomhusenhet</Label>
              <Select
                value={state.utomhusenhetPlacering}
                onValueChange={(value) => updateState("utomhusenhetPlacering", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Välj placering" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PLACERINGAR.MARK}>Markplacering</SelectItem>
                  <SelectItem value={PLACERINGAR.VÄGG}>Väggmontage</SelectItem>
                  <SelectItem value={PLACERINGAR.BALKONG}>Balkongmontage</SelectItem>
                  <SelectItem value={PLACERINGAR.TAK}>Takmontage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extra utrustning och material */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">🔧</span>
            Extra utrustning och material
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="extraRörlängd">Extra rörlängd (meter)</Label>
            <Input
              id="extraRörlängd"
              type="number"
              min="0"
              value={state.extraRörlängd || 0}
              onChange={(e) => updateState("extraRörlängd", Number.parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>

          <div className="space-y-3">
            <Label>Extra material</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="konsolsats"
                  checked={state.extraMaterial.includes("konsolsats")}
                  onCheckedChange={(checked) => handleExtraMaterialChange("konsolsats", checked as boolean)}
                />
                <Label htmlFor="konsolsats">Konsolsats</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="värmekabel"
                  checked={state.extraMaterial.includes("värmekabel")}
                  onCheckedChange={(checked) => handleExtraMaterialChange("värmekabel", checked as boolean)}
                />
                <Label htmlFor="värmekabel">Värmekabel för dränering</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kondensvattenslang"
                  checked={state.extraMaterial.includes("kondensvattenslang")}
                  onCheckedChange={(checked) => handleExtraMaterialChange("kondensvattenslang", checked as boolean)}
                />
                <Label htmlFor="kondensvattenslang">Extra kondensvattenslang</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
