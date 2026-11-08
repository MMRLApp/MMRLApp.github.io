export function moduleRouteId(id: string): string {
  return Array.from(id, (character) => {
    if (character === "~" || character !== character.toLowerCase()) {
      return `~${character.codePointAt(0)!.toString(16)}~`;
    }
    return character;
  }).join("");
}
