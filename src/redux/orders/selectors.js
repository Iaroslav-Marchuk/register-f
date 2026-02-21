export const selectAllOrders = state => state.orders.all.orders;
export const selectAllOrdersTotalItems = state =>
  state.orders.all.pagination.totalItems;
export const selectAllOrdersTotalPages = state =>
  state.orders.all.pagination.totalPages;
export const selectAllOrdersHasNextPage = state =>
  state.orders.all.pagination.hasNextPage;
export const selectAllOrdersHasPreviousPage = state =>
  state.orders.all.pagination.hasPreviousPage;
export const selectAllOrdersIsLoading = state => state.orders.all.isLoading;
export const selectAllOrdersError = state => state.orders.all.error;

export const selectTodayOrders = state => state.orders.today.orders;

export const selectTotalCompleted = state =>
  state.orders.today.stats.totalCompleted;
export const seletcTotalM2 = state => state.orders.today.stats.totalM2;
export const selectRation = state => state.orders.today.stats.ratio;
export const selectTodayOrdersTotalItems = state =>
  state.orders.today.pagination.totalItems;
export const selectTodayOrdersTotalPages = state =>
  state.orders.today.pagination.totalPages;
export const selectTodayOrdersHasNextPage = state =>
  state.orders.today.pagination.hasNextPage;
export const selectTodayOrdersHasPreviousPage = state =>
  state.orders.today.pagination.hasPreviousPage;
export const selectTodayOrdersIsLoading = state => state.orders.today.isLoading;
export const selectTodayOrdersError = state => state.orders.today.error;

export const selectActivity = state => state.orders.activity.dailyActivity;
export const selectActivityIsloading = state => state.orders.activity.isLoading;
export const selectActivityError = state => state.orders.activity.error;

// export const selectStatisticsByYear = (state, year) =>
//   state.orders.statistics.byYear[year] ?? [];
export const selectStatisticsByYear = (state, year) =>
  state.orders.statistics.byYear[year];
export const selectStatisticsIsLoading = state =>
  state.orders.statistics.isLoading;
export const selectStatisticsError = state => state.orders.statistics.error;

export const selectCreateIsLoading = state => state.orders.create.isLoading;
export const selectCreateError = state => state.orders.create.error;

export const selectEditIsLoading = state => state.orders.edit.isLoading;
export const selectEditError = state => state.orders.edit.error;

export const selectDeleteIsLoading = state => state.orders.delete.isLoading;
export const selectDeleteError = state => state.orders.delete.error;
