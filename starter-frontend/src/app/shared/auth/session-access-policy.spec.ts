import {requiredSessionRedirect} from './session-access-policy';

describe('requiredSessionRedirect', () => {
  const noChecks = {
    authenticated: false,
    requiresEmailConfirmation: () => false,
    requiresPasswordChange: () => false,
  };

  it('returns null when not authenticated', () => {
    expect(requiredSessionRedirect(null, '/', noChecks)).toBeNull();
  });

  it('returns null when authenticated without a hydrated user', () => {
    expect(
      requiredSessionRedirect(null, '/', {...noChecks, authenticated: true}),
    ).toBeNull();
  });

  it('redirects to login when email confirmation is required', () => {
    const result = requiredSessionRedirect(
      {id: 1} as never,
      '/preferences',
      {
        authenticated: true,
        requiresEmailConfirmation: () => true,
        requiresPasswordChange: () => false,
      },
    );
    expect(result).toEqual({
      kind: 'login',
      queryParams: {email_confirmation_required: 1},
    });
  });

  it('redirects to change-password with current URL as next param', () => {
    const result = requiredSessionRedirect(
      {id: 1} as never,
      '/preferences',
      {
        authenticated: true,
        requiresEmailConfirmation: () => false,
        requiresPasswordChange: () => true,
      },
    );
    expect(result).toEqual({
      kind: 'change-password',
      queryParams: {next: '/preferences'},
    });
  });

  it('does not loop the user when already on the change-password page', () => {
    const result = requiredSessionRedirect(
      {id: 1} as never,
      '/change-password',
      {
        authenticated: true,
        requiresEmailConfirmation: () => false,
        requiresPasswordChange: () => true,
      },
    );
    expect(result).toBeNull();
  });
});
