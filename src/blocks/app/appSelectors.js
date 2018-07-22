export const Selectors = {
    isLoading: state => state.app.loading,
    isSyncing: state => state.app.syncing,
    isSyncWaiting: state => state.app.syncWaiting,
    initialLoad: state => state.app.initialLoad,
    past: state => state.app.past,
};
