"use client"

import { useState, useEffect } from "react"
import AdminLogin from "@/components/admin-login"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { usePricing } from "@/lib/pricing-context"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [newManufacturer, setNewManufacturer] = useState("")
  const [newModel, setNewModel] = useState("")
  const [newSize, setNewSize] = useState("")
  const [newEffekt, setNewEffekt] = useState("")
  const [newInköpspris, setNewInköpspris] = useState("")
  const [newPåslag, setNewPåslag] = useState("")
  const [selectedManufacturer, setSelectedManufacturer] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [showAddForm, setShowAddForm] = useState<string | null>(null)

  const {
    pricing,
    updateHeatPumpPrice,
    updateRepairPrice,
    updateMaterialPrice,
    updateExtraMaterialPrice,
    updateRefrigerantPrice,
    updateSetting,
    addManufacturer,
    addModel,
    addSize,
    removeManufacturer,
    removeModel,
    removeSize,
    savePricing,
    resetToDefaults,
    hasUnsavedChanges,
  } = usePricing()

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    setLoading(false)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    setIsLoggedIn(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await savePricing()
    } catch (error) {
      console.error("Failed to save pricing:", error)
    }
    setSaving(false)
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const filterItems = (items: any[], searchTerm: string) => {
    if (!searchTerm) return items
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()))
  }

  const handleAddManufacturer = () => {
    if (newManufacturer.trim()) {
      addManufacturer(newManufacturer.trim())
      setNewManufacturer("")
      setShowAddForm(null)
    }
  }

  const handleAddModel = () => {
    if (newModel.trim() && selectedManufacturer) {
      addModel(selectedManufacturer, newModel.trim())
      setNewModel("")
      setShowAddForm(null)
    }
  }

  const handleAddSize = () => {
    if (newSize.trim() && newEffekt.trim() && selectedManufacturer && selectedModel) {
      addSize(selectedManufacturer, selectedModel, newSize.trim(), {
        effekt: newEffekt.trim(),
        inköpspris: Number.parseFloat(newInköpspris) || 0,
        påslag: Number.parseFloat(newPåslag) || 0,
      })
      setNewSize("")
      setNewEffekt("")
      setNewInköpspris("")
      setNewPåslag("")
      setShowAddForm(null)
    }
  }

  const handleRemove = (type: string, tillverkare?: string, modell?: string, storlek?: string) => {
    const confirmed = window.confirm(`Är du säker på att du vill ta bort denna ${type}?`)
    if (confirmed) {
      if (type === "tillverkare" && tillverkare) {
        removeManufacturer(tillverkare)
      } else if (type === "modell" && tillverkare && modell) {
        removeModel(tillverkare, modell)
      } else if (type === "storlek" && tillverkare && modell && storlek) {
        removeSize(tillverkare, modell, storlek)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Laddar...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-sans">Prishantering</h1>
              <p className="text-gray-600 mt-1 font-sans">Hantera priser enkelt för alla kategorier</p>
            </div>
            <div className="flex items-center gap-3">
              {hasUnsavedChanges && (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  Osparade ändringar
                </Badge>
              )}
              <Button
                onClick={() => {
                  const confirmed = window.confirm(
                    "Är du säker på att du vill återställa alla priser till standardvärden? Detta kommer att ta bort alla dina anpassningar.",
                  )
                  if (confirmed) {
                    resetToDefaults()
                  }
                }}
                variant="outline"
                className="text-red-600 hover:text-red-800 border-red-200 hover:border-red-300"
              >
                🔄 Återställ standarddata
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-gray-600 hover:text-gray-800 bg-transparent"
              >
                Logga ut
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <span className="mr-2">💾</span>
                )}
                Spara ändringar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="heat-pumps" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-gray-200">
            <TabsTrigger value="heat-pumps" className="flex items-center gap-2">
              <span>⚡</span>
              Värmepumpar
            </TabsTrigger>
            <TabsTrigger value="repairs" className="flex items-center gap-2">
              <span>🔧</span>
              Reparationer
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <span>📦</span>
              Material
            </TabsTrigger>
            <TabsTrigger value="installations" className="flex items-center gap-2">
              <span>🏗️</span>
              Installationer
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <span>⚙️</span>
              Inställningar
            </TabsTrigger>
          </TabsList>

          {/* Heat Pumps Tab */}
          <TabsContent value="heat-pumps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 font-sans">Värmepumpspriser</CardTitle>
                <CardDescription>Justera priser för värmepumpar med tillverkare och modeller</CardDescription>
                <div className="flex items-center gap-4 mt-4">
                  <Input
                    placeholder="Sök tillverkare eller modell..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                  />
                  <Button
                    onClick={() => setShowAddForm("manufacturer")}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    ➕ Lägg till tillverkare
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {showAddForm === "manufacturer" && (
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-green-800">Lägg till ny tillverkare</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Input
                          placeholder="Tillverkarens namn"
                          value={newManufacturer}
                          onChange={(e) => setNewManufacturer(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleAddManufacturer} className="bg-green-600 hover:bg-green-700 text-white">
                          Lägg till
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddForm(null)}>
                          Avbryt
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {Object.entries(pricing.heatPumps).map(([tillverkare, modeller]) => {
                  const isExpanded = expandedSections[tillverkare]
                  const filteredModels = Object.entries(modeller).filter(
                    ([key, model]) =>
                      !searchTerm ||
                      tillverkare.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      key.toLowerCase().includes(searchTerm.toLowerCase()),
                  )

                  if (searchTerm && filteredModels.length === 0) return null

                  return (
                    <div key={tillverkare} className="border rounded-lg bg-white">
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSection(tillverkare)}
                      >
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-900 font-sans">{tillverkare}</h3>
                          <Badge variant="outline">{filteredModels.length} modeller</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedManufacturer(tillverkare)
                              setShowAddForm("model")
                            }}
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            ➕ Modell
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemove("tillverkare", tillverkare)
                            }}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            🗑️
                          </Button>
                          <span className="text-gray-400">{isExpanded ? "▼" : "▶"}</span>
                        </div>
                      </div>

                      {showAddForm === "model" && selectedManufacturer === tillverkare && (
                        <div className="border-t p-4 bg-blue-50">
                          <h4 className="font-medium text-blue-800 mb-3">Lägg till ny modell</h4>
                          <div className="flex items-center gap-3">
                            <Input
                              placeholder="Modellnamn"
                              value={newModel}
                              onChange={(e) => setNewModel(e.target.value)}
                              className="flex-1"
                            />
                            <Button onClick={handleAddModel} className="bg-blue-600 hover:bg-blue-700 text-white">
                              Lägg till
                            </Button>
                            <Button variant="outline" onClick={() => setShowAddForm(null)}>
                              Avbryt
                            </Button>
                          </div>
                        </div>
                      )}

                      {isExpanded && (
                        <div className="border-t p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredModels.map(([modelKey, modeller]) => (
                              <div key={modelKey} className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-900">{modelKey}</h4>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setSelectedManufacturer(tillverkare)
                                        setSelectedModel(modelKey)
                                        setShowAddForm("size")
                                      }}
                                      className="text-green-600 border-green-200 hover:bg-green-50 text-xs px-2 py-1"
                                    >
                                      ➕
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleRemove("modell", tillverkare, modelKey)}
                                      className="text-red-600 border-red-200 hover:bg-red-50 text-xs px-2 py-1"
                                    >
                                      🗑️
                                    </Button>
                                  </div>
                                </div>

                                {showAddForm === "size" &&
                                  selectedManufacturer === tillverkare &&
                                  selectedModel === modelKey && (
                                    <Card className="border-purple-200 bg-purple-50">
                                      <CardHeader className="pb-3">
                                        <CardTitle className="text-sm text-purple-800">Lägg till ny storlek</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-3">
                                        <div className="grid grid-cols-2 gap-2">
                                          <div>
                                            <Label className="text-xs">Storlek</Label>
                                            <Input
                                              placeholder="t.ex. 2.5kW"
                                              value={newSize}
                                              onChange={(e) => setNewSize(e.target.value)}
                                              className="h-8 text-sm"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-xs">Effekt</Label>
                                            <Input
                                              placeholder="t.ex. 2.5 kW"
                                              value={newEffekt}
                                              onChange={(e) => setNewEffekt(e.target.value)}
                                              className="h-8 text-sm"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-xs">Inköpspris (kr)</Label>
                                            <Input
                                              type="number"
                                              value={newInköpspris}
                                              onChange={(e) => setNewInköpspris(e.target.value)}
                                              className="h-8 text-sm"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-xs">Påslag (%)</Label>
                                            <Input
                                              type="number"
                                              value={newPåslag}
                                              onChange={(e) => setNewPåslag(e.target.value)}
                                              className="h-8 text-sm"
                                            />
                                          </div>
                                        </div>
                                        <div className="flex gap-2">
                                          <Button
                                            onClick={handleAddSize}
                                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1"
                                          >
                                            Lägg till
                                          </Button>
                                          <Button
                                            variant="outline"
                                            onClick={() => setShowAddForm(null)}
                                            className="text-xs px-3 py-1"
                                          >
                                            Avbryt
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}

                                {Object.entries(modeller).map(([storlekKey, storlek]) => (
                                  <Card key={storlekKey} className="border-gray-200">
                                    <CardHeader className="pb-3">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <CardTitle className="text-sm font-medium text-gray-900">
                                            {storlekKey}
                                          </CardTitle>
                                          <CardDescription className="text-xs">{storlek.effekt}</CardDescription>
                                        </div>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => handleRemove("storlek", tillverkare, modelKey, storlekKey)}
                                          className="text-red-600 border-red-200 hover:bg-red-50 text-xs px-2 py-1"
                                        >
                                          🗑️
                                        </Button>
                                      </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div className="space-y-3">
                                        <div>
                                          <Label
                                            htmlFor={`${modelKey}-${storlekKey}-inkop`}
                                            className="text-xs font-medium"
                                          >
                                            Inköpspris (kr)
                                          </Label>
                                          <Input
                                            id={`${modelKey}-${storlekKey}-inkop`}
                                            type="number"
                                            value={storlek.inköpspris || 0}
                                            className="h-8 text-sm"
                                            onChange={(e) =>
                                              updateHeatPumpPrice(
                                                tillverkare,
                                                modelKey,
                                                storlekKey,
                                                "inköpspris",
                                                Number.parseInt(e.target.value) || 0,
                                              )
                                            }
                                          />
                                        </div>
                                        <div>
                                          <Label
                                            htmlFor={`${modelKey}-${storlekKey}-paslag`}
                                            className="text-xs font-medium"
                                          >
                                            Påslag (%)
                                          </Label>
                                          <Input
                                            id={`${modelKey}-${storlekKey}-paslag`}
                                            type="number"
                                            value={storlek.påslag || 0}
                                            className="h-8 text-sm"
                                            onChange={(e) =>
                                              updateHeatPumpPrice(
                                                tillverkare,
                                                modelKey,
                                                storlekKey,
                                                "påslag",
                                                Number.parseInt(e.target.value) || 0,
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="pt-2 border-t">
                                          <div className="text-xs text-gray-600 mb-2">Beräknade priser:</div>
                                          <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                              <span className="text-gray-500">Ordinarie:</span>
                                              <div className="font-medium">
                                                {Math.round(
                                                  (storlek.inköpspris || 0) * (1 + (storlek.påslag || 0) / 100),
                                                )}{" "}
                                                kr
                                              </div>
                                            </div>
                                            <div>
                                              <span className="text-gray-500">Kampanj:</span>
                                              <div className="font-medium">
                                                {Math.round(
                                                  (storlek.inköpspris || 0) * (1 + (storlek.påslag || 0) / 100) * 0.9,
                                                )}{" "}
                                                kr
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div>
                                        <Label
                                          htmlFor={`${modelKey}-${storlekKey}-installation`}
                                          className="text-xs font-medium"
                                        >
                                          Installationspris (kr)
                                        </Label>
                                        <Input
                                          id={`${modelKey}-${storlekKey}-installation`}
                                          type="number"
                                          value={storlek.installationspris || 0}
                                          className="h-8 text-sm"
                                          onChange={(e) =>
                                            updateHeatPumpPrice(
                                              tillverkare,
                                              modelKey,
                                              storlekKey,
                                              "installationspris",
                                              Number.parseInt(e.target.value) || 0,
                                            )
                                          }
                                        />
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Repairs Tab */}
          <TabsContent value="repairs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 font-sans">Reparationstjänster</CardTitle>
                  <CardDescription>Uppdatera priser för reparationstjänster</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(pricing.repairs).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <Label htmlFor={key} className="text-sm font-medium">
                        {key === "TIMPRIS"
                          ? "Timpris"
                          : key === "FRAMKÖRNING"
                            ? "Framkörning"
                            : key === "CERTIFIERING"
                              ? "Certifiering"
                              : key === "PROVTRYCKNING_UNDER_3KG"
                                ? "Provtryckning Under 3kg"
                                : key === "PROVTRYCKNING_ÖVER_3KG"
                                  ? "Provtryckning Över 3kg"
                                  : key === "SVETS_MATERIAL"
                                    ? "Svets Material"
                                    : key === "RESA_PER_KM"
                                      ? "Resa Per Km"
                                      : key
                                          .replace(/_/g, " ")
                                          .toLowerCase()
                                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id={key}
                          type="number"
                          value={value}
                          className="w-24 h-8 text-sm"
                          onChange={(e) => updateRepairPrice(key, Number.parseFloat(e.target.value) || 0)}
                        />
                        <span className="text-xs text-gray-500">kr</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 font-sans">Köldmedium</CardTitle>
                  <CardDescription>Hantera priser för köldmedium</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(pricing.refrigerants).map(([key, media]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor={key} className="text-sm font-medium">
                          {media.namn}
                        </Label>
                        <div className="text-xs text-gray-500">{media.beskrivning}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          id={key}
                          type="number"
                          step="0.1"
                          value={media.pris}
                          className="w-24 h-8 text-sm"
                          onChange={(e) => updateRefrigerantPrice(key, Number.parseFloat(e.target.value) || 0)}
                        />
                        <span className="text-xs text-gray-500">kr/kg</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 font-sans">Standardmaterial</CardTitle>
                  <CardDescription>Hantera materialkostnader effektivt</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(pricing.materials).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <Label htmlFor={key} className="text-sm font-medium">
                        {key === "KOSTNAD_TIM"
                          ? "Kostnad Tim"
                          : key === "BILKOSTNAD"
                            ? "Bilkostnad"
                            : key === "KYLRÖR"
                              ? "Kylrör"
                              : key === "KANAL"
                                ? "Kanal"
                                : key === "KANAL_DELAR"
                                  ? "Kanal Delar"
                                  : key === "ELKABEL_4G"
                                    ? "Elkabel 4g"
                                    : key === "ELKABEL_3G"
                                      ? "Elkabel 3g"
                                      : key === "BENSTATIV"
                                        ? "Benstativ"
                                        : key === "VIBRATIONSDÄMPARE"
                                          ? "Vibrationsdämpare"
                                          : key === "SKRUV_BUNT"
                                            ? "Skruv Bunt"
                                            : key === "SILTAGE_VERKTYG"
                                              ? "Siltage Verktyg"
                                              : key === "EXTRA_RÖRLÄNGD"
                                                ? "Extra Rörlängd"
                                                : key
                                                    .replace(/_/g, " ")
                                                    .toLowerCase()
                                                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id={key}
                          type="number"
                          value={value}
                          className="w-24 h-8 text-sm"
                          onChange={(e) => updateMaterialPrice(key, Number.parseInt(e.target.value) || 0)}
                        />
                        <span className="text-xs text-gray-500">kr</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 font-sans">Extramaterial</CardTitle>
                  <CardDescription>Ytterligare materialpriser</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(pricing.extraMaterials).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <Label htmlFor={key} className="text-sm font-medium">
                        {key === "KONSOLSATS"
                          ? "Konsolsats"
                          : key === "VÄRMEKABEL"
                            ? "Värmekabel"
                            : key === "KONDENSVATTENSLANG"
                              ? "Kondensvattenslang"
                              : key === "EXTRA_RÖRLÄNGD_PER_METER"
                                ? "Extra Rörlängd Per Meter"
                                : key
                                    .replace(/_/g, " ")
                                    .toLowerCase()
                                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id={key}
                          type="number"
                          value={value}
                          className="w-24 h-8 text-sm"
                          onChange={(e) => updateExtraMaterialPrice(key, Number.parseInt(e.target.value) || 0)}
                        />
                        <span className="text-xs text-gray-500">kr</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 font-sans">Allmänna inställningar</CardTitle>
                <CardDescription>Konfigurera inställningar och systeminställningar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Label htmlFor="moms" className="text-sm font-medium">
                        Moms (%)
                      </Label>
                      <Input
                        id="moms"
                        type="number"
                        step="0.01"
                        value={pricing.settings.moms * 100}
                        className="mt-2"
                        onChange={(e) => updateSetting("moms", (Number.parseFloat(e.target.value) || 0) / 100)}
                      />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Label htmlFor="rot" className="text-sm font-medium">
                        ROT-avdrag (%)
                      </Label>
                      <Input
                        id="rot"
                        type="number"
                        step="0.01"
                        value={pricing.settings.rotProcent * 100}
                        className="mt-2"
                        onChange={(e) => updateSetting("rotProcent", (Number.parseFloat(e.target.value) || 0) / 100)}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Label htmlFor="max-rot" className="text-sm font-medium">
                        Max ROT-belopp (kr)
                      </Label>
                      <Input
                        id="max-rot"
                        type="number"
                        value={pricing.settings.maxRot}
                        className="mt-2"
                        onChange={(e) => updateSetting("maxRot", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Label htmlFor="company-markup" className="text-sm font-medium">
                        Företagspåslag (%)
                      </Label>
                      <Input
                        id="company-markup"
                        type="number"
                        step="0.1"
                        value={pricing.settings.companyMarkup}
                        className="mt-2"
                        onChange={(e) => updateSetting("companyMarkup", Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 font-sans">Materialpåslag</CardTitle>
                <CardDescription>Ställ in påslag för olika typer av eget inlagt material</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Label htmlFor="spare-parts-markup" className="text-sm font-medium text-blue-900">
                        Reservdelar påslag (%)
                      </Label>
                      <p className="text-xs text-blue-700 mt-1">Påslag för reservdelar som läggs till i reparationer</p>
                      <Input
                        id="spare-parts-markup"
                        type="number"
                        step="0.1"
                        value={pricing.settings.sparePartsMarkup || 50}
                        className="mt-2"
                        onChange={(e) => updateSetting("sparePartsMarkup", Number.parseFloat(e.target.value) || 50)}
                      />
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <Label htmlFor="material-markup" className="text-sm font-medium text-green-900">
                        Allmänt materialpåslag (%)
                      </Label>
                      <p className="text-xs text-green-700 mt-1">Standardpåslag för övrigt material</p>
                      <Input
                        id="material-markup"
                        type="number"
                        step="0.1"
                        value={pricing.settings.materialMarkup || 40}
                        className="mt-2"
                        onChange={(e) => updateSetting("materialMarkup", Number.parseFloat(e.target.value) || 40)}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <Label htmlFor="refrigerant-markup" className="text-sm font-medium text-orange-900">
                        Köldmedium påslag (%)
                      </Label>
                      <p className="text-xs text-orange-700 mt-1">Påslag för köldmedium och gaser</p>
                      <Input
                        id="refrigerant-markup"
                        type="number"
                        step="0.1"
                        value={pricing.settings.refrigerantMarkup || 30}
                        className="mt-2"
                        onChange={(e) => updateSetting("refrigerantMarkup", Number.parseFloat(e.target.value) || 30)}
                      />
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <Label htmlFor="installation-markup" className="text-sm font-medium text-purple-900">
                        Installationsmaterial påslag (%)
                      </Label>
                      <p className="text-xs text-purple-700 mt-1">Påslag för installationsmaterial och tillbehör</p>
                      <Input
                        id="installation-markup"
                        type="number"
                        step="0.1"
                        value={pricing.settings.installationMarkup || 35}
                        className="mt-2"
                        onChange={(e) => updateSetting("installationMarkup", Number.parseFloat(e.target.value) || 35)}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Information om påslag</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Reservdelar: Används när teknikern lägger till reservdelar i reparationer</li>
                    <li>• Allmänt material: Standardpåslag för övrigt material som inte har specifik kategori</li>
                    <li>• Köldmedium: Påslag för alla typer av köldmedium och gaser</li>
                    <li>• Installationsmaterial: Påslag för rör, isolering, fästen och installationstillbehör</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Installations Tab */}
          <TabsContent value="installations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 font-sans">Installationsberäkningar</CardTitle>
                <CardDescription>
                  Beräkna kostnader för olika installationstyper baserat på material och arbete
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Standard Installation */}
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-green-800 font-sans">Standard Installation</CardTitle>
                      <CardDescription className="text-green-600">
                        Grundläggande installation på markplan
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Kopparrör (meter)</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="5" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.materials.KOPPARRÖR} kr/m</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Plastkanal (meter)</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="5" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.materials.ISOLERING} kr/m</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Kanal detaljer (antal)</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="2" className="h-8" />
                            <span className="text-xs text-gray-500">× 45 kr/st</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Elinstallation</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="1" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.materials.ELINSTALLATION} kr</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Arbetstimmar</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="4" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.repairs.TIMKOSTNAD_PRIVAT} kr/h</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-green-200">
                        <div className="text-sm font-medium text-green-800">
                          Beräknad kostnad:{" "}
                          {5 * pricing.materials.KOPPARRÖR +
                            5 * pricing.materials.ISOLERING +
                            pricing.materials.ELINSTALLATION +
                            4 * pricing.repairs.TIMKOSTNAD_PRIVAT}{" "}
                          kr
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Extended Installation */}
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-blue-800 font-sans">Utökad Installation</CardTitle>
                      <CardDescription className="text-blue-600">
                        Installation med extra material och arbete
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Kopparrör (meter)</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="10" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.materials.KOPPARRÖR} kr/m</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Extra kopparrör (meter)</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="5" className="h-8" />
                            <span className="text-xs text-gray-500">
                              × {pricing.extraMaterials.EXTRA_KOPPARRÖR} kr/m
                            </span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Plastkanal (meter)</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="10" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.materials.ISOLERING} kr/m</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Kanal detaljer (antal)</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="3" className="h-8" />
                            <span className="text-xs text-gray-500">× 45 kr/st</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Väggfäste</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="2" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.extraMaterials.VÄGGFÄSTE} kr</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Arbetstimmar</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="6" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.repairs.TIMKOSTNAD_PRIVAT} kr/h</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-blue-200">
                        <div className="text-sm font-medium text-blue-800">
                          Beräknad kostnad:{" "}
                          {10 * pricing.materials.KOPPARRÖR +
                            5 * pricing.extraMaterials.EXTRA_KOPPARRÖR +
                            10 * pricing.materials.ISOLERING +
                            2 * pricing.extraMaterials.VÄGGFÄSTE +
                            6 * pricing.repairs.TIMKOSTNAD_PRIVAT}{" "}
                          kr
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upper Floor Installation */}
                  <Card className="border-orange-200 bg-orange-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-orange-800 font-sans">Ovanvåning Installation</CardTitle>
                      <CardDescription className="text-orange-600">
                        Installation på ovanvåning med extra utrustning
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Kopparrör (meter)</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="15" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.materials.KOPPARRÖR} kr/m</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Extra kopparrör (meter)</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="10" className="h-8" />
                            <span className="text-xs text-gray-500">
                              × {pricing.extraMaterials.EXTRA_KOPPARRÖR} kr/m
                            </span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Plastkanal (meter)</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="15" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.materials.ISOLERING} kr/m</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Kanal detaljer (antal)</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="4" className="h-8" />
                            <span className="text-xs text-gray-500">× 45 kr/st</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Kondensavlopp</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="1" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.extraMaterials.KONDENSAVLOPP} kr</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Väggfäste (förstärkt)</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="3" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.extraMaterials.VÄGGFÄSTE} kr</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Arbetstimmar</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input type="number" defaultValue="8" className="h-8" />
                            <span className="text-xs text-gray-500">× {pricing.repairs.TIMKOSTNAD_PRIVAT} kr/h</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-orange-200">
                        <div className="text-sm font-medium text-orange-800">
                          Beräknad kostnad:{" "}
                          {15 * pricing.materials.KOPPARRÖR +
                            10 * pricing.extraMaterials.EXTRA_KOPPARRÖR +
                            15 * pricing.materials.ISOLERING +
                            pricing.extraMaterials.KONDENSAVLOPP +
                            3 * pricing.extraMaterials.VÄGGFÄSTE +
                            8 * pricing.repairs.TIMKOSTNAD_PRIVAT}{" "}
                          kr
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Custom Installation Calculator */}
                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-800 font-sans">Anpassad Installationsberäkning</CardTitle>
                    <CardDescription className="text-purple-600">
                      Skapa din egen beräkning med valfria material och mängder
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Material</h4>
                        {Object.entries(pricing.materials).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <Input type="number" defaultValue="0" className="h-8 w-16" />
                            <span className="text-sm text-gray-600 flex-1">
                              {key === "KOPPARRÖR"
                                ? "Kopparrör"
                                : key === "ISOLERING"
                                  ? "Isolering"
                                  : key === "KYLSLANG"
                                    ? "Kylslang"
                                    : key === "ELINSTALLATION"
                                      ? "Elinstallation"
                                      : key}
                              ({value} kr)
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Extramaterial</h4>
                        {Object.entries(pricing.extraMaterials).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <Input type="number" defaultValue="0" className="h-8 w-16" />
                            <span className="text-sm text-gray-600 flex-1">
                              {key === "EXTRA_KOPPARRÖR"
                                ? "Extra kopparrör"
                                : key === "EXTRA_ISOLERING"
                                  ? "Extra isolering"
                                  : key === "VÄGGFÄSTE"
                                    ? "Väggfäste"
                                    : key === "KONDENSAVLOPP"
                                      ? "Kondensavlopp"
                                      : key}
                              ({value} kr)
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Arbete</h4>
                        <div className="flex items-center gap-2">
                          <Input type="number" defaultValue="0" className="h-8 w-16" />
                          <span className="text-sm text-gray-600">
                            Arbetstimmar privat ({pricing.repairs.TIMKOSTNAD_PRIVAT} kr/h)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input type="number" defaultValue="0" className="h-8 w-16" />
                          <span className="text-sm text-gray-600">
                            Arbetstimmar företag ({pricing.repairs.TIMKOSTNAD_FORETAG} kr/h)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input type="number" defaultValue="0" className="h-8 w-16" />
                          <span className="text-sm text-gray-600">Reskostnad km ({pricing.repairs.RESA_KM} kr/km)</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
                      <div className="text-lg font-semibold text-purple-800">Total beräknad kostnad: 0 kr</div>
                      <div className="text-sm text-purple-600 mt-1">
                        Uppdateras automatiskt när du ändrar värdena ovan
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
