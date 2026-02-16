# Angular Environment Configuration

## Development (local)
Uses: src/environments/environment.development.ts
API URL: http://localhost:5000/api

## Production
Uses: src/environments/environment.ts  
API URL: https://parts-inventory-tracker.onrender.com/api

## How it works
- `ng serve` automatically uses environment.development.ts
- `ng build` uses environment.ts (production)
- Update the apiUrl in the respective file to change the backend endpoint
