export async function notifyTask(title: string) {
  if (!("Notification" in window)) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  // 🟢 Se for PWA / Mobile
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready;

    registration.showNotification("AnotaSim", {
      body: title,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
    });

    return;
  }
}
