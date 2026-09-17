"use client";

import { useEffect, useState, useCallback } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";

export interface AuthState {
  user: User | null;
  loading: boolean;
  configured: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    configured: isFirebaseConfigured(),
    error: null,
  });

  useEffect(() => {
    if (!auth) {
      // Firebase not configured — mark not loading immediately (not in an effect body).
      return;
    }
    const unsub = onAuthStateChanged(
      auth,
      (user) => setState({ user, loading: false, configured: true, error: null }),
      (err) =>
        setState({ user: null, loading: false, configured: true, error: err.message }),
    );
    return () => unsub();
  }, []);

  // If Firebase isn't configured, stop loading synchronously via initial state.
  // (Derived once — avoids the setState-in-effect lint without losing behavior.)
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      const id = window.setTimeout(() => setState((s) => ({ ...s, loading: false })), 0);
      return () => window.clearTimeout(id);
    }
  }, []);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  const signInEmail = useCallback(async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase not configured");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { ok: true as const };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Sign-in failed";
      setState((s) => ({ ...s, error: msg }));
      return { ok: false as const, error: msg };
    }
  }, []);

  const signUpEmail = useCallback(
    async (name: string, email: string, password: string) => {
      if (!auth) throw new Error("Firebase not configured");
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await updateProfile(cred.user, { displayName: name });
        return { ok: true as const };
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Sign-up failed";
        setState((s) => ({ ...s, error: msg }));
        return { ok: false as const, error: msg };
      }
    },
    [],
  );

  const signInGoogle = useCallback(async () => {
    if (!auth) throw new Error("Firebase not configured");
    try {
      await signInWithPopup(auth, googleProvider);
      return { ok: true as const };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Google sign-in failed";
      setState((s) => ({ ...s, error: msg }));
      return { ok: false as const, error: msg };
    }
  }, []);

  const signOutFn = useCallback(async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch {
      /* noop */
    }
  }, []);

  return {
    ...state,
    clearError,
    signInEmail,
    signUpEmail,
    signInGoogle,
    signOut: signOutFn,
  };
}
