export const Selectors = {
    owner: state => state.auth.user.uid,
    isLoggedIn: state => state.auth.loggedIn,
    isLoading: state => state.auth.loading,
};
