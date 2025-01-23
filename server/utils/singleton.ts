// https://github.com/drizzle-team/drizzle-orm/issues/1988
// Singleton function to ensure only one db instance is created
export const singleton = <Value>(name: string, value: () => Value): Value => {
  const globalAny: any = global
  globalAny.__singletons = globalAny.__singletons || {}

  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value()
  }

  return globalAny.__singletons[name]
}
