import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  network: computed.alias('model.resources.networks.firstObject'),
  ports: computed('network.reservedPorts.[]', 'network.dynamicPorts.[]', function() {
    const ports = this.get('network.reservedPorts')
      .map(port => ({
        name: port.Label,
        port: port.Value,
        isDynamic: false,
      }))
      .concat(
        this.get('network.dynamicPorts').map(port => ({
          name: port.Label,
          port: port.Value,
          isDynamic: true,
        }))
      )
      .sortBy('name');
    return ports;
  }),
});
