import "server-only";
import bcrypt from "bcryptjs";

export function verifyPin(pin: string, pinHash: string): boolean {
  return bcrypt.compareSync(pin, pinHash);
}

export function hashPin(pin: string): string {
  return bcrypt.hashSync(pin, 10);
}
