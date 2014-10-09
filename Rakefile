
desc 'Build and deploy site with Jekyll'
task :deploy do |t, args|
    puts "Rakefile: Building with a production configuration."
    sh 'jekyll build --config _config.yml,_config-production.yml --trace'
    sh 'rsync -avz --delete _site/ billwiens.com:~/billwiens.com/_site/'
end