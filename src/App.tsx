import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppShell } from "@/components/layout/AppShell";
import { APP } from "@/config";
import { RoleProvider } from "@/lib/roles";
import { ExampleFlow } from "@/pages/ExampleFlow";
import { FundingFlow } from "@/pages/funding/FundingFlow";
import { Home } from "@/pages/Home";
import { Records } from "@/pages/Records";
import { Transcript } from "@/pages/Transcript";

// Halaman baru: buat file di src/pages/, tambah <Route> di sini, lalu tambah menu di src/config.ts.
export function App() {
  useEffect(() => {
    document.title = APP.name;
  }, []);

  return (
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<FundingFlow />} />
            <Route path="beranda" element={<Home />} />
            <Route path="contoh" element={<ExampleFlow />} />
            <Route path="transkrip" element={<Transcript />} />
            <Route path="data" element={<Records />} />
            <Route path="*" element={<FundingFlow />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  );
}
