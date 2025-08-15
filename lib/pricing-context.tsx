"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  VÄRMEPUMPAR_DETALJERAD,
  REPARATION_PRISER,
  MATERIAL_PRISER,
  EXTRA_MATERIAL_PRISER,
  KÖLDMEDIA_TYPER,
  FELSÖKNING_TYPER,
  INSTALLATION_PRISER,
  MOMS,
  ROT_PROCENT,
  MAX_ROT,
  FÖRETAG_PÅSLAG,
} from "./constants"

// Types for pricing data
type HeatPumpPricing = typeof VÄRMEPUMPAR_DETALJERAD
type RepairPricing = typeof REPARATION_PRISER
type MaterialPricing = typeof MATERIAL_PRISER
type ExtraMaterialPricing = typeof EXTRA_MATERIAL_PRISER
type RefrigerantPricing = typeof KÖLDMEDIA_TYPER
type TroubleshootingPricing = typeof FELSÖKNING_TYPER
type InstallationPricing = typeof INSTALLATION_PRISER

interface GeneralSettings {
  moms: number
  rotProcent: number
  maxRot: number
  companyMarkup: number
}

interface PricingData {
  heatPumps: HeatPumpPricing
  repairs: RepairPricing
  materials: MaterialPricing
  extraMaterials: ExtraMaterialPricing
  refrigerants: RefrigerantPricing
  troubleshooting: TroubleshootingPricing
  installation: InstallationPricing
  settings: GeneralSettings
  lastUpdated: string
}

interface PricingContextType {
  pricing: PricingData
  updateHeatPumpPrice: (tillverkare: string, modell: string, storlek: string, field: string, value: number) => void
  updateRepairPrice: (key: string, value: number) => void
  updateMaterialPrice: (key: string, value: number) => void
  updateExtraMaterialPrice: (key: string, value: number) => void
  updateRefrigerantPrice: (key: string, value: number) => void
  updateSetting: (key: string, value: number) => void
  addManufacturer: (name: string) => void
  addModel: (tillverkare: string, modellName: string) => void
  addSize: (
    tillverkare: string,
    modell: string,
    storlek: string,
    data: { effekt: string; inköpspris: number; påslag: number },
  ) => void
  removeManufacturer: (name: string) => void
  removeModel: (tillverkare: string, modell: string) => void
  removeSize: (tillverkare: string, modell: string, storlek: string) => void
  savePricing: () => Promise<void>
  loadPricing: () => void
  resetToDefaults: () => void
  hasUnsavedChanges: boolean
}

const PricingContext = createContext<PricingContextType | undefined>(undefined)

const STORAGE_KEY = "kalkylatyor-pricing-data"

// Default pricing data
const getDefaultPricingData = (): PricingData => ({
  heatPumps: VÄRMEPUMPAR_DETALJERAD,
  repairs: REPARATION_PRISER,
  materials: MATERIAL_PRISER,
  extraMaterials: EXTRA_MATERIAL_PRISER,
  refrigerants: KÖLDMEDIA_TYPER,
  troubleshooting: FELSÖKNING_TYPER,
  installation: INSTALLATION_PRISER,
  settings: {
    moms: MOMS,
    rotProcent: ROT_PROCENT,
    maxRot: MAX_ROT,
    companyMarkup: FÖRETAG_PÅSLAG * 100, // Convert to percentage (30)
  },
  lastUpdated: new Date().toISOString(),
})

export function PricingProvider({ children }: { children: ReactNode }) {
  const [pricing, setPricing] = useState<PricingData>(getDefaultPricingData())
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Load pricing data from localStorage on mount
  useEffect(() => {
    loadPricing()
  }, [])

  const loadPricing = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedData = JSON.parse(stored)
        setPricing(parsedData)
      }
    } catch (error) {
      console.error("Failed to load pricing data:", error)
    }
  }

  const savePricing = async (): Promise<void> => {
    try {
      const dataToSave = {
        ...pricing,
        lastUpdated: new Date().toISOString(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
      setPricing(dataToSave)
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error("Failed to save pricing data:", error)
      throw error
    }
  }

  const updateHeatPumpPrice = (tillverkare: string, modell: string, storlek: string, field: string, value: number) => {
    setPricing((prev) => ({
      ...prev,
      heatPumps: {
        ...prev.heatPumps,
        [tillverkare]: {
          ...prev.heatPumps[tillverkare],
          [modell]: {
            ...prev.heatPumps[tillverkare][modell],
            [storlek]: {
              ...prev.heatPumps[tillverkare][modell][storlek],
              [field]: value,
            },
          },
        },
      },
    }))
    setHasUnsavedChanges(true)
  }

  const updateRepairPrice = (key: string, value: number) => {
    setPricing((prev) => ({
      ...prev,
      repairs: {
        ...prev.repairs,
        [key]: value,
      },
    }))
    setHasUnsavedChanges(true)
  }

  const updateMaterialPrice = (key: string, value: number) => {
    setPricing((prev) => ({
      ...prev,
      materials: {
        ...prev.materials,
        [key]: value,
      },
    }))
    setHasUnsavedChanges(true)
  }

  const updateExtraMaterialPrice = (key: string, value: number) => {
    setPricing((prev) => ({
      ...prev,
      extraMaterials: {
        ...prev.extraMaterials,
        [key]: value,
      },
    }))
    setHasUnsavedChanges(true)
  }

  const updateRefrigerantPrice = (key: string, value: number) => {
    setPricing((prev) => ({
      ...prev,
      refrigerants: {
        ...prev.refrigerants,
        [key]: {
          ...prev.refrigerants[key],
          pris: value,
        },
      },
    }))
    setHasUnsavedChanges(true)
  }

  const updateSetting = (key: string, value: number) => {
    setPricing((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value,
      },
    }))
    setHasUnsavedChanges(true)
  }

  const addManufacturer = (name: string) => {
    setPricing((prev) => ({
      ...prev,
      heatPumps: {
        ...prev.heatPumps,
        [name]: {},
      },
    }))
    setHasUnsavedChanges(true)
  }

  const addModel = (tillverkare: string, modellName: string) => {
    setPricing((prev) => ({
      ...prev,
      heatPumps: {
        ...prev.heatPumps,
        [tillverkare]: {
          ...prev.heatPumps[tillverkare],
          [modellName]: {},
        },
      },
    }))
    setHasUnsavedChanges(true)
  }

  const addSize = (
    tillverkare: string,
    modell: string,
    storlek: string,
    data: { effekt: string; inköpspris: number; påslag: number },
  ) => {
    const ordinariePris = data.inköpspris * (1 + data.påslag / 100)
    const kampanjPris = ordinariePris * 0.9 // 10% rabatt som standard

    setPricing((prev) => ({
      ...prev,
      heatPumps: {
        ...prev.heatPumps,
        [tillverkare]: {
          ...prev.heatPumps[tillverkare],
          [modell]: {
            ...prev.heatPumps[tillverkare][modell],
            [storlek]: {
              effekt: data.effekt,
              inköpspris: data.inköpspris,
              påslag: data.påslag,
              ordinariePris: ordinariePris,
              kampanjPris: kampanjPris,
            },
          },
        },
      },
    }))
    setHasUnsavedChanges(true)
  }

  const removeManufacturer = (name: string) => {
    setPricing((prev) => {
      const newHeatPumps = { ...prev.heatPumps }
      delete newHeatPumps[name]
      return {
        ...prev,
        heatPumps: newHeatPumps,
      }
    })
    setHasUnsavedChanges(true)
  }

  const removeModel = (tillverkare: string, modell: string) => {
    setPricing((prev) => {
      const newModels = { ...prev.heatPumps[tillverkare] }
      delete newModels[modell]
      return {
        ...prev,
        heatPumps: {
          ...prev.heatPumps,
          [tillverkare]: newModels,
        },
      }
    })
    setHasUnsavedChanges(true)
  }

  const removeSize = (tillverkare: string, modell: string, storlek: string) => {
    setPricing((prev) => {
      const newSizes = { ...prev.heatPumps[tillverkare][modell] }
      delete newSizes[storlek]
      return {
        ...prev,
        heatPumps: {
          ...prev.heatPumps,
          [tillverkare]: {
            ...prev.heatPumps[tillverkare],
            [modell]: newSizes,
          },
        },
      }
    })
    setHasUnsavedChanges(true)
  }

  const resetToDefaults = () => {
    const defaultData = getDefaultPricingData()
    setPricing(defaultData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
    setHasUnsavedChanges(false)
  }

  return (
    <PricingContext.Provider
      value={{
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
        loadPricing,
        resetToDefaults,
        hasUnsavedChanges,
      }}
    >
      {children}
    </PricingContext.Provider>
  )
}

export function usePricing() {
  const context = useContext(PricingContext)
  if (context === undefined) {
    throw new Error("usePricing must be used within a PricingProvider")
  }
  return context
}

// Hook to get current pricing for calculations
export function useCurrentPricing() {
  const { pricing } = usePricing()
  return {
    heatPumps: pricing.heatPumps,
    repairs: pricing.repairs,
    materials: pricing.materials,
    extraMaterials: pricing.extraMaterials,
    refrigerants: pricing.refrigerants,
    troubleshooting: pricing.troubleshooting,
    installation: pricing.installation,
    moms: pricing.settings.moms,
    rotProcent: pricing.settings.rotProcent,
    maxRot: pricing.settings.maxRot,
    companyMarkup: pricing.settings.companyMarkup,
  }
}
