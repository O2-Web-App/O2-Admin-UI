"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/redux/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1) Type the ref as `AppStore | null` and pass `null` as the initial value
  const storeRef = useRef<AppStore | null>(null);

  // 2) If it's the first render, create the store
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // 3) Use `storeRef.current!` to tell TypeScript it's not null by now
  return <Provider store={storeRef.current!}>{children}</Provider>;
}
