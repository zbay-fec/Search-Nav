module.exports = {
    apps: [{
      name: 'search',
      script: './server/server.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-18-212-65-184.compute-1.amazonaws.com',
        key: '~/.ssh/search.pem',
        ref: 'origin/master',
        repo: 'https://github.com/zbay-fec/Search-Nav.git',
        path: '/home/ubuntu/Zbay/Search-Nav',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
}