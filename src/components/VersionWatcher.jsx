import { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { APP_VERSION } from "virtual:app-version";

const CHECK_INTERVAL_MS = 5 * 60 * 1000;

export default function VersionWatcher() {
  const [outdated, setOutdated] = useState(false);
  const checking = useRef(false);

  useEffect(() => {
    const checkVersion = async () => {
      if (checking.current || outdated) return;
      checking.current = true;
      try {
        const res = await fetch(`/version.json?t=${Date.now()}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.version && data.version !== APP_VERSION) {
            setOutdated(true);
          }
        }
      } catch {
        // Brak sieci lub błąd zapytania - spróbujemy ponownie przy kolejnym sprawdzeniu
      } finally {
        checking.current = false;
      }
    };

    const interval = setInterval(checkVersion, CHECK_INTERVAL_MS);
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") checkVersion();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [outdated]);

  return (
    <Dialog open={outdated} disableScrollLock>
      <DialogTitle id="version-watcher-title">
        Dostępna jest nowa wersja strony
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="version-watcher-description">
          Strona festiwalu została zaktualizowana. Odśwież, aby korzystać z
          najnowszej wersji.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => setOutdated(false)}
        >
          Później
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={() => window.location.reload()}
          autoFocus
        >
          Odśwież
        </button>
      </DialogActions>
    </Dialog>
  );
}
