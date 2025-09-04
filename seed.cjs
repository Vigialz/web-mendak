// seed.cjs
const admin = require("firebase-admin");
const serviceAccount = require("./servAcc.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const dusunData =

    {
        "data": [
            {
                "id": 1,
                "name": "Nasi Goreng / Angkringan Mendak",
                "category": "kuliner",
                "description": "Angkringan dengan menu masakan tradisional Jawa dan berbagai menu yang lainnya",
                "image": "https://uhoigatfiqbqftztlpiv.supabase.co/storage/v1/object/public/mendak/nasigoreng.JPG",
                "specialties": ["Gudeg", "Soto Ayam", "Nasi Pecel"]
            },
            {
                "id": 2,
                "name": "Swalayan D'Mart",
                "category": "retail",
                "description": "Toko swalayan lengkap dengan berbagai kebutuhan sehari-hari warga dusun",
                "image": "https://uhoigatfiqbqftztlpiv.supabase.co/storage/v1/object/public/mendak/demart.JPG",
                "specialties": ["Sembako", "Alat Tulis", "Obat-obatan"]
            },
            {
                "id": 3,
                "name": "Batu Alam",
                "category": "kerajinan",
                "description": "Kerajinan tangan dari batu alam seperti bata rumah, pondasi, dan batu hias",
                "image": "https://uhoigatfiqbqftztlpiv.supabase.co/storage/v1/object/public/mendak/placeholder.jpg",
                "specialties": ["Batako", "Batu Alam", "Batu Hias"]
            },
            {
                "id": 4,
                "name": "Jasa Rental / Sewa Mobil",
                "category": "jasa",
                "description": "Rental mobil untuk kebutuhan transportasi warga dusun dan sekitarnya",
                "image": "https://uhoigatfiqbqftztlpiv.supabase.co/storage/v1/object/public/mendak/sewa.JPG",
                "specialties": ["Rental Mobil"]
            },
            {
                "id": 5,
                "name": "Jamu Tradisional",
                "category": "kuliner",
                "description": "UMKM jamu tradisional dengan berbagai ramuan herbal untuk kesehatan",
                "image": "https://uhoigatfiqbqftztlpiv.supabase.co/storage/v1/object/public/mendak/jamu.JPG",
                "specialties": ["Jamu"]
            },
            {
                "id": 6,
                "name": "Katering Makanan",
                "category": "kuliner",
                "description": "Katering makanan untuk acara-acara seperti pernikahan, khitanan, dan acara keluarga",
                "image": "https://uhoigatfiqbqftztlpiv.supabase.co/storage/v1/object/public/mendak/placeholder.jpg",
                "specialties": ["Nasi Tumpeng", "Kue Tradisional", "Snack Box"]
            },
            {
                "id": 7,
                "name": "Buah Pisang",
                "category": "kuliner",
                "description": "Buah pisang segar dari kebun masyarakat sekitar dengan berbagai jenis pisang",
                "image": "https://uhoigatfiqbqftztlpiv.supabase.co/storage/v1/object/public/mendak/pisang.jpg",
                "specialties": ["Pisang Ambon", "Pisang Kepok", "Pisang Raja"]
            },
            {
                "id": 8,
                "name": "Mie Ayam dan Gorengan",
                "category": "kuliner",
                "description": "Warung mie ayam dan gorengan dengan cita rasa khas dan harga terjangkau",
                "image": "https://uhoigatfiqbqftztlpiv.supabase.co/storage/v1/object/public/mendak/mieayam.JPG",
                "specialties": ["Mie Ayam", "Tahu Tempe", "Gorengan"]
            }
        ]
    }












async function uploadData() {
    try {
        await db.collection("umkm").doc("data").set(dusunData);
        console.log("✅ Data berhasil diupload ke Firestore!");
        process.exit(0);
    } catch (e) {
        console.error("❌ Error uploading data:", e);
        process.exit(1);
    }
}

uploadData();
