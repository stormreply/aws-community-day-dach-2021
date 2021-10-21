import { API } from 'aws-amplify'
import { Module, VuexAction, VuexModule } from 'nuxt-property-decorator'

import { store } from '~/store/index'

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'fizzbuzz',
  dynamic: true,
  store,
})
export default class FizzBuzz extends VuexModule {
  @VuexAction
  async check(value: number): Promise<any> {
    const response = await API.post('FizzBuzzAPI', '/check', {
      body: { number: value },
    }).catch((error) => console.log(error))
    console.log(response)
  }
}
