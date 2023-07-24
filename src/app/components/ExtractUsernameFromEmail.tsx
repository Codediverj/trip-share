function ExtractUsernameFromEmail(email: string): string | null {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    return email.substring(0, atIndex);
  }
  return null;
}

export default ExtractUsernameFromEmail;
