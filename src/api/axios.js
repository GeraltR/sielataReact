import axios from "axios";

export default axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        // Wyniki, nazwiska i kategorie zmieniają się w trakcie festiwalu —
        // żadna odpowiedź API nie może być cache'owana przez przeglądarkę
        // ani serwer pośredniczący (stąd stare dane widoczne do odświeżenia).
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
    }
});