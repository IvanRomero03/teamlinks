# Teamlinks

## How to use

### Dependencies

- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

### Clone the repository

```bash
git clone https://github.com/IvanRomero03/teamlinks.git
```

### Install the dependencies

Make sure you are in the project folder.
Make sure to have Node.js installed.

```bash
npm install
```

### Generate prisma client

Make sure to have the .env file in the root of the project.

```bash
npx prisma generate
```

### Run the project

```bash
npm run dev
```

## Proyect structure

```bash
├─ prisma
│   └─ schema.prisma
│
├─ public
│   ├── favicon.ico
│   └── images
│
└─ src
    ├─ components
    ├─ pages
    │   └─ api
    │       ├─ auth
    │       └─ trpc
    │
    ├─ server
    │   └─ api
    │       └─ routers
    │
    ├─ styles
    │
    └─ utils
```
