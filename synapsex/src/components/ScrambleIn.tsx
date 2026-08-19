import { useEffect, useRef, useState } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ScrambleIn({
  text,
  delay,
  triggered,
}: {
  text: string;
  delay: number;
  triggered: boolean;
}) {
  const [display, setDisplay] = useState("");
  const startedRef = useRef(false);

  useEffect(() => {
    if (!triggered || startedRef.current) return;
    startedRef.current = true;

    const startTimeout = setTimeout(() => {
      let cursor = 0;

      const interval = setInterval(() => {
        cursor += 0.5;
        const revealed = Math.floor(cursor);

        let next = "";
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          if (char === " ") {
            next += " ";
          } else if (i < revealed) {
            next += char;
          } else if (i < revealed + 3) {
            next += randomChar();
          } else {
            next += "";
          }
        }
        setDisplay(next);

        if (revealed >= text.length) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 25);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [triggered, delay, text]);

  if (!triggered) return <>&nbsp;</>;

  return <>{display || " "}</>;
}
