export async function requestNotificationPermission() {
    if (!("Notification" in window)) return false;
  
    const permission = await Notification.requestPermission();
    return permission === "granted";
}
  
export function notifyTask(title: string) {
    if (Notification.permission !== "granted") return;
  
    new Notification("AnotaSim", {
      body: title,
      icon: "/icon-192.png",
    });
}