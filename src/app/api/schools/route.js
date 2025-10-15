import { NextResponse } from 'next/server';
import pool from '@/lib/db';

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

    let imageData = null;

    // Convert image to Base64 for database storage
    if (imageFile && imageFile.size > 0) {
      try {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Limit image size (5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (buffer.length > maxSize) {
          return NextResponse.json(
            { error: 'Image size exceeds 5MB limit' },
            { status: 400 }
          );
        }
        
        // Store as Base64 data URL
        const base64 = buffer.toString('base64');
        imageData = `data:${imageFile.type};base64,${base64}`;
        
        console.log('Image converted to Base64 for storage');
      } catch (error) {
        console.error('Image processing error:', error);
        return NextResponse.json(
          { error: 'Failed to process image', details: error.message },
          { status: 400 }
        );
      }
    }

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Insert into database with Base64 image
    connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imageData, email_id]
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
  } finally {
    if (connection) connection.release();
  }
}

// DELETE school
export async function DELETE(request) {
  let connection;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'School ID is required' },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM schools WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'School deleted successfully' });
  } catch (error) {
    console.error('Error deleting school:', error);
    return NextResponse.json(
      { error: 'Failed to delete school', details: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) connection.release();
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;