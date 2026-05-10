export type TopMenuUiText = {
  features: string;
  donate: string;
  about: string;
  users: string;
  navAria: string;
};

export type UserMenuUiText = {
  preferences: string;
  changePassword: string;
  logout: string;
  login: string;
};

export type FooterUiText = {
  baseline: string;
  version: string;
};

export type HomeUiText = {
  eyebrow: string;
  title: string;
  lead: string;
  primaryLoggedIn: string;
  primaryLoggedOut: string;
  secondaryLoggedOut: string;
  contactCta: string;
};

export type LoginUiText = {
  eyebrow: string;
  title: string;
  subtitle: string;
  username: string;
  usernamePlaceholder: string;
  usernameError: string;
  password: string;
  passwordPlaceholder: string;
  passwordError: string;
  remember: string;
  forgotPassword: string;
  submit: string;
  noAccount: string;
  createAccount: string;
  invalidCredentials: string;
  confirmEmailRequired: string;
};

export type RegisterUiText = {
  title: string;
  subtitle: string;
  back: string;
  create: string;
  loading: string;
  identityTitle: string;
  identityBadge: string;
  securityTitle: string;
  securityBadge: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  language: string;
  chooseLanguage: string;
  password: string;
  confirmPassword: string;
  createAccount: string;
  cancel: string;
  usernameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  firstNameRequired: string;
  lastNameRequired: string;
  languageRequired: string;
  passwordRequired: string;
  passwordMin: string;
  confirmRequired: string;
  passwordMismatch: string;
  success: string;
  loadLanguagesError: string;
  submitError: string;
};

export type RegisterPendingUiText = {
  title: string;
  subtitle: string;
  lead: string;
  body: string;
  login: string;
};

export type ChangePasswordUiText = {
  title: string;
  subtitle: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  oldPasswordRequired: string;
  newPasswordRequired: string;
  newPasswordMin: string;
  confirmRequired: string;
  mismatch: string;
  submit: string;
  forceMessage: string;
  success: string;
  error: string;
};

export type PreferencesUiText = {
  eyebrow: string;
  title: string;
  subtitle: string;
  profileTitle: string;
  profileSubtitle: string;
  summaryTitle: string;
  summarySubtitle: string;
  loading: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  language: string;
  chooseLanguage: string;
  save: string;
  changePassword: string;
  role: string;
  activeAccount: string;
  yes: string;
  no: string;
  roleSuperuser: string;
  roleUser: string;
  cancel: string;
  loadError: string;
  saveError: string;
  saveSuccess: string;
  userMissing: string;
};

export type UiText = {
  topmenu: TopMenuUiText;
  userMenu: UserMenuUiText;
  footer: FooterUiText;
  home: HomeUiText;
  login: LoginUiText;
  register: RegisterUiText;
  registerPending: RegisterPendingUiText;
  changePassword: ChangePasswordUiText;
  preferences: PreferencesUiText;
};
