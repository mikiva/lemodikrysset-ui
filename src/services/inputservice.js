const observers = [];

export function addKeyPressObserver(observer) {
  observers.push(observer);
}
export function handleKeyPress(key) {
  const k = key.key.toLowerCase();
  console.log(key);
  if (
    k.match(/^([a-zåäö]|arrowup|arrowdown|arrowleft|arrowright|\s|backspace)$/)
  ) {
    observers.forEach((notify) => {
      notify(k);
    });
  } else console.log("NO");
}
