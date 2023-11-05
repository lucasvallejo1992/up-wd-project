import "./global.css";

import { Box } from "@chakra-ui/react";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box padding={4}>
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}