import Vuex, { Store } from 'vuex';
import { Vue } from 'nuxt-property-decorator';

Vue.use(Vuex);

export interface RootState {}
export const store = new Store<RootState>({});
