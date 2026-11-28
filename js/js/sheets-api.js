(function (global) {
  const cfg = () => global.CLARA_CONFIG || {};

  function enabled() {
    return !!(cfg().USE_SHEETS && cfg().SHEETS_API_URL);
  }

  async function request(action, data, needPin) {
    if (!enabled()) throw new Error('Sheets not configured');
    const url = new URL(cfg().SHEETS_API_URL);
    url.searchParams.set('action', action);
    const payload = { action, ...(data || {}) };
    if (needPin) payload.pin = sessionStorage.getItem('clara.adminPin') || cfg().ADMIN_PIN;

    const res = await fetch(url.toString(), {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    return json;
  }

  // Public
  async function getGallery() {
    if (!enabled()) return { photos: [] };
    const url = new URL(cfg().SHEETS_API_URL);
    url.searchParams.set('action', 'getGallery');
    const res = await fetch(url.toString());
    return res.json();
  }

  async function addBooking(booking) {
    return request('addBooking', { booking }, false);
  }

  // Admin
  async function getInventory() { return request('getInventory', {}, true); }
  async function saveInventory(items) { return request('saveInventory', { items }, true); }
  async function upsertItem(item) { return request('upsertItem', { item }, true); }
  async function deleteItem(id) { return request('deleteItem', { id }, true); }
  async function addMovement(movement) { return request('addMovement', { movement }, true); }
  async function getMovements() { return request('getMovements', {}, true); }
  async function uploadPhoto(payload) { return request('uploadPhoto', payload, true); }
  async function deletePhoto(id, fileId) { return request('deletePhoto', { id, fileId }, true); }
  async function getBookings() { return request('getBookings', {}, true); }
  async function ping() {
    if (!enabled()) return { ok: false };
    const url = new URL(cfg().SHEETS_API_URL);
    url.searchParams.set('action', 'ping');
    const res = await fetch(url.toString());
    return res.json();
  }

  global.ClaraAPI = {
    enabled, ping, getGallery, addBooking,
    getInventory, saveInventory, upsertItem, deleteItem,
    addMovement, getMovements, uploadPhoto, deletePhoto, getBookings
  };
})(window);
