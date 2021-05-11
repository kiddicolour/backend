module.exports = ({ env }) => {
  return {
    upload: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 100000
      }
    }
  }
};