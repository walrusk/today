export const Selectors = {
    past: state => state.list.past,
    today: state => state.list.today,
    todayLength: state => state.list.today.length,
};
