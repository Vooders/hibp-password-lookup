import { HaveIBeenPwnedPasswordApi } from './lib/HaveIBeenPwnedPasswordApi'
import { httpsClient } from './lib/httpsClient'
import { sha1 } from './lib/Sha1'

export namespace HibpPasswords {
  export async function lookup (password: string, retries: number = 0, api: HaveIBeenPwnedPasswordApi = new HaveIBeenPwnedPasswordApi(httpsClient)): Promise<number> {
    const hash = sha1(password)
    const results = await api.fetchResults(hash, retries)

    return results.reduce((timesSeen, tuple) => {
      return (tuple[0] === hash) ? tuple[1] : timesSeen
    }, 0)
  }
}
