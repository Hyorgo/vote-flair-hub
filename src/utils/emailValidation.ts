// Liste non exhaustive de domaines d'emails temporaires connus
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'yopmail.com',
  'mailinator.com',
  'throwawaymail.com',
  '10minutemail.com',
  'trashmail.com',
  'sharklasers.com',
  'guerrillamail.info',
  'grr.la',
  'maildrop.cc'
];

// Regex plus stricte pour la validation d'email
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateEmailFormat = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const isDisposableEmail = (email: string): boolean => {
  const domain = email.toLowerCase().split('@')[1];
  return DISPOSABLE_EMAIL_DOMAINS.includes(domain);
};