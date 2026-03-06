# Fauna

A community platform for wildlife photographers, naturalists, and conservationists to share sightings, tell field stories, and contribute to conservation awareness.

---

## Overview

Fauna is a full-stack social platform built around wildlife observation and photography. Unlike scientific data tools that treat sightings as data points, Fauna is built around storytelling, craft, and community. Users can document their encounters with wildlife, share photography, and connect with others who share a passion for the natural world.

---

## Features

- **Posts and Sightings** — Share wildlife encounters with photos, species information, and location data
- **Conservation Status** — Tag posts with IUCN conservation categories to surface species at risk
- **Spots** — A wildlife-specific engagement system replacing generic likes
- **Field Notes** — Contextual commentary on sightings from the community
- **Sightings Map** — Interactive map view of wildlife observations powered by Leaflet and OpenStreetMap
- **Camera Metadata** — Log the equipment used to capture each shot, treating photography as craft
- **National Park Tags** — Associate sightings with protected areas and reserves
- **User Authentication** — Secure accounts with JWT tokens and Cloudflare Turnstile bot protection
- **Image Uploads** — Cloudinary-powered image hosting

---

## Tech Stack

**Frontend**
- React with TypeScript
- shadcn/ui component library
- react-leaflet for mapping
- Sonner for toast notifications

**Backend**
- Node.js with Express
- TypeScript
- JWT authentication

**Database**
- MongoDB with Mongoose ODM
- MongoDB Atlas (cloud)

**Infrastructure**
- Railway (deployment)
- Cloudinary (image storage)
- Cloudflare Turnstile (bot protection)
- OpenStreetMap Nominatim API (geocoding)

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account
- Cloudflare Turnstile site key

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/fauna.git
cd fauna
```

2. Install dependencies for both client and server

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

3. Configure environment variables

Create a `.env` file in the `/server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create a `.env` file in the `/client` directory:

```env
VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
VITE_API_URL=http://localhost:5000
```

4. Start the development servers

```bash
# Server (from /server)
npm run dev

# Client (from /client)
npm run dev
```

The client will run on `http://localhost:5173` and the server on `http://localhost:5000`.

---

## Project Structure

```
fauna/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Route-level pages
│   │   ├── services/        # API service functions
│   │   └── types/           # TypeScript interfaces
├── server/                  # Express backend
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth and validation
│   │   ├── models/          # Mongoose schemas
│   │   └── routes/          # API route definitions
```

---

## Database Models

| Model | Description |
|-------|-------------|
| `User` | Account credentials, profile data, and authentication tokens |
| `Post` | Wildlife sighting with photo, species info, location, and metadata |
| `Spot` | Many-to-many relationship between users and posts (engagement) |

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Authenticate and receive a JWT |
| GET | `/api/posts` | Retrieve the post feed |
| POST | `/api/posts` | Create a new sighting post |
| POST | `/api/spots/:postId` | Spot or un-spot a post |
| GET | `/api/posts/:id` | Get a single post by ID |

---

## Roadmap

- Field Notes (comments) system
- User profiles and follow graph
- Real-time sighting alerts
- Location-based discovery for trip planning
- Professional identity features for rangers and field guides

---

## Contributing

Pull requests are welcome. For significant changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License. See `LICENSE` for details.