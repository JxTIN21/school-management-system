# 🏫 School Management System

A modern, full-stack web application built with **Next.js 14** and **MySQL** for managing school information. Features a stunning responsive design, advanced search & filters, form validation, image uploads with preview, and dynamic state-city selection using the **country-state-city** library.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Core Functionality
- 📝 **Add Schools** - Beautiful form with comprehensive validation and live image preview
- 🔍 **Search Schools** - Real-time search by school name
- 🗂️ **Advanced Filters** - Filter schools by state and city with dynamic dropdowns
- 👀 **View Schools** - Elegant card-based layout with gradient design
- 🌍 **Location Dropdowns** - Dynamic state and city selection for India (36 states/UTs)
- 📧 **Email Validation** - Proper format checking
- 📱 **Phone Validation** - 10-digit number validation with +91 prefix
- 🖼️ **Image Upload** - Drag & drop interface with live preview
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** - Lightning-fast page loads with Next.js
- 🎨 **Modern UI** - Built with Tailwind CSS featuring gradients and smooth animations

### Advanced Features
- 🔎 **Live Search** - Instant results as you type
- 🏷️ **Active Filters Display** - Visual tags showing current filters with quick removal
- 📊 **Results Counter** - Shows "X of Y schools" in real-time
- 🎯 **Smart City Filter** - Cities auto-populate based on selected state
- 🧹 **Clear All Filters** - One-click to reset all search and filter criteria
- 💫 **Smooth Animations** - Hover effects, transitions, and loading states
- 🎨 **Gradient Themes** - Beautiful blue-to-purple gradients throughout

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with Server & Client Components
- **React Hook Form** - Form management and validation
- **Tailwind CSS** - Utility-first CSS framework
- **country-state-city** - Global countries, states, and cities data

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MySQL** - Relational database
- **mysql2** - MySQL client for Node.js

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** (v8.0 or higher)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/JxTIN21/school-management-system.git
cd school-management-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup MySQL Database

Start MySQL and create the database:

```sql
CREATE DATABASE IF NOT EXISTS school_db;

USE school_db;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(20) NOT NULL,
  image TEXT,
  email_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_db
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 5. Create Image Directory
```bash
mkdir -p public/schoolImages
```

### 6. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
school-management/
├── public/
│   └── schoolImages/          # Uploaded school images
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout
│   │   ├── page.js            # Home page
│   │   ├── globals.css        # Global styles
│   │   ├── addSchool/
│   │   │   └── page.js        # Add school form (elegant design)
│   │   ├── showSchools/
│   │   │   └── page.js        # Display schools (server component)
│   │   └── api/
│   │       └── schools/
│   │           └── route.js   # API endpoints
│   ├── components/
│   │   ├── SchoolCard.js      # School card component
│   │   └── SchoolsClient.js   # Client component for search & filters
│   └── lib/
│       └── db.js              # Database connection
├── .env.local                 # Environment variables
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Usage

### Adding a School

1. Navigate to **"Add New School"** page
2. Fill in all required fields:
   - **School Name** (minimum 3 characters)
   - **Complete Address** (multiline text area)
   - **State** (select from dropdown - all 36 Indian states/UTs)
   - **City** (auto-populated based on selected state)
   - **Contact Number** (10 digits, displayed with +91 prefix)
   - **Email Address** (validated format)
   - **School Image** (optional - drag & drop or click to upload)
3. Preview your image before submitting
4. Click **"Add School"** - see loading animation
5. Success message appears with option to add another school

### Searching & Filtering Schools

1. Navigate to **"Schools Directory"** page
2. Use the search bar to find schools by name (instant results)
3. Filter by **State** - select from dropdown
4. Filter by **City** - automatically populated based on selected state
5. View active filters as color-coded tags
6. Click **×** on any tag to remove that filter
7. Click **"Clear All"** to reset all filters
8. See results counter: "Showing X of Y schools"

### Viewing Schools

1. Browse schools in a beautiful gradient-themed layout
2. Responsive grid adjusts to your screen size:
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 3 columns
   - Large Desktop: 4 columns
3. Each card displays:
   - School image (or elegant placeholder)
   - School name
   - Complete address
   - City and state
   - Contact information

## 🔧 API Endpoints

### GET `/api/schools`
Fetch all schools from database

**Response:**
```json
[
  {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Sector-4, Vikas Nagar",
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "contact": "9919206912",
    "email_id": "dps@example.com",
    "image": "1234567890-school.jpg",
    "created_at": "2025-01-15T10:30:00.000Z"
  }
]
```

### POST `/api/schools`
Add a new school

**Request:** `multipart/form-data`
- name (required)
- address (required)
- city (required)
- state (required)
- contact (required)
- email_id (required)
- image (optional file)

**Response:**
```json
{
  "message": "School added successfully",
  "id": 1
}
```

## 🎨 Features in Detail

### Advanced Search & Filter System
- **Real-time Search:** Instant filtering as you type school names
- **State Filter:** Dropdown with all 36 Indian states and union territories
- **Dynamic City Filter:** Cities auto-populate based on selected state
- **Visual Feedback:** Active filters displayed as removable tags
- **Smart Dependencies:** City filter disabled until state is selected
- **Clear All:** One-click to reset all search and filter criteria
- **Results Counter:** Live count showing filtered vs total schools

### Elegant UI Design
- **Gradient Backgrounds:** Blue-to-purple gradients creating depth
- **Card-Based Layout:** Modern shadow effects and hover animations
- **Smooth Transitions:** All interactions have polished animations
- **Responsive Typography:** Headers with gradient text effects
- **Visual Hierarchy:** Clear sections with proper spacing
- **Loading States:** Animated spinners and disabled state feedback

### Dynamic State-City Selection
- Uses **country-state-city** library for accurate data
- All 36 Indian states and union territories included
- 600+ cities across India
- Real-time city updates based on state selection
- Sorted alphabetically for easy navigation

### Form Validation
- **School Name:** Minimum 3 characters, real-time validation
- **Email:** Valid email format (user@domain.com)
- **Phone:** Exactly 10 digits, displayed with +91 prefix
- **State & City:** Required selections with visual indicators
- **Address:** Multiline textarea for complete addresses
- Real-time error messages with icons
- Disabled submit button during processing

### Image Upload with Preview
- **Drag & Drop Interface:** Modern file upload experience
- **Live Preview:** See image immediately after selection
- **Change Image:** Hover overlay to replace selected image
- **Format Support:** All image formats (jpg, png, gif, webp, etc.)
- **File Size:** Supports up to 5MB images
- **Storage:** Saves to `public/schoolImages/` with unique timestamps
- **Optional Field:** Can submit without image

### Responsive Design
- **Mobile (< 640px):** Single column, touch-optimized
- **Tablet (640px - 1024px):** 2-column grid
- **Desktop (1024px - 1280px):** 3-column grid
- **Large Desktop (> 1280px):** 4-column grid
- Touch-friendly buttons and tap targets
- Adaptive text sizes and spacing

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `NEXT_PUBLIC_BASE_URL`
4. Deploy

**Note:** For production, use a cloud MySQL database:
- [PlanetScale](https://planetscale.com/) - Serverless MySQL
- [Railway](https://railway.app/) - Easy database hosting
- [AWS RDS](https://aws.amazon.com/rds/) - Enterprise solution
- [DigitalOcean](https://www.digitalocean.com/) - Managed databases

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- None at the moment! 🎉

## 📈 Future Enhancements

- [x] Search schools by name
- [x] Filter by state and city
- [x] Image upload with preview
- [x] Responsive design improvements
- [ ] Edit school information
- [ ] Delete schools with confirmation
- [ ] Pagination for large datasets (100+ schools)
- [ ] School details page with full information
- [ ] Admin authentication and authorization
- [ ] Export data to Excel/PDF
- [ ] Bulk import from CSV
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Multi-language support

## 👨‍💻 Author

**Jatin Srivastava**
- GitHub: [@JxTIN21](https://github.com/JxTIN21)
- LinkedIn: [Jatin Srivastava](https://www.linkedin.com/in/jatin-srivastava-784223253)
- Portfolio: [View Portfolio](https://unrivaled-frangollo-12da7c.netlify.app/)
- Email: jatinsrivastava4104@gmail.com

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs) - For excellent framework docs
- [React Hook Form](https://react-hook-form.com/) - For powerful form management
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first styling
- [country-state-city](https://www.npmjs.com/package/country-state-city) - For location data
- [MySQL Documentation](https://dev.mysql.com/doc/) - For database guidance
- [Vercel](https://vercel.com) - For seamless deployment

## 📧 Support

For support, email jatinsrivastava4104@gmail.com or open an issue in the repository.

---

⭐ **Star this repo if you find it helpful!**

Made with ❤️ using Next.js, React, MySQL, and Tailwind CSS
