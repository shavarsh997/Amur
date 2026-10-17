/** Section roles reference reviewed content; missing roles never synthesize a process or price. */
export const serviceSectionRoles: Record<
  string,
  { scope: number; process?: number; pricing?: number }
> = {
  "apartment-renovation-yerevan": { scope: 0, process: 1, pricing: 3 },
  "new-build-renovation": { scope: 0, process: 1, pricing: 2 },
  "turnkey-renovation": { scope: 0 },
  "apartment-interior-design-yerevan": { scope: 0, pricing: 2 },
  "office-renovation-yerevan": { scope: 0, pricing: 2 },
  "capital-renovation-yerevan": { scope: 0, pricing: 2 },
  "cosmetic-renovation-yerevan": { scope: 0, pricing: 2 },
  "plumbing-work-yerevan": { scope: 0, pricing: 2 },
  "electrical-work-yerevan": { scope: 0, pricing: 2 },
};
