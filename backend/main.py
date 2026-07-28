from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import random
from config import db

app = FastAPI(title="Afsheen by Sheikh API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProductModel(BaseModel):
    name: str
    category: str
    description: str
    price: float
    stock: int
    image: str = ""
    sizes: List[str] = ["One Size"]
    rating: float = 4.5
    reviewsCount: int = 0
    isNewArrival: bool = False
    isBestSeller: bool = False


class CartItem(BaseModel):
    productId: str
    quantity: int = 1
    selectedSize: str = "One Size"


class OrderModel(BaseModel):
    customerName: str
    customerEmail: str
    items: List[CartItem]
    total: float
    deliveryAddress: str
    deliveryPhone: str
    giftWrapped: bool = False
    couponCode: str = ""


class ReviewModel(BaseModel):
    productId: str
    customerName: str
    rating: int
    comment: str


class UserModel(BaseModel):
    name: str
    email: str
    phone: str = ""
    address: str = ""
    password: str
    role: str = "customer"


class ContactModel(BaseModel):
    name: str
    email: str
    phone: str
    subject: str
    message: str


@app.get("/api/products")
def get_products(category: Optional[str] = None):
    ref = db.collection("products")
    docs = ref.stream()
    products = []
    for doc in docs:
        p = doc.to_dict()
        p["id"] = doc.id
        if category and p.get("category") != category:
            continue
        products.append(p)
    return {"products": products}


@app.get("/api/products/{product_id}")
def get_product(product_id: str):
    doc = db.collection("products").document(product_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Product not found")
    product = doc.to_dict()
    product["id"] = doc.id
    return {"product": product}


@app.post("/api/products")
def create_product(product: ProductModel):
    ref = db.collection("products")
    doc_ref = ref.add(product.model_dump())
    return {"id": doc_ref[1].id, "message": "Product created"}


@app.put("/api/products/{product_id}")
def update_product(product_id: str, product: ProductModel):
    ref = db.collection("products").document(product_id)
    if not ref.get().exists:
        raise HTTPException(status_code=404, detail="Product not found")
    ref.update(product.model_dump())
    return {"message": "Product updated"}


@app.delete("/api/products/{product_id}")
def delete_product(product_id: str):
    ref = db.collection("products").document(product_id)
    if not ref.get().exists:
        raise HTTPException(status_code=404, detail="Product not found")
    ref.delete()
    return {"message": "Product deleted"}


@app.post("/api/orders")
def create_order(order: OrderModel):
    order_id = f"ORD-{random.randint(10000, 99999)}"
    order_data = {
        "id": order_id,
        "customerName": order.customerName,
        "customerEmail": order.customerEmail,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "items": [item.model_dump() for item in order.items],
        "total": order.total,
        "status": "pending",
        "deliveryAddress": order.deliveryAddress,
        "deliveryPhone": order.deliveryPhone,
        "giftWrapped": order.giftWrapped,
    }
    db.collection("orders").document(order_id).set(order_data)
    return {"order": order_data}


@app.get("/api/orders")
def get_orders(email: Optional[str] = None):
    ref = db.collection("orders")
    if email:
        ref = ref.where("customerEmail", "==", email)
    docs = ref.stream()
    orders = []
    for doc in docs:
        o = doc.to_dict()
        orders.append(o)
    return {"orders": orders}


@app.put("/api/orders/{order_id}/status")
def update_order_status(order_id: str, status: str = "pending"):
    ref = db.collection("orders").document(order_id)
    if not ref.get().exists:
        raise HTTPException(status_code=404, detail="Order not found")
    ref.update({"status": status})
    return {"message": "Order status updated"}


@app.get("/api/reviews/{product_id}")
def get_reviews(product_id: str):
    docs = db.collection("reviews").where("productId", "==", product_id).stream()
    reviews = []
    for doc in docs:
        r = doc.to_dict()
        r["id"] = doc.id
        reviews.append(r)
    return {"reviews": reviews}


@app.post("/api/reviews")
def create_review(review: ReviewModel):
    ref = db.collection("reviews")
    doc_ref = ref.add(review.model_dump())
    return {"id": doc_ref[1].id, "message": "Review created"}


@app.post("/api/auth/register")
def register_user(user: UserModel):
    ref = db.collection("users")
    existing = ref.where("email", "==", user.email).stream()
    for _ in existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    doc_ref = ref.add(user.model_dump())
    return {"id": doc_ref[1].id, "message": "User registered"}


@app.post("/api/auth/login")
def login_user(email: str, password: str):
    docs = db.collection("users").where("email", "==", email).stream()
    for doc in docs:
        user = doc.to_dict()
        if user.get("password") == password:
            user["id"] = doc.id
            user.pop("password", None)
            return {"user": user}
    raise HTTPException(status_code=401, detail="Invalid credentials")


@app.get("/api/users/{email}")
def get_user(email: str):
    docs = db.collection("users").where("email", "==", email).stream()
    for doc in docs:
        user = doc.to_dict()
        user["id"] = doc.id
        user.pop("password", None)
        return {"user": user}
    raise HTTPException(status_code=404, detail="User not found")


@app.put("/api/users/{email}")
def update_user(email: str, user: UserModel):
    docs = db.collection("users").where("email", "==", email).stream()
    for doc in docs:
        db.collection("users").document(doc.id).update(user.model_dump())
        return {"message": "User updated"}
    raise HTTPException(status_code=404, detail="User not found")


@app.post("/api/contact")
def contact_form(contact: ContactModel):
    db.collection("contacts").add(contact.model_dump())
    return {"message": "Message received"}


@app.get("/api/seed")
def seed_data():
    products_ref = db.collection("products")
    docs = list(products_ref.stream())
    if len(docs) > 0:
        return {"message": "Data already seeded"}

    products = [
        {
            "id": "p1",
            "name": "Dhakai Jamdani Heritage Saree",
            "category": "Clothing",
            "description": "Breathtaking original hand-loomed Jamdani saree with intricate gold zari motifs on pure cotton. A timeless heirloom from the looms of Dhaka.",
            "price": 24500,
            "stock": 12,
            "image": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600",
            "sizes": ["One Size"],
            "rating": 4.9,
            "reviewsCount": 14,
            "isNewArrival": True,
            "isBestSeller": True,
        },
        {
            "id": "p2",
            "name": "Mirpur Bridal Banarasi Katan",
            "category": "Clothing",
            "description": "Luxurious bridal Banarasi Katan saree with rich gold weaving. Perfect for traditional Bangladeshi weddings.",
            "price": 38000,
            "stock": 8,
            "image": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600",
            "sizes": ["One Size"],
            "rating": 5.0,
            "reviewsCount": 9,
            "isNewArrival": False,
            "isBestSeller": True,
        },
        {
            "id": "p3",
            "name": "Ethereal Rajshahi Silk Saree",
            "category": "Clothing",
            "description": "Ethereal Rajshahi silk saree with delicate pastel hues and hand-finished borders for a refined, graceful appearance.",
            "price": 18500,
            "stock": 15,
            "image": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600",
            "sizes": ["One Size"],
            "rating": 4.8,
            "reviewsCount": 22,
            "isNewArrival": True,
            "isBestSeller": False,
        },
        {
            "id": "p4",
            "name": "Sylhet Manipuri Handloom Saree",
            "category": "Clothing",
            "description": "Authentic Manipuri handloom saree from Sylhet with vibrant tribal-inspired weaving patterns.",
            "price": 8500,
            "stock": 5,
            "image": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
            "sizes": ["One Size"],
            "rating": 4.9,
            "reviewsCount": 7,
            "isNewArrival": False,
            "isBestSeller": False,
        },
        {
            "id": "p5",
            "name": "Traditional Shonar Jhumka",
            "category": "Ornaments",
            "description": "Traditional 22K gold-plated jhumka earrings crafted by legendary Tatibazar goldsmiths. A masterpiece of Bengali filigree art.",
            "price": 9500,
            "stock": 20,
            "image": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
            "sizes": ["One Size"],
            "rating": 4.9,
            "reviewsCount": 18,
            "isNewArrival": False,
            "isBestSeller": True,
        },
        {
            "id": "p6",
            "name": "Royal Flora Pastel Crystal Bridal Set",
            "category": "Ornaments",
            "description": "Exquisite crystal bridal jewelry set with pastel enamel work and 22K gold plating. Designed for the modern Bangladeshi bride.",
            "price": 35000,
            "stock": 3,
            "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
            "sizes": ["One Size"],
            "rating": 5.0,
            "reviewsCount": 14,
            "isNewArrival": True,
            "isBestSeller": True,
        },
        {
            "id": "p7",
            "name": "Filigree Bala Bangle Pair",
            "category": "Ornaments",
            "description": "Handcrafted filigree bangles with intricate goldwork. Perfect for festive occasions and traditional ceremonies.",
            "price": 12500,
            "stock": 18,
            "image": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
            "sizes": ["One Size"],
            "rating": 4.7,
            "reviewsCount": 11,
            "isNewArrival": False,
            "isBestSeller": False,
        },
        {
            "id": "p8",
            "name": "Sundarbans Honey & Saffron Glow",
            "category": "Skincare",
            "description": "Premium raw honey and Kashmiri saffron face oil for radiant, golden-glow skin. 100% organic and cruelty-free.",
            "price": 3500,
            "stock": 25,
            "image": "https://images.unsplash.com/photo-1608248597481-496100c80836?w=600",
            "sizes": ["One Size"],
            "rating": 4.8,
            "reviewsCount": 34,
            "isNewArrival": True,
            "isBestSeller": True,
        },
        {
            "id": "p9",
            "name": "Sandalwood & Turmeric Clay Mask",
            "category": "Skincare",
            "description": "Purifying clay mask with sandalwood and organic turmeric. Brightens skin and reduces blemishes naturally.",
            "price": 2200,
            "stock": 30,
            "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600",
            "sizes": ["One Size"],
            "rating": 4.6,
            "reviewsCount": 16,
            "isNewArrival": False,
            "isBestSeller": False,
        },
        {
            "id": "p10",
            "name": "Savar Rose Golap Jol Mist",
            "category": "Skincare",
            "description": "Refreshing pure rose water facial mist from Savar. Hydrates and tones for a dewy, luminous complexion.",
            "price": 1500,
            "stock": 40,
            "image": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
            "sizes": ["One Size"],
            "rating": 4.7,
            "reviewsCount": 25,
            "isNewArrival": False,
            "isBestSeller": False,
        },
        {
            "id": "p11",
            "name": "Premium Korean Ginseng Glow Ampoule",
            "category": "Skincare",
            "description": "Authentic Korean ginseng ampoule for anti-aging and skin brightening. Premium glass-skin formulation.",
            "price": 4800,
            "stock": 15,
            "image": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600",
            "sizes": ["One Size"],
            "rating": 4.9,
            "reviewsCount": 28,
            "isNewArrival": True,
            "isBestSeller": False,
        },
        {
            "id": "p12",
            "name": "Royal Bengal Festive Couple Set",
            "category": "Clothing",
            "description": "Elegant matching festive couple set in royal yellow and green. Perfect for traditional Bengali celebrations.",
            "price": 16500,
            "stock": 6,
            "image": "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=600",
            "sizes": ["M", "L", "XL"],
            "rating": 4.9,
            "reviewsCount": 12,
            "isNewArrival": False,
            "isBestSeller": True,
        },
        {
            "id": "p13",
            "name": "Sultanate Royal Family Combo",
            "category": "Clothing",
            "description": "Opulent royal family combo set with regal embroidery and premium fabrics for grand family celebrations.",
            "price": 28000,
            "stock": 4,
            "image": "https://images.unsplash.com/photo-1609234656388-0ff363383899?w=600",
            "sizes": ["S", "M", "L", "XL"],
            "rating": 5.0,
            "reviewsCount": 3,
            "isNewArrival": True,
            "isBestSeller": False,
        },
        {
            "id": "p14",
            "name": "Karachi Embroidered Organza Suit",
            "category": "Clothing",
            "description": "Stunning embroidered organza suit with intricate threadwork and sequin embellishments.",
            "price": 12500,
            "stock": 10,
            "image": "https://images.unsplash.com/photo-1583391265517-35bbadd01209?w=600",
            "sizes": ["S", "M", "L", "XL"],
            "rating": 4.7,
            "reviewsCount": 15,
            "isNewArrival": False,
            "isBestSeller": False,
        },
        {
            "id": "p15",
            "name": "Royal Ivory Festive Lehenga Set",
            "category": "Clothing",
            "description": "Stunning ivory lehenga set with gold embroidery and flowing silhouette. Perfect for festive occasions.",
            "price": 18500,
            "stock": 9,
            "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
            "sizes": ["M", "L", "XL"],
            "rating": 4.9,
            "reviewsCount": 19,
            "isNewArrival": True,
            "isBestSeller": True,
        },
        {
            "id": "p16",
            "name": "Midnight Grace Satin Western Gown",
            "category": "Clothing",
            "description": "Elegant midnight blue satin western gown with a graceful silhouette. Modern elegance meets timeless design.",
            "price": 9800,
            "stock": 7,
            "image": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
            "sizes": ["S", "M", "L"],
            "rating": 4.6,
            "reviewsCount": 11,
            "isNewArrival": False,
            "isBestSeller": False,
        },
        {
            "id": "p17",
            "name": "Bangkok Herbal Brightening Peel Mask",
            "category": "Skincare",
            "description": "Herbal brightening peel mask imported from Bangkok. Gentle exfoliation for a fresh, glowing complexion.",
            "price": 2900,
            "stock": 22,
            "image": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600",
            "sizes": ["One Size"],
            "rating": 4.7,
            "reviewsCount": 14,
            "isNewArrival": False,
            "isBestSeller": False,
        },
        {
            "id": "p18",
            "name": "Manila Coco-Papaya Radiance Balm",
            "category": "Skincare",
            "description": "Nourishing coconut and papaya radiance balm for deep hydration and natural glow.",
            "price": 1800,
            "stock": 35,
            "image": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
            "sizes": ["One Size"],
            "rating": 4.8,
            "reviewsCount": 31,
            "isNewArrival": False,
            "isBestSeller": False,
        },
        {
            "id": "p19",
            "name": "Meenakari Chandbali Heritage Earrings",
            "category": "Ornaments",
            "description": "Stunning meenakari chandbali earrings with heritage enamel work and gold plating.",
            "price": 4500,
            "stock": 25,
            "image": "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600",
            "sizes": ["One Size"],
            "rating": 4.9,
            "reviewsCount": 15,
            "isNewArrival": True,
            "isBestSeller": False,
        },
        {
            "id": "p20",
            "name": "Nagano Pink Nipple Jelly with Collagen",
            "category": "Skincare",
            "description": "Premium Japanese nipple care jelly with collagen for soft, smooth skin. Gentle and effective formula.",
            "price": 1850,
            "stock": 25,
            "image": "https://images.unsplash.com/photo-1608248597481-496100c80836?w=600",
            "sizes": ["One Size"],
            "rating": 4.8,
            "reviewsCount": 19,
            "isNewArrival": True,
            "isBestSeller": True,
        },
        {
            "id": "p21",
            "name": "Atelier Pastel Floral Ivory Lehenga",
            "category": "Clothing",
            "description": "Exquisite pastel floral ivory lehenga crafted from raw silk with delicate hand-embroidered floral motifs.",
            "price": 32000,
            "stock": 5,
            "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
            "sizes": ["S", "M", "L"],
            "rating": 5.0,
            "reviewsCount": 12,
            "isNewArrival": True,
            "isBestSeller": True,
        },
        {
            "id": "p22",
            "name": "Royal Kundan Sita Har Bridal Set",
            "category": "Ornaments",
            "description": "Grand 22K gold plated Kundan bridal choker and multi-layered Sita Har long necklace set.",
            "price": 45000,
            "stock": 3,
            "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
            "sizes": ["One Size"],
            "rating": 5.0,
            "reviewsCount": 8,
            "isNewArrival": True,
            "isBestSeller": True,
        },
        {
            "id": "p23",
            "name": "Luna Crescent Quilted Ladies Bag",
            "category": "Ornaments",
            "description": "Luxurious crescent-shaped quilted ladies bag with gold chain strap and premium finish.",
            "price": 13500,
            "stock": 14,
            "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
            "sizes": ["One Size"],
            "rating": 4.9,
            "reviewsCount": 11,
            "isNewArrival": True,
            "isBestSeller": True,
        },
    ]

    for p in products:
        doc_id = p["id"]
        products_ref.document(doc_id).set(p)

    users_ref = db.collection("users")
    demo_users = [
        {"name": "Sheikh Afsheen", "email": "admin@afsheen.com", "phone": "+880 1819-888990", "address": "House 12, Road 79, Gulshan 2, Dhaka", "password": "admin123", "role": "admin"},
        {"name": "Ayesha Rahman", "email": "ayesha@example.com", "phone": "+880 1712-345678", "address": "House 5, Road 15, Dhanmondi, Dhaka", "password": "password123", "role": "customer"},
    ]
    for u in demo_users:
        users_ref.add(u)

    reviews_ref = db.collection("reviews")
    demo_reviews = [
        {"productId": "p1", "customerName": "Sabrina R.", "rating": 5, "comment": "Absolutely stunning Jamdani! The cotton and gold thread is so fine and authentic. Deeply satisfied!"},
        {"productId": "p1", "customerName": "Nabila H.", "rating": 5, "comment": "The fabric density and fine weaving of the Dhakai Jamdani Heritage Saree are breathtaking."},
        {"productId": "p5", "customerName": "Farhana S.", "rating": 5, "comment": "The pearls are gorgeous and the gold plating is very premium. Perfect for wedding functions!"},
        {"productId": "p8", "customerName": "Maria S.", "rating": 4, "comment": "This Sundarbans honey oil has changed my skin! It gives an amazing, natural golden glow."},
        {"productId": "p5", "customerName": "Nabila H.", "rating": 5, "comment": "I am absolutely stunned by the Shonar Jhumka earrings. Plated beautifully."},
        {"productId": "p1", "customerName": "Sabrina R.", "rating": 5, "comment": "The fabric density and fine weaving are breathtaking. Sheikh has captured pure Bengal royalty."},
    ]
    for r in demo_reviews:
        reviews_ref.add(r)

    return {"message": "Data seeded successfully"}

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)