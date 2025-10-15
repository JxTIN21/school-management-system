import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// GET all schools
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM schools ORDER BY id DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schools', details: error.message },
      { status: 500 }
    );
  }
}

// POST new school
export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');
    const imageFile = formData.get('image');

    console.log('Form data received:', { name, address, city, state, contact, email_id });

    let imageName = null;

    // Handle image upload
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const timestamp = Date.now();
      const originalName = imageFile.name.replace(/\s+/g, '-');
      imageName = `${timestamp}-${originalName}`;

      // Ensure directory exists
      const publicPath = path.join(process.cwd(), 'public', 'schoolImages');
      
      try {
        await mkdir(publicPath, { recursive: true });
      } catch (err) {
        console.log('Directory already exists or created');
      }

      const filePath = path.join(publicPath, imageName);
      await writeFile(filePath, buffer);
      console.log('Image saved:', imageName);
    }

    // Insert into database
    const [result] = await pool.query(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imageName, email_id]
    );

    console.log('School added with ID:', result.insertId);

    return NextResponse.json(
      { message: 'School added successfully', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json(
      { error: 'Failed to add school', details: error.message },
      { status: 500 }
    );
  }
}