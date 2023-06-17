import { filterInPlace } from "@/helpers";

let observers = [];

export function addKeyPressObserver(observer) {
  observers.push(observer);
}
export function removeKeyPressObserver(observer) {
  console.log(observers);
  const obs = observers.indexOf(observer);

  console.log(obs);
  if (obs > -1) {
    observers.splice(obs, 1);
  }
  //filterInPlace(observers, (obs) => {
  //  console.log("remove", obs === observer);
  //  return obs === observer;
  //});
}
export function handleKeyPress(key) {
  const k = key.key.toLowerCase();
  if (
    k.match(
      /^([a-zåäö]|arrowup|arrowdown|arrowleft|arrowright|\s|backspace|enter)$/
    )
  ) {
    observers.forEach((notify) => {
      notify(k);
    });
  } else console.log("NO");
}
