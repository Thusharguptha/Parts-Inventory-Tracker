# Parts Inventory Tracker

A full-stack web application for managing spare parts inventory with real-time stock tracking, low stock alerts, and comprehensive movement history.

## 🚀 Features

- **Add Parts** - Create new parts with name, quantity, minimum stock level, and unit price
- **Inventory Dashboard** - View all parts with summary cards showing total parts, low stock items, and total inventory value
- **Stock Management** - Add or remove stock with reason tracking
- **Low Stock Alerts** - Visual red highlighting for parts below minimum stock level
- **Movement History** - Track all stock additions and removals with timestamps and reasons
- **Duplicate Prevention** - Prevents adding parts with duplicate names (case-insensitive)

## 🛠️ Technologies Used

### Frontend
- **Angular 21** - Modern web framework with standalone components
- **TypeScript** - Type-safe JavaScript
- **Bootstrap 5** - Responsive UI framework
- **Bootstrap Icons** - Icon library
- **RxJS** - Reactive programming

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Local Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
ng serve
```

The frontend will run on `http://localhost:4200`

## 🌐 Deployed URLs

- **Frontend**: https://parts-inventory-tracker.vercel.app/
- **Backend API**: https://parts-inventory-tracker.onrender.com/

## 📸 Screenshots

### Dashboard View
![Dashboard with inventory summary cards and parts table](screenshots/dashboard.png)
*Dashboard showing total parts, low stock alerts, and inventory value with parts table*

### Add New Part
![Add part form with validation](screenshots/add-part.png)
*Form to add new parts with field validation*

### Stock Management
![Add/Remove stock modals](screenshots/stock-management.png)
*Modal interfaces for adding and removing stock with reason tracking*

## 🔑 Key Features Explained

### Dashboard Cards
- **Total Parts** - Count of all parts in inventory
- **Low Stock Items** - Parts below minimum stock level
- **Total Inventory Value** - Sum of (quantity × unit price) for all parts

### Parts Table Columns
- Part Name
- Current Quantity
- Minimum Stock Level
- Unit Price
- Quantity Value (quantity × price)
- Status Badge (In Stock / Low Stock)
- Action Buttons (Add Stock / Remove Stock)

### Stock Movement Reasons
- Used in Service
- Damaged
- Sold
- Other

## 🗂️ Project Structure

```
Parts-Inventory-Tracker/
├── backend/
│   ├── models/
│   │   ├── Part.js
│   │   └── StockMovement.js
│   ├── routes/
│   │   ├── part.routes.js
│   │   ├── stock.routes.js
│   │   └── dashboard.routes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/
│   │   │   │   ├── add-part/
│   │   │   │   └── inventory/
│   │   │   ├── services/
│   │   │   │   └── part.service.ts
│   │   │   └── app.routes.ts
│   │   └── environments/
│   │       ├── environment.ts
│   │       └── environment.development.ts
│   ├── angular.json
│   └── package.json
└── README.md
```

## 🔄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/parts` | Get all parts |
| POST | `/api/parts` | Create new part |
| PATCH | `/api/stock/:id/add` | Add stock to part |
| PATCH | `/api/stock/:id/remove` | Remove stock from part |
| GET | `/api/stock/history/latest` | Get last 10 stock movements |
| GET | `/api/dashboard` | Get dashboard summary |

## 👨‍💻 Development

### Environment Configuration

**Frontend** uses environment files:
- `environment.development.ts` - Local development (localhost:5000)
- `environment.ts` - Production (Render URL)

**Backend** uses `.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```




