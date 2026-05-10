// TODO (per project): replace with the new project's contact details.
const EMAIL_USER = 'contact';
const EMAIL_HOST = 'example';
const EMAIL_TLD = 'com';
const PHONE_PREFIX = '+00';
const PHONE_PARTS = ['000', '000000'];

export const CONTACT_INFO = {
  name: 'Project Owner',
  company: 'Acme Inc.',
  vat: '',
  addressLines: ['Street 1', 'Postal code City', 'Country'],
  websiteLabel: 'www.example.com',
  websiteUrl: 'https://www.example.com',
} as const;

/**
 * Returns the e-mail rendered with [at] / [dot] markers so it isn't
 * harvested verbatim by naive crawlers. The real address is reassembled
 * client-side only when {@link openContactEmail} is invoked.
 */
export function emailDisplay(): string {
  return `${EMAIL_USER} [at] ${EMAIL_HOST} [dot] ${EMAIL_TLD}`;
}

export function phoneDisplay(): string {
  return `${PHONE_PREFIX} ${PHONE_PARTS.join(' ')}`;
}

export function openContactEmail(subject: string): void {
  const address = `${EMAIL_USER}@${EMAIL_HOST}.${EMAIL_TLD}`;
  const params = new URLSearchParams({subject});
  window.location.href = `mailto:${address}?${params.toString()}`;
}
