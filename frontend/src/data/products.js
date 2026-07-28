export const CATEGORIES = [
  { id: "bridal", name: "Bridal Outfit", icon: "👗", color: "#F85606" },
  { id: "couple", name: "Bengali Couple Set", icon: "👫", color: "#E64545" },
  { id: "family", name: "Bengali Family Combo", icon: "👨‍👩‍👧‍👦", color: "#00B14F" },
  { id: "gown", name: "Gown", icon: "👗", color: "#7B61FF" },
  { id: "saree", name: "Saree", icon: "🧶", color: "#FF6633" },
  { id: "lehenga", name: "Lehenga", icon: "✨", color: "#C42D7C" },
  { id: "indian", name: "Indian Party Dress", icon: "🪷", color: "#00A0E3" },
  { id: "pakistani", name: "Pakistani Luxury", icon: "💎", color: "#D4A843" },
  { id: "skincare", name: "Skincare Products", icon: "🧴", color: "#4CAF50" },
  { id: "jewellery", name: "Jewellery & Accessories", icon: "💍", color: "#FF9800" },
];

const IMG = "https://images.unsplash.com";

export const INITIAL_PRODUCTS = [
  {
    id: "p1", name: "Royal Red Banarasi Bridal Lehenga with Heavy Embroidery",
    price: 45000, originalPrice: 65000, category: "Bridal Outfit",
    description: "Exquisite handcrafted Banarasi bridal lehenga featuring intricate zardozi work, stone embellishments, and a flowing silhouette perfect for your special day.",
    image: `${IMG}/photo-1594631252845-29fc4cc8cde9?w=400`, rating: 4.8, reviewCount: 124, inStock: true, trending: true, sold: 342, freeDelivery: true,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "p2", name: "Traditional Bengali Couple Wedding Set - Red & White Theme",
    price: 28000, originalPrice: 38000, category: "Bengali Couple Set",
    description: "Matching bridal and groom ensemble featuring traditional Bengali red and white aesthetic with intricate thread work and mirror embellishments.",
    image: `${IMG}/photo-1595950653106-6c9ebd614d3a?w=400`, rating: 4.7, reviewCount: 89, inStock: true, trending: true, sold: 215, freeDelivery: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p3", name: "Bengali Family Festive Combo - 3 Piece Set",
    price: 52000, originalPrice: 72000, category: "Bengali Family Combo",
    description: "Complete family festive wear set including outfits for three members. Premium fabrics with traditional Bengali motifs and modern tailoring.",
    image: `${IMG}/photo-1610030469983-98e550d6193c?w=400`, rating: 4.6, reviewCount: 56, inStock: true, trending: false, sold: 128, freeDelivery: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "p4", name: "Elegant Italian Net Floor-Length Gown - Midnight Blue",
    price: 18500, originalPrice: 25000, category: "Gown",
    description: "Stunning floor-length gown crafted from premium Italian net fabric with sequin detailing and a flattering A-line silhouette.",
    image: `${IMG}/photo-1518611012118-696072aa579a?w=400`, rating: 4.9, reviewCount: 201, inStock: true, trending: true, sold: 467, freeDelivery: true,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "p5", name: "Kanjivaram Pure Silk Saree - Temple Border Design",
    price: 15000, originalPrice: 22000, category: "Saree",
    description: "Authentic Kanjivaram pure silk saree with traditional temple border pattern, handwoven by master artisans from South India.",
    image: `${IMG}/photo-1610030469983-98e550d6193c?w=400`, rating: 4.8, reviewCount: 178, inStock: true, trending: false, sold: 389, freeDelivery: true,
    sizes: ["Free Size"],
  },
  {
    id: "p6", name: "Designer Mirror Work Lehenga Choli - Pastel Pink",
    price: 22000, originalPrice: 32000, category: "Lehenga",
    description: "Breathtaking pastel pink lehenga adorned with traditional mirror work, paired with a heavily embellished blouse and matching dupatta.",
    image: `${IMG}/photo-1583391733956-6c78276477e2?w=400`, rating: 4.7, reviewCount: 145, inStock: true, trending: true, sold: 298, freeDelivery: true,
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "p7", name: "Indian Designer Anarkali Party Dress - Royal Purple",
    price: 12500, originalPrice: 18000, category: "Indian Party Dress",
    description: "Gorgeous Anarkali party dress in royal purple with gold thread embroidery, perfect for weddings, receptions, and festive celebrations.",
    image: `${IMG}/photo-1596394516093-501ba68a0ba6?w=400`, rating: 4.5, reviewCount: 92, inStock: true, trending: false, sold: 176, freeDelivery: false,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p8", name: "Pakistani Lawn Collection - Embroidered Luxury Suit",
    price: 8500, originalPrice: 12000, category: "Pakistani Luxury Collection",
    description: "Premium Pakistani embroidered lawn suit with digital print trousers and chiffon dupatta. Imported directly from Lahore's finest designers.",
    image: `${IMG}/photo-1612336307429-8a898d10e223?w=400`, rating: 4.6, reviewCount: 234, inStock: true, trending: true, sold: 512, freeDelivery: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p9", name: "Korean Snail Mucin Essence - Premium Skincare Set",
    price: 3200, originalPrice: 4800, category: "Imported Skincare Products",
    description: "Authentic Korean skincare set featuring snail mucin essence, hyaluronic acid serum, and collagen cream for radiant, youthful skin.",
    image: `${IMG}/photo-1556228578-0d85b1a4d571?w=400`, rating: 4.8, reviewCount: 312, inStock: true, trending: true, sold: 876, freeDelivery: true,
    sizes: ["One Size"],
  },
  {
    id: "p10", name: "Kundan Choker Necklace Set with Jhumka Earrings",
    price: 4500, originalPrice: 7000, category: "Jewellery & Trending Accessories",
    description: "Stunning Kundan choker necklace paired with matching jhumka earrings. Gold-plated with semi-precious stone embellishments.",
    image: `${IMG}/photo-1515562141589-67f0d569b18e?w=400`, rating: 4.7, reviewCount: 198, inStock: true, trending: false, sold: 445, freeDelivery: false,
    sizes: ["One Size"],
  },
  {
    id: "p11", name: "Bridal Velvet Gown - Champagne Gold Embellished",
    price: 38000, originalPrice: 55000, category: "Bridal Outfit",
    description: "Luxurious champagne gold velvet bridal gown with hand-sewn crystal embellishments and a dramatic cathedral train.",
    image: `${IMG}/photo-1518049362265-d5ef88beb731?w=400`, rating: 4.9, reviewCount: 87, inStock: true, trending: true, sold: 156, freeDelivery: true,
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "p12", name: "Bengali Tant Saree - Traditional White & Red Border",
    price: 3500, originalPrice: 5000, category: "Saree",
    description: "Classic Bengali tant saree in pristine white with traditional red border, perfect for Poila Boishakh and cultural celebrations.",
    image: `${IMG}/photo-1583391733956-6c78276477e2?w=400`, rating: 4.4, reviewCount: 167, inStock: true, trending: false, sold: 623, freeDelivery: false,
    sizes: ["Free Size"],
  },
  {
    id: "p13", name: "Japanese Cherry Blossom Skincare Routine - 5 Step Kit",
    price: 4200, originalPrice: 6500, category: "Imported Skincare Products",
    description: "Complete 5-step Japanese skincare routine with cherry blossom extract. Includes cleanser, toner, serum, moisturizer, and eye cream.",
    image: `${IMG}/photo-1570194065650-d99fb4b38b17?w=400`, rating: 4.7, reviewCount: 256, inStock: true, trending: false, sold: 734, freeDelivery: true,
    sizes: ["One Size"],
  },
  {
    id: "p14", name: "Pearl & Crystal Bridal Hair Accessories Set",
    price: 2800, originalPrice: 4000, category: "Jewellery & Trending Accessories",
    description: "Elegant bridal hair accessories set including pearl tiara, crystal pins, and a matching hair vine for a complete bridal look.",
    image: `${IMG}/photo-1535632066927-ab7c9ab60908?w=400`, rating: 4.6, reviewCount: 134, inStock: true, trending: false, sold: 289, freeDelivery: false,
    sizes: ["One Size"],
  },
  {
    id: "p15", name: "Pakistani Chiffon Dupatta Collection - Set of 3",
    price: 3800, originalPrice: 5500, category: "Pakistani Luxury Collection",
    description: "Three premium Pakistani chiffon dupattas with intricate border work. Perfect for pairing with kurtis and suits.",
    image: `${IMG}/photo-1612336307429-8a898d10e223?w=400`, rating: 4.5, reviewCount: 189, inStock: true, trending: false, sold: 456, freeDelivery: true,
    sizes: ["Free Size"],
  },
  {
    id: "p16", name: "Heavy Bridal Sharara Set - Maroon Velvet",
    price: 35000, originalPrice: 48000, category: "Bridal Outfit",
    description: "Opulent maroon velvet bridal sharara set with gold threadwork, mirror embellishments, and a matching organza dupatta.",
    image: `${IMG}/photo-1594631252845-29fc4cc8cde9?w=400`, rating: 4.8, reviewCount: 76, inStock: true, trending: false, sold: 134, freeDelivery: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p17", name: "Georgette Floral Print Gown - Garden Party Collection",
    price: 9800, originalPrice: 14000, category: "Gown",
    description: "Light and breezy georgette floral print gown perfect for garden parties and cocktail events. Features a flattering empire waist.",
    image: `${IMG}/photo-1518611012118-696072aa579a?w=400`, rating: 4.5, reviewCount: 112, inStock: true, trending: false, sold: 234, freeDelivery: true,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "p18", name: "Indian Banarasi Silk Suit Set - Gold & Maroon",
    price: 11000, originalPrice: 16000, category: "Indian Party Dress",
    description: "Premium Banarasi silk three-piece suit set with gold zari work on maroon base. Includes kurta, palazzo, and dupatta.",
    image: `${IMG}/photo-1596394516093-501ba68a0ba6?w=400`, rating: 4.6, reviewCount: 143, inStock: true, trending: true, sold: 312, freeDelivery: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p19", name: "Bengali Couple Pooja Set - Traditional Durga Puja Collection",
    price: 15000, originalPrice: 21000, category: "Bengali Couple Set",
    description: "Special Durga Puja collection couple set in traditional red and white with dhaak print motifs and elegant draping style.",
    image: `${IMG}/photo-1595950653106-6c9ebd614d3a?w=400`, rating: 4.7, reviewCount: 98, inStock: true, trending: false, sold: 187, freeDelivery: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p20", name: "French Rose Gold Skincare Mini Travel Kit",
    price: 2200, originalPrice: 3500, category: "Imported Skincare Products",
    description: "Travel-size French skincare kit with rose gold packaging. Includes cleanser, moisturizer, SPF, and lip balm. Perfect for on-the-go skincare.",
    image: `${IMG}/photo-1556228578-0d85b1a4d571?w=400`, rating: 4.4, reviewCount: 178, inStock: true, trending: false, sold: 567, freeDelivery: false,
    sizes: ["One Size"],
  },
  {
    id: "p21", name: "Polki Diamond Look-Alike Necklace Set - Bridal Edition",
    price: 6800, originalPrice: 9500, category: "Jewellery & Trending Accessories",
    description: "Stunning polki diamond look-alike bridal necklace set with matching maang tikka and earrings. Premium gold plating.",
    image: `${IMG}/photo-1515562141589-67f0d569b18e?w=400`, rating: 4.8, reviewCount: 167, inStock: true, trending: true, sold: 345, freeDelivery: true,
    sizes: ["One Size"],
  },
  {
    id: "p22", name: "Tussar Silk Lehenga with Bandhani Print",
    price: 19000, originalPrice: 27000, category: "Lehenga",
    description: "Authentic Tussar silk lehenga featuring traditional Bandhani tie-dye print with hand-embroidered borders and mirror work blouse.",
    image: `${IMG}/photo-1583391733956-6c78276477e2?w=400`, rating: 4.6, reviewCount: 112, inStock: true, trending: false, sold: 201, freeDelivery: true,
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "p23", name: "Luxury Moroccan Argan Oil Hair Treatment Set",
    price: 3800, originalPrice: 5200, category: "Imported Skincare Products",
    description: "Premium Moroccan argan oil hair treatment set including shampoo, conditioner, and deep conditioning mask for silky smooth hair.",
    image: `${IMG}/photo-1570194065650-d99fb4b38b17?w=400`, rating: 4.7, reviewCount: 203, inStock: true, trending: false, sold: 489, freeDelivery: true,
    sizes: ["One Size"],
  },
  {
    id: "p24", name: "Bengali Family Festive Saree Combo - 2 Premium Sarees",
    price: 8500, originalPrice: 12000, category: "Bengali Family Combo",
    description: "Two premium sarees combo pack: one silk and one cotton, both featuring traditional Bengali motifs. Perfect for family gifting.",
    image: `${IMG}/photo-1610030469983-98e550d6193c?w=400`, rating: 4.5, reviewCount: 134, inStock: true, trending: false, sold: 345, freeDelivery: true,
    sizes: ["Free Size"],
  },
];

export const HERO_BANNERS = [
  {
    id: 1, title: "Wedding Season Collection", subtitle: "SPECIAL OFFER",
    description: "Discover our exclusive bridal wear collection with up to 30% off on premium handcrafted outfits.",
    cta: "Shop Bridal", image: `${IMG}/photo-1594631252845-29fc4cc8cde9?w=1200`,
  },
  {
    id: 2, title: "Luxury Pakistani Suits", subtitle: "NEW ARRIVAL",
    description: "Imported directly from Lahore. Premium embroidered lawn and chiffon collections now available.",
    cta: "Explore Now", image: `${IMG}/photo-1612336307429-8a898d10e223?w=1200`,
  },
  {
    id: 3, title: "Eid Special Festive Sale", subtitle: "UP TO 40% OFF",
    description: "Celebrate with our curated festive collection. Sarees, lehengas, and gowns at unbeatable prices.",
    cta: "View Deals", image: `${IMG}/photo-1583391733956-6c78276477e2?w=1200`,
  },
];

export const SIDE_BANNERS = [
  { id: 1, title: "Bridal Jewellery", subtitle: "Starting ৳2,800", image: `${IMG}/photo-1515562141589-67f0d569b18e?w=400`, color: "#F85606" },
  { id: 2, title: "Skincare Deals", subtitle: "Up to 35% Off", image: `${IMG}/photo-1556228578-0d85b1a4d571?w=400`, color: "#00B14F" },
];

export const TESTIMONIALS = [
  { name: "Fatima Rahman", rating: 5, comment: "Absolutely stunning bridal lehenga! The quality exceeded my expectations. Thank you Afsheen!", location: "Dhaka", date: "2024-12-15" },
  { name: "Nusrat Jahan", rating: 5, comment: "Best online shopping experience for ethnic wear. Fast delivery and beautiful packaging.", location: "Chittagong", date: "2024-11-20" },
  { name: "Sabrina Akter", rating: 4, comment: "Love the Bengali couple set! Perfect for Pooja. Will order again.", location: "Sylhet", date: "2024-10-08" },
  { name: "Mehjabin Chowdhury", rating: 5, comment: "The Pakistani lawn suits are authentic and gorgeous. Highly recommended!", location: "Rajshahi", date: "2024-09-25" },
  { name: "Tasnim Ahmed", rating: 5, comment: "Ordered the Kundan necklace set for my wedding. It was absolutely beautiful!", location: "Khulna", date: "2024-08-12" },
  { name: "Raisa Hossain", rating: 4, comment: "Great quality skincare products. The Korean set made my skin glow!", location: "Dhaka", date: "2024-07-30" },
];

export const FAQS = [
  { q: "How long does delivery take?", a: "Standard delivery within Dhaka takes 2-3 business days. Outside Dhaka, it takes 3-5 business days. Express delivery is available for Dhaka at an additional charge." },
  { q: "Do you offer Cash on Delivery (COD)?", a: "Yes! We offer Cash on Delivery across Bangladesh. You can also pay via bKash, Nagad, Visa, MasterCard, or Bank Transfer." },
  { q: "What is your return/exchange policy?", a: "We offer a 7-day exchange policy for unused items in original packaging. Bridal outfits have a 3-day inspection period. Contact our support to initiate." },
  { q: "Are the products authentic?", a: "Absolutely! Every product at Afsheen is verified for authenticity. We source directly from designers and authorized distributors." },
  { q: "How can I track my order?", a: "Once your order is shipped, you'll receive a tracking link via SMS and email. You can also track from your account dashboard under 'My Orders'." },
  { q: "Do you offer custom sizing?", a: "Yes, we offer custom sizing for Bridal Outfits and select Lehengas. Please contact us with your measurements for a custom quote." },
];

export const STORE_LOCATIONS = [
  { name: "Afsheen Flagship Store", address: "12/A, Dhanmondi R/A, Road 27, Dhaka 1205", hours: "Sat-Thu: 10AM - 9PM, Fri: 3PM - 9PM", phone: "+880 1712-345678" },
  { name: "Afsheen Banani Outlet", address: "45, Banani Road 11, Dhaka 1213", hours: "Sat-Thu: 11AM - 9PM, Fri: 4PM - 9PM", phone: "+880 1987-654321" },
  { name: "Afsheen Chittagong Store", address: "22, GEC Circle, Chittagong 4000", hours: "Sat-Thu: 10AM - 8PM, Fri: 4PM - 8PM", phone: "+880 1812-345678" },
];

export const DEMO_USERS = [
  { id: "admin1", name: "Admin Sheikh", email: "admin@afsheen.com", role: "admin", phone: "+880 1712-345678" },
  { id: "mod1", name: "Moderator Rahim", email: "mod@afsheen.com", role: "moderator", phone: "+880 1987-654321" },
  { id: "cust1", name: "Customer Fatima", email: "customer@afsheen.com", role: "customer", phone: "+880 1812-345678" },
];

export const COUPONS = [
  { code: "GOLDEN15", discount: 15, type: "percentage", minPurchase: 0, description: "15% off on all orders" },
  { code: "WELCOME10", discount: 10, type: "percentage", minPurchase: 0, description: "10% off for new customers" },
  { code: "BRIDAL5000", discount: 5000, type: "fixed", minPurchase: 15000, description: "৳5,000 off on bridal orders above ৳15,000" },
  { code: "FESTIVE20", discount: 20, type: "percentage", minPurchase: 0, description: "20% off festive collection" },
];

export const PAYMENT_METHODS = [
  { id: "bkash", name: "bKash", icon: "📱", type: "mobile" },
  { id: "nagad", name: "Nagad", icon: "💳", type: "mobile" },
  { id: "visa", name: "Visa", icon: "💳", type: "card" },
  { id: "mastercard", name: "MasterCard", icon: "💳", type: "card" },
  { id: "bank", name: "Bank Transfer", icon: "🏦", type: "bank" },
  { id: "cod", name: "Cash on Delivery", icon: "💵", type: "cod" },
];

export const ORDER_STATUSES = [
  { id: "pending", label: "Pending", color: "amber" },
  { id: "confirmed", label: "Confirmed", color: "blue" },
  { id: "processing", label: "Processing", color: "indigo" },
  { id: "shipped", label: "Shipped", color: "purple" },
  { id: "delivered", label: "Delivered", color: "emerald" },
  { id: "cancelled", label: "Cancelled", color: "red" },
];

export const PRODUCTS = INITIAL_PRODUCTS;
