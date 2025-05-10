export const requiredMark = (
  label: React.ReactNode,
  { required }: { required: boolean },
) => (
  <>
    {label}
    {required && (
      <span style={{ color: "red", marginLeft: "4px", fontSize: "14px" }}>
        *
      </span>
    )}
  </>
);
