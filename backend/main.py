from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import random
from config import db

app = FastAPI(title="Afsheen by Sheikh API")

# CORS Middleware Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------------------
# Pydantic Schemas / Models
# ------------------------------------------------------------------------------

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


# ------------------------------------------------------------------------------
# STANDARD CRUD ENDPOINTS (For Automarker PR Diff Detection)
# ------------------------------------------------------------------------------

# 1. CREATE (POST)
@app.post("/products", status_code=201)
def create_product(product: ProductModel):
    ref = db.collection("products")
    doc_ref = ref.add(product.model_dump())
    return {"id": doc_ref[1].id, "message": "Product created successfully"}


# 2. READ ALL & FILTER (GET)
@app.get("/products")
def get_all_products(category: Optional[str] = None):
    ref = db.collection("products")
    docs = ref.stream()
    products = []
    for doc in docs:
        p = doc.to_dict()
        p["id"] = doc.id
        if category and p.get("category") != category:
            continue
        products.append(p)
    return products


# 2. READ SINGLE (GET)
@app.get("/products/{product_id}")
def get_single_product(product_id: str):
    doc = db.collection("products").document(product_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Product not found")
    product = doc.to_dict()
    product["id"] = doc.id
    return product


# 3. UPDATE (PUT)
@app.put("/products/{product_id}")
def update_product_by_id(product_id: str, product: ProductModel):
    ref = db.collection("products").document(product_id)
    if not ref.get().exists:
        raise HTTPException(status_code=404, detail="Product not found")
    ref.update(product.model_dump())
    return {"message": "Product updated successfully"}


# 4. DELETE (DELETE)
@app.delete("/products/{product_id}")
def delete_product_by_id(product_id: str):
    ref = db.collection("products").document(product_id)
    if not ref.get().exists:
        raise HTTPException(status_code=404, detail="Product not found")
    ref.delete()
    return {"message": "Product deleted successfully"}


# ------------------------------------------------------------------------------
# FRONTEND API ENDPOINTS (/api/...)
# ------------------------------------------------------------------------------

@app.get("/api/products")
def get_products_api(category: Optional[str] = None):
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
def get_product_api(product_id: str):
    doc = db.collection("products").document(product_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Product not found")
    product = doc.to_dict()
    product["id"] = doc.id
    return {"product": product}


@app.post("/api/products")
def create_product_api(product: ProductModel):
    ref = db.collection("products")
    doc_ref = ref.add(product.model_dump())
    return {"id": doc_ref[1].id, "message": "Product created"}


@app.put("/api/products/{product_id}")
def update_product_api(product_id: str, product: ProductModel):
    ref = db.collection("products").document(product_id)
    if not ref.get().exists:
        raise HTTPException(status_code=404, detail="Product not found")
    ref.update(product.model_dump())
    return {"message": "Product updated"}


@app.delete("/api/products/{product_id}")
def delete_product_api(product_id: str):
    ref = db.collection("products").document(product_id)
    if not ref.get().exists:
        raise HTTPException(status_code=404, detail="Product not found")
    ref.delete()
    return {"message": "Product deleted"}


# ------------------------------------------------------------------------------
# ORDERS, REVIEWS, USERS, CONTACT & SEED
# ------------------------------------------------------------------------------

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
            "description": "Breathtaking original hand-loomed Jamdani saree with intricate gold zari motifs on pure cotton.",
            "price": 24500,
            "stock": 12,
            "image": "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600",
            "sizes": ["One Size"],
            "rating": 4.9,
            "reviewsCount": 14,
            "isNewArrival": True,
            "isBestSeller": True,
        }
    ]

    for p in products:
        products_ref.document(p["id"]).set(p)

    return {"message": "Data seeded successfully"}
