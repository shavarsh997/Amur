export const contactPhoneEvent = "open-project-phone";

/** A narrow desktop window must not be mistaken for a phone. */
export function isMobileContactDevice(device: {
  userAgent: string;
  maxTouchPoints: number;
  userAgentData?: { mobile: boolean };
}): boolean {
  return (
    device.userAgentData?.mobile === true ||
    /Android|iPhone|iPad|iPod|Windows Phone/i.test(device.userAgent) ||
    // iPadOS can identify as a Mac when requesting desktop websites.
    (/Macintosh/i.test(device.userAgent) && device.maxTouchPoints > 1)
  );
}
