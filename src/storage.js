const IGNORE = ["Lemodikrysset"];

export function savePuzzle(data, creatorMode = false) {
  const id = data.id;
  if (IGNORE.includes(id)) return;
  data.timestamp = new Date();
  if (creatorMode) localStorage.setItem(id, JSON.stringify(data));
  else {
    const storeData = { response: data.response, timestamp: data.timestamp };
    localStorage.setItem(id, JSON.stringify(storeData));
  }
}

export function getPuzzle(id) {
  if (IGNORE.includes(id)) return;
  return localStorage.getItem(id);
}

export function deletePuzzle(id) {
  if (IGNORE.includes(id)) return;
  return localStorage.removeItem(id);
}
export function clearOldPlays() {
  const MAX_TIME = 1000 * 60 * 60 * 24; //24 hours
  const d = new Date();
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    const time = JSON.parse(localStorage.getItem(k))?.timestamp;
    if (!time) continue;
    if (new Date(time).getTime() + MAX_TIME < d.getTime())
      localStorage.removeItem(k);
  }
}
