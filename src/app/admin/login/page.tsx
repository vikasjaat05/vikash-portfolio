"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Login failed.");
        return;
      }

      router.push(data.redirectTo ?? "/");
      router.refresh();
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          borderRadius: 20,
          padding: 40,
          width: "100%",
          maxWidth: 360,
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Team Login</h1>
        <p style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>
          Enter your PIN — admin or team member.
        </p>

        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
          maxLength={20}
          style={{
            width: "100%",
            fontSize: 20,
            letterSpacing: 4,
            textAlign: "center",
            padding: "14px 12px",
            borderRadius: 12,
            border: "1px solid #ddd",
            marginBottom: 16,
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p style={{ color: "#e10600", fontSize: 13, marginBottom: 16 }} role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !pin}
          style={{
            width: "100%",
            padding: "14px 12px",
            borderRadius: 999,
            border: "none",
            background: "#0a0a0a",
            color: "white",
            fontWeight: 600,
            cursor: submitting ? "wait" : "pointer",
            opacity: submitting || !pin ? 0.6 : 1,
          }}
        >
          {submitting ? "Checking..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
