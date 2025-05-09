export const config = {
  storageType: getStorageType(),
};

export type STORAGE_TYPE = "local-storage" | "in-memory";

function getStorageType(): STORAGE_TYPE {
  const envVariable = import.meta.env.VITE_STORAGE;
  switch (envVariable) {
    case "in-memory":
      return "in-memory";
    default:
      return "local-storage";
  }
}
