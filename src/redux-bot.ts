import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { Wechaty } from 'wechaty'
import { WechatyRedux, Duck } from 'wechaty-redux'

/**
 * 1. Configure Store with RxJS Epic Middleware for Wechaty Ducks API
 */
const epicMiddleware = createEpicMiddleware()

const store = createStore(
    Duck.default,
    applyMiddleware(epicMiddleware),
)

const rootEpic = combineEpics(...Object.values(Duck.epics))
epicMiddleware.run(rootEpic)

/**
 * 2. Instantiate Wechaty and Install Redux Plugin
 */
const bot = Wechaty.instance({ puppet: 'wechaty-puppet-whatsapp' })
bot.use(WechatyRedux({ store }))

/**
 * 3. Using Redux Store with Wechaty Ducks API!
 */
store.subscribe(() => console.info(store.getState()))

store.dispatch(Duck.actions.ding(bot.id, 'dispatch a ding action'))
// The above code 👆 is exactly do the same thing with the following code 👇 :
// Duck.operations.ding(store.dispatch)(bot.id, 'call ding from operations')
