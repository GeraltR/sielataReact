import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import axios from "../../api/axios";

export default function RulesDialog({ open, handleClose }) {
  const [rules, setRules] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    axios
      .get("/api/festival/current/rules")
      .then(({ data }) => setRules(data))
      .catch(() => setRules(null))
      .finally(() => setLoading(false));
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} disableScrollLock maxWidth="md" fullWidth>
      <DialogTitle id="rules-dialog-title" sx={{ pr: 12 }}>
        {rules?.title ?? "Regulamin Festiwalu"}
      </DialogTitle>
      <IconButton
        onClick={() => window.print()}
        aria-label="Drukuj"
        sx={{
          position: "absolute",
          right: 48,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <PrintIcon />
      </IconButton>
      <IconButton
        onClick={handleClose}
        aria-label="Zamknij"
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {loading ? (
          <p>Ładowanie…</p>
        ) : rules ? (
          <div dangerouslySetInnerHTML={{ __html: rules.content }} />
        ) : (
          <p>Nie udało się załadować regulaminu.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
