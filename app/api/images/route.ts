import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const imagesDirectory = path.join(process.cwd(), 'public/images/projects/eInvoice');
  
  try {
    const files = await fs.promises.readdir(imagesDirectory);
    const images = files.map(file => ({
      src: `/images/projects/eInvoice/${file}`,
      alt: file.replace(/-/g, ' ').replace(/\.[^/.]+$/, "") // Simple alt text
    }));
    
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error reading images:', error);
    return NextResponse.error();
  }
}