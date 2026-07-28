"""
Firebase configuration with graceful local development fallback.

How it works:
  - If FIREBASE_CREDENTIALS_PATH points to a valid serviceAccountKey.json,
    it connects to the real Firebase Firestore.
  - If FIREBASE_EMULATED=1 is set, it connects to the Firebase Emulator
    (requires: firebase emulators:start --only firestore).
  - Otherwise, it falls back to an in-memory mock database so the backend
    starts and works for local development with zero Firebase setup.
"""

import os
import uuid
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

db = None
_use_fallback = False

FIREBASE_EMULATED = os.getenv("FIREBASE_EMULATED", "0") == "1"
CREDENTIALS_PATH = os.getenv("FIREBASE_CREDENTIALS_PATH", "./serviceAccountKey.json")

# --- Path 1: Real Firebase or Emulator ---
if FIREBASE_EMULATED or os.path.exists(CREDENTIALS_PATH):
    import firebase_admin
    from firebase_admin import credentials, firestore

    if FIREBASE_EMULATED:
        os.environ.setdefault("FIRESTORE_EMULATOR_HOST", "127.0.0.1:8080")
        firebase_admin.initialize_app()
        print("[config] Connected to Firebase Emulator on 127.0.0.1:8080")
    else:
        cred = credentials.Certificate(CREDENTIALS_PATH)
        firebase_admin.initialize_app(cred)
        print(f"[config] Connected to Firebase with credentials from {CREDENTIALS_PATH}")

    db = firestore.client()

# --- Path 2: In-memory fallback (no Firebase needed) ---
else:
    _use_fallback = True
    print("[config] No Firebase credentials found — using in-memory database.")
    print("[config] Data will reset when the server restarts.")
    print("[config] To use real Firebase, see README.md instructions.\n")

    # ------------------------------------------------------------------
    # Minimal in-memory implementation that mirrors the Firestore API
    # surface used by main.py so every endpoint works unchanged.
    # ------------------------------------------------------------------

    class _DocSnapshot:
        def __init__(self, doc_id, data, exists=True):
            self.id = doc_id
            self._data = data or {}
            self.exists = exists

        def to_dict(self):
            return dict(self._data)

    class _DocRef:
        def __init__(self, collection, doc_id, store):
            self._collection = collection
            self.id = doc_id
            self._store = store

        def _key(self):
            return (self._collection, self.id)

        def get(self):
            data = self._store.get(self._key())
            if data is None:
                return _DocSnapshot(self.id, None, exists=False)
            return _DocSnapshot(self.id, data, exists=True)

        def set(self, data):
            self._store[self._key()] = dict(data)

        def update(self, data):
            existing = self._store.get(self._key())
            if existing is None:
                existing = {}
            existing.update(data)
            self._store[self._key()] = existing

        def delete(self):
            self._store.pop(self._key(), None)

    class _Query:
        def __init__(self, collection, store, filters=None):
            self._collection = collection
            self._store = store
            self._filters = filters or []

        def where(self, field, op, value):
            new_filters = self._filters + [(field, op, value)]
            return _Query(self._collection, self._store, new_filters)

        def stream(self):
            prefix = (self._collection,)
            for (coll, doc_id), data in self._store.items():
                if coll != self._collection:
                    continue
                match = True
                for field, op, value in self._filters:
                    field_val = data.get(field)
                    if op == "==" and field_val != value:
                        match = False
                        break
                    elif op == "!=" and field_val == value:
                        match = False
                        break
                    elif op == ">" and (field_val is None or field_val <= value):
                        match = False
                        break
                    elif op == ">=" and (field_val is None or field_val < value):
                        match = False
                        break
                    elif op == "<" and (field_val is None or field_val >= value):
                        match = False
                        break
                    elif op == "<=" and (field_val is None or field_val > value):
                        match = False
                        break
                if match:
                    yield _DocSnapshot(doc_id, data, exists=True)

    class _CollectionRef:
        def __init__(self, name, store):
            self._name = name
            self._store = store

        def document(self, doc_id=None):
            if doc_id is None:
                doc_id = str(uuid.uuid4())[:20]
            return _DocRef(self._name, doc_id, self._store)

        def add(self, data):
            doc_id = str(uuid.uuid4())[:20]
            ref = _DocRef(self._name, doc_id, self._store)
            ref.set(data)
            return (datetime.utcnow(), ref)

        def where(self, field, op, value):
            return _Query(self._name, self._store, [(field, op, value)])

        def stream(self):
            prefix = self._name
            for (coll, doc_id), data in self._store.items():
                if coll == prefix:
                    yield _DocSnapshot(doc_id, data, exists=True)

    class _FirestoreMock:
        def __init__(self):
            self._store = {}

        def collection(self, name):
            return _CollectionRef(name, self._store)

    db = _FirestoreMock()
