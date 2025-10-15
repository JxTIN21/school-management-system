import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { put } from '@vercel/blob';

// GET all schools
export async function GET() {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM schools ORDER BY id DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schools', details: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}

// POST new school
export async function POST(request) {
  let connection;
  try {
    const formData = await request.formData();
    
    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');
    const imageFile = formData.get('image');

    let imageUrl = null;

    // Handle image upload using Vercel Blob (or alternative cloud storage)
    if (imageFile && imageFile.size > 0) {
      try {
        // Using Vercel Blob Storage
        const blob = await put(imageFile.name, imageFile, {
          access: 'public',
        });
        imageUrl = blob.url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        // Continue without image if upload fails
      }
    }

    // Insert into database
    connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imageUrl, email_id]
    );

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
  } finally {
    if (connection) connection.release();
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;