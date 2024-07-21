import '@/app/ui/global.css';
import {HeaderImg} from '@/app/ui/headerImg';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Tic Tac Toe</title>
          <link href="https://fonts.googleapis.com/css2?family=Baloo+2&display=swap" rel="stylesheet"/>
      </head>
      <body className="my-bg">
        <main className="h-screen flex flex-col">
          <HeaderImg
            className="fixed w-[800px] max-w-full left-1/2  transform -translate-x-1/2"
          />

          {children}
        </main>
      </body>
    </html>
  );
}
