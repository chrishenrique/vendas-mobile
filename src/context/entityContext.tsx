import { useStorageState } from "@/hooks/useStorageState";
import type { Entity } from "@/types/entity";
import { createContext, type PropsWithChildren, useContext, useMemo } from "react";

type EntityContextValue = {
  entity: Entity | null;
  isLoading: boolean;
  selectEntity: (entity: Entity) => void;
  clearEntity: () => void;
};

const EntityContext = createContext<EntityContextValue | null>(null);

export function useEntity() {
  const value = useContext(EntityContext);
  if (!value) {
    throw new Error("useEntity must be wrapped in a <EntityProvider />");
  }
  return value;
}

export function EntityProvider({ children }: PropsWithChildren) {
  const [[isLoading, stored], setStored] = useStorageState("entity");

  const entity = useMemo<Entity | null>(
    () => (stored ? JSON.parse(stored) : null),
    [stored],
  );

  return (
    <EntityContext.Provider
      value={{
        entity,
        isLoading,
        selectEntity: (e) => setStored(JSON.stringify(e)),
        clearEntity: () => setStored(null),
      }}
    >
      {children}
    </EntityContext.Provider>
  );
}
