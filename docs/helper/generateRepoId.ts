export function generateRepoId(url: string): string {
    const _url = new URL(url);
    let cleanedText = _url.hostname + _url.pathname;
    cleanedText = cleanedText.replace(/[.:\/\-_]/g, '');

    const length = cleanedText.length;
    const middleStart = Math.floor((length - 3) / 2);
    const middleEnd = middleStart + 3;

    const firstThree = cleanedText.substring(0, 3);
    const middleThree = cleanedText.substring(middleStart, middleEnd);
    const lastThree = cleanedText.substring(length - 3);

    return firstThree + middleThree + lastThree;
}