# 🚀 Jennifer's Pokédex Roadmap

This document tracks planned platform upgrades, backend architecture goals, security improvements, and future feature expansion.

---

# Phase 5: Guest Mode Foundation

## Goal
Allow recruiters and users to fully explore the platform without requiring authentication while still supporting personalized experiences for logged-in users.

---

## Guest User Capabilities

Guest users can:

- browse Pokémon
- search Pokémon
- use analyzer systems
- compare Pokémon
- use light/dark mode
- experience all UI interactions
- save favorites locally using localStorage

---

## Logged-In User Capabilities

Authenticated users can:

- save favorites to their account
- access persistent data across devices
- build Pokémon teams
- save battle notes
- access trainer dashboard
- manage personalized collections

---

# Phase 6: Authentication Backend

## Planned Features

- user registration
- secure login
- bcrypt password hashing
- JWT authentication
- protected API routes
- auth middleware
- environment variable protection

---

# Phase 7: Authentication Frontend

## Planned Features

- login page
- signup page
- logout functionality
- authentication context
- protected frontend routes
- guest/demo mode handling

---

# Phase 8: User-Owned Favorites

## Planned Features

- connect favorites to user accounts
- persistent PostgreSQL storage
- localStorage fallback for guests
- synced favorites system

---

# Phase 9: Platform Expansion

## Planned Features

- Pokémon team builder
- trainer dashboard
- saved battle history
- personal Pokémon notes
- advanced analyzer systems

---

# Phase 10: Security & Production Hardening

## Planned Features

- rate limiting
- Helmet security middleware
- stricter CORS configuration
- request validation
- JWT expiration handling
- protected backend ownership checks
- production environment hardening