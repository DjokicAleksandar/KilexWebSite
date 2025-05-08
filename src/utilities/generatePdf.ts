import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import JsPDFInvoiceTemplateProps from "jspdf-invoice-template";

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export async function GeneratePDF (data : {
    name: string;
    lastName: string;
    adress: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    totalPrice: string;
    productsForPdf: Product[];
}) {
    // let logoImg = "";

    // async function loadLogo() {
    //     try {
    //         let response = await fetch(import.meta.env.BASE_URL + "logoBase64.json");
    //         let data = await response.json();
    //         return data.logo;
    //     } catch (error) {
    //         console.log("Greška prilikom učitavanja logoa:", error);
    //         return "";
    //     }
    // }

    // logoImg = await loadLogo();

    var props = {
        outputType: OutputType.DataUriString,
        //Allows for additional configuration prior to writing among others, adds support for different languages and symbols
        returnJsPDFDocObject: true,
        fileName: "Faktura",
        orientationLandscape: false,
        compress: true,
        logo: {
            src: "",
            type: 'PNG', //optional, when src= data:uri (nodejs case)
            width: 30, //aspect ratio = width/height
            height: 26.66,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0 //negative or positive num, from the current position
            }
        },
        business: {
            name: "Kilex",
            address: "Srbija, Stajkovce",
            phone: "+381 62 8429330",
            email: "kilexxx0@gmail.com",
            website: "www.kilex.shop",
        },
        contact: {
            label: "Faktura za:",
            name: data.name + " " + data.lastName,
            address: data.adress,
            phone: data.phone,
            email: data.email,
        },
        invoice: {
            //label: "Invoice #: ",
            //num: 19,
            invDate: "Datum izdavanja: " + data.date + ", " + data.time,
            //invGenDate: "Invoice Date: 02/02/2021 10:17",
            headerBorder: false,
            tableBodyBorder: false,
            header: [
            {
                title: "#", 
                style: { 
                width: 10 
                } 
            }, 
            { 
                title: "Proizvodi",
                style: {
                width: 30
                } 
            }, 
            { 
                title: "Opis",
                style: {
                width: 80
                } 
            }, 
            { title: "Cena"},
            { title: "Kolicina"},
            //{ title: "Unit"},
            { title: "Ukupno"}
            ],
            table: data.productsForPdf.map((product: Product, index: number) => ([
                index + 1,               // Redni broj
                product.name,            // Naziv proizvoda
                "Trepavice",     // Opis proizvoda
                product.price,           // Cena
                product.quantity,        // Količina
                product.price * product.quantity // Ukupna cena
            ])),
            additionalRows: [{
                col1: 'Dostava: ',
                col2: String('300.00'),
                col3: 'DIN',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            {
                col1: 'Ukupno: ',
                col2: data.totalPrice + ",00",
                col3: 'DIN',
                style: {
                    fontSize: 14 //optional, default 12
                }
            }],
            invDescLabel: "Napomena: ",
            invDesc: "U slucaju reklamacije, molimo Vas da nas kontaktirate na kilexxx0@gmail.com ili putem Whatsapp ili Vibera na broj +381628429330",
        },
        footer: {
            text: "Faktura je generisana na racunaru i validna je bez potpisa ili pecata.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };

    const pdfObject = jsPDFInvoiceTemplate(props);

    const jsPDFInstance = pdfObject.jsPDFDocObject; // Ovo vraća stvarni jsPDF objekat

    const pdfBase64 = jsPDFInstance.output('datauristring').split(",")[1]; // Kreiranje Base64 stringa

    return pdfBase64;
}
