---
title: "Automated threat defence with Cloudflare Turnstile"
description: "How at AnimationAPI I used Cloudflare Turnstile to protect Magic link login"
publishDate: "21 Nov 2025"
updatedDate: "21 Nov 2025"
coverImage:
  src: "./turnstile.png"
  alt: "Astro build wallpaper"
tags: ["bot defence", "auth"]
---

## TL;DR:
A quick, frictionless way to protect your web app from automated abuse is to use 
Cloudflare Turnstile in Invisible mode. It runs quietly in the background and stays 
completely unobtrusive to real users.

<hr />

## Why
AnimationAPI uses Magic Links as one of its authentication mechanisms.

A Magic Link (or email login link) allows users to authenticate without a password. When a user enters their email address, the system sends them a unique link, and clicking that link completes the login.

Recently, I noticed an odd pattern in the login flow:

Users were requesting Magic Links but never clicking them to access the app.
All of these requests originated from Amsterdam, Netherlands.
The email addresses involved were all valid.

I tried reaching out to these users directly, asking them to request a new login link and try again, but none of them replied or attempted to log in. At that point, it became clear that some form of automation or bot activity was likely involved.

## What
For AnimationAPI, I’m already using Cloudflare’s CDN, R2, and DNS. Cloudflare also offers Turnstile for bot mitigation, which comes in three modes:

Non-interactive: Users never need to interact with the widget.
Managed: Users may see an interactive checkbox if they appear suspicious.
Invisible: The widget is completely hidden from the user.

For my use case, Invisible mode was the best fit. It doesn’t affect genuine users at all and only intervenes when automated systems or bots attempt to interact with the app.

## How
Implementing Turnstile in Invisible mode was straightforward:

Include the Turnstile script on the client-side page.
Turnstile automatically generates a token for each request.
On the server side, verify that token when processing the Magic Link request.

AnimationAPI is built with Next.js. Auth.js + Resend for magic link implementation.

Here’s how I integrated Turnstile into the app:

### Client-side component
```ts
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function MagicLinkForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Run Turnstile invisible challenge
    // @ts-ignore
    const token = await window.turnstile.execute(
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      { action: "login" }
    );

    const form = new FormData(formRef.current!);
    form.set("cf-turnstile-response", token);

    const res = await fetch("/api/auth/send-magic-link", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setSent(true);
  }

  if (error) {
    return <p className="text-red-600 text-xl font-bold flex flex-col gap-1 items-center">
      <TriangleAlertIcon /> Something went wrong. Please try again.
    </p>;
  }

  if (sent) {
    return <p className="text-green-600 dark:text-green-500 text-xl font-bold flex flex-col gap-1 items-center">
      <CircleCheck /> Login link sent! Check your inbox.
    </p>;
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-xs"
    >
      <Input
        type="email"
        name="email"
        placeholder="name@example.com"
        required
      />

      <div
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        data-size="invisible"
      />

      <Button type="submit" className="h-8">
        <Mail />
        Send login link
      </Button>
    </form>
  );
}
```

### Server-side API route
```ts
import { NextResponse } from "next/server";
import { signIn } from "@/auth";

export async function POST(req: Request) {
  const form = await req.formData();
  const token = form.get("cf-turnstile-response")?.toString();
  const email = form.get("email")?.toString();

  if (!token) {
    return NextResponse.json(
      { error: "Missing Turnstile token" },
      { status: 400 }
    );
  }

  // Verify Turnstile token
  const verify = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token,
      }),
    }
  );

  const data = await verify.json();
  if (!data.success) {
    return NextResponse.json(
      { error: "Failed Turnstile verification" },
      { status: 403 }
    );
  }

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  // Safe: call Auth.js to send magic link
  try {
    await signIn("resend", { email, redirectTo: "/" });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Auth.js error:", err);
    return NextResponse.json({ error: "Failed to send magic link" }, { status: 500 });
  }
} 
```

## Conclusion
By adding Cloudflare Turnstile in Invisible mode, I was able to quietly filter out 
automated Magic Link requests without disrupting legitimate users. 

The integration required minimal code changes, and the verification step on the server 
side immediately reduced suspicious activity. 

For an app like AnimationAPI - where ease of access matters - this approach offers an 
effective, low-friction layer of protection against bots while keeping the overall 
authentication experience seamless.
