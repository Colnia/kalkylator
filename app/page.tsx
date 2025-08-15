"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { KostnadsKalkylator } from "@/components/kostnadskalkylator"
import { HistorikVy } from "@/components/historik-vy"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-6xl mx-auto shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <CardTitle className="text-3xl font-bold">Företagsverktyg</CardTitle>
                <p className="text-blue-100 mt-2">Professionell kostnadskalkylator för värmepumpar och reparationer</p>
              </div>
              <Link href="/admin">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  ⚙️ Admin
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="kalkylator" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="kalkylator" className="text-lg">
                  Kostnadskalkylator
                </TabsTrigger>
                <TabsTrigger value="historik" className="text-lg">
                  Historik
                </TabsTrigger>
              </TabsList>

              <TabsContent value="kalkylator" className="space-y-6">
                <KostnadsKalkylator />
              </TabsContent>

              <TabsContent value="historik" className="space-y-6">
                <HistorikVy />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
