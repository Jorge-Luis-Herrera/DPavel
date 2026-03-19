import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InventoryService implements OnModuleInit {
  private readonly dbPath = process.env.NODE_ENV === 'production'
    ? '/home/data/db.json'
    : path.join(process.cwd(), 'data', 'db.json');

  onModuleInit() {
    if (!fs.existsSync(path.dirname(this.dbPath))) {
      fs.mkdirSync(path.dirname(this.dbPath), { recursive: true });
    }
    this.ensureDbStructure();
  }

  private ensureDbStructure() {
    let data;
    try {
      if (fs.existsSync(this.dbPath)) {
        data = JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
      }
    } catch (e) {
      data = {};
    }

    if (!data || typeof data !== 'object') data = {};
    if (!Array.isArray(data.shelves)) data.shelves = [{ id: 1, titulo: 'Estantería Principal' }];
    if (!Array.isArray(data.products)) data.products = [];

    this.saveData(data);
  }

  private getData() {
    try {
      if (!fs.existsSync(this.dbPath)) return { shelves: [], products: [] };
      const data = JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
      return {
        shelves: Array.isArray(data.shelves) ? data.shelves : [],
        products: Array.isArray(data.products) ? data.products : []
      };
    } catch (e) {
      return { shelves: [], products: [] };
    }
  }

  private saveData(data: any) {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
  }

  private saveImage(base64Data: string, prefix: string): string | null {
    if (!base64Data || !base64Data.startsWith('data:image')) return null;

    try {
      const extension = base64Data.split(';')[0].split('/')[1];
      const base64Image = base64Data.split(';base64,').pop();
      const fileName = `${prefix}-${Date.now()}.${extension}`;
      const uploadsPath = process.env.NODE_ENV === 'production' ? '/home/data/uploads' : path.join(process.cwd(), 'uploads');

      if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadsPath, fileName), base64Image!, { encoding: 'base64' });
      return fileName;
    } catch (e) {
      console.error('Error saving image:', e);
      return null;
    }
  }

  async getInventario() {
    const data = this.getData();
    return data.shelves.map(shelf => ({
      ...shelf,
      productos: data.products.filter(p => Number(p.shelfId) === Number(shelf.id))
    }));
  }

  async createShelf(titulo: string) {
    const data = this.getData();
    const newShelf = { id: Date.now(), titulo, categorias: [] };
    data.shelves.push(newShelf);
    this.saveData(data);
    return newShelf;
  }

  async deleteShelf(id: number) {
    const data = this.getData();
    data.shelves = data.shelves.filter(s => Number(s.id) !== Number(id));
    data.products = data.products.filter(p => Number(p.shelfId) !== Number(id));
    this.saveData(data);
  }

  async getAllProducts() {
    const data = this.getData();
    return data.products.map(p => ({
      ...p,
      estanteria: data.shelves.find(s => Number(s.id) === Number(p.shelfId))
    }));
  }

  async getFeaturedProducts() {
    const data = this.getData();
    return data.products.filter(p => p.esExclusivo || p.esOferta || p.esDomicilio);
  }

  async createProduct(productData: any) {
    const data = this.getData();
    if (productData.imagenUrl && productData.imagenUrl.startsWith('data:')) {
      productData.imagenUrl = this.saveImage(productData.imagenUrl, 'prod');
    }
    const newProduct = {
      id: Date.now(),
      nombre: productData.nombre ?? '',
      descripcion: productData.descripcion ?? '',
      esExclusivo: productData.esExclusivo ?? false,
      esOferta: productData.esOferta ?? false,
      esDomicilio: productData.esDomicilio ?? false,
      cantidad: Number(productData.cantidad) || 0,
      precio: Number(productData.precio) || 0,
      imagenUrl: productData.imagenUrl ?? null,
      shelfId: Number(productData.shelfId),
    };
    data.products.push(newProduct);
    this.saveData(data);
    return newProduct;
  }

  async updateProduct(id: number, updateData: any) {
    const data = this.getData();
    const index = data.products.findIndex(p => Number(p.id) === Number(id));
    if (index === -1) throw new NotFoundException('Producto no encontrado');
    if (updateData.imagenUrl && updateData.imagenUrl.startsWith('data:')) {
      updateData.imagenUrl = this.saveImage(updateData.imagenUrl, 'prod');
    }
    const existing = data.products[index];
    const updatedProduct = {
      ...existing,
      ...updateData,
      id: existing.id,
    };
    data.products[index] = updatedProduct;
    this.saveData(data);
    return updatedProduct;
  }

  async deleteProduct(id: number) {
    const data = this.getData();
    data.products = data.products.filter(p => Number(p.id) !== Number(id));
    this.saveData(data);
  }

  async updateStock(id: number, cantidad: number) {
    const data = this.getData();
    const product = data.products.find(p => Number(p.id) === Number(id));
    if (!product) throw new NotFoundException('Producto no encontrado');
    product.cantidad = cantidad;
    this.saveData(data);
    return product;
  }
}
