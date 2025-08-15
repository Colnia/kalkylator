"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { MOMS, MAX_ROT, MATERIAL_PRISER, STANDARD_INSTALLATION } from "@/lib/constants"
import { useState } from "react"

interface PDFGeneratorProps {
  state: any
  type: "värmepump" | "reparation"
}

type PDFTemplate = "standard" | "premium" | "minimal" | "detailed"

const PDF_TEMPLATES = {
  standard: {
    name: "Standard",
    description: "Klassisk layout med all nödvändig information",
    color: "#2563eb",
  },
  premium: {
    name: "Premium",
    description: "Elegant design med företagsprofil",
    color: "#059669",
  },
  minimal: {
    name: "Minimal",
    description: "Ren och enkel layout",
    color: "#64748b",
  },
  detailed: {
    name: "Detaljerad",
    description: "Omfattande information och specifikationer",
    color: "#dc2626",
  },
}

export function PDFGenerator({ state, type }: PDFGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<PDFTemplate>("standard")

  const generatePDF = (preview = false) => {
    const kostnader = beräknaKostnader()
    const template = PDF_TEMPLATES[selectedTemplate]

    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Kostnadsförslag - ${template.name}</title>
        <style>
          ${getTemplateStyles(selectedTemplate)}
        </style>
      </head>
      <body>
        ${getTemplateContent(selectedTemplate, kostnader)}
      </body>
      </html>
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(pdfContent)
      printWindow.document.close()

      if (!preview) {
        setTimeout(() => {
          printWindow.print()
        }, 500)
      }
    }
  }

  const getTemplateStyles = (template: PDFTemplate) => {
    const baseStyles = `
      body { 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        margin: 0; 
        padding: 40px; 
        line-height: 1.6; 
        color: #333;
        background: #fff;
      }
      .page { max-width: 800px; margin: 0 auto; }
      .item-row { 
        display: flex; 
        justify-content: space-between; 
        padding: 8px 0; 
        border-bottom: 1px solid #e2e8f0; 
      }
      .total-row { 
        display: flex; 
        justify-content: space-between; 
        padding: 8px 0; 
      }
      @media print {
        body { margin: 0; padding: 20px; }
        .no-print { display: none; }
      }
    `

    switch (template) {
      case "premium":
        return (
          baseStyles +
          `
          .header { 
            background: linear-gradient(135deg, #059669, #047857);
            color: white;
            padding: 40px;
            text-align: center;
            border-radius: 12px;
            margin-bottom: 30px;
            box-shadow: 0 10px 25px rgba(5, 150, 105, 0.2);
          }
          .company-name { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
          .document-title { font-size: 24px; margin-top: 15px; opacity: 0.9; }
          .customer-info { 
            background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
            padding: 25px; 
            border-radius: 12px; 
            margin-bottom: 30px;
            border-left: 5px solid #059669;
          }
          .section-title { 
            font-size: 20px; 
            font-weight: bold; 
            color: #047857; 
            border-bottom: 3px solid #059669; 
            padding-bottom: 10px; 
            margin-bottom: 20px; 
          }
          .total-section { 
            background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
            padding: 25px; 
            border-radius: 12px; 
            margin-top: 30px;
            border: 2px solid #059669;
          }
        `
        )

      case "minimal":
        return (
          baseStyles +
          `
          .header { 
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 20px;
            margin-bottom: 40px;
          }
          .company-name { font-size: 24px; font-weight: 300; color: #64748b; }
          .document-title { font-size: 18px; color: #475569; margin-top: 10px; }
          .customer-info { 
            padding: 0;
            margin-bottom: 40px;
            border: none;
            background: none;
          }
          .section-title { 
            font-size: 16px; 
            font-weight: 500; 
            color: #475569; 
            border-bottom: 1px solid #e2e8f0; 
            padding-bottom: 5px; 
            margin-bottom: 15px; 
          }
          .total-section { 
            border-top: 2px solid #e2e8f0;
            padding-top: 20px;
            margin-top: 40px;
            background: none;
          }
        `
        )

      case "detailed":
        return (
          baseStyles +
          `
          .header { 
            background: #dc2626;
            color: white;
            padding: 30px;
            text-align: center;
            margin-bottom: 30px;
          }
          .company-name { font-size: 28px; font-weight: bold; }
          .document-title { font-size: 22px; margin-top: 15px; }
          .customer-info { 
            background: #fef2f2;
            padding: 25px; 
            border-radius: 8px; 
            margin-bottom: 30px;
            border-left: 4px solid #dc2626;
          }
          .section { margin-bottom: 35px; }
          .section-title { 
            font-size: 18px; 
            font-weight: bold; 
            color: #dc2626; 
            border-bottom: 2px solid #dc2626; 
            padding-bottom: 8px; 
            margin-bottom: 20px; 
          }
          .specifications {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .total-section { 
            background: #fef2f2;
            padding: 25px; 
            border-radius: 8px; 
            margin-top: 30px;
            border: 2px solid #dc2626;
          }
        `
        )

      default: // standard
        return (
          baseStyles +
          `
          .header { 
            text-align: center; 
            border-bottom: 3px solid #2563eb; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
          }
          .company-name { 
            font-size: 28px; 
            font-weight: bold; 
            color: #2563eb; 
            margin-bottom: 5px; 
          }
          .document-title { 
            font-size: 24px; 
            color: #1e40af; 
            margin-top: 15px; 
          }
          .customer-info { 
            background: #f8fafc; 
            padding: 20px; 
            border-radius: 8px; 
            margin-bottom: 30px; 
          }
          .section-title { 
            font-size: 18px; 
            font-weight: bold; 
            color: #1e40af; 
            border-bottom: 2px solid #e2e8f0; 
            padding-bottom: 8px; 
            margin-bottom: 15px; 
          }
          .total-section { 
            background: #f1f5f9; 
            padding: 20px; 
            border-radius: 8px; 
            margin-top: 30px; 
          }
        `
        )
    }
  }

  const getTemplateContent = (template: PDFTemplate, kostnader: any) => {
    const commonContent = {
      header: getHeaderContent(template),
      customerInfo: getCustomerInfoContent(),
      content: generateContentByType(),
      totals: getTotalsContent(kostnader),
      footer: getFooterContent(template),
    }

    return `
      <div class="page">
        ${commonContent.header}
        ${commonContent.customerInfo}
        ${commonContent.content}
        ${commonContent.totals}
        ${commonContent.footer}
      </div>
    `
  }

  const getHeaderContent = (template: PDFTemplate) => {
    switch (template) {
      case "minimal":
        return `
          <div class="header">
            <div class="company-name">Värmepump Service AB</div>
            <div class="document-title">Kostnadsförslag</div>
          </div>
        `
      default:
        return `
          <div class="header">
            <div class="company-name">Värmepump Service AB</div>
            <div>Professionell installation och service</div>
            <div class="document-title">KOSTNADSFÖRSLAG</div>
          </div>
        `
    }
  }

  const getCustomerInfoContent = () => {
    return `
      <div class="customer-info">
        <h3>Kunduppgifter</h3>
        <p><strong>Namn:</strong> ${state.kundNamn || "Ej angivet"}</p>
        <p><strong>Kundtyp:</strong> ${state.kundTyp === "privat" ? "Privatperson" : "Företag"}</p>
        ${state.kundTyp === "företag" && state.aggregatNummer ? `<p><strong>Aggregatnummer:</strong> ${state.aggregatNummer}</p>` : ""}
        <p><strong>Datum:</strong> ${new Date().toLocaleDateString("sv-SE")}</p>
        <p><strong>Offertnummer:</strong> ${generateOfferNumber()}</p>
      </div>
    `
  }

  const getTotalsContent = (kostnader: any) => {
    return `
      <div class="total-section">
        <h3>Kostnadssummering</h3>
        <div class="total-row">
          <span>Totalt material exkl. moms:</span>
          <span>${formatPrice(kostnader.totalMaterialKostnad)}</span>
        </div>
        <div class="total-row">
          <span>Totalt arbete exkl. moms:</span>
          <span>${formatPrice(kostnader.totalArbetskostnad)}</span>
        </div>
        <div class="total-row">
          <span>Totalt exkl. moms:</span>
          <span>${formatPrice(kostnader.totalExklMoms)}</span>
        </div>
        <div class="total-row">
          <span>Moms (25%):</span>
          <span>${formatPrice(kostnader.momsBelopp)}</span>
        </div>
        <div class="total-row" style="font-weight: bold;">
          <span>Totalt inkl. moms:</span>
          <span>${formatPrice(kostnader.totalInklMoms)}</span>
        </div>
        ${
          state.kundTyp === "privat" && kostnader.rotAvdrag > 0
            ? `
          <div class="total-row" style="color: #059669; font-weight: bold;">
            <span>ROT-avdrag (50%):</span>
            <span>-${formatPrice(kostnader.rotAvdrag)}</span>
          </div>
          <div class="total-row" style="font-size: 20px; font-weight: bold; color: #059669; border-top: 2px solid #059669; padding-top: 10px; margin-top: 10px;">
            <span>Att betala:</span>
            <span>${formatPrice(kostnader.total)}</span>
          </div>
        `
            : ""
        }
      </div>
    `
  }

  const getFooterContent = (template: PDFTemplate) => {
    const validity = `
      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #f59e0b;">
        <strong>Giltighet:</strong> Detta kostnadsförslag är giltigt i 30 dagar från utfärdandedatum.
      </div>
    `

    const footer = `
      <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <p>Värmepump Service AB | Org.nr: 556123-4567 | Tel: 08-123 45 67 | info@varmepumpservice.se</p>
        <p>Alla priser inkluderar installation och garanti enligt våra standardvillkor</p>
      </div>
    `

    return validity + footer
  }

  const beräknaKostnader = () => {
    const kostnader = {
      materialkostnadExklMoms: 0,
      arbetskostnadExklMoms: 0,
      felsökningKostnad: 0,
      resaKostnad: 0,
      totalMaterialKostnad: 0,
      totalArbetskostnad: 0,
      totalExklMoms: 0,
      momsBelopp: 0,
      totalInklMoms: 0,
      rotAvdrag: 0,
      total: 0,
    }

    if (type === "värmepump" && state.värmepump) {
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

      // Beräkna totaler
      kostnader.totalMaterialKostnad = kostnader.materialkostnadExklMoms
      kostnader.totalArbetskostnad = kostnader.arbetskostnadExklMoms
      kostnader.totalExklMoms = kostnader.totalMaterialKostnad + kostnader.totalArbetskostnad
      kostnader.momsBelopp = kostnader.totalExklMoms * MOMS
      kostnader.totalInklMoms = kostnader.totalExklMoms + kostnader.momsBelopp

      if (state.kundTyp === "privat") {
        const arbetskostnadSchablon = kostnader.totalInklMoms * 0.3 // 30% av totalkostnaden inkl moms antas vara arbetskostnad
        kostnader.rotAvdrag = Math.min(arbetskostnadSchablon * 0.5, MAX_ROT) // 50% ROT-avdrag på arbetskostnaden
      }

      kostnader.total = kostnader.totalInklMoms - (kostnader.rotAvdrag || 0)
    }

    if (type === "reparation") {
      // Arbetstid
      kostnader.arbetskostnadExklMoms = (state.timmar || 0) * 850 // REPARATION_PRISER.TIMPRIS

      // Tidigare felsökning
      if (state.tidigareFelsökning && state.tidigareTimmar) {
        kostnader.arbetskostnadExklMoms += state.tidigareTimmar * 850
      }

      // Ny felsökning
      if (state.utförFelsökning && state.felsökningTyp) {
        const felsökningTyper = {
          grundläggande: { namn: "Grundläggande felsökning", pris: 800 },
          avancerad: { namn: "Avancerad felsökning", pris: 1500 },
          komplett: { namn: "Komplett systemanalys", pris: 2500 },
        }
        kostnader.felsökningKostnad = felsökningTyper[state.felsökningTyp as keyof typeof felsökningTyper]?.pris || 0
      }

      // Framkörning
      if (state.framkörning) {
        kostnader.arbetskostnadExklMoms += 500
      }

      // Certifiering
      if (state.certifiering) {
        kostnader.arbetskostnadExklMoms += 800
      }

      // Material och extra arbeten
      if (state.provtryckning) {
        kostnader.materialkostnadExklMoms += state.köldmediaMängd > 3 ? 1200 : 800
      }

      if (state.svetsMaterial) {
        kostnader.materialkostnadExklMoms += 600
      }

      // Köldmedium
      if (state.köldmediumTyp && state.köldmediaMängd > 0) {
        const köldmediaTyper = {
          R32: { namn: "R32", pris: 45 },
          R410A: { namn: "R410A", pris: 55 },
          R407C: { namn: "R407C", pris: 65 },
          R134a: { namn: "R134a", pris: 75 },
        }
        const mediumPris = köldmediaTyper[state.köldmediumTyp as keyof typeof köldmediaTyper]?.pris || 0
        kostnader.materialkostnadExklMoms += state.köldmediaMängd * mediumPris
      }

      // Reservdelar med påslag
      if (state.reservdelar && state.reservdelar.length > 0) {
        state.reservdelar.forEach((del: any) => {
          const inköpspris = Number.parseFloat(del.inköpspris) || 0
          const påslag = 1.5 // 50% påslag
          kostnader.materialkostnadExklMoms += inköpspris * påslag
        })
      }

      // Resa
      if (state.resaKm > 0) {
        kostnader.resaKostnad = state.resaKm * 18.5 // REPARATION_PRISER.RESA_PER_KM
      }

      // Övriga kostnader
      if (state.övrigKostnad > 0) {
        kostnader.materialkostnadExklMoms += state.övrigKostnad
      }

      // Beräkna totaler
      kostnader.totalMaterialKostnad = kostnader.materialkostnadExklMoms
      kostnader.totalArbetskostnad = kostnader.arbetskostnadExklMoms
      kostnader.totalExklMoms = kostnader.totalMaterialKostnad + kostnader.totalArbetskostnad
      kostnader.momsBelopp = kostnader.totalExklMoms * MOMS
      kostnader.totalInklMoms = kostnader.totalExklMoms + kostnader.momsBelopp

      if (state.kundTyp === "privat") {
        kostnader.rotAvdrag = Math.min(kostnader.arbetskostnadExklMoms * 0.5, MAX_ROT) // ROT_PROCENT, MAX_ROT
      }

      kostnader.total = kostnader.totalInklMoms - (kostnader.rotAvdrag || 0)
    }

    return kostnader
  }

  const generateContentByType = () => {
    if (type === "värmepump" && state.värmepump) {
      return `
        <div class="section">
          <div class="section-title">Värmepumpsinstallation</div>
          <div class="item-row">
            <span><strong>Värmepump:</strong> ${state.värmepump.tillverkare} ${state.värmepump.modell} ${state.värmepump.storlek}</span>
            <span>${state.kundTyp === "privat" ? formatPrice(state.värmepump.kampanj) : formatPrice(state.värmepump.ordinarie)}</span>
          </div>
          <div class="item-row">
            <span>Installation (${STANDARD_INSTALLATION.TIMMAR} timmar):</span>
            <span>${formatPrice(STANDARD_INSTALLATION.TIMMAR * MATERIAL_PRISER.KOSTNAD_TIM * (1 + MOMS))}</span>
          </div>
          ${
            state.extraRörlängd > 0
              ? `
            <div class="item-row">
              <span>Extra rörlängd (${state.extraRörlängd}m):</span>
              <span>${formatPrice(state.extraRörlängd * MATERIAL_PRISER.EXTRA_RÖRLÄNGD * (1 + MOMS))}</span>
            </div>
          `
              : ""
          }
        </div>

        <div class="section">
          <div class="section-title">Inkluderat i installationen</div>
          <ul>
            <li>Montering av inomhus- och utomhusenhet</li>
            <li>Kopparrör och isolering</li>
            <li>Elektrisk inkoppling till befintligt uttag inom 3m</li>
            <li>Provkörning och injustering</li>
            <li>2 års garanti på installation</li>
            <li>Tillverkarens garanti på värmepump</li>
          </ul>
        </div>
      `
    }

    if (type === "reparation") {
      let content = '<div class="section"><div class="section-title">Reparationsarbete</div>'

      // Arbetstid
      if (state.timmar > 0) {
        content += `
          <div class="item-row">
            <span>Reparation (${state.timmar}h à ${formatPrice(850)}):</span>
            <span>${formatPrice(state.timmar * 850 * (1 + 0.25))}</span>
          </div>
        `
      }

      // Tidigare felsökning
      if (state.tidigareFelsökning && state.tidigareTimmar > 0) {
        content += `
          <div class="item-row">
            <span>Tidigare felsökning (${state.tidigareTimmar}h):</span>
            <span>${formatPrice(state.tidigareTimmar * 850 * (1 + 0.25))}</span>
          </div>
        `
      }

      // Felsökning
      if (state.utförFelsökning && state.felsökningTyp) {
        const felsökningTyper = {
          grundläggande: { namn: "Grundläggande felsökning", pris: 800 },
          avancerad: { namn: "Avancerad felsökning", pris: 1500 },
          komplett: { namn: "Komplett systemanalys", pris: 2500 },
        }
        const felsökning = felsökningTyper[state.felsökningTyp as keyof typeof felsökningTyper]
        if (felsökning) {
          content += `
            <div class="item-row">
              <span><strong>Felsökning:</strong> ${felsökning.namn}</span>
              <span>${formatPrice(felsökning.pris * (1 + 0.25))}</span>
            </div>
          `
        }
      }

      // Köldmedium
      if (state.köldmediumTyp && state.köldmediaMängd > 0) {
        const köldmediaTyper = {
          R32: { namn: "R32", pris: 45 },
          R410A: { namn: "R410A", pris: 55 },
          R407C: { namn: "R407C", pris: 65 },
          R134a: { namn: "R134a", pris: 75 },
        }
        const medium = köldmediaTyper[state.köldmediumTyp as keyof typeof köldmediaTyper]
        if (medium) {
          content += `
            <div class="item-row">
              <span><strong>Köldmedium:</strong> ${medium.namn} (${state.köldmediaMängd} kg)</span>
              <span>${formatPrice(medium.pris * state.köldmediaMängd * (1 + 0.25))}</span>
            </div>
          `
        }
      }

      content += "</div>"

      // Reservdelar
      if (state.reservdelar && state.reservdelar.length > 0) {
        content += '<div class="section"><div class="section-title">Reservdelar</div>'
        state.reservdelar.forEach((del: any) => {
          const inköpspris = Number.parseFloat(del.inköpspris) || 0
          const påslag = 1.5 // 50% påslag
          const försäljningspris = inköpspris * påslag
          content += `
            <div class="item-row">
              <span><strong>${del.namn}:</strong> ${del.förklaring}</span>
              <span>${formatPrice(försäljningspris * (1 + 0.25))}</span>
            </div>
          `
        })
        content += "</div>"
      }

      // Resa
      if (state.resaKm > 0) {
        content += `
          <div class="section">
            <div class="section-title">Resa</div>
            <div class="item-row">
              <span>Resa (${state.resaKm}km à ${formatPrice(18.5)}):</span>
              <span>${formatPrice(state.resaKm * 18.5 * (1 + 0.25))}</span>
            </div>
          </div>
        `
      }

      return content
    }

    return ""
  }

  const generateOfferNumber = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `${year}${month}${day}-${random}`
  }

  const hasData =
    type === "värmepump"
      ? state.värmepump
      : state.timmar ||
        state.tidigareFelsökning ||
        state.utförFelsökning ||
        state.köldmediumTyp ||
        state.reservdelar ||
        state.resaKm ||
        state.övrigKostnad

  if (!hasData) {
    return null
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">📄</span>
          Skapa kostnadsförslag
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Välj mall:</label>
          <Select value={selectedTemplate} onValueChange={(value: PDFTemplate) => setSelectedTemplate(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PDF_TEMPLATES).map(([key, template]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: template.color }} />
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-gray-500">{template.description}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => generatePDF(true)} variant="outline" className="flex-1">
            <span className="mr-2">👁️</span>
            Förhandsgranska
          </Button>
          <Button
            onClick={() => generatePDF(false)}
            className="flex-1"
            style={{ backgroundColor: PDF_TEMPLATES[selectedTemplate].color }}
          >
            <span className="mr-2">⬇️</span>
            Skapa PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
