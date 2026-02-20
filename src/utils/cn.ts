type CnValue = string | undefined | null | false | 0 | Record<string, unknown>;

/**
 * Conditionally joins class names together.
 *
 * Accepts strings, falsy values (ignored), and objects whose truthy-valued
 * keys are included.
 *
 * @example
 *   cn("root", isActive && "active", className)
 *   cn("root", { vertical: isVertical }, className)
 */
export function cn(...args: CnValue[]): string {
  let result = "";

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === "string") {
      result = result ? result + " " + arg : arg;
    } else if (typeof arg === "object") {
      for (const key in arg) {
        if (arg[key]) {
          result = result ? result + " " + key : key;
        }
      }
    }
  }

  return result;
}
