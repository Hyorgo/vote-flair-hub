const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const DISPOSABLE_EMAIL_DOMAINS = ['tempmail.com', 'throwawaymail.com'];

export const validateEmailFormat = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const isDisposableEmail = (email: string): boolean => {
  const domain = email.split('@')[1];
  return DISPOSABLE_EMAIL_DOMAINS.includes(domain);
};