import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import axios from "../api/axios";
import SpinnerButton from "../components/main/SpinnerButton";

const MIN_WAIT_MS = 5000;

export default function RemoveAbsentModels() {
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);
  const html5QrRef = useRef(null);

  const startScanner = async () => {
    setResult(null);
    setError(null);
    const html5Qr = new Html5Qrcode("qr-reader");
    html5QrRef.current = html5Qr;
    try {
      await html5Qr.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess,
        undefined
      );
      setScanning(true);
    } catch {
      setError("Nie można uruchomić kamery. Sprawdź uprawnienia.");
    }
  };

  const stopScanner = async () => {
    if (html5QrRef.current) {
      try {
        await html5QrRef.current.stop();
        html5QrRef.current.clear();
      } catch {
        // scanner already stopped
      }
      html5QrRef.current = null;
    }
    setScanning(false);
  };

  const onScanSuccess = async (decodedText) => {
    await stopScanner();
    const modelId = parseInt(decodedText, 10);
    if (!modelId || isNaN(modelId)) {
      setError("Nieprawidłowy kod QR — nie zawiera numeru modelu.");
      return;
    }
    setLoading(true);
    const startTime = Date.now();
    try {
      const { data } = await axios.post(`/api/removeabsent/${modelId}`);
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_WAIT_MS) {
        await new Promise((r) => setTimeout(r, MIN_WAIT_MS - elapsed));
      }
      setResult({
        cardNumber: data.konkurs ?? modelId,
        message: data.message ?? `Model nr karty ${data.konkurs ?? modelId} został usunięty.`,
      });
    } catch (e) {
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_WAIT_MS) {
        await new Promise((r) => setTimeout(r, MIN_WAIT_MS - elapsed));
      }
      const msg =
        e.response?.data?.message ??
        e.response?.data?.errors?.[0] ??
        "Wystąpił błąd podczas usuwania modelu.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="mt-4 mx-auto max-w-lg px-4">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-md shadow-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Usuwanie nieobecnych modeli
        </h2>
        <p className="text-gray-600 mb-6">
          Zeskanuj kod QR z karty odbioru modelu, aby usunąć model z listy
          uczestników.
        </p>

        <div id="qr-reader" ref={scannerRef} className="mb-4 rounded overflow-hidden" />

        {!scanning && !loading && (
          <button
            onClick={startScanner}
            className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md"
          >
            Uruchom skaner QR
          </button>
        )}

        {scanning && !loading && (
          <button
            onClick={stopScanner}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded-md"
          >
            Zatrzymaj skaner
          </button>
        )}

        {loading && (
          <SpinnerButton disabled={true} text="Usuwanie modelu..." type="button" />
        )}

        {result && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded text-green-800">
            <p className="font-semibold">✓ {result.message}</p>
            <button
              onClick={startScanner}
              className="mt-3 w-full bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Skanuj następny
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded text-red-800">
            <p className="font-semibold">✗ {error}</p>
            <button
              onClick={startScanner}
              className="mt-3 w-full bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Spróbuj ponownie
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
