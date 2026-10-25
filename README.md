# Kick-Zone --- Football Turf Website

A responsive website for **Kick-Zone**, an outdoor football turf in
Mirpur 12, Dhaka, Bangladesh. The site introduces the venue, presents
facilities and pricing, showcases turf photos, and guides visitors
through a demo booking flow.

**Live website:** https://kickzone-2sm.pages.dev/

> **Demo notice:** The current website describes booking availability
> and prices as illustrative. Submitting the booking flow does not
> reserve a real slot. Contact the venue to confirm current
> availability, facilities, and pricing.

------------------------------------------------------------------------

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Venue Information](#venue-information)
-   [Booking Flow](#booking-flow)
-   [Technology](#technology)
-   [Getting Started](#getting-started)
-   [Deployment](#deployment)
-   [Production Readiness](#production-readiness)
-   [Contact](#contact)

## Overview

Kick-Zone helps players and teams learn about the turf before arranging
a football session. The website brings the main information together in
one place:

-   Venue location and contact number
-   Session duration and illustrative day/night rates
-   Facility highlights
-   Photo gallery
-   A step-by-step booking interface

The site is currently presented as a demonstration website rather than a
live reservation system.

## Features

### Venue landing page

-   Football-focused hero section and calls to action
-   Introduction to the Kick-Zone venue
-   Clear links to booking, facilities, pricing, gallery, and contact
    sections

### Booking experience

-   Date selection with past dates disabled
-   Fixed **90-minute** session duration
-   Automatically calculated session end time
-   Visitor details, including name and phone number
-   Optional team, player, and notes fields
-   In-browser form validation
-   Demo booking review and reference

**Important:** The current flow does not check live availability,
persist a reservation, or guarantee a booking.

### Facilities

The website highlights the following facilities as illustrative
examples: - Artificial football turf - Floodlighting for evening
sessions - Changing and shower rooms

Confirm the actual amenities directly with the venue before visiting.

### Pricing

The website currently displays these illustrative prices for a 90-minute
session:

  Session                    Displayed price
  ------------------------ -----------------
  Day --- before 5:00 PM              ৳2,500
  Night --- from 5:00 PM              ৳4,000

These prices are for demonstration purposes and should be confirmed by
phone.

### Gallery and contact

-   Turf and match photography
-   Venue address
-   Click-to-call contact number
-   Links to social media and Google Maps

## Venue Information

  -----------------------------------------------------------------------
  Detail                              Information
  ----------------------------------- -----------------------------------
  Venue                               Kick-Zone

  Type                                Outdoor football turf

  Location                            Block-M, Plot-7, Eastern Housing
                                      Phase-2, Pallabi, Mirpur-12, Dhaka,
                                      Bangladesh

  Session duration                    90 minutes

  Phone                               01973-613818
  -----------------------------------------------------------------------

## Booking Flow

The website presents the following visitor journey:

1.  **Choose a date** in the booking calendar.
2.  **Select a 90-minute slot.**
3.  **Enter contact details** and any optional team information.
4.  **Review the session** and submit the demo form.

The final step is illustrative only. No real reservation is created.

## Technology

The website is hosted on **Cloudflare Pages** at the live URL above. The
source repository and package configuration were not available from the
public website review, so the exact frontend framework, dependencies,
and build commands should be confirmed from the project source before
documenting them here.

## Getting Started

Clone or download the project source code first. Then use the package
manager and scripts defined by the repository.

For a JavaScript project that uses `package.json`, a typical workflow
is:

``` bash
# Install dependencies using the package manager used by the project
npm install

# Start the local development server if a "dev" script exists
npm run dev

# Run the production build if a "build" script exists
npm run build
```

These are standard example commands, not verified project-specific
scripts. Check `package.json` and the lockfile before running them. If
the project uses pnpm, Yarn, or Bun, use the matching package manager
instead.

## Deployment

The live site is deployed at:

https://kickzone-2sm.pages.dev/

For a Cloudflare Pages deployment:

1.  Connect the project repository to Cloudflare Pages, or configure the
    existing Pages project.
2.  Set the correct build command and output directory for the project's
    framework.
3.  Add any required environment variables in the Cloudflare Pages
    project settings.
4.  Deploy and test the production URL on mobile and desktop.
5.  Verify navigation, contact links, images, form validation, and the
    booking flow after deployment.

The correct build command and output directory depend on the actual
project configuration.

## Production Readiness

Before using the site to accept real bookings, consider implementing and
testing the following:

-   **Live availability:** Read slot availability from a trusted backend
    or scheduling system.
-   **Persistent reservations:** Store bookings in a database and return
    a real booking ID.
-   **Conflict prevention:** Prevent two users from reserving the same
    slot.
-   **Booking confirmation:** Send confirmation and cancellation details
    by SMS, email, or another agreed channel.
-   **Admin management:** Let authorized staff manage slots, prices, and
    reservations.
-   **Security:** Validate inputs on the server, apply rate limiting,
    and protect administrative endpoints.
-   **Privacy:** Publish a privacy policy and explain how visitor
    contact details are handled.
-   **Operational accuracy:** Confirm the real prices, opening hours,
    facilities, and cancellation rules.
-   **Testing:** Test mobile layouts, keyboard accessibility, error
    states, invalid inputs, and the complete booking lifecycle.

Do not advertise the demo form as a confirmed booking system until the
backend and reservation workflow are implemented and verified.

## Contact

**Kick-Zone --- Mirpur 12, Dhaka**

-   **Address:** Block-M, Plot-7, Eastern Housing Phase-2, Pallabi,
    Mirpur-12, Dhaka, Bangladesh
-   **Phone:** 01973-613818
-   **Website:** https://kickzone-2sm.pages.dev/

Call the venue to confirm current rates, availability, and facilities.

------------------------------------------------------------------------

© 2026 Kick-Zone. All rights reserved.
