/**
 * Removes null or undefined attributes from an object.
 * @param obj - The object to process.
 * @returns Object without null attributes.
 */
export const removeNullAttributes = (obj: any): any =>  {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v != null)
    );
}