import '../css/globals.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Menyu</title>
        <link rel="icon" type="image/jpeg" href="https://media.istockphoto.com/id/1210572177/vector/food-tray-cover-symbol-with-hand-menu-title-logo-vector-icon-graphic-art-isolated-on-white.jpg?s=612x612&w=0&k=20&c=Z-U5F2gHx-sgEvScwYmpqASjq4sJ-_BONlWgd_2ZZas=" />
      </head>
      <body>{children}</body>
    </html>
  );
}
