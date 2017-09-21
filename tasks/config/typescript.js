module.exports = function(grunt){
  grunt.config.set('ts', {
    dev: {
      tsconfig: 'tsconfig.json'
    }
  })
  grunt.loadNpmTasks('grunt-ts')
}
