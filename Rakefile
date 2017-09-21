
desc 'Build and deploy site with Jekyll'
task :deploy do |t, args|
    puts "Rakefile: Building with a production configuration."
    sh 'bundle exec jekyll build --config _config.yml,_config-production.yml --trace'
    sh 'aws --profile=personal s3 sync _site s3://billwiens.com/ --acl public-read --delete'
end


desc 'Use Jekyll to serve a local site.'
task :serve do |t, args|
    sh 'bundle exec jekyll serve'
end
