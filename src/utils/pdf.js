import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { TIMPRIS, KÖLDMEDIA_TYPER } from '../constants/pricing';
import { MATERIAL_PRISER } from '../constants/installationspriser';
import { 
    PROVTRYCKNING_KOSTNAD, 
    SVETS_MATERIAL_KOSTNAD,
    FRAMKÖRNING_KOSTNAD,
    CERTIFIERING_KOSTNAD 
} from '../constants/kostnader';
import { formatPrice } from './utils';
import { KALKYLATOR_TYPER } from '../constants/priser';

const MOMS = 0.25;

export const generatePDF = (data) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 25;
    let y = 30;

    // Färger och stilar
    const colors = {
        primary: [44, 62, 80],      // Mörkblå
        secondary: [52, 152, 219],  // Ljusblå
        text: [44, 62, 80],         // Mörkgrå
        lightText: [127, 140, 141], // Ljusgrå
        background: [236, 240, 241], // Ljusgrå bakgrund
        accent: [46, 204, 113]      // Grön för positiva värden
    };

    // SIDA 1 - Modern header
    doc.setFillColor(...colors.secondary);
    doc.rect(0, 0, pageWidth, 15, 'F');
    
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("KOSTNADSFÖRSLAG - REPARATION", margin, 10);

    // Företagsinformation i modern stil
    doc.setFillColor(...colors.background);
    doc.rect(margin, y, pageWidth - 2 * margin, 45, 'F');
    
    doc.setFontSize(16);
    doc.setTextColor(...colors.primary);
    doc.setFont(undefined, 'bold');
    y += 10;
    doc.text("Kylkompaniet AB", margin + 5, y);
    
    doc.setFontSize(10);
    doc.setTextColor(127, 140, 141);
    y += 5;
    doc.text("Org.nr: 556XXX-XXXX", margin, y);
    y += 5;
    doc.text("Tel: 031-XXX XX XX", margin, y);
    y += 5;
    doc.text("E-post: info@kylkompaniet.se", margin, y);
    y += 5;
    doc.text("Adress: Kylvägen 1, 123 45 Göteborg", margin, y);
    
    // Dokumenttitel och nummer
    y += 20;
    doc.setFontSize(18);
    doc.setTextColor(44, 62, 80);
    doc.text("KOSTNADSFÖRSLAG - REPARATION", margin, y);
    
    const offertnummer = Math.floor(Math.random() * 90000) + 10000;
    doc.setFontSize(10);
    doc.setTextColor(127, 140, 141);
    y += 10;
    doc.text(`Datum: ${new Date().toLocaleDateString('sv-SE')}`, margin, y);
    doc.text(`Offertnr: ${offertnummer}`, pageWidth - margin - 40, y);

    // Kundinformation
    y += 15;
    doc.setDrawColor(189, 195, 199);
    doc.setFillColor(236, 240, 241);
    doc.rect(margin, y, pageWidth - 2 * margin, 35, 'F');
    
    doc.setTextColor(44, 62, 80);
    y += 5;
    if (data.kundTyp === 'foretag') {
        doc.text(`${data.kundNamn}`, margin + 5, y);
        y += 5;
        doc.text(`Att: ${data.kontaktperson}`, margin + 5, y);
    } else {
        doc.text(`${data.fornamn} ${data.efternamn}`, margin + 5, y);
    }
    y += 5;
    doc.text(data.kundAdress, margin + 5, y);
    y += 5;
    doc.text(`Tel: ${data.kundTelefon}`, margin + 5, y);
    doc.text(`E-post: ${data.kundEmail}`, pageWidth - margin - 100, y);

    // Beskrivning av arbetet
    y += 25;
    doc.setFontSize(14);
    doc.setTextColor(44, 62, 80);
    doc.text("Beskrivning av arbetet", margin, y);
    
    y += 10;
    doc.setFontSize(10);
    doc.text("Omfattning av reparation:", margin, y);
    y += 7;
    doc.text(`• Felsökning och reparation av anläggning: ${data.anläggning}`, margin + 5, y);
    y += 7;
    doc.text(`• ${data.beskrivning || 'Ingen beskrivning tillgänglig'}`, margin + 5, y);
    
    if (data.teknikerNoteringar) {
        y += 7;
        doc.text(`Teknikers noteringar: ${data.teknikerNoteringar}`, margin + 5, y);
    }

    // Tidsplan
    y += 15;
    doc.text("Tidsplan:", margin, y);
    y += 7;
    doc.text("• Arbetet beräknas påbörjas inom 5 arbetsdagar efter godkännande", margin + 5, y);
    y += 7;
    doc.text(`• Beräknad arbetstid: ${data.timmar} timmar`, margin + 5, y);

    // Lägg till värmepumpsdetaljer
    if (data.kalkylatorsTyp === KALKYLATOR_TYPER.LUFT_LUFT && data.värmepump) {
        doc.text(`Vald värmepump: ${data.värmepump.namn}`, margin, y);
        y += lineHeight;
        doc.text(`Effekt: ${data.värmepump.effekt}`, margin, y);
        y += lineHeight;
        
        // Visa priser korrekt baserat på kundtyp
        if (data.kundTyp === 'privat') {
            doc.text(`Pris inkl. moms: ${formatPrice(data.värmepump.pris)} kr`, margin, y);
            if (data.värmepump.ordinarie !== data.värmepump.kampanj) {
                y += lineHeight;
                doc.text(`Ordinarie pris: ${formatPrice(data.värmepump.ordinarie)} kr`, margin, y);
            }
        } else {
            doc.text(`Pris exkl. moms: ${formatPrice(data.värmepump.pris)} kr`, margin, y);
        }
    }

    // Villkor och garantier på sida 1
    y = doc.internal.pageSize.height - 80;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(44, 62, 80);
    doc.text("Villkor och garantier:", margin, y);
    y += 7;
    doc.setFontSize(9);
    doc.setTextColor(127, 140, 141);
    doc.text("• Betalningsvillkor: 30 dagar netto", margin, y);
    y += 5;
    doc.text("• Kostnadsförslaget är giltigt i 30 dagar från offertdatum", margin, y);
    y += 5;
    doc.text("• 2 års garanti på utfört arbete och material enligt konsumenttjänstlagen", margin, y);
    y += 5;
    doc.text("• Vid oförutsedda omständigheter som kan påverka totalpriset kontaktas kund för godkännande", margin, y);
    y += 5;
    doc.text("• Enligt konsumenttjänstlagen får priset inte överstiga offerten med mer än 15% utan kundens godkännande", margin, y);

    // SIDA 2 - Kostnadsspecifikation
    doc.addPage();
    y = 30;

    // Header
    doc.setFillColor(...colors.secondary);
    doc.rect(0, 0, pageWidth, 15, 'F');
    
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("KOSTNADSSPECIFIKATION", margin, 10);
    doc.text(`Offertnr: ${offertnummer}`, pageWidth - margin - 40, 10);

    // Arbetskostnader sektion
    y = 40;
    doc.setFillColor(...colors.background);
    doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
    doc.setTextColor(...colors.primary);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text("ARBETSKOSTNADER", margin + 2, y + 6);
    y += 15;

    // Arbetskostnadstabell
    const arbetsData = [];
    const materialData = [];

    // Lägg till arbetstimmar (inklusive uppföljande tid)
    const totalTimmar = data.timmar + (data.uppföljandeläcksökning ? 1 : 0);
    arbetsData.push([
        'Arbete',
        `${totalTimmar} timmar`,
        `${TIMPRIS} kr/tim`,
        `${(totalTimmar * TIMPRIS).toFixed(2)} kr`
    ]);

    // Beräkna totalt antal framkörningar
    let framkörningAntal = 1; // Grundframkörning
    if (data.tidigareFelsökning) framkörningAntal += 1;
    if (data.uppföljandeläcksökning) framkörningAntal += 1;

    // Lägg till framkörningar
    let framkörningsBeskrivning = 'Framkörning';
    let framkörningsDetaljer = [];
    
    if (framkörningAntal > 1) {
        framkörningsBeskrivning = 'Framkörningar';
        if (data.tidigareFelsökning) framkörningsDetaljer.push('tidigare besök');
        if (data.uppföljandeläcksökning) framkörningsDetaljer.push('uppföljande läcksökning');
    }

    arbetsData.push([
        `${framkörningsBeskrivning}${framkörningsDetaljer.length > 0 ? ` (${framkörningsDetaljer.join(', ')})` : ''}`,
        `${framkörningAntal} st`,
        `${FRAMKÖRNING_KOSTNAD} kr/st`,
        `${(framkörningAntal * FRAMKÖRNING_KOSTNAD).toFixed(2)} kr`
    ]);

    // Lägg till certifieringsavgift
    arbetsData.push([
        'Certifieringsavgift',
        '1',
        `${CERTIFIERING_KOSTNAD} kr`,
        `${CERTIFIERING_KOSTNAD.toFixed(2)} kr`
    ]);

    // Arbetskostnadstabell
    doc.autoTable({
        startY: y,
        head: [['Beskrivning', 'Antal', 'À-pris', 'Belopp']],
        body: arbetsData,
        theme: 'plain', // Ändra till plain för enklare design
        styles: {
            fontSize: 9,
            cellPadding: 3
        },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 30, halign: 'right' },
            2: { cellWidth: 40, halign: 'right' },
            3: { cellWidth: 40, halign: 'right' }
        },
        margin: { left: margin, right: margin },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: colors.primary,
            fontStyle: 'bold',
            lineWidth: 0.1,
            lineColor: [220, 220, 220]
        },
        bodyStyles: {
            lineColor: [220, 220, 220],
            lineWidth: 0.1
        },
        footStyles: {
            fontStyle: 'bold'
        }
    });

    y = doc.lastAutoTable.finalY + 20;

    // Materialkostnader sektion (om det finns material)
    if (materialData.length > 0) {
        doc.setFillColor(...colors.background);
        doc.rect(margin, y, pageWidth - 2 * margin, 8, 'F');
        doc.setTextColor(...colors.primary);
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text("MATERIALKOSTNADER", margin + 2, y + 6);
        y += 15;

        // Materialkostnadstabell med samma stil som arbetskostnadstabellen
        doc.autoTable({
            startY: y,
            head: [['Beskrivning', 'Antal', 'À-pris', 'Belopp']],
            body: materialData,
            theme: 'plain',
            styles: {
                fontSize: 9,
                cellPadding: 3
            },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 30, halign: 'right' },
                2: { cellWidth: 40, halign: 'right' },
                3: { cellWidth: 40, halign: 'right' }
            },
            margin: { left: margin, right: margin },
            headStyles: {
                fillColor: [255, 255, 255],
                textColor: colors.primary,
                fontStyle: 'bold',
                lineWidth: 0.1,
                lineColor: [220, 220, 220]
            },
            bodyStyles: {
                lineColor: [220, 220, 220],
                lineWidth: 0.1
            },
            footStyles: {
                fontStyle: 'bold'
            }
        });

        y = doc.lastAutoTable.finalY + 20;
    }

    // Summering längst ner på sidan
    const summeringY = doc.internal.pageSize.height - 80;
    
    // Summering med enkel linje ovanför
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.1);
    doc.line(margin, summeringY, pageWidth - margin, summeringY);

    doc.setTextColor(...colors.text);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');

    // Justera summering till höger
    const rightAlign = pageWidth - margin - 50;
    
    doc.text("Total exkl. moms:", margin, summeringY + 10);
    doc.text(`${data.totalExklMoms.toFixed(2)} kr`, rightAlign, summeringY + 10, { align: 'right' });

    doc.text("Moms (25%):", margin, summeringY + 20);
    doc.text(`${data.momsBelopp.toFixed(2)} kr`, rightAlign, summeringY + 20, { align: 'right' });

    if (data.kundTyp === 'privat' && data.rotAvdrag > 0) {
        doc.text("ROT-avdrag:", margin, summeringY + 30);
        doc.text(`-${data.rotAvdrag.toFixed(2)} kr`, rightAlign, summeringY + 30, { align: 'right' });
    }

    // Total att betala med fet stil
    doc.setFont(undefined, 'bold');
    doc.text("Totalt att betala:", margin, summeringY + 45);
    doc.text(`${data.slutpris.toFixed(2)} kr`, rightAlign, summeringY + 45, { align: 'right' });

    // Footer
    const addFooter = () => {
        const footerY = doc.internal.pageSize.height - 25;
        doc.setFillColor(...colors.secondary);
        doc.rect(0, footerY, pageWidth, 25, 'F');
        
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(255, 255, 255);
        doc.text("Alla priser är angivna i SEK", margin, footerY + 15);
        doc.text(`Offertnr: ${offertnummer}`, pageWidth - margin - 40, footerY + 15);
    };

    addFooter();

    // Spara PDF
    doc.save(`kostnadsforslag_${offertnummer}.pdf`);
};
