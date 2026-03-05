import { Row } from "./slices/dataSlice";

export function mockLogin(
  email: string,
  password: string
): Promise<{ token: string; user: { id: string; name: string; email: string } }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@example.com" && password === "password") {
        resolve({
          token: "mocked-token",
          user: { id: "1", name: "Admin User", email },
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 600);
  });
}

export function mockRows(count = 57): Row[] {
  const roles = ["Admin", "Manager", "Editor", "Viewer"];
  const statuses: Row["status"][] = ["Active", "Pending", "Suspended"];
  const rows: Row[] = [];
  for (let i = 1; i <= count; i++) {
    const role = roles[i % roles.length];
    const status = statuses[i % statuses.length];
    const name = `User ${i}`;
    const email = `user${i}@example.com`;
    const created = new Date(
      Date.now() - Math.floor(Math.random() * 365) * 86400000
    )
      .toISOString()
      .slice(0, 10);
    rows.push({
      id: i,
      name,
      email,
      role,
      createdAt: created,
      status,
    });
  }
  return rows;
}

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

export function mockProducts(count = 50): Product[] {
  const categories = ["Smartphones", "Laptops", "Furniture", "Gaming", "Beauty"];
  const arr: Product[] = [];
  for (let i = 1; i <= count; i++) {
    const category = categories[i % categories.length];
    arr.push({
      id: i,
      name: `${category} ${i}`,
      category,
      price: Math.floor(50 + Math.random() * 1500),
      stock: Math.floor(10 + Math.random() * 500),
    });
  }
  return arr;
}

export type Client = {
  id: number;
  name: string;
  country: string;
  spending: number;
};

export function mockClients(count = 80): Client[] {
  const countries = ["US", "UK", "DE", "FR", "CA", "JP", "IN"];
  const arr: Client[] = [];
  for (let i = 1; i <= count; i++) {
    arr.push({
      id: i,
      name: `Client ${i}`,
      country: countries[i % countries.length],
      spending: Math.floor(100 + Math.random() * 5000),
    });
  }
  return arr;
}

export type Sale = {
  month: string;
  revenue: number;
  orders: number;
};

export function mockSales(): Sale[] {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return months.map((m, i) => ({
    month: m,
    revenue: Math.floor(2000 + Math.random() * 8000),
    orders: Math.floor(100 + Math.random() * 900),
  }));
}

export type Order = {
  id: number;
  client: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  date: string;
};

export function mockOrders(count = 120): Order[] {
  const statuses: Order["status"][] = ["Pending", "Shipped", "Delivered", "Cancelled"];
  const arr: Order[] = [];
  for (let i = 1; i <= count; i++) {
    arr.push({
      id: i,
      client: `Client ${((i - 1) % 80) + 1}`,
      status: statuses[i % statuses.length],
      total: Math.floor(50 + Math.random() * 2000),
      date: new Date(Date.now() - Math.floor(Math.random() * 180) * 86400000)
        .toISOString()
        .slice(0, 10),
    });
  }
  return arr;
}
