import { useEffect, useRef, useState } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ScrambleText({
  text,
  isHovered,
  className,
}: {
  text: string;
  isHovered: boolean;
  className?: string;
}) {
  const [scrambled, setScrambled] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    let frame = 0;
    const framesPerChar = 4;

    intervalRef.current = setInterval(() => {
      frame += 1;
      const revealed = Math.floor(frame / framesPerChar);

      let next = "";
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === " ") {
          next += " ";
        } else if (i < revealed) {
          next += char;
        } else {
          next += randomChar();
        }
      }
      setScrambled(next);

      if (revealed >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setScrambled(null);
      }
    }, 25);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text]);

  return <span className={className}>{scrambled ?? text}</span>;
}
