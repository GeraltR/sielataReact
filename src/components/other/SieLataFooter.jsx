export default function SieLataFooter({ year }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", padding: "0 4px" }}>
      <div style={{ fontSize: "17px", fontWeight: "bold", lineHeight: 1 }}>© {year}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "1px", lineHeight: 1 }}>
        <div style={{ fontSize: "18px" }}>Sie</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 324 325"
          width="21"
          height="21"
          fill="none"
          style={{ display: "block" }}
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M323 0 L1 92 L213 111 L236 323 Z" fill="#333" />
          <path fillRule="evenodd" clipRule="evenodd" d="M276 34 L219 93 L104 82 L272 33 Z" fill="white" />
        </svg>
        <div style={{ fontSize: "18px" }}>Lata</div>
      </div>
    </div>
  );
}