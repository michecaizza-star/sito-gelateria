"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  NEWSLETTER_DISCOUNT_CODE,
  NEWSLETTER_DISCOUNT_RATE,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
} from "@/lib/site-content";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  flavor?: string;
  size?: string;
  price: number | null;
  quantity: number;
}

export interface ShippingInfo {
  nome: string;
  telefono: string;
  indirizzo: string;
  cap: string;
  citta: string;
  provincia: string;
}

const EMPTY_SHIPPING: ShippingInfo = {
  nome: "",
  telefono: "",
  indirizzo: "",
  cap: "",
  citta: "",
  provincia: "",
};

export function isShippingComplete(s: ShippingInfo) {
  return Boolean(s.nome.trim() && s.telefono.trim() && s.indirizzo.trim() && s.cap.trim() && s.citta.trim());
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  totalCount: number;
  hasUnknownPrice: boolean;
  subtotal: number | null;
  discountCode: string | null;
  discountAmount: number;
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;
  shippingCost: number | null;
  totalPrice: number | null;
  note: string;
  setNote: (note: string) => void;
  shipping: ShippingInfo;
  updateShipping: (partial: Partial<ShippingInfo>) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "mari-cart-v1";
const DISCOUNT_STORAGE_KEY = "mari-discount-v1";
const NOTE_STORAGE_KEY = "mari-note-v1";
const SHIPPING_STORAGE_KEY = "mari-shipping-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [shipping, setShipping] = useState<ShippingInfo>(EMPTY_SHIPPING);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage after mount — must run after
    // the server-rendered (empty-cart) first paint to avoid an SSR
    // hydration mismatch, so this can't be a lazy useState initializer.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
      const rawDiscount = window.localStorage.getItem(DISCOUNT_STORAGE_KEY);
      if (rawDiscount) setDiscountCode(rawDiscount);
      const rawNote = window.localStorage.getItem(NOTE_STORAGE_KEY);
      if (rawNote) setNote(rawNote);
      const rawShipping = window.localStorage.getItem(SHIPPING_STORAGE_KEY);
      if (rawShipping) setShipping({ ...EMPTY_SHIPPING, ...JSON.parse(rawShipping) });
    } catch {
      // ignore malformed/unavailable storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota/unavailable storage
    }
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (discountCode) window.localStorage.setItem(DISCOUNT_STORAGE_KEY, discountCode);
      else window.localStorage.removeItem(DISCOUNT_STORAGE_KEY);
    } catch {
      // ignore quota/unavailable storage
    }
  }, [discountCode, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (note) window.localStorage.setItem(NOTE_STORAGE_KEY, note);
      else window.localStorage.removeItem(NOTE_STORAGE_KEY);
    } catch {
      // ignore quota/unavailable storage
    }
  }, [note, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(SHIPPING_STORAGE_KEY, JSON.stringify(shipping));
    } catch {
      // ignore quota/unavailable storage
    }
  }, [shipping, hydrated]);

  const addItem = useCallback<CartContextValue["addItem"]>((item) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + (item.quantity ?? 1) }
            : p
        );
      }
      return [...prev, { ...item, quantity: item.quantity ?? 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setDiscountCode(null);
    setNote("");
  }, []);

  const applyDiscountCode = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized.length > 0 && normalized === NEWSLETTER_DISCOUNT_CODE.toUpperCase()) {
      setDiscountCode(normalized);
      return true;
    }
    return false;
  }, []);

  const removeDiscountCode = useCallback(() => setDiscountCode(null), []);

  const updateShipping = useCallback((partial: Partial<ShippingInfo>) => {
    setShipping((prev) => ({ ...prev, ...partial }));
  }, []);

  const totalCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );
  const hasUnknownPrice = useMemo(
    () => items.some((i) => i.price == null),
    [items]
  );
  const subtotal = useMemo(
    () =>
      hasUnknownPrice
        ? null
        : items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0),
    [items, hasUnknownPrice]
  );
  const discountAmount = useMemo(
    () => (subtotal != null && discountCode ? subtotal * NEWSLETTER_DISCOUNT_RATE : 0),
    [subtotal, discountCode]
  );
  const shippingCost = useMemo(() => {
    if (subtotal == null || items.length === 0) return null;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  }, [subtotal, items.length]);
  const totalPrice = useMemo(() => {
    if (subtotal == null) return null;
    return subtotal - discountAmount + (shippingCost ?? 0);
  }, [subtotal, discountAmount, shippingCost]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    totalCount,
    hasUnknownPrice,
    subtotal,
    discountCode,
    discountAmount,
    applyDiscountCode,
    removeDiscountCode,
    shippingCost,
    totalPrice,
    note,
    setNote,
    shipping,
    updateShipping,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
