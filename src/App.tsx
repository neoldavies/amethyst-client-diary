/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PriceList from "./pages/PriceList";
import TreatmentProfiles from "./pages/TreatmentProfiles";
import Gallery from "./pages/Gallery";
import MyStyleArchive from "./pages/MyStyleArchive";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="amethyst-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="prices" element={<PriceList />} />
            <Route path="archive" element={<MyStyleArchive />} />
            <Route path="aftercare" element={<TreatmentProfiles />} />
            <Route path="gallery" element={<Gallery />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
