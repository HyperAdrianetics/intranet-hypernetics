import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MoodBoard from "./components/MoodBoard";
import EmailSignature from "./components/EmailSignature";
import { QuoteEditor } from "./components/QuoteEditor";
import { defaultQuote } from "./types/quote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cotizador"
          element={
            <QuoteEditor initialData={defaultQuote} isDarkMode={true} />
          }
        />
        <Route path="/moodboard" element={<MoodBoard />} />
        <Route path="/firma" element={<EmailSignature />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

