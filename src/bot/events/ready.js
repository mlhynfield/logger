const checkForMissingSettings = require('../utils/recoverSettings')
const statAggregator = require('../modules/statAggregator')

let failedHealthCheckCount = 0

module.exports = {
  name: 'ready',
  type: 'once',
  handle: async () => {
    statAggregator.incrementMisc('ready')
    global.logger.info(`Logger is now ready to serve requests. This shard has ${global.bot.guilds.size} guilds and ${global.bot.users.size} users cached.`)
    global.webhook.generic(`Logger is now ready to serve requests. This shard or shard range has ${global.bot.guilds.size} guilds and ${global.bot.users.size} users cached.`)
    global.bot.editStatus('online', {
      name: `Use /help | In ${global.bot.guilds.size} servers`
    })
    if (global.bot.shards.find(s => s.id === 0)) { // only check for missing settings once
      await checkForMissingSettings()
    }
    setInterval(() => {
      if (bot.shards.filter(shard => shard.latency == Infinity && shard.status === 'disconnected').length !== 0) {
        failedHealthCheckCount++
        global.logger.warn(`Found disconnected shards ${bot.shards.filter(shard => shard.latency == Infinity && shard.status === 'disconnected').map(s => s.id).join(', ')}, failure count is ${failedHealthCheckCount}`)
        if (failedHealthCheckCount >= 5) {
          global.logger.warn('Shard health check failed 5 times in a row, hard resetting shards')
          global.webhook.error('Shard health check failed 5 times in a row, hard resetting shards')
          failedHealthCheckCount = 0
          bot.shards.forEach(shard => {
            shard.hardReset()
            shard.connect()
          })
        }
      } else if (failedHealthCheckCount > 0) {
        failedHealthCheckCount--
      }
    }, 1000 * 60)
  }
}
