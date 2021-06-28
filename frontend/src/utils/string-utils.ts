export const BLANK_STRING = '';

/**
 * Returns if the string is empty - null, undefined, '', {} or has only spaces
 *
 * @param string
 */
export function isBlankString(string: string | undefined): boolean {
    return !string || Object.keys(string).length === 0 || string === '' || string.trim() === '';
}

/**
 * Returns if the string is not empty - null, undefined, '', {} or has only spaces
 *
 * @param string
 */
export function isNotBlankString(string: string | undefined): boolean {
    return !isBlankString(string);
}

export function getStringIfNonEmptyOrNull(string: string | undefined): string {
    if (isNotBlankString(string)) {
        return string as string;
    }
    return BLANK_STRING;
}

export function isOfValidLength(string: string, maxLength: number): boolean {
    return string.trim().length <= maxLength;
}
