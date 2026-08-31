import fs from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "src", "data");

const files = {
  products: path.join(dataDir, "products.json"),
  users: path.join(dataDir, "users.json"),
  orders: path.join(dataDir, "orders.json"),
};

async function readJson(file) {
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw);
}

async function writeJson(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export async function getProducts() {
  return readJson(files.products);
}

export async function saveProducts(products) {
  await writeJson(files.products, products);
}

export async function getUsers() {
  return readJson(files.users);
}

export async function saveUsers(users) {
  await writeJson(files.users, users);
}

export async function getOrders() {
  return readJson(files.orders);
}

export async function saveOrders(orders) {
  await writeJson(files.orders, orders);
}
