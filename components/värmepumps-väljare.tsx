"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VÄRMEPUMPAR } from "@/lib/constants"
import { formatPrice } from "@/lib/utils"
import { Check } from "lucide-react"

interface VärmepumpsVäljareProps {
  state: any
  updateState: (key: string, value: any) => void
}

export function VärmepumpsVäljare({ state, updateState }: VärmepumpsVäljareProps) {
  const handleVärmepumpVal = (pump: any) => {
    updateState("värmepump", pump)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Välj värmepump</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VÄRMEPUMPAR.map((pump) => (
            <div
              key={pump.id}
              onClick={() => handleVärmepumpVal(pump)}
              className={`relative p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                state.värmepump?.id === pump.id ? "border-blue-500 bg-blue-50 shadow-md" : "hover:bg-gray-50"
              }`}
            >
              {state.värmepump?.id === pump.id && (
                <div className="absolute top-2 right-2">
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-semibold text-lg">{pump.model}</h4>

                <div className="space-y-1">
                  {state.kundTyp === "privat" ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Kampanjpris:</span>
                        <span className="font-bold text-green-600">{formatPrice(pump.kampanj)}</span>
                      </div>
                      {pump.ordinarie !== pump.kampanj && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Ordinarie:</span>
                          <span className="text-sm text-gray-500 line-through">{formatPrice(pump.ordinarie)}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Pris:</span>
                      <span className="font-bold">
                        {formatPrice(pump.ordinarie)} <span className="text-xs text-gray-500">exkl. moms</span>
                      </span>
                    </div>
                  )}
                </div>

                {pump.kampanj < pump.ordinarie && state.kundTyp === "privat" && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Kampanj!
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
