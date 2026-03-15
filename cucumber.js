module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'features/support/**/*.ts',
      'features/steps/**/*.ts'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html'
    ]
  }
};