// Utilitário para conversão de chave pública VAPID e Registro de Push em Mobile/Desktop
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function registerPushServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    return null;
  }
  try {
    const registration = await navigator.serviceWorker.register('/sw-push.js', { scope: '/' });
    await navigator.serviceWorker.ready;
    return registration;
  } catch (err) {
    console.warn('[Push] Falha ao registrar Service Worker:', err);
    return null;
  }
}

export async function syncPushSubscriptionWithServer(subscription: PushSubscription): Promise<boolean> {
  try {
    const res = await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription),
    });
    const data = await res.json();
    return !!data.success;
  } catch (err) {
    console.warn('[Push] Erro ao sincronizar assinatura com o servidor:', err);
    return false;
  }
}

export async function autoCheckAndRenewPushSubscription(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
    return false;
  }

  if (Notification.permission !== 'granted') {
    return false;
  }

  try {
    const reg = await registerPushServiceWorker();
    if (!reg) return false;

    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      // Re-subscribe automatically using public VAPID key
      const keyRes = await fetch('/api/notifications/vapid-key');
      const keyData = await keyRes.json();
      if (keyData.success && keyData.publicKey) {
        const convertedKey = urlBase64ToUint8Array(keyData.publicKey);
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedKey,
        });
      }
    }

    if (sub) {
      await syncPushSubscriptionWithServer(sub);
      return true;
    }
  } catch (err) {
    console.warn('[Push] Erro na auto-renovação de push:', err);
  }
  return false;
}
