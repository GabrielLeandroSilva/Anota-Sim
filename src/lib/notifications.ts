export async function notifyTask(title: string) {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const registration = await navigator.serviceWorker.ready;

  registration.active?.postMessage({
    type: "NOTIFY",
    title,
  });
}
