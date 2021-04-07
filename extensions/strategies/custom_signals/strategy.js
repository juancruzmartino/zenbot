const axios = require('axios')
const c = require('../../../conf.js')

module.exports = {
  name: 'custom_signals',
  description: 'Signal strategy based on custom signals triggered by external providers',

  getOptions: function () {
    this.option('period', 'period length, same as --period_length', String, '1m')
    this.option('period_length', 'period length, same as --period', String, '1m')
  },

  calculate: function () {

  },

  onPeriod: function (s, cb) {
    if(!s.buy_order && !s.sell_order) {
      axios.post(c.signal_url, {
        pair: c.selector,
      })
        .then(function (response) {
          if(response.data && response.data.id > 0) {
            const signal = response.data.action
            const lastTrade = s.my_trades.length > 0 ? s.my_trades[s.my_trades.length - 1] : null

            if(lastTrade && lastTrade.time - new Date().getTime() < 300000 && lastTrade.type === signal) {
              s.signal = null
            }
            else {
              s.signal = response.data.action
            }
          }
        })
        .catch(function (error) {
          //console.log(error.data)
        })
    }
    cb()
  },

  onReport: function () {
    var cols = []
    return cols
  }
}
