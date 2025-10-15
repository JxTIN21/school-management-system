import './globals.css';

export const metadata = {
  title: 'School Management System',
  description: 'Manage school information',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}