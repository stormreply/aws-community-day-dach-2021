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
  check(value: number): Promise<string> {
    return API.post('FizzBuzzAPI', '/check', {
      body: { number: value },
    })
  }
}
