const form = document.querySelector('form');
const imgSeparator = ",";

 
form.addEventListener('submit', (e) => { // Lägger till en händelselyssnare för formulärets submit-event
    e.preventDefault(); // Förhindrar standardformulärets skickande

    const formData = new FormData(e.target); // Skapar ett FormData-objekt från formuläret

    const imageUrls = [// Skapa array av bild-URL:er från formulärfälten
        formData.get("imageurl1"),
        formData.get("imageurl2"),
        formData.get("imageurl3")
    ].join(imgSeparator);

        // Generera en unik SKU
        const generateSKU = () => {
            const timestamp = Date.now().toString(36); // Konvertera tidsstämpel till en bas 36 sträng
            const randomString = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generera en slumpmässig sträng
            return `SKU-${timestamp}-${randomString}`;
        };
        // Generera en URL-slug från produktnamnet och SKU
        const generateSlug = (name, sku) => {
            const combinedString = `${name}-${sku}`;
            return combinedString.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        };

    // Generera SKU och slug
    const sku = generateSKU();
    const slug = generateSlug(formData.get("name"), sku);

      // Skapa ett objekt som innehåller produktdata från formulärfälten
    const productData = {
        name: formData.get("name"),
        price: formData.get("price"),
        description: formData.get("description"),
        image: imageUrls, //Kombinerar bild-URL:erna till en enda sträng
        category: formData.get("category"),
        size: formData.get("size"),
        color: formData.get("color"),
        brand: formData.get("brand"),
        sku: sku,//unik SKU
        slug: slug//URL-slug
    };
    fetch('/api', { // Skickar en POST-förfrågan till '/api' endpointen
        method: 'POST', // Använder HTTP-metoden POST,   
        headers: {// Lägg till metadata i headers för att berätta att datan är JSON
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData), // Konverterar produktdata till JSON
    })
    .then(response => {
        if (response.ok) { // Om svaret är OK (statuskod 200-299)
            window.location.href = '/admin'; // Omdirigerar användaren till Admin sidan
        } else { // Om svaret inte är OK
            return response.json(); // Läser svaret som JSON
        }
    })
    .catch(error => {
        console.error('Error:', error); // Loggar eventuella fel till konsolen
    });
});