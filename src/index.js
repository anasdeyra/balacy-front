import { render } from "react-dom";
import "dotenv/config";
import App from "./app";
import { AuthProvider } from "./contextes/authContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "./theme";

const client = new QueryClient();

function Providers({ children }) {
  return (
    <AuthProvider>
      <CSSReset />
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}

render(<Providers children={<App />} />, document.getElementById("app"));
