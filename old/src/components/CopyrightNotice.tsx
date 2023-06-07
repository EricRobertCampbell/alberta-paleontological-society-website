export const CopyrightNotice = () => {
  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "8px 0",
      }}
    >
      &copy;&nbsp;Copyright {new Date().getFullYear()} Alberta Palaeontological
      Society&reg;
    </footer>
  );
};
